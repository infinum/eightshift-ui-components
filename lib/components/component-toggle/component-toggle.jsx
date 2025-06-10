import { __, sprintf } from '@wordpress/i18n';
import { Expandable } from '../expandable/expandable';
import { icons } from '../../icons/icons';
import { Switch } from '../toggle/switch';
import { TriggeredPopover } from '../popover/popover';
import { ButtonGroup } from '../button/button';
import { ToggleButton } from '../toggle-button/toggle-button';
import { BaseControl } from '../base-control/base-control';
import { Spacer } from '../spacer/spacer';
import { clsx } from 'clsx/lite';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';

/**
 * A component that provides a nice way to toggle a component on and off, and display its content in an expandable panel.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} props.label - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {boolean} props.useComponent - Whether the component is used. If `false`, the content is hidden.
 * @param {Function} props.onChange - Function to run when the toggle state changes.
 * @param {boolean} [props.noUseToggle] - If `true`, the toggle is not displayed.
 * @param {boolean} [props.noExpandButton] - If `true`, the expand button is not shown.
 * @param {boolean} [props.noLabel] - If `true`, the label is not shown.
 * @param {boolean} [props.expandButtonDisabled] - If `true`, the expand button is disabled.
 * @param {boolean} [props.controlOnly] - If `true`, only the control is displayed.
 * @param {boolean} [props.hideUseToggleOnExpand] - If `true`, and the component is display in a variant where it can be expanded, the use toggle will hide when the component is expanded.
 * @param {string} [props.contentClassName] - Classes to pass to the content container.
 * @param {ComponentToggleDesign} [props.design='default'] - Design of the component.
 * @param {string} [props.switchAriaLabel] - ARIA label of the toggle switch.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The ComponentToggle component.
 *
 * @typedef {'default' | 'compact' | 'compactLabel' | 'compactIcon'} ComponentToggleDesign
 *
 * @example
 * <ComponentToggle
 * 	label='My component'
 * 	useComponent={useComponent}
 * 	onChange={setUseComponent}
 * >
 * 	...
 * </ComponentToggle>
 *
 * @preserve
 */
export const ComponentToggle = (props) => {
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
			<ButtonGroup>
				<ToggleButton
					icon={hasIcon && (icon ?? icons.componentGeneric)}
					tooltip={hasIcon && !noLabel && label}
					selected={useComponent}
					onChange={onChange}
				>
					{hasLabel && label}
				</ToggleButton>
				<TriggeredPopover
					triggerButtonProps={{
						className: 'es:w-5.5 es:stroke-[1.25]',
						tooltip: optionsLabel,
						disabled: !useComponent,
					}}
					triggerButtonIcon={icons.dropdownCaretAlt}
					className={clsx('es:w-[18.5rem] es:p-2', contentClassName)}
				>
					<Spacer text={optionsLabel} />
					{children}
				</TriggeredPopover>
			</ButtonGroup>
		);
	}

	if (noExpandButton) {
		return (
			<BaseControl
				icon={icon ?? icons.componentGeneric}
				label={!noLabel && label}
				subtitle={subtitle}
				actions={
					!noUseToggle && (
						<Switch
							checked={useComponent}
							onChange={onChange}
							aria-label={switchAriaLabel}
						/>
					)
				}
				disabled={!useComponent || expandButtonDisabled}
			>
				{noUseToggle && children}

				{!noUseToggle && (
					<AnimatedVisibility
						visible={useComponent}
						className={contentClassName}
						noInitial
					>
						{children}
					</AnimatedVisibility>
				)}
			</BaseControl>
		);
	}

	return (
		<Expandable
			icon={icon ?? icons.componentGeneric}
			label={!noLabel && label}
			subtitle={subtitle}
			keepActionsOnExpand={!hideUseToggleOnExpand}
			actions={
				!noUseToggle && (
					<Switch
						checked={useComponent}
						onChange={onChange}
					/>
				)
			}
			disabled={!useComponent || expandButtonDisabled}
			noFocusHandling
		>
			{!expandButtonDisabled && <div className={contentClassName}>{children}</div>}
		</Expandable>
	);
};
