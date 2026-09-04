import justDebounceIt from 'just-debounce-it';
import justThrottle from 'just-throttle';

type CallbackValue = string | number | boolean | bigint | symbol | null | undefined | object;

interface DebounceControls {
	cancel: () => void;
	flush: () => void;
}

type DebouncedCallback<T extends (...args: never[]) => CallbackValue> = ((...args: Parameters<T>) => void) & DebounceControls;

/**
 * Debounces the provided function.
 * For more information, check [this blog post](https://davidwalsh.name/javascript-debounce-function).
 *
 * @template T extends (...args: unknown[]) => unknown
 * @param {T} func - Callback to apply.
 * @param {number} [wait=250] - Number of milliseconds for the delay of the callback function.
 *
 * @access public
 *
 * @returns {T} Debounced callback.
 *
 * @example
 * debounce(() => {
 * 	// callback function.
 * }, 250);
 */
export const debounce = <T extends (...args: never[]) => CallbackValue>(func: T, wait = 250): DebouncedCallback<T> => justDebounceIt(func, wait);

/**
 * Separated implementation of throttle functionality due to additional parameter in implementation.
 *
 * @template T extends (...args: unknown[]) => unknown
 * @param {T} func - Callback to apply.
 * @param {number} [wait=250] - Number of milliseconds of the callback function lock.
 * @param {boolean} [after=false] - If function is needed to be launched before or after throttling.
 *
 * @access public
 *
 * @returns {T} Throttled callback.
 */
export const throttle = <T extends (...args: never[]) => CallbackValue>(func: T, wait = 250, after = false): T => justThrottle(func, wait, { leading: !after, trailing: after });
