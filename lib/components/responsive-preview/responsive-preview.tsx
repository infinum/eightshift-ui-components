import { __ } from '@wordpress/i18n';
import { previewResponsive } from '../../icons/internal';
import { upperFirst } from '../../utilities';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

type ResponsiveValueItem = string | number | boolean | undefined;

type ResponsiveOption = {
	label: string;
	value: Exclude<ResponsiveValueItem, undefined>;
};

type ResponsiveValue = Record<string, ResponsiveValueItem>;
const desktopFirstKey = '_desktopFirst';
const defaultKey = '_default';

type BreakpointUiOverride = {
	label?: string;
	icon?: string | JSX.Element;
};

type ResponsivePreviewItem = {
	width?: string;
	widthEnd?: string;
	breakpoint: string;
	value: string;
	alignEnd?: boolean;
};

type ResponsivePreviewProps = {
	/** The value object. */
	value?: ResponsiveValue | null;
	/** Whether the desktop-first mode is enabled. */
	isDesktopFirst?: boolean;
	/** Breakpoints to use. */
	breakpoints: string[];
	/** Breakpoints to use in desktop-first mode. If not provided, the breakpoints will be used in reverse order. */
	desktopFirstBreakpoints?: string[];
	/** Options of the attribute the component is linked to. `{ value: string, label: string }[]`. */
	options?: ResponsiveOption[];
	/** Breakpoints to use. `{ [breakpoint: string]: number }`. */
	breakpointData: Record<string, string | number>;
	/** Allows overriding breakpoint names and icons. `{ [breakpoint: string]: { label: string, icon: JSX.Element|string } }`. */
	breakpointUiData?: Record<string, BreakpointUiOverride>;
};

/**
 * A component that displays a preview of the responsive settings.
 *
 * **Note**: Only intended for horizontal groups of buttons that don't wrap.
 *
 * @component
 * @param {ResponsivePreviewProps} props - Component props.
 *
 * @returns {JSX.Element} The ResponsivePreview component.
 *
 * @example
 * <ResponsivePreview
 * 	value={value}
 * 	isDesktopFirst={isDesktopFirst}
 * 	breakpoints={breakpoints}
 * 	options={options}
 * 	breakpointData={breakpointData}
 * />
 */
export const ResponsivePreview = (props: Prettify<ResponsivePreviewProps>) => {
	const {
		value,
		isDesktopFirst: rawIsDesktopFirst,
		breakpoints: rawBreakpoints,
		desktopFirstBreakpoints: rawDesktopFirstBreakpoints,
		options,
		breakpointData,
		breakpointUiData,
	} = props;

	// SAFETY: The reserved desktop-first key is written only as a boolean by responsive controls.
	const isDesktopFirst = rawIsDesktopFirst ?? (value?.[desktopFirstKey] as boolean | undefined) ?? false;
	const breakpoints = rawBreakpoints;
	const desktopFirstBreakpoints = rawDesktopFirstBreakpoints ?? rawBreakpoints.slice(0, -1);

	const firstMobileFirstOverride = breakpoints.find((breakpoint) => value?.[breakpoint]);
	const lastDesktopFirstOverride = [...desktopFirstBreakpoints].reverse().find((breakpoint) => value?.[breakpoint]);

	let previewItems: ResponsivePreviewItem[] = [];

	if (firstMobileFirstOverride && !isDesktopFirst) {
		previewItems = [
			...previewItems,
			{
				breakpoint: __('Default', 'eightshift-ui-components'),
				value: options?.find((opt) => opt.value === value?.[defaultKey])?.label ?? upperFirst(value?.[defaultKey]),
			},
		];

		breakpoints.forEach((breakpoint) => {
			if (value?.[breakpoint] === undefined) {
				return;
			}

			previewItems = [
				...previewItems,
				{
					width: String(breakpointData[breakpoint]),
					breakpoint: breakpointUiData?.[breakpoint]?.label ?? breakpoint,
					value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[breakpoint]),
				},
			];
		});
	}

	if (lastDesktopFirstOverride && isDesktopFirst) {
		desktopFirstBreakpoints.forEach((breakpoint) => {
			if (value?.[breakpoint] === undefined) {
				return;
			}

			const normalizedBreakpoint = breakpoint.replace('max-', '');

			previewItems = [
				...previewItems,
				{
					alignEnd: true,
					widthEnd: String(breakpointData[normalizedBreakpoint]),
					breakpoint: breakpointUiData?.[normalizedBreakpoint]?.label ?? normalizedBreakpoint,
					value: options?.find((opt) => opt.value === value?.[breakpoint])?.label ?? upperFirst(value?.[breakpoint]),
				},
			];
		});

		previewItems = [
			...previewItems,
			{
				breakpoint: __('Default', 'eightshift-ui-components'),
				value: options?.find((opt) => opt.value === value?.[defaultKey])?.label ?? upperFirst(value?.[defaultKey]),
			},
		];
	}

	return (
		<div className='es:flex es:min-w-72 es:flex-col es:items-start es:gap-4 es:p-2 es:text-sm'>
			<div className='es:flex es:w-full es:items-center es:gap-2.5'>
				<RichLabel
					icon={previewResponsive}
					label={__('Breakpoint preview', 'eightshift-ui-components')}
				/>

				<span className='es:ml-auto es:select-none es:rounded es:bg-secondary-100 es:px-1 es:py-0.5 es:text-xs es:text-secondary-500'>
					{isDesktopFirst ? __('Desktop-first', 'eightshift-ui-components') : __('Mobile-first', 'eightshift-ui-components')}
				</span>
			</div>

			{previewItems.length === 0 ? <span className='es:text-sm es:italic es:text-secondary-500'>{__('No overrides applied', 'eightshift-ui-components')}</span> : null}
			<BreakpointPreview
				blocks={previewItems}
				dotsStart
				dotsEnd
			/>
		</div>
	);
};
