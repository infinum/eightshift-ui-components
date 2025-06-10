import { useId } from 'react';
import Select, { components } from 'react-select';
import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator, CustomSelectDefaultMultiValueRemove } from './custom-select-default-components';
import { getDragEndHandler, getMultiValue, getMultiValueRemove } from './multi-select-components';
import { getValue } from './shared';
import { BaseControl } from '../base-control/base-control';
import { eightshiftSelectClasses } from './styles';

/**
 * Multi-select menu with re-orderable items.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Label of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {{label: string, value: string, metadata: Object<string, any>?}[]} props.options - Options to display in the select. `[{ label: string, value: string }]`.
 * @param {{label: string, value: string, metadata: Object<string, any>?}[]} props.value - Current value of the select.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {boolean} [props.simpleValue=false] - If `true`, instead of using a `{label: '', value: ''}` value type, a string is used (just the value).
 * @param {boolean} [props.clearable] - Whether the select is clearable.
 * @param {boolean} [props.noSearch] - Whether the search is disabled.
 * @param {boolean} [props.disabled] - Whether the select is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect] - Whether the menu stays open after an select.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {JSX.Element} [props.customClearIndicator] - If provided, replaces the default 'Clear all' button.
 * @param {JSX.Element} [props.customDropdownArrow] - If provided, replaces the default dropdown arrow indicator.
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {JSX.Element} [props.customValueRemove] - If provided, replaces the default item remove button (react-select's `components.MultiValueRemove`.
 * @param {JSX.Element} [props.customValueContainer] - If provided, replaces the default items container component (react-select's `components.MultiValueContainer`).
 * @param {string} [props.className] - Classes to pass to the select menu.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The MultiSelect component.
 *
 * @example
 * const [value, setValue] = useState([]);
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
export const MultiSelect = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,

		value: rawValue,
		onChange,

		options,
		simpleValue = false,

		disabled = false,
		noSearch = false,
		clearable = false,
		keepMenuOpenAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,
		customMenuOption,
		customValueDisplay,
		customValueRemove,
		customValueContainer,

		className,

		hidden,

		...additionalProps
	} = props;
	const idBase = useId();

	const value = getValue(simpleValue, rawValue, options).map((item, index) => ({
		...item,
		id: (simpleValue ? item : item?.value) ?? `${idBase}-${index}`,
	}));

	const modifiedOnChange = (v) => {
		if (simpleValue) {
			onChange(v?.map(({ value }) => value));

			return;
		}

		onChange(v?.map((item) => ({ ...item, id: undefined })));
	};

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
			<DndContext
				modifiers={[restrictToParentElement]}
				onDragEnd={getDragEndHandler(modifiedOnChange, value)}
			>
				<SortableContext items={value.map(({ id }) => id)}>
					<Select
						isMulti
						unstyled
						options={options.map((item) => ({ id: item.value, ...item }))}
						value={value}
						onChange={modifiedOnChange}
						closeMenuOnSelect={!keepMenuOpenAfterSelect}
						isClearable={clearable}
						isSearchable={!noSearch}
						isDisabled={disabled}
						className={className}
						placeholder={placeholder}
						classNames={eightshiftSelectClasses}
						components={{
							MultiValue: getMultiValue(customValueDisplay ?? components.MultiValue),
							MultiValueContainer: customValueContainer ?? components.MultiValueContainer,
							MultiValueRemove: getMultiValueRemove(customValueRemove ?? CustomSelectDefaultMultiValueRemove),
							Option: customMenuOption ?? components.Option,
							IndicatorSeparator: null,
							DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
							ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
						}}
						menuPlacement='auto'
						menuPortalTarget={document.body}
						{...additionalProps}
					/>
				</SortableContext>
			</DndContext>
		</BaseControl>
	);
};
