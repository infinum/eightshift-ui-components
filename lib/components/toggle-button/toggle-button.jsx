import { ToggleButton as ReactAriaToggleButton } from 'react-aria-components';
import { cva } from 'class-variance-authority';
import { Tooltip } from '../tooltip/tooltip';

/**
 * @typedef {import('../tooltip/tooltip').TooltipProps} TooltipProps
 *
 * @preserve
 * */

/**
 * A simple toggle button component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display within the button.
 * @param {ToggleButtonSize} [props.size='default'] - The size of the button.
 * @param {ToggleButtonType} [props.type='default'] - The type of the button.
 * @param {boolean} [props.disabled] - If `true`, the button is disabled.
 * @param {string} [props.className] - Classes to pass to the button.
 * @param {string|boolean} [props.tooltip] - Tooltip text to display on hover.
 * @param {boolean} props.selected - Whether the button is selected.
 * @param {Function} [props.onChange] - Function to run when the toggle state changes.
 * @param {string} [props.wrapperClassName] - Classes to pass to the tooltip wrapper.
 * @param {TooltipProps} [props.tooltipProps] - Props to pass to the tooltip.
 * @param {boolean} [props.flat] - If `true`, component will look more flat (applies only to `default` type). Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The ToggleButton component.
 *
 * @typedef {'small' | 'default' | 'large'} ToggleButtonSize
 * @typedef {'default'| 'ghost' | 'simple'} ToggleButtonType
 *
 * @example
 * const [selected, setSelected] = useState(false);
 *
 * <ToggleButton
 * 	selected={selected}
 * 	onChange={setSelected}
 * 	icon={icons.myIcon}
 * 	/>
 *
 * <ToggleButton
 * 		selected={selected}
 * 		onChange={setSelected}
 * 		icon={icons.myIcon}
 * >
 * 		My button
 * </ToggleButton>
 *
 * @preserve
 */
export const ToggleButton = (props) => {
	const {
		children,
		icon,
		size = 'default',
		type = 'default',
		disabled,
		className,
		tooltip: rawTooltip,
		selected,
		onChange,
		wrapperClassName,
		tooltipProps,
		flat,
		hidden,
		'aria-label': ariaLabel,
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const componentClasses = cva(
		[
			'es:font-variation-["wdth"_80,"YTLC"_520,"wdth"_64,"wght"_375]',
			'es:flex es:items-center',
			'es:transition-plus es:duration-300 es:ease-spring-snappy es:text-13',
			'es:any-focus:outline-hidden',
			'es:focus-visible:ring-2',
			'es:shrink-0',
			'es:text-box-trim',
			'es:leading-none',
			'es:icon:size-5',
			icon && children ? 'es:justify-start' : 'es:justify-center-safe',
			className,
		],
		{
			variants: {
				size: {
					small: 'es:gap-0.75',
					default: 'es:gap-1.25',
					large: 'es:gap-1.5',
				},
				selected: {
					false: [
						'es:btn-group-h:not-pressed:not-after-current:not-first:rounded-l-sm',
						'es:btn-group-h:not-pressed:not-before-current:not-last:rounded-r-sm',
						'es:btn-group-v:not-pressed:not-after-current:not-first:rounded-t-sm',
						'es:btn-group-v:not-pressed:not-before-current:not-last:rounded-b-sm',
					],
				},
			},
			compoundVariants: [
				{
					size: 'small',
					selected: true,
					class: 'es:rounded-14',
				},
				{
					size: 'default',
					selected: true,
					class: 'es:rounded-18',
				},
				{
					size: 'large',
					selected: true,
					class: 'es:rounded-3xl',
				},
				{
					size: 'small',
					selected: false,
					class: 'es:rounded-md es:hover:rounded-10! es:pressed:rounded-14!',
				},
				{
					size: 'default',
					selected: false,
					class: 'es:rounded-10 es:hover:rounded-xl! es:pressed:rounded-18!',
				},
				{
					size: 'large',
					selected: false,
					class: 'es:rounded-xl es:hover:rounded-2xl! es:pressed:rounded-3xl!',
				},
				// Default
				{
					type: 'default',
					disabled: false,
					selected: false,
					class: [
						'es:text-black',
						'es:bg-linear-to-b es:from-black/2 es:to-black/4 es:from-25% es:bg-white',
						'es:inset-ring es:inset-ring-secondary-800/20',
						'es:inset-shadow-sm es:inset-shadow-white/75',
						!flat && 'es:shadow-xs es:shadow-black/5',
						'es:hover:bg-surface-100 es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10',
						'es:pressed:bg-surface-100 es:pressed:text-accent-950 es:pressed:inset-ring-surface-300 es:pressed:inset-shadow-white/10',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
					],
				},
				{
					type: 'default',
					disabled: false,
					selected: true,
					class: [
						'es:font-variation-["wdth"_80,"YTLC"_520,"wdth"_64,"wght"_375,"GRAD"_150]',
						'es:any-icon:drop-shadow-xs es:any-icon:drop-shadow-accent-800/25',
						'es:text-white es:text-shadow-xs es:text-shadow-accent-900/30',
						'es:bg-linear-to-b es:from-accent-800/10 es:to-accent-800/30 es:bg-accent-500 es:from-30%',
						'es:inset-ring es:inset-ring-accent-600',
						'es:inset-shadow-sm es:inset-shadow-accent-50/25',
						!flat && 'es:shadow-xs es:shadow-accent-900/30',
						'es:hover:from-accent-800/20 es:hover:to-accent-800/40',
						'es:pressed:from-accent-800/30 es:pressed:to-accent-800/50',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-700 es:focus-visible:bg-accent-600',
					],
				},
				// Simple
				{
					type: 'simple',
					disabled: false,
					selected: false,
					class: [
						'es:text-black',
						'es:bg-secondary-50 es:bg-linear-to-br es:from-surface-500/2 es:to-surface-500/10',
						'es:hover:bg-surface-100 es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10 es:hover:to-accent-700/5',
						'es:pressed:bg-surface-100 es:pressed:text-accent-950 es:pressed:inset-ring-surface-300 es:pressed:inset-shadow-white/10',
						'es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
					],
				},
				{
					type: 'simple',
					disabled: false,
					selected: true,
					class: [
						'es:text-white',
						'es:bg-linear-to-br es:from-accent-600/55 es:to-accent-600/90 es:text-white',
						'es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
						'es:inset-ring es:inset-ring-accent-800/15',
					],
				},
				// Ghost
				{
					type: 'ghost',
					disabled: false,
					selected: false,
					class: [
						'es:bg-white',
						'es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-secondary-700',
						'es:hover:from-surface-200/30 es:hover:to-surface-200/50 es:hover:text-accent-950',
						'es:pressed:from-accent-600/5 es:pressed:to-accent-600/15 es:pressed:text-accent-900',
						'es:focus-visible:bg-accent-50 es:focus-visible:text-accent-950 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
					],
				},
				{
					type: 'ghost',
					disabled: false,
					selected: true,
					class: [
						'es:bg-white',
						'es:bg-linear-to-br es:from-accent-600/70 es:to-accent-600/90 es:text-white',
						'es:inset-ring es:inset-ring-accent-800/15',
						'es:focus-visible:bg-accent-50 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
					],
				},
				{
					type: ['default'],
					disabled: true,
					class: [
						'es:bg-linear-to-br es:from-secondary-50 es:to-secondary-100',
						'es:text-secondary-400 es:any-icon:text-secondary-400/50',
						'es:inset-ring es:inset-ring-secondary-200',
					],
				},
				{
					type: ['ghost'],
					disabled: true,
					class: ['es:text-secondary-500 es:any-icon:text-secondary-500/50'],
				},
				// Sizes.
				{
					size: 'small',
					iconOnly: false,
					class: 'es:h-8 es:min-w-8',
				},
				{
					size: 'small',
					iconOnly: true,
					class: 'es:size-8',
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
					class: 'es:px-1.5',
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
					class: 'es:px-2.5',
				},
				{
					size: 'default',
					hasIcon: true,
					iconOnly: false,
					class: 'es:px-2',
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
					class: 'es:px-3',
				},
				{
					size: 'large',
					hasIcon: true,
					iconOnly: false,
					class: 'es:px-2.5',
				},
			],
			defaultVariants: {
				selected: false,
				disabled: false,
			},
		},
	);

	let tooltip = rawTooltip;

	if (rawTooltip === true && ariaLabel?.length > 0) {
		tooltip = ariaLabel;
	}

	const component = (
		<ReactAriaToggleButton
			isSelected={selected}
			onChange={onChange}
			isDisabled={disabled}
			className={componentClasses({
				disabled: disabled,
				selected: selected,
				hasIcon: Boolean(icon),
				iconOnly: Boolean(icon && !children),
				size: size,
				type: type,
			})}
			{...other}
		>
			{icon}
			{children}
		</ReactAriaToggleButton>
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
