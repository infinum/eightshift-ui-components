import { __ } from '@wordpress/i18n';
import { upperFirst } from '../../utilities';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { icons } from '../../icons/icons';
import { RichLabel } from '../rich-label/rich-label';

/**
 * A component that displays a preview of the responsive settings.
 *
 * **Note**: Only intended for horizontal groups of buttons that don't wrap.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.value - The value object.
 * @param {boolean} props.isDesktopFirst - Whether the desktop-first mode is enabled.
 * @param {string[]} props.breakpoints - Breakpoints to use.
 * @param {string[]} [props.desktopFirstBreakpoints] - Breakpoints to use in desktop-first mode. If not provided, the breakpoints will be used in reverse order.
 * @param {{label: string, value: string}[]} props.options - Options of the attribute the component is linked to. `{ value: string, label: string }[]`.
 * @param {Object} props.breakpointData - Breakpoints to use. `{ [breakpoint: string]: number }`.
 * @param {Object<string, number>} [props.breakpointUiData] - Allows overriding breakpoint names and icons. `{ [breakpoint: string]: { label: string, icon: JSX.Element|string } }`.
 *
 * @returns {JSX.Element} The ResponsivePreview component.
 *
 * @example
 * <ResponsivePreview
 * 	value={value}
 * 	isDesktopFirst={isDesktopFirst}
 * 	breakpoints={breakpoints}
 * 	options={options}
 * 	breakpointData={breakpointData} // e.g. from global manifest
 * />
 *
 * @preserve
 */
export const ResponsivePreview = (props) => {
	const {
		value,
		isDesktopFirst: rawIsDesktopFirst,

		breakpoints: rawBreakpoints,
		desktopFirstBreakpoints: rawDesktopFirstBreakpoints,

		options,

		breakpointData,
		breakpointUiData,
	} = props;

	const isDesktopFirst = rawIsDesktopFirst ?? value?.['_desktopFirst'] ?? false;

	const breakpoints = rawBreakpoints;
	const desktopFirstBreakpoints = rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(0, -1);

	const firstMobileFirstOverride = breakpoints.find((breakpoint) => value?.[breakpoint]);
	const lastDesktopFirstOverride = desktopFirstBreakpoints.toReversed().find((breakpoint) => value?.[breakpoint]);

	let previewItems = [];

	if (firstMobileFirstOverride && !isDesktopFirst) {
		previewItems = [
			...previewItems,
			{
				breakpoint: __('Default', 'eightshift-ui-components'),
				value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
			},
		];

		breakpoints.forEach((breakpoint) => {
			if (typeof value?.[breakpoint] === 'undefined') {
				return;
			}

			previewItems = [
				...previewItems,
				{
					width: breakpointData[breakpoint],
					breakpoint: breakpointUiData?.[breakpoint]?.label ?? breakpoint,
					value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[breakpoint]),
				},
			];
		});
	}

	if (lastDesktopFirstOverride && isDesktopFirst) {
		desktopFirstBreakpoints.forEach((breakpoint) => {
			if (typeof value?.[breakpoint] === 'undefined') {
				return;
			}

			previewItems = [
				...previewItems,
				{
					alignEnd: true,
					widthEnd: breakpointData[breakpoint.replace('max-', '')],
					breakpoint: breakpointUiData?.[breakpoint.replace('max-', '')]?.label ?? breakpoint.replace('max-', ''),
					value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[breakpoint]),
				},
			];
		});

		previewItems = [
			...previewItems,
			{
				breakpoint: __('Default', 'eightshift-ui-components'),
				value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
			},
		];
	}

	return (
		<div className='es:flex es:min-w-72 es:flex-col es:items-start es:gap-4 es:p-2 es:text-sm'>
			<div className='es:flex es:w-full es:items-center es:gap-2.5'>
				<RichLabel
					icon={icons.previewResponsive}
					label={__('Responsive preview', 'eightshift-ui-components')}
				/>

				<span className='es:ml-auto es:select-none es:rounded es:bg-secondary-100 es:px-1 es:py-0.5 es:text-xs es:text-secondary-500'>
					{isDesktopFirst ? __('Desktop-first', 'eightshift-ui-components') : __('Mobile-first', 'eightshift-ui-components')}
				</span>
			</div>

			{previewItems.length === 0 && <span className='es:text-sm es:italic es:text-secondary-500'>{__('No overrides applied', 'eightshift-ui-components')}</span>}
			<BreakpointPreview
				blocks={previewItems}
				dotsStart
				dotsEnd
			/>
		</div>
	);
};
