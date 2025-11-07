import { __, sprintf, _n } from '@wordpress/i18n';

/**
 * Generates an array of markers based on the provided minimum and maximum values and step.
 * If the step is less than 10, only markers divisible by 5 and 10 are included.
 *
 * @param {number} min - The minimum value for the markers.
 * @param {number} max - The maximum value for the markers.
 * @param {number} [step=10] - The step between each marker. Default is 10.
 *
 * @returns {Object} An object where the keys are the marker values and the values are either the marker value (if divisible by 10) or an empty string.
 *
 * @example
 * generateMarkers(-20, 50, 10); // { '-20': '-20', '-10': '-10', '0': '0', '10': '10', '20': '20', '30': '30', '40': '40', '50': '50' }
 *
 * @preserve
 */
export const generateMarkers = (min, max, step = 10) => {
	const smallStep = step < 10 && Math.abs(max - min) > 20;

	if (step < 1 && Math.abs(max - min) > 2) {
		step = 1;
	}

	if (step < 0.1 && Math.abs(max - min) > 0.2) {
		step = 0.1;
	}

	const markers = [];

	if (min < 0) {
		for (let i = min; i < 0; i += step) {
			markers.push(i.toString());
		}

		for (let i = 0; i <= max; i += step) {
			markers.push(i.toString());
		}
	} else {
		for (let i = min; i <= max; i += step) {
			markers.push(i.toString());
		}
	}

	return markers.reduce((acc, marker) => {
		if (smallStep && marker % 5 !== 0) {
			return acc;
		}

		if (smallStep && marker % 10 !== 0) {
			acc[marker] = '';
		} else {
			if (marker < 1) {
				acc[marker] = parseFloat(marker)
					.toFixed(step < 0.1 ? 2 : 1)
					.replace('.0', '');
			} else {
				acc[marker] = marker;
			}
		}

		return acc;
	}, {});
};

/**
 * Returns a human-readable string representing the column configuration.
 *
 * @param {Number} columns - Number of columns.
 * @param {Number} offset - Offset of the column.
 * @param {Number} width - Width of the column.
 * @param {boolean} [showOuterAsGutter=false] - If `true`, the outer columns are skipped when counting.
 *
 * @returns {string} Configuration info in a human-readable format.
 *
 * @example
 * const output = getColumnConfigOutputText(12, 1, 6); // => '6 cols from 1'
 *
 * @preserve
 */
export const getColumnConfigOutputText = (columns, offset, width, showOuterAsGutter = false) => {
	const endOffset = offset + width - 1;

	if (offset === 1 && endOffset === columns) {
		return __('Full-width', 'eightshift-ui-components');
	}

	if (showOuterAsGutter && width === 1 && offset === 1) {
		return __('Start gutter', 'eightshift-ui-components');
	}

	if (showOuterAsGutter && width === 1 && endOffset === columns) {
		return __('End gutter', 'eightshift-ui-components');
	}

	if (width === 1) {
		return sprintf(__('Col %d', 'eightshift-ui-components'), offset);
	}

	if (offset === 1 && endOffset < columns) {
		return sprintf(__('To col %d', 'eightshift-ui-components'), showOuterAsGutter ? endOffset - 1 : endOffset);
	}

	if (offset > 1 && endOffset === columns) {
		return sprintf(__('From col %d', 'eightshift-ui-components'), showOuterAsGutter ? offset - 1 : offset);
	}

	return sprintf(_n('%s col from %s', '%s cols from %s', width, 'eightshift-ui-components'), width, showOuterAsGutter ? offset - 1 : offset);
};
export const generateGridTemplate = (points = [], splitPoint = null, { spaceBetween = 0, pointWidth = 3, vertical = false } = {}) => {
	const gap = spaceBetween / 16; // Convert px to rem

	// Combine and sort all division points (include splitPoint only if provided and not already a point)
	const allPoints = [...points, ...(splitPoint !== null && !points.includes(splitPoint) ? [splitPoint] : [])].sort((a, b) => a - b);

	if (allPoints.length === 0) {
		return ['minmax(0, 100fr)'];
	}

	const segments = [];
	let lastPosition = 0;

	allPoints.forEach((point) => {
		// Add empty segment before the point
		if (point > lastPosition) {
			const segmentPercent = point - lastPosition;
			segments.push(`${segmentPercent}fr`);

			// Add gap after this segment
			if (gap > 0) {
				segments.push(`${gap}rem`);
			}
		}

		// Add point segment if it's an actual point
		if (points.includes(point)) {
			segments.push(`${pointWidth}px`);

			// Add gap after point
			if (gap > 0) {
				segments.push(`${gap}rem`);
			}
		}

		lastPosition = point;
	});

	// Add final segment after the last point
	if (lastPosition < 100) {
		const segmentPercent = 100 - lastPosition;
		segments.push(`minmax(0, ${segmentPercent}fr)`);
	}

	return segments;
};
