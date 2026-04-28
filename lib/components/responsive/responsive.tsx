import { __, sprintf } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { useState, type ReactNode } from 'react';

import { Icon, clearAlt, dropdownCaretAlt, previewResponsive, responsiveOverridesAlt2Fill, responsiveOverridesAlt3Fill, responsiveOverridesAltFill } from '../../icons/internal';
import { upperFirst } from '../../utilities';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { Button, ButtonGroup } from '../button/button';
import { Menu, MenuItem, MenuSectionHeader, MenuSeparator, SubMenuItem } from '../menu/menu';
import { OptionSelect } from '../option-select/option-select';
import { ResponsivePreview } from '../responsive-preview/responsive-preview';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { ToggleButton } from '../toggle-button/toggle-button';

type InnerContentAlign = 'start' | 'center' | 'end' | 'stretch';

type ResponsiveOption = {
	label: string;
	value: string;
	endIcon?: ReactNode;
	icon?: ReactNode;
	[key: string]: unknown;
};

type ResponsiveValue = Record<string, string | boolean | undefined>;

type BreakpointUiOverride = {
	label?: string;
	icon?: string | JSX.Element;
};

type ResponsiveChildProps = {
	breakpoint: string;
	currentValue?: string;
	handleChange: (newValue: string) => void;
	options?: ResponsiveOption[];
	key: string[];
	isInlineCollapsedView?: boolean;
	isInlineExpandedView?: boolean;
};

type ResponsiveProps = {
	value?: ResponsiveValue;
	onChange: (value: ResponsiveValue) => void;
	icon?: ReactNode;
	help?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	options?: ResponsiveOption[];
	breakpoints?: string[];
	desktopFirstBreakpoints?: string[];
	breakpointData?: Record<string, number>;
	breakpointUiData?: Record<string, BreakpointUiOverride>;
	noModeSelect?: boolean;
	inline?: boolean;
	children: (props: ResponsiveChildProps) => ReactNode;
	hidden?: boolean;
	useLegacyDesktopFirst?: boolean;
	className?: string;
	innerContentAlign?: InnerContentAlign;
};

const defaultKey = '_default';
const desktopFirstKey = '_desktopFirst';
const mobileFirstMode = 'mobile-first';
const desktopFirstMode = 'desktop-first';

const getResponsiveStringValue = (value: ResponsiveValue, key: string) => {
	const itemValue = value[key];

	return typeof itemValue === 'string' ? itemValue : undefined;
};

const getResponsiveLabel = (value: ResponsiveValue, key: string, options?: ResponsiveOption[]) => {
	const currentValue = getResponsiveStringValue(value, key);

	if (!currentValue) {
		return undefined;
	}

	return options?.find((option) => option.value === currentValue)?.label ?? upperFirst(currentValue);
};

const hasResponsiveOverrides = (value: ResponsiveValue) => Object.keys(value).some((key) => !key.startsWith('_') && typeof value[key] !== 'undefined');

export const Responsive = (props: ResponsiveProps) => {
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
		inline,
		children,
		hidden,
		innerContentAlign = 'start',
		useLegacyDesktopFirst,
		className,
	} = props;

	const [detailsVisible, setDetailsVisible] = useState(false);

	if (typeof rawBreakpoints === 'undefined' || !Array.isArray(rawBreakpoints)) {
		console.warn(__("Responsive: Missing or invalid 'breakpoints' prop.", 'eightshift-ui-components'));

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

						{(firstMobileFirstOverride && !isDesktopFirst) || (lastDesktopFirstOverride && isDesktopFirst) ? (
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
						) : null}
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
			className={className}
			actions={
				<>
					{inline ? (
						<AnimatedVisibility
							className='es:mr-0.5'
							visible={!detailsVisible}
							key='_default-inline'
							transition='scaleFade'
							noInitial
						>
							{children({
								breakpoint: defaultKey,
								currentValue: getResponsiveStringValue(value, defaultKey),
								handleChange: (newValue) =>
									onChange({
										...value,
										[defaultKey]: newValue,
									}),
								options,
								key: Object.keys(value),
								isInlineCollapsedView: true,
							})}
						</AnimatedVisibility>
					) : null}

					<ButtonGroup>
						<ToggleButton
							icon={responsiveOverridesAlt3Fill}
							onChange={() => setDetailsVisible(!detailsVisible)}
							selected={detailsVisible}
							tooltip={detailsVisible ? __('Hide responsive overrides', 'eightshift-ui-components') : __('Show responsive overrides', 'eightshift-ui-components')}
						/>

						<Menu
							aria-label={__('Responsive options', 'eightshift-ui-components')}
							tooltip={__('Responsive options', 'eightshift-ui-components')}
							popoverProps={{ placement: 'bottom right' }}
							triggerProps={{ className: 'es:w-6 es:stroke-[1.25]' }}
							triggerIcon={dropdownCaretAlt}
						>
							{!noModeSelect ? (
								<>
									<MenuSectionHeader>{__('Mode', 'eightshift-ui-components')}</MenuSectionHeader>
									<OptionSelect
										value={isDesktopFirst ? desktopFirstMode : mobileFirstMode}
										onChange={(newMode) => {
											onChange({
												[defaultKey]: getResponsiveStringValue(value, defaultKey),
												[desktopFirstKey]: newMode === desktopFirstMode,
											});
										}}
										options={[
											{ endIcon: responsiveOverridesAltFill, label: __('Mobile-first', 'eightshift-ui-components'), value: mobileFirstMode },
											{ endIcon: responsiveOverridesAlt2Fill, label: __('Desktop-first', 'eightshift-ui-components'), value: desktopFirstMode },
										]}
										type='standaloneMenuItems'
									/>
									<MenuSeparator />
								</>
							) : null}

							{responsiveOverridesApplied ? (
								<SubMenuItem
									manualWidth
									popoverProps={{ className: 'es:max-w-full!' }}
									trigger={<MenuItem icon={previewResponsive}>{__('Breakpoint preview', 'eightshift-ui-components')}</MenuItem>}
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
							) : null}

							{responsiveOverridesApplied ? <MenuSeparator /> : null}

							<MenuItem
								icon={clearAlt}
								onClick={() => {
									const newValue = { ...value };

									[...breakpoints, ...desktopFirstBreakpoints].forEach((breakpoint) => {
										delete newValue[breakpoint];
									});

									onChange(newValue);
								}}
								danger
							>
								{__('Clear overrides', 'eightshift-ui-components')}
							</MenuItem>
						</Menu>
					</ButtonGroup>
				</>
			}
		>
			{!isDesktopFirst && !inline ? (
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
					{detailsVisible ? <DefaultTooltip /> : null}
					<div className={clsx('es:w-full', detailsVisible ? 'es:col-start-2 es:col-end-2' : 'es:col-span-full')}>
						{children({
							breakpoint: defaultKey,
							currentValue: getResponsiveStringValue(value, defaultKey),
							handleChange: (newValue) =>
								onChange({
									...value,
									[defaultKey]: newValue,
								}),
							options,
							key: Object.keys(value),
						})}
					</div>
				</div>
			) : null}

			{!isDesktopFirst && inline ? (
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
					<div className='es:col-start-2 es:col-end-2 es:w-full'>
						{children({
							breakpoint: defaultKey,
							currentValue: getResponsiveStringValue(value, defaultKey),
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
				</AnimatedVisibility>
			) : null}

			<AnimatedVisibility
				visible={detailsVisible}
				className='es:space-y-0.5'
			>
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
								<div className={clsx('es:transition-colors es:icon:size-6 es:mx-0.5', typeof value[breakpoint] !== 'undefined' ? 'es:text-surface-600' : 'es:text-surface-300')}>
									<Icon
										icon={breakpointUiData?.[realBreakpointName]?.icon}
										fallback={<Icon icon={`screen${upperFirst(realBreakpointName)}`} />}
									/>
								</div>
							</DecorativeTooltip>

							{children({
								breakpoint,
								currentValue: getResponsiveStringValue(value, breakpoint),
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
			</AnimatedVisibility>

			{isDesktopFirst && !inline ? (
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
					{detailsVisible ? <DefaultTooltip /> : null}
					<div className={clsx('es:w-full', detailsVisible ? 'es:col-start-2 es:col-end-2' : 'es:col-span-full')}>
						{children({
							breakpoint: defaultKey,
							currentValue: getResponsiveStringValue(value, defaultKey),
							handleChange: (newValue) =>
								onChange({
									...value,
									[defaultKey]: newValue,
								}),
							options,
							key: Object.keys(value),
						})}
					</div>
				</div>
			) : null}

			{isDesktopFirst && inline ? (
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
							breakpoint: defaultKey,
							currentValue: getResponsiveStringValue(value, defaultKey),
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
				</AnimatedVisibility>
			) : null}
		</BaseControl>
	);
};
