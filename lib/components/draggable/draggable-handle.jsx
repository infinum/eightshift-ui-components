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
				'es-uic-flex es-uic-h-5 es-uic-w-4 es-uic-cursor-pointer es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-text-gray-400 es-uic-transition',
				'[&>svg]:es-uic-size-4 [&>svg]:es-uic-shrink-0',
				'active:es-uic-border-teal-500/30 active:es-uic-bg-teal-50 active:es-uic-text-teal-500',
				'focus:es-uic-outline-none focus-visible:es-uic-border-teal-500 focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
				'hover:es-uic-text-teal-500',
				status === 'dragging' && '!es-uic-border-teal-600 !es-uic-bg-teal-500 !es-uic-text-white es-uic-shadow-sm es-uic-shadow-teal-500/30',
				className,
			)}
			ref={handleRef}
			{...rest}
		>
			{children ?? icons.reorderGrabberV}
		</div>
	);
};
