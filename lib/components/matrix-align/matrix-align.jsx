import { useState, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { camelCase, pascalCase, upperFirst } from '../../utilities';

import { Menu, MenuItem } from '../menu/menu';
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

	const sizeOptions = allSizeOptions.filter(({ availableOn }) => availableOn.includes(size));

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			inline
		>
			<Menu
				triggerIcon={icons[`position${size}${upperFirst(camelCase(currentValue))}`]}
				triggerProps={{ 'aria-label': ariaLabel }}
				tooltip={tooltip}
			>
				{sizeOptions.map(({ value, label }) => (
					<MenuItem
						key={value}
						endIcon={icons?.[`position${size}${pascalCase(value)}`]}
						selected={value === currentValue}
						onClick={() => onChange(value)}
					>
						{label}
					</MenuItem>
				))}
			</Menu>
		</BaseControl>
	);
};
