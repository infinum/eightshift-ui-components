/**
 * Get file extension from a URL string.
 * getFileExtension('https://example.com/image.png'); // 'png'
 * getFileExtension('https://example.com/archive.tar.gz'); // 'gz'
 * getFileExtension('https://example.com/no-extension'); // null
 */
export const getFileExtension = (input) => {
	const url = new URL(input);
	const pathname = url.pathname;
	const match = pathname.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);

	return match ? match[1].toLowerCase() : null;
};

/**
 * Determine if a color is considered "dark" based on its RGB values and a lightness threshold.
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @param {number} [threshold=0.5] - Lightness threshold (0.0 - 1.0) below which the color is considered dark.
 * isColorDark(0, 0, 0); // true (black)
 * isColorDark(255, 255, 255); // false (white)
 * isColorDark(100, 100, 100, 0.4); // false (gray with higher threshold)
 */
export const isColorDark = (r, g, b, threshold = 0.5) => {
	// Calculate the relative luminance of the color
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// A threshold of 0.5 is commonly used to determine if a color is dark or light
	return luminance < threshold;
};
