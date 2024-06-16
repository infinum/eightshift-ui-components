import { svgToJsxString } from 'svg-to-jsx-string';
import JsxParser from 'react-jsx-parser';

/**
 * Renders SVG string as JSX SVGs.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.svg - The SVG string to render.
 * @param {string} [props.className] - The class name to apply to the SVG. **Note**: Make sure the SVG doesn't include a class name already!
 *
 * @returns {JSX.Element} The JsxSvg component.
 *
 * @example
 * <JsxSvg svg="<svg ..." />
 *
 * @preserve
 */
export const JsxSvg = (props) => {
	const { svg, className } = props;

	let jsxString = svgToJsxString(svg);

	if (className?.length > 0) {
		jsxString = jsxString.replace('<svg ', `<svg className="${className}" `);
	}

	return (
		<JsxParser
			renderInWrapper={false}
			jsx={jsxString}
		/>
	);
};
