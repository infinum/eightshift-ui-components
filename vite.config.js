import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			name: 'EightshiftUiComponents',
			entry: resolve('src', 'index.js'),
			formats: ['es'],
			rollupOptions: {
				external: ['react', 'react/jsx-runtime'],
			},
			manifest: true,
			copyPublicDir: false,
		}
	}
})
