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
			field: 'es:min-h-5',
			noPrefixPadding: 'es:pl-1.5',
			extraContentSeparator: 'es:h-[1.875rem]',
		},
		small: {
			field: 'es:min-h-9',
			noPrefixPadding: 'es:pl-2',
			extraContentSeparator: 'es:h-[2.125rem]',
		},
		default: {
			field: 'es:min-h-10',
			noPrefixPadding: 'es:pl-2',
			extraContentSeparator: 'es:h-[2.375rem]',
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
				className='es:text-sm'
			>
				<Group
					className={clsx(
						'es:group es:flex es:w-fit es:items-center es:rounded-lg es:border es:border-secondary-300 es:pl-1 es:pr-0.5 es:shadow-xs es:transition',
						'es:inset-ring es:inset-ring-secondary-100',
						isInputFocused && 'es:outline-hidden es:focus-visible:border-accent-500 es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						!prefix && (sizes?.[size]?.noPrefixPadding ?? sizes.default.noPrefixPadding),
						sizes?.[size]?.field ?? sizes.default.field,
						'es:disabled:shadow-none es:disabled:border-secondary-200 es:disabled:bg-secondary-50 es:disabled:text-secondary-500 es:disabled:cursor-default es:readonly:bg-secondary-50',
					)}
				>
					{prefix && (
						<span
							slot='prefix'
							className='es:col-start-1 es:row-span-2 es:mr-0.5 es:select-none es:self-center es:text-sm es:text-secondary-400'
						>
							{prefix}
						</span>
					)}
					<Input
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
						className='es:col-start-2 es:row-span-2 es:border-none! es:bg-transparent es:px-0! es:py-1! es:text-sm es:tabular-nums es:shadow-none! es:outline-hidden! es:selection:bg-accent-500/20 es:selection:text-accent-950 es:focus:shadow-none! es:any-focus:outline-hidden'
						placeholder={placeholder}
						style={{
							width: fixedWidth ? `${fixedWidth}ch` : `calc(${min < 0 ? '0.75ch + ' : ''}${(max ?? 1000)?.toString()?.length} * 1ch)`,
						}}
						aria-label={ariaLabel ?? __('Enter a number', 'eightshift-ui-components')}
					/>

					<div className={clsx('es:opacity-0 es:group-hover:opacity-100 es:group-focus-visible:opacity-100 es:transition-opacity', disabled && 'es:invisible')}>
						<Button
							type='ghost'
							className='es:col-start-4 es:h-3 es:w-4 es:text-secondary-500! es:disabled:text-secondary-300! es:icon:size-[0.8rem]'
							slot='increment'
							icon={icons.caretUpFill}
						/>
						<Button
							type='ghost'
							className='es:col-start-4 es:h-3 es:w-4 es:text-secondary-500! es:disabled:text-secondary-300! es:icon:size-[0.8rem]'
							slot='decrement'
							icon={icons.caretDownFill}
						/>
					</div>

					{suffix && (
						<span
							slot='suffix'
							className='es:col-start-3 es:row-span-2 es:select-none es:self-center es:text-sm es:text-secondary-400 es:mr-0.5'
						>
							{suffix}
						</span>
					)}

					{children && (
						<>
							<div className={clsx('es:w-px es:bg-secondary-300', sizes?.[size]?.extraContentSeparator ?? sizes.default.extraContentSeparator)} />
							<div className='es:p-0.5 es:pr-0'>
								{Array.isArray(children) ? children.map((child) => cloneElement(child, { slot: null })) : cloneElement(children, { slot: null })}
							</div>
						</>
					)}
				</Group>
			</BaseControl>
		</NumberField>
	);
};
