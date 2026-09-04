import justKebabCase from 'just-kebab-case';
import justCamelCase from 'just-camel-case';
import justIsEmpty from 'just-is-empty';
import justHas from 'just-has';

type RuntimeValue = string | number | boolean | bigint | symbol | null | undefined | object;
type FirstCharacterInput = string | number | boolean | bigint | symbol | null | undefined;

const isStringValue = <T>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

const isRuntimeValueArray = <T>(value: T): value is T & RuntimeValue[] => Array.isArray(value);

const getObjectEntries = <T extends object>(value: T): Array<[string, RuntimeValue]> => {
	// SAFETY: RuntimeValue covers every JavaScript property value Object.entries can return.
	return Object.entries(value) as Array<[string, RuntimeValue]>;
};

/**
 * Returns a camelCase-formatted string.
 *
 * @param {string | null | undefined} input - String to convert.
 *
 * @access public
 *
 * @returns {string} camelCase-formatted string.
 *
 * @example
 * camelCase('New super Test-title') // => 'newSuperTestTitle'
 * camelCase(null) // => ''
 */
export const camelCase = (input: string | null | undefined): string => lowerFirst(justCamelCase(input ?? ''));

/**
 * Returns a PascalCase-formatted string.
 *
 * @param {string | null | undefined} input - String to convert.
 *
 * @access public
 *
 * @returns {string} PascalCase-formatted string.
 *
 * Usage:
 * ```js
 * pascalCase('New super Test-title') // => 'NewSuperTestTitle'
 * pascalCase(null) // => ''
 * ```
 */
export const pascalCase = (input: string | null | undefined): string => upperFirst(justCamelCase(input ?? ''));

/**
 * Returns a snake_case-formatted string.
 *
 * @param {string | null | undefined} input - String to convert.
 *
 * @access public
 *
 * @returns {string} snake_case-formatted string.
 *
 * Usage:
 * ```js
 * snakeCase('New super Test-title') // => 'new_super_test_title'
 * snakeCase(null) // => ''
 * ```
 */
export const snakeCase = (input: string | null | undefined): string => kebabCase(input ?? '').replaceAll('-', '_');

/**
 * Returns a kebab-case-formatted string.
 *
 * @param {string | null | undefined} input - String to convert.
 *
 * @access public
 *
 * @returns {string} kebab-case-formatted string.
 *
 * Usage:
 * ```js
 * kebabCase('New super Test-title') // => 'new-super-test-title'
 * kebabCase(null) // => ''
 * ```
 */
export const kebabCase = (input: string | null | undefined): string => justKebabCase(input ?? '');

/**
 * Checks if value is an empty object or collection.
 *
 * @param {*} input - Value to check.
 *
 * @returns {boolean} True if the object is empty, false otherwise.
 *
 * Usage:
 * ```js
 * isEmpty({}) // => true
 * isEmpty([]) // => true
 * isEmpty('') // => true
 * isEmpty({ a: 1 }) // => false
 * isEmpty([1, 2, 3]) // => false
 * ```
 */
export const isEmpty = <T extends Parameters<typeof justIsEmpty>[0]>(input: T): boolean => justIsEmpty(input);

/**
 * Returns the string with its first character converted to uppercase.
 *
 * @param {*} input - String to convert.
 *
 * @returns {string} String with its first character converted to uppercase.
 *
 * @example
 * upperFirst('new super Test-title') // => 'New super Test-title'
 */
export const upperFirst = (input: FirstCharacterInput): string => {
	if (input === undefined) {
		return '';
	}

	const normalizedInput = isStringValue(input) ? input : String(input);

	if (input === true) {
		return 'True';
	} else if (input === false) {
		return 'False';
	}

	if (normalizedInput.length < 2) {
		return normalizedInput.toUpperCase();
	}

	return normalizedInput.charAt(0).toUpperCase() + normalizedInput.slice(1);
};

/**
 * Returns the string with its first character converted to lowercase.
 *
 * @param {*} input - String to convert.
 *
 * @returns {string} String with its first character converted to lowercase.
 *
 * @example
 * lowerFirst('New super Test-title') // => 'new super Test-title'
 */
export const lowerFirst = (input: FirstCharacterInput): string => {
	if (input === undefined) {
		return '';
	}

	const normalizedInput = isStringValue(input) ? input : String(input);

	if (input === true) {
		return 'true';
	} else if (input === false) {
		return 'false';
	}

	if (normalizedInput.length < 2) {
		return normalizedInput.toLowerCase();
	}

	return normalizedInput.charAt(0).toLowerCase() + normalizedInput.slice(1);
};

/**
 * Checks if `key` is a direct property of `object`.
 * Key may be a path of a value separated by `.`.
 *
 * @param {object} obj - Object to check.
 * @param {string} key - Key to check.
 *
 * @returns {boolean} True if key is a direct property, false otherwise.
 *
 * Usage:
 * ```js
 * has({ a: 1 }, 'a') // => true
 * has({ a: 1 }, 'b') // => false
 * has({ a: { b: 2 } }, 'a.b') // => true
 * has({ a: { b: 3 } }, 'a.c') // => false
 * ```
 */
export const has = <T extends object>(obj: T, key: string): boolean => justHas(obj, key);

/**
 * Checks if value is a plain object, that is, an object created by the Object constructor or one with a `[[Prototype]]` of `null`.
 *
 * @param {*} value - Value to check.
 * @returns {boolean} True if value is a plain object, false otherwise.
 *
 * Usage:
 * ```js
 * isPlainObject({ a: 2 }) // => true
 * isPlainObject('Lorem') // => false
 * isPlainObject([]) // => false
 * isPlainObject(new Boolean()) // => false
 * ```
 */
export const isPlainObject = <T>(value: T): value is T & object => {
	if (value === null || Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	// SAFETY: Object.prototype identified an object value, and JavaScript prototypes are objects or null.
	const prototype = Object.getPrototypeOf(value) as object | null;

	return prototype === null || prototype === Object.prototype;
};

/**
 * Checks if value is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, new Number(0), and new String('')).
 *
 * @param {*} input - Value to check.
 *
 * @returns {boolean} True if value is an object, false otherwise.
 *
 * Usage:
 * ```js
 * isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * ```
 */
export const isObject = <T>(input: T): input is T & object => input instanceof Object;

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * **Note**: works for simple types, arrays, and objects. Might not work for all the types the lodash version supports.
 *
 * @param {*} first - First value to compare.
 * @param {*} second - Second value to compare.
 *
 * @returns {boolean} True if the values are equivalent, false otherwise.
 *
 * Usage:
 * ```js
 * isEqual({ a: 1 }, { a: 1 }) // => true
 * isEqual({ a: 1 }, { a: 2 }) // => false
 * isEqual({ a: 1 }, 'b') // => false
 * ```
 */
export const isEqual = <TFirst, TSecond>(first: TFirst, second: TSecond): boolean => {
	if (Object.is(first, second)) {
		return true;
	}

	if (isRuntimeValueArray(first) || isRuntimeValueArray(second)) {
		if (!isRuntimeValueArray(first) || !isRuntimeValueArray(second) || first.length !== second.length) {
			return false;
		}

		return first.every((value, index) => isEqual(value, second[index]));
	}

	if (!isPlainObject(first) || !isPlainObject(second)) {
		return false;
	}

	const firstEntries = getObjectEntries(first);
	const secondEntries = new Map(getObjectEntries(second));

	if (firstEntries.length !== secondEntries.size) {
		return false;
	}

	for (const [key, value] of firstEntries) {
		if (!secondEntries.has(key) || !isEqual(value, secondEntries.get(key))) {
			return false;
		}
	}

	return true;
};

/**
 * Checks if value is the language type of `String`.
 *
 * @param {*} value - Value to check.
 * @returns {boolean} True if value is a string, false otherwise.
 *
 * Usage:
 * ```js
 * isString('Lorem') // => true
 * isString(2) // => false
 * isString([]) // => false
 * isString(new String('Lorem')) // => false
 * ```
 */
export const isString = <T>(value: T): value is T & string => isStringValue(value);
