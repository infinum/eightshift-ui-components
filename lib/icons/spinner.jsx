/**
 * A simple loading indicator.
 *
 * @component
 * @param {ImageProps} props - Spinner props.
 * @param {string} [props.className] - Additional classes to pass to the spinner.
 *
 * @returns {JSX.Element} The Spinner component.
 *
 * @example
 * <Spinner />
 *
 * @preserve
 */
export const Spinner = ({ className }) => cloneElement(icons.loader, { className: clsx('es:animate-spin es:size-8 es:text-accent-600', className) });
