import { classnames } from '../../utilities/classnames';

/**
 * A simple spacer/divider component, with optional text or icon.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {SpacerSize} [props.size='m'] - The size of the spacer. Can be 's' or 'm'.
 * @param {boolean} [props.border=false] - Whether to show a border in the middle.
 * @param {string} [props.className] - Additional classes to add.
 * @param {string} [props.text] - Text to display.
 * @param {JSX.Element} [props.icon] - Icon to display.
 * @param {boolean} [props.vertical=false] - Whether the spacer is vertical.
 *
 * @returns {JSX.Element} The Spacer component.
 *
 * @typedef {'xs' | 's' | 'm'} SpacerSize
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
	const { size = 'm', border, className, text, icon, vertical = false } = props;

	const sizes = {
		xs: {
			sizeHorizontal: 'es-uic-h-1',
			sizeHorizontalBorder: 'es-uic-h-0.5',
			sizeVertical: 'es-uic-w-1',
			sizeVerticalBorder: 'es-uic-w-0.5',
		},
		s: {
			sizeHorizontal: 'es-uic-h-2.5',
			sizeHorizontalBorder: 'es-uic-h-1',
			sizeVertical: 'es-uic-w-2.5',
			sizeVerticalBorder: 'es-uic-w-1',
		},
		m: {
			sizeHorizontal: 'es-uic-h-5',
			sizeHorizontalBorder: 'es-uic-h-2',
			sizeVertical: 'es-uic-w-5',
			sizeVerticalBorder: 'es-uic-w-2',
		},
	};

	const spaceClass = classnames(
		vertical ? 'es-uic-h-full' : 'es-uic-w-full',
		!vertical && !border && sizes[size].sizeHorizontal,
		!vertical && border && sizes[size].sizeHorizontalBorder,
		vertical && !border && sizes[size].sizeVertical,
		vertical && border && sizes[size].sizeVerticalBorder,
		className,
	);

	if (text || icon) {
		return (
			<div className={classnames('es-uic-flex es-uic-items-center es-uic-gap-1.5', className)}>
				{icon && (
					<span className='es-uic-shrink-0 es-uic-rounded es-uic-bg-gray-500 es-uic-p-0.5 es-uic-text-gray-50 es-uic-shadow-sm [&>svg]:es-uic-size-5.5'>
						{icon}
					</span>
				)}
				{text && (
					<span className='es-uic-shrink-0 es-uic-text-balance es-uic-text-sm es-uic-text-gray-500'>
						{text}
					</span>
				)}
				{border && <div className='es-uic-h-px es-uic-w-full es-uic-bg-gray-300' />}
			</div>
		);
	}

	if (border) {
		return (
			<div>
				<div className={spaceClass} />
				<div
					className={classnames(
						'es-uic-bg-gray-300',
						vertical ? 'es-uic-h-full es-uic-w-px' : 'es-uic-h-px es-uic-w-full',
					)}
				/>
				<div className={spaceClass} />
			</div>
		);
	}

	return <div className={spaceClass} />;
};
