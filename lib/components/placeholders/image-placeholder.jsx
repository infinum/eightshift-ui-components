import { clsx } from 'clsx/lite';
import { icons } from '../../icons/icons';

/**
 * A simple image placeholder, with an empty state.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.url] - The image URL.
 * @param {string} [props.alt] - The image alt text.
 * @param {ImagePlaceholderStyle} [props.style='default'] - Style of the image placeholder.
 * @param {ImagePlaceholderSize} [props.size='default'] - Size of the image placeholder.
 * @param {boolean} [props.noImage] - If `true`, the image within the placeholder will not be displayed, even if `url` is provided.
 * @param {string} [props.className] - Classes to pass to the component.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {ImagePlaceholderImageMode} [props.imageMode='cover'] - Determines inner image display mode.
 *
 * @returns {JSX.Element} The ImagePlaceholder component.
 *
 * @typedef {'default' | 'simple'} ImagePlaceholderStyle
 * @typedef {'cover'|'contain' | 'fill'} ImagePlaceholderImageMode
 * @typedef @typedef {'auto' | 'default' | 'large' | 'fullWidth' | 'fullHeight' | 'full' | 'video'} ImagePlaceholderSize
 *
 * @example
 * <ImagePlaceholder url="https://example.com/image.jpg" alt="Image alt text" />
 *
 * @preserve
 */
export const ImagePlaceholder = (props) => {
	const { url, alt, style = 'default', size = 'default', noImage, className, hidden, imageMode = 'cover' } = props;

	if (hidden) {
		return null;
	}

	const styleClassName = {
		default:
			'es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-text-gray-300 es-uic-shadow',
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
				'es-uic-grid es-uic-grid-cols-1 es-uic-grid-rows-1 es-uic-overflow-hidden',
				'[&>*]:es-uic-col-start-1 [&>*]:es-uic-col-end-1 [&>*]:es-uic-row-start-1 [&>*]:es-uic-row-end-1',
				styleClassName[style] ?? styleClassName?.default,
				sizeClassName[size] ?? sizeClassName?.default,
				className,
			)}
		>
			{!noImage && (
				<img
					className={clsx(
						'es-uic-size-full es-uic-select-none es-uic-fill-mode-forwards',
						imageMode === 'cover' && 'es-uic-object-cover',
						imageMode === 'contain' && 'es-uic-object-contain',
						imageMode === 'fill' && 'es-uic-object-fill',
						url?.length > 0
							? 'es-uic-animate-in es-uic-fade-in-0 es-uic-zoom-in-95'
							: 'es-uic-animate-out es-uic-fade-out-0 es-uic-zoom-out-95',
					)}
					src={url}
					alt={alt}
				/>
			)}

			<div
				className={clsx(
					'es-uic-place-self-center es-uic-justify-self-center es-uic-transition es-uic-fill-mode-forwards [&>svg]:es-uic-size-7',
					!url
						? 'es-uic-animate-in es-uic-fade-in-0 es-uic-zoom-in-95'
						: 'es-uic-animate-out es-uic-fade-out-0 es-uic-zoom-out-95',
				)}
			>
				{icons.image}
			</div>
		</div>
	);
};
