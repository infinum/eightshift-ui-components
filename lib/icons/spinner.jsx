import { clsx } from 'clsx';

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
export const Spinner = ({ className }) => <div className={clsx('es:animate-spin es:anim-duration-1000', 'es:spinner-5 es:text-accent-600 es:size-8 es:rounded-full', className)} />;
