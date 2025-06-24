import { svgToJsxString } from 'svg-to-jsx-string';
import JsxParser from 'react-jsx-parser';

/**
 * Renders SVG string as JSX SVGs.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.svg - The SVG string to render.
 * @param {string} [props.className] - The class name to apply to the SVG. **Note**: Make sure the SVG doesn't include a class name already!
 * @param {boolean} [props.ariaHidden] - Set to `true` if the image is decorative.
 * @param {string} [props.customProps] - Custom props to add to the SVG.
 * @param {Object} [props.customPropBindings] - Dynamic bindings for custom props.
 * @param {boolean} [props.noIdRandomization] - If `true`, the SVG will not randomize IDs for defs like gradients, masks, ...
 * @param {string} [props.idRandomizationPrefix] - Sets the prefix for random IDs. Defaults to `icon`.
 *
 * @returns {JSX.Element} The JsxSvg component.
 *
 * @example
 * <JsxSvg svg="<svg ..." />
 *
 * @example
 * <JsxSvg customProps='className={demo}' customPropBindings={{demo: demoAttr ? 'lorem' : 'ipsum}} svg="<svg ..." />
 *
 * @preserve
 */
export const JsxSvg = (props) => {
	const { svg, className, customProps, customPropBindings, 'aria-hidden': ariaHiddenProp, ariaHidden, noIdRandomization, idRandomizationPrefix = 'icon', ...rest } = props;

	if (!svg || typeof svg !== 'string') {
		return null;
	}

	let jsxString = svgToJsxString(svg);

	if (className?.length > 0) {
		jsxString = jsxString.replace('<svg ', `<svg className="${className}" `);
	}

	if (ariaHiddenProp || ariaHidden) {
		jsxString = jsxString.replace('<svg ', `<svg aria-hidden="true" `);
	}

	if (customProps) {
		jsxString = jsxString.replace('<svg ', `<svg ${customProps} `);
	}

	// Randomize IDs.
	if (!noIdRandomization) {
		const matches = Array.from(jsxString?.matchAll(/id=[\'"]([a-zA-Z0-9\-\_]*)[\'"]/g), (m) => m?.[1])?.filter(Boolean);

		// Make all IDs unique and random.
		matches.forEach((match) => {
			const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			jsxString = jsxString.replaceAll(match, `${idRandomizationPrefix}-${newId}`);
		});
	}

	return (
		<JsxParser
			renderInWrapper={false}
			jsx={jsxString}
			bindings={customPropBindings}
			components={{
				animateMotion: 'animateMotion',
				animateTransform: 'animateTransform',
				clipPath: 'clipPath',
				feBlend: 'feBlend',
				feColorMatrix: 'feColorMatrix',
				feComponentTransfer: 'feComponentTransfer',
				feComposite: 'feComposite',
				feConvolveMatrix: 'feConvolveMatrix',
				feDiffuseLighting: 'feDiffuseLighting',
				feDisplacementMap: 'feDisplacementMap',
				feDistantLight: 'feDistantLight',
				feDropShadow: 'feDropShadow',
				feFlood: 'feFlood',
				feFuncA: 'feFuncA',
				feFuncB: 'feFuncB',
				feFuncG: 'feFuncG',
				feFuncR: 'feFuncR',
				feGaussianBlur: 'feGaussianBlur',
				feImage: 'feImage',
				feMerge: 'feMerge',
				feMergeNode: 'feMergeNode',
				feMorphology: 'feMorphology',
				feOffset: 'feOffset',
				fePointLight: 'fePointLight',
				feSpecularLighting: 'feSpecularLighting',
				feSpotLight: 'feSpotLight',
				feTile: 'feTile',
				feTurbulence: 'feTurbulence',
				foreignObject: 'foreignObject',
				linearGradient: 'linearGradient',
				radialGradient: 'radialGradient',
				textPath: 'textPath',
			}}
			{...rest}
		/>
	);
};
