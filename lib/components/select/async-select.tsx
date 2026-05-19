import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import type { Key, Selection } from '@react-types/shared';
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
import { cloneElement, useMemo, useRef, type CSSProperties, type JSX, type ReactNode } from 'react';
import { useAsyncList } from 'react-stately';

import { Icon, Spinner, clearAlt, dropdownCaret, searchEmpty } from '../../icons/internal';
import { unescapeHTML } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { RichLabel } from '../rich-label/rich-label';
import { getGroupedOptions, OptionItemBase, SelectClearButton } from './shared';
import { selectButtonClass, selectControlClass } from './styles';

type IconValue = string | JSX.Element | null;
type SelectSize = 'small' | 'medium' | 'default' | 'large';
type RawAsyncItem = Record<string, unknown>;

type AsyncSelectOption = {
	label: string;
	value: string;
	metadata?: Record<string, unknown> | null;
	meta?: Record<string, unknown> | null;
	subtitle?: string;
	icon?: IconValue;
	className?: string;
	[key: string]: unknown;
};

type GroupValueMapping = Record<
	string,
	{
		label?: ReactNode;
		icon?: IconValue;
		subtitle?: ReactNode;
		endIcon?: IconValue;
	}
>;

type AsyncSelectProps = Omit<
	ReactAriaSelectProps<AsyncSelectOption>,
	'children' | 'className' | 'isDisabled' | 'selectedKey' | 'onSelectionChange' | 'items' | 'placeholder' | 'value' | 'onChange'
> & {
	label?: ReactNode;
	help?: ReactNode;
	icon?: IconValue;
	subtitle?: ReactNode;
	actions?: ReactNode;
	inline?: boolean;
	value: AsyncSelectOption | null;
	onChange: (value: AsyncSelectOption | null) => void;
	clearable?: boolean;
	disabled?: boolean;
	placeholder?: string;
	getLabel?: (item: RawAsyncItem) => string | undefined;
	getValue?: (item: RawAsyncItem) => string | undefined;
	getMeta?: (item: RawAsyncItem) => Record<string, unknown> | null | undefined;
	getIcon?: (item: RawAsyncItem | AsyncSelectOption) => IconValue;
	getSubtitle?: (item: RawAsyncItem) => string | undefined;
	getGroup?: (item: RawAsyncItem) => string | undefined;
	getData?: (data: unknown) => RawAsyncItem[];
	fetchUrl?: (searchText?: string) => string;
	fetchConfig?: RequestInit;
	fetchFunction?: (searchText: string | undefined, signal: AbortSignal) => Promise<unknown>;
	processLoadedOptions?: (options: RawAsyncItem[]) => RawAsyncItem[];
	customMenuOption?: (item: AsyncSelectOption) => ReactNode;
	customValueDisplay?: (item: AsyncSelectOption | null) => ReactNode;
	customDropdownArrow?: ReactNode;
	className?: string;
	groupKey?: string;
	groupValueMapping?: GroupValueMapping;
	flat?: boolean;
	size?: SelectSize;
	noMinWidth?: boolean;
	extraItemProps?: string[];
	hidden?: boolean;
};

const getPopoverStyle = (triggerElement: HTMLDivElement | null) =>
	({
		'--select-width': triggerElement ? `${triggerElement.offsetWidth}px` : 'var(--trigger-width)',
	}) as CSSProperties;

const renderOptionIcon = (icon?: IconValue) => (icon ? <Icon icon={icon} /> : null);

const getKeyFromSelection = (selected: Selection | null | undefined) => {
	if (!selected || selected === 'all') {
		return null;
	}

	for (const key of selected) {
		if (typeof key === 'string') {
			return key;
		}

		if (typeof key === 'number') {
			return String(key);
		}
	}

	return null;
};

const getKeyFromValue = (selected: Key | null | undefined) => {
	if (selected === null || selected === undefined) {
		return null;
	}

	if (typeof selected === 'string') {
		return selected;
	}

	if (typeof selected === 'number') {
		return String(selected);
	}

	return null;
};

/**
 * Select menu with async loading.
 *
 * @component
 * @param {AsyncSelectProps} props - Component props.
 *
 * @returns {JSX.Element} The AsyncSelect component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * <AsyncSelect
 * 	label='Select items'
 * 	fetchUrl={(searchText) => `https://api.example.com/items?q=${searchText}`}
 * 	value={value}
 * 	onChange={setValue}
 * 	getLabel={(item) => item?.name}
 * 	getValue={(item) => item?.id}
 * />
 */
export const AsyncSelect = (props: AsyncSelectProps) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,
		value: rawValue,
		onChange,
		disabled = false,
		clearable = false,
		className,
		placeholder = __('Select...', 'eightshift-ui-components'),
		customMenuOption,
		customValueDisplay,
		customDropdownArrow,
		processLoadedOptions = (options) => options,
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
		extraItemProps,
		hidden,
		groupKey,
		groupValueMapping,
		flat,
		size = 'default',
		noMinWidth = false,
		...rest
	} = props;

	const value = rawValue && !Array.isArray(rawValue) && typeof rawValue === 'object' ? rawValue : null;
	const ref = useRef<HTMLDivElement>(null);

	const list = useAsyncList<AsyncSelectOption>({
		initialSelectedKeys: value?.value ? [value.value] : [],
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
				const entry: AsyncSelectOption = {
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

				if (extraItemProps?.length) {
					extraItemProps.forEach((propName) => {
						entry[propName] = item[propName];
					});
				}

				return entry;
			});

			if ((filterText ?? '').length > 0) {
				return { items: output };
			}

			const needsSelectedValue = value?.value && !output.find((item) => item.value === value.value);
			const extraItems = needsSelectedValue && value ? [value] : [];

			if (extraItems.length > 0) {
				output.pop();
			}

			return {
				items: [...extraItems, ...output],
			};
		},
	});

	const groupedItems = useMemo(
		() => getGroupedOptions(list.items, groupKey ?? (getGroup ? '_group' : undefined), groupValueMapping),
		[getGroup, groupKey, groupValueMapping, list.items],
	);

	const renderItem = (item: AsyncSelectOption) => {
		const itemIcon = getIcon ? getIcon(item) : item.icon;

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

	if (hidden) {
		return null;
	}

	const handleSelection = (selectedKey: string | null) => {
		if (!selectedKey) {
			onChange(null);

			return;
		}

		const item = list.items.find((entry) => entry.value === selectedKey);

		if (!item) {
			onChange(null);

			return;
		}

		const sanitizedItem = { ...item };

		if ('id' in sanitizedItem) {
			delete sanitizedItem.id;
		}

		onChange(sanitizedItem);
	};

	return (
		<ReactAriaSelect<AsyncSelectOption>
			isDisabled={disabled}
			value={value?.value ?? null}
			onOpenChange={(isOpen) => {
				if (!isOpen) {
					setTimeout(() => {
						list.setFilterText('');
					}, 100);
				}
			}}
			onChange={(selected) => handleSelection(getKeyFromValue(selected))}
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
					className={clsx(selectControlClass({ disabled, flat, size, clearable, hasMinWidth: !noMinWidth, inline }), className)}
					ref={ref}
				>
					<Button className={selectButtonClass({ size })}>
						<SelectValue<AsyncSelectOption>>
							{({ isPlaceholder, selectedItems }: SelectValueRenderProps<AsyncSelectOption>) => {
								const [selectedItem] = selectedItems;

								if (!isPlaceholder && selectedItem && customValueDisplay) {
									return customValueDisplay(selectedItem);
								}

								if (!selectedItem) {
									return <span className='es:select-none es:pointer-events-none es:text-sm es:text-surface-500'>{placeholder}</span>;
								}

								const selectedIcon = getIcon ? getIcon(selectedItem) : selectedItem.icon;

								return (
									<RichLabel
										icon={renderOptionIcon(selectedIcon)}
										label={selectedItem.label}
										subtitle={selectedItem.subtitle}
										className={clsx('es:grow es:w-full', disabled && 'es:grayscale es:pointer-events-none')}
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

					{clearable ? <SelectClearButton /> : null}
				</div>

				<Popover
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:font-sans',
							'es:w-(--select-width) es:min-w-72',
							'es:outline-hidden',
							'es:rounded-t-3xl',
							'es:overflow-clip es:grid es:grid-cols-1',
							'es:grid-rows-[auto_minmax(0,1fr)]',
							'es:has-last-selected:rounded-b-20!',
							'es:inset-ring es:inset-ring-surface-500/10',
							'es:inset-shadow-sm es:inset-shadow-white/30',
							!list.items.length ? 'es:bg-surface-50/50' : 'es:bg-surface-300/50',
							!list.items.length ? 'es:backdrop-blur-sm' : 'es:backdrop-blur-md',
							!list.items.length ? 'es:backdrop-brightness-105' : 'es:backdrop-brightness-110',
							list.isLoading || !list.items.length ? 'es:rounded-b-3xl' : 'es:rounded-b-xl',
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
							onSelectionChange={(selected) => {
								list.setSelectedKeys(selected);
								handleSelection(getKeyFromSelection(selected));
							}}
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
