import { ToggleButton as ReactAriaToggleButton } from 'react-aria-components';
import { cva } from 'class-variance-authority';
import { Tooltip } from '../tooltip/tooltip';

/** @typedef {import('../tooltip/tooltip').TooltipProps} TooltipProps */

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
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The ToggleButton component.
 *
 * @typedef {'small' | 'default' | 'large'} ToggleButtonSize
 * @typedef {'default'| 'ghost'} ToggleButtonType
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
		hidden,
		'aria-label': ariaLabel,
		...other
	} = props;

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
			'es:enabled:hover:shadow-md es:enabled:active:shadow-sm es:enabled:pressed:shadow-sm',
			'es:cursor-pointer',
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
					default: ['es:bg-radial-[at_50%_125%]', 'es:inset-ring es:inset-shadow-xs'],
					ghost: ['es:border-transparent es:text-secondary-700', 'es:hover:bg-secondary-100', 'es:disabled:border-transparent!'],
				},
			},
			compoundVariants: [
				{
					type: 'default',
					disabled: false,
					selected: false,
					class: [
						'es:text-black',
						'es:from-secondary-50 es:to-white',
						'es:border-secondary-300',
						'es:inset-ring-secondary-100',
						'es:inset-shadow-secondary-100/50',
						'es:shadow-sm',
						'es:hover:inset-shadow-secondary-100 es:hover:to-secondary-100 es:hover:inset-ring-secondary-100',
						'es:hover:text-accent-950',
						'es:focus-visible:text-accent-950',
					],
				},
				{
					type: 'default',
					disabled: false,
					selected: true,
					class: [
						'es:text-white es:accent-text-shadow',
						'es:from-accent-500 es:to-accent-600',
						'es:border-accent-700',
						'es:inset-ring es:inset-ring-accent-600',
						'es:inset-shadow-xs es:inset-shadow-accent-400/75',
						'es:focus-visible:border-accent-700',
						'es:focus-visible:inset-ring es:focus-visible:inset-ring-accent-600',
						'es:focus-visible:inset-shadow-xs es:focus-visible:inset-shadow-accent-400',
						'es:shadow-sm es:shadow-accent-600/30',
					],
				},
				{
					disabled: true,
					class: 'es:disabled:border-secondary-300 es:disabled:text-secondary-400 es:border es:shadow-none es:disabled:inset-shadow-transparent es:disabled:inset-ring-0',
				},
				{
					type: 'ghost',
					disabled: false,
					selected: true,
					class: ['es:bg-accent-600 es:text-white es:border-accent-600 es:shadow-sm es:shadow-accent-500/25', 'es:hover:shadow-accent-600/50'],
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
