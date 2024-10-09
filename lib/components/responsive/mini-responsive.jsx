import { cloneElement } from 'react';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { clsx } from 'clsx/lite';
import { __, sprintf } from '@wordpress/i18n';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { upperFirst } from '../../utilities';
import { icons } from '../../icons/icons';
import { ResponsivePreview } from '../responsive-preview/responsive-preview';
import { Button, ButtonGroup } from '../button/button';
import { Spacer } from '../spacer/spacer';
import { BaseControl } from '../base-control/base-control';
import { TriggeredPopover } from '../popover/popover';
import { OptionSelect } from '../option-select/option-select';
import { Text } from 'react-aria-components';

/**
 * A compact, inline version of `Responsive`. Allows the user to set different values for different breakpoints.
 *
 * Inner items should be passed as a render function.
 * The following props are passed to the render function:
 * - `breakpoint: string` - Name of the current breakpoint.
 * - `currentValue: any` - Current value.
 * - `handleChange: Function<(attributeName: string, value: any) => void>` - A function to change the value for the breakpoint..
 * - `options: Object<string, any>` - (Optional) Options list passed to the `ResponsiveLegacy` component. (optional)
 * - `isInlineCollapsedView: boolean` - (Optional) `true` if in the main view, with the detail popover closed.
 * - `isInlineExpandedView: boolean` - (Optional) `true` if the detail popover is open.
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
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {'start' | 'center' | 'end' | 'stretch'} [props.innerContentAlign='start'] - Determines inner content alignment
 *
 * @returns {JSX.Element} The MiniResponsive component.
 *
 * @example
 * <MiniResponsive
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
 * </MiniResponsive>
 *
 * @preserve
 */
export const MiniResponsive = (props) => {
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

		children,

		hidden,

		innerContentAlign = 'start',
	} = props;

	if (typeof rawBreakpoints === 'undefined' || !Array.isArray(rawBreakpoints)) {
		console.warn(__("MiniResponsive: Missing or invalid 'breakpoints' prop.", 'eightshift-ui-components'));

		return null;
	}

	const breakpoints = rawBreakpoints.slice(1);
	const desktopFirstBreakpoints = (rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(0, -1)).map((breakpoint) =>
		breakpoint.startsWith('max-') ? breakpoint : `max-${breakpoint}`,
	);

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
				className='es-uic-p-3'
				theme='light'
				offset={7.5}
				arrow
				text={
					<div className='es-uic-max-w-64 es-uic-p-1'>
						<span className='es-uic-block es-uic-text-balance es-uic-font-semibold es-uic-tabular-nums'>{__('Default', 'eightshift-ui-components')}</span>

						<span className='es-uic-block es-uic-text-balance es-uic-tabular-nums'>
							{!firstMobileFirstOverride && !lastDesktopFirstOverride && __('Always applied, regardless of browser width.', 'eightshift-ui-components')}

							{firstMobileFirstOverride &&
								!isDesktopFirst &&
								sprintf(__('Applies when the browser width is %dpx or less.', 'eightshift-ui-components'), breakpointData[firstMobileFirstOverride] - 1)}

							{lastDesktopFirstOverride &&
								isDesktopFirst &&
								sprintf(__('Applies when the browser width is %dpx or more.', 'eightshift-ui-components'), breakpointData[lastDesktopFirstOverride.replace('max-', '')])}
						</span>

						<div className='es-uic-mx-auto'>
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
				<div className='es-uic-flex es-uic-size-7 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-border-teal-500/10 es-uic-bg-teal-50 es-uic-p-0.5 es-uic-text-teal-800 es-uic-shadow-sm es-uic-shadow-teal-600/25 [&>svg]:es-uic-size-5'>
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
			inline
		>
			<ButtonGroup>
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

				<TriggeredPopover
					triggerButtonIcon={cloneElement(isDesktopFirst ? icons.responsiveOverridesAlt : icons.responsiveOverridesAlt2, { className: '!es-uic-size-5' })}
					triggerButtonProps={{
						tooltip: __('Responsive overrides', 'eightshift-ui-components'),
						className: 'es-uic-w-7',
					}}
					className='es-uic-min-w-80 es-uic-divide-y es-uic-divide-gray-200 !es-uic-p-0'
				>
					<div className='es-uic-flex es-uic-items-center es-uic-justify-between es-uic-p-2'>
						<Text className='es-uic-block es-uic-text-xs es-uic-text-gray-500'>{__('Responsive overrides', 'eightshift-ui-components')}</Text>

						<OptionSelect
							hidden={noModeSelect}
							aria-label={__('Breakpoint mode', 'eightshift-ui-components')}
							value={isDesktopFirst}
							onChange={(newMode) => {
								onChange({
									_default: value['_default'],
									_desktopFirst: newMode,
								});
							}}
							options={[
								{ label: __('Mobile-first', 'eightshift-ui-components'), subtitle: __('Default', 'eightshift-ui-components'), value: false },
								{ label: __('Desktop-first', 'eightshift-ui-components'), value: true },
							]}
							wrapperProps={{ triggerProps: { size: 'small' } }}
							type='menu'
							tooltip
						/>
					</div>

					<div className='es-uic-space-y-2 es-uic-px-2 es-uic-py-2.5'>
						{!isDesktopFirst && (
							<div
								className={clsx(
									'es-uic-grid es-uic-grid-cols-[minmax(0,_1.75rem),_minmax(0,_1fr),_minmax(0,_2.25rem)] es-uic-items-center es-uic-gap-x-2',
									innerContentAlign === 'start' && 'es-uic-justify-items-start',
									innerContentAlign === 'center' && 'es-uic-justify-items-center',
									innerContentAlign === 'end' && 'es-uic-justify-items-end',
									innerContentAlign === 'stretch' && 'es-uic-justify-items-stretch',
								)}
								key='_default-mobile-first'
							>
								<DefaultTooltip />
								<div className='es-uic-col-start-2 es-uic-col-end-2'>
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
							</div>
						)}

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
										'es-uic-grid es-uic-grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2.25rem)] es-uic-items-center es-uic-gap-x-2',
										innerContentAlign === 'start' && 'es-uic-justify-items-start',
										innerContentAlign === 'center' && 'es-uic-justify-items-center',
										innerContentAlign === 'end' && 'es-uic-justify-items-end',
										innerContentAlign === 'stretch' && 'es-uic-justify-items-stretch',
									)}
									key={realBreakpointName}
								>
									<DecorativeTooltip
										placement='left'
										theme='light'
										offset={7.5}
										arrow
										text={
											<div className='es-uic-max-w-96 es-uic-p-1'>
												<span className='es-uic-block es-uic-font-semibold'>{breakpointUiData?.[realBreakpointName]?.label ?? upperFirst(realBreakpointName)}</span>

												<span className='es-uic-block es-uic-text-balance es-uic-tabular-nums'>
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
													<span className='es-uic-mt-2 es-uic-block es-uic-font-medium es-uic-italic'>{__('Not set', 'eightshift-ui-components')}</span>
												)}

												{typeof value[breakpoint] !== 'undefined' && (
													<div className='es-uic-mx-auto es-uic-mt-2'>
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
										<div
											className={clsx(
												'es-uic-flex es-uic-size-7 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-shadow-sm es-uic-transition-colors [&>svg]:es-uic-size-5',
												typeof value[breakpoint] !== 'undefined'
													? 'es-uic-border-gray-200 es-uic-bg-gray-50 es-uic-text-gray-700'
													: 'es-uic-border-gray-100 es-uic-bg-white es-uic-text-gray-500',
											)}
										>
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

						{isDesktopFirst && (
							<div
								className={clsx(
									'es-uic-grid es-uic-grid-cols-[minmax(0,_1.75rem),_minmax(0,_1fr),_minmax(0,_2.25rem)] es-uic-items-center es-uic-gap-x-2',
									innerContentAlign === 'start' && 'es-uic-justify-items-start',
									innerContentAlign === 'center' && 'es-uic-justify-items-center',
									innerContentAlign === 'end' && 'es-uic-justify-items-end',
									innerContentAlign === 'stretch' && 'es-uic-justify-items-stretch',
								)}
								key='_default-desktop-first'
							>
								<DefaultTooltip />
								<div className='es-uic-col-start-2 es-uic-col-end-2'>
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
							</div>
						)}
					</div>

					<div className='es-uic-grid es-uic-grid-cols-[1fr_auto_1fr] es-uic-gap-x-1 es-uic-px-1'>
						<TriggeredPopover
							triggerButtonLabel={__('Responsive preview', 'eightshift-ui-components')}
							triggerButtonProps={{
								disabled: !Object.keys(value).some((key) => !key?.startsWith('_') && typeof value?.[key] !== 'undefined'),
								type: 'ghost',
								className: 'es-uic-my-1',
							}}
						>
							<ResponsivePreview
								value={value}
								isDesktopFirst={isDesktopFirst}
								breakpoints={breakpoints}
								desktopFirstBreakpoints={desktopFirstBreakpoints}
								options={options}
								breakpointData={breakpointData}
								breakpointUiData={breakpointUiData}
							/>
						</TriggeredPopover>

						<Spacer
							className='*:!es-uic-bg-gray-200'
							vertical
							border
						/>

						<Button
							icon={icons.clearAlt}
							disabled={!Object.keys(value).some((key) => !key?.startsWith('_') && typeof value?.[key] !== 'undefined')}
							onPress={() => {
								const newValue = { ...value };

								[...breakpoints, ...desktopFirstBreakpoints].forEach((breakpoint) => {
									delete newValue[breakpoint];
								});

								onChange(newValue);
							}}
							type='ghost'
							className='es-uic-my-1 es-uic-justify-center'
						>
							{__('Clear all overrides', 'eightshift-ui-components')}
						</Button>
					</div>
				</TriggeredPopover>
			</ButtonGroup>
		</BaseControl>
	);
};
