import { icons } from '../../icons/icons';
import { BaseControl } from '../base-control/base-control';
import { ButtonGroup } from '../button/button';
import { Menu, MenuItem } from '../menu/menu';
import { RadioButton, RadioButtonGroup } from '../radio/radio';
import { ToggleButton } from '../toggle-button/toggle-button';

/**
 * A component that allows the user to select an option from a list of options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} props.label - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display below the label.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.help] - Help text to show below the component.
 * @param {boolean} [props.inline] - If `true`, the component is displayed inline - icon/label/subtitle are on the left, the passed content is on the right. **Note:** not compatible with `actions`.
 * @param {string} props.value - The currently selected value.
 * @param {Function} props.onChange - Function to run when the selected value changes.
 * @param {{label: string, value: any, tooltip: string|JSX.Element, icon: JSX.Element|string, ariaLabel: string }[]} props.options - The list of options to choose from.
 * @param {string} [props.disabled] - If `true`, the option select component is disabled.
 * @param {boolean} [props.vertical] - If `true`, the options are displayed vertically. Not applicable to the `menu` type.
 * @param {OptionSelectType} [props.type='toggleButton'] - The type of the option select component.
 * @param {string} [props.className] - Classes to pass to the main element wrapper.
 * @param {string} [props.itemClassName] - Classes to pass to each item.
 * @param {Object} [props.wrapperProps] - Props to pass to the wrapper.
 * @param {Object} [props.itemProps] - Props to pass to each item.
 * @param {boolean} [props.noTriggerLabel] - Whether the trigger label should be hidden. Applies only to the `menu` type.
 * @param {boolean} [props.noTriggerIcon] - Whether the trigger icon should be hidden. Applies only to the `menu` type.
 *
 * @returns {JSX.Element} The OptionSelect component.
 *
 * @typedef {'toggleButtons' | 'radios' | 'radiosSegmented' | 'menu'} OptionSelectType
 *
 * @example
 * <OptionSelect
 * 	label='My component'
 * 	icon={icons.myIcon}
 * 	value={value}
 * 	onChange={setValue}
 * 	options={[
 * 		{ label: 'Option 1', value: 'option1' },
 * 		{ label: 'Option 2', value: 'option2' },
 * 	]}
 * />
 *
 * @preserve
 */
export const OptionSelect = (props) => {
	const {
		icon,
		label,
		subtitle,
		actions,
		help,
		inline,

		value,
		onChange,

		options,

		disabled,

		vertical,
		type = 'toggleButtons',

		className,
		itemClassName,

		wrapperProps,
		itemProps,

		noTriggerLabel,
		noTriggerIcon,

		children,

		...rest
	} = props;

	const currentItem = options?.find(({ value: optionValue }) => optionValue === value);

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			actions={actions}
			help={help}
			inline={inline}
			className={className}
			{...rest}
		>
			{type === 'toggleButtons' && (
				<ButtonGroup
					vertical={vertical}
					{...wrapperProps}
				>
					{options.map(
						({
							label: optionLabel,
							value: optionValue,
							icon: optionIcon,
							tooltip: optionTooltip,
							ariaLabel: optionAriaLabel,
						}) => (
							<ToggleButton
								key={optionValue}
								selected={optionValue === value}
								onChange={() => onChange(optionValue)}
								disabled={disabled}
								className={itemClassName}
								icon={typeof optionIcon === 'string' ? icons?.[optionIcon] : optionIcon}
								tooltip={optionTooltip}
								aria-label={optionAriaLabel ?? optionLabel ?? optionTooltip}
								{...itemProps}
							>
								{optionLabel}
							</ToggleButton>
						),
					)}
				</ButtonGroup>
			)}

			{(type === 'radios' || type === 'radiosSegmented') && (
				<RadioButtonGroup
					orientation={vertical ? 'vertical' : 'horizontal'}
					onChange={(v) => onChange(v)}
					design={type === 'radios' ? 'default' : 'segmented'}
					{...wrapperProps}
				>
					{options.map(({ label: optionLabel, value: optionValue, icon: optionIcon, ariaLabel: optionAriaLabel }) => (
						<RadioButton
							key={optionValue}
							value={optionValue}
							disabled={disabled}
							className={itemClassName}
							icon={typeof optionIcon === 'string' ? icons?.[optionIcon] : optionIcon}
							aria-label={optionAriaLabel ?? optionLabel}
							label={optionLabel}
							{...itemProps}
						/>
					))}
				</RadioButtonGroup>
			)}

			{type === 'menu' && (
				<Menu
					triggerLabel={!noTriggerLabel && currentItem?.label}
					triggerIcon={!noTriggerIcon && currentItem?.icon}
					keepOpen
					{...wrapperProps}
				>
					{options.map(({ label: optionLabel, value: optionValue, icon: optionIcon, ariaLabel: optionAriaLabel }) => (
						<MenuItem
							key={optionValue}
							selected={value === optionValue}
							disabled={disabled}
							className={itemClassName}
							icon={typeof optionIcon === 'string' ? icons?.[optionIcon] : optionIcon}
							aria-label={optionAriaLabel ?? optionLabel}
							onClick={() => onChange(optionValue)}
							{...itemProps}
						>
							{optionLabel}
						</MenuItem>
					))}
					{children}
				</Menu>
			)}
		</BaseControl>
	);
};
