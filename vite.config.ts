import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';
import { defineConfig, type UserConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

import externalizeFontsourceFonts from './externalize-fontsource-fonts.ts';
import tw4PrefixerBuild from './postcss-tw4-prefixer-build.ts';
import tw4Prefixer from './postcss-tw4-prefixer.ts';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const buildInputs: Array<[string, string]> = [
	...glob
		.sync('lib/**/*.{ts,tsx,js,jsx,woff2}', {
			ignore: ['lib/**/*.d.ts', 'lib/components/smart-image/image-analysis-worker.ts'],
		})
		.map((file): [string, string] => [relative('lib', file.slice(0, file.length - extname(file).length)), fileURLToPath(new URL(file, import.meta.url))]),
	...glob
		.sync('lib/wp-overrides/*.css')
		.map((file): [string, string] => [relative('lib', file.slice(0, file.length - extname(file).length)), fileURLToPath(new URL(file, import.meta.url))]),
];

export default defineConfig((): UserConfig => {
	return {
		base: './',
		plugins: [react(), libInjectCss(), tailwindcss(), tw4Prefixer(), tw4PrefixerBuild(), externalizeFontsourceFonts()],
		build: {
			copyPublicDir: true,
			lib: {
				name: 'EightshiftUiComponents',
				entry: {
					index: resolve(dirname, 'lib/index.ts'),
				},
				formats: ['es'],
			},
			minify: 'oxc',
			cssMinify: 'lightningcss',
			rolldownOptions: {
				external: (id: string) => {
					return ['react', 'react-dom', 'use-sync-external-store'].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
				},
				input: Object.fromEntries(buildInputs),
				output: {
					assetFileNames: 'assets/[name][extname]',
					entryFileNames: '[name].js',
					minify: {
						mangle: false,
						compress: false,
						codegen: {
							removeWhitespace: false,
						},
					},
					comments: {
						legal: true,
						annotation: false,
						jsdoc: true,
					},
				},
			},
		},
	};
});
