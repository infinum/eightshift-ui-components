import { useState } from 'react';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { clsx } from 'clsx/lite';

import { __, sprintf } from '@wordpress/i18n';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { upperFirst } from '../../utilities';
import { icons } from '../../icons/icons';
import { Button } from '../button/button';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { ToggleButton } from '../toggle-button/toggle-button';
import { BaseControl } from '../base-control/base-control';

/**
 * A component that allows the user to set different values for different breakpoints.
 *
 * Replacement for the `Responsive` component from Eightshift Frontend libs v12 (and older).
 *
 * Meant to be used with a more complex attribute setup, with one attribute per breakpoint,
 * and a single value object that contains all the values.
 *
 * Inner items should be passed as a render function.
 * The following props are passed to the render function:
 * - `breakpoint: string` - Name of the current breakpoint.
 * - `currentValue: any` - Current value.
 * - `handleChange: Function<(attributeName: string, value: any) => void>` - A function to change the value for the breakpoint..
 * - `options: Object<string, any>` - (Optional) Options list passed to the `ResponsiveLegacy` component. (optional)
 * - `isInlineCollapsedView: boolean` - (Optional) `true` if in `inline` mode, and the details are collapsed.
 * - `isInlineExpandedView: boolean` - (Optional) `true` if in `inline` mode, and the details are shown.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.value - The current value of the component.
 * @param {Function} props.onChange - Function to run when the value changes. `(newValue: Object) => void`.
 * @param {Object} props.attribute - The attribute the component is linked to. `{ [breakpoint: string]: string }`.
 * @param {JSX.Element} [props.icon] - The icon of the component.
 * @param {string} [props.help] - The help text of the component.
 * @param {string} [props.label] - The label of the component.
 * @param {string} [props.subtitle] - The subtitle of the component.
 * @param {{label: string, value: string}[]} props.options - Options of the attribute the component is linked to. `{ value: string, label: string }[]`.
 * @param {any} [props.inheritValue=''] - Value that will be used as a default for breakpoints that don't have a value set. If `undefined`, needs to be used, use `allowUndefined` instead.
 * @param {boolean?} [props.allowUndefined] - If `true`, `undefined` is used as a default value for breakpoints that don't have a value set. Overrides `inheritValue`.
 * @param {Object} props.globalManifest - The global manifest.
 * @param {boolean} [props.inline] - If `true`, the default breakpoint is shown inline with the label. In the expanded state, all breakpoints are shown below the label.
 * @param {Object<string, number>} [props.breakpointData] - Breakpoints to use. `{ [breakpoint: string]: number }`.
 * @param {string[]} [props.breakpoints] - Breakpoints to use. `{ [breakpoint: string]: number }`.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {'start' | 'center' | 'end' | 'stretch'} [props.innerContentAlign='start'] - Determines inner content alignment
 *
 * @returns {JSX.Element} The ResponsiveLegacy component.
 *
 * @example
 * // Basic example
 * <ResponsiveLegacy
 * 	attribute={myResponsiveAttribute} // from 'responsiveAttributes' in manifest
 * 	value={value} // attributes
 * 	onChange={(attributeName, value) => setAttributes({
 * 		[attributeName]: value,
 * 	})}
 * 	icon={icons.myIcon}
 * 	label={__('Label', 'eightshift-ui-components')}
 * 	options={[
 * 		{ value: 'value1', label: 'Value 1' },
 * 		{ value: 'value2', label: 'Value 2' },
 * 		{ value: 'value3', label: 'Value 3' },
 * 	]}
 * 	breakpointData={breakpoints} // From global manifest
 * >
 * 	{({ currentValue, options, handleChange }) => (
 * 		<Select
 * 			value={currentValue}
 * 			options={options}
 * 			onChange={handleChange}
 * 		/>
 * 	)}
 * </ResponsiveLegacy>
 *
 * @preserve
 */
export const ResponsiveLegacy = (props) => {
	const {
		value,
		onChange,
		attribute,

		icon,
		help,
		label,
		subtitle,

		options,

		inheritValue: rawInheritValue = '',
		allowUndefined,

		children,

		inline,

		breakpointData,
		breakpoints: rawBreakpoints = Object.keys(breakpointData).toReversed(),

		hidden,

		innerContentAlign = 'start',
	} = props;

	const inheritValue = allowUndefined ? undefined : rawInheritValue;

	const [detailsVisible, setDetailsVisible] = useState(false);

	const breakpoints = rawBreakpoints.slice(1);

	const globalOverride = breakpoints.find((breakpoint) => value?.[attribute[breakpoint]] !== inheritValue);

	const defaultBreakpoint = rawBreakpoints[0];

	if (hidden) {
		return null;
	}

	const DefaultTooltip = () => (
		<DecorativeTooltip
			placement='left'
			className='es-uic-p-3'
			theme='light'
			offset={7.5}
			arrow
			text={
				<div className='es-uic-max-w-64 es-uic-p-1'>
					<span className='es-uic-block es-uic-text-balance es-uic-font-semibold es-uic-tabular-nums'>{__('Default', 'eightshift-ui-components')}</span>

					<span className='es-uic-block es-uic-text-balance es-uic-tabular-nums'>
						{!globalOverride && __('Always applied, regardless of browser width.', 'eightshift-ui-components')}
						{globalOverride && sprintf(__('Applied when the browser width is %dpx or wider.', 'eightshift-ui-components'), breakpointData[globalOverride] + 1)}
					</span>

					{globalOverride && (
						<div className='es-uic-mx-auto es-uic-mt-2'>
							<BreakpointPreview
								blocks={[
									{
										breakpoint: globalOverride,
										value: options?.find((opt) => opt.value === value?.[attribute[globalOverride]])?.label ?? upperFirst(value?.[globalOverride]),
										dotsStart: true,
										alignEnd: true,
									},
									{
										breakpoint: __('Default', 'eightshift-ui-components'),
										value: options?.find((opt) => opt.value === value?.[attribute[defaultBreakpoint]])?.label ?? upperFirst(value?.[defaultBreakpoint]),
										width: breakpointData[breakpoints.at(-1)],
										dotsEnd: true,
										active: true,
									},
								]}
							/>
						</div>
					)}
				</div>
			}
		>
			<div className='es-uic-flex es-uic-size-7 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-border-teal-500/10 es-uic-bg-teal-50 es-uic-p-0.5 es-uic-text-teal-800 es-uic-shadow-sm es-uic-shadow-teal-600/25 [&>svg]:es-uic-size-5'>
				{icons[`screen${upperFirst(defaultBreakpoint)}`] ?? icons.play}
			</div>
		</DecorativeTooltip>
	);

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			className='es-uic-w-full'
			actions={
				<>
					{inline && (
						<AnimatedVisibility
							visible={!detailsVisible}
							key={defaultBreakpoint}
							transition='scaleFade'
							noInitial
						>
							{children({
								breakpoint: defaultBreakpoint,
								currentValue: value?.[attribute[defaultBreakpoint]],
								options: options,
								handleChange: (newValue) => onChange(attribute[defaultBreakpoint], newValue),
								isInlineCollapsedView: true,
							})}
						</AnimatedVisibility>
					)}

					<ToggleButton
						icon={icons.responsiveOverridesAlt}
						onChange={() => setDetailsVisible(!detailsVisible)}
						selected={detailsVisible}
						tooltip={detailsVisible ? __('Hide responsive overrides', 'eightshift-ui-components') : __('Show responsive overrides', 'eightshift-ui-components')}
					/>
				</>
			}
		>
			{!inline && (
				<div
					className={clsx(
						'es-uic-grid es-uic-items-center es-uic-gap-x-2 es-uic-transition-[grid-template-columns,_margin-block-end] es-uic-duration-150',
						innerContentAlign === 'start' && 'es-uic-justify-items-start',
						innerContentAlign === 'center' && 'es-uic-justify-items-center',
						innerContentAlign === 'end' && 'es-uic-justify-items-end',
						innerContentAlign === 'stretch' && 'es-uic-justify-items-stretch',
						detailsVisible
							? 'es-uic-mb-2 es-uic-grid-cols-[minmax(0,_1.75rem),_minmax(0,_1fr),_minmax(0,_2.25rem)]'
							: 'es-uic-grid-cols-[minmax(0,_0rem),_minmax(0,_1fr),_minmax(0,_2.25rem)]',
					)}
					key={defaultBreakpoint}
				>
					{detailsVisible && <DefaultTooltip />}
					<div className={clsx(detailsVisible ? 'es-uic-col-start-2 es-uic-col-end-2' : 'es-uic-col-span-full')}>
						{children({
							breakpoint: defaultBreakpoint,
							currentValue: value?.[attribute[defaultBreakpoint]],
							options: options,
							handleChange: (newValue) => onChange(attribute[defaultBreakpoint], newValue),
						})}
					</div>
				</div>
			)}
			{inline && (
				<AnimatedVisibility
					className={clsx(
						'es-uic-mb-2 es-uic-grid es-uic-grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2.25rem)] es-uic-items-center es-uic-gap-x-2',
						innerContentAlign === 'start' && 'es-uic-justify-items-start',
						innerContentAlign === 'center' && 'es-uic-justify-items-center',
						innerContentAlign === 'end' && 'es-uic-justify-items-end',
						innerContentAlign === 'stretch' && 'es-uic-justify-items-stretch',
					)}
					key={defaultBreakpoint}
					visible={detailsVisible}
				>
					<DefaultTooltip />
					<div className='es-uic-col-start-2 es-uic-col-end-2'>
						{children({
							breakpoint: defaultBreakpoint,
							currentValue: value?.[attribute[defaultBreakpoint]],
							options: options,
							handleChange: (newValue) => onChange(attribute[defaultBreakpoint], newValue),
							isInlineExpandedView: true,
						})}
					</div>
				</AnimatedVisibility>
			)}

			<AnimatedVisibility
				visible={detailsVisible}
				className='es-uic-space-y-2'
			>
				{breakpoints.map((breakpoint, i) => {
					const isOverrideSet = value[attribute[breakpoint]] !== inheritValue;

					const aboveOverride = rawBreakpoints
						.slice(0, i + 1)
						.toReversed()
						.find((breakpoint) => value?.[attribute[breakpoint]] !== inheritValue);

					const belowOverride = rawBreakpoints.slice(i + 2).find((breakpoint) => value?.[attribute[breakpoint]] !== inheritValue);

					return (
						<div
							className={clsx(
								'es-uic-grid es-uic-grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2.25rem)] es-uic-items-center es-uic-gap-x-2',
								innerContentAlign === 'start' && 'es-uic-justify-items-start',
								innerContentAlign === 'center' && 'es-uic-justify-items-center',
								innerContentAlign === 'end' && 'es-uic-justify-items-end',
								innerContentAlign === 'stretch' && 'es-uic-justify-items-stretch',
							)}
							key={breakpoint}
						>
							<DecorativeTooltip
								placement='left'
								theme='light'
								offset={7.5}
								arrow
								text={
									<div className='es-uic-max-w-96 es-uic-p-1'>
										<span className='es-uic-block es-uic-font-semibold'>{upperFirst(breakpoint)}</span>

										<span className='es-uic-block es-uic-text-balance es-uic-tabular-nums'>
											{aboveOverride &&
												aboveOverride === breakpoint &&
												isOverrideSet &&
												sprintf(__('Applied when the browser width is %dpx or less.', 'eightshift-ui-components'), breakpointData[breakpoint])}

											{aboveOverride &&
												aboveOverride !== breakpoint &&
												isOverrideSet &&
												sprintf(
													__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
													breakpointData[aboveOverride] + 1,
													breakpointData[breakpoint],
												)}

											{(!aboveOverride || !isOverrideSet) && sprintf(__('Up to %dpx', 'eightshift-ui-components'), breakpointData[breakpoint])}
										</span>

										{((aboveOverride && !isOverrideSet) || !aboveOverride) && (
											<span className='es-uic-mt-2 es-uic-block es-uic-font-medium es-uic-italic'>{__('Not set', 'eightshift-ui-components')}</span>
										)}

										{aboveOverride && isOverrideSet && (
											<div className='es-uic-mx-auto es-uic-mt-2'>
												<BreakpointPreview
													blocks={[
														belowOverride && {
															breakpoint: belowOverride,
															value: options?.find((opt) => opt.value === value?.[attribute[belowOverride]])?.label ?? upperFirst(value?.[belowOverride]),
															widthEnd: breakpointData[belowOverride],
															dotsStart: true,
															alignEnd: true,
														},
														{
															breakpoint: breakpoint,
															value: options?.find((opt) => opt.value === value?.[attribute[breakpoint]])?.label ?? upperFirst(value?.[breakpoint]),
															widthEnd: breakpointData[breakpoint],
															active: true,
															alignEnd: true,
															dotsStart: aboveOverride === breakpoint,
														},
														aboveOverride !== defaultBreakpoint && {
															breakpoint: aboveOverride,
															value: options?.find((opt) => opt.value === value?.[attribute[aboveOverride]])?.label ?? upperFirst(value?.[aboveOverride]),
															dotsEnd: true,
														},
														aboveOverride === defaultBreakpoint && {
															breakpoint: __('Default', 'eightshift-ui-components'),
															value: options?.find((opt) => opt.value === value?.[attribute[defaultBreakpoint]])?.label ?? upperFirst(value?.[defaultBreakpoint]),
															dotsEnd: true,
														},
													]}
												/>
											</div>
										)}
									</div>
								}
							>
								<div
									className={clsx(
										'es-uic-flex es-uic-size-7 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-shadow-sm es-uic-transition-colors [&>svg]:es-uic-size-5',
										value[attribute[breakpoint]] === inheritValue
											? 'es-uic-border-gray-200 es-uic-bg-gray-50 es-uic-text-gray-700'
											: 'es-uic-border-gray-100 es-uic-bg-white es-uic-text-gray-500',
									)}
								>
									{icons?.[`screen${upperFirst(breakpoint)}`]}
								</div>
							</DecorativeTooltip>

							{children({
								breakpoint: breakpoint,
								currentValue: value?.[attribute[breakpoint]],
								options: options,
								handleChange: (newValue) => onChange(attribute[breakpoint], newValue),
							})}

							<Button
								onPress={() => onChange(attribute[breakpoint], inheritValue)}
								icon={icons.clearAlt}
								disabled={value?.[attribute[breakpoint]] === inheritValue}
								type='ghost'
							/>
						</div>
					);
				})}
			</AnimatedVisibility>
		</BaseControl>
	);
};
