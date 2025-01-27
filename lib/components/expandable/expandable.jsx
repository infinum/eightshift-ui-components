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
			className={clsx('es:w-full es:rounded-xl es:border es:border-secondary-300/0 es:text-sm es:transition', isOpen && 'es:border-secondary-300/100 es:shadow-lg', className)}
			{...other}
		>
			<div className={clsx('es:flex es:h-10 es:items-center es:gap-1 es:transition-[padding]', isOpen && 'es:py-1 es:pl-2 es:pr-1', headerClassName)}>
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
						className='es:ml-auto es:flex es:gap-2'
						transition='slideFadeDownSlight'
						noInitial
					>
						{actions}
					</AnimatedVisibility>
				)}

				{actions && keepActionsOnExpand && <div className='es:ml-auto es:flex es:gap-2'>{actions}</div>}

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
						className={clsx('es:icon:size-5 es:icon:transition-transform', isOpen && 'es:icon:-scale-y-100')}
						size='small'
					/>
				)}
			</div>

			<DisclosurePanel
				className={clsx(
					isOpen && 'es:space-y-2.5 es:border-t es:border-t-secondary-200 es:p-2',
					isOpen &&
						'es:motion-safe:motion-preset-slide-down-sm es:motion-safe:motion-ease-spring-smooth es:motion-safe:motion-ease-linear/opacity es:motion-safe:motion-duration-300 es:motion-reduce:motion-preset-fade-md',
					contentClassName,
				)}
			>
				{children}
			</DisclosurePanel>
		</Disclosure>
	);
};
