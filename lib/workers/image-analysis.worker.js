import { floatBufferFromCanvas, FLOAT_RGBA } from '@thi.ng/pixel';
import { analyzeImageData } from '../utilities/general.js';

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
	const { yFrom, yTo, maxSize } = settings;
	const imageWidth = imageBitmap.width;
	const imageHeight = imageBitmap.height;

	if (!imageWidth || !imageHeight) return false;

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

	const transparencyCanvas = new OffscreenCanvas(imageWidthScaled, imageHeightScaled);
	const transparencyContext = transparencyCanvas.getContext('2d');
	transparencyContext.drawImage(imageBitmap, 0, 0, imageWidth, imageHeight, 0, 0, imageWidthScaled, imageHeightScaled);

	const imageData = transparencyContext.getImageData(0, 0, imageWidthScaled, imageHeightScaled).data;

	return analyzeImageData({
		buffer,
		imageData,
		width: imageWidthScaled,
		height: imageHeightScaled,
		settings,
	});
}
