import { classnames } from '../../utilities/classnames';

const controlStyles = {
	base: 'border rounded-md bg-white text-sm transition group shadow !min-h-10',
	focus: 'border-teal-600 ring ring-teal-600 ring-opacity-25',
	nonFocus: 'border-gray-300',
};
const placeholderStyles = 'text-gray-400 ml-0.5';
const selectInputStyles = 'outline-4 outline-green-800';
const valueContainerStyles = 'gap-1 ml-1 !overflow-visible';
const singleValueStyles = 'ml-0.5';
const multiValueStyles =
	classnames(
		'bg-gray-100 rounded p-1 border border-gray-100 hover:border-gray-300 items-center gap-1.5 transition overflow-visible',
		'[:focus-visible_&]:outline-none [:focus-visible_&]:ring',
		'[:focus-visible_&]:border-teal-600 [:focus-visible_&]:ring-teal-600 [:focus-visible_&]:ring-opacity-25',
	);
const multiValueLabelStyles = 'select-none';
const multiValueRemoveStyles =
	'hover:bg-red-500/15 hover:text-red-900 text-gray-500 rounded p-0.5 [&>svg]:size-3.5 [&>svg]:stroke-[1.5] transition';
const indicatorsContainerStyles = 'bg-red-50';
const clearIndicatorStyles =
	'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const dropdownIndicatorStyles =
	'text-gray-500 px-1 group-hover:text-black [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:size-5.5';
const menuStyles = 'rounded-md border border-gray-200 bg-white shadow-lg mt-1.5 p-1 text-sm';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
	// base: 'hover:cursor-pointer p-1 rounded text-sm !flex items-center gap-1',
	base: 'p-2 !flex min-w-40 items-center gap-1.5 rounded [&>svg]:size-5 [&>svg]:text-gray-500 transition',
	focus: 'bg-gray-100 active:bg-teal-700/15',
	selected: 'bg-teal-600/15 text-teal-950',
};
const noOptionsMessageStyles =
	'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

const containerStyles = '';
const groupStyles = '';
const loadingIndicatorStyles = '';
const loadingMessageStyles = '';
const menuListStyles = '';
const menuPortalStyles = '';

export const eightshiftSelectClasses = {
	clearIndicator: () => clearIndicatorStyles,
	container: () => containerStyles,
	control: ({ isFocused }) =>
		classnames(
			isFocused ? controlStyles.focus : controlStyles.nonFocus,
			controlStyles.base,
		),
	dropdownIndicator: () => dropdownIndicatorStyles,
	group: () => groupStyles,
	groupHeading: () => groupHeadingStyles,
	indicatorsContainer: () => indicatorsContainerStyles,
	input: () => selectInputStyles,
	loadingIndicator: () => loadingIndicatorStyles,
	loadingMessage: () => loadingMessageStyles,
	menu: () => menuStyles,
	menuList: () => menuListStyles,
	menuPortal: () => menuPortalStyles,
	multiValue: () => multiValueStyles,
	multiValueLabel: () => multiValueLabelStyles,
	multiValueRemove: () => multiValueRemoveStyles,
	noOptionsMessage: () => noOptionsMessageStyles,
	option: ({ isFocused, isSelected }) =>
		classnames(
			isFocused && optionStyles.focus,
			isSelected && optionStyles.selected,
			optionStyles.base,
		),
	placeholder: () => placeholderStyles,
	singleValue: () => singleValueStyles,
	valueContainer: () => valueContainerStyles,
};
