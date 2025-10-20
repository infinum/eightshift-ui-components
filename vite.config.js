import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isProd = mode === 'production';

	return {
		plugins: [react(), libInjectCss(), tailwindcss()],
		build: {
			copyPublicDir: true,
			lib: {
				name: 'EightshiftUiComponents',
				entry: {
					index: resolve(__dirname, 'lib/index.js'),
				},
				formats: ['es'],
			},
			cssMinify: isProd ? 'lightningcss' : false,
			minify: 'keepNames',
			rollupOptions: {
				external: ['react', 'react/jsx-runtime'],
				input: Object.fromEntries(
					// https://rollupjs.org/configuration-options/#input
					glob
						.sync('lib/**/*.{js,jsx,woff2}', {
							ignore: ['lib/**/*.d.ts'],
						})
						.map((file) => [
							// 1. The name of the entry point
							// lib/nested/foo.js becomes nested/foo
							relative('lib', file.slice(0, file.length - extname(file).length)),
							// 2. The absolute path to the entry file
							// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
							fileURLToPath(new URL(file, import.meta.url)),
						]),
				),
				output: {
					assetFileNames: 'assets/[name][extname]',
					entryFileNames: '[name].js',
				},
			},
		},
	};
});
