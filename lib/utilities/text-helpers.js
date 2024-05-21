// Very lightweight Lodash replacements - from https://github.com/angus-c/just.
import justCamelCase from 'just-camel-case';

/**
 * Returns the string with its first character converted to uppercase.
 *
 * @param {string} string - String to convert.
 *
 * @return {string} string with its first character converted to uppercase.
 *
 * Usage:
 * ```js
 * upperFirst('new super Test-title') // => 'New super Test-title'
 * ```
 */
export const upperFirst = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

/**
 * Returns a camelCase-formatted string.
 *
 * @param {string} input - String to convert.
 *
 * @access public
 *
 * @return {string} *camelCase*-formatted string.
 *
 * Usage:
 * ```js
 * camelCase('New super Test-title') // => 'newSuperTestTitle'
 * camelCase(null) // => ''
 * ```
 */
export const camelCase = (input) => lowerFirst(justCamelCase(input ?? ''));

/**
 * Returns the string with its first character converted to lowercase.
 *
 * @param {string} string - String to convert.
 *
 * @return {string} string with its first character converted to lowercase.
 *
 * Usage:
 * ```js
 * lowerFirst('New super Test-title') // => 'new super Test-title'
 * ```
 */
export const lowerFirst = (string) => string ? string.charAt(0).toLowerCase() + string.slice(1) : '';
