import { __ } from '@wordpress/i18n';
import { upperFirst } from '../../utilities/text-helpers';
import { BreakpointPreview } from '../breakpoint-preview/breakpoint-preview';
import { icons } from '../icons/icons';
import { IconLabel } from '../icon-label/icon-label';

export const ResponsivePreview = (props) => {
	const {
		value,
		isDesktopFirst,

		breakpoints,
		desktopFirstBreakpoints,

		options,

		globalManifest,
	} = props;

	const firstMobileFirstOverride = breakpoints.find((breakpoint) => value?.[breakpoint]);
	const lastDesktopFirstOverride = desktopFirstBreakpoints
		.toReversed()
		.find((breakpoint) => value?.[breakpoint]);

	let previewItems = [];

	if (firstMobileFirstOverride) {
		previewItems = [
			...previewItems,
			{
				breakpoint: __('Default', 'eightshift-components'),
				value:
					options?.find((opt) => opt.value === value?.['_default'])?.label ??
					upperFirst(value?.['_default']),
			},
		];

		breakpoints.forEach((breakpoint) => {
			if (!value?.[breakpoint]) {
				return;
			}

			previewItems = [
				...previewItems,
				{
					width: globalManifest.globalVariables.breakpoints[breakpoint],
					breakpoint: breakpoint,
					value:
						options?.find((opt) => opt.value === value?.[firstMobileFirstOverride])?.label ??
						upperFirst(value?.[firstMobileFirstOverride]),
				},
			];
		});
	}

	if (lastDesktopFirstOverride) {
		desktopFirstBreakpoints.forEach((breakpoint, i) => {
			if (!value?.[breakpoint]) {
				return;
			}

			previewItems = [
				...previewItems,
				{
					width: globalManifest.globalVariables.breakpoints[breakpoints[i - 1]],
					breakpoint: breakpoint.replace('max-', ''),
					value:
						options?.find((opt) => opt.value === value?.[breakpoint])?.label ??
						upperFirst(value?.[breakpoint]),
				},
			];
		});

		previewItems = [
			...previewItems,
			{
				width: globalManifest.globalVariables.breakpoints[breakpoints.at(-1)],
				breakpoint: __('Default', 'eightshift-components'),
				value:
					options?.find((opt) => opt.value === value?.['_default'])?.label ??
					upperFirst(value?.['_default']),
			},
		];

		previewItems.at(0).width = null;
	}

	return (
		<div className='flex min-w-72 flex-col items-start gap-4 p-2'>
			<div className='flex w-full items-center gap-2.5'>
				<IconLabel
					icon={icons.previewResponsive}
					label={__('Responsive preview', 'eightshift-components')}
				/>

				<span className='ml-auto select-none rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-500'>
					{isDesktopFirst
						? __('Desktop-first', 'eightshift-components')
						: __('Mobile-first', 'eightshift-components')}
				</span>
			</div>

			{previewItems.length === 0 && (
				<span className='text-gray-500 text-sm italic'>{__('No overrides applied', 'eightshift-components')}</span>
			)}
			<BreakpointPreview
				blocks={previewItems}
				dotsStart
				dotsEnd
			/>
		</div>
	);
};
