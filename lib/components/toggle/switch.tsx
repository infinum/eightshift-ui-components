import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Switch as ReactAriaSwitch } from 'react-aria-components';

const outsideClasses = cva(
	[
		'es:flex es:shrink-0 es:items-center',
		'es:rounded-full',
		'es:transition es:duration-300',
		'es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/30 es:group-focus-visible:inset-ring-accent-500',
		'es:inset-ring',
	],
	{
		variants: {
			size: {
				small: 'es:h-3 es:w-5 es:p-0.5',
				medium: 'es:h-4.5 es:w-7.5 es:p-0.75',
				default: 'es:h-6 es:w-10 es:p-1',
			},
			checked: {
				false: null,
				true: null,
			},
			disabled: {
				false: null,
				true: null,
			},
		},
		compoundVariants: [
			{
				checked: false,
				disabled: false,
				class: [
					'es:inset-ring-secondary-400 es:bg-white es:bg-linear-to-r es:from-secondary-800/1 es:to-secondary-800/3',
					'es:hover:bg-surface-100',
					'es:group-hover:inset-ring-surface-400',
				],
			},
			{
				checked: true,
				disabled: false,
				class: [
					'es:bg-accent-500',
					'es:bg-linear-to-r es:from-accent-800/0 es:to-accent-800/25',
					'es:inset-ring-accent-800/30',
					'es:inset-shadow-xs es:inset-shadow-accent-50/25',
					'es:group-focus-visible:inset-ring-accent-800',
				],
			},
			{
				checked: false,
				disabled: true,
				class: ['es:inset-ring-secondary-300 es:bg-white'],
			},
			{
				checked: true,
				disabled: true,
				class: ['es:inset-ring-secondary-300 es:bg-secondary-300'],
			},
		],
		defaultVariants: {
			disabled: false,
			checked: false,
			size: 'default',
		},
	},
);

const thumbClasses = cva(['es:block es:rounded-full es:will-change-transform', 'es:shrink-0', 'es:no-webkit-highlight', 'es:transition es:ease-spring-bouncy es:duration-400'], {
	variants: {
		checked: {
			false: 'es:not-pressed:scale-90',
			true: 'es:scale-110',
		},
		size: {
			small: 'es:size-2',
			medium: 'es:size-3',
			default: 'es:size-4',
		},
		disabled: {
			false: null,
			true: null,
		},
		indeterminate: {
			false: null,
			true: null,
		},
	},
	compoundVariants: [
		{
			checked: true,
			indeterminate: false,
			size: 'small',
			class: 'es:translate-x-2',
		},
		{
			checked: true,
			indeterminate: false,
			size: 'medium',
			class: 'es:translate-x-3',
		},
		{
			checked: true,
			indeterminate: false,
			size: 'default',
			class: 'es:translate-x-4',
		},
		{
			checked: false,
			indeterminate: true,
			size: 'small',
			class: 'es:translate-x-1',
		},
		{
			checked: false,
			indeterminate: true,
			size: 'medium',
			class: 'es:translate-x-1.5',
		},
		{
			checked: false,
			indeterminate: true,
			size: 'default',
			class: 'es:translate-x-2',
		},
		{
			checked: false,
			indeterminate: true,
			class: 'es:scale-100',
		},
		{
			checked: false,
			disabled: false,
			class: ['es:bg-secondary-500', 'es:group-hover:bg-surface-500'],
		},
		{
			checked: true,
			disabled: false,
			class: ['es:bg-accent-50', 'es:bg-linear-to-br es:from-white/10 es:to-white/20', 'es:shadow-xs es:shadow-accent-950/20'],
		},
		{
			checked: false,
			disabled: true,
			class: ['es:bg-secondary-400'],
		},
		{
			checked: true,
			disabled: true,
			class: ['es:bg-white'],
		},
	],
	defaultVariants: {
		disabled: false,
		checked: false,
		size: 'default',
	},
});

type SwitchSize = NonNullable<VariantProps<typeof outsideClasses>['size']>;

type SwitchProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaSwitch>, 'children' | 'className' | 'isDisabled' | 'isSelected' | 'onChange'> & {
	checked?: boolean;
	onChange?: (value: boolean) => void;
	disabled?: boolean;
	children?: ReactNode;
	className?: string;
	isIndeterminate?: boolean;
	flat?: boolean;
	hidden?: boolean;
	size?: SwitchSize;
};

/**
 * A toggle switch.
 *
 * @component
 * @param {SwitchProps} props - Component props.
 *
 * @returns {JSX.Element} The Switch component.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 *
 * <Switch
 * 	checked={checked}
 * 	onChange={() => setChecked(!checked)}
 * />
 */
export const Switch = (props: SwitchProps) => {
	const { checked, onChange, disabled, id, children, className, isIndeterminate, flat, hidden, size = 'default', ...rest } = props;

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaSwitch
			id={id}
			isDisabled={disabled}
			isSelected={checked ?? false}
			onChange={onChange}
			className='es:group es:flex es:items-center es:justify-between es:gap-2.5 es:any-focus:outline-hidden'
			{...rest}
		>
			{children}

			<div className={clsx(outsideClasses({ checked: checked ?? false, disabled: Boolean(disabled), size }), !flat && !disabled && 'es:shadow-xs es:shadow-black/5', className)}>
				<div
					className={clsx(
						thumbClasses({ checked: checked ?? false, disabled: Boolean(disabled), indeterminate: Boolean(isIndeterminate), size }),
						!flat && !disabled && 'es:shadow-xs es:shadow-black/5',
					)}
				/>
			</div>
		</ReactAriaSwitch>
	);
};
