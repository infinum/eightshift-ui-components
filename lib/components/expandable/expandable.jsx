import React from 'react';
import { RichLabel } from '../rich-label/rich-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';

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
 * @param {string} [props.contentClassName] - Classes to pass to the inner content wrapper.
 * @param {string} [props.labelClassName] - Classes to pass to the label.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display in the panel header, left of the expand button.
 * @param {boolean} [props.keepActionsOnExpand=false] - If `true`, the actions are not hidden when the panel is expanded.
 * @param {boolean} [props.disabled] - If `true`, the expand button is disabled.
 * @param {boolean} [props.noFocusHandling] - If `true`, the focus trapping when the item is expanded is disabled. Useful when part of another component that manages focus itself.
 * @param {boolean} [props.open] - Whether the expandable is open.
 * @param {Function} [props.onOpenChange] - Function is called when the panel is opened or closed.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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
		contentClassName,

		actions,

		keepActionsOnExpand = false,

		disabled,

		noFocusHandling,

		children,

		open = false,
		onOpenChange,

		hidden,

		...other
	} = props;

	const [isOpen, setIsOpen] = React.useState(open);

	if (hidden) {
		return null;
	}

	const component = (
		<div
			className={clsx(
				'es-uic-w-full es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-border-opacity-0 es-uic-text-sm es-uic-transition',
				isOpen && 'es-uic-border-opacity-100 es-uic-shadow-lg',
				className,
			)}
			{...other}
		>
			<div
				className={clsx(
					'es-uic-flex es-uic-h-10 es-uic-items-center es-uic-gap-1 es-uic-transition-[padding]',
					isOpen && 'es-uic-py-1 es-uic-pl-2 es-uic-pr-1',
				)}
			>
				<RichLabel
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

				{actions && keepActionsOnExpand && <div className='es-uic-ml-auto es-uic-flex es-uic-gap-2'>{actions}</div>}

				<Button
					type='ghost'
					icon={isOpen ? icons.caretDownFill : icons.caretDown}
					onPress={() => {
						setIsOpen(!isOpen);
						if (onOpenChange) {
							onOpenChange(!isOpen);
						}
					}}
					tooltip={isOpen ? __('Close', 'eightshift-ui-components') : __('Open', 'eightshift-ui-components')}
					disabled={disabled}
					className={clsx(
						'[&>svg]:es-uic-size-5 [&>svg]:es-uic-transition-transform',
						isOpen && '[&>svg]:-es-uic-scale-y-100',
					)}
					size='small'
				/>
			</div>

			<AnimatedVisibility
				visible={isOpen}
				className={clsx('es-uic-space-y-2.5 es-uic-border-t es-uic-p-2', contentClassName)}
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
