/**
 * Slices the string in the middle and inputs the provided separator so that the string is maxLength characters long.
 *
 * @param {string} input             - String to slice.
 * @param {number} maxLength         - Maximum allowed string length.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @access public
 *
 * @returns {string|Error} Truncated string or error if separator length exceeds maxLength.
 *
 * Usage:
 * ```js
 * truncateMiddle('https://eightshift.com/contact/', 22);
 * ```
 *
 * Output:
 * ```js
 * "https://ei.../contact/"
 *
 * @preserve
 */
export const truncateMiddle = (input, maxLength, separator = '...') => {
	if (!input) {
		return null;
	}

	// If the string is shorter than maxLength, just return it.
	if (input?.length <= maxLength) {
		return input;
	}

	// Return error if separator would prevent any characters from the word showing.
	if (separator.length + 1 > maxLength) {
		throw new Error("Separator length exceeds the passed maximum length, string wouldn't be visible.");
	}

	// Smartly split up the string.
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
 * @param {string} input - Input string.
 *
 * @access public
 *
 * @returns {string} String with HTML entities unescaped.
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
 *
 * @preserve
 */
export const unescapeHTML = (input = '') => new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;

/**
 * Limits the string to the maximum length and adds the provided separator in case the string is longer.
 *
 * @param {string} input             - String to slice.
 * @param {number} maxLength         - Maximum allowed string length.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @access public
 *
 * @returns {string|Error} Truncated string or error if separator length exceeds maxLength.
 *
 * Usage:
 * ```js
 * truncate('Hello this is a string', 13); // => "Hello this..."
 * ```
 *
 * @preserve
 */
export const truncate = (input, maxLength, separator = '...') => {
	if (!input) {
		return null;
	}

	// If the string is shorter than maxLength, just return it.
	if (input?.length <= maxLength) {
		return input;
	}

	// Return error if separator would prevent any characters from the word showing.
	if (separator.length + 1 > maxLength) {
		throw new Error("Separator length exceeds the passed maximum length, string wouldn't be visible.");
	}

	// Split the string.
	const maxStringLength = maxLength - separator.length;
	const leftPart = input.slice(0, maxStringLength).trim();

	return `${leftPart}${separator}`;
};

/**
 * Slices the string at the end and inputs the provided separator so that the string is maxLength characters long.
 *
 * @param {string} input             - String to slice.
 * @param {number} maxLength         - Maximum allowed string length.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @access public
 *
 * @returns {string|Error} Truncated string or error if separator length exceeds maxLength.
 *
 * Usage:
 * ```js
 * truncateMiddle('https://eightshift.com/contact/', 22);
 * ```
 *
 * Output:
 * ```js
 * "https://ei.../contact/"
 *
 * @preserve
 */
export const truncateEnd = (input, maxLength, separator = '...') => {
	if (!input) {
		return null;
	}

	// If the string is shorter than maxLength, just return it.
	if (input?.length <= maxLength) {
		return input;
	}

	// Return error if separator would prevent any characters from the word showing.
	if (separator.length + 1 > maxLength) {
		throw new Error("Separator length exceeds the passed maximum length, string wouldn't be visible.");
	}

	// Smartly split up the string.
	const maxStringLength = maxLength - separator.length;

	const leftPartLength = Math.ceil(maxStringLength);

	const leftPart = input.slice(0, leftPartLength).trim();

	return `${leftPart}${separator}`;
};
