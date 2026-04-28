declare module '*.css' {
	const content: Record<string, string>;
	export default content;
}

declare module '*?raw' {
	const content: string;
	export default content;
}

declare module 'svg-to-jsx-string' {
	export function svgToJsxString(svg: string): string;
}
