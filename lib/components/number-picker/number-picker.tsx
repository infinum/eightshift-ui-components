import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react';
import { Group, Input, Label, NumberField } from 'react-aria-components';
import { chevronDown, chevronUp } from '../../icons/internal';
import { BaseControl, type BaseControlProps } from '../base-control/base-control';
import { Button, ButtonGroup } from '../button/button';

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
			flat: {
				false: null,
				true: null,
			},
			readOnly: {
				false: null,
				true: null,
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

type InputSize = NonNullable<VariantProps<typeof inputClass>['size']>;

type SharedNumberFieldProps = Omit<
	ComponentPropsWithoutRef<typeof NumberField>,
	'children' | 'value' | 'defaultValue' | 'onChange' | 'isDisabled' | 'isReadOnly' | 'minValue' | 'maxValue' | 'step'
>;

type NumberPickerProps = SharedNumberFieldProps &
	Omit<BaseControlProps<typeof Label>, 'actions'> & {
		value?: number;
		onChange?: (value: number) => void;
		min?: number;
		max?: number;
		step?: number;
		readOnly?: boolean;
		disabled?: boolean;
		placeholder?: string;
		prefix?: ReactNode;
		suffix?: ReactNode;
		fixedWidth?: number | null;
		children?: ReactNode;
		inline?: boolean;
		noScrollToChange?: boolean;
		size?: InputSize;
		flat?: boolean;
		className?: string;
		hidden?: boolean;
	};

export const NumberPicker = (props: NumberPickerProps) => {
	const {
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
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const inputWidth: CSSProperties['width'] = fixedWidth
		? `calc(${fixedWidth}ch + 2px)`
		: `calc(${min < 0 ? '1ch + ' : '0.75ch + '}${Math.max((max ?? 1000).toString().length, (placeholder ?? '').length)} * 1ch)`;

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
			{...other}
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
					<Group className={clsx(inputClass({ disabled, flat, size, readOnly }), className)}>
						{prefix ? (
							<span
								slot='prefix'
								className='es:mr-1 es:-translate-y-px es:select-none es:leading-none es:text-current/65 es:font-variation-["wdth"_76,"wght"_325,"slnt"_-2,"ROND"_100] es:group-focus-within:text-surface-500'
							>
								{prefix}
							</span>
						) : null}

						<Input
							className='es:font-variation-["wdth"_80,"wght"_325,"slnt"_0,"ROND"_100] es:placeholder-shown:font-variation-["wdth"_60,"wght"_300,"slnt"_-10,"ROND"_0] es:any-focus:outline-hidden! es:p-px! es:border-none! es:shadow-none! es:bg-transparent es:text-13!'
							placeholder={placeholder}
							style={{ width: inputWidth }}
						/>

						<ButtonGroup
							className={clsx(
								'es:hidden es:transition-discrete es:gap-0! es:transition es:pl-0.5 es:ease-spring-smooth es:duration-300 es:origin-left',
								'es:starting:opacity-0 es:starting:translate-x-2',
								'es:opacity-100 es:translate-x-0',
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
								icon={chevronUp}
							/>
							<Button
								type='ghost'
								className={clsx(
									'es:col-start-4 es:w-4 es:disabled:opacity-40 es:text-current/80 es:group-focus-within:text-surface-500 es:icon:size-[0.65rem] es:icon:stroke-2',
									size === 'small' ? 'es:h-3' : 'es:h-3.5',
								)}
								slot='decrement'
								icon={chevronDown}
							/>
						</ButtonGroup>

						{suffix ? (
							<span
								slot='suffix'
								className='es:ml-1 es:-translate-y-px es:select-none es:leading-none es:text-current/60 es:font-variation-["wdth"_76,"wght"_325,"slnt"_-2,"ROND"_100] es:group-focus-within:text-surface-500'
							>
								{suffix}
							</span>
						) : null}
					</Group>

					{children}
				</div>
			</BaseControl>
		</NumberField>
	);
};
