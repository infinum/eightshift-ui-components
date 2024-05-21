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
			text: 'es-uic-text-blue-500',
			bg: 'es-uic-bg-blue-500',
		},
		green: {
			text: 'es-uic-text-lime-500',
			bg: 'es-uic-bg-lime-500',
		},
		yellow: {
			text: 'es-uic-text-yellow-400',
			bg: 'es-uic-bg-yellow-400',
		},
		red: {
			text: 'es-uic-text-red-500',
			bg: 'es-uic-bg-red-500',
		},
		indigo: {
			text: 'es-uic-text-indigo-500',
			bg: 'es-uic-bg-indigo-500',
		},
		orange: {
			text: 'es-uic-text-orange-500',
			bg: 'es-uic-bg-orange-500',
		},
		cyan: {
			text: 'es-uic-text-cyan-500',
			bg: 'es-uic-bg-cyan-500',
		},
		teal: {
			text: 'es-uic-text-teal-500',
			bg: 'es-uic-bg-teal-500',
		},
		fuchsia: {
			text: 'es-uic-text-fuchsia-500',
			bg: 'es-uic-bg-fuchsia-500',
		},
		black: {
			text: 'es-uic-text-black',
			bg: 'es-uic-bg-black',
		},
		default: {
			text: 'es-uic-text-slate-600',
			bg: 'es-uic-bg-slate-600',
		},
	};

	return (
		<div
			className={classnames(
				'es-uic-grid es-uic-w-full es-uic-shrink-0 es-uic-auto-cols-auto es-uic-grid-rows-[auto,_auto] es-uic-gap-x-2 es-uic-gap-y-0.5',
			)}
		>
			{dotsStart && (
				<>
					<div className='es-uic-row-start-1 es-uic-flex es-uic-shrink-0 es-uic-translate-x-1 es-uic-items-center es-uic-gap-1 es-uic-font-mono es-uic-font-medium es-uic-text-gray-400'>
						<div className='es-uic-flex es-uic-gap-0.5 es-uic-text-gray-300'>
							<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
							<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
							<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
						</div>
					</div>
					<div className='es-uic-row-start-2' />
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
							<div className='es-uic-row-start-1 es-uic-flex es-uic-min-w-28 es-uic-items-center es-uic-gap-1 es-uic-font-mono es-uic-font-medium es-uic-text-gray-400'>
								{dotsStart && (
									<div
										className={classnames(
											'flex gap-0.5',
											active ? activeTextColor : 'text-gray-300',
										)}
									>
										<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
										<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
										<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
									</div>
								)}
								{width && <span>{width}</span>}
								<div
									className={classnames(
										'es-uic-grow es-uic-rounded',
										active ? 'es-uic-h-0.5' : 'es-uic-h-px es-uic-bg-gray-300',
										active && activeBgColor,
									)}
								/>
								{widthEnd && <span>{widthEnd}</span>}
								{dotsEnd && (
									<div
										className={classnames(
											'es-uic-flex es-uic-gap-0.5',
											active ? activeTextColor : 'es-uic-text-gray-300',
										)}
									>
										<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
										<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
										<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
									</div>
								)}
							</div>
							<div className='es-uic-row-start-2 es-uic-flex es-uic-w-full es-uic-min-w-28 es-uic-flex-col es-uic-items-start es-uic-gap-1'>
								<span
									className={classnames(
										'es-uic-rounded es-uic-px-1 es-uic-py-0.5',
										hasActive && active && 'es-uic-text-white',
										hasActive && active && activeBgColor,
										hasActive && !active && 'es-uic-bg-gray-200 es-uic-text-gray-500',
										!hasActive && 'es-uic-bg-gray-600 es-uic-text-white',
										alignEnd && 'es-uic-ml-auto',
									)}
								>
									{upperFirst(breakpoint)}
								</span>
								{value && (
									<span
										className={classnames(
											'-es-uic-mt-0.5 es-uic-px-1',
											active ? 'es-uic-text-gray-400' : 'es-uic-text-gray-400',
											alignEnd && 'es-uic-ml-auto',
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
					<div className='es-uic-row-start-1 es-uic-flex es-uic-shrink-0 -es-uic-translate-x-1 es-uic-items-center es-uic-gap-1 es-uic-font-mono es-uic-font-medium es-uic-text-gray-400'>
						<div className='es-uic-flex es-uic-gap-0.5 es-uic-text-gray-300'>
							<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
							<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
							<div className='es-uic-size-0.5 es-uic-rounded es-uic-bg-current' />
						</div>
					</div>
					<div className='es-uic-row-start-2' />
				</>
			)}
		</div>
	);
};