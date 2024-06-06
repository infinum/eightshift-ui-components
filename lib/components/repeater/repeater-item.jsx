import {
	Checkbox as ReactAriaCheckbox,
	GridListItem,
	GridListContext,
} from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';

import { Expandable } from '../expandable/expandable';
import { __ } from '@wordpress/i18n';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { useRef } from 'react';
import { useCellEditMode } from '../../hooks/use-cell-edit-mode';

/**
 * A Repeater item.
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
 * @returns {JSX.Element} The ButtonGroup component.
 *
 * @see {@link Repeater} for usage example.
 *
 * @preserve
 */
export const RepeaterItem = (props) => {
	const {
		children,
		icon,
		label,
		subtitle,
		'aria-label': ariaLabel,
		className,
		actions,
		textValue,
		...rest
	} = props;

	let a11yLabel = textValue;

	if (label?.length > 0) {
		a11yLabel = label;
	}

	if (a11yLabel === '' || !a11yLabel) {
		a11yLabel = __('New item', 'eightshift-ui-components');
	}

	const itemRef = useRef(null);

	const preventProps = useCellEditMode(itemRef);

	return (
		<GridListContext.Consumer>
			{({ setCanReorder }) => {
				return (
					<GridListItem
						aria-label={ariaLabel ?? a11yLabel}
						textValue={a11yLabel}
						className={clsx(
							'es-uic-rounded-lg es-uic-transition',
							'focus:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
						)}
						{...rest}
					>
						{({ selectionMode, allowsDragging, isDragging }) => (
							<Expandable
								disabled={selectionMode === 'multiple'}
								icon={
									<>
										{selectionMode === 'multiple' && <Checkbox slot='selection' />}
										{selectionMode === 'none' && icon}
									</>
								}
								label={<div className='es-uic-flex es-uic-items-center es-uic-gap-1'>{label}</div>}
								subtitle={subtitle}
								labelClassName={className}
								className={clsx(isDragging && 'es-uic-opacity-25')}
								onOpenChange={(isOpen) => setCanReorder(!isOpen)}
								actions={
									<>
										{selectionMode === 'none' && allowsDragging && (
											<Button
												size='small'
												className='es-uic-h-6 es-uic-w-4 !es-uic-text-gray-500 es-uic-opacity-5 focus:!es-uic-opacity-100'
												slot='drag'
												type='ghost'
												icon={icons.reorderGrabberV}
												tooltip={__('Re-order', 'eightshift-ui-components')}
											/>
										)}

										{actions}
									</>
								}
								noFocusHandling
								{...preventProps}
							>
								{children}
							</Expandable>
						)}
					</GridListItem>
				);
			}}
		</GridListContext.Consumer>
	);
};

const Checkbox = (props) => {
	return (
		<ReactAriaCheckbox {...props}>
			{({ isIndeterminate, isSelected }) => (
				<>
					<div
						className={clsx(
							'es-uic-flex es-uic-size-5.5 es-uic-items-center es-uic-justify-center es-uic-rounded-md es-uic-border es-uic-text-gray-600 es-uic-shadow-sm es-uic-transition',
							isSelected && 'es-uic-border-teal-600 es-uic-bg-teal-600 es-uic-text-white',
						)}
					>
						{isIndeterminate && icons.solidRectFilled}

						<AnimatedVisibility
							transition='scaleRotateFade'
							visible={!isIndeterminate && isSelected}
							className='[&>svg]:es-uic-size-3 [&>svg]:es-uic-stroke-2'
							noInitial
						>
							{icons.check}
						</AnimatedVisibility>
					</div>
					{props.children}
				</>
			)}
		</ReactAriaCheckbox>
	);
};
