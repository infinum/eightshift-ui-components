import { classnames } from '../../utilities/classnames';

export const IconLabel = (props) => {
	const { icon, label, subtitle, as, className, fullWidth = false, contentsOnly } = props;

	const ComponentToRender = as ?? 'div';

	if (contentsOnly) {
		return (
			<>
				{icon && <span className='es-uic-text-slate-500 [&>svg]:es-uic-size-5.5'>{icon}</span>}
				{label && <span>{label}</span>}
				{subtitle && <span className='es-uic-text-xs es-uic-text-gray-500'>{subtitle}</span>}
			</>
		);
	}

	return (
		<ComponentToRender
			className={classnames(
				'es-uic-flex es-uic-items-center es-uic-gap-1.5 es-uic-text-sm es-uic-leading-tight es-uic-text-gray-800',
				fullWidth && 'es-uic-grow',
				className,
			)}
		>
			{icon && <span className='es-uic-text-slate-500 [&>svg]:es-uic-size-5.5'>{icon}</span>}
			{(label || subtitle) && (
				<div className='es-uic-flex es-uic-flex-col'>
					{label && <span>{label}</span>}
					{subtitle && <span className='es-uic-text-xs es-uic-text-gray-500'>{subtitle}</span>}
				</div>
			)}
		</ComponentToRender>
	);
};
