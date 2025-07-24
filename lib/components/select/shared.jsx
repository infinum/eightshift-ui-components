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
	if (Array.isArray(value)) {
		if (simpleValue) {
			return value.map((value) => options?.find(({ value: itemValue }) => itemValue === value));
		}

		return value;
	}

	if (simpleValue) {
		return options?.find(({ value: itemValue }) => itemValue === value);
	}

	return value;
};

/**
 * Moves an array item before or after another item in the array.
 *
 * @param {Array} array - The array to modify
 * @param {*} itemToMove - The item to move
 * @param {*} targetItem - The target item to move relative to
 * @param {'before'|'after'} position - Where to place the moved item ('before' or 'after')
 * @returns {Array} - New array with the item moved
 */
export const moveArrayItem = (array, itemToMove, targetItem, position = 'before') => {
	// Create a copy to avoid modifying the original array
	const result = [...array];

	// Find indexes
	const sourceIndex = result.indexOf(itemToMove);
	const targetIndex = result.indexOf(targetItem);

	// Handle invalid cases
	if (sourceIndex === -1 || targetIndex === -1) {
		return result; // Item not found, return unchanged array
	}

	// Remove item from current position
	result.splice(sourceIndex, 1);

	// Calculate insertion position (targetIndex may have shifted if sourceIndex < targetIndex)
	let adjustedTargetIndex;

	if (position === 'after') {
		adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex : targetIndex + 1;
	} else if (position === 'before') {
		adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
	}

	// Insert item at new position
	result.splice(adjustedTargetIndex, 0, itemToMove);

	return result;
};
