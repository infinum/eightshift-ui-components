import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { camelCase, upperFirst } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { TriggeredPopover } from '../popover/popover';
import { Radio, RadioGroup } from 'react-aria-components';
import { RichLabel } from '../rich-label/rich-label';
import clsx from 'clsx';

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

		hidden,
	} = props;

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

	const currentItemLabel = sizeOptions.find(({ value: itemValue }) => itemValue === value)?.label;

	let triggerTooltip = currentItemLabel;

	if (!label) {
		triggerTooltip = (
			<RichLabel
				label={tooltip}
				subtitle={currentItemLabel}
				noColor
			/>
		);
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			inline
		>
			<TriggeredPopover
				triggerButtonIcon={icons[`position${size}${upperFirst(camelCase(value))}`]}
				triggerButtonProps={{
					'aria-label': ariaLabel,
					tooltip: triggerTooltip,
				}}
				wrapperClassName='es:from-surface-300/30 es:to-surface-300/30 es:p-0.5'
			>
				<div className='es:bg-accent-50/60 es:inset-ring es:inset-ring-accent-800/3 es:rounded-t-xl es:rounded-b-md'>
					<RadioGroup
						aria-label={tooltip}
						value={value}
						onChange={onChange}
						orientation='horizontal'
						className={clsx('es:grid es:gap-1 es:w-fit es:mx-auto', size === '2x2' && 'es:grid-cols-2 es:p-5', size === '3x3' && 'es:grid-cols-3 es:p-3')}
					>
						{sizeOptions.map(({ value: itemValue, label }) => (
							<Radio
								aria-label={label}
								key={itemValue}
								autoFocus={itemValue === value}
								value={itemValue}
								className={({ isSelected }) =>
									clsx(
										'es:size-6 es:rounded-sm es:transition-plus es:ease-spring-bouncy es:inset-ring es:pressed:scale-90',
										isSelected &&
											'es:bg-accent-500 es:rounded-xl es:inset-ring-accent-700 es:inset-shadow-sm es:inset-shadow-accent-50/25 es:bg-linear-to-b es:from-25% es:from-accent-700/5 es:to-accent-700/30 es:shadow-xs es:shadow-black/10',
										!isSelected && 'es:bg-surface-300 es:hover:bg-surface-400 es:hover:rounded-md es:focus-visible:rounded-lg es:pressed:rounded-xl es:inset-ring-surface-400/20',
									)
								}
							/>
						))}
					</RadioGroup>
				</div>

				<div className='es:bg-accent-50/60 es:inset-ring es:inset-ring-accent-800/3 es:rounded-b-xl es:rounded-t-md es:p-2 es:mt-0.75 es:text-12 es:text-center es:text-accent-900'>
					{currentItemLabel}
				</div>
			</TriggeredPopover>
		</BaseControl>
	);
};
