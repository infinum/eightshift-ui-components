/**
 * Slices the string in the middle and inputs the provided separator so that the string is maxLength characters long.
 *
 * @param {string | null | undefined} input - String to slice.
 * @param {number} maxLength - Maximum allowed string length.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @access public
 *
 * @returns {string | null} Truncated string, or `null` when the input is empty.
 *
 * @example
 * truncateMiddle('https://eightshift.com/contact/', 22);
 *
 * Output:
 * ```js
 * 'https://ei.../contact/'
 * ```
 */
export const truncateMiddle = (input: string | null | undefined, maxLength: number, separator = '...'): string | null => {
	if (!input) {
		return null;
	}

	if (input.length <= maxLength) {
		return input;
	}

	if (separator.length + 1 > maxLength) {
		throw new Error("Separator length exceeds the passed maximum length, string wouldn't be visible.");
	}

	const maxStringLength = maxLength - separator.length;
	const leftPartLength = Math.ceil(maxStringLength / 2);
	const rightPartLength = Math.floor(maxStringLength / 2);
	const leftPart = input.slice(0, leftPartLength).trim();
	const rightPart = rightPartLength > 0 ? input.slice(-1 * rightPartLength).trim() : '';

	return `${leftPart}${separator}${rightPart}`;
};

/**
 * Un-escapes HTML entities.
 *
 * @param {string} [input=''] - Input string.
 *
 * @access public
 *
 * @returns {string | null} String with HTML entities unescaped.
 *
 * Usage:
 * ```js
 * unescapeHTML('Test&#38;Up');
 * ```
 *
 * Output:
 * ```js
 * Test&Up
 * ```
 */
export const unescapeHTML = (input = ''): string | null => new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;

/**
 * Limits the string to the maximum length and adds the provided separator in case the string is longer.
 *
 * @param {string | null | undefined} input - String to slice.
 * @param {number} maxLength - Maximum allowed string length.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @access public
 *
 * @returns {string | null} Truncated string, or `null` when the input is empty.
 *
 * @example
 * truncate('Hello this is a string', 13); // => 'Hello this...'
 */
export const truncate = (input: string | null | undefined, maxLength: number, separator = '...'): string | null => {
	if (!input) {
		return null;
	}

	if (input.length <= maxLength) {
		return input;
	}

	if (separator.length + 1 > maxLength) {
		throw new Error("Separator length exceeds the passed maximum length, string wouldn't be visible.");
	}

	const maxStringLength = maxLength - separator.length;
	const leftPart = input.slice(0, maxStringLength).trim();

	return `${leftPart}${separator}`;
};

/**
 * Slices the string at the end and inputs the provided separator so that the string is maxLength characters long.
 *
 * @param {string | null | undefined} input - String to slice.
 * @param {number} maxLength - Maximum allowed string length.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @access public
 *
 * @returns {string | null} Truncated string, or `null` when the input is empty.
 *
 * @example
 * truncateEnd('Hello this is a string', 13); // => 'Hello this...'
 */
export const truncateEnd = (input: string | null | undefined, maxLength: number, separator = '...'): string | null => {
	if (!input) {
		return null;
	}

	if (input.length <= maxLength) {
		return input;
	}

	if (separator.length + 1 > maxLength) {
		throw new Error("Separator length exceeds the passed maximum length, string wouldn't be visible.");
	}

	const maxStringLength = maxLength - separator.length;
	const leftPart = input.slice(0, maxStringLength).trim();

	return `${leftPart}${separator}`;
};
