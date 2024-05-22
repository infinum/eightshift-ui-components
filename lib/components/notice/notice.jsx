import { classnames } from '../../utilities/classnames';
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
	const { icon, label, subtitle, className, type = 'default', alignIconToTitle = false } = props;

	const styles = {
		info: {
			icon: icons.infoCircle,
			className: 'es-uic-border-blue-400 es-uic-shadow-blue-500/15 es-uic-bg-blue-100/5',
			iconColor: 'es-uic-text-blue-400',
			textColor: 'es-uic-text-blue-900',
			subtitleColor: 'es-uic-text-blue-950/60',
		},
		success: {
			icon: icons.checkSquare,
			className: 'es-uic-border-green-500 es-uic-shadow-green-500/15 es-uic-bg-green-100/5',
			iconColor: 'es-uic-text-green-500',
			textColor: 'es-uic-text-green-900',
			subtitleColor: 'es-uic-text-green-950/60',
		},
		warning: {
			icon: icons.warning,
			className: 'es-uic-border-amber-500 es-uic-shadow-amber-500/15 es-uic-bg-amber-100/5',
			iconColor: 'es-uic-text-amber-500',
			textColor: 'es-uic-text-amber-900',
			subtitleColor: 'es-uic-text-amber-950/60',
		},
		error: {
			icon: icons.errorCircle,
			className: 'es-uic-border-red-400 es-uic-shadow-red-500/15 es-uic-bg-red-100/5',
			iconColor: 'es-uic-text-red-400',
			textColor: 'es-uic-text-red-900',
			subtitleColor: 'es-uic-text-red-950/60',
		},
		placeholder: {
			icon: icons.componentGeneric,
			className: 'es-uic-border-slate-300 es-uic-shadow-slate-300/25 es-uic-border-dashed es-uic-bg-slate-200/5',
			iconColor: 'es-uic-text-slate-400',
			textColor: 'es-uic-text-slate-900',
			subtitleColor: 'es-uic-text-slate-500',
		},
		default: {
			className: 'es-uic-border-gray-300 es-uic-shadow-gray-300/25 es-uic-bg-gray-200/5',
			iconColor: 'es-uic-text-gray-400',
			textColor: 'es-uic-text-gray-900',
			subtitleColor: 'es-uic-text-gray-500',
		},
	};

	return (
		<div>
			<div
				className={classnames(
					'es-uic-grid es-uic-grid-cols-[auto,_1fr] es-uic-grid-rows-[auto,_auto] es-uic-rounded-md es-uic-border es-uic-bg-gradient-to-tr es-uic-shadow-sm',
					styles[type].className,
					(icon || styles[type].icon) ? 'es-uic-gap-x-1.5 es-uic-p-1.5' : 'es-uic-py-1.5 es-uic-px-2',
					className,
				)}
			>
				{(icon || styles[type].icon) && (
					<span
						className={classnames(
							'es-uic-col-span-1 es-uic-col-start-1 es-uic-row-span-2 es-uic-row-start-1 es-uic-shrink-0 es-uic-self-center [&>svg]:es-uic-size-7',
							alignIconToTitle ? 'es-uic-self-baseline' : 'es-uic-self-center',
							styles[type].iconColor,
						)}
					>
						{icon ?? styles[type].icon}
					</span>
				)}

				{label && (
					<span
						className={classnames(
							'es-uic-col-span-2 es-uic-col-start-2 es-uic-text-balance es-uic-text-sm es-uic-leading-tight',
							subtitle ? 'es-uic-self-end' : 'es-uic-row-span-2 es-uic-self-center',
							styles[type].textColor,
						)}
					>
						{label}
					</span>
				)}
				{subtitle && (
					<span
						className={classnames(
							'es-uic-col-span-2 es-uic-col-start-2 es-uic-text-balance es-uic-text-xs es-uic-leading-tight',
							styles[type].subtitleColor,
							label ? 'es-uic-self-start' : 'es-uic-row-span-2 es-uic-self-center',
						)}
					>
						{subtitle}
					</span>
				)}
			</div>
		</div>
	);
};
