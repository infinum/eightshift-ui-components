import { __, _n, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
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
	useFilter,
	type Key,
	type SelectProps as ReactAriaSelectProps,
	type SelectValueRenderProps,
} from 'react-aria-components';
import { cloneElement, isValidElement, useMemo, useRef, useState, type CSSProperties, type JSX, type ReactElement, type ReactNode } from 'react';

import { Icon, clearAlt, dropdownCaret, multiple, reorder, searchEmpty } from '../../icons/internal';
import { randomId } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { DraggableList } from '../draggable-list/draggable-list';
import { DraggableListItem } from '../draggable-list/draggable-list-item';
import { TriggeredPopover } from '../popover/popover';
import { RichLabel } from '../rich-label/rich-label';
import { getGroupedOptions, OptionItemBase, SelectClearButton } from './shared';
import { selectButtonClass, selectControlClass } from './styles';
import type { Prettify } from '../../utilities/types';

type IconValue = string | JSX.Element | null;
type SelectSize = 'small' | 'medium' | 'default' | 'large';

type SelectOption = {
	label: string;
	value: string;
	metadata?: Record<string, unknown> | null;
	subtitle?: ReactNode;
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

type MultiSelectValueType = SelectOption[] | string[] | '' | null;
type DraggableSelectItemContext = SelectOption & {
	updateData: (newValue: Partial<SelectOption>) => void;
	itemIndex: number;
	deleteItem: () => void;
};

type MultiSelectProps = Omit<ReactAriaSelectProps<SelectOption, 'multiple'>, 'children' | 'className' | 'isDisabled' | 'items' | 'placeholder' | 'selectionMode'> & {
	/** Icon of the component. */
	icon?: ReactNode;
	/** Help text of the component. */
	help?: ReactNode;
	/** Label of the component. */
	label?: ReactNode;
	/** Whether the Select menu is displayed inline with the label, to the right. */
	inline?: boolean;
	/** Actions to show to the right of the label. */
	actions?: ReactNode;
	/** Subtitle of the component. */
	subtitle?: ReactNode;
	/** Options to display in the select. `[{ label: string, value: string }]`. */
	options: SelectOption[];
	/** Current value of the select. */
	value: MultiSelectValueType;
	/** Function to call when the value changes. */
	onChange: (value: MultiSelectValueType) => void;
	/** If `true`, instead of using a `{label: '', value: ''}` value type, a string is used (just the value). Defaults to `false`. */
	simpleValue?: boolean;
	/** If provided, the options will be grouped by this key. */
	groupKey?: string;
	/** If provided, the group headers will be mapped to these labels/icons. */
	groupValueMapping?: GroupValueMapping;
	/** Whether the select is clearable. Defaults to `false`. */
	clearable?: boolean;
	/** Whether the select is disabled. Defaults to `false`. */
	disabled?: boolean;
	/** Placeholder text to show when no value is selected. Defaults to `Select...`. */
	placeholder?: string;
	/** If provided, replaces the default item in the dropdown menu (react-select's `components.Option`). */
	customMenuOption?: (item: SelectOption) => ReactNode;
	/** If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`). */
	customValueDisplay?: (item: SelectOption | null) => ReactNode;
	/** If provided, replaces the default dropdown arrow indicator. */
	customDropdownArrow?: ReactNode;
	/** Classes to pass to the select menu. */
	className?: string;
	/** If `true`, the select menu will not have a minimum width. Defaults to `false`. */
	noMinWidth?: boolean;
	/** If `true`, the menu will allow searching through the options. */
	searchable?: boolean;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the option for reordering selected items is disabled. */
	noReorder?: boolean;
	/** Sets the size of the input field. Defaults to `default`. */
	size?: SelectSize;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

const TypedDraggableList = DraggableList as (props: {
	children: (item: DraggableSelectItemContext) => ReactNode;
	items?: SelectOption[] | null;
	onChange: (items: SelectOption[]) => void;
	className?: string;
	itemContainerClassName?: string;
	itemClassName?: string;
	hidden?: boolean;
}) => ReactNode;

const getSearchableText = (content?: ReactNode) => {
	if (typeof content === 'string') {
		return content;
	}

	return '';
};

const getPopoverStyle = (triggerElement: HTMLDivElement | null) =>
	({
		'--select-width': triggerElement ? `${triggerElement.offsetWidth}px` : 'var(--trigger-width)',
	}) as CSSProperties;

const getSelectedKeys = (value: MultiSelectValueType) => {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.map((item) => (typeof item === 'string' ? item : item.value));
};

const getCurrentValue = (value: MultiSelectValueType, simpleValue: boolean, options: SelectOption[]) => {
	if (!Array.isArray(value)) {
		return [];
	}

	if (!simpleValue) {
		return value.filter((item): item is SelectOption => typeof item === 'object' && item !== null);
	}

	return value.map((item) => options.find((option) => option.value === item)).filter((item): item is SelectOption => Boolean(item));
};

const getOptionIcon = (icon?: IconValue): ReactElement | undefined => {
	if (!icon) {
		return undefined;
	}

	return typeof icon === 'string' ? <Icon icon={icon} /> : icon;
};

/**
 * Multi-select menu.
 *
 * @component
 * @param {MultiSelectProps} props - Component props.
 *
 * @returns {JSX.Element} The MultiSelect component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * const options = [
 * 	{ label: 'Option 1', value: 'option-1' },
 * 	{ label: 'Option 2', value: 'option-2' },
 * 	{ label: 'Option 3', value: 'option-3' },
 * ];
 *
 * <MultiSelect
 * 	label='Select items'
 * 	options={options}
 * 	value={value}
 * 	onChange={setValue}
 * />
 */
export const MultiSelect = (props: Prettify<MultiSelectProps>) => {
	const {
		icon,
		help,
		label,
		inline,
		actions,
		subtitle,
		value,
		onChange,
		options,
		simpleValue = false,
		groupKey,
		groupValueMapping,
		disabled = false,
		clearable = false,
		placeholder = __('Select...', 'eightshift-ui-components'),
		customMenuOption,
		customValueDisplay,
		customDropdownArrow,
		className,
		flat,
		size = 'default',
		noMinWidth = false,
		noReorder,
		searchable,
		hidden,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const { contains } = useFilter({ sensitivity: 'base' });

	const filteredOptions = useMemo(() => {
		if (!searchable || searchTerm.length === 0) {
			return options;
		}

		return options.filter((item) => contains(getSearchableText(item.label), searchTerm) || contains(getSearchableText(item.subtitle), searchTerm));
	}, [contains, options, searchable, searchTerm]);

	const groupedOptions = useMemo(() => getGroupedOptions(filteredOptions, groupKey, groupValueMapping), [filteredOptions, groupKey, groupValueMapping]);
	const currentValue = getCurrentValue(value, simpleValue, options);
	const currentValueKeys = getSelectedKeys(value);

	const renderItem = (item: SelectOption) => {
		const itemIcon = item.icon ?? null;

		return (
			<OptionItemBase
				id={item.value ?? randomId(8)}
				className={item.className}
				selectIndicator
				value={item}
			>
				{customMenuOption ? customMenuOption(item) : null}

				{!customMenuOption ? (
					<RichLabel
						icon={itemIcon ? <Icon icon={itemIcon} /> : null}
						label={item.label}
						subtitle={item.subtitle}
						noColor
					/>
				) : null}
			</OptionItemBase>
		);
	};

	const handleSelectionChange = (selected: Key[] | null | undefined) => {
		if (selected === null || selected === undefined) {
			onChange(null);

			return;
		}

		const selectedKeys = selected.filter((item): item is string => typeof item === 'string');

		if (selectedKeys.length === 0) {
			onChange(simpleValue ? '' : []);

			return;
		}

		if (simpleValue) {
			onChange(selectedKeys);

			return;
		}

		const selectedValues = selectedKeys
			.map((selectedKey) => {
				const option = options.find((candidate) => candidate.value === selectedKey);

				if (!option) {
					return null;
				}

				const sanitizedOption = { ...option };

				if (sanitizedOption.icon && isValidElement(sanitizedOption.icon)) {
					delete sanitizedOption.icon;
				}

				return sanitizedOption;
			})
			.filter((item): item is SelectOption => Boolean(item));

		onChange(selectedValues);
	};

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaSelect<SelectOption, 'multiple'>
			selectionMode='multiple'
			isDisabled={disabled}
			value={currentValueKeys}
			onOpenChange={(isOpen) => {
				if (!isOpen) {
					setSearchTerm('');
				}
			}}
			onChange={handleSelectionChange}
			placeholder={placeholder}
			{...rest}
			className='es:group es:w-fill'
		>
			<BaseControl
				label={label}
				icon={icon}
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
						<SelectValue<SelectOption> className='es:select-none es:pointer-events-none'>
							{({ isPlaceholder, selectedItems }: SelectValueRenderProps<SelectOption>) => {
								const [selectedItem] = selectedItems;

								if (!currentValueKeys.length || isPlaceholder) {
									return <span className='es:select-none es:pointer-events-none es:pr-6 es:text-sm es:text-surface-500'>{placeholder}</span>;
								}

								const selectedIcon = selectedItem?.icon ?? null;

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
									return customValueDisplay(selectedItem ?? null);
								}

								return (
									<RichLabel
										icon={selectedIcon ? <Icon icon={selectedIcon} /> : null}
										label={selectedItem?.label}
										subtitle={selectedItem?.subtitle}
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
						hidden={noReorder || disabled || currentValue.length < 2}
						style={getPopoverStyle(ref.current)}
					>
						<span className='es:text-sm es:ml-3 es:mt-2 es:mb-1 es:font-variation-["wdth"_100,"wght"_325,"ROND"_100] es:text-surface-600'>
							{__('Item order', 'eightshift-ui-components')}
						</span>

						<TypedDraggableList
							items={currentValue}
							onChange={(newValue) => {
								handleSelectionChange(newValue.map((item) => item.value));
							}}
							className='es:contents'
							itemContainerClassName='es:h-full es:max-h-60 es:overflow-y-auto es:pb-1.5 es:mt-0'
							itemClassName='es:z-999999'
						>
							{(item) => {
								const realItem = options.find((option) => option.value === item.value);

								return (
									<DraggableListItem
										icon={getOptionIcon(realItem?.icon)}
										label={realItem?.label}
										subtitle={typeof realItem?.subtitle === 'string' ? realItem.subtitle : undefined}
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
							searchable ? 'es:rounded-b-xl es:rounded-t-3xl' : 'es:rounded-2xl',
							'es:overflow-clip es:grid es:grid-cols-1',
							searchable ? 'es:grid-rows-[auto_minmax(0,1fr)]' : 'es:grid-rows-1',
							!searchable ? 'es:has-first-selected:rounded-t-20!' : null,
							'es:has-last-selected:rounded-b-20!',
							'es:inset-ring es:inset-ring-surface-500/10',
							'es:inset-shadow-sm es:inset-shadow-white/30',
							searchable && !options.length ? 'es:bg-surface-50/50' : 'es:bg-surface-300/50',
							searchable && !options.length ? 'es:backdrop-blur-sm' : 'es:backdrop-blur-md',
							searchable && !options.length ? 'es:backdrop-brightness-105' : 'es:backdrop-brightness-110',
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
					{searchable ? (
						<Autocomplete
							filter={() => true}
							inputValue={searchTerm}
							onInputChange={setSearchTerm}
						>
							<SearchField
								aria-label={__('Search', 'eightshift-ui-components')}
								className='es:flex es:items-center es:relative'
								autoFocus
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

							<ListBox
								className='es:space-y-0.75 es:p-1.5 es:pt-0 es:any-focus:outline-hidden es:h-full es:overflow-y-auto es:rounded-t-xl'
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
								{groupedOptions ? (
									<Collection items={groupedOptions}>
										{(item) => (
											<ListBoxSection
												id={item.key}
												className='es:flex es:flex-col es:gap-0.75'
											>
												<Header className='es:px-2.5 es:pb-1 es:pt-3 es:select-none'>
													<RichLabel
														icon={item.icon}
														label={item.label}
														subtitle={item.subtitle}
														endIcon={item.endIcon}
														fullWidth
													/>
												</Header>
												<Collection items={item.options}>{(subItem) => renderItem(subItem)}</Collection>
											</ListBoxSection>
										)}
									</Collection>
								) : (
									<Collection items={filteredOptions}>{(item) => renderItem(item)}</Collection>
								)}
							</ListBox>
						</Autocomplete>
					) : (
						<ListBox
							className='es:space-y-0.75 es:p-1.5 es:any-focus:outline-hidden es:h-full es:overflow-y-auto es:rounded-t-xl'
							renderEmptyState={() => (
								<RichLabel
									icon={searchEmpty}
									label={__('No results', 'eightshift-ui-components')}
									subtitle={__('Try a different search term', 'eightshift-ui-components')}
									className='es:min-h-14 es:p-2 es:w-fit es:mx-auto es:motion-preset-slide-up es:motion-ease-spring-bouncy es:motion-duration-200'
									iconClassName='es:text-accent-700 es:icon:size-7!'
									noColor
								/>
							)}
						>
							{groupedOptions ? (
								<Collection items={groupedOptions}>
									{(item) => (
										<ListBoxSection
											id={item.key}
											className='es:flex es:flex-col es:gap-0.75'
										>
											<Header className='es:px-2.5 es:pb-1 es:pt-3 es:select-none'>
												<RichLabel
													icon={item.icon}
													label={item.label}
													subtitle={item.subtitle}
													endIcon={item.endIcon}
													fullWidth
												/>
											</Header>
											<Collection items={item.options}>{(subItem) => renderItem(subItem)}</Collection>
										</ListBoxSection>
									)}
								</Collection>
							) : (
								<Collection items={options}>{(item) => renderItem(item)}</Collection>
							)}
						</ListBox>
					)}
				</Popover>
			</BaseControl>
		</ReactAriaSelect>
	);
};
