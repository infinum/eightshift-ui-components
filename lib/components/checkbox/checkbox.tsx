import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Checkbox as ReactAriaCheckbox, Label } from 'react-aria-components';
import { check } from '../../icons/internal';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

const checkboxClasses = cva(
	[
		'es:size-5 es:shrink-0',
		'es:grid es:place-items-center es:grid-cols-1 es:grid-rows-1',
		'es:*:row-start-1 es:*:col-start-1',
		'es:rounded-sm',
		'es:transition-plus es:duration-300 es:ease-spring-smooth',
		'es:inset-ring',
		'es:any-focus:outline-hidden',
		'es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/30',
	],
	{
		variants: {
			disabled: {
				true: 'es:cursor-not-allowed',
				false: 'es:inset-shadow-xs es:bg-linear-to-b es:from-25%',
			},
			flat: {
				true: null,
				false: null,
			},
			active: {
				true: null,
				false: null,
			},
			indeterminate: {
				true: null,
				false: null,
			},
			checked: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{ flat: false, disabled: false, class: 'es:shadow-xs es:shadow-black/5' },
			{
				active: false,
				disabled: false,
				class: [
					'es:bg-secondary-50 es:inset-ring-secondary-300/80',
					'es:from-black/1 es:to-black/5',
					'es:hover:bg-surface-100 es:hover:inset-ring-surface-300/60',
					'es:inset-shadow-white/50',
					'es:group-focus-visible:inset-ring-accent-500',
				],
			},
			{
				active: true,
				disabled: false,
				class: [
					'es:bg-accent-600 es:inset-ring-accent-800/5 es:text-white',
					'es:from-accent-50/10 es:to-accent-50/2',
					'es:inset-shadow-accent-50/35',
					'es:group-focus-visible:inset-ring-accent-950',
				],
			},
			{
				active: true,
				disabled: true,
				class: ['es:bg-secondary-400 es:inset-ring-secondary-400 es:text-white'],
			},
			{
				active: false,
				disabled: true,
				class: ['es:bg-white es:inset-ring-secondary-300 es:text-secondary-50', 'es:bg-linear-to-b es:from-secondary-800/0 es:to-secondary-800/3'],
			},
		],
		defaultVariants: {
			flat: false,
			active: false,
			indeterminate: false,
			checked: false,
			disabled: false,
		},
	},
);

type CheckboxProps = Omit<
	ComponentPropsWithoutRef<typeof ReactAriaCheckbox>,
	'children' | 'className' | 'isDisabled' | 'isReadOnly' | 'isIndeterminate' | 'isSelected' | 'onChange'
> & {
	icon?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	checked?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	indeterminate?: boolean;
	onChange?: (value: boolean) => void;
	className?: string;
	labelClassName?: string;
	alignEnd?: boolean;
	inlineSubtitle?: boolean;
	flat?: boolean;
	hidden?: boolean;
	children?: ReactNode;
};

/**
 * A simple checkbox.
 *
 * @component
 * @param {CheckboxProps} props - Component props.
 *
 * @returns {JSX.Element} The Checkbox component.
 *
 * @example
 * <Checkbox
 * 	label='My label'
 * 	checked={myValue}
 * 	onChange={(value) => setMyValue(value)}
 * />
 */
export const Checkbox = (props: Prettify<CheckboxProps>) => {
	const { icon, label, subtitle, checked, disabled, readOnly, indeterminate, onChange, className, labelClassName, inlineSubtitle, flat, alignEnd, children, hidden, ...other } =
		props;

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaCheckbox
			isDisabled={disabled}
			isIndeterminate={indeterminate}
			isReadOnly={readOnly}
			isSelected={checked ?? false}
			onChange={onChange}
			className={clsx('es:group es:flex es:w-fill es:items-center es:gap-2', className)}
			{...other}
		>
			{!alignEnd && (label || subtitle) && (
				<RichLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={labelClassName}
					inlineSubtitle={inlineSubtitle}
					fullSizeSubtitle
					fullWidth
					as={Label}
					noColor
				/>
			)}
			<div
				className={checkboxClasses({
					active: checked || indeterminate,
					indeterminate,
					checked,
					disabled,
					flat,
				})}
			>
				<AnimatedVisibility
					transition='scaleRotateFade'
					visible={Boolean(indeterminate)}
					className='es:transition-none'
				>
					<div className={clsx('es:h-0.5 es:w-3 es:rounded-full es:bg-white', !disabled && 'es:shadow-xs es:shadow-accent-950/30')} />
				</AnimatedVisibility>

				<AnimatedVisibility
					transition='scaleRotateFade'
					visible={!indeterminate && Boolean(checked)}
					className={clsx('es:transition-none es:icon:size-3.5 es:icon:stroke-[2.5]', !disabled && 'es:icon:drop-shadow-xs es:icon:drop-shadow-accent-950/30')}
					noInitial
				>
					{check}
				</AnimatedVisibility>
			</div>

			{alignEnd && (label || subtitle) && (
				<RichLabel
					label={label}
					subtitle={subtitle}
					className={clsx(subtitle && 'es:mt-1.25', labelClassName)}
					inlineSubtitle={inlineSubtitle}
					fullSizeSubtitle
					as={Label}
					noColor
				/>
			)}

			{!(icon || label || subtitle) && children}
		</ReactAriaCheckbox>
	);
};
