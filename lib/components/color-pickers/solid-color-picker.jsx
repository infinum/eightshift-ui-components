import { useState } from 'react';
import {
	ColorArea,
	ColorField,
	ColorSlider,
	ColorThumb,
	Input,
	Label,
	SliderTrack,
	parseColor,
} from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { BaseControl } from '../base-control/base-control';
import { __ } from '@wordpress/i18n';
import { TriggeredPopover } from '../popover/popover';
import { icons } from '../../icons/icons';
import { Spacer } from '../spacer/spacer';

/**
 * A solid color picker.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {import('react-aria-components').Color} props.value - The color value. Hex format is preferred, but HSL, HSB, and RGB are also supported.
 * @param {Function} props.onChange - The change handler.
 * @param {boolean} [props.disabled] - Whether the color picker is disabled.
 * @param {Function} [props.onChangeEnd] - The change end handler.
 * @param {boolean} [props.allowTransparency=false] - Whether the color picker allows transparency.
 * @param {import('react-aria-components').ColorFormat} [props.outputFormat] - The output format. Default is 'hex' (or 'hexa' if `allowTransparency` is true).
 *
 * @returns {JSX.Element} The ButtonGroup component.
 *
 * @example
 * <ButtonGroup
 *
 * @preserve
 */
export const SolidColorPicker = (props) => {
	const { value: rawValue, onChange, disabled, onChangeEnd, allowTransparency = false, outputFormat } = props;

	const value = rawValue?.replace('transparent', 'rgba(0, 0, 0, 0)');

	const defaultColor = parseColor('#00000000').toFormat(allowTransparency ? 'hsla' : 'hsl');

	const modifiedValue = value && value?.length > 1 ? parseColor(value) : defaultColor;

	const [color, setColor] = useState(modifiedValue.toFormat(allowTransparency ? 'hsla' : 'hsl'));

	let handleChangeEnd;

	if (onChangeEnd) {
		handleChangeEnd = (color) => {
			setColor(color ?? defaultColor);
			onChange(color?.toString(outputFormat ?? (allowTransparency ? 'hexa' : 'hex')));
		};
	}

	let handleChange = (color) => {
		setColor(color ?? defaultColor);
		onChange(color?.toString(outputFormat ?? (allowTransparency ? 'hexa' : 'hex')));
	};

	return (
		<div className='es-uic-flex es-uic-flex-col es-uic-gap-2 es-uic-items-center'>
			<ColorArea
				value={color}
				xChannel='saturation'
				yChannel='lightness'
				className={classnames(
					'es-uic-size-48 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-shadow-sm es-uic-transition',
					'[&:has(>_[data-focus-visible="true"])]:es-uic-ring [&:has(>_[data-focus-visible="true"])]:es-uic-ring-teal-500 [&:has(>_[data-focus-visible="true"])]:es-uic-ring-opacity-50',
					'disabled:!es-uic-bg-gradient-to-r disabled:es-uic-from-white disabled:es-uic-to-gray-100',
				)}
				onChange={handleChange}
				onChangeEnd={handleChangeEnd}
				isDisabled={disabled}
			>
				<ColorThumb
					className={classnames(
						'es-uic-size-5 es-uic-rounded-full es-uic-border es-uic-border-white es-uic-shadow-[0_0_0_1px_black] es-uic-transition',
						'dragging:!-es-uic-translate-x-1/2 dragging:!-es-uic-translate-y-1/2 dragging:!es-uic-scale-110',
						'focus-visible:!-es-uic-translate-x-1/2 focus-visible:!-es-uic-translate-y-1/2 focus-visible:!es-uic-scale-125',
						'disabled:es-uic-invisible',
					)}
				/>
			</ColorArea>

			<ColorSlider
				channel='hue'
				value={color}
				onChange={handleChange}
				isDisabled={disabled}
			>
				<SliderTrack
					className={classnames(
						'es-uic-h-7 es-uic-w-48 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-shadow-sm',
						'[&:has(>_[data-focus-visible="true"])]:es-uic-ring [&:has(>_[data-focus-visible="true"])]:es-uic-ring-teal-500 [&:has(>_[data-focus-visible="true"])]:es-uic-ring-opacity-50',
						'disabled:!es-uic-bg-gradient-to-r disabled:es-uic-from-white disabled:es-uic-to-gray-100',
					)}
				>
					<ColorThumb
						className={classnames(
							'es-uic-top-3.25',
							'es-uic-size-5 es-uic-rounded-full es-uic-border es-uic-border-white es-uic-shadow-[0_0_0_1px_black] es-uic-transition',
							'dragging:!-es-uic-translate-x-1/2 dragging:!-es-uic-translate-y-1/2 dragging:!es-uic-scale-110',
							'focus-visible:!-es-uic-translate-x-1/2 focus-visible:!-es-uic-translate-y-1/2 focus-visible:!es-uic-scale-125',
							'disabled:es-uic-invisible',
						)}
					/>
				</SliderTrack>
			</ColorSlider>

			{allowTransparency && (
				<ColorSlider
					channel='alpha'
					value={color}
					onChange={handleChange}
					isDisabled={disabled}
				>
					<SliderTrack
						className={classnames(
							'es-uic-h-7 es-uic-w-48 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-shadow-sm',
							'[&:has(>_[data-focus-visible="true"])]:es-uic-ring [&:has(>_[data-focus-visible="true"])]:es-uic-ring-teal-500 [&:has(>_[data-focus-visible="true"])]:es-uic-ring-opacity-50',
							'disabled:!es-uic-bg-gradient-to-r disabled:es-uic-from-white disabled:es-uic-to-gray-100',
						)}
						style={() => {
							const startColor = color.clone().withChannelValue('alpha', 0).toString('hsla');
							const endColor = color.clone().withChannelValue('alpha', 1).toString('hsla');
							return {
								background: `linear-gradient(to right, ${startColor}, ${endColor}), repeating-conic-gradient(rgb(204, 204, 204) 0%, rgb(204, 204, 204) 25%, white 0%, white 50%) 50% center / 14px 14px`,
							};
						}}
					>
						<ColorThumb
							className={classnames(
								'es-uic-top-3.25',
								'es-uic-size-5 es-uic-rounded-full es-uic-border es-uic-border-white es-uic-shadow-[0_0_0_1px_black] es-uic-transition',
								'dragging:!-es-uic-translate-x-1/2 dragging:!-es-uic-translate-y-1/2 dragging:!es-uic-scale-110',
								'focus-visible:!-es-uic-translate-x-1/2 focus-visible:!-es-uic-translate-y-1/2 focus-visible:!es-uic-scale-125',
								'disabled:es-uic-invisible',
							)}
						/>
					</SliderTrack>
				</ColorSlider>
			)}

			<div className='es-uic-flex es-uic-items-center es-uic-justify-center es-uic-gap-2'>
				<ColorField
					value={color}
					onChange={(color) => handleChange(color?.toFormat('hsl'))}
					aria-label={__('Hex color value', 'eightshift-ui-components')}
					isDisabled={disabled}
				>
					<Input
						className={classnames(
							'es-uic-h-9 es-uic-w-20 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
						)}
					/>
				</ColorField>

				<TriggeredPopover
					triggerButtonIcon={icons.options}
					className='es-uic-w-48 es-uic-space-y-1 es-uic-p-2'
					triggerButtonProps={{
						disabled: disabled,
					}}
				>
					<Label className='es-uic-text-sm'>
						{__('Advanced color options', 'eightshift-ui-components')}
					</Label>

					<Spacer
						border
						text='RGB'
					/>
					<ColorField
						value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='red'
					>
						<BaseControl
							label={__('Red', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-11 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>
					<ColorField
						value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='green'
					>
						<BaseControl
							label={__('Green', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-11 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>
					<ColorField
						value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='blue'
					>
						<BaseControl
							label={__('Blue', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-11 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>

					<Spacer
						border
						text='HSL'
					/>
					<ColorField
						value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='hue'
					>
						<BaseControl
							label={__('Hue', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-12 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>

					<ColorField
						value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='saturation'
					>
						<BaseControl
							label={__('Saturation', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-12 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>

					<ColorField
						value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='lightness'
					>
						<BaseControl
							label={__('Lightness', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-12 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>

					<Spacer
						border
						text='HSB'
					/>
					<ColorField
						value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='hue'
					>
						<BaseControl
							label={__('Hue', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-12 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>

					<ColorField
						value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='saturation'
					>
						<BaseControl
							label={__('Saturation', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-12 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>

					<ColorField
						value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
						onChange={(color) => handleChange(color?.toFormat('hsl'))}
						channel='brightness'
					>
						<BaseControl
							label={__('Brightness', 'eightshift-ui-components')}
							inline
						>
							<Input
								className={classnames(
									'es-uic-h-8 es-uic-w-12 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-font-mono es-uic-text-sm es-uic-shadow-sm es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								)}
							/>
						</BaseControl>
					</ColorField>
				</TriggeredPopover>
			</div>
		</div>
	);
};
