import {
	Slider as ReactAriaSlider,
	SliderOutput as ReactAriaSliderOutput,
	SliderTrack as ReactAriaSliderTrack,
	SliderThumb as ReactAriaSliderThumb,
	Label,
	useSlottedContext,
	SliderStateContext,
	LabelContext,
} from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { clsx } from 'clsx/lite';
import { NumberPicker } from '../number-picker/number-picker';
import { useContext, useState } from 'react';
import { generateMarkers } from './utils';

/**
 * A single/multi-thumb slider component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display within the slider.
 * @param {string} [props.label] - The label of the slider.
 * @param {string} [props.subtitle] - The subtitle of the slider.
 * @param {string} [props.help] - The help text shown below the slider.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display next to the label.
 * @param {Number} [props.min=0] - The minimum value of the slider.
 * @param {Number} [props.max=100] - The maximum value of the slider.
 * @param {Number} [props.step=1] - The step value of the slider.
 * @param {Number} [props.startPoint] - The starting point of the slider.
 * @param {SliderMarkerType} [props.markers] - The markers to display on the slider. If `true`, markers are auto-generated, with labels. If set to `dots`, markers are auto-generated, but do not show labels next to dots. If an object is provided, the keys are the values of the markers, and the values are the labels.
 * @param {boolean} [props.noActiveHighlight=false] - If `true`, the highlight of the active value will not be displayed.
 * @param {Number | Number[]} props.value - The current value of the slider.
 * @param {Function} props.onChange - Function to run when the value changes.
 * @param {Function} props.onChangeEnd - Function to run when the value change ends.
 * @param {boolean} [props.disabled] - If `true`, the slider is disabled.
 * @param {boolean} [props.inputField=false] - If `true`, the slider will display an input field for the value. For multi-thumb sliders, the input field will be displayed for the focused thumb.
 * @param {boolean} [props.vertical=false] - If `true`, the slider will be displayed vertically.
 * @param {JSX.Element} [props.before] - Element to display before the slider.
 * @param {JSX.Element} [props.after] - Element to display after the slider.
 * @param {string[]} [props.thumbLabels] - ARIA labels for the thumbs.
 * @param {Function} [props.thumbContent] - If provided, the function will be called with the current value of the thumb, and the return value will be displayed within the thumb. `(currentIndex: number) => JSX.Element`.
 * @param {string} [props.labelClassName] - Additional classes to pass to the label.
 * @param {Object<string, any>} [props.trackStyle] - Additional style for the track.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Slider component.
 *
 * @typedef {'dots' | 'lines' | 'true' | Object<Number, string>} SliderMarkerType
 *
 * @example
 * <Slider
 * 	label='My slider'
 * 	value={sliderValue}
 * 	onChange={setSliderValue}
 * />
 *
 * @preserve
 */
export const Slider = (props) => {
	const {
		icon,
		label,
		subtitle,

		help,
		actions,

		min = 0,
		max = 100,
		step = 1,

		startPoint,

		markers,
		noActiveHighlight = false,

		value,
		onChange,
		onChangeEnd,

		disabled,

		inputField = false,

		vertical = false,

		before,
		after,

		thumbLabels,
		thumbContent,

		labelClassName,
		trackStyle,

		hidden,

		...other
	} = props;

	const [currentThumbIndex, setCurrentThumbIndex] = useState(-1);

	if (hidden) {
		return null;
	}

	let generatedMarkers = {};

	if (typeof markers === 'object' && Object.keys(markers).length > 0) {
		generatedMarkers = markers;
	}

	if (markers === true || markers === 'dots') {
		generatedMarkers = generateMarkers(min, max, step);
	}

	const markerEntries = Object.entries(generatedMarkers);

	const markerData = vertical ? markerEntries.toReversed() : markerEntries;

	return (
		<ReactAriaSlider
			value={value}
			onChange={onChange}
			minValue={min}
			maxValue={max}
			step={step}
			isDisabled={disabled}
			orientation={vertical ? 'vertical' : 'horizontal'}
			className={clsx('es-uic-w-full', markerEntries?.some(([_, value]) => value?.length > 0) && 'es-uic-pb-3.5')}
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

						{!inputField && (
							<ReactAriaSliderOutput className={clsx('es-uic-text-xs es-uic-tabular-nums es-uic-text-gray-600')}>
								{({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')}
							</ReactAriaSliderOutput>
						)}

						{inputField && (
							<NumberInputField
								fieldIndex={Array.isArray(value) ? currentThumbIndex : 0}
								min={min}
								max={max}
								step={step}
								focusedThumb={currentThumbIndex}
								setFocusedThumb={setCurrentThumbIndex}
							/>
						)}
					</>
				}
				labelAs={Label}
				className={labelClassName}
			>
				<div className={clsx('es-uic-flex es-uic-items-center es-uic-gap-2.5 !es-uic-space-y-0', vertical && 'es-uic-flex-col')}>
					{before && <div className='es-uic-flex es-uic-shrink-0 es-uic-items-center es-uic-gap-1'>{before}</div>}

					<ReactAriaSliderTrack
						className={clsx(
							'es-uic-isolate es-uic-grid es-uic-grid-cols-1 es-uic-grid-rows-1',
							vertical ? 'es-uic-mx-auto es-uic-h-40 es-uic-w-4' : 'es-uic-h-4 es-uic-w-full es-uic-grow',
						)}
					>
						{({ state }) => {
							let activeBarLeft;
							let activeBarBottom;
							let activeBarWidth;
							let activeBarHeight;

							let activeBarOffset = false;
							let shouldRoundStart = false;
							let shouldRoundEnd = false;

							const currValue = state.getThumbValue(0);

							if (vertical && !noActiveHighlight) {
								if (Array.isArray(value)) {
									activeBarBottom = state.getThumbPercent(0) * 100;
									activeBarHeight = state.getThumbPercent(value.length - 1) * 100 - activeBarBottom;
								} else if (startPoint && currValue >= startPoint) {
									activeBarBottom = state.getValuePercent(startPoint) * 100;
									activeBarHeight = state.getThumbPercent(0) * 100 - activeBarBottom;
									activeBarOffset = true;
								} else if (startPoint && currValue < startPoint) {
									activeBarBottom = state.getThumbPercent(0) * 100;
									activeBarHeight = state.getValuePercent(startPoint) * 100 - activeBarBottom;
								} else if (min < 0 && currValue >= 0) {
									activeBarBottom = state.getValuePercent(0) * 100;
									activeBarHeight = state.getThumbPercent(0) * 100 - activeBarBottom;
								} else if (min < 0 && currValue < 0) {
									activeBarBottom = state.getThumbPercent(0) * 100;
									activeBarHeight = state.getValuePercent(0) * 100 - activeBarBottom;
								} else {
									activeBarBottom = state.getValuePercent(min) * 100;
									activeBarHeight = state.getThumbPercent(0) * 100;
									shouldRoundEnd = true;
								}
							} else if (!noActiveHighlight) {
								if (Array.isArray(value)) {
									activeBarLeft = state.getThumbPercent(0) * 100;
									activeBarWidth = state.getThumbPercent(value.length - 1) * 100 - activeBarLeft;
								} else if (startPoint && currValue >= startPoint) {
									activeBarLeft = state.getValuePercent(startPoint) * 100;
									activeBarWidth = state.getThumbPercent(0) * 100 - activeBarLeft;
								} else if (startPoint && currValue < startPoint) {
									activeBarLeft = state.getThumbPercent(0) * 100;
									activeBarWidth = state.getValuePercent(startPoint) * 100 - activeBarLeft;
								} else if (min < 0 && currValue >= 0) {
									activeBarLeft = state.getValuePercent(0) * 100;
									activeBarWidth = state.getThumbPercent(0) * 100 - activeBarLeft;
									activeBarOffset = true;
								} else if (min < 0 && currValue < 0) {
									activeBarLeft = state.getThumbPercent(0) * 100;
									activeBarWidth = state.getValuePercent(0) * 100 - activeBarLeft;
								} else {
									activeBarLeft = state.getValuePercent(min) * 100;
									activeBarWidth = state.getThumbPercent(0) * 100;
									shouldRoundStart = true;
								}
							}

							return (
								<>
									<div
										className={clsx(
											'es-uic-relative es-uic-col-start-1 es-uic-row-start-1 es-uic-rounded-full es-uic-border',
											!vertical && 'es-uic-h-1.5 es-uic-w-full es-uic-self-center',
											vertical && 'es-uic-h-full es-uic-w-1.5 es-uic-flex-col es-uic-justify-self-center',
											disabled ? 'es-uic-border-gray-200 es-uic-bg-white' : 'es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-shadow-sm',
										)}
										style={trackStyle}
									/>

									{!noActiveHighlight && (
										<div
											className={clsx(
												'es-uic-absolute es-uic-col-start-1 es-uic-row-start-1 es-uic-border',
												!vertical && 'es-uic-h-1.5 es-uic-w-full es-uic-self-center',
												vertical && 'es-uic-h-full es-uic-w-1.5 es-uic-flex-col es-uic-justify-self-center',
												!vertical && shouldRoundStart && 'es-uic-rounded-l-full',
												!vertical && shouldRoundEnd && 'es-uic-rounded-r-full',
												vertical && shouldRoundStart && 'es-uic-rounded-t-full',
												vertical && shouldRoundEnd && 'es-uic-rounded-b-full',
												!vertical && activeBarOffset && '-es-uic-translate-x-px',
												vertical && activeBarOffset && 'es-uic-translate-y-px',
												disabled ? 'es-uic-border-gray-200 es-uic-bg-gray-50' : 'es-uic-border-teal-500 es-uic-bg-teal-500/30',
											)}
											style={{
												bottom: vertical ? `${activeBarBottom}%` : null,
												height: vertical ? `${activeBarHeight}%` : null,
												width: vertical ? null : `${activeBarWidth}%`,
												left: vertical ? null : `${activeBarLeft}%`,
											}}
										/>
									)}

									{markers && (
										<div
											className={clsx(
												'es-uic-relative es-uic-col-start-1 es-uic-row-start-1',
												!vertical && 'es-uic-h-1 es-uic-w-full es-uic-self-center',
												vertical && 'es-uic-h-full es-uic-w-1 es-uic-flex-col es-uic-justify-self-center',
											)}
										>
											{markerData.map(([rawDotValue, labelData], index) => {
												const dotValue = parseFloat(rawDotValue);

												let isWithinActiveBar = false;

												if (Array.isArray(value)) {
													isWithinActiveBar = value[0] <= dotValue && dotValue <= value[value.length - 1];
												} else if (startPoint && dotValue >= startPoint) {
													isWithinActiveBar = dotValue >= startPoint && dotValue <= currValue && dotValue !== startPoint;
												} else if (startPoint && dotValue < startPoint) {
													isWithinActiveBar = dotValue <= startPoint && dotValue >= currValue && dotValue !== startPoint;
												} else if (min < 0 && dotValue >= 0) {
													isWithinActiveBar = dotValue >= 0 && dotValue <= currValue && dotValue !== 0;
												} else if (min < 0 && dotValue < 0) {
													isWithinActiveBar = dotValue <= 0 && dotValue >= currValue && dotValue !== 0;
												} else {
													isWithinActiveBar = dotValue <= currValue && dotValue > min && dotValue < max;
												}

												return (
													<div
														key={index}
														className={clsx(
															'es-uic-absolute',
															vertical ? 'es-uic-h-px es-uic-w-1' : 'es-uic-h-1 es-uic-w-px es-uic-translate-x-1/2',
															!(
																dotValue === min ||
																dotValue === max ||
																(dotValue === startPoint && !noActiveHighlight) ||
																(min < 0 && dotValue === 0 && !noActiveHighlight) ||
																isWithinActiveBar
															) && 'es-uic-bg-gray-300',
															!noActiveHighlight && isWithinActiveBar && 'es-uic-bg-teal-500/75',
														)}
														style={{
															left: vertical ? null : `${state.getValuePercent(dotValue) * 100}%`,
															top: vertical ? `calc(${state.getValuePercent(dotValue) * 100}%)` : null,
														}}
													>
														<span
															className={clsx(
																'es-uic-absolute es-uic-select-none es-uic-text-xs es-uic-transition-colors',
																vertical ? 'es-uic-left-3.5 es-uic-top-0 -es-uic-translate-y-1/2' : 'es-uic-left-0 es-uic-top-2.5 -es-uic-translate-x-1/2',
																(Array.isArray(value) ? value.includes(Number(dotValue)) : value === Number(dotValue) && !disabled)
																	? 'es-uic-text-teal-700'
																	: 'es-uic-text-gray-300',
															)}
														>
															{markers && markers !== 'dots' && labelData}
														</span>
													</div>
												);
											})}
										</div>
									)}

									<div className='es-uic-relative es-uic-col-start-1 es-uic-row-start-1 es-uic-p-px'>
										{state.values.map((_, i) => (
											<ReactAriaSliderThumb
												key={i}
												index={i}
												aria-label={thumbLabels?.[i]}
												className={clsx(
													'es-uic-absolute es-uic-size-3.5 es-uic-rounded-full es-uic-border es-uic-transition es-uic-duration-300',
													vertical ? '!-es-uic-translate-y-1/2 !es-uic-translate-x-0' : '!-es-uic-translate-x-1/2 !es-uic-translate-y-0',
													'es-uic-shadow dragging:es-uic-bg-teal-600 disabled:es-uic-border-gray-200 disabled:es-uic-bg-gray-100 disabled:es-uic-shadow-none',
													'focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
													'es-uic-border-teal-600 es-uic-bg-teal-500 es-uic-shadow-teal-600/50',
													'hover:es-uic-cursor-grab dragging:es-uic-cursor-grabbing',
												)}
												onFocus={() => {
													if (state.values.length < 2) {
														return;
													}

													setCurrentThumbIndex(i);
												}}
											>
												{inputField && state.values.length > 1 && currentThumbIndex === i && <div className='es-uic-m-0.5 es-uic-size-2 es-uic-rounded-full es-uic-bg-teal-100' />}

												{thumbContent && thumbContent(i)}
											</ReactAriaSliderThumb>
										))}
									</div>
								</>
							);
						}}
					</ReactAriaSliderTrack>

					{after && <div className='es-uic-flex es-uic-shrink-0 es-uic-items-center es-uic-gap-1'>{after}</div>}
				</div>
			</BaseControl>
		</ReactAriaSlider>
	);
};

const NumberInputField = (props) => {
	const { ...other } = props;

	const state = useContext(SliderStateContext);
	const labelProps = useSlottedContext(LabelContext);

	const isSingleValue = state.values.length === 1;
	const fieldIndex = isSingleValue ? 0 : props.focusedThumb ?? 0;

	return (
		<>
			<NumberPicker
				aria-labelledby={labelProps.id}
				value={state.values[fieldIndex] ?? null}
				onChange={(v) => state.setThumbValue(fieldIndex, v)}
				size='compact'
				min={state.getThumbMinValue(fieldIndex)}
				max={state.getThumbMaxValue(fieldIndex)}
				onBlur={() => {
					if (isSingleValue) {
						return;
					}

					props.setFocusedThumb(-1);
				}}
				className={fieldIndex === -1 && !isSingleValue ? 'es-uic-invisible' : ''}
				{...other}
			/>

			{fieldIndex === -1 && !isSingleValue && (
				<ReactAriaSliderOutput className={clsx('es-uic-text-xs es-uic-tabular-nums es-uic-text-gray-600')}>
					{({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')}
				</ReactAriaSliderOutput>
			)}
		</>
	);
};
