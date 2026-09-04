import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type CSSProperties, type ComponentProps, type ReactNode } from 'react';
import {
	Label,
	Slider as ReactAriaSlider,
	SliderOutput as ReactAriaSliderOutput,
	SliderThumb as ReactAriaSliderThumb,
	SliderTrack as ReactAriaSliderTrack,
} from 'react-aria-components';

import { BaseControl } from '../base-control/base-control';
import { NumberPicker } from '../number-picker/number-picker';
import { HStack } from '../layout/hstack';
import { generateGridTemplate, generateMarkers } from './utils';
import type { Prettify } from '../../utilities/types';

type SliderValue = number | number[];
type SliderMarkerType = true | 'dots' | 'lines' | Record<string, ReactNode>;

type SliderProps = Omit<
	ComponentProps<typeof ReactAriaSlider>,
	'children' | 'className' | 'orientation' | 'value' | 'onChange' | 'onChangeEnd' | 'isDisabled' | 'minValue' | 'maxValue'
> & {
	/** Icon to display within the slider. */
	icon?: ReactNode;
	/** The label of the slider. */
	label?: ReactNode;
	/** The subtitle of the slider. */
	subtitle?: ReactNode;
	/** The help text shown below the slider. */
	help?: ReactNode;
	/** Actions to display next to the label. */
	actions?: ReactNode;
	/** The minimum value of the slider. Defaults to `0`. */
	min?: number;
	/** The maximum value of the slider. Defaults to `100`. */
	max?: number;
	/** The step value of the slider. Defaults to `1`. */
	step?: number;
	/** The starting point of the slider. */
	startPoint?: number | null;
	/** The markers to display on the slider. If `true`, markers are auto-generated, with labels. If set to `dots`, markers are auto-generated, but do not show labels next to dots. If an object is provided, the keys are the values of the markers, and the values are the labels. */
	markers?: SliderMarkerType;
	/** The current value of the slider. */
	value: SliderValue;
	/** Function to run when the value changes. */
	onChange: (value: SliderValue) => void;
	/** Function to run when the value change ends. */
	onChangeEnd?: (value: SliderValue) => void;
	/** If `true`, the slider is disabled. */
	disabled?: boolean;
	/** If `true`, the slider will display an input field for the value. For multi-thumb sliders, the input field will be displayed for the focused thumb. Defaults to `false`. */
	inputField?: boolean;
	/** If `true`, the slider will be displayed vertically. Defaults to `false`. */
	vertical?: boolean;
	/** Element to display before the slider. */
	before?: ReactNode;
	/** Element to display after the slider. */
	after?: ReactNode;
	/** ARIA labels for the thumbs. */
	thumbLabels?: string[];
	/** If provided, the function will be called with the current value of the thumb, and the return value will be displayed within the thumb. `(currentIndex: number) => JSX.Element`. */
	thumbContent?: (currentIndex: number) => ReactNode;
	/** If provided, the function will format the tooltip content. `(value) => JSX.Element`. */
	tooltipContent?: (value: number) => ReactNode;
	/** Additional classes to pass to the label. */
	labelClassName?: string;
	/** Additional style for the track. */
	trackStyle?: CSSProperties;
	trackContainerStyle?: CSSProperties;
	/** If provided, this value is used to generate markers instead of the step value. Useful when using small steps with a larger range. */
	markerStep?: number;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, parts of the track will get additional background size and position settings to make the gradient more seamless. Supported only in horizontal mode. BETA! */
	trackBgGradientSupport?: boolean;
	/** If `true`, the active area highlight will not be shown. */
	noActiveHighlight?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

const isNumberValue = <T,>(value: T): value is T & number => Object.prototype.toString.call(value) === '[object Number]';
const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

const isMarkerMap = (markers: SliderMarkerType): markers is Record<string, ReactNode> => markers !== true && markers !== 'dots' && markers !== 'lines';

/**
 * A single/multi-thumb slider component.
 *
 * @component
 * @param {SliderProps} props - Component props.
 *
 * @returns {JSX.Element} The Slider component.
 *
 * @example
 * <Slider
 * 	label='My slider'
 * 	value={sliderValue}
 * 	onChange={setSliderValue}
 * />
 */
export const Slider = (props: Prettify<SliderProps>) => {
	const {
		icon,
		label,
		subtitle,
		help,
		actions,
		min = 0,
		max = 100,
		step = 1,
		startPoint: rawStartPoint,
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
		tooltipContent = (currentValue) => currentValue,
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

	const [hoveredThumbs, setHoveredThumbs] = useState<number[]>([]);

	if (hidden) {
		return null;
	}

	let startPoint = rawStartPoint ?? null;

	if (Array.isArray(value) && rawStartPoint) {
		startPoint = null;
	}

	let generatedMarkers: Record<string, ReactNode> = {};

	if (markers && isMarkerMap(markers) && Object.keys(markers).length > 0) {
		generatedMarkers = markers;
	}

	if (markers === true || markers === 'dots') {
		generatedMarkers = generateMarkers(min, max, markerStep);
	}

	const markerEntries: Array<[string, ReactNode]> = Object.entries(generatedMarkers);

	markerEntries.sort((firstEntry, secondEntry) => parseFloat(firstEntry[0]) - parseFloat(secondEntry[0]));

	const markerData: Array<[string, ReactNode]> = vertical ? [...markerEntries].reverse() : markerEntries;
	const isRange = Array.isArray(value);
	const singleValue = isNumberValue(value) ? value : (value[0] ?? min);

	return (
		<ReactAriaSlider
			value={value}
			onChange={onChange}
			minValue={min}
			maxValue={max}
			step={step}
			isDisabled={disabled}
			orientation={vertical ? 'vertical' : 'horizontal'}
			className={clsx('es:w-full', markerEntries.some((entry) => Boolean(entry[1])) && 'es:pb-3.5')}
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

						{!inputField || (inputField && isRange) ? (
							<ReactAriaSliderOutput className='es:text-xs es:tabular-nums es:text-secondary-600'>
								{({ state }) => state.values.map((_, index) => state.getThumbValueLabel(index)).join(' – ')}
							</ReactAriaSliderOutput>
						) : null}

						{inputField && !isRange ? (
							<NumberPicker
								aria-label={isStringValue(label) ? label : __('Slider value', 'eightshift-ui-components')}
								value={singleValue}
								onChange={(nextValue) => onChange(nextValue)}
								min={min}
								max={max}
								step={step}
								size='small'
							/>
						) : null}
					</>
				}
				labelAs={Label}
				className={labelClassName}
			>
				<div className={clsx('es:flex es:items-center es:gap-2.5 es:space-y-0!', vertical && 'es:flex-col')}>
					{before ? <HStack>{before}</HStack> : null}

					<ReactAriaSliderTrack className={clsx('es:isolate', vertical && 'es:mx-auto es:h-48', !vertical && 'es:grow')}>
						{({ state }) => {
							const stateValues = state.values.filter(isNumberValue);
							const firstStateValue = stateValues[0] ?? min;
							const lastStateValue = stateValues.at(-1) ?? firstStateValue;
							let gridTemplate = generateGridTemplate(
								stateValues.map((_, index) => Math.round(state.getThumbPercent(index) * 100)),
								startPoint,
								{ spaceBetween: 3 },
							);

							if (vertical) {
								gridTemplate = [...gridTemplate].reverse();
							}

							const tracks = gridTemplate.map((segment) => {
								if (segment.startsWith('minmax')) {
									return parseFloat(segment.replace('minmax(0, ', '').replace('fr)', ''));
								}

								if (segment.endsWith('fr')) {
									return parseFloat(segment.replace('fr', ''));
								}

								return null;
							});

							const trackIndices = gridTemplate
								.map((segment, index) => (segment.startsWith('minmax') || segment.endsWith('fr') ? index : null))
								.filter((value): value is number => value !== null);

							const markerIndices = gridTemplate
								.map((segment, index) => (segment === 'auto' || segment.endsWith('px') ? index + 1 : null))
								.filter((value): value is number => value !== null);

							if (vertical) {
								markerIndices.reverse();
							}

							const firstMarkerIndex = markerIndices[0] ?? 0;
							const lastMarkerIndex = markerIndices.at(-1) ?? 0;
							const lastTrackIndex = trackIndices.at(-1) ?? 0;

							return (
								<div
									className={clsx('es:grid', trackBgGradientSupport && 'es:@container', vertical && 'es:justify-items-center es:h-full', !vertical && 'es:items-center')}
									style={{
										gridTemplateColumns: vertical ? '1fr' : gridTemplate.join(' '),
										gridTemplateRows: vertical ? gridTemplate.join(' ') : '1fr',
										...trackContainerStyle,
									}}
								>
									{markers ? (
										<div
											className={clsx(
												'es:flex es:justify-between',
												!vertical && ['es:w-fill es:self-center', 'es:row-1 es:mx-0.75'],
												vertical && ['es:h-fill es:flex es:flex-col es:justify-self-center', 'es:col-1 es:my-0.75'],
											)}
											style={{
												gridColumn: vertical ? undefined : `1 / span ${gridTemplate.length}`,
												gridRow: vertical ? `1 / span ${gridTemplate.length}` : undefined,
											}}
										>
											{markerData.map(([rawDotValue, labelData]: [string, ReactNode], index: number) => {
												const dotValue = parseFloat(rawDotValue);
												let isWithinActiveBar = false;

												if (isRange) {
													isWithinActiveBar = dotValue > firstStateValue && dotValue < lastStateValue;
												} else if (startPoint !== null) {
													if (firstStateValue < startPoint) {
														isWithinActiveBar = dotValue > firstStateValue && dotValue <= startPoint;
													} else {
														isWithinActiveBar = dotValue >= startPoint && dotValue < firstStateValue;
													}
												} else {
													isWithinActiveBar = dotValue < firstStateValue;
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
															stateValues.includes(dotValue) && 'es:opacity-0',
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
															{markers && markers !== 'dots' ? labelData : null}
														</span>
													</div>
												);
											})}
										</div>
									) : null}

									{stateValues.map((thumbValue, index) => (
										<ReactAriaSliderThumb
											key={index}
											index={index}
											onHoverStart={() => setHoveredThumbs((previous) => [...previous, index])}
											onHoverEnd={() => setHoveredThumbs((previous) => previous.filter((entry) => entry !== index))}
											aria-label={thumbLabels?.[index]}
											className={clsx(
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
												gridColumn: vertical ? undefined : markerIndices[index],
												gridRow: vertical ? markerIndices[index] : undefined,
											}}
										>
											{thumbContent ? thumbContent(index) : null}

											<AnimatePresence>
												{state.focusedThumb === index || hoveredThumbs.includes(index) ? (
													<motion.div
														className={clsx(
															'es:absolute es:text-nowrap es:w-fit es:min-w-5 es:h-6',
															!vertical && 'es:bottom-12 es:-translate-x-1/2',
															vertical && 'es:left-12 es:-translate-y-1/2',
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
														{tooltipContent(thumbValue)}
													</motion.div>
												) : null}
											</AnimatePresence>
										</ReactAriaSliderThumb>
									))}

									{gridTemplate.map((segment, index) => {
										if (segment === 'auto' || segment.endsWith('px') || segment.endsWith('rem')) {
											return null;
										}

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

										const extraStyles: CSSProperties = {};

										if (trackBgGradientSupport) {
											let bgOffset = 0;

											if (index === lastTrackIndex) {
												bgOffset = 100;
											} else if (index > 0) {
												const backgroundSegments = tracks
													.slice(0, startPoint !== null && firstStateValue > startPoint ? index + 1 : index)
													.filter((currentValue): currentValue is number => currentValue !== null);

												bgOffset = backgroundSegments.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
											}

											extraStyles.backgroundSize = '100cqw 100%';
											extraStyles.backgroundPositionX = `${bgOffset}%`;
										}

										const cellPosition = index + 1;

										return (
											<div
												key={index}
												className={clsx(
													'es:rounded-sm',
													'es:transition es:duration-300 es:ease-spring-smooth',
													!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
													!vertical && [
														'es:h-6 es:row-1',
														index === 0 && 'es:rounded-l-xl',
														index === gridTemplate.length - 1 && 'es:rounded-r-xl',
														!isRange && [
															startPoint === null && [firstStateValue > min && index < firstMarkerIndex && activeStyle, index > firstMarkerIndex && inactiveStyle],
															startPoint !== null && [
																firstStateValue < startPoint && index === firstMarkerIndex + 1 && activeStyle,
																firstStateValue > startPoint && index === firstMarkerIndex - 3 && activeStyle,
																firstStateValue <= startPoint && index !== firstMarkerIndex + 1 && inactiveStyle,
																firstStateValue >= startPoint && index !== firstMarkerIndex - 3 && inactiveStyle,
															],
														],
														isRange && [index > firstMarkerIndex && index < lastMarkerIndex && activeStyle, (index < firstMarkerIndex || index > lastMarkerIndex) && inactiveStyle],
													],
													vertical && [
														'es:w-6 es:col-1',
														index === 0 && 'es:rounded-t-xl',
														index === gridTemplate.length - 1 && 'es:rounded-b-xl',
														!isRange && [
															startPoint === null && [firstStateValue > min && index > firstMarkerIndex && activeStyle, index < lastMarkerIndex && inactiveStyle],
															startPoint !== null && [
																lastStateValue > startPoint && index === lastMarkerIndex + 1 && activeStyle,
																lastStateValue < startPoint && index === lastMarkerIndex - 3 && activeStyle,
																lastStateValue >= startPoint && index !== lastMarkerIndex + 1 && inactiveStyle,
																lastStateValue <= startPoint && index !== lastMarkerIndex - 3 && inactiveStyle,
															],
														],
														isRange && [index < firstMarkerIndex && index > lastMarkerIndex && activeStyle, (index > firstMarkerIndex || index < lastMarkerIndex) && inactiveStyle],
													],
												)}
												style={{
													gridColumn: vertical ? undefined : cellPosition,
													gridRow: vertical ? cellPosition : undefined,
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

					{after ? <HStack>{after}</HStack> : null}
				</div>
			</BaseControl>
		</ReactAriaSlider>
	);
};
