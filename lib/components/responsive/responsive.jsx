import { useState } from 'react';
import { Tooltip } from '../tooltip/tooltip';
import { classnames } from '../../utilities/classnames';
import { __ } from '@wordpress/i18n';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { upperFirst } from '../../utilities/text-helpers';
import { icons } from '../../icons/icons';
import { Menu, MenuItem, MenuSection } from '../menu/menu';
import { TriggeredPopover } from '../popover/popover';
import { ResponsivePreview } from '../responsive-preview/responsive-preview';
import { Button, ButtonGroup } from '../button/button';
import { RichLabel } from '../icon-label/icon-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { ToggleButton } from '../toggle-button/toggle-button';
import { BaseControl } from '../base-control/base-control';

/**
 * A component that allows the user to set different values for different breakpoints.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.value - The current value of the component.
 * @param {Function} props.onChange - Function to run when the value changes. `(newValue: Object) => void`.
 * @param {string} props.label - The label of the component.
 * @param {JSX.Element} props.icon - The icon of the component.
 * @param {string} props.subtitle - The subtitle of the component.
 * @param {string} props.help - The help text of the component.
 * @param {Array<string>} props.options - Options of the attribute the component is linked to. `{ value: string, label: string }[]`.
 * @param {Function} props.componentToRender - The component to render for each breakpoint. `(props: { breakpoint: string, currentValue: string, handleChange: Function }) => JSX.Element`.
 * @param {Array<string>} props.breakpoints - Breakpoints to use.
 * @param {Array<string>} [props.desktopFirstBreakpoints] - Breakpoints to use in desktop-first mode. If not provided, the breakpoints will be used in reverse order.
 * @param {Object} props.globalManifest - The global manifest.
 *
 * @returns {JSX.Element} The Responsive component.
 *
 * @example
 * <Responsive
 * 	value={value}
 * 	onChange={onChange}
 * 	icon={icons.myIcon}
 * 	label={__('Label', 'eightshift-components')}
 * 	options={[
 * 		{ value: 'value1', label: 'Value 1' },
 * 		{ value: 'value2', label: 'Value 2' },
 * 		{ value: 'value3', label: 'Value 3' },
 * 	]}
 * 	componentToRender={({ breakpoint, currentValue, handleChange }) => (
 * 		<Select
 * 			label={breakpoint}
 * 			value={currentValue}
 * 			options={options}
 * 			onChange={handleChange}
 * 		/>
 * 	)}
 * 	breakpoints={['mobile', 'tablet', 'desktop', 'large']}
 * 	globalManifest={globalManifest}
 * />
 *
 * @preserve
 */
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
				className='es-uic-grid es-uic-grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2rem)] es-uic-items-center es-uic-gap-x-2'
				key={`default-${value?.['_default']}`}
			>
				{detailsVisible && (
					<Tooltip
						className='es-uic-p-3'
						theme='light'
						text={
							<div
								className={classnames(
									'es-uic-flex es-uic-flex-col es-uic-items-start es-uic-gap-4 es-uic-text-start',
									!firstMobileFirstOverride || !lastDesktopFirstOverride
										? 'es-uic-w-72'
										: 'es-uic-w-40',
								)}
							>
								<div>
									<span className='font-semibold'>{__('Default', 'eightshift-components')}</span>
									<br />

									{!firstMobileFirstOverride && !lastDesktopFirstOverride && (
										<span>
											{__('Always applied, regardless of browser width.', 'eightshift-components')}
										</span>
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

								<div className='es-uic-mx-auto'>
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
						<div className='es-uic-flex es-uic-size-8 es-uic-cursor-help es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-bg-gray-200 es-uic-p-0.5 es-uic-text-gray-950 [&>svg]:es-uic-size-4'>
							{icons.play}
						</div>
					</Tooltip>
				)}
				<div
					className={classnames(
						detailsVisible ? 'es-uic-col-start-2 es-uic-col-end-2' : 'es-uic-col-span-full',
					)}
				>
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
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			actions={
				<ButtonGroup>
					<Menu tooltip={__('Responsive options', 'eightshift-components')}>
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
								<RichLabel
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
						aria-label={props['aria-label'] ?? __('Breakpoint preview', 'eightshift-components')}
						trigger={
							<Button
								disabled={
									!Object.keys(value).some(
										(key) => !key?.startsWith('_') && value?.[key] !== undefined,
									)
								}
								icon={icons.previewResponsive}
								tooltip={__('Breakpoint preview', 'eightshift-components')}
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

					<ToggleButton
						icon={isDesktopFirst ? icons.responsiveOverridesAlt : icons.responsiveOverridesAlt2}
						onChange={() => setDetailsVisible(!detailsVisible)}
						selected={detailsVisible}
						tooltip={
							detailsVisible
								? __('Hide responsive overrides', 'eightshift-components')
								: __('Show responsive overrides', 'eightshift-components')
						}
					/>
				</ButtonGroup>
			}
		>
			{!isDesktopFirst && <DefaultControl />}

			<AnimatedVisibility
				visible={detailsVisible}
				className='es-uic-space-y-2'
			>
				{breakpointsToMap.map((breakpoint) => {
					const realBreakpointName = breakpoint.replace('max-', '');

					return (
						<div
							className='es-uic-grid es-uic-grid-cols-[minmax(0,_auto),_minmax(0,_1fr),_minmax(0,_2rem)] es-uic-items-center es-uic-gap-x-2'
							key={`${breakpoint}-${value?.[breakpoint]}`}
						>
							<Tooltip
								theme='light'
								text={`${upperFirst(realBreakpointName)} - when width is larger than ${globalManifest.globalVariables.breakpoints[realBreakpointName]}px`}
							>
								<div className='es-uic-flex es-uic-size-8 es-uic-shrink-0 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-bg-gray-100 es-uic-p-0.5 es-uic-text-gray-800'>
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
		</BaseControl>
	);
};
