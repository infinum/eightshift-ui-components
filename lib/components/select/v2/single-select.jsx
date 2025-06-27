import { __ } from '@wordpress/i18n';
import { BaseControl } from '../../base-control/base-control';
import { Select, Label, ListBox, Popover, Button, SelectValue, SelectStateContext, Autocomplete, SearchField, Input, useFilter } from 'react-aria-components';
import { useContext, cloneElement } from 'react';
import { icons } from '../../../icons';
import { OptionItemBase } from './shared';
import { useRef } from 'react';
import { RichLabel } from '../../rich-label/rich-label';
import clsx from 'clsx';

/**
 * Select menu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.label] - Label of the component.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {{label: string, value: string, metadata: Object<string, any>?}[]} props.options - Options to display in the select. `[{ label: string, value: string }]`.
 * @param {string|{label: string, value: string, metadata: Object<string, any>?}} props.value - Current value of the select.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {boolean} [props.simpleValue=false] - If `true`, instead of using a `{label: '', value: ''}` value type, a string is used (just the value).
 * @param {boolean} [props.clearable] - Whether the select is clearable.
 * @param {boolean} [props.disabled] - Whether the select is disabled.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {JSX.Element} [props.customDropdownArrow] - If provided, replaces the default dropdown arrow indicator.
 * @param {string} [props.className] - Classes to pass to the select menu.
 * @param {boolean} [props.noMinWidth=false] - If `true`, the select menu will not have a minimum width.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The SelectNext component.
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
 * <SelectNext
 * 	label='Select items'
 * 	options={loadOptions}
 * 	value={value}
 * 	onChange={setValue}
 * />
 *
 * @preserve
 */
// eslint-disable-next-line no-underscore-dangle
export const SelectNext = (props) => {
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

		disabled = false,
		clearable = false,

		placeholder = __('Select...', 'eightshift-ui-components'),

		customMenuOption,
		customValueDisplay,
		customDropdownArrow,

		className,

		noMinWidth = false,

		searchable,

		hidden,

		...rest
	} = props;

	const ref = useRef();

	const currentValue = simpleValue ? (value ?? null) : (value?.value ?? null);

	const { contains } = useFilter({ sensitivity: 'base' });

	if (hidden) {
		return null;
	}

	return (
		<Select
			selectedKey={currentValue}
			onSelectionChange={(selected) => {
				if (selected === null || selected === undefined) {
					onChange(null);

					return;
				}

				if (simpleValue) {
					onChange(selected);

					return;
				}

				const item = options.find((item) => item.value === selected);

				if (!item) {
					onChange(null);

					return;
				}

				if (item && 'id' in item) {
					delete item.id;
				}

				onChange(item);
			}}
			placeholder={placeholder}
			{...rest}
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
					className={clsx(
						'es:relative es:flex es:items-center es:gap-1 es:px-1.5 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						'es:h-9 es:rounded-10 es:border es:border-secondary-300 es:bg-white es:text-sm es:shadow-sm es:transition',
						'es:inset-ring es:inset-ring-secondary-100',
						'es:any-focus:outline-hidden',
						!noMinWidth && 'es:min-w-48',
						!inline && 'es:w-full',
						disabled && 'es:select-none es:shadow-none!',
						'es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:border-accent-500 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-2 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-accent-500/50',
						className,
					)}
					ref={ref}
				>
					<Button className='es:any-focus:outline-hidden es:text-start es:size-full es:inline-block es:group es:overflow-x-clip'>
						<SelectValue>
							{({ isPlaceholder, selectedItem }) => {
								if (!isPlaceholder && currentValue && customValueDisplay) {
									return customValueDisplay(selectedItem);
								}

								if (!currentValue) {
									return <span className='es:pointer-events-none es:pr-6 es:text-sm es:text-secondary-500'>{placeholder}</span>;
								}

								let icon = selectedItem?.icon ?? null;

								if (typeof selectedItem?.icon === 'string') {
									icon = icons?.[selectedItem.icon] ?? null;
								}

								return (
									<RichLabel
										icon={icon}
										label={selectedItem?.label}
										subtitle={selectedItem.subtitle}
										className={clsx('es:pr-6 es:grow es:w-full', disabled && 'es:grayscale es:pointer-events-none')}
										iconClassName='es:pointer-events-none es:select-none'
									/>
								);
							}}
						</SelectValue>

						<div
							className={clsx('es:absolute es:bottom-0 es:right-1 es:top-0 es:my-auto es:flex es:items-center', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}
							aria-hidden='true'
						>
							{!customDropdownArrow &&
								cloneElement(icons.dropdownCaretAlt, {
									className: 'es:w-4 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
								})}

							{customDropdownArrow && (
								<div
									aria-hidden='true'
									className='es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200'
								>
									{customDropdownArrow}
								</div>
							)}
						</div>
					</Button>
					{clearable && <SelectClearButton />}
				</div>
				<Popover
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:flex es:w-76 es:min-w-9 es:max-w-76 es:flex-col es:-hidden es:rounded-2xl es:border es:border-secondary-200 es:bg-white es:text-sm es:shadow-xl es:inset-ring es:inset-ring-secondary-100',
							'es:any-focus:outline-hidden',
							'es:motion-safe:motion-duration-200 es:motion-safe:motion-ease-spring-bouncy',
							'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
							'es:placement-left:origin-right es:placement-right:origin-left',
							isEntering && 'es:motion-safe:motion-scale-in-95 es:motion-opacity-in-0',
							isEntering &&
								'es:motion-safe:placement-top:motion-translate-y-in-[5%] es:motion-safe:placement-bottom:motion-translate-y-in-[-5%] es:motion-safe:placement-left:motion-translate-x-in-[5%] es:motion-safe:placement-right:motion-translate-x-in-[-5%]',
							isExiting && 'es:motion-safe:motion-scale-out-95 es:motion-opacity-out-0',
							isExiting &&
								'es:motion-safe:placement-top:motion-translate-y-out-[5%] es:motion-safe:placement-bottom:motion-translate-y-out-[-5%] es:motion-safe:placement-left:motion-translate-x-out-[5%] es:motion-safe:placement-right:motion-translate-x-out-[-5%]',
						)
					}
					placement='bottom left'
					triggerRef={ref}
				>
					{searchable && (
						<Autocomplete filter={contains}>
							<SearchField
								aria-label={__('Search', 'eightshift-ui-components')}
								className='es:flex es:items-center es:bg-secondary-100 es:m-2 es:rounded-lg es:relative es:placeholder:text-secondary-500'
								autoFocus
							>
								<Input
									placeholder={__('Search...', 'eightshift-ui-components')}
									className='es:peer es:size-full es:h-9 es:outline-hidden es:px-2.5 es:shadow-none es:text-sm es:py-0 es:[&::-webkit-search-cancel-button]:hidden'
								/>
								<Button
									aria-label={__('Clear', 'eightshift-ui-components')}
									className={clsx(
										'es:absolute es:right-2 es:top-0 es:bottom-0 es:my-auto',
										'es:flex es:size-6 es:items-center es:justify-center es:rounded es:text-sm es:text-secondary-600 es:transition es:hover:bg-red-50 es:hover:text-red-900 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
										'es:peer-placeholder-shown:opacity-0',
									)}
								>
									{icons.clearAlt}
								</Button>
							</SearchField>

							<div className='es:w-full es:h-px es:bg-secondary-200 es:shrink-0' />

							<ListBox
								className='es:space-y-0.5 es:p-1 es:any-focus:outline-hidden es:max-h-72 es:overflow-y-auto'
								items={options}
								renderEmptyState={() => (
									<RichLabel
										icon={icons.searchEmpty}
										label={__('No results', 'eightshift-ui-components')}
										subtitle={__('Try a different search term', 'eightshift-ui-components')}
										className='es:min-h-14 es:p-2 es:w-fit es:mx-auto es:motion-preset-slide-up es:motion-ease-spring-bouncy es:motion-duration-200'
										iconClassName='es:text-accent-700 es:icon:size-7!'
										noColor
									/>
								)}
							>
								{(item) => {
									let icon = item?.icon ?? null;

									if (typeof item?.icon === 'string') {
										icon = icons?.[item.icon] ?? null;
									}

									return (
										<OptionItemBase
											id={item.value}
											className={item?.className}
										>
											{customMenuOption && customMenuOption(item)}
											{!customMenuOption && (
												<RichLabel
													icon={icon}
													label={item?.label}
													subtitle={item.subtitle}
												/>
											)}
										</OptionItemBase>
									);
								}}
							</ListBox>
						</Autocomplete>
					)}

					{!searchable && (
						<ListBox
							className='es:space-y-0.5 es:p-1 es:any-focus:outline-hidden'
							items={options}
							renderEmptyState={() => (
								<RichLabel
									icon={icons.searchEmpty}
									label={__('No results', 'eightshift-ui-components')}
									subtitle={__('Try a different search term', 'eightshift-ui-components')}
									className='es:min-h-14 es:p-2 es:w-fit es:mx-auto es:motion-preset-slide-up es:motion-ease-spring-bouncy es:motion-duration-200'
									iconClassName='es:text-accent-700 es:icon:size-7!'
									noColor
								/>
							)}
						>
							{(item) => {
								let icon = item?.icon ?? null;

								if (typeof item?.icon === 'string') {
									icon = icons?.[item.icon] ?? null;
								}

								return (
									<OptionItemBase
										id={item.value}
										className={item?.className}
									>
										{customMenuOption && customMenuOption(item)}
										{!customMenuOption && (
											<RichLabel
												icon={icon}
												label={item?.label}
												subtitle={item.subtitle}
												noColor
											/>
										)}
									</OptionItemBase>
								);
							}}
						</ListBox>
					)}
				</Popover>
			</BaseControl>
		</Select>
	);
};

const SelectClearButton = () => {
	const state = useContext(SelectStateContext);

	const isEmpty = state?.selectedKey === null;

	return (
		<Button
			aria-label={__('Clear value', 'eightshift-ui-components')}
			className={clsx(
				'es:mr-6 es:flex es:h-6 es:w-8 es:items-center es:justify-center es:rounded es:text-sm es:text-secondary-600 es:transition es:hover:bg-red-50 es:hover:text-red-900 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
				isEmpty ? 'es:hidden' : 'es:flex',
			)}
			onPress={() => state?.setSelectedKey(null)}
			slot={null}
		>
			{icons.clearAlt}
		</Button>
	);
};
