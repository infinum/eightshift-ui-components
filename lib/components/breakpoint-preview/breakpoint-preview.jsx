import { Fragment } from 'react';
import { clsx } from 'clsx/lite';

import { upperFirst } from '../../utilities';

/**
 * Component that renders a preview of the breakpoints to help users visualize the options they set.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object[]} [props.blocks] - Blocks to display.
 * @param {string} [props.blocks[].width] - Current breakpoint width. Left-aligned with the block.
 * @param {string} [props.blocks[].widthEnd] - Current breakpoint width. Right-aligned with the block.
 * @param {string} [props.blocks[].breakpoint] - Breakpoint name.
 * @param {string} [props.blocks[].value] - Current value at the breakpoint.
 * @param {boolean} [props.blocks[].dotsStart=false] - If `true`, dots are displayed at the start of the block.
 * @param {boolean} [props.blocks[].dotsEnd=false] - If `true`, dots are displayed at the end of the block.
 * @param {boolean} [props.blocks[].active=false] - If `true`, the block is active.
 * @param {boolean} [props.blocks[].alignEnd=false] - If `true`, the block is aligned to the end.
 * @param {BreakpointColor} [props.blocks[].color] - Color of the block.
 * @param {boolean} [props.dotsStart=false] - If `true`, dots are displayed at the start of the preview.
 * @param {boolean} [props.dotsEnd=false] - If `true`, dots are displayed at the end of the preview.
 *  *
 * @returns {JSX.Element} The BreakpointPreview component.
 *
 * @typedef {'blue' | 'green' | 'yellow' | 'red' | 'indigo' | 'orange' | 'cyan' | 'teal' | 'fuchsia' | 'black' | 'default'} BreakpointColor
 *
 * @example
 * <BreakpointPreview
 * 		blocks={[
 * 			{
 * 				breakpoint: 'Mobile',
 * 				widthEnd: '480px',
 * 				value: 'Regular',
 * 				dotsStart: true,
 * 				alignEnd: true,
 * 				active: true,
 * 			},
 * 			{
 * 				breakpoint: 'Default',
 * 				value: 'Small',
 * 				dotsEnd: true,
 * 			},
 * 		]}
 * />
 *
 * @preserve
 */
export const BreakpointPreview = (props) => {
	const { blocks: rawBlocks, dotsStart = false, dotsEnd = false } = props;

	const blocks = rawBlocks.filter(Boolean);

	if (!blocks || blocks.length < 1) {
		return null;
	}

	const hasActive = blocks?.some(({ active }) => active) ?? false;

	const activeColors = {
		blue: {
			text: 'es:text-blue-500',
			bg: 'es:bg-blue-500',
		},
		green: {
			text: 'es:text-lime-500',
			bg: 'es:bg-lime-500',
		},
		yellow: {
			text: 'es:text-yellow-400',
			bg: 'es:bg-yellow-400',
		},
		red: {
			text: 'es:text-red-500',
			bg: 'es:bg-red-500',
		},
		indigo: {
			text: 'es:text-indigo-500',
			bg: 'es:bg-indigo-500',
		},
		orange: {
			text: 'es:text-orange-500',
			bg: 'es:bg-orange-500',
		},
		cyan: {
			text: 'es:text-cyan-500',
			bg: 'es:bg-cyan-500',
		},
		teal: {
			text: 'es:text-accent-500',
			bg: 'es:bg-accent-500',
		},
		fuchsia: {
			text: 'es:text-fuchsia-500',
			bg: 'es:bg-fuchsia-500',
		},
		black: {
			text: 'es:text-black',
			bg: 'es:bg-black',
		},
		default: {
			text: 'es:text-secondary-600',
			bg: 'es:bg-secondary-600',
		},
	};

	return (
		<div className={clsx('es:mx-auto es:grid es:w-fit es:shrink-0 es:auto-cols-auto es:grid-rows-[auto_auto] es:gap-x-2 es:gap-y-0.5')}>
			{dotsStart && (
				<>
					<div className='es:row-start-1 es:flex es:shrink-0 es:translate-x-1 es:items-center es:gap-1 es:justify-self-end es:text-secondary-400'>
						<div className='es:flex es:gap-0.5 es:text-secondary-300'>
							<div className='es:size-0.5 es:rounded es:bg-current' />
							<div className='es:size-0.5 es:rounded es:bg-current' />
							<div className='es:size-0.5 es:rounded es:bg-current' />
						</div>
					</div>
					<div className='es:row-start-2 es:size-px es:justify-self-end' />
				</>
			)}

			{blocks.map(({ width, widthEnd, breakpoint, value, dotsStart = false, dotsEnd = false, active = false, alignEnd = false, color }, i) => {
				const activeTextColor = activeColors?.[color]?.text ?? activeColors.default.text;
				const activeBgColor = activeColors?.[color]?.bg ?? activeColors.default.bg;

				return (
					<Fragment key={i}>
						<div className='es:row-start-1 es:flex es:min-w-28 es:items-center es:gap-1 es:font-mono es:font-medium es:text-secondary-400'>
							{dotsStart && (
								<div className={clsx('es:flex es:gap-0.5', active ? activeTextColor : 'text-secondary-300')}>
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
								</div>
							)}
							{width && <span>{width}</span>}
							<div className={clsx('es:grow es:rounded', active ? 'es:h-0.5' : 'es:h-px es:bg-secondary-300', active && activeBgColor)} />
							{widthEnd && <span>{widthEnd}</span>}
							{dotsEnd && (
								<div className={clsx('es:flex es:gap-0.5', active ? activeTextColor : 'es:text-secondary-300')}>
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
								</div>
							)}
						</div>
						<div className='es:row-start-2 es:flex es:w-full es:min-w-28 es:flex-col es:items-start es:gap-1'>
							<span
								className={clsx(
									'es:rounded es:px-1 es:py-0.5',
									hasActive && active && 'es:text-white',
									hasActive && active && activeBgColor,
									hasActive && !active && 'es:bg-secondary-200 es:text-secondary-500',
									!hasActive && 'es:bg-secondary-600 es:text-white',
									alignEnd && 'es:ml-auto',
								)}
							>
								{upperFirst(breakpoint)}
							</span>
							{value && <span className={clsx('es:-mt-0.5 es:px-1', active ? 'es:text-secondary-400' : 'es:text-secondary-400', alignEnd && 'es:ml-auto')}>{value}</span>}
						</div>
					</Fragment>
				);
			})}

			{dotsEnd && (
				<>
					<div className='es:row-start-1 es:flex es:shrink-0 es:-translate-x-1 es:items-center es:gap-1 es:font-mono es:font-medium es:text-secondary-400'>
						<div className='es:flex es:gap-0.5 es:text-secondary-300'>
							<div className='es:size-0.5 es:rounded es:bg-current' />
							<div className='es:size-0.5 es:rounded es:bg-current' />
							<div className='es:size-0.5 es:rounded es:bg-current' />
						</div>
					</div>
					<div className='es:row-start-2 es:size-px' />
				</>
			)}
		</div>
	);
};
