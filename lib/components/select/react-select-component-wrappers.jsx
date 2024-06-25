import { components } from 'react-select';

/**
 * Wrappers for react-select components if you are having trouble importing directly from react-select.
 */

/**
 * Custom dropdown indicator for CustomSelect.
 *
 * (a wrapper for `components.DropdownIndicator` from `react-select`)
 *
 * @param {import('react-select').DropdownIndicatorProps} props - components.DropdownIndicator props.
 *
 * @preserve
 */
export const RSDropdownIndicator = (props) => <components.DropdownIndicator {...props} />;

/**
 * Custom value display for CustomSelect.
 *
 * (a wrapper for `components.SingleValue` from `react-select`)
 *
 * @param {import('react-select').SingleValueProps} props - components.SingleValue props.
 *
 * @preserve
 */
export const RSSingleValue = (props) => <components.SingleValue {...props} />;

/**
 * Custom value display for multi item select.
 *
 * (a wrapper for `components.MultiValue` from `react-select`)
 *
 * @param {import('react-select').MultiValueProps} props - components.SingleValue props.
 *
 * @preserve
 */
export const RSMultiValue = (props) => <components.MultiValue {...props} />;

/**
 * Custom option for CustomSelect.
 *
 * (a wrapper for `components.Option` from `react-select`)
 *
 * @param {import('react-select').OptionProps} props - components.Option props.
 *
 * @preserve
 */
export const RSOption = (props) => <components.Option {...props} />;

/**
 * Custom multiple value remove button for CustomSelect.
 *
 * (a wrapper for `components.MultiValueRemove` from `react-select`)
 *
 * @param {import('react-select').MultiValueRemoveProps} props - components.MultiValueRemove props.
 *
 * @preserve
 */
export const RSMultiValueRemove = (props) => <components.MultiValueRemove {...props} />;

/**
 * Custom multiple value display container for CustomSelect.
 *
 * (a wrapper for `components.MultiValueContainer` from `react-select`)
 *
 * @param {import('react-select').MultiValueGenericProps} props - components.MultiValueContainer props.
 *
 * @preserve
 */
export const RSMultiValueContainer = (props) => <components.MultiValueContainer {...props} />;

/**
 * Custom multiple value display for CustomSelect.
 *
 * (a wrapper for `components.MultiValueLabel` from `react-select`)
 *
 * @param {import('react-select').MultiValueGenericProps} props - components.MultiValueLabel props.
 *
 * @preserve
 */
export const RSMultiValueLabel = (props) => <components.MultiValueLabel {...props} />;

/**
 * Default clear indicator for CustomSelect.
 *
 * @param {import('react-select').ClearIndicatorProps} props - components.ClearIndicator props.
 *
 * @preserve
 */
export const RSClearIndicator = (props) => <components.ClearIndicator {...props} />;
