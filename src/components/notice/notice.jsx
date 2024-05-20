import { classnames } from '../../utilities/classnames';
import { icons } from '../icons/icons';

export const Notice = (props) => {
	const { icon, label, subtitle, className, type = 'default', alignIconToTitle = false } = props;

	const styles = {
		info: {
			icon: icons.infoCircle,
			className: 'border-blue-400 shadow-blue-500/15 bg-blue-100/5',
			iconColor: 'text-blue-400',
			textColor: 'text-blue-900',
			subtitleColor: 'text-blue-950/60',
		},
		success: {
			icon: icons.checkSquare,
			className: 'border-green-500 shadow-green-500/15 bg-green-100/5',
			iconColor: 'text-green-500',
			textColor: 'text-green-900',
			subtitleColor: 'text-green-950/60',
		},
		warning: {
			icon: icons.warning,
			className: 'border-amber-400 shadow-amber-500/15 bg-amber-100/5',
			iconColor: 'text-amber-400',
			textColor: 'text-amber-900',
			subtitleColor: 'text-amber-950/60',
		},
		error: {
			icon: icons.errorCircle,
			className: 'border-red-400 shadow-red-500/15 bg-red-100/5',
			iconColor: 'text-red-400',
			textColor: 'text-red-900',
			subtitleColor: 'text-red-950/60',
		},
		placeholder: {
			icon: icons.componentGeneric,
			className: 'border-slate-300 shadow-slate-300/25 border-dashed bg-slate-200/5',
			iconColor: 'text-slate-400',
			textColor: 'text-slate-900',
			subtitleColor: 'text-slate-500',
		},
		default: {
			className: 'border-gray-300 shadow-gray-300/25 bg-gray-200/5',
			iconColor: 'text-gray-400',
			textColor: 'text-gray-900',
			subtitleColor: 'text-gray-500',
		},
	};

	return (
		<div>
			<div
				className={classnames(
					'grid grid-cols-[auto,_1fr] grid-rows-[auto,_auto] rounded-md border bg-gradient-to-tr shadow-sm',
					styles[type].className,
					(icon || styles[type].icon) ? 'gap-x-1.5 p-1.5' : 'py-1.5 px-2',
					className,
				)}
			>
				{(icon || styles[type].icon) && (
					<span
						className={classnames(
							'col-span-1 col-start-1 row-span-2 row-start-1 shrink-0 self-center [&>svg]:size-7',
							alignIconToTitle ? 'self-baseline' : 'self-center',
							styles[type].iconColor,
						)}
					>
						{icon ?? styles[type].icon}
					</span>
				)}

				{label && (
					<span
						className={classnames(
							'col-span-2 col-start-2 text-balance text-sm leading-tight',
							subtitle ? 'self-end' : 'row-span-2 self-center',
							styles[type].textColor,
						)}
					>
						{label}
					</span>
				)}
				{subtitle && (
					<span
						className={classnames(
							'col-span-2 col-start-2 text-balance text-xs leading-tight',
							styles[type].subtitleColor,
							label ? 'self-start' : 'row-span-2 self-center',
						)}
					>
						{subtitle}
					</span>
				)}
			</div>
		</div>
	);
};
