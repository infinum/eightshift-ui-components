import { clsx } from 'clsx/lite';
import { icons } from '../../icons/icons';

/**
 * A simple image placeholder, with an empty state.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.url] - The image URL.
 * @param {string} [props.alt] - The image alt text.
 *
 * @returns {JSX.Element} The ImagePlaceholder component.
 *
 * @example
 * <ImagePlaceholder url="https://example.com/image.jpg" alt="Image alt text" />
 *
 * @preserve
 */
export const ImagePlaceholder = (props) => {
	const { url, alt } = props;

	return (
		<div
			className={clsx(
				'es-uic-size-20 es-uic-overflow-hidden es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-text-gray-300 es-uic-shadow',
				'es-uic-grid es-uic-grid-cols-1 es-uic-grid-rows-1',
				'[&>*]:es-uic-col-start-1 [&>*]:es-uic-col-end-1 [&>*]:es-uic-row-start-1 [&>*]:es-uic-row-end-1',
			)}
		>
			<img
				className={clsx(
					'es-uic-size-full es-uic-select-none es-uic-object-cover es-uic-fill-mode-forwards',
					url?.length > 0 ? 'es-uic-animate-in es-uic-fade-in-0 es-uic-zoom-in-95' : 'es-uic-animate-out es-uic-fade-out-0 es-uic-zoom-out-95',
				)}
				src={url}
				alt={alt}
			/>

			<div
				className={clsx(
					'es-uic-place-self-center es-uic-justify-self-center es-uic-transition [&>svg]:es-uic-size-7 es-uic-fill-mode-forwards',
					!url ? 'es-uic-animate-in es-uic-fade-in-0 es-uic-zoom-in-95' : 'es-uic-animate-out es-uic-fade-out-0 es-uic-zoom-out-95',
				)}
			>
				{icons.image}
			</div>
		</div>
	);
};
