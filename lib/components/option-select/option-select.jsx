import { Fragment } from 'react';
import { icons } from '../../icons/icons';
import { BaseControl } from '../base-control/base-control';
import { ButtonGroup } from '../button/button';
import { Menu, MenuItem, MenuSeparator } from '../menu/menu';
import { RadioButton, RadioButtonGroup } from '../radio/radio';
import { RichLabel } from '../rich-label/rich-label';
import { ToggleButton } from '../toggle-button/toggle-button';
import { __ } from '@wordpress/i18n';

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
 * @param {{label: string, value: any, tooltip: string|JSX.Element, icon: JSX.Element|string, ariaLabel: string, subtitle:string|JSX.Element }[]} props.options - The list of options to choose from.
 * @param {string} [props.disabled] - If `true`, the option select component is disabled.
 * @param {boolean} [props.vertical] - If `true`, the options are displayed vertically. Not applicable to the `menu` type.
 * @param {OptionSelectType} [props.type='toggleButton'] - The type of the option select component.
 * @param {string} [props.className] - Classes to pass to the main element wrapper.
 * @param {string} [props.itemClassName] - Classes to pass to each item.
 * @param {Object} [props.wrapperProps] - Props to pass to the wrapper.
 * @param {Object} [props.itemProps] - Props to pass to each item.
 * @param {boolean} [props.noTriggerLabel] - Whether the trigger label should be hidden. Applies only to the `menu` type.
 * @param {boolean} [props.noTriggerIcon] - Whether the trigger icon should be hidden. Applies only to the `menu` type.
 * @param {string|boolean} [props.tooltip] - If provided, overrides the default tooltip text. If there is no label, the value will still be shown within the tooltip. Applies only to the `menu` type. If `true` is set and an `aria-label` is provided, the tooltip will show the same text as the `aria-label`.
 * @param {boolean} [props.noItemLabel] - Whether the option label should be hidden.
 * @param {boolean} [props.noItemIcon] - Whether the option icon should be hidden.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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
		tooltip: rawTooltip,

		noItemLabel,
		noItemIcon,

		children,

		hidden,

		'aria-label': ariaLabel,

		...rest
	} = props;

	if (hidden) {
		return null;
	}

	let tooltip = rawTooltip;

	if (rawTooltip === true && ariaLabel?.length > 0) {
		tooltip = ariaLabel;
	}

	const currentItem = options?.find(({ value: optionValue }) => optionValue === value);

	const notSetLabel = <span className='es-uic-leading-3 es-uic-opacity-50'>{__('Not set', 'eightshift-ui-components')}</span>;

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
					aria-label={typeof label !== 'undefined' ? null : ariaLabel}
					{...wrapperProps}
				>
					{options.map(
						({
							label: optionLabel,
							value: optionValue,
							icon: optionIcon,
							tooltip: optionTooltip,
							ariaLabel: optionAriaLabel,
							subtitle: optionSubtitle,
							disabled: optionDisabled,
						}) => (
							<ToggleButton
								key={optionValue}
								selected={optionValue === value}
								onChange={() => onChange(optionValue)}
								disabled={optionDisabled || disabled}
								className={itemClassName}
								icon={!noItemIcon && (typeof optionIcon === 'string' ? icons?.[optionIcon] : optionIcon)}
								tooltip={optionTooltip ?? optionAriaLabel ?? (noItemLabel && optionLabel)}
								aria-label={optionAriaLabel ?? optionLabel ?? optionTooltip}
								{...itemProps}
							>
								{!noItemLabel && !optionSubtitle && optionLabel}
								{!noItemLabel && optionSubtitle && (
									<RichLabel
										label={optionLabel}
										subtitle={optionSubtitle}
										noColor
									/>
								)}
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
					aria-label={typeof label !== 'undefined' ? null : ariaLabel}
					value={value}
					{...wrapperProps}
				>
					{options.map(({ label: optionLabel, value: optionValue, icon: optionIcon, ariaLabel: optionAriaLabel, subtitle: optionSubtitle, disabled: optionDisabled }) => (
						<RadioButton
							key={optionValue}
							value={optionValue}
							disabled={optionDisabled || disabled}
							className={itemClassName}
							subtitle={!noItemLabel && optionSubtitle}
							icon={!noItemIcon && (typeof optionIcon === 'string' ? icons?.[optionIcon] : optionIcon)}
							aria-label={optionAriaLabel ?? optionLabel}
							label={!noItemLabel && optionLabel}
							{...itemProps}
						/>
					))}
				</RadioButtonGroup>
			)}

			{type === 'menu' && (
				<Menu
					triggerLabel={noTriggerLabel ? null : (currentItem?.label ?? notSetLabel)}
					triggerIcon={
						!noTriggerIcon &&
						// eslint-disable-next-line no-nested-ternary
						(currentItem ? (typeof currentItem?.icon === 'string' ? icons?.[currentItem?.icon] : currentItem?.icon) : (noTriggerLabel || noTriggerIcon) && notSetLabel)
					}
					tooltip={
						noTriggerLabel ? (
							<RichLabel
								label={tooltip ? tooltip : (currentItem?.tooltip ?? currentItem?.label)}
								subtitle={tooltip && (currentItem?.tooltip ?? currentItem?.label)}
								noColor
							/>
						) : (
							tooltip
						)
					}
					triggerProps={{
						...wrapperProps?.triggerProps,
						'aria-label': typeof label !== 'undefined' ? null : (ariaLabel ?? label ?? tooltip),
					}}
					keepOpen
					aria-label={ariaLabel ?? label ?? tooltip ?? __('Menu', 'eightshift-ui-components')}
					{...wrapperProps}
				>
					{options.map(
						({
							label: optionLabel,
							value: optionValue,
							icon: optionIcon,
							endIcon: optionEndIcon,
							ariaLabel: optionAriaLabel,
							subtitle: optionSubtitle,
							separator: optionHasSeparator,
							sectionTitle: optionSectionTitle,
							shortcut: optionShortcut,
							disabled: optionDisabled,
						}) => (
							<Fragment key={optionValue}>
								{(optionHasSeparator === true || optionHasSeparator === 'above') && <MenuSeparator />}
								{optionSectionTitle && <MenuItem disabled>{optionSectionTitle}</MenuItem>}
								<MenuItem
									selected={value === optionValue}
									disabled={optionDisabled || disabled}
									className={itemClassName}
									icon={!noItemIcon && (typeof optionIcon === 'string' ? icons?.[optionIcon] : optionIcon)}
									endIcon={!noItemIcon && (typeof optionEndIcon === 'string' ? icons?.[optionEndIcon] : optionEndIcon)}
									aria-label={optionAriaLabel ?? optionLabel}
									onClick={() => onChange(optionValue)}
									shortcut={optionShortcut}
									{...itemProps}
								>
									{!noItemLabel && !optionSubtitle && optionLabel}
									{!noItemLabel && optionSubtitle && (
										<RichLabel
											label={optionLabel}
											subtitle={optionSubtitle}
											noColor
										/>
									)}
								</MenuItem>
								{optionHasSeparator === 'below' && <MenuSeparator />}
							</Fragment>
						),
					)}
					{children}
				</Menu>
			)}
		</BaseControl>
	);
};
