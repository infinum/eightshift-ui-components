import { TextField, Label, Input as ReactAriaInput, TextArea } from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { clsx } from 'clsx/lite';

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
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The InputField component.
 *
 * @typedef {'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'multiline'} InputType
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
	const { icon, label, subtitle, help, actions, inline, value, onChange, type = 'text', disabled, readOnly, className, wrapperClassName, hidden, monospaceFont, ...other } = props;

	if (hidden) {
		return null;
	}

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
						className={clsx(
							'es:min-h-10 es:w-full es:rounded-10 es:border es:border-secondary-300 es:p-2 es:text-sm es:shadow-sm es:not-readonly:focus:shadow-md es:transition es:selection:bg-accent-500/20 es:selection:text-accent-950 es:bg-white',
							'es:any-focus:outline-hidden',
							'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
							'es:focus-visible:border-accent-500',
							'es:inset-ring es:inset-ring-secondary-100',
							'es:disabled:shadow-none! es:disabled:border-secondary-200 es:disabled:bg-secondary-50 es:disabled:text-secondary-500 es:disabled:cursor-default es:readonly:bg-secondary-50',
							type === 'search' && 'es:[&::-webkit-search-cancel-button]:hidden',
							(monospaceFont || type === 'password') && 'es:font-mono',
							className,
						)}
					/>
				)}
				{type === 'multiline' && (
					<TextArea
						{...other}
						className={clsx(
							'es:min-h-10 es:w-full es:rounded-10 es:border es:border-secondary-300 es:p-2 es:text-sm es:shadow-sm es:not-readonly:focus:shadow-md es:transition es:selection:bg-accent-500/20 es:selection:text-accent-950',
							'es:any-focus:outline-hidden',
							'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
							'es:focus-visible:border-accent-500',
							'es:inset-ring es:inset-ring-secondary-100',
							'es:disabled:shadow-none! es:readonly:shadow-xs! es:disabled:border-secondary-200 es:disabled:bg-secondary-50 es:disabled:text-secondary-500 es:disabled:cursor-default es:readonly:bg-secondary-50',
							className,
						)}
					/>
				)}
			</BaseControl>
		</TextField>
	);
};
