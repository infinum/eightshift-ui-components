// Very lightweight Lodash replacements - from https://github.com/angus-c/just.
import justCamelCase from 'just-camel-case';

/**
 * Returns the string with its first character converted to uppercase.
 *
 * @param {string} input - String to convert.
 *
 * @return {string} string with its first character converted to uppercase.
 *
 * @example
 * upperFirst('new super Test-title') // => 'New super Test-title'
 *
 * @preserve
 */
export const upperFirst = (input) => {
	if (typeof input === 'undefined') {
		return '';
	}

	if (input === true) {
		return 'True';
	} else if (input === false) {
		return 'False';
	}

	if (input.length < 2) {
		return input.toUpperCase();
	}

	return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * Returns a camelCase-formatted string.
 *
 * @param {string} input - String to convert.
 *
 * @access public
 *
 * @return {string} *camelCase*-formatted string.
 *
 * @example
 * camelCase('New super Test-title') // => 'newSuperTestTitle'
 * camelCase(null) // => ''
 *
 * @preserve
 */
export const camelCase = (input) => lowerFirst(justCamelCase(input ?? ''));

/**
 * Returns the string with its first character converted to lowercase.
 *
 * @param {string} input - String to convert.
 *
 * @return {string} string with its first character converted to lowercase.
 *
 * @example
 * lowerFirst('New super Test-title') // => 'new super Test-title'
 *
 * @preserve
 */
export const lowerFirst = (input) => {
	if (typeof input === 'undefined') {
		return '';
	}

	if (input === true) {
		return 'true';
	} else if (input === false) {
		return 'false';
	}

	if (input?.length < 2) {
		return input.toLowerCase();
	}

	return input.charAt(0).toLowerCase() + input.slice(1);
};
