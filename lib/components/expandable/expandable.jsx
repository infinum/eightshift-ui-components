import React from 'react';
import { RichLabel } from '../rich-label/rich-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { __ } from '@wordpress/i18n';
import { Label, Disclosure, DisclosurePanel } from 'react-aria-components';

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
 * @param {string} [props.headerClassName] - Classes to pass to the header (label + trigger).
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display in the panel header, left of the expand button.
 * @param {boolean} [props.keepActionsOnExpand=false] - If `true`, the actions are not hidden when the panel is expanded.
 * @param {boolean} [props.disabled] - If `true`, the expand button is disabled.
 * @param {boolean} [props.open] - Whether the expandable is open.
 * @param {Function} [props.onOpenChange] - Function is called when the panel is opened or closed.
 * @param {object} [props.headerProps] - Props to pass to the header (label + trigger).
 * @param {JSX.Element} [props.customOpenButton] - Allows adding a custom open button. **IMPORTANT**: make sure to set `slot='trigger'` on the passed element!
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
		headerClassName,

		actions,

		keepActionsOnExpand = false,

		disabled,

		noFocusHandling,

		children,

		open = false,
		onOpenChange,

		customOpenButton,

		headerProps,

		hidden,

		...other
	} = props;

	const [isOpen, setIsOpen] = React.useState(open);

	if (isOpen && disabled) {
		setIsOpen(false);
	}

	if (hidden) {
		return null;
	}

	return (
		<Disclosure
			isExpanded={isOpen}
			onExpandedChange={(value) => {
				setIsOpen(value);

				if (onOpenChange) {
					onOpenChange(!isOpen);
				}
			}}
			className={clsx(
				'es-uic-w-full es-uic-rounded-lg es-uic-border es-uic-border-gray-300/0 es-uic-text-sm es-uic-transition',
				isOpen && 'es-uic-border-gray-300/100 es-uic-shadow-lg',
				className,
			)}
			{...other}
		>
			<div
				className={clsx('es-uic-flex es-uic-h-10 es-uic-items-center es-uic-gap-1 es-uic-transition-[padding]', isOpen && 'es-uic-py-1 es-uic-pl-2 es-uic-pr-1', headerClassName)}
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

				{customOpenButton &&
					customOpenButton({
						open: isOpen,
						toggleOpen: () => {
							setIsOpen(!isOpen);

							if (onOpenChange) {
								onOpenChange(!isOpen);
							}
						},
						tooltip: isOpen ? __('Close', 'eightshift-ui-components') : __('Open', 'eightshift-ui-components'),
						disabled,
					})}

				{!customOpenButton && (
					<Button
						slot='trigger'
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
						className={clsx('[&>svg]:es-uic-size-5 [&>svg]:es-uic-transition-transform', isOpen && '[&>svg]:-es-uic-scale-y-100')}
						size='small'
					/>
				)}
			</div>

			<DisclosurePanel
				className={clsx(
					isOpen && 'es-uic-space-y-2.5 es-uic-border-t es-uic-border-t-gray-200 es-uic-p-2',
					isOpen && 'es-uic-animate-in es-uic-fade-in-0 es-uic-slide-in-from-top-3 es-uic-fill-mode-forwards',
					contentClassName,
				)}
			>
				{children}
			</DisclosurePanel>
		</Disclosure>
	);
};
