import { classnames } from '../../utilities/classnames';

export const ContainerPanel = ({ children, className }) => {
	return <div className={classnames('es-uic-p-4 es-uic-space-y-2.5 font-[16px]', className)}>{children}</div>;
};
