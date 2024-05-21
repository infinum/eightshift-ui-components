import { classnames } from '../../utilities/classnames';

export const ContainerPanel = ({ children, className, title }) => {
	return (
		<div
			className={classnames(
				'pt-2 es-uic-space-y-2.5 es-uic-border-t es-uic-border-t-gray-200 es-uic-p-4',
				className,
			)}
		>
			{title && (
				<span className='es-uic-select-none es-uic-text-[0.875rem] es-uic-font-medium es-uic-text-gray-500'>
					{title}
				</span>
			)}
			{children}
		</div>
	);
};
