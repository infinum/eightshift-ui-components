/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')
let plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'es-uic-',
	important: ':is(body,.block-editor-block-inspector,.block-editor-writing-flow)',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./lib/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'sans': ['Geist' ,...defaultTheme.fontFamily.sans],
			'mono': defaultTheme.fontFamily.mono,
		},
		extend: {
			spacing: {
				'3.25': '0.8125rem', // 13px
				'5.5': '1.375rem',
				'18': '4.5rem',
			},
			fontSize: {
				'sm': '0.78125rem', // 12.5px
				'xs': '0.6875rem', // 11px
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant, addComponents }) {
			addVariant('r-closed', '&[data-state="closed"]');
			addVariant('r-delayed-open', '&[data-state="delayed-open"]');
			addComponents({
				'.no-webkit-highlight': {
					'-webkit-tap-highlight-color': 'transparent',
				},
			})
		}),
		require('tailwindcss-animate'),
		require('tailwindcss-react-aria-components'),
	],
}
