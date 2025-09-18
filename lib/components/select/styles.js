import { clsx } from 'clsx/lite';

const controlStyles = {
	base: 'es:border es:border-gray-300 es:rounded-10 es:bg-white es:text-sm es:transition es:group es:shadow-sm es:min-h-10! es:inset-ring es:inset-ring-secondary-100',
	focus: 'es:ring-2 es:ring-accent-500/50 es:border-accent-500!',
};
const placeholderStyles = 'es:text-gray-400 es:ml-1';
const selectInputStyles = 'es:any-focus:outline-hidden es:[&_input]:shadow-none! es:[&_input:focus]:shadow-none!';
const valueContainerStyles = 'es:gap-1 es:ml-1.25 es:my-1 es:overflow-visible!';
const singleValueStyles = 'es:ml-0.5 es:px-1';
const multiValueStyles = clsx(
	'es:bg-gray-100 es:rounded-md es:py-1 es:px-1.5 es:border es:border-gray-100 hover:border-gray-300 es:items-center es:gap-1.5 es:transition es:overflow-visible es:max-w-40',
	'es:in-focus-visible:outline-hidden es:in-focus-visible:ring',
	'es:in-focus-visible:ring-accent-500/50',
);
const multiValueLabelStyles = 'es:select-none';
const multiValueRemoveStyles = 'es:hover:bg-red-500/15 es:hover:text-red-900 es:text-gray-500 es:rounded es:p-0.5 es:icon:size-3.5 es:icon:stroke-[1.5] es:transition';
const clearIndicatorStyles = 'es:text-gray-500 es:p-1 es:rounded-md hover:bg-red-50 hover:text-red-800 es:transition';
const dropdownIndicatorStyles = 'es:text-gray-500 es:px-1 es:group-hover:text-black es:icon:transition-transform es:icon:duration-500 es:icon:size-5';
const menuStyles = 'es:rounded-2xl es:border es:border-gray-200 es:bg-white es:shadow-lg es:mt-1 es:text-sm es:overflow-x-hidden es:min-w-48';
const optionStyles = {
	base: 'es:p-2 es:flex! es:items-center es:gap-1.5 es:text-gray-800 es:rounded-xl es:icon:size-5 es:icon:text-gray-500 es:transition es:mx-1 es:first:mt-1 es:last:mb-1 es:w-auto! es:min-h-9',
	focus: 'es:bg-gray-100 es:active:bg-accent-700/15',
	selected: 'es:bg-accent-600/15 es:text-accent-950',
};
const noOptionsMessageStyles = 'es:text-gray-400 es:p-4';
const groupHeadingStyles = 'es:ml-3 es:mt-3 es:mb-1 es:text-gray-500/80 es:empty:hidden';
const groupStyles = 'es:border-b es:border-b-gray-200 es:last:border-b-0';
const loadingMessageStyles = 'es:p-4';

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
