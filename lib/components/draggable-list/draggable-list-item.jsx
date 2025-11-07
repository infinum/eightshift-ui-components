import { clsx } from 'clsx/lite';
import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';
import { icons } from '../../icons';
import { cloneElement } from 'react';

/**
 * A DraggableList item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {string} [props.textValue] - The text value of the item.
 * @param {string} [props.className] - Classes to pass to the label.
 *
 * @returns {JSX.Element} The DraggableList component.
 *
 * @see {@link DraggableList} for usage example.
 *
 * @preserve
 */
export const DraggableListItem = (props) => {
	const { children, icon, label, subtitle, className, ...rest } = props;

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			className={clsx('es:w-fill es:group', className)}
			fullWidthLabel
			inline
			{...rest}
		>
			{cloneElement(icons.reorderGrabberV, {
				className: 'es:opacity-0 es:transition-opacity es:group-focus-visible:opacity-100 es:text-secondary-400 es:size-4 es:group-hover:opacity-100 es:ml-auto',
			})}

			{children}
		</BaseControl>
	);
};

/**
 * A Draggable item handle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the handle.
 *
 * @returns {JSX.Element} The DraggableListItemHandle component.
 *
 * @example
 * <DraggableListItemHandle />
 *
 * @preserve
 */
export const DraggableListItemHandle = (props) => {
	const { className, children, ...rest } = props;

	return (
		<button
			className={
				className ??
				'es:relative es:h-6 es:w-2 es:cursor-pointer es:items-center es:justify-center es:self-center es:rounded es:border es:border-secondary-300 es:bg-secondary-50 es:transition es:after:absolute es:after:inset-0 es:after:m-auto es:after:h-4 es:after:w-px es:after:bg-secondary-200 es:after:transition es:after:content-[""] es:hover:border-accent-500 es:hover:bg-accent-400 es:hover:after:bg-accent-500'
			}
			{...rest}
			data-movable-handle
			tabIndex={-1}
		>
			{children}
		</button>
	);
};
