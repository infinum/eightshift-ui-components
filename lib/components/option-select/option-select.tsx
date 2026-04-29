import { __ } from '@wordpress/i18n';
import { Fragment, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Icon } from '../../icons/internal';
import { BaseControl } from '../base-control/base-control';
import { ButtonGroup } from '../button/button';
import { Menu, MenuItem, MenuSeparator, SubMenuItem } from '../menu/menu';
import { RadioButton, RadioButtonGroup } from '../radio/radio';
import { RichLabel } from '../rich-label/rich-label';
import { ToggleButton } from '../toggle-button/toggle-button';

type OptionSelectType = 'toggleButtons' | 'toggleButtonsSplit' | 'radios' | 'radiosSegmented' | 'menu' | 'submenu' | 'standaloneMenuItems';
type OptionValue = string;
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

type OptionSelectProps = Omit<BaseControlProps, 'children' | 'actions' | 'icon' | 'label' | 'subtitle'> & {
	icon?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	actions?: ReactNode;
	value?: OptionValue;
	onChange: (value: OptionValue) => void;
	options: OptionItem[];
	disabled?: boolean;
	vertical?: boolean;
	type?: OptionSelectType;
	className?: string;
	itemClassName?: string;
	wrapperProps?: WrapperProps;
	itemProps?: ItemProps;
	noTriggerLabel?: boolean;
	noTriggerIcon?: boolean;
	tooltip?: ReactNode;
	noItemLabel?: boolean;
	noItemIcon?: boolean;
	children?: ReactNode;
	hidden?: boolean;
	'aria-label'?: string;
};

const renderOptionIcon = (icon?: IconValue) => (icon ? <Icon icon={icon} /> : null);

export const OptionSelect = (props: OptionSelectProps) => {
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
		if (typeof optionTooltip === 'string' || typeof optionTooltip === 'boolean') {
			return optionTooltip;
		}

		if (optionAriaLabel) {
			return optionAriaLabel;
		}

		if (noItemLabel && typeof optionLabel === 'string') {
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
				<Fragment key={optionValue}>
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
						aria-label={optionAriaLabel ?? (typeof optionLabel === 'string' ? optionLabel : undefined)}
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
					aria-label={typeof label !== 'undefined' ? undefined : ariaLabel}
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
								key={optionValue}
								selected={optionValue === value}
								onChange={() => onChange(optionValue)}
								disabled={optionDisabled || disabled}
								className={itemClassName}
								icon={!noItemIcon ? renderOptionIcon(optionIcon) : null}
								tooltip={getToggleTooltip(optionTooltip, optionAriaLabel, optionLabel)}
								aria-label={optionAriaLabel ?? (typeof optionLabel === 'string' ? optionLabel : undefined)}
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
					onChange={(nextValue) => onChange(nextValue)}
					design={radioDesign}
					aria-label={typeof label !== 'undefined' ? undefined : ariaLabel}
					value={value}
					{...wrapperProps}
				>
					{options.map(({ label: optionLabel, value: optionValue, icon: optionIcon, ariaLabel: optionAriaLabel, subtitle: optionSubtitle, disabled: optionDisabled }) => (
						<RadioButton
							key={optionValue}
							value={optionValue}
							disabled={optionDisabled || disabled}
							className={itemClassName}
							subtitle={!noItemLabel ? optionSubtitle : undefined}
							icon={!noItemIcon ? renderOptionIcon(optionIcon) : null}
							aria-label={optionAriaLabel ?? (typeof optionLabel === 'string' ? optionLabel : undefined)}
							label={!noItemLabel ? optionLabel : undefined}
							{...itemProps}
						/>
					))}
				</RadioButtonGroup>
			) : null}

			{type === 'menu' ? (
				<Menu
					triggerLabel={resolvedMenuTriggerLabel}
					triggerIcon={resolvedTriggerIcon}
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
							typeof label !== 'undefined' ? undefined : (ariaLabel ?? (typeof label === 'string' ? label : undefined) ?? (typeof tooltip === 'string' ? tooltip : undefined)),
					}}
					keepOpen
					aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined) ?? (typeof tooltip === 'string' ? tooltip : undefined) ?? __('Menu', 'eightshift-ui-components')}
					{...wrapperProps}
				>
					{renderMenuOptions()}
					{children}
				</Menu>
			) : null}
		</BaseControl>
	);
};
