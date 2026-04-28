import { __, sprintf } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { useState, type ReactNode } from 'react';

import { Icon, clearAlt, play, responsiveOverridesAlt } from '../../icons/internal';
import { upperFirst } from '../../utilities';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { Button } from '../button/button';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { ToggleButton } from '../toggle-button/toggle-button';

type InnerContentAlign = 'start' | 'center' | 'end' | 'stretch';
type ResponsiveValueItem = string | boolean | undefined;

type ResponsiveValue = Record<string, ResponsiveValueItem>;

type ResponsiveAttributeMap = Record<string, string>;

type ResponsiveOption = {
	label: string;
	value: Exclude<ResponsiveValueItem, undefined>;
	[key: string]: unknown;
};

type ResponsiveLegacyChildProps = {
	breakpoint: string;
	currentValue: ResponsiveValueItem;
	options?: ResponsiveOption[];
	handleChange: (newValue: ResponsiveValueItem) => void;
	isInlineCollapsedView?: boolean;
	isInlineExpandedView?: boolean;
};

type ResponsiveLegacyProps = {
	value?: ResponsiveValue;
	onChange: (attributeName: string, value: ResponsiveValueItem) => void;
	attribute: ResponsiveAttributeMap;
	icon?: ReactNode;
	help?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	options?: ResponsiveOption[];
	inheritValue?: ResponsiveValueItem;
	allowUndefined?: boolean;
	children: (props: ResponsiveLegacyChildProps) => ReactNode;
	inline?: boolean;
	breakpointData?: Record<string, number>;
	breakpoints?: string[];
	hidden?: boolean;
	innerContentAlign?: InnerContentAlign;
};

const getResolvedValueLabel = (value: ResponsiveValueItem, options?: ResponsiveOption[]) => {
	const optionLabel = options?.find((option) => option.value === value)?.label;

	if (optionLabel) {
		return optionLabel;
	}

	if (typeof value === 'string') {
		return upperFirst(value);
	}

	if (typeof value === 'boolean') {
		return String(value);
	}

	return undefined;
};

export const ResponsiveLegacy = (props: ResponsiveLegacyProps) => {
	const {
		value = {},
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
		breakpointData = {},
		breakpoints: providedBreakpoints,
		hidden,
		innerContentAlign = 'start',
	} = props;

	const inheritValue = allowUndefined ? undefined : rawInheritValue;
	const [detailsVisible, setDetailsVisible] = useState(false);
	const rawBreakpoints =
		providedBreakpoints ??
		Object.entries(breakpointData)
			.sort(([, firstWidth], [, secondWidth]) => firstWidth - secondWidth)
			.map(([breakpoint]) => breakpoint)
			.reverse();

	if (hidden || rawBreakpoints.length < 1) {
		return null;
	}

	const defaultBreakpoint = rawBreakpoints[0]!;
	const breakpoints = rawBreakpoints.slice(1);
	const getBreakpointWidth = (breakpoint: string) => breakpointData[breakpoint] ?? 0;
	const getAttributeName = (breakpoint: string) => attribute[breakpoint] ?? breakpoint;
	const getBreakpointValue = (breakpoint: string) => value[getAttributeName(breakpoint)];
	const getBreakpointLabel = (breakpoint: string) => getResolvedValueLabel(getBreakpointValue(breakpoint), options);
	const globalOverride = breakpoints.find((breakpoint) => getBreakpointValue(breakpoint) !== inheritValue);

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
						{!globalOverride ? __('Always applied, regardless of browser width.', 'eightshift-ui-components') : null}
						{globalOverride ? sprintf(__('Applied when the browser width is %dpx or wider.', 'eightshift-ui-components'), getBreakpointWidth(globalOverride) + 1) : null}
					</span>

					{globalOverride ? (
						<div className='es:mx-auto es:mt-2'>
							<BreakpointPreview
								blocks={[
									{
										breakpoint: globalOverride,
										value: getBreakpointLabel(globalOverride),
										dotsStart: true,
										alignEnd: true,
									},
									{
										breakpoint: __('Default', 'eightshift-ui-components'),
										value: getBreakpointLabel(defaultBreakpoint),
										width: String(getBreakpointWidth(globalOverride) + 1),
										dotsEnd: true,
										active: true,
									},
								]}
							/>
						</div>
					) : null}
				</div>
			}
		>
			<div className='es:flex es:size-7 es:items-center es:justify-center es:rounded es:border es:border-accent-500/10 es:bg-accent-50 es:p-0.5 es:text-accent-800 es:shadow-sm es:shadow-accent-600/25 es:icon:size-5'>
				<Icon
					icon={`screen${upperFirst(defaultBreakpoint)}`}
					fallback={play}
				/>
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
					{inline ? (
						<AnimatedVisibility
							visible={!detailsVisible}
							key={defaultBreakpoint}
							transition='scaleFade'
							noInitial
						>
							{children({
								breakpoint: defaultBreakpoint,
								currentValue: getBreakpointValue(defaultBreakpoint),
								options,
								handleChange: (newValue) => onChange(getAttributeName(defaultBreakpoint), newValue),
								isInlineCollapsedView: true,
							})}
						</AnimatedVisibility>
					) : null}

					<ToggleButton
						icon={responsiveOverridesAlt}
						onChange={() => setDetailsVisible(!detailsVisible)}
						selected={detailsVisible}
						tooltip={detailsVisible ? __('Hide responsive overrides', 'eightshift-ui-components') : __('Show responsive overrides', 'eightshift-ui-components')}
					/>
				</>
			}
		>
			{!inline ? (
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
					{detailsVisible ? <DefaultTooltip /> : null}
					<div className={clsx('es:w-full', detailsVisible ? 'es:col-start-2 es:col-end-2' : 'es:col-span-full')}>
						{children({
							breakpoint: defaultBreakpoint,
							currentValue: getBreakpointValue(defaultBreakpoint),
							options,
							handleChange: (newValue) => onChange(getAttributeName(defaultBreakpoint), newValue),
						})}
					</div>
				</div>
			) : null}

			{inline ? (
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
					<div className='es:col-start-2 es:col-end-2 es:w-full'>
						{children({
							breakpoint: defaultBreakpoint,
							currentValue: getBreakpointValue(defaultBreakpoint),
							options,
							handleChange: (newValue) => onChange(getAttributeName(defaultBreakpoint), newValue),
							isInlineExpandedView: true,
						})}
					</div>
				</AnimatedVisibility>
			) : null}

			<AnimatedVisibility
				visible={detailsVisible}
				className='es:space-y-2'
			>
				{breakpoints.map((breakpoint, index) => {
					const isOverrideSet = getBreakpointValue(breakpoint) !== inheritValue;

					const aboveOverride = [...rawBreakpoints.slice(0, index + 1)].reverse().find((candidateBreakpoint) => getBreakpointValue(candidateBreakpoint) !== inheritValue);

					const belowOverride = rawBreakpoints.slice(index + 2).find((candidateBreakpoint) => getBreakpointValue(candidateBreakpoint) !== inheritValue);

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
											{aboveOverride && (aboveOverride !== rawBreakpoints[0] || !belowOverride) && isOverrideSet
												? sprintf(__('Applied when the browser width is %dpx or less.', 'eightshift-ui-components'), getBreakpointWidth(breakpoint))
												: null}

											{aboveOverride && aboveOverride === rawBreakpoints[0] && belowOverride && isOverrideSet
												? sprintf(
														__('Applied when the browser width is between %dpx and %dpx.', 'eightshift-ui-components'),
														getBreakpointWidth(belowOverride) + 1,
														getBreakpointWidth(breakpoint),
													)
												: null}

											{!aboveOverride || !isOverrideSet ? sprintf(__('Up to %dpx', 'eightshift-ui-components'), getBreakpointWidth(breakpoint)) : null}
										</span>

										{(aboveOverride && !isOverrideSet) || !aboveOverride ? (
											<span className='es:mt-2 es:block es:font-medium es:italic'>{__('Not set', 'eightshift-ui-components')}</span>
										) : null}

										{aboveOverride && isOverrideSet ? (
											<div className='es:mx-auto es:mt-2'>
												<BreakpointPreview
													blocks={[
														belowOverride
															? {
																	breakpoint: belowOverride,
																	value: getBreakpointLabel(belowOverride),
																	widthEnd: String(getBreakpointWidth(belowOverride)),
																	dotsStart: true,
																	alignEnd: true,
																}
															: null,
														{
															breakpoint,
															value: getBreakpointLabel(breakpoint),
															widthEnd: String(getBreakpointWidth(breakpoint)),
															active: true,
															alignEnd: true,
															dotsStart: aboveOverride === breakpoint,
														},
														aboveOverride && aboveOverride !== defaultBreakpoint
															? {
																	breakpoint: aboveOverride,
																	value: getBreakpointLabel(aboveOverride),
																	dotsEnd: true,
																}
															: null,
														aboveOverride === defaultBreakpoint
															? {
																	breakpoint: __('Default', 'eightshift-ui-components'),
																	value: getBreakpointLabel(defaultBreakpoint),
																	dotsEnd: true,
																}
															: null,
													]}
												/>
											</div>
										) : null}
									</div>
								}
							>
								<div
									className={clsx(
										'es:flex es:size-7 es:items-center es:justify-center es:rounded es:border es:p-0.5 es:shadow-sm es:transition-colors es:icon:size-5',
										getBreakpointValue(breakpoint) === inheritValue
											? 'es:border-secondary-200 es:bg-secondary-50 es:text-secondary-700'
											: 'es:border-secondary-100 es:bg-white es:text-secondary-500',
									)}
								>
									<Icon icon={`screen${upperFirst(breakpoint)}`} />
								</div>
							</DecorativeTooltip>

							<div className='es:w-full'>
								{children({
									breakpoint,
									currentValue: getBreakpointValue(breakpoint),
									options,
									handleChange: (newValue) => onChange(getAttributeName(breakpoint), newValue),
								})}
							</div>

							<Button
								onPress={() => onChange(getAttributeName(breakpoint), inheritValue)}
								icon={clearAlt}
								disabled={getBreakpointValue(breakpoint) === inheritValue}
								type='ghost'
							/>
						</div>
					);
				})}
			</AnimatedVisibility>
		</BaseControl>
	);
};
