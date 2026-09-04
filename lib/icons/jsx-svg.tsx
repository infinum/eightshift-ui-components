import { createElement, useId, type ComponentProps, type ComponentType, type JSX } from 'react';
import { svgToJsxString } from 'svg-to-jsx-string';
import JsxParser from 'react-jsx-parser';

type JsxParserProps = ComponentProps<typeof JsxParser>;

interface JsxSvgProps extends Omit<JsxParserProps, 'bindings' | 'components' | 'jsx' | 'renderInWrapper'> {
	svg: string;
	className?: string;
	ariaHidden?: boolean;
	'aria-hidden'?: boolean;
	customProps?: string;
	customPropBindings?: JsxParserProps['bindings'];
	noIdRandomization?: boolean;
	idRandomizationPrefix?: string;
}

const createSvgComponent = (tagName: string): ComponentType<object> => (props) => createElement(tagName, props);

// SVG child elements that react-jsx-parser needs mapped to pass-through.
// The library accepts string values as native element names in addition to components.
const svgComponents = {
	animateMotion: createSvgComponent('animateMotion'),
	animateTransform: createSvgComponent('animateTransform'),
	clipPath: createSvgComponent('clipPath'),
	feBlend: createSvgComponent('feBlend'),
	feColorMatrix: createSvgComponent('feColorMatrix'),
	feComponentTransfer: createSvgComponent('feComponentTransfer'),
	feComposite: createSvgComponent('feComposite'),
	feConvolveMatrix: createSvgComponent('feConvolveMatrix'),
	feDiffuseLighting: createSvgComponent('feDiffuseLighting'),
	feDisplacementMap: createSvgComponent('feDisplacementMap'),
	feDistantLight: createSvgComponent('feDistantLight'),
	feDropShadow: createSvgComponent('feDropShadow'),
	feFlood: createSvgComponent('feFlood'),
	feFuncA: createSvgComponent('feFuncA'),
	feFuncB: createSvgComponent('feFuncB'),
	feFuncG: createSvgComponent('feFuncG'),
	feFuncR: createSvgComponent('feFuncR'),
	feGaussianBlur: createSvgComponent('feGaussianBlur'),
	feImage: createSvgComponent('feImage'),
	feMerge: createSvgComponent('feMerge'),
	feMergeNode: createSvgComponent('feMergeNode'),
	feMorphology: createSvgComponent('feMorphology'),
	feOffset: createSvgComponent('feOffset'),
	fePointLight: createSvgComponent('fePointLight'),
	feSpecularLighting: createSvgComponent('feSpecularLighting'),
	feSpotLight: createSvgComponent('feSpotLight'),
	feTile: createSvgComponent('feTile'),
	feTurbulence: createSvgComponent('feTurbulence'),
	foreignObject: createSvgComponent('foreignObject'),
	linearGradient: createSvgComponent('linearGradient'),
	radialGradient: createSvgComponent('radialGradient'),
	textPath: createSvgComponent('textPath'),
};

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
	const instanceId = useId().replaceAll(':', '');

	if (!svg) {
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

		matches.forEach((match, index) => {
			jsxString = jsxString.replaceAll(match, `${idRandomizationPrefix}-${instanceId}-${index}`);
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
