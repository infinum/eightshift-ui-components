import { __, sprintf } from '@wordpress/i18n';
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
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

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
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
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

		flat,

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
					className='es:isolate es:grid es:h-10 es:w-full es:grid-rows-1 es:has-dragging:cursor-grabbing'
					style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
				>
					{({ state }) => {
						return (
							<>
								<div
									className={clsx(
										'es:row-span-1 es:row-start-1 es:w-fill es:h-6 es:self-center es:my-0.5',
										'es:rounded-l-xl es:rounded-r-sm',
										'es:transition-plus-m es:duration-300 es:ease-spring-smooth',
										!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
										!disabled && ['es:bg-surface-200', 'es:bg-linear-to-b es:from-surface-700/0 es:to-surface-700/5 es:from-25%', 'es:inset-ring es:inset-ring-surface-300/20'],
										disabled && 'es:bg-secondary-200',
										!disableOffset && 'es:mr-1.25',
										value[0] < 2 && 'es:hidden',
									)}
									style={{ gridColumn: `1 / span ${Math.max(0, value[0] - 1)}` }}
								/>

								<div
									className={clsx(
										'es:row-span-1 es:row-start-1 es:w-fill es:h-6 es:self-center es:my-0.5',
										'es:rounded-l-sm es:rounded-r-xl',
										'es:transition-plus-m es:duration-300 es:ease-spring-smooth',
										!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
										!disabled && ['es:bg-surface-200', 'es:bg-linear-to-b es:from-surface-700/0 es:to-surface-700/5 es:from-25%', 'es:inset-ring es:inset-ring-surface-300/20'],
										disabled && 'es:bg-secondary-200',
										!disableWidth && 'es:ml-1.25',
										value[1] === columns && 'es:hidden',
									)}
									style={{ gridColumn: `${value[1] + 1} / span ${columns - value[1]}` }}
								/>

								<div
									className={clsx(
										'es:pointer-events-none es:col-start-1 es:row-start-1',
										'es:h-6 es:w-fill es:self-center es:rounded-sm es:my-0.5',
										'es:transition es:duration-300',
										!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
										'es:mx-1.25',
										value[0] === 1 && 'es:ml-4.25',
										value[1] === columns && 'es:mr-4.25',
										!disabled && [
											'es:bg-accent-500 es:bg-linear-to-b es:from-accent-100/15 es:to-accent-100/0 es:from-25%',
											'es:inset-ring es:inset-ring-accent-700/10',
											'es:inset-shadow-sm es:inset-shadow-accent-50/30',
										],
										disabled && 'es:bg-secondary-400',
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
												'es:row-span-1 es:row-start-1 es:select-none es:place-self-center',
												'es:icon:size-2 es:icon:stroke-3',
												'es:transition es:duration-300 es:ease-spring-smooth',
												marker >= value[0] - 1 && marker < value[1] ? 'es:text-accent-900' : 'es:text-surface-400',
												disabled && 'es:opacity-0',
												!disableOffset && index === 0 && value[0] === 2 && 'es:-translate-x-0.25',
												!disableWidth && index === columns - 1 && value[1] === columns - 1 && 'es:translate-x-0.25',
												!disableOffset && index === 0 && value[0] === 1 && 'es:opacity-0 es:scale-50',
												!disableWidth && index === columns - 1 && value[1] === columns && 'es:opacity-0 es:scale-50',
											)}
											style={{ gridColumn: index + 1 }}
										>
											{showOuterAsGutter && index === 0 && icons.chevronLeft}
											{showOuterAsGutter && index === columns - 1 && icons.chevronRight}
										</span>
									);
								})}

								{markerData.map((marker, i) => (
									<div
										key={marker}
										className={clsx(
											'es:row-span-1 es:row-start-1 es:size-0.75 es:place-self-center es:rounded-2xl',
											!disabled && marker >= value[0] - 1 && marker < value[1] && 'es:bg-accent-50',
											!disabled && !(marker >= value[0] - 1 && marker < value[1]) && 'es:bg-surface-500',
											disabled && marker >= value[0] - 1 && marker < value[1] && 'es:bg-secondary-300',
											disabled && !(marker >= value[0] - 1 && marker < value[1]) && 'es:bg-secondary-400',
											showOuterAsGutter && (i === 0 || i === columns - 1) && 'es:hidden',
										)}
										style={{ gridColumn: i + 1 }}
									/>
								))}

								{state.values.map((_, i) => {
									let gridCol = `${state.values[i] - (i === 0 ? 1 : 0)} / span 2`;

									if (i === 0 && state.values[0] === 1) {
										gridCol = '1';
									}

									if (i === 1 && state.values[1] === columns) {
										gridCol = `${columns}`;
									}

									return (
										<ReactAriaSliderThumb
											key={i}
											index={i}
											aria-label={thumbLabels?.[i]}
											isDisabled={(i === 0 && disableOffset) || (i === 1 && disableWidth)}
											className={clsx(
												'es:static! es:row-span-1 es:row-start-1 es:h-full es:w-1 es:rounded-md es:transition es:duration-300',
												'es:origin-center',
												'es:hover:ring-[0.25px] es:focus-visible:ring-[0.5px] es:dragging:ring-[1px] es:ring-accent-500',
												'es:transform-none!',
												'es:dragging:es:bg-accent-600 es:disabled:bg-secondary-400',
												'es:focus-visible:outline-2 es:outline-offset-2 es:outline-accent-500/40',
												'es:bg-accent-500',
												'es:hover:ring-accent-600',
												'es:dragging:bg-accent-600 es:dragging:ring-accent-600',
												!disabled && 'es:hover:not-dragging:cursor-grab',
												i === 0 && disableOffset && 'es:hidden',
												i === 1 && disableWidth && 'es:hidden',
												'es:justify-self-center',
												!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
											)}
											style={{
												gridColumn: gridCol,
											}}
										>
											<AnimatePresence>
												{i === state.focusedThumb && (
													<motion.div
														className={clsx(
															'es:absolute es:bottom-12 es:w-fit es:min-w-5 es:h-6 es:text-nowrap es:-translate-x-1/2',
															'es:bg-surface-50/80 es:text-surface-700',
															'es:backdrop-blur-xs',
															'es:text-12 es:leading-none',
															'es:py-1 es:px-2 es:rounded-lg',
															'es:text-center',
															'es:line-clamp-1',
															'es:flex es:items-center es:justify-center es:gap-1',
															'es:shadow',
															showOuterAsGutter && 'es:icon:size-2 es:icon:stroke-3',
														)}
														initial={{ y: 2, opacity: 0, scale: 0.85 }}
														animate={{ y: 0, opacity: 1, scale: 1 }}
														exit={{ y: 2, opacity: 0, scale: 0.85 }}
													>
														{i === 0 && showOuterAsGutter && state.values[0] > 1 && sprintf(__('From %d', 'infobip2024'), state.values[i] - 1)}
														{i === 0 && showOuterAsGutter && state.values[0] === 1 && __('From start gutter', 'infobip2024')}
														{i === 1 && showOuterAsGutter && state.values[1] < columns && sprintf(__('To %d', 'infobip2024'), state.values[i])}
														{i === 1 && showOuterAsGutter && state.values[1] === columns && __('To end gutter', 'infobip2024')}
														{!showOuterAsGutter && i === 0 && (
															<>
																{state.values[0] > 1 && sprintf(__('From %d', 'infobip2024'), state.values[i])}
																{state.values[0] === 1 && __('From start', 'infobip2024')}
															</>
														)}
														{!showOuterAsGutter && i === 1 && (
															<>
																{state.values[1] < columns && sprintf(__('To %d', 'infobip2024'), state.values[i])}
																{state.values[1] === columns && __('To end', 'infobip2024')}
															</>
														)}
													</motion.div>
												)}
											</AnimatePresence>
										</ReactAriaSliderThumb>
									);
								})}
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
