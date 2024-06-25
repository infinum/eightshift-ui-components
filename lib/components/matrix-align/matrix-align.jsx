import { useState, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { Popover } from '../popover/popover';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { camelCase, upperFirst } from '../../utilities';
import { clsx } from 'clsx/lite';

import { Tooltip } from '../tooltip/tooltip';
import { BaseControl } from '../base-control/base-control';

/**
 * A component that can provide a 3x3 or a 2x2 grid of positions to pick from.
 * Replaces the default Gutenberg `AlignmentMatrixControl`/`BlockAlignmentMatrixControl`/`BlockAlignmentMatrixToolbar`.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {MatrixSize} [props.size='3x3'] - The size of the matrix. Can be either '3x3' or '2x2'.
 * @param {string} props.value - The currently selected value.
 * @param {Function} props.onChange - Function to run when the selection changes.
 * @param {string} [props.tooltip='Position'] - Tooltip text to display on the trigger button.
 * @param {string} [props.label] - Label to display.
 * @param {JSX.Element} [props.icon] - Icon to display within the button.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.popoverPosition='bottom'] - The position of the popover.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The MatrixAlign component.
 *
 * @typedef {'3x3' | '2x2'} MatrixSize
 * @typedef {'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom'} PopoverPosition
 *
 * @example
 * <MatrixAlign
 * 		size='3x3'
 * 		value='top left'
 * 		onChange={setAlignment}
 * />
 *
 * @preserve
 */
export const MatrixAlign = (props) => {
	const {
		size = '3x3',

		value,
		onChange,

		tooltip = __('Position', 'eightshift-ui-components'),

		label,
		icon,
		subtitle,

		'aria-label': ariaLabel,

		popoverPosition,

		hidden,
	} = props;

	const [currentValue, setCurrentValue] = useState(value);
	const [tooltipText, setTooltipText] = useState(null);
	const [popoverOpen, setPopoverOpen] = useState(false);

	const ref = useRef(null);
	const innerRef = useRef(null);

	if (hidden) {
		return null;
	}

	const allSizeOptions = [
		{
			value: 'top left',
			label: __('Top-left', 'eightshift-ui-components'),
			availableOn: ['3x3', '2x2'],
		},
		{
			value: 'top center',
			label: __('Top-center', 'eightshift-ui-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'top right',
			label: __('Top-right', 'eightshift-ui-components'),
			availableOn: ['3x3', '2x2'],
		},
		{
			value: 'center left',
			label: __('Center-left', 'eightshift-ui-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'center center',
			label: __('Center', 'eightshift-ui-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'center right',
			label: __('Center-right', 'eightshift-ui-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'bottom left',
			label: __('Bottom-left', 'eightshift-ui-components'),
			availableOn: ['3x3', '2x2'],
		},
		{
			value: 'bottom center',
			label: __('Bottom-center', 'eightshift-ui-components'),
			availableOn: ['3x3'],
		},
		{
			value: 'bottom right',
			label: __('Bottom-right', 'eightshift-ui-components'),
			availableOn: ['3x3', '2x2'],
		},
	];

	// Set icons for (in)active options.
	const sizeOptions = allSizeOptions
		.filter(({ availableOn }) => availableOn.includes(size))
		.map((item) => ({
			...item,
			icon: item.value === currentValue ? icons.matrixAlignControlDotActive : icons.matrixAlignControlDotInactive,
		}));

	return (
		<>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				inline
			>
				<Button
					icon={icons[`position${size}${upperFirst(camelCase(currentValue))}`]}
					onPress={() => {
						setPopoverOpen(true);
					}}
					forwardedRef={ref}
					tooltip={tooltip}
				>
					{!(icon || subtitle) && label}
				</Button>
			</BaseControl>
			<Popover
				aria-label={ariaLabel ?? __('Select position', 'eightshift-ui-components')}
				position={popoverPosition}
				triggerRef={ref}
				onOpenChange={setPopoverOpen}
				isOpen={popoverOpen}
				ariaLabel={label ?? tooltip}
			>
				<Tooltip
					text={tooltipText}
					placement='bottom'
					delayDuration={200}
					open={popoverOpen && tooltipText !== null}
					offset={10}
					triggerRef={innerRef}
					className={tooltipText === null ? 'es-uic-opacity-0' : ''}
				>
					<div
						ref={innerRef}
						className={clsx('es-uic-grid', size === '3x3' && 'es-uic-grid-cols-3 es-uic-grid-rows-3', size === '2x2' && 'es-uic-grid-cols-2 es-uic-grid-rows-2')}
					>
						{sizeOptions.map(({ value, label, icon }) => (
							<Button
								key={value}
								icon={icon}
								type='ghost'
								onHoverStart={() => setTooltipText(label)}
								onHoverEnd={() => setTooltipText(null)}
								onFocus={() => setTooltipText(label)}
								onPress={() => {
									setCurrentValue(value);
									setTooltipText(null);
									setPopoverOpen(false);
									onChange(value);
								}}
							/>
						))}
					</div>
				</Tooltip>
			</Popover>
		</>
	);
};
