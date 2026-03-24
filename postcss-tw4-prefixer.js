import { replaceTwPrefix } from './tw4-prefixer-shared';

export default function tw4Prefixer() {
	return {
		name: 'vite-tw4-prefixer',
		enforce: 'post', // run after Tailwind

		transform(code, id) {
			if (!id.endsWith('.css')) {
				return;
			}

			return {
				code: replaceTwPrefix(code),
				map: null,
			};
		},
	};
}
