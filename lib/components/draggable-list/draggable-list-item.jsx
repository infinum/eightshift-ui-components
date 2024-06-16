import { GridListItem } from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { __ } from '@wordpress/i18n';
import { RichLabel } from '../rich-label/rich-label';

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
 * @param {string} [props.className] - Classes to pass to the item.
 *
 * @returns {JSX.Element} The DraggableList component.
 *
 * @see {@link DraggableList} for usage example.
 *
 * @preserve
 */
export const DraggableListItem = (props) => {
	const { children, icon, label, subtitle, 'aria-label': ariaLabel, className, textValue, ...rest } = props;

	let a11yLabel = textValue;

	if (label?.length > 0) {
		a11yLabel = label;
	}

	if (a11yLabel === '' || !a11yLabel) {
		a11yLabel = __('New item', 'eightshift-ui-components');
	}

	return (
		<GridListItem
			aria-label={ariaLabel ?? a11yLabel}
			textValue={a11yLabel}
			className={clsx(
				'es-uic-flex es-uic-min-h-7 es-uic-items-center es-uic-gap-1 es-uic-rounded-lg es-uic-transition',
				'focus:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
			)}
			{...rest}
		>
			<RichLabel
				icon={icon}
				label={label}
				subtitle={subtitle}
				className={className}
				fullWidth
			/>

			<Button
				size='small'
				className='es-uic-ml-auto es-uic-h-6 es-uic-w-4 es-uic-shrink-0 !es-uic-text-gray-500 es-uic-opacity-5 focus:!es-uic-opacity-100'
				slot='drag'
				type='ghost'
				icon={icons.reorderGrabberV}
				tooltip={__('Re-order', 'eightshift-ui-components')}
			/>

			{children}
		</GridListItem>
	);
};
