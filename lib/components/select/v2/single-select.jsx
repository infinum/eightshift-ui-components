import { __ } from '@wordpress/i18n';
import { BaseControl } from '../../base-control/base-control';
import { Select, Label, ListBox, ListBoxItem, Popover, Button, SelectValue, SelectStateContext } from 'react-aria-components';
import { useContext, cloneElement } from 'react';
import { icons } from '../../../icons';
import clsx from 'clsx';
import { OptionItemBase } from './shared';
import { useRef } from 'react';
import { RichLabel } from '../../rich-label/rich-label';

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
 * @param {string} [props.className] - Classes to pass to the select menu.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The __ExperimentalSelect component.
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
 * <__ExperimentalSelect
 * 	label='Select items'
 * 	options={loadOptions}
 * 	value={value}
 * 	onChange={setValue}
 * />
 *
 * @preserve
 */
// eslint-disable-next-line no-underscore-dangle
export const __ExperimentalSelect = (props) => {
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

		placeholder,

		customMenuOption,
		customValueDisplay,

		className,

		hidden,
	} = props;

	const ref = useRef();

	if (hidden) {
		return null;
	}

	const currentValue = value?.value ?? value ?? null;

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
						'es:relative es:flex es:max-w-80 es:items-center es:gap-1 es:p-1 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						'es:h-9 es:rounded-10 es:border es:border-secondary-300 es:bg-white es:text-sm es:shadow-sm es:transition',
						'es:any-focus:outline-hidden',
						!inline && 'es:w-full',
						disabled && 'es:select-none',
						'es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:border-accent-500 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-2 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-accent-500/50',
					)}
					ref={ref}
				>
					<Button
						className={clsx(
							'es:group es:h-6 es:w-full es:rounded-sm es:p-1 es:text-sm es:transition',
							'es:flex es:grow es:items-center',
							'es:any-focus:outline-hidden',
							disabled && 'es:bg-transparent es:text-secondary-400 es:selection:bg-transparent es:selection:text-transparent',
							currentValue && !clearable && 'es:pr-6',
							!currentValue && 'es:text-secondary-400',
						)}
					>
						<SelectValue>
							{({ defaultChildren, isPlaceholder, selectedItem }) => {
								if (!isPlaceholder && currentValue && customValueDisplay) {
									return customValueDisplay(selectedItem);
								}

								if (!isPlaceholder && currentValue && customMenuOption) {
									let icon = selectedItem?.icon ?? null;

									if (typeof selectedItem?.icon === 'string') {
										icon = icons?.[selectedItem.icon] ?? null;
									}

									return (
										<RichLabel
											icon={icon}
											label={selectedItem?.label}
											subtitle={selectedItem.subtitle}
										/>
									);
								}

								return defaultChildren;
							}}
						</SelectValue>

						<div
							className={clsx('es:absolute es:bottom-0 es:right-1 es:top-0 es:my-auto es:flex es:items-center', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}
							aria-hidden='true'
						>
							{cloneElement(icons.dropdownCaretAlt, {
								className: 'es:w-5.5 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
							})}
						</div>
					</Button>
					{clearable && <SelectClearButton />}
				</div>
				<Popover
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:flex es:min-w-9 es:max-w-80 es:flex-col es:overflow-x-hidden es:rounded-lg es:border es:border-secondary-200 es:bg-white es:text-sm es:shadow-lg',
							'es:any-focus:outline-hidden',
							isEntering && 'es:motion-safe:motion-preset-slide-down-sm es:motion-safe:motion-duration-300 es:motion-reduce:motion-preset-fade-md',
							isExiting && 'es:not-motion-reduce:motion-translate-y-out-[-2.5%] es:motion-opacity-out-0 es:motion-duration-200',
						)
					}
					placement='bottom left'
					triggerRef={ref}
				>
					<ListBox
						className='es:space-y-0.5 es:p-1 es:any-focus:outline-hidden'
						items={options}
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
