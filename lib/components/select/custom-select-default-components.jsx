import React from 'react';
import { components } from 'react-select';
import { icons } from '../../icons/icons';
import { classnames } from '../../utilities/classnames';

/**
 * Default dropdown indicator for CustomSelect.
 *
 * @param {object} props - components.DropdownIndicator props.
 */
export const CustomSelectDefaultDropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			{React.cloneElement(icons.dropdownCaretAlt, {
				className: classnames(props.selectProps.menuIsOpen && '-es-uic-scale-y-100 '),
			})}
		</components.DropdownIndicator>
	);
};

/**
 * Default clear indicator for CustomSelect.
 *
 * @param {object} props - components.DropdownIndicator props.
 */
export const CustomSelectDefaultClearIndicator = (props) => (
	<components.ClearIndicator {...props}>{icons.clear}</components.ClearIndicator>
);

/**
 * Default multiple value remove element for CustomSelect.
 *
 * @param {object} props - components.MultiValueRemove props.
 */
export const CustomSelectDefaultMultiValueRemove = (props) => (
	<components.MultiValueRemove {...props}>
		{React.cloneElement(icons.clear, { className: 'es-uic-size-4' })}
	</components.MultiValueRemove>
);