import { __, sprintf, _n } from '@wordpress/i18n';

interface GridTemplateOptions {
	spaceBetween?: number;
	pointWidth?: number;
	vertical?: boolean;
}

/**
 * Generates an array of markers based on the provided minimum and maximum values and step.
 * If the step is less than 10, only markers divisible by 5 and 10 are included.
 */
export const generateMarkers = (min: number, max: number, step = 10) => {
	let adjustedStep = step;
	const smallStep = adjustedStep < 10 && Math.abs(max - min) > 20;

	if (adjustedStep < 1 && Math.abs(max - min) > 2) {
		adjustedStep = 1;
	}

	if (adjustedStep < 0.1 && Math.abs(max - min) > 0.2) {
		adjustedStep = 0.1;
	}

	const markers: string[] = [];

	if (min < 0) {
		for (let i = min; i < 0; i += adjustedStep) {
			markers.push(i.toString());
		}

		for (let i = 0; i <= max; i += adjustedStep) {
			markers.push(i.toString());
		}
	} else {
		for (let i = min; i <= max; i += adjustedStep) {
			markers.push(i.toString());
		}
	}

	const markerMap: Record<string, string> = {};

	for (const marker of markers) {
		const markerValue = Number(marker);

		if (smallStep && markerValue % 5 !== 0) {
			continue;
		}

		if (smallStep && markerValue % 10 !== 0) {
			markerMap[marker] = '';
			continue;
		}

		if (markerValue < 1) {
			markerMap[marker] = markerValue.toFixed(adjustedStep < 0.1 ? 2 : 1).replace('.0', '');
			continue;
		}

		markerMap[marker] = marker;
	}

	return markerMap;
};

/**
 * Returns a human-readable string representing the column configuration.
 */
export const getColumnConfigOutputText = (columns: number, offset: number, width: number, showOuterAsGutter = false): string => {
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

	return sprintf(_n('%d col from %d', '%d cols from %d', width, 'eightshift-ui-components'), width, showOuterAsGutter ? offset - 1 : offset);
};

export const generateGridTemplate = (points: number[] = [], splitPoint: number | null = null, options: GridTemplateOptions = {}): string[] => {
	const { spaceBetween = 0, pointWidth = 3 } = options;
	const gap = spaceBetween / 16;
	const allPoints = [...points, ...(splitPoint !== null && !points.includes(splitPoint) ? [splitPoint] : [])].sort((a, b) => a - b);

	if (allPoints.length === 0) {
		return ['minmax(0, 100fr)'];
	}

	const segments: string[] = [];
	let lastPosition = 0;

	for (const point of allPoints) {
		if (point > lastPosition) {
			const segmentPercent = point - lastPosition;
			segments.push(`${segmentPercent}fr`);

			if (gap > 0) {
				segments.push(`${gap}rem`);
			}
		}

		if (points.includes(point)) {
			segments.push(`${pointWidth}px`);

			if (gap > 0) {
				segments.push(`${gap}rem`);
			}
		}

		lastPosition = point;
	}

	if (lastPosition < 100) {
		const segmentPercent = 100 - lastPosition;
		segments.push(`minmax(0, ${segmentPercent}fr)`);
	}

	return segments;
};
