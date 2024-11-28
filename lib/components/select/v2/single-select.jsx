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
				if (!selected) {
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
						'es-uic-relative es-uic-flex es-uic-max-w-80 es-uic-items-center es-uic-gap-1 es-uic-p-1 focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500/50',
						'es-uic-h-9 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-bg-white es-uic-text-sm es-uic-shadow-sm es-uic-transition',
						'focus:es-uic-outline-none',
						!inline && 'es-uic-w-full',
						disabled && 'es-uic-select-none',
					)}
					ref={ref}
				>
					<Button
						className={clsx(
							'es-uic-group es-uic-h-6 es-uic-w-full es-uic-rounded-sm es-uic-p-1 es-uic-text-sm es-uic-transition',
							'es-uic-flex es-uic-grow es-uic-items-center',
							'focus:es-uic-outline-none',
							'focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500/50',
							disabled && 'es-uic-bg-transparent es-uic-text-gray-400 selection:es-uic-bg-transparent selection:es-uic-text-transparent',
							currentValue && !clearable && 'es-uic-pr-6',
							!currentValue && 'es-uic-text-gray-400',
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
							className={clsx(
								'es-uic-absolute es-uic-bottom-0 es-uic-right-1 es-uic-top-0 es-uic-my-auto es-uic-flex es-uic-items-center',
								disabled ? 'es-uic-text-gray-300' : 'es-uic-text-gray-500',
							)}
							aria-hidden='true'
						>
							{cloneElement(icons.dropdownCaretAlt, {
								className: 'es-uic-w-5.5 group-aria-expanded:-es-uic-scale-y-100 es-uic-transition-transform es-uic-duration-200',
							})}
						</div>
					</Button>
					{clearable && <SelectClearButton />}
				</div>
				<Popover
					className={clsx(
						'es-uic-flex es-uic-min-w-9 es-uic-max-w-80 es-uic-flex-col es-uic-overflow-x-hidden es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-text-sm es-uic-shadow-lg',
						'focus:es-uic-outline-none',
						'entering:es-uic-animate-in entering:es-uic-fade-in-0 entering:es-uic-slide-in-from-top-3 entering:es-uic-fill-mode-forwards',
						'exiting:es-uic-animate-out exiting:es-uic-fade-out-0 exiting:es-uic-slide-out-to-top-2 exiting:es-uic-fill-mode-forwards',
					)}
					placement='bottom left'
					triggerRef={ref}
				>
					<ListBox
						className='es-uic-space-y-0.5 es-uic-p-1 focus:es-uic-outline-none'
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
				'es-uic-mr-6 es-uic-flex es-uic-h-6 es-uic-w-8 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-text-sm es-uic-text-gray-600 es-uic-transition hover:es-uic-bg-red-50 hover:es-uic-text-red-900 focus:es-uic-outline-none focus:es-uic-ring focus:es-uic-ring-teal-500/50 disabled:es-uic-text-gray-300',
				isEmpty ? 'es-uic-hidden' : 'es-uic-flex',
			)}
			onPress={() => state?.setSelectedKey(null)}
			slot={null}
		>
			{icons.clearAlt}
		</Button>
	);
};
