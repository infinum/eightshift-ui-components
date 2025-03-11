import { useState } from 'react';
import { ColorArea, ColorField, ColorSlider, ColorThumb, Input, Label, SliderTrack, parseColor } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { BaseControl } from '../base-control/base-control';
import { __ } from '@wordpress/i18n';
import { TriggeredPopover } from '../popover/popover';
import { icons } from '../../icons/icons';
import { Spacer } from '../spacer/spacer';
import { Tab, TabList, TabPanel, Tabs } from '../tabs/tabs';

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
		'es:h-8 es:w-12',
		'es:tabular-nums es:font-mono',
		'es:border es:rounded-lg es:border-secondary-300 es:p-2 es:text-sm es:shadow-xs es:transition es:selection:bg-accent-500/20 es:selection:text-accent-950',
		'es:any-focus:outline-hidden',
		'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50 es:focus-visible:z-10',
		'es:focus-visible:border-accent-500',
		'es:inset-ring es:inset-ring-secondary-100',
	);

	return (
		<div className='es:flex es:flex-col es:items-center es:gap-2'>
			<ColorArea
				value={color}
				xChannel='saturation'
				yChannel='lightness'
				className={clsx(
					'es:size-48 es:rounded-md es:border es:border-secondary-300 es:shadow-sm es:transition',
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
						'es:h-7 es:w-48 es:rounded-md es:border es:border-secondary-300 es:shadow-sm',
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
							'es:h-7 es:w-48 es:rounded-md es:border es:border-secondary-300 es:shadow-sm',
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

			<div className='es:flex es:items-center es:justify-center'>
				<ColorField
					value={color}
					onChange={(color) => handleChange(color?.toFormat('hsl'))}
					aria-label={__('Hex color value', 'eightshift-ui-components')}
					isDisabled={disabled}
				>
					<Input
						className={clsx(
							'es:h-9 es:w-20',
							'es:tabular-nums es:font-mono',
							'es:border es:border-secondary-300 es:p-2 es:text-sm es:shadow-xs es:transition es:selection:bg-accent-500/20 es:selection:text-accent-950',
							'es:any-focus:outline-hidden',
							'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50 es:focus-visible:z-10',
							'es:focus-visible:border-accent-500',
							'es:inset-ring es:inset-ring-secondary-100',
							noAdvancedOptions ? 'es:rounded-lg' : 'es:rounded-l-lg',
						)}
					/>
				</ColorField>

				<TriggeredPopover
					triggerButtonIcon={icons.dropdownCaretAlt}
					className='es:w-52 es:p-3'
					triggerButtonProps={{
						disabled: disabled,
						tooltip: __('Advanced color options', 'eightshift-ui-components'),
						className: 'es:rounded-l-none es:rounded-r-l es:-ml-px es:w-6 es:icon:size-4.5!',
					}}
					hidden={noAdvancedOptions}
				>
					<Label className='es:text-sm es:tracking-tight es:mb-2 es:inline-block'>{__('Advanced color options', 'eightshift-ui-components')}</Label>

					<Tabs type='pillCompactInverse'>
						<TabList>
							<Tab>RGB</Tab>
							<Tab>HSL</Tab>
							<Tab>HSB</Tab>
						</TabList>
						<TabPanel>
							<ColorField
								value={color?.toFormat(allowTransparency ? 'rgba' : 'rgb')}
								onChange={(color) => handleChange(color?.toFormat('hsl'))}
								channel='red'
							>
								<BaseControl
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
									label={__('Blue', 'eightshift-ui-components')}
									inline
								>
									<Input className={valueInputClassName} />
								</BaseControl>
							</ColorField>
						</TabPanel>

						<TabPanel>
							<ColorField
								value={color?.toFormat(allowTransparency ? 'hsla' : 'hsl')}
								onChange={(color) => handleChange(color?.toFormat('hsl'))}
								channel='hue'
							>
								<BaseControl
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
									label={__('Lightness', 'eightshift-ui-components')}
									inline
								>
									<Input className={valueInputClassName} />
								</BaseControl>
							</ColorField>
						</TabPanel>

						<TabPanel>
							<ColorField
								value={color?.toFormat(allowTransparency ? 'hsba' : 'hsb')}
								onChange={(color) => handleChange(color?.toFormat('hsl'))}
								channel='hue'
							>
								<BaseControl
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
									label={__('Brightness', 'eightshift-ui-components')}
									inline
								>
									<Input className={valueInputClassName} />
								</BaseControl>
							</ColorField>
						</TabPanel>
					</Tabs>
				</TriggeredPopover>
			</div>
		</div>
	);
};
