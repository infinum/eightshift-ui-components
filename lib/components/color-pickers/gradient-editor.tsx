import { __, sprintf } from '@wordpress/i18n';
import { parseConicGradient, parseLinearGradient, parseRadialGradient } from 'css-gradient-parser';
import { clsx } from 'clsx';
import { srgb } from '@thi.ng/color';
import { useMemo, useState, type JSX, type ReactNode } from 'react';

import { Container, ContainerGroup } from '../base-control/container';
import { BaseControl } from '../base-control/base-control';
import { Button, ButtonGroup } from '../button/button';
import { DraggableList } from '../draggable-list/draggable-list';
import { DraggableListItem } from '../draggable-list/draggable-list-item';
import { MatrixAlign } from '../matrix-align/matrix-align';
import { Menu, MenuItem } from '../menu/menu';
import { NumberPicker } from '../number-picker/number-picker';
import { OptionSelect } from '../option-select/option-select';
import { TriggeredPopover } from '../popover/popover';
import { Slider } from '../slider/slider';
import { Toggle } from '../toggle/toggle';
import { add, angle, centerPoint, genericShapesAlt, gradientRepeat, gradientStop, sliders, trash } from '../../icons/internal';
import { isColorDark } from '../../utilities';
import { ColorSwatch } from './color-swatch';
import { SolidColorPicker } from './solid-color-picker';

type GradientType = 'linear' | 'radial' | 'conic';
type MatrixAlignValue = 'top left' | 'top center' | 'top right' | 'center left' | 'center center' | 'center right' | 'bottom left' | 'bottom center' | 'bottom right';
type GradientStop = {
	color: string;
	offset?: {
		value?: string | number;
		unit?: string;
	};
};
type LinearOrientation =
	| {
			type: 'angular';
			value: {
				value: string | number;
				unit: string;
			};
	  }
	| {
			type: 'directional';
			value: string;
	  };
type PositionAxis = {
	type: 'keyword' | 'length';
	value: string;
};
type RadialPosition = {
	x?: PositionAxis;
	y?: PositionAxis;
};
type GradientData = {
	repeating?: boolean;
	stops: GradientStop[];
	orientation?: LinearOrientation;
	shape?: 'circle' | 'ellipse';
	position?: string | RadialPosition;
	angle?: string;
	size?: Array<{
		type: 'keyword' | 'length';
		value: string;
	}>;
};
type GradientEditorProps = {
	value?: string | null;
	onChange: (value: string) => void;
	hidden?: boolean;
};

const TypedDraggableList = DraggableList as (props: {
	children: (item: GradientStop & { updateData: (newValue: Partial<GradientStop>) => void; itemIndex: number; deleteItem: () => void }) => ReactNode;
	items?: GradientStop[] | null;
	onChange: (items: GradientStop[]) => void;
	className?: string;
	itemContainerClassName?: string;
	itemClassName?: string;
	hidden?: boolean;
}) => ReactNode;

const defaultGradientData: GradientData = {
	repeating: false,
	orientation: {
		type: 'angular',
		value: {
			value: '90',
			unit: 'deg',
		},
	},
	stops: [
		{
			color: '#000000',
			offset: {
				value: '0',
				unit: '%',
			},
		},
		{
			color: '#ffffff',
			offset: {
				value: '100',
				unit: '%',
			},
		},
	],
};

const getGradientResult = (input: GradientData | string | null | undefined, type: GradientType | null | undefined) => {
	if (!input || !type || typeof input === 'string' || !input.stops) {
		return '';
	}

	let output = '';

	if (input.repeating) {
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
		const radialPosition = typeof input.position === 'object' ? input.position : undefined;

		output += `${input.shape ?? 'circle'} at ${radialPosition?.x?.value ?? 'center'} ${radialPosition?.y?.value ?? 'center'}, `;
	}

	if (type === 'conic') {
		const conicPosition = typeof input.position === 'string' ? input.position : 'center';

		output += `from ${input.angle ?? '0deg'} at ${conicPosition}, `;
	}

	output += input.stops.map((stop) => `${stop.color} ${stop.offset?.value ?? ''}${stop.offset?.unit ?? ''}`.trim()).join(', ');

	output += ')';

	return output;
};

const gradientTypes: Array<{ label: string; value: GradientType; icon: JSX.Element }> = [
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
] as const;

const linearDirections = [
	{ label: __('Right'), value: 'right', iconClass: 'es:bg-linear-to-r', valueDegrees: 90 },
	{ label: __('Left'), value: 'left', iconClass: 'es:bg-linear-to-l', valueDegrees: 180 },
	{ label: __('Top'), value: 'top', iconClass: 'es:bg-linear-to-t', valueDegrees: 270 },
	{ label: __('Bottom'), value: 'bottom', iconClass: 'es:bg-linear-to-b', valueDegrees: 90 },
	{ label: __('Top-right'), value: 'top right', iconClass: 'es:bg-linear-to-tr', valueDegrees: 45 },
	{ label: __('Top-left'), value: 'top left', iconClass: 'es:bg-linear-to-tl', valueDegrees: 315 },
	{ label: __('Bottom-right'), value: 'bottom right', iconClass: 'es:bg-linear-to-br', valueDegrees: 135 },
	{ label: __('Bottom-left'), value: 'bottom left', iconClass: 'es:bg-linear-to-bl', valueDegrees: 225 },
] as const;

const getGradientType = (value?: string | null): GradientType => {
	if (value?.startsWith('radial-gradient') || value?.startsWith('repeating-radial-gradient')) {
		return 'radial';
	}

	if (value?.startsWith('conic-gradient') || value?.startsWith('repeating-conic-gradient')) {
		return 'conic';
	}

	return 'linear';
};

const parseGradientData = (value: string | null | undefined, type: GradientType): GradientData => {
	try {
		if (type === 'radial') {
			return parseRadialGradient(value ?? '') as GradientData;
		}

		if (type === 'conic') {
			return parseConicGradient(value ?? '') as GradientData;
		}

		return parseLinearGradient(value ?? '') as GradientData;
	} catch {
		return defaultGradientData;
	}
};

const toMatrixAlignValue = (x = 'center', y = 'center') => `${y} ${x}` as MatrixAlignValue;

const parseMatrixAlignValue = (value: string) => {
	const [y = 'center', x = 'center'] = value.split(' ');

	return { x, y };
};

export const GradientEditor = (props: GradientEditorProps) => {
	const { value, onChange, hidden } = props;
	const gradientType = useMemo(() => getGradientType(value), [value]);
	const gradientData = useMemo(() => parseGradientData(value, gradientType), [gradientType, value]);
	const outputGradient = useMemo(() => getGradientResult(gradientData, gradientType), [gradientData, gradientType]);
	const [squarePreview, setSquarePreview] = useState(false);

	if (hidden) {
		return null;
	}

	const setGradientData = (data: GradientData) => {
		onChange(getGradientResult(data, gradientType));
	};

	const stops = gradientData.stops ?? defaultGradientData.stops;
	const radialPosition = typeof gradientData.position === 'object' ? gradientData.position : undefined;
	const conicPosition = typeof gradientData.position === 'string' ? gradientData.position : 'center center';

	return (
		<div className='es:w-full es:space-y-2.5'>
			<ContainerGroup>
				<Container>
					<button
						className={clsx(
							'es:shadow-sm, es:mx-auto es:block es:h-40 es:rounded-lg es:border es:border-secondary-300 es:transition-[width] es:duration-300 es:ease-spring-snappy',
							'es:mb-2',
							squarePreview ? 'es:w-40' : 'es:w-full',
						)}
						style={{ backgroundImage: outputGradient }}
						onClick={() => setSquarePreview((previousValue) => !previousValue)}
						aria-label={__('Toggle preview size', 'eightshift-ui-components')}
					/>

					<div className='es:mb-5'>
						<Slider
							aria-label={__('Stop positions', 'eightshift-ui-components')}
							min={0}
							max={100}
							step={1}
							value={stops.map(({ offset }, index) => {
								if (!offset) {
									return stops.length > 1 ? (index * 100) / (stops.length - 1) : 0;
								}

								return parseInt(String(offset.value), 10);
							})}
							onChange={(nextValue) => {
								if (!Array.isArray(nextValue)) {
									return;
								}

								setGradientData({
									...gradientData,
									stops: stops.map((stop, index) => ({
										...stop,
										offset: { value: nextValue[index], unit: '%' },
									})),
								});
							}}
							thumbContent={(index) => {
								const colorData = srgb(stops[index]?.color ?? '#000000');

								let foregroundColor = 'black';

								if (colorData.alpha >= 0.5 && isColorDark(colorData.r, colorData.g, colorData.b)) {
									foregroundColor = 'white';
								}

								return (
									<div
										className='es:pointer-events-none es:absolute es:-bottom-4.5 es:-translate-x-1/3 es:flex es:w-3 es:items-center es:justify-center es:text-center es:text-12 es:leading-none es:py-px es:rounded-sm es:font-semibold es:tabular-nums es:font-mono es:ring es:ring-accent-600'
										style={{
											backgroundColor: stops[index]?.color,
											color: foregroundColor,
										}}
									>
										{index + 1}
									</div>
								);
							}}
							noActiveHighlight
							tooltipContent={(currentValue) => `${Math.round(currentValue)}%`}
						/>
					</div>
				</Container>
			</ContainerGroup>

			<ContainerGroup>
				<Container>
					<OptionSelect
						label={__('Type', 'eightshift-ui-components')}
						value={gradientType}
						onChange={(nextType) => onChange(getGradientResult({ stops }, nextType as GradientType))}
						options={gradientTypes}
						type='toggleButtons'
						inline
					/>
				</Container>

				<Container hidden={gradientType !== 'linear'}>
					<NumberPicker
						inline
						icon={angle}
						label={__('Angle', 'eightshift-ui-components')}
						min={0}
						max={360}
						step={1}
						value={gradientData.orientation?.type === 'angular' ? Number(gradientData.orientation.value.value) : undefined}
						onChange={(nextAngle) => {
							setGradientData({
								...gradientData,
								orientation: { type: 'angular', value: { value: nextAngle, unit: 'deg' } },
							});
						}}
						suffix='°'
						size='medium'
						className='es:grow'
						placeholder={String(
							linearDirections.find(({ value }) => value === (gradientData.orientation?.type === 'directional' ? gradientData.orientation.value : undefined))?.valueDegrees ?? '',
						)}
					>
						<Menu
							triggerIcon={sliders}
							triggerProps={{
								tooltip: __('Presets', 'eightshift-ui-components'),
								slot: null,
							}}
							keepOpen
						>
							{linearDirections.map(({ label, value, iconClass }) => (
								<MenuItem
									key={value}
									icon={<div className={clsx('es:size-5 es:rounded-sm es:from-secondary-700 es:to-secondary-200', iconClass)} />}
									onClick={() => {
										setGradientData({
											...gradientData,
											orientation: { type: 'directional', value },
										});
									}}
								>
									{label}
								</MenuItem>
							))}
						</Menu>
					</NumberPicker>
				</Container>

				<Container hidden={gradientType !== 'radial'}>
					<OptionSelect
						label={__('Shape', 'eightshift-ui-components')}
						icon={genericShapesAlt}
						inline
						options={[
							{ label: __('Circle', 'eightshift-ui-components'), value: 'circle' },
							{ label: __('Ellipse', 'eightshift-ui-components'), value: 'ellipse' },
						]}
						value={gradientData.shape}
						onChange={(nextValue) => {
							setGradientData({
								...gradientData,
								shape: nextValue as 'circle' | 'ellipse',
							});
						}}
					/>
				</Container>

				<Container hidden={gradientType !== 'radial'}>
					<MatrixAlign
						icon={centerPoint}
						label={__('Center point', 'eightshift-ui-components')}
						value={toMatrixAlignValue(radialPosition?.x?.value, radialPosition?.y?.value)}
						onChange={(nextPosition) => {
							const { x, y } = parseMatrixAlignValue(nextPosition);

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
						icon={angle}
						label={__('Angle', 'eightshift-ui-components')}
						min={0}
						max={360}
						step={1}
						value={parseInt(gradientData.angle?.replace('deg', '') ?? '0', 10)}
						onChange={(nextValue) => {
							setGradientData({
								...gradientData,
								angle: `${nextValue}deg`,
							});
						}}
						size='medium'
						suffix='°'
					/>
				</Container>

				<Container hidden={gradientType !== 'conic'}>
					<MatrixAlign
						icon={centerPoint}
						label={__('Center point', 'eightshift-ui-components')}
						value={(() => {
							const [x = 'center', y = 'center'] = conicPosition.split(' ');

							return toMatrixAlignValue(x, y);
						})()}
						onChange={(nextValue) => {
							const { x, y } = parseMatrixAlignValue(nextValue);

							setGradientData({
								...gradientData,
								position: `${x} ${y}`,
							});
						}}
					/>
				</Container>

				<Container>
					<Toggle
						checked={Boolean(gradientData.repeating)}
						onChange={(nextValue) => {
							setGradientData({
								...gradientData,
								repeating: nextValue,
							});
						}}
						label={__('Repeating', 'eightshift-ui-components')}
						icon={gradientRepeat}
					/>
				</Container>
			</ContainerGroup>

			<BaseControl
				icon={gradientStop}
				label={__('Gradient stops', 'eightshift-ui-components')}
				inline
			>
				<Button
					icon={add}
					size='small'
					onPress={() => {
						setGradientData({
							...gradientData,
							stops: [...stops, { color: '#000000FF' }],
						});
					}}
					type='simple'
					aria-label={__('Add stop', 'eightshift-ui-components')}
				/>
			</BaseControl>

			<ContainerGroup>
				<TypedDraggableList
					items={stops}
					onChange={(items) => {
						setGradientData({
							...gradientData,
							stops: items.map(({ color }, index) => ({
								...(stops[index] ?? {}),
								color,
							})),
						});
					}}
					className='es:contents'
				>
					{(item) => {
						const { color, updateData, itemIndex } = item;

						return (
							<DraggableListItem
								label={sprintf(__('Stop %s', 'eightshift-ui-components'), String(itemIndex + 1))}
								subtitle={color}
								icon={
									<TriggeredPopover
										triggerButtonIcon={
											<ColorSwatch
												className='es:size-5.5 es:rounded-full es:border es:border-white es:ring-1 es:ring-black'
												color={color}
											/>
										}
										triggerButtonProps={{ size: 'small', type: 'ghost', className: 'es:p-0!' }}
										className='es:p-2.5'
									>
										<SolidColorPicker
											value={color}
											onChange={(nextColor) => {
												updateData({ color: nextColor ?? color });
											}}
											allowTransparency
											outputFormat='rgba'
										/>
									</TriggeredPopover>
								}
							>
								<ButtonGroup>
									<Button
										onPress={() => {
											setGradientData({
												...gradientData,
												stops: stops.filter((_, index) => index !== itemIndex),
											});
										}}
										icon={trash}
										size='small'
										aria-label={__('Delete stop', 'eightshift-ui-components')}
										disabled={stops.length <= 2}
										type='dangerGhost'
									/>
								</ButtonGroup>
							</DraggableListItem>
						);
					}}
				</TypedDraggableList>
			</ContainerGroup>
		</div>
	);
};
