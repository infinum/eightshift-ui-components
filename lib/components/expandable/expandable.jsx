import React from 'react';
import { RichLabel } from '../rich-label/rich-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { Label, Disclosure, DisclosurePanel } from 'react-aria-components';
import { __ } from '@wordpress/i18n';

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
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
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

		flat,

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
			className={clsx('es:text-sm', className)}
			{...other}
		>
			<div
				className={clsx(
					'es:flex es:items-center es:h-10 es:gap-1 es:p-1 es:pl-1.5',
					'es:rounded-t-xl',
					'es:inset-ring',
					isOpen && 'es:rounded-b-sm es:bg-surface-100 es:inset-ring-surface-300/30',
					!isOpen && 'es:rounded-b-xl es:bg-secondary-50 es:inset-ring-secondary-200/40',
					!flat && 'es:shadow-xs es:shadow-black/5',
					'es:transition-plus',
					headerClassName,
				)}
				{...headerProps}
			>
				<RichLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={clsx('es:grow', labelClassName)}
					as={Label}
				/>

				{actions && !keepActionsOnExpand && (
					<AnimatedVisibility
						visible={!isOpen}
						className='es:flex es:gap-1 es:shrink-0'
						transition='scaleFade'
						decreaseBounce
						noInitial
					>
						{actions}
					</AnimatedVisibility>
				)}

				{actions && keepActionsOnExpand && <div className='es:flex es:gap-1 es:shrink-0'>{actions}</div>}

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
						icon={icons.dropdownCaretAlt}
						onPress={() => {
							setIsOpen(!isOpen);

							if (onOpenChange) {
								onOpenChange(!isOpen);
							}
						}}
						tooltip={isOpen ? __('Close', 'eightshift-ui-components') : __('Open', 'eightshift-ui-components')}
						disabled={disabled}
						className={clsx(
							'es:icon:transition-transform es:ease-spring-bouncier es:duration-400',
							isOpen && 'es:icon:-scale-y-100 es:icon:text-surface-600',
							!isOpen && 'es:icon:text-secondary-500',
						)}
						size='small'
					/>
				)}
			</div>

			<DisclosurePanel className={clsx(contentClassName)}>
				<AnimatedVisibility
					visible={isOpen}
					transition='scaleSlideFadeSlight'
					className={clsx(
						'es:space-y-1 es:p-2 es:bg-secondary-50 es:mt-0.5 es:rounded-b-xl es:rounded-t-sm es:inset-ring es:inset-ring-secondary-200/40',
						!flat && 'es:shadow-xs es:shadow-black/5',
					)}
				>
					{children}
				</AnimatedVisibility>
			</DisclosurePanel>
		</Disclosure>
	);
};
