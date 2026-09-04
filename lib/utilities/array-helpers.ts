/**
 * Move multiple array items to a different position with direction control.
 * Returns a new array with the items moved.
 *
 * @template T
 * @param {T[]} array - The original array.
 * @param {number[]} fromIndices - An array of indices of the items to move.
 * @param {number} to - The index to move the items to.
 * @param {'before' | 'after'} [direction='before'] - The direction to move the items.
 *
 * @returns {T[]} The array with the items moved.
 */
export const arrayMoveMultiple = <T>(array: T[], fromIndices: number[], to: number, direction: 'before' | 'after' = 'before'): T[] => {
	const newArray = array.slice();

	fromIndices.sort((a, b) => b - a);

	const itemsToMove = fromIndices.flatMap((index) => newArray.splice(index, 1));

	let insertAt = to;

	if (direction === 'after') {
		insertAt += 1;

		const minFromIndex = Math.min(...fromIndices);

		if (to >= minFromIndex) {
			insertAt -= 1;
		}
	}

	newArray.splice(insertAt, 0, ...itemsToMove.reverse());

	return newArray;
};

/**
 * Fix the IDs of the items in the array to ensure they are unique and sequential.
 * If the IDs are missing or duplicate, new IDs are generated for the items.
 *
 * @template T extends Record<string, unknown>
 * @param {T[]} items - The array of items to fix.
 * @param {(items: T[]) => void} onChange - The callback to update the items.
 * @param {string} [idKey='id'] - The key to use for the IDs.
 */
export const fixIds = <T extends object>(items: T[], onChange: (items: T[]) => void, idKey = 'id'): void => {
	// SAFETY: Reading a missing JavaScript property is defined to return undefined, which is handled below.
	const itemIdKey = idKey as keyof T;
	const allIds = items?.map((item) => item[itemIdKey]) ?? [];
	const hasDuplicates = (input: T[keyof T][]) => new Set(input)?.size !== input?.length;
	const hasMissingIds = items?.some((item) => item[itemIdKey] === undefined || item[itemIdKey] === null || item[itemIdKey] === '');

	if ((hasDuplicates(allIds) && items?.length > 0) || hasMissingIds) {
		const newItems = [...items].map((item, index) => ({
			...item,
			[idKey]: index + 1,
		}));

		onChange(newItems);
	}
};
