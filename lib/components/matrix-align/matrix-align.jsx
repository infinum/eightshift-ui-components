import { useState, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { Popover } from '../popover/popover';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { camelCase, upperFirst } from '../../utilities/text-helpers';
import { classnames } from '../../utilities/classnames';
import { Tooltip } from '../tooltip/tooltip';
import { IconLabel } from '../icon-label/icon-label';

/**
 * A component that can provide a 3x3 or a 2x2 grid of positions to pick from.
 * Replaces the default Gutenberg `AlignmentMatrixControl`/`BlockAlignmentMatrixControl`/`BlockAlignmentMatrixToolbar`.
 *
 * @typedef {'wp'|'tileButton'|'inline'} MatrixAlignControlType
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - MatrixAlignControl options.
 * @param {MatrixAlignControlType} [props.type='wp']          - Style of the option trigger. `wp` replicates the default Gutenberg control, `tileButton` shows a regular button that fits with a `tileButton` IconToggle well.
 * @param {'3x3'|'2x2'} [props.size='3x3']                    - Defines the matrix size to show. Can be either `3x3` or `2x2`.
 * @param {React.Component?} [props.label]                    - Label displayed on the trigger button. (tooltip when style is `wp`, text label below icon when style is `tileButton`)
 * @param {string} props.value                                - Current value.
 * @param {function} [props.onChange]                         - Function that is called on every value change.
 * @param {string?} [props.additionalTriggerClasses]          - If provided, the classes are appended to the trigger button.
 * @param {React.Component?} [props.icon]                     - Icon to show next to the label
 * @param {React.Component?} [props.subtitle]                 - Subtitle below the label.
 * @param {boolean?} [props.noBottomSpacing]                  - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing]             - If `true`, space below the control is reduced.
 * @param {AppearOrigin} [props.popoverPosition='top center'] - Position where the popover appears.
 */
export const MatrixAlign = (props) => {
	const {
		size = '3x3',

		value,
		onChange,

		tooltip = __('Position', 'eightshift-components'),

		label,
		icon,
		subtitle,

		'aria-label': ariaLabel,

		popoverPosition,
	} = props;
	const [currentValue, setCurrentValue] = useState(value);
	const [tooltipText, setTooltipText] = useState(null);
	const [popoverOpen, setPopoverOpen] = useState(false);

	const ref = useRef(null);

	const allSizeOptions = [
		{
			value: 'top left',
			label: __('Top-left', 'eightshift-components'),
			availableOn: ['3x3', '2x2'],
		},
		{
			value: 'top center',
			label: __('Top-center', 'eightshift-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'top right',
			label: __('Top-right', 'eightshift-components'),
			availableOn: ['3x3', '2x2'],
		},
		{
			value: 'center left',
			label: __('Center-left', 'eightshift-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'center center',
			label: __('Center', 'eightshift-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'center right',
			label: __('Center-right', 'eightshift-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'bottom left',
			label: __('Bottom-left', 'eightshift-components'),
			availableOn: ['3x3', '2x2'],
		},
		{
			value: 'bottom center',
			label: __('Bottom-center', 'eightshift-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'bottom right',
			label: __('Bottom-right', 'eightshift-components'),
			availableOn: ['3x3', '2x2'],
		},
	];

	// Set icons for (in)active options.
	const sizeOptions = allSizeOptions
		.filter(({ availableOn }) => availableOn.includes(size))
		.map((item) => ({
			...item,
			icon:
				item.value === currentValue
					? icons.matrixAlignControlDotActive
					: icons.matrixAlignControlDotInactive,
		}));

	const Trigger = ({ wrapperClassName }) => (
		<Button
			icon={icons[`position${size}${upperFirst(camelCase(currentValue))}`]}
			onPress={() => {
				setPopoverOpen(true);
			}}
			forwardedRef={ref}
			tooltip={tooltip}
			wrapperClassName={wrapperClassName}
		>
			{!(icon || subtitle) && label}
		</Button>
	);

	return (
		<>
			{(icon || label || subtitle) && (
				<div className='es-uic-flex es-uic-w-full es-uic-items-center es-uic-gap-1'>
					<IconLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
					/>

					<Trigger wrapperClassName='es-uic-ml-auto' />
				</div>
			)}

			{!(icon || label || subtitle) && <Trigger />}

			<Popover
				aria-label={ariaLabel ?? __('Select position', 'eightshift-components')}
				position={popoverPosition}
				triggerRef={ref}
				onOpenChange={(isOpen) => {
					setPopoverOpen(isOpen);
					if (!isOpen) {
						onChange(currentValue);
					}
				}}
				isOpen={popoverOpen}
				ariaLabel={label ?? tooltip}
			>
				<Tooltip
					text={tooltipText}
					side='bottom'
					delayDuration={200}
					open={popoverOpen && tooltipText !== null}
					offset={10}
				>
					<div
						className={classnames(
							'grid',
							size === '3x3' && 'es-uic-grid-cols-3 es-uic-grid-rows-3',
							size === '2x2' && 'es-uic-grid-cols-2 es-uic-grid-rows-2',
						)}
					>
						{sizeOptions.map(({ value, label, icon }) => (
							<Button
								key={value}
								icon={icon}
								type='ghost'
								onHoverStart={() => setTooltipText(label)}
								onHoverEnd={() => setTooltipText(null)}
								onFocus={() => setTooltipText(label)}
								onClick={() => {
									setCurrentValue(value);
									setTooltipText(null);
									setPopoverOpen(false);
								}}
							/>
						))}
					</div>
				</Tooltip>
			</Popover>
		</>
	);
};
