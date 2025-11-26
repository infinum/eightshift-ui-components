import { clsx } from 'clsx';
import { RichLabel } from '../rich-label/rich-label';

/**
 * A simple spacer/divider component, with optional text or icon.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {SpacerSize} [props.size='m'] - The size of the spacer. Can be 's' or 'm'.
 * @param {boolean} [props.border=false] - Whether to show a border in the middle.
 * @param {string} [props.className] - Additional classes to add.
 * @param {string} [props.text] - Text to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element} [props.icon] - Icon to display.
 * @param {boolean} [props.vertical=false] - Whether the spacer is vertical.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Spacer component.
 *
 * @typedef {'px' | 'xs' | 's' | 'm'} SpacerSize
 *
 * @example
 * <Spacer />
 *
 * <Spacer border />
 *
 * <Spacer vertical />
 * <Spacer vertical border />
 *
 * <Spacer text='My divider' icon={icons.myIcon} />
 *
 * @preserve
 */
export const Spacer = (props) => {
	const { size = 'px', border, className, text, subtitle, icon, vertical = false, hidden } = props;

	if (hidden) {
		return null;
	}

	const sizes = {
		px: {
			sizeHorizontal: 'es:h-px',
			sizeHorizontalBorder: 'es:h-px',
			sizeVertical: 'es:w-px',
			sizeVerticalBorder: 'es:w-px',
		},
		xs: {
			sizeHorizontal: 'es:h-1',
			sizeHorizontalBorder: 'es:h-0.5',
			sizeVertical: 'es:w-1',
			sizeVerticalBorder: 'es:w-0.5',
		},
		s: {
			sizeHorizontal: 'es:h-2.5',
			sizeHorizontalBorder: 'es:h-1',
			sizeVertical: 'es:w-2.5',
			sizeVerticalBorder: 'es:w-1',
		},
		m: {
			sizeHorizontal: 'es:h-5',
			sizeHorizontalBorder: 'es:h-2',
			sizeVertical: 'es:w-5',
			sizeVerticalBorder: 'es:w-2',
		},
	};

	const spaceClass = clsx(
		vertical ? 'es:h-full' : 'es:w-full',
		!vertical && !border && sizes[size].sizeHorizontal,
		!vertical && border && sizes[size].sizeHorizontalBorder,
		vertical && !border && sizes[size].sizeVertical,
		vertical && border && sizes[size].sizeVerticalBorder,
	);

	if (text || icon) {
		return (
			<div className={clsx('es:flex es:items-center es:gap-1.5', className)}>
				<RichLabel
					icon={icon}
					label={text}
					subtitle={subtitle}
					className='es:shrink-0 es:text-secondary-500'
				/>

				{border && <div className='es:h-px es:w-full es:bg-surface-300 es:leading-3' />}
			</div>
		);
	}

	if (border) {
		return (
			<div className={className}>
				{size !== 'px' && <div className={spaceClass} />}
				<div className={clsx('es:bg-surface-500/15', vertical ? 'es:h-full es:w-px' : 'es:h-px es:w-full')} />
				{size !== 'px' && <div className={spaceClass} />}
			</div>
		);
	}

	return <div className={clsx(spaceClass, className)} />;
};
