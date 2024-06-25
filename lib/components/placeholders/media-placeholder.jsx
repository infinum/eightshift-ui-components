import { clsx } from 'clsx/lite';
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
	const { style = 'default', size = 'default', className, icon, helpText, hidden } = props;

	if (hidden) {
		return null;
	}

	const styleClassName = {
		default: 'es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-text-gray-300 es-uic-shadow',
		simple: 'es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-border-dashed es-uic-text-gray-300',
	};

	const sizeClassName = {
		auto: '',
		default: 'es-uic-size-20',
		large: 'es-uic-size-40',
		fullWidth: 'es-uic-w-full',
		fullHeight: 'es-uic-h-full',
		full: 'es-uic-size-full',
		video: 'es-uic-w-full es-uic-aspect-video',
	};

	return (
		<div
			className={clsx(
				'es-uic-flex es-uic-flex-col es-uic-items-center es-uic-justify-center es-uic-gap-2 es-uic-overflow-hidden',
				styleClassName[style] ?? styleClassName?.default,
				sizeClassName[size] ?? sizeClassName?.default,
				className,
			)}
		>
			<div className='[&>svg]:es-uic-size-7'>{icon ?? icons.image}</div>

			{helpText && <div className='es-uic-text-sm es-uic-text-gray-400'>{helpText}</div>}
		</div>
	);
};
