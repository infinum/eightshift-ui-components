import { useObjectRef } from 'react-aria';
import { ProgressBar, Button as ReactAriaButton, Toolbar } from 'react-aria-components';
import { clsx } from 'clsx/lite';
import { cva } from 'class-variance-authority';
import { Tooltip } from '../tooltip/tooltip';
import { __ } from '@wordpress/i18n';
import { cloneElement } from 'react';
import { icons } from '../../icons';

/**
 * @typedef {import('../tooltip/tooltip').TooltipProps} TooltipProps
 *
 * @preserve
 * */

/**
 * @typedef {Object} ButtonProps
 * @property {JSX.Element} [props.icon] - Icon to display within the button.
 * @property {ButtonSize} [props.size='default'] - The size of the button.
 * @property {ButtonType} [props.type='default'] - The type of the button.
 * @property {boolean} [props.disabled] - If `true`, the button is disabled.
 * @property {string} [props.className] - Classes to pass to the button.
 * @property {string|boolean} [props.tooltip] - Tooltip text to display on hover. If set to `true` and an `aria-label` is not provided, the tooltip text will be used as the `aria-label`.
 * @property {Function} [props.onPress] - Function to run when the button is pressed.
 * @property {React.Ref} [props.forwardedRef] - Ref to forward to the button. Use the same as the `ref` prop.
 * @property {string} [props.wrapperClassName] - Classes to pass to the tooltip wrapper.
 * @property {TooltipProps} [props.tooltipProps] - Props to pass to the tooltip.
 * @property {boolean} [props.pending] - If `true`, the button is in a pending state, which can be used to indicate that an action is being processed.
 * @property {string} [props.pendingAriaLabel='Loading'] - ARIA label for the pending state, used for screen readers.
 * @property {boolean} [props.flat] - If `true`, the button will be render with a more flat look. (applies only to `default`, `selected`, and `danger` types)
 * @property {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @typedef {'small' | 'default' | 'large'} ButtonSize
 * @typedef {'default' | 'selected' | 'selectedGhost' | 'ghost' | 'danger' | 'dangerGhost' | 'glass' | 'glassDark' | 'dangerGlass' | 'selectedGlass'} ButtonType
 *
 * @preserve
 */

/**
 * A simple button component.
 *
 * @component
 * @param {ButtonProps} props - Component props.
 *
 * @returns {JSX.Element} The Button component.
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
		flat,
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
					small: 'es:icon:size-5 es:rounded-7',
					default: 'es:icon:size-5 es:rounded-10',
					large: 'es:icon:size-6 es:rounded-xl',
				},
				type: {
					default: ['es:bg-radial-[at_50%_125%]', !flat && 'es:inset-ring es:inset-shadow-xs'],
					selected: ['es:bg-radial-[at_50%_125%]', !flat && 'es:inset-ring es:inset-shadow-xs'],
					danger: ['es:bg-radial-[at_50%_125%]', !flat && 'es:inset-ring es:inset-shadow-xs'],
					ghost:
						'es:border-transparent es:text-secondary-700 es:hover:bg-secondary-100 es:enabled:active:bg-accent-50 es:enabled:pressed:bg-accent-50 es:enabled:active:text-accent-950 es:enabled:pressed:text-accent-950 es:disabled:border-transparent!',
					dangerGhost: [
						'es:border-transparent es:text-red-700',
						'es:hover:bg-red-500/5 es:enabled:active:bg-red-500/10 es:enabled:pressed:bg-red-500/10',
						'es:focus-visible:text-red-700',
						'es:focus-visible:ring-red-500/30 es:focus-visible:border-red-600 es:focus-visible:inset-ring-red-100',
						'es:disabled:border-transparent!',
					],
					selectedGhost: [
						'es:border-transparent es:text-accent-600',
						'es:hover:bg-accent-500/5 es:enabled:active:bg-accent-500/10 es:enabled:pressed:bg-accent-500/10',
						'es:focus-visible:text-accent-700',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:border-accent-500 es:focus-visible:inset-ring-accent-100',
						'es:disabled:border-transparent!',
					],
					glass: [
						'es:backdrop-blur-md',
						'es:backdrop-saturate-120 es:hover:backdrop-saturate-130',
						'es:bg-radial-[at_50%_75%] es:from-white/20 es:to-white/15',
						'es:hover:from-white/30 es:hover:to-white/25',
						'es:focus-visible:from-white/90 es:focus-visible:to-white/85',
						'es:border-none es:text-white es:focus-visible:text-black',
						'es:inset-shadow-sm es:inset-shadow-white/5 es:hover:inset-shadow-white/10',
						'es:shadow-xs es:shadow-black/10',
						'es:inset-ring es:inset-ring-white/2',
						'es:text-shadow-2xs es:text-shadow-black/30',
					],
					glassDark: [
						'es:backdrop-blur-md',
						'es:backdrop-saturate-115 es:hover:backdrop-saturate-125',
						'es:bg-radial-[at_50%_75%] es:from-black/40 es:to-black/35',
						'es:hover:from-black/50 es:hover:to-black/45',
						'es:focus-visible:from-black/95 es:focus-visible:to-black/90',
						'es:border-none es:text-white',
						'es:inset-shadow-sm es:inset-shadow-white/5 es:hover:inset-shadow-white/10',
						'es:shadow-xs es:shadow-black/10',
						'es:inset-ring es:inset-ring-black/10',
						'es:text-shadow-2xs es:text-shadow-black/30 es:focus-visible:text-shadow-black/0',
					],
					dangerGlass: [
						'es:backdrop-blur-md',
						'es:backdrop-saturate-115 es:hover:backdrop-saturate-125',
						'es:bg-radial-[at_50%_75%] es:from-red-700/50 es:to-red-700/45',
						'es:hover:from-red-700/60 es:hover:to-red-700/55',
						'es:enabled:focus-visible:from-red-700/95 es:enabled:focus-visible:to-red-700/90',
						'es:border-none es:text-white',
						'es:inset-shadow-sm es:inset-shadow-white/5 es:hover:inset-shadow-white/10',
						'es:shadow-xs es:shadow-red-700/10',
						'es:inset-ring es:inset-ring-red-700/10',
						'es:text-shadow-2xs es:text-shadow-black/30',
						'es:focus-visible:ring-red-500/30',
					],
					selectedGlass: [
						'es:backdrop-blur-md',
						'es:backdrop-saturate-120 es:hover:backdrop-saturate-130',
						'es:bg-radial-[at_50%_75%] es:from-accent-400/35 es:to-accent-400/30',
						'es:hover:from-accent-400/45 es:hover:to-accent-400/40',
						'es:focus-visible:from-accent-600/95 es:focus-visible:to-accent-600/90',
						'es:border-none es:text-white',
						'es:inset-shadow-sm es:inset-shadow-white/5 es:hover:inset-shadow-white/10',
						'es:shadow-xs es:shadow-black/10',
						'es:inset-ring es:inset-ring-white/2',
						'es:text-shadow-2xs es:text-shadow-black/30',
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
						'es:from-white es:to-secondary-50',
						'es:border-secondary-300',
						!flat && 'es:inset-ring-secondary-100',
						!flat && 'es:inset-shadow-secondary-100/50 es:hover:inset-shadow-secondary-100',
						!flat && 'es:shadow-sm',
						!flat && 'es:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm',
						flat ? 'es:hover:from-secondary-100 es:hover:to-secondary-100 es:hover:inset-ring-secondary-100' : 'es:hover:to-secondary-100 es:hover:inset-ring-secondary-100',
						'es:hover:text-accent-950',
						'es:focus-visible:text-accent-950',
					],
				},
				{
					type: 'selected',
					disabled: false,
					class: [
						'es:text-white',
						flat ? 'es:from-accent-500 es:to-accent-600 es:hover:from-accent-600 es:hover:to-accent-700' : 'es:from-accent-500 es:to-accent-600',
						'es:border-accent-700',
						!flat && 'es:inset-ring es:inset-ring-accent-600',
						!flat && 'es:inset-shadow-xs es:inset-shadow-accent-400/75',
						'es:focus-visible:border-accent-700',
						'es:focus-visible:inset-ring es:focus-visible:inset-ring-accent-600',
						'es:focus-visible:inset-shadow-xs es:focus-visible:inset-shadow-accent-400',
						!flat && 'es:shadow es:shadow-accent-600/30 es:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm',
						'es:text-shadow-2xs es:text-shadow-black/20',
					],
				},
				{
					type: 'danger',
					disabled: false,
					class: [
						'es:text-red-700',
						flat ? 'es:from-red-600/5 es:to-red-600/2 es:hover:from-red-600/10 es:hover:to-red-600/5' : 'es:from-red-50/75 es:to-white',
						'es:border-red-700/50',
						!flat && 'es:inset-ring-red-100',
						!flat && 'es:inset-shadow-red-50',
						!flat && 'es:hover:inset-shadow-red-100 es:hover:inset-ring-red-100 es:hover:text-red-800 es:hover:border-red-600',
						'es:focus-visible:text-red-900',
						'es:focus-visible:ring-red-500/30 es:focus-visible:border-red-600 es:focus-visible:inset-ring-red-100',
						!flat && 'es:shadow es:shadow-red-700/20 es:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm',
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
				hasIcon: Boolean(icon),
				iconOnly: Boolean(icon && !children),
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
						<div className='es:relative'>
							<div className='es:invisible'>
								{icon}
								{children}
							</div>
							<ProgressBar
								aria-label={pendingAriaLabel}
								className='es:sr-only'
								isIndeterminate
							/>
							{cloneElement(icons.loader, { className: 'es:motion-preset-spin es:motion-duration-2000 es:absolute es:inset-0 es:m-auto' })}
						</div>
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
