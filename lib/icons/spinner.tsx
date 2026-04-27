import type { JSX } from 'react';
import { clsx } from 'clsx';

interface SpinnerProps {
	className?: string;
}

/**
 * A simple loading indicator.
 */
export const Spinner = ({ className }: SpinnerProps): JSX.Element => (
	<div className={clsx('es:animate-spin es:anim-duration-1000', 'es:spinner-5 es:text-accent-600 es:size-8 es:rounded-full', className)} />
);
