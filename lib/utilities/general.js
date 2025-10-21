import { floatBufferFromCanvas, FLOAT_RGBA } from '@thi.ng/pixel';
import { analyzeColors } from '@thi.ng/pixel-analysis';
import { dominantColorsKmeans } from '@thi.ng/pixel-dominant-colors';
import { srgb, css } from '@thi.ng/color';
import { sha256 } from 'js-sha256';

/**
 * Options for extracting colors / evaluating lightness from an image.
 *
 * @typedef {Object} ImageAnalysisResult
 * @property {boolean} isDark - Whether the image is considered dark overall.
 * @property {boolean} isTransparent - Whether the image has any transparency.
 * @property {{ any: boolean, left: boolean, right: boolean, top: boolean, bottom: boolean }} transparencyInfo - More detailed transparency info.
 * @property {Array<{ color: string, area: number, isDark: boolean }>} dominantColors - Dominant colors extracted from the image.
 * @property {Array} dominantColors.<index>.color - The color value.
 * @property {Array} dominantColors.<index>.area - The area occupied by this color (0 - 1).
 * @property {Array} dominantColors.<index>.isDark - Whether this color is considered dark.
 *
 * @preserve
 */

/**
 * Options for extracting colors / evaluating lightness from an image.
 *
 * @typedef {Object} ImageAnalysisSettings
 * @property {number} [numColors=2] - Number of dominant colors to return.
 * @property {number} [lightnessThreshold=0.5] - Threshold (0.0 - 1.0) used to decide if a color is considered "light".
 * @property {number} [yFrom=0.0] - Minimum Y (luminance) value (0.0 - 1.0) to include when evaluating lightness.
 * @property {number} [yTo=1.0] - Maximum Y (luminance) value (0.0 - 1.0) to include when evaluating lightness.
 * @property {number} [maxSize=320] - Maximum width/height to scale down the image to before analysis, for performance.
 * @property {number} [alphaThreshold=30] - Threhold (0-255) below which a pixel is considered "transparent" for the purposes of analysis.
 *
 * @preserve
 */

const defaultAnalysisSettings = {
	numColors: 3,
	lightnessThreshold: 0.5,
	yFrom: 0.0,
	yTo: 1.0,
	maxSize: 320,
	alphaThreshold: 30,
};

/**
 * Analyze an image element to determine overall luminance, dominant colors and transparency.
 *
 * @param {HTMLImageElement} image - Image element to check.
 * @param {ImageAnalysisSettings} [settings] - Optional settings to customize the analysis.
 *
 * @returns {{ isDark: boolean, dominantColors: Array<{ color: string, area: number, isDark: boolean }>, isTransparent: boolean } | false}
 *   Returns an object on success:
 *     - isDark: true if the computed mean image luminance is below 0.5.
 *     - dominantColors: an array of up to the requested number of dominant colors. Each entry contains:
 *         - color: CSS color string (as produced by the analyzer).
 *         - area: the relative area (weight) of that color.
 *         - isDark: boolean indicating whether the color's lightness (oklch.l) is < 0.5.
 *     - isTransparent: true if any inspected pixel has alpha < 255.
 *   Returns false if an error occurred during analysis.
 *
 * @preserve
 */
export const analyzeImage = (image, rawSettings) => {
	const settings = { ...defaultAnalysisSettings, ...rawSettings };
	const { yFrom, yTo, maxSize } = settings;

	// Cache results in localstorage.
	const cacheKey = `es-uic-img-analysis-${sha256(image.src)}`;

	if (localStorage?.getItem(cacheKey)) {
		return JSON.parse(localStorage.getItem(cacheKey));
	}

	try {
		// == Preliminary checks ==
		const fileExtension = getFileExtension(image.src);
		let skipTransparencyCheck = false;

		if (fileExtension) {
			skipTransparencyCheck = !['png', 'webp', 'gif', 'tiff', 'svg', 'avif'].includes(fileExtension);
		}

		const imageWidth = image.naturalWidth;
		const imageHeight = image.naturalHeight;

		if (!imageWidth || !imageHeight) {
			return false;
		}

		// == Optimization ==
		let imageScale = 1;

		if (imageWidth > maxSize || imageHeight > maxSize) {
			imageScale = Math.min(maxSize / imageWidth, maxSize / imageHeight);
		}
		const imageWidthScaled = Math.floor(imageWidth * imageScale);
		const imageHeightScaled = Math.floor(imageHeight * imageScale);
		// == Color check ==
		const srcX = 0;
		const srcY = Math.floor(yFrom * imageHeight);
		const srcW = Math.max(1, imageWidth);
		const srcH = Math.max(1, Math.ceil((yTo - yFrom) * imageHeight));
		const destW = Math.max(1, imageWidthScaled);
		const destH = Math.max(1, Math.ceil((yTo - yFrom) * imageHeightScaled));
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = destW;
		colorCanvas.height = destH;
		const colorContext = colorCanvas.getContext('2d');
		colorContext.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, destW, destH);
		const buffer = floatBufferFromCanvas(colorCanvas, FLOAT_RGBA);
		let imageData = null;

		if (!skipTransparencyCheck) {
			const transparencyCanvas = document.createElement('canvas');
			transparencyCanvas.width = imageWidthScaled;
			transparencyCanvas.height = imageHeightScaled;
			const transparencyContext = transparencyCanvas.getContext('2d', { willReadFrequently: true });
			transparencyContext.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, imageWidthScaled, imageHeightScaled);
			imageData = transparencyContext.getImageData(0, 0, imageWidthScaled, imageHeightScaled).data;
		}

		const result = analyzeImageData({
			buffer,
			imageData,
			width: imageWidthScaled,
			height: imageHeightScaled,
			settings,
			skipTransparencyCheck,
			fileName: image.src,
		});

		localStorage?.setItem(cacheKey, JSON.stringify(result));

		return result;
	} catch (error) {
		console.error('Error analyzing image:', error);

		return false;
	}
};

/**
 * Async version of analyzeImage for use in web workers or off-main-thread contexts.
 * Accepts image data as ArrayBuffer, Blob, or ImageBitmap, and uses OffscreenCanvas.
 *
 * @param {ImageBitmap|Blob|ArrayBuffer|string} imageSource - Source for the image (ImageBitmap, Blob, ArrayBuffer, or URL string).
 * @param {ImageAnalysisSettings} [settings] - Optional settings to customize the analysis.
 *
 * @returns {Promise<{ isDark: boolean, dominantColors: Array<{ color: string, area: number, isDark: boolean }>, isTransparent: boolean } | false>}
 *   Returns a promise resolving to the analysis result object, or false if an error occurred.
 */
export const analyzeImageAsync = async (
	imageSource,
	rawSettings,
	// Dependencies injected by useWebWorkerFn via localDependencies array
	fbfc,
	fr,
	ac,
	dck,
	srgbFn,
	cssFn,
) => {
	// Define defaults inside the function for web worker compatibility
	const defaults = {
		numColors: 3,
		lightnessThreshold: 0.5,
		yFrom: 0.0,
		yTo: 1.0,
		maxSize: 320,
		alphaThreshold: 30,
	};
	const settings = Object.assign({}, defaults, rawSettings);
	const numColors = settings.numColors;
	const lightnessThreshold = settings.lightnessThreshold;
	const yFrom = settings.yFrom;
	const yTo = settings.yTo;
	const maxSize = settings.maxSize;
	const alphaThreshold = settings.alphaThreshold;

	// Helper: Get file extension from URL (inlined for worker compatibility)
	const getFileExt = (input) => {
		try {
			const url = new URL(input);
			const match = url.pathname.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);

			return match ? match[1].toLowerCase() : null;
		} catch {
			return null;
		}
	};

	// Helper: Check if color is dark (inlined for worker compatibility)
	const isColorDark = (r, g, b, threshold) => {
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

		return luminance < threshold;
	};

	// Helper: Check transparency (inlined for worker compatibility)
	const checkTransparency = (imageData, w, h) => {
		const transparency = { any: true, left: true, right: true, top: true, bottom: true };
		let counts = { any: 0, left: 0, right: 0, top: 0, bottom: 0 };
		const perimeterThresholdW = Math.floor(0.15 * w);
		const perimeterThresholdH = Math.floor((h > 100 ? 0.05 : 0.5) * h);
		const innerThreshold = Math.floor(w * h * 0.001);

		if (w > 0 && h > 0) {
			// Top row
			for (let x = 0; x < w; x++) {
				if (imageData[(0 * w + x) * 4 + 3] > alphaThreshold) {
					counts.top++;

					if (counts.top >= perimeterThresholdW) {
						transparency.top = false;
						break;
					}
				}
			}

			// Bottom row
			for (let x = 0; x < w; x++) {
				if (imageData[((h - 1) * w + x) * 4 + 3] > alphaThreshold) {
					counts.bottom++;

					if (counts.bottom >= perimeterThresholdW) {
						transparency.bottom = false;
						break;
					}
				}
			}

			// Left column
			for (let y = 0; y < h; y++) {
				if (imageData[(y * w + 0) * 4 + 3] > alphaThreshold) {
					counts.left++;

					if (counts.left >= perimeterThresholdH) {
						transparency.left = false;
						break;
					}
				}
			}

			// Right column
			for (let y = 0; y < h; y++) {
				if (imageData[(y * w + (w - 1)) * 4 + 3] > alphaThreshold) {
					counts.right++;

					if (counts.right >= perimeterThresholdH) {
						transparency.right = false;
						break;
					}
				}
			}

			// Check for any transparency if perimeters are opaque
			if (!transparency.top && !transparency.bottom && !transparency.left && !transparency.right) {
				for (let i = 3; i < imageData.length; i += 4) {
					if (imageData[i] > alphaThreshold) {
						counts.any++;

						if (counts.any >= innerThreshold) {
							transparency.any = false;
							break;
						}
					}
				}
			} else {
				transparency.any = true;
			}
		}

		return transparency;
	};

	try {
		let imageBitmap;

		// Load imageBitmap from various sources
		if (typeof imageSource === 'string') {
			// URL string
			imageBitmap = await createImageBitmap(await (await fetch(imageSource)).blob());
		} else if (imageSource instanceof Blob) {
			imageBitmap = await createImageBitmap(imageSource);
		} else if (imageSource instanceof ArrayBuffer) {
			imageBitmap = await createImageBitmap(new Blob([imageSource]));
		} else if (imageSource instanceof ImageBitmap) {
			imageBitmap = imageSource;
		} else {
			throw new Error('Unsupported imageSource type');
		}

		const imageWidth = imageBitmap.width;
		const imageHeight = imageBitmap.height;

		if (!imageWidth || !imageHeight) {
			return false;
		}

		// == Optimization ==
		let imageScale = 1;

		if (imageWidth > maxSize || imageHeight > maxSize) {
			imageScale = Math.min(maxSize / imageWidth, maxSize / imageHeight);
		}

		const imageWidthScaled = Math.floor(imageWidth * imageScale);
		const imageHeightScaled = Math.floor(imageHeight * imageScale);

		// == Color check ==
		const srcX = 0;
		const srcY = Math.floor(yFrom * imageHeight);
		const srcW = Math.max(1, imageWidth);
		const srcH = Math.max(1, Math.ceil((yTo - yFrom) * imageHeight));
		const destW = Math.max(1, imageWidthScaled);
		const destH = Math.max(1, Math.ceil((yTo - yFrom) * imageHeightScaled));

		// Use OffscreenCanvas for worker context
		const colorCanvas =
			typeof OffscreenCanvas !== 'undefined'
				? new OffscreenCanvas(destW, destH)
				: (() => {
						const c = document.createElement('canvas');
						c.width = destW;
						c.height = destH;

						return c;
					})();

		const colorContext = colorCanvas.getContext('2d');
		colorContext.drawImage(imageBitmap, srcX, srcY, srcW, srcH, 0, 0, destW, destH);
		const buffer = fbfc(colorCanvas, fr);

		const data = ac(buffer, {
			numColors: numColors,
			dominantFn: (pixels, num) =>
				dck(pixels, num, {
					filter: (p) => {
						const { alpha } = srgbFn(p);

						return alpha > 0;
					},
				}),
			prec: 0.01,
		});

		const { lumImg, srgb: srgbData, areas: colorAreas } = data;

		// Validate that srgbData is an array
		if (!Array.isArray(srgbData)) {
			console.error('srgbData is not an array:', srgbData, 'Full data:', data);

			return false;
		}

		// == Transparency check ==
		let transparencyInfo = false;

		// Only check transparency for supported formats
		let skipTransparencyCheck = false;

		if (typeof imageSource === 'string') {
			const fileExtension = getFileExt(imageSource);

			if (fileExtension) {
				skipTransparencyCheck = !['png', 'webp', 'gif', 'tiff', 'svg', 'avif'].includes(fileExtension);
			}
		}

		if (!skipTransparencyCheck) {
			const transparencyCanvas =
				typeof OffscreenCanvas !== 'undefined'
					? new OffscreenCanvas(imageWidthScaled, imageHeightScaled)
					: (() => {
							const c = document.createElement('canvas');
							c.width = imageWidthScaled;
							c.height = imageHeightScaled;

							return c;
						})();
			const transparencyContext = transparencyCanvas.getContext('2d');
			transparencyContext.drawImage(imageBitmap, 0, 0, imageWidth, imageHeight, 0, 0, imageWidthScaled, imageHeightScaled);
			const imageData = transparencyContext.getImageData(0, 0, imageWidthScaled, imageHeightScaled).data;
			transparencyInfo = checkTransparency(imageData, imageWidthScaled, imageHeightScaled);
		}

		// == Output ==
		return {
			isDark: lumImg.mean < lightnessThreshold,
			isTransparent: skipTransparencyCheck ? false : transparencyInfo?.any,
			transparencyInfo: skipTransparencyCheck ? null : transparencyInfo,
			dominantColors: srgbData.map(({ r, g, b }, index) => ({
				color: cssFn([r, g, b]),
				area: colorAreas?.[index],
				isDark: isColorDark(r * 255, g * 255, b * 255, lightnessThreshold),
			})),
		};
	} catch (error) {
		console.error('Error analyzing image (async):', error);

		return false;
	}
};

/**
 * Check image transparency by analyzing pixel alpha values.
 *
 * @param {Uint8ClampedArray} imageData - The image data array containing RGBA values.
 * @param {number} w - The width of the image.
 * @param {number} h - The height of the image.
 * @param {ImageAnalysisSettings} [settings] - Optional settings to customize the transparency check.
 *
 * @return {{ any: boolean, left: boolean, right: boolean, top: boolean, bottom: boolean }} An object indicating transparency on different sides of the image.
 *
 * @preserve
 */
export const checkTransparency = (imageData, w, h, settings = {}) => {
	const { alphaThreshold } = { ...defaultAnalysisSettings, ...settings };

	const transparency = {
		any: true,
		left: true,
		right: true,
		top: true,
		bottom: true,
	};

	let counts = {
		any: 0,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	};

	const perimeterThresholdW = Math.floor(0.15 * w);
	const perimeterThresholdH = Math.floor((h > 100 ? 0.05 : 0.5) * h);
	const innerThreshold = Math.floor(w * h * 0.001);

	// Check perimeter transparency first
	if (w > 0 && h > 0) {
		// Top row
		for (let x = 0; x < w; x++) {
			const idx = (0 * w + x) * 4 + 3;

			if (imageData[idx] > alphaThreshold) {
				counts.top++;

				if (counts.top >= perimeterThresholdW) {
					transparency.top = false;
					break;
				}
			}
		}

		// Bottom row
		for (let x = 0; x < w; x++) {
			const idx = ((h - 1) * w + x) * 4 + 3;

			if (imageData[idx] > alphaThreshold) {
				counts.bottom++;

				if (counts.bottom >= perimeterThresholdW) {
					transparency.bottom = false;
					break;
				}
			}
		}

		// Left column
		for (let y = 0; y < h; y++) {
			const idx = (y * w + 0) * 4 + 3;

			if (imageData[idx] > alphaThreshold) {
				counts.left++;

				if (counts.left >= perimeterThresholdH) {
					transparency.left = false;
					break;
				}
			}
		}

		// Right column.
		for (let y = 0; y < h; y++) {
			const idx = (y * w + (w - 1)) * 4 + 3;

			if (imageData[idx] > alphaThreshold) {
				counts.right++;

				if (counts.right >= perimeterThresholdH) {
					transparency.right = false;
					break;
				}
			}
		}

		// Check for any transparency if perimeters are opaque.
		if (!transparency.top && !transparency.bottom && !transparency.left && !transparency.right) {
			for (let i = 3; i < imageData.length; i += 4) {
				if (imageData[i] > alphaThreshold) {
					counts.any++;

					if (counts.any >= innerThreshold) {
						transparency.any = false;
						break;
					}
				}
			}
		} else {
			transparency.any = true;
		}
	}

	return transparency;
};

/**
 * Get file extension from a URL string.
 *
 * @param {string} input - The URL string to extract the file extension from.
 *
 * @returns {string|null} The file extension in lowercase, or null if not found.
 *
 * @example
 * getFileExtension('https://example.com/image.png'); // 'png'
 * getFileExtension('https://example.com/archive.tar.gz'); // 'gz'
 * getFileExtension('https://example.com/no-extension'); // null
 *
 * @preserve
 */
export const getFileExtension = (input) => {
	const url = new URL(input);
	const pathname = url.pathname;
	const match = pathname.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);

	return match ? match[1].toLowerCase() : null;
};

/**
 * Determine if a color is considered "dark" based on its RGB values and a lightness threshold.
 *
 * @param {number} r - Red component (0-255).
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @param {number} [threshold=0.5] - Lightness threshold (0.0 - 1.0) below which the color is considered dark.
 *
 * @returns {boolean} True if the color is dark, false otherwise.
 *
 * @example
 * isColorDark(0, 0, 0); // true (black)
 * isColorDark(255, 255, 255); // false (white)
 * isColorDark(100, 100, 100, 0.4); // false (gray with higher threshold)
 *
 * @preserve
 */
export const isColorDark = (r, g, b, threshold = 0.5) => {
	// Calculate the relative luminance of the color
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// A threshold of 0.5 is commonly used to determine if a color is dark or light
	return luminance < threshold;
};

/**
 * Core analysis logic shared by both main thread and worker.
 *
 * @param {Object} options - Configuration options
 * @prop {Float32Array} buffer - Float32Array RGBA buffer (from floatBufferFromCanvas)
 * @prop {Uint8ClampedArray} imageData - Uint8ClampedArray (from getImageData)
 * @prop {number} width - Image width
 * @prop {number} height - Image height
 * @prop {ImageAnalysisSettings} settings - Analysis settings
 * @prop {boolean} skipTransparencyCheck - Boolean to skip transparency check
 *
 * @returns {ImageAnalysisResult}
 *
 * @preserve
 */
export const analyzeImageData = ({ buffer, imageData, width, height, settings, skipTransparencyCheck = false }) => {
	const { numColors, lightnessThreshold } = settings;

	const data = analyzeColors(buffer, {
		numColors,
		dominantFn: (pixels, num) =>
			dominantColorsKmeans(pixels, num, {
				filter: (p) => srgb(p).alpha > 0,
			}),
		prec: 0.01,
	});

	const { lumImg, srgb: srgbData, areas: colorAreas } = data;

	let transparencyInfo = false;

	if (!skipTransparencyCheck && imageData) {
		transparencyInfo = checkTransparency(imageData, width, height, settings);
	}

	return {
		isDark: lumImg.mean < lightnessThreshold,
		isTransparent: skipTransparencyCheck ? false : transparencyInfo?.any,
		transparencyInfo: skipTransparencyCheck ? null : transparencyInfo,
		dominantColors: srgbData.map(({ r, g, b }, index) => ({
			color: css([r, g, b]),
			area: colorAreas?.[index],
			isDark: isColorDark(r * 255, g * 255, b * 255, lightnessThreshold),
		})),
	};
};
