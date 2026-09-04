import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Children, cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from 'react';
import { Label, Radio, RadioGroup } from 'react-aria-components';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

const radioClasses = cva(
	[
		'es:size-5 es:shrink-0',
		'es:grid es:place-items-center es:grid-cols-1 es:grid-rows-1',
		'es:*:row-start-1 es:*:col-start-1',
		'es:rounded-full',
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
			checked: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{ flat: false, disabled: false, class: 'es:shadow-xs es:shadow-black/5' },
			{
				checked: false,
				disabled: false,
				class: [
					'es:bg-secondary-50 es:inset-ring-secondary-300/60',
					'es:from-black/1 es:to-black/5',
					'es:hover:bg-surface-100 es:hover:inset-ring-surface-300/60',
					'es:inset-shadow-white/50',
					'es:group-focus-visible:inset-ring-accent-500',
				],
			},
			{
				checked: true,
				disabled: false,
				class: [
					'es:bg-accent-600 es:inset-ring-accent-800/5 es:text-white',
					'es:from-accent-50/10 es:to-accent-50/2',
					'es:inset-shadow-accent-50/35',
					'es:group-focus-visible:inset-ring-accent-950',
				],
			},
			{
				checked: true,
				disabled: true,
				class: ['es:bg-secondary-400 es:inset-ring-secondary-400 es:text-white'],
			},
			{
				checked: false,
				disabled: true,
				class: ['es:bg-white es:inset-ring-secondary-300 es:text-secondary-50', 'es:bg-linear-to-b es:from-secondary-800/0 es:to-secondary-800/3'],
			},
		],
		defaultVariants: {
			flat: false,
			checked: false,
			disabled: false,
		},
	},
);

const radioContainerClass = cva('es:flex es:gap-2 es:items-center-safe', {
	variants: {
		design: {
			default: 'es:py-1.5',
			segmented: null,
			segmentedHorizontal: null,
		},
		flat: {
			true: null,
			false: null,
		},
		checked: {
			true: null,
			false: null,
		},
		disabled: {
			true: null,
			false: null,
		},
	},
	compoundVariants: [
		{
			design: ['segmented', 'segmentedHorizontal'],
			class: ['es:px-3 es:py-2 es:w-fill es:inset-ring es:min-h-13', 'es:transition-plus es:duration-300'],
		},
		{
			checked: false,
			design: ['segmented', 'segmentedHorizontal'],
			class: ['es:bg-white es:bg-linear-to-b es:from-secondary-50/75 es:to-secondary-100/50 es:from-25% es:inset-ring-secondary-200/50', 'es:rounded-md es:hover:rounded-18'],
		},
		{
			checked: true,
			design: ['segmented', 'segmentedHorizontal'],
			class: 'es:bg-surface-100 es:text-accent-900 es:inset-ring-accent-600/10 es:rounded-3xl',
		},
		{ design: 'segmented', checked: false, class: 'es:first:rounded-t-2xl es:last:rounded-b-2xl es:before-current:rounded-b-2xl es:after-current:rounded-t-2xl' },
		{ design: 'segmentedHorizontal', checked: false, class: 'es:first:rounded-l-2xl es:last:rounded-r-2xl es:before-current:rounded-r-2xl es:after-current:rounded-l-2xl' },
	],
	defaultVariants: {
		design: 'default',
		flat: false,
		checked: false,
		disabled: false,
	},
});

type RadioButtonGroupOrientation = 'horizontal' | 'vertical';
type RadioButtonGroupDesign = 'default' | 'segmented';
type InternalRadioButtonDesign = NonNullable<VariantProps<typeof radioContainerClass>['design']>;

type RadioButtonProps = Omit<ComponentPropsWithoutRef<typeof Radio>, 'children' | 'className' | 'isDisabled'> & {
	/** The checkbox icon. */
	icon?: ReactNode;
	/** The checkbox label. */
	label?: ReactNode;
	/** The checkbox subtitle. */
	subtitle?: ReactNode;
	/** Whether the checkbox is disabled. */
	disabled?: boolean;
	/** Additional classes to add to the checkbox container. */
	className?: string;
	/** Additional classes to add to the label container. */
	labelClassName?: string;
	/** Whether the label should be aligned to the end. */
	alignEnd?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the subtitle is shown after the label instead of below it. */
	inlineSubtitle?: boolean;
	design?: InternalRadioButtonDesign;
	children?: ReactNode;
};

const RadioButtonComponent = (props: Prettify<RadioButtonProps>) => {
	const { icon, label, subtitle, disabled, className, labelClassName, design = 'default', flat, alignEnd, children, inlineSubtitle, hidden, ...rest } = props;

	if (hidden) {
		return null;
	}

	return (
		<Radio
			isDisabled={disabled}
			className={({ isSelected }) =>
				clsx(radioContainerClass({ design, flat, disabled, checked: isSelected }), className, !flat && design !== 'default' && 'es:shadow-xs es:shadow-black/5')
			}
			{...rest}
		>
			{({ isSelected }) => (
				<>
					{alignEnd && (label || subtitle || icon) ? (
						<RichLabel
							icon={icon}
							label={label}
							subtitle={subtitle}
							className={clsx(subtitle && 'es:mt-1.25', labelClassName)}
							inlineSubtitle={inlineSubtitle}
							fullWidth
							fullSizeSubtitle
							as={Label}
							noColor
						/>
					) : null}

					<div className={radioClasses({ disabled, flat: design !== 'default' ? true : flat, checked: isSelected })}>
						<AnimatedVisibility
							transition='scaleFade'
							visible={isSelected}
							className={clsx('es:icon:size-3 es:icon:stroke-2', disabled && 'es:opacity-55')}
							noInitial
						>
							<div className={clsx('es:size-2 es:rounded-full es:bg-accent-50', !disabled && 'es:shadow-xs es:shadow-accent-950/30')} />
						</AnimatedVisibility>
					</div>

					{!alignEnd ? (
						<RichLabel
							icon={alignEnd && icon}
							label={label}
							subtitle={subtitle}
							className={clsx(labelClassName, disabled && 'es:text-secondary-300')}
							inlineSubtitle={inlineSubtitle}
							fullSizeSubtitle
							as={Label}
							noColor
						/>
					) : null}

					{!(icon || label || subtitle) ? children : null}
				</>
			)}
		</Radio>
	);
};

/**
 * A simple radio button.
 *
 * @component
 * @param {RadioButtonProps} props - Component props.
 *
 * @returns {JSX.Element} The RadioButton component.
 *
 * @see {@link RadioButtonGroup} for usage example.
 */
export const RadioButton = Object.assign(RadioButtonComponent, {
	displayName: 'RadioButton',
});

type RadioButtonChildElement = ReactElement<RadioButtonProps> & { type: { displayName?: string } };

type RadioButtonGroupProps = Omit<ComponentPropsWithoutRef<typeof RadioGroup>, 'children' | 'className' | 'isDisabled' | 'isReadOnly' | 'value' | 'onChange' | 'orientation'> & {
	/** Icon to show before the label. */
	icon?: ReactNode;
	/** Label to show above the control. */
	label?: ReactNode;
	/** Help text displayed below the control. */
	help?: ReactNode;
	/** Actions to show to the right of the label. */
	actions?: ReactNode;
	/** Subtitle to show below the label. */
	subtitle?: ReactNode;
	/** Orientation of the radio buttons. Defaults to `vertical`. */
	orientation?: RadioButtonGroupOrientation;
	/** Design of the radio buttons. Defaults to `default`. */
	design?: RadioButtonGroupDesign;
	/** Whether the radio button group is disabled. */
	disabled?: boolean;
	/** Whether the radio button group is read-only. */
	readOnly?: boolean;
	/** Value of the currently selected radio button. */
	value?: string;
	/** Function to call when the value of the selected radio button changes. */
	onChange?: (value: string) => void;
	/** Additional classes to add to the group container. */
	className?: string;
	/** Additional classes to add to the label container. */
	labelClassName?: string;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	children?: ReactNode;
};

/**
 * A group of radio buttons.
 * This component is required to control radio buttons.
 *
 * Each radio button should have a `value` set.
 *
 * @component
 * @param {RadioButtonGroupProps} props - Component props.
 *
 * @returns {JSX.Element} The RadioButtonGroup component.
 *
 * @example
 * const [value, setValue] = useState('first');
 *
 * <RadioButtonGroup
 * 	label='My radio buttons'
 * 	value={value}
 * 	onChange={setValue}
 * >
 * 	<RadioButton value='first' label='First option' />
 * 	<RadioButton value='second' label='Second option' />
 * </RadioButtonGroup>
 */
export const RadioButtonGroup = (props: Prettify<RadioButtonGroupProps>) => {
	const {
		icon,
		help,
		label,
		actions,
		subtitle,
		orientation = 'vertical',
		design = 'default',
		disabled,
		readOnly,
		value,
		onChange,
		children,
		flat,
		className,
		labelClassName,
		hidden,
		...rest
	} = props;

	if (hidden) {
		return null;
	}

	const mappedChildren = Children.toArray(children).map((child, index) => {
		// SAFETY: React component types may expose the displayName assigned to RadioButton.
		if (!isValidElement(child) || (child.type as { displayName?: string })?.displayName !== 'RadioButton') {
			return child;
		}

		// SAFETY: A child identified as RadioButton accepts the cloned group presentation props.
		const radioChild = child as RadioButtonChildElement;

		return cloneElement(radioChild, {
			flat,
			design: orientation === 'horizontal' ? 'segmentedHorizontal' : design,
			key: radioChild.props.value ?? radioChild.key ?? index,
		});
	});

	return (
		<RadioGroup
			className={clsx('es:w-fill', className)}
			isDisabled={disabled}
			isReadOnly={readOnly}
			onChange={onChange}
			value={value}
			orientation={orientation}
			{...rest}
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				actions={actions}
				help={help}
				labelAs={Label}
				className={labelClassName}
			>
				<div className={clsx(orientation === 'horizontal' && 'es:flex es:items-stretch es:gap-0.75', orientation === 'vertical' && 'es:flex es:flex-col es:gap-0.75')}>
					{mappedChildren}
				</div>
			</BaseControl>
		</RadioGroup>
	);
};
