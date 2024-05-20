import React from 'react';
import { components } from 'react-select';
import { icons } from '../icons/icons';
import { classnames } from '../../utilities/classnames';
// import { icons, classnames } from '@eightshift/frontend-libs/scripts';

/**
 * Default dropdown indicator for CustomSelect.
 *
 * @param {object} props - components.DropdownIndicator props.
 */
export const CustomSelectDefaultDropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			{React.cloneElement(icons.dropdownCaretAlt, {
				className: classnames(props.selectProps.menuIsOpen && '-scale-y-100 '),
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
		{React.cloneElement(icons.clear, { className: 'size-4' })}
	</components.MultiValueRemove>
);
