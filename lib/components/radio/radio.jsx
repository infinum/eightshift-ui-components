import { Label, Radio, RadioGroup } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { RichLabel } from '../rich-label/rich-label';
import { BaseControl } from '../base-control/base-control';
import { cloneElement } from 'react';

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

		alignEnd,

		children,

		inlineSubtitle,

		hidden,

		...rest
	} = props;

	if (hidden) {
		return null;
	}

	const styleClassName = {
		segmented: clsx(
			'es:cursor-pointer es:py-1 es:px-1.5 es:border es:border-secondary-300 es:hover:bg-secondary-100/75 es:transition es:min-h-10',
			'es:first:rounded-t-xl es:last:rounded-b-xl',
			'es:focus-visible:ring-2 es:focus-visible:border-accent-500 es:focus-visible:ring-accent-500/50 es:focus-visible:z-10',
			'es:shadow-sm es:inset-ring es:inset-shadow-xs',
			'es:inset-ring-secondary-100 es:inset-shadow-secondary-100/50',
		),
		segmentedHorizontal: clsx(
			'es:cursor-pointer es:py-1 es:px-1.5 es:border es:border-secondary-300 es:hover:bg-secondary-100/75 es:transition es:grow es:min-h-10',
			'es:first:rounded-l-xl es:last:rounded-r-xl',
			'es:focus-visible:ring-2 es:focus-visible:border-accent-500 es:focus-visible:ring-accent-500/50 es:focus-visible:z-10',
			'es:shadow-sm es:inset-ring es:inset-shadow-xs',
			'es:inset-ring-secondary-100 es:inset-shadow-secondary-100/50',
		),
	};

	return (
		<Radio
			isDisabled={disabled}
			className={clsx('es:group es:flex es:items-center es:gap-1.5 es:text-sm', styleClassName[design], className)}
			{...rest}
		>
			{({ isSelected }) => (
				<>
					{alignEnd && (label || subtitle || icon) && (
						<RichLabel
							icon={icon}
							label={label}
							subtitle={subtitle}
							className={clsx('es:ml-1', labelClassName)}
							inlineSubtitle={inlineSubtitle}
							fullWidth
							fullSizeSubtitle
							as={Label}
						/>
					)}
					<div
						className={clsx(
							'es:size-5 es:flex es:items-center es:justify-center',
							'es:transition es:cursor-pointer',
							'es:bg-radial es:border es:rounded-full',
							'es:shadow-sm es:inset-ring es:inset-shadow-xs',
							'es:any-focus:outline-hidden',
							!isSelected && 'es:border-secondary-300 es:inset-ring-secondary-100 es:inset-shadow-secondary-100/50',
							!isSelected && 'es:from-secondary-50 es:to-white es:text-secondary-600 es:hover:text-accent-950',
							!isSelected && 'es:hover:inset-shadow-secondary-100 es:hover:to-secondary-100 es:hover:inset-ring-secondary-100',
							isSelected && 'es:text-white es:from-accent-500 es:to-accent-600',
							isSelected && 'es:shadow-accent-600/30 es:border-accent-700 es:inset-ring es:inset-ring-accent-600 es:inset-shadow-accent-400/75',
							isSelected && 'es:group-focus-visible:inset-ring-accent-600 es:group-focus-visible:inset-shadow-xs es:group-focus-visible:inset-shadow-accent-400',
							!design?.startsWith('segmented') && 'es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/50',
							!design?.startsWith('segmented') && !isSelected && 'es:group-focus-visible:border-accent-500',
							!design?.startsWith('segmented') && !alignEnd && subtitle && 'es:mb-auto',
						)}
					>
						<AnimatedVisibility
							transition='scaleFade'
							visible={isSelected}
							className={clsx('es:icon:size-3 es:icon:stroke-2', disabled && 'es:opacity-55')}
							noInitial
						>
							<div className='es:size-2 es:rounded-full es:bg-white es:shadow-sm' />
						</AnimatedVisibility>
					</div>
					{!alignEnd && (
						<RichLabel
							icon={alignEnd && icon}
							label={label}
							subtitle={subtitle}
							className={clsx(labelClassName, subtitle && 'es:mt-0.5', 'es:[&_>_span_>_svg]:size-5 es:ml-0.5 es:*:space-y-0.5', disabled && 'es:opacity-55')}
							inlineSubtitle={inlineSubtitle}
							fullSizeSubtitle
							as={Label}
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
				<div
					className={clsx(
						design === 'default' && orientation === 'horizontal' && 'es:flex es:flex-wrap es:gap-2.5',
						design === 'default' && orientation === 'vertical' && 'es:flex es:flex-col es:gap-2.5',
						design === 'segmented' && orientation === 'vertical' && 'es:flex es:flex-col es:-space-y-px',
						design === 'segmented' && orientation === 'horizontal' && 'es:nowrap es:flex es:-space-x-px',
					)}
				>
					{mappedChildren}
				</div>
			</BaseControl>
		</RadioGroup>
	);
};
