/**
 * Move multiple array items to a different position with direction control. Returns a new array with the items moved.
 */
export const arrayMoveMultiple = <T>(array: T[], fromIndices: number[], to: number, direction: 'before' | 'after' = 'before'): T[] => {
	const newArray = array.slice();

	fromIndices.sort((a, b) => b - a);

	const itemsToMove = fromIndices.map((index) => newArray.splice(index, 1)[0] as T);

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
 */
export const fixIds = <T extends Record<string, unknown>>(items: T[], onChange: (items: T[]) => void, idKey = 'id'): void => {
	const allIds = items?.map((item) => item?.[idKey]) ?? [];
	const hasDuplicates = (input: unknown[]) => new Set(input)?.size !== input?.length;
	const hasMissingIds = items?.some((item) => typeof item?.[idKey] === 'undefined' || item?.[idKey] === null || item?.[idKey] === '');

	if ((hasDuplicates(allIds) && items?.length > 0) || hasMissingIds) {
		const newItems = [...items].map((item, index) => ({
			...item,
			[idKey]: index + 1,
		}));

		onChange(newItems);
	}
};
