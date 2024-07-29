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
 * @param {string} [props.value] - The current value of the input.
 * @param {Function} [props.onChange] - Function to run when the input value changes.
 * @param {InputType} [props.type='text'] - The input type. Renders a `<textarea>` instead of `<input>` if set to 'multiline'.
 * @param {boolean} [props.disabled] - If `true`, the input is disabled.
 * @param {boolean} [props.readOnly] - If `true`, the input is read-only.
 * @param {string} [props.className] - Classes to pass to the input field.
 * @param {string} [props.wrapperClassName] - Classes to pass to the input field wrapping element.
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
	const { icon, label, subtitle, help, actions, value, onChange, type = 'text', disabled, readOnly, className, wrapperClassName, hidden, ...other } = props;

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
				labelAs={Label}
				help={help}
			>
				{type !== 'multiline' && (
					<ReactAriaInput
						{...other}
						type={type}
						className={clsx(
							'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-shadow-sm es-uic-transition selection:es-uic-bg-teal-500/20 selection:es-uic-text-teal-950',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
							className,
						)}
					/>
				)}
				{type === 'multiline' && (
					<TextArea
						{...other}
						className={clsx(
							'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-shadow-sm es-uic-transition selection:es-uic-bg-teal-500/20 selection:es-uic-text-teal-950',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
							className,
						)}
					/>
				)}
			</BaseControl>
		</TextField>
	);
};
