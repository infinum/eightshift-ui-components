import { __, _n, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
import { type Key, type Selection } from '@react-types/shared';
import {
	Autocomplete,
	Button,
	Collection,
	Header,
	Input,
	Label,
	ListBox,
	ListBoxSection,
	Popover,
	SearchField,
	Select as ReactAriaSelect,
	SelectValue,
	type SelectProps as ReactAriaSelectProps,
	type SelectValueRenderProps,
} from 'react-aria-components';
import { cloneElement, useMemo, useRef, type CSSProperties, type JSX, type ReactElement, type ReactNode } from 'react';
import { useAsyncList } from 'react-stately';

import { Icon, Spinner, clearAlt, dropdownCaret, multiple, reorder, searchEmpty } from '../../icons/internal';
import { unescapeHTML } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { DraggableList } from '../draggable-list/draggable-list';
import { DraggableListItem } from '../draggable-list/draggable-list-item';
import { TriggeredPopover } from '../popover/popover';
import { RichLabel } from '../rich-label/rich-label';
import { getGroupedOptions, OptionItemBase, SelectClearButton } from './shared';
import { selectButtonClass, selectControlClass } from './styles';

type IconValue = string | JSX.Element | null;
type SelectSize = 'small' | 'medium' | 'default' | 'large';
type RawAsyncItem = Record<string, unknown>;

type AsyncMultiSelectOption = {
	label: string;
	value: string;
	metadata?: Record<string, unknown> | null;
	meta?: Record<string, unknown> | null;
	subtitle?: string;
	icon?: IconValue;
	className?: string;
	[key: string]: unknown;
};

type AsyncMultiSelectValue = AsyncMultiSelectOption[] | string[] | '' | null;

type GroupValueMapping = Record<
	string,
	{
		label?: ReactNode;
		icon?: IconValue;
		subtitle?: ReactNode;
		endIcon?: IconValue;
	}
>;

type DraggableSelectItemContext = AsyncMultiSelectOption & {
	updateData: (newValue: Partial<AsyncMultiSelectOption>) => void;
	itemIndex: number;
	deleteItem: () => void;
};

type AsyncMultiSelectProps = Omit<
	ReactAriaSelectProps<AsyncMultiSelectOption, 'multiple'>,
	'children' | 'className' | 'isDisabled' | 'items' | 'placeholder' | 'selectionMode' | 'value' | 'onChange'
> & {
	label?: ReactNode;
	help?: ReactNode;
	icon?: IconValue;
	subtitle?: ReactNode;
	actions?: ReactNode;
	inline?: boolean;
	value: AsyncMultiSelectValue;
	onChange: (value: AsyncMultiSelectValue) => void;
	clearable?: boolean;
	disabled?: boolean;
	placeholder?: string;
	getLabel?: (item: RawAsyncItem) => string | undefined;
	getValue?: (item: RawAsyncItem) => string | undefined;
	getMeta?: (item: RawAsyncItem) => Record<string, unknown> | null | undefined;
	getIcon?: (item: RawAsyncItem | AsyncMultiSelectOption) => IconValue;
	getSubtitle?: (item: RawAsyncItem) => string | undefined;
	getGroup?: (item: RawAsyncItem) => string | undefined;
	getData?: (data: unknown) => RawAsyncItem[];
	fetchUrl?: (searchText?: string) => string;
	fetchConfig?: RequestInit;
	fetchFunction?: (searchText: string | undefined, signal: AbortSignal) => Promise<unknown>;
	processLoadedOptions?: (options: RawAsyncItem[]) => RawAsyncItem[];
	customMenuOption?: (item: AsyncMultiSelectOption) => ReactNode;
	customValueDisplay?: (item: AsyncMultiSelectOption | null) => ReactNode;
	customDropdownArrow?: ReactNode;
	className?: string;
	groupKey?: string;
	groupValueMapping?: GroupValueMapping;
	noMinWidth?: boolean;
	flat?: boolean;
	noReorder?: boolean;
	size?: SelectSize;
	hidden?: boolean;
};

const TypedDraggableList = DraggableList as (props: {
	children: (item: DraggableSelectItemContext) => ReactNode;
	items?: AsyncMultiSelectOption[] | null;
	onChange: (items: AsyncMultiSelectOption[]) => void;
	className?: string;
	itemContainerClassName?: string;
	itemClassName?: string;
	hidden?: boolean;
}) => ReactNode;

const getPopoverStyle = (triggerElement: HTMLDivElement | null) =>
	({
		'--select-width': triggerElement ? `${triggerElement.offsetWidth}px` : 'var(--trigger-width)',
	}) as CSSProperties;

const getCurrentValue = (value: AsyncMultiSelectValue) => {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.filter((item): item is AsyncMultiSelectOption => typeof item === 'object' && item !== null);
};

const getCurrentValueKeys = (value: AsyncMultiSelectValue) => {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.flatMap((item) => {
		if (typeof item === 'string') {
			return item;
		}

		if (item && typeof item.value === 'string') {
			return item.value;
		}

		return [];
	});
};

const normalizeSelectedKeys = (selected: Key[] | Selection | null | undefined) => {
	if (selected === null || selected === undefined || selected === 'all') {
		return [];
	}

	const keys = Array.isArray(selected) ? selected : [...selected];

	return keys.flatMap((key) => {
		if (typeof key === 'string') {
			return key;
		}

		if (typeof key === 'number') {
			return String(key);
		}

		return [];
	});
};

const getOptionIcon = (icon?: IconValue): ReactElement | undefined => {
	if (!icon) {
		return undefined;
	}

	return typeof icon === 'string' ? <Icon icon={icon} /> : icon;
};

const renderOptionIcon = (icon?: IconValue) => getOptionIcon(icon) ?? null;

export const AsyncMultiSelect = (props: AsyncMultiSelectProps) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,
		value,
		onChange,
		clearable = false,
		disabled = false,
		placeholder = __('Select...', 'eightshift-ui-components'),
		fetchUrl,
		fetchConfig = {},
		fetchFunction,
		getLabel = (item) => (typeof item.label === 'string' ? item.label : undefined),
		getValue = (item) => (typeof item.value === 'string' ? item.value : undefined),
		getMeta,
		getIcon,
		getSubtitle,
		getGroup,
		getData = (data) => (Array.isArray(data) ? (data as RawAsyncItem[]) : []),
		customMenuOption,
		customValueDisplay,
		customDropdownArrow,
		className,
		groupKey,
		groupValueMapping,
		flat,
		size = 'default',
		noMinWidth = false,
		noReorder,
		hidden,
		processLoadedOptions = (options) => options,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const currentValue = getCurrentValue(value);
	const currentValueKeys = getCurrentValueKeys(value);

	const list = useAsyncList<AsyncMultiSelectOption>({
		initialSelectedKeys: currentValueKeys,
		getKey: (item) => item.value,
		async load({ signal, filterText }) {
			let loadedData: unknown;

			if (fetchFunction) {
				loadedData = await fetchFunction(filterText, signal);
			} else if (fetchUrl) {
				const response = await fetch(fetchUrl(filterText), { ...fetchConfig, signal });
				const responseData: unknown = await response.json();

				loadedData = responseData;
			} else {
				loadedData = [];
			}

			const processedItems = processLoadedOptions(getData(loadedData));
			const output = processedItems.map((item, index) => {
				const id = getValue(item) ?? String(index);
				const optionLabel = unescapeHTML(getLabel(item) ?? '') ?? '';
				const entry: AsyncMultiSelectOption = {
					...item,
					label: optionLabel,
					value: id,
				};

				if (getMeta) {
					const metadata = getMeta(item) ?? null;

					entry.metadata = metadata;
					entry.meta = metadata;
				}

				if (getSubtitle) {
					const optionSubtitle = unescapeHTML(getSubtitle(item) ?? '') ?? '';

					entry.subtitle = optionSubtitle || undefined;
				}

				if (getIcon) {
					entry.icon = getIcon(item);
				}

				if (getGroup) {
					entry[groupKey ?? '_group'] = getGroup(item);
				}

				return entry;
			});

			if ((filterText ?? '').length > 0) {
				return {
					items: output,
				};
			}

			const extraItems = currentValue.filter((selectedValue) => !output.find((item) => item.value === selectedValue.value));

			return {
				items: [...output, ...extraItems],
			};
		},
	});

	const groupedItems = useMemo(
		() => getGroupedOptions(list.items, groupKey ?? (getGroup ? '_group' : undefined), groupValueMapping),
		[getGroup, groupKey, groupValueMapping, list.items],
	);

	const renderItem = (item: AsyncMultiSelectOption) => {
		const itemIcon = getIcon && !item.icon ? getIcon(item) : item.icon;

		return (
			<OptionItemBase
				key={item.value}
				id={item.value}
				value={item}
				selectIndicator
			>
				{customMenuOption ? customMenuOption(item) : null}

				{!customMenuOption ? (
					<RichLabel
						icon={renderOptionIcon(itemIcon)}
						label={item.label}
						subtitle={item.subtitle}
						noColor
					/>
				) : null}
			</OptionItemBase>
		);
	};

	const handleSelectionChange = (rawSelected: Key[] | Selection | null | undefined) => {
		if (rawSelected === null || rawSelected === undefined) {
			list.setSelectedKeys(new Set());
			onChange(null);

			return;
		}

		const visibleSelectedKeys = new Set(normalizeSelectedKeys(rawSelected));
		const selectedKeys = new Set<string>();

		if (list.filterText.length > 0) {
			const visibleItemKeys = new Set(list.items.map((item) => item.value));

			for (const key of currentValueKeys) {
				if (!visibleItemKeys.has(key)) {
					selectedKeys.add(key);
				}
			}
		}

		for (const key of visibleSelectedKeys) {
			selectedKeys.add(key);
		}

		list.setSelectedKeys(selectedKeys);

		if (selectedKeys.size === 0) {
			onChange([]);

			return;
		}

		const selectedValues = [...selectedKeys]
			.map((selectedKey) => {
				const option = list.items.find((item) => item.value === selectedKey) ?? currentValue.find((item) => item.value === selectedKey);

				if (!option) {
					return null;
				}

				return {
					...option,
				};
			})
			.filter((item): item is AsyncMultiSelectOption => Boolean(item));

		onChange(selectedValues);
	};

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaSelect<AsyncMultiSelectOption, 'multiple'>
			selectionMode='multiple'
			isDisabled={disabled}
			value={currentValueKeys}
			onOpenChange={(isOpen) => {
				if (!isOpen) {
					setTimeout(() => {
						list.setFilterText('');
					}, 100);
				}
			}}
			onChange={handleSelectionChange}
			placeholder={placeholder}
			{...rest}
			className='es:group es:w-fill'
		>
			<BaseControl
				label={label}
				icon={renderOptionIcon(icon)}
				subtitle={subtitle}
				actions={actions}
				help={help}
				inline={inline}
				labelAs={Label}
			>
				<div
					className={clsx(selectControlClass({ disabled, flat, size, clearable: true, hasMinWidth: !noMinWidth, inline }), className)}
					ref={ref}
				>
					<Button className={selectButtonClass({ size })}>
						<SelectValue<AsyncMultiSelectOption> className='es:select-none es:pointer-events-none'>
							{({ isPlaceholder, selectedItems }: SelectValueRenderProps<AsyncMultiSelectOption>) => {
								const [selectedItem] = selectedItems;

								if (!currentValueKeys.length || isPlaceholder) {
									return <span className='es:select-none es:pointer-events-none es:pr-6 es:text-sm es:text-surface-500'>{placeholder}</span>;
								}

								const activeItem = selectedItem ?? currentValue[0] ?? null;
								let selectedIcon: IconValue = null;

								if (activeItem) {
									selectedIcon = getIcon ? (getIcon(activeItem) ?? null) : (activeItem.icon ?? null);
								}

								if (selectedItems.length > 1) {
									return (
										<RichLabel
											icon={multiple}
											label={sprintf(_n('%s item', '%s items', selectedItems.length, 'eightshift-ui-components'), String(selectedItems.length))}
											subtitle={selectedItems.map((item) => item?.label ?? '').join(', ')}
											subtitleClassName='es:line-clamp-1 es:max-w-56'
										/>
									);
								}

								if (!isPlaceholder && currentValue.length > 0 && customValueDisplay) {
									return customValueDisplay(activeItem);
								}

								return (
									<RichLabel
										icon={renderOptionIcon(selectedIcon)}
										label={activeItem?.label}
										subtitle={activeItem?.subtitle}
										className={clsx('es:pr-6 es:grow es:w-full', disabled && 'es:grayscale es:pointer-events-none')}
										iconClassName='es:pointer-events-none es:select-none'
										labelClassName='es:line-clamp-1'
										subtitleClassName='es:line-clamp-1'
									/>
								);
							}}
						</SelectValue>

						<div
							className={clsx('es:absolute es:bottom-0 es:right-3 es:top-0 es:my-auto es:flex es:items-center', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}
							aria-hidden='true'
						>
							{!customDropdownArrow
								? cloneElement(dropdownCaret, {
										className: 'es:w-4 es:stroke-[1.2] es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
									})
								: null}

							{customDropdownArrow ? (
								<div
									aria-hidden='true'
									className='es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200'
								>
									{customDropdownArrow}
								</div>
							) : null}
						</div>
					</Button>

					{clearable ? <SelectClearButton multi /> : null}

					<TriggeredPopover
						aria-label={__('Item order', 'eightshift-ui-components')}
						triggerButtonIcon={reorder}
						triggerButtonProps={{
							size: 'small',
							type: 'ghost',
							className: 'es:icon:opacity-80 es:size-7!',
							'aria-label': __('Reorder', 'eightshift-ui-components'),
							tooltip: true,
							slot: null,
						}}
						className='es:grid es:grid-cols-1 es:grid-rows-[auto_minmax(0,1fr)] es:p-0!'
						wrapperClassName='es:w-(--select-width) es:min-w-72 es:px-1.5 es:h-fit es:from-surface-300/35 es:to-surface-300/35 es:overflow-clip es:rounded-20!'
						hidden={Boolean(noReorder) || disabled || currentValue.length < 2}
						style={getPopoverStyle(ref.current)}
					>
						<span className='es:text-sm es:ml-3 es:mt-2 es:mb-1 es:font-variation-["wdth"_100,"wght"_325,"ROND"_100] es:text-surface-600'>
							{__('Item order', 'eightshift-ui-components')}
						</span>

						<TypedDraggableList
							items={currentValue}
							onChange={(reordered) => {
								handleSelectionChange(reordered.map((item) => item.value));
							}}
							className='es:contents'
							itemContainerClassName='es:h-full es:max-h-60 es:overflow-y-auto es:pb-1.5 es:mt-0'
							itemClassName='es:z-999999'
						>
							{(item) => {
								const realItem = currentValue.find((candidate) => candidate.value === item.value) ?? list.items.find((candidate) => candidate.value === item.value);
								let realItemIcon: IconValue = null;

								if (realItem) {
									realItemIcon = getIcon ? (getIcon(realItem) ?? null) : (realItem.icon ?? null);
								}

								return (
									<DraggableListItem
										icon={getOptionIcon(realItemIcon)}
										label={realItem?.label}
										subtitle={realItem?.subtitle}
										iconClassName='es:pointer-events-none es:select-none'
										labelClassName='es:line-clamp-1'
										subtitleClassName='es:line-clamp-1'
										className={clsx('es:min-h-9 es:flex es:items-center es:justify-between', realItem?.icon ? 'es:pl-1' : 'es:pl-2')}
									/>
								);
							}}
						</TypedDraggableList>
					</TriggeredPopover>
				</div>

				<Popover
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:font-sans',
							'es:w-(--select-width) es:min-w-72',
							'es:outline-hidden',
							'es:rounded-b-xl es:rounded-t-3xl',
							'es:overflow-clip es:grid es:grid-cols-1',
							'es:grid-rows-[auto_minmax(0,1fr)]',
							'es:has-last-selected:rounded-b-20!',
							'es:inset-ring es:inset-ring-surface-500/10',
							'es:inset-shadow-sm es:inset-shadow-white/30',
							!list.items.length ? 'es:bg-surface-50/50' : 'es:bg-surface-300/50',
							!list.items.length ? 'es:backdrop-blur-sm' : 'es:backdrop-blur-md',
							!list.items.length ? 'es:backdrop-brightness-105' : 'es:backdrop-brightness-110',
							'es:backdrop-saturate-125',
							'es:shadow-lg es:shadow-black/10',
							'es:transition-plus',
							'es:motion-duration-300 es:motion-ease-spring-bouncy',
							'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
							isEntering && 'es:motion-scale-x-in-95 es:motion-scale-y-in-85 es:motion-opacity-in-0',
							isEntering && 'es:placement-top:motion-translate-y-in-[0.5rem] es:placement-bottom:motion-translate-y-in-[-0.5rem]',
							isExiting && 'es:motion-scale-x-out-95 es:motion-scale-y-out-85 es:motion-opacity-out-0',
							isExiting && 'es:placement-top:motion-translate-y-out-[0.5rem] es:placement-bottom:motion-translate-y-out-[-0.5rem]',
						)
					}
					placement='bottom left'
					maxHeight={260}
					triggerRef={ref}
					style={getPopoverStyle(ref.current)}
				>
					<Autocomplete
						inputValue={list.filterText}
						onInputChange={(text) => list.setFilterText(text)}
					>
						<SearchField
							aria-label={__('Search', 'eightshift-ui-components')}
							className='es:flex es:items-center es:relative'
						>
							<Input
								placeholder={__('Search...', 'eightshift-ui-components')}
								className={clsx(
									'es:peer es:size-full es:h-9.5 es:outline-hidden! es:pl-3.5 es:pr-9 es:shadow-none! es:text-13! es:placeholder:text-surface-500 es:[&::-webkit-search-cancel-button]:hidden',
									'es:bg-accent-900/8 es:m-1.5 es:rounded-3xl! es:border-none!',
									'es:inset-ring! es:inset-ring-accent-950/7 es:focus:inset-ring-accent-950/20',
									'es:text-accent-950 es:placeholder:text-accent-700/50',
									'es:transition',
								)}
							/>

							<Button
								slot='clear'
								aria-label={__('Clear', 'eightshift-ui-components')}
								className={clsx(
									'es:absolute es:right-3 es:top-0 es:bottom-0 es:my-auto es:border-none es:bg-transparent',
									'es:flex es:size-7 es:items-center es:justify-center es:rounded-3xl es:text-sm es:text-surface-700 es:transition es:hover:bg-accent-50 es:hover:text-accent-800 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300',
									'es:peer-placeholder-shown:opacity-0',
								)}
							>
								{clearAlt}
							</Button>
						</SearchField>

						{list.isLoading ? (
							<div className='es:p-3 es:min-h-16 es:flex es:items-center es:justify-center'>
								<Spinner />
							</div>
						) : null}

						<ListBox
							className={clsx('es:space-y-0.75 es:p-1.5 es:pt-0 es:any-focus:outline-hidden es:h-full es:overflow-y-auto es:rounded-t-xl', list.isLoading && 'es:hidden')}
							selectedKeys={list.selectedKeys}
							selectionMode='multiple'
							selectionBehavior='toggle'
							onSelectionChange={handleSelectionChange}
							renderEmptyState={() => (
								<RichLabel
									icon={searchEmpty}
									label={__('No results', 'eightshift-ui-components')}
									subtitle={__('Try a different search term', 'eightshift-ui-components')}
									className='es:min-h-14 es:p-2 es:w-fit es:mx-auto es:motion-preset-slide-up es:motion-ease-spring-bouncy es:motion-duration-200 es:shrink-0'
									iconClassName='es:text-accent-700 es:icon:size-7!'
									noColor
								/>
							)}
						>
							{groupedItems ? (
								<Collection items={groupedItems}>
									{(section) => (
										<ListBoxSection
											id={section.key}
											className='es:flex es:flex-col es:gap-0.75'
										>
											<Header className='es:px-2.5 es:pb-1 es:pt-3 es:select-none'>
												<RichLabel
													icon={section.icon}
													label={section.label}
													subtitle={section.subtitle}
													endIcon={section.endIcon}
													fullWidth
												/>
											</Header>
											<Collection items={section.options}>{(item) => renderItem(item)}</Collection>
										</ListBoxSection>
									)}
								</Collection>
							) : (
								<Collection items={list.items}>{(item) => renderItem(item)}</Collection>
							)}
						</ListBox>
					</Autocomplete>
				</Popover>
			</BaseControl>
		</ReactAriaSelect>
	);
};
