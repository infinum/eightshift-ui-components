import { Label, Radio, RadioGroup } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { RichLabel } from '../rich-label/rich-label';
import { BaseControl } from '../base-control/base-control';
import { cloneElement } from 'react';
import { cva } from 'class-variance-authority';

/**
 * A simple radio button.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - The checkbox icon.
 * @param {string} [props.label] - The checkbox label.
 * @param {string} [props.subtitle] - The checkbox subtitle.
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled.
 * @param {string} [props.className] - Additional classes to add to the checkbox container.
 * @param {string} [props.labelClassName] - Additional classes to add to the label container.
 * @param {boolean} [props.alignEnd] - Whether the label should be aligned to the end.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.inlineSubtitle] - If `true`, the subtitle is shown after the label instead of below it.
 *
 * @returns {JSX.Element} The RadioButton component.
 *
 * @see {@link RadioButtonGroup} for usage example.
 *
 * @preserve
 */
export const RadioButton = (props) => {
	const {
		icon,
		label,
		subtitle,

		disabled,

		className,
		labelClassName,

		design = 'default',
		flat,

		alignEnd,

		children,

		inlineSubtitle,

		hidden,

		...rest
	} = props;

	if (hidden) {
		return null;
	}

	const radioClasses = cva(
		[
			'es:size-5',
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
			},
			compoundVariants: [
				{ flat: false, disabled: false, class: 'es:shadow-xs es:shadow-black/5' },
				//
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
				//
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

	const radioContainerClass = cva(['es:flex es:gap-2 es:items-center-safe', className], {
		variants: {
			design: {
				default: 'es:py-1.5',
			},
		},
		compoundVariants: [
			{
				design: ['segmented', 'segmentedHorizontal'],
				class: ['es:px-3 es:py-2 es:w-fill es:inset-ring', 'es:transition-plus es:duration-300 es:ease-spring-snappy', !flat && 'es:shadow-xs es:shadow-black/5'],
			},
			{
				checked: false,
				design: ['segmented', 'segmentedHorizontal'],
				class: 'es:bg-secondary-50 es:inset-ring-secondary-200/50 es:rounded-md es:hover:rounded-xl',
			},
			{
				checked: true,
				design: ['segmented', 'segmentedHorizontal'],
				class: 'es:bg-surface-100 es:text-accent-900 es:inset-ring-accent-600/10 es:rounded-3xl',
			},
			//
			{ design: 'segmented', checked: false, class: 'es:first:rounded-t-xl es:last:rounded-b-xl es:before-current:rounded-b-xl es:after-current:rounded-t-xl' },
			{ design: 'segmentedHorizontal', checked: false, class: 'es:first:rounded-l-xl es:last:rounded-r-xl es:before-current:rounded-l-xl es:after-current:rounded-r-xl' },
		],
		defaultVariants: {
			design: 'default',
			flat: false,
			checked: false,
			disabled: false,
		},
	});

	return (
		<Radio
			isDisabled={disabled}
			className={({ isSelected }) => radioContainerClass({ design, flat, disabled, checked: isSelected })}
			{...rest}
		>
			{({ isSelected }) => (
				<>
					{alignEnd && (label || subtitle || icon) && (
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
					)}

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

					{!alignEnd && (
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
					)}

					{!(icon || label || subtitle) && children}
				</>
			)}
		</Radio>
	);
};

RadioButton.displayName = 'RadioButton';

/**
 * A group of radio buttons.
 * This component is required to control radio buttons.
 *
 * Each radio button should have a `value` set!
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to show before the label.
 * @param {string} [props.label] - Label to show above the control.
 * @param {string} [props.help] - Help text displayed below the control.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.subtitle] - Subtitle to show below the label.
 * @param {RadioButtonGroupOrientation} [props.orientation='vertical'] - Orientation of the radio buttons.
 * @param {RadioButtonGroupDesign} [props.design='default'] - Design of the radio buttons.
 * @param {boolean} [props.disabled] - Whether the radio button group is disabled.
 * @param {boolean} [props.readOnly] - Whether the radio button group is read-only.
 * @param {string} [props.value] - Value of the currently selected radio button.
 * @param {Function} [props.onChange] - Function to call when the value of the selected radio button changes.
 * @param {string} [props.className] - Additional classes to add to the group container.
 * @param {string} [props.labelClassName] - Additional classes to add to the label container.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The RadioButtonGroup component.
 *
 * @typedef {'horizontal' | 'vertical'} RadioButtonGroupOrientation
 * @typedef {'default' | 'segmented'} RadioButtonGroupDesign
 *
 * @example
 * const [value, setValue] = useState('first'); // Or "null" if you don't want anything selected by default.
 *
 * <RadioButtonGroup
 * 	label='My radio buttons'
 * 	value={value}
 * 	onChange={setValue}
 * >
 * 	<RadioButton value='first' label='First option' />
 * 	<RadioButton value='second' label='Second option' />
 * </RadioButtonGroup>
 *
 * @preserve
 */
export const RadioButtonGroup = (props) => {
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

	let mappedChildren = children ?? [];

	if (!Array.isArray(children)) {
		mappedChildren = [children];
	}

	mappedChildren = children.map((child, index) => {
		if (child.type.displayName !== 'RadioButton') {
			return child;
		}

		return cloneElement(child, {
			flat,
			design: orientation === 'horizontal' ? `${design}Horizontal` : design,
			key: child.props.value ?? index,
		});
	});

	return (
		<RadioGroup
			className={clsx('es:w-full', className)}
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
