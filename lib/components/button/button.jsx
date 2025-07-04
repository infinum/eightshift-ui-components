import { useObjectRef } from 'react-aria';
import { ProgressBar, Button as ReactAriaButton, Toolbar } from 'react-aria-components';
import { clsx } from 'clsx/lite';
import { cva } from 'class-variance-authority';
import { Tooltip } from '../tooltip/tooltip';
import { __ } from '@wordpress/i18n';
import { cloneElement } from 'react';
import { icons } from '../../icons';

/**
 * A simple button component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display within the button.
 * @param {ButtonSize} [props.size='default'] - The size of the button.
 * @param {ButtonType} [props.type='default'] - The type of the button.
 * @param {boolean} [props.disabled] - If `true`, the button is disabled.
 * @param {string} [props.className] - Classes to pass to the button.
 * @param {string|boolean} [props.tooltip] - Tooltip text to display on hover. If set to `true` and an `aria-label` is not provided, the tooltip text will be used as the `aria-label`.
 * @param {Function} [props.onPress] - Function to run when the button is pressed.
 * @param {React.Ref} [props.forwardedRef] - Ref to forward to the button. Use the same as the `ref` prop.
 * @param {string} [props.wrapperClassName] - Classes to pass to the tooltip wrapper.
 * @param {Object} [props.tooltipProps] - Props to pass to the tooltip.
 * @param {boolean} [props.pending] - If `true`, the button is in a pending state, which can be used to indicate that an action is being processed.
 * @param {string} [props.pendingAriaLabel='Loading'] - ARIA label for the pending state, used for screen readers.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Button component.
 *
 * @typedef {'small' | 'default' | 'large'} ButtonSize
 * @typedef {'default' | 'selected' | 'selectedGhost' | 'ghost' | 'danger' | 'dangerGhost'} ButtonType
 *
 * @example
 * <Button onPress={() => console.log('Hi!')} icon={icons.myIcon} />
 *
 * <Button onPress={() => console.log('Hi!')} icon={icons.myIcon}>My button</Button>
 *
 * @preserve
 */
export const Button = (props) => {
	const {
		children,
		icon,
		size = 'default',
		type = 'default',
		pending,
		pendingAriaLabel = __('Loading', 'eightshift-ui-components'),
		disabled,
		className,
		tooltip: rawTooltip,
		onPress,
		forwardedRef,
		wrapperClassName,
		tooltipProps,
		'aria-label': ariaLabel = typeof children === 'string' ? children : __('Menu item', 'eightshift-ui-components'),
		hidden,
		...other
	} = props;

	let tooltip = rawTooltip;

	if (rawTooltip === true && ariaLabel?.length > 0) {
		tooltip = ariaLabel;
	}

	const objRef = useObjectRef(forwardedRef);

	if (hidden) {
		return null;
	}

	const componentClasses = cva(
		[
			'es:flex es:items-center es:gap-1',
			'es:transition es:duration-300 es:border es:text-sm',
			'es:any-focus:outline-hidden es:focus-visible:z-10',
			'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
			'es:focus-visible:border-accent-500',
			'es:btn-group-mid:rounded-none',
			'es:btn-group-h-start:rounded-r-none es:btn-group-v-start:rounded-b-none',
			'es:btn-group-h-end:rounded-l-none es:btn-group-v-end:rounded-t-none',
			'es:enabled:not-pending:cursor-pointer',
			'es:shrink-0',
			'es:pending:shadow-none! es:pending:cursor-wait',
			icon && children ? 'es:justify-start' : 'es:justify-center',
			className,
		],
		{
			variants: {
				size: {
					small: 'es:icon:size-4.5 es:rounded-7',
					default: 'es:icon:size-5.5 es:rounded-10',
					large: 'es:icon:size-6 es:rounded-xl',
				},
				type: {
					default: 'es:bg-radial-[at_50%_125%] es:inset-ring es:inset-shadow-xs',
					selected: 'es:bg-radial-[at_50%_125%] es:inset-ring es:inset-shadow-xs',
					danger: 'es:bg-radial-[at_50%_125%] es:inset-ring es:inset-shadow-xs',
					ghost:
						'es:border-transparent es:text-secondary-700 es:enabled:hover:bg-secondary-100 es:enabled:active:bg-accent-50 es:enabled:pressed:bg-accent-50 es:enabled:active:text-accent-950 es:enabled:pressed:text-accent-950 es:disabled:border-transparent!',
					dangerGhost: [
						'es:border-transparent es:text-red-700',
						'es:enabled:hover:bg-red-500/5 es:enabled:active:bg-red-500/10 es:enabled:pressed:bg-red-500/10',
						'es:focus-visible:text-red-700',
						'es:focus-visible:ring-red-500/30 es:focus-visible:border-red-600 es:focus-visible:inset-ring-red-100',
						'es:disabled:border-transparent!',
					],
					selectedGhost: [
						'es:border-transparent es:text-accent-600',
						'es:enabled:hover:bg-accent-500/5 es:enabled:active:bg-accent-500/10 es:enabled:pressed:bg-accent-500/10',
						'es:focus-visible:text-accent-700',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:border-accent-500 es:focus-visible:inset-ring-accent-100',
						'es:disabled:border-transparent!',
					],
				},
			},
			compoundVariants: [
				// Styles.
				{
					type: 'default',
					disabled: false,
					class: [
						'es:text-black',
						'es:from-secondary-50 es:to-white',
						'es:border-secondary-300',
						'es:inset-ring-secondary-100',
						'es:inset-shadow-secondary-100/50',
						'es:shadow-sm',
						'es:enabled:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm es:hover:inset-shadow-secondary-100 es:hover:to-secondary-100 es:hover:inset-ring-secondary-100',
						'es:hover:text-accent-950',
						'es:focus-visible:text-accent-950',
					],
				},
				{
					type: 'selected',
					disabled: false,
					class: [
						'es:text-white',
						'es:from-accent-500 es:to-accent-600',
						'es:border-accent-700',
						'es:inset-ring es:inset-ring-accent-600',
						'es:inset-shadow-xs es:inset-shadow-accent-400/75',
						'es:focus-visible:border-accent-700',
						'es:focus-visible:inset-ring es:focus-visible:inset-ring-accent-600',
						'es:focus-visible:inset-shadow-xs es:focus-visible:inset-shadow-accent-400',
						'es:shadow es:shadow-accent-600/30 es:enabled:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm',
					],
				},
				{
					type: 'danger',
					disabled: false,
					class: [
						'es:text-red-700',
						'es:from-red-50/75 es:to-white',
						'es:border-red-700/50',
						'es:inset-ring-red-100',
						'es:inset-shadow-red-50',
						'es:hover:inset-shadow-red-100 es:hover:inset-ring-red-100 es:hover:text-red-800 es:hover:border-red-600',
						'es:focus-visible:text-red-900',
						'es:focus-visible:ring-red-500/30 es:focus-visible:border-red-600 es:focus-visible:inset-ring-red-100',
						'es:shadow es:shadow-red-700/20 es:enabled:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm',
					],
				},
				{
					disabled: true,
					class: 'es:disabled:border-zinc-300 es:disabled:text-zinc-400 es:border es:shadow-none es:disabled:inset-shadow-transparent es:disabled:inset-ring-0',
				},
				// Sizes.
				{
					size: 'small',
					iconOnly: false,
					class: 'es:h-7 es:min-w-7',
				},
				{
					size: 'small',
					iconOnly: true,
					class: 'es:size-7',
				},
				{
					size: 'small',
					hasIcon: false,
					iconOnly: false,
					class: 'es:px-2',
				},
				{
					size: 'small',
					hasIcon: true,
					iconOnly: false,
					class: 'es:px-1',
				},
				{
					size: 'default',
					iconOnly: false,
					class: 'es:h-9 es:min-w-9',
				},
				{
					size: 'default',
					iconOnly: true,
					class: 'es:size-9',
				},
				{
					size: 'default',
					hasIcon: false,
					iconOnly: false,
					class: 'es:px-2',
				},
				{
					size: 'default',
					hasIcon: true,
					iconOnly: false,
					class: 'es:px-1.5',
				},
				{
					size: 'large',
					iconOnly: false,
					class: 'es:h-10 es:min-w-10',
				},
				{
					size: 'large',
					iconOnly: true,
					class: 'es:size-10',
				},
				{
					size: 'large',
					hasIcon: false,
					iconOnly: false,
					class: 'es:px-4',
				},
				{
					size: 'large',
					hasIcon: true,
					iconOnly: false,
					class: 'es:px-2',
				},
			],
			defaultVariants: {
				disabled: false,
			},
		},
	);

	const component = (
		<ReactAriaButton
			onPress={onPress}
			isDisabled={disabled}
			isPending={pending}
			className={componentClasses({
				disabled: !pending && disabled,
				hasIcon: pending || Boolean(icon),
				iconOnly: pending || Boolean(icon && !children),
				size: size,
				type: type,
			})}
			ref={objRef}
			aria-label={ariaLabel}
			{...other}
		>
			{({ isPending }) => (
				<>
					{!isPending && (
						<>
							{icon}
							{children}
						</>
					)}
					{isPending && (
						<>
							<ProgressBar
								aria-label={pendingAriaLabel}
								className='es:sr-only'
								isIndeterminate
							/>
							{cloneElement(icons.loader, { className: 'es:motion-preset-spin es:motion-duration-1750' })}
						</>
					)}
				</>
			)}
		</ReactAriaButton>
	);

	if (!tooltip) {
		return component;
	}

	return (
		<Tooltip
			text={tooltip}
			wrapperClassName={wrapperClassName}
			{...tooltipProps}
		>
			{component}
		</Tooltip>
	);
};

/**
 * A wrapper for `Button` or `ToggleButton` components that visually groups them and ensures proper keyboard navigation.
 *
 * **Note**: Only intended for horizontal groups of buttons that don't wrap.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the button group container.
 * @param {boolean} [props.vertical] - If `true`, the buttons are displayed vertically.
 * @param {ButtonGroupType} [props.type='segmented'] - The way the button group is laid out.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The ButtonGroup component.
 *
 * @typedef {'segmented' | 'split'} ButtonGroupType
 *
 * @example
 * <ButtonGroup>
 *     <Button />
 *     <Button />
 *     <Button />
 * </ButtonGroup>
 *
 * @preserve
 */
export const ButtonGroup = ({ children, className, vertical, hidden, type = 'segmented', ...rest }) => {
	if (hidden) {
		return null;
	}

	return (
		<Toolbar
			className={clsx(
				'es:flex',
				vertical && 'es:flex-col',
				type === 'segmented' && vertical && 'es-button-group-v es:-space-y-px!',
				type === 'segmented' && !vertical && 'es-button-group-h es:-space-x-px!',
				type === 'split' && vertical && 'es:space-y-1',
				type === 'split' && !vertical && 'es:space-x-1.5',
				className,
			)}
			orientation={vertical ? 'vertical' : 'horizontal'}
			{...rest}
		>
			{children}
		</Toolbar>
	);
};
