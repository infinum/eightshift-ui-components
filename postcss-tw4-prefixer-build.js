import { replaceTwPrefix } from './tw4-prefixer-shared';

export default function tw4PrefixerBuild() {
	return {
		name: 'vite-tw4-prefixer-build',
		apply: 'build',

		generateBundle(_, bundle) {
			for (const file of Object.values(bundle)) {
				if (file.type === 'asset' && file.fileName.endsWith('.css')) {
					file.source = replaceTwPrefix(file.source.toString());
				}
			}
		},
	};
}
