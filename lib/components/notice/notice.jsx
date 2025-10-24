import { clsx } from 'clsx/lite';

import { icons } from '../../icons/icons';

/**
 * A simple notice component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display within the notice.
 * @param {string} [props.label] - The label of the notice.
 * @param {string} [props.subtitle] - The subtitle of the notice.
 * @param {string} [props.className] - Classes to pass to the notice.
 * @param {NoticeType} [props.type='default'] - The type of the notice.
 * @param {boolean} [props.alignIconToTitle=false] - If `true`, the icon will be aligned to the first row of title, instead of vertically centered.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Notice component.
 *
 * @typedef {'info' | 'success' | 'warning' | 'error' | 'placeholder' | 'default'} NoticeType
 *
 * @example
 * <Notice label='This is a notice' />
 *
 * @preserve
 */
export const Notice = (props) => {
	const { icon, label, subtitle, className, type = 'default', alignIconToTitle = false, flat, hidden } = props;

	if (hidden) {
		return null;
	}

	const styles = {
		info: {
			icon: icons.info,
			className: 'es:inset-ring-blue-600/15 es:shadow-blue-800/5 es:from-blue-400/2 es:to-blue-600/5 es:inset-shadow-blue-500/10',
			iconColorClassName: 'es:text-blue-600',
			textColorClassName: 'es:text-blue-600',
			subtitleColorClassName: 'es:text-blue-950/55',
		},
		success: {
			icon: icons.checkSquare,
			className: 'es:inset-ring-green-800/15 es:shadow-green-800/5 es:from-green-400/2 es:to-green-600/5 es:inset-shadow-green-500/10',
			iconColorClassName: 'es:text-green-600',
			textColorClassName: 'es:text-green-600',
			subtitleColorClassName: 'es:text-green-950/55',
		},
		warning: {
			icon: icons.warning,
			className: 'es:inset-ring-orange-800/15 es:shadow-orange-800/5 es:from-orange-400/2 es:to-orange-600/5 es:inset-shadow-orange-500/10',
			iconColorClassName: 'es:text-orange-600',
			textColorClassName: 'es:text-orange-600',
			subtitleColorClassName: 'es:text-orange-950/55',
		},
		error: {
			icon: icons.errorCircle,
			className: 'es:inset-ring-red-800/15 es:shadow-red-800/5 es:from-red-400/2 es:to-red-600/5 es:inset-shadow-red-500/10',
			iconColorClassName: 'es:text-red-600',
			textColorClassName: 'es:text-red-600',
			subtitleColorClassName: 'es:text-red-950/55',
		},
		placeholder: {
			icon: icons.componentGeneric,
			className: 'es:inset-ring-indigo-700/15 es:shadow-indigo-800/5 es:from-indigo-400/2 es:to-indigo-600/5 es:inset-shadow-indigo-500/10',
			iconColorClassName: 'es:text-indigo-600',
			textColorClassName: 'es:text-indigo-600',
			subtitleColorClassName: 'es:text-indigo-900/55',
		},
		default: {
			className: 'es:inset-ring-surface-700/10 es:shadow-surface-800/5 es:from-surface-400/2 es:to-surface-600/5 es:inset-shadow-surface-500/10',
			iconColorClassName: 'es:text-surface-500',
			textColorClassName: 'es:text-surface-500',
			subtitleColorClassName: 'es:text-surface-800/50',
		},
	};

	return (
		<div>
			<div
				className={clsx(
					'es:grid es:grid-cols-[auto_1fr] es:grid-rows-[auto_auto]',
					'es:rounded-xl',
					// 'es:ring',
					'es:bg-white',
					'es:inset-ring',
					'es:bg-linear-to-b es:from-35%',
					'es:inset-shadow-sm',
					flat ? 'es:shadow-2xs' : 'es:shadow-sm',
					styles[type].className,
					'es:icon:shrink-0',
					icon || styles[type].icon ? 'es:gap-x-2 es:py-3 es:pl-2.5 es:pr-3' : 'es:py-3 es:px-3.5',
					className,
				)}
			>
				{(icon || styles[type].icon) && (
					<div
						className={clsx(
							'es:col-span-1 es:col-start-1 es:row-span-2 es:row-start-1 es:shrink-0 es:icon:size-6',
							alignIconToTitle ? 'es:self-baseline' : 'es:self-center-safe',
							styles[type].iconColorClassName,
						)}
					>
						{icon ?? styles[type].icon}
					</div>
				)}

				{label && (
					<span
						className={clsx(
							'es:col-span-2 es:col-start-2 es:text-balance es:text-14',
							subtitle ? 'es:self-end' : 'es:row-span-2 es:self-center-safe',
							'es:font-variation-["wdth"_110,"wght"_375,"YTLC"_520]',
							styles[type].textColorClassName,
						)}
					>
						{label}
					</span>
				)}

				{subtitle && (
					<span
						className={clsx(
							'es:col-span-2 es:col-start-2 es:text-balance es:text-xs es:leading-tight es:pt-0.25',
							'es:font-variation-["wdth"_76,"wght"_350]',
							styles[type].subtitleColorClassName,
							label ? 'es:self-start' : 'es:row-span-2 es:self-center-safe',
						)}
					>
						{subtitle}
					</span>
				)}
			</div>
		</div>
	);
};
