import { clsx } from 'clsx';
import type { ElementType, JSX, ReactNode } from 'react';
import type { Prettify } from '../../utilities/types';

interface StackProps {
	/** Element to render the component as. Defaults to `div`. */
	as?: ElementType;
	children?: ReactNode;
	/** If `true`, the children will not wrap if their size exceeds the container size. */
	noWrap?: boolean;
	/** Classes to pass to the component. */
	className?: string;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
}

/**
 * Allows for stacking elements vertically, with a gap between them.
 *
 * @component
 * @param {StackProps} props - Component props.
 *
 * @returns {JSX.Element} The VStack component.
 *
 * @example
 * <VStack>
 * 	...
 * </VStack>
 */
export const VStack = ({ children, noWrap, className, hidden, as }: Prettify<StackProps>): JSX.Element | null => {
	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';

	return <ComponentToRender className={clsx('es:flex es:flex-col es:gap-x-1.5 es:gap-y-1.5', !noWrap && 'es:flex-wrap', className)}>{children}</ComponentToRender>;
};
