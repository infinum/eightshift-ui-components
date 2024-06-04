import React from 'react';
import { IconLabel } from '../icon-label/icon-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { classnames } from '../../utilities/classnames';
import { __ } from '@wordpress/i18n';
import { Label } from 'react-aria-components';
import { FocusScope } from 'react-aria';

/**
 * A component that allows hiding content in an expandable panel, to declutter the UI.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} props.label - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {string} [props.labelClassName] - Classes to pass to the label.
 * @param {JSX.Element} [props.actions] - Actions to display in the panel header, left of the expand button.
 * @param {boolean} [props.keepActionsOnExpand=false] - If `true`, the actions are not hidden when the panel is expanded.
 * @param {boolean} [props.disabled] - If `true`, the expand button is disabled.
 * @param {boolean} [props.noFocusHandling] - If `true`, the focus trapping when the item is expanded is disabled. Useful when part of another component that manages focus itself.
 * @param {boolean} [props.open] - Whether the expandable is open.
 * @param {Function} [props.onOpenChange] - Function is called when the panel is opened or closed.
 *
 * @returns {JSX.Element} The Expandable component.
 *
 * @example
 * <Expandable label='My component'>
 * 	...
 * </Expandable>
 *
 * @preserve
 */
export const Expandable = (props) => {
	const {
		icon,
		label,
		subtitle,

		className,
		labelClassName,

		actions,

		keepActionsOnExpand = false,

		disabled,

		noFocusHandling,

		children,

		open = false,
		onOpenChange,

		...other
	} = props;

	const [isOpen, setIsOpen] = React.useState(open);

	const component = (
		<div
			className={classnames(
				'es-uic-w-full es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-border-opacity-0 es-uic-text-sm es-uic-transition',
				isOpen && 'es-uic-border-opacity-100 es-uic-shadow-lg',
				className,
			)}
			{...other}
		>
			<div
				className={classnames(
					'es-uic-flex es-uic-h-10 es-uic-items-center es-uic-gap-1 es-uic-py-1 es-uic-transition-[padding-inline]',
					isOpen && 'es-uic-pl-2 es-uic-pr-1',
				)}
			>
				<IconLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={labelClassName}
					as={Label}
					fullWidth
				/>

				{actions && !keepActionsOnExpand && (
					<AnimatedVisibility
						visible={!isOpen}
						className='es-uic-ml-auto es-uic-flex es-uic-gap-2'
						transition='scaleFade'
						noInitial
					>
						{actions}
					</AnimatedVisibility>
				)}

				{actions && keepActionsOnExpand && (
					<div className='es-uic-ml-auto es-uic-flex es-uic-gap-2'>{actions}</div>
				)}

				<Button
					type='ghost'
					icon={isOpen ? icons.caretDownFill : icons.caretDown}
					onPress={() => {
						setIsOpen(!isOpen);
						if (onOpenChange) {
							onOpenChange(!isOpen);
						}
					}}
					tooltip={
						isOpen ? __('Close', 'eightshift-components') : __('Open', 'eightshift-components')
					}
					disabled={disabled}
					className={classnames(
						'[&>svg]:es-uic-transition-transform',
						isOpen && '[&>svg]:-es-uic-scale-y-100',
					)}
					size='small'
				/>
			</div>

			<AnimatedVisibility
				visible={isOpen}
				className='es-uic-space-y-2.5 es-uic-border-t es-uic-p-2'
				transition='slideFade'
				noInitial
			>
				{children}
			</AnimatedVisibility>
		</div>
	);

	if (noFocusHandling) {
		return component;
	}

	return (
		<FocusScope
			contain={isOpen}
			autoFocus={isOpen}
		>
			{component}
		</FocusScope>
	);
};
