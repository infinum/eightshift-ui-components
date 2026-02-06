export default function tw4PrefixerBuild() {
	return {
		name: 'vite-tw4-prefixer-build',
		apply: 'build',

		generateBundle(_, bundle) {
			for (const file of Object.values(bundle)) {
				if (file.type === 'asset' && file.fileName.endsWith('.css')) {
					let css = file.source.toString();

					css = css.replace(/--tw-/g, '--es-uic-tw-').replace(/var\(--tw-/g, 'var(--es-uic-tw-');

					file.source = css;
				}
			}
		},
	};
}
