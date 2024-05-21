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
							'min-h-10 w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm transition',
							'focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
							className,
						)}
					/>
				)}
				{type === 'multiline' && (
					<TextArea
						{...other}
						className={classnames(
							'min-h-10 w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm transition',
							'focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
							className,
						)}
					/>
				)}
			</BaseControl>
		</TextField>
	);
};
