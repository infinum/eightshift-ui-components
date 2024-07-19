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
import { Spacer } from '../spacer/spacer';
import { Toggle } from '../toggle/toggle';
import { OptionSelect } from '../option-select/option-select';
import { DraggableList } from '../draggable-list/draggable-list';
import { DraggableListItem } from '../draggable-list/draggable-list-item';
import { TriggeredPopover } from '../popover/popover';
import { clsx } from 'clsx/lite';

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
		icon: <div className='es-uic-transparent es-uic-size-4 es-uic-rounded-full es-uic-bg-gradient-to-br es-uic-from-current' />,
	},
	{
		label: __('Radial'),
		value: 'radial',
		icon: <div className='es-uic-transparent es-uic-size-4 es-uic-rounded-full es-uic-bg-[radial-gradient(var(--tw-gradient-stops))] es-uic-from-current' />,
	},
	{
		label: __('Conic'),
		value: 'conic',
		icon: <div className='es-uic-transparent es-uic-size-4 es-uic-rounded-full es-uic-bg-[conic-gradient(var(--tw-gradient-stops))] es-uic-from-current' />,
	},
];

const linearDirections = [
	{
		label: __('Right'),
		value: 'right',
		iconClass: 'es-uic-bg-gradient-to-r',
		valueDegrees: 90,
	},
	{
		label: __('Left'),
		value: 'left',
		iconClass: 'es-uic-bg-gradient-to-l',
		valueDegrees: 180,
	},
	{
		label: __('Top'),
		value: 'top',
		iconClass: 'es-uic-bg-gradient-to-t',
		valueDegrees: 270,
	},
	{
		label: __('Bottom'),
		value: 'bottom',
		iconClass: 'es-uic-bg-gradient-to-b',
		valueDegrees: 90,
	},
	{
		label: __('Top-right'),
		value: 'top right',
		iconClass: 'es-uic-bg-gradient-to-tr',
		valueDegrees: 45,
	},
	{
		label: __('Top-left'),
		value: 'top left',
		iconClass: 'es-uic-bg-gradient-to-tl',
		valueDegrees: 315,
	},
	{
		label: __('Bottom-right'),
		value: 'bottom right',
		iconClass: 'es-uic-bg-gradient-to-br',
		valueDegrees: 135,
	},
	{
		label: __('Bottom-left'),
		value: 'bottom left',
		iconClass: 'es-uic-bg-gradient-to-bl',
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
		<div className='es-uic-w-full es-uic-space-y-2.5'>
			<button
				className={clsx(
					'es-uic-shadow-sm, es-uic-mx-auto es-uic-block es-uic-h-40 es-uic-cursor-pointer es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-transition-[width]',
					squarePreview ? 'es-uic-w-40' : 'es-uic-w-full',
				)}
				style={{ backgroundImage: outputGradient }}
				onClick={() => setSquarePreview((prev) => !prev)}
				aria-label={__('Toggle preview size', 'eightshift-ui-components')}
			/>

			<OptionSelect
				aria-label={__('Gradient type', 'eightshift-ui-components')}
				value={gradientType}
				onChange={(value) => onChange(getGradientResult({ stops: gradientData.stops }, value))}
				options={gradientTypes}
				wrapperProps={{ className: 'es-uic-mx-auto es-uic-w-fit' }}
			/>

			{gradientType === 'linear' && (
				<div className='es-uic-flex es-uic-items-center es-uic-gap-1'>
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
						size='small'
						className='es-uic-grow'
						placeholder={linearDirections.find(({ value }) => value === gradientData?.orientation?.value)?.valueDegrees ?? ''}
					/>

					<Menu
						triggerIcon={icons.sliders}
						triggerProps={{
							tooltip: __('Presets', 'eightshift-ui-components'),
						}}
						keepOpen
					>
						{linearDirections.map(({ label, value, iconClass }) => {
							return (
								<MenuItem
									key={value}
									icon={<div className={clsx('es-uic-size-5 es-uic-rounded-sm es-uic-from-gray-700 es-uic-to-gray-200', iconClass)} />}
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
				</div>
			)}

			{gradientType === 'radial' && (
				<div className='es-uic-space-y-2'>
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
				</div>
			)}

			{gradientType === 'conic' && (
				<div className='es-uic-space-y-2'>
					<NumberPicker
						inline
						icon={icons.angle}
						label={__('Angle', 'eightshift-ui-components')}
						min={0}
						max={360}
						step={1}
						value={parseInt(gradientData?.angle.replace('deg', ''))}
						onChange={(value) => {
							setGradientData({
								...gradientData,
								angle: `${value}deg`,
							});
						}}
						size='small'
						suffix='°'
						className='es-uic-grow'
					/>

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
				</div>
			)}

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

			<Spacer border />

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
				icon={icons.gradientStop}
				label={__('Gradient stops', 'eightshift-ui-components')}
				key={gradientData?.stops?.length}
				actions={
					<Button
						icon={icons.add}
						size='small'
						onPress={() => {
							setGradientData({
								...gradientData,
								stops: [...gradientData.stops, { color: '#000000FF' }],
							});
						}}
						aria-label={__('Add stop', 'eightshift-ui-components')}
					/>
				}
			>
				{(item) => {
					const { color, updateData, itemIndex } = item;

					return (
						<DraggableListItem
							label={sprintf(__('Stop %s', 'eightshift-ui-components'), itemIndex + 1)}
							subtitle={color}
							icon={
								<ColorSwatch
									className='es-uic-size-5 es-uic-rounded-full es-uic-border es-uic-border-white es-uic-ring-1 es-uic-ring-black'
									color={color}
								/>
							}
							textValue={sprintf(__('Stop %s', 'eightshift-ui-components'), itemIndex + 1)}
						>
							<ButtonGroup>
								<TriggeredPopover
									triggerButtonIcon={icons.color}
									triggerButtonProps={{ size: 'small' }}
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
								/>
							</ButtonGroup>
						</DraggableListItem>
					);
				}}
			</DraggableList>

			<Slider
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
				thumbContent={(index) => (
					<div className='es-uic-pointer-events-none es-uic-absolute es-uic-inset-0 es-uic-flex es-uic-size-3 es-uic-items-center es-uic-justify-center es-uic-text-center es-uic-text-xs es-uic-font-semibold es-uic-text-white'>
						{index + 1}
					</div>
				)}
				trackStyle={{
					backgroundImage: getGradientResult({ orientation: { type: 'directional', value: 'right' }, stops: gradientData.stops }, 'linear'),
					height: '1.125rem',
					borderRadius: '0.5rem',
				}}
				noActiveHighlight
			/>
		</div>
	);
};
