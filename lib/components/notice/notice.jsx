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
			icon: icons.infoCircle,
			className: 'es:border-blue-400/75 es:shadow-blue-500/15 es:bg-blue-200/5',
			iconColor: 'es:text-blue-400',
			textColor: 'es:text-blue-500 es:saturate-75',
			subtitleColor: 'es:text-blue-950/60',
		},
		success: {
			icon: icons.checkSquare,
			className: 'es:border-emerald-500/75 es:shadow-emerald-500/15 es:bg-emerald-200/5',
			iconColor: 'es:text-emerald-500',
			textColor: 'es:text-emerald-600',
			subtitleColor: 'es:text-emerald-950/60',
		},
		warning: {
			icon: icons.warning,
			className: 'es:border-orange-500/75 es:shadow-orange-500/15 es:bg-orange-200/5',
			iconColor: 'es:text-orange-500',
			textColor: 'es:text-orange-700',
			subtitleColor: 'es:text-orange-950/60',
		},
		error: {
			icon: icons.errorCircle,
			className: 'es:border-red-300 es:shadow-red-500/15 es:bg-red-200/5',
			iconColor: 'es:text-red-500',
			textColor: 'es:text-red-700',
			subtitleColor: 'es:text-red-950/60',
		},
		placeholder: {
			icon: icons.componentGeneric,
			className: 'es:border-secondary-400 es:shadow-secondary-300/25 es:border-dashed es:bg-secondary-200/5',
			iconColor: 'es:text-secondary-400',
			textColor: 'es:text-secondary-900',
			subtitleColor: 'es:text-secondary-500',
		},
		default: {
			className: 'es:border-secondary-300 es:shadow-secondary-300/25 es:bg-secondary-200/5',
			iconColor: 'es:text-secondary-400',
			textColor: 'es:text-secondary-900',
			subtitleColor: 'es:text-secondary-500',
		},
	};

	return (
		<div>
			<div
				className={clsx(
					'es:grid es:grid-cols-[auto_1fr] es:grid-rows-[auto_auto] es:rounded-xl es:border es:bg-linear-to-tr es:shadow-sm',
					styles[type].className,
					icon || styles[type].icon ? 'es:gap-x-1.5 es:p-2' : 'es:px-2 es:py-2',
					className,
				)}
			>
				{(icon || styles[type].icon) && (
					<span
						className={clsx(
							'es:col-span-1 es:col-start-1 es:row-span-2 es:row-start-1 es:shrink-0 es:icon:size-6',
							alignIconToTitle ? 'es:self-baseline' : 'es:self-center',
							styles[type].iconColor,
						)}
					>
						{icon ?? styles[type].icon}
					</span>
				)}

				{label && (
					<span
						className={clsx(
							'es:col-span-2 es:col-start-2 es:text-balance es:text-sm es:leading-tight',
							subtitle ? 'es:self-end' : 'es:row-span-2 es:self-center',
							styles[type].textColor,
						)}
					>
						{label}
					</span>
				)}
				{subtitle && (
					<span
						className={clsx(
							'es:col-span-2 es:col-start-2 es:text-balance es:text-xs es:leading-tight',
							styles[type].subtitleColor,
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
