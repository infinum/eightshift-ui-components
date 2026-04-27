import { clsx } from 'clsx';
import type { ElementType, JSX, ReactNode } from 'react';

interface StackProps {
	as?: ElementType;
	children?: ReactNode;
	noWrap?: boolean;
	className?: string;
	hidden?: boolean;
}

export const HStack = ({ children, noWrap, className, hidden, as }: StackProps): JSX.Element | null => {
	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';

	return <ComponentToRender className={clsx('es:flex es:items-center es:gap-x-1.5 es:gap-y-2', !noWrap && 'es:flex-wrap', className)}>{children}</ComponentToRender>;
};
