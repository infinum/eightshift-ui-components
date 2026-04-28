import { __, sprintf } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ReactNode } from 'react';
import { componentGeneric, dropdownCaretAlt } from '../../icons/internal';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { ButtonGroup } from '../button/button';
import { Expandable } from '../expandable/expandable';
import { TriggeredPopover } from '../popover/popover';
import { Spacer } from '../spacer/spacer';
import { Switch } from '../toggle/switch';
import { ToggleButton } from '../toggle-button/toggle-button';

type ComponentToggleDesign = 'default' | 'compact' | 'compactLabel' | 'compactIcon';

type ComponentToggleProps = {
	children?: ReactNode;
	icon?: ReactNode;
	label: string;
	subtitle?: string;
	useComponent: boolean;
	onChange: (value: boolean) => void;
	noUseToggle?: boolean;
	noExpandButton?: boolean;
	noLabel?: boolean;
	expandButtonDisabled?: boolean;
	controlOnly?: boolean;
	hideUseToggleOnExpand?: boolean;
	contentClassName?: string;
	design?: ComponentToggleDesign;
	switchAriaLabel?: string;
	hidden?: boolean;
};

type LegacyExpandableProps = {
	children?: ReactNode;
	standalone?: boolean;
	icon?: ReactNode;
	label?: string;
	subtitle?: string;
	keepActionsOnExpand?: boolean;
	disabled?: boolean;
	noFocusHandling?: boolean;
};

type LegacyButtonGroupProps = {
	children?: ReactNode;
};

type LegacyTriggeredPopoverProps = {
	children?: ReactNode;
	triggerButtonProps?: {
		className?: string;
		tooltip?: string;
		disabled?: boolean;
	};
	triggerButtonIcon?: ReactNode;
	triggerButtonLabel?: string;
	className?: string;
};

type LegacyBaseControlProps = {
	children?: ReactNode;
	icon?: ReactNode;
	label?: string;
	subtitle?: string;
	actions?: ReactNode;
	disabled?: boolean;
};

const TypedExpandable = Expandable as unknown as (props: LegacyExpandableProps) => ReactNode;
const TypedButtonGroup = ButtonGroup as unknown as (props: LegacyButtonGroupProps) => ReactNode;
const TypedTriggeredPopover = TriggeredPopover as unknown as (props: LegacyTriggeredPopoverProps) => ReactNode;
const TypedBaseControl = BaseControl as unknown as (props: LegacyBaseControlProps) => ReactNode;

export const ComponentToggle = (props: ComponentToggleProps) => {
	const {
		children,
		icon,
		label,
		subtitle,
		useComponent,
		onChange,
		noLabel,
		noUseToggle,
		noExpandButton,
		controlOnly,
		expandButtonDisabled,
		hideUseToggleOnExpand,
		switchAriaLabel = __('Use component', 'eightshift-ui-components'),
		contentClassName = 'es:space-y-2.5',
		design = 'default',
		hidden,
	} = props;

	if (hidden) {
		return null;
	}

	if (controlOnly || (noLabel && noUseToggle && noExpandButton)) {
		return children;
	}

	if (design.startsWith('compact')) {
		const optionsLabel = sprintf(__('%s options', 'eightshift-ui-components'), label);
		const hasIcon = design === 'compact' || design === 'compactIcon';
		const hasLabel = design === 'compact' || design === 'compactLabel';

		return (
			<TypedButtonGroup>
				<ToggleButton
					icon={hasIcon ? (icon ?? componentGeneric) : undefined}
					tooltip={hasIcon && !noLabel ? label : undefined}
					selected={useComponent}
					onChange={onChange}
				>
					{hasLabel ? label : null}
				</ToggleButton>
				<TypedTriggeredPopover
					triggerButtonProps={{
						className: 'es:w-5.5 es:stroke-[1.25]',
						tooltip: optionsLabel,
						disabled: !useComponent,
					}}
					triggerButtonIcon={dropdownCaretAlt}
					className={clsx('es:w-74 es:p-2', contentClassName)}
				>
					<Spacer text={optionsLabel} />
					{children}
				</TypedTriggeredPopover>
			</TypedButtonGroup>
		);
	}

	if (noExpandButton) {
		return (
			<TypedBaseControl
				icon={icon ?? componentGeneric}
				label={!noLabel ? label : undefined}
				subtitle={subtitle}
				actions={
					!noUseToggle ? (
						<Switch
							checked={useComponent}
							onChange={onChange}
							aria-label={switchAriaLabel}
						/>
					) : undefined
				}
				disabled={!useComponent || expandButtonDisabled}
			>
				{noUseToggle ? children : null}

				{!noUseToggle ? (
					<AnimatedVisibility
						visible={useComponent}
						className={contentClassName}
						noInitial
					>
						{children}
					</AnimatedVisibility>
				) : null}
			</TypedBaseControl>
		);
	}

	return (
		<TypedExpandable
			standalone
			icon={
				!noUseToggle ? (
					<Switch
						checked={useComponent}
						onChange={onChange}
						aria-label={switchAriaLabel}
						size='medium'
					/>
				) : (
					(icon ?? componentGeneric)
				)
			}
			label={!noLabel ? label : undefined}
			subtitle={subtitle}
			keepActionsOnExpand={!hideUseToggleOnExpand}
			disabled={!useComponent || expandButtonDisabled}
			noFocusHandling
		>
			{!expandButtonDisabled ? <div className={contentClassName}>{children}</div> : null}
		</TypedExpandable>
	);
};
