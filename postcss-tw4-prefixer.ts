import type { Plugin } from 'vite';

import { replaceTwPrefix } from './tw4-prefixer-shared.ts';

export default function tw4Prefixer(): Plugin {
	return {
		name: 'vite-tw4-prefixer',
		enforce: 'post',

		transform(code, id) {
			if (!id.endsWith('.css')) {
				return null;
			}

			return {
				code: replaceTwPrefix(code),
				map: null,
			};
		},
	};
}
