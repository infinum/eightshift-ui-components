import { useState } from 'react';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { clsx } from 'clsx';
import { __, sprintf } from '@wordpress/i18n';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { upperFirst } from '../../utilities';
import { icons } from '../../icons/icons';
import { Menu, MenuItem, MenuSectionHeader, MenuSeparator, SubMenuItem } from '../menu/menu';
import { ResponsivePreview } from '../responsive-preview/responsive-preview';
import { Button, ButtonGroup } from '../button/button';
import { RichLabel } from '../rich-label/rich-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { ToggleButton } from '../toggle-button/toggle-button';
import { BaseControl } from '../base-control/base-control';

/**
 * A component that allows the user to set different values for different breakpoints.
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
 * @param {JSX.Element} props.icon - The icon of the component.
 * @param {string} props.help - The help text of the component.
 * @param {string} props.label - The label of the component.
 * @param {string} props.subtitle - The subtitle of the component.
 * @param {{label: string, value: string}[]} props.options - Options of the attribute the component is linked to. `{ value: string, label: string }[]`.
 * @param {string[]} props.breakpoints - Breakpoints to use.
 * @param {string[]} [props.desktopFirstBreakpoints] - Breakpoints to use in desktop-first mode. If not provided, the breakpoints will be used in reverse order.
 * @param {Object<string, number>} [props.breakpointData] - Currently used breakpoint data. `{ [breakpoint: string]: number }`.
 * @param {Object<string, number>} [props.breakpointUiData] - Allows overriding breakpoint names and icons. `{ [breakpoint: string]: { label: string, icon: JSX.Element|string } }`.
 * @param {boolean} [props.noModeSelect] - If `true`, the mode selection (desktop-first/mobile-first) is hidden.
 * @param {boolean} [props.inline] - If `true`, the default breakpoint is shown inline with the label. In the expanded state, all breakpoints are shown below the label.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.useLegacyDesktopFirst] - If `true`, the legacy desktop-first mode is used. This is only for backwards compatibility.
 * @param {string} [props.className] - Classes to pass to the control base.
 * @param {'start' | 'center' | 'end' | 'stretch'} [props.innerContentAlign='start'] - Determines inner content alignment
 *
 * @returns {JSX.Element} The Responsive component.
 *
 * @example
 * <Responsive
 * 	value={value}
 * 	onChange={onChange}
 * 	icon={icons.myIcon}
 * 	label={__('Label', 'eightshift-ui-components')}
 * 	options={[
 * 		{ value: 'value1', label: 'Value 1' },
 * 		{ value: 'value2', label: 'Value 2' },
 * 		{ value: 'value3', label: 'Value 3' },
 * 	]}
 * 	breakpoints={['mobile', 'tablet', 'desktop', 'large']}
 * 	breakpointData={breakpointData}
 * >
 * 	{({ breakpoint, currentValue, options, handleChange }) => (
 * 		<Select
 * 			label={breakpoint}
 * 			value={currentValue}
 * 			options={options}
 * 			onChange={handleChange}
 * 		/>
 * 	)}
 * </Responsive>
 *
 * @preserve
 */
export const Responsive = (props) => {
	const {
		value,
		onChange,

		icon,
		help,
		label,
		subtitle,

		options,

		breakpoints: rawBreakpoints,
		desktopFirstBreakpoints: rawDesktopFirstBreakpoints,

		breakpointData,
		breakpointUiData,

		noModeSelect,

		inline,

		children,

		hidden,

		innerContentAlign = 'start',

		useLegacyDesktopFirst,

		className,
	} = props;

	if (typeof rawBreakpoints === 'undefined' || !Array.isArray(rawBreakpoints)) {
		console.warn(__("Responsive: Missing or invalid 'breakpoints' prop.", 'eightshift-ui-components'));

		return null;
	}

	const breakpoints = rawBreakpoints.slice(1);

	let desktopFirstBreakpoints = (rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(1)).map((breakpoint) => (breakpoint.startsWith('max-') ? breakpoint : `max-${breakpoint}`));

	if (useLegacyDesktopFirst) {
		desktopFirstBreakpoints = (rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(0, -1)).map((breakpoint) => (breakpoint.startsWith('max-') ? breakpoint : `max-${breakpoint}`));
	}

	const [detailsVisible, setDetailsVisible] = useState(false);

	const isDesktopFirst = value?.['_desktopFirst'] === true;

	const firstMobileFirstOverride = breakpoints.find((breakpoint) => typeof value?.[breakpoint] !== 'undefined');
	const lastDesktopFirstOverride = desktopFirstBreakpoints.toReversed().find((breakpoint) => typeof value?.[breakpoint] !== 'undefined');

	const breakpointsToMap = isDesktopFirst ? desktopFirstBreakpoints : breakpoints;

	if (hidden) {
		return null;
	}

	const DefaultTooltip = () => {
		const overrideIcon = breakpointUiData?.[isDesktopFirst ? rawBreakpoints.at(-1) : rawBreakpoints.at(0)]?.icon;

		return (
			<DecorativeTooltip
				placement='left'
				className='es:p-4! es:rounded-2xl!'
				theme='light'
				offset={7.5}
				arrow
				text={
					<div className='es:max-w-64 es:p-1'>
						<span className='es:block es:font-variation-["wdth"_180,"wght"_500] es:text-base es:leading-none es:text-surface-600'>{__('Default', 'eightshift-ui-components')}</span>

						<span className='es:block es:text-balance es:tabular-nums es:font-variation-["wdth"_60,"wght"_300] es:text-surface-500 es:mt-1'>
							{!firstMobileFirstOverride && !lastDesktopFirstOverride && __('Always applied, regardless of browser width.', 'eightshift-ui-components')}

							{firstMobileFirstOverride &&
								!isDesktopFirst &&
								sprintf(__('Applies when the browser width is %dpx or less.', 'eightshift-ui-components'), breakpointData[firstMobileFirstOverride] - 1)}

							{lastDesktopFirstOverride &&
								isDesktopFirst &&
								sprintf(__('Applies when the browser width is %dpx or more.', 'eightshift-ui-components'), breakpointData[lastDesktopFirstOverride.replace('max-', '')])}
						</span>

						<div className='es:mx-auto es:mt-5'>
							{firstMobileFirstOverride && !isDesktopFirst && (
								<BreakpointPreview
									blocks={[
										{
											breakpoint: __('Default', 'eightshift-ui-components'),
											widthEnd: breakpointData[firstMobileFirstOverride] - 1,
											value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
											dotsStart: true,
											alignEnd: true,
											active: true,
										},
										{
											breakpoint: breakpointUiData?.[firstMobileFirstOverride]?.label ?? firstMobileFirstOverride,
											value: options?.find((opt) => opt.value === value?.[firstMobileFirstOverride])?.label ?? upperFirst(value?.[firstMobileFirstOverride]),
											dotsEnd: true,
										},
									]}
								/>
							)}

							{lastDesktopFirstOverride && isDesktopFirst && (
								<BreakpointPreview
									blocks={[
										{
											breakpoint: breakpointUiData?.[lastDesktopFirstOverride.replace('max-', '')]?.label ?? lastDesktopFirstOverride.replace('max-', ''),
											value: options?.find((opt) => opt.value === value?.[lastDesktopFirstOverride])?.label ?? upperFirst(value?.[lastDesktopFirstOverride]),
											dotsStart: true,
											alignEnd: true,
										},
										{
											breakpoint: __('Default', 'eightshift-ui-components'),
											value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
											width: breakpointData[lastDesktopFirstOverride.replace('max-', '')],
											dotsEnd: true,
											active: true,
										},
									]}
								/>
							)}
						</div>
					</div>
				}
			>
				<div className='es:icon:size-6 es:mx-0.5 es:text-accent-700'>
					{icons?.[overrideIcon] ?? overrideIcon ?? icons[`screen${upperFirst(isDesktopFirst ? rawBreakpoints.at(-1) : rawBreakpoints.at(0))}`]}
				</div>
			</DecorativeTooltip>
		);
	};

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			className={className}
			actions={
				<>
					{inline && (
						<AnimatedVisibility
							className='es:mr-0.5'
							visible={!detailsVisible}
							key='_default-inline'
							transition='scaleFade'
							noInitial
						>
							{children({
								breakpoint: '_default',
								currentValue: value?.['_default'],
								handleChange: (newValue) =>
									onChange({
										...value,
										_default: newValue,
									}),
								options: options,
								key: Object.keys(value),
								isInlineCollapsedView: true,
							})}
						</AnimatedVisibility>
					)}

					<ButtonGroup>
						<ToggleButton
							icon={icons.responsiveOverridesAlt3Fill}
							onChange={() => setDetailsVisible(!detailsVisible)}
							selected={detailsVisible}
							tooltip={detailsVisible ? __('Hide responsive overrides', 'eightshift-ui-components') : __('Show responsive overrides', 'eightshift-ui-components')}
						/>

						<Menu
							aria-label={__('Responsive options', 'eightshift-ui-components')}
							tooltip={__('Responsive options', 'eightshift-ui-components')}
							popoverProps={{ placement: 'bottom right' }}
							triggerProps={{ className: 'es:w-6 es:stroke-[1.25]' }}
							triggerIcon={icons.dropdownCaretAlt}
						>
							{!noModeSelect && (
								<>
									<MenuSectionHeader>{__('Breakpoint mode', 'eightshift-ui-components')}</MenuSectionHeader>
									<MenuItem
										selected={!isDesktopFirst}
										onClick={() => {
											onChange({
												_default: value['_default'],
												_desktopFirst: false,
											});
										}}
									>
										<RichLabel
											label={__('Mobile-first', 'eightshift-ui-components')}
											subtitle={__('Default', 'eightshift-ui-components')}
											noColor
										/>
									</MenuItem>
									<MenuItem
										selected={isDesktopFirst}
										onClick={() => {
											onChange({
												_default: value['_default'],
												_desktopFirst: true,
											});
										}}
									>
										{__('Desktop-first', 'eightshift-ui-components')}
									</MenuItem>
									<MenuSeparator />
								</>
							)}

							{Object.keys(value).some((key) => !key?.startsWith('_') && typeof value?.[key] !== 'undefined') && (
								<SubMenuItem
									manualWidth
									popoverProps={{ className: 'es:max-w-full!' }}
									trigger={<MenuItem icon={icons.previewResponsive}>{__('Responsive preview', 'eightshift-ui-components')}</MenuItem>}
								>
									<MenuItem disabled>
										<ResponsivePreview
											value={value}
											isDesktopFirst={isDesktopFirst}
											breakpoints={breakpoints}
											desktopFirstBreakpoints={desktopFirstBreakpoints}
											options={options}
											breakpointData={breakpointData}
											breakpointUiData={breakpointUiData}
										/>
									</MenuItem>
								</SubMenuItem>
							)}
							{Object.keys(value).some((key) => !key?.startsWith('_') && typeof value?.[key] !== 'undefined') && <MenuSeparator />}
							<MenuItem
								icon={icons.clearAlt}
								onClick={() => {
									const newValue = { ...value };

									[...breakpoints, ...desktopFirstBreakpoints].forEach((breakpoint) => {
										delete newValue[breakpoint];
									});

									onChange(newValue);
								}}
								danger
							>
								{__('Clear all overrides', 'eightshift-ui-components')}
							</MenuItem>
						</Menu>
					</ButtonGroup>
				</>
			}
		>
			{!isDesktopFirst && !inline && (
				<div
					className={clsx(
						'es:grid es:items-center es:gap-x-2 es:transition-[grid-template-columns,margin-block-end] es:duration-200',
						detailsVisible && 'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-accent-600/25',
						innerContentAlign === 'start' && 'es:justify-items-start',
						innerContentAlign === 'center' && 'es:justify-items-center',
						innerContentAlign === 'end' && 'es:justify-items-end',
						innerContentAlign === 'stretch' && 'es:justify-items-stretch',
						detailsVisible ? 'es:mb-0.5 es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)]' : 'es:grid-cols-[minmax(0,0rem)_minmax(0,1fr)_minmax(0,2.25rem)]',
					)}
					key='_default-mobile-first'
				>
					{detailsVisible && <DefaultTooltip />}
					<div className={clsx('es:w-full', detailsVisible ? 'es:col-start-2 es:col-end-2' : 'es:col-span-full')}>
						{children({
							breakpoint: '_default',
							currentValue: value?.['_default'],
							handleChange: (newValue) =>
								onChange({
									...value,
									_default: newValue,
								}),
							options: options,
							key: Object.keys(value),
						})}
					</div>
				</div>
			)}

			{!isDesktopFirst && inline && (
				<AnimatedVisibility
					className={clsx(
						'es:mb-0.5 es:grid es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2',
						'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-accent-600/25',
						innerContentAlign === 'start' && 'es:justify-items-start',
						innerContentAlign === 'center' && 'es:justify-items-center',
						innerContentAlign === 'end' && 'es:justify-items-end',
						innerContentAlign === 'stretch' && 'es:justify-items-stretch',
					)}
					key='_default-mobile-first-inline'
					visible={detailsVisible}
				>
					<DefaultTooltip />
					<div className='es:col-start-2 es:col-end-2'>
						{children({
							breakpoint: '_default',
							currentValue: value?.['_default'],
							handleChange: (newValue) =>
								onChange({
									...value,
									_default: newValue,
								}),
							options: options,
							key: Object.keys(value),
							isInlineExpandedView: true,
						})}
					</div>
				</AnimatedVisibility>
			)}

			<AnimatedVisibility
				visible={detailsVisible}
				className='es:space-y-0.5'
			>
				{breakpointsToMap.map((breakpoint, i) => {
					const realBreakpointName = breakpoint.replace('max-', '');

					const filterBreakpoints = isDesktopFirst ? [...breakpointsToMap, '_default'] : ['_default', ...breakpointsToMap];

					const aboveOverride = isDesktopFirst
						? filterBreakpoints.slice(i + 1).find((breakpoint) => typeof value?.[breakpoint] !== 'undefined')
						: filterBreakpoints
								.slice(0, i + 1)
								.toReversed()
								.find((breakpoint) => typeof value?.[breakpoint] !== 'undefined');

					const belowOverride = isDesktopFirst
						? filterBreakpoints
								.slice(0, i)
								.toReversed()
								.find((breakpoint) => typeof value?.[breakpoint] !== 'undefined')
						: filterBreakpoints.slice(i + 2).find((breakpoint) => typeof value?.[breakpoint] !== 'undefined');

					return (
						<div
							className={clsx(
								'es:grid es:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2',
								'es:bg-white/50 es:p-1.5 es:rounded-sm es:inset-ring es:inset-ring-surface-200/60',
								!isDesktopFirst && 'es:last:rounded-b-2xl',
								isDesktopFirst && 'es:first:rounded-t-2xl',
								innerContentAlign === 'start' && 'es:justify-items-start',
								innerContentAlign === 'center' && 'es:justify-items-center',
								innerContentAlign === 'end' && 'es:justify-items-end',
								innerContentAlign === 'stretch' && 'es:justify-items-stretch',
							)}
							key={realBreakpointName}
						>
							<DecorativeTooltip
								placement='left'
								theme='light'
								className='es:p-4! es:rounded-2xl!'
								offset={7.5}
								arrow
								text={
									<div className='es:max-w-96 es:p-1'>
										<span className='es:block es:font-variation-["wdth"_180,"wght"_500] es:text-base es:leading-none es:text-surface-600'>
											{breakpointUiData?.[realBreakpointName]?.label ?? upperFirst(realBreakpointName)}
										</span>

										<span className='es:block es:text-balance es:tabular-nums es:font-variation-["wdth"_60,"wght"_300] es:text-surface-500 es:mt-1'>
											{!isDesktopFirst && (
												<>
													{!belowOverride &&
														typeof value[breakpoint] !== 'undefined' &&
														sprintf(__('Applied when the browser width is %dpx or more.', 'eightshift-ui-components'), breakpointData[realBreakpointName])}

													{belowOverride &&
														typeof value[breakpoint] !== 'undefined' &&
														sprintf(
															__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
															breakpointData[realBreakpointName],
															breakpointData[belowOverride] - 1,
														)}

													{typeof value[breakpoint] === 'undefined' && sprintf(__('From %dpx', 'eightshift-ui-components'), breakpointData[realBreakpointName])}
												</>
											)}

											{isDesktopFirst && (
												<>
													{!belowOverride &&
														typeof value[breakpoint] !== 'undefined' &&
														sprintf(__('Applied when the browser width is %dpx or less.', 'eightshift-ui-components'), breakpointData[realBreakpointName] - 1)}

													{belowOverride &&
														typeof value[breakpoint] !== 'undefined' &&
														sprintf(
															__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
															breakpointData[belowOverride?.replace('max-', '')],
															breakpointData[realBreakpointName] - 1,
														)}

													{typeof value[breakpoint] === 'undefined' && sprintf(__('Up to %dpx', 'eightshift-ui-components'), breakpointData[breakpoint?.replace('max-', '')])}
												</>
											)}
										</span>

										{typeof value[breakpoint] === 'undefined' && (
											<span className='es:mt-2 es:block es:font-variation-["wdth"_100,"YTLC"_520,"wght"_350,"slnt"_-10]'>{__('Not set', 'eightshift-ui-components')}</span>
										)}

										{typeof value[breakpoint] !== 'undefined' && (
											<div className='es:mx-auto es:mt-5'>
												{!isDesktopFirst && (
													<BreakpointPreview
														dotsStart={belowOverride}
														blocks={[
															aboveOverride !== '_default' &&
																typeof value?.[aboveOverride] !== 'undefined' && {
																	breakpoint: breakpointUiData?.[aboveOverride]?.label ?? aboveOverride,
																	value: options?.find((opt) => opt.value === value?.[aboveOverride])?.label ?? upperFirst(value?.[aboveOverride]),
																	dotsStart: !belowOverride,
																	alignEnd: !belowOverride,
																},
															aboveOverride === '_default' &&
																typeof value?.['_default'] !== 'undefined' && {
																	breakpoint: __('Default', 'eightshift-ui-components'),
																	value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
																	dotsStart: !belowOverride,
																	alignEnd: !belowOverride,
																},
															{
																breakpoint: breakpointUiData?.[realBreakpointName]?.label ?? realBreakpointName,
																value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[breakpoint]),
																width: breakpointData[realBreakpointName],
																active: true,
																dotsEnd: !belowOverride,
															},
															belowOverride &&
																typeof value?.[belowOverride] !== 'undefined' && {
																	breakpoint: breakpointUiData?.[belowOverride]?.label ?? belowOverride,
																	value: options?.find((opt) => opt.value === value?.[belowOverride])?.label ?? upperFirst(value?.[belowOverride]),
																	width: breakpointData[belowOverride],
																	dotsEnd: true,
																},
														]}
													/>
												)}

												{isDesktopFirst && (
													<BreakpointPreview
														dotsStart
														dotsEnd={aboveOverride !== '_default'}
														blocks={[
															belowOverride && {
																breakpoint: breakpointUiData?.[belowOverride?.replace('max-', '')]?.label ?? belowOverride?.replace('max-', ''),
																value: options?.find((opt) => opt.value === value?.[belowOverride])?.label ?? upperFirst(value?.[belowOverride]),
															},
															{
																breakpoint: breakpointUiData?.[realBreakpointName]?.label ?? realBreakpointName,
																value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[realBreakpointName]),
																width: breakpointData[filterBreakpoints[i - 1]?.replace('max-', '')],
																active: true,
															},
															aboveOverride !== '_default' && {
																breakpoint: breakpointUiData?.[aboveOverride?.replace('max-', '')]?.label ?? aboveOverride?.replace('max-', ''),
																value: options?.find((opt) => opt.value === value?.[aboveOverride])?.label ?? upperFirst(value?.[aboveOverride]),
																width: breakpointData[breakpoint?.replace('max-', '')],
															},
															aboveOverride === '_default' && {
																breakpoint: __('Default', 'eightshift-ui-components'),
																value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
																width: breakpointData[breakpoint?.replace('max-', '')],
																dotsEnd: true,
															},
														]}
													/>
												)}
											</div>
										)}
									</div>
								}
							>
								<div className={clsx('es:transition-colors es:icon:size-6 es:mx-0.5', typeof value[breakpoint] !== 'undefined' ? 'es:text-surface-600' : 'es:text-surface-300')}>
									{icons?.[breakpointUiData?.[realBreakpointName]?.icon] ?? breakpointUiData?.[realBreakpointName]?.icon ?? icons?.[`screen${upperFirst(realBreakpointName)}`]}
								</div>
							</DecorativeTooltip>

							{children({
								breakpoint: breakpoint,
								currentValue: value?.[breakpoint],
								handleChange: (newValue) => {
									onChange({
										...value,
										[breakpoint]: newValue,
									});
								},
								options: options,
								key: Object.keys(value),
							})}

							<Button
								onPress={() => {
									const newValue = { ...value };
									delete newValue[breakpoint];
									onChange(newValue);
								}}
								icon={icons.clearAlt}
								disabled={typeof value?.[breakpoint] === 'undefined'}
								type='ghost'
							/>
						</div>
					);
				})}
			</AnimatedVisibility>

			{isDesktopFirst && !inline && (
				<div
					className={clsx(
						'es:grid es:items-center es:gap-x-2 es:transition-[grid-template-columns,margin-block-start] es:duration-150',
						detailsVisible && 'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-accent-600/25 es:transition-plus',
						innerContentAlign === 'start' && 'es:justify-items-start',
						innerContentAlign === 'center' && 'es:justify-items-center',
						innerContentAlign === 'end' && 'es:justify-items-end',
						innerContentAlign === 'stretch' && 'es:justify-items-stretch',
						detailsVisible ? 'es:mt-0.5 es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)]' : 'es:grid-cols-[minmax(0,0rem)_minmax(0,1fr)_minmax(0,2.25rem)]',
					)}
					key='_default-desktop-first'
				>
					{detailsVisible && <DefaultTooltip />}
					<div className={clsx('es:w-full', detailsVisible ? 'es:col-start-2 es:col-end-2' : 'es:col-span-full')}>
						{children({
							breakpoint: '_default',
							currentValue: value?.['_default'],
							handleChange: (newValue) =>
								onChange({
									...value,
									_default: newValue,
								}),
							options: options,
							key: Object.keys(value),
						})}
					</div>
				</div>
			)}

			{isDesktopFirst && inline && (
				<AnimatedVisibility
					className={clsx(
						'es:grid es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2 es:pt-1',
						'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-accent-600/25',
						innerContentAlign === 'start' && 'es:justify-items-start',
						innerContentAlign === 'center' && 'es:justify-items-center',
						innerContentAlign === 'end' && 'es:justify-items-end',
						innerContentAlign === 'stretch' && 'es:justify-items-stretch',
					)}
					key='_default-desktop-first-inline'
					visible={detailsVisible}
				>
					<DefaultTooltip />
					<div className='es:col-start-2 es:col-end-2'>
						{children({
							breakpoint: '_default',
							currentValue: value?.['_default'],
							handleChange: (newValue) =>
								onChange({
									...value,
									_default: newValue,
								}),
							options: options,
							key: Object.keys(value),
							isInlineExpandedView: true,
						})}
					</div>
				</AnimatedVisibility>
			)}
		</BaseControl>
	);
};
