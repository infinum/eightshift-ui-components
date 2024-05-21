/* eslint-disable no-undef */
let plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'es-uic-',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./lib/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			spacing: {
				'18': '4.5rem',
				'5.5': '1.375rem',
			},
			fontSize: {
				// 'sm': '.8125rem', // 13px
				'sm': '.78125rem', // 12.5px
				'xs': '.65625rem', // 10.5px
			},
			// keyframes: {
			// 	slideDownAndFade: {
			// 		from: { opacity: '0', transform: 'translateY(-0.25rem)' },
			// 		to: { opacity: '1', transform: 'translateY(0)' },
			// 	},
			// 	slideLeftAndFade: {
			// 		from: { opacity: '0', transform: 'translateX(0.25rem)' },
			// 		to: { opacity: '1', transform: 'translateX(0)' },
			// 	},
			// 	slideUpAndFade: {
			// 		from: { opacity: '0', transform: 'translateY(0.25rem)' },
			// 		to: { opacity: '1', transform: 'translateY(0)' },
			// 	},
			// 	slideRightAndFade: {
			// 		from: { opacity: '0', transform: 'translateX(-0.25rem)' },
			// 		to: { opacity: '1', transform: 'translateX(0)' },
			// 	},
			// 	slideDownAndFadeOut: {
			// 		from: { opacity: '1', transform: 'translateY(0)' },
			// 		to: { opacity: '0', transform: 'translateY(-0.25rem)' },
			// 	},
			// 	slideLeftAndFadeOut: {
			// 		from: { opacity: '1', transform: 'translateX(0)' },
			// 		to: { opacity: '0', transform: 'translateX(0.25rem)' },
			// 	},
			// 	slideUpAndFadeOut: {
			// 		from: { opacity: '1', transform: 'translateY(0)' },
			// 		to: { opacity: '0', transform: 'translateY(0.25rem)' },
			// 	},
			// 	slideRightAndFadeOut: {
			// 		from: { opacity: '1', transform: 'translateX(0)' },
			// 		to: { opacity: '0', transform: 'translateX(-0.25rem)' },
			// 	},
			// 	scaleOutAndFade: {
			// 		from: { opacity: '1', scale: '1' },
			// 		to: { opacity: '0', scale: '0.95' },
			// 	},
			// },
			// animation: {
			// 	slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideDownAndFadeOut: 'slideDownAndFadeOut 200ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideLeftAndFadeOut: 'slideLeftAndFadeOut 200ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideUpAndFadeOut: 'slideUpAndFadeOut 200ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	slideRightAndFadeOut: 'slideRightAndFadeOut 200ms cubic-bezier(0.16, 1, 0.3, 1)',
			// 	scaleOutAndFade: 'scaleOutAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1)',
			// },
		},
	},
	plugins: [
		plugin(function ({ addVariant, addComponents }) {
			addVariant('r-checked', '&[data-state="checked"]');
			addVariant('r-disabled', '&[data-disabled]');
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
