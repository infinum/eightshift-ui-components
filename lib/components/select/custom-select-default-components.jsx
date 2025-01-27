import React from 'react';
import { components } from 'react-select';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';

/**
 * Default dropdown indicator for CustomSelect.
 *
 * @param {import('react-select').DropdownIndicatorProps} props - components.DropdownIndicator props.
 *
 * @preserve
 */
export const CustomSelectDefaultDropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			{React.cloneElement(icons.dropdownCaretAlt, {
				className: clsx(props.selectProps.menuIsOpen && 'es:-scale-y-100 '),
			})}
		</components.DropdownIndicator>
	);
};

/**
 * Default clear indicator for CustomSelect.
 *
 * @param {import('react-select').ClearIndicatorProps} props - components.DropdownIndicator props.
 *
 * @preserve
 */
export const CustomSelectDefaultClearIndicator = (props) => <components.ClearIndicator {...props}>{icons.clear}</components.ClearIndicator>;

/**
 * Default multiple value remove element for CustomSelect.
 *
 * @param {import('react-select').MultiValueRemoveProps} props - components.MultiValueRemove props.
 *
 * @preserve
 */
export const CustomSelectDefaultMultiValueRemove = (props) => (
	<components.MultiValueRemove {...props}>{React.cloneElement(icons.clear, { className: 'es:size-4' })}</components.MultiValueRemove>
);
