import { clsx } from 'clsx/lite';

/**
 * Allows for stacking elements vertically, with a gap between them.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.noWrap] - If `true`, the children will not wrap if their size exceeds the container size.
 * @param {string} [props.className] - Classes to pass to the component.
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
	const { children, noWrap, className } = props;

	return (
		<div
			className={clsx(
				'es-uic-flex es-uic-flex-col es-uic-gap-x-1.5 es-uic-gap-y-1.5',
				!noWrap && 'es-uic-flex-wrap',
				className,
			)}
		>
			{children}
		</div>
	);
};
