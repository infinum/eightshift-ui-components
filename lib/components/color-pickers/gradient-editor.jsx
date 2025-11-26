import { __, sprintf } from '@wordpress/i18n';
import { useMemo, useState } from 'react';
import { parseConicGradient, parseLinearGradient, parseRadialGradient } from 'css-gradient-parser';
import { Button, ButtonGroup } from '../button/button';
import { icons } from '../../icons/icons';
import { SolidColorPicker } from './solid-color-picker';
import { Slider } from '../slider/slider';
import { NumberPicker } from '../number-picker/number-picker';
import { ColorSwatch } from 'react-aria-components';
import { Menu, MenuItem } from '../menu/menu';
import { MatrixAlign } from '../matrix-align/matrix-align';
import { Toggle } from '../toggle/toggle';
import { OptionSelect } from '../option-select/option-select';
import { DraggableList } from '../draggable-list/draggable-list';
import { DraggableListItem } from '../draggable-list/draggable-list-item';
import { TriggeredPopover } from '../popover/popover';
import { clsx } from 'clsx';
import { Container, ContainerGroup } from '../base-control/container';
import { BaseControl } from '../base-control/base-control';
import { isColorDark } from '../../utilities';
import { srgb } from '@thi.ng/color';

const getGradientResult = (input, type) => {
	if (!input || !type) {
		return '';
	}

	if (typeof input === 'string' || !input?.stops) {
		return '';
	}

	let output = '';

	const { repeating } = input;

	if (repeating) {
		output += 'repeating-';
	}

	output += `${type}-gradient(`;

	if (type === 'linear') {
		const { orientation } = input;

		if (orientation?.type === 'angular') {
			output += `${orientation.value.value}${orientation.value.unit}, `;
		} else if (orientation?.type === 'directional') {
			output += `to ${orientation.value}, `;
		}
	}

	if (type === 'radial') {
		const { shape, position } = input;

		output += `${shape ?? 'circle'} at ${position?.x?.value ?? 'center'} ${position?.y?.value ?? 'center'}, `;
	}

	if (type === 'conic') {
		const { angle, position } = input;

		output += `from ${angle ?? '0deg'} at ${position ?? 'center'}, `;
	}

	output += input.stops
		.map((stop) => {
			return `${stop.color} ${stop.offset?.value ?? ''}${stop.offset?.unit ?? ''}`.trim();
		})
		.join(', ');

	output += ')';

	return output;
};

const gradientTypes = [
	{
		label: __('Linear'),
		value: 'linear',
		icon: <div className='es:transparent es:size-4 es:rounded-full es:bg-linear-to-br es:from-current' />,
	},
	{
		label: __('Radial'),
		value: 'radial',
		icon: <div className='es:transparent es:size-4 es:rounded-full es:bg-radial es:from-current/75 es:to-current/10' />,
	},
	{
		label: __('Conic'),
		value: 'conic',
		icon: <div className='es:transparent es:size-4 es:rounded-full es:bg-conic es:from-current' />,
	},
];

const linearDirections = [
	{
		label: __('Right'),
		value: 'right',
		iconClass: 'es:bg-linear-to-r',
		valueDegrees: 90,
	},
	{
		label: __('Left'),
		value: 'left',
		iconClass: 'es:bg-linear-to-l',
		valueDegrees: 180,
	},
	{
		label: __('Top'),
		value: 'top',
		iconClass: 'es:bg-linear-to-t',
		valueDegrees: 270,
	},
	{
		label: __('Bottom'),
		value: 'bottom',
		iconClass: 'es:bg-linear-to-b',
		valueDegrees: 90,
	},
	{
		label: __('Top-right'),
		value: 'top right',
		iconClass: 'es:bg-linear-to-tr',
		valueDegrees: 45,
	},
	{
		label: __('Top-left'),
		value: 'top left',
		iconClass: 'es:bg-linear-to-tl',
		valueDegrees: 315,
	},
	{
		label: __('Bottom-right'),
		value: 'bottom right',
		iconClass: 'es:bg-linear-to-br',
		valueDegrees: 135,
	},
	{
		label: __('Bottom-left'),
		value: 'bottom left',
		iconClass: 'es:bg-linear-to-bl',
		valueDegrees: 225,
	},
];

/**
 * A simple gradient editor.
 * Allows editing linear, radial, and conic gradients.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.value - The gradient definition.
 * @param {Function} props.onChange - Function to run when the gradient changes.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The GradientEditor component.
 *
 * @example
 * <GradientEditor
 * 	value='linear-gradient(90deg, #000000 0%, #ffffff 100%)'
 * 	onChange={setGradient}
 * />
 *
 * @preserve
 */
export const GradientEditor = (props) => {
	const { value, onChange, hidden } = props;

	const gradientData = useMemo(() => {
		if (value?.startsWith('radial-gradient') || value?.startsWith('repeating-radial-gradient')) {
			return parseRadialGradient(value ?? '');
		}

		if (value?.startsWith('conic-gradient') || value?.startsWith('repeating-conic-gradient')) {
			return parseConicGradient(value ?? '');
		}

		return parseLinearGradient(value ?? '');
	}, [value]);

	const gradientType = useMemo(() => {
		if ((typeof value === 'string' && value?.startsWith('radial-gradient')) || value?.startsWith('repeating-radial-gradient')) {
			return 'radial';
		}

		if ((typeof value === 'string' && value?.startsWith('conic-gradient')) || value?.startsWith('repeating-conic-gradient')) {
			return 'conic';
		}

		return 'linear';
	}, [value]);

	const setGradientData = (data) => {
		onChange(getGradientResult(data, gradientType));
	};

	const outputGradient = useMemo(() => getGradientResult(gradientData, gradientType), [gradientData, gradientType]);

	const [squarePreview, setSquarePreview] = useState(false);

	if (hidden) {
		return null;
	}

	return (
		<div className='es:w-full es:space-y-2.5'>
			<ContainerGroup>
				<Container>
					<button
						className={clsx(
							'es:shadow-sm, es:mx-auto es:block es:h-40 es:cursor-pointer es:rounded-lg es:border es:border-secondary-300 es:transition-[width] es:duration-300 es:ease-spring-snappy',
							'es:mb-2',
							squarePreview ? 'es:w-40' : 'es:w-full',
						)}
						style={{ backgroundImage: outputGradient }}
						onClick={() => setSquarePreview((prev) => !prev)}
						aria-label={__('Toggle preview size', 'eightshift-ui-components')}
					/>

					<Slider
						className='es:mb-5'
						aria-label={__('Stop positions', 'eightshift-ui-components')}
						min={0}
						max={100}
						step={1}
						value={gradientData?.stops?.map(({ offset }, i) => {
							if (!offset) {
								return (i * 100) / (gradientData.stops.length - 1);
							}

							return parseInt(offset?.value);
						})}
						onChange={(value) => {
							setGradientData({
								...gradientData,
								stops: gradientData.stops.map((stop, i) => {
									return {
										...stop,
										offset: { value: value[i], unit: '%' },
									};
								}),
							});
						}}
						thumbContent={(index) => {
							const colorData = srgb(gradientData.stops[index]?.color);

							let foregroundColor = 'black';

							if (colorData.alpha >= 0.5 && isColorDark(colorData.r, colorData.g, colorData.b)) {
								foregroundColor = 'white';
							}

							return (
								<div
									className='es:pointer-events-none es:absolute es:-bottom-4.5 es:-translate-x-1/3 es:flex es:w-3 es:items-center es:justify-center es:text-center es:text-12 es:leading-none es:py-0.25 es:rounded-sm es:font-semibold es:tabular-nums es:font-mono es:ring es:ring-accent-600'
									style={{
										backgroundColor: gradientData.stops[index]?.color,
										color: foregroundColor,
									}}
								>
									{index + 1}
								</div>
							);
						}}
						noActiveHighlight
						tooltipContent={(value) => `${Math.round(value)}%`}
					/>
				</Container>
			</ContainerGroup>

			<ContainerGroup>
				<Container>
					<OptionSelect
						label={__('Type', 'eightshift-ui-components')}
						value={gradientType}
						onChange={(value) => onChange(getGradientResult({ stops: gradientData.stops }, value))}
						options={gradientTypes}
						type='toggleButtons'
						inline
					/>
				</Container>

				<Container hidden={gradientType !== 'linear'}>
					<NumberPicker
						inline
						icon={icons.angle}
						label={__('Angle', 'eightshift-ui-components')}
						min={0}
						max={360}
						step={1}
						value={gradientData?.orientation?.type === 'angular' ? gradientData?.orientation?.value?.value : null}
						onChange={(angle) => {
							setGradientData({
								...gradientData,
								orientation: { type: 'angular', value: { value: angle, unit: 'deg' } },
							});
						}}
						suffix='°'
						size='medium'
						className='es:grow'
						placeholder={linearDirections.find(({ value }) => value === gradientData?.orientation?.value)?.valueDegrees ?? ''}
					>
						<Menu
							triggerIcon={icons.sliders}
							triggerProps={{
								tooltip: __('Presets', 'eightshift-ui-components'),
								slot: null,
							}}
							keepOpen
						>
							{linearDirections.map(({ label, value, iconClass }) => {
								return (
									<MenuItem
										key={value}
										icon={<div className={clsx('es:size-5 es:rounded-sm es:from-secondary-700 es:to-secondary-200', iconClass)} />}
										onClick={() => {
											setGradientData({
												...gradientData,
												orientation: { type: 'directional', value: value },
											});
										}}
									>
										{label}
									</MenuItem>
								);
							})}
						</Menu>
					</NumberPicker>
				</Container>

				<Container hidden={gradientType !== 'radial'}>
					<OptionSelect
						label={__('Shape', 'eightshift-ui-components')}
						icon={icons.genericShapesAlt}
						inline
						options={[
							{ label: __('Circle', 'eightshift-ui-components'), value: 'circle' },
							{ label: __('Ellipse', 'eightshift-ui-components'), value: 'ellipse' },
						]}
						value={gradientData.shape}
						onChange={(value) => {
							setGradientData({
								...gradientData,
								shape: value,
							});
						}}
					/>
				</Container>

				<Container hidden={gradientType !== 'radial'}>
					<MatrixAlign
						icon={icons.centerPoint}
						label={__('Center point', 'eightshift-ui-components')}
						value={`${gradientData?.position?.y?.value ?? 'center'} ${gradientData?.position?.x?.value ?? 'center'}`}
						onChange={(position) => {
							const [x, y] = position.split(' ');

							setGradientData({
								...gradientData,
								position: {
									x: { type: 'keyword', value: x },
									y: { type: 'keyword', value: y },
								},
							});
						}}
					/>
				</Container>

				<Container hidden={gradientType !== 'conic'}>
					<NumberPicker
						inline
						icon={icons.angle}
						label={__('Angle', 'eightshift-ui-components')}
						min={0}
						max={360}
						step={1}
						value={parseInt(gradientData?.angle?.replace('deg', ''))}
						onChange={(value) => {
							setGradientData({
								...gradientData,
								angle: `${value}deg`,
							});
						}}
						size='medium'
						suffix='°'
					/>
				</Container>

				<Container hidden={gradientType !== 'conic'}>
					<MatrixAlign
						icon={icons.centerPoint}
						label={__('Center point', 'eightshift-ui-components')}
						value={`${gradientData?.position?.y?.value ?? 'center'} ${gradientData?.position?.x?.value ?? 'center'}`}
						onChange={(value) => {
							setGradientData({
								...gradientData,
								position: value,
							});
						}}
					/>
				</Container>

				<Container>
					<Toggle
						checked={gradientData.repeating}
						onChange={(value) => {
							setGradientData({
								...gradientData,
								repeating: value,
							});
						}}
						label={__('Repeating', 'eightshift-ui-components')}
						icon={icons.gradientRepeat}
					/>
				</Container>
			</ContainerGroup>

			<BaseControl
				icon={icons.gradientStop}
				label={__('Gradient stops', 'eightshift-ui-components')}
				inline
			>
				<Button
					icon={icons.add}
					size='small'
					onPress={() => {
						setGradientData({
							...gradientData,
							stops: [...gradientData.stops, { color: '#000000FF' }],
						});
					}}
					type='simple'
					aria-label={__('Add stop', 'eightshift-ui-components')}
				/>
			</BaseControl>

			<ContainerGroup>
				<DraggableList
					items={gradientData?.stops}
					onChange={(items) => {
						setGradientData({
							...gradientData,
							stops: items.map(({ color }, i) => ({
								...(gradientData.stops[i] ?? {}),
								color,
							})),
						});
					}}
					orientation='vertical'
					className='es:contents'
				>
					{(item) => {
						const { color, updateData, itemIndex } = item;

						return (
							<DraggableListItem
								label={sprintf(__('Stop %s', 'eightshift-ui-components'), itemIndex + 1)}
								subtitle={color}
								icon={
									<ColorSwatch
										className='es:size-5 es:rounded-full es:border es:border-white es:ring-1 es:ring-black'
										color={color}
									/>
								}
							>
								<ButtonGroup>
									<TriggeredPopover
										triggerButtonIcon={icons.color}
										triggerButtonProps={{ size: 'small', type: 'ghost' }}
										className='es:p-2.5'
									>
										<SolidColorPicker
											value={color}
											onChange={(color) => {
												updateData({ color });
											}}
											allowTransparency
											outputFormat='rgba'
										/>
									</TriggeredPopover>
									<Button
										onPress={() => {
											setGradientData({
												...gradientData,
												stops: gradientData.stops.filter((_, i) => i !== itemIndex),
											});
										}}
										icon={icons.trash}
										size='small'
										aria-label={__('Delete stop', 'eightshift-ui-components')}
										disabled={gradientData.stops.length <= 2}
										type='dangerGhost'
									/>
								</ButtonGroup>
							</DraggableListItem>
						);
					}}
				</DraggableList>
			</ContainerGroup>
		</div>
	);
};
