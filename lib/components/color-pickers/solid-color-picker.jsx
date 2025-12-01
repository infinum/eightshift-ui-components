import { useState } from 'react';
import { ColorArea, ColorField, ColorSlider, ColorThumb, Input, Label, SliderTrack, parseColor } from 'react-aria-components';
import { clsx } from 'clsx';

import { BaseControl } from '../base-control/base-control';
import { __ } from '@wordpress/i18n';
import { TriggeredPopover } from '../popover/popover';
import { icons } from '../../icons/icons';
import { ColorSwatch } from '../color-pickers/color-swatch';

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
 * @param {OutputColorFormat} [props.outputFormat] - The output format. Default is 'hex' (or 'hexa' if `allowTransparency` is true).
 * @param {boolean} [props.noAdvancedOptions] - If `true`, the advanced options are hidden.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @typedef {'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsb' | 'hsba'} OutputColorFormat
 *
 * @returns {JSX.Element} The ButtonGroup component.
 *
 * @example
 * <ButtonGroup
 *
 * @preserve
 */
export const SolidColorPicker = (props) => {
	const { value: rawValue, onChange, disabled, onChangeEnd, allowTransparency = false, outputFormat, hidden, noAdvancedOptions } = props;

	const value = rawValue?.replace('transparent', 'rgba(0, 0, 0, 0)');

	const defaultColor = parseColor('#00000000').toFormat(allowTransparency ? 'hsla' : 'hsl');

	const modifiedValue = value && value?.length > 1 ? parseColor(value) : defaultColor;

	const [color, setColor] = useState(modifiedValue.toFormat(allowTransparency ? 'hsla' : 'hsl'));

	if (hidden) {
		return null;
	}

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

	const valueInputClassName = clsx(
		'es:leading-none',
		'es:border-none!',
		'es:max-w-14',
		'es:min-h-9',
		'es:px-3',
		'es:font-mono es:text-12',
		'es:rounded-lg es:focus:rounded-xl es:aria-[controls]:rounded-xl',
		'es:transition-plus',
		'es:any-focus:outline-hidden',
		'es:inset-ring',
		'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/30',
		'es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500',
		'es:focus:placeholder:text-surface-400',
		'es:inset-ring-secondary-100',
		'es:focus:text-accent-950',
		'es:text-secondary-900',
		'es:placeholder:text-secondary-500/80',
		'es:bg-secondary-100 es:focus:bg-surface-50',
		'es:inset-ring-secondary-200/15 es:hover:inset-ring-secondary-200/65 es:focus:inset-ring-surface-200',
		'es:selection:bg-surface-100 es:selection:text-accent-800',
	);

	return (
		<div className='es:flex es:flex-col es:items-center es:gap-2'>
			<ColorArea
				value={color}
				xChannel='saturation'
				yChannel='lightness'
				className={clsx(
					'es:size-48 es:rounded-xl es:border es:border-secondary-300 es:shadow-sm es:transition',
					'es:[&:has(>_[data-focus-visible="true"])]:ring-2 es:[&:has(>_[data-focus-visible="true"])]:ring-accent-500/50',
					'es:disabled:bg-linear-to-r! es:disabled:from-white es:disabled:to-secondary-100',
				)}
				onChange={handleChange}
				onChangeEnd={handleChangeEnd}
				isDisabled={disabled}
			>
				<ColorThumb className='es:size-5 es:rounded-full es:transition es:dragging:scale-110! es:border es:border-white es:shadow-[0_0_0_1px_black] es:disabled:invisible' />
			</ColorArea>

			<ColorSlider
				channel='hue'
				value={color}
				onChange={handleChange}
				isDisabled={disabled}
			>
				<SliderTrack
					className={clsx(
						'es:h-7 es:w-48 es:rounded-10 es:border es:border-secondary-300 es:shadow-sm',
						'es:[&:has(>_[data-focus-visible="true"])]:ring-2 es:[&:has(>_[data-focus-visible="true"])]:ring-accent-500/50',
						'es:disabled:bg-linear-to-r! es:disabled:from-white es:disabled:to-secondary-100',
					)}
				>
					<ColorThumb className='es:top-3.25 es:size-5 es:rounded-full es:border es:border-white es:shadow-[0_0_0_1px_black] es:transition es:dragging:scale-110! es:disabled:invisible' />
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
						className={clsx(
							'es:h-7 es:w-48 es:rounded-10 es:border es:border-secondary-300 es:shadow-sm',
							'es:[&:has(>_[data-focus-visible="true"])]:ring-2 es:[&:has(>_[data-focus-visible="true"])]:ring-accent-500/50',
							'es:disabled:bg-linear-to-r! es:disabled:from-white es:disabled:to-secondary-100',
						)}
						style={() => {
							const startColor = color.clone().withChannelValue('alpha', 0).toString('hsla');
							const endColor = color.clone().withChannelValue('alpha', 1).toString('hsla');

							return {
								background: `linear-gradient(to right, ${startColor}, ${endColor}), repeating-conic-gradient(rgb(204, 204, 204) 0%, rgb(204, 204, 204) 25%, white 0%, white 50%) 50% center / 14px 14px`,
							};
						}}
					>
						<ColorThumb className='es:top-3.25 es:size-5 es:rounded-full es:border es:border-white es:shadow-[0_0_0_1px_black] es:transition es:disabled:invisible' />
					</SliderTrack>
				</ColorSlider>
			)}

			<div className='es:flex es:items-center es:justify-center es:gap-0.75'>
				<ColorField
					value={color}
					onChange={(color) => handleChange(color?.toFormat('hsl'))}
					aria-label={__('Hex color value', 'eightshift-ui-components')}
					isDisabled={disabled}
				>
					<Input
						className={clsx(
							'es:leading-none',
							'es:w-20',
							'es:transition-plus',
							'es:any-focus:outline-hidden',
							'es:inset-ring',
							'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/30',
							'es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500',
							'es:focus:placeholder:text-surface-400',
							'es:h-8',
							'es:px-3',
							'es:font-mono es:text-12',
							'es:bg-white',
							'es:bg-linear-to-b es:from-secondary-100/0 es:to-secondary-100/50 es:from-25%',
							'es:hover:from-surface-100/0 es:hover:to-surface-100/50',
							'es:inset-ring-secondary-400/50 es:hover:inset-ring-surface-300 es:focus:inset-ring-surface-400',
							'es:inset-shadow-sm es:inset-shadow-secondary-100/50',
							'es:hover:placeholder:text-surface-400',
							'es:placeholder:text-secondary-400',
							'es:shadow-xs es:shadow-black/5',
							'es:rounded-lg es:focus:rounded-xl',
							'es:border-none!',
						)}
					/>
				</ColorField>

				<TriggeredPopover
					triggerButtonIcon={icons.dropdownCaretAlt}
					className='es:w-52 es:p-3'
					triggerButtonProps={{
						disabled: disabled,
						tooltip: __('Advanced color options', 'eightshift-ui-components'),
						className: 'es:w-6 es:h-8 es:icon:size-4.5!',
					}}
					hidden={noAdvancedOptions}
				>
					<BaseControl label='RGB'>
						<ColorField
							value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='red'
						>
							<BaseControl
								icon={
									<ColorSwatch
										color='#ff0000'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Red', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>
						<ColorField
							value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='green'
						>
							<BaseControl
								icon={
									<ColorSwatch
										color='#00ff00'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Green', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>
						<ColorField
							value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='blue'
						>
							<BaseControl
								icon={
									<ColorSwatch
										color='#0000ff'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Blue', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>
					</BaseControl>

					<BaseControl
						label='HSL'
						className='es:mt-3'
					>
						<ColorField
							value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='hue'
						>
							<BaseControl
								icon={
									<ColorSwatch
										gradient='linear-gradient(to right, red, yellow, lime, cyan, blue, magenta)'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Hue', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>

						<ColorField
							value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='saturation'
						>
							<BaseControl
								icon={
									<ColorSwatch
										gradient='linear-gradient(to right, var(--es-color-surface-400), var(--es-color-accent-500))'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Saturation', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>

						<ColorField
							value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='lightness'
						>
							<BaseControl
								icon={
									<ColorSwatch
										gradient='linear-gradient(to right, var(--es-color-secondary-50), var(--es-color-secondary-100), var(--es-color-secondary-200), var(--es-color-secondary-300), var(--es-color-secondary-400), var(--es-color-secondary-500), var(--es-color-secondary-600), var(--es-color-secondary-700), var(--es-color-secondary-800), var(--es-color-secondary-900))'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Lightness', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>
					</BaseControl>

					<BaseControl
						label='HSB'
						className='es:mt-3'
					>
						<ColorField
							value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='hue'
						>
							<BaseControl
								icon={
									<ColorSwatch
										gradient='linear-gradient(to right, red, yellow, lime, cyan, blue, magenta)'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Hue', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>

						<ColorField
							value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='saturation'
						>
							<BaseControl
								icon={
									<ColorSwatch
										gradient='linear-gradient(to right, var(--es-color-surface-400), var(--es-color-accent-500))'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Saturation', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>

						<ColorField
							value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
							onChange={(color) => handleChange(color?.toFormat('hsl'))}
							channel='brightness'
						>
							<BaseControl
								icon={
									<ColorSwatch
										gradient='linear-gradient(to right, var(--es-color-secondary-50), var(--es-color-secondary-100), var(--es-color-secondary-200), var(--es-color-secondary-300), var(--es-color-secondary-400), var(--es-color-secondary-500), var(--es-color-secondary-600), var(--es-color-secondary-700), var(--es-color-secondary-800), var(--es-color-secondary-900))'
										className='es:size-5!'
										flat
									/>
								}
								label={__('Brightness', 'eightshift-ui-components')}
								inline
							>
								<Input className={valueInputClassName} />
							</BaseControl>
						</ColorField>
					</BaseControl>
				</TriggeredPopover>
			</div>
		</div>
	);
};
