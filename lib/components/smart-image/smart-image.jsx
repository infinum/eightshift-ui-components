import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx/lite';
import { cloneElement, useState, useRef, useCallback, useEffect } from 'react';
import { icons } from '../../icons';
import { DecorativeTooltip } from '../tooltip/tooltip';
import workerInline from './worker-inline.js';

// Get the worker URL - this will resolve correctly whether in dev, build, or when installed as a package
const getWorkerUrl = () => {
	try {
		// Use new URL with import.meta.url to get the correct path relative to this file
		const url = new URL('../../workers/image-analysis.worker.js', import.meta.url);

		return url.href;
	} catch (e) {
		console.error('Failed to resolve worker URL:', e);

		return null;
	}
};

/**
 * @typedef {Object} CustomImageProps
 * @property {JSX.Element} [props.renderError] - Component to render if image analysis fails. `(error) => JSX:Element`.
 * @property {string} [props.errorClassName] - Classes to pass to the default error view.
 * @property {string} [props.processingClassName] - Classes to apply while the image is loading / being processed.
 * @property {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @property {import('../../utilities/general').ImageAnalysisSettings} [imageAnalysisSettings] - Settings to pass to the image analysis function.
 *
 * @preserve
 */

/**
 * @typedef {Omit<JSX.IntrinsicElements['img'], 'crossOrigin'>} BaseImageProps
 *
 * @preserve
 */

/**
 * @typedef {CustomImageProps & BaseImageProps} ImageProps
 *
 * @preserve
 */

/**
 * Image that analyzes its contents and can apply different classes based on image transparency.
 * It also provides a CSS variable with the image's dominant color, and optionally custom child rendering with all the data exposed.
 *
 * @component
 * @param {ImageProps} props - Component props.
 *
 * @returns {JSX.Element} The SmartImage component.
 *
 * @example
 * <SmartImage src='https://picsum.photos/600/400' />
 *
 * @example
 * <SmartImage src='https://picsum.photos/600/400'>
 *     {({ image, dominantColors, isDark }) => (
 *         <div style={{ backgroundColor: dominantColors[0].color }}>
 *             {image}
 *             <p style={{ color: isDark ? '#000000' : '#FFFFFF' }}>Lorem ipsum</p>
 *         </div>
 *     )}
 * </SmartImage>
 *
 * @preserve
 */
export const SmartImage = (props) => {
	const { imageAnalysisSettings, errorClassName, processingClassName = 'es:opacity-0 es:fixed', hidden, renderError, children, ...imageProps } = props;

	const [isLoaded, setIsLoaded] = useState(false);
	const [hasAnalysed, setHasAnalysed] = useState(false);
	const [isTransparent, setIsTransparent] = useState(null);
	const [transparencyInfo, setTransparencyInfo] = useState(null);
	const [dominantColors, setDominantColors] = useState([]);
	const [isDark, setIsDark] = useState(false);
	const [error, setError] = useState(null);

	const workerRef = useRef(null);

	// Cleanup worker on unmount
	useEffect(() => {
		return () => {
			if (workerRef.current) {
				workerRef.current.terminate();
				workerRef.current = null;
			}
		};
	}, []);

	const createWorker = () => {
		// Try to use the inlined worker if available (built as a string)
		if (workerInline && typeof workerInline === 'string' && workerInline.length > 100) {
			const blob = new Blob([workerInline], { type: 'application/javascript' });

			return new Worker(URL.createObjectURL(blob), { type: 'module' });
		}
		// Fallback to URL-based worker (dev mode or if inlining fails)
		const workerUrl = getWorkerUrl();

		if (!workerUrl) throw new Error('Worker URL could not be resolved');

		return new Worker(workerUrl, { type: 'module' });
	};

	const analyzeWithWorker = useCallback(async (imageBitmap, settings) => {
		return new Promise((resolve, reject) => {
			if (!workerRef.current) {
				try {
					workerRef.current = createWorker();
				} catch (error) {
					reject(error);

					return;
				}
				workerRef.current.addEventListener('error', (e) => {
					console.error('Worker error event:', e);
				});
			}
			const worker = workerRef.current;

			const handleMessage = (event) => {
				const { success, data, error } = event.data;

				if (success) {
					resolve(data);
				} else {
					reject(new Error(error));
				}

				worker.removeEventListener('message', handleMessage);
				worker.removeEventListener('error', handleError);
			};

			const handleError = (error) => {
				reject(error);
				worker.removeEventListener('message', handleMessage);
				worker.removeEventListener('error', handleError);
			};

			worker.addEventListener('message', handleMessage);
			worker.addEventListener('error', handleError);
			worker.postMessage({ imageBitmap, settings }, [imageBitmap]);
		});
	}, []);

	if (hidden) {
		return null;
	}

	const classFetchProps = { isLoaded, hasAnalysed, isTransparent, dominantColors, isDark, transparencyInfo };

	const imageElement = (
		<img
			decoding='async'
			{...imageProps}
			crossOrigin='anonymous'
			style={{
				...(imageProps.style || {}),
				'--es-img-dominant-color': dominantColors?.[0]?.color ?? '',
			}}
			className={clsx(
				'es:transition-opacity',
				!hasAnalysed && processingClassName,
				typeof imageProps.className === 'function' ? imageProps.className(classFetchProps) : imageProps.className,
			)}
			onLoad={async (e) => {
				setIsLoaded(true);

				if (props.onLoad) {
					props.onLoad(e);
				}

				if (!imageProps.src) {
					setHasAnalysed(true);

					return;
				}

				try {
					// Convert HTMLImageElement to ImageBitmap for web worker
					const imageBitmap = await createImageBitmap(e.target);
					const result = await analyzeWithWorker(imageBitmap, imageAnalysisSettings);

					if (result) {
						const { isDark: dark, dominantColors: colors, isTransparent: transparent, transparencyInfo } = result;

						setIsDark(dark);
						setDominantColors(colors);
						setIsTransparent(transparent);
						setTransparencyInfo(transparencyInfo);
					}
				} catch (err) {
					console.error('Error analyzing image:', err);
					setError(err);
				}

				setHasAnalysed(true);
			}}
			onError={() => setError(new Error('Image failed to load'))}
			data-is-transparent={isTransparent}
			data-is-dark={isDark}
		/>
	);

	if (error && renderError) {
		return renderError(error);
	} else if (error) {
		return (
			<div className={clsx('es:flex es:flex-col es:gap-2 es:items-center-safe es:justify-center-safe es:p-2 es:motion-preset-fade', errorClassName)}>
				<DecorativeTooltip text={__('Error loading image', 'eightshift-ui-components')}>
					{cloneElement(icons.imageError, { className: 'es:text-secondary-500 es:size-8' })}
				</DecorativeTooltip>
			</div>
		);
	}

	if (!children) {
		return imageElement;
	}

	return typeof children === 'function' ? children({ image: imageElement, dominantColors, isDark, hasAnalysed, isTransparent, transparencyInfo }) : imageElement;
};
