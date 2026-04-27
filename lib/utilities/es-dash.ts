import justKebabCase from 'just-kebab-case';
import justCamelCase from 'just-camel-case';
import justIsEmpty from 'just-is-empty';
import justHas from 'just-has';

export const camelCase = (input: string | null | undefined): string => lowerFirst(justCamelCase(input ?? ''));

export const pascalCase = (input: string | null | undefined): string => upperFirst(justCamelCase(input ?? ''));

export const snakeCase = (input: string | null | undefined): string => kebabCase(input ?? '').replaceAll('-', '_');

export const kebabCase = (input: string | null | undefined): string => justKebabCase(input ?? '');

export const isEmpty = (input: unknown): boolean => justIsEmpty(input as Parameters<typeof justIsEmpty>[0]);

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

export const has = (obj: object, key: string): boolean => justHas(obj, key);

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

export const isObject = (input: unknown): input is object => input instanceof Object;

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

export const isString = (value: unknown): value is string => typeof value === 'string' || value instanceof String;
