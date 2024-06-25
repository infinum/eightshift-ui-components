/**
 * Move multiple array items to a different position with direction control. Returns a new array with the items moved.
 *
 * @param {Array} array - The original array.
 * @param {Array} fromIndices - An array of indices of the items to move.
 * @param {number} to - The index to move the items to.
 * @param {'before' | 'after'} direction - The direction to move the items ('before' or 'after').
 *
 * @returns {Array} - The array with the items moved.
 *
 * @preserve
 */
export const arrayMoveMultiple = (array, fromIndices, to, direction = 'before') => {
	// Create a copy of the original array to avoid mutating it
	const newArray = array.slice();

	// Sort the fromIndices in descending order to avoid messing up the indices while splicing
	fromIndices.sort((a, b) => b - a);

	// Extract the items to move
	const itemsToMove = fromIndices.map((index) => newArray.splice(index, 1)[0]);

	// Adjust the insertAt index based on the direction
	let insertAt = to;

	if (direction === 'after') {
		// Move the insertAt index one position forward if moving 'after'
		// Also, adjust if the target index is before any of the moved items to avoid off-by-one error
		insertAt += 1;

		const minFromIndex = Math.min(...fromIndices);

		if (to >= minFromIndex) {
			insertAt -= 1;
		}
	}

	// Insert the items at the specified position
	newArray.splice(insertAt, 0, ...itemsToMove.reverse());

	return newArray;
};

/**
 * Fix the IDs of the items in the array to ensure they are unique and sequential.
 * If the IDs are missing or duplicate, new IDs are generated for the items.
 *
 * @param {Array} items - The array of items to fix.
 * @param {Function} onChange - The callback to update the items.
 * @param {string} [idKey='id'] - The key to use for the IDs.
 *
 * @preserve
 */
export const fixIds = (items, onChange, idKey = 'id') => {
	const allIds = items?.map((item) => item?.[idKey]) ?? [];
	const hasDuplicates = (input) => new Set(input)?.size !== input?.length;
	const hasMissingIds = items?.some((item) => typeof item?.[idKey] === 'undefined' || item?.[idKey] === null || item?.[idKey] === '');

	if ((hasDuplicates(allIds) && items?.length > 0) || hasMissingIds) {
		const newItems = [...items].map((item, index) => ({
			...item,
			[idKey]: index + 1,
		}));

		onChange(newItems);
	}
};
