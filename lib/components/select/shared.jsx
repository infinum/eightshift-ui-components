/**
 * Utils for `simpleValue`-capable components.
*/

/**
 * Handles getting the current value.
 *
 * @param {boolean} simpleValue - Whether `simpleValue` is set.
 * @param {string|{label: string, value: string, metadata: Object<string, any>[]}} value - Current value.
 * @param {{label: string, value: string}[]} options - Options passed to the component.
 *
 * @returns Appropriate output for the given input combination.
 *
 * @preserve
 */
export const getValue = (simpleValue, value, options) => {
	if (!simpleValue) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((value) => options?.find(({value: itemValue}) => itemValue === value));
	}

	return options?.find(({value: itemValue}) => itemValue === value);
};

/**
 * Handles the `onChange` callback.
 *
 * @param {boolean} simpleValue - Whether `simpleValue` is set.
 * @param {string|{label: string, value: string, metadata: Object<string, any>[]}} newValue - The new value to be set.
 * @param {Function} onChange - The `onChange` callback passed to the component.
 * @returns {void}
 *
 * @preserve
 */
export const customOnChange = (simpleValue, newValue, onChange) => {
	if (!simpleValue) {
		onChange(newValue);
		return;
	}

	if (Array.isArray(newValue)) {
		onChange(newValue.map((item) => item?.value));
		return;
	}

	onChange(newValue?.value);
};

/**
 * Handles the `onChange` callback.
 *
 * @param {object[]} items - Current items.
 * @param {Function} onChange - The `onChange` callback passed to the component.
 * @returns {void}
 *
 * @preserve
 */
export const fixIds = (items, onChange) => {
	const allIds = items?.map(({ id }) => id) ?? [];
	const hasDuplicates = (input) => new Set(input)?.size !== input?.length;
	const hasMissingIds = items?.some(({ id }) => typeof id === 'undefined' || id === null || id === '');

	if ((hasDuplicates(allIds) && items?.length > 0) || hasMissingIds) {
		const newItems = [...items].map((item, index) => ({
			...item,
			id: index + 1,
		}));
		onChange(newItems);
	}
};
