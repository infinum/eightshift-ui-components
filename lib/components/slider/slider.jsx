import {
	Slider as ReactAriaSlider,
	SliderOutput as ReactAriaSliderOutput,
	SliderTrack as ReactAriaSliderTrack,
	SliderThumb as ReactAriaSliderThumb,
	Label,
} from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { clsx } from 'clsx';
import { NumberPicker } from '../number-picker/number-picker';
import { generateMarkers, generateGridTemplate } from './utils';
import { HStack } from '../layout/hstack';
import { AnimatePresence, motion } from 'motion/react';

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
 * @param {Function} [props.tooltipContent] - If provided, the function will format the tooltip content. `(value) => JSX.Element`.
 * @param {string} [props.labelClassName] - Additional classes to pass to the label.
 * @param {Object<string, any>} [props.trackStyle] - Additional style for the track.
 * @param {Number} [props.markerStep] - If provided, this value is used to generate markers instead of the step value. Useful when using small steps with a larger range.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.trackBgGradientSupport] - If `true`, parts of the track will get additional background size and position settings to make the gradient more seamless. Supported only in horizontal mode. BETA!
 * @param {boolean} [props.noActiveHighlight] - If `true`, the active area highlight will not be shown.
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
		tooltipContent = (value) => value,

		labelClassName,
		trackStyle,
		trackContainerStyle,

		trackBgGradientSupport,

		noActiveHighlight,

		markerStep = step,

		flat,

		hidden,

		...other
	} = props;

	if (hidden) {
		return null;
	}

	if (Array.isArray(value) && startPoint) {
		startPoint = null;
	}

	let generatedMarkers = {};

	if (typeof markers === 'object' && Object.keys(markers).length > 0) {
		generatedMarkers = markers;
	}

	if (markers === true || markers === 'dots') {
		generatedMarkers = generateMarkers(min, max, markerStep);
	}

	const markerEntries = Object.entries(generatedMarkers).toSorted((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

	const markerData = vertical ? markerEntries.toReversed() : markerEntries;

	const isRange = Array.isArray(value);

	return (
		<ReactAriaSlider
			value={value}
			onChange={onChange}
			minValue={min}
			maxValue={max}
			step={step}
			isDisabled={disabled}
			orientation={vertical ? 'vertical' : 'horizontal'}
			className={clsx('es:w-full', markerEntries?.some(([_, value]) => value?.length > 0) && 'es:pb-3.5')}
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

						{(!inputField || (inputField && isRange)) && (
							<ReactAriaSliderOutput className={clsx('es:text-xs es:tabular-nums es:text-secondary-600')}>
								{({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')}
							</ReactAriaSliderOutput>
						)}

						{inputField && !isRange && (
							<NumberPicker
								aria-label={label || __('Slider value', 'eightshift-ui-components')}
								value={value}
								onChange={onChange}
								min={min}
								max={max}
								step={step}
								size='small'
							/>
						)}
					</>
				}
				labelAs={Label}
				className={labelClassName}
			>
				<div className={clsx('es:flex es:items-center es:gap-2.5 es:space-y-0!', vertical && 'es:flex-col')}>
					{before && <HStack>{before}</HStack>}

					<ReactAriaSliderTrack className={clsx('es:isolate', vertical && 'es:mx-auto es:h-48', !vertical && 'es:grow')}>
						{({ state }) => {
							const thumbPositions = state.values.map((_, i) => Math.round(state.getThumbPercent(i) * 100));

							let gridTemplate = generateGridTemplate(thumbPositions, startPoint ? [startPoint] : [], { spaceBetween: 3 });

							if (vertical) {
								gridTemplate.reverse();
							}

							const tracks = gridTemplate.map((v) => {
								if (v.startsWith('minmax')) {
									return parseFloat(v.replace('minmax(0, ', '').replace('fr)', ''));
								}

								if (v.endsWith('fr')) {
									return parseFloat(v.replace('fr', ''));
								}

								return null;
							});

							const trackIndices = gridTemplate
								.map((v, index) => {
									if (v.startsWith('minmax') || v.endsWith('fr')) {
										return index;
									}

									return null;
								})
								.filter(Boolean);

							const markerIndices = gridTemplate
								.map((colWidth, index) => {
									if (colWidth === 'auto' || colWidth.endsWith('px')) {
										return index + 1;
									}

									return null;
								})
								.filter(Boolean);

							if (vertical) {
								markerIndices.reverse();
							}

							return (
								<div
									className={clsx('es:grid', trackBgGradientSupport && 'es:@container', vertical && 'es:justify-items-center es:h-full', !vertical && 'es:items-center')}
									style={{
										gridTemplateColumns: vertical ? '1fr' : gridTemplate.join(' '),
										gridTemplateRows: vertical ? gridTemplate.join(' ') : '1fr',
										...trackContainerStyle,
									}}
								>
									{markers && (
										<div
											className={clsx(
												'es:flex es:justify-between',
												!vertical && ['es:w-fill es:self-center', 'es:row-1 es:mx-0.75'],
												vertical && ['es:h-fill es:flex es:flex-col es:justify-self-center', 'es:col-1 es:my-0.75'],
											)}
											style={{
												gridColumn: vertical ? null : `1 / span ${gridTemplate.length}`,
												gridRow: vertical ? `1 / span ${gridTemplate.length}` : null,
											}}
										>
											{markerData.map(([rawDotValue, labelData], index) => {
												const dotValue = parseFloat(rawDotValue);

												let isWithinActiveBar = false;

												if (isRange) {
													isWithinActiveBar = dotValue > state.values[0] && dotValue < state.values.at(-1);
												} else if (startPoint) {
													if (state.values[0] < startPoint) {
														isWithinActiveBar = dotValue > state.values[0] && dotValue <= startPoint;
													} else {
														isWithinActiveBar = dotValue >= startPoint && dotValue < state.values[0];
													}
												} else {
													isWithinActiveBar = dotValue < state.values[0];
												}

												return (
													<div
														key={index}
														className={clsx(
															'es:relative',
															'es:size-0.75 es:place-self-center es:rounded-2xl',
															!disabled && isWithinActiveBar && 'es:bg-accent-50',
															!disabled && !isWithinActiveBar && 'es:bg-surface-500',
															disabled && isWithinActiveBar && 'es:bg-secondary-300',
															disabled && !isWithinActiveBar && 'es:bg-secondary-400',
															state.values.includes(dotValue) && 'es:opacity-0',
														)}
													>
														<span
															className={clsx(
																'es:absolute es:transition',
																!vertical && 'es:top-5 es:-translate-x-1/4 es:-rotate-90 es:text-end',
																vertical && 'es:left-5 es:-translate-y-1/4 es:text-start',
																'es:select-none es:text-10 es:tracking-wide es:tabular-nums',
																isWithinActiveBar ? 'es:text-surface-400' : 'es:text-surface-300',
																disabled && 'es:opacity-0',
															)}
														>
															{markers && markers !== 'dots' && labelData}
														</span>
													</div>
												);
											})}
										</div>
									)}

									{state.values.map((_, i) => {
										return (
											<ReactAriaSliderThumb
												key={i}
												index={i}
												aria-label={thumbLabels?.[i]}
												className={clsx(
													// 'es:absolute es:size-3.5 es:rounded-full es:border es:transition es:duration-300',
													// vertical ? 'es:translate-x-1/2!' : 'es:translate-y-1/2!',
													// 'es:shadow dragging:es:bg-accent-600 es:disabled:border-secondary-200 es:disabled:bg-secondary-100 es:disabled:shadow-none',
													// 'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
													// 'es:border-accent-600 es:bg-accent-500 es:shadow-accent-600/50',
													// 'es:hover:cursor-grab dragging:es:cursor-grabbing',
													!vertical && ['es:h-10 es:w-0.75', 'es:row-1'],
													vertical && ['es:w-10 es:h-0.75', 'es:col-1'],
													'es:z-20',

													'es:static! es:rounded-md es:transition es:duration-300',
													'es:origin-center',
													'es:hover:ring-[0.25px] es:focus-visible:ring-[0.5px] es:dragging:ring-[1px] es:ring-accent-500',
													'es:transform-none!',
													'es:dragging:es:bg-accent-600 es:disabled:bg-secondary-400',
													'es:focus-visible:outline-2 es:outline-offset-2 es:outline-accent-500/40',
													'es:bg-accent-500',
													'es:hover:ring-accent-600',
													'es:dragging:bg-accent-600 es:dragging:ring-accent-600',
													!disabled && 'es:hover:not-dragging:cursor-grab',
													'es:justify-self-center',
													!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
												)}
												style={{
													gridColumn: vertical ? null : markerIndices[i],
													gridRow: vertical ? markerIndices[i] : null,
												}}
											>
												{thumbContent && thumbContent(i)}

												<AnimatePresence>
													{i === state.focusedThumb && (
														<motion.div
															className={clsx(
																'es:absolute es:text-nowrap es:w-fit es:min-w-5 es:h-6',
																!vertical && 'es:bottom-12 es:-translate-x-1/2',
																vertical && 'es:left-12 es:-translate-y-1/2',
																// !vertical && 'es:absolute es:-top-8 es:-translate-x-1/2 es:w-fit es:min-w-5 es:h-6 es:mb-2.5 es:text-nowrap',
																'es:bg-surface-50/80 es:text-surface-700',
																'es:backdrop-blur-xs',
																'es:text-12 es:leading-none',
																'es:py-1 es:px-2 es:rounded-lg',
																'es:text-center',
																'es:line-clamp-1',
																'es:flex es:items-center es:justify-center es:gap-1',
																'es:shadow',
																'es:icon:size-2 es:icon:stroke-3',
															)}
															initial={{ y: 2, opacity: 0, scale: 0.85 }}
															animate={{ y: 0, opacity: 1, scale: 1 }}
															exit={{ y: 6, opacity: 0, scale: 0.85 }}
														>
															{tooltipContent(state.values[i])}
														</motion.div>
													)}
												</AnimatePresence>
											</ReactAriaSliderThumb>
										);
									})}

									{gridTemplate.map((colWidth, i) => {
										if (colWidth === 'auto' || colWidth.endsWith('px')) {
											return null;
										}

										if (colWidth.endsWith('rem')) {
											return null;
										}

										let val = i + 1;

										let activeStyle = [
											'es:transition es:duration-300',
											!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
											!disabled && [
												'es:bg-accent-500 es:from-accent-100/15 es:to-accent-100/0 es:from-25%',
												vertical ? 'es:bg-linear-to-r' : 'es:bg-linear-to-b',
												'es:inset-ring es:inset-ring-accent-700/10',
												'es:inset-shadow-sm es:inset-shadow-accent-50/30',
											],
											disabled && 'es:bg-secondary-400',
										];

										const inactiveStyle = [
											!disabled && [
												'es:bg-surface-200',
												vertical ? 'es:bg-linear-to-r' : 'es:bg-linear-to-b',
												'es:from-surface-700/0 es:to-surface-700/5 es:from-25%',
												'es:inset-ring es:inset-ring-surface-300/20',
											],
											disabled && 'es:bg-secondary-200',
										];

										if (noActiveHighlight) {
											activeStyle = inactiveStyle;
										}

										const extraStyles = {};

										if (trackBgGradientSupport) {
											let bgOffset = 0;

											if (i === trackIndices.at(-1)) {
												bgOffset = 100;
											} else if (i > 0) {
												bgOffset = tracks.slice(0, startPoint && state.values[0] > startPoint ? i + 1 : i).reduce((acc, val) => (val ? acc + val : acc), 0);
											}

											extraStyles.backgroundSize = '100cqw 100%';
											extraStyles.backgroundPositionX = `${bgOffset}%`;
										}

										return (
											<div
												key={i}
												className={clsx(
													'es:rounded-sm',
													'es:transition es:duration-300 es:ease-spring-smooth',
													!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
													!vertical && [
														'es:h-6 es:row-1',
														i === 0 && 'es:rounded-l-xl',
														i === gridTemplate.length - 1 && 'es:rounded-r-xl',
														!isRange && [
															!startPoint && [state.values[0] > min && i < markerIndices[0] && activeStyle, i > markerIndices[0] && inactiveStyle],
															startPoint && [
																state.values[0] < startPoint && i === markerIndices[0] + 1 && activeStyle,
																state.values[0] > startPoint && i === markerIndices[0] - 3 && activeStyle,
																state.values[0] <= startPoint && i !== markerIndices[0] + 1 && inactiveStyle,
																state.values[0] >= startPoint && i !== markerIndices[0] - 3 && inactiveStyle,
															],
														],
														isRange && [i > markerIndices[0] && i < markerIndices.at(-1) && activeStyle, (i < markerIndices[0] || i > markerIndices.at(-1)) && inactiveStyle],
													],
													vertical && [
														'es:w-6 es:col-1',
														i === 0 && 'es:rounded-t-xl',
														i === gridTemplate.length - 1 && 'es:rounded-b-xl',
														!isRange && [
															!startPoint && [state.values[0] > min && i > markerIndices[0] && activeStyle, i < markerIndices.at(-1) && inactiveStyle],
															startPoint && [
																state.values.at(-1) > startPoint && i === markerIndices.at(-1) + 1 && activeStyle,
																state.values.at(-1) < startPoint && i === markerIndices.at(-1) - 3 && activeStyle,
																state.values.at(-1) >= startPoint && i !== markerIndices.at(-1) + 1 && inactiveStyle,
																state.values.at(-1) <= startPoint && i !== markerIndices.at(-1) - 3 && inactiveStyle,
															],
														],
														isRange && [i < markerIndices[0] && i > markerIndices.at(-1) && activeStyle, (i > markerIndices[0] || i < markerIndices.at(-1)) && inactiveStyle],
													],
												)}
												style={{
													gridColumn: vertical ? null : val,
													gridRow: vertical ? val : null,
													...extraStyles,
													...trackStyle,
												}}
											/>
										);
									})}
								</div>
							);
						}}
					</ReactAriaSliderTrack>

					{after && <HStack>{after}</HStack>}
				</div>
			</BaseControl>
		</ReactAriaSlider>
	);
};
