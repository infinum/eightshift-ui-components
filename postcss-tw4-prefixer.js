export default function tw4Prefixer() {
	return {
		name: 'vite-tw4-prefixer',
		enforce: 'post', // run after Tailwind

		transform(code, id) {
			if (!id.endsWith('.css')) {
				return;
			}

			let out = code.replace(/--tw-/g, '--es-uic-tw-').replace(/var\(--tw-/g, 'var(--es-uic-tw-');

			return {
				code: out,
				map: null,
			};
		},
	};
}
