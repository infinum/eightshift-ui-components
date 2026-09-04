import { clsx } from 'clsx';
import { image } from '../../icons/internal';
import type { Prettify } from '../../utilities/types';

type ImagePlaceholderStyle = 'default' | 'simple';
type ImagePlaceholderImageMode = 'cover' | 'contain' | 'fill';
type ImagePlaceholderSize = 'auto' | 'default' | 'large' | 'fullWidth' | 'fullHeight' | 'full' | 'video';

type ImagePlaceholderProps = {
	/** The image URL. */
	url?: string;
	/** The image alt text. */
	alt?: string;
	/** Style of the image placeholder. Defaults to `'default'`. */
	style?: ImagePlaceholderStyle;
	/** Size of the image placeholder. Defaults to `'default'`. */
	size?: ImagePlaceholderSize;
	/** If `true`, the image within the placeholder will not be displayed, even if `url` is provided. */
	noImage?: boolean;
	/** Classes to pass to the component. */
	className?: string;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** Determines inner image display mode. Defaults to `'cover'`. */
	imageMode?: ImagePlaceholderImageMode;
};

/**
 * A simple image placeholder, with an empty state.
 *
 * @component
 * @param {ImagePlaceholderProps} props - Component props.
 *
 * @returns {JSX.Element} The ImagePlaceholder component.
 *
 * @example
 * <ImagePlaceholder url='https://example.com/image.jpg' alt='Image alt text' />
 */
export const ImagePlaceholder = (props: Prettify<ImagePlaceholderProps>) => {
	const { url, alt, style = 'default', size = 'default', noImage, className, hidden, imageMode = 'cover', flat } = props;
	const hasUrl = Boolean(url && url.length > 0);

	if (hidden) {
		return null;
	}

	const styleClassName = {
		default: [
			'es:rounded-2xl',
			hasUrl && 'es:ring es:ring-secondary-300',
			!hasUrl && 'es:inset-ring es:inset-ring-surface-300/30',
			'es:bg-surface-200',
			' es:bg-linear-to-b es:from-surface-100/50 es:to-surface-300/50 es:from-25%',
			'es:text-surface-500',
			'es:inset-shadow-sm es:inset-shadow-surface-50/30',
			!flat && 'es:shadow-xs es:shadow-black/5',
		],
		simple: ['es:rounded-xl es:bg-surface-500 es:text-surface-50'],
	} satisfies Record<ImagePlaceholderStyle, Array<string | false | undefined>>;

	const sizeClassName = {
		auto: '',
		default: 'es:size-20',
		large: 'es:size-40',
		fullWidth: 'es:w-full',
		fullHeight: 'es:h-full',
		full: 'es:size-full',
		video: 'es:w-full es:aspect-video',
	} satisfies Record<ImagePlaceholderSize, string>;

	return (
		<div
			className={clsx(
				'es:grid es:grid-cols-1 es:grid-rows-1 es:overflow-hidden',
				'es:*:col-start-1 es:*:col-end-1 es:*:row-start-1 es:*:row-end-1',
				styleClassName[style],
				sizeClassName[size],
				className,
			)}
		>
			{!noImage && (
				<img
					className={clsx(
						'es:size-full! es:select-none es:fill-mode-forwards',
						imageMode === 'cover' && 'es:object-cover',
						imageMode === 'contain' && 'es:object-contain',
						imageMode === 'fill' && 'es:object-fill',
						hasUrl
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
					!hasUrl ? 'es:motion-opacity-in es:motion-scale-in-90 es:motion-duration-300 es:motion-ease-spring-snappy/scale' : 'es:invisible',
				)}
			>
				{image}
			</div>
		</div>
	);
};
