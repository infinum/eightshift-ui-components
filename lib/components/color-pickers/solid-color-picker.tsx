import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { useState } from 'react';
import { ColorArea, ColorField, ColorSlider, ColorThumb, Input, SliderTrack, parseColor } from 'react-aria-components';
import type { Color, ColorFormat } from 'react-aria-components';

import { dropdownCaretAlt } from '../../icons/internal';
import { BaseControl } from '../base-control/base-control';
import { TriggeredPopover } from '../popover/popover';
import { ColorSwatch } from './color-swatch';

type SolidColorPickerProps = {
	value?: string | null;
	onChange: (value?: string) => void;
	disabled?: boolean;
	onChangeEnd?: (value?: string) => void;
	allowTransparency?: boolean;
	outputFormat?: ColorFormat;
	noAdvancedOptions?: boolean;
	hidden?: boolean;
};

/**
 * A solid color picker.
 *
 * @component
 * @param {SolidColorPickerProps} props - Component props.
 *
 * @returns {JSX.Element} The SolidColorPicker component.
 *
 * @example
 * <SolidColorPicker
 * 	value={colorValue}
 * 	onChange={(color) => setColorValue(color)}
 * />
 */
export const SolidColorPicker = (props: SolidColorPickerProps) => {
	const { value: rawValue, onChange, disabled, onChangeEnd, allowTransparency = false, outputFormat, hidden, noAdvancedOptions } = props;

	const value = rawValue?.replace('transparent', 'rgba(0, 0, 0, 0)');
	const defaultColor = parseColor('#00000000').toFormat(allowTransparency ? 'hsla' : 'hsl');
	const modifiedValue = value && value.length > 1 ? parseColor(value) : defaultColor;
	const [color, setColor] = useState<Color>(modifiedValue.toFormat(allowTransparency ? 'hsla' : 'hsl'));

	if (hidden) {
		return null;
	}

	const resolvedOutputFormat = outputFormat ?? (allowTransparency ? 'hexa' : 'hex');

	const applyColorChange = (nextColor: Color | null | undefined) => {
		const resolvedColor = nextColor ?? defaultColor;

		setColor(resolvedColor);
		onChange(nextColor?.toString(resolvedOutputFormat));
	};

	const applyColorChangeEnd = (nextColor: Color | null | undefined) => {
		const resolvedColor = nextColor ?? defaultColor;

		setColor(resolvedColor);
		onChangeEnd?.(nextColor?.toString(resolvedOutputFormat));
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
		'es:inset-ring!',
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
				onChange={applyColorChange}
				onChangeEnd={onChangeEnd ? applyColorChangeEnd : undefined}
				isDisabled={disabled}
			>
				<ColorThumb className='es:size-5 es:rounded-full es:transition es:dragging:scale-110! es:border es:border-white es:shadow-[0_0_0_1px_black] es:disabled:invisible' />
			</ColorArea>

			<ColorSlider
				channel='hue'
				value={color}
				onChange={applyColorChange}
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

			{allowTransparency ? (
				<ColorSlider
					channel='alpha'
					value={color}
					onChange={applyColorChange}
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
			) : null}

			<div className='es:flex es:items-center es:justify-center es:gap-0.75'>
				<ColorField
					value={color}
					onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							'es:rounded-lg! es:focus:rounded-xl!',
							'es:border-none!',
						)}
					/>
				</ColorField>

				<TriggeredPopover
					triggerButtonIcon={dropdownCaretAlt}
					className='es:w-52 es:p-3'
					triggerButtonProps={{
						disabled,
						tooltip: __('Advanced color options', 'eightshift-ui-components'),
						className: 'es:w-6 es:h-8 es:icon:size-4.5!',
					}}
					hidden={noAdvancedOptions}
				>
					<BaseControl label='RGB'>
						<ColorField
							value={color.toFormat(allowTransparency ? 'rgba' : 'rgb')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'rgba' : 'rgb')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'rgba' : 'rgb')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'hsla' : 'hsl')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'hsla' : 'hsl')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'hsla' : 'hsl')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'hsba' : 'hsb')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'hsba' : 'hsb')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
							value={color.toFormat(allowTransparency ? 'hsba' : 'hsb')}
							onChange={(nextColor) => applyColorChange(nextColor?.toFormat('hsl'))}
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
