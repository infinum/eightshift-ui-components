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
	const { svg, className, customProps, customPropBindings, 'aria-hidden': ariaHiddenProp, ariaHidden } = props;

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

	return (
		<JsxParser
			renderInWrapper={false}
			jsx={jsxString}
			bindings={customPropBindings}
		/>
	);
};
