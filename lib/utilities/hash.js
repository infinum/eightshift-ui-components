// These hashes are for algorithmic use cases, such as bucketing in hashtables, where security isn't
// needed and 32 or 64 bits is enough (that is, rare collisions are acceptable). These are way simpler
// than sha1 (and all its deps) or similar, and with a short, clean (base 36 alphanumeric) result.

// A simple, *insecure* 32-bit hash that's short, fast, and has no dependencies.
// Output is always 7 characters.
// Loosely based on the Java version; see
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const simpleHash = (str) => {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
	}

	// Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
	return (hash >>> 0).toString(36).padStart(7, '0');
};

// An improved alternative:

// cyrb53 (c) 2018 bryc (github.com/bryc). License: Public domain. Attribution appreciated.
// A fast and simple 64-bit (or 53-bit) string hash function with decent collision resistance.
// Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
// See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
// https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
const cyrb64 = (str, seed = 0) => {
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

	// For a single 53-bit numeric return value we could return
	// 4294967296 * (2097151 & h2) + (h1 >>> 0);
	// but we instead return the full 64-bit value:
	return [h2 >>> 0, h1 >>> 0];
};

// An improved, *insecure* 64-bit hash that's short, fast, and has no dependencies.
// Output is always 14 characters.
export const cyrb64Hash = (str, seed = 0) => {
	const [h2, h1] = cyrb64(str, seed);

	return h2.toString(36).padStart(7, '0') + h1.toString(36).padStart(7, '0');
};

/* A simple random ID generator for cases where uniqueness is more important than
predictability. Not cryptographically secure, but good enough for general use cases
like generating IDs for React keys, HTML element IDs, etc. */
export const randomId = (length) => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let result = '';

	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result;
};
