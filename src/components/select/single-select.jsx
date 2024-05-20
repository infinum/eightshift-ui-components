import RSSelect, { components } from 'react-select';

import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';
import { customOnChange, getValue } from './shared';
import { BaseControl } from '../base-control/base-control';
import { eightshiftSelectClasses } from './styles';

/**
 * A simple, customizable select menu.
 *
 * @param {object} props                                     - Select options.
 * @param {string?} [props.label]                            - Label displayed above the control.
 * @param {string?} [props.help]                             - Help text displayed below the control.
 * @param {React.Component?} [props.icon]                    - Icon to show next to the label
 * @param {React.Component?} [props.subtitle]                - Subtitle below the label.
 * @param {React.Component?} [props.actions]                 - Actions to show to the right of the label.
 * @param {boolean?} [props.inlineLabel]                     - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {array<{string, string}>?} props.options           - Options to choose from. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                               - Current value
 * @param {boolean} [props.simpleValue=false]                - If `true`, instead of passing (and getting) a `{label: '', value: ''}` object from the component, only the value is returned.
 * @param {function} props.onChange                          - Function called when the selection is changed.
 * @param {boolean} [props.clearable=false]                  - If `true`, a button to remove the value is shown.
 * @param {boolean} [props.noSearch=false]                   - If `true`, the search functionality is disabled.
 * @param {boolean} [props.disabled=false]                   - If set `true`, the component is disabled.
 * @param {boolean} [props.closeMenuAfterSelect=false]       - If set `true`, the dropdown is closed immediately after selecting an option.
 * @param {string?} [props.placeholder]                      - Placeholder text when nothing is selected.
 * @param {React.Component?} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]    - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption]        - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay]      - If provided, replaces the default current value display of each selected item (react-select's `components.SingleValue`).
 * @param {boolean} [props.noBottomSpacing]                  - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]            - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses='']             - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses='']       - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}]               - If provided, the provided props will be passed to the Select control.
 */
export const Select = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,

		options,
		value,

		simpleValue = false,

		onChange,

		clearable = false,
		noSearch = false,

		disabled = false,

		closeMenuAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,
		customMenuOption,
		customValueDisplay,

		className,

		additionalProps,
	} = props;

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
				closeMenuOnSelect={closeMenuAfterSelect}
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
				// menuPortalTarget={document.body}
				// menuPosition='fixed'
				{...additionalProps}
			/>
		</BaseControl>
	);
};
