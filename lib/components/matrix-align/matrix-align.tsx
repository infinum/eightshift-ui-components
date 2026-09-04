import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { type ReactNode } from 'react';
import { Radio, RadioGroup } from 'react-aria-components';
import { Icon } from '../../icons/internal';
import { camelCase, upperFirst } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { TriggeredPopover } from '../popover/popover';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

type MatrixSize = '3x3' | '2x2';
type MatrixAlignValue = 'top left' | 'top center' | 'top right' | 'center left' | 'center center' | 'center right' | 'bottom left' | 'bottom center' | 'bottom right';

type MatrixAlignOption = {
	value: MatrixAlignValue;
	label: string;
	availableOn: MatrixSize[];
};

type MatrixAlignProps = {
	/** The size of the matrix. Can be either '3x3' or '2x2'. Defaults to `3x3`. */
	size?: MatrixSize;
	/** The currently selected value. */
	value: MatrixAlignValue;
	/** Function to run when the selection changes. */
	onChange: (value: string) => void;
	/** Tooltip text to display on the trigger button. Defaults to `Position`. */
	tooltip?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Icon to display within the button. */
	icon?: ReactNode;
	/** Subtitle to display. */
	subtitle?: ReactNode;
	'aria-label'?: string;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

const allSizeOptions: MatrixAlignOption[] = [
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

// SAFETY: This adapter exposes the TriggeredPopover props used by MatrixAlign and handled by the component at runtime.
const TypedTriggeredPopover = TriggeredPopover as (props: {
	children?: ReactNode;
	triggerButtonIcon?: ReactNode;
	triggerButtonProps?: {
		'aria-label'?: string;
		tooltip?: ReactNode;
	};
	wrapperClassName?: string;
}) => ReactNode;

/**
 * A component that can provide a 3x3 or a 2x2 grid of positions to pick from.
 * Replaces the default Gutenberg `AlignmentMatrixControl` / `BlockAlignmentMatrixControl` / `BlockAlignmentMatrixToolbar`.
 *
 * @component
 * @param {MatrixAlignProps} props - Component props.
 *
 * @returns {JSX.Element} The MatrixAlign component.
 *
 * @example
 * <MatrixAlign
 * 	size='3x3'
 * 	value='top left'
 * 	onChange={setAlignment}
 * />
 */
export const MatrixAlign = (props: Prettify<MatrixAlignProps>) => {
	const { size = '3x3', value, onChange, tooltip = __('Position', 'eightshift-ui-components'), label, icon, subtitle, 'aria-label': ariaLabel, hidden } = props;

	if (hidden) {
		return null;
	}

	const sizeOptions = allSizeOptions.filter(({ availableOn }) => availableOn.includes(size));
	const currentItemLabel = sizeOptions.find(({ value: itemValue }) => itemValue === value)?.label;

	let triggerTooltip: ReactNode = currentItemLabel;

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
			<TypedTriggeredPopover
				triggerButtonIcon={<Icon icon={`position${size}${upperFirst(camelCase(value))}`} />}
				triggerButtonProps={{
					'aria-label': ariaLabel,
					tooltip: triggerTooltip,
				}}
				wrapperClassName='es:from-surface-300/30 es:to-surface-300/30 es:p-0.5'
			>
				<div className='es:bg-accent-50/60 es:inset-ring es:inset-ring-accent-800/3 es:rounded-t-xl es:rounded-b-md'>
					<RadioGroup
						aria-label={isStringValue(tooltip) ? tooltip : __('Position', 'eightshift-ui-components')}
						value={value}
						onChange={onChange}
						orientation='horizontal'
						className={clsx('es:grid es:gap-1 es:w-fit es:mx-auto', size === '2x2' && 'es:grid-cols-2 es:p-5', size === '3x3' && 'es:grid-cols-3 es:p-3')}
					>
						{sizeOptions.map(({ value: itemValue, label: itemLabel }) => (
							<Radio
								aria-label={itemLabel}
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

				<div className='es:pb-1 es:pt-1.5 es:text-12 es:text-center es:text-surface-600'>{currentItemLabel}</div>
			</TypedTriggeredPopover>
		</BaseControl>
	);
};
