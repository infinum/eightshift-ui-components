import { clsx } from 'clsx';

/**
 * Allows for stacking elements vertically, with a gap between them.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.as] - Element to render the component as. Defaults to `div`.
 * @param {boolean} [props.noWrap] - If `true`, the children will not wrap if their size exceeds the container size.
 * @param {string} [props.className] - Classes to pass to the component.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The VStack component.
 *
 * @example
 * <VStack>
 * 	...
 * </VStack>
 *
 * @preserve
 */
export const VStack = (props) => {
	const { children, noWrap, className, hidden, as } = props;

	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';

	return <ComponentToRender className={clsx('es:flex es:flex-col es:gap-x-1.5 es:gap-y-1.5', !noWrap && 'es:flex-wrap', className)}>{children}</ComponentToRender>;
};
