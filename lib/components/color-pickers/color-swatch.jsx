import { ColorSwatch as ReactAriaColorSwatch, parseColor } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { __ } from '@wordpress/i18n';

/**
 * A simple color/gradient swatch.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.color] - The color to display.
 * @param {string} [props.gradient] - The gradient to display.
 * @param {string} [props.className] - Additional clsx to apply.
 * @param {string} [props.colorName] - The name of the color. Should be auto-generated for colors.
 *
 * @returns {JSX.Element} The ColorSwatch component.
 *
 * @example
 * <ColorSwatch color="#FF0000" />
 *
 * @example
 * <ColorSwatch gradient="linear-gradient(45deg, #FF0000, #00FF00)" />
 *
 * @preserve
 */
export const ColorSwatch = (props) => {
	const { color: rawColor, gradient, className, colorName } = props;

	const checkerPattern = 'repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 0.75rem 0.75rem';

	let color;

	if (rawColor && !gradient) {
		try {
			if (rawColor === 'transparent') {
				color = 'rgba(0, 0, 0, 0)';
			} else {
				color = parseColor(rawColor);
			}
		} catch (error) {
			color = null;
		}
	}

	const backgroundGradient = gradient ? `${gradient}, ${checkerPattern}` : `linear-gradient(${color}, ${color}), ${checkerPattern}`;

	return (
		<ReactAriaColorSwatch
			{...props}
			style={{
				background: (color || gradient) && backgroundGradient,
			}}
			className={() => clsx('es-uic-size-6 es-uic-rounded es-uic-border es-uic-border-gray-300 es-uic-shadow-sm', !color && !gradient && 'es-uic-bg-white', className)}
			colorName={!color && !gradient ? __('No color', 'eightshift-ui-components') : colorName}
			color={color}
		>
			{!color && !gradient && <div className='es-uic-m-auto es-uic-h-full es-uic-w-px es-uic-rotate-45 es-uic-rounded es-uic-bg-red-500' />}
		</ReactAriaColorSwatch>
	);
};
