import { clsx } from 'clsx/lite';

const controlStyles = {
	base: 'es-uic-border es-uic-border-gray-300 es-uic-rounded-md es-uic-bg-white es-uic-text-sm es-uic-transition es-uic-group es-uic-shadow-sm !es-uic-min-h-10',
	focus: 'es-uic-ring es-uic-ring-teal-500 es-uic-ring-opacity-50',
};
const placeholderStyles = 'es-uic-text-gray-400 es-uic-ml-0.5';
const selectInputStyles = 'focus:es-uic-outline-none [&_input]:!es-uic-shadow-none [&_input:focus]:!es-uic-shadow-none';
const valueContainerStyles = 'es-uic-gap-1 es-uic-ml-1 es-uic-my-1 !es-uic-overflow-visible';
const singleValueStyles = 'es-uic-ml-0.5';
const multiValueStyles = clsx(
	'es-uic-bg-gray-100 es-uic-rounded es-uic-p-1 es-uic-border es-uic-border-gray-100 hover:border-gray-300 es-uic-items-center es-uic-gap-1.5 es-uic-transition es-uic-overflow-visible es-uic-max-w-40',
	'[:focus-visible_&]:es-uic-outline-none [:focus-visible_&]:es-uic-ring',
	'[:focus-visible_&]:es-uic-ring-teal-500 [:focus-visible_&]:es-uic-ring-opacity-50',
);
const multiValueLabelStyles = 'es-uic-select-none';
const multiValueRemoveStyles =
	'hover:es-uic-bg-red-500/15 hover:es-uic-text-red-900 es-uic-text-gray-500 es-uic-rounded es-uic-p-0.5 [&>svg]:es-uic-size-3.5 [&>svg]:es-uic-stroke-[1.5] es-uic-transition';
const clearIndicatorStyles = 'es-uic-text-gray-500 es-uic-p-1 es-uic-rounded-md hover:bg-red-50 hover:text-red-800 es-uic-transition';
const dropdownIndicatorStyles =
	'es-uic-text-gray-500 es-uic-px-1 group-hover:es-uic-text-black [&>svg]:es-uic-transition-transform [&>svg]:es-uic-duration-500 [&>svg]:es-uic-size-5.5';
const menuStyles = 'es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow-lg es-uic-mt-1 es-uic-text-sm es-uic-overflow-x-hidden';
const optionStyles = {
	base: 'es-uic-p-2 !es-uic-flex es-uic-items-center es-uic-gap-1.5 es-uic-text-gray-800 es-uic-rounded [&>svg]:es-uic-size-5 [&>svg]:es-uic-text-gray-500 es-uic-transition es-uic-mx-1 first:es-uic-mt-1 last:es-uic-mb-1 !es-uic-w-auto es-uic-min-h-9',
	focus: 'es-uic-bg-gray-100 active:es-uic-bg-teal-700/15',
	selected: 'es-uic-bg-teal-600/15 es-uic-text-teal-950',
};
const noOptionsMessageStyles = 'es-uic-text-gray-400 es-uic-p-4';
const groupHeadingStyles = 'es-uic-ml-3 es-uic-mt-2 es-uic-text-gray-500 es-uic-empty:hidden';
const groupStyles = 'es-uic-border-b es-uic-border-b-gray-200 last:es-uic-border-b-0';
const loadingMessageStyles = 'es-uic-p-4';

export const eightshiftSelectClasses = {
	clearIndicator: () => clearIndicatorStyles,
	control: ({ isFocused }) => clsx(isFocused && controlStyles.focus, controlStyles.base),
	dropdownIndicator: () => dropdownIndicatorStyles,
	group: () => groupStyles,
	groupHeading: () => groupHeadingStyles,
	input: () => selectInputStyles,
	menu: () => menuStyles,
	multiValue: () => multiValueStyles,
	multiValueLabel: () => multiValueLabelStyles,
	multiValueRemove: () => multiValueRemoveStyles,
	noOptionsMessage: () => noOptionsMessageStyles,
	option: ({ isFocused, isSelected }) => clsx(isFocused && optionStyles.focus, isSelected && optionStyles.selected, optionStyles.base),
	placeholder: () => placeholderStyles,
	singleValue: () => singleValueStyles,
	valueContainer: () => valueContainerStyles,
	loadingMessage: () => loadingMessageStyles,
};
