import { clsx } from 'clsx';
import type { ElementType, JSX, ReactNode } from 'react';
import type { Prettify } from '../../utilities/types';

interface StackProps {
	as?: ElementType;
	children?: ReactNode;
	noWrap?: boolean;
	className?: string;
	hidden?: boolean;
}

/**
 * Allows for stacking elements horizontally, with a gap between them.
 *
 * @component
 * @param {StackProps} props - Component props.
 *
 * @returns {JSX.Element} The HStack component.
 *
 * @example
 * <HStack>
 * 	...
 * </HStack>
 */
export const HStack = ({ children, noWrap, className, hidden, as }: Prettify<StackProps>): JSX.Element | null => {
	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';

	return <ComponentToRender className={clsx('es:flex es:items-center es:gap-x-1.5 es:gap-y-2', !noWrap && 'es:flex-wrap', className)}>{children}</ComponentToRender>;
};
