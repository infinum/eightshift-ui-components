import type { JSX } from 'react';
import { clsx } from 'clsx';

interface SpinnerProps {
	className?: string;
}

/**
 * A simple loading indicator.
 *
 * @component
 * @param {SpinnerProps} props - Spinner props.
 *
 * @returns {JSX.Element} The Spinner component.
 *
 * @example
 * <Spinner />
 */
export const Spinner = ({ className }: SpinnerProps): JSX.Element => (
	<div className={clsx('es:animate-spin es:anim-duration-1000', 'es:size-8 es:rounded-full es:text-accent-600 es:spinner-5', className)} />
);
