import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { transform } from 'lightningcss';
import type { Plugin } from 'vite';

const FONT_CSS_SOURCES = [
	resolve(process.cwd(), 'font-faces/geist.css'),
	resolve(process.cwd(), 'font-faces/geist-mono.css'),
	resolve(process.cwd(), 'font-faces/google-sans-flex.css'),
];

const FONT_STYLE_OUTPUTS = new Set(['assets/style.css', 'assets/style-editor.css', 'assets/style-admin.css']);

const resolveFontAssetPath = (cssPath: string, fontPath: string): string => {
	if (fontPath.startsWith('@')) {
		const packagePath = resolve(process.cwd(), 'node_modules', fontPath);

		if (existsSync(packagePath)) {
			return packagePath;
		}

		if (fontPath.startsWith('@fontsource/geist/')) {
			const variablePackagePath = resolve(process.cwd(), 'node_modules', fontPath.replace('@fontsource/geist/', '@fontsource-variable/geist/'));

			if (existsSync(variablePackagePath)) {
				return variablePackagePath;
			}
		}

		return packagePath;
	}

	return resolve(dirname(cssPath), fontPath);
};

const createExternalFontAssets = (): { fontCss: string; emittedFonts: Map<string, string> } => {
	const emittedFonts = new Map<string, string>();
	const fontCss = FONT_CSS_SOURCES.map((cssPath) => {
		const css = readFileSync(cssPath, 'utf8');

		return css.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (_, _quote: string, relativeFontPath: string) => {
			const absoluteFontPath = resolveFontAssetPath(cssPath, relativeFontPath);
			const fontFileName = absoluteFontPath.split('/').at(-1);

			if (!fontFileName) {
				throw new Error(`Unable to resolve font file name for ${absoluteFontPath}`);
			}

			const existingFontPath = emittedFonts.get(fontFileName);

			if (existingFontPath && existingFontPath !== absoluteFontPath) {
				throw new Error(`Conflicting font asset names detected for ${fontFileName}`);
			}

			emittedFonts.set(fontFileName, absoluteFontPath);

			return `url('./fonts/${fontFileName}')`;
		});
	}).join('\n\n');

	return {
		fontCss,
		emittedFonts,
	};
};

export default function externalizeFontsourceFonts(): Plugin {
	let fontCss = '';
	let emittedFonts = new Map<string, string>();
	let shouldMinifyCss = false;

	return {
		name: 'vite-externalize-fontsource-fonts',
		apply: 'build',

		configResolved(config) {
			shouldMinifyCss = Boolean(config.build.cssMinify);
		},

		buildStart() {
			({ fontCss, emittedFonts } = createExternalFontAssets());

			if (shouldMinifyCss) {
				fontCss = transform({
					filename: 'externalized-fontsource-fonts.css',
					code: new TextEncoder().encode(fontCss),
					minify: true,
				}).code.toString();
			}
		},

		generateBundle(_, bundle) {
			for (const [fontFileName, absoluteFontPath] of emittedFonts) {
				this.emitFile({
					type: 'asset',
					fileName: `assets/fonts/${fontFileName}`,
					source: Uint8Array.from(readFileSync(absoluteFontPath)),
				});
			}

			for (const file of Object.values(bundle)) {
				if (file.type !== 'asset' || !FONT_STYLE_OUTPUTS.has(file.fileName)) {
					continue;
				}

				file.source = `${fontCss}\n\n${file.source.toString()}`;
			}
		},
	};
}
