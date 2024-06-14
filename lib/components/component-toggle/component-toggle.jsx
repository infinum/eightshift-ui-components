import { __, sprintf } from '@wordpress/i18n';
import { Expandable } from '../expandable/expandable';
import { icons } from '../../icons/icons';
import { Switch } from '../toggle/switch';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { TriggeredPopover } from '../popover/popover';
import { ButtonGroup } from '../button/button';
import { ToggleButton } from '../toggle-button/toggle-button';
import { Spacer } from '../spacer/spacer';
import { clsx } from 'clsx/lite';

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
 * @param {boolean} [props.expandButtonDisabled] - If `true`, the expand button is disabled.
 * @param {boolean} [props.controlOnly] - If `true`, only the control is displayed.
 * @param {string} [props.contentClassName] - Classes to pass to the content container.
 * @param {ComponentToggleDesign} [props.design='default'] - Design of the component.
 *
 * @returns {JSX.Element} The ComponentToggle component.
 *
 * @typedef {'default' | 'compact' | 'compactLabel'} ComponentToggleDesign
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
		noUseToggle,
		expandButtonDisabled,
		controlOnly,
		contentClassName = 'es-uic-space-y-2.5',
		design = 'default',
	} = props;

	if (controlOnly) {
		return children;
	}

	if (design.startsWith('compact')) {
		const optionsLabel = sprintf(__('%s options', 'eightshift-ui-components'), label);

		return (
			<ButtonGroup>
				<ToggleButton
					icon={design === 'compact' && (icon ?? icons.componentGeneric)}
					tooltip={design === 'compact' && label}
					selected={useComponent}
					onChange={onChange}
				>
					{design === 'compactLabel' && label}
				</ToggleButton>
				<TriggeredPopover
					triggerButtonProps={{
						className: 'es-uic-w-5.5 es-uic-stroke-[1.25]',
						tooltip: optionsLabel,
						disabled: !useComponent,
					}}
					triggerButtonIcon={icons.dropdownCaretAlt}
					className={clsx('es-uic-w-72 es-uic-p-2', contentClassName)}
				>
					<Spacer text={optionsLabel} />
					{children}
				</TriggeredPopover>
			</ButtonGroup>
		);
	}

	return (
		<Expandable
			icon={icon ?? icons.componentGeneric}
			label={label}
			subtitle={subtitle}
			actions={
				!noUseToggle && (
					<DecorativeTooltip text={__('Toggle component', 'eightshift-ui-components')}>
						<div className='es-uic-mr-0.5 es-uic-flex es-uic-min-h-8 es-uic-items-center es-uic-border-r es-uic-border-r-gray-200 es-uic-pr-1.5'>
							<Switch
								checked={useComponent}
								onChange={onChange}
							/>
						</div>
					</DecorativeTooltip>
				)
			}
			disabled={!useComponent || expandButtonDisabled}
		>
			{!expandButtonDisabled && <div className={contentClassName}>{children}</div>}
		</Expandable>
	);
};
