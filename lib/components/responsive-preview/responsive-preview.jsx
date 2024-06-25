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
		isDesktopFirst,

		breakpoints: rawBreakpoints,
		desktopFirstBreakpoints: rawDesktopFirstBreakpoints,

		options,

		breakpointData,
		breakpointUiData,
	} = props;

	const breakpoints = rawBreakpoints;
	const desktopFirstBreakpoints = rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(0, -1);

	const firstMobileFirstOverride = breakpoints.find((breakpoint) => value?.[breakpoint]);
	const lastDesktopFirstOverride = desktopFirstBreakpoints.toReversed().find((breakpoint) => value?.[breakpoint]);

	let previewItems = [];

	if (firstMobileFirstOverride) {
		previewItems = [
			...previewItems,
			{
				breakpoint: __('Default', 'eightshift-ui-components'),
				value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
			},
		];

		breakpoints.forEach((breakpoint) => {
			if (!value?.[breakpoint]) {
				return;
			}

			previewItems = [
				...previewItems,
				{
					width: breakpointData[breakpoint],
					breakpoint: breakpointUiData?.[breakpoint]?.label ?? breakpoint,
					value:
						options?.find((opt) => opt.value === value?.[firstMobileFirstOverride])?.label ??
						upperFirst(value?.[firstMobileFirstOverride]),
				},
			];
		});
	}

	if (lastDesktopFirstOverride) {
		desktopFirstBreakpoints.forEach((breakpoint) => {
			if (!value?.[breakpoint]) {
				return;
			}

			previewItems = [
				...previewItems,
				{
					width: breakpointData[breakpoint],
					breakpoint: breakpointUiData?.[breakpoint.replace('max-', '')]?.label ?? breakpoint.replace('max-', ''),
					value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[breakpoint]),
				},
			];
		});

		previewItems = [
			...previewItems,
			{
				width: breakpointData[breakpoints.at(-1)],
				breakpoint: __('Default', 'eightshift-ui-components'),
				value: options?.find((opt) => opt.value === value?.['_default'])?.label ?? upperFirst(value?.['_default']),
			},
		];

		previewItems.at(0).width = null;
	}

	return (
		<div className='es-uic-flex es-uic-min-w-72 es-uic-flex-col es-uic-items-start es-uic-gap-4 es-uic-p-2'>
			<div className='es-uic-flex es-uic-w-full es-uic-items-center es-uic-gap-2.5'>
				<RichLabel
					icon={icons.previewResponsive}
					label={__('Responsive preview', 'eightshift-ui-components')}
				/>

				<span className='es-uic-ml-auto es-uic-select-none es-uic-rounded es-uic-bg-gray-100 es-uic-px-1 es-uic-py-0.5 es-uic-text-xs es-uic-text-gray-500'>
					{isDesktopFirst
						? __('Desktop-first', 'eightshift-ui-components')
						: __('Mobile-first', 'eightshift-ui-components')}
				</span>
			</div>

			{previewItems.length === 0 && (
				<span className='es-uic-text-sm es-uic-italic es-uic-text-gray-500'>
					{__('No overrides applied', 'eightshift-ui-components')}
				</span>
			)}
			<BreakpointPreview
				blocks={previewItems}
				dotsStart
				dotsEnd
			/>
		</div>
	);
};
