export const dividerStatus = (
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
);
