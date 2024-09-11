import { clsx } from 'clsx/lite';
import { __ } from '@wordpress/i18n';
import { DraggableContext } from './draggable-context';
import { useContext } from 'react';
import { icons } from '../../icons';

/**
 * A Draggable item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the container.
 *
 * @returns {JSX.Element} The DraggableList component.
 *
 * @see {@link DraggableList} for usage example.
 *
 * @preserve
 */
export const DraggableItem = (props) => {
	const { children, className, ...rest } = props;

	const { itemId } = useContext(DraggableContext);

	return (
		<div
			data-swapy-item={itemId}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
};

/**
 * A Draggable item handle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the handle.
 *
 * @returns {JSX.Element} The DraggableItemHandle component.
 *
 * @example
 * <DraggableItemHandle />
 *
 * @preserve
 */
export const DraggableItemHandle = (props) => {
	const { className, children, ...rest } = props;

	return (
		<div
			data-swapy-handle
			className={clsx(
				'es-uic-w-fit es-uic-cursor-pointer es-uic-rounded es-uic-border es-uic-border-gray-100 es-uic-bg-white es-uic-py-0.5 es-uic-text-gray-400 [&>svg]:es-uic-size-4',
				className,
			)}
			{...rest}
		>
			{children ?? icons.reorderGrabberV}
		</div>
	);
};
