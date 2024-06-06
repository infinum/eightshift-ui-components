import {
	Slider as ReactAriaSlider,
	SliderOutput as ReactAriaSliderOutput,
	SliderTrack as ReactAriaSliderTrack,
	SliderThumb as ReactAriaSliderThumb,
	Label,
} from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { classnames } from '../../utilities/classnames';
import { __, _n, sprintf } from '@wordpress/i18n';
import { icons } from '../../icons/icons';

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

		...other
	} = props;

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
			className='es-uic-w-full es-uic-pb-3.5'
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
				controlContainerClassName='es-uic-flex es-uic-items-center es-uic-gap-2.5 !es-uic-space-y-0'
			>
				<ReactAriaSliderTrack
					className='es-uic-isolate es-uic-grid es-uic-h-10 es-uic-w-full es-uic-grid-rows-1'
					style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
				>
					{({ state }) => {
						return (
							<>
								<div
									className={classnames(
										'es-uic-col-span-full es-uic-row-span-1 es-uic-row-start-1 es-uic-h-full es-uic-w-full es-uic-grow es-uic-rounded-md es-uic-border',
										disabled
											? 'es-uic-border-gray-200 es-uic-bg-white'
											: 'es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-shadow-sm',
									)}
								/>

								{markerData.slice(0, -1).map((marker) => (
									<div
										key={marker}
										className={classnames(
											'es-uic-row-span-1 es-uic-row-start-1 es-uic-h-full es-uic-w-px es-uic-justify-self-center',
											marker >= value[0] - 1 && marker < value[1] ? 'es-uic-bg-teal-700/25' : 'es-uic-bg-gray-300',
											(marker === value[0] - 2 || marker === value[1] - 1) && 'es-uic-hidden',
										)}
										style={{ gridColumn: `${marker + 1} / span 2` }}
									/>
								))}

								<div
									className={classnames(
										'es-uic-pointer-events-none es-uic-col-start-1 es-uic-row-start-1 es-uic-border',
										'es-uic-h-full es-uic-w-full es-uic-self-center es-uic-rounded-md',
										disabled
											? 'es-uic-border-gray-200 es-uic-bg-gray-50'
											: 'es-uic-border-teal-500 es-uic-bg-teal-500/30',
									)}
									style={{
										gridColumn: `${value[0]} / span ${value[1] - value[0] + 1}`,
									}}
								/>

								{markerData.map((marker, index) => {
									return (
										<span
											key={marker}
											className={classnames(
												'es-uic-row-span-1 es-uic-row-start-1 es-uic-select-none es-uic-place-self-center es-uic-text-xs es-uic-transition-colors',
												'es-uic-inset-y-0 es-uic-my-auto es-uic-h-fit es-uic-pl-px es-uic-text-center',
												'[&>svg]:es-uic-size-3 [&>svg]:es-uic-stroke-[1.5]',
												marker >= value[0] - 1 && marker < value[1] ? 'es-uic-text-teal-700' : 'es-uic-text-gray-400',
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
										className={classnames(
											'!es-uic-static es-uic-row-span-1 es-uic-row-start-1 es-uic-h-6 es-uic-w-1.5 es-uic-rounded-full es-uic-border es-uic-transition es-uic-duration-300',
											i === 0 &&
												'!-es-uic-translate-x-1/2 !es-uic-translate-y-0 es-uic-self-center es-uic-justify-self-start',
											i === 1 &&
												'!es-uic-translate-x-1/2 !es-uic-translate-y-0 es-uic-self-center es-uic-justify-self-end',
											'es-uic-shadow dragging:es-uic-bg-teal-600 disabled:es-uic-opacity-0',
											'focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
											'es-uic-border-teal-600 es-uic-bg-teal-500 es-uic-shadow-teal-600/50',
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
	<ReactAriaSliderOutput className={classnames('es-uic-text-xs es-uic-tabular-nums es-uic-text-gray-600')}>
		{({ state }) => {
			const columns = state.getThumbMaxValue(1);
			const offset = parseInt(state.getThumbValueLabel(0));
			const endOffset = parseInt(state.getThumbValueLabel(1));
			const width = endOffset - offset + 1;

			if (offset === 1 && endOffset === columns) {
				return __('Full-width', 'eightshift-ui-components');
			}

			if (offset === 1 && endOffset < columns) {
				return sprintf(__('To col %d', 'eightshift-ui-components'), showOuterAsGutter ? endOffset - 1 : endOffset);
			}

			if (offset > 1 && endOffset === columns) {
				return sprintf(__('From col %d', 'eightshift-ui-components'), showOuterAsGutter ? offset - 1 : offset);
			}

			if (showOuterAsGutter && width === 1 && offset === 1) {
				return __('Start gutter', 'eightshift-ui-components');
			}

			if (showOuterAsGutter && endOffset === columns) {
				return __('Start gutter', 'eightshift-ui-components');
			}

			if (width === 1) {
				return sprintf(__('Col %d', 'eightshift-ui-components'), offset);
			}

			return sprintf(
				_n('%s col from %s', '%s cols from %s', width, 'eightshift-ui-components'),
				width,
				showOuterAsGutter ? offset - 1 : offset,
			);
		}}
	</ReactAriaSliderOutput>
);
