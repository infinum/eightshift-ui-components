import { clsx } from 'clsx';
import { Fragment } from 'react';
import { upperFirst } from '../../utilities';
import type { Prettify } from '../../utilities/types';

type BreakpointColor = 'blue' | 'green' | 'yellow' | 'red' | 'indigo' | 'orange' | 'cyan' | 'teal' | 'fuchsia' | 'black' | 'default';

type BreakpointPreviewBlock = {
	/** Current breakpoint width. Left-aligned with the block. */
	width?: string;
	/** Current breakpoint width. Right-aligned with the block. */
	widthEnd?: string;
	/** Breakpoint name. */
	breakpoint?: string;
	/** Current value at the breakpoint. */
	value?: string;
	/** If `true`, dots are displayed at the start of the block. Defaults to `false`. */
	dotsStart?: boolean;
	/** If `true`, dots are displayed at the end of the block. Defaults to `false`. */
	dotsEnd?: boolean;
	/** If `true`, the block is active. Defaults to `false`. */
	active?: boolean;
	/** If `true`, the block is aligned to the end. Defaults to `false`. */
	alignEnd?: boolean;
	/** Color of the block. */
	color?: BreakpointColor;
};

type BreakpointPreviewProps = {
	/** Blocks to display. */
	blocks?: Array<BreakpointPreviewBlock | null | false | undefined>;
	/** If `true`, dots are displayed at the start of the preview. Defaults to `false`. */
	dotsStart?: boolean;
	/** If `true`, dots are displayed at the end of the preview. Defaults to `false`. */
	dotsEnd?: boolean;
};

const activeColors: Record<BreakpointColor, { text: string; bg: string }> = {
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

/**
 * Component that renders a preview of the breakpoints to help users visualize the options they set.
 *
 * @component
 * @param {BreakpointPreviewProps} props - Component props.
 *
 * @returns {JSX.Element} The BreakpointPreview component.
 *
 * @example
 * <BreakpointPreview
 * 	blocks={[
 * 		{
 * 			breakpoint: 'Mobile',
 * 			widthEnd: '480px',
 * 			value: 'Regular',
 * 			dotsStart: true,
 * 			alignEnd: true,
 * 			active: true,
 * 		},
 * 		{
 * 			breakpoint: 'Default',
 * 			value: 'Small',
 * 			dotsEnd: true,
 * 		},
 * 	]}
 * />
 */
export const BreakpointPreview = (props: Prettify<BreakpointPreviewProps>) => {
	const { blocks: rawBlocks, dotsStart = false, dotsEnd = false } = props;
	const blocks = rawBlocks?.filter((block): block is BreakpointPreviewBlock => Boolean(block)) ?? [];

	if (blocks.length < 1) {
		return null;
	}

	const hasActive = blocks.some(({ active }) => active);

	return (
		<div className={clsx('es:mx-auto es:grid es:w-fit es:shrink-0 es:auto-cols-auto es:grid-rows-[auto_auto] es:gap-x-2 es:gap-y-0.5')}>
			{dotsStart ? (
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
			) : null}

			{blocks.map(({ width, widthEnd, breakpoint, value, dotsStart: blockDotsStart = false, dotsEnd: blockDotsEnd = false, active = false, alignEnd = false, color }, index) => {
				const normalizedColor = color ?? 'default';
				const activeTextColor = activeColors[normalizedColor].text;
				const activeBgColor = activeColors[normalizedColor].bg;

				return (
					<Fragment key={index}>
						<div className='es:row-start-1 es:flex es:min-w-28 es:items-center es:gap-1 es:font-mono es:font-medium es:text-secondary-400'>
							{blockDotsStart ? (
								<div className={clsx('es:flex es:gap-0.5', active ? activeTextColor : 'text-secondary-300')}>
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
								</div>
							) : null}
							{width ? <span>{width}</span> : null}
							<div className={clsx('es:grow es:rounded', active ? 'es:h-0.5' : 'es:h-px es:bg-secondary-300', active && activeBgColor)} />
							{widthEnd ? <span>{widthEnd}</span> : null}
							{blockDotsEnd ? (
								<div className={clsx('es:flex es:gap-0.5', active ? activeTextColor : 'es:text-secondary-300')}>
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
									<div className='es:size-0.5 es:rounded es:bg-current' />
								</div>
							) : null}
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
							{value ? <span className={clsx('es:-mt-0.5 es:px-1', 'es:text-secondary-400', alignEnd && 'es:ml-auto')}>{value}</span> : null}
						</div>
					</Fragment>
				);
			})}

			{dotsEnd ? (
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
			) : null}
		</div>
	);
};
