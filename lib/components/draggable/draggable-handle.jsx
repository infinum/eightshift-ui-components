import { clsx } from 'clsx/lite';
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
				'es:flex es:h-5 es:w-4 es:cursor-pointer es:items-center es:justify-center es:rounded es:border es:border-secondary-200 es:bg-white es:text-secondary-400 es:transition',
				'es:icon:size-4 es:icon:shrink-0',
				'es:active:border-accent-500/30 es:active:bg-accent-50 es:active:text-accent-500',
				'es:focus:outline-hidden es:focus-visible:border-accent-500 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
				'es:hover:text-accent-500',
				status === 'dragging' && 'es:border-accent-600! es:bg-accent-500! es:text-white! es:shadow-sm es:shadow-accent-500/30',
				className,
			)}
			ref={handleRef}
			{...rest}
		>
			{children ?? icons.reorderGrabberV}
		</div>
	);
};
