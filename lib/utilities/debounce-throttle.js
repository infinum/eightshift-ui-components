import justDebounceIt from 'just-debounce-it';
import justThrottle from 'just-throttle';

/**
 * Debounces the provided function.
 * For more information, check [this blog post](https://davidwalsh.name/javascript-debounce-function).
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of milliseconds for the delay of the callback function. Default is 200ms.
 *
 * @access public
 *
 * @return {function} Debounced callback.
 *
 * Usage:
 * ```js
 * debounce(() => {
 *   // callback function.
 * }, 250);
 * ```
 *
 * @preserve
 */
export const debounce = (func, wait = 250) => justDebounceIt(func, wait);

/**
 * Separated implementation of throttle functionality due to additional parameter in implementation.
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of milliseconds of the callback function lock. Default is 250ms.
 * @param {number} after  - If function is needed to be launched before or after throttling.
 *
 * @access public
 *
 * @return {function} Throttled callback.
 */
export const throttle = (func, wait = 250, after = false) =>
	justThrottle(func, wait, { leading: !after, trailing: after });
