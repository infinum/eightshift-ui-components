import { classnames } from '../../utilities/classnames';

export const ContainerPanel = ({ children, className, title }) => {
	return (
		<div
			className={classnames(
				'es-uic-space-y-2.5 es-uic-border-t es-uic-border-t-gray-200 es-uic-p-4 es-uic-text-[16px]',
				className,
			)}
		>
			{title && <span className='es-uic-text-sm es-uic-font-medium es-uic-text-gray-400'>{title}</span>}
			{children}
		</div>
	);
};
