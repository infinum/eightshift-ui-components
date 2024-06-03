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
	const smallStep = step < 10;

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
			acc[marker] = marker;
		}

		return acc;
	}, {});
};
