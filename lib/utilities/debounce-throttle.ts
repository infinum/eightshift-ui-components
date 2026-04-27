import justDebounceIt from 'just-debounce-it';
import justThrottle from 'just-throttle';

export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait = 250): T => justDebounceIt(func, wait) as unknown as T;

export const throttle = <T extends (...args: unknown[]) => unknown>(func: T, wait = 250, after = false): T =>
	justThrottle(func, wait, { leading: !after, trailing: after }) as unknown as T;
