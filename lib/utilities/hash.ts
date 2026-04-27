export const simpleHash = (str: string): string => {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
	}

	return (hash >>> 0).toString(36).padStart(7, '0');
};

const cyrb64 = (str: string, seed = 0): [number, number] => {
	let h1 = 0xdeadbeef ^ seed;
	let h2 = 0x41c6ce57 ^ seed;

	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}

	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	return [h2 >>> 0, h1 >>> 0];
};

export const cyrb64Hash = (str: string, seed = 0): string => {
	const [h2, h1] = cyrb64(str, seed);

	return h2.toString(36).padStart(7, '0') + h1.toString(36).padStart(7, '0');
};

export const randomId = (length: number): string => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let result = '';

	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result;
};
