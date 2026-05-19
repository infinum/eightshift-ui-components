import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { ToggleButton as ReactAriaToggleButton } from 'react-aria-components';
import { Tooltip } from '../tooltip/tooltip';

const componentClasses = cva(
	[
		'es:font-variation-["wdth"_85,"wght"_325,"ROND"_100,"GRAD"_0,"slnt"_0] es:not-aria-pressed:hover:font-variation-["wdth"_85,"wght"_325,"ROND"_100,"GRAD"_75,"slnt"_0] es:aria-pressed:font-variation-["wdth"_85,"wght"_325,"ROND"_100,"GRAD"_75,"slnt"_-2]',
		'es:flex es:items-center es:justify-center',
		'es:transition-plus es:duration-300 es:ease-spring-smooth es:text-13',
		'es:any-focus:outline-hidden',
		'es:focus-visible:ring-2',
		'es:shrink-0',
		'es:text-box-trim',
		'es:leading-none',
		'es:icon:size-5',
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
				true: null,
			},
			flat: {
				true: null,
				false: null,
			},
			type: {
				default: null,
				ghost: null,
				simple: null,
			},
			disabled: {
				true: null,
				false: null,
			},
			hasIcon: {
				true: null,
				false: null,
			},
			iconOnly: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{
				size: 'small',
				selected: true,
				class: 'es:rounded-xl',
			},
			{
				size: 'default',
				selected: true,
				class: 'es:rounded-14',
			},
			{
				size: 'large',
				selected: true,
				class: 'es:rounded-18',
			},
			{
				size: 'small',
				selected: false,
				class: 'es:rounded-lg es:hover:rounded-10! es:pressed:rounded-xl!',
			},
			{
				size: 'default',
				selected: false,
				class: 'es:rounded-10 es:hover:rounded-xl! es:pressed:rounded-14!',
			},
			{
				size: 'large',
				selected: false,
				class: 'es:rounded-xl es:hover:rounded-2xl! es:pressed:rounded-18!',
			},
			{
				type: 'default',
				disabled: false,
				selected: false,
				class: [
					'es:text-black',
					'es:bg-linear-to-b es:from-black/2 es:to-black/4 es:from-25% es:bg-white',
					'es:inset-ring es:inset-ring-secondary-800/20',
					'es:inset-shadow-sm es:inset-shadow-white/75',
					'es:hover:bg-surface-100 es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10',
					'es:pressed:bg-surface-100 es:pressed:text-accent-950 es:pressed:inset-ring-surface-300 es:pressed:inset-shadow-white/10',
					'es:focus-visible:ring-accent-500/30 es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
				],
			},
			{
				type: 'default',
				disabled: false,
				selected: false,
				flat: false,
				class: 'es:shadow-xs es:shadow-black/5',
			},
			{
				type: 'default',
				disabled: false,
				selected: true,
				class: [
					'es:font-variation-["wdth"_80,"wdth"_64,"wght"_375,"GRAD"_150]',
					'es:any-icon:drop-shadow-xs es:any-icon:drop-shadow-accent-800/25',
					'es:text-white es:text-shadow-xs es:text-shadow-accent-900/30',
					'es:bg-linear-to-b es:from-accent-800/10 es:to-accent-800/30 es:bg-accent-500 es:from-30%',
					'es:inset-ring es:inset-ring-accent-600',
					'es:inset-shadow-sm es:inset-shadow-accent-50/25',
					'es:hover:from-accent-800/20 es:hover:to-accent-800/40',
					'es:pressed:from-accent-800/30 es:pressed:to-accent-800/50',
					'es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-700 es:focus-visible:bg-accent-600',
				],
			},
			{
				type: 'default',
				disabled: false,
				selected: true,
				flat: false,
				class: 'es:shadow-xs es:shadow-accent-900/30',
			},
			{
				type: 'simple',
				disabled: false,
				selected: false,
				class: [
					'es:text-black',
					'es:bg-radial-[at_50%_5%] es:from-50% es:from-surface-500/6 es:to-surface-500/12',
					'es:hover:bg-surface-100 es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10 es:hover:from-accent-600/4 es:hover:to-accent-600/10',
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
					'es:bg-radial-[at_50%_5%] es:from-50% es:from-accent-600/75 es:to-accent-600 es:text-white es:text-shadow-xs es:text-shadow-black/15',
					'es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
					'es:inset-ring es:inset-ring-accent-800/15',
				],
			},
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
					'es:inset-ring es:inset-ring-accent-800/10',
					'es:focus-visible:bg-accent-50 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
				],
			},
			{
				type: 'default',
				disabled: true,
				class: [
					'es:bg-linear-to-br es:from-secondary-50 es:to-secondary-100',
					'es:text-secondary-400 es:any-icon:text-secondary-400/50',
					'es:inset-ring es:inset-ring-secondary-200',
				],
			},
			{
				type: 'ghost',
				disabled: true,
				class: ['es:text-secondary-500 es:any-icon:text-secondary-500/50'],
			},
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
			flat: false,
			type: 'default',
			size: 'default',
			hasIcon: false,
			iconOnly: false,
		},
	},
);

type ToggleButtonSize = NonNullable<VariantProps<typeof componentClasses>['size']>;
type ToggleButtonType = NonNullable<VariantProps<typeof componentClasses>['type']>;

type ReactAriaToggleButtonProps = ComponentPropsWithoutRef<typeof ReactAriaToggleButton>;
type TooltipComponentProps = ComponentPropsWithoutRef<typeof Tooltip>;

type ToggleButtonProps = Omit<ReactAriaToggleButtonProps, 'children' | 'className' | 'isSelected' | 'isDisabled' | 'onChange'> & {
	children?: ReactNode;
	icon?: ReactNode;
	size?: ToggleButtonSize;
	type?: ToggleButtonType;
	disabled?: boolean;
	className?: string;
	tooltip?: string | boolean;
	selected: boolean;
	onChange?: (value: boolean) => void;
	wrapperClassName?: string;
	tooltipProps?: TooltipComponentProps;
	flat?: boolean;
	hidden?: boolean;
};

const TypedTooltip = Tooltip as (props: TooltipComponentProps & { children?: ReactNode; wrapperClassName?: string }) => ReactNode;

/**
 * A simple toggle button component.
 *
 * @component
 * @param {ToggleButtonProps} props - Component props.
 *
 * @returns {JSX.Element} The ToggleButton component.
 *
 * @example
 * const [selected, setSelected] = useState(false);
 *
 * <ToggleButton
 * 	selected={selected}
 * 	onChange={setSelected}
 * 	icon={myIcon}
 * />
 *
 * @example
 * <ToggleButton
 * 	selected={selected}
 * 	onChange={setSelected}
 * 	icon={myIcon}
 * >
 * 	My button
 * </ToggleButton>
 */
export const ToggleButton = (props: ToggleButtonProps) => {
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

	let tooltip = rawTooltip;

	if (rawTooltip === true && typeof ariaLabel === 'string' && ariaLabel.length > 0) {
		tooltip = ariaLabel;
	}

	const component = (
		<ReactAriaToggleButton
			isSelected={selected}
			onChange={onChange}
			isDisabled={disabled}
			className={clsx(
				componentClasses({
					disabled,
					selected,
					hasIcon: Boolean(icon),
					iconOnly: Boolean(icon) && !children,
					flat: Boolean(flat),
					size,
					type,
				}),
				className,
			)}
			{...other}
		>
			{icon}
			{children}
		</ReactAriaToggleButton>
	);

	if (!tooltip || tooltip === true) {
		return component;
	}

	return (
		<TypedTooltip
			text={tooltip}
			wrapperClassName={wrapperClassName}
			{...tooltipProps}
		>
			{component}
		</TypedTooltip>
	);
};
