import {
	TextField,
	Label,
	Input as ReactAriaInput,
	TextArea,
	Text,
} from 'react-aria-components';
import { BaseControl } from '../base-control/base-control';
import { classnames } from '../../utilities/classnames';

export const InputField = (props) => {
	const {
		icon,
		label,
		subtitle,
		help,
		actions,
		value,
		onChange,
		type = 'text',
		disabled,
		readOnly,
		className,
		...other
	} = props;

	return (
		<TextField
			value={value}
			onChange={onChange}
			isDisabled={disabled}
			isReadOnly={readOnly}
			{...other}
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				actions={actions}
				labelAs={Label}
				help={help && <Text slot='description'>{help}</Text>}
			>
				{type !== 'multiline' && (
					<ReactAriaInput
						{...other}
						className={classnames(
							'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-shadow-sm es-uic-transition',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
							className,
						)}
					/>
				)}
				{type === 'multiline' && (
					<TextArea
						{...other}
						className={classnames(
							'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-shadow-sm es-uic-transition',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
							className,
						)}
					/>
				)}
			</BaseControl>
		</TextField>
	);
};
