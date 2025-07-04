//---------------------------------------------------------------
// Private methods

// Generic color swatch icon - separated because a random ID needs to be generated every time to ensure clip path works properly.
import { GenericColorSwatch } from './generic-color-swatch';

/**
 * UI icons.
 */
export const icons = {
	width: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='m15 8 2 2m0 0-2 2m2-2h-4M5 8l-2 2m0 0 2 2m-2-2h4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	offset: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3.25 8 2 2m0 0-2 2m2-2h-4'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m7.75 8 2 2m0 0-2 2m2-2h-4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='12'
				y='1'
				width='7'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	containerWidth: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<rect
				opacity='0.1'
				x='3'
				y='3'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.1'
				x='3'
				y='11'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.1'
				x='11'
				y='3'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.1'
				x='11'
				y='11'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<path
				d='m15 8 2 2m0 0-2 2m2-2h-4M5 8l-2 2m0 0 2 2m-2-2h4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	containerHeight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<rect
				opacity='0.1'
				x='3'
				y='3'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.1'
				x='3'
				y='11'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.1'
				x='11'
				y='3'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.1'
				x='11'
				y='11'
				width='6'
				height='6'
				rx='0.5'
				fill='currentColor'
			/>
			<path
				d='m12 15-2 2m0 0-2-2m2 2v-4m2-8-2-2m0 0L8 5m2-2v4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	containerSpacing: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				y='19.5'
				width='19'
				height='5.5'
				rx='1.5'
				transform='rotate(-90 0 19.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				width='19'
				height='5.5'
				rx='1.5'
				transform='matrix(0 -1 -1 0 20 19.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='7'
				y='1'
				width='6'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	spacingTop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19.5 2A1.5 1.5 0 0 0 18 .5H2A1.5 1.5 0 0 0 .5 2v7l2.09-1.671A1.5 1.5 0 0 1 3.525 7H16.88a1.5 1.5 0 0 1 1.06.44L19.5 9V2Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M17.5 7.5h-15A1.5 1.5 0 0 0 1 9v8.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V9a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	spacingBottom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19.5 18a1.5 1.5 0 0 1-1.5 1.5H2A1.5 1.5 0 0 1 .5 18v-7l2.09 1.671a1.5 1.5 0 0 0 .936.329H16.88a1.5 1.5 0 0 0 1.06-.44L19.5 11v7Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M17.5 12.5h-15A1.5 1.5 0 0 1 1 11V2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5V11a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	color: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.024 10.646c.27-5.299 4.616-9.388 9.707-9.135 4.074.203 7.094 2.644 8.001 6.325.456 1.853.75 5.273-2.797 4.306-3.548-.967-4.884 1.074-5.109 2.216-.266 1.962-1.875 5.438-6.18 3.643-2.935-1.224-3.81-3.646-3.622-7.355Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9.501 5.2a1 1 0 1 0 1.998.1A1 1 0 0 0 9.5 5.2Zm-3.5.75A1 1 0 1 0 8 6.05a1 1 0 0 0-2-.1Zm-2.25 3a1 1 0 1 0 1.998.1 1 1 0 0 0-1.998-.1Zm-.5 3.5a1 1 0 1 0 1.998.1 1 1 0 0 0-1.998-.1Zm2.5 2.5a1 1 0 1 0 1.998.1 1 1 0 0 0-1.998-.1Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	id: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M5 12h9.286M5.714 8H15m-1.429-4-2.857 12M9.286 4 6.429 16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	anchor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2.281 7.682c0 1.773-.594 5.672 1.781 7.09C7.033 16.547 10 16.547 10 19.5M2.281 7.682l1.781 1.773m-1.78-1.773L.5 9.455m17.219-1.773c0 1.773.593 5.672-1.782 7.09C12.97 16.547 10 16.547 10 19.5m7.719-11.818-1.782 1.773m1.782-1.773L19.5 9.455M10 19.5V4.695'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<ellipse
				cx='10'
				cy='2.77273'
				rx='1.78125'
				ry='1.77273'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	verticalAlign: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='4'
				height='13'
				rx='1.5'
				transform='matrix(1 0 0 -1 4.5 16.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.5 13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 14 5.5h-1A1.5 1.5 0 0 0 11.5 7v6Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 1h-2m-2 0h-2m-2 0H9M7 1H5M3 1H1m18 9h-2m-6 0H9m-6 0H1m18 9h-2m-2 0h-2m-2 0H9m-2 0H5m-2 0H1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	horizontalAlign: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='4'
				height='13'
				rx='1.5'
				transform='matrix(0 -1 -1 0 16.5 15.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13 8.5A1.5 1.5 0 0 0 14.5 7V6A1.5 1.5 0 0 0 13 4.5H7A1.5 1.5 0 0 0 5.5 6v1A1.5 1.5 0 0 0 7 8.5h6Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 1v2m0 2v2m0 2v2m0 2v2m0 2v2m9-18v2m0 6v2m0 6v2m9-18v2m0 2v2m0 2v2m0 2v2m0 2v2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	dividerTop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18 2.5H2A1.5 1.5 0 0 0 .5 4v12A1.5 1.5 0 0 0 2 17.5h16a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 18 2.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M1 1h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	dividerBottom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18 2.5H2A1.5 1.5 0 0 0 .5 4v12A1.5 1.5 0 0 0 2 17.5h16a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 18 2.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M1 19h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	hide: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				opacity='0.6'
				cx='10'
				cy='10'
				r='2.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 15c-5 0-8-3-9-5 1-2 4-5 9-5s8 3 9 5c-1 2-4 5-9 5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeDasharray='1.5 2'
				fill='none'
			/>
		</svg>
	),
	order: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.5'
				y='3'
				width='8.5'
				height='14'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='M5.5 14V6L3 8.2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='11'
				y='3'
				width='8.5'
				height='14'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='m13.5 6.5.155-.078A4 4 0 0 1 15.445 6h.355a1.7 1.7 0 0 1 1.7 1.7v.55a2 2 0 0 1-2 2v0a2 2 0 0 0-2 2V14h4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	wrapper: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='2.75'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='3'
				y='3'
				width='14'
				height='14'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m7 8-2 2m0 0 2 2m-2-2h3.25M13 8l2 2m0 0-2 2m2-2h-3.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	wrapperSimple: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='2.75'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='3'
				y='3'
				width='14'
				height='14'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	link: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 6H5a4 4 0 1 0 0 8h2m6-8h2a4 4 0 0 1 0 8h-2m-8-4h10'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	size: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='M14 4h2.828m0 0v2.828m0-2.828L14 6.828m-8.172 9H3m0 0V13m0 2.828L5.828 13'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	newTab: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11 1h6.5A1.5 1.5 0 0 1 19 2.5V6h-6.5A1.5 1.5 0 0 1 11 4.5V1Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	loopMode: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2.362 13.48A5.536 5.536 0 0 1 1 9.831c0-3.048 2.442-5.52 5.455-5.52h8.181m0 0L11.364 1m3.272 3.312-3.272 3.311m6.274-1.103A5.536 5.536 0 0 1 19 10.168c0 3.048-2.442 5.52-5.454 5.52H5.364m0 0L8.636 19m-3.272-3.312 3.272-3.311'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	gutter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 17.5v-15A1.5 1.5 0 0 0 3.5 1h-1A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h1A1.5 1.5 0 0 0 5 17.5Zm14 0v-15A1.5 1.5 0 0 0 17.5 1h-1A1.5 1.5 0 0 0 15 2.5v15a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='13.5'
				y='0.5'
				width='19'
				height='7'
				rx='1.5'
				transform='rotate(90 13.5 .5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	verticalSpacing: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2.5 5h15A1.5 1.5 0 0 0 19 3.5v-1A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v1A1.5 1.5 0 0 0 2.5 5Zm0 14h15a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 16.5v1A1.5 1.5 0 0 0 2.5 19Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='19.5'
				y='13.5'
				width='19'
				height='7'
				rx='1.5'
				transform='rotate(-180 19.5 13.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	textSize: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.501 12.719 8.65 16m-1.149-3.281L5.442 6.835A.5.5 0 0 0 4.97 6.5h-.29a.5.5 0 0 0-.472.335l-2.06 5.884m5.353 0H2.15m0 0L1 16m16.649-4.145L19 16m-1.351-4.145L15.2 4.345A.5.5 0 0 0 14.725 4h-.45a.5.5 0 0 0-.476.345l-2.448 7.51m6.298 0H11.35m0 0L10 16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	spacingTopIn: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M18.5 2a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v6a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1V2Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	spacingBottomIn: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 19h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M18.5 18a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-6a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v6Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	verticalAlignTop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='7.75'
				y='3'
				width='4.5'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='1.75'
				y='3'
				width='4.5'
				height='9'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M1 1h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m18 5.5-2-2m0 0-2 2m2-2v6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	verticalAlignCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='4'
				y='6'
				width='4.5'
				height='9'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='11'
				y='3'
				width='4.5'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M1 10h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	verticalAlignBottom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='4.5'
				height='14'
				rx='1.5'
				transform='matrix(1 0 0 -1 7.75 17)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				width='4.5'
				height='9'
				rx='1.5'
				transform='matrix(1 0 0 -1 1.75 17)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M1 19h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m18 14.5-2 2m0 0-2-2m2 2v-6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	verticalAlignStretch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='4.75'
				y='3'
				width='4.5'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='10.75'
				y='3'
				width='4.5'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M1 1h18M1 19h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	backgroundImage: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='13'
				y='13'
				width='12'
				height='12'
				rx='1.5'
				transform='rotate(-180 13 13)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 17.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 7 17.5V13h4.5a1.5 1.5 0 0 0 1.5-1.5V7h4.5A1.5 1.5 0 0 1 19 8.5v9Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='m19 17.333-1.943-1.727a1.5 1.5 0 0 0-2.057.06l-.045.046a1.5 1.5 0 0 1-2.005.105l-1.452-1.176a1.5 1.5 0 0 0-1.95.054L7 17m0-4v4.5A1.5 1.5 0 0 0 8.5 19h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 7H13v4.5a1.5 1.5 0 0 1-1.5 1.5H7Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				r='1'
				transform='matrix(-1 0 0 1 16 10.667)'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	itemsPerRow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3.5 6.5-1 7m4-7-1 7m-4-5H8m-7 3h6.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='10'
				y='3'
				width='5'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M20 9h-1.5A1.5 1.5 0 0 1 17 7.5v-3A1.5 1.5 0 0 1 18.5 3H20m0 14h-1.5a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5H20'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='10'
				y='11'
				width='5'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	totalItems: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='10'
				y='3'
				width='5'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M20 9h-1.5A1.5 1.5 0 0 1 17 7.5v-3A1.5 1.5 0 0 1 18.5 3H20m0 14h-1.5a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5H20'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='10'
				y='11'
				width='5'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.5 6h-6l3.913 3.901L1.5 14h6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAlignLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 2.5h12m-12 3h7m-7 3h12m-12 6h12m-12-3h7m-7 6h7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAlignCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4 2.5h12m-9 3h7m-10 3h12m-12 6h12m-9-3h7m-7 6h7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAlignRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 2.5h12m-7 3h7m-12 3h12m-12 6h12m-7-3h7m-7 6h7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAlignJustify: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 2.5h14m-14 3h14m-14 3h14m-14 6h14m-14-3h14m-14 6h14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fontFamily: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.133 13.683v-6.65m3.4-4.116h-1.7c-1.36 0-1.7 1.133-1.7 1.7v2.416m0 0H4m1.133 0H7.5m10.534-4.629c-.716-.816-2.463-1.923-3.56.99-1.096 2.913-.936 10.767-1.922 13.576-.986 2.809-3.019.991-3.008.47m2.539-11.407h4.492'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M16.803 1.87c.2.565.719 1.016 1.198.565M9.533 17.397c.2 0 .6.113.6.564'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	height: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2'
				y='19'
				width='18'
				height='16'
				rx='1.5'
				transform='rotate(-90 2 19)'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='m8 5 2-2m0 0 2 2m-2-2v4m-2 8 2 2m0 0 2-2m-2 2v-4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	horizontalAlignLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='4.5'
				height='14'
				rx='1.5'
				transform='matrix(0 1 1 0 3 7.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				width='4.5'
				height='9'
				rx='1.5'
				transform='matrix(0 1 1 0 3 1.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M1 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m5.5 18-2-2m0 0 2-2m-2 2h6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	horizontalAlignCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='14'
				y='4'
				width='4.5'
				height='9'
				rx='1.5'
				transform='rotate(90 14 4)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='17'
				y='11'
				width='4.5'
				height='14'
				rx='1.5'
				transform='rotate(90 17 11)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M10 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	horizontalAlignRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='17'
				y='7.75'
				width='4.5'
				height='14'
				rx='1.5'
				transform='rotate(90 17 7.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='17'
				y='1.75'
				width='4.5'
				height='9'
				rx='1.5'
				transform='rotate(90 17 1.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M19 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m14.5 18 2-2m0 0-2-2m2 2h-6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	horizontalAlignStretch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='4.5'
				height='14'
				rx='1.5'
				transform='matrix(0 1 1 0 3 4.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				width='4.5'
				height='14'
				rx='1.5'
				transform='matrix(0 1 1 0 3 10.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M1 1v18M19 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	image: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1 16 3.443-3.06A1.5 1.5 0 0 1 6.5 13l.888.888a1.5 1.5 0 0 0 2.17-.052l2.837-3.12a1.5 1.5 0 0 1 2.215-.005L19 15.5M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='6.5'
				cy='6.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	video: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='18'
				height='18'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M5 1.5v17M1 4h4M1 7h4m-4 3h4m-4 3h4m-4 3h4M15 4h4m-4 3h4m-4 3h4m-4 3h4m-4 3h4M15 1.5v17'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9 12.398V7.602L11.74 10 9 12.398Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	animation: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				stroke='currentColor'
				d='M1 16h18V4H1zm3 3v-3m3 3v-3m3 3v-3m3 3v-3m3 3v-3M4 4V1m3 3V1m3 3V1m3 3V1m3 3V1'
				fill='none'
			/>
			<rect
				width='18'
				height='18'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 11c-.833.333-2.5 2.6-2.5 5 0-1.348-.374-3.41-.911-4.23'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='14'
				cy='9'
				r='2'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='3.5'
				cy='9.5'
				r='0.75'
				fill='currentColor'
			/>
			<circle
				cx='5.20001'
				cy='10.35'
				r='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	autoplay: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.107 19v-5.454l3.322 2.727L11.107 19Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='m7.232 11.364.83-1.964m4.706 1.964L10 4.818 8.062 9.4m0 0h3.876'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M17.75 8.636C17.75 4.42 14.28 1 10 1 5.72 1 2.25 4.419 2.25 8.636c0 4.218 3.47 7.637 7.75 7.637.376 0 .745-.027 1.107-.078'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	videoControls: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='9.25'
				y='15.25'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='2.75'
				y='15.25'
				width='2'
				height='2'
				rx='0.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 17.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V14H1v3.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				width='18'
				height='18'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M6.25 16.25h3m2 0h6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1.5 13.5h17'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m11.75 7.25-2 1.5v-3l2 1.5Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	volume: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 11.75v-3.5a.75.75 0 0 1 .75-.75h3.078a.5.5 0 0 0 .307-.105l3.558-2.767a.5.5 0 0 1 .807.394v9.956a.5.5 0 0 1-.807.394l-3.558-2.767a.5.5 0 0 0-.307-.105H1.75a.75.75 0 0 1-.75-.75Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M12.089 12.59a5.48 5.48 0 0 0 .411-2.09c0-1-.267-1.936-.732-2.744m2.447-1.455A7.465 7.465 0 0 1 15.5 10.5c0 1.304-.333 2.53-.918 3.598m2.081-9.214A9.457 9.457 0 0 1 18.5 10.5a9.455 9.455 0 0 1-1.465 5.07'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	mute: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m17 7.5-5 5m0-5 5 5m-16-.75v-3.5a.75.75 0 0 1 .75-.75h3.078a.5.5 0 0 0 .307-.105l3.558-2.767a.5.5 0 0 1 .807.394v9.956a.5.5 0 0 1-.807.394l-3.558-2.767a.5.5 0 0 0-.307-.105H1.75a.75.75 0 0 1-.75-.75Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	muteCentered: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m18 7.5-5 5m0-5 5 5m-16-.75v-3.5a.75.75 0 0 1 .75-.75h3.078a.5.5 0 0 0 .307-.105l3.558-2.767a.5.5 0 0 1 .807.394v9.956a.5.5 0 0 1-.807.394l-3.558-2.767a.5.5 0 0 0-.307-.105H2.75a.75.75 0 0 1-.75-.75Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	solidColor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9.75'
				fill='currentColor'
			/>
		</svg>
	),
	gradient: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<mask
				maskUnits='userSpaceOnUse'
				id='23c883a8-a694-4822-9b10-bb3c420ab039'
				style={{ maskType: 'alpha' }}
				x='0'
				y='0'
				width='20'
				height='20'
			>
				<circle
					cx='10'
					cy='10'
					r='9.75'
					fill='url(#1a9d92d5-55e1-4c6e-a17a-8517215ce64a)'
				/>
			</mask>
			<g mask='url(#23c883a8-a694-4822-9b10-bb3c420ab039)'>
				<circle
					cx='10'
					cy='10'
					r='9.75'
					fill='currentColor'
				/>
			</g>
			<defs>
				<linearGradient
					gradientUnits='userSpaceOnUse'
					id='1a9d92d5-55e1-4c6e-a17a-8517215ce64a'
					x1='0.25'
					y1='0.25'
					x2='19.75'
					y2='19.75'
				>
					<stop
						offset='0.154521'
						stopColor='#fff'
					/>
					<stop
						offset='0.855692'
						stopOpacity='0'
					/>
				</linearGradient>
			</defs>
		</svg>
	),
	paletteColor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1.25'
				y='1'
				width='6.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='2.5'
				y='2.25'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='2.5'
				y='6.75'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='2.5'
				y='11.25'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M6 1h5a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 11 19H6'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8.25 2.25h2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2.5v-4Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M8.25 6.75h2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2.5v-4Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M8.25 11.25h2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2.5v-4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M10.75 1h4a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-4'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13 2.25h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H13v-4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M13 6.75h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H13v-4Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M13 11.25h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H13v-4Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M13.5 1h4A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-4'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M16.75 2.25h.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-.5v-4Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.75 6.75h.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-.5v-4Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M16.75 11.25h.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-.5v-4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
		</svg>
	),
	none: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m4 4 12 12'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	embed: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2.5'
				width='18'
				height='15'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				fill='none'
			/>
			<path
				d='M1 6.786V4a1.5 1.5 0 0 1 1.5-1.5h2.1M19 6.786V4a1.5 1.5 0 0 0-1.5-1.5h-2.1M1 13.214V16a1.5 1.5 0 0 0 1.5 1.5h2.1M19 13.214V16a1.5 1.5 0 0 1-1.5 1.5h-2.1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	play: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6 17.877V2.123a.5.5 0 0 1 .834-.372l8.753 7.877a.5.5 0 0 1 0 .744l-8.753 7.877A.5.5 0 0 1 6 17.877Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	pause: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.5 1.5v17m5.5-17v17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	stop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 16.5v-13A1.5 1.5 0 0 1 3.5 2h13A1.5 1.5 0 0 1 18 3.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 16.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	hoverZoom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.955 5.307H4.477m1.739 1.738V3.568'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M4.477 8.973A4.057 4.057 0 1 0 7.954 1.64a4.057 4.057 0 0 0-3.477 7.333Zm0 0L1 14m11 1.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	hoverRotate: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11 5.91C11 3.197 8.761 1 6 1S1 3.198 1 5.91c0 2.71 2.239 4.908 5 4.908 1.19 0 2.284-.409 3.143-1.09m0 0L6 8.635m3.143 1.091L7.667 13M12 15.903l.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	rotateLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.956 15.544c3.035 3.035 8.029 2.964 11.153-.16 3.124-3.125 3.196-8.118.16-11.154-3.035-3.035-8.028-2.963-11.152.161a8.112 8.112 0 0 0-2.335 4.777m0 0 4.135-1.563M2.782 9.168 1.613 4.423'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	rotateRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.044 15.544c-3.035 3.035-8.029 2.963-11.153-.16C.767 12.258.695 7.265 3.731 4.23c3.035-3.035 8.028-2.963 11.152.161a8.112 8.112 0 0 1 2.335 4.777m0 0-4.135-1.563m4.135 1.563 1.169-4.745'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	small: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 14.5A1.5 1.5 0 0 1 2.5 13h3A1.5 1.5 0 0 1 7 14.5v3A1.5 1.5 0 0 1 5.5 19h-3A1.5 1.5 0 0 1 1 17.5v-3Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M1 14v-3.5A1.5 1.5 0 0 1 2.5 9h7a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 9.5 19H6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	medium: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 14.5A1.5 1.5 0 0 1 2.5 13h3A1.5 1.5 0 0 1 7 14.5v3A1.5 1.5 0 0 1 5.5 19h-3A1.5 1.5 0 0 1 1 17.5v-3Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M1 14V6.5A1.5 1.5 0 0 1 2.5 5h11A1.5 1.5 0 0 1 15 6.5v11a1.5 1.5 0 0 1-1.5 1.5H6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	large: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 14.5A1.5 1.5 0 0 1 2.5 13h3A1.5 1.5 0 0 1 7 14.5v3A1.5 1.5 0 0 1 5.5 19h-3A1.5 1.5 0 0 1 1 17.5v-3Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M1 14V2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5H6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	responsiveOverrides: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4 7a.5.5 0 0 0 1 0H4Zm3.5 5a.5.5 0 0 0 0 1v-1Zm1 2.5a.5.5 0 0 0 0 1v-1Zm4 1a.5.5 0 0 0 0-1v1ZM5 7V5.5H4V7h1Zm1-2.5h9v-1H6v1Zm9 7.5h-4.5v1H15v-1Zm-4.5 0h-3v1h3v-1Zm-.5.5V15h1v-2.5h-1Zm.5 2h-2v1h2v-1Zm0 1h2v-1h-2v1Zm5.5-10V6h1v-.5h-1Zm0 5.25V11h1v-.25h-1ZM15 13a2 2 0 0 0 2-2h-1a1 1 0 0 1-1 1v1Zm0-8.5a1 1 0 0 1 1 1h1a2 2 0 0 0-2-2v1Zm-10 1a1 1 0 0 1 1-1v-1a2 2 0 0 0-2 2h1Z'
				fill='currentColor'
			/>
			<path
				d='M1 10a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='3.25'
				cy='10.5'
				r='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M14.102 7h4.796L16.5 9.74 14.102 7Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	screenLarge: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 4a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 19 4v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 14V4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M10 18.5v-3m0 3H7.5m2.5 0h2.5m-2.5-3h7.5A1.5 1.5 0 0 0 19 14V4a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 4v10a1.5 1.5 0 0 0 1.5 1.5H10Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	screenDesktop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v7.5H4V4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m3 12.5-1.776 3.553a1 1 0 0 0 .894 1.447h15.764a1 1 0 0 0 .894-1.447L17 12.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M3 4a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 17 4v8.5H3V4Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	screenTablet: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.5 3.5A.5.5 0 0 1 5 3h10a.5.5 0 0 1 .5.5V16a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='16.5'
				y='1'
				width='18'
				height='13'
				rx='1.5'
				transform='rotate(90 16.5 1)'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='17.5'
				r='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	screenMobile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='1'
				width='10'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M8.5 17.5h3'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='2.75'
				r='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	altText: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 21 20'
			width='21'
			height='20'
			fill='none'
		>
			<path
				d='m1 10.167 1.833-1.63a1.302 1.302 0 0 1 1.785.053v0a1.302 1.302 0 0 0 1.884-.045L7.534 7.41a1.5 1.5 0 0 1 2.215-.004l1.97 2.15M5.5 12h-3A1.5 1.5 0 0 1 1 10.5v-8A1.5 1.5 0 0 1 2.5 1h8A1.5 1.5 0 0 1 12 2.5v8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='4'
				cy='4'
				r='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M6.562 10c-1.117 0-2.022.84-2.022 1.875v6.25C4.54 19.16 5.445 20 6.562 20h11.456c1.117 0 2.022-.84 2.022-1.875v-6.25c0-1.036-.905-1.875-2.022-1.875H6.562Zm2.16 2.335a.5.5 0 0 0-.944 0l-1.312 3.75-.438 1.25a.5.5 0 1 0 .944.33l.32-.915h1.916l.32.915a.5.5 0 1 0 .944-.33l-.438-1.25-1.312-3.75Zm-.472 1.678.608 1.737H7.642l.608-1.736ZM12 12a.5.5 0 0 1 .5.5V17h2a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5Zm3.25 0a.5.5 0 0 0 0 1h1v4.5a.5.5 0 0 0 1 0V13h1a.5.5 0 0 0 0-1h-3Z'
				fill='currentColor'
			/>
		</svg>
	),
	help: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<circle
				cx='10'
				cy='14.75'
				r='0.5'
				fill='currentColor'
				stroke='currentColor'
				strokeWidth='0.5'
			/>
			<path
				d='M7.5 7.474c.114-.866 1.317-2.599 3.533-1.737 1.883.732 1.256 3.029.288 4.112-1.056 1.181-1.467 1.42-1.381 2.654'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	clipboard: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.35 3.4h2a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4.75a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1h2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4.95 5.1v12.2a.5.5 0 0 0 .5.5h9.7V5.1a.5.5 0 0 0-.5-.5h-9.2a.5.5 0 0 0-.5.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M6.75 4.6V2.8l1.8-.6V1h3v1.2l1.8.6v1.8h-6.6Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M7 8h4.5M7 10h3m-3 2h2'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	lock: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='3'
				y='9'
				width='14'
				height='10'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15 9V5.8C15 3.149 12.761 1 10 1S5 3.149 5 5.8V9'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='13.25'
				r='0.75'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 14v1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	accelerometer: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='10'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M9 19h8.5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17.5 9H11'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4.5 17.5h3'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='6'
				cy='2.75'
				r='0.5'
				fill='currentColor'
			/>
			<circle
				cx='17.25'
				cy='14'
				r='0.5'
				transform='rotate(90 17.25 14)'
				fill='currentColor'
			/>
		</svg>
	),
	gyroscope: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11 3.5v-1A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h7a1.5 1.5 0 0 0 1.5-1.5V17'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M4.5 17.5h3'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='6'
				cy='2.75'
				r='0.5'
				fill='currentColor'
			/>
			<ellipse
				cx='12.25'
				cy='9.29616'
				rx='7'
				ry='2.5'
				transform='rotate(15 12.25 9.296)'
				stroke='currentColor'
				fill='none'
			/>
			<ellipse
				cx='12.25'
				cy='9.29616'
				rx='6.5'
				ry='2'
				transform='rotate(-75 12.25 9.296)'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	pictureInPicture: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='9'
				y='9'
				width='8'
				height='6'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	textStrikethrough: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14.758 6s-.265-4.25-5.19-4.25c-3.284 0-4.781 2.275-4.781 3.896 0 2.71 2.052 3.24 4.104 3.848l2.052.607s4.557.972 4.557 4.05c0 2.431-2.094 4.099-5.378 4.099-3.59 0-5.622-2.883-5.622-4.503'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M18 10H2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shield: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 3.77c2.286 0 6.286-1.385 8-2.77 1.714 1.385 5.714 2.77 8 2.77v4.845C17.238 12.077 14.571 19 10 19S2.762 12.077 2 8.615V3.77Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	trash: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m4 4 2.043 14.143a1 1 0 0 0 .99.857h6.934a1 1 0 0 0 .99-.857L17 4M3 4h15'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13.5 3.5c0-1.105-1-2.5-3-2.5s-3 1.395-3 2.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9 8v7m3-7v7'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	add: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19V1m-9 9h18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	gridManual: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 10H1m6 0V5.5M7 10h6m-6 0v4.5M1 10V5.5M1 10v4.5m6-9H1m6 0V1m0 4.5h6m-12 0v-3A1.5 1.5 0 0 1 2.5 1H7m0 0h6m0 9h6m-6 0V5.5m0 4.5v4.5m6-4.5V5.5m0 4.5v4.5m-6-9h6m-6 0V1m6 4.5v-3A1.5 1.5 0 0 0 17.5 1H13M7 14.5h6m-6 0H1m6 0V19m-6-4.5v3A1.5 1.5 0 0 0 2.5 19H7m6-4.5h6m-6 0V19m6-4.5v3a1.5 1.5 0 0 1-1.5 1.5H13m-6 0h6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	gridAutoRows: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='5.5'
				cy='10'
				r='1'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='1'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='14.5'
				cy='10'
				r='1'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7 1H2.5A1.5 1.5 0 0 0 1 2.5v1.833M7 1v3.333M7 1h6M7 4.333H1m6 0V6m0-1.667h6m-12 0V7m12-6v3.333M13 1h4.5A1.5 1.5 0 0 1 19 2.5v1.833m-6 0h6m-6 0V6m6-1.667V7M7 19H2.5A1.5 1.5 0 0 1 1 17.5v-1.833M7 19v-3.333M7 19h6m-6-3.333H1m6 0V14m0 1.667h6m-12 0V13m12 6v-3.333M13 19h4.5a1.5 1.5 0 0 0 1.5-1.5v-1.833m-6 0h6m-6 0V14m6 1.667V13'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	gridAutoCols: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='5.5'
				r='1'
				transform='rotate(90 10 5.5)'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='1'
				transform='rotate(90 10 10)'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='14.5'
				r='1'
				transform='rotate(90 10 14.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 7V2.5A1.5 1.5 0 0 0 17.5 1h-1.833M19 7h-3.333M19 7v6m-3.333-6V1m0 6H14m1.667 0v6m0-12H13m6 12h-3.333M19 13v4.5a1.5 1.5 0 0 1-1.5 1.5h-1.833m0-6v6m0-6H14m1.667 6H13M1 7V2.5A1.5 1.5 0 0 1 2.5 1h1.833M1 7h3.333M1 7v6m3.333-6V1m0 6H6M4.333 7v6m0-12H7M1 13h3.333M1 13v4.5A1.5 1.5 0 0 0 2.5 19h1.833m0-6v6m0-6H6m-1.667 6H7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	gridRow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.5'
				d='M1.5 6h5v3.5h-5zm6 0h5v3.5h-5zm6 0h5v3.5h-5z'
			/>
			<path
				d='M7 10H1m6 0V5.5M7 10h6m-6 0v4.5M1 10V5.5M1 10v4.5m6-9H1m6 0V1m0 4.5h6m-12 0v-3A1.5 1.5 0 0 1 2.5 1H7m0 0h6m0 9h6m-6 0V5.5m0 4.5v4.5m6-4.5V5.5m0 4.5v4.5m-6-9h6m-6 0V1m6 4.5v-3A1.5 1.5 0 0 0 17.5 1H13M7 14.5h6m-6 0H1m6 0V19m-6-4.5v3A1.5 1.5 0 0 0 2.5 19H7m6-4.5h6m-6 0V19m6-4.5v3a1.5 1.5 0 0 1-1.5 1.5H13m-6 0h6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	gridCol: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.5'
				d='M6 18.5v-5h3.5v5zm0-6v-5h3.5v5zm0-6v-5h3.5v5z'
			/>
			<path
				d='M10 13v6m0-6H5.5m4.5 0V7m0 6h4.5M10 19H5.5m4.5 0h4.5m-9-6v6m0-6H1m4.5 0V7m0 12h-3A1.5 1.5 0 0 1 1 17.5V13m0 0V7m9 0V1m0 6H5.5M10 7h4.5M10 1H5.5M10 1h4.5m-9 6V1m0 6H1m4.5-6h-3A1.5 1.5 0 0 0 1 2.5V7m13.5 6V7m0 6v6m0-6H19m-4.5 6h3a1.5 1.5 0 0 0 1.5-1.5V13m-4.5-6V1m0 6H19m-4.5-6h3A1.5 1.5 0 0 1 19 2.5V7m0 6V7'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	gridWidth: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				d='M1.5 6h8v3.5h-8z'
			/>
			<path
				d='M5.5 10H1m4.5 0H10m-4.5 0v4.5m0-4.5V5.5M1 10V5.5M1 10v4.5m4.5-9H1m4.5 0V1m0 4.5H10m-9 0v-3A1.5 1.5 0 0 1 2.5 1h3m0 0H10m0 9h4.5M10 10V5.5m0 4.5v4.5m4.5-4.5V5.5m0 4.5v4.5m0-4.5H19m-9-4.5h4.5m-4.5 0V1m4.5 4.5V1m0 4.5H19M10 1h4.5m0 0h2.942C18.302 1 19 1.672 19 2.5v3m-13.5 9H10m-4.5 0H1m4.5 0V19M1 14.5v3A1.5 1.5 0 0 0 2.5 19h3m4.5-4.5h4.5m-4.5 0V19m4.5-4.5V19m0-4.5H19M5.5 19H10m0 0h4.5m0 0h2.942c.86 0 1.558-.672 1.558-1.5v-3m0-4.5V5.5m0 4.5v4.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	gridHeight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				d='M6 1.5v8h3.5v-8z'
			/>
			<path
				d='M10 5.5V1m0 4.5V10m0-4.5h4.5m-4.5 0H5.5M10 1H5.5M10 1h4.5m-9 4.5V1m0 4.5H1m4.5 0V10m0-9h-3A1.5 1.5 0 0 0 1 2.5v3m0 0V10m9 0v4.5m0-4.5H5.5m4.5 0h4.5M10 14.5H5.5m4.5 0h4.5m-4.5 0V19m-4.5-9v4.5m0-4.5H1m4.5 4.5H1m4.5 0V19M1 10v4.5m0 0v2.942C1 18.302 1.672 19 2.5 19h3m9-13.5V10m0-4.5V1m0 4.5H19M14.5 1h3A1.5 1.5 0 0 1 19 2.5v3M14.5 10v4.5m0-4.5H19m-4.5 4.5H19m-4.5 0V19M19 5.5V10m0 0v4.5m0 0v2.942c0 .86-.672 1.558-1.5 1.558h-3M10 19H5.5m4.5 0h4.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	aspectRatioAuto: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m17.5 3.5-4.671 4.049M2.5 16.5 5 14.333'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m12.681 11.469 1.149 3.281m-1.149-3.281-2.059-5.884a.5.5 0 0 0-.472-.335h-.29a.5.5 0 0 0-.472.335l-2.06 5.884m5.353 0H7.33m0 0L6.18 14.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	aspectRatioSixteenNine: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='5'
				width='18'
				height='10'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m17.5 6.5-15 7'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	aspectRatioThreeTwo: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='4'
				width='18'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m17.5 5.5-15 9'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	aspectRatioSquare: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M17 3 3 17'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	aspectRatioTwentyOneNine: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='6'
				width='18'
				height='8'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m17.5 7.5-15 5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	mouseWheel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='1'
				width='10'
				height='18'
				rx='4.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9.25 4.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	speed: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M12 4.5a7 7 0 1 1-5.745 11M12 4.5v-3m0 3a6.992 6.992 0 0 0-5.745 3M12 1.5H9.5m2.5 0h2.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M12 7.5v4h4M5.5 9H2m3.5 5H2m2.5-2.5H1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fastForward: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8.333 7.188-6.51-5.494A.5.5 0 0 0 1 2.076v15.848a.5.5 0 0 0 .822.382l6.511-5.494'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M8.333 17.924V2.076a.5.5 0 0 1 .823-.382l9.391 7.924a.5.5 0 0 1 0 .764l-9.391 7.924a.5.5 0 0 1-.823-.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fastReverse: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m11.667 7.188 6.51-5.494a.5.5 0 0 1 .823.382v15.848a.5.5 0 0 1-.822.382l-6.511-5.494'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11.667 17.924V2.076a.5.5 0 0 0-.823-.382L1.453 9.618a.5.5 0 0 0 0 .764l9.391 7.924a.5.5 0 0 0 .823-.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	playReverse: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15 17.924V2.076a.5.5 0 0 0-.822-.382L4.786 9.618a.5.5 0 0 0 0 .764l9.392 7.924a.5.5 0 0 0 .822-.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 10H1m0 0 7.143-7M1 10l7.143 7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 10h18m0 0-7.143-7M19 10l-7.143 7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowUp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19V1m0 0 7 7.143M10 1 3 8.143'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowDown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1v18m0 0-7-7.143M10 19l7-7.143'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	multiItemLeftInset: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='7'
				y='19'
				width='18'
				height='6.5'
				rx='1.5'
				transform='rotate(-90 7 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19.5 1H17a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 17 19h2.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='0.5'
				y='0.5'
				width='5'
				height='19'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	multiItemRightInset: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='18'
				height='6.5'
				rx='1.5'
				transform='matrix(0 -1 -1 0 13 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M.5 1H3a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 3 19H.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				width='5'
				height='19'
				rx='1.5'
				transform='matrix(-1 0 0 1 19.5 .5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	singleItemLeftInset: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 .5A1.5 1.5 0 0 0 .5 2v16A1.5 1.5 0 0 0 2 19.5h7l-1.671-2.09A1.5 1.5 0 0 1 7 16.475V3.12c0-.397.158-.779.44-1.06L9 .5H2Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M7.5 2.5v15A1.5 1.5 0 0 0 9 19h8.5a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1H9a1.5 1.5 0 0 0-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	singleItemRightInset: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18 .5A1.5 1.5 0 0 1 19.5 2v16a1.5 1.5 0 0 1-1.5 1.5h-7l1.671-2.09a1.5 1.5 0 0 0 .329-.936V3.12a1.5 1.5 0 0 0-.44-1.06L11 .5h7Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M12.5 2.5v15A1.5 1.5 0 0 1 11 19H2.5A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1H11a1.5 1.5 0 0 1 1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	multiItemLeftInsetMobile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='12.5'
				y='8'
				width='6.5'
				height='11'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M15 17.5h1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='15.75'
				cy='9.75'
				r='0.5'
				fill='currentColor'
			/>
			<path
				d='M11.5 19h-3A1.5 1.5 0 0 1 7 17.5v-15A1.5 1.5 0 0 1 8.5 1h3A1.5 1.5 0 0 1 13 2.5v4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M15 6.5a.5.5 0 0 0 1 0h-1Zm.5-4h.5-.5Zm1.5-1h2.5v-1H17v1Zm-1 5v-4h-1v4h1Zm1-6a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1v-1Z'
				fill='currentColor'
			/>
			<rect
				x='0.5'
				y='0.5'
				width='5'
				height='19'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	multiItemRightInsetMobile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='6.5'
				height='11'
				rx='1.5'
				transform='matrix(-1 0 0 1 7.5 8)'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M5 17.5H3.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				r='0.5'
				transform='matrix(-1 0 0 1 4.25 9.75)'
				fill='currentColor'
			/>
			<path
				d='M8.5 19h3a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 11.5 1h-3A1.5 1.5 0 0 0 7 2.5v4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5 6.5a.5.5 0 0 1-1 0h1Zm-.5-4H4h.5ZM3 1.5H.5v-1H3v1Zm1 5v-4h1v4H4Zm-1-6a2 2 0 0 1 2 2H4a1 1 0 0 0-1-1v-1Z'
				fill='currentColor'
			/>
			<rect
				width='5'
				height='19'
				rx='1.5'
				transform='matrix(-1 0 0 1 19.5 .5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	singleItemLeftInsetMobile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 .5A1.5 1.5 0 0 0 .5 2v16A1.5 1.5 0 0 0 2 19.5h7l-1.671-2.09A1.5 1.5 0 0 1 7 16.475V3.12c0-.397.158-.779.44-1.06L9 .5H2Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M19 6.5v-4A1.5 1.5 0 0 0 17.5 1H9a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 9 19h2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				width='6.5'
				height='11'
				rx='1.5'
				transform='matrix(-1 0 0 1 19 8)'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M16.5 17.5H15'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				r='0.5'
				transform='matrix(-1 0 0 1 15.75 9.75)'
				fill='currentColor'
			/>
		</svg>
	),
	singleItemRightInsetMobile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5.5A1.5 1.5 0 0 1 19 2v16a1.5 1.5 0 0 1-1.5 1.5h-7l1.671-2.09a1.5 1.5 0 0 0 .329-.936V3.12a1.5 1.5 0 0 0-.44-1.06L10.5.5h7Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M.5 6.5v-4A1.5 1.5 0 0 1 2 1h8.5A1.5 1.5 0 0 1 12 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='0.5'
				y='8'
				width='6.5'
				height='11'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M3 17.5h1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='3.75'
				cy='9.75'
				r='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	hoverInvertText: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m12 15.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16ZM1 6l.768-1.706M5.5 6l-.768-1.706m-2.964 0L3.25 1l1.482 3.294m-2.964 0h2.964M9.243 3.5H7.1m2.143 0 .136-.066c.44-.215.721-.662.721-1.153v0C10.1 1.574 9.526 1 8.819 1H7.1v2.5m2.143 0 .136.066c.44.215.721.662.721 1.153v0C10.1 5.426 9.526 6 8.819 6H7.1V3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M8.833 12.333 5.5 8v11l2-.667 2-2.666-.667-3.334Z'
				fill='currentColor'
			/>
			<path
				d='M9.5 14.875C9.5 17.153 7.71 19 5.5 19s-4-1.847-4-4.125C1.5 12 5.5 8 5.5 8s4 4 4 6.875Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	hoverInvertObject: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2'
				y='1'
				width='7'
				height='5'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M8.833 12.333 5.5 8v11l2-.667 2-2.666-.667-3.334Z'
				fill='currentColor'
			/>
			<path
				d='M9.5 14.875C9.5 17.153 7.71 19 5.5 19s-4-1.847-4-4.125C1.5 12 5.5 8 5.5 8s4 4 4 6.875Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m12 15.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fullWidthImage: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4 3H2.51A1.51 1.51 0 0 0 1 4.51v10.98c0 .834.676 1.51 1.51 1.51H4M16 3h1.49c.834 0 1.51.676 1.51 1.51v10.98A1.51 1.51 0 0 1 17.49 17H16'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m4 14.667 1.99-2.064a1.323 1.323 0 0 1 1.957.057 1.323 1.323 0 0 0 2.048-.048l1.16-1.489a1.5 1.5 0 0 1 2.363-.005L16 14.278M5.5 3h9A1.5 1.5 0 0 1 16 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 15.5v-11A1.5 1.5 0 0 1 5.5 3Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<circle
				cx='8'
				cy='7'
				r='1'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	wideRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m16.5 8 2 2m0 0-2 2m2-2H13'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.5 19H9a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 9 1H2.5A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M11.5 1h.5a1.5 1.5 0 0 1 1.5 1.5v5m-2 11.5h.5a1.5 1.5 0 0 0 1.5-1.5v-5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M14.25 1h.5a1.5 1.5 0 0 1 1.5 1.5V6m-2 13h.5a1.5 1.5 0 0 0 1.5-1.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M17 1h.5A1.5 1.5 0 0 1 19 2.5V7m-2 12h.5a1.5 1.5 0 0 0 1.5-1.5V13'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	wideLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3.5 8-2 2m0 0 2 2m-2-2H7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M17.5 19H11a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 11 1h6.5A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M8.5 1H8a1.5 1.5 0 0 0-1.5 1.5v5m2 11.5H8a1.5 1.5 0 0 1-1.5-1.5v-5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.75 1h-.5a1.5 1.5 0 0 0-1.5 1.5V6m2 13h-.5a1.5 1.5 0 0 1-1.5-1.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 1h-.5A1.5 1.5 0 0 0 1 2.5V7m2 12h-.5A1.5 1.5 0 0 1 1 17.5V13'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	backgroundType: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='5'
				width='14'
				height='14'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13.5 1h-11A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15H5V6.5A1.5 1.5 0 0 1 6.5 5H15V2.5A1.5 1.5 0 0 0 13.5 1Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
		</svg>
	),
	hoverBackgroundType: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m12 15.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M16.5 8.5V6A1.5 1.5 0 0 0 15 4.5H6A1.5 1.5 0 0 0 4.5 6v9A1.5 1.5 0 0 0 6 16.5h4.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M11.5 1h-9A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13h1.929V5.929a1.5 1.5 0 0 1 1.5-1.5H13V2.5A1.5 1.5 0 0 0 11.5 1Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
		</svg>
	),
	edit: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m16.25 7-3-3 2.5-2.5 3 3-2.5 2.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m12.863 3.903 3.484 3.484m-3.484-3.484L2.746 13.458a1.5 1.5 0 0 0-.435.765l-.87 3.915a.5.5 0 0 0 .647.583L6.14 17.37a1.5 1.5 0 0 0 .586-.362l9.62-9.62m-3.483-3.485 1.843-1.842a1.5 1.5 0 0 1 2.12 0l1.363 1.362a1.5 1.5 0 0 1 0 2.122l-1.842 1.842'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	editOptions: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m16.25 7-3-3 2.5-2.5 3 3-2.5 2.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m12.863 3.903 3.484 3.484m-3.484-3.484L2.746 13.458a1.5 1.5 0 0 0-.435.765l-.87 3.915a.5.5 0 0 0 .647.583L6.14 17.37a1.5 1.5 0 0 0 .586-.362L8.734 15m4.129-11.097 1.843-1.842a1.5 1.5 0 0 1 2.12 0l1.363 1.362a1.5 1.5 0 0 1 0 2.122l-1.842 1.842m0 0L14.14 9.594'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M12.325 11.47a1.176 1.176 0 0 1-1.687 1.06c-.111-.054-.251-.04-.326.058-.226.3-.412.632-.548.99-.05.134.042.276.175.329a1.177 1.177 0 0 1 0 2.186c-.133.053-.226.195-.175.33.136.357.322.69.548.989.075.099.215.112.326.058a1.176 1.176 0 0 1 1.685 1.126c-.007.123.06.247.18.278a4.004 4.004 0 0 0 1.5.095c.143-.018.225-.167.21-.31a1.176 1.176 0 0 1 1.927-1.029c.108.094.276.108.37 0a3.99 3.99 0 0 0 .726-1.207c.05-.135-.042-.276-.175-.33a1.177 1.177 0 0 1 0-2.186c.133-.053.226-.195.175-.33a4.002 4.002 0 0 0-.725-1.207c-.095-.108-.263-.093-.372 0a1.176 1.176 0 0 1-1.927-1.029c.016-.143-.066-.292-.208-.31a4.026 4.026 0 0 0-1.502.095c-.12.03-.186.155-.18.279a.697.697 0 0 1 .003.066Zm1.175 4.942a1.411 1.411 0 1 0-.002-2.822 1.411 1.411 0 0 0 .002 2.822Z'
				fill='currentColor'
			/>
		</svg>
	),
	options: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.726 4.706a2.642 2.642 0 0 0 2.608-3.043c-.02-.138.055-.276.188-.315a8.94 8.94 0 0 1 3.912-.234c.159.026.251.192.215.35a2.642 2.642 0 0 0 2.57 3.242c.759 0 1.442-.322 1.923-.836.11-.118.299-.133.409-.015a9.003 9.003 0 0 1 1.935 3.233c.052.154-.05.313-.206.355A2.646 2.646 0 0 0 16.33 10c0 1.224.827 2.254 1.951 2.557.156.042.258.201.206.355a9.003 9.003 0 0 1-1.935 3.233c-.11.118-.298.103-.409-.015a2.625 2.625 0 0 0-1.923-.836 2.642 2.642 0 0 0-2.57 3.243c.036.157-.056.323-.215.349a8.996 8.996 0 0 1-3.912-.234.28.28 0 0 1-.188-.315 2.642 2.642 0 0 0-2.608-3.043c-.5 0-.967.14-1.365.382-.119.072-.275.056-.362-.053a8.993 8.993 0 0 1-1.485-2.711c-.052-.154.05-.313.206-.355A2.646 2.646 0 0 0 3.67 10a2.647 2.647 0 0 0-1.95-2.557c-.156-.042-.258-.201-.206-.355a8.993 8.993 0 0 1 1.485-2.71c.087-.11.243-.126.362-.054.398.242.865.382 1.365.382Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='2.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	warning: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m.684 17.082 7.918-15.7a1.55 1.55 0 0 1 2.796 0l7.918 15.7c.554 1.099-.21 2.418-1.398 2.418H2.082C.893 19.5.13 18.18.684 17.082Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11 7a.842.842 0 0 0-.236-.707A1.081 1.081 0 0 0 10 6a1.08 1.08 0 0 0-.764.293A.842.842 0 0 0 9 7l.031.275.563 4.95.031.275c.01.089.059.174.129.237a.37.37 0 0 0 .246.098.37.37 0 0 0 .246-.098.384.384 0 0 0 .129-.237l.031-.275.563-4.95L11 7Z'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='15.5'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	warningCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='8.5'
				cy='8.5'
				r='8.5'
				transform='matrix(1 0 0 -1 1.5 18.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11 6a.842.842 0 0 0-.236-.707A1.081 1.081 0 0 0 10 5a1.08 1.08 0 0 0-.764.293A.842.842 0 0 0 9 6l.031.275.563 4.95.031.275c.01.089.059.174.129.237a.37.37 0 0 0 .246.098.37.37 0 0 0 .246-.098.384.384 0 0 0 .129-.237l.031-.275.563-4.95L11 6Z'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='14.5'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	errorCircle: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='8.5'
				cy='8.5'
				r='8.5'
				transform='matrix(1 0 0 -1 1.5 18.5)'
				stroke='#0D3636'
			/>
			<path
				d='M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5'
				stroke='#0D3636'
				stroke-linecap='round'
			/>
		</svg>
	),
	warningFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.573 19a1.5 1.5 0 0 0 1.342-2.17L11.342 1.683c-.553-1.106-2.13-1.106-2.683 0L1.086 16.829A1.5 1.5 0 0 0 2.428 19h15.145ZM10 12.907a.464.464 0 0 1-.303-.119.486.486 0 0 1-.166-.288l-.039-.275-.703-4.95L8.75 7c-.048-.331.042-.65.277-.884.234-.234.594-.366.973-.366.38 0 .739.132.973.366.235.235.325.553.277.884l-.04.275-.702 4.95-.04.275a.485.485 0 0 1-.165.288.464.464 0 0 1-.303.12Zm0 3.593a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
				fill='currentColor'
			/>
		</svg>
	),
	warningCircleFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-7.093a.464.464 0 0 1-.303-.119.485.485 0 0 1-.166-.288l-.039-.275-.703-4.95L8.75 6c-.048-.332.042-.65.277-.884.234-.234.594-.366.973-.366.38 0 .739.132.973.366.235.235.325.553.277.884l-.04.275-.702 4.95-.04.275a.486.486 0 0 1-.165.288.464.464 0 0 1-.303.12Zm0 3.593a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
				fill='currentColor'
			/>
		</svg>
	),
	errorCircleFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3.111-5.111a.55.55 0 1 1-.778-.778L9.223 10 6.11 6.889a.55.55 0 1 1 .778-.778L10 9.223l3.111-3.112a.55.55 0 1 1 .778.778L10.777 10l3.112 3.111.07.086a.55.55 0 0 1-.762.762l-.086-.07L10 10.777 6.889 13.89Z'
				fill='currentColor'
			/>
		</svg>
	),
	infoCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='8.5'
				cy='8.5'
				r='8.5'
				transform='matrix(1 0 0 -1 1.5 18.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				fill='currentColor'
				d='M9 5h2v2H9zm2 4v5h1v1H8v-1h1v-4H8V9h3Z'
			/>
		</svg>
	),
	buttonFilled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M2.25 5.25a2 2 0 0 0-2 2v5.5a2 2 0 0 0 2 2h15.5a2 2 0 0 0 2-2v-5.5a2 2 0 0 0-2-2H2.25ZM6 9.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H6Z'
				fill='currentColor'
			/>
		</svg>
	),
	buttonOutline: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='6'
				width='18'
				height='8'
				rx='2'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M6 10h8'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	textColorSwatch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.5 12 1.535-3.753M14.5 12l-1.535-3.753m-5.93 0L10 1l2.965 7.247m-5.93 0h5.93'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				className='es-has-animated-fill'
				x='2.5'
				y='14'
				width='15'
				height='5'
				rx='1.5'
				fill='var(--selected-color, transparent)'
				stroke='gray'
			/>
			<path
				opacity='var(--selected-opacity, 0)'
				d='m3 18.5 14-4'
				stroke='gray'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textHighlightColorSwatch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='4'
				width='12'
				height='12'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='m6 10.5 1.365-3.07M14 10.5l-1.365-3.07m-5.27 0L10 1.5l2.635 5.93m-5.27 0h5.27'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				className='es-has-animated-fill'
				x='2.5'
				y='14'
				width='15'
				height='5'
				rx='1.5'
				fill='var(--selected-color, transparent)'
				stroke='gray'
			/>
			<path
				opacity='var(--selected-opacity, 0)'
				d='m3 18.5 14-4'
				stroke='gray'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	backgroundColorSwatch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='6.94446'
				y='3.44444'
				width='8.55556'
				height='8.55556'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.556 1H6a1.5 1.5 0 0 0-1.5 1.5v5.556a1.5 1.5 0 0 0 1.5 1.5h.944V4.944a1.5 1.5 0 0 1 1.5-1.5h4.612V2.5a1.5 1.5 0 0 0-1.5-1.5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
			<rect
				className='es-has-animated-fill'
				x='2.5'
				y='14'
				width='15'
				height='5'
				rx='1.5'
				fill='var(--selected-color, transparent)'
				stroke='gray'
			/>
			<path
				opacity='var(--selected-opacity, 0)'
				d='m3 18.5 14-4'
				stroke='gray'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textUppercase: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m17.686 11.873 1.27 3.627m-1.27-3.627-2.288-6.538A.5.5 0 0 0 14.925 5h-.395a.5.5 0 0 0-.472.335l-2.289 6.538m5.917 0h-5.917m0 0L10.5 15.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M7.19 11.194c-4.835.371-5.94.914-5.94 2.542 0 1.628 1.658 1.764 2.763 1.764 2.603 0 3.178-2.746 3.178-3.614m0-.692v.692m0-.692c0-1.086 0-3.34-2.625-3.427-2.21-.075-2.763 1.085-2.902 1.628m5.527 2.49v2.394c0 .868.69 1.085.967 1.085h.276'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	checkCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='8.5'
				cy='8.5'
				r='8.5'
				transform='matrix(1 0 0 -1 1.5 18.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m6 11 3 3 5-7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	check: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m4 11 4.5 4.5L16 5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textHighlightColorSwatchAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.5 11.5 1.535-3.412M14.5 11.5l-1.535-3.412m-5.93 0L10 1.5l2.965 6.588m-5.93 0h5.93'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m5.5 11.5 1.535-3.412M14.5 11.5l-1.535-3.412m-5.93 0L10 1.5l2.965 6.588m-5.93 0h5.93'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				className='es-has-animated-fill'
				x='2.5'
				y='14'
				width='15'
				height='5'
				rx='1.5'
				fill='var(--selected-color, transparent)'
				stroke='gray'
			/>
			<path
				opacity='var(--selected-opacity, 0)'
				d='m3 18.5 14-4'
				stroke='gray'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	colorSelect: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.024 10.646c.27-5.299 4.616-9.388 9.707-9.135 4.074.203 7.094 2.644 8.001 6.325.456 1.853.75 5.273-2.797 4.306-3.548-.967-4.884 1.074-5.109 2.216-.266 1.962-1.875 5.438-6.18 3.643-2.935-1.224-3.81-3.646-3.622-7.355Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9.501 5.2a1 1 0 1 0 1.998.1A1 1 0 0 0 9.5 5.2Zm-3.5.75A1 1 0 1 0 8 6.05a1 1 0 0 0-2-.1Zm-2.25 3a1 1 0 1 0 1.998.1 1 1 0 0 0-1.998-.1Zm-.5 3.5a1 1 0 1 0 1.998.1 1 1 0 0 0-1.998-.1Zm2.5 2.5a1 1 0 1 0 1.998.1 1 1 0 0 0-1.998-.1Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M13.707 15h4.586a.5.5 0 0 1 .353.854l-2.292 2.292a.5.5 0 0 1-.708 0l-2.292-2.292a.5.5 0 0 1 .353-.854Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chevronDown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1 5.5 8.646 8.646a.5.5 0 0 0 .708 0L19 5.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chevronUp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1 14.5 8.646-8.646a.5.5 0 0 1 .708 0L19 14.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chevronLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m14.5 19-8.646-8.646a.5.5 0 0 1 0-.708L14.5 1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chevronRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.5 19 8.646-8.646a.5.5 0 0 0 0-.708L5.5 1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsHorizontal: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5 6-4 4m0 0 4 4m-4-4h18m0 0-4-4m4 4-4 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsVertical: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m14 5-4-4m0 0L6 5m4-4v18m0 0 4-4m-4 4-4-4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsLeftDiagonal: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.657 1H1m0 0v5.657M1 1l18 18m0 0v-5.657M19 19h-5.657'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsRightDiagonal: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.343 1H19m0 0v5.657M19 1 1 19m0 0v-5.657M1 19h5.657'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	videoPosterImage: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m4 15 1.976-2.635a1.208 1.208 0 0 1 1.97.055c.491.736 1.58.712 2.038-.044l1.072-1.768a1.5 1.5 0 0 1 2.563-.005L16 14.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='8'
				cy='6.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				width='18'
				height='18'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4 1.5v17M1 4h3M1 7h3m-3 3h3m-3 3h3m-3 3h3M16 4h3m-3 3h3m-3 3h3m-3 3h3m-3 3h3M16 1.5v17'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	videoFile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m15.854 6.354 2.792 2.792c.227.227.354.534.354.854h-3.5a.5.5 0 0 1-.5-.5V6c.32 0 .627.127.854.354Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M12.5 6H15m-6 8.5v3a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V10m-4-4v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4v3.5a.5.5 0 0 0 .5.5H19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				width='10'
				height='12'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 13)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4 1.5v11M1 4h3M1 7h3m-3 3h3m4-6h3M8 7h3m-3 3h3M8 1.5v11'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	imageFile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m15.854 6.354 2.792 2.792c.227.227.354.534.354.854h-3.5a.5.5 0 0 1-.5-.5V6c.32 0 .627.127.854.354Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M12.5 6H15m-6 6.5v5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V10m-4-4v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4v3.5a.5.5 0 0 0 .5.5H19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m1 9 1.666-1.48a1.183 1.183 0 0 1 1.623.047 1.185 1.185 0 0 0 1.713-.04l.837-.922A1.5 1.5 0 0 1 9.055 6.6L11 8.722M2.5 1h7A1.5 1.5 0 0 1 11 2.5v7A1.5 1.5 0 0 1 9.5 11h-7A1.5 1.5 0 0 1 1 9.5v-7A1.5 1.5 0 0 1 2.5 1Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='4'
				cy='4'
				r='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	file: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.4 1h.083a1.5 1.5 0 0 1 1.055.433l4.017 3.973A1.5 1.5 0 0 1 17 6.472v.066M11.4 1H4.5A1.5 1.5 0 0 0 3 2.5v15A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5V6.538M11.4 1v5.038a.5.5 0 0 0 .5.5H17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11.5 6.5v-6l6 6h-6Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	visible: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				opacity='0.6'
				cx='10'
				cy='10'
				r='2.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 15c-5 0-8-3-9-5 1-2 4-5 9-5s8 3 9 5c-1 2-4 5-9 5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	backgroundTypeAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='15'
				y='15'
				width='14'
				height='14'
				rx='1.5'
				transform='rotate(-180 15 15)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17.5 5H15v8.5a1.5 1.5 0 0 1-1.5 1.5H5v2.5A1.5 1.5 0 0 0 6.5 19Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
			<path
				d='M3.5 3.5h4m-4 2h3m-3 2h4'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	filter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.82 1.5H2.118a.5.5 0 0 0-.373.833l5.878 6.573a.5.5 0 0 1 .127.333v9.386a.5.5 0 0 0 .754.43l2.938-1.732a.5.5 0 0 0 .245-.431V9.25a.5.5 0 0 1 .141-.348l6.35-6.555a.5.5 0 0 0-.358-.848Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	filterAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3.5 4.5 4.661 6.743a.5.5 0 0 1 .089.284v7.098a.5.5 0 0 0 .754.43l2.063-1.216a.5.5 0 0 0 .245-.431v-5.87a.5.5 0 0 1 .102-.3L16.5 4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M17 3.5c0 1.105-3.134 2-7 2s-7-.895-7-2 3.134-2 7-2 7 .895 7 2Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	pointerHand: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.988 7.685V2.543C9.988 1.514 9.66 1 8.913 1S7.65 1.514 7.65 2.543v8.227L5.2 7.838c-.6-.788-1.152-.95-1.725-.421-.573.529-.666 1.286-.065 2.074l.968 1.28c.467.513.609 1.135 1.402 4.627.468 2.057 2.763 3.53 5.143 3.6C14.152 19.093 17 16.38 17 12.827V8.713c0-1.028-.327-1.542-1.075-1.542s-1.262.514-1.262 1.542M9.988 7.685c0-1.029.514-1.543 1.262-1.543s1.075 1.029 1.075 2.057m-2.337-.514v1.542M12.325 8.2c0-1.028.514-1.543 1.262-1.543s1.076 1.029 1.076 2.057M12.325 8.2v1.543m2.338-1.029v2.057'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	h1: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M14.601 14.298V7.06m0 7.238h1.813m-1.813 0h-2.265m.906-7.238c1.088 0 1.36-.905 1.36-1.358V7.06m-1.36 0h-.68m.68 0h1.36M3 5.75v4.138m0 4.362V9.888m0 0h5.816m0 0V5.75m0 4.138v4.362'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	h2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M3 5.75v4.138m0 4.362V9.888m0 0h5.816m0 0V5.75m0 4.138v4.362m8.341.048h-5.573c.022-.937.477-2.359 3.36-3.773 2.627-1.289 2.155-2.987 1.988-3.458-.65-1.836-4.504-2.086-5.303.92'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	h3: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M11.751 7.31c.151-.581.577-1.61 2.62-1.608 1.813.003 2.351.867 2.493 1.746.128.799-.337 2.242-3.267 2.267 1.947.03 3.218.69 3.53 1.778.33 1.145-.378 2.735-2.551 2.801-2.315.07-2.886-1.012-3.037-1.594M3 5.75v4.138m0 4.362V9.888m0 0h5.816m0 0V5.75m0 4.138v4.362'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	h4: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.188 14.298v-2.262m0 0V5.702h-.454l-4.53 5.881v.453h4.983Zm0 0h1.359M3 5.75v4.138m0 4.362V9.888m0 0h5.816m0 0V5.75m0 4.138v4.362'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	h5: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.72 5.702h-4.531l-.449 4.48c.522-.79 1.668-1.313 2.714-1.313 1.742-.057 2.72 1.266 2.72 2.827 0 1.562-.968 2.57-2.946 2.602-1.393.022-2.362-.464-2.572-1.668M3 5.75v4.138m0 4.362V9.888m0 0h5.816m0 0V5.75m0 4.138v4.362'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	h6: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.044 7.074c-.227-.79-1.241-1.602-2.893-1.311-1.282.316-1.918 1.213-2.272 2.333-.359 1.131-.335 2.342-.287 3.528v0m0 0c-.004-1.225 1.31-2.664 2.874-2.664s2.723 1.14 2.723 2.618c0 1.476-1.201 2.72-2.765 2.72-1.34 0-2.461-.878-2.756-2.057a2.537 2.537 0 0 1-.076-.617ZM3 5.75v4.138m0 4.362V9.888m0 0h5.816m0 0V5.75m0 4.138v4.362'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	roundedCorners: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 6V4a3 3 0 0 0-3-3h-2m5 13v2a3 3 0 0 1-3 3h-2M1 6V4a3 3 0 0 1 3-3h2M1 14v2a3 3 0 0 0 3 3h2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	wrapperOverflow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 5a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 17 5v12.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 17.5V5Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.5'
				d='M3.5 13.5h13v5h-13z'
			/>
			<path
				d='M17.5 1h-15A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 1Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	buttonDisabled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='6'
				width='18'
				height='8'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeDasharray='1 1.5'
				fill='none'
			/>
			<path
				d='M6 10h8'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	inlineGradientFormat: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.5 12 1.535-3.753M14.5 12l-1.535-3.753m-5.93 0L10 1l2.965 7.247m-5.93 0h5.93'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='14'
				width='15'
				height='5'
				rx='1.5'
				fill='url(#22193837-26f8-4d6d-8a72-e826a98cc5e0)'
				stroke='gray'
			/>
			<defs>
				<linearGradient
					gradientUnits='userSpaceOnUse'
					id='22193837-26f8-4d6d-8a72-e826a98cc5e0'
					x1='2.5'
					y1='16.5'
					x2='17.5'
					y2='16.5'
				>
					<stop stopColor='red' />
					<stop
						offset='0.208333'
						stopColor='#FAFF00'
					/>
					<stop
						offset='0.390625'
						stopColor='#14FF00'
					/>
					<stop
						offset='0.59375'
						stopColor='#1400FF'
					/>
					<stop
						offset='0.802083'
						stopColor='#FF00E5'
					/>
					<stop
						offset='1'
						stopColor='red'
					/>
				</linearGradient>
			</defs>
		</svg>
	),
	backgroundRepeat: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2'
				y='2'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='6'
				y='6'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='2'
				y='10'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='6'
				y='14'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='10'
				y='2'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='14'
				y='6'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='10'
				y='10'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='14'
				y='14'
				width='4'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				width='18'
				height='18'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 19)'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	imageOpacity: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.63 13.014a.5.5 0 1 1 .74.672l-.74-.672ZM10 .5a.5.5 0 0 1 0 1v-1Zm0 18a.5.5 0 0 1 0 1v-1Zm-.442-4.664-.37-.336.37.336ZM1.5 2.5v15h-1v-15h1ZM.668 15.626l3.443-3.06.664.747-3.443 3.06-.664-.747Zm6.186-2.98.887.888-.707.707-.887-.887.707-.707Zm2.334.854.442-.486.74.672-.442.486-.74-.672ZM10 1.5H2.5v-1H10v1Zm-7.5 17H10v1H2.5v-1Zm5.241-4.966a1 1 0 0 0 1.447-.034l.74.672a2 2 0 0 1-2.894.07l.707-.708Zm-3.63-.968a2 2 0 0 1 2.743.08l-.707.708a1 1 0 0 0-1.372-.04l-.664-.748ZM.5 2.5a2 2 0 0 1 2-2v1a1 1 0 0 0-1 1h-1Zm1 15a1 1 0 0 0 1 1v1a2 2 0 0 1-2-2h1Z'
				fill='currentColor'
			/>
			<path
				d='M10.37 13.686a.5.5 0 1 1-.74-.672l.74.672ZM10 1.5a.5.5 0 0 1 0-1v1Zm0 18a.5.5 0 0 1 0-1v1Zm4.61-8.789-.368.338.368-.338ZM18.5 17.5v-15h1v15h-1Zm-3.521-7.127 4.39 4.79-.738.675-4.39-4.789.738-.676Zm-5.349 2.64 2.395-2.633.74.672-2.395 2.634-.74-.672ZM17.5 1.5H10v-1h7.5v1Zm-7.5 17h7.5v1H10v-1Zm4.242-7.45a1 1 0 0 0-1.477.002l-.74-.672a2 2 0 0 1 2.954-.007l-.737.676ZM18.5 2.5a1 1 0 0 0-1-1v-1a2 2 0 0 1 2 2h-1Zm1 15a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1h1Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<circle
				cx='6.5'
				cy='6.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	imageBlur: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<g
				filter='url(#6deffcc3-dd09-4d08-972b-af78cf5d4481)'
				stroke='currentColor'
			>
				<path
					d='m2 15.333 2.943-2.616a1.5 1.5 0 0 1 2.057.06l.554.555a1.5 1.5 0 0 0 2.17-.052l.276-.302 2.129-2.342a1.333 1.333 0 0 1 1.97-.004L18 14.89m0 0v1.61a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 16.5v-13A1.5 1.5 0 0 1 3.5 2h13A1.5 1.5 0 0 1 18 3.5v11.389Z'
					strokeLinejoin='round'
					fill='none'
				/>
				<circle
					cx='6.88888'
					cy='6.88889'
					r='1.33333'
					fill='none'
				/>
			</g>
			<defs>
				<filter
					id='6deffcc3-dd09-4d08-972b-af78cf5d4481'
					x='0'
					y='0'
					width='20'
					height='20'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
					/>
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feGaussianBlur
						stdDeviation='0.75'
						result='effect1_foregroundBlur_836_1341'
					/>
				</filter>
			</defs>
		</svg>
	),
	listOrdered: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.2 14.25h2.412l-1.808 2.21c.535 0 2.009-.345 2.009 1.207 0 1.443-2.813 1.377-2.813.2m0-15.39L4.607 1.25v4.5m0 0H3.402m1.205 0h1.205'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9 3.5h9M9 10h9'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3.2 8.977c.135-.409.443-1.227 1.407-1.227s1.205.818 1.205 1.227c0 .41-.803 1.227-1.205 1.637L3 12.25h2.813'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9 16.5h9'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	listUnordered: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9 3h9m-9 7h9m-9 7h9'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='4'
				cy='3'
				r='1.5'
				fill='currentColor'
				stroke='currentColor'
			/>
			<circle
				cx='4'
				cy='17'
				r='1.5'
				fill='currentColor'
				stroke='currentColor'
			/>
			<circle
				cx='4'
				cy='10'
				r='1.5'
				fill='currentColor'
				stroke='currentColor'
			/>
		</svg>
	),
	screenTabletLarge: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.5 15.5A.5.5 0 0 1 3 15V5a.5.5 0 0 1 .5-.5H16a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H3.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='1'
				y='3.5'
				width='18'
				height='13'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='17.5'
				cy='10'
				r='0.5'
				transform='rotate(-90 17.5 10)'
				fill='currentColor'
			/>
		</svg>
	),
	descriptionLink: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='11.5'
				y='8'
				width='8'
				height='1.5'
				rx='0.5'
				fill='currentColor'
			/>
			<path
				d='M12 11h5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m1 12.4 1.333-1.185a.947.947 0 0 1 1.298.039.947.947 0 0 0 1.37-.033l.45-.494a1.5 1.5 0 0 1 2.215-.005L9 12.178M2.5 6h5A1.5 1.5 0 0 1 9 7.5v5A1.5 1.5 0 0 1 7.5 14h-5A1.5 1.5 0 0 1 1 12.5v-5A1.5 1.5 0 0 1 2.5 6Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='3.25'
				cy='8.25'
				r='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	copy: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13 8 9 4m4 4v9.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 17.5v-12A1.5 1.5 0 0 1 3.5 4H9m4 4H9.5a.5.5 0 0 1-.5-.5V4m9 1-4-4m4 4v9.5a1.5 1.5 0 0 1-1.5 1.5H13m5-11h-3.5a.5.5 0 0 1-.5-.5V1m0 0H8.5A1.5 1.5 0 0 0 7 2.5V4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4 9h3M4 7.5h3M4 6h3'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	paste: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M12.5 7V4a1 1 0 0 0-1-1h-1m-2 13h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M3.5 4.5v10a.5.5 0 0 0 .5.5h4V8a1.5 1.5 0 0 1 1.5-1.5h2v-2A.5.5 0 0 0 11 4H4a.5.5 0 0 0-.5.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M5 4V2.5L6.5 2V1H9v1l1.5.5V4H5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<rect
				x='8.5'
				y='7'
				width='9'
				height='12'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M10.5 12H14m-3.5-1.5H14M10.5 9H14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	wrapperConfig: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='2.75'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				opacity='0.7'
				x='3'
				y='3'
				width='14'
				height='14'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M8.59 5.588c0 .812-.632 1.47-1.41 1.47-.22 0-.429-.052-.614-.145-.134-.068-.302-.052-.392.072-.271.375-.494.79-.657 1.237-.061.168.05.345.21.411.52.217.888.747.888 1.367s-.368 1.15-.888 1.367c-.16.066-.271.243-.21.411.163.447.386.862.657 1.237.09.124.258.14.392.072a1.36 1.36 0 0 1 .613-.146c.78 0 1.41.659 1.41 1.47l-.001.083c-.009.155.07.31.215.349a4.618 4.618 0 0 0 1.801.118c.172-.023.27-.208.25-.387a1.554 1.554 0 0 1-.008-.162c0-.812.632-1.47 1.41-1.47.347 0 .665.13.91.346.132.116.334.135.447 0 .37-.442.666-.952.87-1.51.061-.168-.05-.345-.21-.411A1.472 1.472 0 0 1 13.385 10c0-.62.367-1.15.888-1.367.16-.066.271-.243.21-.411a5.042 5.042 0 0 0-.87-1.51c-.113-.135-.315-.116-.446 0a1.37 1.37 0 0 1-.91.347c-.78 0-1.41-.659-1.41-1.47 0-.056.002-.11.008-.163.018-.179-.08-.364-.25-.387a4.647 4.647 0 0 0-1.802.118c-.145.039-.224.194-.215.349l.002.082ZM10 11.765c.935 0 1.692-.79 1.692-1.765 0-.975-.757-1.765-1.692-1.765-.935 0-1.692.79-1.692 1.765 0 .975.757 1.765 1.692 1.765Z'
				fill='currentColor'
			/>
		</svg>
	),
	pointerHandDisabled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.488 7.685V2.543C9.488 1.514 9.16 1 8.413 1S7.15 1.514 7.15 2.543v8.227L4.7 7.838c-.6-.788-1.152-.95-1.725-.421-.573.529-.666 1.286-.065 2.074l.968 1.28c.467.513.609 1.135 1.402 4.627.468 2.057 2.763 3.53 5.143 3.6.39.011.776-.019 1.151-.086M9.488 7.685c0-1.029.514-1.543 1.262-1.543s1.075 1.029 1.075 2.057m-2.337-.514v1.542M11.825 8.2c0-1.028.514-1.543 1.262-1.543s1.076 1.029 1.076 2.057M11.825 8.2v1.543m2.338-1.029c0-1.028.514-1.542 1.262-1.542s1.075.514 1.075 1.542v2.314m-2.337-2.314v2.057'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='14.75'
				cy='15.5'
				r='2.75'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m12.917 13.667 3.666 3.666'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	fieldType: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 10V7a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 7v4a1.5 1.5 0 0 0 1.5 1.5h8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 7.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M14.575 10.47a1.176 1.176 0 0 1-1.687 1.06c-.111-.054-.251-.04-.326.058-.226.3-.412.632-.548.99-.05.134.042.276.175.329a1.177 1.177 0 0 1 0 2.186c-.133.053-.226.195-.175.33.136.357.322.69.548.989.075.099.215.112.326.058a1.176 1.176 0 0 1 1.685 1.126c-.007.123.06.247.18.278a4.004 4.004 0 0 0 1.5.095c.143-.018.225-.167.21-.31a1.176 1.176 0 0 1 1.927-1.029c.108.094.276.108.37 0a3.99 3.99 0 0 0 .726-1.207c.05-.135-.042-.277-.175-.33a1.177 1.177 0 0 1 0-2.186c.133-.053.226-.195.175-.33a4.002 4.002 0 0 0-.725-1.207c-.095-.108-.263-.093-.372 0a1.176 1.176 0 0 1-1.927-1.029c.016-.143-.066-.292-.208-.31a4.026 4.026 0 0 0-1.502.095c-.12.03-.186.155-.18.279a.697.697 0 0 1 .003.066Zm1.175 4.942a1.411 1.411 0 1 0-.002-2.822 1.411 1.411 0 0 0 .002 2.822Z'
				fill='currentColor'
			/>
		</svg>
	),
	fieldDisabled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.548 16.548a3.25 3.25 0 0 0-4.596-4.596m4.596 4.596a3.25 3.25 0 0 1-4.596-4.596m4.596 4.596-4.596-4.596'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 10V7a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 7v4a1.5 1.5 0 0 0 1.5 1.5h9'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 7.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldRequired: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 21 20'
			width='21'
			height='20'
			fill='none'
		>
			<path
				d='M19 10V7a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 7v4a1.5 1.5 0 0 0 1.5 1.5h9'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 7.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m13.952 11.952 4.596 4.596m-4.596 0 4.596-4.596M16.25 11v6.5M13 14.25h6.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	fieldReadonly: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 12V8a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 8v4a1.5 1.5 0 0 0 1.5 1.5h8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 8.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M11.5 14.222c.444.89 1.778 2.222 4 2.222s3.556-1.333 4-2.222c-.444-.889-1.778-2.222-4-2.222s-3.556 1.333-4 2.222Zm4 1.334a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z'
				fill='currentColor'
			/>
		</svg>
	),
	fieldLabel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3.5'
				width='9'
				height='3'
				rx='0.5'
				fill='currentColor'
			/>
			<path
				d='M17.5 8h-15A1.5 1.5 0 0 0 1 9.5v4A1.5 1.5 0 0 0 2.5 15h15a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 17.5 8Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 9.75h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldWidth: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5 13-2 2m0 0 2 2m-2-2h14m-2-2 2 2m0 0-2 2m2.5-13h-15A1.5 1.5 0 0 0 1 5.5v4A1.5 1.5 0 0 0 2.5 11h15A1.5 1.5 0 0 0 19 9.5v-4A1.5 1.5 0 0 0 17.5 4Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 5.75h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldName: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14.5 8.5c.76.76-1.278 2.332-2.34 2.916'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m3.737 18.482-2-3.464a1 1 0 0 1 .366-1.366l5.524-3.19a1.5 1.5 0 0 1 1.138-.15l3.498.938-.937 3.498a1.5 1.5 0 0 1-.7.91l-5.523 3.19a1 1 0 0 1-1.366-.366Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M3.969 14.884 7 13.134m-2.031 3.482L8 14.866M17.5 1.5h-15A1.5 1.5 0 0 0 1 3v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 7V3a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 3.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldValue: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 6.5h-15A1.5 1.5 0 0 0 1 8v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 12V8a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='8'
				width='2.5'
				height='4'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				x='5.5'
				y='8'
				width='2.5'
				height='4'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				x='8.5'
				y='8'
				width='2.5'
				height='4'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	fieldPlaceholder: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 6.5h-15A1.5 1.5 0 0 0 1 8v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 12V8a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='8'
				width='2.5'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='5.5'
				y='8'
				width='2.5'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='8.5'
				y='8'
				width='2.5'
				height='4'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	code: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.5 6.5-4 4 4 4m9-8 4 4-4 4m-6 2 3-12'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	email: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='4'
				width='18'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m1.5 4.5 7.589 5.803a1.5 1.5 0 0 0 1.822 0L18.5 4.5m-17 11 5.687-6.651M18.5 15.5l-5.687-6.651'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	regex: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.5 4v8m2.828-6.828-5.657 5.656M15.5 8h-8m6.828 2.828L8.671 5.172'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='5'
				y='13.5'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
			<path
				d='M4 1v0a2.954 2.954 0 0 0-2.743 1.857l-.036.09A3.096 3.096 0 0 0 1 4.096v11.807c0 .394.075.784.221 1.15l.036.089A2.954 2.954 0 0 0 4 19v0M16 1v0c1.208 0 2.294.735 2.743 1.857l.036.09c.146.365.221.755.221 1.15v11.806c0 .394-.075.784-.221 1.15l-.036.089A2.954 2.954 0 0 1 16 19v0'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	rangeMin: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 12.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2 12.5V14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M14 12.5V14m-8-1.5V14m12-1.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M1 7.5a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2Z'
				fill='currentColor'
				stroke='currentColor'
			/>
			<path
				d='M3 7.5h15a1 1 0 1 1 0 2H3'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	rangeMid: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 12.5V14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2 12.5V14m12-1.5V14m-8-1.5V14m12-1.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9 7.5a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2Z'
				fill='currentColor'
				stroke='currentColor'
			/>
			<path
				d='M11 7.5h7a1 1 0 1 1 0 2h-7m-2-2H2a1 1 0 0 0 0 2h7'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	rangeMax: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 12.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M18 12.5V14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6 12.5V14m8-1.5V14M2 12.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 7.5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z'
				fill='currentColor'
				stroke='currentColor'
			/>
			<path
				d='M17 7.5H2a1 1 0 0 0 0 2h15'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	step: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 1h-2a.5.5 0 0 0-.5.5V5a.5.5 0 0 1-.5.5h-3.5a.5.5 0 0 0-.5.5v3.5a.5.5 0 0 1-.5.5H8a.5.5 0 0 0-.5.5V14a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 0-.5.5v3.5a.5.5 0 0 1-.5.5H1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M3 3h3m0 0v3m0-3L3 6'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	checkSquare: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M5 10.667 8.333 14 15 6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	multiple: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='9'
				height='9'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10.5 6h3A1.5 1.5 0 0 1 15 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 6 13.5v-3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.5 10h3a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	files: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9 6v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0M9 6H4.5A1.5 1.5 0 0 0 3 7.5v10A1.5 1.5 0 0 0 4.5 19h7a1.5 1.5 0 0 0 1.5-1.5V10M9 6v3.5a.5.5 0 0 0 .5.5H13'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13 10 9 6v4h4Zm.854-8.646 2.792 2.792c.227.227.354.534.354.854h-3.5a.5.5 0 0 1-.5-.5V1c.32 0 .627.127.854.354Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M13 14h2.5a1.5 1.5 0 0 0 1.5-1.5V5m-4-4v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4H8.5A1.5 1.5 0 0 0 7 2.5V6m6-5v3.5a.5.5 0 0 0 .5.5H17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fileType: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.4 1h.083a1.5 1.5 0 0 1 1.055.433l4.017 3.973A1.5 1.5 0 0 1 19 6.472v.066M13.4 1H6.5A1.5 1.5 0 0 0 5 2.5V10m8.4-9v5.038a.5.5 0 0 0 .5.5H19m0 0V17.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5V16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13.5 6.5v-6l6 6h-6Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				width='11'
				height='6'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 16)'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M4.5 13H8'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	fileSize: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.5 3v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4H7a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 7 16h7a1.5 1.5 0 0 0 1.5-1.5V7m-4-4v3.5a.5.5 0 0 0 .5.5h3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11.5 7V3l4 4h-4Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M16 1h2.828m0 0v2.828m0-2.828L16 3.828m-12.172 15H1m0 0V16m0 2.828L3.828 16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fileSizeMin: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M9.5 13A1.5 1.5 0 0 0 8 14.5v4A1.5 1.5 0 0 0 9.5 20h9a1.5 1.5 0 0 0 1.5-1.5v-4a1.5 1.5 0 0 0-1.5-1.5h-9Zm.734 1.68a.5.5 0 0 0-.884.32v3a.5.5 0 0 0 1 0v-1.619l.366.44a.5.5 0 0 0 .768 0l.366-.44V18a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.884-.32l-.866 1.039-.866-1.04Zm5.721-.159a.5.5 0 0 1 .561.202l1.084 1.626V15a.5.5 0 0 1 1 0v3a.5.5 0 0 1-.916.277L16.6 16.651V18a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .355-.479ZM14.71 15a.5.5 0 0 0-1 0v3a.5.5 0 1 0 1 0v-3Z'
				fill='currentColor'
			/>
			<path
				d='m12.354 3.354 2.792 2.792c.227.227.354.534.354.854H12a.5.5 0 0 1-.5-.5V3c.32 0 .627.127.854.354Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M11.5 3v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4H7a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 7 16h1m3.5-13v3.5a.5.5 0 0 0 .5.5h3.5m0 0v6M16 1h2.828m0 0v2.828m0-2.828L16 3.828m-12.172 15H1m0 0V16m0 2.828L3.828 16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fileSizeMax: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M9.5 13A1.5 1.5 0 0 0 8 14.5v4A1.5 1.5 0 0 0 9.5 20h9a1.5 1.5 0 0 0 1.5-1.5v-4a1.5 1.5 0 0 0-1.5-1.5h-9Zm.384 1.68A.5.5 0 0 0 9 15v3a.5.5 0 0 0 1 0v-1.619l.366.44a.5.5 0 0 0 .768 0l.366-.44V18a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.884-.32l-.866 1.039-.866-1.04Zm6.864-.112a.5.5 0 0 1 .684.18l.443.76.443-.76a.5.5 0 1 1 .864.504l-.728 1.248.728 1.248a.5.5 0 1 1-.864.504l-.443-.76-.443.76a.5.5 0 1 1-.864-.504l.728-1.248-.728-1.248a.5.5 0 0 1 .18-.684Zm-1.787.24a.5.5 0 0 0-.922 0l-.834 2-.416 1a.5.5 0 1 0 .922.384L14 17.5h1l.289.692a.5.5 0 1 0 .923-.384l-.417-1-.834-2ZM14.5 16.3l.083.2h-.166l.083-.2Z'
				fill='currentColor'
			/>
			<path
				d='m12.354 3.354 2.792 2.792c.227.227.354.534.354.854H12a.5.5 0 0 1-.5-.5V3c.32 0 .627.127.854.354Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M11.5 3v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4H7a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 7 16v0m4.5-13v3.5a.5.5 0 0 0 .5.5h3.5m0 0v6M16 1h2.828m0 0v2.828m0-2.828L16 3.828m-12.172 15H1m0 0V16m0 2.828L3.828 16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldHelp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.5 16.5h6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='1'
				y='3'
				width='9'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.5 7.5h-15A1.5 1.5 0 0 0 1 9v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 13V9a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 9.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldBeforeText: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.5 3.5h6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='1'
				y='5'
				width='9'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.5 9.5h-15A1.5 1.5 0 0 0 1 11v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 15v-4a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 11.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fieldAfterText: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.5 16.5h6'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M1.5 18.5h7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='1'
				y='3'
				width='9'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.5 7.5h-15A1.5 1.5 0 0 0 1 9v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 13V9a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 9.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	data: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<ellipse
				cx='10'
				cy='3.75294'
				rx='7.5'
				ry='2.75294'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M17.5 7.988c0 1.52-3.358 2.753-7.5 2.753-4.142 0-7.5-1.232-7.5-2.753m15 4.13c0 1.52-3.358 2.753-7.5 2.753-4.142 0-7.5-1.233-7.5-2.753'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M17.5 3.541v12.706C17.5 17.767 14.142 19 10 19c-4.142 0-7.5-1.233-7.5-2.753V3.541'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	dropdown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='6.5'
				width='18'
				height='7'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m13 9.25 1.517 1.5L16 9.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4 10h4.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	dropdownOpen: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='7'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m13 3.75 1.517 1.5L16 3.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4 4.5h4.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	dropdownClose: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='7'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M1 5v12.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m13 5.25 1.517-1.5L16 5.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4 4.5h4.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M4 10.75h4.5M4 13.5h6.5M4 16.25h5.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	positioningGuide: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.25 1v2.333M6.895 1v2.333M13.105 1v2.333M18.75 1v2.333M1.25 6.25v2.333m17.5-2.333v2.333M1.25 11.75v2.333m0 2.667v2.333m5.645-2.333v2.333m6.21-2.333v2.333m5.645-7.333v2.333m0 2.667v2.333'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='5'
				y='5'
				width='10'
				height='10'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	gridAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.5 3.25v2.333M7.145 3.25v2.333m6.21-2.333v2.333M19 3.25v2.333M3.194 1.5h2.258m3.951 0h2.258m3.387 0h2.258M3.194 7.333h2.258m3.951 0h2.258m3.387 0h2.258M3.194 13.167h2.258m3.951 0h2.258m3.387 0h2.258M3.194 19h2.258m3.951 0h2.258m3.387 0h2.258M1.5 9.083v2.334m5.645-2.334v2.334m6.21-2.334v2.334M19 9.083v2.334m-17.5 3.5v2.333m5.645-2.333v2.333m6.21-2.333v2.333M19 14.917v2.333'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	positioningGuideAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 1v18M7 1v4m0 10v4m6-18v4m0 10v4m6-18v18'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='5'
				y='5'
				width='10'
				height='10'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	layout: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='4'
				y='4'
				width='12'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M6.5 6.5h4m-4 2h4m-4 2h4'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2'
				y='2'
				width='16'
				height='16'
				rx='3.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='3'
				fill='none'
			/>
		</svg>
	),
	location: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16 7.36c0 4.627-4.165 9.626-5.827 11.436-.368.4-.978.4-1.346 0C7.165 16.986 3 11.987 3 7.359 3 3.847 5.91 1 9.5 1S16 3.847 16 7.36Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='9.5'
				cy='7.5'
				r='1.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	locationSettings: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.598 10c.253-.877.402-1.766.402-2.64C16 3.846 13.09 1 9.5 1S3 3.847 3 7.36c0 4.627 4.165 9.626 5.827 11.436.368.4.981.397 1.349-.003.165-.18.354-.391.562-.63'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='9.5'
				cy='7.5'
				r='1.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M14.325 11.97a1.176 1.176 0 0 1-1.687 1.06c-.111-.054-.251-.04-.326.058-.226.3-.412.632-.548.99-.05.134.042.276.175.329a1.177 1.177 0 0 1 0 2.186c-.133.053-.226.195-.175.33.136.357.322.69.548.989.075.099.215.112.326.058a1.176 1.176 0 0 1 1.685 1.126c-.007.123.06.247.18.278a4.004 4.004 0 0 0 1.5.095c.143-.018.225-.167.21-.31a1.176 1.176 0 0 1 1.927-1.029c.108.094.276.108.37 0a3.99 3.99 0 0 0 .726-1.207c.05-.135-.042-.276-.175-.33a1.177 1.177 0 0 1 0-2.186c.133-.053.226-.195.175-.33a4.002 4.002 0 0 0-.725-1.207c-.095-.108-.263-.093-.372 0a1.176 1.176 0 0 1-1.927-1.029c.016-.143-.066-.292-.208-.31a4.026 4.026 0 0 0-1.502.095c-.12.03-.186.155-.18.279a.697.697 0 0 1 .003.066Zm1.175 4.942a1.411 1.411 0 1 0-.002-2.822 1.411 1.411 0 0 0 .002 2.822Z'
				fill='currentColor'
			/>
		</svg>
	),
	mapPin: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.12 11.208c.025.275.269.48.544.457a.495.495 0 0 0 .452-.54l-.996.083Zm.628-4.085-.046-.498-.996.083.046.498.996-.083Zm.368 4.003-.368-4.003-.996.083.368 4.002.996-.082Z'
				fill='currentColor'
			/>
			<circle
				r='2'
				transform='matrix(.99655 -.08295 .09157 .9958 8.97 4.697)'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M12.056 13.345 6.25 14.349m5.806-1.004h2.902m-2.902 0L13.11 9.83m4.75 3.515h-2.903M6.25 14.349l1.056 2.51M6.25 14.35l-1.056-2.01m0 0c.528-.167 1.584-.904 1.584-2.51m-1.584 2.51c-.703.168-2.427.804-3.694 2.009m13.458-1.004.792 3.515'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M7.361 9.83h-3.53a1 1 0 0 0-.936.648l-1.888 5.03a1 1 0 0 0 .937 1.352h16.113a1 1 0 0 0 .936-1.352l-1.888-5.03a1 1 0 0 0-.937-.648h-4.057'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	locationAllow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.598 10c.253-.877.402-1.766.402-2.64C16 3.846 13.09 1 9.5 1S3 3.847 3 7.36c0 4.627 4.165 9.626 5.827 11.436.368.4.981.397 1.349-.003.165-.18.354-.391.562-.63'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='9.5'
				cy='7.5'
				r='1.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='14.75'
				cy='15'
				r='3.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.5 15.375 14.188 17 17 13.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	locationDeny: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.598 10c.253-.877.402-1.766.402-2.64C16 3.846 13.09 1 9.5 1S3 3.847 3 7.36c0 4.627 4.165 9.626 5.827 11.436.368.4.981.397 1.349-.003.165-.18.354-.391.562-.63'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='9.5'
				cy='7.5'
				r='1.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='14.75'
				cy='15'
				r='3.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.75 17 13 13.25M13 17l3.75-3.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	locationAdd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.598 10c.253-.877.402-1.766.402-2.64C16 3.846 13.09 1 9.5 1S3 3.847 3 7.36c0 4.627 4.165 9.626 5.827 11.436.368.4.981.397 1.349-.003.165-.18.354-.391.562-.63'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='9.5'
				cy='7.5'
				r='1.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='14.75'
				cy='15'
				r='3.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.25 15h-2.5m0 0h-2.5m2.5 0v2.5m0-2.5v-2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	plusCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='8.5'
				cy='8.5'
				r='8.5'
				transform='matrix(1 0 0 -1 1.5 18.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M6 10h4m0 0h4m-4 0V6m0 4v4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	plusCircleFill: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM10 14.75C9.58579 14.75 9.25 14.4142 9.25 14V10.75H6C5.58579 10.75 5.25 10.4142 5.25 10C5.25 9.58579 5.58579 9.25 6 9.25H9.25V6C9.25 5.58579 9.58579 5.25 10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V9.25H14C14.4142 9.25 14.75 9.58579 14.75 10C14.75 10.4142 14.4142 10.75 14 10.75H10.75V14C10.75 14.4142 10.4142 14.75 10 14.75Z'
				fill='#0D3636'
			/>
		</svg>
	),
	wrench: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1.469 17.245 1.286 1.286a1.6 1.6 0 0 0 2.263 0l6.663-6.662c.424-.425 1.05-.556 1.646-.477 1.521.2 3.088-.265 4.226-1.403 1.495-1.495 1.826-3.73 1.018-5.631a.253.253 0 0 0-.415-.074l-2.754 2.754a.267.267 0 0 1-.377 0l-2.063-2.063a.267.267 0 0 1 0-.377l2.754-2.754a.253.253 0 0 0-.074-.415C13.74.62 11.506.952 10.011 2.447 8.873 3.585 8.409 5.152 8.608 6.673c.079.596-.052 1.222-.477 1.647L1.47 14.982a1.6 1.6 0 0 0 0 2.263Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	tools: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.552 19h1.484a1.5 1.5 0 0 0 1.5-1.5v-7.088c0-.576.347-1.085.78-1.465 1.064-.936 1.743-2.532 1.743-3.873 0-1.78-1.197-3.308-2.903-3.963a.238.238 0 0 0-.32.228V5.25a.25.25 0 0 1-.25.25H5.002a.25.25 0 0 1-.25-.25V1.339a.238.238 0 0 0-.32-.228C2.726 1.766 1.53 3.294 1.53 5.074c0 1.341.68 2.937 1.744 3.873.432.38.779.89.779 1.465V17.5a1.5 1.5 0 0 0 1.5 1.5Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13.176 13.177v3.176A2.647 2.647 0 0 0 15.823 19v0a2.647 2.647 0 0 0 2.647-2.647v-3.177m-5.294 0V10.53h1.06m-1.06 2.648h5.294m0 0V10.53h-1.058m-3.177 0V5.235l-.53-2.117.53-2.118h3.177l.529 2.118-.53 2.117v5.294m-3.176 0h3.177'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	save: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.879 1H2.5A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V6.121a1.5 1.5 0 0 0-.44-1.06l-3.62-3.622A1.5 1.5 0 0 0 13.878 1Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4 19v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7M6 1v3.5A1.5 1.5 0 0 0 7.5 6h4A1.5 1.5 0 0 0 13 4.5V1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	notebook: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='3'
				y='1'
				width='2.5'
				height='18'
				rx='1.25'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M3 3.75h2m-2 2.5h2m-2 2.5h2m-2 2.5h2m-2 2.5h2m-2 2.5h2M5.5 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15.5 19h-11A1.5 1.5 0 0 1 3 17.5v-15A1.5 1.5 0 0 1 4.5 1h11A1.5 1.5 0 0 1 17 2.5v15a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M8 3.5h5m-5 2h3m-3 2h2'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	leftPanel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.3'
				d='M1 2h9v16H1z'
			/>
			<path
				d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-13ZM10 2v16'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	rightPanel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.3'
				d='M10 2h9v16h-9z'
			/>
			<path
				d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-13ZM10 2v16'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	closedCaptions: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8.75 8v0a2 2 0 0 0-2-2H6.5a2.25 2.25 0 0 0-2.25 2.25v3.5A2.25 2.25 0 0 0 6.5 14h.25a2 2 0 0 0 2-2v0m7-4v0a2 2 0 0 0-2-2h-.25a2.25 2.25 0 0 0-2.25 2.25v3.5A2.25 2.25 0 0 0 13.5 14h.25a2 2 0 0 0 2-2v0'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	videoChapters: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 2H3a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 3 19h14a1.5 1.5 0 0 0 1.5-1.5v-14A1.5 1.5 0 0 0 17 2h-4m5.028 2.833H13m-11.028 0H7M15.667 2v2.833M4.333 2v2.833m11.334 11.334V19m-2.833-2.833V19M10 16.167V19m-2.833-2.833V19m-2.834-2.833V19m13.695-2.833H1.972'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13 11V2.5A1.5 1.5 0 0 0 11.5 1h-3A1.5 1.5 0 0 0 7 2.5V11l3-3 3 3Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	videoSubtitle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='3'
				width='18'
				height='14'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M3.5 11.5h7m-1 2.5h7M13 11.5h3.5M3.5 14H7'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	videoSubtitleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='18'
				height='14'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 17)'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='3'
				y='13.5'
				width='6'
				height='1.5'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				x='3'
				y='11'
				width='8'
				height='1.5'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	genericColorSwatch: <GenericColorSwatch />,
	search: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				r='6'
				transform='matrix(-1 0 0 1 12.5 7)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m9 12-7 7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	searchEmpty: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M12.5 13a6 6 0 1 1 5.811-4.5M9 12l-7 7'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='14.5'
				cy='18.247'
				r='0.5'
				fill='currentColor'
				stroke='currentColor'
				strokeWidth='0.5'
			/>
			<path
				d='M12 10.471c.114-.866 1.317-2.599 3.533-1.737 1.883.732 1.256 3.028.288 4.112-1.056 1.181-1.467 1.42-1.381 2.654'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	reset: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.145 10a7.5 7.5 0 1 1 1.517 4.523'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m5.545 8.5-2.634 3.04M1.295 8l1.616 3.54m0 0L3.145 10'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	imageRemove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.192 4.83c.251-2.053 1.529-2.991 2.66-3.244.898-.2 1.99-.072 2.61.607.199.218.37.514.472.912M6.192 4.829l2.109-1.227M6.192 4.83 5.25 2.682M11 11.9l1.333-1.185a.947.947 0 0 1 1.298.039v0a.947.947 0 0 0 1.37-.033l.45-.494a1.5 1.5 0 0 1 2.215-.005L19 11.678M11 7.5V7a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 19 7v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 11 12v-1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='13.3501'
				cy='7.85'
				r='0.75'
				fill='currentColor'
			/>
			<path
				d='m1.75 9 .815 9.041a1 1 0 0 0 .996.91H7.94a1 1 0 0 0 .995-.91L9.75 9M1 9h9.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M7.25 8.5a1.5 1.5 0 1 0-3 0'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4.5 11.75v4m2.5-4v4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	infoCircleFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1a9 9 0 1 1 0 18 9 9 0 0 1 0-18ZM8 9v1h1v4H8v1h4v-1h-1V9H8Zm1-4v2h2V5H9Z'
				fill='currentColor'
			/>
		</svg>
	),
	a11y: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<g clipPath='url(#c0d26a09-0334-4383-949b-2e9dddcf7f66)'>
				<path
					d='M11.074 6.588a2.855 2.855 0 0 0 1.645-1.82c.082-.272.126-.56.124-.859-.006-1.6-1.287-2.902-2.861-2.909C8.408.993 7.137 2.285 7.143 3.885a2.92 2.92 0 0 0 1.812 2.702m2.12 0a2.814 2.814 0 0 1-2.119 0m2.118 0 4.572-1.821c.994-.267 2.018.337 2.288 1.349.27 1.011-.315 2.048-1.308 2.314l-3.763 1.406.008.983 2.434 5.804c.27 1.012-.315 2.048-1.308 2.315-.993.267-2.017-.337-2.288-1.349l-1.678-4.108-1.645 4.094a1.845 1.845 0 0 1-2.277 1.33 1.914 1.914 0 0 1-1.327-2.325l2.389-5.785-.008-.982-3.774-1.438A1.914 1.914 0 0 1 2.062 6.05a1.845 1.845 0 0 1 2.277-1.33l4.616 1.869'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					fill='none'
				/>
			</g>
			<defs>
				<clipPath id='c0d26a09-0334-4383-949b-2e9dddcf7f66'>
					<path
						fill='#fff'
						d='M0 0h20v20H0z'
					/>
				</clipPath>
			</defs>
		</svg>
	),
	alert: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.3'
				d='M8.5 16.5h3v2h-3z'
			/>
			<path
				d='M11.765 16.486h4.183a1 1 0 0 0 .91-1.414l-.675-1.487a5 5 0 0 1-.448-2.067V8.943C15.735 5.66 13.168 3 10 3S4.265 5.66 4.265 8.943v2.575a5 5 0 0 1-.448 2.067l-.675 1.487a1 1 0 0 0 .91 1.414h4.183m3.53 0v.685c0 1.01-.79 1.829-1.765 1.829-.975 0-1.765-.819-1.765-1.829v-.685m3.53 0h-3.53'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M8.75 3v-.75a1.25 1.25 0 1 1 2.5 0V3'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	browser: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1.5 6.5h17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.25'
				y='3.5'
				width='1.5'
				height='1.5'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				x='4.5'
				y='3.5'
				width='1.5'
				height='1.5'
				rx='0.5'
				fill='currentColor'
			/>
			<path
				d='M9 4a.5.5 0 0 1 .5-.5h7.75a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5V4Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='6.75'
				y='3.5'
				width='1.5'
				height='1.5'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	archive: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='4'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='7.5'
				y='9'
				width='5'
				height='2'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<path
				d='M2.588 6v10.5a1.5 1.5 0 0 0 1.5 1.5h11.824a1.5 1.5 0 0 0 1.5-1.5V6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	expand: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16 1h2.828m0 0v2.828m0-2.828L16 3.828M3.828 1H1m0 0v2.828M1 1l2.828 2.828m0 15H1m0 0V16m0 2.828L3.828 16M16 18.828h2.828m0 0V16m0 2.828L16 16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	sortAsc: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m18.133 15.91.907 2.59m-.907-2.59-1.601-4.575A.5.5 0 0 0 16.06 11h-.08a.5.5 0 0 0-.472.335l-1.601 4.574m4.226 0h-4.226m0 0L13 18.5m.5-17h4.737v.395L13.5 8.605V9h4.737M2 6.52 6.5 1m0 0L11 6.52M6.5 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	sortDesc: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.133 6.41 19.04 9m-.907-2.59-1.601-4.575a.5.5 0 0 0-.472-.335h-.08a.5.5 0 0 0-.472.335l-1.601 4.574m4.226 0h-4.226m0 0L13 9m.5 2h4.737v.395l-4.737 6.71v.395h4.737M2 14.48 6.5 19m0 0 4.5-4.52M6.5 19V1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	attachment: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1 12.603 9.953-10.022c1.963-1.977 5.004-2.12 6.793-.318 1.789 1.8 1.647 4.863-.316 6.84l-8.886 8.948c-1.178 1.186-3.003 1.272-4.076.191-1.074-1.08-.989-2.918.19-4.104l7.464-7.516'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	experiment: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m6.5 13-1.776 3.875A1.5 1.5 0 0 0 6.088 19h8.825a1.5 1.5 0 0 0 1.363-2.125L14.5 13h-8Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M7.73 1h5.29M7.73 1v8.33a3 3 0 0 1-.284 1.276l-2.94 6.256A1.5 1.5 0 0 0 5.862 19h9.024a1.5 1.5 0 0 0 1.358-2.138l-2.94-6.256a3 3 0 0 1-.286-1.276V1M7.731 1H6.144m6.875 0h1.587'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6.25 12.75h8'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	bookmark: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4 3a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 16 3v15.242a.5.5 0 0 1-.864.344l-4.772-5.054a.5.5 0 0 0-.728 0l-4.772 5.054A.5.5 0 0 1 4 18.242V3Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	calendar: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.25 1.25h17.5v4H1.25z'
			/>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 5.5h18M1 10h18M5.5 5.5V19M10 5.5V19m4.5-13.5V19M1 14.5h18'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	photoCamera: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 6a1.5 1.5 0 0 1 1.5-1.5h2.419a1.5 1.5 0 0 0 1.423-1.026l.316-.948A1.5 1.5 0 0 1 8.081 1.5h3.838a1.5 1.5 0 0 1 1.423 1.026l.316.948A1.5 1.5 0 0 0 15.081 4.5H17.5A1.5 1.5 0 0 1 19 6v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17V6Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='11'
				r='4'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	highlightedCheckmark: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.151 1.863a1 1 0 0 1 1.698 0l1.136 1.825a1 1 0 0 0 1.075.445l2.093-.487a1 1 0 0 1 1.2 1.2l-.486 2.094a1 1 0 0 0 .445 1.075l1.825 1.136a1 1 0 0 1 0 1.698l-1.825 1.136a1 1 0 0 0-.445 1.075l.487 2.093a1 1 0 0 1-1.2 1.2l-2.094-.486a1 1 0 0 0-1.075.445l-1.136 1.825a1 1 0 0 1-1.698 0l-1.136-1.825a1 1 0 0 0-1.075-.445l-2.093.487a1 1 0 0 1-1.2-1.2l.486-2.094a1 1 0 0 0-.445-1.075l-1.825-1.136a1 1 0 0 1 0-1.698l1.825-1.136a1 1 0 0 0 .445-1.075l-.487-2.093a1 1 0 0 1 1.2-1.2l2.094.486a1 1 0 0 0 1.075-.445l1.136-1.825Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m7.5 10 1.875 1.75 3.125-3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	caretDown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.339 6.75H4.66c-.923 0-1.353 1.145-.658 1.753l5.338 4.67a1 1 0 0 0 1.318 0l5.338-4.67c.695-.608.265-1.753-.658-1.753Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	caretUp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.339 13.25H4.66c-.923 0-1.353-1.145-.658-1.753l5.338-4.67a1 1 0 0 1 1.318 0l5.338 4.67c.695.608.265 1.753-.658 1.753Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	caretLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.25 4.661V15.34c0 .923-1.145 1.353-1.753.658l-4.67-5.338a1 1 0 0 1 0-1.318l4.67-5.338c.608-.695 1.753-.265 1.753.658Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	caretRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.75 4.661V15.34c0 .923 1.145 1.353 1.753.658l4.67-5.338a1 1 0 0 0 0-1.318l-4.67-5.338c-.608-.695-1.753-.265-1.753.658Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	caretDownFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.339 6.75H4.66c-.923 0-1.353 1.145-.658 1.753l5.338 4.67a1 1 0 0 0 1.318 0l5.338-4.67c.695-.608.265-1.753-.658-1.753Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	caretUpFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.339 13.25H4.66c-.923 0-1.353-1.145-.658-1.753l5.338-4.67a1 1 0 0 1 1.318 0l5.338 4.67c.695.608.265 1.753-.658 1.753Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	caretLeftFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.25 4.661V15.34c0 .923-1.145 1.353-1.753.658l-4.67-5.338a1 1 0 0 1 0-1.318l4.67-5.338c.608-.695 1.753-.265 1.753.658Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	caretRightFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.75 4.661V15.34c0 .923 1.145 1.353 1.753.658l4.67-5.338a1 1 0 0 0 0-1.318l-4.67-5.338c-.608-.695-1.753-.265-1.753.658Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	clipboardPlain: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.35 3.4h2a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4.75a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1h2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4.95 5.1v12.2a.5.5 0 0 0 .5.5h9.7V5.1a.5.5 0 0 0-.5-.5h-9.2a.5.5 0 0 0-.5.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M6.75 4.6V2.8l1.8-.6V1h3v1.2l1.8.6v1.8h-6.6Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	currency: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='5.75'
				cy='5.75'
				r='5.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<circle
				cx='14.25'
				cy='14.25'
				r='5.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.5 11.55c-.528-.5-1.206-.8-1.944-.8-1.688 0-3.056 1.567-3.056 3.5s1.368 3.5 3.056 3.5c.738 0 1.416-.3 1.944-.8'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10.75 13.25h3M10.5 15h2.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M7.5 3.523s-.4-.91-1.6-.91M3.5 7.978s.8.91 2 .91m.4-6.273h-.832c-.866 0-1.568.702-1.568 1.568v0c0 .866.702 1.568 1.568 1.568h.864c.866 0 1.568.702 1.568 1.568v0c0 .866-.702 1.568-1.568 1.568H5.5m.4-6.272V1.25m-.4 7.636v1.364'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	moneyPaper: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='4'
				width='15'
				height='9'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M2.5 13v.25a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5h-.423'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4 14.5v.5a1.5 1.5 0 0 0 1.5 1.5h12A1.5 1.5 0 0 0 19 15V9a1.5 1.5 0 0 0-1.5-1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M3 6h1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='8.5'
				cy='8.5'
				r='2'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M12.5 11H14'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	design: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 1c-3.6 3.2-1.5 6-.5 6s2.5-1 2-3C3.958 1.83 2.667 1.333 3 1Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M1 10c0 5.428.614 7.805 1.4 8.872a.355.355 0 0 0 .262.153C4.5 19.115 4.5 12.445 4.5 10.5v0c0-4-3.5-5-3.5-.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='9'
				y='8'
				width='10'
				height='10'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6.47 2.686a5 5 0 1 1 .19 8.734'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionArrows: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.75'
				cy='10'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m7.5 3 2.25-2m0 0L12 3M9.75 1v5M7.5 17l2.25 2m0 0L12 17m-2.25 2v-5M3 7.75 1 10m0 0 2 2.25M1 10h5m11-2.25L19 10m0 0-2 2.25M19 10h-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionArrowsH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.75'
				cy='10'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M3 7.75 1 10m0 0 2 2.25M1 10h5m11-2.25L19 10m0 0-2 2.25M19 10h-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionArrowsV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.75'
				cy='10'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m7.5 3 2.25-2m0 0L12 3M9.75 1v5M7.5 17l2.25 2m0 0L12 17m-2.25 2v-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	flipH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M8.5 19H1L8.5 1v18Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M11.5 19H19L11.5 1v18Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	flipV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 11.5V19L1 11.5h18Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M19 8.5V1L1 8.5h18Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	clock: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 4.25v5.714L7 12.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	globe: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<ellipse
				cx='10'
				cy='10'
				rx='3.5'
				ry='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M2 7h16M2 13h16'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	history: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 10a9 9 0 1 0 2.813-6.536l-.45.349m0 0L3.25 1m.112 2.813 2.7.562'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M10 4.375V10h3.375'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	moreH: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='5'
				cy='10'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='10'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='15'
				cy='10'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	moreV: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='10'
				cy='5'
				r='1'
				transform='rotate(90 10 5)'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='10'
				r='1'
				transform='rotate(90 10 10)'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='15'
				r='1'
				transform='rotate(90 10 15)'
				fill='currentColor'
			/>
		</svg>
	),
	moreHCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='6'
				cy='10'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='10'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='14'
				cy='10'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	moreVCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				transform='rotate(90 10 10)'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='6'
				r='1'
				transform='rotate(90 10 6)'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='10'
				r='1'
				transform='rotate(90 10 10)'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='14'
				r='1'
				transform='rotate(90 10 14)'
				fill='currentColor'
			/>
		</svg>
	),
	reorderGrabberH: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='5'
				cy='7.5'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='5'
				cy='12.5'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='7.5'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='12.5'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='15'
				cy='7.5'
				r='1'
				fill='currentColor'
			/>
			<circle
				cx='15'
				cy='12.5'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	reorderGrabberV: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='12.5'
				cy='5'
				r='1'
				transform='rotate(90 12.5 5)'
				fill='currentColor'
			/>
			<circle
				cx='7.5'
				cy='5'
				r='1'
				transform='rotate(90 7.5 5)'
				fill='currentColor'
			/>
			<circle
				cx='12.5'
				cy='10'
				r='1'
				transform='rotate(90 12.5 10)'
				fill='currentColor'
			/>
			<circle
				cx='7.5'
				cy='10'
				r='1'
				transform='rotate(90 7.5 10)'
				fill='currentColor'
			/>
			<circle
				cx='12.5'
				cy='15'
				r='1'
				transform='rotate(90 12.5 15)'
				fill='currentColor'
			/>
			<circle
				cx='7.5'
				cy='15'
				r='1'
				transform='rotate(90 7.5 15)'
				fill='currentColor'
			/>
		</svg>
	),
	latestPosts: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='8.5'
				y='8.5'
				width='8.5'
				height='8.5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11 18a1 1 0 0 0 1 1h5.5a1.5 1.5 0 0 0 1.5-1.5V12a1 1 0 0 0-1-1m-5-4a6 6 0 1 0-6 6'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7 3v4.286L5 9'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11 11.25h2.5m-2.5 2h1.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAbc: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.368 10.335c-3.454.266-4.243.653-4.243 1.816s1.184 1.26 1.974 1.26c1.859 0 2.27-1.961 2.27-2.582m0-.494v.494m0-.494c0-.775 0-2.385-1.876-2.448-1.578-.053-1.973.776-2.072 1.163m3.947 1.78v1.709c0 .62.494.775.691.775h.198'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M8.125 6v7.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M12.763 10.54c0-1.527-.888-2.566-2.072-2.566-1.185 0-2.369 1.184-2.369 2.566v.394c0 1.382 1.184 2.566 2.369 2.566 1.184 0 2.072-1.04 2.072-2.566v-.394Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M18.812 9.266c-.197-.592-.928-1.381-1.875-1.381-.658 0-1.974 0-2.467 1.973a3.334 3.334 0 0 0 0 1.58c.493 1.973 1.81 1.973 2.467 1.973.947 0 1.678-.79 1.875-1.381'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	titleGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m6.014 10.85.665 1.9m-.665-1.9L4.85 7.523a.408.408 0 0 0-.386-.273v0a.408.408 0 0 0-.385.273L2.915 10.85m3.099 0h-3.1m0 0-.664 1.9m7.901-2.895c.625 0 1.737.29 1.737 1.448 0 1.157-1.112 1.447-1.737 1.447H8.125V9.855m2.026 0H8.125m2.026 0c.483 0 1.448-.29 1.448-1.447 0-1.158-1.448-1.158-1.448-1.158H8.125v2.605m9.717-1.158s-.405-1.447-2.026-1.447C14.195 7.25 13.5 8.697 13.5 10s.695 2.75 2.316 2.75c1.62 0 2.026-1.447 2.026-1.447'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19.5 15V5A1.5 1.5 0 0 0 18 3.5H2A1.5 1.5 0 0 0 .5 5v10A1.5 1.5 0 0 0 2 16.5h16a1.5 1.5 0 0 0 1.5-1.5Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	reduceHeightBottom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 15 2-2m0 0 2 2m-2-2v5.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 2.5V9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 11.5v.5a1.5 1.5 0 0 0 1.5 1.5H7m12-2v.5a1.5 1.5 0 0 1-1.5 1.5H13'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 14.25v.5a1.5 1.5 0 0 0 1.5 1.5h5m11.5-2v.5a1.5 1.5 0 0 1-1.5 1.5h-5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 17v.5A1.5 1.5 0 0 0 2.5 19H8m11-2v.5a1.5 1.5 0 0 1-1.5 1.5H12'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	reduceHeightTop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 5 2 2m0 0 2-2m-2 2V1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 17.5V11a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 11v6.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 8.5V8a1.5 1.5 0 0 1 1.5-1.5H7m12 2V8a1.5 1.5 0 0 0-1.5-1.5H13'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 5.75v-.5a1.5 1.5 0 0 1 1.5-1.5h5m11.5 2v-.5a1.5 1.5 0 0 0-1.5-1.5h-5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 3v-.5A1.5 1.5 0 0 1 2.5 1H8m11 2v-.5A1.5 1.5 0 0 0 17.5 1H12'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	num0Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 6.155c-1.828 0-2.844 1.63-2.844 3.643v.404c0 2.012 1.016 3.643 2.844 3.643 1.932 0 2.844-1.63 2.844-3.643v-.404c0-2.012-.912-3.643-2.844-3.643Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num1Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10.203 13.845V7.37m0 6.476h1.625m-1.625 0H8.172m.812-6.476c.975 0 1.219-.81 1.219-1.214V7.37m-1.219 0h-.61m.61 0h1.219'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num2Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.494 13.845H7.497c.02-.838.428-2.11 3.013-3.375 2.356-1.153 1.932-2.673 1.783-3.095-.584-1.642-4.038-1.866-4.755.824'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num3Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.648 7.594c.135-.521.517-1.442 2.349-1.44 1.625.003 2.107.777 2.234 1.563.116.714-.302 2.006-2.929 2.028 1.746.027 2.885.617 3.166 1.59.295 1.025-.34 2.448-2.288 2.507-2.075.063-2.587-.906-2.723-1.426'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num4Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.625 13.845v-2.024m0 0V6.155h-.406l-4.063 5.262v.405h4.469Zm0 0h1.219'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num5Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.102 6.155H8.04l-.402 4.008c.468-.706 1.495-1.175 2.433-1.175 1.561-.051 2.438 1.133 2.438 2.53 0 1.397-.867 2.299-2.641 2.327-1.248.02-2.118-.415-2.306-1.492'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num6Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.393 7.382c-.204-.707-1.113-1.433-2.594-1.173-1.15.283-1.72 1.086-2.037 2.087-.321 1.013-.3 2.096-.257 3.157v0m0 0C7.5 10.357 8.679 9.069 10.08 9.069c1.403 0 2.442 1.021 2.442 2.343 0 1.32-1.077 2.433-2.48 2.433-1.2 0-2.206-.785-2.47-1.84a2.267 2.267 0 0 1-.068-.552Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num7Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.461 6.155h5.078v.405c-1.083.81-3.148 3.4-3.148 7.285'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num8Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.765 7.93c0-.98.819-1.775 1.829-1.775h.812c1.01 0 1.828.794 1.828 1.775 0 .98-.818 1.774-1.828 1.774h-.812c-1.01 0-1.829-.794-1.829-1.774Zm-.405 3.845c0-1.144.954-2.07 2.132-2.07h1.016c1.178 0 2.132.926 2.132 2.07 0 1.143-.955 2.07-2.132 2.07H9.492c-1.178 0-2.133-.927-2.133-2.07Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num9Circle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.443 8.515c.06 1.327-1.262 2.43-2.604 2.384-1.393-.077-2.308-.922-2.357-2.272-.037-1.21.934-2.424 2.335-2.47 1.402-.048 2.577 1.008 2.626 2.358Zm0 0c.02 1.256.205 4.43-1.727 5.128-1.638.592-2.785-.233-3.001-.971'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	bold: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.21 9.592c1.761 0 4.895.816 4.895 4.08 0 3.262-3.134 4.078-4.895 4.078H5.5V9.592m5.71 0H5.5m5.71 0c1.36 0 4.08-.816 4.08-4.079S11.21 2.25 11.21 2.25H5.5v7.342'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	italic: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14 1h-3.406m0 0-2.25 18m2.25-18H7.25m1.094 18H5m3.344 0h3.406'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	underline: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 1v10.308c0 2.867 2.239 5.192 5 5.192s5-2.325 5-5.192V1M3.5 19h13'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	responsiveOverridesAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 1h-11A1.5 1.5 0 0 0 5 2.5V7h1.5A1.5 1.5 0 0 1 8 8.5V11h9.5A1.5 1.5 0 0 0 19 9.5v-7A1.5 1.5 0 0 0 17.5 1Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12 14v-3m0 3H9.5m2.5 0h2.5M12 11h5.5A1.5 1.5 0 0 0 19 9.5v-7A1.5 1.5 0 0 0 17.5 1h-11A1.5 1.5 0 0 0 5 2.5V7h1.5A1.5 1.5 0 0 1 8 8.5V11h4Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='1'
				y='7'
				width='7'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M3.75 17.5h1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='4.5'
				cy='8.5'
				r='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	inherit: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				className='arrow-btm'
				d='m10 19-4.5-5h9L10 19Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				className='arrow-mid'
				d='m10 12.5-4.5-5h9l-4.5 5Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				className='arrow-top'
				d='M10 6 5.5 1h9L10 6Z'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	columns: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='4.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='14.5'
				y='1'
				width='4.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='7.6499'
				y='1'
				width='4.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	rows: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='4.5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1'
				y='14.5'
				width='18'
				height='4.5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1'
				y='7.75'
				width='18'
				height='4.5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	clear: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2 2 8 8m0 0 8 8m-8-8 8-8m-8 8-8 8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	dropdownCaret: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3 7 6.646 6.646a.5.5 0 0 0 .708 0L17 7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	checkCircleFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-.955-4.452a.55.55 0 0 1-.434-.16l-3-3a.55.55 0 0 1 .692-.847l.086.07 2.54 2.541 4.624-6.471a.55.55 0 1 1 .894.638l-5 7a.55.55 0 0 1-.402.229Z'
				fill='currentColor'
			/>
		</svg>
	),
	componentGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m9.912 19-6.656-3.803a1.5 1.5 0 0 1-.756-1.303V5.235l7.412 4.236V19Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='m9.912 19 6.656-3.803a1.5 1.5 0 0 0 .755-1.303V5.235L9.912 9.471V19Zm7.411-13.765-6.667-3.81a1.5 1.5 0 0 0-1.488 0L2.5 5.235l7.412 4.236 7.411-4.236Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	toggleOff: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				className='es-toggle-icon-container'
				x='1'
				y='5'
				width='18'
				height='10'
				rx='5'
				stroke='var(--es-toggle-icon-container-stroke, currentColor)'
				fill='var(--es-toggle-icon-container-fill, transparent)'
				fillOpacity='var(--es-toggle-icon-container-fill-opacity, 0)'
				strokeWidth='0.5'
			/>
			<circle
				className='es-toggle-icon-thumb'
				cx='6'
				cy='10'
				r='2.75'
				fill='var(--es-toggle-icon-thumb-fill, currentColor)'
				fillOpacity='var(--es-toggle-icon-thumb-fill-opacity, 1)'
				stroke='var(--es-toggle-icon-thumb-stroke, currentColor)'
			/>
		</svg>
	),
	toggleOn: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				className='es-toggle-icon-container'
				x='1'
				y='5'
				width='18'
				height='10'
				rx='5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<circle
				className='es-toggle-icon-thumb'
				cx='14'
				cy='10'
				r='2.75'
				fill='currentColor'
				stroke='currentColor'
			/>
		</svg>
	),
	toggleOnAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M.5 10c0-3.038 2.508-5.5 5.603-5.5h7.794c3.095 0 5.603 2.462 5.603 5.5s-2.508 5.5-5.603 5.5H6.103C3.008 15.5.5 13.038.5 10Zm10.25 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Z'
				fill='currentColor'
			/>
		</svg>
	),
	hyphenate: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.8'
				d='M3.25 6A4.697 4.697 0 0 0 1 10c0 1.687.899 3.167 2.25 4m13.5-8A4.697 4.697 0 0 1 19 10a4.697 4.697 0 0 1-2.25 4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M6.063 10h7.875'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	hyphenateAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.513 14.553c.852 0 2.369.394 2.369 1.973 0 1.58-1.517 1.974-2.369 1.974H3.75v-3.947m2.763 0H3.75m2.763 0c.658 0 1.974-.395 1.974-1.974S6.513 11 6.513 11H3.75v3.553m12.921-1.579S16.12 11 13.908 11c-2.21 0-3.158 1.974-3.158 3.75s.947 3.75 3.158 3.75c2.21 0 2.763-1.974 2.763-1.974M8.883 6.41 9.789 9m-.906-2.59L7.282 1.834A.5.5 0 0 0 6.81 1.5h-.08a.5.5 0 0 0-.472.335L4.657 6.409m4.226 0H4.657m0 0L3.75 9M14.5 5.5H11'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	hyphenateAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.5 5.5H15m-2.117.91L13.79 9m-.907-2.59-1.601-4.575a.5.5 0 0 0-.472-.335h-.08a.5.5 0 0 0-.472.335L8.657 6.409m4.226 0H8.657m0 0L7.75 9m-3.237 5.553c.852 0 2.369.394 2.369 1.973 0 1.58-1.517 1.974-2.369 1.974H1.75v-3.947m2.763 0H1.75m2.763 0c.658 0 1.974-.395 1.974-1.974S4.513 11 4.513 11H1.75v3.553m12.921-1.579S14.118 11 11.908 11 8.75 12.974 8.75 14.75s.947 3.75 3.158 3.75c2.21 0 2.763-1.974 2.763-1.974'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	lineBreak: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='2'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<path
				d='M3.5 12H14a1.5 1.5 0 0 0 1.5-1.5V4m-12 8 4-4m-4 4 4 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	lineBreakOff: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 12.75V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.75'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3.5 12H14a1.5 1.5 0 0 0 1.5-1.5V4m-12 8 4-4m-4 4 4 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='16.25'
				cy='16.25'
				r='2.75'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m14.417 14.417 3.666 3.666'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	lineBreakOffAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.6'
				d='M3.647 12.118h11.206a1.5 1.5 0 0 0 1.5-1.5v-6.97m-12.706 8.47L6.294 9.47m-2.647 2.647 4.235 4.235'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m4 4 12 12'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	lineBreakAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10.563 8.333H1m9.563 3.334H1M10.563 15H1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.375 8.333H17.5a1.5 1.5 0 0 0 1.5-1.5V6.5A1.5 1.5 0 0 0 17.5 5H1m12.375 3.333L15 6.975m-1.625 1.358L15 9.938'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	lineBreakAltOff: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m14 12 1.75 1.75m0 0 1.75 1.75m-1.75-1.75L17.5 12m-1.75 1.75L14 15.5m-3.437-7.167H1M10.563 5H1m9.563 6.667H1M10.563 15H1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.375 8.333H17.5a1.5 1.5 0 0 0 1.5-1.5V6.5A1.5 1.5 0 0 0 17.5 5H10m3.375 3.333L15 6.975m-1.625 1.358L15 9.938'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	sizeAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.5 2h13A1.5 1.5 0 0 1 18 3.5v13H5A1.5 1.5 0 0 1 3.5 15V2Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<circle
				cx='3.5'
				cy='16.5'
				r='1.5'
				fill='currentColor'
			/>
			<path
				d='m1.25 4.5 2.25-2m0 0 2.25 2m-2.25-2v10m12.25 1.75 2 2.25m0 0-2 2.25m2-2.25h-10'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	genericShapes: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.125 12.25v5.25a1.5 1.5 0 0 0 1.5 1.5h8.25a1.5 1.5 0 0 0 1.5-1.5V9.25a1.5 1.5 0 0 0-1.5-1.5H12.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M12.75 7.75H8.625a1.5 1.5 0 0 0-1.5 1.5v3'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='7.125'
				cy='6.625'
				r='5.625'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	iconGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 10a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9v7.5a1.5 1.5 0 0 1-1.5 1.5H10m9-9V2.5A1.5 1.5 0 0 0 17.5 1H10m0 18a9 9 0 0 1-9-9m9 9H2.5A1.5 1.5 0 0 1 1 17.5V10m0 0a9 9 0 0 1 9-9m-9 9V2.5A1.5 1.5 0 0 1 2.5 1H10'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<path
				d='M9.151 1.863a1 1 0 0 1 1.698 0l1.136 1.825a1 1 0 0 0 1.075.445l2.093-.487a1 1 0 0 1 1.2 1.2l-.486 2.094a1 1 0 0 0 .445 1.075l1.825 1.136a1 1 0 0 1 0 1.698l-1.825 1.136a1 1 0 0 0-.445 1.075l.487 2.093a1 1 0 0 1-1.2 1.2l-2.094-.486a1 1 0 0 0-1.075.445l-1.136 1.825a1 1 0 0 1-1.698 0l-1.136-1.825a1 1 0 0 0-1.075-.445l-2.093.487a1 1 0 0 1-1.2-1.2l.486-2.094a1 1 0 0 0-.445-1.075l-1.825-1.136a1 1 0 0 1 0-1.698l1.825-1.136a1 1 0 0 0 .445-1.075l-.487-2.093a1 1 0 0 1 1.2-1.2l2.094.486a1 1 0 0 0 1.075-.445l1.136-1.825Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	imageCaption: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='17'
				width='10'
				height='3'
				rx='1'
				fill='currentColor'
			/>
			<path
				d='m3 12.2 2.443-2.171a1.5 1.5 0 0 1 2.057.06l.221.22a1.5 1.5 0 0 0 2.17-.05l1.726-1.899a1.5 1.5 0 0 1 2.216-.004L17 11.81M4.5 1h11A1.5 1.5 0 0 1 17 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 13.5v-11A1.5 1.5 0 0 1 4.5 1Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='7.20005'
				cy='5.2'
				r='1.4'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	aspectRatio: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				y='2'
				width='20'
				height='16'
				rx='1.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M1.25 7.25v-3a1 1 0 0 1 1-1h3m9.5 13.5h3a1 1 0 0 0 1-1v-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	stagger: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9 7a5 5 0 1 1 6 4.9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M4 14.5V12h3V9.5h2.5v5H4Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M14 3.875V7l-1.875 1.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='1'
				y='6'
				width='6'
				height='6'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M7 9h1.5a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 8.5 15h-3A1.5 1.5 0 0 1 4 13.5V12'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 12h1.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 7 16.5V15'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	lineBreaksHyphenation: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.763 14.553c.852 0 2.369.394 2.369 1.973 0 1.58-1.517 1.974-2.369 1.974H9v-3.947m2.763 0H9m2.763 0c.658 0 1.974-.395 1.974-1.974S11.763 11 11.763 11H9v3.553M6.133 15.91l.906 2.59m-.906-2.59-1.601-4.575A.5.5 0 0 0 4.06 11h-.08a.5.5 0 0 0-.472.335l-1.601 4.574m4.226 0H1.907m0 0L1 18.5M18.75 15h-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.8'
				d='M10.944 4.833H1.5m9.444 3.334H1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.875 4.833H18a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 18 1.5H1.5m12.375 3.333L15.5 3.475m-1.625 1.358L15.5 6.438'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	backgroundTypeAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='13.5'
				height='13.5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 17.5V5.875a1.5 1.5 0 0 0-1.5-1.5h-3V13a1.5 1.5 0 0 1-1.5 1.5H4.375v3a1.5 1.5 0 0 0 1.5 1.5H17.5a1.5 1.5 0 0 0 1.5-1.5Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	columnGuttersLR: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.9'
				width='3.5'
				height='20'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='4.75'
				width='2.5'
				height='20'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='8.75'
				width='2.5'
				height='20'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='12.75'
				width='2.5'
				height='20'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				opacity='0.9'
				x='16.5'
				width='3.5'
				height='20'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	divider: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18 2.5H2A1.5 1.5 0 0 0 .5 4v12A1.5 1.5 0 0 0 2 17.5h16a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 18 2.5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M1 19h18M1 1h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	layoutAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 1H2.5A1.5 1.5 0 0 0 1 2.5V7a1.5 1.5 0 0 0 1.5 1.5H7A1.5 1.5 0 0 0 8.5 7V2.5A1.5 1.5 0 0 0 7 1Zm0 10.5H2.5A1.5 1.5 0 0 0 1 13v4.5A1.5 1.5 0 0 0 2.5 19H7a1.5 1.5 0 0 0 1.5-1.5V13A1.5 1.5 0 0 0 7 11.5ZM17.5 1H13a1.5 1.5 0 0 0-1.5 1.5V7A1.5 1.5 0 0 0 13 8.5h4.5A1.5 1.5 0 0 0 19 7V2.5A1.5 1.5 0 0 0 17.5 1Zm0 10.5H13a1.5 1.5 0 0 0-1.5 1.5v4.5A1.5 1.5 0 0 0 13 19h4.5a1.5 1.5 0 0 0 1.5-1.5V13a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	layoutAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.5 1.5h8v8h-8z'
			/>
			<path
				d='M1 10h9m0 0V1m0 9v9m-9-1.5v-15A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	layoutAlt3: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.5 1H2a1 1 0 0 0-1 1v8.5a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1ZM18 8.5h-5.5a1 1 0 0 0-1 1V18a1 1 0 0 0 1 1H18a1 1 0 0 0 1-1V9.5a1 1 0 0 0-1-1ZM7.5 14H2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1ZM18 1h-5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1H18a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	layoutAlt4: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 7h9m0 0V1m0 6v6m0 6v-6m0 0h9m0 0V2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V13Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	module: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9 11V4.5A1.5 1.5 0 0 0 7.5 3h-5A1.5 1.5 0 0 0 1 4.5V11m8 0H1m8 0v8m0-8h6.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H9m-8-8v6.5A1.5 1.5 0 0 0 2.5 19H9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.096 1.404 9.561 4.939a1.5 1.5 0 0 0 0 2.122l3.535 3.535a1.5 1.5 0 0 0 2.121 0l3.536-3.535a1.5 1.5 0 0 0 0-2.122l-3.536-3.535a1.5 1.5 0 0 0-2.12 0Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	clearAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m15.5 8-4 4m0-4 4 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 14V6a1.5 1.5 0 0 0-1.5-1.5H7.311a1.5 1.5 0 0 0-.984.368L1.396 9.156a.5.5 0 0 0-.033.723l4.944 5.159a1.5 1.5 0 0 0 1.083.462H17.5A1.5 1.5 0 0 0 19 14Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	visibility: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.5'
				d='M12 2.5h5.25a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H12v-15Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M2 3.25a.75.75 0 0 1 .75-.75H8v15H2.75a.75.75 0 0 1-.75-.75V3.25Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M8 2H3a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 3 18h5'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M12 2h5a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 17 18h-5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	visibilityAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<ellipse
				opacity='0.6'
				cx='10.0001'
				cy='10'
				rx='1.94444'
				ry='2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 14c-3.889 0-6.222-2.4-7-4 .778-1.6 3.111-4 7-4s6.222 2.4 7 4c-.778 1.6-3.111 4-7 4Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.8'
				d='M6 1H4a3 3 0 0 0-3 3v2m5 13H4a3 3 0 0 1-3-3v-2m18-8V4a3 3 0 0 0-3-3h-2m5 13v2a3 3 0 0 1-3 3h-2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	visibilityAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14.5 3.5v6.894c-6.17-1.183-9.337 2.742-10 4.106H4A1.5 1.5 0 0 1 2.5 13V3.5A1.5 1.5 0 0 1 4 2h9a1.5 1.5 0 0 1 1.5 1.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M4 14.5h-.5A1.5 1.5 0 0 1 2 13V3a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 15 3v7'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				opacity='0.6'
				cx='12.125'
				cy='15.25'
				r='1.75'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.125 18.75c-3.403 0-5.444-2.1-6.125-3.5.68-1.4 2.722-3.5 6.125-3.5s5.444 2.1 6.125 3.5c-.68 1.4-2.722 3.5-6.125 3.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	separatorH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.5 10h-17'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='19'
				y='1.00001'
				width='6.5'
				height='18'
				rx='1.5'
				transform='rotate(90 19 1)'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='19'
				y='12.5'
				width='6.5'
				height='18'
				rx='1.5'
				transform='rotate(90 19 12.5)'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	separatorV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1.5v17'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='1'
				y='1'
				width='6.5'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='12.5'
				y='1'
				width='6.5'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	typography: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='1'
				y='16'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='16'
				y='1'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='16'
				y='16'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M5.5 2.5h9m-12 3v9m15-9v9m-12 3h9'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeDasharray='1.5 2'
				fill='none'
			/>
			<path
				d='M5.5 7v-.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75V7a.75.75 0 0 1-.75.75h-2.625v6a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-6H6.25A.75.75 0 0 1 5.5 7Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	typographyOptions: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='8'
				y='7'
				width='12'
				height='12'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10.5 9.875h4.375m2.625 0h-.875'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='15.75'
				cy='9.875'
				r='0.875'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M10.5 13h.875m6.125 0h-4.375'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='12.25'
				cy='13'
				r='0.875'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M10.5 16.125h3.063m3.937 0h-2.188'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='14.4375'
				cy='16.125'
				r='0.875'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M1 4v-.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-.75.75H6.625v6a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-6H1.75A.75.75 0 0 1 1 4Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	animationGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='13'
				cy='7'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<path
				opacity='0.6'
				d='M5.16 7.797A5 5 0 0 0 12 15'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='M1.877 12.5a4 4 0 0 0 5.49 5.725'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	animationSettingsGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M13.575 11.47a1.176 1.176 0 0 1-1.687 1.06c-.111-.054-.251-.04-.326.058-.226.3-.412.632-.548.99-.05.134.042.276.175.329a1.177 1.177 0 0 1 0 2.186c-.133.053-.226.195-.175.33.136.357.322.69.548.989.075.099.215.112.326.058a1.176 1.176 0 0 1 1.685 1.126c-.007.123.06.247.18.278a4.004 4.004 0 0 0 1.5.095c.143-.018.225-.167.21-.31a1.176 1.176 0 0 1 1.927-1.029c.108.094.276.108.37 0a3.99 3.99 0 0 0 .726-1.207c.05-.135-.042-.276-.175-.33a1.177 1.177 0 0 1 0-2.186c.133-.053.226-.195.175-.33a4.002 4.002 0 0 0-.725-1.207c-.095-.108-.263-.093-.372 0a1.176 1.176 0 0 1-1.927-1.029c.016-.143-.066-.292-.208-.31a4.026 4.026 0 0 0-1.502.095c-.12.03-.186.155-.18.279a.697.697 0 0 1 .003.066Zm1.175 4.942a1.411 1.411 0 1 0-.002-2.822 1.411 1.411 0 0 0 .002 2.822Z'
				fill='currentColor'
			/>
			<path
				d='M17.706 10.723a6 6 0 1 0-7.556 1.559'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.6'
				d='M5.16 7.797a5 5 0 0 0 4.605 8.144'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='M1.877 12.5a4 4 0 0 0 5.49 5.725'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	animationListGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.706 10.723a6 6 0 1 0-7.556 1.559'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.6'
				d='M5.16 7.797a5 5 0 0 0 4.605 8.144'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13 13.5h5.5M13 16h5.5M13 18.5h5.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='M1.877 12.5a4 4 0 0 0 5.49 5.725'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	dummySpacer: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill='none'
				d='M0 0h20v20H0z'
			/>
		</svg>
	),
	shuffle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 14h4.378c.398 0 .78-.158 1.061-.44l7.122-7.12A1.5 1.5 0 0 1 14.62 6H19m0 0-2 2.5M19 6l-2-2.5M1 6h4.378c.398 0 .78.158 1.061.44L8.5 8.5M19 14h-4.379a1.5 1.5 0 0 1-1.06-.44L11.5 11.5M19 14l-2-2.5m2 2.5-2 2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	twoColumns: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='7.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='11.5'
				y='1'
				width='7.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	fourColumns: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.875'
				y='1'
				width='3'
				height='18'
				rx='0.75'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11 1.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V1.75Zm5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V1.75Z'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='6'
				y='1'
				width='3'
				height='18'
				rx='0.75'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	highlightedExclamationMark: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 7v3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='12.75'
				r='0.75'
				fill='currentColor'
			/>
			<path
				d='M9.151 1.863a1 1 0 0 1 1.698 0l1.136 1.825a1 1 0 0 0 1.075.445l2.093-.487a1 1 0 0 1 1.2 1.2l-.486 2.094a1 1 0 0 0 .445 1.075l1.825 1.136a1 1 0 0 1 0 1.698l-1.825 1.136a1 1 0 0 0-.445 1.075l.487 2.093a1 1 0 0 1-1.2 1.2l-2.094-.486a1 1 0 0 0-1.075.445l-1.136 1.825a1 1 0 0 1-1.698 0l-1.136-1.825a1 1 0 0 0-1.075-.445l-2.093.487a1 1 0 0 1-1.2-1.2l.486-2.094a1 1 0 0 0-.445-1.075l-1.825-1.136a1 1 0 0 1 0-1.698l1.825-1.136a1 1 0 0 0 .445-1.075l-.487-2.093a1 1 0 0 1 1.2-1.2l2.094.486a1 1 0 0 0 1.075-.445l1.136-1.825Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	star: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.453 1.668a.75.75 0 0 1 1.345 0l2.239 4.536a.75.75 0 0 0 .564.41l5.006.728a.75.75 0 0 1 .416 1.28l-3.622 3.53a.75.75 0 0 0-.216.664l.855 4.986a.75.75 0 0 1-1.088.79l-4.478-2.353a.75.75 0 0 0-.698 0L5.3 18.593a.75.75 0 0 1-1.089-.79l.855-4.987a.75.75 0 0 0-.215-.664l-3.623-3.53a.75.75 0 0 1 .416-1.28l5.006-.727a.75.75 0 0 0 .565-.41l2.239-4.537Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	globeHash: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.941 9.97a8.47 8.47 0 1 0-8.47 8.471'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.706 9.97c0-4.678-1.896-8.47-4.235-8.47-2.34 0-4.236 3.792-4.236 8.47 0 4.679 1.897 8.471 4.236 8.471'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M2.059 7.059h14.823M2.059 12.882h7.818'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m17.412 12.618-1.059 6.353m-2.118-6.353-1.058 6.353m-1.059-4.765H19m-7.412 3.176h6.883'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	globeAnchor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 21 20'
			width='21'
			height='20'
			fill='none'
		>
			<path
				d='M18.941 9.47a8.47 8.47 0 1 0-8.47 8.471'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M14.706 9.47C14.706 4.793 12.81 1 10.47 1S6.235 4.792 6.235 9.47c0 4.679 1.897 8.471 4.236 8.471'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3.059 6.559h14.823M3.059 12.382h7.817'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M16.307 13.177V19m-1.122-4.292h2.245'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.199 15.614c-.065-.549-.61-.68-.61-.68s.16 2.165 1.378 2.557c1.218.391 2.314 1.495 2.314 1.495m3.109-3.372c.064-.549.61-.68.61-.68s-.161 2.165-1.379 2.557c-1.218.391-2.314 1.495-2.314 1.495'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<ellipse
				cx='16.2713'
				cy='12.1176'
				rx='0.526147'
				ry='0.529412'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	ariaLabel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m17.428 2.449 1.294 4.83a1.5 1.5 0 0 1-1.06 1.837l-6.896 1.848a1.5 1.5 0 0 1-1.026-.091L5.62 8.939a.5.5 0 0 1-.223-.7l2.459-4.317a1.5 1.5 0 0 1 .915-.706l6.82-1.828a1.5 1.5 0 0 1 1.837 1.06Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<path
				d='M15.178 5.64 10.83 6.805'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 15v2.5A1.5 1.5 0 0 0 2.5 19h8a1.5 1.5 0 0 0 1.5-1.5V15a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 1 15Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5 9c-1.833.667-4.7 2.5-1.5 4.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	automatic: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1 15 .64-3.2M5 15l-.64-3.2m-2.72 0L3 5l1.36 6.8m-2.72 0h2.72M6.75 5v8.5a1.5 1.5 0 0 0 1.5 1.5v0a1.5 1.5 0 0 0 1.5-1.5V5m1.75 0H13m1.5 0H13m0 0v10m6-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 3 0Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	automaticAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M0 5a1.5 1.5 0 0 1 1.5-1.5h17A1.5 1.5 0 0 1 20 5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 0 15V5Zm3.389.5a.5.5 0 0 1 .487.385l1.284 5.44.604 2.56a.5.5 0 1 1-.973.23l-.513-2.175H2.5l-.513 2.175a.5.5 0 0 1-.974-.23l.605-2.56 1.284-5.44A.5.5 0 0 1 3.39 5.5Zm-.653 5.44h1.306l-.653-2.764-.653 2.764ZM7.431 6a.5.5 0 1 0-1 0v6.583a1.917 1.917 0 1 0 3.833 0V6a.5.5 0 1 0-1 0v6.583a.917.917 0 1 1-1.833 0V6Zm3.485 0a.5.5 0 0 1 .5-.5h2.834a.5.5 0 1 1 0 1h-.917V14a.5.5 0 1 1-1 0V6.5h-.917a.5.5 0 0 1-.5-.5Zm6.167-.5a1.917 1.917 0 0 0-1.916 1.917v5.166a1.917 1.917 0 1 0 3.833 0V7.417A1.917 1.917 0 0 0 17.083 5.5Zm-.916 1.917a.917.917 0 0 1 1.833 0v5.166a.917.917 0 0 1-1.833 0V7.417Z'
				fill='currentColor'
			/>
		</svg>
	),
	fileMetadata: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11 14h6.5a1.5 1.5 0 0 0 1.5-1.5V5m-4-4v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4h-4.5A1.5 1.5 0 0 0 9 2.5V9m6-8v3.5a.5.5 0 0 0 .5.5H19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				width='10'
				height='10'
				rx='1.5'
				transform='matrix(1 0 0 -1 1 19)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4 16h3.5M4 14h3.5M4 12h3.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M15 5V1l4 4h-4Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	optionList: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2.5 3 1.688 1.75L7 1.25M2.5 10l1.688 1.75L7 8.25M2.5 17l1.688 1.75L7 15.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='1.46429'
				width='3.5'
				height='3.5'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='8.46429'
				width='3.5'
				height='3.5'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='15.4643'
				width='3.5'
				height='3.5'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9.5 3.214h8m-8 7H16m-6.5 7h8'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	optionListAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2.5 3 1.688 1.75L7 1.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='8.46429'
				width='3.5'
				height='3.5'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='1.46429'
				width='3.5'
				height='3.5'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='15.4643'
				width='3.5'
				height='3.5'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9.5 3.214h8m-8 7H16m-6.5 7h8'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	externalLink: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.71 3.903H2.5a1.5 1.5 0 0 0-1.5 1.5V17.5A1.5 1.5 0 0 0 2.5 19h12.097a1.5 1.5 0 0 0 1.5-1.5v-7.21'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M9.13 10.871 19 1m0 0h-6.387M19 1v6.387'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	flag: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.086 2.543 4 4.086l.514 7.2 6.686-.515 5.143-1.542-.514-7.2-8.743.514Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M4.257 4.086C5.114 3.4 7.55 2.13 10.428 2.543c2.88.411 4.972-.857 5.658-1.543v8.229c-.686.685-2.777 1.954-5.657 1.542-2.88-.411-5.315.858-6.172 1.543m0-8.228v8.228m0-8.228V3.57m0 8.743V19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	flagAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.086 2.543 4 4.086l.514 7.2 6.686-.515 5.143-1.542-.514-7.2-8.743.514Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M4.617 12.314 5.03 19m-.412-6.686c.857-.685 2.674-1.954 5.554-1.543 2.88.412 5.486-.857 6.172-1.542L15.829 1c-.686.686-2.778 1.954-5.658 1.543C7.291 2.13 4.857 3.4 4 4.086l.617 8.228Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAlignGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 1.5h12M1 4h7M4 8.75h12M7 16h12M7 11.25h7m-2 7.25h7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	swap: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='11'
				width='8'
				height='8'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='11'
				y='1'
				width='8'
				height='8'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				opacity='0.6'
				d='M7.5 3H6a1.5 1.5 0 0 0-1.5 1.5V8m0 0 2-1.5M4.5 8l-2-1.5m9.5 11h1.5A1.5 1.5 0 0 0 15 16v-3.5m0 0L13 14m2-1.5 2 1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	colorAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.207 14.621a1 1 0 1 1 1.873.699 1 1 0 0 1-1.873-.699Zm-2.893-2.114a1 1 0 1 1 1.873.698 1 1 0 0 1-1.873-.698Zm-.816-3.436a1 1 0 1 1 1.873.699 1 1 0 0 1-1.873-.699Zm.745-3.381a1 1 0 1 1 1.873.698 1 1 0 0 1-1.873-.698Zm3.175-1.439a1 1 0 1 1 1.874.699 1 1 0 0 1-1.874-.699Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.792 10.522c-2.693-.758-2.998-2.786-2.775-3.8.536-1.892.452-5.685-4.172-5.722C4.693.975 2.937 2.841 1.638 6.295c-1.855 4.932.473 10.347 5.2 12.094 3.216 1.189 6.382.607 8.662-1.44'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M16.955 1c-3.478 3.2-1.45 6-.483 6 .966 0 2.415-1 1.932-3-.524-2.17-1.771-2.667-1.45-3Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M15 9.965c0 5.434.614 7.813 1.4 8.881a.355.355 0 0 0 .263.153c1.837.09 1.837-6.585 1.837-8.533v0c0-4.004-3.5-5.005-3.5-.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	headingLevel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='10.5'
				y='5.25'
				width='5'
				height='9.5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M5 6v4m0 4v-4m0 0h4m0 0V6m0 4v4M3 8l-2 2 2 2m14-4 2 2-2 2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	headingLevelAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='11'
				y='2.5'
				width='9'
				height='15'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M1 3.5V10m0 6.5V10m0 0h7m0 0V3.5M8 10v6.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	excludeItem: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='9'
				height='9'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M10 5.5h3A1.5 1.5 0 0 1 14.5 7v6a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 13v-3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.5 10h3a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M3.813 5.5h3.374'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	dice: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='3'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='5.5'
				cy='5.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='5.5'
				cy='14.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='14.5'
				cy='5.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='14.5'
				cy='14.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	itemSelect: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.4'
				d='M6 1.5h8v8h-4L9.5 9l-.5.5H6v-8Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M16.5 19.25v-3.902c0-.913-.28-1.37-.922-1.37-.64 0-1.082.457-1.082 1.37m-4.007-.913V9.87c0-.913-.28-1.37-.921-1.37s-1.082.457-1.082 1.37v7.304l-2.1-2.603c-.515-.7-.988-.844-1.479-.374-.491.47-.571 1.142-.056 1.841l.83 1.136c.272.31.415.913.691 2.076m4.117-4.815c0-.913.441-1.37 1.082-1.37.642 0 .922.913.922 1.826m-2.004-.456v1.37m2.004-.914c0-.913.44-1.37 1.082-1.37.641 0 .921.914.921 1.827m-2.003-.457v1.37m2.003-.913v1.826'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M8.5 10H7a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 7 1h6a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 13 10h-2.5M0 1h2a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 2 10H0m20-9h-2a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 18 10h2'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	itemLimit: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='9'
				height='9'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 5.5h3A1.5 1.5 0 0 1 14.5 7v6a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 13v-3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.5 10h3a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
		</svg>
	),
	expandXl: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 1H1m0 0v4m0-4 5 5M5 19H1m0 0v-4m0 4 5-5m9-13h4m0 0v4m0-4-5 5m1 13h4m0 0v-4m0 4-5-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	helpFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M19.5 10a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Zm-8.75 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.996 7.539c.038-.291.29-.821.778-1.178.452-.332 1.127-.528 2.078-.158.374.145.593.354.722.58.133.233.19.522.173.852-.036.673-.38 1.413-.8 1.881-.129.145-.248.276-.36.397l-.03.033c-.1.109-.195.212-.282.31-.19.212-.362.418-.498.637-.295.476-.384.957-.336 1.645a.5.5 0 1 0 .998-.07c-.039-.545.035-.8.188-1.048.088-.143.212-.295.393-.498l.274-.3.029-.032c.112-.122.236-.257.37-.408.55-.615 1.003-1.565 1.053-2.494.025-.472-.054-.962-.303-1.4-.252-.443-.66-.796-1.228-1.017-1.266-.492-2.3-.253-3.032.283-.697.51-1.103 1.28-1.179 1.855a.5.5 0 0 0 .992.13Z'
				fill='currentColor'
			/>
		</svg>
	),
	aspectRatioNineSixteen: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='1'
				width='10'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m13.5 2.5-7 15'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	defer: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.785 2.445c1.013-.588 1.992-.892 2.6-.992a8.727 8.727 0 1 1-5.598 4.033L3.654 4.2m0 0 .98 2.547M3.655 4.2 1 4.526'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M10.271 4.526V9.98h3.273'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	scrollbars: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2.5'
				width='18'
				height='15'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='M3 15.5h12'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 15.5h5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M17 4.5v9'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M17 4.5v4'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	scrollbarH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2.5'
				width='18'
				height='15'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='M3 15.5h14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 15.5h5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	scrollbarV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17 4.5v11'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M17 4.5v4'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='1'
				y='2.5'
				width='18'
				height='15'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeWidth='1.1'
				fill='none'
			/>
		</svg>
	),
	backgroundBlur: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.167 19.5a6.333 6.333 0 1 0 0-12.667v4.834a1.5 1.5 0 0 1-1.5 1.5H6.833a6.333 6.333 0 0 0 6.334 6.333Z'
				fill='currentColor'
			/>
			<rect
				x='0.5'
				y='0.5'
				width='12.6667'
				height='12.6667'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='0.5'
				y='0.5'
				width='12.6667'
				height='12.6667'
				rx='1.5'
				fill='url(#dfe0e5e7-b60c-459a-8b37-5f7be0f85a24)'
			/>
			<defs>
				<radialGradient
					gradientUnits='userSpaceOnUse'
					gradientTransform='rotate(-135 9.31 3.856) scale(17.167)'
					id='dfe0e5e7-b60c-459a-8b37-5f7be0f85a24'
					cx='0'
					cy='0'
					r='1'
				>
					<stop
						stopColor='currentColor'
						stopOpacity='0.8'
					/>
					<stop stopColor='currentColor' />
					<stop
						offset='0.445215'
						stopColor='currentColor'
						stopOpacity='0.12'
					/>
					<stop
						offset='0.578062'
						stopColor='currentColor'
						stopOpacity='0'
					/>
					<stop
						offset='1'
						stopColor='currentColor'
						stopOpacity='0'
					/>
				</radialGradient>
			</defs>
		</svg>
	),
	spacingLeftIn: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M2 1.5a.5.5 0 0 0-.5.5v16a.5.5 0 0 0 .5.5h6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1H2Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	spacingRightIn: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 17.5v-15A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M18 18.5a.5.5 0 0 0 .5-.5V2a.5.5 0 0 0-.5-.5h-6a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h6Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	buttonGhost: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='6'
				width='18'
				height='8'
				rx='2'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<path
				d='M6 10h8'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	dropdownCaretAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m10.53 12.97 4.19-4.19a.75.75 0 0 0-.53-1.28H5.81a.75.75 0 0 0-.53 1.28l4.19 4.19a.75.75 0 0 0 1.06 0Z'
				fill='currentColor'
			/>
		</svg>
	),
	layoutMasonry: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='4.5'
				height='7'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='7.75'
				y='8'
				width='4.5'
				height='8'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.25 20v-.5a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v.5M19 20v-2.5a1.5 1.5 0 0 0-1.5-1.5H16a1.5 1.5 0 0 0-1.5 1.5V20'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='7.75'
				y='1'
				width='4.5'
				height='5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='14.5'
				y='9'
				width='4.5'
				height='5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='14.5'
				y='1'
				width='4.5'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1'
				y='10'
				width='4.5'
				height='5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M5.5 20v-1.5A1.5 1.5 0 0 0 4 17H2.5A1.5 1.5 0 0 0 1 18.5V20'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	playbackOptions: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.726 4.706a2.642 2.642 0 0 0 2.608-3.043c-.02-.138.055-.276.188-.315a8.94 8.94 0 0 1 3.912-.234c.159.026.251.192.215.35a2.642 2.642 0 0 0 2.57 3.242c.759 0 1.442-.322 1.923-.836.11-.118.299-.133.409-.015a9.003 9.003 0 0 1 1.935 3.233c.052.154-.05.313-.206.355A2.646 2.646 0 0 0 16.33 10c0 1.224.827 2.254 1.951 2.557.156.042.258.201.206.355a9.003 9.003 0 0 1-1.935 3.233c-.11.118-.298.103-.409-.015a2.625 2.625 0 0 0-1.923-.836 2.642 2.642 0 0 0-2.57 3.243c.036.157-.056.323-.215.349a8.996 8.996 0 0 1-3.912-.234.28.28 0 0 1-.188-.315 2.642 2.642 0 0 0-2.608-3.043c-.5 0-.967.14-1.365.382-.119.072-.275.056-.362-.053a8.993 8.993 0 0 1-1.485-2.711c-.052-.154.05-.313.206-.355A2.646 2.646 0 0 0 3.67 10a2.647 2.647 0 0 0-1.95-2.557c-.156-.042-.258-.201-.206-.355a8.993 8.993 0 0 1 1.485-2.71c.087-.11.243-.126.362-.054.398.242.865.382 1.365.382Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m8.942 6.848 3.904 2.743a.5.5 0 0 1 0 .819l-3.904 2.743a.5.5 0 0 1-.788-.41V7.258a.5.5 0 0 1 .788-.41Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	autoplayAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6 4.41a7.5 7.5 0 1 1 0 11.18'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m13.45 9.75-3.7 2.96V6.79l.312-.39-.312.39 3.7 2.96Z'
				fill='currentColor'
				stroke='currentColor'
			/>
			<path
				d='m6.133 10.91.906 2.59m-.906-2.59L4.532 6.334A.5.5 0 0 0 4.06 6h-.08a.5.5 0 0 0-.472.335l-1.601 4.574m4.226 0H1.907m0 0L1 13.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	progressbar: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='7'
				width='18'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1.5'
				y='7.5'
				width='9'
				height='5'
				rx='1'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	progressbarIntermittent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='7'
				width='18'
				height='6'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4.25 7.5h3l-2 5h-3l2-5Zm5 0h3l-2 5h-3l2-5Zm5 0h3l-2 5h-3l2-5Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	preload: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.5 10.5A1.5 1.5 0 0 0 6 12h8a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14 1H6a1.5 1.5 0 0 0-1.5 1.5v8Zm3-9v10m-3-8h3m-3 3h3m-3 3h3m5-6h3m-3 3h3m-3 3h3m-3-8v10'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1'
				y='14'
				width='18'
				height='5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1 14.5h14v4H1z'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1 14.5h10v4H1z'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1 14.5h6v4H1z'
			/>
		</svg>
	),
	offsetAuto: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m7.133 5.91.906 2.59m-.906-2.59L5.532 1.334A.5.5 0 0 0 5.06 1h-.08a.5.5 0 0 0-.472.335L2.907 5.909m4.226 0H2.907m0 0L2 8.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m2.75 11 2 2m0 0-2 2m2-2h-4'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m7.25 11 2 2m0 0-2 2m2-2h-4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='11'
				y='6'
				width='8'
				height='13'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	navigationButtons: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				y='5'
				width='9'
				height='10'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='11'
				y='5'
				width='9'
				height='10'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M4 7.75 2 10m0 0 2 2.25M2 10h5m9-2.25L18 10m0 0-2 2.25M18 10h-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	pagination: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='20'
				height='15.5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='9'
				y='17'
				width='2'
				height='2'
				rx='1'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='4'
				y='17'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
				stroke='currentColor'
			/>
			<rect
				x='14'
				y='17'
				width='2'
				height='2'
				rx='1'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	troubleshootAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13 1H7l2.25 6h1.5L13 1Zm6 12V7l-6 2.25v1.5L19 13Zm-6 6H7l2.25-6h1.5L13 19ZM1 13V7l6 2.25v1.5L1 13Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8.8 7 7 2m4.2 5L13 2m0 6.8L18 7m-5 4.2 5 1.8m-9.2 0L7 18m4.2-5 1.8 5M7 8.8 2 7m5 4.2L2 13'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	calendarDownload: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='14.7221'
				cy='14.7222'
				r='5.27778'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.528 1.528H17.36v3.166H1.528z'
			/>
			<path
				d='M8.917 17.889H2.5a1.5 1.5 0 0 1-1.5-1.5V2.5A1.5 1.5 0 0 1 2.5 1h13.889a1.5 1.5 0 0 1 1.5 1.5v5.889'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 5.222h16.889'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 9.444h9.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.222 5.222V17.89'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9.444 5.222V10.5m4.223-5.278v2.64M1 13.667h7.125'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M14.722 11.556v4.222m0 0-2.11-2.111m2.11 2.11 2.111-2.11m-3.694 4.222h3.167'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	calendarAdd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='15.7779'
				cy='15.7778'
				r='4.22222'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.528 1.528H17.36v3.166H1.528z'
			/>
			<path
				d='M10.5 17.889h-8a1.5 1.5 0 0 1-1.5-1.5V2.5A1.5 1.5 0 0 1 2.5 1h13.889a1.5 1.5 0 0 1 1.5 1.5v8'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 5.222h16.889M1 9.444h16.889M5.222 5.222V17.89M9.444 5.222V17.89'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13.667 5.222V10.5M1 13.667h9.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.667 15.778h4.222m-2.111 2.111v-4.222'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	calendarRemove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='15.7779'
				cy='15.7778'
				r='4.22222'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.528 1.528H17.36v3.166H1.528z'
			/>
			<path
				d='M10.5 17.889h-8a1.5 1.5 0 0 1-1.5-1.5V2.5A1.5 1.5 0 0 1 2.5 1h13.889a1.5 1.5 0 0 1 1.5 1.5v8'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 5.222h16.889M1 9.444h16.889M5.222 5.222V17.89M9.444 5.222V17.89'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13.667 5.222V10.5M1 13.667h9.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M13.667 15.778h4.222'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	download: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1v15.5m0 0-5-5m5 5 5-5M5.625 19h8.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	person: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 19c.46-2.397 1.368-4.154 2.724-5.27C6.08 12.614 7.839 12.037 10 12c2.161.037 3.92.614 5.276 1.73C16.632 14.846 17.54 16.603 18 19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='6.5'
				r='5.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	people: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 18.5c.287-1.541.855-2.67 1.702-3.388C3.55 14.395 4.65 14.024 6 14c1.35.024 2.45.395 3.298 1.112.847.718 1.415 1.847 1.702 3.388'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='6'
				cy='10.5'
				r='3.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 13c-.287-1.541-.855-2.67-1.703-3.388C16.45 8.895 15.351 8.524 14 8.5c-1.198.021-2.198.315-3 .882'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='14'
				cy='5'
				r='3.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	peopleGroup: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.5 14.75c.201-1.027.598-1.78 1.192-2.258.593-.479 1.363-.726 2.308-.742.945.016 1.715.263 2.308.742.594.478.99 1.23 1.192 2.258'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='9.25'
				r='2.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13 13c.172-.856.513-1.483 1.021-1.882.51-.399 1.169-.605 1.979-.618.81.013 1.47.22 1.979.618.508.399.849 1.026 1.021 1.882'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='15.9375'
				cy='8.25'
				r='2.25'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 13c.172-.856.513-1.483 1.021-1.882.51-.399 1.169-.605 1.979-.618.81.013 1.47.22 1.979.618.508.399.849 1.026 1.021 1.882'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='3.9375'
				cy='8.25'
				r='2.25'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	position3x3TopLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='0.5'
				y='0.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3TopCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='0.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3TopRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='14.5'
				y='0.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3CenterLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='0.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3CenterCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3CenterRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='14.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3BottomLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='0.5'
				y='14.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3BottomCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='14.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3BottomRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='14.5'
				y='14.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position2x2BottomRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='12.5'
				y='12.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	position2x2BottomLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2.5'
				y='12.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	position2x2TopLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2.5'
				y='2.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	position2x2TopRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='12.5'
				y='2.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	gridListToggle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='15'
				y='15'
				width='4'
				height='4'
				rx='1'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='15'
				y='9'
				width='4'
				height='4'
				rx='1'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='9'
				y='15'
				width='4'
				height='4'
				rx='1'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13 10v2a1 1 0 0 1-1 1h-2m9-12L1 19M11 1H2a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Zm0 4.5H2a1 1 0 0 0-1 1V7a1 1 0 0 0 1 1h6m-2 2H2a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	itemsPerPage: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m14.538 1.433 4.017 3.973A1.5 1.5 0 0 1 19 6.472v.066h-5.1a.5.5 0 0 1-.5-.5V1h.083a1.5 1.5 0 0 1 1.055.433Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M13.4 1h.083a1.5 1.5 0 0 1 1.055.433l4.017 3.973A1.5 1.5 0 0 1 19 6.472v.066M13.4 1H6.5A1.5 1.5 0 0 0 5 2.5v2M13.4 1v5.038a.5.5 0 0 0 .5.5H19m0 0V17.5a1.5 1.5 0 0 1-1.5 1.5h-2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='1'
				y='6'
				width='6.5'
				height='6.5'
				rx='1.25'
				stroke='currentColor'
				fill='none'
			/>
			<path
				opacity='0.8'
				d='M7.5 9.25h2c.69 0 1.25.56 1.25 1.25v4c0 .69-.56 1.25-1.25 1.25h-4c-.69 0-1.25-.56-1.25-1.25v-2'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.563 12.5h1.187c.69 0 1.25.56 1.25 1.25v4c0 .69-.56 1.25-1.25 1.25h-4c-.69 0-1.25-.56-1.25-1.25v-1.188'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
		</svg>
	),
	migration: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14 13H2.5A1.5 1.5 0 0 1 1 11.5v-9A1.5 1.5 0 0 1 2.5 1h9A1.5 1.5 0 0 1 13 2.5V4m1 9-2 2m2-2-2-2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6 7h11.5A1.5 1.5 0 0 1 19 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 7 17.5V16M6 7l2-2M6 7l2 2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	migrationAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 7H6V4L1 8l5 5v-3h8V7l5 4-5 5v-3h-4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	imageLazyLoad: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m4.5 9.8 1.833-1.629a1.302 1.302 0 0 1 1.785.053 1.302 1.302 0 0 0 1.884-.045l1.032-1.135a1.5 1.5 0 0 1 2.215-.005L15.5 9.494M6 1h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 14 12H6a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 6 1Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='7.79995'
				cy='4.3'
				r='1.1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='1'
				y='14'
				width='18'
				height='5'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1 14.5h14v4H1z'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1 14.5h10v4H1z'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1 14.5h6v4H1z'
			/>
		</svg>
	),
	paragraph: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10.422 2.577v8.076H8.6c-2.004 0-4.053-1.074-4.1-4.038-.046-2.964 1.823-4.038 4.1-4.038h1.822Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M10.422 18v-7.347m0-8.076v8.076m0-8.076H8.6c-2.277 0-4.146 1.074-4.1 4.038.047 2.964 2.096 4.038 4.1 4.038h1.822m0-8.076h3.507m0 0V18m0-15.423c.349 0 1.047 0 1.571-.577'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textAbove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.264 9.1.665 1.9m-.665-1.9L4.1 5.773a.408.408 0 0 0-.386-.273v0a.408.408 0 0 0-.385.273L2.165 9.1m3.099 0h-3.1m0 0L1.5 11m8.455-2.895c.625 0 1.737.29 1.737 1.448C11.692 10.71 10.58 11 9.955 11H7.93V8.105m2.026 0H7.93m2.026 0c.483 0 1.448-.29 1.448-1.447C11.403 5.5 9.955 5.5 9.955 5.5H7.93v2.605m10.104-1.158S17.63 5.5 16.008 5.5c-1.621 0-2.316 1.447-2.316 2.75S14.387 11 16.008 11s2.026-1.447 2.026-1.447'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M.5 20v-5.5A1.5 1.5 0 0 1 2 13h16a1.5 1.5 0 0 1 1.5 1.5V20'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	textBelow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5.264 12.6.665 1.9m-.665-1.9L4.1 9.273A.408.408 0 0 0 3.714 9v0a.408.408 0 0 0-.385.273L2.165 12.6m3.099 0h-3.1m0 0L1.5 14.5m8.455-2.895c.625 0 1.737.29 1.737 1.448 0 1.157-1.112 1.447-1.737 1.447H7.93v-2.895m2.026 0H7.93m2.026 0c.483 0 1.448-.29 1.448-1.447C11.403 9 9.955 9 9.955 9H7.93v2.605m10.104-1.158S17.63 9 16.008 9c-1.621 0-2.316 1.447-2.316 2.75s.695 2.75 2.316 2.75 2.026-1.447 2.026-1.447'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M.5 0v5.5A1.5 1.5 0 0 0 2 7h16a1.5 1.5 0 0 0 1.5-1.5V0'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
		</svg>
	),
	leftPanelAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9 3.5A1.5 1.5 0 0 0 7.5 2h-5A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h5A1.5 1.5 0 0 0 9 16.5v-13Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeWidth='1.1'
			/>
			<path
				d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-5A1.5 1.5 0 0 0 11 3.5v13a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-13Z'
				stroke='currentColor'
				strokeWidth='1.1'
				fill='none'
			/>
		</svg>
	),
	rightPanelAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9 3.5A1.5 1.5 0 0 0 7.5 2h-5A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h5A1.5 1.5 0 0 0 9 16.5v-13Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-5A1.5 1.5 0 0 0 11 3.5v13a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-13Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	plusCircleFillAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
				fill='currentColor'
				fillOpacity='0.25'
			/>
			<path
				d='M6 10h4m0 0h4m-4 0V6m0 4v4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	linkAdd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 3.5H5a4 4 0 1 0 0 8h2m6-8h2a4 4 0 0 1 2.5 7.123'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='15.375'
				cy='15'
				r='3.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M15.375 17.121V12.88M17.496 15h-4.242'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M5 7.5h10'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	linkRemove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 3.5H5a4 4 0 1 0 0 8h2m6-8h2a4 4 0 0 1 2.5 7.123'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='15.375'
				cy='15'
				r='3.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.496 15h-4.242'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M5 7.5h10'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	emptyCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeDasharray='3 6'
				fill='none'
			/>
		</svg>
	),
	emptyRect: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeDasharray='3 4'
				fill='none'
			/>
		</svg>
	),
	linkNav: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				y='4.5'
				width='6'
				height='3.5'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M1.5 6.25h3'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='7.5'
				y='4.5'
				width='6'
				height='3.5'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M9 6.25h3'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M15 5.5a1 1 0 0 1 1-1h4V8h-4a1 1 0 0 1-1-1V5.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.5 5.75a.5.5 0 0 0 0 1v-1Zm0 1H20v-1h-3.5v1Z'
				fill='currentColor'
			/>
			<path
				d='M7.875 10.5H6.5a2.75 2.75 0 1 0 0 5.5h1.375M12 10.5h1.375a2.75 2.75 0 1 1 0 5.5H12m-5.5-2.75h6.875'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	rowEmpty: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.75'
				y='2'
				width='4.4'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeDasharray='2 3'
				fill='none'
			/>
			<rect
				x='7.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeDasharray='2 3'
				fill='none'
			/>
			<rect
				x='14.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeDasharray='2 3'
				fill='none'
			/>
		</svg>
	),
	row: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.75'
				y='2'
				width='4.4'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='7.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='14.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	rowAdd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.75'
				y='2'
				width='4.4'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M11.5 18H8.75a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1v10.5m7-1.75V3a1 1 0 0 0-1-1h-2.5a1 1 0 0 0-1 1v8.75'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='16.375'
				cy='16.5'
				r='3.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M16.375 18.621V14.38m2.121 2.12h-4.242'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	twoCardsLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.75'
				y='2'
				width='4.4'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='7.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	twoCardsRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='7.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='14.75'
				y='2'
				width='4.5'
				height='16'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	cardFeatured: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.75'
				y='2'
				width='18.5'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M9.327 5.363a.75.75 0 0 1 1.346 0l1.063 2.154a.75.75 0 0 0 .564.41l2.378.346a.75.75 0 0 1 .416 1.28l-1.72 1.676a.75.75 0 0 0-.216.664l.406 2.368a.75.75 0 0 1-1.088.79l-2.127-1.117a.75.75 0 0 0-.698 0L7.524 15.05a.75.75 0 0 1-1.088-.79l.406-2.368a.75.75 0 0 0-.215-.664l-1.72-1.677a.75.75 0 0 1 .415-1.28l2.377-.345a.75.75 0 0 0 .565-.41l1.063-2.154Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	hardDrive: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 10h18M1 10v4.5A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5V10M1 10l2.13-5.538a1.5 1.5 0 0 1 1.4-.962h11.362a1.5 1.5 0 0 1 1.434 1.059L19 10'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13 13h3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='4.25'
				cy='13'
				r='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	imageOverlay: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M20 3.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 0 16.5v-13A1.5 1.5 0 0 1 1.5 2h17A1.5 1.5 0 0 1 20 3.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				opacity='0.05'
				d='M2 5.5 3.5 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.1'
				d='M2 8.5 6.5 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='M2 11.5 9.5 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='M2 14.5 12.5 4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.5'
				d='M6.5 16 18 4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.4'
				d='M9.5 16 18 7.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='m12.5 16 5.5-5.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='m15.5 16 2.5-2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.4'
				d='m3.5 16 12-12'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	imageOverlayAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19.25 4.25v12a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5h15.5a1.5 1.5 0 0 1 1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.05'
				d='m2.5 5 .5-.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.1'
				d='M2.5 8 6 4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='M2.5 11 9 4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='M2.5 14 12 4.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.5'
				d='m6.5 16 11-11'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.4'
				d='m9.5 16 8-8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='m12.5 16 5-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='m15.5 16 2-2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.4'
				d='m4 15.5 11-11'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	imageOverlayAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19.25 4.25v12a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5h15.5a1.5 1.5 0 0 1 1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.05'
				d='m.75 6.5 4-4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.1'
				d='M.75 9.5 7.25 3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='m.75 12.5 9.5-9.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='M.75 15.5 13.25 3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.5'
				d='m4.75 17.5 14-14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.4'
				d='m7.75 17.5 11-11'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.3'
				d='m10.75 17.5 8-8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='m13.75 17.5 5-5m-2 5 2-2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.4'
				d='M1.75 17.5 16.25 3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	wrapperSimpleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.3'
				d='m1 7 3-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='m1.125 9 5-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.1'
				d='m1.26 11 7-7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.05'
				d='m1.4 13 8.5-8.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M17.5 4h-15A1.5 1.5 0 0 0 1 5.5v9A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 4Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M.5 1.75c0 .414.336.75.75.75h17.5a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75H1.25A.75.75 0 0 0 .5.75v1Zm0 17.5c0 .414.336.75.75.75h17.5a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75H1.25a.75.75 0 0 0-.75.75v1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	wrapperAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.3'
				d='m1 7 3-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.2'
				d='m1.125 9 5-5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.1'
				d='m1.26 11 7-7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				opacity='0.05'
				d='m1.4 13 8.5-8.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='0.75'
				fill='currentColor'
			/>
			<path
				d='m14.5 8 2 2m0 0-2 2m2-2h-4m-7-2-2 2m0 0 2 2m-2-2h4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M17.5 4h-15A1.5 1.5 0 0 0 1 5.5v9A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 4Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M.5 1.75c0 .414.336.75.75.75h17.5a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75H1.25A.75.75 0 0 0 .5.75v1Zm0 17.5c0 .414.336.75.75.75h17.5a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75H1.25a.75.75 0 0 0-.75.75v1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	alignHorizontalVertical: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.5 8A1.5 1.5 0 0 1 8 6.5h4A1.5 1.5 0 0 1 13.5 8v4a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 12V8Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M10 1.5v5m0 0H8A1.5 1.5 0 0 0 6.5 8v2M10 6.5h2A1.5 1.5 0 0 1 13.5 8v2M10 13.5h2a1.5 1.5 0 0 0 1.5-1.5v-2M10 13.5H8A1.5 1.5 0 0 1 6.5 12v-2m3.5 3.5v5m3.5-8.5h5m-12 0H1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				opacity='0.8'
				d='M14 1h3.5A1.5 1.5 0 0 1 19 2.5V6m-5 13h3.5a1.5 1.5 0 0 0 1.5-1.5V14M6 1H2.5A1.5 1.5 0 0 0 1 2.5V6m5 13H2.5A1.5 1.5 0 0 1 1 17.5V14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positioningWidthGuide: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 1v18M7.145 1v3m6.21-3v3M19 1v18M7.145 16v3m6.21-3v3'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='3.5'
				y='4.5'
				width='13'
				height='11'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m7.5 8-2 2m0 0 2 2m-2-2h3.25m3.75-2 2 2m0 0-2 2m2-2h-3.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	matrixAlignControlDotActive: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='3'
				y='3'
				width='14'
				height='14'
				rx='3'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	matrixAlignControlDotInactive: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='7'
				y='7'
				width='6'
				height='6'
				rx='1.5'
				fill='currentColor'
			/>
		</svg>
	),
	position3x3Empty: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	position2x2Empty: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='14'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='14'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='4'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='4'
				y='14'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	autoPause: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6 4.41a7.5 7.5 0 1 1 0 11.18'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m6.133 10.91.906 2.59m-.906-2.59L4.532 6.334A.5.5 0 0 0 4.06 6h-.08a.5.5 0 0 0-.472.335l-1.601 4.574m4.226 0H1.907m0 0L1 13.5m8.5-6.75v6m3-6v6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	autoPauseScroll: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.667 2.655a6.5 6.5 0 0 1 10.157 7.734M6.667 12.345a6.475 6.475 0 0 0 3.681 1.623'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M9.5 4.25v6m3-6v6M6.133 8.41 7.039 11m-.906-2.59L4.532 3.834A.5.5 0 0 0 4.06 3.5h-.08a.5.5 0 0 0-.472.335L1.907 8.409m4.226 0H1.907m0 0L1 11'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M14.8 14.572a.7.7 0 1 1 1.4 0v1.473a.7.7 0 1 1-1.4 0v-1.473Z'
				fill='currentColor'
			/>
			<path
				d='M19 20v-4.5a3.5 3.5 0 1 0-7 0V20'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	zap: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.5 11 14 1l-3.5 7.5h6L5.5 19l4-8h-6Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	zapFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.5 11 14 1l-3.5 7.5h6L5.5 19l4-8h-6Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	anchorPage: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.938 13.017c0 .933-.313 2.985.937 3.732 1.563.933 3.125.933 3.125 2.488m-4.063-6.22.938.933m-.938-.933L9 13.95m9.063-.933c0 .933.312 2.985-.938 3.732-1.563.933-3.125.933-3.125 2.488m4.063-6.22-.938.933m.938-.933.937.933m-5 5.287v-7.792'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<ellipse
				cx='14'
				cy='10.433'
				rx='0.9375'
				ry='0.933015'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M16.75 11.5v-9a1.5 1.5 0 0 0-1.5-1.5h-11a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h7.25'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.75 4h6m-6 2h5m-5 2h3m-3 3h3.5m-3.5 2h2.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	tag: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m17.156 5.449 1.455 5.43a1.5 1.5 0 0 1-1.06 1.838L9.964 14.75a1.5 1.5 0 0 1-1.026-.091l-4.518-2.12a.5.5 0 0 1-.222-.7l2.695-4.732a1.5 1.5 0 0 1 .915-.706l7.51-2.013a1.5 1.5 0 0 1 1.838 1.06Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<path
				d='m14.761 9.001-4.685 1.256m-6.221 1.827c-1.976.718-4.311 3.233-1.68 5.389'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	trashAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				className='es-animated-trash-alt-lid'
				d='m4.147 5.565 11.591-3.106'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				className='es-animated-trash-alt-lid'
				d='M11.745 3.011a2 2 0 1 0-3.864 1.036'
				stroke='currentColor'
				fill='none'
			/>
			<path
				className='es-animated-trash-alt-base'
				d='M6.199 18.157 4.5 7.5h11l-1.699 10.657a1 1 0 0 1-.988.843H7.187a1 1 0 0 1-.988-.843Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				className='es-animated-trash-alt-base'
				d='M8.5 10.25v6m3-6v6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	remove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 10h18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	sliders: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='12.5'
				y='2'
				width='3'
				height='4'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='9.5'
				y='14'
				width='3'
				height='4'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M1 4h11m7 0h-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			a
			<path
				d='M1 10h3m15 0H8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='4.5'
				y='8'
				width='3'
				height='4'
				rx='1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M1 16h8m10 0h-6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textBoxEdit: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M12.5 12h5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-4A1.5 1.5 0 0 1 2.5 12H6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 17.25h.75m.75 0H3.5m0 0v-3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m14.752 3.17 2.232 2.152M14.752 3.17l1.634-1.601a1.088 1.088 0 0 1 1.538 0l.637.637a1.087 1.087 0 0 1 0 1.538l-1.577 1.578M14.752 3.17 9.06 8.55a1.5 1.5 0 0 0-.434.765l-.433 1.952a.5.5 0 0 0 .646.583l2.089-.697a1.5 1.5 0 0 0 .586-.362l5.47-5.47'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	solidCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	solidRect: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	solidCircleFilled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	),
	solidRectFilled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	),
	solidCircleFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	),
	solidRectFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	),
	warningFillTransparent: (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				opacity='0.25'
				d='M8.65836 1.68328L1.08541 16.8292C0.586734 17.8265 1.31198 19 2.42705 19H17.573C18.688 19 19.4133 17.8265 18.9146 16.8292L11.3416 1.68328C10.7889 0.577709 9.21114 0.577712 8.65836 1.68328Z'
				fill='#0D3636'
			/>
			<path
				d='M11 7C11.0306 6.73478 10.952 6.48043 10.7639 6.29289C10.5769 6.10536 10.2958 6 10 6C9.70423 6 9.4231 6.10536 9.23608 6.29289C9.04803 6.48043 8.96944 6.73478 9 7C9.01042 7.09167 9.02083 7.18333 9.03125 7.275C9.21875 8.925 9.40625 10.575 9.59375 12.225C9.60417 12.3167 9.61458 12.4083 9.625 12.5C9.63523 12.5888 9.6837 12.674 9.75386 12.7367C9.82435 12.7995 9.91077 12.8348 10 12.8348C10.0892 12.8348 10.1756 12.7995 10.2461 12.7367C10.3163 12.674 10.3648 12.5888 10.375 12.5C10.3854 12.4083 10.3958 12.3167 10.4062 12.225C10.5937 10.575 10.7812 8.925 10.9687 7.275C10.9792 7.18333 10.9896 7.09167 11 7Z'
				fill='#0D3636'
			/>
			<circle
				cx='10'
				cy='15.5'
				r='1'
				fill='#0D3636'
			/>
		</svg>
	),
	warningCircleFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
				fill='currentColor'
				fillOpacity='0.25'
			/>
			<path
				d='M11 6a.842.842 0 0 0-.236-.707A1.081 1.081 0 0 0 10 5a1.08 1.08 0 0 0-.764.293A.842.842 0 0 0 9 6l.031.275.563 4.95.031.275c.01.089.059.174.129.237a.37.37 0 0 0 .246.098.37.37 0 0 0 .246-.098.384.384 0 0 0 .129-.237l.031-.275.563-4.95L11 6Z'
				fill='currentColor'
			/>
			<circle
				cx='10'
				cy='14.5'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	errorCircleFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
				fill='currentColor'
				fillOpacity='0.25'
			/>
			<path
				d='m6.5 6.5 7 7m0-7-7 7'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	infoCircleFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1a9 9 0 1 1 0 18 9 9 0 0 1 0-18ZM8 9v1h1v4H8v1h4v-1h-1V9H8Zm1-4v2h2V5H9Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M9 5h2v2H9V5Zm2 4v5h1v1H8v-1h1v-4H8V9h3Z'
				fill='currentColor'
			/>
		</svg>
	),
	checkCircleFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
				fill='currentColor'
				fillOpacity='0.25'
			/>
			<path
				d='m6 11 3 3 5-7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	alignHorizontalVerticalAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.5'
				d='M7.5 10H10m2.5 0H10m0 0V7.5m0 2.5v2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M.5 1.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1Zm0 16a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1Zm16-16a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1Zm0 16a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
			/>
			<path
				d='M7 2H4M2 7V4m15.966 3.004v-3m-5-2h3m-3 15.996h3m2-5v3M2 13v3m5 2H4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	exclude: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M6.5 10h7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	excludeItemAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.5 10h-3A1.5 1.5 0 0 1 1 8.5v-6A1.5 1.5 0 0 1 2.5 1h6A1.5 1.5 0 0 1 10 2.5v3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.5 13V7A1.5 1.5 0 0 0 13 5.5H7A1.5 1.5 0 0 0 5.5 7v6A1.5 1.5 0 0 0 7 14.5h6a1.5 1.5 0 0 0 1.5-1.5Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M14.5 10h3a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8.313 10h3.374'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	resetToZero: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.145 10a7.5 7.5 0 0 1 14.73-2M4.662 14.523a7.488 7.488 0 0 0 5.983 2.977 7.53 7.53 0 0 0 1.6-.171'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m5.545 8.5-2.634 3.04M1.295 8l1.616 3.54m0 0L3.145 10'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M14.883 15.904v-3.085a2.058 2.058 0 0 1 4.117 0v4.113a2.058 2.058 0 0 1-4.117 0v-1.028Zm0 0 4.113-2.057'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	genericShapesAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 7.25v-2.5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 1 4.75v6a1.5 1.5 0 0 0 1.5 1.5H5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M14 12.25a4.5 4.5 0 1 1-1.814-3.61'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m14.564 4.525-3.645 6.48a.5.5 0 0 0 .436.745h7.29a.5.5 0 0 0 .436-.745l-3.645-6.48a.5.5 0 0 0-.872 0Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	brain: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 1.417c1.142-.337 3.62-.505 4.402 1.515.978 0 2.739.605 1.956 3.029.978.168 2.543 1.313.978 4.544M10 1.417v17.166m0-17.166C7.653.205 5.761 1.922 5.11 2.93 1.588 4.546 2.012 7.98 2.664 9.494m14.672 1.01c-.489.505-1.858 1.212-3.423 0m3.423 0c.652 1.515 1.076 4.948-2.445 6.564-.652 1.01-2.543 2.726-4.89 1.514m0 0c-1.142.337-3.62.505-4.403-1.515-.978 0-2.739-.605-1.956-3.029-.978-.168-2.543-1.313-.978-4.544m9.782-5.049c0 .842.489 2.525 2.445 2.525m-2.934 9.088c.071-1.01.758-2.929 2.934-2.525M2.664 9.495c.489-.505 1.858-1.212 3.423 0m1.467 6.059c0-.842-.489-2.525-2.445-2.525m2.934-9.088c-.071 1.01-.758 2.929-2.934 2.525'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	gears: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2.897 10.89a1.55 1.55 0 0 0 1.534-1.778c-.012-.081.032-.162.111-.185a5.287 5.287 0 0 1 2.3-.136c.094.015.149.111.128.204a1.55 1.55 0 0 0 2.643 1.407c.065-.069.175-.078.24-.009.503.537.895 1.18 1.138 1.891.031.09-.03.183-.12.208a1.55 1.55 0 0 0 0 2.99c.09.025.151.118.12.208a5.258 5.258 0 0 1-1.138 1.89c-.065.07-.175.06-.24-.008a1.55 1.55 0 0 0-2.643 1.407c.02.092-.034.19-.127.204a5.327 5.327 0 0 1-2.3-.136.164.164 0 0 1-.112-.185 1.55 1.55 0 0 0-2.337-1.556c-.07.042-.162.033-.213-.031a5.249 5.249 0 0 1-.873-1.585c-.031-.09.03-.183.12-.208a1.55 1.55 0 0 0 0-2.99c-.09-.025-.151-.118-.12-.208A5.25 5.25 0 0 1 1.88 10.7a.163.163 0 0 1 .213-.031c.234.141.51.223.803.223Z'
				stroke='currentColor'
				fill='none'
			/>
			<ellipse
				cx='5.9994'
				cy='13.9868'
				rx='1.47059'
				ry='1.46199'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.464 2.422A1.56 1.56 0 0 0 13.297.94a.163.163 0 0 1 .142-.162 5.375 5.375 0 0 1 2.305.265c.09.03.128.135.09.222a1.547 1.547 0 0 0 1.168 2.124 1.57 1.57 0 0 0 1.208-.284c.076-.056.187-.046.24.033.404.615.68 1.314.798 2.054.014.094-.062.175-.157.183a1.554 1.554 0 0 0-1.4 1.27 1.542 1.542 0 0 0 .877 1.667c.087.04.13.143.084.225a5.26 5.26 0 0 1-1.46 1.66c-.076.057-.184.029-.236-.05a1.56 1.56 0 0 0-1.037-.676 1.56 1.56 0 0 0-1.809 1.252c-.02.117-.027.234-.021.348.005.095-.066.18-.162.179a5.41 5.41 0 0 1-2.258-.533.162.162 0 0 1-.077-.2 1.547 1.547 0 0 0-1.21-2.013 1.571 1.571 0 0 0-.836.08.166.166 0 0 1-.206-.067 5.202 5.202 0 0 1-.589-1.709c-.014-.093.062-.174.157-.183a1.554 1.554 0 0 0 1.4-1.27 1.541 1.541 0 0 0-.877-1.667c-.087-.04-.13-.142-.084-.225a5.245 5.245 0 0 1 1.143-1.405.166.166 0 0 1 .217.006c.208.18.466.307.757.358Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M15.458 6.255a1.475 1.475 0 0 1-1.714 1.181 1.464 1.464 0 0 1-1.203-1.69 1.475 1.475 0 0 1 1.714-1.182 1.464 1.464 0 0 1 1.203 1.691Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	gearsFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M5.189 8.712a1.702 1.702 0 0 1-1.976 1.377 1.704 1.704 0 0 1-.827-.395c-.068-.059-.17-.066-.237-.007a5.755 5.755 0 0 0-1.248 1.546c-.05.091-.003.204.092.248a1.7 1.7 0 0 1 .958 1.835 1.7 1.7 0 0 1-1.528 1.396c-.104.01-.187.098-.171.201.105.666.326 1.301.644 1.88.043.079.141.107.225.075.28-.109.594-.144.912-.088a1.702 1.702 0 0 1 1.323 2.215.18.18 0 0 0 .085.22 5.828 5.828 0 0 0 2.467.588c.104.002.181-.093.176-.197a1.702 1.702 0 0 1 1.999-1.76c.483.085.883.366 1.132.745.057.087.176.117.259.055a5.767 5.767 0 0 0 1.593-1.826c.05-.09.003-.203-.091-.247a1.7 1.7 0 0 1-.959-1.835 1.7 1.7 0 0 1 1.529-1.396c.103-.01.186-.099.17-.202a5.768 5.768 0 0 0-.873-2.26c-.057-.087-.178-.099-.262-.037a1.706 1.706 0 0 1-1.318.312 1.702 1.702 0 0 1-1.277-2.337c.04-.096 0-.211-.098-.245a5.87 5.87 0 0 0-2.519-.292.18.18 0 0 0-.155.178 1.68 1.68 0 0 1-.025.253Zm.516 6.895a1.61 1.61 0 0 0 1.872-1.3 1.61 1.61 0 0 0-1.314-1.86 1.61 1.61 0 0 0-1.872 1.299 1.61 1.61 0 0 0 1.314 1.86ZM12.544.88a1.71 1.71 0 0 1-2.59 1.453c-.077-.046-.178-.036-.234.034a5.756 5.756 0 0 0-.961 1.74c-.034.098.032.2.133.227a1.7 1.7 0 0 1 1.263 1.641 1.7 1.7 0 0 1-1.263 1.64c-.1.028-.167.13-.133.228.219.638.546 1.225.96 1.74.057.07.158.08.235.034a1.71 1.71 0 0 1 .883-.245 1.702 1.702 0 0 1 1.688 1.952.18.18 0 0 0 .122.203 5.831 5.831 0 0 0 2.53.15c.104-.017.164-.123.14-.224a1.7 1.7 0 0 1 1.663-2.08c.49 0 .933.205 1.245.536.07.075.193.085.264.009a5.767 5.767 0 0 0 1.252-2.075c.034-.098-.032-.2-.133-.227a1.7 1.7 0 0 1-1.263-1.641 1.7 1.7 0 0 1 1.263-1.64c.1-.028.167-.13.133-.228a5.767 5.767 0 0 0-1.252-2.075c-.071-.076-.193-.066-.264.01-.312.33-.754.536-1.245.536a1.702 1.702 0 0 1-1.663-2.08c.024-.102-.036-.208-.14-.225a5.87 5.87 0 0 0-2.53.15.18.18 0 0 0-.122.203c.012.082.019.167.019.253Zm1.706 6.7a1.61 1.61 0 0 0 1.617-1.605 1.61 1.61 0 0 0-1.617-1.604c-.893 0-1.618.718-1.618 1.604 0 .886.725 1.604 1.618 1.604Z'
				fill='currentColor'
			/>
		</svg>
	),
	ruler: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1.5'
				y='7'
				width='17'
				height='6'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M3.75 12.5v-1m2.5 1v-2m2.5 2v-1m2.5 1v-2m2.5 2v-1m2.5 1v-2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	containerSpacingH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='0.5'
				width='19'
				height='5.5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				width='19'
				height='5.5'
				rx='1.5'
				transform='matrix(1 0 0 -1 .5 20)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='19'
				y='7'
				width='6'
				height='18'
				rx='1.5'
				transform='rotate(90 19 7)'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	dividerStatus: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				fill='none'
			/>
			<path
				d='M1 17V3'
				className='es-stroke-admin-accent'
				strokeOpacity='var(--left-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 19h14'
				className='es-stroke-admin-accent'
				strokeOpacity='var(--bottom-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M19 17V3'
				className='es-stroke-admin-accent'
				strokeOpacity='var(--right-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 1h14'
				className='es-stroke-admin-accent'
				strokeOpacity='var(--top-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	), // Mind the extra variables when updating/replacing icon.
	dividerSide: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				fill='none'
			/>
			<path
				d='M1 17V3'
				stroke='currentColor'
				strokeOpacity='var(--left-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 19h14'
				stroke='currentColor'
				strokeOpacity='var(--bottom-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M19 17V3'
				stroke='currentColor'
				strokeOpacity='var(--right-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 1h14'
				stroke='currentColor'
				strokeOpacity='var(--top-opacity, 0)'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	), // Mind the extra variables when updating/replacing icon.
	wrapperOffAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 4h-15A1.5 1.5 0 0 0 1 5.5v9A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 4Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	autoClose: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6 4.41a7.5 7.5 0 1 1 0 11.18'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M8.75 7.75 11 10m0 0 2.25 2.25M11 10l2.25-2.25M11 10l-2.25 2.25m-2.617-1.34.906 2.59m-.906-2.59L4.532 6.334A.5.5 0 0 0 4.06 6h-.08a.5.5 0 0 0-.472.335l-1.601 4.574m4.226 0H1.907m0 0L1 13.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	a11yWarning: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<g clipPath='url(#8f329e56-3fd2-4668-a4b4-723112f4c8fa)'>
				<path
					clipRule='evenodd'
					fillRule='evenodd'
					d='m10.587 18.355 3.75-7.438a.734.734 0 0 1 1.325 0l3.75 7.438c.263.52-.098 1.145-.662 1.145h-7.5c-.564 0-.925-.625-.663-1.145Zm5.033-.73a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0ZM15.625 14a.625.625 0 1 0-1.25 0v1.75a.625.625 0 1 0 1.25 0V14Z'
					fill='currentColor'
				/>
				<path
					d='M11.074 6.588a2.855 2.855 0 0 0 1.645-1.82c.082-.272.126-.56.124-.859-.006-1.6-1.287-2.902-2.861-2.909C8.408.993 7.137 2.285 7.143 3.885a2.92 2.92 0 0 0 1.812 2.702m2.12 0a2.814 2.814 0 0 1-2.119 0m2.118 0 4.572-1.821c.994-.267 2.018.337 2.288 1.349.27 1.011-.315 2.048-1.308 2.314l-3.763 1.406.008.983.286.682M8.955 6.588 4.34 4.718a1.845 1.845 0 0 0-2.277 1.33A1.914 1.914 0 0 0 3.39 8.374l3.774 1.438.008.982-2.389 5.785a1.914 1.914 0 0 0 1.327 2.325 1.845 1.845 0 0 0 2.277-1.33l1.645-4.094 1.043 2.554'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					fill='none'
				/>
			</g>
			<defs>
				<clipPath id='8f329e56-3fd2-4668-a4b4-723112f4c8fa'>
					<path
						fill='#fff'
						d='M0 0h20v20H0z'
					/>
				</clipPath>
			</defs>
		</svg>
	),
	magic: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.256 1.583c.059-.26.43-.26.488 0l.626 2.78a3 3 0 0 0 2.268 2.267l2.78.626c.26.059.26.43 0 .488l-2.78.626a3 3 0 0 0-2.268 2.268l-.626 2.78c-.059.26-.43.26-.488 0l-.626-2.78A3 3 0 0 0 4.363 8.37l-2.78-.626c-.26-.059-.26-.43 0-.488l2.78-.626A3 3 0 0 0 6.63 4.363l.626-2.78Zm7.594 9.583c.036-.16.264-.16.3 0l.42 1.868c.157.695.7 1.239 1.396 1.395l1.868.42c.16.037.16.265 0 .301l-1.868.42c-.695.157-1.239.7-1.395 1.396l-.42 1.868c-.037.16-.265.16-.301 0l-.42-1.868a1.846 1.846 0 0 0-1.396-1.395l-1.868-.42c-.16-.037-.16-.265 0-.301l1.868-.42a1.846 1.846 0 0 0 1.395-1.396l.42-1.868Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	magicAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.256 3.583c.059-.26.43-.26.488 0l.534 2.371a3 3 0 0 0 2.268 2.268l2.371.534c.26.059.26.43 0 .488l-2.371.534a3 3 0 0 0-2.268 2.268l-.534 2.371c-.059.26-.43.26-.488 0l-.534-2.371a3 3 0 0 0-2.268-2.268l-2.371-.534c-.26-.059-.26-.43 0-.488l2.371-.534a3 3 0 0 0 2.268-2.268l.534-2.371ZM4.85 1.166c.036-.16.264-.16.3 0l.42 1.868c.157.695.7 1.239 1.396 1.395l1.868.42c.16.037.16.265 0 .301l-1.868.42c-.695.157-1.239.7-1.395 1.396l-.42 1.868c-.037.16-.265.16-.301 0l-.42-1.868a1.846 1.846 0 0 0-1.396-1.395l-1.868-.42c-.16-.037-.16-.265 0-.301l1.868-.42a1.846 1.846 0 0 0 1.395-1.396l.42-1.868Zm2 11c.036-.16.264-.16.3 0l.329 1.46c.157.695.7 1.239 1.395 1.395l1.46.329c.16.036.16.264 0 .3l-1.46.329c-.695.157-1.238.7-1.395 1.395l-.329 1.46c-.036.16-.264.16-.3 0l-.329-1.46a1.846 1.846 0 0 0-1.395-1.395l-1.46-.329c-.16-.036-.16-.264 0-.3l1.46-.329a1.846 1.846 0 0 0 1.395-1.395l.329-1.46Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	contentBottomLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='11.5'
				width='9'
				height='5'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	contentBottomRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='8.5'
				y='11.5'
				width='9'
				height='5'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	contentCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='5.5'
				y='7.5'
				width='9'
				height='5'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	contentTopLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='2.5'
				y='3.5'
				width='9'
				height='5'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	contentTopRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='2'
				width='18'
				height='16'
				rx='1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='8.5'
				y='3.5'
				width='9'
				height='5'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	altTextGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 21 20'
			width='21'
			height='20'
			fill='none'
		>
			<path
				d='M5.5 12h-3A1.5 1.5 0 0 1 1 10.5v-8A1.5 1.5 0 0 1 2.5 1h8A1.5 1.5 0 0 1 12 2.5v8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M6.562 10c-1.117 0-2.022.84-2.022 1.875v6.25C4.54 19.16 5.445 20 6.562 20h11.456c1.117 0 2.022-.84 2.022-1.875v-6.25c0-1.036-.905-1.875-2.022-1.875H6.562Zm2.16 2.335a.5.5 0 0 0-.944 0l-1.312 3.75-.438 1.25a.5.5 0 1 0 .944.33l.32-.915h1.916l.32.915a.5.5 0 0 0 .944-.33l-.438-1.25-1.312-3.75Zm-.472 1.678.608 1.737H7.642l.608-1.736ZM12 12a.5.5 0 0 1 .5.5V17h2a.5.5 0 1 1 0 1H12a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5Zm3.25 0a.5.5 0 1 0 0 1h1v4.5a.5.5 0 1 0 1 0V13h1a.5.5 0 0 0 0-1h-3Z'
				fill='currentColor'
			/>
		</svg>
	),
	altTextGenericAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M2.5 4A1.5 1.5 0 0 0 1 5.5v9A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 4h-15Zm3.235 2.841a.5.5 0 0 0-.948 0l-1.508 4.5-.503 1.5a.5.5 0 0 0 .948.318L4.112 12H6.41l.388 1.159a.5.5 0 0 0 .949-.318l-.503-1.5-1.508-4.5ZM5.26 8.574 6.074 11H4.448l.813-2.426ZM9.569 6.5a.5.5 0 0 1 .5.5v5.5h2.373a.5.5 0 1 1 0 1H9.569a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5Zm3.734 0a.5.5 0 0 0 0 1h1.223V13a.5.5 0 1 0 1 0V7.5h1.224a.5.5 0 1 0 0-1h-3.447Z'
				fill='currentColor'
			/>
		</svg>
	),
	arrowsDown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m9.628 18.587-3.377-3.752A.5.5 0 0 1 6.623 14h6.754a.5.5 0 0 1 .372.835l-3.377 3.752a.5.5 0 0 1-.744 0Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9.628 12.087 6.251 8.334a.5.5 0 0 1 .372-.834h6.754a.5.5 0 0 1 .372.834l-3.377 3.753a.5.5 0 0 1-.744 0Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9.628 5.587 6.251 1.834A.5.5 0 0 1 6.623 1h6.754a.5.5 0 0 1 .372.834l-3.377 3.753a.5.5 0 0 1-.744 0Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsUp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.628 1.413 6.251 5.166A.5.5 0 0 0 6.623 6h6.754a.5.5 0 0 0 .372-.834l-3.377-3.753a.5.5 0 0 0-.744 0Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m9.628 7.913-3.377 3.752a.5.5 0 0 0 .372.835h6.754a.5.5 0 0 0 .372-.835l-3.377-3.752a.5.5 0 0 0-.744 0Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m9.628 14.413-3.377 3.753a.5.5 0 0 0 .372.834h6.754a.5.5 0 0 0 .372-.834l-3.377-3.753a.5.5 0 0 0-.744 0Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m1.413 10.372 3.753 3.377A.5.5 0 0 0 6 13.377V6.623a.5.5 0 0 0-.834-.372L1.413 9.628a.5.5 0 0 0 0 .744Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m7.913 10.372 3.752 3.377a.5.5 0 0 0 .835-.372V6.623a.5.5 0 0 0-.835-.372L7.913 9.628a.5.5 0 0 0 0 .744Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m14.413 10.372 3.753 3.377a.5.5 0 0 0 .834-.372V6.623a.5.5 0 0 0-.834-.372l-3.753 3.377a.5.5 0 0 0 0 .744Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowsRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m18.587 10.372-3.752 3.377a.5.5 0 0 1-.835-.372V6.623a.5.5 0 0 1 .835-.372l3.752 3.377a.5.5 0 0 1 0 .744Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m12.087 10.372-3.753 3.377a.5.5 0 0 1-.834-.372V6.623a.5.5 0 0 1 .834-.372l3.753 3.377a.5.5 0 0 1 0 .744Z'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m5.587 10.372-3.753 3.377A.5.5 0 0 1 1 13.377V6.623a.5.5 0 0 1 .834-.372l3.753 3.377a.5.5 0 0 1 0 .744Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='7'
				width='6'
				height='6'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='9'
				y='9'
				width='10'
				height='2'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	positionRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='13'
				y='7'
				width='6'
				height='6'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='1'
				y='9'
				width='10'
				height='2'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	equals: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 6.5h18m-18 7h18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	equalColumns: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M6 7.5A1.5 1.5 0 0 1 7.5 6h5A1.5 1.5 0 0 1 14 7.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 6 12.5v-5Zm1.5 1.25a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5Zm.5 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H8Z'
				fill='currentColor'
			/>
			<path
				d='M10 1v6.5M10 19v-6.5M19 1v18M1 1v18'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	animationFile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m15.854 6.354 2.792 2.792c.227.227.354.534.354.854h-3.5a.5.5 0 0 1-.5-.5V6c.32 0 .627.127.854.354Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M14.5 6h.5m-6 8.5v3a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V10m-4-4v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4v3.5a.5.5 0 0 0 .5.5H19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				width='12'
				height='12'
				rx='1.5'
				transform='matrix(0 1 1 0 1 1)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.5 4h-11M10 1v3M7 1v3M4 1v3m6 6v3m-3-3v3m-3-3v3m8.5-3h-11'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8.25 5.635a1.4 1.4 0 1 0 0 2.53'
				stroke='currentColor'
				strokeOpacity='0.5'
				fill='none'
			/>
			<path
				d='M5.65 8.3a1.4 1.4 0 1 1 0-2.8'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<path
				d='M3.194 5.69a1.4 1.4 0 0 0 0 2.42'
				stroke='currentColor'
				strokeOpacity='0.12'
				fill='none'
			/>
			<circle
				cx='10.1002'
				cy='6.9'
				r='1.4'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	contrast: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 19a9 9 0 1 0 0-18v18Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	),
	contrastAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 19a9 9 0 1 0 0-18v18Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	),
	migrationAltV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13 10V6h3l-4-5-5 5h3v8h3l-4 5-5-5h3v-4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	emailRemove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 12V5.5A1.5 1.5 0 0 0 17.5 4h-15A1.5 1.5 0 0 0 1 5.5v9A1.5 1.5 0 0 0 2.5 16H11'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m1.5 4.5 7.589 5.803a1.5 1.5 0 0 0 1.822 0L18.5 4.5m-17 11 5.687-6.651m5.626 0 2.133 2.494'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='15.75'
				cy='15.75'
				r='3.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M17.75 17.75 14 14m0 3.75L17.75 14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	form: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				fill='none'
			/>
			<rect
				x='3'
				y='3'
				width='10'
				height='3'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='3'
				y='8.5'
				width='10'
				height='3'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='9'
				y='14.5'
				width='8'
				height='2.5'
				rx='1'
				fill='currentColor'
			/>
		</svg>
	),
	formAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				fill='none'
			/>
			<rect
				x='3'
				y='3'
				width='10'
				height='2.5'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='3'
				y='7.5'
				width='10'
				height='2.5'
				rx='1'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='3'
				y='12'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<rect
				x='9.5'
				y='15'
				width='8'
				height='2.5'
				rx='1'
				fill='currentColor'
			/>
			<path
				d='M7 13h4.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	bot: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 3H6.5A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3H10Zm0 0V1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9 8h2'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m17.429 19 .306-3.756A3 3 0 0 0 14.745 12h-9.49a3 3 0 0 0-2.99 3.244L2.57 19'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='8.25'
				cy='5.75'
				r='0.75'
				fill='currentColor'
			/>
			<circle
				cx='11.75'
				cy='5.75'
				r='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	botDeny: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 3H6.5A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3H10Zm0 0V1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m8.5 8 .06-.06a1.5 1.5 0 0 1 1.061-.44h.758a1.5 1.5 0 0 1 1.06.44L11.5 8'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m2.572 19-.307-3.756A3 3 0 0 1 5.255 12h10.739c.82 0 1.508.532 1.753 1.26'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='16'
				cy='17'
				r='3'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='m17.5 18.5-3-3m0 3 3-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='8.25'
				cy='5.75'
				r='0.75'
				fill='currentColor'
			/>
			<circle
				cx='11.75'
				cy='5.75'
				r='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	readOnly: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.8'
				d='m12.863 3.903 3.484 3.484m-3.484-3.484 1.843-1.842a1.5 1.5 0 0 1 2.12 0l1.363 1.362a1.5 1.5 0 0 1 0 2.122l-1.842 1.842m-3.484-3.484L9.77 6.824m6.577.563-3.007 3.007m-6.63-.68-3.964 3.744a1.5 1.5 0 0 0-.435.765l-.87 3.915a.5.5 0 0 0 .647.583L6.14 17.37a1.5 1.5 0 0 0 .586-.362l3.639-3.639'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m1 1 18 18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	conditionH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M8 10H1m7 0 2.007-2.867A5 5 0 0 1 14.103 5H19m0 0-2.5-2.5M19 5l-2.5 2.5M8 10l2.007 2.867A5 5 0 0 0 14.103 15H19m0 0-2.5 2.5M19 15l-2.5-2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	conditionV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 12v7m0-7L7.133 9.993A5 5 0 0 1 5 5.897V1m0 0L2.5 3.5M5 1l2.5 2.5M10 12l2.867-2.007A5 5 0 0 0 15 5.897V1m0 0 2.5 2.5M15 1l-2.5 2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	route: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 4h-7.5A1.5 1.5 0 0 0 10 5.5V16a1.5 1.5 0 0 1-1.5 1.5H4M19 4l-2.5-2.5M19 4l-2.5 2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='2.5'
				cy='17.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	codeVariable: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3.5 1v0a1 1 0 0 0-1 1v5.75a1.5 1.5 0 0 1-.6 1.2L.5 10l1.4 1.05c.378.283.6.728.6 1.2V18a1 1 0 0 0 1 1v0m13-18v0a1 1 0 0 1 1 1v5.75c0 .472.222.917.6 1.2L19.5 10l-1.4 1.05a1.5 1.5 0 0 0-.6 1.2V18a1 1 0 0 1-1 1v0M14 5 6 15M6 5l8 10'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	branch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.5 14.5v-9C5.5 7.667 6.8 12 12 12'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='5.5'
				cy='17.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='5.5'
				cy='2.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='15'
				cy='12.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	branchFork: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.5 14.5v-3m0-6v6m0 0h8A1.5 1.5 0 0 0 15 10v-.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='5.5'
				cy='17.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='5.5'
				cy='2.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='15'
				cy='6.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	calculator: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='3'
				y='1'
				width='14'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='10.5'
				y='9'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='4.5'
				y='2.5'
				width='11'
				height='5.5'
				rx='1'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='4.5'
				y='15'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='15'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='10.5'
				y='15'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='4.5'
				y='12'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='12'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='10.5'
				y='12'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='4.5'
				y='9'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='9'
				width='2'
				height='2'
				rx='1'
				fill='currentColor'
			/>
			<rect
				x='13.5'
				y='9'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='13.5'
				y='12'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='13.5'
				y='15'
				width='2'
				height='2'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M13.25 5.25c-.414 0-.75.252-.75.563v.375c0 .31.336.562.75.562s.75-.252.75-.563v-.375c0-.31-.336-.562-.75-.562Zm0 0c.414 0 .75-.252.75-.563v-.375c0-.31-.336-.562-.75-.562s-.75.252-.75.563v.375c0 .31.336.562.75.562Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	required: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.078 9.365a1.47 1.47 0 1 0-.909-2.795l-4.352 1.415a1 1 0 0 1-1.31-.95V2.25a1.507 1.507 0 0 0-3.015 0v4.784a1 1 0 0 1-1.309.951L2.83 6.57a1.47 1.47 0 0 0-.909 2.795l4.317 1.403a1 1 0 0 1 .491 1.55L3.38 16.799a1.493 1.493 0 0 0 2.391 1.787L9.199 14a1 1 0 0 1 1.602 0l3.428 4.586A1.493 1.493 0 0 0 16.62 16.8l-3.35-4.48a1 1 0 0 1 .492-1.55l4.316-1.404Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	checks: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.5 10.833 5.558 15l.752-.927.69-.85M13.674 5 9.712 9.882 9 10.759'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6.826 10.833 10.884 15 19 5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	checksCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.25 10.792 6.917 13.5l.494-.603M12.25 7l-2.604 3.173m-1.896.619 2.667 2.708L15.75 7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='9'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	lightBulb: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M12.5 15.5h-6l.5 3h5l.5-3Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m6.437 15.5.36 2.238A1.5 1.5 0 0 0 8.277 19h2.445a1.5 1.5 0 0 0 1.481-1.262l.36-2.238m-6.126 0-.295-1.832c-.069-.425-.322-.792-.66-1.059a6.5 6.5 0 1 1 8.037 0c-.339.267-.593.634-.66 1.06l-.296 1.831m-6.126 0h6.126'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8 3c-.75.25-2.4 1.2-3 3'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	lightBulbAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M12.5 15.5h-6l.5 3h5l.5-3Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M10 10a.5.5 0 0 0-1 0h1Zm2.858 3.668.494.08-.494-.08Zm-.655 4.07.494.08-.494-.08ZM5.482 12.61l.309-.392-.31.392ZM3.5 7.5a6 6 0 0 1 6-6v-1a7 7 0 0 0-7 7h1Zm2.291 4.717A5.989 5.989 0 0 1 3.5 7.5h-1a6.988 6.988 0 0 0 2.672 5.502l.619-.785Zm4.931 6.283H8.278v1h2.444v-1Zm-3.431-.841-.36-2.238-.988.159.36 2.238.988-.16ZM16.5 7.5a7 7 0 0 0-7-7v1a6 6 0 0 1 6 6h1Zm-2.672 5.502A6.989 6.989 0 0 0 16.5 7.5h-1a5.988 5.988 0 0 1-2.291 4.717l.619.785Zm-1.131 4.816.36-2.239-.987-.159-.36 2.239.987.159ZM6.93 15.42l-.294-1.831-.988.159.295 1.832.987-.16Zm6.127.16.295-1.832-.988-.159-.294 1.832.987.159Zm-6.62.42h6.126v-1H6.437v1ZM10 15.5V10H9v5.5h1Zm-1.722 3a1 1 0 0 1-.987-.841l-.988.159A2 2 0 0 0 8.278 19.5v-1Zm4.931-6.283c-.414.326-.752.797-.845 1.372l.988.159c.044-.276.214-.54.476-.746l-.619-.785ZM10.722 19.5a2 2 0 0 0 1.975-1.682l-.988-.16a1 1 0 0 1-.987.842v1Zm-5.55-6.498c.262.207.432.47.476.746l.988-.159c-.093-.575-.43-1.046-.845-1.372l-.619.785Z'
				fill='currentColor'
			/>
			<path
				d='M9.5 7.5v-2m3 1.5L11 8.5M6.5 7 8 8.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	textWrite: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M8.001 8.219 9.15 11.5M8.001 8.219 5.942 2.335A.5.5 0 0 0 5.47 2h-.29a.5.5 0 0 0-.472.335l-2.06 5.884m5.353 0H2.65m0 0L1.5 11.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M1 18c.5-1.5 2-2 4.5-.5 2.17 1.302 3.167-.333 4-1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='m17.25 6.75 1.414 1.414-1.414 1.414-1.414-1.414z'
			/>
			<path
				d='m15.7 8.3 1.582 1.583m-6.725 5.142 1.83-.366a.5.5 0 0 0 .255-.137l5.868-5.868a.5.5 0 0 0 0-.707l-.875-.875a.5.5 0 0 0-.707 0L11.06 12.94a.5.5 0 0 0-.137.255l-.366 1.83Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	conditionalVisibility: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='13.0002'
				cy='15.5'
				r='1.66667'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M13 18.833c-3.333 0-5.333-2-6-3.333.667-1.333 2.667-3.333 6-3.333s5.333 2 6 3.333c-.667 1.333-2.667 3.333-6 3.333ZM4 19V1m0 0L1.5 3.5M4 1l2.5 2.5M4 13.5l.574-1.148a5 5 0 0 1 2.89-2.507l2.117-.705A5 5 0 0 0 13 4.396V1m0 0 2.5 2.5M13 1l-2.5 2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chat: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 5a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 14 5v6.333a1.5 1.5 0 0 1-1.5 1.5H7.15a1.5 1.5 0 0 0-1.094.474L4 15.5v-1.667a1 1 0 0 0-1-1h-.5a1.5 1.5 0 0 1-1.5-1.5V5Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15 5.75h2.5a1.5 1.5 0 0 1 1.5 1.5v6.333a1.5 1.5 0 0 1-1.5 1.5H17a1 1 0 0 0-1 1v1.667l-2.056-2.193a1.5 1.5 0 0 0-1.094-.474H9.333A1.333 1.333 0 0 1 8 13.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chatBubble: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 4a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 19 4v9.444a1.5 1.5 0 0 1-1.5 1.5H9.249a1.5 1.5 0 0 0-1.075.454L5.154 18.5v-2.556a1 1 0 0 0-1-1H2.5a1.5 1.5 0 0 1-1.5-1.5V4Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	chatBubbleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 4a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 19 4v9.444a1.5 1.5 0 0 1-1.5 1.5H9.249a1.5 1.5 0 0 0-1.075.454L5.154 18.5v-2.556a1 1 0 0 0-1-1H2.5a1.5 1.5 0 0 1-1.5-1.5V4Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M4 5.5h7M4 8h6m-6 2.5h5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	idCard: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='4'
				width='18'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M4 13c.144-.856.427-1.483.851-1.882.424-.399.974-.605 1.649-.618.675.013 1.225.22 1.649.618.424.399.707 1.026.851 1.882'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='6.5'
				cy='8.75'
				r='1.75'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.5 7.5H16M11.5 10H16m-4.5 2.5H16'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	range: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.5'
				d='M7 8h6v1H7z'
			/>
			<path
				d='M10 12.5V14'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M18 12.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6 12.5V14m8-1.5V14'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2 12.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15 7.5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm-8 0a1 1 0 0 0-2 0v2a1 1 0 1 0 2 0v-2Z'
				fill='currentColor'
				stroke='currentColor'
			/>
			<path
				d='M2 7.5h16a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	textLength: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m12 14 2 2m0 0-2 2m2-2H1m0 0v-2m0 2v2m0-7 .917-2.73M6.373 11l-.916-2.73m-3.54 0L3.687 3l1.77 5.27m-3.54 0h3.54M11.477 7H8.791m2.686 0 .365-.227a1.5 1.5 0 0 0 .71-1.274V4.5a1.5 1.5 0 0 0-1.5-1.5H8.79v4m2.686 0 .365.227a1.5 1.5 0 0 1 .71 1.274V9.5a1.5 1.5 0 0 1-1.5 1.5H8.79V7M19 3h-2.261a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5H19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	googleTagManager: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.99985'
				cy='16.7175'
				r='2.25'
				transform='rotate(-45 10 16.718)'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M8.586 18.485 1.16 11.061a1.5 1.5 0 0 1 0-2.122l7.25-7.248m0 0a2.25 2.25 0 0 1 3.182 0L18.84 8.94a1.5 1.5 0 0 1 0 2.122l-7.071 7.07m-3.36-16.44a2.25 2.25 0 0 0 0 3.182l4.807 4.807a.452.452 0 0 1 0 .64L10 13.536m1.414 1.414-4.596-4.596a.5.5 0 0 1 0-.708L10 6.464'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M7.879 4.343 10 6.464 6.465 10l4.242 4.243-2.475 1.06-.707 2.122-6.717-6.718V9.293l6.717-6.718.354 1.768Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	inputField: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 6.5h-15A1.5 1.5 0 0 0 1 8v4a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 12V8a1.5 1.5 0 0 0-1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.75 8.25h.75m.75 0H3.5m0 0v3.5m0 0h-.75m.75 0h.75'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	requiredAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m10 11 9-3m-9 3L1 8m9 3V1m0 10-6 8m6-8 6 8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	upload: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 19V3.5m0 0-5 5m5-5 5 5M5.625 1h8.75'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	cursorDisabled: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m12 15.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11.397 5.209A5.252 5.252 0 0 0 1 6.25a5.25 5.25 0 0 0 9.157 3.506'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m3.93 4.094 2.32 2.32m0 0 2.32 2.32m-2.32-2.32 2.32-2.32m-2.32 2.32-2.32 2.32'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	fileDownload: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M2.5 9A1.5 1.5 0 0 0 1 10.5v5A1.5 1.5 0 0 0 2.5 17h5A1.5 1.5 0 0 0 9 15.5v-5A1.5 1.5 0 0 0 7.5 9h-5Zm2.146 6.354a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L5.5 13.793V11a.5.5 0 0 0-1 0v2.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2Z'
				fill='currentColor'
			/>
			<path
				d='M13.4 1h.083a1.5 1.5 0 0 1 1.055.433l4.017 3.973A1.5 1.5 0 0 1 19 6.472v.066M13.4 1H6.5A1.5 1.5 0 0 0 5 2.5V9m8.4-8v5.038a.5.5 0 0 0 .5.5H19m0 0V17.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5V17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13.5 6.5v-6l6 6h-6Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	fileUpload: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M2.5 9A1.5 1.5 0 0 0 1 10.5v5A1.5 1.5 0 0 0 2.5 17h5A1.5 1.5 0 0 0 9 15.5v-5A1.5 1.5 0 0 0 7.5 9h-5Zm2.146 1.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L5.5 12.207V15a.5.5 0 0 1-1 0v-2.793l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2Z'
				fill='currentColor'
			/>
			<path
				d='M13.4 1h.083a1.5 1.5 0 0 1 1.055.433l4.017 3.973A1.5 1.5 0 0 1 19 6.472v.066M13.4 1H6.5A1.5 1.5 0 0 0 5 2.5V9m8.4-8v5.038a.5.5 0 0 0 .5.5H19m0 0V17.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5V17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13.5 6.5v-6l6 6h-6Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	columns3366: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='8.1499'
				y='1'
				width='11'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	columns6633: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='11'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='14'
				y='1'
				width='5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	spacingLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 .5A1.5 1.5 0 0 0 .5 2v16A1.5 1.5 0 0 0 2 19.5h7l-1.671-2.09A1.5 1.5 0 0 1 7 16.475V3.12c0-.397.158-.779.44-1.06L9 .5H2Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M7.5 2.5v15A1.5 1.5 0 0 0 9 19h8.5a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1H9a1.5 1.5 0 0 0-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	spacingRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18 .5A1.5 1.5 0 0 1 19.5 2v16a1.5 1.5 0 0 1-1.5 1.5h-7l1.671-2.09a1.5 1.5 0 0 0 .329-.936V3.12a1.5 1.5 0 0 0-.44-1.06L11 .5h7Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M12.5 2.5v15A1.5 1.5 0 0 1 11 19H2.5A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1H11a1.5 1.5 0 0 1 1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	keyboard: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M17.5 16h-15A1.5 1.5 0 0 1 1 14.5v-9A1.5 1.5 0 0 1 2.5 4h15A1.5 1.5 0 0 1 19 5.5v9a1.5 1.5 0 0 1-1.5 1.5Zm-11-2.5h7M3.25 11h.25m2 0h.25m2 0H8m2 0h.25m2 0h.25m2 0h.25m1.75 0h.25M4.25 9h.25m2 0h.25m2 0H9m2 0h.25m2 0h.25m2 0h.25M3.25 7h.25m2 0h.25m2 0H8m2 0h.25m2 0h.25m2 0h.25m1.75 0h.25'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	focus: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.8'
				d='M14.5 1h2A2.5 2.5 0 0 1 19 3.5v2M14.5 19h2a2.5 2.5 0 0 0 2.5-2.5v-2M5.5 1h-2A2.5 2.5 0 0 0 1 3.5v2M5.5 19h-2A2.5 2.5 0 0 1 1 16.5v-2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	cursorMove: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m9 15.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.992-4.609-1.812 1.817c-.154.154-.43.052-.43-.16ZM4.25 7 2.5 9m0 0 2.25 2M2.5 9l4-.25M15.25 5l2.25 2m0 0-1.75 2m1.75-2-4 .25M11 3 8.5 1m0 0L6.75 3M8.5 1 9 5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	mouseCursor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5 14.355.05-13.007c.001-.312.41-.466.645-.242l9.786 9.325c.238.227.052.607-.29.59l-4.012-.196 3.014 6.913c.077.178-.016.381-.208.454l-2.091.782a.387.387 0 0 1-.49-.192L8.391 11.87l-2.74 2.724c-.233.232-.652.078-.651-.239Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	layers: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2.142 5.559 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0L2.142 6.941a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.25 8.25 2.142 9.559a.75.75 0 0 0 0 1.382l7.082 2.982a2 2 0 0 0 1.552 0l7.082-2.982a.75.75 0 0 0 0-1.382L14.75 8.25'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m14.75 12.25 3.108 1.309a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0l-7.082-2.982a.75.75 0 0 1 0-1.382L5.25 12.25'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	layer: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2.142 9.309 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0l-7.082-2.982a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	mapLayerJson: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M0 11.875C0 10.839.905 10 2.022 10H17.98c1.117 0 2.02.84 2.02 1.875v6.25C20 19.16 19.097 20 17.98 20H2.022C.905 20 0 19.16 0 18.125v-6.25Zm4.25-.375a.5.5 0 0 1 .5.5v4.25a1.75 1.75 0 1 1-3.5 0V16a.5.5 0 0 1 1 0v.25a.75.75 0 0 0 1.5 0V12a.5.5 0 0 1 .5-.5Zm7 1.75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0v-3Zm2.5 0a1.75 1.75 0 1 0-3.5 0v3a1.75 1.75 0 1 0 3.5 0v-3Zm1.394-1.739a.5.5 0 0 1 .561.282l1.545 3.399V12a.5.5 0 0 1 1 0v5.5a.5.5 0 0 1-.955.207l-1.545-3.399V17.5a.5.5 0 0 1-1 0V12a.5.5 0 0 1 .394-.489Zm-8.024 1.26a.83.83 0 0 1 1.048.104l.228.229a.5.5 0 0 0 .708-.708l-.23-.228a1.83 1.83 0 0 0-3.124 1.294v.212a1.576 1.576 0 0 0 1.576 1.576h.144a.78.78 0 0 1 .78.78v.258a.83.83 0 0 1-1.418.587l-.228-.229a.5.5 0 0 0-.708.708l.23.228a1.83 1.83 0 0 0 3.124-1.294v-.258a1.78 1.78 0 0 0-1.78-1.78h-.144a.575.575 0 0 1-.576-.576v-.212a.83.83 0 0 1 .37-.69Z'
				fill='currentColor'
			/>
			<path
				d='m2.142 4.559 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0L2.142 5.941a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m4 6.5 2.5-1M6 3l3 1.5-2.5 1M14 3c-3.6 2-2.5 4.167-1.5 5l-6-2.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	mapLayerVector: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='2.25'
				cy='17.5'
				r='1.25'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='17.75'
				cy='17.5'
				r='1.25'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='8.75'
				y='16.25'
				width='2.5'
				height='2.5'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='4.25'
				y='11'
				width='2.5'
				height='2.5'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				width='2.5'
				height='2.5'
				rx='0.5'
				transform='matrix(-1 0 0 1 15.75 11)'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M4 17.5h4.5c-2 0-3-2.5-3-3.5M16 17.5h-4.5c2 0 3-2.5 3-3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m2.142 4.559 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0L2.142 5.941a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m4 6.5 2.5-1M6 3l3 1.5-2.5 1M14 3c-3.6 2-2.5 4.167-1.5 5l-6-2.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	mapLayerRaster: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2.5'
				y='11'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='2.5'
				y='14.75'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M2.5 19a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1h-3v-1Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='6.5'
				y='11'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='6.5'
				y='14.75'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M6.5 19a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1h-3v-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='10.5'
				y='11'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='10.5'
				y='14.75'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M10.5 19a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1h-3v-1Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='14.5'
				y='11'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='14.5'
				y='14.75'
				width='3'
				height='3'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M14.5 19a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1h-3v-1Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='m2.142 4.559 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0L2.142 5.941a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m4 6.5 2.5-1M6 3l3 1.5-2.5 1M14 3c-3.6 2-2.5 4.167-1.5 5l-6-2.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	mapLayer: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2.142 9.309 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0l-7.082-2.982a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m4 11.5 2.5-1M6 8l3 1.5-2.5 1M14 8c-3.6 2-2.5 4.167-1.5 5l-6-2.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	layerOff: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m2.142 9.309 7.082-2.982a2 2 0 0 1 1.552 0l7.082 2.982a.75.75 0 0 1 0 1.382l-7.082 2.982a2 2 0 0 1-1.552 0l-7.082-2.982a.75.75 0 0 1 0-1.382Z'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	key: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2.5 19h2.302a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 1 .5-.5H8l.005-2.001a.5.5 0 0 1 .5-.499h1.705a.5.5 0 0 0 .5-.5v-2.09a5.75 5.75 0 1 0-2.881-3.239l-6.39 6.39A1.5 1.5 0 0 0 1 16.12v1.38A1.5 1.5 0 0 0 2.5 19Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='14.5'
				cy='5.5'
				r='1'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	share: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13 4.5c-6.4.4-8 5.5-8 8 2-2.4 6.167-3.333 8-3.5v4l6-6-6-6v3.5Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.5 3h-6A1.5 1.5 0 0 0 1 4.5v13A1.5 1.5 0 0 0 2.5 19h13a1.5 1.5 0 0 0 1.5-1.5v-4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	solidCircleGradient: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='url(#56988b47-07ba-472f-89f1-98152f1be839)'
			/>
			<defs>
				<radialGradient
					id='56988b47-07ba-472f-89f1-98152f1be839'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='matrix(0 9 -9 0 10 10)'
				>
					<stop stopColor='currentColor' />
					<stop
						offset='1'
						stopColor='currentColor'
						stopOpacity='0'
					/>
				</radialGradient>
			</defs>
		</svg>
	),
	solidRectGradient: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='url(#05f30b81-af16-417f-8c07-956f183df1fd)'
			/>
			<defs>
				<radialGradient
					id='05f30b81-af16-417f-8c07-956f183df1fd'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='matrix(8.49999 8.49999 -9.03124 9.03124 10 10)'
				>
					<stop stopColor='currentColor' />
					<stop
						offset='1'
						stopColor='currentColor'
						stopOpacity='0'
					/>
				</radialGradient>
			</defs>
		</svg>
	),
	shrink: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.83 3.828H16m0 0V1m0 2.828L18.83 1M1 3.828h2.828m0 0V1m0 2.828L1 1m0 15h2.828m0 0v2.828m0-2.828L1 18.828M18.83 16H16m0 0v2.828M16 16l2.83 2.828'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shrinkXl: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 6h4m0 0V2m0 4L1 1m1 13h4m0 0v4m0-4-5 5M18 6h-4m0 0V2m0 4 5-5m-1 13h-4m0 0v4m0-4 5 5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionArrowsInverted: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.75'
				cy='10'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m7.5 4 2.25 2m0 0L12 4M9.75 6V1M7.5 16l2.25-2m0 0L12 16m-2.25-2v5M4 7.75 6 10m0 0-2 2.25M6 10H1m15-2.25L14 10m0 0 2 2.25M14 10h5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionArrowsInvertedH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.75'
				cy='10'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M4 7.75 6 10m0 0-2 2.25M6 10H1m15-2.25L14 10m0 0 2 2.25M14 10h5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	positionArrowsInvertedV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='9.75'
				cy='10'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m7.5 4 2.25 2m0 0L12 4M9.75 6V1M7.5 16l2.25-2m0 0L12 16m-2.25-2v5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shrinkDiagonalLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 3.828h2.828m0 0V1m0 2.828L1 1m17.83 15H16m0 0v2.828M16 16l2.83 2.828'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shrinkDiagonalLeftXl: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 6h4m0 0V2m0 4L1 1m17 13h-4m0 0v4m0-4 5 5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shrinkDiagonalRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18.83 3.828H16m0 0V1m0 2.828L18.83 1M1 16h2.828m0 0v2.828m0-2.828L1 18.828'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shrinkDiagonalRightXl: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M18 6h-4m0 0V2m0 4 5-5M2 14h4m0 0v4m0-4-5 5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fullMaxText: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.17 4.237v4.026c0 1.79.896 2.237 2.238 2.237 1.402 0 2.237-1.342 2.237-2.684m0 0v-3.58m0 3.58V10.5m3.381 0h-.342a1 1 0 0 1-1-1V2m4.026 8.5h-.342a1 1 0 0 1-1-1V2M3.48 10.5V4.347M5.493 2H4.73c-.69 0-1.25.56-1.25 1.25v1.097m0 0H2.25m1.23 0h1.902M14.895 13l3.763 5.5m-3.908 0 3.763-5.5m-6.249 3.6.665 1.9m-.665-1.9L11.1 13.273a.408.408 0 0 0-.386-.273v0a.408.408 0 0 0-.385.273L9.165 16.6m3.099 0h-3.1m0 0L8.5 18.5m-7 0V13h.434l2.027 5.5h.361L6.35 13h.434v5.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	fullMaxShield: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.999 10.983 10.39 6.5l.354.031 1.26 4.627.294.026 2.044-4.338.354.03-.392 4.484m-8.537-.075-.196-2.242m2.4-2.468-2.596.227.196 2.241m0 0 2.477-.216'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2 3.77c2.286 0 6.286-1.385 8-2.77 1.714 1.385 5.714 2.77 8 2.77v4.845C17.238 12.077 14.571 19 10 19S2.762 12.077 2 8.615V3.77Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shieldPlus: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.5 9.913C14.857 12.943 12.607 19 8.75 19S2.643 12.942 2 9.913v-4.24c1.929 0 5.304-1.211 6.75-2.423.349.292.809.584 1.334.859M15.5 1.5v6m3-3h-6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	shieldPlusAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.75 10.25h6.5M10 7v6.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2 3.77c2.286 0 6.286-1.385 8-2.77 1.714 1.385 5.714 2.77 8 2.77v4.845C17.238 12.077 14.571 19 10 19S2.762 12.077 2 8.615V3.77Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	wideTop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 3.5 2-2m0 0 2 2m-2-2V7'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 17.5V11a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 11v6.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 8.5V8a1.5 1.5 0 0 1 1.5-1.5h5m11.5 2V8a1.5 1.5 0 0 0-1.5-1.5h-5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 5.75v-.5a1.5 1.5 0 0 1 1.5-1.5H6m13 2v-.5a1.5 1.5 0 0 0-1.5-1.5H14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 3v-.5A1.5 1.5 0 0 1 2.5 1H7m12 2v-.5A1.5 1.5 0 0 0 17.5 1H13'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	wideBottom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 16.5 2 2m0 0 2-2m-2 2V13'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 2.5V9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 11.5v.5a1.5 1.5 0 0 0 1.5 1.5h5m11.5-2v.5a1.5 1.5 0 0 1-1.5 1.5h-5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 14.25v.5a1.5 1.5 0 0 0 1.5 1.5H6m13-2v.5a1.5 1.5 0 0 1-1.5 1.5H14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 17v.5A1.5 1.5 0 0 0 2.5 19H7m12-2v.5a1.5 1.5 0 0 1-1.5 1.5H13'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	narrowRight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m15 8-2 2m0 0 2 2m-2-2h5.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M2.5 19H9a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 9 1H2.5A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M11.5 1h.5a1.5 1.5 0 0 1 1.5 1.5v4m-2 12.5h.5a1.5 1.5 0 0 0 1.5-1.5v-4'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M14.25 1h.5a1.5 1.5 0 0 1 1.5 1.5V6m-2 13h.5a1.5 1.5 0 0 0 1.5-1.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M17 1h.5A1.5 1.5 0 0 1 19 2.5V8m-2 11h.5a1.5 1.5 0 0 0 1.5-1.5V12'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	narrowLeft: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m5 8 2 2m0 0-2 2m2-2H1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M17.5 19H11a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 11 1h6.5A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M8.5 1H8a1.5 1.5 0 0 0-1.5 1.5v4m2 12.5H8a1.5 1.5 0 0 1-1.5-1.5v-4'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.75 1h-.5a1.5 1.5 0 0 0-1.5 1.5V6m2 13h-.5a1.5 1.5 0 0 1-1.5-1.5V14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M3 1h-.5A1.5 1.5 0 0 0 1 2.5V8m2 11h-.5A1.5 1.5 0 0 1 1 17.5V12'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	narrowTop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 5 2 2m0 0 2-2m-2 2V1.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 17.5V11a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 11v6.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 8.5V8a1.5 1.5 0 0 1 1.5-1.5h4m12.5 2V8a1.5 1.5 0 0 0-1.5-1.5h-4'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 5.75v-.5a1.5 1.5 0 0 1 1.5-1.5H6m13 2v-.5a1.5 1.5 0 0 0-1.5-1.5H14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 3v-.5A1.5 1.5 0 0 1 2.5 1H8m11 2v-.5A1.5 1.5 0 0 0 17.5 1H12'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	narrowBottom: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 15 2-2m0 0 2 2m-2-2v5.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M19 2.5V9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 11.5v.5a1.5 1.5 0 0 0 1.5 1.5h4m12.5-2v.5a1.5 1.5 0 0 1-1.5 1.5h-4'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 14.25v.5a1.5 1.5 0 0 0 1.5 1.5H6m13-2v.5a1.5 1.5 0 0 1-1.5 1.5H14'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 17v.5A1.5 1.5 0 0 0 2.5 19H8m11-2v.5a1.5 1.5 0 0 1-1.5 1.5H12'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	colorFillSwatch: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.5 10.75a1.25 1.25 0 1 1-2.5 0c0-.69 1.25-2.5 1.25-2.5s1.25 1.81 1.25 2.5Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<rect
				x='9.65674'
				y='1.25'
				width='6'
				height='8'
				rx='1.5'
				transform='rotate(45 9.657 1.25)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.5 6.75h-8l4 4 4-4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M5 6.75h7.5M9.5.5v3'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				className='es-has-animated-fill'
				x='2.5'
				y='14'
				width='15'
				height='5'
				rx='1.5'
				fill='var(--selected-color, transparent)'
				stroke='gray'
			/>
			<path
				opacity='var(--selected-opacity, 0)'
				d='m3 18.5 14-4'
				stroke='gray'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	eyedropper: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.093 11.893a1 1 0 0 0 1.414 0l.986-.986a1 1 0 0 0 0-1.414L15 9l2.94-2.94a1.5 1.5 0 0 0 0-2.12l-1.88-1.88a1.5 1.5 0 0 0-2.12 0L11 5l-.493-.493a1 1 0 0 0-1.414 0l-.986.986a1 1 0 0 0 0 1.414l4.986 4.986Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='m8.6 7.4-6.36 6.36a1.5 1.5 0 0 0-.44 1.061v.794a1.5 1.5 0 0 1-.045.364l-.452 1.808a.75.75 0 0 0 .91.91l1.808-.452c.119-.03.241-.045.364-.045h.794a1.5 1.5 0 0 0 1.06-.44L12.6 11.4M11 5l-.493-.493a1 1 0 0 0-1.414 0l-.986.986a1 1 0 0 0 0 1.414l4.986 4.986a1 1 0 0 0 1.414 0l.986-.986a1 1 0 0 0 0-1.414L15 9m-4-4 2.94-2.94a1.5 1.5 0 0 1 2.12 0l1.88 1.88a1.5 1.5 0 0 1 0 2.12L15 9m-4-4 4 4'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m8.6 7.4-6.36 6.36a1.5 1.5 0 0 0-.44 1.061v.794a1.5 1.5 0 0 1-.045.364l-.452 1.808a.75.75 0 0 0 .91.91l1.808-.452c.119-.03.241-.045.364-.045h.794a1.5 1.5 0 0 0 1.06-.44L12.6 11.4M11 5l-.493-.493a1 1 0 0 0-1.414 0l-.986.986a1 1 0 0 0 0 1.414l4.986 4.986a1 1 0 0 0 1.414 0l.986-.986a1 1 0 0 0 0-1.414L15 9m-4-4 2.94-2.94a1.5 1.5 0 0 1 2.12 0l1.88 1.88a1.5 1.5 0 0 1 0 2.12L15 9m-4-4 4 4'
				stroke='currentColor'
				strokeOpacity='0.2'
				fill='none'
			/>
			<path
				d='M9 14.727 4.154 12 2 14l-.5 4.5L6 18l3-3.273Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	positionHStart: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='0.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	positionHCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='16'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	positionHEnd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='2'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='14.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	positionVStart: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='0.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	positionVCenter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				opacity='0.8'
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				x='7.5'
				y='7.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	positionVEnd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='7.5'
				y='14.5'
				width='5'
				height='5'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='9'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
			<rect
				opacity='0.8'
				x='9'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
			/>
		</svg>
	),
	booleanUnion: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.5 1h-9A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13H7V8.5A1.5 1.5 0 0 1 8.5 7H13V2.5A1.5 1.5 0 0 0 11.5 1Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
			<path
				d='M19 17.5v-9A1.5 1.5 0 0 0 17.5 7H13v4.5a1.5 1.5 0 0 1-1.5 1.5H7v4.5A1.5 1.5 0 0 0 8.5 19h9a1.5 1.5 0 0 0 1.5-1.5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
			<path
				d='M7 8.5A1.5 1.5 0 0 1 8.5 7H13v4.5a1.5 1.5 0 0 1-1.5 1.5H7V8.5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
		</svg>
	),
	booleanSubtract: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='12'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.5 13a1.5 1.5 0 0 0 1.5-1.5V7h4.5A1.5 1.5 0 0 1 19 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 7 17.5V13h4.5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
		</svg>
	),
	booleanIntersect: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 13H2.5A1.5 1.5 0 0 1 1 11.5v-9A1.5 1.5 0 0 1 2.5 1h9A1.5 1.5 0 0 1 13 2.5V7'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7 13v4.5A1.5 1.5 0 0 0 8.5 19h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 7H13'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7 8.5A1.5 1.5 0 0 1 8.5 7H13v4.5a1.5 1.5 0 0 1-1.5 1.5H7V8.5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
		</svg>
	),
	booleanExclude: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.5 1h-9A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13H7V8.5A1.5 1.5 0 0 1 8.5 7H13V2.5A1.5 1.5 0 0 0 11.5 1Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
			<path
				d='M19 17.5v-9A1.5 1.5 0 0 0 17.5 7H13v4.5a1.5 1.5 0 0 1-1.5 1.5H7v4.5A1.5 1.5 0 0 0 8.5 19h9a1.5 1.5 0 0 0 1.5-1.5Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
			/>
		</svg>
	),
	vennDiagram: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 7 2-2 2 2 1 3-1 3-2 2-2-2-1-3 1-3Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3.5 15-2-2.5-.5-3 1-3 2.5-2L8 4l2 1 2 2 1 3-1 3-2 2-3 1-3.5-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt3: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m16.5 15 2-2.5.5-3-1-3-2.5-2L12 4l-2 1-2 2-1 3 1 3 2 2 3 1 3.5-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt4: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m3.5 15-2-2.5-.5-3 1-3 2.5-2L8 4l2 1-2 1.5L7 10l1 3.5 2 1.5-3 1-3.5-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt5: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m16.5 15 2-2.5.5-3-1-3-2.5-2L12 4l-2 1 2 1.5 1 3.5-1 3.5-2 1.5 3 1 3.5-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt6: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m16.5 15 2-2.5.5-3-1-3-2.5-2L12 4l-2 1 2 1.5 1 3.5-1 3.5-2 1.5 3 1 3.5-1Zm-13 0-2-2.5-.5-3 1-3 2.5-2L8 4l2 1-2 1.5L7 10l1 3.5 2 1.5-3 1-3.5-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	vennDiagramAlt7: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m8 7 2-2 2 2 1 3-1 3-2 2-2-2-1-3 1-3Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='m16.5 15 2-2.5.5-3-1-3-2.5-2L12 4l-2 1 2 1.5 1 3.5-1 3.5-2 1.5 3 1 3.5-1Zm-13 0-2-2.5-.5-3 1-3 2.5-2L8 4l2 1-2 1.5L7 10l1 3.5 2 1.5-3 1-3.5-1Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13'
				cy='10'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	border: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.5 2.5h11m2 2v11m-2 2h-11m-2-2v-11'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1'
				y='1'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='16'
				y='1'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='1'
				y='16'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='16'
				y='16'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	borderColor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.5 2.5h11m2 2v5m-9.5 8H4.5m-2-2v-11'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='1'
				y='1'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='16'
				y='1'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<rect
				x='1'
				y='16'
				width='3'
				height='3'
				rx='1'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<path
				d='M19.5 18.25a1.25 1.25 0 1 1-2.5 0c0-.69 1.25-2.5 1.25-2.5s1.25 1.81 1.25 2.5Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<rect
				x='13.6567'
				y='8.75'
				width='6'
				height='8'
				rx='1.5'
				transform='rotate(45 13.657 8.75)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M16.5 14.25h-8l4 4 4-4Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M9 14.25h7.5M13.5 8v3'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	shadow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='7.5'
				cy='9'
				r='6'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19.5 15.5c0 1.105-2.686 2-6 2s-6-.895-6-2c0-.173.066-.34.189-.5l3.811-1.386a17.178 17.178 0 0 1 2-.114c3.314 0 6 .895 6 2Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<g filter='url(#8723bad0-2f2d-4f04-ad6a-8ee6ebd6f29a)'>
				<circle
					cx='6.5'
					cy='8'
					r='2'
					fill='currentColor'
					fillOpacity='0.12'
				/>
			</g>
			<defs>
				<filter
					id='8723bad0-2f2d-4f04-ad6a-8ee6ebd6f29a'
					x='1.5'
					y='3'
					width='10'
					height='10'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
					/>
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feGaussianBlur
						stdDeviation='1.5'
						result='effect1_foregroundBlur_1361_313'
					/>
				</filter>
			</defs>
		</svg>
	),
	itemWrap: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16.5 5h1a1 1 0 0 1 1 1v3m0 0-1-1m1 1 1-1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='1'
				y='1'
				width='6'
				height='8'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='9'
				y='1'
				width='6'
				height='8'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='1'
				y='11'
				width='6'
				height='8'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='9'
				y='11'
				width='6'
				height='8'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	fillColor: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19.333 17.333a1.667 1.667 0 1 1-3.333 0c0-.92 1.667-3.333 1.667-3.333s1.666 2.413 1.666 3.333Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<path
				d='M10.606 1v4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='10.6064'
				y='2.41421'
				width='10.5'
				height='14'
				rx='1.5'
				transform='rotate(45 10.606 2.414)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1.6 12.04h14.23'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1.087 12.076H15.72l-7.006 7.006-1.2.037-6.188-6.187-.238-.856Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
		</svg>
	),
	cookie: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10.5'
				cy='5.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='5.5'
				cy='11.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='12.5'
				cy='13.5'
				r='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='5.75'
				cy='6.75'
				r='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='7.75'
				cy='15.75'
				r='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='14.75'
				cy='7.75'
				r='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='9.75'
				cy='10.25'
				r='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='15.75'
				cy='10.75'
				r='0.75'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='M8.09 1.29a5 5 0 0 1 3.82 0l1.095.452 1.13.358a5 5 0 0 1 2.927 2.455l.548 1.051.636 1a5 5 0 0 1 .664 3.763l-.256 1.157-.155 1.175a5 5 0 0 1-1.91 3.308l-.94.723-.875.8a5 5 0 0 1-3.59 1.306L10 18.788l-1.184.05a5 5 0 0 1-3.59-1.306l-.875-.8-.94-.723a5 5 0 0 1-1.91-3.308l-.155-1.175-.256-1.157a5 5 0 0 1 .664-3.763l.636-1 .548-1.05A5 5 0 0 1 5.864 2.1l1.13-.358L8.09 1.29Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	cookieAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='5.5'
				cy='9.50001'
				r='1.5'
				transform='rotate(-90 5.5 9.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='11.5'
				cy='14.5'
				r='1.5'
				transform='rotate(-90 11.5 14.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='14.5'
				cy='10.5'
				r='1.5'
				transform='rotate(-90 14.5 10.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='6.75'
				cy='14.25'
				r='0.75'
				transform='rotate(-90 6.75 14.25)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='15.75'
				cy='13.25'
				r='0.75'
				transform='rotate(-90 15.75 13.25)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='6.75'
				cy='5.25001'
				r='0.75'
				transform='rotate(-90 6.75 5.25)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='10.25'
				cy='10.25'
				r='0.75'
				transform='rotate(-90 10.25 10.25)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='9.75'
				cy='6.75'
				r='0.75'
				transform='rotate(-90 9.75 6.75)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='13.5'
				cy='2.5'
				r='0.5'
				transform='rotate(-90 13.5 2.5)'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<circle
				cx='15.5'
				cy='4.5'
				r='0.5'
				transform='rotate(-90 15.5 4.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='17.5'
				cy='2'
				r='0.5'
				transform='rotate(-90 17.5 2)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<circle
				cx='15.5'
				cy='1.5'
				r='0.5'
				transform='rotate(-90 15.5 1.5)'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<circle
				cx='18.5'
				cy='4'
				r='0.5'
				transform='rotate(-90 18.5 4)'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M1.29 11.91a5 5 0 0 1 0-3.82l.452-1.095.358-1.13a5 5 0 0 1 2.455-2.927l1.051-.548 1.818-1.156a2.656 2.656 0 0 1 4.08 2.267v.137c-.003.24.026.48.084.713l.02.085a3.506 3.506 0 0 0 1.834 2.285l.803.401a2.5 2.5 0 0 0 1.584.22 2.497 2.497 0 0 1 2.963 2.56l-.005.098.051 1.184a5 5 0 0 1-1.306 3.59l-.8.875-.723.94a5 5 0 0 1-3.308 1.91l-1.175.155-1.157.256a5 5 0 0 1-3.763-.664l-1-.636-1.05-.548A5 5 0 0 1 2.1 14.136l-.358-1.13-.452-1.096Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	autoplayAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m12.325 10-3.7 2.96V7.04l.312-.39-.312.39 3.7 2.96Z'
				fill='currentColor'
				stroke='currentColor'
			/>
			<path
				d='M5.5 2.204a9 9 0 1 1-.082 15.544M1.803 6.279a9.02 9.02 0 0 1 1.862-2.672M1.162 8.294a9.047 9.047 0 0 0-.025 3.28m2.495 4.786a9.022 9.022 0 0 1-1.767-2.505'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	limitWidth: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 10.5v6A1.5 1.5 0 0 0 6.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-6m0-1v-6A1.5 1.5 0 0 0 13.5 2h-7A1.5 1.5 0 0 0 5 3.5v6'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m3 8 2 2m0 0-2 2m2-2H1m16-2-2 2m0 0 2 2m-2-2h4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	thumbsUp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.25 10.75h4V19h-4z'
			/>
			<path
				d='m5.5 10.5 2.164-2.524a5 5 0 0 0 1.098-2.234L9.7 1.239a.25.25 0 0 1 .29-.195l1.278.232A1.5 1.5 0 0 1 12.5 2.752V7.25c0 .414.336.75.75.75H17a2 2 0 0 1 2 2v4.264a5 5 0 0 1-5 5H5.5m0-8.764v8.764m0-8.764h-3A1.5 1.5 0 0 0 1 12v5.764a1.5 1.5 0 0 0 1.5 1.5h3'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	thumbsDown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				fill='currentColor'
				fillOpacity='0.12'
				d='M1.25 9.25h4V1h-4z'
			/>
			<path
				d='m5.5 9.5 2.164 2.524a5 5 0 0 1 1.098 2.234l.938 4.503a.25.25 0 0 0 .29.195l1.278-.232a1.5 1.5 0 0 0 1.232-1.476V12.75a.75.75 0 0 1 .75-.75H17a2 2 0 0 0 2-2V5.736a5 5 0 0 0-5-5H5.5m0 8.764V.736m0 8.764h-3A1.5 1.5 0 0 1 1 8V2.236a1.5 1.5 0 0 1 1.5-1.5h3'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	heart: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.935 2.5A4.94 4.94 0 0 0 1 7.445c0 1.363.55 2.597 1.44 3.491L10 18.5l7.56-7.564A4.935 4.935 0 0 0 19 7.446 4.94 4.94 0 0 0 14.065 2.5C12.379 2.5 10.89 3.535 10 4.827 9.11 3.535 7.621 2.5 5.935 2.5Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	heartFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.935 2.5A4.94 4.94 0 0 0 1 7.445c0 1.363.55 2.597 1.44 3.491L10 18.5l7.56-7.564A4.935 4.935 0 0 0 19 7.446 4.94 4.94 0 0 0 14.065 2.5C12.379 2.5 10.89 3.535 10 4.827 9.11 3.535 7.621 2.5 5.935 2.5Z'
				fill='currentColor'
				stroke='currentColor'
			/>
		</svg>
	),
	heartFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.935 2.5A4.94 4.94 0 0 0 1 7.445c0 1.363.55 2.597 1.44 3.491L10 18.5l7.56-7.564A4.935 4.935 0 0 0 19 7.446 4.94 4.94 0 0 0 14.065 2.5C12.379 2.5 10.89 3.535 10 4.827 9.11 3.535 7.621 2.5 5.935 2.5Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
		</svg>
	),
	num0CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10 6.155c-1.828 0-2.844 1.63-2.844 3.643v.404c0 2.012 1.016 3.643 2.844 3.643 1.932 0 2.844-1.63 2.844-3.643v-.404c0-2.012-.912-3.643-2.844-3.643Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num1CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10.203 13.845V7.37m0 6.476h1.625m-1.625 0H8.172m.812-6.476c.975 0 1.22-.81 1.22-1.214V7.37m-1.22 0h-.609m.61 0h1.218'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num2CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.495 13.845H7.498c.02-.838.428-2.11 3.013-3.375 2.355-1.153 1.932-2.673 1.782-3.095-.584-1.642-4.038-1.866-4.755.824'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num3CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M7.647 7.594c.136-.521.518-1.442 2.35-1.44 1.625.003 2.107.777 2.234 1.563.115.714-.302 2.006-2.929 2.028 1.745.027 2.885.617 3.165 1.59.296 1.025-.338 2.448-2.287 2.507-2.075.063-2.588-.906-2.723-1.426'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num4CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M11.625 13.845v-2.024m0 0V6.155h-.406l-4.063 5.262v.405h4.469Zm0 0h1.219'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num5CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.102 6.155H8.04l-.402 4.008c.468-.706 1.495-1.175 2.433-1.175 1.561-.051 2.438 1.133 2.438 2.53 0 1.397-.867 2.299-2.641 2.327-1.248.02-2.118-.415-2.306-1.492'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num6CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.393 7.382c-.204-.707-1.113-1.433-2.594-1.173-1.15.283-1.72 1.086-2.037 2.087-.321 1.013-.3 2.096-.257 3.157v0m0 0C7.5 10.357 8.679 9.069 10.08 9.069c1.403 0 2.442 1.021 2.442 2.343 0 1.32-1.077 2.433-2.48 2.433-1.2 0-2.206-.785-2.47-1.84a2.267 2.267 0 0 1-.068-.552Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num7CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M7.46 6.155h5.08v.405c-1.084.81-3.15 3.4-3.15 7.285'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num8CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M7.766 7.93c0-.98.818-1.775 1.828-1.775h.812c1.01 0 1.828.794 1.828 1.775 0 .98-.818 1.774-1.828 1.774h-.812c-1.01 0-1.828-.794-1.828-1.774Zm-.406 3.845c0-1.144.954-2.07 2.132-2.07h1.016c1.178 0 2.133.926 2.133 2.07 0 1.143-.955 2.07-2.133 2.07H9.492c-1.178 0-2.133-.927-2.133-2.07Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num9CircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.443 8.515c.06 1.327-1.262 2.43-2.604 2.384-1.393-.077-2.308-.922-2.357-2.272-.037-1.21.933-2.424 2.335-2.47 1.401-.048 2.577 1.008 2.626 2.358Zm0 0c.02 1.256.205 4.43-1.727 5.128-1.639.592-2.785-.233-3.002-.971'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num0Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 6.155c-1.828 0-2.844 1.63-2.844 3.643v.404c0 2.012 1.016 3.643 2.844 3.643 1.932 0 2.844-1.63 2.844-3.643v-.404c0-2.012-.912-3.643-2.844-3.643Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num1Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10.203 13.845V7.37m0 6.476h1.625m-1.625 0H8.172m.812-6.476c.975 0 1.22-.81 1.22-1.214V7.37m-1.22 0h-.609m.61 0h1.218'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num2Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.495 13.845H7.498c.02-.838.428-2.11 3.013-3.375 2.355-1.153 1.932-2.673 1.782-3.095-.584-1.642-4.038-1.866-4.755.824'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num3Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.647 7.594c.136-.521.518-1.442 2.35-1.44 1.625.003 2.107.777 2.234 1.563.115.714-.302 2.006-2.929 2.028 1.745.027 2.885.617 3.165 1.59.296 1.025-.338 2.448-2.287 2.507-2.075.063-2.588-.906-2.723-1.426'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num4Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M11.625 13.845v-2.024m0 0V6.155h-.406l-4.063 5.262v.405h4.469Zm0 0h1.219'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num5Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.102 6.155H8.04l-.402 4.008c.468-.706 1.495-1.175 2.433-1.175 1.561-.051 2.438 1.133 2.438 2.53 0 1.397-.867 2.299-2.641 2.327-1.248.02-2.118-.415-2.306-1.492'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num6Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.393 7.382c-.204-.707-1.113-1.433-2.594-1.173-1.15.283-1.72 1.086-2.037 2.087-.321 1.013-.3 2.096-.257 3.157v0m0 0C7.5 10.357 8.679 9.069 10.08 9.069c1.403 0 2.442 1.021 2.442 2.343 0 1.32-1.077 2.433-2.48 2.433-1.2 0-2.206-.785-2.47-1.84a2.267 2.267 0 0 1-.068-.552Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num7Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.46 6.155h5.08v.405c-1.084.81-3.15 3.4-3.15 7.285'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num8Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.766 7.93c0-.98.818-1.775 1.828-1.775h.812c1.01 0 1.828.794 1.828 1.775 0 .98-.818 1.774-1.828 1.774h-.812c-1.01 0-1.828-.794-1.828-1.774Zm-.406 3.845c0-1.144.954-2.07 2.132-2.07h1.016c1.178 0 2.133.926 2.133 2.07 0 1.143-.955 2.07-2.133 2.07H9.492c-1.178 0-2.133-.927-2.133-2.07Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num9Square: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.443 8.515c.06 1.327-1.262 2.43-2.604 2.384-1.393-.077-2.308-.922-2.357-2.272-.037-1.21.933-2.424 2.335-2.47 1.401-.048 2.577 1.008 2.626 2.358Zm0 0c.02 1.256.205 4.43-1.727 5.128-1.639.592-2.785-.233-3.002-.971'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num0SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10 6.155c-1.828 0-2.844 1.63-2.844 3.643v.404c0 2.012 1.016 3.643 2.844 3.643 1.932 0 2.844-1.63 2.844-3.643v-.404c0-2.012-.912-3.643-2.844-3.643Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num1SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10.203 13.845V7.37m0 6.476h1.625m-1.625 0H8.172m.812-6.476c.975 0 1.22-.81 1.22-1.214V7.37m-1.22 0h-.609m.61 0h1.218'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num2SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.495 13.845H7.498c.02-.838.428-2.11 3.013-3.375 2.355-1.153 1.932-2.673 1.782-3.095-.584-1.642-4.038-1.866-4.755.824'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num3SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M7.647 7.594c.136-.521.518-1.442 2.35-1.44 1.625.003 2.107.777 2.234 1.563.115.714-.302 2.006-2.929 2.028 1.745.027 2.885.617 3.165 1.59.296 1.025-.338 2.448-2.287 2.507-2.075.063-2.588-.906-2.723-1.426'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num4SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M11.625 13.845v-2.024m0 0V6.155h-.406l-4.063 5.262v.405h4.469Zm0 0h1.219'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num5SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.102 6.155H8.04l-.402 4.008c.468-.706 1.495-1.175 2.433-1.175 1.561-.051 2.438 1.133 2.438 2.53 0 1.397-.867 2.299-2.641 2.327-1.248.02-2.118-.415-2.306-1.492'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num6SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.393 7.382c-.204-.707-1.113-1.433-2.594-1.173-1.15.283-1.72 1.086-2.037 2.087-.321 1.013-.3 2.096-.257 3.157v0m0 0C7.5 10.357 8.679 9.069 10.08 9.069c1.403 0 2.442 1.021 2.442 2.343 0 1.32-1.077 2.433-2.48 2.433-1.2 0-2.206-.785-2.47-1.84a2.267 2.267 0 0 1-.068-.552Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num7SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M7.46 6.155h5.08v.405c-1.084.81-3.15 3.4-3.15 7.285'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	num8SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M7.766 7.93c0-.98.818-1.775 1.828-1.775h.812c1.01 0 1.828.794 1.828 1.775 0 .98-.818 1.774-1.828 1.774h-.812c-1.01 0-1.828-.794-1.828-1.774Zm-.406 3.845c0-1.144.954-2.07 2.132-2.07h1.016c1.178 0 2.133.926 2.133 2.07 0 1.143-.955 2.07-2.133 2.07H9.492c-1.178 0-2.133-.927-2.133-2.07Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	num9SquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M12.443 8.515c.06 1.327-1.262 2.43-2.604 2.384-1.393-.077-2.308-.922-2.357-2.272-.037-1.21.933-2.424 2.335-2.47 1.401-.048 2.577 1.008 2.626 2.358Zm0 0c.02 1.256.205 4.43-1.727 5.128-1.639.592-2.785-.233-3.002-.971'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	award: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.479 1.504a.75.75 0 0 1 1.043 0l1.192 1.154a.75.75 0 0 0 .627.204l1.643-.233a.75.75 0 0 1 .844.614l.286 1.634a.75.75 0 0 0 .388.533l1.466.778c.357.19.5.628.322.992l-.729 1.49a.75.75 0 0 0 0 .66l.729 1.49a.75.75 0 0 1-.322.992l-1.466.778a.75.75 0 0 0-.388.533l-.286 1.635a.75.75 0 0 1-.844.613l-1.643-.233a.75.75 0 0 0-.627.204l-1.193 1.153a.75.75 0 0 1-1.042 0l-1.193-1.153a.75.75 0 0 0-.627-.204l-1.643.232a.75.75 0 0 1-.844-.612l-.286-1.635a.75.75 0 0 0-.388-.533l-1.466-.778a.75.75 0 0 1-.322-.992l.729-1.49a.75.75 0 0 0 0-.66L2.71 7.18a.75.75 0 0 1 .322-.992l1.466-.778a.75.75 0 0 0 .388-.533l.286-1.634a.75.75 0 0 1 .844-.614l1.643.233a.75.75 0 0 0 .627-.204l1.193-1.154Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='9'
				r='4.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<path
				d='m8.25 15.75-3.5 3.5-.5-2.5-3-1 3.087-3.087m7.413 3.087 3.5 3.5.5-2.5 3-1-3.087-3.087'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m1.5 16 3-3.5 1 3h3L5 19l-.5-2-3-1Zm17.25 0-3-3.5-1 3h-3l3.5 3.5.5-2 3-1Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
		</svg>
	),
	arrowDownCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 5.5v9m0 0-3.5-3.704M10 14.5l3.5-3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowLeftCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.5 10h-9m0 0 3.704-3.5M5.5 10l3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowRightCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M5.5 10h9m0 0-3.704-3.5M14.5 10l-3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowUpCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 14.5v-9m0 0L6.5 9.204M10 5.5l3.5 3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowDownCircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10 5.5v9m0 0-3.5-3.704M10 14.5l3.5-3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowLeftCircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M14.5 10h-9m0 0 3.704-3.5M5.5 10l3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowRightCircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M5.5 10h9m0 0-3.704-3.5M14.5 10l-3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowUpCircleAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='9'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10 14.5v-9m0 0L6.5 9.204M10 5.5l3.5 3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowDownSquare: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 5.5v9m0 0-3.5-3.704M10 14.5l3.5-3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowLeftSquare: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M14.5 10h-9m0 0 3.704-3.5M5.5 10l3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowRightSquare: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M5.5 10h9m0 0-3.704-3.5M14.5 10l-3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowUpSquare: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 14.5v-9m0 0L6.5 9.204M10 5.5l3.5 3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowDownSquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10 5.5v9m0 0-3.5-3.704M10 14.5l3.5-3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowLeftSquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M14.5 10h-9m0 0 3.704-3.5M5.5 10l3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowRightSquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M5.5 10h9m0 0-3.704-3.5M14.5 10l-3.704 3.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	arrowUpSquareAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='1'
				y='1'
				width='18'
				height='18'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M10 14.5v-9m0 0L6.5 9.204M10 5.5l3.5 3.704'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	heading: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.449 18H2l2.449-.286m0 .286h2.449l-2.449-.286m0 .286v-.286M4.449 2H2l2.449.321m0-.321h2.449l-2.449.321m0-.321v.321m0 7.679h11.102M4.449 10v7.714m0-7.714V2.321M15.551 10v7.714m0-7.714V2.321m0-.321h-2.449l2.449.321m0-.321H18l-2.449.321m0-.321v.321m0 15.679h-2.449l2.449-.286m0 .286H18l-2.449-.286m0 .286v-.286'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	frame: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='3.5'
				y='3.5'
				width='13'
				height='13'
				rx='1.5'
				stroke='currentColor'
				strokeWidth='1.125'
				fill='none'
			/>
			<rect
				x='2'
				y='2'
				width='16'
				height='16'
				rx='3'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeWidth='2'
				fill='none'
			/>
		</svg>
	),
	dateTime: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.222 1h15.556v3.278H1.222V1Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M8.75 16.5H2.5A1.5 1.5 0 0 1 1 15V2.5A1.5 1.5 0 0 1 2.5 1h13A1.5 1.5 0 0 1 17 2.5V9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1 4.5h16'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 8.5h16'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5 4.5v12'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8.5 11a.5.5 0 0 0 1 0h-1Zm0-6.5V11h1V4.5h-1Zm4 4a.5.5 0 0 0 1 0h-1Zm0-4v4h1v-4h-1Z'
				fill='currentColor'
			/>
			<path
				d='M1 12.5h7.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='14.5'
				cy='14.5'
				r='4.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M14.5 11.5v3H17'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	currentPage: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16.5 11.25V2.5A1.5 1.5 0 0 0 15 1H4a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 4 19h7.25'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.5 4h6m-6 2h5m-5 2h3m-3 3H9m-3.5 2H8'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='15'
				cy='15.75'
				r='3.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='m12.75 16.125 1.688 1.625 2.812-3.25'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	textSizeAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.198 12.319 13 17.5m-1.802-5.181L7.901 2.836A.5.5 0 0 0 7.43 2.5h-.86a.5.5 0 0 0-.472.336l-3.297 9.483m8.396 0H2.802m0 0L1 17.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M16.175 5.779 14.026 7.62a.5.5 0 0 0 .326.88h4.296a.5.5 0 0 0 .326-.88l-2.149-1.84a.5.5 0 0 0-.65 0Zm0 7.442-2.149-1.841a.5.5 0 0 1 .326-.88h4.296a.5.5 0 0 1 .326.88l-2.149 1.841a.5.5 0 0 1-.65 0Z'
				fill='currentColor'
			/>
		</svg>
	),
	textLarger: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.198 12.319 13 17.5m-1.802-5.181L7.901 2.836A.5.5 0 0 0 7.43 2.5h-.86a.5.5 0 0 0-.472.336l-3.297 9.483m8.396 0H2.802m0 0L1 17.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m16.175 8.279-2.149 1.841a.5.5 0 0 0 .326.88h4.296a.5.5 0 0 0 .326-.88l-2.149-1.84a.5.5 0 0 0-.65 0Z'
				fill='currentColor'
			/>
		</svg>
	),
	textSmaller: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M11.198 12.319 13 17.5m-1.802-5.181L7.901 2.836A.5.5 0 0 0 7.43 2.5h-.86a.5.5 0 0 0-.472.336l-3.297 9.483m8.396 0H2.802m0 0L1 17.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M16.175 11.721 14.026 9.88a.5.5 0 0 1 .326-.88h4.296a.5.5 0 0 1 .326.88l-2.149 1.841a.5.5 0 0 1-.65 0Z'
				fill='currentColor'
			/>
		</svg>
	),
	extract: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.5 13h-2A1.5 1.5 0 0 1 4 11.5v-9A1.5 1.5 0 0 1 5.5 1h9A1.5 1.5 0 0 1 16 2.5v9a1.5 1.5 0 0 1-1.5 1.5h-2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 10v9m0 0 2.5-2.5M10 19l-2.5-2.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	extractAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.5 13h-2A1.5 1.5 0 0 1 4 11.5v-9A1.5 1.5 0 0 1 5.5 1h9A1.5 1.5 0 0 1 16 2.5v9a1.5 1.5 0 0 1-1.5 1.5h-2'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 11v2.133m0 0C10 15.8 10 17.4 5 17.4m5-4.267c0 2.667 0 4.267 5 4.267m-10 0 1.875-2.133M5 17.4l1.875 1.85M15 17.4l-1.875-2.133M15 17.4l-1.875 1.85'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	tree: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 7h5.5M3 7v5m0-5V4m0 8h5.5M3 12v4.25c0 .414.336.75.75.75H8.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='2'
				y='2'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='9'
				y='6'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='9'
				y='11'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='9'
				y='16'
				width='2'
				height='2'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M13 7h5m-5 5h6m-6 5h4'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	treeAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M4.5 7.5H10m-5.5 0v5m0-5V4m0 8.5H10m-5.5 0v4.25c0 .414.336.75.75.75H10'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='3'
				y='1'
				width='3'
				height='3'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='10.5'
				y='6'
				width='5.5'
				height='3'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='10.5'
				y='11'
				width='5.5'
				height='3'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<rect
				x='10.5'
				y='16'
				width='5.5'
				height='3'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
		</svg>
	),
	treeAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='4'
				r='1.75'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
			/>
			<circle
				cx='6.5'
				cy='8.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='3'
				cy='12.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='10'
				cy='12.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='6.5'
				cy='16.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13.5'
				cy='8.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='17'
				cy='12.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='13.5'
				cy='16.5'
				r='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m7.5 7 1-1M4 11l1-1m6 1 1-1m-4.5 5 1-1m4-7-1-1m4.5 5-1-1m-2.5 5-1-1'
				stroke='currentColor'
				strokeLinecap='square'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	equalRows: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M6 7.5A1.5 1.5 0 0 1 7.5 6h5A1.5 1.5 0 0 1 14 7.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 6 12.5v-5Zm1.5 1.25a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5Zm.5 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H8Z'
				fill='currentColor'
			/>
			<path
				d='M19 10h-6.5M1 10h6.5M19 19H1M19 1H1'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	sidebar: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13 2h4.5A1.5 1.5 0 0 1 19 3.5v13a1.5 1.5 0 0 1-1.5 1.5H13V2Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M13 2v16M2.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	sidebarFlip: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7 2H2.5A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18H7V2Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M7 2v16m10.5 0h-15A1.5 1.5 0 0 1 1 16.5v-13A1.5 1.5 0 0 1 2.5 2h15A1.5 1.5 0 0 1 19 3.5v13a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	magicFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.256 1.583c.059-.26.43-.26.488 0l.626 2.78a3 3 0 0 0 2.268 2.267l2.78.626c.26.059.26.43 0 .488l-2.78.626a3 3 0 0 0-2.268 2.268l-.626 2.78c-.059.26-.43.26-.488 0l-.626-2.78A3 3 0 0 0 4.363 8.37l-2.78-.626c-.26-.059-.26-.43 0-.488l2.78-.626A3 3 0 0 0 6.63 4.363l.626-2.78Zm7.594 9.583c.036-.16.264-.16.3 0l.42 1.868c.157.695.7 1.239 1.396 1.395l1.868.42c.16.037.16.265 0 .301l-1.868.42c-.695.157-1.239.7-1.395 1.396l-.42 1.868c-.037.16-.265.16-.301 0l-.42-1.868a1.846 1.846 0 0 0-1.396-1.395l-1.868-.42c-.16-.037-.16-.265 0-.301l1.868-.42a1.846 1.846 0 0 0 1.395-1.396l.42-1.868Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	magicAltFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.256 3.583c.059-.26.43-.26.488 0l.534 2.371a3 3 0 0 0 2.268 2.268l2.371.534c.26.059.26.43 0 .488l-2.371.534a3 3 0 0 0-2.268 2.268l-.534 2.371c-.059.26-.43.26-.488 0l-.534-2.371a3 3 0 0 0-2.268-2.268l-2.371-.534c-.26-.059-.26-.43 0-.488l2.371-.534a3 3 0 0 0 2.268-2.268l.534-2.371ZM4.85 1.166c.036-.16.264-.16.3 0l.42 1.868c.157.695.7 1.239 1.396 1.395l1.868.42c.16.037.16.265 0 .301l-1.868.42c-.695.157-1.239.7-1.395 1.396l-.42 1.868c-.037.16-.265.16-.301 0l-.42-1.868a1.846 1.846 0 0 0-1.396-1.395l-1.868-.42c-.16-.037-.16-.265 0-.301l1.868-.42a1.846 1.846 0 0 0 1.395-1.396l.42-1.868Zm2 11c.036-.16.264-.16.3 0l.329 1.46c.157.695.7 1.239 1.395 1.395l1.46.329c.16.036.16.264 0 .3l-1.46.329c-.695.157-1.238.7-1.395 1.395l-.329 1.46c-.036.16-.264.16-.3 0l-.329-1.46a1.846 1.846 0 0 0-1.395-1.395l-1.46-.329c-.16-.036-.16-.264 0-.3l1.46-.329a1.846 1.846 0 0 0 1.395-1.395l.329-1.46Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	magicFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.256 1.583c.059-.26.43-.26.488 0l.626 2.78a3 3 0 0 0 2.268 2.267l2.78.626c.26.059.26.43 0 .488l-2.78.626a3 3 0 0 0-2.268 2.268l-.626 2.78c-.059.26-.43.26-.488 0l-.626-2.78A3 3 0 0 0 4.363 8.37l-2.78-.626c-.26-.059-.26-.43 0-.488l2.78-.626A3 3 0 0 0 6.63 4.363l.626-2.78Zm7.594 9.583c.036-.16.264-.16.3 0l.42 1.868c.157.695.7 1.239 1.396 1.395l1.868.42c.16.037.16.265 0 .301l-1.868.42c-.695.157-1.239.7-1.395 1.396l-.42 1.868c-.037.16-.265.16-.301 0l-.42-1.868a1.846 1.846 0 0 0-1.396-1.395l-1.868-.42c-.16-.037-.16-.265 0-.301l1.868-.42a1.846 1.846 0 0 0 1.395-1.396l.42-1.868Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	magicAltFillTransparent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.256 3.583c.059-.26.43-.26.488 0l.534 2.371a3 3 0 0 0 2.268 2.268l2.371.534c.26.059.26.43 0 .488l-2.371.534a3 3 0 0 0-2.268 2.268l-.534 2.371c-.059.26-.43.26-.488 0l-.534-2.371a3 3 0 0 0-2.268-2.268l-2.371-.534c-.26-.059-.26-.43 0-.488l2.371-.534a3 3 0 0 0 2.268-2.268l.534-2.371ZM4.85 1.166c.036-.16.264-.16.3 0l.42 1.868c.157.695.7 1.239 1.396 1.395l1.868.42c.16.037.16.265 0 .301l-1.868.42c-.695.157-1.239.7-1.395 1.396l-.42 1.868c-.037.16-.265.16-.301 0l-.42-1.868a1.846 1.846 0 0 0-1.396-1.395l-1.868-.42c-.16-.037-.16-.265 0-.301l1.868-.42a1.846 1.846 0 0 0 1.395-1.396l.42-1.868Zm2 11c.036-.16.264-.16.3 0l.329 1.46c.157.695.7 1.239 1.395 1.395l1.46.329c.16.036.16.264 0 .3l-1.46.329c-.695.157-1.238.7-1.395 1.395l-.329 1.46c-.036.16-.264.16-.3 0l-.329-1.46a1.846 1.846 0 0 0-1.395-1.395l-1.46-.329c-.16-.036-.16-.264 0-.3l1.46-.329a1.846 1.846 0 0 0 1.395-1.395l.329-1.46Z'
				fill='currentColor'
				fillOpacity='0.3'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
		</svg>
	),
	group: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 5.5v-3A1.5 1.5 0 0 1 2.5 1h3M1 14.5v3A1.5 1.5 0 0 0 2.5 19h3m9 0h3a1.5 1.5 0 0 0 1.5-1.5v-3m0-9v-3A1.5 1.5 0 0 0 17.5 1h-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15.718 11h-4.509a4 4 0 1 1-2.014-2.124l2.651-4.714a.75.75 0 0 1 1.308 0L14.75 7l1.621 2.882A.75.75 0 0 1 15.718 11Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M11.21 11a4 4 0 1 1-2.014-2.124m-.001 0-.566 1.006A.75.75 0 0 0 9.282 11h6.436a.75.75 0 0 0 .653-1.118L14.75 7l-1.596-2.838a.75.75 0 0 0-1.308 0L9.195 8.876Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	ungroup: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 5.5v-3A1.5 1.5 0 0 1 2.5 1h3M1 14.5v3A1.5 1.5 0 0 0 2.5 19h3M19 5.5v-3A1.5 1.5 0 0 0 17.5 1h-3'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M13.5 12a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-5Zm4.146 6.354a.5.5 0 0 0 .708-.708L16.707 16l1.647-1.646a.5.5 0 0 0-.708-.708L16 15.293l-1.646-1.647a.5.5 0 0 0-.708.708L15.293 16l-1.647 1.646a.5.5 0 0 0 .708.708L16 16.707l1.646 1.647Z'
				fill='currentColor'
			/>
			<path
				d='m13.154 4.162 3.217 5.72A.75.75 0 0 1 15.718 11h-4.509a4 4 0 1 1-2.014-2.124l2.651-4.714a.75.75 0 0 1 1.308 0Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M11.21 11a4 4 0 1 1-2.014-2.124m-.001 0-.566 1.006A.75.75 0 0 0 9.282 11h6.436a.75.75 0 0 0 .653-1.118l-3.217-5.72a.75.75 0 0 0-1.308 0L9.195 8.876Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	briefcase: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='2'
				y='5.5'
				width='16'
				height='12'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M13 5.5V4a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 7 4v1.5'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	book: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 16.5 3.5 16v2l1 1h11l1-1v-2l-1 .5H5Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='3.25'
				y='1'
				width='13.5'
				height='18'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M3.25 12.25v2.438a1.5 1.5 0 0 0 1.5 1.5h11a1 1 0 0 0 1-1V12.25'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M6.625 4.938h4.5m-4.5 2.25h2.25'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	microphone: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6.5 4.5a3.5 3.5 0 1 1 7 0v5a3.5 3.5 0 1 1-7 0v-5Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M15.5 9v.5A5.5 5.5 0 0 1 10 15v0M4.5 9v.5A5.5 5.5 0 0 0 10 15v0m0 0v4m0 0H7.25M10 19h2.75'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	newspaper: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16.25 6.063V2.5a1.5 1.5 0 0 0-1.5-1.5H4a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 4 19h12.5a1.5 1.5 0 0 0 1.5-1.5V7.562a1.5 1.5 0 0 0-1.5-1.5h-.25Zm0 0v10.562'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M9.5 7.25H13M5.5 11.5H10m-.5-2.75h2M5.5 13H9m-3.5 1.5h4'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.5 4h8'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='5'
				y='6.5'
				width='3'
				height='3'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.3'
			/>
		</svg>
	),
	officeBuilding: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 19h14m-1 0V2.5A1.5 1.5 0 0 0 14.5 1h-9A1.5 1.5 0 0 0 4 2.5V19h12Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M10.5 14.768h-1a.75.75 0 0 0-.75.75V19h2.5v-3.482a.75.75 0 0 0-.75-.75Z'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='6.125'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='6.125'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='6.125'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='6.125'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='6.125'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='6.125'
				y='14.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.375'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.375'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.375'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.375'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.375'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.625'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.875'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.625'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.875'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.625'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.875'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.625'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.625'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.875'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.875'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.875'
				y='14.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
		</svg>
	),
	officeBuildings: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 4.5A1.5 1.5 0 0 1 3.5 3H6v16H2V4.5Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				d='M1 19h1m17 0H2M6 3v16h12V2.5A1.5 1.5 0 0 0 16.5 1h-9A1.5 1.5 0 0 0 6 2.5V3Zm0 0H3.5A1.5 1.5 0 0 0 2 4.5V19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M12.5 14.768h-1a.75.75 0 0 0-.75.75V19h2.5v-3.482a.75.75 0 0 0-.75-.75Z'
				stroke='currentColor'
				fill='none'
			/>
			<rect
				x='8.125'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.125'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.125'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.125'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.125'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='8.125'
				y='14.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.375'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.375'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.375'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.375'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='10.375'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.625'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='14.875'
				y='3'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.625'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='14.875'
				y='5.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.625'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='14.875'
				y='7.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.625'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='12.625'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='14.875'
				y='9.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='14.875'
				y='12'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='14.875'
				y='14.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='3.5'
				y='4.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='3.5'
				y='6.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='3.5'
				y='9'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='3.5'
				y='11.25'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='3.5'
				y='13.5'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
			<rect
				x='3.5'
				y='15.75'
				width='1.125'
				height='1.125'
				rx='0.5625'
				fill='currentColor'
			/>
		</svg>
	),
	box: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m9.912 19-6.908-3.947a1 1 0 0 1-.504-.869V5.235l7.412 4.236V19Zm0 0 6.908-3.947a1 1 0 0 0 .504-.869V5.235L9.912 9.471V19Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m17.323 5.235-6.915-3.951a1 1 0 0 0-.992 0L2.5 5.235l7.412 4.236 7.411-4.236Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='m6.5 3 7 4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	hoverBackgroundGlow: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m12 15.903.033-8.671c0-.208.271-.31.427-.161l6.469 6.216c.158.152.035.405-.191.394l-2.653-.13 1.992 4.608c.052.119-.01.254-.137.302l-1.383.522a.255.255 0 0 1-.323-.128l-1.993-4.609-1.81 1.817c-.155.154-.432.052-.431-.16Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M16.5 8.5V3A1.5 1.5 0 0 0 15 1.5H3A1.5 1.5 0 0 0 1.5 3v12A1.5 1.5 0 0 0 3 16.5h7.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<g
				filter='url(#796755cf-6087-4f90-9a30-7138bc95e504)'
				opacity='0.5'
			>
				<path
					d='M13.253 2.16A5 5 0 0 1 16.33 4.5v5a4.996 4.996 0 0 1-.575.802L12 7l.014 5a5 5 0 1 1 1.24-9.84Z'
					fill='currentColor'
					fillOpacity='0.5'
				/>
			</g>
			<defs>
				<filter
					id='796755cf-6087-4f90-9a30-7138bc95e504'
					x='5'
					y='0'
					width='13.3301'
					height='14'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
					/>
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feGaussianBlur
						stdDeviation='1'
						result='effect1_foregroundBlur_1424_3'
					/>
				</filter>
			</defs>
		</svg>
	),
	hamburgerMenu: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 6h14M3 10h14M3 14h14'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	responsiveOverridesAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M8 19v-3m0 3H5.5M8 19h2.5M8 16h5.5a1.5 1.5 0 0 0 1.5-1.5V13h-1.5a1.5 1.5 0 0 1-1.5-1.5V6H2.5A1.5 1.5 0 0 0 1 7.5v7A1.5 1.5 0 0 0 2.5 16H8Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='12'
				y='1'
				width='7'
				height='12'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M14.75 11.5h1.5'
				stroke='currentColor'
				strokeOpacity='0.12'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				cx='15.5'
				cy='2.5'
				r='0.5'
				fill='currentColor'
			/>
		</svg>
	),
	menuItemCheck: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 10.667 8.333 14 15 6'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	menuItemCircle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='4'
				fill='currentColor'
			/>
		</svg>
	),
	preview: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
		>
			<circle
				cx='12'
				cy='11'
				stroke='currentColor'
				r='4'
				fill='none'
			/>
			<path
				d='M14.334 14.333 19 19'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M6.5 10h-4A1.5 1.5 0 0 1 1 8.5v-6A1.5 1.5 0 0 1 2.5 1h9A1.5 1.5 0 0 1 13 2.5v3m-9.5-2H8m-4.5 2H7m-3.5 2H5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	previewResponsive: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='2.67856'
				cy='2.67856'
				r='2.67856'
				transform='matrix(-1 0 0 1 14 1)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m6.5 8.5 2.845-2.869'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15.25 15H4.75a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 15v4m-6-9v1.5M4 13v-1.5m0 0h6m0 0V10m0 1.5V13m0-1.5h6m0 0V10m0 1.5V13'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M16 11.5h3m-18 0h3'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	responsive: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14.5 8h-9A1.5 1.5 0 0 0 4 9.5v6A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 14.5 8Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 8v9M4 3v1.5M4 6V4.5m0 0h6m0 0V3m0 1.5V6m0-1.5h6m0 0V3m0 1.5V6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M16 4.5h3m-18 0h3'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	angle: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M8.925 10.575A10.5 10.5 0 0 1 12 18'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M17.5 18H3.31a.75.75 0 0 1-.53-1.28L17.5 2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	gradientRepeat: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1.5 12.241A6.26 6.26 0 0 1 7.759 18.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1.5 8.828a9.672 9.672 0 0 1 9.672 9.672'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1.5 5.414A13.086 13.086 0 0 1 14.586 18.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M1.5 2A16.5 16.5 0 0 1 18 18.5'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	centerPoint: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='10'
				cy='10'
				r='5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 10h18m-9 9V1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	gradientStop: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M7.5 3.5h5a1 1 0 0 1 1 1v8.667a1 1 0 0 1-.2.6L10.8 17.1a1 1 0 0 1-1.6 0l-2.5-3.333a1 1 0 0 1-.2-.6V4.5a1 1 0 0 1 1-1Z'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M15 10h4M1 10h4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='8'
				y='5'
				width='4'
				height='6'
				rx='0.5'
				fill='currentColor'
				fillOpacity='0.3'
			/>
		</svg>
	),
	layoutBentoBox: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16.938 1.5H9.375a1 1 0 0 0-1 1v2.25a1 1 0 0 0 1 1h7.563a1 1 0 0 0 1-1V2.5a1 1 0 0 0-1-1Zm-6.375 6.375H3a1 1 0 0 0-1 1V17.5a1 1 0 0 0 1 1h7.563a1 1 0 0 0 1-1V8.875a1 1 0 0 0-1-1ZM5.25 1.5H3a1 1 0 0 0-1 1v2.25a1 1 0 0 0 1 1h2.25a1 1 0 0 0 1-1V2.5a1 1 0 0 0-1-1Zm11.688 6.375h-2.25a1 1 0 0 0-1 1v2.25a1 1 0 0 0 1 1h2.25a1 1 0 0 0 1-1v-2.25a1 1 0 0 0-1-1Zm0 6.375h-2.25a1 1 0 0 0-1 1v2.25a1 1 0 0 0 1 1h2.25a1 1 0 0 0 1-1v-2.25a1 1 0 0 0-1-1Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	colorPickerText: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M13.24 9.028 14.63 13m-1.39-3.972-2.517-7.193a.5.5 0 0 0-.472-.335H9.75a.5.5 0 0 0-.472.335L6.76 9.028m6.48 0H6.76m0 0L5.37 13'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	colorPickerTextHighlight: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clipRule='evenodd'
				fillRule='evenodd'
				d='M9.795 1c-.69 0-1.305.436-1.534 1.088L5.973 8.626l-1.27 3.627a1.125 1.125 0 1 0 2.124.744l1.006-2.874h4.32l1.006 2.874a1.125 1.125 0 1 0 2.123-.744l-1.269-3.627-2.288-6.538A1.625 1.625 0 0 0 10.19 1h-.396Zm.198 2.952 1.373 3.921H8.62l1.372-3.921Zm-.198-2.327a1 1 0 0 0-.944.67L6.563 8.833l-1.27 3.627a.5.5 0 1 0 .944.33L7.39 9.498h5.207l1.152 3.292a.5.5 0 1 0 .944-.33l-1.27-3.627-2.288-6.538a1 1 0 0 0-.944-.67h-.396Zm2.452 6.873H7.74l2.055-5.873h.396l2.056 5.873Z'
				fill='currentColor'
			/>
		</svg>
	),
	colorPickerFill: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.522 11.693a1.307 1.307 0 1 1-2.614 0c0-.722 1.307-2.613 1.307-2.613s1.307 1.891 1.307 2.613Z'
				fill='currentColor'
				stroke='currentColor'
				strokeLinejoin='round'
			/>
			<rect
				x='9.66406'
				y='2.28409'
				width='6.27273'
				height='8.36364'
				rx='1.5'
				transform='rotate(45 9.664 2.284)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M12.637 8.034H4.273l4.182 4.182 4.182-4.182Z'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<path
				d='M4.796 8.034h7.84M9.501 1.5v3.136'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	colorPickerListMarker: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='4.25'
				cy='1.75'
				r='1.25'
				fill='currentColor'
			/>
			<circle
				cx='4.25'
				cy='6.25'
				r='1.25'
				fill='currentColor'
			/>
			<circle
				cx='4.25'
				cy='10.75'
				r='1.25'
				fill='currentColor'
			/>
			<path
				d='M8 1.75h9m-9 4.5h9m-9 4.5h9'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	plusMinusButtonsH: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 15V5m7.5 10h-15A1.5 1.5 0 0 1 1 13.5v-7A1.5 1.5 0 0 1 2.5 5h15A1.5 1.5 0 0 1 19 6.5v7a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.5 8v2m0 2v-2m0 0h-2m2 0h2m9 0h-4'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	plusMinusButtonsV: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5 10h10M5 17.5v-15A1.5 1.5 0 0 1 6.5 1h7A1.5 1.5 0 0 1 15 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 17.5Z'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M10 3.5v2m0 2v-2m0 0H8m2 0h2m0 9H8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	slider: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 10h5m13 0h-9'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<rect
				x='6.5'
				y='7.5'
				width='3'
				height='5'
				rx='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	header: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M19 17V4.5A1.5 1.5 0 0 0 17.5 3h-15A1.5 1.5 0 0 0 1 4.5V17'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M2 4.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-3Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	footer: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 3v12.5A1.5 1.5 0 0 0 2.5 17h15a1.5 1.5 0 0 0 1.5-1.5V3'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M2 10.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-5Z'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	alignHorizontalVerticalAlt2: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M5.5 13A1.5 1.5 0 0 0 7 14.5h6a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 13 5.5H7A1.5 1.5 0 0 0 5.5 7v6Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19.5 10H18m-2 0h-1.5m-9 0H4m-2 0H.5m9.5 9.5V18m0-2v-1.5m0-9V4m0-2V.5'
				opacity='0.8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11 10H9m1 1V9'
				stroke='currentColor'
				strokeOpacity='0.3'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	verticalAlignAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='8'
				height='15'
				rx='1.5'
				transform='matrix(0 1 1 0 2.5 6)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M19 1H1m18 18H1'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	horizontalAlignAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				width='8'
				height='15'
				rx='1.5'
				transform='matrix(1 0 0 -1 6 17.5)'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M1 1v18M19 1v18'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	tagAlt: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14.75 6.063C14.75 3.267 12.498 1 9.72 1 8.246 1 6.92 1.64 6 2.658a1.413 1.413 0 0 0 0 1.988c.545.55 1.43.55 1.975 0l.245-.25a2.219 2.219 0 0 1 1.502-.583 2.243 2.243 0 0 1 2.235 2.25c0 1.242-1 2.25-2.235 2.25H6.75a1.5 1.5 0 0 0-1.5 1.5V17.5a1.5 1.5 0 0 0 1.5 1.5h6.5a1.5 1.5 0 0 0 1.5-1.5V6.062Z'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.25 17h5.5'
				stroke='currentColor'
				strokeOpacity='0.5'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	door: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='2'
				width='10'
				height='16'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='7.5'
				cy='10'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	doorOut: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M14 10.5V3a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 4 3v13a1.5 1.5 0 0 0 1.5 1.5H8'
				stroke='currentColor'
				fill='none'
			/>
			<path
				clip-rule='evenodd'
				fillRule='evenodd'
				d='M17 18a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 9 18v-5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 17 13v5Zm-1.646-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708L13.793 15H11a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z'
				fill='currentColor'
			/>
			<circle
				cx='6.5'
				cy='9.5'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	doorIn: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M6 10.5V3a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 16 3v13a1.5 1.5 0 0 1-1.5 1.5H12'
				stroke='currentColor'
				fill='none'
			/>
			<path
				clip-rule='evenodd'
				fillRule='evenodd'
				d='M11 18a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 3 18v-5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 11 13v5Zm-1.646-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708L7.793 15H5a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z'
				fill='currentColor'
			/>
			<circle
				cx='13.5'
				cy='9.5'
				r='1'
				fill='currentColor'
			/>
		</svg>
	),
	webVideo: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<circle
				cx='14.5'
				cy='14.5'
				r='4.5'
				stroke='currentColor'
				fill='none'
			/>
			<ellipse
				cx='14.5'
				cy='14.5'
				rx='1.75'
				ry='4.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10.5 13h8m-8 3h8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M11 9V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13h6'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M4 1.5v11M1 4h3M1 7h3m-3 3h3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M8 4h3M8 7h3m-3 3h1.5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M8 1.5v11'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M5.25 7.896V5.604a.25.25 0 0 1 .427-.177l1.146 1.146a.25.25 0 0 1 0 .354L5.677 8.073a.25.25 0 0 1-.427-.177Z'
				fill='currentColor'
			/>
		</svg>
	),
	media: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m9 17 1.666-1.48a1.183 1.183 0 0 1 1.623.047c.478.478 1.258.46 1.713-.04l.837-.922a1.5 1.5 0 0 1 2.216-.005L19 16.722M10.5 9h7a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 17.5v-7A1.5 1.5 0 0 1 10.5 9Z'
				stroke='currentColor'
				fill='none'
			/>
			<circle
				cx='12'
				cy='12'
				r='1'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
			/>
			<path
				d='M12 7.5v-5A1.5 1.5 0 0 0 10.5 1h-8A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13h5'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M4 1.5v11M1 4h3M1 7h3m-3 3h3'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M9 4h3M9 7h3M9 1v7'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='M5.75 7.896V5.604a.25.25 0 0 1 .427-.177l1.146 1.146a.25.25 0 0 1 0 .354L6.177 8.073a.25.25 0 0 1-.427-.177Z'
				fill='currentColor'
			/>
		</svg>
	),
	loader: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
		>
			<path
				d='M10 19v-2m-9-7h2m13.364 6.364L14.95 14.95M3.636 16.364 5.05 14.95M10 3V1m7 9h2M5.05 5.05 3.636 3.636M14.95 5.05l1.414-1.414'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	verticalAlignBetween: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m18.996 13.5-2 2m0 0-2-2m2 2v-11m2 2-2-2m0 0-2 2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M.996 1h18m-18 18h18'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='9'
				y='3'
				width='4.5'
				height='8'
				rx='1.5'
				transform='rotate(90 9 3)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='13'
				y='12.5'
				width='4.5'
				height='12'
				rx='1.5'
				transform='rotate(90 13 12.5)'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	horizontalAlignBetween: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='m13.496 1 2 2m0 0-2 2m2-2h-11m2-2-2 2m0 0 2 2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M.996 19V1m18 18V1'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='2.99609'
				y='10.9961'
				width='4.5'
				height='8'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
			<rect
				x='12.4961'
				y='6.99609'
				width='4.5'
				height='12'
				rx='1.5'
				fill='currentColor'
				fillOpacity='0.5'
			/>
		</svg>
	),
	lightMode: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 18v-2m-8-6h2m11.657 5.657L14.4 14.4M4.343 15.657 5.6 14.4M10 4V2m6 8h2M5.6 5.6 4.343 4.343M14.4 5.6l1.257-1.257'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<circle
				cx='10'
				cy='10'
				r='4'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	darkMode: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M3 12.939A7.4 7.4 0 0 0 12.939 3 7.396 7.396 0 1 1 3 12.939Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	listIndent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M1 6h7m-7 8h7m-7-4h9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m18.823 9.823-4.396-4.396a.25.25 0 0 0-.427.177v8.792c0 .223.27.335.427.177l4.396-4.396a.25.25 0 0 0 0-.354Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	listOutdent: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M10 6h7m-7 8h7m-7-4h9'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<path
				d='m1.177 9.823 4.396-4.396A.25.25 0 0 1 6 5.604v8.792a.25.25 0 0 1-.427.177l-4.396-4.396a.25.25 0 0 1 0-.354Z'
				fill='currentColor'
				fillOpacity='0.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	),
	panelExpand: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v3H2v-3Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='2'
				y='3'
				width='16'
				height='14'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M2 7.5h16'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M7.75 12 10 14m0 0 2.25-2M10 14V9'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	panelCollapse: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v3H2v-3Z'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='2'
				y='3'
				width='16'
				height='14'
				rx='1.5'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M2 7.5h16'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='m7.75 12.5 2.25-2m0 0 2.25 2m-2.25-2v5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	blockParts: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15 9.5v-6A1.5 1.5 0 0 0 13.5 2h-10A1.5 1.5 0 0 0 2 3.5v10A1.5 1.5 0 0 0 3.5 15h7'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
			<rect
				x='4'
				y='4'
				width='9'
				height='2'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.3'
			/>
			<rect
				x='4'
				y='7'
				width='4'
				height='6'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<rect
				x='9'
				y='7'
				width='4'
				height='4'
				rx='0.75'
				fill='currentColor'
				fillOpacity='0.12'
			/>
			<path
				clip-rule='evenodd'
				fillRule='evenodd'
				d='M14.075 11.47a1.176 1.176 0 0 1-1.687 1.06c-.111-.054-.251-.04-.326.058-.226.3-.412.632-.548.99-.05.134.042.276.175.329a1.177 1.177 0 0 1 0 2.186c-.133.053-.226.195-.175.33.136.357.322.69.548.989.075.099.215.112.326.058a1.176 1.176 0 0 1 1.685 1.126c-.007.123.06.247.18.278a4.004 4.004 0 0 0 1.5.095c.143-.018.225-.167.21-.31a1.176 1.176 0 0 1 1.927-1.029c.108.094.276.108.37 0a3.99 3.99 0 0 0 .726-1.207c.05-.135-.042-.276-.175-.33a1.177 1.177 0 0 1 0-2.186c.133-.053.226-.195.175-.33a4.002 4.002 0 0 0-.725-1.207c-.095-.108-.263-.093-.372 0a1.176 1.176 0 0 1-1.927-1.029c.016-.143-.066-.292-.208-.31a4.026 4.026 0 0 0-1.502.095c-.12.03-.186.155-.18.279a.697.697 0 0 1 .003.066Zm1.175 4.942a1.411 1.411 0 1 0-.002-2.822 1.411 1.411 0 0 0 .002 2.822Z'
				fill='currentColor'
			/>
		</svg>
	),
	captionGeneric: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<rect
				x='5'
				y='17'
				width='10'
				height='3'
				rx='1'
				fill='currentColor'
			/>
			<path
				d='M16.5 15h-13A1.5 1.5 0 0 1 2 13.5v-11A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v11a1.5 1.5 0 0 1-1.5 1.5Z'
				stroke='currentColor'
				fill='none'
			/>
		</svg>
	),
	componentOptions: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				clip-rule='evenodd'
				fillRule='evenodd'
				d='M14.575 11.97a1.176 1.176 0 0 1-1.687 1.06c-.111-.054-.251-.04-.326.058-.226.3-.412.632-.548.99-.05.134.042.276.175.329a1.177 1.177 0 0 1 0 2.186c-.133.053-.226.195-.175.33.136.357.322.69.548.989.075.099.215.112.326.058a1.176 1.176 0 0 1 1.685 1.126c-.007.123.06.247.18.278a4.004 4.004 0 0 0 1.5.095c.143-.018.225-.167.21-.31a1.176 1.176 0 0 1 1.927-1.029c.108.094.276.108.37 0a3.99 3.99 0 0 0 .726-1.207c.05-.135-.042-.276-.175-.33a1.177 1.177 0 0 1 0-2.186c.133-.053.226-.195.175-.33a4.002 4.002 0 0 0-.725-1.207c-.095-.108-.263-.093-.372 0a1.176 1.176 0 0 1-1.927-1.029c.016-.143-.066-.292-.208-.31a4.026 4.026 0 0 0-1.502.095c-.12.03-.186.155-.18.279a.697.697 0 0 1 .003.066Zm1.175 4.942a1.411 1.411 0 1 0-.002-2.822 1.411 1.411 0 0 0 .002 2.822Z'
				fill='currentColor'
			/>
			<path
				d='m9.912 19-6.656-3.803a1.5 1.5 0 0 1-.756-1.303V5.235l7.412 4.236V19Z'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M17.324 11V5.235L9.912 9.471V19l.926-.53.464-.264m6.021-12.971-6.667-3.81a1.5 1.5 0 0 0-1.488 0L2.5 5.235l7.412 4.236 7.411-4.236Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	folder: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.5 5.5H17A1.5 1.5 0 0 1 18.5 7v8a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 15V7.5m8-2L7.198 3.795a1.5 1.5 0 0 0-.893-.295H3A1.5 1.5 0 0 0 1.5 5v2.5m8-2L7.198 7.205a1.5 1.5 0 0 1-.893.295H1.5'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	folderOpen: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M16.5 7.5V7A1.5 1.5 0 0 0 15 5.5H9.203a1.5 1.5 0 0 1-1.034-.413L6.934 3.913A1.5 1.5 0 0 0 5.901 3.5H3A1.5 1.5 0 0 0 1.5 5v10A1.5 1.5 0 0 0 3 16.5h12.416a1.5 1.5 0 0 0 1.448-1.108l1.624-6A1.5 1.5 0 0 0 17.04 7.5H5.64a1.5 1.5 0 0 0-1.445 1.099L2 16.5'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	),
	folderTopLevel: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.5 3.5H17A1.5 1.5 0 0 1 18.5 5v5m-9-6.5L7.198 1.795a1.5 1.5 0 0 0-.893-.295H3A1.5 1.5 0 0 0 1.5 3v2.5m8-2L7.198 5.205a1.5 1.5 0 0 1-.893.295H1.5m0 0V13A1.5 1.5 0 0 0 3 14.5h7'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13 11a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-5Zm2.224 2.082a.5.5 0 0 1 .629.064l2 2 .064.079a.5.5 0 0 1-.693.693l-.078-.065-1.147-1.146V17.5a.5.5 0 1 1-1 0v-2.793l-1.146 1.146a.5.5 0 1 1-.707-.707l2-2 .078-.064Z'
				fill='currentColor'
			/>
		</svg>
	),
	folderAdd: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M9.5 3.5H17A1.5 1.5 0 0 1 18.5 5v5m-9-6.5L7.198 1.795a1.5 1.5 0 0 0-.893-.295H3A1.5 1.5 0 0 0 1.5 3v2.5m8-2L7.198 5.205a1.5 1.5 0 0 1-.893.295H1.5m0 0V13A1.5 1.5 0 0 0 3 14.5h7'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M13 11a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-5Zm2.5 2a.5.5 0 0 1 .5.5V15h1.5l.1.01a.5.5 0 0 1 0 .98l-.1.01H16v1.5a.5.5 0 1 1-1 0V16h-1.5a.5.5 0 0 1 0-1H15v-1.5a.5.5 0 0 1 .5-.5Z'
				fill='currentColor'
			/>
		</svg>
	),
	rename: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				opacity='0.8'
				d='M12 5.5h4.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H12m-4-9H3.5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2H8'
				stroke='currentColor'
				fill='none'
			/>
			<path
				d='M10 2.5v15m0-15h3m-3 0H7m3 15H7m3 0h3'
				stroke='currentColor'
				strokeLinecap='round'
				fill='none'
			/>
		</svg>
	),
	archiveFile: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M15.5 10.5V3A1.5 1.5 0 0 0 14 1.5H5A1.5 1.5 0 0 0 3.5 3v14A1.5 1.5 0 0 0 5 18.5h8.5m2-8 1.705 2.302a1.5 1.5 0 0 1 .295.893V17a1.5 1.5 0 0 1-1.5 1.5h-2.5m2-8-1.705 2.302a1.5 1.5 0 0 0-.295.893V18.5'
				stroke='currentColor'
				strokeLinejoin='round'
				fill='none'
			/>
			<path
				d='M7.5 2.5v1m1 1v1m-1 1v1m1 1v1m-1 1v1m1 1v1m-1 1v1m1 1v1'
				stroke='currentColor'
				strokeLinecap='square'
				fill='none'
			/>
		</svg>
	),
	info: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			width='20'
			height='20'
			fill='none'
		>
			<path
				d='M8.5 4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V4Zm2 5a1 1 0 0 1 1 1v6.5h1a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V17a.5.5 0 0 1 .5-.5h1V11a.5.5 0 0 0-.5-.5h-.5A.5.5 0 0 1 7 10v-.5a.5.5 0 0 1 .5-.5h3Z'
				fill='currentColor'
			/>
		</svg>
	),
};

/**
 * Block icons, primarily used in block manifests.
 *
 * - `es-`  prefixed icons are Eightshift blocks.
 * - `esf-` prefixed icons are Eightshift forms blocks.
 */
export const blockIcons = {
	// Eightshift blocks.
	'es-button':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='6' width='18' height='8' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M6 10h8' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v10H2v-10Z' fill='currentColor' fill-opacity='0.12'/><path d='M4.834 9.448 2 12.5h16v-.035a1.5 1.5 0 0 0-.304-.905l-3.384-4.472a1.5 1.5 0 0 0-2.396.004L9.81 9.9a1.5 1.5 0 0 1-2.356.055l-.364-.44a1.5 1.5 0 0 0-2.256-.066Z' fill='currentColor'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><circle cx='6.5' cy='5' r='1.5' fill='currentColor'/><path d='M4.5 14.5H10m-5.5 2h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-columns':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='3' width='4.5' height='14' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><rect x='7.75' y='3' width='4.5' height='14' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><rect x='14.5' y='3' width='4.5' height='14' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/></svg>",
	'es-group':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='2' stroke='currentColor' stroke-opacity='0.5' fill='none'/><path d='M3.5 4h7v4L8 9l-1.5 2h-3V4Z' fill='currentColor' fill-opacity='0.12'/><path d='M10.5 8.5V5.25A1.5 1.5 0 0 0 9 3.75H4.5A1.5 1.5 0 0 0 3 5.25v4.5a1.5 1.5 0 0 0 1.5 1.5h1.6' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='m13.066 6.51-3.139 5.492a.5.5 0 0 0 .435.748h6.276a.5.5 0 0 0 .434-.748L13.935 6.51a.5.5 0 0 0-.868 0Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/><path d='M11.643 8.853a4 4 0 1 0 2.35 3.897' stroke='currentColor' fill='none'/></svg>",
	'es-heading':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M4.143 19H2l2.143-.25m0 .25h2.143l-2.143-.25m0 .25v-.25m0-17.75H2l2.143.281m0-.281h2.143l-2.143.281m0-.281v.281m0 8.719h11.714M4.143 10v8.75m0-8.75V1.281M15.857 10v8.75m0-8.75V1.281m0-.281h-2.143l2.143.281m0-.281H18l-2.143.281m0-.281v.281m0 17.719h-2.143l2.143-.25m0 .25H18l-2.143-.25m0 .25v-.25' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 17.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15Z' fill='currentColor' fill-opacity='0.12'/><path d='m1 16 3.443-3.06A1.5 1.5 0 0 1 6.5 13l.888.888a1.5 1.5 0 0 0 2.17-.052l2.837-3.12a1.5 1.5 0 0 1 2.215-.005L19 15.5M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1Z' stroke='currentColor' fill='none'/><path d='M17.5 19h-15A1.5 1.5 0 0 1 1 17.5v-.826a1.5 1.5 0 0 1 .503-1.121l2.94-2.613A1.5 1.5 0 0 1 6.5 13l.888.888a1.5 1.5 0 0 0 2.17-.052l2.837-3.12a1.5 1.5 0 0 1 2.215-.005l3.996 4.359A1.5 1.5 0 0 1 19 16.084V17.5a1.5 1.5 0 0 1-1.5 1.5Z' fill='currentColor'/><circle cx='6.5' cy='6.5' r='1.5' fill='currentColor' stroke='currentColor'/></svg>",
	'es-link':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M13.5 5.5h1a4.5 4.5 0 1 1 0 9h-1m-7-9h-1a4.5 4.5 0 0 0 0 9h1M6 10h8' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-lists':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><circle cx='3.75' cy='16' r='1.75' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M9 16.25h9' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='3.75' cy='10' r='1.75' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M9 10.25h9' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='3.75' cy='4' r='1.75' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M9 4.25h9' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-paragraph':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.471 9.06v9.44l1.759.5H8.713l1.758-.5V9.06H8.557c-2.106 0-4.307-.538-4.307-3.761 0-3.224 1.914-3.762 4.307-3.762h5.934V18.5l1.759.5h-3.518l1.76-.5V1.537h-4.02V9.06Z' fill='currentColor'/><path d='M10.471 18.5V9.06m0 9.44-1.758.5h3.517l-1.759-.5Zm0-16.963V9.06m0-7.523H8.557c-2.393 0-4.307.538-4.307 3.762 0 3.223 2.201 3.76 4.307 3.76h1.914m0-7.522h4.02m0 0V18.5m0-16.963c.367 0 1.101 0 1.651-.537m-1.65 17.5-1.76.5h3.518l-1.759-.5Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-accordion':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path opacity='0.99' fill='currentColor' fill-opacity='0.12' d='M1 13h18v6H1z'/><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='m13 3.75 1.517 1.5L16 3.75' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M4 4.5h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m13 11.5 1.517-1.5L16 11.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M4 10.75h4.5M4 14.5h8.5M4 16.75h5.5m-8-9h17' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-column':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='1' width='14' height='18' rx='1.5' stroke='currentColor' fill='none'/><rect x='5' y='3' width='10' height='4' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='5' y='8' width='10' height='4' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='5' y='13' width='10' height='4' rx='0.5' fill='currentColor' fill-opacity='0.5'/></svg>",
	'es-carousel':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 18 13V2.5A1.5 1.5 0 0 0 16.5 1h-13A1.5 1.5 0 0 0 2 2.5V13Z' stroke='currentColor' fill='none'/><path d='m2 12.5 2.92-2.696a1.5 1.5 0 0 1 2.099.062l.515.534a1.5 1.5 0 0 0 2.209-.052l2.244-2.564a1.5 1.5 0 0 1 2.253-.005L18 12.04' stroke='currentColor' fill='none'/><circle cx='6.5' cy='5.25' r='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><circle cx='5.25' cy='17.75' r='1.25' fill='currentColor' stroke='currentColor'/><circle cx='10.25' cy='17.75' r='1.25' stroke='currentColor' stroke-opacity='0.5' fill='none'/><circle cx='15.25' cy='17.75' r='1.25' stroke='currentColor' stroke-opacity='0.5' fill='none'/></svg>",
	'es-featured-categories':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M3.5 9h-1A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h5A1.5 1.5 0 0 1 9 2.5V4m-4 7H2.5A1.5 1.5 0 0 0 1 12.5v5A1.5 1.5 0 0 0 2.5 19h5A1.5 1.5 0 0 0 9 17.5V15m2-11V2.5A1.5 1.5 0 0 1 12.5 1h5A1.5 1.5 0 0 1 19 2.5v5A1.5 1.5 0 0 1 17.5 9h-1m-2 2h3a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5V15' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='m10 12.75-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L10 5.25l1.47 2.977 3.285.478-2.377 2.318.56 3.272L10 12.75Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-featured-posts':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m7.854 6.354 2.792 2.792c.227.227.354.534.354.854H7.5a.5.5 0 0 1-.5-.5V6c.32 0 .627.127.854.354Z' fill='currentColor' fill-opacity='0.3'/><path d='M7 6v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0M7 6H2.5A1.5 1.5 0 0 0 1 7.5v10A1.5 1.5 0 0 0 2.5 19h7M7 6v3.5a.5.5 0 0 0 .5.5H11m0 0v1' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='m11.854 1.354 2.792 2.792c.227.227.354.534.354.854h-3.5a.5.5 0 0 1-.5-.5V1c.32 0 .627.127.854.354Z' fill='currentColor' fill-opacity='0.3'/><path d='M15 8.5V5m-4-4v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4H6.5A1.5 1.5 0 0 0 5 2.5V6m6-5v3.5a.5.5 0 0 0 .5.5H15' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M3 12.5h4m-4 2h3m-3 2h4' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='m14 17.25-2.939 1.545.561-3.273-2.377-2.317 3.286-.478L14 9.75l1.47 2.977 3.285.478-2.377 2.318.56 3.272L14 17.25Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-video':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1.5' y='1' width='3.5' height='18' rx='0.5' fill='currentColor' fill-opacity='0.12'/><rect x='15' y='1' width='3.5' height='18' rx='0.5' fill='currentColor' fill-opacity='0.12'/><rect width='18' height='18' rx='1.5' transform='matrix(1 0 0 -1 1 19)' stroke='currentColor' fill='none'/><path d='M5 1.5v17M1 4h4M1 7h4m-4 3h4m-4 3h4m-4 3h4M15 4h4m-4 3h4m-4 3h4m-4 3h4m-4 3h4M15 1.5v17' stroke='currentColor' fill='none'/><path d='M8.5 12.398V7.602a.5.5 0 0 1 .83-.376l2.74 2.398a.5.5 0 0 1 0 .752l-2.74 2.398a.5.5 0 0 1-.83-.376Z' fill='currentColor'/></svg>",
	'es-button-block':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m16 13.5 2 2m0 0-2 2m2-2h-4m-10-2-2 2m0 0 2 2m-2-2h4' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='3.5' width='18' height='8' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M6 7.5h8' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-simple':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v10H2v-10Z' fill='currentColor' fill-opacity='0.3'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M4.5 14.5H10m-5.5 2h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-jumbotron':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1 1.5h18v10H1z'/><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M6 5.5h8M7.454 8h5.091' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='6' y='14' width='8' height='2' rx='1' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-modal':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='4' y='4.5' width='12' height='11' rx='1.5' stroke='currentColor' fill='none'/><path d='M4 7h12' stroke='currentColor' stroke-linecap='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M0 1.5A1.5 1.5 0 0 1 1.5 0h17A1.5 1.5 0 0 1 20 1.5v17a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 0 18.5v-17ZM3.25 6A2.25 2.25 0 0 1 5.5 3.75h9A2.25 2.25 0 0 1 16.75 6v8a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 3.25 14V6Z' fill='currentColor' fill-opacity='0.3'/></svg>",
	'es-map':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M1.5 3.5H3m1 0h1.5m1 0H8m1 0h1.5m1 0H13m1 0h1.5m1 0H18' stroke='currentColor' stroke-opacity='0.3' fill='none'/><rect x='10' y='9.5' width='4.5' height='5' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='5' y='10.5' width='4' height='5' rx='0.5' fill='currentColor' fill-opacity='0.5'/><path d='M15 16h-4.379a1.5 1.5 0 0 0-1.06.44l-.122.12a1.5 1.5 0 0 1-1.06.44H8m-4 0h4m0 0v1' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='square' fill='none'/><path d='M3 19v-6a5 5 0 0 1 5-5h8m3 0h-3m0 0v11' stroke='currentColor' fill='none'/><mask id='38803098-13cf-401f-9d18-5544c5335d70' fill='#fff'><path fill-rule='evenodd' clip-rule='evenodd' d='M12.25 12c.429 0 3-3.886 3-6.477 0-1.67-1.343-3.023-3-3.023s-3 1.353-3 3.023c0 2.59 2.571 6.477 3 6.477Zm0-5.398c.592 0 1.072-.483 1.072-1.08 0-.595-.48-1.079-1.072-1.079-.592 0-1.071.484-1.071 1.08 0 .596.48 1.08 1.071 1.08Z' fill='none'/></mask><path fill-rule='evenodd' clip-rule='evenodd' d='M12.25 12c.429 0 3-3.886 3-6.477 0-1.67-1.343-3.023-3-3.023s-3 1.353-3 3.023c0 2.59 2.571 6.477 3 6.477Zm0-5.398c.592 0 1.072-.483 1.072-1.08 0-.595-.48-1.079-1.072-1.079-.592 0-1.071.484-1.071 1.08 0 .596.48 1.08 1.071 1.08Z' fill='currentColor'/><path d='M14.25 5.523c0 1.036-.54 2.473-1.22 3.736a12.596 12.596 0 0 1-.933 1.496 3.682 3.682 0 0 1-.302.366c-.034.033-.035.03-.007.01a.66.66 0 0 1 .116-.062.882.882 0 0 1 .346-.069v2c.348 0 .598-.17.67-.22.113-.077.211-.167.29-.245.158-.16.326-.364.492-.586.335-.45.722-1.059 1.09-1.742.713-1.328 1.458-3.13 1.458-4.684h-2Zm-2-2.023c1.098 0 2 .898 2 2.023h2c0-2.215-1.784-4.023-4-4.023v2Zm-2 2.023a2.01 2.01 0 0 1 2-2.023v-2c-2.216 0-4 1.808-4 4.023h2Zm2 5.477c.167 0 .29.045.346.069a.66.66 0 0 1 .116.062c.028.02.027.023-.007-.01a3.554 3.554 0 0 1-.302-.366c-.268-.36-.604-.884-.933-1.496-.68-1.263-1.22-2.7-1.22-3.736h-2c0 1.554.745 3.356 1.459 4.684.367.683.754 1.292 1.09 1.742.165.222.333.427.492.586.078.078.176.168.289.245.072.05.322.22.67.22v-2Zm.072-5.477c0 .05-.04.08-.072.08v2a2.076 2.076 0 0 0 2.072-2.08h-2Zm-.072-.08c.033 0 .072.029.072.08h2c0-1.142-.92-2.08-2.072-2.08v2Zm-.071.08c0-.051.039-.08.071-.08v-2a2.075 2.075 0 0 0-2.071 2.08h2Zm.071.08c-.032 0-.071-.03-.071-.08h-2c0 1.141.92 2.08 2.071 2.08v-2Z' fill='currentColor' mask='url(#38803098-13cf-401f-9d18-5544c5335d70)'/></svg>",
	'es-tabs':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h15A1.5 1.5 0 0 1 19 3.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 16.5v-13Z' stroke='currentColor' fill='none'/><path d='M19 5.5h-5.5M8 2v2.5a1 1 0 0 0 1 1h4.5m0 0V2' stroke='currentColor' fill='none'/><path d='M3.25 4h2.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4.5 8.5h7m-7 2h5m-5 2h4m-4 2h3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-audio':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 11.75v-3.5a.75.75 0 0 1 .75-.75h3.078a.5.5 0 0 0 .307-.105l3.558-2.767a.5.5 0 0 1 .807.394v9.956a.5.5 0 0 1-.807.394l-3.558-2.767a.5.5 0 0 0-.307-.105H1.75a.75.75 0 0 1-.75-.75Z' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='M12.089 12.59a5.48 5.48 0 0 0 .41-2.09c0-1-.266-1.936-.731-2.744m2.447-1.455a7.465 7.465 0 0 1 1.284 4.199c0 1.304-.332 2.53-.917 3.598m2.081-9.214A9.457 9.457 0 0 1 18.5 10.5a9.456 9.456 0 0 1-1.465 5.07' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-image-text':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='11.5' y='6' width='8' height='8' rx='1' fill='currentColor' fill-opacity='0.12'/><path d='M13 8h5m-5 2h4m-4 2h3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M2.5 4.5h6A1.5 1.5 0 0 1 10 6v8a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 1 14V6a1.5 1.5 0 0 1 1.5-1.5Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='m2.49 12.047-1.142 1.241a1.319 1.319 0 0 0 .97 2.212H8.5A1.5 1.5 0 0 0 10 14v-.162a1.5 1.5 0 0 0-.303-.904l-1.24-1.643a1.5 1.5 0 0 0-2.401.01l-.562.754a.973.973 0 0 1-1.534.035.973.973 0 0 0-1.47-.043Z' fill='currentColor' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><circle cx='4' cy='7.75' r='1' fill='currentColor' stroke='currentColor'/></svg>",
	'es-gallery':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m7.7 14.572-2.072 1.48A1.5 1.5 0 0 0 5 17.271v.228A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-.826a1.5 1.5 0 0 0-.503-1.121l-2.94-2.613A1.5 1.5 0 0 0 13.5 13l-1.672 1.672a1.5 1.5 0 0 1-1.832.225l-.653-.391a1.5 1.5 0 0 0-1.643.066Z' fill='currentColor'/><path d='M2 15a1 1 0 0 1-1-1V2.5A1.5 1.5 0 0 1 2.5 1H14a1 1 0 0 1 1 1' stroke='currentColor' fill='none'/><path d='M4 17a1 1 0 0 1-1-1V4.5A1.5 1.5 0 0 1 4.5 3H16a1 1 0 0 1 1 1' stroke='currentColor' fill='none'/><path d='M5 17.5A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17.5 5h-11A1.5 1.5 0 0 0 5 6.5v11Z' fill='currentColor' fill-opacity='0.12'/><path d='m5 16.667 2.443-2.172a1.5 1.5 0 0 1 2.057.06l.221.222a1.5 1.5 0 0 0 2.17-.052l1.726-1.898a1.5 1.5 0 0 1 2.216-.005L19 16.278M6.5 5h11A1.5 1.5 0 0 1 19 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5v-11A1.5 1.5 0 0 1 6.5 5Z' stroke='currentColor' fill='none'/><circle cx='9.5' cy='9.5' r='1.5' fill='currentColor' stroke='currentColor'/></svg>",
	'es-example':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='2' width='18' height='16' rx='2.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M7 10a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' stroke='currentColor' fill='none'/><path d='M13.25 15V7.5m0 0-2 2.625m2-2.625 2.25 2.625' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-card-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.5 1.5h11v8h-11v-8Z' fill='currentColor' fill-opacity='0.12'/><path d='M3.98 7.063 2 9.5h12v-.01a1.5 1.5 0 0 0-.25-.828l-2.16-3.265a1.5 1.5 0 0 0-2.505.005L7.987 7.073a1.24 1.24 0 0 1-2.04.046 1.24 1.24 0 0 0-1.967-.056Z' fill='currentColor'/><rect x='2' y='1' width='12' height='14' rx='1.5' stroke='currentColor' fill='none'/><path d='M15 3a1 1 0 0 1 1 1v11.5a1.5 1.5 0 0 1-1.5 1.5H5a1 1 0 0 1-1-1' stroke='currentColor' fill='none'/><path d='M17 5a1 1 0 0 1 1 1v11.5a1.5 1.5 0 0 1-1.5 1.5H7a1 1 0 0 1-1-1' stroke='currentColor' fill='none'/><circle cx='5.5' cy='4' r='1' fill='currentColor'/><path d='M4 11.25h4m-4 1.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-counter-card':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h11A1.5 1.5 0 0 1 17 2.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 10.5v-8Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M7.25 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm5.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3 10h-.5A1.5 1.5 0 0 0 1 11.5v6A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H17' stroke='currentColor' fill='none'/><path d='M6.5 14.5H13m-5.5 1.75h4' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-video-text':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='11.5' y='6' width='8' height='8' rx='1' fill='currentColor' fill-opacity='0.12'/><path d='M13 8h5m-5 2h4m-4 2h3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M2.5 4.5h6A1.5 1.5 0 0 1 10 6v8a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 1 14V6a1.5 1.5 0 0 1 1.5-1.5Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path fill-rule='evenodd' clip-rule='evenodd' d='m7.25 10-3 2V8l3 2Z' fill='currentColor' stroke='currentColor' stroke-width='1.5' stroke-linejoin='round'/></svg>",
	'es-team-member':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 19c.46-2.397 1.368-4.154 2.724-5.27C6.08 12.614 7.839 12.037 10 12c2.161.037 3.92.614 5.276 1.73C16.632 14.846 17.54 16.603 18 19' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='10' cy='6.5' r='5.5' stroke='currentColor' fill='none'/></svg>",
	'es-timeline-item':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.75 1v1m0 17V7' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M1.75 8.5h2m-2 2.5h2m-2 3h2m-2 4h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><circle cx='2.75' cy='4.5' r='1.5' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/><rect x='8.25' y='3.5' width='8' height='2' rx='0.5' fill='currentColor'/><path d='M8.75 7.5h6m-6 2h4m-4 2h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4.25 4.5h2m0 0V3a1.5 1.5 0 0 1 1.5-1.5h9.5a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-9.5a1.5 1.5 0 0 1-1.5-1.5v-8Z' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-simple-cta':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='9.5' width='18' height='8' rx='1.5' fill='currentColor' fill-opacity='0.12'/><path d='M9.5 9.5h-7A1.5 1.5 0 0 0 1 11v5a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 16v-5a1.5 1.5 0 0 0-1.5-1.5v0M6 13.5h8' stroke='currentColor' stroke-linecap='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12.674 1.87a1 1 0 0 1 1.653 0l.38.558a1 1 0 0 0 .902.435l.673-.051a1 1 0 0 1 1.031 1.292l-.2.645a1 1 0 0 0 .224.976l.46.495a1 1 0 0 1-.369 1.612l-.628.246a1 1 0 0 0-.625.783l-.1.667a1 1 0 0 1-1.49.718l-.584-.338a1 1 0 0 0-1 0l-.585.338a1 1 0 0 1-1.49-.718l-.1-.667a1 1 0 0 0-.624-.783l-.629-.246a1 1 0 0 1-.368-1.612l.46-.495a1 1 0 0 0 .223-.976l-.2-.645a1 1 0 0 1 1.031-1.292l.673.05a1 1 0 0 0 .902-.434l.38-.558Zm.827 1.545a.5.5 0 0 1 .5.5v1.9a.5.5 0 0 1-1 0v-1.9a.5.5 0 0 1 .5-.5Zm0 4.845a.543.543 0 1 0 0-1.086.543.543 0 0 0 0 1.086Z' fill='currentColor'/></svg>",
	'es-video-button':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M17.5 14.5h-15A1.5 1.5 0 0 1 1 13V7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 19 7v6a1.5 1.5 0 0 1-1.5 1.5Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round'/><path fill-rule='evenodd' clip-rule='evenodd' d='m12 10-3 2V8l3 2Z' fill='currentColor' stroke='currentColor' stroke-width='1.5' stroke-linejoin='round'/></svg>",
	'es-featured-categories-posts':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='7' width='4' height='4' rx='1' stroke='currentColor' fill='none'/><path d='M8.5 11H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v0' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='1' y='1' width='4' height='4' rx='1' stroke='currentColor' fill='none'/><rect x='7' y='1' width='4' height='4' rx='1' stroke='currentColor' fill='none'/><path d='m6.854 13.354 2.792 2.792c.227.227.354.534.354.854H6.5a.5.5 0 0 1-.5-.5V13c.32 0 .627.127.854.354Z' fill='currentColor' fill-opacity='0.3'/><path d='M6 13v0c.32 0 .627.127.854.354l2.792 2.792c.227.227.354.534.354.854v0m-4-4H2.5A1.5 1.5 0 0 0 1 14.5v5M6 13v3.5a.5.5 0 0 0 .5.5H10m0 0v2.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='m14.5 14-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L14.5 6.5l1.47 2.977 3.285.478-2.377 2.318.56 3.272L14.5 14Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-shortcode':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' fill='currentColor' fill-opacity='0.12'/><path d='M7.25 4.5H5.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1.75m5.5-11h1.75a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1.75' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-email':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M18.5 4.5h-17l8.5 6 8.5-6Z' fill='currentColor' fill-opacity='0.3'/><rect x='1' y='4' width='18' height='12' rx='1.5' stroke='currentColor' fill='none'/><path d='m1.5 4.5 7.589 5.803a1.5 1.5 0 0 0 1.822 0L18.5 4.5m-17 11 5.687-6.651M18.5 15.5l-5.687-6.651' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-card-buttons':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M4.5 4.5H12m-7.5 2H10m-5.5 2H8' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M1 11.5h18V18a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6.5Z' fill='currentColor' fill-opacity='0.12'/><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><rect x='11.5' y='14' width='4.5' height='2' rx='0.5' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/><rect x='4' y='14' width='4.5' height='2' rx='0.5' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-card-person':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5 15.5h10M7 18h6' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='10.25' cy='7.25' r='5.75' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M13.75 11.313c-.201-1.05-.598-1.818-1.192-2.306a3.03 3.03 0 0 0-.576-.373c-1.294.991-2.982.428-3.464 0-.208.103-.4.228-.576.373-.594.488-.99 1.257-1.192 2.306v.562L10.125 13l3.625-.97v-.717Z' fill='currentColor'/><circle cx='10.25' cy='6.125' r='2.40625' fill='currentColor'/></svg>",
	'es-card-bottom-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 7.5h16v11H2v-11Z' fill='currentColor' fill-opacity='0.12'/><path d='M4.834 15.448 2 18.5h16v-.035a1.5 1.5 0 0 0-.304-.905l-3.384-4.472a1.5 1.5 0 0 0-2.396.004L9.81 15.9a1.5 1.5 0 0 1-2.356.055l-.364-.44a1.5 1.5 0 0 0-2.256-.066Z' fill='currentColor'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><circle cx='6.5' cy='11' r='1.5' fill='currentColor'/><path d='M4.5 3.5H10m-5.5 2h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-number':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v10H2v-10Z' fill='currentColor' fill-opacity='0.12'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M4.5 14.5H10m-5.5 2h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M7.5 7.25a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z' stroke='currentColor' fill='none'/></svg>",
	'es-card-comparison':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><path d='M4 11.5h4' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4 13.5h4' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4 15.25h4m4 0h4' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path d='M12 13.5h4' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M12 11.5h4' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='6.25' cy='6.5' r='2' fill='currentColor' stroke='currentColor' stroke-width='1.5'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12.25 8h4l-2-3.5-2 3.5Z' fill='currentColor' stroke='currentColor' stroke-width='1.5' stroke-linejoin='round'/></svg>",
	'es-card-featured':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v10H2v-10Z' fill='currentColor' fill-opacity='0.12'/><path fill-rule='evenodd' clip-rule='evenodd' d='m10 9.5-2.351 1.236.449-2.618-1.902-1.854 2.628-.382L10 3.5l1.176 2.382 2.628.382-1.902 1.854.45 2.618L10 9.5Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M4.5 14.5H10m-5.5 2h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-review':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v8H2v-8Z' fill='currentColor' fill-opacity='0.12'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M6.75 12.5h6.5m-6 2h5.5m-5 2h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M8.055 8.5c.408 0 .751-.116 1.029-.347.277-.231.416-.525.416-.882 0-.362-.139-.665-.416-.907A1.387 1.387 0 0 0 8.146 6h-.128c.025-.329.131-.602.32-.82a2.46 2.46 0 0 1 .769-.568.564.564 0 0 0 .347-.543.54.54 0 0 0-.169-.406.612.612 0 0 0-.444-.163c-.292 0-.626.14-1.001.422-.375.282-.692.664-.951 1.146-.26.482-.389.999-.389 1.55 0 .603.148 1.067.444 1.393.295.326.666.489 1.11.489Zm3.5 0c.408 0 .751-.116 1.029-.347.277-.231.416-.525.416-.882 0-.362-.139-.665-.416-.907A1.387 1.387 0 0 0 11.646 6h-.128c.025-.329.131-.602.32-.82.19-.217.446-.406.769-.568a.564.564 0 0 0 .347-.543.54.54 0 0 0-.169-.406.613.613 0 0 0-.444-.163c-.292 0-.626.14-1.001.422-.375.282-.692.664-.951 1.146-.26.482-.389.999-.389 1.55 0 .603.148 1.067.444 1.393.295.326.666.489 1.11.489Z' fill='currentColor'/></svg>",
	'es-grid':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' stroke-opacity='0.5' fill='none'/><path d='M19 13H1m6 6V1m6 18V7m0 0V1m0 6h6m-6 0H1' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-grid-item':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M19 13h-6m0 0H7m6 0v6m0-6V7m-6 6H1m6 0v6m0-6V7m0 0V1m0 6h6M7 7H1m12 0V1m0 6h6M2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19Z' stroke='currentColor' stroke-opacity='0.5' fill='none'/><rect x='8' y='8' width='10' height='10' rx='1' fill='currentColor'/></svg>",
	'es-social-share':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><g clip-path='url(#e2f678fb-cc9c-44f3-8478-d5e89c4765c9)' stroke='currentColor' stroke-linecap='round'><path d='M13 4.5c-6.4.4-8 5.5-8 8 2-2.4 6.167-3.333 8-3.5v4l6-6-6-6v3.5Z' fill='currentColor' fill-opacity='0.3' stroke-linejoin='round'/><path d='M8.5 3h-6A1.5 1.5 0 0 0 1 4.5v13A1.5 1.5 0 0 0 2.5 19h13a1.5 1.5 0 0 0 1.5-1.5v-4' fill='none'/></g><defs><clipPath id='e2f678fb-cc9c-44f3-8478-d5e89c4765c9'><path fill='#fff' d='M0 0h20v20H0z'/></clipPath></defs></svg>",
	'es-language-switcher':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='10' height='10' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M13.5 9h4a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 17.5v-4' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m4 8.5 1.765-4.854a.25.25 0 0 1 .47 0L8 8.5M5 7h2m5.5 5.25h2.75c.138 0 .25.113.224.248-.079.422-.352 1.058-.974 1.778M12 16.25c1.161-.664 1.961-1.35 2.5-1.974m0 0L16 16.25' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M13.5 3.5c1 0 3 .6 3 3m-10 10c-1 0-3-.6-3-3' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='4' width='18' height='12' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M5 9.5h7m-7 2.25h3.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-tab':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.5 18h15a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H9a1 1 0 0 1-1-1v-1A1.5 1.5 0 0 0 6.5 2h-4A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18Z' stroke='currentColor' fill='none'/><path d='M13.5 5.5V2m0 0H6m7.5 0h4A1.5 1.5 0 0 1 19 3.5v4' stroke='currentColor' stroke-opacity='0.5' fill='none'/><path d='M3.25 4h2.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4.5 8.5h7m-7 2h5m-5 2h4m-4 2h3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-tab-content':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.5 18h15a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H9a1 1 0 0 1-1-1v-1A1.5 1.5 0 0 0 6.5 2h-4A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18Z' stroke='currentColor' stroke-opacity='0.3' fill='none'/><path d='M3.25 4h2.5' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path d='M4.5 8.5h7m-7 2h5m-5 2h4m-4 2h3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-person-profile':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12 7.25h2m-2 4h1.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M12 8.75h4m-4 4h3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='4' width='18' height='12' rx='1.5' stroke='currentColor' fill='none'/><path d='M3.25 13.5c.172-.899.513-1.558 1.021-1.976.51-.419 1.169-.635 1.979-.649.81.014 1.47.23 1.979.649.508.418.849 1.077 1.021 1.976' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='6.25' cy='8.8125' r='2.0625' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/></svg>",
	'es-footnotes':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.3 1h.014a1.5 1.5 0 0 1 1.078.457l3.686 3.806c.27.28.422.654.422 1.043v.065M10.3 1H4a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 4 19h10a1.5 1.5 0 0 0 1.5-1.5v-.136M10.3 1v4.87a.5.5 0 0 0 .5.5h4.7m0 0V10' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M5 4h2.5M5 6.5h3M5 9h5m-5 2.5h7' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M3.5 13H3v1h.5v-1Zm9 1a.5.5 0 0 0 0-1v1Zm-9 0h9v-1h-9v1Z' fill='currentColor' fill-opacity='0.12'/><rect x='4.5' y='15' width='7' height='2.5' rx='0.5' fill='currentColor'/><path d='M14.3 11.5H17a1.5 1.5 0 0 1 1.5 1.5v1.389a1.5 1.5 0 0 1-1.5 1.5h-4.5m0 0 1.2-1.111m-1.2 1.11L13.7 17' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-media':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5.75 10.95v-2.4a.25.25 0 0 1 .415-.187l1.37 1.199a.25.25 0 0 1 0 .376l-1.37 1.2a.25.25 0 0 1-.415-.189Z' fill='currentColor'/><path d='M9 8.5a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 19 8.5v-6A1.5 1.5 0 0 0 17.5 1h-7A1.5 1.5 0 0 0 9 2.5v6Z' fill='currentColor' fill-opacity='0.12'/><path d='m9 8.333 1.666-1.48a1.183 1.183 0 0 1 1.623.047c.478.478 1.258.46 1.713-.04l.837-.922a1.5 1.5 0 0 1 2.216-.005L19 8.056M10.5 1h7A1.5 1.5 0 0 1 19 2.5v6a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 8.5v-6A1.5 1.5 0 0 1 10.5 1Z' stroke='currentColor' fill='none'/><circle cx='12' cy='3.75' r='1' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><rect width='11' height='7' rx='1.5' transform='matrix(1 0 0 -1 8 19)' stroke='currentColor' fill='none'/><path d='M13 17c.333.167 1 .7 1 1.5.167-.5.2-1.6 1-2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='16.5' cy='15' r='1' fill='currentColor'/><circle cx='10.25' cy='15' r='0.75' fill='currentColor' fill-opacity='0.12'/><circle cx='11.625' cy='16' r='0.75' fill='currentColor' fill-opacity='0.3'/><path d='M6 16H2.5A1.5 1.5 0 0 1 1 14.5v-9A1.5 1.5 0 0 1 2.5 4H7' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4 4.5v11M1 7h3m-3 3h3m-3 3h3' stroke='currentColor' fill='none'/><path fill='currentColor' fill-opacity='0.12' d='M1.5 4.5h2v11h-2z'/></svg>",
	'es-list-item':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><circle cx='3.75' cy='16' r='1.75' stroke='currentColor' stroke-opacity='0.3' fill='none'/><path d='M9 16.25h9' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><circle cx='3.75' cy='10' r='1.75' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/><path d='M9 10.25h9' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='3.75' cy='4' r='1.75' stroke='currentColor' stroke-opacity='0.3' fill='none'/><path d='M9 4.25h9' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-code':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><rect x='3' y='4' width='8' height='1' rx='0.5' fill='currentColor' fill-opacity='0.3'/><rect x='3' y='6' width='5' height='1' rx='0.5' fill='currentColor' fill-opacity='0.3'/><rect x='3' y='8' width='4' height='1' rx='0.5' fill='currentColor' fill-opacity='0.3'/><rect x='3' y='10' width='3' height='1' rx='0.5' fill='currentColor' fill-opacity='0.12'/><path d='m7.76 10.75-2.285 1.863a.5.5 0 0 0 0 .774L7.76 15.25m6.24-4.5 2.285 1.863a.5.5 0 0 1 0 .774L14 15.25M11.59 10l-1.84 6' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-prev-next':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='5' width='8' height='10' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='m5 8-2 2m0 0 2 2m-2-2h4m8-2 2 2m0 0-2 2m2-2h-4' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='11' y='5' width='8' height='10' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/></svg>",
	'es-accordion-item':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1Z' stroke='currentColor' stroke-opacity='0.5' fill='none'/><path d='M18 6.75H2a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4.5a1 1 0 0 0-1-1Z' stroke='currentColor' fill='none'/><path d='m13 3.25 1.517 1.5L16 3.25M13 15.5l1.517 1.5L16 15.5' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M4 4h4.5M4 16h4.5' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path d='m13 9.5 1.517 1.5L16 9.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M4 10.25h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-price-card':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h13A1.5 1.5 0 0 1 18 2.5v10H2v-10Z' fill='currentColor' fill-opacity='0.12'/><rect x='2' y='1' width='16' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M4.5 14.5H10m-5.5 2h3m4.858-12.2c-.528-.5-1.205-.8-1.944-.8-1.688 0-3.056 1.567-3.056 3.5s1.368 3.5 3.056 3.5c.739 0 1.416-.3 1.944-.8' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M6.608 6h3M6.5 7.75h2.75' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-toggle':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='5' width='18' height='10' rx='5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><rect x='11.5' y='7.5' width='5' height='5' rx='2.5' fill='currentColor' stroke='currentColor'/></svg>",
	'es-card-vertical-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M2.49 11.37 1 13v3.5A1.5 1.5 0 0 0 2.5 18H10v-5c0-.2-.064-.394-.184-.555l-1.358-1.823a1.5 1.5 0 0 0-2.41.005l-.554.75a.97.97 0 0 1-1.534.035.97.97 0 0 0-1.47-.042Z' fill='currentColor'/><path d='M10 2v16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><circle cx='4.5' cy='6.5' r='1' fill='currentColor' stroke='currentColor'/><path d='M12.5 5h2' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.5 15h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M12.5 7h4' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-accented-info':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='3.75' width='18' height='12.5' rx='1.5' stroke='currentColor' fill='none'/><rect x='3.75' y='6.5' width='4' height='5' rx='1' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/><rect x='9.5' y='6.5' width='7' height='2' rx='0.5' fill='currentColor'/><path d='M10 10.5h4.5M10 12h3.5M10 13.5h2.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-hero-special-1':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'><rect x='3' y='14.25' width='3.5' height='2' rx='0.5' fill='currentColor'/><path d='M11.49 9.37 10 11v1.5a.5.5 0 0 0 .5.5H19v-2c0-.2-.064-.394-.184-.555l-1.358-1.823a1.5 1.5 0 0 0-2.41.005l-.554.75a.97.97 0 0 1-1.534.035.97.97 0 0 0-1.47-.042Z' fill='currentColor'/><circle cx='13.25' cy='5.75' r='0.75' fill='currentColor' stroke='currentColor'/><mask id='3366e933-4949-4714-b261-48010b9e1b16' fill='#fff'><rect x='7.5' y='14.25' width='3.5' height='2' rx='0.5' fill='none'/></mask><rect x='7.5' y='14.25' width='3.5' height='2' rx='0.5' stroke='currentColor' stroke-opacity='0.5' stroke-width='2' mask='url(#3366e933-4949-4714-b261-48010b9e1b16)' fill='none'/><path d='M3.5 4.75h4m-4 1.5H7' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M3.5 8.25h3m-3 1.5h3' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M10 2.25h9v11h-7.5a1.5 1.5 0 0 1-1.5-1.5v-9.5Z' fill='currentColor' fill-opacity='0.12'/><path d='M19 12.75h-8a1 1 0 0 1-1-1v-9.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='2.25' width='18' height='15.5' rx='1.5' stroke='currentColor' fill='none'/></svg>",
	'es-stats':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5 15.5h10M7 18h6' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M6.125 7.25a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Zm0 0a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Zm7.75 0a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Zm0 0a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Z' stroke='currentColor' fill='none'/></svg>",
	'es-stats-with-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v8H1v-8Z' fill='currentColor' fill-opacity='0.12'/><path d='M4.4 7.245 1 10.5h18c0-.348-.124-.684-.349-.948l-4.004-4.704a1.5 1.5 0 0 0-2.289.004L9.593 8.13a1.5 1.5 0 0 1-2.246.053l-.81-.874A1.5 1.5 0 0 0 4.4 7.245Z' fill='currentColor'/><circle cx='5' cy='4' r='1.5' fill='currentColor'/><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M12.5 13h4m-4 1.5h3m-3 1.5h2' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4.75 14.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm0 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm4 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm0 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z' stroke='currentColor' fill='none'/></svg>",
	'es-lottie':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path stroke='currentColor' d='M1 16h18V4H1zm3 3v-3m3 3v-3m3 3v-3m3 3v-3m3 3v-3M4 4V1m3 3V1m3 3V1m3 3V1m3 3V1' fill='none'/><rect width='18' height='18' rx='1.5' transform='matrix(1 0 0 -1 1 19)' stroke='currentColor' fill='none'/><path d='M10 11c-.833.333-2.5 2.6-2.5 5 0-1.348-.374-3.41-.911-4.23' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='14' cy='9' r='2' fill='currentColor' stroke='currentColor'/><circle cx='3.5' cy='9.5' r='0.75' fill='currentColor'/><circle cx='5.2002' cy='10.35' r='0.75' fill='currentColor'/></svg>",
	'es-fifty-fifty-text':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M3.5 5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M10 2v16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><path d='M12.5 5h4m-4 1.75H15M12.5 8.5h2' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-fifty-fifty-img-text':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M2.49 11.37 1 13v3.5A1.5 1.5 0 0 0 2.5 18H10v-5c0-.2-.064-.394-.184-.555l-1.358-1.823a1.5 1.5 0 0 0-2.41.005l-.554.75a.97.97 0 0 1-1.534.035.97.97 0 0 0-1.47-.042Z' fill='currentColor'/><path d='M10 2v16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><circle cx='4.5' cy='6.5' r='1' fill='currentColor' stroke='currentColor'/><path d='M12.5 5h4m-4 1.75H16M12.5 8.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-fifty-fifty-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M3.5 4.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M10 2v16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='1.5' width='18' height='17' rx='1.5' stroke='currentColor' fill='none'/><path d='M14 4.5h2.5M14 6.25h2.5M14 8h2.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><circle cx='12.25' cy='4.5' r='0.5' fill='currentColor'/><circle cx='12.25' cy='6.25' r='0.5' fill='currentColor'/><circle cx='12.25' cy='8' r='0.5' fill='currentColor'/></svg>",
	'es-fifty-fifty-img-text-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.5 8.25h4m-4 1.75H16m-3.5 1.75h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-13Z' stroke='currentColor' fill='none'/><path d='M1 4.5h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H1v-11Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='m2.49 12.047-1.142 1.241a1.319 1.319 0 0 0 .97 2.212H8.5A1.5 1.5 0 0 0 10 14v-.162a1.5 1.5 0 0 0-.303-.904l-1.24-1.643a1.5 1.5 0 0 0-2.401.01l-.562.754a.973.973 0 0 1-1.534.035.973.973 0 0 0-1.47-.043Z' fill='currentColor' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><circle cx='4' cy='7.75' r='1' fill='currentColor' stroke='currentColor'/></svg>",
	'es-blog-content':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v14A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-14Z' stroke='currentColor' fill='none'/><path d='M6.75 15.75A.75.75 0 0 1 7.5 15h6a.75.75 0 0 1 .75.75V19h-7.5v-3.25Z' fill='currentColor' fill-opacity='0.5'/><path d='M7.5 9.25h6m-6-3h6m-6-1.75h5m-5 6.5h5m-5 1.75h6' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-divider':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M19 1v5.5A1.5 1.5 0 0 1 17.5 8h-15A1.5 1.5 0 0 1 1 6.5V1m18 18v-5.5a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 13.5V19' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M18.5 19h-17v-5.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1V19Zm0-18h-17v5.5a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V1Z' fill='currentColor' fill-opacity='0.12'/><path d='M1 10h18' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-table':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M1.5 1.5h17v3h-17z'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M1 5h18M7.125 1v18m6-18v18M1 8.5h18M1 12h18M1 15.5h18' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-column-chart':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.5 19H19M1 17.5V1' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='2.5' y='4.5' width='3' height='13' rx='1' fill='currentColor' fill-opacity='0.5'/><rect x='6.5' y='7.5' width='3' height='10' rx='1' fill='currentColor' fill-opacity='0.3'/><rect x='10.5' y='9.5' width='3' height='8' rx='1' fill='currentColor' fill-opacity='0.5'/><rect x='14.5' y='2.5' width='3' height='15' rx='1' fill='currentColor' fill-opacity='0.3'/></svg>",
	'es-highlighted-text':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M3 5.5 16 3 3.5 11l13.5-.5L6 17' stroke='currentColor' stroke-opacity='0.3' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M4.375 17.5H2.5l1.875-.234m0 .234H6.25l-1.875-.234m0 .234v-.234m11.25.234H13.75l1.875-.234m0 .234H17.5l-1.875-.234m0 .234v-.234m-11.25 0 2.085-5.391m9.165 5.39-1.907-5.39m-7.258 0L10.25 2.5l3.468 9.375m-7.258 0h7.258' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-job-locations':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M16.325 18.782C17.298 17.656 19 15.385 19 13.266 19 11.462 17.506 10 15.662 10c-1.843 0-3.338 1.462-3.338 3.266 0 2.12 1.702 4.39 2.675 5.516a.866.866 0 0 0 1.326 0ZM15.66 15a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z' fill='currentColor'/><path d='m16.325 18.782.378.327-.378-.327Zm-1.326 0-.378.327.378-.327Zm3.5-5.516c0 .935-.378 1.944-.907 2.886a14.544 14.544 0 0 1-1.645 2.303l.756.654a15.552 15.552 0 0 0 1.76-2.467c.566-1.006 1.037-2.192 1.037-3.376h-1ZM15.663 10.5c1.578 0 2.838 1.248 2.838 2.766h1c0-2.09-1.729-3.766-3.838-3.766v1Zm-2.838 2.766c0-1.518 1.26-2.766 2.838-2.766v-1c-2.11 0-3.838 1.676-3.838 3.766h1Zm2.553 5.189c-.474-.549-1.12-1.37-1.644-2.303-.53-.942-.909-1.95-.909-2.886h-1c0 1.184.472 2.37 1.037 3.376a15.552 15.552 0 0 0 1.76 2.467l.756-.654Zm.57 0a.367.367 0 0 1-.57 0l-.756.654a1.366 1.366 0 0 0 2.082 0l-.756-.654Zm.963-5.205c0 .69-.56 1.25-1.25 1.25v1a2.25 2.25 0 0 0 2.25-2.25h-1ZM15.66 12c.69 0 1.25.56 1.25 1.25h1A2.25 2.25 0 0 0 15.66 11v1Zm-1.25 1.25c0-.69.56-1.25 1.25-1.25v-1a2.25 2.25 0 0 0-2.25 2.25h1Zm1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1a2.25 2.25 0 0 0 2.25 2.25v-1Z' fill='currentColor'/><path fill='currentColor' fill-opacity='0.3' d='M1.5 4h12v3h-12z'/><path d='M5.333 3.654H2.5a1.5 1.5 0 0 0-1.5 1.5v2.195m4.333-3.695V1.75a.75.75 0 0 1 .75-.75h2.834a.75.75 0 0 1 .75.75v1.904m-4.334 0h4.334m0 0H12.5a1.5 1.5 0 0 1 1.5 1.5v2.195m-13 0V12.5A1.5 1.5 0 0 0 2.5 14h8.546M1 7.349h6.5m6.5 0H7.5m6.5 0V9M7.5 7.349v-.665m0 .665v.665' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-marquee':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect opacity='0.6' x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m2.77 5.5.483-.13a.5.5 0 0 0-.966 0l.483.13Zm1.935 9.13a.5.5 0 0 0 .966-.26l-.966.26Zm-.342-3.2.483-.13-.483.13Zm-2.39-.5h-.5v1h.5v-1Zm.314-5.3 1.593 5.93.966-.26-1.593-5.93-.966.26Zm1.593 5.93.825 3.07.966-.26-.825-3.07-.966.26ZM2.457 8.594l.796-2.965-.966-.26-.796 2.965.966.26Zm-.483 3.335h2.39v-1h-2.39v1Z' fill='currentColor'/><path d='M9.419 10H7m2.418 0 .386-.3a1.5 1.5 0 0 0 .581-1.185V7a1.5 1.5 0 0 0-1.5-1.5H7.001V10m2.418 0 .386.3a1.5 1.5 0 0 1 .581 1.185V13a1.5 1.5 0 0 1-1.5 1.5H7.001V10m8.249 4.5h-1.075a1.926 1.926 0 0 1-1.503-.723v0a1.926 1.926 0 0 1-.422-1.202v-5.15c0-.437.149-.861.422-1.202v0a1.925 1.925 0 0 1 1.503-.723h1.075' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M17.493 14.582a.5.5 0 1 1-.986-.164l.986.164Zm.016-3.135-.494-.082.494.082Zm-.002-3.03a.5.5 0 0 1 .986.165l-.986-.164Zm.493 2.53h.5v1H18v-1Zm.002.583-.509 3.052-.986-.164.508-3.053.987.165Zm.491-2.948-.491 2.948-.986-.165.49-2.947.987.164ZM18 11.947h-.491v-1H18v1Z' fill='currentColor'/></svg>",
	'es-masonry':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='4.5' height='4.5' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linecap='round'/><rect x='7.75' y='10' width='4.5' height='5' rx='1.5' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='14.75' y='9' width='4.5' height='5' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linecap='round'/><path d='M19.25 19v-1.5a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5V19m-2.5 0v-.5a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v.5M5.5 19v-.5A1.5 1.5 0 0 0 4 17H2.5A1.5 1.5 0 0 0 1 18.5v.5' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='1' y='7.5' width='4.5' height='7.5' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round'/><rect x='14.75' y='1' width='4.5' height='6' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round'/><rect x='7.75' y='1' width='4.5' height='7' rx='1.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-multicolumn-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 1h6M1 14h6m6-13h6' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.8' d='M1 4h5.5M1 17h4.5M13 4h3.5M1 6h5M1 19h5m7-13h5.5M1 8h4m8 0h5m-5 2h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-side-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10 2h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8V2Z' fill='currentColor' fill-opacity='0.12'/><path d='M11.49 11.87 10 13.5v5h7.5A1.5 1.5 0 0 0 19 17v-3.5c0-.2-.064-.394-.184-.555l-1.358-1.823a1.5 1.5 0 0 0-2.41.005l-.554.75a.97.97 0 0 1-1.534.035.97.97 0 0 0-1.47-.042Z' fill='currentColor'/><circle cx='13.5' cy='6' r='1' fill='currentColor' stroke='currentColor'/><path d='M19 3a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 3v14a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17V3Zm-9-1v16' stroke='currentColor' fill='none'/><path d='M3.75 9h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.6' d='M3.75 6h2' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.75 11h2m-2 2h1' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-button-scroll':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M14 5.5c-1.807 0-3.5 2.5-3.5 3.5h-9V1.5H14v4Z' fill='currentColor' fill-opacity='0.3'/><path d='M10 9H2.5A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h10A1.5 1.5 0 0 1 14 2.5V5M4.611 5h5.778' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='12' y='7' width='7' height='12' rx='3.5' stroke='currentColor' fill='none'/><path d='M14.75 10.75a.75.75 0 0 1 1.5 0v1a.75.75 0 0 1-1.5 0v-1Z' fill='currentColor'/></svg>",
	'es-horizontal-carousel':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='5.5' y='4' width='9' height='12' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M20 4h-1a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 19 16h1M0 4h1a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 1 16H0' stroke='currentColor' fill='none'/></svg>",
	'es-vertical-carousel':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='16.5' y='5.5' width='9' height='13' rx='1.5' transform='rotate(90 16.5 5.5)' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M16.5 20v-1a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 19v1m13-20v1A1.5 1.5 0 0 1 15 2.5H5A1.5 1.5 0 0 1 3.5 1V0' stroke='currentColor' fill='none'/></svg>",
	'es-horizontal-carousel-auto':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path opacity='0.6' d='M2 18v-4a.5.5 0 0 1 .8-.4l2.667 2a.5.5 0 0 1 0 .8l-2.667 2A.5.5 0 0 1 2 18Z' fill='currentColor'/><path opacity='0.8' d='M8 18v-4a.5.5 0 0 1 .8-.4l2.667 2a.5.5 0 0 1 0 .8l-2.667 2A.5.5 0 0 1 8 18Z' fill='currentColor'/><path d='M14 18v-4a.5.5 0 0 1 .8-.4l2.667 2a.5.5 0 0 1 0 .8l-2.667 2a.5.5 0 0 1-.8-.4Z' fill='currentColor'/><rect x='5.5' y='2' width='9' height='9' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M20 2h-1a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 19 11h1M0 2h1a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 1 11H0' stroke='currentColor' fill='none'/></svg>",
	'es-vertical-carousel-auto':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path opacity='0.6' d='M1.5 2.5h4a.5.5 0 0 1 .4.8l-2 2.667a.5.5 0 0 1-.8 0L1.1 3.3a.5.5 0 0 1 .4-.8Z' fill='currentColor'/><path opacity='0.8' d='M1.5 8.5h4a.5.5 0 0 1 .4.8l-2 2.667a.5.5 0 0 1-.8 0L1.1 9.3a.5.5 0 0 1 .4-.8Z' fill='currentColor'/><path d='M1.5 14.5h4a.5.5 0 0 1 .4.8l-2 2.667a.5.5 0 0 1-.8 0l-2-2.667a.5.5 0 0 1 .4-.8Z' fill='currentColor'/><rect x='18.5' y='5.50006' width='9' height='10' rx='1.5' transform='rotate(90 18.5 5.5)' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M18.5 20v-1a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 8.5 19v1m10-20v1A1.5 1.5 0 0 1 17 2.5h-7A1.5 1.5 0 0 1 8.5 1V0' stroke='currentColor' fill='none'/></svg>",
	'es-side-scroll':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 5.833h6m0 0L4 8.5m3-2.667L4 3m3 11.333H1m0 0L4 17m-3-2.667L4 11.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='10.5' y='2.5' width='8.5' height='14.5714' rx='4.25' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M13.839 7.054a.91.91 0 1 1 1.821 0v1.214a.91.91 0 1 1-1.821 0V7.054Z' fill='currentColor'/></svg>",
	'es-list-container':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><circle opacity='0.9' cx='6' cy='10' r='1.5' fill='currentColor'/><circle opacity='0.9' cx='6' cy='5.5' r='1.5' fill='currentColor'/><circle opacity='0.9' cx='6' cy='14.5' r='1.5' fill='currentColor'/><path opacity='0.6' d='M9.5 10H13M9.5 5.5H15m-5.5 9H14' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-text-on-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='m4.36 12.069-2.936 3.02A1.5 1.5 0 0 0 1 16.136V17.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-2.076a1.5 1.5 0 0 0-.327-.935l-3.991-5.006a1.5 1.5 0 0 0-2.353.008l-2.704 3.445a1.5 1.5 0 0 1-2.315.054l-.74-.856a1.5 1.5 0 0 0-2.21-.065Z' fill='currentColor' fill-opacity='0.5'/><circle cx='14' cy='5' r='1.5' fill='currentColor' fill-opacity='0.5'/><path d='M3.5 3.75h6m-6 2H8m-4.5 2H7' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-hero-special-2':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='10' width='5' height='2' rx='0.5' fill='currentColor' fill-opacity='0.3'/><path d='M4.5 11h2' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path fill='currentColor' fill-opacity='0.3' d='M11 5h8v10h-8z'/><path d='m12.134 11.727-.722.76A1.5 1.5 0 0 0 11 13.52V14a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 19 14v-.848a1.5 1.5 0 0 0-.317-.923l-.893-1.145a1.345 1.345 0 0 0-2.23.16l-.41.721a.895.895 0 0 1-1.573-.032.895.895 0 0 0-1.443-.206Z' fill='currentColor' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><circle cx='13.875' cy='7.625' r='0.875' fill='currentColor' stroke='currentColor'/><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M18.617 4.5h-6.5a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5h6.5' stroke='currentColor' fill='none'/><path d='M3.5 3.75h5m-5 2H7m-3.5 2H6' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-gallery-menu':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.5 4h6A1.5 1.5 0 0 1 20 5.5V11a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 11 11V5.5A1.5 1.5 0 0 1 12.5 4Z' fill='currentColor' opacity='0.4'/><path d='M2.5 11H5a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 5 20H2.5A1.5 1.5 0 0 1 1 18.5v-6A1.5 1.5 0 0 1 2.5 11Z' fill='currentColor' opacity='0.6'/><path d='M1.5 0h6A1.5 1.5 0 0 1 9 1.5V6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 0 6V1.5A1.5 1.5 0 0 1 1.5 0Zm9 13.5h4A1.5 1.5 0 0 1 16 15v3.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 9 18.5V15a1.5 1.5 0 0 1 1.5-1.5Z' fill='currentColor' opacity='0.3'/><path d='M8 4.5h3M8 15h3M8 8h3.5M8 11.5h4.5' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-filter-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.882 1.5H1.992a1 1 0 0 0-.802 1.597l3.896 5.231a1 1 0 0 1 .198.597v8.77a1 1 0 0 0 1.53.849l1.878-1.174a1 1 0 0 0 .47-.848v-7.57a1 1 0 0 1 .228-.635l4.264-5.182a1 1 0 0 0-.772-1.635Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><circle opacity='0.9' cx='12.25' cy='14' r='1' fill='currentColor'/><circle opacity='0.9' cx='12.25' cy='11' r='1' fill='currentColor'/><circle opacity='0.9' cx='12.25' cy='17' r='1' fill='currentColor'/><path opacity='0.6' d='M14.75 14h3m-3-3h4.5m-4.5 6h4' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-highlighted-columns':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M5.25 7.75 2.605 9.14l.505-2.945L.97 4.11l2.957-.43L5.25 1l1.323 2.68 2.957.43-2.14 2.085.505 2.946L5.25 7.75Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/><path d='M7.192 10.531 5.5 9.55V18l1 1H13l1-1V9l-1-1H9.5v1.197c0 .502-.25.97-.668 1.248l-.055.037a1.5 1.5 0 0 1-1.585.05Z' fill='currentColor' fill-opacity='0.3'/><path d='M5.25 10.25v7.25a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-2.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.25 6h3a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-1' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.6' d='M14.5 4h3A1.5 1.5 0 0 1 19 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-.75' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-row':
		"<svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'><rect x='19' y='3' width='14' height='18' rx='1.5' transform='rotate(90 19 3)' stroke='currentColor' fill='none'/><rect x='17' y='5' width='10' height='4' rx='0.5' transform='rotate(90 17 5)' fill='currentColor' fill-opacity='0.5'/><rect x='12' y='5' width='10' height='4' rx='0.5' transform='rotate(90 12 5)' fill='currentColor' fill-opacity='0.5'/><rect x='7' y='5' width='10' height='4' rx='0.5' transform='rotate(90 7 5)' fill='currentColor' fill-opacity='0.5'/></svg>",
	'es-fifty-fifty-cards':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M14.5 2H19v8h-4.5z'/><path fill='currentColor' fill-opacity='0.3' d='M14.5 10H19v8h-4.5z'/><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-13ZM10 2v16m8.5-8h-4.25m0 0V2m0 8v7.796' stroke='currentColor' fill='none'/><path d='M4 5h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-fifty-fifty-item-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='11.5' y='3.75' width='5.5' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='11.5' y='8' width='5.5' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='11.5' y='12.25' width='5.5' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><path d='M11.5 17a.5.5 0 0 1 .5-.5h4.5a.5.5 0 0 1 .5.5v1.5h-5.5V17Z' fill='currentColor' fill-opacity='0.5'/><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M19 3a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 3v14a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17V3Zm-9-1v16' stroke='currentColor' fill='none'/><path d='M4 5h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-event-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1.5 2.5h9v3h-9z'/><path d='M10 18H2.5A1.5 1.5 0 0 1 1 16.5v-13A1.5 1.5 0 0 1 2.5 2H10M1 6h9m-9 4h9' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M5 6v12M9 6v12' stroke='currentColor' fill='none'/><path d='M1 14h9' stroke='currentColor' stroke-linecap='round' fill='none'/><rect opacity='0.6' x='12' y='1.5' width='7' height='4' rx='0.5' fill='currentColor'/><rect opacity='0.5' x='12' y='6.5' width='7' height='4' rx='0.5' fill='currentColor'/><rect opacity='0.4' x='12' y='11.5' width='7' height='4' rx='0.5' fill='currentColor'/><path opacity='0.3' d='M12 17a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1.5h-7V17Z' fill='currentColor'/></svg>",
	'es-iframe':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M1 2.5h18V5H1z'/><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><path d='M1 5.5h18' stroke='currentColor' fill='none'/><path d='m6.76 9.75-2.285 1.863a.5.5 0 0 0 0 .774L6.76 14.25M13 9.75l2.285 1.863a.5.5 0 0 1 0 .774L13 14.25M10.59 9l-1.84 6' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-iframe-modal':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M3 4.5h14V7H3z'/><path fill-rule='evenodd' clip-rule='evenodd' d='M1.5 0A1.5 1.5 0 0 0 0 1.5v17A1.5 1.5 0 0 0 1.5 20h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 18.5 0h-17Zm3 4A1.5 1.5 0 0 0 3 5.5v9A1.5 1.5 0 0 0 4.5 16h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 15.5 4h-11Z' fill='currentColor' fill-opacity='0.12'/><rect x='3' y='4' width='14' height='12' rx='1.5' stroke='currentColor' fill='none'/><path d='M3 6.5h14' stroke='currentColor' fill='none'/><path d='m7.72 9.563-1.595 1.3a.5.5 0 0 0 0 .774l1.594 1.3M12.4 9.563l1.594 1.3a.5.5 0 0 1 0 .774l-1.595 1.3M10.592 9l-1.38 4.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-iframe-modal-trigger':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M3 3h14v2.5H3z'/><path fill-rule='evenodd' clip-rule='evenodd' d='M1.5 0A1.5 1.5 0 0 0 0 1.5v13.329a1.5 1.5 0 0 0 1.136 1.455l3.409.852A1.921 1.921 0 0 1 6 19h8c0-.882.6-1.65 1.455-1.864l3.409-.852A1.5 1.5 0 0 0 20 14.829V1.5A1.5 1.5 0 0 0 18.5 0h-17Zm3 2.5A1.5 1.5 0 0 0 3 4v9a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 17 13V4a1.5 1.5 0 0 0-1.5-1.5h-11Z' fill='currentColor' fill-opacity='0.12'/><rect x='6' y='17' width='8' height='3' rx='1' fill='currentColor'/><rect x='3' y='2.5' width='14' height='12' rx='1.5' stroke='currentColor' fill='none'/><path d='M3 5h14' stroke='currentColor' fill='none'/><path d='m7.72 8.063-1.595 1.3a.5.5 0 0 0 0 .774l1.594 1.3M12.4 8.063l1.594 1.3a.5.5 0 0 1 0 .774l-1.595 1.3M10.592 7.5 9.212 12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-simple-info':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='6' width='18' height='8' rx='1.5' stroke='currentColor' fill='none'/><path d='M4 9h4' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M11 9h5m-5 2h3' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-fifty-fifty-with-cta':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M10 15h9v3h-9z'/><path fill='currentColor' fill-opacity='0.12' d='M1 2h9v16H1z'/><path d='M19 3a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 3v14a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17V3Zm-9-1v16' stroke='currentColor' fill='none'/><path d='M12.5 4.5h3' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4 4.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.5 6.5h2m-2 2h1' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M10 14.5h8.5' stroke='currentColor' fill='none'/></svg>",
	'es-fifty-fifty-with-cta-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M10 15h9v3h-9z'/><path fill='currentColor' fill-opacity='0.12' d='M10 11h9v3h-9zM1 2h9v16H1z'/><path d='M19 3a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 3v14a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17V3Zm-9-1v16' stroke='currentColor' fill='none'/><path d='M12.5 4.5h3' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4 4.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.5 6.5h2m-2 2h1' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M10 14.5h8.5M10 11h8.5' stroke='currentColor' fill='none'/></svg>",
	'es-fifty-fifty-item-list-star':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='11.5' y='3.5' width='5.5' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='11.5' y='7.5' width='5.5' height='3' rx='0.5' fill='currentColor' fill-opacity='0.3'/><path d='M11.5 12a.5.5 0 0 1 .5-.5h4.5a.5.5 0 0 1 .5.5v1.066a.5.5 0 0 1-.777.416L15.5 13l-1.1 1.32a.5.5 0 0 1-.384.18H11.5V12ZM1 2h9v16H1z' fill='currentColor' fill-opacity='0.12'/><path d='M19 12.125V3a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 3v14a1.5 1.5 0 0 0 1.5 1.5h8.559' stroke='currentColor' stroke-linecap='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='m15.5 18-2.351 1.236.449-2.618-1.902-1.854 2.628-.382L15.5 12l1.176 2.382 2.628.382-1.902 1.854.45 2.618L15.5 18Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/><path d='M10 2v16' stroke='currentColor' fill='none'/><path d='M4 4.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-navbar':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect y='7.5' width='20' height='5' rx='1.5' fill='currentColor' fill-opacity='0.12'/><path d='M2 10h2.5M7 10h2.5m2.5 0h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M17 9.5a.5.5 0 0 0 0 1v-1Zm0 1h3v-1h-3v1Z' fill='currentColor'/></svg>",
	'es-multicolumn-list-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path opacity='0.8' d='M7.5 3.25h4' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M1 3.25h3.5m-3.5 2h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.8' d='M7.5 12.25h3m4-9h4m-4 9h4' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.6' d='M7.5 5.75h3m-3 9h3m4-9H18m-3.5 9h4m-11-7H10m-2.5 9H11m3.5-9H19m-4.5 9H17' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='4' width='18' height='12' rx='1.5' stroke='currentColor' fill='none'/><path d='M3.75 8h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M3.75 10h4' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M11.75 8h4.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M11.75 10h3.5m-3.5 2h2' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-fifty-fifty-three-rows':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='6' width='8' height='11' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M4 4h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.6' d='M13.25 5h3m-3 4.5h2.5m-2.5 4.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M13.25 7h2m-2 4.5h2m-2 4.5h2.5' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-six-row-info':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='2.5' y='3' width='8' height='5' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M12.5 4.5H16' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.5 6.5H15' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path opacity='0.6' d='M3 10h3m2.5 4.5h3m-3-4.5H11m3 4.5h2.5M14 10h3M3 14.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3 12h2m3.5 4.5h2m-2-4.5h2m3.5 4.5h2M14 12h2.5M3 16.5h2.5' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-link-list':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><rect x='9' y='6' width='8' height='2' rx='1' fill='currentColor' fill-opacity='0.3'/><rect x='9' y='9' width='8' height='2' rx='1' fill='currentColor' fill-opacity='0.3'/><rect x='9' y='12' width='8' height='2' rx='1' fill='currentColor' fill-opacity='0.3'/><rect x='9' y='15' width='8' height='2' rx='1' fill='currentColor' fill-opacity='0.3'/><path d='M4 4h3' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='16' cy='7' r='0.5' fill='currentColor' fill-opacity='0.3'/><circle cx='16' cy='10' r='0.5' fill='currentColor' fill-opacity='0.3'/><circle cx='16' cy='13' r='0.5' fill='currentColor' fill-opacity='0.3'/><circle cx='16' cy='16' r='0.5' fill='currentColor' fill-opacity='0.3'/></svg>",
	'es-two-cards':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.5 7A1.5 1.5 0 0 0 8 5.5H1.5A1.5 1.5 0 0 0 0 7v6a1.5 1.5 0 0 0 1.5 1.5H8A1.5 1.5 0 0 0 9.5 13V7ZM20 7a1.5 1.5 0 0 0-1.5-1.5H12A1.5 1.5 0 0 0 10.5 7v6a1.5 1.5 0 0 0 1.5 1.5h6.5A1.5 1.5 0 0 0 20 13V7Z' fill='currentColor' fill-opacity='0.3'/><path d='M2 7.75h2.5m8 0H15' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M2 10.25h4m6.5 0h3m-13.5 2h2.5m8 0H16' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><circle cx='7.75' cy='7.75' r='0.75' fill='currentColor' fill-opacity='0.5'/><circle cx='18.25' cy='7.75' r='0.75' fill='currentColor' fill-opacity='0.5'/></svg>",
	'es-link-banner':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M19.5 7A1.5 1.5 0 0 0 18 5.5H2A1.5 1.5 0 0 0 .5 7v6A1.5 1.5 0 0 0 2 14.5h16a1.5 1.5 0 0 0 1.5-1.5V7Z' fill='currentColor' fill-opacity='0.3'/><path d='M3 7.75h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3 9.75h6' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path opacity='0.65' d='M3 12.25h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-vertical-image-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10 1.5v17' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='1.5' width='18' height='17' rx='1.5' stroke='currentColor' fill='none'/><path fill='currentColor' fill-opacity='0.12' d='M10 1.544h9V18.5h-9z'/><path d='M11.49 11.87 10 13.5v5h7.5A1.5 1.5 0 0 0 19 17v-3.5c0-.2-.064-.394-.184-.555l-1.358-1.823a1.5 1.5 0 0 0-2.41.005l-.554.75a.97.97 0 0 1-1.534.035.97.97 0 0 0-1.47-.042Z' fill='currentColor'/><circle cx='13.75' cy='6' r='1' fill='currentColor' stroke='currentColor'/><path d='M3.47 7.51h4.22M3.47 5.26h2.11' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.47 14.946h2.11' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-card-vertical-image-alt-2':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M10.5 1.5h8v13h-8z'/><path fill='currentColor' fill-opacity='0.3' d='M10.5 15h8v4h-8z'/><path d='M10 1.5v17' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='1.5' width='18' height='17' rx='1.5' stroke='currentColor' fill='none'/><path d='M10 15h9' stroke='currentColor' fill='none'/><path d='M3.47 5h4' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.47 15.5h2m-2-2h3' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path opacity='0.8' d='M11.49 9.87 10 11.5v3h9v-3c0-.2-.064-.394-.184-.555l-1.358-1.823a1.5 1.5 0 0 0-2.41.005l-.554.75a.97.97 0 0 1-1.534.035.97.97 0 0 0-1.47-.042Z' fill='currentColor'/><circle opacity='0.8' cx='13.75' cy='5' r='1.5' fill='currentColor'/></svg>",
	'es-text-with-big-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='7' width='14' height='13' rx='0.75' fill='currentColor' fill-opacity='0.3'/><path d='M2.5 17A1.5 1.5 0 0 1 1 15.5v-13A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v13a1.5 1.5 0 0 1-1.5 1.5' stroke='currentColor' fill='none'/><path d='M5.32 14.721 3 17.286v1.964c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75v-1.964c0-.314-.1-.62-.287-.873l-2.778-3.769a1.5 1.5 0 0 0-2.419.005L9.988 14.74a1.503 1.503 0 0 1-2.383.05 1.503 1.503 0 0 0-2.284-.069Z' fill='currentColor' fill-opacity='0.5'/><circle cx='6.75' cy='10.25' r='1.25' fill='currentColor' fill-opacity='0.5'/><path d='M3.5 3.5h4m7 0h2' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.5 5.5h3' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-list-with-filters':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='8' width='14' height='3' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='3' y='12' width='14' height='3' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M3 16.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 .75.75V19H3v-2.25Z' fill='currentColor' fill-opacity='0.5'/><path d='M2.5 1h15A1.5 1.5 0 0 1 19 2.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1Z' stroke='currentColor' fill='none'/><path d='M3.5 3.5h4m-4 2.75H6m2 0h2.5m2 0H15' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-blog-content-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M18.5 3A1.5 1.5 0 0 0 17 1.5H3A1.5 1.5 0 0 0 1.5 3v14A1.5 1.5 0 0 0 3 18.5h14a1.5 1.5 0 0 0 1.5-1.5V3Z' stroke='currentColor' fill='none'/><path d='M2 7.75h16v4.5H2v-4.5Z' fill='currentColor' fill-opacity='0.5'/><path d='M7.5 14h6' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4.5 6h6' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4.5 4h5m-2 12h5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-two-items-with-images':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='8' width='6' height='5' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='11' y='8' width='6' height='5' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M4 4h3.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4 6h2.5' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path d='M4 14.5h3m5 0h2.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4 16.5h2m6 0h2' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-card-bottom-image-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path fill='currentColor' fill-opacity='0.12' d='M1 1.5h18v10H1z'/><path d='M4.443 7.44 1 10.5V12h18v-1.5c0-.322-.12-.632-.338-.869l-4.052-4.42a1.5 1.5 0 0 0-2.215.005l-2.837 3.12a1.5 1.5 0 0 1-2.17.052L6.5 7.5a1.5 1.5 0 0 0-2.057-.06Z' fill='currentColor'/><circle cx='8' cy='4.25' r='1.5' fill='currentColor'/><path d='M4 14.5h7m-7 1.75h3.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-event-recording':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.3' d='M16.5 7.5h2v11h-2z'/><path fill='currentColor' fill-opacity='0.12' d='M1.5 1.5h17v3h-17z'/><path d='M9 17H2.5A1.5 1.5 0 0 1 1 15.5v-13A1.5 1.5 0 0 1 2.5 1h14A1.5 1.5 0 0 1 18 2.5V7M1 5h17M1 9h8' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M5 5v12M9 5v12m5-12v2' stroke='currentColor' fill='none'/><path d='M1 13h8m.5-6h8A1.5 1.5 0 0 1 19 8.5v9a1.5 1.5 0 0 1-1.5 1.5H9a1.5 1.5 0 0 1-1.5-1.5V17' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M16 10h3m-3 3h3m-3 3h3m-3-8.5v11' stroke='currentColor' fill='none'/><path d='M11.25 14.432v-2.864a.5.5 0 0 1 .82-.385l1.72 1.433a.5.5 0 0 1 0 .768l-1.72 1.433a.5.5 0 0 1-.82-.385Z' fill='currentColor'/></svg>",
	'es-four-image-masonry':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3.5' y='8' width='7' height='4' rx='0.75' fill='currentColor'/><rect x='9.75' y='13' width='7' height='4' rx='0.75' fill='currentColor'/><rect x='11.5' y='8' width='4' height='4' rx='0.75' fill='currentColor'/><rect x='4.75' y='13' width='4' height='4' rx='0.75' fill='currentColor'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M4 4h3.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4 5.5h2.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-text-on-image-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='m1 13 3.4-3.255a1.5 1.5 0 0 1 2.136.063l.811.874a1.5 1.5 0 0 0 2.246-.053l2.765-3.277a1.5 1.5 0 0 1 2.289-.004L19 12.46' stroke='currentColor' stroke-opacity='0.5' fill='none'/><circle cx='6.5' cy='5.25' r='1.5' stroke='currentColor' stroke-opacity='0.5' fill='none'/><path d='M3.5 14.25h6' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M3.5 16.25H8' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'es-h-card-with-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='8.5' y='5.5' width='9' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M2.5 4h15A1.5 1.5 0 0 1 19 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 14.5v-9A1.5 1.5 0 0 1 2.5 4Z' stroke='currentColor' fill='none'/><path d='M3.25 6.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.25 8.25h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-hero-special-3':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='10' y='6' width='7' height='5.5' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M2.5 4h15A1.5 1.5 0 0 1 19 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 14.5v-9A1.5 1.5 0 0 1 2.5 4Z' stroke='currentColor' fill='none'/><path d='M3.5 6.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M14.5 13.5h2m-6 0h2' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path opacity='0.5' d='M6 13.5h1m-3.5 0h1' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-blog-content-alt-2':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M18.5 3A1.5 1.5 0 0 0 17 1.5H3A1.5 1.5 0 0 0 1.5 3v14A1.5 1.5 0 0 0 3 18.5h14a1.5 1.5 0 0 0 1.5-1.5V3Z' stroke='currentColor' fill='none'/><path d='M6.5 8.5h6m-6 7.5h6m-6 2h6' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M6.5 5h5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M6.5 10.5h5m-5 2h6' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser-alt-1':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='4' width='18' height='12' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M4 7h5m-5 4.5h3M4 9.25h3.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser-alt-2':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='5' width='18' height='10' rx='1.5' stroke='currentColor' fill='none'/><circle cx='3.75' cy='7.75' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M9 12.25h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M9 7.75h3' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M9 10h5.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-podcast':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M6.5 4.5a3.5 3.5 0 1 1 7 0v5a3.5 3.5 0 1 1-7 0v-5Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M11.5 3.5h1.75M11.5 5.75h2M11.5 8h2m-2 2.25h1.75' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M15.5 9v.5A5.5 5.5 0 0 1 10 15v0M4.5 9v.5A5.5 5.5 0 0 0 10 15v0m0 0v4m0 0H7.25M10 19h2.75' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-fifty-fifty-item-list-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='9.5' y='4.5' width='7' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='9.5' y='8.5' width='7' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='9.5' y='12.5' width='7' height='3' rx='0.5' fill='currentColor' fill-opacity='0.5'/><path d='M9.5 17a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1h-7v-1Z' fill='currentColor' fill-opacity='0.5'/><path d='M19 3a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 1 3v14a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 19 17V3Z' stroke='currentColor' fill='none'/><path d='M4 5h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-two-items-generic':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='2.75' y='4.75' width='6.5' height='10.5' rx='1' fill='currentColor' fill-opacity='0.5'/><rect x='10.75' y='4.75' width='6.5' height='10.5' rx='1' fill='currentColor' fill-opacity='0.5'/><path d='M19 4.5A1.5 1.5 0 0 0 17.5 3h-15A1.5 1.5 0 0 0 1 4.5v11A1.5 1.5 0 0 0 2.5 17h15a1.5 1.5 0 0 0 1.5-1.5v-11Z' stroke='currentColor' fill='none'/></svg>",
	'es-card-teaser-alt-3':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='5' width='18' height='10' rx='1.5' stroke='currentColor' fill='none'/><path d='M4 11h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.5 11H15' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4 9h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M12.5 9H16' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser-alt-4':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M4 4h6M4 8.5h3.5M4 6.25h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-multi-items-with-images':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='8' width='6' height='5' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='10' y='8' width='6' height='5' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M17 8.75a.75.75 0 0 1 .75-.75H19v5h-1.25a.75.75 0 0 1-.75-.75v-3.5Z' fill='currentColor' fill-opacity='0.5'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M3.5 4H7' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.5 6H6' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path opacity='0.6' d='M3.5 14.5h3m4 0H13m4.5 0h1' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M3.5 16.5h2m5 0h2m5 0h1' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/></svg>",
	'es-multi-h-cards':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='7' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='10' y='7' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M17 7.75a.75.75 0 0 1 .75-.75H19v9h-1.25a.75.75 0 0 1-.75-.75v-7.5Z' fill='currentColor' fill-opacity='0.5'/><path d='M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15Z' stroke='currentColor' fill='none'/><path d='M4 4.5h3.5m-3.25 8.25h3m4 0h2.5m4.5 0h.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4.25 14.5h2m5 0h2m5 0h.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-auto-scroll-h-cards':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M3 1.5h-.5A1.5 1.5 0 0 0 1 3v14.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V3a1.5 1.5 0 0 0-1.5-1.5H10' stroke='currentColor' fill='none'/><path d='M10.5 4H14' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M10.5 14.75h3m-3 1.75H13' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><rect x='3' y='6' width='6' height='7' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='10' y='6' width='6' height='7' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M17 6.75a.75.75 0 0 1 .75-.75H19v7h-1.25a.75.75 0 0 1-.75-.75v-5.5Z' fill='currentColor' fill-opacity='0.5'/><path d='M4.25 9.75h3m4 0h2.5m4.5 0h.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4.25 11.5h2m5 0h2m5 0h.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path opacity='0.4' d='M9.5 2.5v-2a.25.25 0 0 0-.4-.2l-1.333 1a.25.25 0 0 0 0 .4l1.333 1a.25.25 0 0 0 .4-.2Z' fill='currentColor'/><path opacity='0.6' d='M7.5 2.5v-2a.25.25 0 0 0-.4-.2l-1.333 1a.25.25 0 0 0 0 .4l1.333 1a.25.25 0 0 0 .4-.2Z' fill='currentColor'/><path opacity='0.8' d='M5.5 2.5v-2a.25.25 0 0 0-.4-.2l-1.333 1a.25.25 0 0 0 0 .4l1.333 1a.25.25 0 0 0 .4-.2Z' fill='currentColor'/></svg>",
	'es-fifty-fifty-img-text-alt-2':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M19 4.5h-9v11h9z'/><path d='m11.18 12.316-.72.675a1.45 1.45 0 0 0 .99 2.509h6.05A1.5 1.5 0 0 0 19 14v-.41a1.5 1.5 0 0 0-.25-.831l-.958-1.44c-.661-.994-2.163-.854-2.63.246l-.469 1.105c-.352.83-1.528.828-1.877-.004a1.019 1.019 0 0 0-1.635-.35Z' fill='currentColor' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><circle cx='13.375' cy='7.875' r='0.875' fill='currentColor' stroke='currentColor'/><path d='M1 3a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 19 3v14a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 17V3Z' stroke='currentColor' fill='none'/><path d='M19 4.5h-7.5A1.5 1.5 0 0 0 10 6v8a1.5 1.5 0 0 0 1.5 1.5H19' stroke='currentColor' fill='none'/><path d='M6.75 8h-3m2 2h-2m1 2h-1' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser-alt-5':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1.5' width='18' height='17' rx='1.5' stroke='currentColor' fill='none'/><path d='M6 9h8m-6.5 2h5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-four-items-w-text-generic':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='2.875' y='7' width='3' height='4' rx='1' fill='currentColor'/><rect x='6.625' y='7' width='3' height='4' rx='1' fill='currentColor'/><rect x='10.375' y='7' width='3' height='4' rx='1' fill='currentColor'/><rect x='14.125' y='7' width='3' height='4' rx='1' fill='currentColor'/><path d='M8 15h4' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M19 3.5A1.5 1.5 0 0 0 17.5 2h-15A1.5 1.5 0 0 0 1 3.5v13A1.5 1.5 0 0 0 2.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-13Z' stroke='currentColor' fill='none'/></svg>",
	'es-overflow-image':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='3' y='3' width='14' height='16.5' rx='0.75' fill='currentColor' fill-opacity='0.3'/><path d='M5.32 12.721 3 15.286v3.464c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75v-3.464c0-.314-.1-.62-.287-.873l-2.778-3.769a1.5 1.5 0 0 0-2.419.005L9.988 12.74a1.503 1.503 0 0 1-2.383.05 1.503 1.503 0 0 0-2.284-.069Z' fill='currentColor' fill-opacity='0.5'/><circle cx='6.75' cy='7.25' r='1.25' fill='currentColor' fill-opacity='0.5'/><path d='M2.5 17A1.5 1.5 0 0 1 1 15.5v-13A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v13a1.5 1.5 0 0 1-1.5 1.5' stroke='currentColor' fill='none'/></svg>",
	'es-text-l-with-two-cards':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='7' y='3' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='14' y='3' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M7.992 8.657 7 9.794v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V9.794a.673.673 0 0 0-.124-.39l-.853-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.028Zm7 0L14 9.794v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V9.794a.673.673 0 0 0-.125-.39l-.852-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.028Z' fill='currentColor' fill-opacity='0.5'/><circle cx='9.25' cy='5.25' r='0.75' fill='currentColor' fill-opacity='0.5'/><circle cx='16.25' cy='5.25' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M1 3.75h3.5m-3.5 2h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M1 10h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M7.5 13.5h3m4 0H17' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M7.5 15.25h2m5 0h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'es-text-l-with-two-cards-alt':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='7' y='1' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><rect x='14' y='1' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M7.992 6.657 7 7.794V9.25c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V7.794a.673.673 0 0 0-.124-.39l-.853-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.028Zm7 0L14 7.794V9.25c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V7.794a.673.673 0 0 0-.125-.39l-.852-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.028Z' fill='currentColor' fill-opacity='0.5'/><circle cx='9.25' cy='3.25' r='0.75' fill='currentColor' fill-opacity='0.5'/><circle cx='16.25' cy='3.25' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M1 1.75h3.5m-3.5 2h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M1 8h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M7.5 11.5h3m4 0H17' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M7.5 13.25h2m5 0h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><rect y='16' width='20' height='4' rx='0.75' fill='currentColor' fill-opacity='0.12'/><path opacity='0.6' d='M2 18h3m3.5 0h3m3.5 0h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-card-teaser-alt-6':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='2' width='18' height='16' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M4 14.75h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M13 14.75h3' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M4 12.5h4.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-two-cards-w-nav-and-filters':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='14' y='3.5' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M14.992 9.157 14 10.294v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-1.456a.673.673 0 0 0-.125-.39l-.852-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.028Z' fill='currentColor' fill-opacity='0.5'/><circle cx='16.25' cy='5.75' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M1 4.25h3.5m-3.5 2h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M1 10.5h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M14.5 14H17' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='7' y='3.5' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M7.992 9.157 7 10.294v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-1.456a.673.673 0 0 0-.124-.39l-.853-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.028Z' fill='currentColor' fill-opacity='0.5'/><circle cx='9.25' cy='5.75' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M7.5 14h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M7.5 15.75h2m5 0h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M7.25 18.75A.75.75 0 0 1 8 18h3.75a.75.75 0 0 1 .75.75V20H7.25v-1.25Zm-6.25 0a.75.75 0 0 1 .75-.75H5.5a.75.75 0 0 1 .75.75V20H1v-1.25Zm12.75 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75V20h-5.25v-1.25Z' fill='currentColor' fill-opacity='0.3'/><path opacity='0.6' d='M1 1h2m2 0h2' stroke='currentColor' stroke-linecap='round' fill='none'/><path opacity='0.8' d='M11 1h3m2 0h3' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'es-two-cards-featured':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect y='7' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M.992 12.656 0 13.794v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-1.456a.673.673 0 0 0-.125-.39l-.852-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.029Z' fill='currentColor' fill-opacity='0.5'/><circle cx='2.25' cy='9.25' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M.5 17.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M.5 19.25h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M7.75 16h4.5a.75.75 0 0 0 .75-.75v-4.287a.75.75 0 0 0-.415-.67l-2.25-1.125a.75.75 0 0 0-.67 0l-2.25 1.125a.75.75 0 0 0-.415.67v4.287c0 .414.336.75.75.75Z' fill='currentColor' fill-opacity='0.5'/><path d='M7.992 12.656 7 13.794v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-1.456a.673.673 0 0 0-.124-.39l-.853-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.029ZM9.25 10a.75.75 0 0 0 .75-.75v-.002c0-.055 0-.247-.016-.153 0 0 .016-.095-.484.155l-.861.435a.75.75 0 0 0 .61.315Z' fill='currentColor' fill-opacity='0.5'/><path d='M7.5 17.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M7.5 19.25h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><rect x='14' y='7' width='6' height='9' rx='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M14.992 12.656 14 13.794v1.456c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-1.456a.673.673 0 0 0-.125-.39l-.852-1.2a1.046 1.046 0 0 0-1.708.004l-.32.454a.636.636 0 0 1-1.022.023.636.636 0 0 0-.98-.029Z' fill='currentColor' fill-opacity='0.5'/><circle cx='16.25' cy='9.25' r='0.75' fill='currentColor' fill-opacity='0.5'/><path d='M14.5 17.5h3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M14.5 19.25h2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M10 7.75 7.355 9.14l.505-2.945L5.72 4.11l2.957-.43L10 1l1.322 2.68 2.958.43-2.14 2.085.505 2.946L10 7.75Z' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-circular-progress':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><circle cx='10' cy='10' r='9' stroke='currentColor' stroke-opacity='0.12' fill='none'/><path d='M10 1a9 9 0 1 1-8.294 5.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M7.194 10.333c-1.073 0-1.944.746-1.944 1.667 0 .92.87 1.667 1.944 1.667 1.074 0 1.945-.746 1.945-1.667 0-.92-.87-1.667-1.945-1.667Zm0 0c1.074 0 1.696-.746 1.696-1.666C8.89 7.747 8.268 7 7.194 7 6.121 7 5.5 7.746 5.5 8.667c0 .92.62 1.666 1.694 1.666Zm5.611 0c-1.074 0-1.945.746-1.945 1.667 0 .92.87 1.667 1.945 1.667 1.074 0 1.944-.746 1.944-1.667 0-.92-.87-1.667-1.944-1.667Zm0 0c1.074 0 1.694-.746 1.694-1.666 0-.92-.62-1.667-1.694-1.667-1.074 0-1.696.746-1.696 1.667 0 .92.622 1.666 1.696 1.666Z' stroke='currentColor' fill='none'/></svg>",
	'es-infinum':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 10c0-1.956 1.59-3.5 3.687-3.5C6.71 6.5 8.084 8.078 10 10c1.916 1.921 3.29 3.5 5.313 3.5C17.373 13.5 19 11.956 19 10s-1.663-3.5-3.723-3.5c-2.024 0-3.397 1.578-5.313 3.5-1.916 1.921-3.29 3.5-5.313 3.5C2.59 13.466 1 11.921 1 10Z' stroke='currentColor' fill='none'/></svg>",
	'es-table-of-contents':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10 18.5v0a9.473 9.473 0 0 0-4.236-1h-.528A9.47 9.47 0 0 0 1 18.5v0-11 0a9.472 9.472 0 0 1 4.236-1h.528c1.47 0 2.92.342 4.236 1v0m0 11v-11m0 11v0a9.473 9.473 0 0 1 4.236-1h.528c1.47 0 2.92.342 4.236 1v0-11l-1.5-.375M10 7.5l2-.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M3.25 11.5v0a8.375 8.375 0 0 1 2.03-.25h.44c.684 0 1.366.084 2.03.25v0m4.5 1v0a8.376 8.376 0 0 1 2.03-.25h.44c.684 0 1.366.084 2.03.25v0m-13.5-3v0a8.373 8.373 0 0 1 2.03-.25h.44c.684 0 1.366.084 2.03.25v0m-4.5 4v0a8.375 8.375 0 0 1 2.03-.25h.44c.684 0 1.366.084 2.03.25v0m4.5 1v0a8.376 8.376 0 0 1 2.03-.25h.44c.684 0 1.366.084 2.03.25v0' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M17 10.5V3a1.5 1.5 0 0 0-1.5-1.5h-2A1.5 1.5 0 0 0 12 3v7.5l2.5-2.7 2.5 2.7Z' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/></svg>",
	'es-locations':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2 15a1 1 0 0 1-1-1V2.5A1.5 1.5 0 0 1 2.5 1H14a1 1 0 0 1 1 1' stroke='currentColor' fill='none'/><path d='M4 17a1 1 0 0 1-1-1V4.5A1.5 1.5 0 0 1 4.5 3H16a1 1 0 0 1 1 1' stroke='currentColor' fill='none'/><path d='M5 17.5A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17.5 5h-11A1.5 1.5 0 0 0 5 6.5v11Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12.75 16.282c.974-1.126 2.676-3.397 2.676-5.516 0-1.804-1.495-3.266-3.338-3.266-1.844 0-3.338 1.462-3.338 3.266 0 2.12 1.702 4.39 2.675 5.516a.866.866 0 0 0 1.326 0Zm-.664-3.782a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z' fill='currentColor'/><path d='m12.75 16.282.379.327-.378-.327Zm-1.325 0-.378.327.378-.327Zm3.5-5.516c0 .935-.379 1.944-.908 2.886-.524.933-1.17 1.754-1.644 2.303l.756.654a15.552 15.552 0 0 0 1.76-2.467c.565-1.006 1.037-2.192 1.037-3.376h-1ZM12.089 8c1.578 0 2.838 1.248 2.838 2.766h1c0-2.09-1.729-3.766-3.838-3.766v1ZM9.25 10.766C9.25 9.248 10.51 8 12.088 8V7C9.978 7 8.25 8.676 8.25 10.766h1Zm2.553 5.189c-.474-.549-1.12-1.37-1.645-2.303-.529-.942-.908-1.95-.908-2.886h-1c0 1.184.471 2.37 1.037 3.376a15.425 15.425 0 0 0 1.76 2.467l.756-.654Zm.57 0a.367.367 0 0 1-.57 0l-.756.654a1.366 1.366 0 0 0 2.082 0l-.756-.654Zm.963-5.205c0 .69-.56 1.25-1.25 1.25v1a2.25 2.25 0 0 0 2.25-2.25h-1Zm-1.25-1.25c.69 0 1.25.56 1.25 1.25h1a2.25 2.25 0 0 0-2.25-2.25v1Zm-1.25 1.25c0-.69.56-1.25 1.25-1.25v-1a2.25 2.25 0 0 0-2.25 2.25h1Zm1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1a2.25 2.25 0 0 0 2.25 2.25v-1Z' fill='currentColor'/></svg>",
	'es-tiktok':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M7.606 19.25a5.606 5.606 0 0 0 5.606-5.606V6.243a7.825 7.825 0 0 0 5.046 2.336V5.204A5.047 5.047 0 0 1 13.804.75h-3.675v12.894a2.523 2.523 0 1 1-2.523-2.523V8.038a5.606 5.606 0 1 0 0 11.212Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'es-search-field':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5.5 16h-3A1.5 1.5 0 0 1 1 14.5v-9A1.5 1.5 0 0 1 2.5 4h3m9 12h3a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 4h-3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><g filter='url(#9d891eaf-4ad3-425b-ad13-052765c36473)'><path transform='matrix(-1 0 0 1 6.25 4)' fill='url(#cf704d04-0ed2-44fd-85ec-aa3f803cb944)' fill-opacity='0.15' d='M0 0h5v12H0z'/></g><g filter='url(#d27b601e-9c63-46f8-a54a-5d8b804cd262)'><path fill='url(#f86e50c5-0ad7-482b-8599-998979969e6f)' fill-opacity='0.15' d='M13.75 4h5v12h-5z'/></g><circle cx='2.66667' cy='2.66667' r='2.66667' transform='matrix(-1 0 0 1 13.25 6)' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M9.027 10.889 5.917 14' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><defs><linearGradient id='cf704d04-0ed2-44fd-85ec-aa3f803cb944' x1='5' y1='6' x2='1.66667' y2='6' gradientUnits='userSpaceOnUse'><stop stop-color='currentColor'/><stop offset='1' stop-color='currentColor' stop-opacity='0'/></linearGradient><linearGradient id='f86e50c5-0ad7-482b-8599-998979969e6f' x1='18.75' y1='10' x2='15.4167' y2='10' gradientUnits='userSpaceOnUse'><stop stop-color='currentColor'/><stop offset='1' stop-color='currentColor' stop-opacity='0'/></linearGradient><filter id='9d891eaf-4ad3-425b-ad13-052765c36473' x='0.25' y='3' width='7' height='14' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'><feFlood flood-opacity='0' result='BackgroundImageFix'/><feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/><feGaussianBlur stdDeviation='0.5' result='effect1_foregroundBlur_1296_7'/></filter><filter id='d27b601e-9c63-46f8-a54a-5d8b804cd262' x='12.75' y='3' width='7' height='14' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'><feFlood flood-opacity='0' result='BackgroundImageFix'/><feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/><feGaussianBlur stdDeviation='0.5' result='effect1_foregroundBlur_1296_7'/></filter></defs></svg>",
	'es-special-header-1':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/><path d='M5.858 6.925 7.273 5.51a1.5 1.5 0 0 0 0-2.12L5.883 2H2.5A1.5 1.5 0 0 0 1 3.5v.687l2.737 2.738a1.5 1.5 0 0 0 2.121 0Zm3.405 10.96-.182-3.387a1.5 1.5 0 0 0-1.579-1.417L1 13.43v3.053a1.5 1.5 0 0 0 1.522 1.5l6.74-.1Zm2.161-6.072L10.094 18h7.405a1.5 1.5 0 0 0 1.5-1.5v-4.593l-5.793-1.245a1.5 1.5 0 0 0-1.782 1.151Zm.025-4.595L19 9.24V3.5A1.5 1.5 0 0 0 17.5 2h-6.206l-.906 3.38a1.5 1.5 0 0 0 1.06 1.838Z' fill='currentColor' fill-opacity='0.12'/><path d='M6 6.5h8M7.454 9h5.091' stroke='currentColor' stroke-linecap='round' fill='none'/><rect x='7' y='12.5' width='6' height='1' rx='0.5' fill='currentColor' stroke='currentColor' stroke-linejoin='round'/></svg>",

	// Eightshift Forms blocks.
	'esf-captcha-basic':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10 3H6.5A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3H10Zm0 0V1' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='m8.5 8 .06-.06a1.5 1.5 0 0 1 1.061-.44h.758a1.5 1.5 0 0 1 1.06.44L11.5 8' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path d='m2.572 19-.307-3.756A3 3 0 0 1 5.255 12h10.739c.82 0 1.508.532 1.753 1.26' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='16' cy='17' r='3' fill='currentColor' fill-opacity='0.12'/><path d='m17.5 18.5-3-3m0 3 3-3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='8.25' cy='5.75' r='0.75' fill='currentColor'/><circle cx='11.75' cy='5.75' r='0.75' fill='currentColor'/></svg>",
	'esf-checkbox':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='2' y='2' width='16' height='16' rx='3' stroke='currentColor' fill='none'/><path d='m5.5 11.427 2.46 2.425a.5.5 0 0 0 .748-.051L14.5 6.25' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' stroke-opacity='0.5' fill='none'/><rect x='3.5' y='3.5' width='10' height='3' rx='1' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linejoin='round'/><rect x='3.5' y='9' width='10' height='3' rx='1' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linejoin='round'/><rect x='9' y='14.5' width='8' height='2.5' rx='1' fill='currentColor'/></svg>",
	'esf-form-picker':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M15 14V2.5A1.5 1.5 0 0 0 13.5 1h-11A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15H6' stroke='currentColor' stroke-opacity='0.5' fill='none'/><rect x='3' y='3' width='8' height='2' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='3' y='6' width='8' height='2' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='6' y='9.75' width='7' height='2.5' rx='0.5' fill='currentColor' fill-opacity='0.5'/><rect x='6' y='14' width='13' height='5' rx='1.5' stroke='currentColor' fill='none'/><path d='m14.75 16.25 1.25 1 1.25-1' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M8 16.5h3.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-input':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M3 8h.75m.75 0h-.75m0 0v4m0 0H3m.75 0h.75' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='6' width='18' height='8' rx='1.5' stroke='currentColor' fill='none'/></svg>",
	'esf-radio':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><circle cx='10' cy='10' r='8.5' stroke='currentColor' fill='none'/><circle cx='10' cy='10' r='3.5' fill='currentColor' stroke='currentColor'/></svg>",
	'esf-select':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='7' width='18' height='6' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='m13 9.25 1.75 1.5 1.75-1.5M3.5 10H8' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-select-option':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='18' height='5' rx='1.5' stroke='currentColor' fill='none'/><path d='M1 4v13.5A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5V4' stroke='currentColor' fill='none'/><path d='m13.75 4 1.5-1 1.5 1M3.5 3.5H8m-4 5h6.5m-6.5 8h6.5' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M3.5 10.25a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1h-13ZM4 12a.5.5 0 0 0 0 1h6.5a.5.5 0 0 0 0-1H4Z' fill='currentColor'/></svg>",
	'esf-submit':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m18.5 1.5-9 9L12 19l6.5-17.5Z' fill='currentColor' fill-opacity='0.12'/><path d='m19 1-6.468 16.633a.5.5 0 0 1-.946-.04L9.5 10.5M19 1l-9.5 9.5M19 1 2.367 7.468a.5.5 0 0 0 .04.946L9.5 10.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M1 13.5 3.5 11M6 18.5 8.5 16M2 17.5 4.5 15' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-textarea':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M3 4h.75m.75 0h-.75m0 0v4m0 0H3m.75 0h.75' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/><rect x='1' y='2' width='18' height='16' rx='1.5' stroke='currentColor' fill='none'/></svg>",
	'esf-checkboxes':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='7' height='7' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><rect x='1' y='10' width='7' height='7' rx='1.5' stroke='currentColor' fill='none'/><path d='M1 20a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1' stroke='currentColor' fill='none'/><path d='m2.75 5.139 1.148 1.167L6.358 3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M10 4.5h7.5M10 14h7.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'esf-radios':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><circle cx='4.5' cy='4.5' r='3' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><circle cx='4.5' cy='4.5' r='1.5' fill='currentColor'/><circle cx='4.5' cy='12.75' r='3' stroke='currentColor' fill='none'/><path d='M7.28 20a.598.598 0 0 0-.052-.25 3 3 0 0 0-5.455 0 .598.598 0 0 0-.052.25' stroke='currentColor' fill='none'/><path d='M10 4.5h7.5M10 12.75h7.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'esf-custom-data':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M13 4C7.8 6.39 2.833 4.996 1 4v9.46c5.2 2.789 10.167 1.162 12 0V4Z' fill='currentColor' fill-opacity='0.12'/><ellipse cx='7' cy='3.16667' rx='6' ry='2.16667' stroke='currentColor' fill='none'/><path d='M13 6.5c0 1.197-2.686 2.167-6 2.167S1 7.697 1 6.5m12 3.25c0 1.197-2.686 2.167-6 2.167s-6-.97-6-2.167' stroke='currentColor' fill='none'/><path d='M1 3.167v9.666C1 14.03 3.686 15 7 15c.636 0 1.249-.036 1.824-.102M13 3.167V11' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m17.886 12.5-1.636-1.636L17.614 9.5l1.636 1.636-1.364 1.364Z' fill='currentColor' fill-opacity='0.3'/><path d='m15.952 10.613 1.935 1.935m-1.935-1.935-5.695 5.379a.5.5 0 0 0-.145.255l-.42 1.89a.5.5 0 0 0 .646.584l1.953-.651a.5.5 0 0 0 .196-.121l5.4-5.4m-1.935-1.936.905-.906a1 1 0 0 1 1.415 0l.52.521a1 1 0 0 1 0 1.415l-.905.905' stroke='currentColor' fill='none'/></svg>",
	'esf-file':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M2.5 9A1.5 1.5 0 0 0 1 10.5v5A1.5 1.5 0 0 0 2.5 17h5A1.5 1.5 0 0 0 9 15.5v-5A1.5 1.5 0 0 0 7.5 9h-5Zm2.146 1.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L5.5 12.207V15a.5.5 0 0 1-1 0v-2.793l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2Z' fill='currentColor'/><path d='M13.4 1h.083a1.5 1.5 0 0 1 1.055.433l4.017 3.973A1.5 1.5 0 0 1 19 6.472v.066M13.4 1H6.5A1.5 1.5 0 0 0 5 2.5V9m8.4-8v5.038a.5.5 0 0 0 .5.5H19m0 0V17.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17.5V17' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M13.5 6.5v-6l6 6h-6Z' fill='currentColor' fill-opacity='0.5'/></svg>",
	'esf-sender-email':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='4' width='18' height='12' rx='1.5' stroke='currentColor' fill='none'/><path d='m1.5 4.5 7.589 5.803a1.5 1.5 0 0 0 1.822 0L18.5 4.5m-17 11 5.687-6.651M18.5 15.5l-5.687-6.651' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M18.5 4h-17l8.5 6.5L18.5 4Z' fill='currentColor' fill-opacity='0.12'/></svg>",
	'esf-form-custom':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M13 3.571 15.571 1 19 4.429 16.429 7 13 3.571Z' fill='currentColor' fill-opacity='0.3'/><path d='m12.817 3.638 3.545 3.545m-3.545-3.545-10.3 9.729a1.5 1.5 0 0 0-.435.765l-.986 4.437a.25.25 0 0 0 .323.291l4.563-1.52a1.5 1.5 0 0 0 .586-.363l9.794-9.794m-3.545-3.545 2.414-2.414a.763.763 0 0 1 1.08 0l2.465 2.465a.763.763 0 0 1 0 1.08l-2.414 2.414' stroke='currentColor' fill='none'/></svg>",
	'esf-form-mailchimp':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M11 2 6.5 5.5l4-1L15 5l1-1V2l-1-1h-1.5L11 2Z' fill='currentColor' fill-opacity='0.3'/><path d='M4.37 4.218 1.907 8.32a1.444 1.444 0 0 0 1.883 2.034l.153-.076a1.5 1.5 0 0 0 .752-.867l.715-2.142a1.5 1.5 0 0 1 .27-.486l2.18-2.616a1.5 1.5 0 0 1 .32-.288l2.001-1.334a.806.806 0 0 0-.605-1.46l-1.704.34a1.5 1.5 0 0 0-.666.319L4.695 3.837a1.5 1.5 0 0 0-.326.38Z' fill='currentColor' fill-opacity='0.12'/><path d='M2.927 11.43c-.615-.488-1.661-1.85-.923-3.408.923-1.947 3.23-5.354 5.076-6.328 2.662-1.404 2.768-.973 4.152 0' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M4.772 9.969c0-1.947 1.044-5.94 8.306-9.005 2.307-.973 4.614 1.541 1.846 4.137' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M14.924 5.101c-2.153-.649-6.737-1.752-9.69 2.92m9.69-2.92c.307.65.923 2.19.923 4.138.922.243 2.491 1.022 1.384 2.19.769.487 1.845 2.142 0 4.868-1.846 2.725-5.076 3.082-6.46 2.92-1.23-.162-3.968-1.265-5.076-4.38' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M15.617 7.535c-.154-.487-1.062-1.655-2.538-.487-1.697 1.343-3.23-1.46-3.692 1.947 0 .325.185 1.266.923 2.434-.769.974-1.485 2.761-.461 4.38.923 1.461 3.23 2.921 7.382.488' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M17.23 11.43c-.46.486-1.845 1.46-3.69 1.46-1.846 0-2.308.648-2.308.973.154 1.136 1.246 3.115 5.307 0m-5.064-4.031c.176-.2.651-.5 1.15-.1m1.376-1.223.23.73' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><ellipse cx='14.1168' cy='11.0641' rx='0.576772' ry='0.608433' fill='currentColor'/><ellipse cx='14.8082' cy='10.8207' rx='0.576772' ry='0.608433' fill='currentColor'/><path d='M2.927 11.43c.566-1.088 1.384-1.461 1.846-1.461.461 0 1.846.487 1.846 2.92 0 2.613-3.158 1.835-3.62.861-.5-1-.499-1.5-.072-2.32Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M5.695 14.35c-.308-.812-.826-2.49-1.195-2.1' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-greenhouse':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'><circle cx='10' cy='15.38' r='3.75' stroke='currentColor' fill='none'/><circle cx='10' cy='5.88' r='2.75' stroke='currentColor' fill='none'/><circle cx='13' cy='1.38' r='1.25' fill='currentColor'/><path d='M9.25 8.63c.5.5 1.2 1.8 0 3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M10.912 8.63c-.5.5-1.2 1.8 0 3m1.885-10.5c-.085.452-.513 1.454-1.547 1.843' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M13.371 1.612c-.43.162-1.343.758-1.547 1.843' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-goodbits':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m6.5 13.5 2.358-7.074m.249 7.074 2.358-7.074m.25 7.074 2.358-7.074' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='10' cy='10' r='9' stroke='currentColor' fill='none'/></svg>",
	'esf-form-mailerlite':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M4.25 11.25v-5m2.5 5v-3' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m11.25 11.2-.304.06a1 1 0 0 1-1.196-.98V6.25l-1 1h2' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><circle cx='6.75' cy='6.5' r='0.75' fill='currentColor'/><path d='M13 9h3.25v-.725c0-.897-.727-1.625-1.625-1.625v0c-.898 0-1.625.728-1.625 1.625V9Zm0 0v.4c0 2 1.5 2.1 3.25 1.668' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M3.676 14.703 1 17.5V4a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 19 4v9.203a1.5 1.5 0 0 1-1.5 1.5H3.676Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/></svg>",
	'esf-form-hubspot':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m11 15-2.12 1.697M14.25 4v3.5M11 8.625 3.863 3.272' stroke='currentColor' stroke-linecap='round' fill='none'/><circle cx='14.25' cy='11.75' r='4.25' stroke='currentColor' fill='none'/><circle cx='2.5' cy='2.5' r='1.5' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/><circle cx='14.25' cy='2.5' r='1.5' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/><circle cx='7.5' cy='17.5' r='1.5' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/></svg>",
	'esf-form-salesforce':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1.262 13.135a3.29 3.29 0 0 1 .954-3.847c-.763-1.153 0-2.724.476-3.365C3.17 5.282 4.503 4 6.03 4c1.525 0 2.542.962 2.86 1.442.317-.32 1.239-.961 2.382-.961 1.144 0 1.748.961 1.907 1.442 1.906-.77 3.336-.32 3.813 0 1.112.801 2.955 2.98 1.43 5.288-1.526 2.308-3.178 2.244-3.813 1.924 0 .16-.286.673-1.43 1.442-1.144.77-2.066.32-2.383 0-.953 1.442-2.383 1.923-3.813 1.923-1.144 0-2.383-.961-2.86-1.442-.635.16-2.097 0-2.86-1.923Z' stroke='currentColor' stroke-linejoin='round' fill='none'/><path d='M12 7.82c-.583-.138-1.75-.165-1.75.825l-.146 1.105M8.5 13.185c1.05.33 1.313-.687 1.313-1.238l.29-2.197m-1.165 0h1.166m1.459 0h-1.46M7.5 8.874c-.417-.295-2.083-.443-2.083.443 0 .866 1.666 1.064 1.666 1.773 0 .71-1.527.591-2.083.443' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-zapier':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M8.771 11.229c-.491-.983-.204-2.048 0-2.458.983-.491 2.048-.204 2.458 0 .205.41.491 1.475 0 2.458-.41.205-1.475.491-2.458 0Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linejoin='round'/><path d='M1.367 8.56c.181-.177 2.772-.093 4.11-.036a.303.303 0 0 0 .226-.519L2.689 5.052c-.288-.282-.447-.683-.235-1.026a4.112 4.112 0 0 1 1.29-1.255c.34-.197.73-.043 1.01.232L7.782 5.97l.297.301c.098.1.269.03.269-.11V1.99c0-.403.173-.797.565-.892a4.24 4.24 0 0 1 1.809 0c.391.095.565.49.565.892v4.17c0 .131.163.192.249.092l.24-.283 3.027-2.966c.28-.275.67-.429 1.01-.232a4.11 4.11 0 0 1 1.29 1.256c.212.342.053.743-.235 1.025l-3.013 2.953-.247.225a.19.19 0 0 0 .128.33h4.285c.393 0 .78.164.878.544a3.7 3.7 0 0 1 .102.896 3.7 3.7 0 0 1-.102.896c-.098.38-.485.544-.878.544h-4.285a.19.19 0 0 0-.128.33l.247.225 3.013 2.953c.288.282.447.683.235 1.025a4.111 4.111 0 0 1-1.29 1.256c-.34.197-.73.043-1.01-.232l-3.026-2.966-.241-.283a.141.141 0 0 0-.25.092v4.17c0 .403-.173.797-.564.892-.534.13-1.275.13-1.809 0-.392-.095-.565-.49-.565-.892v-4.17c0-.14-.17-.21-.27-.11l-.296.301-3.026 2.966c-.28.274-.671.429-1.01.232a4.112 4.112 0 0 1-1.291-1.255c-.212-.343-.053-.744.235-1.026l3.014-2.953a.324.324 0 0 0-.228-.555H1.98c-.393 0-.78-.164-.878-.544A3.695 3.695 0 0 1 1 10c0-.6.122-1.2.367-1.44Z' stroke='currentColor' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-talentify':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M17.5 8 14 7l2.5 5.5L19 10l-1.5-2Zm-5.25 9.5 1-3.5-5.5 2.5 2.5 2.5 2-1.5Zm-9.75-5 3.5 1L3 8 1 9.5l1.5 3Zm5-9.5-1 3.5 5.5-3L10 1 7.5 3Z' fill='currentColor' fill-opacity='0.12'/><path d='M3 7.32V4.924a1.5 1.5 0 0 1 1.5-1.5H7M3 7.321l2 3.41M3 7.32 1.414 9.175a1.5 1.5 0 0 0 .093 2.05L3.5 13.167M7 3.423 6 7.077m1-3.654 1.854-1.806a1.5 1.5 0 0 1 2.186.1l1.46 1.706M5 10.731l1.5 2.923M5 10.73l1-3.654m-2.5 6.09 3 .487m-3-.487v1.91a1.5 1.5 0 0 0 1.5 1.5h2m-.5-2.923 3.5 1.461m-3 1.462 3-1.462m-3 1.462 1.953 1.903a1.5 1.5 0 0 0 2.094 0l1.453-1.416M10 15.115l4-1.948m-1.5 3.897 1.5-3.897m-1.5 3.897H15a1.5 1.5 0 0 0 1.5-1.5V12.68m-2.5.487 1-3.898m1.5 3.41L15 9.27m1.5 3.41 1.805-1.465a1.5 1.5 0 0 0 .195-2.14L17 7.321m-2 1.948-2-2.923m4 .975-4-.975m4 .975V4.923a1.5 1.5 0 0 0-1.5-1.5h-3m.5 2.923-3.5-.974m3-1.949-3 1.949m0 0L6 7.077' stroke='currentColor' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-airtable':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1.5 13.595V7.88c0-.18.184-.3.348-.23l6.157 2.639a.25.25 0 0 1 .013.453L1.862 13.82a.25.25 0 0 1-.362-.224Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linejoin='round'/><path d='M9.91 2.783 3.087 5.285a.25.25 0 0 0-.013.464l6.83 2.96a.25.25 0 0 0 .193.002l6.823-2.729a.25.25 0 0 0 0-.464l-6.831-2.732a.25.25 0 0 0-.179-.003Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linejoin='round'/><path d='M18.5 14.329V8.115a.25.25 0 0 0-.34-.233l-7.25 2.806a.25.25 0 0 0-.16.233v6.214a.25.25 0 0 0 .34.233l7.25-2.806a.25.25 0 0 0 .16-.233Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linejoin='round'/><path d='M8 10.6 1.5 10V7.5L8 10.6Z' fill='currentColor' fill-opacity='0.12'/></svg>",
	'esf-form-productive':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M13.302 10.3c1.072-1.767 2.283-2.714 3.793-2.924.37-.05.733-.139.83-.708l.566-3.25a.758.758 0 0 0-.73-.918c-2.78 0-6.013 1.128-8.535 5.359l-2.069 3.638-1.991-3.443a.725.725 0 0 0-1.007-.264L1.361 9.483a.761.761 0 0 0-.258 1.03l3.543 6.128c.31.534.874.862 1.483.859l2.11-.008a1.707 1.707 0 0 0 1.474-.873l3.558-6.265.031-.055Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M19 12.126c0 1.156-.916 2.093-2.045 2.093-1.13 0-2.046-.937-2.046-2.093s.916-2.093 2.046-2.093S19 10.97 19 12.126Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/></svg>",
	'esf-form-active-campaign':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m5 1.5 10.272 7.276a1.5 1.5 0 0 1 0 2.448L5 18.5m0-12 5.5 3.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'esf-form-campaign-monitor':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M18.604 3.786 1.627 16.047a.25.25 0 0 0 .146.453H18.75a.25.25 0 0 0 .25-.25V3.989a.25.25 0 0 0-.396-.203Z' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m8.715 8.232-7.307 5.937A.25.25 0 0 1 1 13.975V3.927a.25.25 0 0 1 .373-.217L8.68 7.82a.25.25 0 0 1 .035.412Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round'/></svg>",
	'esf-form-pardot':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='m7 17.75-1.157.145A.75.75 0 0 1 5 17.15v-.4a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v1Zm0 0V18m1.5 0v-1.25a.75.75 0 0 1 .75-.75h.25m3 0h-1.25a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75h.5a.75.75 0 0 0 .75-.75V14m5 0v3.25c0 .414.336.75.75.75h.25m-2-3h2M2 18v-1.5a.5.5 0 0 1 .5-.5H3a.75.75 0 0 1 .75.75v.5A.75.75 0 0 1 3 18H2Zm0 0v1.5M15.25 16h-.5a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75h.5a.75.75 0 0 0 .75-.75v-.5a.75.75 0 0 0-.75-.75Z' stroke='currentColor' stroke-width='0.75' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M1.262 10.135a3.29 3.29 0 0 1 .954-3.847c-.763-1.153 0-2.724.476-3.365C3.17 2.282 4.503 1 6.03 1c1.525 0 2.542.962 2.86 1.442.317-.32 1.239-.961 2.382-.961 1.144 0 1.748.961 1.907 1.442 1.906-.77 3.336-.32 3.813 0 1.112.801 2.955 2.98 1.43 5.289-1.526 2.307-3.178 2.243-3.813 1.923 0 .16-.286.673-1.43 1.442-1.144.77-2.066.32-2.383 0-.953 1.442-2.383 1.923-3.813 1.923-1.144 0-2.383-.961-2.86-1.442-.635.16-2.097 0-2.86-1.923Z' stroke='currentColor' stroke-linejoin='round' fill='none'/><path d='M12 4.82c-.583-.138-1.75-.165-1.75.825l-.146 1.105M8.5 10.185c1.05.33 1.313-.687 1.313-1.238l.29-2.197m-1.165 0h1.166m1.459 0h-1.46M7.5 5.874c-.417-.295-2.083-.443-2.083.443 0 .866 1.666 1.064 1.666 1.773 0 .71-1.527.591-2.083.443' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-clearbit':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 3a2 2 0 0 1 2-2h5v18H3a2 2 0 0 1-2-2V3Z' fill='currentColor' fill-opacity='0.5' stroke='currentColor'/><path d='M11 1h5.5a2 2 0 0 1 2 2v5.5H11V1Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M11 11.5h7.5V17a2 2 0 0 1-2 2H11v-7.5Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/></svg>",
	'esf-google-optimize':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M19 3.5v6.25a2.25 2.25 0 0 1-4.5 0V6.5a1 1 0 0 0-1-1h-3.25a2.25 2.25 0 0 1 0-4.5h6.25A2.5 2.5 0 0 1 19 3.5Zm-7 7v6.25a2.25 2.25 0 0 1-4.5 0V13.5a1 1 0 0 0-1-1H3.25a2.25 2.25 0 0 1 0-4.5H9.5a2.5 2.5 0 0 1 2.5 2.5Z' stroke='currentColor' fill='none'/><circle cx='3.25' cy='10.25' r='2.25' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/></svg>",
	'esf-infobip':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M4.565 8.068a3.715 3.715 0 0 1 3.503-3.503C8.738 4.527 9.415 4.5 10 4.5s1.263.027 1.932.065a3.715 3.715 0 0 1 3.503 3.503c.038.67.065 1.347.065 1.932s-.027 1.263-.065 1.932a3.715 3.715 0 0 1-3.503 3.503c-.67.038-1.348.065-1.932.065-.585 0-1.263-.027-1.932-.065a3.715 3.715 0 0 1-3.503-3.503A35.094 35.094 0 0 1 4.5 10c0-.585.027-1.263.065-1.932Z' stroke='currentColor' stroke-linejoin='round' fill='none'/><path d='M1.086 7.208a6.463 6.463 0 0 1 6.122-6.122A54.348 54.348 0 0 1 10 1c.849 0 1.819.035 2.792.086a6.463 6.463 0 0 1 6.122 6.122C18.965 8.181 19 9.151 19 10c0 .849-.035 1.819-.086 2.792a6.463 6.463 0 0 1-6.122 6.122c-.973.051-1.943.086-2.792.086-.849 0-1.819-.035-2.792-.086a6.463 6.463 0 0 1-6.122-6.122A54.348 54.348 0 0 1 1 10c0-.849.035-1.819.086-2.792Z' stroke='currentColor' stroke-linejoin='round' fill='none'/><rect x='8' y='8' width='4' height='4' rx='1' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-linejoin='round'/></svg>",
	'esf-workable':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1.5 5.75c.166 2.833 1.391 8.5 4.968 8.5 3.576 0 5.464-3.667 5.96-5.5.166-.667.1-2.1-1.49-2.5-1.589-.4-2.318.833-2.483 1.5-.166.5 0 2 .993 3m2.98 2.5c.994.667 3.379 1.3 4.969-1.5.668-1.177.979-2.277 1.103-3.219' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'esf-country':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M7.086 2.543 4 4.086l.514 7.2 6.686-.515 5.143-1.542-.514-7.2-8.743.514Z' fill='currentColor' fill-opacity='0.12'/><path d='M4.257 4.086c.857-.686 3.291-1.955 6.171-1.543 2.88.411 4.972-.857 5.657-1.543v8.229c-.685.685-2.777 1.954-5.657 1.542-2.88-.411-5.314.858-6.171 1.543m0-8.228v8.228m0-8.228V3.57m0 8.743V19' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-date':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill='currentColor' fill-opacity='0.12' d='M1.25 1.25h17.5v4H1.25z'/><rect x='1' y='1' width='18' height='18' rx='1.5' stroke='currentColor' fill='none'/><path d='M1 5.5h18M1 10h18M5.5 5.5V19M10 5.5V19m4.5-13.5V19M1 14.5h18' stroke='currentColor' fill='none'/><path fill='currentColor' fill-opacity='0.5' d='M10.25 10.25h4v4h-4z'/></svg>",
	'esf-time':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><circle cx='10' cy='10' r='9' stroke='currentColor' fill='none'/><path d='M10 4.25v5.714L7 12.25' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='m10 10 6 4' stroke='currentColor' stroke-opacity='0.12' stroke-linecap='round' fill='none'/></svg>",
	'esf-phone':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5.143 1h-2.95c-.658 0-1.201.519-1.19 1.175.057 3.287.916 7.067 3.512 10.31 3.957 4.945 9.65 6.346 13.082 6.5.79.036 1.403-.623 1.403-1.413v-2.763a1.5 1.5 0 0 0-1.364-1.494l-3.013-.274a1.5 1.5 0 0 0-1.096.341l-1.533 1.277a.485.485 0 0 1-.54.059c-2.849-1.542-5.117-4.51-6.068-6.085a.483.483 0 0 1 .077-.592L6.515 6.99a1.5 1.5 0 0 0 .433-1.197l-.312-3.429A1.5 1.5 0 0 0 5.143 1Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round'/></svg>",
	'esf-jira':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.626 10.192 10 12.82a4.643 4.643 0 0 1 0 6.566l8.485-8.486a1 1 0 0 0 0-1.414L10 1a4.643 4.643 0 0 0 0 6.566l2.626 2.626Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='M7.374 10.192 10 7.566A4.643 4.643 0 0 1 10 1L1.515 9.485a1 1 0 0 0 0 1.415L10 19.384a4.643 4.643 0 0 0 0-6.566l-2.626-2.627Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/></svg>",
	'esf-steps':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><rect x='1' y='1' width='7' height='7' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><rect x='1' y='10' width='7' height='7' rx='1.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path fill='currentColor' fill-opacity='0.12' d='M1.5 19h6v1h-6z'/><path d='M1 20a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1' stroke='currentColor' fill='none'/><path d='M10 4.5h7.5M10 14h7.5' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M4.75 6.5v-4l-1 .8m-.25 8.2h1.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 0-.75.75v1.25h2' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-chilli-piper':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.21 18.649c1.204-.398 3.51-1.492 4.01-1.989.836.331 2.005.994 2.005.994-.5 0-7.518 1.492-6.014.995Zm7.52-2.486-2.005-.994L10.5 11.5c1.604 1.193 3.76 1.57 4.5 1.75-2.406 2.386-4.77 2.913-5.27 2.913Zm7.016-4.971c-2.405 0-4.677-1.326-5.513-1.988l1.002-3.48c3.208 0 5.347 1.326 6.015 1.988l-1.504 3.48Z' fill='currentColor' fill-opacity='0.3'/><path d='M14.24 3.736c1.504.497 1.504.396 2.005.595m2.005.896c-1.002-.497-1.002-.497-2.005-.896m1.003-3.081c0 .424-.2 1.634-1.003 3.081M6.221 16.661c-.502.496-2.807 1.59-4.01 1.988-1.504.497 5.513-.995 6.014-.995 0 0-1.169-.663-2.004-.994Zm1.504-1.492 2.005.994c.5 0 2.864-.527 5.27-2.913-.74-.18-2.896-.557-4.5-1.75l-2.775 3.669Zm3.508-5.965c.835.662 3.108 1.988 5.513 1.988l1.504-3.48c-.668-.662-2.807-1.988-6.014-1.988l-1.003 3.48Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-pipedrive':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M3 4.5V1h4.5L8 3l1.5-1 2-.5L15 3l2 3.5-.5 4-2.5 3-3 1L8 13v6H4.5V4.5H3Zm7.5.5L9 6l-.5 2 1 2.5 2 .5 2-2-.5-3-1.5-1h-1Z' fill='currentColor' fill-opacity='0.3'/><ellipse cx='11.0506' cy='8' rx='2.45' ry='3.15' stroke='currentColor' stroke-linejoin='round' fill='none'/><path d='M6.9 1H3v3.5h1.4v14.7h3.5v-6.282c.959.865 2.176 1.382 3.5 1.382 3.093 0 5.6-2.82 5.6-6.3s-2.507-6.3-5.6-6.3c-1.324 0-2.541.517-3.5 1.382V2a1 1 0 0 0-1-1Z' stroke='currentColor' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-cloudflare':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M11.984 13.5H1a3.006 3.006 0 0 1 3.373-2.473 1.502 1.502 0 0 1 2.14-2.105C7.136 7.065 8.677 5.75 10.48 5.75c1.379 0 2.604.768 3.383 1.96l.183.29m1.204 5.5H19V13c0-1.526-.98-2.824-2.345-3.303' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M6.5 11.5H11m0 0c1.167 0 3-1 4-2.5 0 .833.4 2.5 2 2.5-1 0-3.1.4-3.5 2 0-.667-.9-2-2.5-2Z' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-wp-rocket':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5 1H2.5L6 13.5h.5l3.25-7h.5l3.25 7h.5L17.5 1H15l-1.5 6-3-6h-1l-3 6L5 1Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='M7.5 15.25 10 9.5l2.5 5.75-1 3.75-1.5-2-1.5 2-1-3.75Z' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/></svg>",
	'esf-form-wpml':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M16.374 16.701c.433 1.724-.542 2.515-1.084 2.694-1.373.273-1.877-.016-2.061-.539-.216-.359-.54-1.077-.107-1.077.433 0 .252.718.107 1.077.184.523.688.812 2.06.54.543-.18 1.518-.97 1.085-2.695-.434-1.724-2.348-1.437-3.252-1.078-1.445.719-4.985 1.617-7.586-.538C2.284 12.39.658 7.54 3.368 3.769 5.536.752 9.329.357 10.955.536 13.303.716 18 2.476 18 8.08c0 5.604-2.529 6.286-3.793 5.927-1.575-.539-3.996-2.479-1.084-5.927 2.912-3.449 1.134-4.887 0-5.388-1.626-.719-5.528-1.293-8.129 2.155-2.6 3.448-.723 8.262.542 10.238 2.6 2.155 6.141 1.257 7.586.538.903-.359 2.818-.646 3.252 1.078Z' fill='currentColor' fill-opacity='0.3'/><path d='M13.122 17.779c0 .395 0 .775.107 1.077m-.107-1.077c.433 0 .252.718.107 1.077m-.107-1.077c-.434 0-.11.718.107 1.077m-7.693-3.771c2.6 2.155 6.141 1.257 7.586.538.903-.359 2.818-.646 3.252 1.078.433 1.724-.542 2.515-1.084 2.694-1.373.273-1.877-.016-2.061-.539m-7.693-3.771C2.284 12.39.658 7.54 3.368 3.769 5.536.752 9.329.357 10.955.536 13.303.716 18 2.476 18 8.08c0 5.604-2.529 6.286-3.793 5.927-1.575-.539-3.996-2.479-1.084-5.927 2.912-3.449 1.134-4.887 0-5.388-1.626-.719-5.528-1.293-8.129 2.155-2.6 3.448-.723 8.262.542 10.238Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-star-rating':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.522 6.866a.5.5 0 0 1 .957 0l.682 2.253a.5.5 0 0 0 .49.355l2.37-.056c.498-.012.705.633.293.913l-1.937 1.319a.5.5 0 0 0-.19.581l.785 2.198a.5.5 0 0 1-.772.568l-1.899-1.43a.5.5 0 0 0-.601 0l-1.9 1.43a.5.5 0 0 1-.77-.568l.783-2.198a.5.5 0 0 0-.19-.581l-1.935-1.32c-.412-.28-.205-.925.293-.913l2.369.056a.5.5 0 0 0 .49-.355l.683-2.253Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='m5.927 12.449-2.135 1.524a.5.5 0 0 1-.759-.583l.938-2.492a.5.5 0 0 0-.197-.596L1.487 8.825c-.424-.274-.222-.931.282-.92l2.854.064a.5.5 0 0 0 .488-.348l.84-2.63a.5.5 0 0 1 .952 0L7.704 7.5m6.369 4.949 2.135 1.524a.5.5 0 0 0 .759-.583l-.938-2.492a.5.5 0 0 1 .197-.596l2.287-1.477c.424-.274.222-.931-.282-.92l-2.854.064a.5.5 0 0 1-.488-.348l-.84-2.63a.5.5 0 0 0-.952 0L12.296 7.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-store-entries':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M16 8c-5.2 2.39-10.167.996-12 0v9.46c5.2 2.789 10.167 1.162 12 0V8Z' fill='currentColor' fill-opacity='0.12'/><path d='M6.085 5.525C4.808 5.922 4 6.51 4 7.167c0 1.196 2.686 2.166 6 2.166s6-.97 6-2.166c0-.657-.809-1.245-2.085-1.642' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='M16 10.5c0 1.197-2.686 2.167-6 2.167s-6-.97-6-2.167m12 3.25c0 1.197-2.686 2.167-6 2.167s-6-.97-6-2.167' stroke='currentColor' fill='none'/><path d='M4 7.167v9.666C4 18.03 6.686 19 10 19s6-.97 6-2.167V7.167' stroke='currentColor' stroke-linecap='round' fill='none'/><path d='m12 5-2 2m0 0L8 5m2 2V1.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-calculate':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M1 2.5A1.5 1.5 0 0 1 2.5 1H9v8H1V2.5ZM1 11h8v8H2.5A1.5 1.5 0 0 1 1 17.5V11ZM11 1h6.5A1.5 1.5 0 0 1 19 2.5V9h-8V1Z' stroke='currentColor' fill='none'/><path d='M11 11h8v6.5a1.5 1.5 0 0 1-1.5 1.5H11v-8Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M5 3v4m2-2H3m14 0h-4m4 9h-4m4 2h-4m-9.414-2.414 2.829 2.828m0-2.828-2.829 2.828' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'esf-compute':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 14.5v-9Z' stroke='currentColor' fill='none'/><path d='M7 7.75A.75.75 0 0 1 7.75 7h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Z' fill='currentColor' fill-opacity='0.3' stroke='currentColor' stroke-linejoin='round'/><path d='M7 4V1.5M10 4V1.5M13 4V1.5m-6 17V16m3 2.5V16m3 2.5V16M1.5 7H4m-2.5 3H4m-2.5 3H4m12-6h2.5M16 10h2.5M16 13h2.5' stroke='currentColor' stroke-linecap='round' fill='none'/></svg>",
	'esf-slider':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5 8H1.75a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75H5m4-2h9.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75H9' stroke='currentColor' fill='none'/><circle cx='7' cy='9' r='2' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/><path d='M1 13v1m9-1v1' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/><path d='M5.5 13v1m9-1v1' stroke='currentColor' stroke-opacity='0.3' stroke-linecap='round' fill='none'/><path d='M19 13v1' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' fill='none'/></svg>",
	'esf-calculate-output':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M15.5 12.5v-10A1.5 1.5 0 0 0 14 1H3a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 3 19h9.5' stroke='currentColor' fill='none'/><rect x='9' y='9' width='2' height='2' rx='1' fill='currentColor'/><rect x='3' y='2.5' width='11' height='5.5' rx='1' fill='currentColor' fill-opacity='0.5'/><rect x='3' y='15' width='2' height='2' rx='1' fill='currentColor'/><rect x='6' y='15' width='2' height='2' rx='1' fill='currentColor'/><rect x='9' y='15' width='2' height='2' rx='1' fill='currentColor'/><rect x='3' y='12' width='2' height='2' rx='1' fill='currentColor'/><rect x='6' y='12' width='2' height='2' rx='1' fill='currentColor'/><rect x='9' y='12' width='2' height='2' rx='1' fill='currentColor'/><rect x='3' y='9' width='2' height='2' rx='1' fill='currentColor'/><rect x='6' y='9' width='2' height='2' rx='1' fill='currentColor'/><rect x='12' y='9' width='2' height='2' rx='0.5' fill='currentColor' fill-opacity='0.5'/><path d='M12.5 5.813v.375c0 .31-.336.562-.75.562S11 6.498 11 6.187v-.375c0-.31.336-.562.75-.562m0 0c.414 0 .75-.252.75-.563v-.375c0-.31-.336-.562-.75-.562s-.75.252-.75.563v.375c0 .31.336.562.75.562Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12 18.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5Zm6.354-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708l1.147 1.146H14a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z' fill='currentColor'/></svg>",
	'esf-calculate-field':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M15.5 12.5v-10A1.5 1.5 0 0 0 14 1H3a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 3 19h9.5' stroke='currentColor' fill='none'/><rect x='9' y='9' width='2' height='2' rx='1' fill='currentColor'/><rect x='3' y='2.5' width='11' height='5.5' rx='1' fill='currentColor' fill-opacity='0.5'/><rect x='3' y='15' width='2' height='2' rx='1' fill='currentColor'/><rect x='6' y='15' width='2' height='2' rx='1' fill='currentColor'/><rect x='3' y='12' width='2' height='2' rx='1' fill='currentColor'/><rect x='6' y='12' width='2' height='2' rx='1' fill='currentColor'/><rect x='3' y='9' width='2' height='2' rx='1' fill='currentColor'/><rect x='6' y='9' width='2' height='2' rx='1' fill='currentColor'/><rect x='12' y='9' width='2' height='2' rx='0.5' fill='currentColor' fill-opacity='0.5'/><path d='M11.75 5.25c-.414 0-.75.252-.75.563v.375c0 .31.336.562.75.562s.75-.252.75-.563v-.375c0-.31-.336-.562-.75-.562Zm0 0c.414 0 .75-.252.75-.563v-.375c0-.31-.336-.562-.75-.562s-.75.252-.75.563v.375c0 .31.336.562.75.562Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M9 18.5a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 9 13.5v5Zm2-5a.5.5 0 0 0 0 1h.25v3H11a.5.5 0 0 0 0 1h1.5a.5.5 0 0 0 0-1h-.25v-3h.25a.5.5 0 0 0 0-1H11Z' fill='currentColor'/></svg>",
	'esf-result-output':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.5 16h-10A1.5 1.5 0 0 1 1 14.5v-12A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v10' stroke='currentColor' stroke-opacity='0.3' fill='none'/><rect x='3' y='3' width='10' height='2.5' rx='1' stroke='currentColor' stroke-linejoin='round' fill='none'/><rect x='3' y='7.5' width='10' height='2.5' rx='1' stroke='currentColor' stroke-linejoin='round' fill='none'/><rect x='8' y='11.75' width='5' height='2.5' rx='1' fill='currentColor' fill-opacity='0.5'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12 18.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5Zm6.354-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708l1.147 1.146H14a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z' fill='currentColor'/><path d='m3.75 13 1.09 1 1.91-2' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-success-output':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M12 18.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5Zm6.354-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708l1.147 1.146H14a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z' fill='currentColor'/><circle cx='8.5' cy='8.5' r='7.5' fill='currentColor' fill-opacity='0.12' stroke='currentColor'/><path d='M4.5 9.292 7.167 12 12.5 5.5' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-form-output':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.5 16h-10A1.5 1.5 0 0 1 1 14.5v-12A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v10' stroke='currentColor' stroke-opacity='0.3' fill='none'/><rect x='3' y='3' width='10' height='2.5' rx='1' stroke='currentColor' stroke-linejoin='round' fill='none'/><rect x='3' y='7.5' width='10' height='2.5' rx='1' stroke='currentColor' stroke-linejoin='round' fill='none'/><rect x='7' y='11.75' width='6' height='2.5' rx='1' fill='currentColor' fill-opacity='0.5'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12 18.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5Zm6.354-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708l1.147 1.146H14a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z' fill='currentColor'/></svg>",
	'esf-variable-output':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M12.5 15h-10A1.5 1.5 0 0 1 1 13.5v-11A1.5 1.5 0 0 1 2.5 1h13A1.5 1.5 0 0 1 17 2.5v10' stroke='currentColor' stroke-opacity='0.3' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12 18.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5Zm6.354-2.146a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708l1.147 1.146H14a.5.5 0 0 0 0 1h2.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z' fill='currentColor'/><path d='M6.946 4.734c-.3-1.018-.988-1.087-1.73-1.087-.741 0-1.53.426-1.53 1.168 0 .594.186.87 1.06 1.227l1.206.456c.874.357 1.111.622 1.138 1.21.045 1.015-1.055 1.223-1.796 1.223-.742 0-1.528-.102-1.794-1.007M5.284 3l.01 6.753' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='m13 5 2 1.5m0 0L13 8m2-1.5H7.5m0 0c1 0 2.5 1 2.5 3.5v2.5m-2.5-6h-2m6 4-1.5 2m0 0-1.5-2' stroke='currentColor' stroke-opacity='0.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-block-filter':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M14.5 10 10 12.5V19l4.5-2.5V10Z' fill='currentColor' fill-opacity='0.3'/><path d='M5.209 2.886 8.674 6.99a.5.5 0 0 1 .118.323v2.813a.5.5 0 0 0 .754.43l1.212-.715a.5.5 0 0 0 .246-.43V7.323a.5.5 0 0 1 .13-.337l3.762-4.11' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M15.111 2.444c0 .798-2.263 1.445-5.055 1.445C7.263 3.889 5 3.242 5 2.444 5 1.647 7.263 1 10.056 1c2.792 0 5.055.647 5.055 1.444Z' stroke='currentColor' fill='none'/><path d='m9.941 19-4.563-2.608a.75.75 0 0 1-.378-.65V9.823l4.941 2.823V19Z' fill='currentColor' fill-opacity='0.12' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'/><path d='m9.94 19 4.564-2.608a.75.75 0 0 0 .378-.65V9.823L9.94 12.647V19Z' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M8.664 7.73 5 9.824l4.941 2.823 4.941-2.823L11 7.605' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
	'esf-talentlyft':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M16.25 7.25c0 3.452-3.447 7.75-6.25 7.75-3 0-6.25-4.298-6.25-7.75a6.25 6.25 0 1 1 12.5 0Z' stroke='currentColor' fill='none'/><path fill-rule='evenodd' clip-rule='evenodd' d='M15.773 4.851a6.239 6.239 0 0 0-.791-1.375c-3.441.906-5.608-.832-6.447-2.303a6.208 6.208 0 0 0-1.508.578c1 2.032 3.495 4.383 8.746 3.1Z' fill='currentColor' fill-opacity='0.3'/><path fill-rule='evenodd' clip-rule='evenodd' d='M16.023 8.904a6.688 6.688 0 0 0 .224-1.856C10.32 9.046 6.139 5.864 5.187 3.262a6.247 6.247 0 0 0-.983 1.644c3.411 4.884 8.474 4.763 11.82 3.998Z' fill='currentColor' fill-opacity='0.3'/><path fill-rule='evenodd' clip-rule='evenodd' d='M4.637 10.783c-.553-1.18-.887-2.426-.887-3.533v-.04c1.816 2.592 5.492 5.397 11.464 3.788a11.89 11.89 0 0 1-1.335 2.054c-2.324.14-6.525-.168-9.242-2.269Z' fill='currentColor' fill-opacity='0.3'/><path d='M10 17c-.402 0-.767-.158-1.036-.415a.292.292 0 0 0-.2-.085.264.264 0 0 0-.264.264v.736c.013.827.68 1.5 1.5 1.5s1.487-.673 1.5-1.5v-.736a.264.264 0 0 0-.264-.264.292.292 0 0 0-.2.085c-.27.257-.634.415-1.036.415Z' stroke='currentColor' fill='none'/></svg>",
	'esf-corvus-pay':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M4.884 10.004c-.372-4.092-2.17-3.72-3.255-3.255 1.085-1.24 3.255-3.72 5.58-1.396 2.326-4.65 8.61-3.459 11.162-2.325v3.256c-1.86-1.86-6.494-1.418-7.906.465-1.395 1.86-1.395 6.975 1.86 7.905 2.28.652 5.115-.155 6.046-.93v2.79c-2.233 2.233-6.511 1.706-8.371.93-1.55-.774-4.744-3.348-5.116-7.44Z' stroke='currentColor' stroke-linejoin='round' fill='none'/><path d='M8.605 14.19C6.67 11.356 6.589 7.368 7.209 5.352l.466-.93 1.86-1.395 1.86-.93h2.325l2.79.465c-3.166.327-5.688 2.825-6.393 4.08l-.582 3.36.93 3.721 1.86.93h3.72l2.322-.928c.002-.413.003-.6.003-.002 0 .505-.006.863-.012 1.15a7.042 7.042 0 0 1-.008.37c.089.452-1.756 1.111-3.805 1.281-2.352.097-4.319.039-5.94-2.336Z' fill='currentColor' fill-opacity='0.3'/></svg>",
	'esf-paycek':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.733 10.688 1.5 18.5h1.54a3 3 0 0 0 2.942-2.412L6.5 13.5h5.143A6.857 6.857 0 0 0 18.5 6.643 5.143 5.143 0 0 0 13.357 1.5h-2.474a4 4 0 0 0-3.795 2.735L6.5 6H13a1.5 1.5 0 0 1 0 3H4.709a2 2 0 0 0-1.976 1.688Z' stroke='currentColor' fill='none'/><path d='M12.495 13.5c3.6-1.2 3.107-4.926 2.44-6.426l-.94 1.426-1 .5h-3c-2.8 0-3.698 2.817-3.981 4.39l6.481.11Z' fill='currentColor' fill-opacity='0.3'/></svg>",
	'esf-nation-builder':
		"<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path opacity='0.8' d='M6.317 2.337a8.515 8.515 0 0 0-4.606 5.77' stroke='currentColor' fill='none'/><path opacity='0.7' d='M1.711 8.108A8.574 8.574 0 0 0 3.354 15.3' stroke='currentColor' fill='none'/><path opacity='0.5' d='M10 18.5a8.484 8.484 0 0 1-6.646-3.2' stroke='currentColor' fill='none'/><path opacity='0.7' d='M10 18.5c2.696 0 5.1-1.256 6.657-3.214' stroke='currentColor' fill='none'/><path d='M16.656 15.286a8.564 8.564 0 0 0 1.632-7.178' stroke='currentColor' fill='none'/><path opacity='0.9' d='M18.289 8.108a8.516 8.516 0 0 0-4.59-5.764' stroke='currentColor' fill='none'/><path opacity='0.5' d='M6.316 2.337a8.57 8.57 0 0 1 7.382.007' stroke='currentColor' fill='none'/><path d='m9 5.5-1.5 9m5-9-1.5 9m-5-3h7.5M6.5 8H14' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
};
