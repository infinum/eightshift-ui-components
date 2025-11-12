import { cloneElement } from 'react';
import { __ } from '@wordpress/i18n';
import { Group, Input, Label, NumberField } from 'react-aria-components';
import { Button, ButtonGroup } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { BaseControl } from '../base-control/base-control';
import { cva } from 'class-variance-authority';

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
 * @param {InputSize} [props.size='default'] - Determines the input field size.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The NumberPicker component.
 *
 * @typedef {'small' | 'medium' | 'default' | 'large'} InputSize
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
	flat,
	className,
	hidden,
	...props
}) => {
	if (hidden) {
		return null;
	}

	const inputClass = cva(
		[
			'es:group',
			'es:overflow-clip',
			'es:flex es:items-center',
			'es:leading-none',
			'es:w-fit',
			'es:rounded-lg es:focus-within:rounded-xl',
			'es:transition-plus',
			'es:inset-ring',
			'es:focus-visible-within:ring-2 es:focus-visible-within:ring-accent-500/30',
			'es:focus-visible-within:text-accent-950 es:focus-visible-within:inset-ring-accent-500',
			'es:focus:placeholder:text-surface-400',
			'es:text-13',
			className,
		],
		{
			variants: {
				size: {
					small: ['es:min-h-8', 'es:px-2.5 es:py-1'],
					medium: ['es:min-h-9', 'es:px-3 es:py-1'],
					default: ['es:min-h-10', 'es:px-3 es:py-1.5'],
					large: ['es:min-h-12', 'es:px-4 es:py-1.5'],
				},
				disabled: {
					false: 'es:selection:bg-surface-100 es:selection:text-accent-800',
					true: 'es:selection:bg-secondary-200 es:selection:text-secondary-600',
				},
			},
			compoundVariants: [
				{
					flat: false,
					disabled: false,
					readOnly: false,
					class: [
						'es:bg-white',
						'es:bg-linear-to-b es:from-secondary-100/0 es:to-secondary-100/50 es:from-25%',
						'es:hover:from-surface-100/0 es:hover:to-surface-100/50',
						'es:inset-ring-secondary-400/50 es:hover:inset-ring-surface-300 es:focus-within:inset-ring-surface-400',
						'es:inset-shadow-sm es:inset-shadow-secondary-100/50',
						'es:hover:placeholder:text-surface-400',
						'es:placeholder:text-secondary-400',
						'es:shadow-xs es:shadow-black/5',
					],
				},
				{
					flat: true,
					disabled: false,
					readOnly: false,
					class: [
						'es:inset-ring-secondary-100',
						'es:focus-within:text-accent-950',
						'es:placeholder:text-secondary-500/80',
						'es:bg-secondary-100 es:focus-within:bg-surface-50',
						'es:inset-ring-secondary-200/15 es:hover:inset-ring-secondary-200/65 es:focus-within:inset-ring-surface-200',
					],
				},
				{ disabled: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-200 es:text-secondary-400'] },
				{ readOnly: true, flat: false, class: ['es:bg-secondary-50 es:inset-ring-secondary-300 es:text-secondary-400'] },
				{ readOnly: true, flat: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-300/60 es:text-secondary-400'] },
			],
			defaultVariants: { disabled: false, flat: false, size: 'default', readOnly: false },
		},
	);

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
			>
				<div className='es:flex es:gap-1'>
					<Group className={inputClass({ disabled, flat, size, readOnly })}>
						{prefix && (
							<span
								slot='prefix'
								className='es:mr-1 es:select-none es:leading-none es:text-current/60 es:font-variation-["wdth"_100,"wght"_400,"slnt"_-1] es:group-focus-within:text-surface-500'
							>
								{prefix}
							</span>
						)}

						<Input
							className='es:tracking-wide es:font-variation-["wdth"_84,"YTLC"_520,"wght"_325,"slnt"_0,"YTFI"_788] es:placeholder-shown:font-variation-["wdth"_100,"YTLC"_500,"wght"_250,"slnt"_-8] es:any-focus:outline-hidden! es:p-px es:border-none es:bg-transparent'
							placeholder={placeholder}
							style={{
								width: fixedWidth ? `calc(${fixedWidth}ch + 2px)` : `calc(${min < 0 ? '0.75ch + ' : '0.5ch + '}${(max ?? 1000)?.toString()?.length} * 1ch)`,
							}}
						/>

						<ButtonGroup
							className={clsx(
								'es:hidden es:transition-discrete es:gap-0! es:transition es:pl-0.5 es:ease-spring-smooth es:duration-300 es:origin-left',
								'es:starting:opacity-0 es:starting:blur-[2px] es:starting:translate-x-2',
								'es:opacity-100 es:blur-none es:translate-x-0',
								!disabled && !readOnly && 'es:group-hover:flex es:group-focus-within:flex',
								disabled && 'es:hidden',
							)}
							vertical
						>
							<Button
								type='ghost'
								className={clsx(
									'es:col-start-4 es:w-4 es:disabled:opacity-40 es:text-current/80 es:group-focus-within:text-surface-500 es:icon:size-[0.65rem] es:icon:stroke-2',
									size === 'small' ? 'es:h-3' : 'es:h-3.5',
								)}
								slot='increment'
								icon={icons.chevronUp}
							/>
							<Button
								type='ghost'
								className={clsx(
									'es:col-start-4 es:w-4 es:disabled:opacity-40 es:text-current/80 es:group-focus-within:text-surface-500 es:icon:size-[0.65rem] es:icon:stroke-2',
									size === 'small' ? 'es:h-3' : 'es:h-3.5',
								)}
								slot='decrement'
								icon={icons.chevronDown}
							/>
						</ButtonGroup>

						{suffix && (
							<span
								slot='suffix'
								className='es:ml-1 es:select-none es:leading-none es:text-current/60 es:font-variation-["wdth"_100,"wght"_400,"slnt"_-1] es:group-focus-within:text-surface-500'
							>
								{suffix}
							</span>
						)}
					</Group>

					{children}
				</div>
			</BaseControl>
		</NumberField>
	);
};
