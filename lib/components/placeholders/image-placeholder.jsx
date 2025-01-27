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
		default: 'es:rounded-xl es:border es:border-secondary-300 es:bg-secondary-50 es:text-secondary-300 es:shadow-xs',
		simple: 'es:rounded-xl es:border es:border-secondary-300 es:border-dashed es:text-secondary-300',
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
				'es:grid es:grid-cols-1 es:grid-rows-1 es:overflow-hidden',
				'es:*:col-start-1 es:*:col-end-1 es:*:row-start-1 es:*:row-end-1',
				styleClassName[style] ?? styleClassName?.default,
				sizeClassName[size] ?? sizeClassName?.default,
				className,
			)}
		>
			{!noImage && (
				<img
					className={clsx(
						'es:size-full es:select-none es:fill-mode-forwards',
						imageMode === 'cover' && 'es:object-cover',
						imageMode === 'contain' && 'es:object-contain',
						imageMode === 'fill' && 'es:object-fill',
						url?.length > 0
							? 'es:motion-opacity-in es:motion-scale-in-125 es:motion-blur-in-xs es:motion-delay-300/blur es:motion-duration-300 es:motion-ease-spring-snappy/scale'
							: 'es:hidden',
					)}
					src={url}
					alt={alt}
				/>
			)}

			<div
				className={clsx(
					'es:place-self-center es:justify-self-center es:transition es:fill-mode-forwards es:icon:size-7',
					!url ? 'es:motion-opacity-in es:motion-scale-in-90 es:motion-duration-300 es:motion-ease-spring-snappy/scale' : 'es:invisible',
				)}
			>
				{icons.image}
			</div>
		</div>
	);
};
