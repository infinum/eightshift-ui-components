import { useId } from 'react';

export const GenericColorSwatch = ({ style }) => {
	const clipId = useId();

	return (
		<svg
			style={style}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<defs>
				<clipPath id={`genericColorSwatchShape-${clipId}`}>
					<rect
						className='generic-swatch-icon-color-mask'
						x='1'
						y='1'
						width='18'
						height='18'
						rx='2'
					/>
				</clipPath>
			</defs>
			<g
				opacity='var(--checkerboard-opacity, 0)'
				clipPath={`url(#genericColorSwatchShape-${clipId})`}
				className='generic-swatch-icon-checkerboard-group'
			>
				<path
					fill='#CCC'
					d='M1 1h3v3H1V1zm0 6h3v3H1zm0 6h3v3H1zM7 1h3v3H7zm0 6h3v3H7zm0 6h3v3H7zm6-12h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3z'
				/>
				<path
					fill='#fff'
					d='M4 1h3v3H4zm0 6h3v3H4zm0 6h3v3H4zm6-12h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3zm6-12h3v3h-3V1zm0 6h3v3h-3zm0 6h3v3h-3z'
				/>
				<path
					fill='#CCC'
					d='M4 4h3v3H4zm0 6h3v3H4zm0 6h3v3H4zm6-12h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3zm6-12h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3v-3z'
				/>
				<path
					fill='#fff'
					d='M1 4h3v3H1zm0 6h3v3H1zm0 6h3v3H1v-3zM7 4h3v3H7zm0 6h3v3H7zm0 6h3v3H7zm6-12h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3z'
				/>
			</g>
			<rect
				className='generic-swatch-icon-color'
				x='1'
				y='1'
				width='18'
				height='18'
				rx='2'
				fill='var(--selected-color, currentColor)'
				stroke='gray'
			/>
			<path
				opacity='var(--selected-opacity, 0)'
				d='M4 16 16 4'
				stroke='gray'
				strokeLinejoin='round'
				fill='none'
			/>
			<circle
				opacity='var(--current-opacity, 0)'
				cx='10'
				cy='10'
				r='4.5'
				fill='#fff'
			/>
			<circle
				opacity='var(--current-opacity, 0)'
				cx='10'
				cy='10'
				r='2.5'
				fill='#000'
			/>
		</svg>
	);
};
