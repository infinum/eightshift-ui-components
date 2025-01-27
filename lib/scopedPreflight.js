import { scopedPreflightStyles, isolateOutsideOfContainer } from 'tailwindcss-scoped-preflight';

const scopedPreflight = scopedPreflightStyles({
	isolationStrategy: isolateOutsideOfContainer(['.es-uic-no-css-reset', '.wp-admin'], {
		plus: '.es-uic-has-css-reset',
	}),
});

export default scopedPreflight;
