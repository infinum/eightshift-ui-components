import { useState } from 'react';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { clsx } from 'clsx';

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
		breakpoints: rawBreakpoints = Object.entries(breakpointData)
			.toSorted((a, b) => a[1] - b[1])
			.map(([breakpoint]) => breakpoint)
			.toReversed(),

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
			className='es:p-3'
			theme='light'
			offset={7.5}
			arrow
			text={
				<div className='es:max-w-64 es:p-1'>
					<span className='es:block es:text-balance es:font-semibold es:tabular-nums'>{__('Default', 'eightshift-ui-components')}</span>

					<span className='es:block es:text-balance es:tabular-nums'>
						{!globalOverride && __('Always applied, regardless of browser width.', 'eightshift-ui-components')}
						{globalOverride && sprintf(__('Applied when the browser width is %dpx or wider.', 'eightshift-ui-components'), breakpointData[globalOverride] + 1)}
					</span>

					{globalOverride && (
						<div className='es:mx-auto es:mt-2'>
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
										width: breakpointData[globalOverride] + 1,
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
			<div className='es:flex es:size-7 es:items-center es:justify-center es:rounded es:border es:border-accent-500/10 es:bg-accent-50 es:p-0.5 es:text-accent-800 es:shadow-sm es:shadow-accent-600/25 es:icon:size-5'>
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
			className='es:w-full'
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
						'es:grid es:items-center es:gap-x-2 es:transition-[grid-template-columns,margin-block-end] es:duration-150',
						innerContentAlign === 'start' && 'es:justify-items-start',
						innerContentAlign === 'center' && 'es:justify-items-center',
						innerContentAlign === 'end' && 'es:justify-items-end',
						innerContentAlign === 'stretch' && 'es:justify-items-stretch',
						detailsVisible ? 'es:mb-2 es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)]' : 'es:grid-cols-[minmax(0,0rem)_minmax(0,1fr)_minmax(0,2.25rem)]',
					)}
					key={defaultBreakpoint}
				>
					{detailsVisible && <DefaultTooltip />}
					<div className={clsx('es:w-full', detailsVisible ? 'es:col-start-2 es:col-end-2' : 'es:col-span-full')}>
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
						'es:mb-2 es:grid es:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2',
						innerContentAlign === 'start' && 'es:justify-items-start',
						innerContentAlign === 'center' && 'es:justify-items-center',
						innerContentAlign === 'end' && 'es:justify-items-end',
						innerContentAlign === 'stretch' && 'es:justify-items-stretch',
					)}
					key={defaultBreakpoint}
					visible={detailsVisible}
				>
					<DefaultTooltip />
					<div className='es:col-start-2 es:col-end-2'>
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
				className='es:space-y-2'
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
								'es:grid es:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2',
								innerContentAlign === 'start' && 'es:justify-items-start',
								innerContentAlign === 'center' && 'es:justify-items-center',
								innerContentAlign === 'end' && 'es:justify-items-end',
								innerContentAlign === 'stretch' && 'es:justify-items-stretch',
							)}
							key={breakpoint}
						>
							<DecorativeTooltip
								placement='left'
								theme='light'
								offset={7.5}
								arrow
								text={
									<div className='es:max-w-96 es:p-1'>
										<span className='es:block es:font-semibold'>{upperFirst(breakpoint)}</span>

										<span className='es:block es:text-balance es:tabular-nums'>
											{aboveOverride &&
												(aboveOverride !== rawBreakpoints[0] || !belowOverride) &&
												isOverrideSet &&
												sprintf(__('Applied when the browser width is %dpx or less.', 'eightshift-ui-components'), breakpointData[breakpoint])}

											{aboveOverride &&
												aboveOverride === rawBreakpoints[0] &&
												belowOverride &&
												isOverrideSet &&
												sprintf(
													__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
													breakpointData[belowOverride] + 1,
													breakpointData[breakpoint],
												)}

											{(!aboveOverride || !isOverrideSet) && sprintf(__('Up to %dpx', 'eightshift-ui-components'), breakpointData[breakpoint])}
										</span>

										{((aboveOverride && !isOverrideSet) || !aboveOverride) && (
											<span className='es:mt-2 es:block es:font-medium es:italic'>{__('Not set', 'eightshift-ui-components')}</span>
										)}

										{aboveOverride && isOverrideSet && (
											<div className='es:mx-auto es:mt-2'>
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
										'es:flex es:size-7 es:items-center es:justify-center es:rounded es:border es:p-0.5 es:shadow-sm es:transition-colors es:icon:size-5',
										value[attribute[breakpoint]] === inheritValue
											? 'es:border-secondary-200 es:bg-secondary-50 es:text-secondary-700'
											: 'es:border-secondary-100 es:bg-white es:text-secondary-500',
									)}
								>
									{icons?.[`screen${upperFirst(breakpoint)}`]}
								</div>
							</DecorativeTooltip>

							<div className='es:w-full'>
								{children({
									breakpoint: breakpoint,
									currentValue: value?.[attribute[breakpoint]],
									options: options,
									handleChange: (newValue) => onChange(attribute[breakpoint], newValue),
								})}
							</div>

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
