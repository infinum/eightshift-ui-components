import { __, sprintf } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { Text } from 'react-aria-components';

import { Icon, clearAlt, dropdownCaretAlt, responsiveOverridesAlt2Fill, responsiveOverridesAltFill } from '../../icons/internal';
import { upperFirst } from '../../utilities';
import { BaseControl } from '../base-control/base-control';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { Button, ButtonGroup } from '../button/button';
import { Container, ContainerGroup } from '../base-control/container';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { HStack } from '../layout/hstack';
import { OptionSelect } from '../option-select/option-select';
import { TriggeredPopover } from '../popover/popover';
import type { Prettify } from '../../utilities/types';
import { ResponsivePreview } from '../responsive-preview/responsive-preview';

type ResponsiveValueItem = string | number | boolean | undefined;

type InnerContentAlign = 'start' | 'center' | 'end' | 'stretch';

type ResponsiveOption = {
	label: string;
	value: Exclude<ResponsiveValueItem, undefined>;
	[key: string]: unknown;
};

type ResponsiveValue = Record<string, ResponsiveValueItem>;

type BreakpointUiOverride = {
	label?: string;
	icon?: string | JSX.Element;
};

type MiniResponsiveChildProps = {
	breakpoint: string;
	currentValue?: ResponsiveValueItem;
	handleChange: (newValue: ResponsiveValueItem) => void;
	options?: ResponsiveOption[];
	key: string[];
	isInlineCollapsedView?: boolean;
	isInlineExpandedView?: boolean;
};

type MiniResponsiveProps = {
	/** The current value of the component. Defaults to `{}`. */
	value?: ResponsiveValue;
	/** Function to run when the value changes. `(newValue: Object) => void`. */
	onChange: (value: ResponsiveValue) => void;
	/** The icon of the component. */
	icon?: ReactNode;
	/** The help text of the component. */
	help?: ReactNode;
	/** The label of the component. */
	label?: ReactNode;
	/** The subtitle of the component. */
	subtitle?: ReactNode;
	/** Options of the attribute the component is linked to. `{ value: string, label: string }[]`. */
	options?: ResponsiveOption[];
	/** Breakpoints to use. */
	breakpoints?: string[];
	/** Breakpoints to use in desktop-first mode. If not provided, the breakpoints will be used in reverse order. */
	desktopFirstBreakpoints?: string[];
	/** Currently used breakpoint data. `{ [breakpoint: string]: number }`. Defaults to `{}`. */
	breakpointData?: Record<string, number>;
	/** Allows overriding breakpoint names and icons. `{ [breakpoint: string]: { label: string, icon: JSX.Element|string } }`. */
	breakpointUiData?: Record<string, BreakpointUiOverride>;
	/** If `true`, the mode selection (desktop-first/mobile-first) is hidden. */
	noModeSelect?: boolean;
	children: (props: MiniResponsiveChildProps) => ReactNode;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** If `true`, the legacy desktop-first mode is used. This is only for backwards compatibility. */
	useLegacyDesktopFirst?: boolean;
	/** Determines inner content alignment. Defaults to `start`. */
	innerContentAlign?: InnerContentAlign;
};

const defaultKey = '_default';
const desktopFirstKey = '_desktopFirst';
const mobileFirstMode = 'mobile-first';
const desktopFirstMode = 'desktop-first';

const getResponsiveValue = (value: ResponsiveValue, key: string) => value[key];

const getResponsiveLabel = (value: ResponsiveValue, key: string, options?: ResponsiveOption[]) => {
	const currentValue = getResponsiveValue(value, key);

	if (!currentValue) {
		return undefined;
	}

	return options?.find((option) => option.value === currentValue)?.label ?? upperFirst(currentValue);
};

const hasResponsiveOverrides = (value: ResponsiveValue) => Object.keys(value).some((key) => !key.startsWith('_') && typeof value[key] !== 'undefined');

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
 * @param {MiniResponsiveProps} props - Component props.
 *
 * @returns {JSX.Element} The MiniResponsive component.
 *
 * @example
 * <MiniResponsive
 * 	value={value}
 * 	onChange={onChange}
 * 	icon={myIcon}
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
 */
export const MiniResponsive = (props: Prettify<MiniResponsiveProps>) => {
	const {
		value = {},
		onChange,
		icon,
		help,
		label,
		subtitle,
		options,
		breakpoints: rawBreakpoints,
		desktopFirstBreakpoints: rawDesktopFirstBreakpoints,
		breakpointData = {},
		breakpointUiData,
		noModeSelect,
		children,
		hidden,
		useLegacyDesktopFirst,
		innerContentAlign = 'start',
	} = props;

	if (typeof rawBreakpoints === 'undefined' || !Array.isArray(rawBreakpoints)) {
		console.warn(__("MiniResponsive: Missing or invalid 'breakpoints' prop.", 'eightshift-ui-components'));

		return null;
	}

	const breakpoints = rawBreakpoints.slice(1);
	let desktopFirstBreakpoints = (rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(1)).map((breakpoint) => (breakpoint.startsWith('max-') ? breakpoint : `max-${breakpoint}`));

	if (useLegacyDesktopFirst) {
		desktopFirstBreakpoints = (rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(0, -1)).map((breakpoint) => (breakpoint.startsWith('max-') ? breakpoint : `max-${breakpoint}`));
	}

	const isDesktopFirst = value[desktopFirstKey] === true;
	const firstMobileFirstOverride = breakpoints.find((breakpoint) => typeof value[breakpoint] !== 'undefined');
	const lastDesktopFirstOverride = [...desktopFirstBreakpoints].reverse().find((breakpoint) => typeof value[breakpoint] !== 'undefined');
	const breakpointsToMap = isDesktopFirst ? desktopFirstBreakpoints : breakpoints;
	const responsiveOverridesApplied = hasResponsiveOverrides(value);
	const getBreakpointWidth = (breakpoint: string) => breakpointData[breakpoint] ?? 0;

	if (hidden) {
		return null;
	}

	const DefaultTooltip = () => {
		const defaultBreakpoint = isDesktopFirst ? rawBreakpoints[rawBreakpoints.length - 1] : rawBreakpoints[0];
		const overrideIcon = defaultBreakpoint ? breakpointUiData?.[defaultBreakpoint]?.icon : undefined;
		const fallbackBreakpoint = defaultBreakpoint ?? 'desktop';

		return (
			<DecorativeTooltip
				placement='left'
				className='es:p-4! es:rounded-2xl! es:max-w-96!'
				theme='light'
				offset={7.5}
				arrow
				text={
					<>
						<span className='es:block es:font-variation-["wdth"_95,"wght"_475,"ROND"_100] es:text-14 es:leading-none es:text-surface-600'>
							{__('Default', 'eightshift-ui-components')}
						</span>

						<span className='es:block es:text-balance es:tabular-nums es:font-variation-["wdth"_64,"wght"_275,"ROND"_50,"slnt"_-2] es:text-surface-500 es:mt-1'>
							{!firstMobileFirstOverride && !lastDesktopFirstOverride ? __('Always applied, regardless of browser width.', 'eightshift-ui-components') : null}

							{firstMobileFirstOverride && !isDesktopFirst
								? sprintf(__('Applies when the browser width is %dpx or less.', 'eightshift-ui-components'), getBreakpointWidth(firstMobileFirstOverride) - 1)
								: null}

							{lastDesktopFirstOverride && isDesktopFirst
								? sprintf(__('Applies when the browser width is %dpx or more.', 'eightshift-ui-components'), getBreakpointWidth(lastDesktopFirstOverride.replace('max-', '')))
								: null}
						</span>

						<div className='es:mx-auto es:mt-5'>
							{firstMobileFirstOverride && !isDesktopFirst ? (
								<BreakpointPreview
									blocks={[
										{
											breakpoint: __('Default', 'eightshift-ui-components'),
											widthEnd: String(getBreakpointWidth(firstMobileFirstOverride) - 1),
											value: getResponsiveLabel(value, defaultKey, options),
											dotsStart: true,
											alignEnd: true,
											active: true,
										},
										{
											breakpoint: breakpointUiData?.[firstMobileFirstOverride]?.label ?? firstMobileFirstOverride,
											value: getResponsiveLabel(value, firstMobileFirstOverride, options),
											dotsEnd: true,
										},
									]}
								/>
							) : null}

							{lastDesktopFirstOverride && isDesktopFirst ? (
								<BreakpointPreview
									blocks={[
										{
											breakpoint: breakpointUiData?.[lastDesktopFirstOverride.replace('max-', '')]?.label ?? lastDesktopFirstOverride.replace('max-', ''),
											value: getResponsiveLabel(value, lastDesktopFirstOverride, options),
											dotsStart: true,
											alignEnd: true,
										},
										{
											breakpoint: __('Default', 'eightshift-ui-components'),
											value: getResponsiveLabel(value, defaultKey, options),
											width: String(getBreakpointWidth(lastDesktopFirstOverride.replace('max-', ''))),
											dotsEnd: true,
											active: true,
										},
									]}
								/>
							) : null}
						</div>
					</>
				}
			>
				<div className='es:icon:size-6 es:mx-0.5 es:text-accent-700'>
					<Icon
						icon={overrideIcon}
						fallback={<Icon icon={`screen${upperFirst(fallbackBreakpoint)}`} />}
					/>
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
					breakpoint: defaultKey,
					currentValue: getResponsiveValue(value, defaultKey),
					handleChange: (newValue) =>
						onChange({
							...value,
							[defaultKey]: newValue,
						}),
					options,
					key: Object.keys(value),
					isInlineCollapsedView: true,
				})}

				<TriggeredPopover
					triggerButtonIcon={cloneElement(dropdownCaretAlt as ReactElement, { className: 'es:size-5!' })}
					triggerButtonProps={{
						tooltip: __('Responsive overrides', 'eightshift-ui-components'),
						className: 'es:w-6',
					}}
					className='es:min-w-80 es:p-0!'
					wrapperClassName='es:rounded-3xl'
				>
					<Text className='es:px-4 es:pt-3 es:pb-0.5 es:text-center es:block es:text-base es:text-surface-600 es:font-variation-["wdth"_105,"wght"_425,"ROND"_100]'>
						{__('Responsive overrides', 'eightshift-ui-components')}
					</Text>

					<div className='es:px-2 es:mt-1 es:space-y-0.5'>
						{!isDesktopFirst ? (
							<div
								className={clsx(
									'es:grid es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2',
									'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-accent-600/25',
									innerContentAlign === 'start' && 'es:justify-items-start',
									innerContentAlign === 'center' && 'es:justify-items-center',
									innerContentAlign === 'end' && 'es:justify-items-end',
									innerContentAlign === 'stretch' && 'es:justify-items-stretch',
								)}
								key='_default-mobile-first'
							>
								<DefaultTooltip />

								<div className='es:w-full es:col-start-2 es:col-end-2'>
									{children({
										breakpoint: defaultKey,
										currentValue: getResponsiveValue(value, defaultKey),
										handleChange: (newValue) =>
											onChange({
												...value,
												[defaultKey]: newValue,
											}),
										options,
										key: Object.keys(value),
										isInlineExpandedView: true,
									})}
								</div>
							</div>
						) : null}

						{breakpointsToMap.map((breakpoint, index) => {
							const realBreakpointName = breakpoint.replace('max-', '');
							const filterBreakpoints = isDesktopFirst ? [...breakpointsToMap, defaultKey] : [defaultKey, ...breakpointsToMap];

							const aboveOverride = isDesktopFirst
								? filterBreakpoints.slice(index + 1).find((currentBreakpoint) => typeof value[currentBreakpoint] !== 'undefined')
								: [...filterBreakpoints.slice(0, index + 1)].reverse().find((currentBreakpoint) => typeof value[currentBreakpoint] !== 'undefined');

							const belowOverride = isDesktopFirst
								? [...filterBreakpoints.slice(0, index)].reverse().find((currentBreakpoint) => typeof value[currentBreakpoint] !== 'undefined')
								: filterBreakpoints.slice(index + 2).find((currentBreakpoint) => typeof value[currentBreakpoint] !== 'undefined');

							return (
								<div
									className={clsx(
										'es:grid es:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-1.5',
										'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-surface-200/60',
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
										className='es:p-4! es:rounded-2xl! es:max-w-96!'
										offset={7.5}
										arrow
										text={
											<>
												<span className='es:block es:font-variation-["wdth"_95,"wght"_475,"ROND"_100] es:text-14 es:leading-none es:text-surface-600'>
													{breakpointUiData?.[realBreakpointName]?.label ?? upperFirst(realBreakpointName)}
												</span>

												<span className='es:block es:text-balance es:tabular-nums es:font-variation-["wdth"_64,"wght"_275,"ROND"_50,"slnt"_-2] es:text-surface-500 es:mt-1'>
													{!isDesktopFirst ? (
														<>
															{!belowOverride && typeof value[breakpoint] !== 'undefined'
																? sprintf(__('Applied when the browser width is %dpx or more.', 'eightshift-ui-components'), getBreakpointWidth(realBreakpointName))
																: null}

															{belowOverride && typeof value[breakpoint] !== 'undefined'
																? sprintf(
																		__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
																		getBreakpointWidth(realBreakpointName),
																		getBreakpointWidth(belowOverride) - 1,
																	)
																: null}

															{typeof value[breakpoint] === 'undefined' ? sprintf(__('From %dpx', 'eightshift-ui-components'), getBreakpointWidth(realBreakpointName)) : null}
														</>
													) : (
														<>
															{!belowOverride && typeof value[breakpoint] !== 'undefined'
																? sprintf(__('Applied when the browser width is %dpx or less.', 'eightshift-ui-components'), getBreakpointWidth(realBreakpointName) - 1)
																: null}

															{belowOverride && typeof value[breakpoint] !== 'undefined'
																? sprintf(
																		__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
																		getBreakpointWidth(belowOverride.replace('max-', '')),
																		getBreakpointWidth(realBreakpointName) - 1,
																	)
																: null}

															{typeof value[breakpoint] === 'undefined'
																? sprintf(__('Up to %dpx', 'eightshift-ui-components'), getBreakpointWidth(breakpoint.replace('max-', '')))
																: null}
														</>
													)}
												</span>

												{typeof value[breakpoint] === 'undefined' ? (
													<span className='es:mt-2 es:text-sm es:leading-none es:block es:font-variation-["wdth"_75,"wght"_300,"slnt"_-5]'>
														{__('Not set', 'eightshift-ui-components')}
													</span>
												) : null}

												{typeof value[breakpoint] !== 'undefined' ? (
													<div className='es:mx-auto es:mt-5'>
														{!isDesktopFirst ? (
															<BreakpointPreview
																dotsStart={Boolean(belowOverride)}
																blocks={[
																	aboveOverride && aboveOverride !== defaultKey && typeof value[aboveOverride] !== 'undefined'
																		? {
																				breakpoint: breakpointUiData?.[aboveOverride]?.label ?? aboveOverride,
																				value: getResponsiveLabel(value, aboveOverride, options),
																				dotsStart: !belowOverride,
																				alignEnd: !belowOverride,
																			}
																		: null,
																	aboveOverride === defaultKey && typeof value[defaultKey] !== 'undefined'
																		? {
																				breakpoint: __('Default', 'eightshift-ui-components'),
																				value: getResponsiveLabel(value, defaultKey, options),
																				dotsStart: !belowOverride,
																				alignEnd: !belowOverride,
																			}
																		: null,
																	{
																		breakpoint: breakpointUiData?.[realBreakpointName]?.label ?? realBreakpointName,
																		value: getResponsiveLabel(value, breakpoint, options),
																		width: String(getBreakpointWidth(realBreakpointName)),
																		active: true,
																		dotsEnd: !belowOverride,
																	},
																	belowOverride && typeof value[belowOverride] !== 'undefined'
																		? {
																				breakpoint: breakpointUiData?.[belowOverride]?.label ?? belowOverride,
																				value: getResponsiveLabel(value, belowOverride, options),
																				width: String(getBreakpointWidth(belowOverride)),
																				dotsEnd: true,
																			}
																		: null,
																]}
															/>
														) : (
															<BreakpointPreview
																dotsStart
																dotsEnd={aboveOverride !== defaultKey}
																blocks={[
																	belowOverride
																		? {
																				breakpoint: breakpointUiData?.[belowOverride.replace('max-', '')]?.label ?? belowOverride.replace('max-', ''),
																				value: getResponsiveLabel(value, belowOverride, options),
																			}
																		: null,
																	{
																		breakpoint: breakpointUiData?.[realBreakpointName]?.label ?? realBreakpointName,
																		value: getResponsiveLabel(value, breakpoint, options),
																		width: String(getBreakpointWidth((filterBreakpoints[index - 1] ?? '').replace('max-', ''))),
																		active: true,
																	},
																	aboveOverride && aboveOverride !== defaultKey
																		? {
																				breakpoint: breakpointUiData?.[aboveOverride.replace('max-', '')]?.label ?? aboveOverride.replace('max-', ''),
																				value: getResponsiveLabel(value, aboveOverride, options),
																				width: String(getBreakpointWidth(breakpoint.replace('max-', ''))),
																			}
																		: null,
																	aboveOverride === defaultKey
																		? {
																				breakpoint: __('Default', 'eightshift-ui-components'),
																				value: getResponsiveLabel(value, defaultKey, options),
																				width: String(getBreakpointWidth(breakpoint.replace('max-', ''))),
																				dotsEnd: true,
																			}
																		: null,
																]}
															/>
														)}
													</div>
												) : null}
											</>
										}
									>
										<div
											className={clsx('es:transition-colors es:icon:size-6 es:mx-0.5', typeof value[breakpoint] !== 'undefined' ? 'es:text-surface-600' : 'es:text-surface-300')}
										>
											<Icon
												icon={breakpointUiData?.[realBreakpointName]?.icon}
												fallback={<Icon icon={`screen${upperFirst(realBreakpointName)}`} />}
											/>
										</div>
									</DecorativeTooltip>

									{children({
										breakpoint,
										currentValue: getResponsiveValue(value, breakpoint),
										handleChange: (newValue) => {
											onChange({
												...value,
												[breakpoint]: newValue,
											});
										},
										options,
										key: Object.keys(value),
									})}

									<Button
										onPress={() => {
											const newValue = { ...value };
											delete newValue[breakpoint];
											onChange(newValue);
										}}
										icon={clearAlt}
										disabled={typeof value[breakpoint] === 'undefined'}
										type='ghost'
									/>
								</div>
							);
						})}

						{isDesktopFirst ? (
							<div
								className={clsx(
									'es:grid es:grid-cols-[minmax(0,1.75rem)_minmax(0,1fr)_minmax(0,2.25rem)] es:items-center es:gap-x-2',
									'es:bg-white/50 es:p-1.5 es:rounded-sm es:first:rounded-t-2xl es:last:rounded-b-2xl es:inset-ring es:inset-ring-accent-600/25',
									innerContentAlign === 'start' && 'es:justify-items-start',
									innerContentAlign === 'center' && 'es:justify-items-center',
									innerContentAlign === 'end' && 'es:justify-items-end',
									innerContentAlign === 'stretch' && 'es:justify-items-stretch',
								)}
								key='_default-desktop-first'
							>
								<DefaultTooltip />

								<div className='es:w-full es:col-start-2 es:col-end-2'>
									{children({
										breakpoint: defaultKey,
										currentValue: getResponsiveValue(value, defaultKey),
										handleChange: (newValue) =>
											onChange({
												...value,
												[defaultKey]: newValue,
											}),
										options,
										key: Object.keys(value),
										isInlineExpandedView: true,
									})}
								</div>
							</div>
						) : null}
					</div>

					<ContainerGroup
						wrapClassName='es:m-2 es:mt-4'
						label={__('Breakpoints', 'eightshift-ui-components')}
					>
						<Container lessSpaceEnd>
							<BaseControl
								label={__('Actions', 'eightshift-ui-components')}
								inline
							>
								<HStack>
									<TriggeredPopover
										triggerButtonLabel={__('Preview', 'eightshift-ui-components')}
										triggerButtonProps={{
											disabled: !responsiveOverridesApplied,
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

									<Button
										icon={clearAlt}
										disabled={!responsiveOverridesApplied}
										onPress={() => {
											const newValue = { ...value };

											[...breakpoints, ...desktopFirstBreakpoints].forEach((breakpoint) => {
												delete newValue[breakpoint];
											});

											onChange(newValue);
										}}
									>
										{__('Clear overrides', 'eightshift-ui-components')}
									</Button>
								</HStack>
							</BaseControl>
						</Container>

						<Container lessSpaceEnd>
							<OptionSelect
								hidden={noModeSelect}
								label={__('Mode', 'eightshift-ui-components')}
								value={isDesktopFirst ? desktopFirstMode : mobileFirstMode}
								onChange={(newMode) => {
									onChange({
										[defaultKey]: getResponsiveValue(value, defaultKey),
										[desktopFirstKey]: newMode === desktopFirstMode,
									});
								}}
								options={[
									{ icon: responsiveOverridesAltFill, label: __('Mobile-first', 'eightshift-ui-components'), value: mobileFirstMode },
									{ icon: responsiveOverridesAlt2Fill, label: __('Desktop-first', 'eightshift-ui-components'), value: desktopFirstMode },
								]}
								inline
							/>
						</Container>
					</ContainerGroup>
				</TriggeredPopover>
			</ButtonGroup>
		</BaseControl>
	);
};
