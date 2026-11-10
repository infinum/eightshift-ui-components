import { createHash } from 'node:crypto';
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

interface ExternalFontAssets {
	fontCss: string;
	emittedFonts: Map<string, string>;
}

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

const createExternalFontAssets = (): ExternalFontAssets => {
	const emittedFonts = new Map<string, string>();
	const fontCss = FONT_CSS_SOURCES.map((cssPath) => {
		const css = readFileSync(cssPath, 'utf8');

		return css.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (_match: string, _quote: string, relativeFontPath: string) => {
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
			const fonts: Array<{ hash: string; file: string }> = [];

			for (const [fontFileName, absoluteFontPath] of emittedFonts) {
				const source = Uint8Array.from(readFileSync(absoluteFontPath));
				const file = `fonts/${fontFileName}`;

				fonts.push({ hash: createHash('sha256').update(source).digest('hex'), file });
				this.emitFile({
					type: 'asset',
					fileName: `assets/${file}`,
					source,
				});
			}

			this.emitFile({
				type: 'asset',
				fileName: 'assets/fonts-manifest.json',
				source: JSON.stringify({ version: 1, fonts, css: fontCss }, null, 2),
			});

			for (const file of Object.values(bundle)) {
				if (file.type !== 'asset' || !FONT_STYLE_OUTPUTS.has(file.fileName)) {
					continue;
				}

				this.emitFile({
					type: 'asset',
					fileName: file.fileName.replace(/\.css$/, '-no-fonts.css'),
					source: file.source,
				});

				const styleCss = file.source instanceof Uint8Array ? new TextDecoder().decode(file.source) : file.source;
				file.source = `${fontCss}\n\n${styleCss}`;
			}
		},
	};
}
