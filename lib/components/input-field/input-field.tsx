import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type KeyboardEvent, type ReactNode } from 'react';
import { Input as ReactAriaInput, Label, TextArea, TextField } from 'react-aria-components';
import { BaseControl, type BaseControlProps } from '../base-control/base-control';

const inputClass = cva(
	[
		'es:leading-none',
		'es:border-none!',
		'es:w-fill',
		'es:rounded-lg! es:focus:rounded-xl!',
		'es:transition-plus',
		'es:any-focus:outline-hidden',
		'es:inset-ring',
		'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/30',
		'es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500',
		'es:focus:placeholder:text-surface-400',
	],
	{
		variants: {
			size: {
				small: ['es:min-h-8', 'es:px-2.5'],
				medium: ['es:min-h-9', 'es:px-3'],
				default: ['es:min-h-10', 'es:px-3'],
				large: ['es:min-h-12', 'es:px-4'],
			},
			mono: {
				true: 'es:font-mono es:text-12!',
				false: 'es:text-13! es:font-variation-["wdth"_80,"wght"_325,"slnt"_0,"ROND"_100] es:placeholder-shown:font-variation-["wdth"_64,"wght"_300,"slnt"_-10,"ROND"_0]',
			},
			multiline: {
				false: 'es:py-2',
				true: 'es:py-3 es:rounded-br-sm!',
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
					'es:inset-ring-secondary-400/50 es:hover:inset-ring-surface-300 es:focus:inset-ring-surface-400',
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
					'es:focus:text-accent-950',
					'es:placeholder:text-secondary-500/80',
					'es:bg-secondary-100 es:focus:bg-surface-50',
					'es:inset-ring-secondary-200/15 es:hover:inset-ring-secondary-200/65 es:focus:inset-ring-surface-200',
					'es:shadow-none',
				],
			},
			{ disabled: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-200 es:text-secondary-400'] },
			{ readOnly: true, flat: false, class: ['es:bg-secondary-50 es:inset-ring-secondary-300 es:text-secondary-400'] },
			{ readOnly: true, flat: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-300/60 es:text-secondary-400'] },
		],
		defaultVariants: { disabled: false, flat: false, mono: false, size: 'default', multiline: false, readOnly: false },
	},
);

type InputType = 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'multiline';
type InputSize = NonNullable<VariantProps<typeof inputClass>['size']>;

type SharedFieldProps = Omit<ComponentPropsWithoutRef<typeof TextField>, 'children' | 'className' | 'value' | 'defaultValue' | 'onChange' | 'isDisabled' | 'isReadOnly'>;
type InputElementProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaInput>, 'children' | 'className' | 'value' | 'defaultValue' | 'onChange' | 'type' | 'disabled' | 'readOnly'>;
type TextAreaElementProps = Omit<ComponentPropsWithoutRef<typeof TextArea>, 'children' | 'className' | 'value' | 'defaultValue' | 'onChange' | 'disabled' | 'readOnly'>;

type InputFieldProps = SharedFieldProps &
	InputElementProps &
	TextAreaElementProps &
	BaseControlProps<typeof Label> & {
		value?: string;
		onChange?: (value: string) => void;
		type?: InputType;
		disabled?: boolean;
		readOnly?: boolean;
		className?: string;
		wrapperClassName?: string;
		monospaceFont?: boolean;
		flat?: boolean;
		size?: InputSize;
		hidden?: boolean;
		children?: ReactNode;
	};

export const InputField = (props: InputFieldProps) => {
	const {
		icon,
		label,
		subtitle,
		help,
		actions,
		inline,
		value,
		onChange,
		type = 'text',
		disabled,
		readOnly,
		className,
		flat,
		size,
		wrapperClassName,
		hidden,
		monospaceFont,
		onKeyUp,
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (type === 'search' && event.key === 'Escape') {
			onChange?.('');
		}

		onKeyUp?.(event);
	};

	return (
		<TextField
			value={value ?? ''}
			onChange={onChange}
			isDisabled={disabled}
			isReadOnly={readOnly}
			className={wrapperClassName}
			{...other}
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				actions={actions}
				inline={inline}
				labelAs={Label}
				help={help}
			>
				{type !== 'multiline' ? (
					<ReactAriaInput
						{...(other as InputElementProps)}
						type={type}
						className={clsx(inputClass({ disabled, flat, size, readOnly, mono: monospaceFont || type === 'password' }), className)}
						onKeyUp={handleKeyUp}
					/>
				) : (
					<TextArea
						{...(other as TextAreaElementProps)}
						className={clsx(inputClass({ disabled, flat, size, readOnly, mono: monospaceFont, multiline: true }), className)}
					/>
				)}
			</BaseControl>
		</TextField>
	);
};
