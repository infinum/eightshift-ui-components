/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')
let plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'es-uic-',
	important: ':is(body,#wpwrap)',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./lib/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'sans': ['Geist', ...defaultTheme.fontFamily.sans],
			'mono': ['Geist Mono', defaultTheme.fontFamily.mono],
		},
		extend: {
			transitionDuration: {
				DEFAULT: '250ms'
			},
			spacing: {
				'3.25': '0.8125rem', // 13px
				'5.5': '1.375rem',
				'18': '4.5rem',
			},
			fontSize: {
				'sm': ['0.78125rem', 1.3], // 12.5px
				'xs': ['0.71875rem', 1.3], // 11.5px
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents }) {
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
