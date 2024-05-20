import { useState } from 'react';
import { Tooltip } from '../tooltip/tooltip';
import { classnames } from '../../utilities/classnames';
import { __ } from '@wordpress/i18n';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { upperFirst } from '../../utilities/text-helpers';
import { icons } from '../icons/icons';
import { Menu, MenuItem, MenuSection } from '../menu/menu';
import { TriggeredPopover } from '../popover/popover';
import { ResponsivePreview } from '../responsive-preview/responsive-preview';
import { Button } from '../button/button';
import { IconLabel } from '../icon-label/icon-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';

export const Responsive = (props) => {
	const {
		value,
		onChange,

		label,
		icon,
		subtitle,
		help,

		options,

		componentToRender,

		breakpoints,
		desktopFirstBreakpoints = breakpoints.map((bp) => `max-${bp}`),

		globalManifest,
	} = props;

	const [detailsVisible, setDetailsVisible] = useState(false);

	const isDesktopFirst = value?.['_mobileFirst'] === true;

	const firstMobileFirstOverride = breakpoints.find((breakpoint) => value?.[breakpoint]);
	const lastDesktopFirstOverride = desktopFirstBreakpoints
		.toReversed()
		.find((breakpoint) => value?.[breakpoint]);

	const breakpointsToMap = isDesktopFirst ? desktopFirstBreakpoints : breakpoints;

	const DefaultControl = () => {
		return (
			<div
				className='grid grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2rem)] items-center gap-x-2'
				key={`default-${value?.['_default']}`}
			>
				{detailsVisible && (
					<Tooltip
						className='p-2'
						theme='light'
						text={
							<div
								className={classnames(
									'flex flex-col items-start gap-4 text-start',
									!firstMobileFirstOverride || !lastDesktopFirstOverride ? 'w-72' : 'w-40',
								)}
							>
								<div>
									<span className='font-semibold'>{__('Default', 'eightshift-components')}</span>
									<br />

									{!firstMobileFirstOverride && !lastDesktopFirstOverride && (
										<span>Always applied regardless of browser width.</span>
									)}

									{firstMobileFirstOverride && (
										<span>
											Applies when the browser is narrower than{' '}
											{globalManifest.globalVariables.breakpoints[firstMobileFirstOverride]}px.
										</span>
									)}

									{lastDesktopFirstOverride && (
										<span>
											Applies when the browser is wider than{' '}
											{globalManifest.globalVariables.breakpoints[breakpoints.at(-1)]}px.
										</span>
									)}
								</div>

								<div className='mx-auto'>
									{firstMobileFirstOverride && (
										<BreakpointPreview
											blocks={[
												{
													breakpoint: __('Default', 'eightshift-components'),
													widthEnd:
														globalManifest.globalVariables.breakpoints[firstMobileFirstOverride],
													value:
														options?.find((opt) => opt.value === value?.['_default'])?.label ??
														upperFirst(value?.['_default']),
													dotsStart: true,
													alignEnd: true,
													active: true,
												},
												{
													breakpoint: firstMobileFirstOverride,
													value:
														options?.find((opt) => opt.value === value?.[firstMobileFirstOverride])
															?.label ?? upperFirst(value?.[firstMobileFirstOverride]),
													dotsEnd: true,
												},
											]}
										/>
									)}

									{lastDesktopFirstOverride && (
										<BreakpointPreview
											blocks={[
												{
													breakpoint: lastDesktopFirstOverride.replace('max-', ''),
													value:
														options?.find((opt) => opt.value === value?.[lastDesktopFirstOverride])
															?.label ?? upperFirst(value?.[lastDesktopFirstOverride]),
													dotsStart: true,
													alignEnd: true,
												},
												{
													breakpoint: __('Default', 'eightshift-components'),
													value:
														options?.find((opt) => opt.value === value?.['_default'])?.label ??
														upperFirst(value?.['_default']),
													width: globalManifest.globalVariables.breakpoints[breakpoints.at(-1)],
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
						<div className='flex size-8 cursor-help items-center justify-center rounded bg-gray-200 p-0.5 text-gray-950 [&>svg]:size-4'>
							{icons.play}
						</div>
					</Tooltip>
				)}
				<div className={classnames(detailsVisible ? 'col-start-2 col-end-2' : 'col-span-full')}>
					{componentToRender({
						breakpoint: '_default',
						currentValue: value?.['_default'],
						handleChange: (newValue) =>
							onChange({
								...value,
								_default: newValue,
							}),
					})}
				</div>
			</div>
		);
	};

	return (
		<>
			<div className='space-y-2'>
				<div className='flex items-center gap-1'>
					<IconLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
					/>

					<div className='ml-auto flex'>
						<Menu triggerProps={{ inGroup: true }}>
							<MenuSection label={__('Breakpoint type', 'eightshift-components')}>
								<MenuItem
									selected={!isDesktopFirst}
									onClick={() => {
										const thingsToDelete = [...breakpoints, ...desktopFirstBreakpoints].reduce(
											(prev, curr) => ({ ...prev, [curr]: null }),
											{},
										);

										onChange({
											...value,
											...thingsToDelete,
											_mobileFirst: false,
										});
									}}
								>
									<IconLabel
										label={__('Mobile-first', 'eightshift-components')}
										subtitle={__('Recommended', 'eightshift-components')}
									/>
								</MenuItem>
								<MenuItem
									selected={isDesktopFirst}
									onClick={() => {
										const thingsToDelete = [...breakpoints, ...desktopFirstBreakpoints].reduce(
											(prev, curr) => ({ ...prev, [curr]: null }),
											{},
										);

										onChange({
											...value,
											...thingsToDelete,
											_mobileFirst: true,
										});
									}}
								>
									{__('Desktop-first', 'eightshift-components')}
								</MenuItem>
							</MenuSection>
							<MenuSection>
								<MenuItem
									icon={icons.clearAlt}
									onClick={() => {
										const thingsToDelete = [...breakpoints, ...desktopFirstBreakpoints].reduce(
											(prev, curr) => ({ ...prev, [curr]: null }),
											{},
										);

										onChange({
											...value,
											...thingsToDelete,
										});
									}}
								>
									{__('Clear responsive overrides', 'eightshift-components')}
								</MenuItem>
							</MenuSection>
						</Menu>

						<TriggeredPopover
							aria-label={props['aria-label'] ?? __('Responsive preview', 'eightshift-components')}
							trigger={
								<Button
									disabled={
										!Object.keys(value).some(
											(key) => !key?.startsWith('_') && value?.[key] !== undefined,
										)
									}
									icon={icons.previewResponsive}
									tooltip={__('Responsive preview', 'eightshift-components')}
									className='rounded-none hover:z-10 focus-visible:z-10 -mx-[0.5px]'
								/>
							}
						>
							<ResponsivePreview
								value={value}
								isDesktopFirst={isDesktopFirst}
								breakpoints={breakpoints}
								desktopFirstBreakpoints={desktopFirstBreakpoints}
								options={options}
								globalManifest={globalManifest}
							/>
						</TriggeredPopover>

						{/* <PopoverWithTrigger
						trigger={({ ref, setIsOpen, isOpen }) => {
							return (
								<Button
									ref={ref}
									onClick={() => setIsOpen(!isOpen)}
									icon={icons.visible}
									className='!h-8 rounded-none border border-solid border-gray-200 border-r-transparent !py-1 px-2 text-gray-700 shadow-sm transition hover:bg-gray-200 hover:text-gray-800 hover:shadow focus:z-10 focus:!shadow focus-visible:border-indigo-400 focus-visible:!ring focus-visible:!ring-indigo-500 focus-visible:!ring-opacity-35 disabled:pointer-events-none disabled:!border-l-gray-200 disabled:text-gray-200 disabled:!opacity-100 [&>svg]:size-5'
									label={__('Responsive preview', 'eightshift-components')}
									disabled={!firstMobileFirstOverride && !lastDesktopFirstOverride}
								/>
							);
						}}
						position='top right'
						contentClass='min-w-72'
						allowCloseFromChildren
					>
						<TwResponsivePreview
							value={value}
							isDesktopFirst={isDesktopFirst}
							breakpoints={breakpoints}
							desktopFirstBreakpoints={desktopFirstBreakpoints}
							options={options}
						/>
					</PopoverWithTrigger> */}

						<Button
							icon={isDesktopFirst ? icons.responsiveOverridesAlt : icons.responsiveOverridesAlt2}
							onClick={() => setDetailsVisible(!detailsVisible)}
							type={detailsVisible ? 'selected' : 'default'}
							inGroup
						/>
					</div>
				</div>

				{!isDesktopFirst && <DefaultControl />}

				<AnimatedVisibility
					visible={detailsVisible}
					className='space-y-1'
				>
					{breakpointsToMap.map((breakpoint) => {
						const realBreakpointName = breakpoint.replace('max-', '');

						return (
							<div
								className='grid grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2rem)] items-center gap-x-2'
								key={`${breakpoint}-${value?.[breakpoint]}`}
							>
								<Tooltip
									theme='light'
									text={`${upperFirst(realBreakpointName)} - when width is larger than ${globalManifest.globalVariables.breakpoints[realBreakpointName]}px`}
								>
									<div className='flex size-8 shrink-0 items-center justify-center rounded bg-gray-100 p-0.5 text-gray-800'>
										{icons?.[`screen${upperFirst(realBreakpointName)}`]}
									</div>
								</Tooltip>

								{componentToRender({
									breakpoint: breakpoint,
									currentValue: value?.[breakpoint],
									handleChange: (newValue) => {
										onChange({
											...value,
											[breakpoint]: newValue,
										});
									},
								})}

								<Button
									onClick={() => {
										onChange({
											...value,
											[breakpoint]: undefined,
										});
									}}
									icon={icons.clearAlt}
									disabled={!value?.[breakpoint]}
									type='ghost'
								/>
							</div>
						);
					})}
				</AnimatedVisibility>

				{isDesktopFirst && <DefaultControl />}
				{help && <div className='text-xs text-gray-400'>{help}</div>}
			</div>
		</>
	);
};
