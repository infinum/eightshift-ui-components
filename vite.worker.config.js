import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: false,
		outDir: 'dist/worker',
		rollupOptions: {
			input: resolve(__dirname, 'lib/workers/image-analysis.worker.js'),
			output: {
				entryFileNames: 'image-analysis.worker.js',
				format: 'iife',
				inlineDynamicImports: true,
			},
		},
		minify: true,
		emptyOutDir: false,
	},
});
