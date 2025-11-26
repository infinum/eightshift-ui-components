import { clsx } from 'clsx';
import { __ } from '@wordpress/i18n';
import { DraggableContext } from './draggable-context';
import { useContext } from 'react';
import { icons } from '../../icons';

/**
 * A Draggable item handle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the handle.
 *
 * @returns {JSX.Element} The DraggableHandle component.
 *
 * @example
 * <DraggableHandle />
 *
 * @preserve
 */
export const DraggableHandle = (props) => {
	const { className, children, ...rest } = props;

	const { handleRef, status } = useContext(DraggableContext);

	return (
		<div
			className={clsx(
				'es:flex es:h-5 es:w-4 es:cursor-pointer es:items-center es:justify-center es:rounded-sm es:hover:rounded-md es:inset-ring es:inset-ring-surface-400/10 es:bg-surface-50 es:text-surface-500/80 es:transition-plus',
				'es:shadow-2xs es:shadow-surface-900/2',
				'es:icon:size-4 es:icon:shrink-0',
				'es:active:inset-ring-accent-500/30 es:active:bg-surface-100 es:active:text-accent-500 es:active:rounded-xl',
				'es:any-focus:outline-hidden',
				status !== 'dragging' && 'es:focus:inset-ring-accent-500 es:focus:ring-2 es:focus:ring-accent-500/30',
				'es:hover:text-accent-700',
				status === 'dragging' && 'es:border-accent-600! es:bg-accent-500! es:text-white! es:shadow-sm es:shadow-black/5 es:ring-3 es:ring-accent-500/50',
				className,
			)}
			ref={handleRef}
			{...rest}
		>
			{children ?? icons.reorderGrabberV}
		</div>
	);
};
