import { components } from 'react-select';
import RSAsyncSelect from 'react-select/async';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';
import { BaseControl } from '../base-control/base-control';
import { eightshiftSelectClasses } from './styles';

/**
 * Select menu with async loading.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Label of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {boolean|{label: string, value: string, metadata: Object<string, any>?}[]} [props.preloadOptions=true] - If `true`, the initial loading is done as soon as the component is loaded. If an array of `{label: '', value: ''}` option is provided, that is loaded immediately, dynamic fetching only happens in search. If `false`, nothing is loaded immediately, fetching only happens when an user types to search.
 * @param {Function} props.loadOptions - Async function that returns an array of `{label: '', value: ''}`-formatted items. `loadOptions(searchText: string): Promise<{label: string, value: string, metadata: Object<string, any>?}[]>`.
 * @param {{label: string, value: string, metadata: Object<string, any>?}} props.value - Current value of the select.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {boolean} [props.clearable=false] - Whether the select is clearable.
 * @param {boolean} [props.noSearch=false] - Whether the search is disabled.
 * @param {boolean} [props.disabled=false] - Whether the select is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect=false] - Whether the menu stays open after an select.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {JSX.Element} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {JSX.Element} [props.customClearIndicator] - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.SingleValue`).
 * @param {Function} [props.processLoadedOptions] - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Must include `label`, `value`, and `id` keys in the output, additional fields can be added as required.
 * @param {string} props.className - Classes to pass to the select menu.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The AsyncSelect component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * const loadOptions = async (searchText) => {
 * 	const response = await fetch(`https://api.example.com/items?q=${searchText}`);
 * 	const data = await response.json();
 *
 * 	return data.items.map((item) => ({
 * 		label: item.name,
 * 		value: item.id,
 * 	}));
 * };
 *
 * <AsyncMultiSelect
 * 	label='Select items'
 * 	loadOptions={loadOptions}
 * 	value={value}
 * 	onChange={setValue}
 * />
 *
 * @preserve
 */
export const AsyncSelect = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,

		loadOptions,
		preloadOptions = true,

		value,
		onChange,

		noSearch = false,
		disabled = false,
		clearable = false,
		keepMenuOpenAfterSelect = false,

		className,
		placeholder,

		customMenuOption,
		customValueDisplay,
		customDropdownArrow,
		customClearIndicator,

		processLoadedOptions = (options) => options,

		hidden,

		...additionalProps
	} = props;

	if (hidden) {
		return null;
	}

	const customLoadOptions = async (searchText) => {
		const results = await loadOptions(searchText);

		return processLoadedOptions(results?.map((item) => ({ id: item.value, ...item })) ?? []);
	};

	return (
		<BaseControl
			label={label}
			icon={icon}
			subtitle={subtitle}
			actions={actions}
			help={help}
			inline={inline}
		>
			<RSAsyncSelect
				unstyled
				loadOptions={customLoadOptions}
				defaultOptions={preloadOptions}
				value={value}
				onChange={(value) => {
					if (value && 'id' in value) {
						delete value.id;
					}

					onChange(value);
				}}
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
				menuPlacement='auto'
				menuPortalTarget={document.body}
				{...additionalProps}
			/>
		</BaseControl>
	);
};
