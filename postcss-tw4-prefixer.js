export default function tw4Prefixer() {
	return {
		name: 'vite-tw4-prefixer',
		enforce: 'post', // run after Tailwind

		transform(code, id) {
			if (!id.endsWith('.css')) return;

			// Rewrite variable definitions: --tw-* → --es-uic-tw-*
			let out = code.replace(/--tw-/g, '--es-uic-tw-');

			// Rewrite variable usage: var(--tw-*) → var(--es-uic-tw-*)
			out = out.replace(/var\(--es-uic-tw-/g, 'var(--es-uic-tw-');

			return {
				code: out,
				map: null,
			};
		},
	};
}
