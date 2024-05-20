import { Fragment } from 'react';
import { classnames } from '../../utilities/classnames';
import { upperFirst } from '../../utilities/text-helpers';

export const BreakpointPreview = (props) => {
	const { blocks, dotsStart = false, dotsEnd = false } = props;

	if (!blocks || blocks.length < 1) {
		return null;
	}

	const hasActive = blocks?.some(({ active }) => active) ?? false;

	const activeColors = {
		blue: {
			text: 'text-blue-500',
			bg: 'bg-blue-500',
		},
		green: {
			text: 'text-lime-500',
			bg: 'bg-lime-500',
		},
		yellow: {
			text: 'text-yellow-400',
			bg: 'bg-yellow-400',
		},
		red: {
			text: 'text-red-500',
			bg: 'bg-red-500',
		},
		indigo: {
			text: 'text-indigo-500',
			bg: 'bg-indigo-500',
		},
		orange: {
			text: 'text-orange-500',
			bg: 'bg-orange-500',
		},
		cyan: {
			text: 'text-cyan-500',
			bg: 'bg-cyan-500',
		},
		teal: {
			text: 'text-teal-500',
			bg: 'bg-teal-500',
		},
		fuchsia: {
			text: 'text-fuchsia-500',
			bg: 'bg-fuchsia-500',
		},
		black: {
			text: 'text-black',
			bg: 'bg-black',
		},
		default: {
			text: 'text-slate-600',
			bg: 'bg-slate-600',
		},
	};

	return (
		<div
			className={classnames(
				'grid w-full shrink-0 auto-cols-auto grid-rows-[auto,_auto] gap-x-2 gap-y-0.5',
			)}
		>
			{dotsStart && (
				<>
					<div className='row-start-1 flex shrink-0 translate-x-1 items-center gap-1 font-mono font-medium text-gray-400'>
						<div className='flex gap-0.5 text-gray-300'>
							<div className='size-0.5 rounded bg-current' />
							<div className='size-0.5 rounded bg-current' />
							<div className='size-0.5 rounded bg-current' />
						</div>
					</div>
					<div className='row-start-2' />
				</>
			)}

			{blocks.map(
				(
					{
						width,
						widthEnd,
						breakpoint,
						value,
						dotsStart = false,
						dotsEnd = false,
						active = false,
						alignEnd = false,
						color,
					},
					i,
				) => {
					const activeTextColor = activeColors?.[color]?.text ?? activeColors.default.text;
					const activeBgColor = activeColors?.[color]?.bg ?? activeColors.default.bg;

					return (
						<Fragment key={i}>
							<div className='row-start-1 flex min-w-28 items-center gap-1 font-mono font-medium text-gray-400'>
								{dotsStart && (
									<div
										className={classnames(
											'flex gap-0.5',
											active ? activeTextColor : 'text-gray-300',
										)}
									>
										<div className='size-0.5 rounded bg-current' />
										<div className='size-0.5 rounded bg-current' />
										<div className='size-0.5 rounded bg-current' />
									</div>
								)}
								{width && <span>{width}</span>}
								<div
									className={classnames(
										'grow rounded',
										active ? 'h-0.5' : 'h-px bg-gray-300',
										active && activeBgColor,
									)}
								/>
								{widthEnd && <span>{widthEnd}</span>}
								{dotsEnd && (
									<div
										className={classnames(
											'flex gap-0.5',
											active ? activeTextColor : 'text-gray-300',
										)}
									>
										<div className='size-0.5 rounded bg-current' />
										<div className='size-0.5 rounded bg-current' />
										<div className='size-0.5 rounded bg-current' />
									</div>
								)}
							</div>
							<div className='row-start-2 flex w-full min-w-28 flex-col items-start gap-1'>
								<span
									className={classnames(
										'rounded px-1 py-0.5',
										hasActive && active && 'text-white',
										hasActive && active && activeBgColor,
										hasActive && !active && 'bg-gray-200 text-gray-500',
										!hasActive && 'bg-gray-600 text-white',
										alignEnd && 'ml-auto',
									)}
								>
									{upperFirst(breakpoint)}
								</span>
								{value && (
									<span
										className={classnames(
											'-mt-0.5 px-1',
											active ? 'text-gray-400' : 'text-gray-400',
											alignEnd && 'ml-auto',
										)}
									>
										{value}
									</span>
								)}
							</div>
						</Fragment>
					);
				},
			)}

			{dotsEnd && (
				<>
					<div className='row-start-1 flex shrink-0 -translate-x-1 items-center gap-1 font-mono font-medium text-gray-400'>
						<div className='flex gap-0.5 text-gray-300'>
							<div className='size-0.5 rounded bg-current' />
							<div className='size-0.5 rounded bg-current' />
							<div className='size-0.5 rounded bg-current' />
						</div>
					</div>
					<div className='row-start-2' />
				</>
			)}
		</div>
	);
};
