import { clsx } from 'clsx';
import { icons } from '../../icons/icons';

/**
 * A simple media placeholder, with an empty state.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {MediaPlaceholderStyle} [props.style='default'] - Style of the image placeholder.
 * @param {MediaPlaceholderSize} [props.size='default'] - Size of the image placeholder.
 * @param {string} [props.className] - Classes to pass to the component.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {JSX.Element} [props.icon] - Icon to show within the placeholder.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {string|JSX.Element} [props.helpText] - Text to show below the icon.
 *
 * @returns {JSX.Element} The MediaPlaceholder component.
 *
 * @typedef {'default'|'simple'} MediaPlaceholderStyle
 * @typedef {'auto' | 'default' | 'large' | 'fullWidth' | 'fullHeight' | 'full' | 'video'} MediaPlaceholderSize
 *
 * @example
 * <MediaPlaceholder url="https://example.com/image.jpg" alt="Image alt text" />
 *
 * @preserve
 */
export const MediaPlaceholder = (props) => {
	const { style = 'default', size = 'default', className, icon, helpText, children, flat, hidden } = props;

	if (hidden) {
		return null;
	}

	const styleClassName = {
		default: [
			'es:rounded-2xl es:bg-surface-100 es:text-surface-700',
			'es:inset-ring es:inset-ring-surface-300/60',
			'es:bg-linear-to-b es:from-surface-600/2 es:to-surface-500/16 es:from-25%',
			'es:inset-shadow-sm es:inset-shadow-surface-50/30',
			!flat && 'es:shadow-xs es:shadow-black/5',
		],
		simple: 'es:rounded-2xl es:inset-ring es:inset-ring-surface-200/75 es:bg-surface-50 es:text-surface-700 es:bg-linear-to-br es:from-surface-100/5 es:to-surface-100/40',
	};

	const sizeClassName = {
		auto: '',
		default: 'es:size-20',
		large: 'es:size-40',
		fullWidth: 'es:w-full',
		fullHeight: 'es:h-full',
		full: 'es:size-full',
		video: 'es:w-full es:aspect-video',
	};

	return (
		<div
			className={clsx(
				'es:flex es:flex-col es:items-center es:justify-center es:gap-2 es:overflow-hidden es:p-2',
				styleClassName[style] ?? styleClassName?.default,
				sizeClassName[size] ?? sizeClassName?.default,
				className,
			)}
		>
			<div className='es:icon:size-7'>{icon ?? icons.image}</div>

			{helpText && <div className='es:text-sm es:text-secondary-500'>{helpText}</div>}

			{children && <div className='es:mt-2 es:flex es:items-center es:gap-x-2 es:gap-y-2.5 es:text-sm'>{children}</div>}
		</div>
	);
};
