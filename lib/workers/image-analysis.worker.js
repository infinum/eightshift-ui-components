import { floatBufferFromCanvas, FLOAT_RGBA } from '@thi.ng/pixel';
import { analyzeColors } from '@thi.ng/pixel-analysis';
import { dominantColorsKmeans } from '@thi.ng/pixel-dominant-colors';
import { srgb, css } from '@thi.ng/color';

/**
 * Web Worker for image analysis
 */
self.onmessage = async (event) => {
	const { imageBitmap, settings } = event.data;

	try {
		const result = await analyzeImageInWorker(imageBitmap, settings);
		self.postMessage({ success: true, data: result });
	} catch (error) {
		self.postMessage({ success: false, error: error.message, stack: error.stack });
	}
};

async function analyzeImageInWorker(imageBitmap, rawSettings) {
	const defaults = {
		numColors: 3,
		lightnessThreshold: 0.5,
		yFrom: 0.0,
		yTo: 1.0,
		maxSize: 320,
		alphaThreshold: 30,
	};

	const settings = { ...defaults, ...rawSettings };
	const { numColors, lightnessThreshold, yFrom, yTo, maxSize, alphaThreshold } = settings;

	const imageWidth = imageBitmap.width;
	const imageHeight = imageBitmap.height;

	if (!imageWidth || !imageHeight) {
		return false;
	}

	// Optimization
	let imageScale = 1;

	if (imageWidth > maxSize || imageHeight > maxSize) {
		imageScale = Math.min(maxSize / imageWidth, maxSize / imageHeight);
	}

	const imageWidthScaled = Math.floor(imageWidth * imageScale);
	const imageHeightScaled = Math.floor(imageHeight * imageScale);

	// Color check
	const srcX = 0;
	const srcY = Math.floor(yFrom * imageHeight);
	const srcW = Math.max(1, imageWidth);
	const srcH = Math.max(1, Math.ceil((yTo - yFrom) * imageHeight));
	const destW = Math.max(1, imageWidthScaled);
	const destH = Math.max(1, Math.ceil((yTo - yFrom) * imageHeightScaled));

	const colorCanvas = new OffscreenCanvas(destW, destH);
	const colorContext = colorCanvas.getContext('2d');
	colorContext.drawImage(imageBitmap, srcX, srcY, srcW, srcH, 0, 0, destW, destH);

	const buffer = floatBufferFromCanvas(colorCanvas, FLOAT_RGBA);

	const data = analyzeColors(buffer, {
		numColors: numColors,
		dominantFn: (pixels, num) =>
			dominantColorsKmeans(pixels, num, {
				filter: (p) => {
					const { alpha } = srgb(p);

					return alpha > 0;
				},
			}),
		prec: 0.01,
	});

	const { lumImg, srgb: srgbData, areas: colorAreas } = data;

	// Transparency check
	const transparencyCanvas = new OffscreenCanvas(imageWidthScaled, imageHeightScaled);
	const transparencyContext = transparencyCanvas.getContext('2d');
	transparencyContext.drawImage(imageBitmap, 0, 0, imageWidth, imageHeight, 0, 0, imageWidthScaled, imageHeightScaled);

	const imageData = transparencyContext.getImageData(0, 0, imageWidthScaled, imageHeightScaled).data;
	const transparencyInfo = checkTransparency(imageData, imageWidthScaled, imageHeightScaled, alphaThreshold);

	// Helper function
	function isColorDark(r, g, b, threshold) {
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

		return luminance < threshold;
	}

	return {
		isDark: lumImg.mean < lightnessThreshold,
		isTransparent: transparencyInfo?.any,
		transparencyInfo: transparencyInfo,
		dominantColors: srgbData.map(({ r, g, b }, index) => ({
			color: css([r, g, b]),
			area: colorAreas?.[index],
			isDark: isColorDark(r * 255, g * 255, b * 255, lightnessThreshold),
		})),
	};
}

function checkTransparency(imageData, w, h, alphaThreshold) {
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

		// Right column
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
}
