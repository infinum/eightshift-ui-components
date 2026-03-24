const getSaturation = (r, g, b) => {
	// Convert 0-255 to 0-1 range.
	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;

	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const delta = max - min;

	// If the maximum brightness is less than ~5% (approx RGB 13),
	// the human eye just sees "black", regardless of the color math.
	if (max < 0.05) {
		return 0;
	}

	// Standard HSV Calculation
	let saturation = 0;

	if (max !== 0) {
		saturation = delta / max;
	}

	return parseFloat(saturation.toFixed(3));
};

// Helper to convert RGB to Hex
const rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

self.onmessage = (e) => {
	const { buffer, width, height, config } = e.data;
	const { maxColors = 5, threshold = 96, transparencyThreshold = 255 } = config;
	const stride = 4;

	// [1] Check transparency.
	const isTransparent = (idx) => buffer[idx + 3] < transparencyThreshold;
	const getIdx = (x, y) => (y * width + x) * stride;

	const corners = {
		topLeft: isTransparent(getIdx(0, 0)),
		topRight: isTransparent(getIdx(width - 1, 0)),
		bottomLeft: isTransparent(getIdx(0, height - 1)),
		bottomRight: isTransparent(getIdx(width - 1, height - 1)),
	};

	const sides = { top: false, bottom: false, left: false, right: false };

	// Scan top/bottom.
	for (let x = 0; x < width; x += 5) {
		if (!sides.top && isTransparent(getIdx(x, 0))) {
			sides.top = true;
		}

		if (!sides.bottom && isTransparent(getIdx(x, height - 1))) {
			sides.bottom = true;
		}
	}

	// Scan left/right.
	for (let y = 0; y < height; y += 5) {
		if (!sides.left && isTransparent(getIdx(0, y))) {
			sides.left = true;
		}

		if (!sides.right && isTransparent(getIdx(width - 1, y))) {
			sides.right = true;
		}
	}

	// Internal transparency check
	let internalTransparent = false;
	const borderIsSolid = !Object.values(sides).some((v) => v);

	if (borderIsSolid) {
		const len = buffer.length;
		const step = Math.floor(len / 100);

		for (let i = 0; i < len; i += step) {
			const idx = i - (i % 4);

			if (buffer[idx + 3] < 255) {
				internalTransparent = true;
				break;
			}
		}
	} else {
		internalTransparent = true;
	}

	// [2] Analyze colors (Dominant + average)
	const colorCounts = {};
	const samplingRate = 20;
	let totalSampledPixels = 0;

	// Accumulators for Average Color
	let sumR = 0;
	let sumG = 0;
	let sumB = 0;

	for (let i = 0; i < buffer.length; i += stride * samplingRate) {
		const rRaw = buffer[i];
		const gRaw = buffer[i + 1];
		const bRaw = buffer[i + 2];
		const a = buffer[i + 3];

		// Strict alpha check (ignores anti-aliased SVG edges)
		if (a < 250) continue;

		totalSampledPixels++;

		// 1. Add to Average Sums (Use raw values for accuracy)
		sumR += rRaw;
		sumG += gRaw;
		sumB += bRaw;

		// 2. Add to Dominant Color Buckets (Quantized)
		const q = 5;
		const r = Math.round(rRaw / q) * q;
		const g = Math.round(gRaw / q) * q;
		const b = Math.round(bRaw / q) * q;

		const key = `${r},${g},${b}`;
		colorCounts[key] = (colorCounts[key] || 0) + 1;
	}

	// [3] Calculate Average Color
	let averageColor = null;

	if (totalSampledPixels > 0) {
		const avgR = Math.round(sumR / totalSampledPixels);
		const avgG = Math.round(sumG / totalSampledPixels);
		const avgB = Math.round(sumB / totalSampledPixels);
		const avgLum = 0.2126 * avgR + 0.7152 * avgG + 0.0722 * avgB;

		averageColor = {
			color: rgbToHex(avgR, avgG, avgB),
			isDark: avgLum <= 128,
			saturation: getSaturation(avgR, avgG, avgB),
		};
	}

	// [4] Process Dominant Colors
	const sortedRawColors = Object.entries(colorCounts)
		.map(([key, count]) => {
			const [r, g, b] = key.split(',').map(Number);

			return { r, g, b, count };
		})
		.sort((a, b) => b.count - a.count);

	const distinctPalette = [];

	for (const candidate of sortedRawColors) {
		if (distinctPalette.length >= maxColors) break;

		let isSimilar = false;

		for (const existing of distinctPalette) {
			const dist = Math.sqrt(Math.pow(candidate.r - existing.r, 2) + Math.pow(candidate.g - existing.g, 2) + Math.pow(candidate.b - existing.b, 2));

			if (dist < threshold) {
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
		const percentage = parseFloat((item.count / totalSampledPixels).toFixed(3));
		const lum = 0.2126 * item.r + 0.7152 * item.g + 0.0722 * item.b;

		return {
			color: rgbToHex(item.r, item.g, item.b),
			area: percentage,
			isDark: lum <= 128,
			saturation: getSaturation(item.r, item.g, item.b),
		};
	});

	self.postMessage({
		dominantColors: palette,
		averageColor,
		isDark: palette[0]?.isDark || false,
		isTransparent: internalTransparent || Object.values(corners).some((v) => v) || Object.values(sides).some((v) => v),
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
	});
};
