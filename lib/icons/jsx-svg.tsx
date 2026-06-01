import type { JSX } from 'react';
import { svgToJsxString } from 'svg-to-jsx-string';
import JsxParser from 'react-jsx-parser';

interface JsxSvgProps {
	svg: string;
	className?: string;
	ariaHidden?: boolean;
	'aria-hidden'?: boolean;
	customProps?: string;
	customPropBindings?: Record<string, unknown>;
	noIdRandomization?: boolean;
	idRandomizationPrefix?: string;
	[key: string]: unknown;
}

// SVG child elements that react-jsx-parser needs mapped to pass-through.
// The library accepts string values as native element names in addition to components.
const svgComponents = {
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
} as unknown as Record<string, React.ComponentType>;

/**
 * Renders SVG string as JSX SVGs.
 *
 * @component
 * @param {JsxSvgProps} props - Component props.
 *
 * @returns {JSX.Element} The JsxSvg component.
 *
 * @example
 * <JsxSvg svg="<svg ..." />
 *
 * @example
 * <JsxSvg customProps='className={demo}' customPropBindings={{demo: demoAttr ? 'lorem' : 'ipsum'}} svg="<svg ..." />
 */
export const JsxSvg = (props: JsxSvgProps): JSX.Element | null => {
	const { svg, className, customProps, customPropBindings, 'aria-hidden': ariaHiddenProp, ariaHidden, noIdRandomization, idRandomizationPrefix = 'icon', ...rest } = props;

	if (!svg || typeof svg !== 'string') {
		return null;
	}

	let jsxString = svgToJsxString(svg);

	if (className && className.length > 0) {
		jsxString = jsxString.replace('<svg ', `<svg className="${className}" `);
	}

	if (ariaHiddenProp || ariaHidden) {
		jsxString = jsxString.replace('<svg ', '<svg aria-hidden="true" ');
	}

	if (customProps) {
		jsxString = jsxString.replace('<svg ', `<svg ${customProps} `);
	}

	if (!noIdRandomization) {
		const matches = Array.from(jsxString?.matchAll(/id=['"]([a-zA-Z0-9\-_]*)['"]/g))
			.map((m) => m[1])
			.filter((v): v is string => Boolean(v));

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
			components={svgComponents}
			{...rest}
		/>
	);
};
