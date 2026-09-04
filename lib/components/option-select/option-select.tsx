import { __ } from '@wordpress/i18n';
import { Fragment, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Icon } from '../../icons/internal';
import { BaseControl } from '../base-control/base-control';
import { ButtonGroup } from '../button/button';
import { Menu, MenuItem, MenuSeparator, SubMenuItem } from '../menu/menu';
import { RadioButton, RadioButtonGroup } from '../radio/radio';
import { RichLabel } from '../rich-label/rich-label';
import { ToggleButton } from '../toggle-button/toggle-button';
import type { Prettify } from '../../utilities/types';

type OptionSelectType = 'toggleButtons' | 'toggleButtonsSplit' | 'radios' | 'radiosSegmented' | 'menu' | 'submenu' | 'standaloneMenuItems';
type OptionValue = string | number | boolean | null | undefined;
type IconValue = string | JSX.Element | null;
type OptionSeparator = boolean | 'above' | 'below';

type OptionItem = {
	label?: ReactNode;
	value: OptionValue;
	tooltip?: ReactNode;
	icon?: IconValue;
	endIcon?: IconValue;
	ariaLabel?: string;
	subtitle?: ReactNode;
	shortcut?: ReactNode;
	disabled?: boolean;
	separator?: OptionSeparator;
	sectionTitle?: ReactNode;
	sectionIcon?: IconValue;
	sectionSubtitle?: ReactNode;
	sectionEndIcon?: IconValue;
};

type WrapperProps = Partial<
	ComponentPropsWithoutRef<typeof ButtonGroup> &
		ComponentPropsWithoutRef<typeof RadioButtonGroup> &
		ComponentPropsWithoutRef<typeof Menu> &
		ComponentPropsWithoutRef<typeof SubMenuItem>
>;

type ItemProps = Partial<ComponentPropsWithoutRef<typeof ToggleButton> & ComponentPropsWithoutRef<typeof RadioButton> & ComponentPropsWithoutRef<typeof MenuItem>>;

type BaseControlProps = ComponentPropsWithoutRef<typeof BaseControl>;

const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

const isBooleanValue = <T,>(value: T): value is T & boolean => Object.prototype.toString.call(value) === '[object Boolean]';

type OptionSelectProps = Omit<BaseControlProps, 'children' | 'actions' | 'icon' | 'label' | 'subtitle'> & {
	/** Icon to display in the label. */
	icon?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Subtitle to display below the label. */
	subtitle?: ReactNode;
	/** Actions to show to the right of the label. */
	actions?: ReactNode;
	/** The currently selected value. */
	value?: OptionValue;
	/** Function to run when the selected value changes. */
	onChange: (value: OptionValue) => void;
	/** The list of options to choose from. */
	options: OptionItem[];
	/** If `true`, the option select component is disabled. */
	disabled?: boolean;
	/** If `true`, the options are displayed vertically. Not applicable to the `menu` type. */
	vertical?: boolean;
	/** The type of the option select component. Defaults to `'toggleButtons'`. */
	type?: OptionSelectType;
	/** Classes to pass to the main element wrapper. */
	className?: string;
	/** Classes to pass to each item. */
	itemClassName?: string;
	/** Props to pass to the wrapper. */
	wrapperProps?: WrapperProps;
	/** Props to pass to each item. */
	itemProps?: ItemProps;
	/** Whether the trigger label should be hidden. Applies only to the `menu` type. */
	noTriggerLabel?: boolean;
	/** Whether the trigger icon should be hidden. Applies only to the `menu` type. */
	noTriggerIcon?: boolean;
	/** If provided, overrides the default tooltip text. If there is no label, the value will still be shown within the tooltip. Applies only to the `menu` type. If `true` is set and an `aria-label` is provided, the tooltip will show the same text as the `aria-label`. */
	tooltip?: ReactNode;
	/** Whether the option label should be hidden. */
	noItemLabel?: boolean;
	/** Whether the option icon should be hidden. */
	noItemIcon?: boolean;
	children?: ReactNode;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	'aria-label'?: string;
};

const getOptionKey = (value: OptionValue) => {
	if (value === null) {
		return 'null';
	}

	if (value === undefined) {
		return 'undefined';
	}

	return JSON.stringify([value]);
};

const renderOptionIcon = (icon?: IconValue) => (icon ? <Icon icon={icon} /> : null);

/**
 * A component that allows the user to select an option from a list of options.
 *
 * @component
 * @param {OptionSelectProps} props - Component props.
 *
 * @returns {JSX.Element} The OptionSelect component.
 *
 * @example
 * <OptionSelect
 * 	label='My component'
 * 	icon={myIcon}
 * 	value={value}
 * 	onChange={setValue}
 * 	options={[
 * 		{ label: 'Option 1', value: 'option1' },
 * 		{ label: 'Option 2', value: 'option2' },
 * 	]}
 * />
 */
export const OptionSelect = (props: Prettify<OptionSelectProps>) => {
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

	if (rawTooltip === true && ariaLabel?.length) {
		tooltip = ariaLabel;
	}

	const currentItem = options.find(({ value: optionValue }) => optionValue === value);
	const notSetLabel = <span className='es:leading-3 es:opacity-50'>{__('Not set', 'eightshift-ui-components')}</span>;
	const radioDesign = type === 'radiosSegmented' ? 'segmented' : 'default';
	const resolvedTriggerLabel = noTriggerLabel ? null : (label ?? currentItem?.label ?? notSetLabel);
	const resolvedMenuTriggerLabel = noTriggerLabel ? null : (currentItem?.label ?? label ?? notSetLabel);
	const resolvedTriggerIcon = (() => {
		if (noTriggerIcon) {
			return null;
		}

		if (currentItem) {
			return renderOptionIcon(currentItem.icon);
		}

		if (noTriggerLabel || noTriggerIcon) {
			return notSetLabel;
		}

		return icon;
	})();

	const renderOptionContent = (optionLabel?: ReactNode, optionSubtitle?: ReactNode) => {
		if (noItemLabel) {
			return null;
		}

		if (!optionSubtitle) {
			return optionLabel;
		}

		return (
			<RichLabel
				label={optionLabel}
				subtitle={optionSubtitle}
				noColor
			/>
		);
	};

	const getToggleTooltip = (optionTooltip?: ReactNode, optionAriaLabel?: string, optionLabel?: ReactNode) => {
		if (isStringValue(optionTooltip) || isBooleanValue(optionTooltip)) {
			return optionTooltip;
		}

		if (optionAriaLabel) {
			return optionAriaLabel;
		}

		if (noItemLabel && isStringValue(optionLabel)) {
			return optionLabel;
		}

		return undefined;
	};

	const renderMenuOptions = () =>
		options.map(
			({
				label: optionLabel,
				value: optionValue,
				icon: optionIcon,
				endIcon: optionEndIcon,
				ariaLabel: optionAriaLabel,
				subtitle: optionSubtitle,
				separator: optionHasSeparator,
				sectionTitle: optionSectionTitle,
				sectionIcon: optionSectionIcon,
				sectionSubtitle: optionSectionSubtitle,
				sectionEndIcon: optionSectionEndIcon,
				shortcut: optionShortcut,
				disabled: optionDisabled,
			}) => (
				<Fragment key={getOptionKey(optionValue)}>
					{optionHasSeparator === true || optionHasSeparator === 'above' ? <MenuSeparator /> : null}
					{optionSectionTitle ? (
						<MenuItem
							icon={renderOptionIcon(optionSectionIcon)}
							endIcon={renderOptionIcon(optionSectionEndIcon)}
							subtitle={optionSectionSubtitle}
							disabled
						>
							{optionSectionTitle}
						</MenuItem>
					) : null}
					<MenuItem
						selected={value === optionValue}
						disabled={optionDisabled || disabled}
						className={itemClassName}
						icon={!noItemIcon ? renderOptionIcon(optionIcon) : null}
						endIcon={!noItemIcon ? renderOptionIcon(optionEndIcon) : null}
						aria-label={optionAriaLabel ?? (isStringValue(optionLabel) ? optionLabel : undefined)}
						onClick={() => onChange(optionValue)}
						shortcut={optionShortcut}
						{...itemProps}
					>
						{renderOptionContent(optionLabel, optionSubtitle)}
					</MenuItem>
					{optionHasSeparator === 'below' ? <MenuSeparator /> : null}
				</Fragment>
			),
		);

	if (type === 'submenu') {
		return (
			<SubMenuItem
				trigger={
					<MenuItem icon={resolvedTriggerIcon}>
						<RichLabel
							label={resolvedTriggerLabel}
							subtitle={subtitle === true ? currentItem?.label : subtitle}
							noColor
						/>
					</MenuItem>
				}
				{...wrapperProps}
			>
				{renderMenuOptions()}
				{children}
			</SubMenuItem>
		);
	}

	if (type === 'standaloneMenuItems') {
		return (
			<>
				{renderMenuOptions()}
				{children}
			</>
		);
	}

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
			{['toggleButtons', 'toggleButtonsSplit'].includes(type) ? (
				<ButtonGroup
					vertical={vertical}
					aria-label={label !== undefined ? undefined : ariaLabel}
					type={type === 'toggleButtonsSplit' ? 'split' : 'segmented'}
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
								key={getOptionKey(optionValue)}
								selected={optionValue === value}
								onChange={() => onChange(optionValue)}
								disabled={optionDisabled || disabled}
								className={itemClassName}
								icon={!noItemIcon ? renderOptionIcon(optionIcon) : null}
								tooltip={getToggleTooltip(optionTooltip, optionAriaLabel, optionLabel)}
								aria-label={optionAriaLabel ?? (isStringValue(optionLabel) ? optionLabel : undefined)}
								{...itemProps}
							>
								{renderOptionContent(optionLabel, optionSubtitle)}
							</ToggleButton>
						),
					)}
				</ButtonGroup>
			) : null}

			{type === 'radios' || type === 'radiosSegmented' ? (
				<RadioButtonGroup
					orientation={vertical ? 'vertical' : 'horizontal'}
					onChange={(nextValue) => {
						const nextItem = options.find(({ value: optionValue }) => getOptionKey(optionValue) === nextValue);

						if (nextItem) {
							onChange(nextItem.value);
						}
					}}
					design={radioDesign}
					aria-label={label !== undefined ? undefined : ariaLabel}
					value={currentItem ? getOptionKey(currentItem.value) : undefined}
					{...wrapperProps}
				>
					{options.map(({ label: optionLabel, value: optionValue, icon: optionIcon, ariaLabel: optionAriaLabel, subtitle: optionSubtitle, disabled: optionDisabled }) => (
						<RadioButton
							key={getOptionKey(optionValue)}
							value={getOptionKey(optionValue)}
							disabled={optionDisabled || disabled}
							className={itemClassName}
							subtitle={!noItemLabel ? optionSubtitle : undefined}
							icon={!noItemIcon ? renderOptionIcon(optionIcon) : null}
							aria-label={optionAriaLabel ?? (isStringValue(optionLabel) ? optionLabel : undefined)}
							label={!noItemLabel ? optionLabel : undefined}
							{...itemProps}
						/>
					))}
				</RadioButtonGroup>
			) : null}

			{type === 'menu' ? (
				<Menu
					triggerLabel={currentItem ? resolvedMenuTriggerLabel : notSetLabel}
					triggerIcon={currentItem ? resolvedTriggerIcon : undefined}
					tooltip={
						noTriggerLabel ? (
							<RichLabel
								label={tooltip || currentItem?.tooltip || currentItem?.label}
								subtitle={tooltip ? currentItem?.tooltip || currentItem?.label : undefined}
								noColor
							/>
						) : (
							tooltip
						)
					}
					triggerProps={{
						...wrapperProps?.triggerProps,
						'aria-label':
							label !== undefined ? undefined : (ariaLabel ?? (isStringValue(label) ? label : undefined) ?? (isStringValue(tooltip) ? tooltip : undefined)),
					}}
					keepOpen
					aria-label={ariaLabel ?? (isStringValue(label) ? label : undefined) ?? (isStringValue(tooltip) ? tooltip : undefined) ?? __('Menu', 'eightshift-ui-components')}
					{...wrapperProps}
				>
					{renderMenuOptions()}
					{children}
				</Menu>
			) : null}
		</BaseControl>
	);
};
