import RSSelect, { components } from 'react-select';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';
import { customOnChange, getValue } from './shared';
import { BaseControl } from '../base-control/base-control';
import { eightshiftSelectClasses } from './styles';

/**
 * Select menu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.label] - Label of the component.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {{label: string, value: string, metadata: Object<string, any>?}[]} props.options - Options to display in the select. `[{ label: string, value: string }]`.
 * @param {string|{label: string, value: string, metadata: Object<string, any>?}} props.value - Current value of the select.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {boolean} [props.simpleValue=false] - If `true`, instead of using a `{label: '', value: ''}` value type, a string is used (just the value).
 * @param {boolean} [props.clearable] - Whether the select is clearable.
 * @param {boolean} [props.noSearch] - Whether the search is disabled.
 * @param {boolean} [props.disabled] - Whether the select is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect] - Whether the menu stays open after an select.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {JSX.Element} [props.customDropdownArrow] - If provided, replaces the default dropdown arrow indicator.
 * @param {JSX.Element} [props.customClearIndicator] - If provided, replaces the default 'Clear all' button.
 * @param {string} [props.className] - Classes to pass to the select menu.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Select component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * const options = [
 * 	{ label: 'Option 1', value: 'option-1' },
 * 	{ label: 'Option 2', value: 'option-2' },
 * 	{ label: 'Option 3', value: 'option-3' },
 * ];
 *
 * <MultiSelect
 * 	label='Select items'
 * 	options={loadOptions}
 * 	value={value}
 * 	onChange={setValue}
 * />
 *
 * @preserve
 */
export const Select = (props) => {
	const {
		icon,
		help,
		label,
		inline,
		actions,
		subtitle,

		value,
		onChange,

		options,
		simpleValue = false,

		disabled = false,
		noSearch = false,
		clearable = false,
		keepMenuOpenAfterSelect = false,

		placeholder,

		customMenuOption,
		customValueDisplay,
		customDropdownArrow,
		customClearIndicator,

		className,

		hidden,

		...additionalProps
	} = props;

	if (hidden) {
		return null;
	}

	return (
		<BaseControl
			label={label}
			icon={icon}
			subtitle={subtitle}
			actions={actions}
			help={help}
			inline={inline}
		>
			<RSSelect
				unstyled
				options={options}
				value={getValue(simpleValue, value, options)}
				onChange={(v) => customOnChange(simpleValue, v, onChange)}
				closeMenuOnSelect={!keepMenuOpenAfterSelect}
				isClearable={clearable}
				isSearchable={!noSearch}
				isDisabled={disabled}
				className={className}
				placeholder={placeholder}
				classNames={eightshiftSelectClasses}
				components={{
					Option: customMenuOption ?? components.Option,
					SingleValue: customValueDisplay ?? components.SingleValue,
					IndicatorSeparator: null,
					DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
					ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
				}}
				{...additionalProps}
			/>
		</BaseControl>
	);
};
