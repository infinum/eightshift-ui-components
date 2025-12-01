import { TextField, Label, Input as ReactAriaInput, TextArea } from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { cva } from 'class-variance-authority';

/**
 * An input field.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.help] - Help text to display below the input.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {boolean} [props.inline] - Whether the element menu is displayed inline with the label, to the right of it.
 * @param {string} [props.value] - The current value of the input.
 * @param {Function} [props.onChange] - Function to run when the input value changes.
 * @param {InputType} [props.type='text'] - The input type. Renders a `<textarea>` instead of `<input>` if set to 'multiline'.
 * @param {boolean} [props.disabled] - If `true`, the input is disabled.
 * @param {boolean} [props.readOnly] - If `true`, the input is read-only.
 * @param {string} [props.className] - Classes to pass to the input field.
 * @param {string} [props.wrapperClassName] - Classes to pass to the input field wrapping element.
 * @param {boolean} [props.monospaceFont] - If `true`, the input uses a monospace font. Useful for things like IDs to make them easier to read.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {InputSize} [props.size='default'] - Sets the size of the input field.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The InputField component.
 *
 * @typedef {'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'multiline'} InputType
 * @typedef {'small' | 'medium' | 'default' | 'large'} InputSize
 *
 * @example
 * <InputField
 * 	label='My input'
 * 	value={inputValue}
 * 	onChange={setInputValue}
 * />
 *
 * @preserve
 */
export const InputField = (props) => {
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
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const inputClass = cva(
		[
			'es:leading-none',
			'es:border-none!',
			'es:w-fill',
			'es:rounded-lg es:focus:rounded-xl',
			'es:transition-plus',
			'es:any-focus:outline-hidden',
			'es:inset-ring',
			'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/30',
			'es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500',
			'es:focus:placeholder:text-surface-400',
			className,
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
					true: 'es:font-mono es:text-12',
					false: [
						'es:text-13 es:font-variation-["wdth"_80,"YTLC"_520,"wght"_300,"slnt"_0]',
						'es:tracking-wide es:placeholder-shown:font-variation-["wdth"_100,"YTLC"_500,"wght"_250,"slnt"_-8]',
					],
				},
				multiline: {
					false: 'es:py-2',
					true: 'es:py-3 es:rounded-br-sm!',
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
				{type !== 'multiline' && (
					<ReactAriaInput
						{...other}
						type={type}
						className={inputClass({ disabled, flat, size, readOnly, mono: monospaceFont || type === 'password' })}
						onKeyUp={(e) => {
							if (type === 'search' && e.key === 'Escape') {
								onChange('');
							}

							if (props.onKeyUp) {
								props.onKeyUp(e);
							}
						}}
					/>
				)}
				{type === 'multiline' && (
					<TextArea
						{...other}
						className={inputClass({ disabled, flat, size, readOnly, mono: monospaceFont, multiline: true })}
					/>
				)}
			</BaseControl>
		</TextField>
	);
};
