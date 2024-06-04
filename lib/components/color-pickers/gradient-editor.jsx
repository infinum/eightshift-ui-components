import { __, sprintf } from '@wordpress/i18n';
import { useMemo } from 'react';
import { parseConicGradient, parseLinearGradient, parseRadialGradient } from 'css-gradient-parser';
import { ButtonGroup } from '../button/button';
import { ToggleButton } from '../toggle-button/toggle-button';
import { Repeater } from '../repeater/repeater';
import { RepeaterItem } from '../repeater/repeater-item';
import { icons } from '../../icons/icons';
import { SolidColorPicker } from './solid-color-picker';
import { Slider } from '../slider/slider';
import { NumberPicker } from '../number-picker/number-picker';
import { ColorSwatch } from 'react-aria-components';
import { Menu, MenuItem } from '../menu/menu';
import { BaseControl } from '../base-control/base-control';
import { MatrixAlign } from '../matrix-align/matrix-align';
import { Spacer } from '../spacer/spacer';
import { Toggle } from '../toggle/toggle';

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
		icon: (
			<div className='es-uic-transparent es-uic-size-4 es-uic-rounded-full es-uic-bg-gradient-to-br es-uic-from-current' />
		),
	},
	{
		label: __('Radial'),
		value: 'radial',
		icon: (
			<div className='es-uic-transparent es-uic-size-4 es-uic-rounded-full es-uic-bg-[radial-gradient(var(--tw-gradient-stops))] es-uic-from-current' />
		),
	},
	{
		label: __('Conic'),
		value: 'conic',
		icon: (
			<div className='es-uic-transparent es-uic-size-4 es-uic-rounded-full es-uic-bg-[conic-gradient(var(--tw-gradient-stops))] es-uic-from-current' />
		),
	},
];

const linearDirections = [
	{
		label: __('To right'),
		value: 'right',
		icon: icons.arrowRight,
	},
	{
		label: __('To left'),
		value: 'left',
		icon: icons.arrowLeft,
	},
	{
		label: __('To top'),
		value: 'top',
		icon: icons.arrowUp,
	},
	{
		label: __('To bottom'),
		value: 'bottom',
		icon: icons.arrowDown,
	},
	{
		label: __('To top-right'),
		value: 'top right',
		icon: icons.emptyCircle,
	},
	{
		label: __('To top-left'),
		value: 'top left',
		icon: icons.emptyCircle,
	},
	{
		label: __('To bottom-right'),
		value: 'bottom right',
		icon: icons.emptyCircle,
	},
	{
		label: __('To bottom-left'),
		value: 'bottom left',
		icon: icons.emptyCircle,
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
	const { value, onChange } = props;

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
		if (
			(typeof value === 'string' && value?.startsWith('radial-gradient')) ||
			value?.startsWith('repeating-radial-gradient')
		) {
			return 'radial';
		}

		if (
			(typeof value === 'string' && value?.startsWith('conic-gradient')) ||
			value?.startsWith('repeating-conic-gradient')
		) {
			return 'conic';
		}

		return 'linear';
	}, [value]);

	const setGradientData = (data) => {
		onChange(getGradientResult(data, gradientType));
	};

	const outputGradient = useMemo(
		() => getGradientResult(gradientData, gradientType),
		[gradientData, gradientType],
	);

	return (
		<div className='es-uic-w-full es-uic-space-y-2.5'>
			<div
				className='es-uic-h-40 es-uic-w-full es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-shadow-sm'
				style={{ backgroundImage: outputGradient }}
			/>

			<ButtonGroup className='es-uic-w-full'>
				{gradientTypes.map(({ label, value, icon }) => {
					return (
						<ToggleButton
							key={value}
							selected={gradientType === value}
							onChange={() => onChange(getGradientResult({ stops: gradientData.stops }, value))}
							icon={icon}
							className='es-uic-grow'
						>
							{label}
						</ToggleButton>
					);
				})}
			</ButtonGroup>

			<Spacer size='xs' />

			{gradientType === 'linear' && (
				<div className='es-uic-flex es-uic-gap-1'>
					<NumberPicker
						inline
						icon={icons.emptyCircle}
						label={__('Angle', 'eightshift-ui-components')}
						min={0}
						max={360}
						step={1}
						value={gradientData?.orientation?.value?.value}
						onChange={(angle) => {
							setGradientData({
								...gradientData,
								orientation: { type: 'angular', value: { value: angle, unit: 'deg' } },
							});
						}}
						suffix='°'
						className='es-uic-grow'
					/>

					<Menu
						triggerIcon={icons.optionListAlt}
						triggerProps={{
							tooltip: __('Presets', 'eightshift-ui-components'),
							size: 'large',
						}}
					>
						{linearDirections.map(({ label, value, icon }) => {
							return (
								<MenuItem
									key={value}
									icon={icon}
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
					<BaseControl
						label={__('Shape', 'eightshift-ui-components')}
						icon={icons.emptyCircle}
						inline
					>
						<ButtonGroup>
							<ToggleButton
								selected={gradientData.shape === 'circle'}
								onChange={() => {
									setGradientData({
										...gradientData,
										shape: 'circle',
									});
								}}
								size='large'
							>
								{__('Circle', 'eightshift-ui-components')}
							</ToggleButton>
							<ToggleButton
								selected={gradientData.shape === 'ellipse'}
								onChange={() => {
									setGradientData({
										...gradientData,
										shape: 'ellipse',
									});
								}}
								size='large'
							>
								{__('Ellipse', 'eightshift-ui-components')}
							</ToggleButton>
						</ButtonGroup>
					</BaseControl>

					<MatrixAlign
						icon={icons.emptyCircle}
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
						icon={icons.emptyCircle}
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
						suffix='°'
						className='es-uic-grow'
					/>

					<MatrixAlign
						icon={icons.emptyCircle}
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
				icon={icons.emptyCircle}
			/>

			<Spacer border />

			<Repeater
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
				itemLabelProp='title'
				icon={icons.emptyCircle}
				label={__('Stops', 'eightshift-ui-components')}
				addDefaultItem={{
					color: '#000000',
				}}
				minItems={2}
			>
				{(item) => {
					const { color, updateData, itemIndex } = item;

					const defaultOffset = (itemIndex * 100) / (gradientData.stops.length - 1);
					const offset = `${gradientData.stops[itemIndex]?.offset?.value ?? defaultOffset}%`;

					return (
						<RepeaterItem
							label={sprintf(__('Stop %s', 'eightshift-ui-components'), itemIndex + 1)}
							subtitle={`${color} / ${offset ?? defaultOffset}`}
							icon={
								<ColorSwatch
									className='es-uic-size-5 es-uic-rounded-full es-uic-border es-uic-border-white es-uic-ring-1 es-uic-ring-black'
									color={color}
								/>
							}
							textValue={sprintf(__('Stop %s', 'eightshift-ui-components'), itemIndex + 1)}
						>
							<SolidColorPicker
								value={color}
								onChange={(color) => {
									updateData({ color });
								}}
								allowTransparency
								outputFormat='rgba'
							/>
						</RepeaterItem>
					);
				}}
			</Repeater>

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
					backgroundImage: getGradientResult(
						{ orientation: { type: 'directional', value: 'right' }, stops: gradientData.stops },
						'linear',
					),
					height: '1.125rem',
					borderRadius: '0.5rem',
				}}
				noActiveHighlight
			/>
		</div>
	);
};
