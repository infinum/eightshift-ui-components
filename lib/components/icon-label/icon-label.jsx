import { classnames } from '../../utilities/classnames';

export const IconLabel = (props) => {
	const { icon, label, subtitle, as, className, fullWidth = false, contentsOnly } = props;

	const ComponentToRender = as ?? 'div';

	if (contentsOnly) {
		return (
			<>
				{icon && <span className='text-slate-500 [&>svg]:size-5.5'>{icon}</span>}
				{label && <span>{label}</span>}
				{subtitle && <span className='text-xs text-gray-500'>{subtitle}</span>}
			</>
		);
	}

	return (
		<ComponentToRender
			className={classnames(
				'flex items-center gap-1.5 text-sm leading-tight text-gray-800',
				fullWidth && 'grow',
				className,
			)}
		>
			{icon && <span className='text-slate-500 [&>svg]:size-5.5'>{icon}</span>}
			{(label || subtitle) && (
				<div className='flex flex-col'>
					{label && <span>{label}</span>}
					{subtitle && <span className='text-xs text-gray-500'>{subtitle}</span>}
				</div>
			)}
		</ComponentToRender>
	);
};
