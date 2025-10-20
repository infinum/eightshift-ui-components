import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), libInjectCss(), tailwindcss()],
	worker: {
		format: 'es',
		plugins: () => [react()],
		rollupOptions: {
			output: {
				entryFileNames: 'workers/[name].js',
				chunkFileNames: 'workers/[name]-[hash].js',
			},
		},
	},
	build: {
		copyPublicDir: true,
		lib: {
			name: 'EightshiftUiComponents',
			entry: {
				index: resolve(__dirname, 'lib/index.js'),
			},
			formats: ['es'],
		},
		cssMinify: false, // 'lightningcss',
		minify: 'keepNames',
		// commonjsOptions: {
		// 	transformMixedEsModules: true,
		// },
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			input: {
				...Object.fromEntries(
					// https://rollupjs.org/configuration-options/#input
					glob
						.sync('lib/**/*.{js,jsx,woff2}', {
							ignore: ['lib/**/*.d.ts', 'lib/**/*.worker.js'],
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
				// Add worker files as separate entries
				'workers/image-analysis.worker': resolve(__dirname, 'lib/workers/image-analysis.worker.js'),
			},
			output: {
				assetFileNames: 'assets/[name][extname]',
				entryFileNames: '[name].js',
			},
		},
	},
});
