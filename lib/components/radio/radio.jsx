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

		hidden,

		...rest
	} = props;

	if (hidden) {
		return null;
	}

	const styleClassName = {
		segmented: clsx(
			'es-uic-py-1 es-uic-px-1.5 es-uic-border hover:es-uic-bg-gray-50 es-uic-transition es-uic-min-h-10',
			'first:es-uic-rounded-t-lg last:es-uic-rounded-b-lg',
			'focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50 focus-visible:es-uic-z-10',
		),
		segmentedHorizontal: clsx(
			'es-uic-py-1 es-uic-px-1.5 es-uic-border hover:es-uic-bg-gray-50 es-uic-transition es-uic-grow es-uic-min-h-10',
			'first:es-uic-rounded-l-lg last:es-uic-rounded-r-lg',
			'focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50 focus-visible:es-uic-z-10',
		),
	};

	return (
		<Radio
			isDisabled={disabled}
			className={clsx(
				'es-uic-flex es-uic-items-center es-uic-gap-1.5 es-uic-text-sm',
				styleClassName[design],
				className,
			)}
			{...rest}
		>
			{({ isSelected, isFocusVisible }) => (
				<>
					{alignEnd && (label || subtitle || icon) && (
						<RichLabel
							icon={icon}
							label={label}
							subtitle={subtitle}
							className={labelClassName}
							fullWidth
						/>
					)}
					<div
						className={clsx(
							'es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded-full es-uic-border es-uic-text-gray-600 es-uic-shadow-sm es-uic-transition',
							isSelected ? 'es-uic-border-teal-600 es-uic-bg-teal-600 es-uic-text-white' : 'es-uic-border-gray-300',
							!design?.startsWith('segmented') &&
								isFocusVisible &&
								'es-uic-ring es-uic-ring-teal-500 es-uic-ring-opacity-50',
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
					{!alignEnd && (
						<RichLabel
							icon={icon}
							label={label}
							subtitle={subtitle}
							className={clsx(labelClassName, '[&_>_span_>_svg]:!es-uic-size-5')}
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
			className={clsx('es-uic-w-full', className)}
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
						design === 'default' && orientation === 'horizontal' && 'es-uic-flex es-uic-flex-wrap es-uic-gap-2.5',
						design === 'default' && orientation === 'vertical' && 'es-uic-flex es-uic-flex-col es-uic-gap-2.5',
						design === 'segmented' && orientation === 'vertical' && 'es-uic-flex es-uic-flex-col -es-uic-space-y-px',
						design === 'segmented' && orientation === 'horizontal' && 'es-uic-nowrap es-uic-flex -es-uic-space-x-px',
					)}
				>
					{mappedChildren}
				</div>
			</BaseControl>
		</RadioGroup>
	);
};
