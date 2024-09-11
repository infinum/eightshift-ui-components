import { clsx } from 'clsx/lite';
import { __ } from '@wordpress/i18n';
import { RichLabel } from '../rich-label/rich-label';
import { DraggableListContext } from './draggable-list-context';
import { useContext } from 'react';

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
 * @param {string} [props.containerClassName] - Classes to pass to the item container.
 *
 * @returns {JSX.Element} The DraggableList component.
 *
 * @see {@link DraggableList} for usage example.
 *
 * @preserve
 */
export const DraggableListItem = (props) => {
	const { children, icon, label, subtitle, className, containerClassName, ...rest } = props;

	const { labelAsHandle } = useContext(DraggableListContext);

	const labelElement = (
		<RichLabel
			hidden={!(icon || label || subtitle)}
			icon={icon}
			label={label}
			subtitle={subtitle}
			className={className}
			fullWidth
		/>
	);

	return (
		<div
			className={clsx(
				'es-uic-flex es-uic-min-h-7 es-uic-items-center es-uic-gap-1 es-uic-rounded-lg es-uic-transition',
				'focus:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
				containerClassName,
			)}
			{...rest}
		>
			{labelAsHandle && <div data-swapy-handle>{labelElement}</div>}

			{!labelAsHandle && labelElement}

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
		<div
			data-swapy-handle
			className={
				className ??
				'es-uic-relative es-uic-h-6 es-uic-w-2 es-uic-cursor-pointer es-uic-items-center es-uic-justify-center es-uic-self-center es-uic-rounded es-uic-border es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-transition after:es-uic-absolute after:es-uic-inset-0 after:es-uic-m-auto after:es-uic-h-4 after:es-uic-w-px after:es-uic-bg-gray-200 after:es-uic-transition after:es-uic-content-[""] hover:es-uic-border-teal-500 hover:es-uic-bg-teal-400 hover:after:es-uic-bg-teal-500'
			}
			{...rest}
		>
			{children}
		</div>
	);
};
