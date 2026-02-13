const getSaturation = (r, g, b) => {
	// Convert 0-255 to 0-1
	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;

	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const delta = max - min;

	let saturation = 0;

	// If max is 0 (black), saturation is 0
	if (max !== 0) {
		saturation = delta / max;
	}

	return saturation;
};

self.onmessage = (e) => {
	const { buffer, width, height, config } = e.data;
	const { maxColors = 5, threshold = 96, transparencyThreshold = 255 } = config;
	const stride = 4;

	// [1] Check transparency.
	const isTransparent = (idx) => buffer[idx + 3] < transparencyThreshold;
	const getIdx = (x, y) => (y * width + x) * stride;

	// Corners.
	const corners = {
		topLeft: isTransparent(getIdx(0, 0)),
		topRight: isTransparent(getIdx(width - 1, 0)),
		bottomLeft: isTransparent(getIdx(0, height - 1)),
		bottomRight: isTransparent(getIdx(width - 1, height - 1)),
	};

	// Sides.
	const sides = { top: false, bottom: false, left: false, right: false };

	for (let x = 0; x < width; x += 5) {
		if (!sides.top && isTransparent(getIdx(x, 0))) sides.top = true;

		if (!sides.bottom && isTransparent(getIdx(x, height - 1))) {
			sides.bottom = true;
		}
	}

	for (let y = 0; y < height; y += 5) {
		if (!sides.left && isTransparent(getIdx(0, y))) {
			sides.left = true;
		}

		if (!sides.right && isTransparent(getIdx(width - 1, y))) {
			sides.right = true;
		}
	}

	// Internal transparency.
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

	// [2] Analyze colors.
	const colorCounts = {};
	const samplingRate = 20;
	let totalSampledPixels = 0;

	for (let i = 0; i < buffer.length; i += stride * samplingRate) {
		const a = buffer[i + 3];

		// Ignore transparent pixels for color analysis.
		if (a < 250) {
			continue;
		}

		totalSampledPixels++;

		const q = 5;
		const r = Math.round(buffer[i] / q) * q;
		const g = Math.round(buffer[i + 1] / q) * q;
		const b = Math.round(buffer[i + 2] / q) * q;

		const key = `${r},${g},${b}`;

		colorCounts[key] = (colorCounts[key] || 0) + 1;
	}

	const sortedRawColors = Object.entries(colorCounts)
		.map(([key, count]) => {
			const [r, g, b] = key.split(',').map(Number);

			return { r, g, b, count, color: `rgb(${r},${g},${b})` };
		})
		.sort((a, b) => b.count - a.count);

	const distinctPalette = [];

	for (const candidate of sortedRawColors) {
		if (distinctPalette.length >= maxColors) {
			break;
		}

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

	// Map palette data.
	const palette = distinctPalette.map((item) => {
		const percentage = parseFloat((item.count / totalSampledPixels).toFixed(3));
		const lum = 0.2126 * item.r + 0.7152 * item.g + 0.0722 * item.b;

		return {
			color: `#${((1 << 24) + (item.r << 16) + (item.g << 8) + item.b).toString(16).slice(1).toUpperCase()}`,
			area: percentage,
			isDark: lum <= 128,
			saturation: getSaturation(item.r, item.g, item.b),
		};
	});

	self.postMessage({
		dominantColors: palette,
		isDark: palette[0]?.isDark || false,
		isTransparent: internalTransparent || Object.values(corners).some((v) => v) || Object.values(sides).some((v) => v),
		transparencyInfo: {
			any: internalTransparent,
			left: sides.left || corners.topLeft || corners.bottomLeft,
			right: sides.right || corners.topRight || corners.bottomRight,
			top: sides.top || corners.topLeft || corners.topRight,
			bottom: sides.bottom || corners.bottomLeft || corners.bottomRight,
			topLeftCorner: corners.topLeft,
			topRightCorner: corners.topRight,
			bottomLeftCorner: corners.bottomLeft,
			bottomRightCorner: corners.bottomRight,
		},
	});
};
