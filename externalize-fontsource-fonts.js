import { existsSync, readFileSync } from 'node:fs';
import { transform } from 'lightningcss';
import { dirname, resolve } from 'path';

const FONT_CSS_SOURCES = [
	resolve(process.cwd(), 'font-faces/geist.css'),
	resolve(process.cwd(), 'font-faces/geist-mono.css'),
	resolve(process.cwd(), 'font-faces/google-sans-flex.css'),
];

const FONT_STYLE_OUTPUTS = new Set(['assets/style.css', 'assets/style-editor.css', 'assets/style-admin.css']);

function resolveFontAssetPath(cssPath, fontPath) {
	if (fontPath.startsWith('@')) {
		const packagePath = resolve(process.cwd(), 'node_modules', fontPath);

		if (existsSync(packagePath)) {
			return packagePath;
		}

		// Geist regular is installed from the variable package.
		if (fontPath.startsWith('@fontsource/geist/')) {
			const variablePackagePath = resolve(process.cwd(), 'node_modules', fontPath.replace('@fontsource/geist/', '@fontsource-variable/geist/'));

			if (existsSync(variablePackagePath)) {
				return variablePackagePath;
			}
		}

		return packagePath;
	}

	return resolve(dirname(cssPath), fontPath);
}

function createExternalFontAssets() {
	const emittedFonts = new Map();
	const fontCss = FONT_CSS_SOURCES.map((cssPath) => {
		const css = readFileSync(cssPath, 'utf8');

		return css.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (_, _quote, relativeFontPath) => {
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
}

export default function externalizeFontsourceFonts() {
	let fontCss = '';
	let emittedFonts = new Map();
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
					code: Buffer.from(fontCss),
					minify: true,
				}).code.toString();
			}
		},

		generateBundle(_, bundle) {
			for (const [fontFileName, absoluteFontPath] of emittedFonts) {
				this.emitFile({
					type: 'asset',
					fileName: `assets/fonts/${fontFileName}`,
					source: readFileSync(absoluteFontPath),
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
