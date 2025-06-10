import { __ } from '@wordpress/i18n';
import {
	Slider as ReactAriaSlider,
	SliderOutput as ReactAriaSliderOutput,
	SliderTrack as ReactAriaSliderTrack,
	SliderThumb as ReactAriaSliderThumb,
	Label,
} from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { icons } from '../../icons/icons';
import { getColumnConfigOutputText } from './utils';
import { clsx } from 'clsx/lite';

/**
 * A two-thumb slider for selecting a range of columns.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display within the slider.
 * @param {string} [props.help] - The help text shown below the slider.
 * @param {string} [props.label] - The label of the slider.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display next to the label.
 * @param {string} [props.subtitle] - The subtitle of the slider.
 * @param {Number} [props.columns=12] - Number of columns.
 * @param {boolean} [props.disableWidth] - If `true`, the width thumb is disabled.
 * @param {boolean} [props.disableOffset] - If `true`, the offset thumb is disabled.
 * @param {boolean} [props.showOuterAsGutter] - If `true`, the outer columns are displayed with a special icons instead of the column numbers. Other numbers are offset by 1.
 * @param {Number | Number[]} props.value - The current value of the slider.
 * @param {Function} props.onChange - Function to run when the value changes.
 * @param {Function} props.onChangeEnd - Function to run when the value change ends.
 * @param {boolean} [props.disabled] - If `true`, the slider is disabled.
 * @param {string} [props.labelClassName] - Additional classes to pass to the label.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The ColumnConfigSlider component.
 *
 * @example
 * <ColumnConfigSlider
 * 	label='My slider'
 * 	value={sliderValue}
 * 	onChange={setSliderValue}
 * />
 *
 * @preserve
 */
export const ColumnConfigSlider = (props) => {
	const {
		icon,
		help,
		label,
		actions,
		subtitle,

		columns = 12,

		disableWidth,
		disableOffset,
		showOuterAsGutter,

		value,
		onChange,
		onChangeEnd,

		disabled,

		labelClassName,

		hidden,

		...other
	} = props;

	if (hidden) {
		return null;
	}

	const markerData = [...Array(columns).keys()];

	const thumbLabels = [__('Offset', 'eightshift-ui-components'), __('Width', 'eightshift-ui-components')];

	return (
		<ReactAriaSlider
			value={value}
			onChange={onChange}
			minValue={1}
			maxValue={columns}
			step={1}
			isDisabled={disabled}
			orientation='horizontal'
			className='es:w-full'
			onChangeEnd={onChangeEnd}
			{...other}
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				help={help}
				actions={
					<>
						{actions}

						<ColumnConfigSliderOutput showOuterAsGutter={showOuterAsGutter} />
					</>
				}
				labelAs={Label}
				className={labelClassName}
				controlContainerClassName='es:flex es:items-center es:gap-2.5 es:space-y-0!'
			>
				<ReactAriaSliderTrack
					className='es:isolate es:grid es:h-10 es:w-full es:grid-rows-1'
					style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
				>
					{({ state }) => {
						return (
							<>
								<div
									className={clsx(
										'es:col-span-full es:row-span-1 es:row-start-1 es:h-full es:w-full es:grow es:rounded-lg es:border',
										disabled ? 'es:border-secondary-200 es:bg-white' : 'es:border-secondary-300 es:bg-secondary-50 es:shadow-sm',
									)}
								/>

								{markerData.slice(0, -1).map((marker) => (
									<div
										key={marker}
										className={clsx(
											'es:row-span-1 es:row-start-1 es:h-full es:w-px es:justify-self-center',
											marker >= value[0] - 1 && marker < value[1] ? 'es:bg-accent-700/25' : 'es:bg-secondary-300',
											(marker === value[0] - 2 || marker === value[1] - 1) && 'es:hidden',
										)}
										style={{ gridColumn: `${marker + 1} / span 2` }}
									/>
								))}

								<div
									className={clsx(
										'es:pointer-events-none es:col-start-1 es:row-start-1 es:border',
										'es:h-full es:w-full es:self-center es:rounded-lg',
										disabled ? 'es:border-secondary-200 es:bg-secondary-50' : 'es:border-accent-500 es:bg-accent-500/30',
									)}
									style={{
										gridColumn: `${value[0]} / span ${value[1] - value[0] + 1}`,
									}}
								/>

								{markerData.map((marker, index) => {
									return (
										<span
											key={marker}
											className={clsx(
												'es:row-span-1 es:row-start-1 es:select-none es:place-self-center es:text-xs es:transition-colors',
												'es:inset-y-0 es:my-auto es:h-fit es:pl-px es:text-center',
												'es:icon:size-3 es:icon:stroke-[1.5]',
												marker >= value[0] - 1 && marker < value[1] ? 'es:text-accent-700' : 'es:text-secondary-400',
											)}
											style={{ gridColumn: `${index + 1} / span 1` }}
										>
											{showOuterAsGutter && marker === 0 && icons.chevronLeft}
											{showOuterAsGutter && marker === columns - 1 && icons.chevronRight}
											{showOuterAsGutter && marker > 0 && marker < columns - 1 && marker}
											{!showOuterAsGutter && marker + 1}
										</span>
									);
								})}

								{state.values.map((_, i) => (
									<ReactAriaSliderThumb
										key={i}
										index={i}
										aria-label={thumbLabels?.[i]}
										isDisabled={(i === 0 && disableOffset) || (i === 1 && disableWidth)}
										className={clsx(
											'es:static! es:row-span-1 es:row-start-1 es:h-6 es:w-1.5 es:rounded-full es:border es:transition es:duration-300',
											i === 0 && 'es:translate-y-1/2! es:self-center es:justify-self-start',
											i === 1 && 'es:translate-x-full! es:translate-y-1/2! es:self-center es:justify-self-end',
											'es:shadow dragging:es:bg-accent-600 es:disabled:opacity-0',
											'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
											'es:border-accent-600 es:bg-accent-500 es:shadow-accent-600/50',
											'es:hover:cursor-grab dragging:es:cursor-grabbing',
										)}
										style={{
											gridColumn: `${state.values[i]} / span 1`,
										}}
									/>
								))}
							</>
						);
					}}
				</ReactAriaSliderTrack>
			</BaseControl>
		</ReactAriaSlider>
	);
};

/**
 * The output for the ColumnConfigSlider component.
 *
 * Meant to be used within the ColumnConfigSlider component, e.g in help or actions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.showOuterAsGutter] - If `true`, the outer columns are displayed with a special icons instead of the column numbers. Other numbers are offset by 1.
 *
 * @returns {JSX.Element} The ColumnConfigSliderOutput component.
 *
 * @example
 * <ColumnConfigSliderOutput />
 *
 * @preserve
 */
export const ColumnConfigSliderOutput = ({ showOuterAsGutter }) => (
	<ReactAriaSliderOutput className={clsx('es:text-xs es:tabular-nums es:text-secondary-600')}>
		{({ state }) => {
			const columns = state.getThumbMaxValue(1);
			const offset = parseInt(state.getThumbValueLabel(0));
			const endOffset = parseInt(state.getThumbValueLabel(1));
			const width = endOffset - offset + 1;

			return getColumnConfigOutputText(columns, offset, width, showOuterAsGutter);
		}}
	</ReactAriaSliderOutput>
);
