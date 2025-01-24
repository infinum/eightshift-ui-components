import { cloneElement, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Group, Input, Label, NumberField } from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { BaseControl } from '../base-control/base-control';

/**
 * A number picker component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} props.value - The current value of the number picker.
 * @param {Function} props.onChange - Function to run when the value changes.
 * @param {number} [props.min=0] - The minimum value of the number picker.
 * @param {number} [props.max] - The maximum value of the number picker.
 * @param {number} [props.step=1] - The step value of the number picker.
 * @param {string} [props.label] - The label of the number picker.
 * @param {JSX.Element} [props.icon] - Icon to display within the number picker.
 * @param {string} [props.subtitle] - The subtitle of the number picker.
 * @param {string} [props.help] - The help text shown below the number picker.
 * @param {boolean} [props.readOnly] - If `true`, the number picker is read-only.
 * @param {boolean} [props.disabled] - If `true`, the number picker is disabled.
 * @param {string} [props.placeholder] - Placeholder text to display in the number picker.
 * @param {JSX.Element} [props.prefix] - Element to display to the left of the number picker.
 * @param {JSX.Element} [props.suffix] - Element to display to the right of the number picker.
 * @param {number} [props.fixedWidth] - If passed, sets the width of the input field to the provided number of characters. Useful if you have e.g. value from 1 to 1000, but you don't want the input field to change size when on lower values.
 * @param {boolean} [props.inline] - If `true`, the number picker is displayed inline.
 * @param {boolean} [props.noScrollToChange=false] - If `true`, the number picker does not change value when scrolling.
 * @param {NumberPickerSize} [props.size='default'] - Determines the input field size.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The NumberPicker component.
 *
 * @typedef {'compact' | 'small' | 'default'} NumberPickerSize
 *
 * @example
 * <NumberPicker
 * 	value={value}
 * 	onChange={setValue}
 * />
 *
 * @preserve
 */
export const NumberPicker = ({
	value,
	onChange,
	min = 0,
	max,
	step = 1,
	label,
	icon,
	subtitle,
	help,
	readOnly,
	disabled,
	placeholder,
	prefix,
	fixedWidth = null,
	suffix,
	children,
	inline,
	noScrollToChange = false,
	size = 'default',
	'aria-label': ariaLabel,
	hidden,
	...props
}) => {
	const [isInputFocused, setIsInputFocused] = useState(false);

	if (hidden) {
		return null;
	}

	const sizes = {
		compact: {
			field: 'es-uic-min-h-5',
			noPrefixPadding: 'es-uic-pl-1.5',
			extraContentSeparator: 'es-uic-h-[1.875rem]',
		},
		small: {
			field: 'es-uic-min-h-9',
			noPrefixPadding: 'es-uic-pl-2',
			extraContentSeparator: 'es-uic-h-[2.125rem]',
		},
		default: {
			field: 'es-uic-min-h-10',
			noPrefixPadding: 'es-uic-pl-2',
			extraContentSeparator: 'es-uic-h-[2.375rem]',
		},
	};

	return (
		<NumberField
			value={value}
			onChange={onChange}
			isDisabled={disabled}
			isReadOnly={readOnly}
			minValue={min}
			maxValue={max}
			step={step}
			isWheelDisabled={noScrollToChange}
			{...props}
		>
			<BaseControl
				labelAs={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				help={help}
				inline={inline}
				className='text-sm'
			>
				<Group
					className={clsx(
						'es-uic-flex es-uic-w-fit es-uic-items-center es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-pl-1 es-uic-pr-0.5 es-uic-shadow-sm es-uic-transition',
						isInputFocused && 'es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500/50',
						!prefix && (sizes?.[size]?.noPrefixPadding ?? sizes.default.noPrefixPadding),
						sizes?.[size]?.field ?? sizes.default.field,
					)}
				>
					{prefix && (
						<span
							slot='prefix'
							className='es-uic-col-start-1 es-uic-row-span-2 es-uic-mr-0.5 es-uic-select-none es-uic-self-center es-uic-text-xs es-uic-text-gray-500'
						>
							{prefix}
						</span>
					)}
					<Input
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
						className='es-uic-col-start-2 es-uic-row-span-2 !es-uic-border-none es-uic-bg-transparent !es-uic-px-0 !es-uic-py-1 es-uic-text-sm es-uic-tabular-nums !es-uic-shadow-none !es-uic-outline-none selection:es-uic-bg-teal-500/20 selection:es-uic-text-teal-950 focus:!es-uic-shadow-none focus:es-uic-outline-none'
						placeholder={placeholder}
						style={{
							width: fixedWidth ? `${fixedWidth}ch` : `calc(${min < 0 ? '0.75ch + ' : ''}${(max ?? 1000)?.toString()?.length} * 1ch)`,
						}}
						aria-label={ariaLabel ?? __('Enter a number', 'eightshift-ui-components')}
					/>
					{suffix && (
						<span
							slot='suffix'
							className='es-uic-col-start-3 es-uic-row-span-2 es-uic-select-none es-uic-self-center es-uic-text-xs es-uic-text-gray-500'
						>
							{suffix}
						</span>
					)}
					<div>
						<Button
							type='ghost'
							className='es-uic-col-start-4 !es-uic-h-3 !es-uic-w-5 !es-uic-rounded !es-uic-text-gray-500 disabled:!es-uic-text-gray-300 [&>svg]:es-uic-size-[0.8rem]'
							slot='increment'
							icon={icons.caretUpFill}
						/>
						<Button
							type='ghost'
							className='es-uic-col-start-4 !es-uic-h-3 !es-uic-w-5 !es-uic-rounded !es-uic-text-gray-500 disabled:!es-uic-text-gray-300 [&>svg]:es-uic-size-[0.8rem]'
							slot='decrement'
							icon={icons.caretDownFill}
						/>
					</div>

					{children && (
						<>
							<div className={clsx('es-uic-w-px es-uic-bg-gray-300', sizes?.[size]?.extraContentSeparator ?? sizes.default.extraContentSeparator)} />
							<div className='es-uic-p-0.5 es-uic-pr-0'>
								{Array.isArray(children) ? children.map((child) => cloneElement(child, { slot: null })) : cloneElement(children, { slot: null })}
							</div>
						</>
					)}
				</Group>
			</BaseControl>
		</NumberField>
	);
};
