import { clsx } from 'clsx/lite';

/**
 * Allows for stacking elements horizontally, with a gap between them.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.noWrap] - If `true`, the children will not wrap if their size exceeds the container size.
 * @param {string} [props.className] - Classes to pass to the component.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The HStack component.
 *
 * @example
 * <HStack>
 * 	...
 * </HStack>
 *
 * @preserve
 */
export const HStack = (props) => {
	const { children, noWrap, className, hidden } = props;

	if (hidden) {
		return null;
	}

	return <div className={clsx('es:flex es:items-center es:gap-x-1.5 es:gap-y-2', !noWrap && 'es:flex-wrap', className)}>{children}</div>;
};
