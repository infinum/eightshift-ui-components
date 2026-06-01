/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope;

type WorkerConfig = {
	maxColors?: number;
	threshold?: number;
	transparencyThreshold?: number;
};

type WorkerRequest = {
	buffer: Uint8ClampedArray;
	width: number;
	height: number;
	config?: WorkerConfig;
};

type PaletteColor = {
	color: string;
	area: number;
	isDark: boolean;
	saturation: number;
};

type AverageColor = {
	color: string;
	isDark: boolean;
	saturation: number;
};

type TransparencyInfo = {
	any: boolean;
	left: boolean;
	right: boolean;
	top: boolean;
	bottom: boolean;
	topLeftCorner: boolean;
	topRightCorner: boolean;
	bottomLeftCorner: boolean;
	bottomRightCorner: boolean;
};

type WorkerResponse = {
	dominantColors: PaletteColor[];
	averageColor: AverageColor | null;
	isDark: boolean;
	isTransparent: boolean;
	transparencyInfo: TransparencyInfo;
};

type PaletteCandidate = {
	r: number;
	g: number;
	b: number;
	count: number;
};

const STRIDE = 4;

const getSaturation = (redValue: number, greenValue: number, blueValue: number): number => {
	const red = redValue / 255;
	const green = greenValue / 255;
	const blue = blueValue / 255;
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const delta = max - min;

	if (max < 0.05) {
		return 0;
	}

	const saturation = max === 0 ? 0 : delta / max;

	return parseFloat(saturation.toFixed(3));
};

const rgbToHex = (red: number, green: number, blue: number): string => `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`;

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
	const { buffer, width, height, config = {} } = event.data;
	const { maxColors = 5, threshold = 96, transparencyThreshold = 255 } = config;
	const getBufferValue = (index: number): number => buffer[index] ?? 0;
	const isTransparent = (index: number): boolean => getBufferValue(index + 3) < transparencyThreshold;
	const getIndex = (x: number, y: number): number => (y * width + x) * STRIDE;

	const corners = {
		topLeft: isTransparent(getIndex(0, 0)),
		topRight: isTransparent(getIndex(width - 1, 0)),
		bottomLeft: isTransparent(getIndex(0, height - 1)),
		bottomRight: isTransparent(getIndex(width - 1, height - 1)),
	};

	const sides = { top: false, bottom: false, left: false, right: false };

	for (let x = 0; x < width; x += 5) {
		if (!sides.top && isTransparent(getIndex(x, 0))) {
			sides.top = true;
		}

		if (!sides.bottom && isTransparent(getIndex(x, height - 1))) {
			sides.bottom = true;
		}
	}

	for (let y = 0; y < height; y += 5) {
		if (!sides.left && isTransparent(getIndex(0, y))) {
			sides.left = true;
		}

		if (!sides.right && isTransparent(getIndex(width - 1, y))) {
			sides.right = true;
		}
	}

	let internalTransparent = false;
	const borderIsSolid = !Object.values(sides).some(Boolean);

	if (borderIsSolid) {
		const length = buffer.length;
		const step = Math.max(STRIDE, Math.floor(length / 100));

		for (let index = 0; index < length; index += step) {
			const normalizedIndex = index - (index % STRIDE);

			if (getBufferValue(normalizedIndex + 3) < 255) {
				internalTransparent = true;
				break;
			}
		}
	} else {
		internalTransparent = true;
	}

	const colorCounts: Record<string, number> = {};
	const samplingRate = 20;
	let totalSampledPixels = 0;
	let sumRed = 0;
	let sumGreen = 0;
	let sumBlue = 0;

	for (let index = 0; index < buffer.length; index += STRIDE * samplingRate) {
		const rawRed = getBufferValue(index);
		const rawGreen = getBufferValue(index + 1);
		const rawBlue = getBufferValue(index + 2);
		const alpha = getBufferValue(index + 3);

		if (alpha < 250) {
			continue;
		}

		totalSampledPixels++;
		sumRed += rawRed;
		sumGreen += rawGreen;
		sumBlue += rawBlue;

		const quantization = 5;
		const red = Math.round(rawRed / quantization) * quantization;
		const green = Math.round(rawGreen / quantization) * quantization;
		const blue = Math.round(rawBlue / quantization) * quantization;
		const key = `${red},${green},${blue}`;

		colorCounts[key] = (colorCounts[key] || 0) + 1;
	}

	let averageColor: AverageColor | null = null;

	if (totalSampledPixels > 0) {
		const averageRed = Math.round(sumRed / totalSampledPixels);
		const averageGreen = Math.round(sumGreen / totalSampledPixels);
		const averageBlue = Math.round(sumBlue / totalSampledPixels);
		const averageLuminance = 0.2126 * averageRed + 0.7152 * averageGreen + 0.0722 * averageBlue;

		averageColor = {
			color: rgbToHex(averageRed, averageGreen, averageBlue),
			isDark: averageLuminance <= 128,
			saturation: getSaturation(averageRed, averageGreen, averageBlue),
		};
	}

	const sortedRawColors = Object.entries(colorCounts)
		.map(([key, count]) => {
			const [red, green, blue] = key.split(',').map(Number);

			return { r: red, g: green, b: blue, count } as PaletteCandidate;
		})
		.sort((left, right) => right.count - left.count);

	const distinctPalette: PaletteCandidate[] = [];

	for (const candidate of sortedRawColors) {
		if (distinctPalette.length >= maxColors) {
			break;
		}

		let isSimilar = false;

		for (const existing of distinctPalette) {
			const distance = Math.sqrt(Math.pow(candidate.r - existing.r, 2) + Math.pow(candidate.g - existing.g, 2) + Math.pow(candidate.b - existing.b, 2));

			if (distance < threshold) {
				existing.count += candidate.count;
				isSimilar = true;
				break;
			}
		}

		if (!isSimilar) {
			distinctPalette.push({ ...candidate });
		}
	}

	const palette = distinctPalette.map((item) => {
		const percentage = totalSampledPixels > 0 ? parseFloat((item.count / totalSampledPixels).toFixed(3)) : 0;
		const luminance = 0.2126 * item.r + 0.7152 * item.g + 0.0722 * item.b;

		return {
			color: rgbToHex(item.r, item.g, item.b),
			area: percentage,
			isDark: luminance <= 128,
			saturation: getSaturation(item.r, item.g, item.b),
		};
	});

	const result: WorkerResponse = {
		dominantColors: palette,
		averageColor,
		isDark: palette[0]?.isDark || false,
		isTransparent: internalTransparent || Object.values(corners).some(Boolean) || Object.values(sides).some(Boolean),
		transparencyInfo: {
			any: internalTransparent,
			left: sides.left,
			right: sides.right,
			top: sides.top,
			bottom: sides.bottom,
			topLeftCorner: corners.topLeft,
			topRightCorner: corners.topRight,
			bottomLeftCorner: corners.bottomLeft,
			bottomRightCorner: corners.bottomRight,
		},
	};

	self.postMessage(result);
};

export {};
