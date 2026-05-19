import justKebabCase from 'just-kebab-case';
import justCamelCase from 'just-camel-case';
import justIsEmpty from 'just-is-empty';
import justHas from 'just-has';

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
export const isEmpty = (input: unknown): boolean => justIsEmpty(input as Parameters<typeof justIsEmpty>[0]);

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
export const upperFirst = (input: unknown): string => {
	const normalizedInput = typeof input !== 'string' ? String(input) : input;

	if (typeof input === 'undefined') {
		return '';
	}

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
export const lowerFirst = (input: unknown): string => {
	const normalizedInput = typeof input !== 'string' ? String(input) : input;

	if (typeof input === 'undefined') {
		return '';
	}

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
export const has = (obj: object, key: string): boolean => justHas(obj, key);

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
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const proto = Object.getPrototypeOf(value) as object | null;

	if (proto === null) {
		return true;
	}

	const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && (proto as { constructor?: unknown }).constructor;

	return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
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
export const isObject = (input: unknown): input is object => input instanceof Object;

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
export const isEqual = (first: unknown, second: unknown): boolean => {
	if (first === second) {
		return true;
	}

	if ((first === undefined || second === undefined || first === null || second === null) && (first || second)) {
		return false;
	}

	const firstType = (first as { constructor?: { name?: string } })?.constructor?.name;
	const secondType = (second as { constructor?: { name?: string } })?.constructor?.name;

	if (firstType !== secondType) {
		return false;
	}

	if (firstType === 'Array') {
		const firstArr = first as unknown[];
		const secondArr = second as unknown[];

		if (firstArr.length !== secondArr.length) {
			return false;
		}

		let equal = true;

		for (let i = 0; i < firstArr.length; i++) {
			if (!isEqual(firstArr[i], secondArr[i])) {
				equal = false;
				break;
			}
		}

		return equal;
	}

	if (firstType === 'Object') {
		let equal = true;
		const fKeys = Object.keys(first as object);
		const sKeys = Object.keys(second as object);

		if (fKeys.length !== sKeys.length) {
			return false;
		}

		const firstObj = first as Record<string, unknown>;
		const secondObj = second as Record<string, unknown>;

		for (let i = 0; i < fKeys.length; i++) {
			const key = fKeys[i]!;

			if (firstObj[key] && secondObj[key]) {
				if (firstObj[key] === secondObj[key]) {
					continue;
				}

				const firstValType = (firstObj[key] as { constructor?: { name?: string } })?.constructor?.name;

				if (firstObj[key] && (firstValType === 'Array' || firstValType === 'Object')) {
					equal = isEqual(firstObj[key], secondObj[key]);

					if (!equal) {
						break;
					}
				} else if (firstObj[key] !== secondObj[key]) {
					equal = false;
					break;
				}
			} else if ((firstObj[key] && !secondObj[key]) || (!firstObj[key] && secondObj[key])) {
				equal = false;
				break;
			}
		}

		return equal;
	}

	return first === second;
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
export const isString = (value: unknown): value is string => typeof value === 'string' || value instanceof String;
