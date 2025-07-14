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
	const { icon, label, subtitle, className, type = 'default', alignIconToTitle = false, hidden } = props;

	if (hidden) {
		return null;
	}

	const styles = {
		info: {
			icon: icons.info,
			className: 'es:border-blue-500/75 es:shadow-blue-500/15 es:bg-blue-200/5 es:inset-ring-blue-100',
			iconColorClassName: 'es:text-blue-500',
			textColorClassName: 'es:text-blue-500 es:saturate-75',
			subtitleColorClassName: 'es:text-blue-950/60',
		},
		success: {
			icon: icons.checkSquare,
			className: 'es:border-green-600/75 es:shadow-green-500/15 es:bg-green-200/5 es:inset-ring-green-100',
			iconColorClassName: 'es:text-green-600',
			textColorClassName: 'es:text-green-700',
			subtitleColorClassName: 'es:text-green-950/60',
		},
		warning: {
			icon: icons.warning,
			className: 'es:border-orange-500/75 es:shadow-orange-500/15 es:bg-orange-200/5 es:inset-ring-orange-100',
			iconColorClassName: 'es:text-orange-500',
			textColorClassName: 'es:text-orange-700',
			subtitleColorClassName: 'es:text-orange-950/60',
		},
		error: {
			icon: icons.errorCircle,
			className: 'es:border-red-600/60 es:shadow-red-500/15 es:bg-red-200/5 es:inset-ring-red-100',
			iconColorClassName: 'es:text-red-600',
			textColorClassName: 'es:text-red-700',
			subtitleColorClassName: 'es:text-red-900/70',
		},
		placeholder: {
			icon: icons.componentGeneric,
			className: 'es:border-indigo-600/60 es:shadow-indigo-500/15 es:bg-white es:outline-2 es:outline-white es:inset-ring-indigo-100/0 es:border-dashed',
			iconColorClassName: 'es:text-indigo-600',
			textColorClassName: 'es:text-indigo-700',
			subtitleColorClassName: 'es:text-indigo-800/70',
		},
		default: {
			className: 'es:border-secondary-400 es:shadow-secondary-300/25 es:bg-secondary-200/5 es:inset-ring-secondary-100',
			iconColorClassName: 'es:text-secondary-500',
			textColorClassName: 'es:text-secondary-900',
			subtitleColorClassName: 'es:text-secondary-500',
		},
	};

	return (
		<div>
			<div
				className={clsx(
					'es:grid es:grid-cols-[auto_1fr] es:grid-rows-[auto_auto] es:rounded-xl es:border es:bg-linear-to-tr es:shadow-sm es:inset-ring-1',
					styles[type].className,
					icon || styles[type].icon ? 'es:gap-x-1.5 es:p-2 es:pr-3 es:pl-2.5' : 'es:px-2.5 es:py-2',
					className,
				)}
			>
				{(icon || styles[type].icon) && (
					<div
						className={clsx(
							'es:col-span-1 es:col-start-1 es:row-span-2 es:row-start-1 es:shrink-0 es:icon:size-6',
							alignIconToTitle ? 'es:self-baseline' : 'es:self-center',
							styles[type].iconColorClassName,
						)}
					>
						{icon ?? styles[type].icon}
					</div>
				)}

				{label && (
					<span
						className={clsx(
							'es:col-span-2 es:col-start-2 es:text-balance es:text-sm es:leading-tight',
							subtitle ? 'es:self-end' : 'es:row-span-2 es:self-center',
							styles[type].textColorClassName,
						)}
					>
						{label}
					</span>
				)}

				{subtitle && (
					<span
						className={clsx(
							'es:col-span-2 es:col-start-2 es:text-balance es:text-xs es:leading-tight es:pt-0.5',
							styles[type].subtitleColorClassName,
							label ? 'es:self-start' : 'es:row-span-2 es:self-center',
						)}
					>
						{subtitle}
					</span>
				)}
			</div>
		</div>
	);
};
