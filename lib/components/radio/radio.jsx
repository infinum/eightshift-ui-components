import { Label, Radio, RadioGroup } from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { IconLabel } from '../icon-label/icon-label';
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
		...other
	} = props;

	const styles = {
		segmented: classnames(
			'es-uic-py-1 es-uic-px-1.5 es-uic-border hover:es-uic-bg-gray-50 es-uic-transition',
			'first:es-uic-rounded-t-lg last:es-uic-rounded-b-lg',
			'focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50 focus-visible:es-uic-z-10',
		),
		segmentedHorizontal: classnames(
			'es-uic-py-1 es-uic-px-1.5 es-uic-border hover:es-uic-bg-gray-50 es-uic-transition es-uic-grow',
			'first:es-uic-rounded-l-lg last:es-uic-rounded-r-lg',
			'focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50 focus-visible:es-uic-z-10',
		),
	};

	return (
		<Radio
			isDisabled={disabled}
			className={classnames(
				'es-uic-flex es-uic-items-center es-uic-gap-1.5 es-uic-text-sm',
				styles[design],
				className,
			)}
			{...other}
		>
			{({ isSelected }) => (
				<>
					{(icon || alignEnd) && (label || subtitle) && (
						<IconLabel
							icon={icon}
							label={label}
							subtitle={subtitle}
							className={labelClassName}
							fullWidth
						/>
					)}
					<div
						className={classnames(
							'es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded-full es-uic-border es-uic-text-gray-600 es-uic-shadow-sm es-uic-transition',
							isSelected
								? 'es-uic-border-teal-600 es-uic-bg-teal-600 es-uic-text-white'
								: 'es-uic-border-gray-300',
						)}
					>
						<AnimatedVisibility
							transition='scaleFade'
							visible={isSelected}
							className='[&>svg]:es-uic-size-3 [&>svg]:es-uic-stroke-2'
							noInitial
						>
							<div className='es-uic-size-2.5 es-uic-rounded-full es-uic-bg-white es-uic-shadow-sm' />
						</AnimatedVisibility>
					</div>
					{!icon && !alignEnd && (label || subtitle) && (
						<IconLabel
							label={label}
							subtitle={subtitle}
							className={labelClassName}
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
 * @param {JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.subtitle] - Subtitle to show below the label.
 * @param {RadioButtonGroupOrientation} [props.orientation='vertical'] - Orientation of the radio buttons.
 * @param {RadioButtonGroupDesign} [props.design='default'] - Design of the radio buttons.
 * @param {boolean} [props.disabled] - Whether the radio button group is disabled.
 * @param {boolean} [props.readOnly] - Whether the radio button group is read-only.
 * @param {string} [props.value] - Value of the currently selected radio button.
 * @param {Function} [props.onChange] - Function to call when the value of the selected radio button changes.
 * @param {string} [props.className] - Additional classes to add to the group container.
 * @param {string} [props.labelClassName] - Additional classes to add to the label container.
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

		...other
	} = props;

	let mappedChildren = children ?? [];

	if (!Array.isArray(children)) {
		mappedChildren = [children];
	}

	mappedChildren = children.map((child) => {
		if (child.type.displayName !== 'RadioButton') {
			return child;
		}

		return cloneElement(child, {
			design: orientation === 'horizontal' ? `${design}Horizontal` : design,
		});
	});

	return (
		<RadioGroup
			className={classnames('es-uic-w-full', className)}
			isDisabled={disabled}
			isReadOnly={readOnly}
			onChange={onChange}
			value={value}
			orientation={orientation}
			{...other}
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				actions={actions}
				help={help}
				labelAs={Label}
				className={labelClassName}
				controlContainerClassName={classnames(
					orientation === 'horizontal' &&
						'es-uic-flex es-uic-flex-wrap !es-uic-space-y-0 es-uic-gap-2.5',
						design === 'segmented' && orientation ==='vertical' && '!-es-uic-space-y-px',
						design === 'segmented' && orientation ==='horizontal' && '!es-uic-gap-0 !es-uic-nowrap -es-uic-space-x-px',
				)}
			>
				{mappedChildren}
			</BaseControl>
		</RadioGroup>
	);
};
