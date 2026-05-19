import { __ } from '@wordpress/i18n';
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
	type SelectProps as ReactAriaSelectProps,
	type SelectValueRenderProps,
} from 'react-aria-components';
import { cloneElement, useMemo, useRef, useState, type CSSProperties, type JSX, type ReactNode } from 'react';

import { Icon, clearAlt, dropdownCaret, searchEmpty } from '../../icons/internal';
import { randomId } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { RichLabel } from '../rich-label/rich-label';
import { getGroupedOptions, OptionItemBase, SelectClearButton } from './shared';
import { selectButtonClass, selectControlClass } from './styles';

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

type SelectValueType = SelectOption | string | null;

type SelectProps = Omit<ReactAriaSelectProps<SelectOption>, 'children' | 'className' | 'isDisabled' | 'selectedKey' | 'onSelectionChange' | 'items' | 'placeholder'> & {
	icon?: ReactNode;
	help?: ReactNode;
	label?: ReactNode;
	inline?: boolean;
	actions?: ReactNode;
	subtitle?: ReactNode;
	options: SelectOption[];
	value: SelectValueType;
	onChange: (value: SelectValueType) => void;
	simpleValue?: boolean;
	groupKey?: string;
	groupValueMapping?: GroupValueMapping;
	clearable?: boolean;
	disabled?: boolean;
	placeholder?: string;
	customMenuOption?: (item: SelectOption) => ReactNode;
	customValueDisplay?: (item: SelectOption | null) => ReactNode;
	customDropdownArrow?: ReactNode;
	className?: string;
	noMinWidth?: boolean;
	searchable?: boolean;
	flat?: boolean;
	size?: SelectSize;
	hidden?: boolean;
};

const getSelectedKey = (value: SelectValueType, simpleValue: boolean) => {
	if (simpleValue) {
		return typeof value === 'string' ? value : null;
	}

	if (!value || typeof value !== 'object') {
		return null;
	}

	const selectedValue = value.value;

	return typeof selectedValue === 'string' ? selectedValue : null;
};

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

/**
 * Select menu.
 *
 * @component
 * @param {SelectProps} props - Component props.
 *
 * @returns {JSX.Element} The Select component.
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
 * <Select
 * 	label='Select items'
 * 	options={options}
 * 	value={value}
 * 	onChange={setValue}
 * />
 */
export const Select = (props: SelectProps) => {
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
	const currentValue = getSelectedKey(value, simpleValue);

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

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaSelect<SelectOption>
			isDisabled={disabled}
			selectedKey={currentValue}
			onOpenChange={(isOpen) => {
				if (!isOpen) {
					setSearchTerm('');
				}
			}}
			onSelectionChange={(selected) => {
				if (selected === null || selected === undefined) {
					onChange(null);

					return;
				}

				if (typeof selected !== 'string') {
					onChange(null);

					return;
				}

				if (simpleValue) {
					onChange(selected);

					return;
				}

				const selectedItem = options.find((item) => item.value === selected);

				if (!selectedItem) {
					onChange(null);

					return;
				}

				const sanitizedItem = { ...selectedItem };

				if ('id' in sanitizedItem) {
					delete sanitizedItem.id;
				}

				onChange(sanitizedItem);
			}}
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
					className={clsx(selectControlClass({ disabled, flat, size, clearable, hasMinWidth: !noMinWidth, inline }), className)}
					ref={ref}
				>
					<Button className={selectButtonClass({ size })}>
						<SelectValue<SelectOption> className='es:pointer-events-none'>
							{({ isPlaceholder, selectedItems }: SelectValueRenderProps<SelectOption>) => {
								const [selectedItem] = selectedItems;

								if (!isPlaceholder && currentValue && customValueDisplay) {
									return customValueDisplay(selectedItem ?? null);
								}

								if (!currentValue) {
									return <span className='es:select-none es:pointer-events-none es:pr-6 es:text-sm es:text-surface-500'>{placeholder}</span>;
								}

								const selectedIcon = selectedItem?.icon ?? null;

								return (
									<RichLabel
										icon={selectedIcon ? <Icon icon={selectedIcon} /> : null}
										label={selectedItem?.label}
										subtitle={selectedItem?.subtitle}
										className={clsx('es:pr-6 es:grow es:w-full', disabled && 'es:grayscale es:pointer-events-none')}
										iconClassName='es:pointer-events-none es:select-none'
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
							searchable ? 'es:rounded-b-xl es:rounded-t-3xl' : 'es:rounded-2xl',
							'es:overflow-clip es:grid es:grid-cols-1',
							searchable ? 'es:grid-rows-[auto_minmax(0,1fr)]' : 'es:grid-rows-1',
							!searchable && !options.length ? 'es:has-first-selected:rounded-t-20!' : null,
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
