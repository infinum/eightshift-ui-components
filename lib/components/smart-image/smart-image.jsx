import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { cloneElement, useState, useRef, useEffect } from 'react';
import { icons } from '../../icons';
import { DecorativeTooltip } from '../tooltip/tooltip';
import { useImageAnalysisWorker } from '../../utilities/web-workers.js';
import workerInline from './worker-inline.js';
import { cyrb64Hash } from '../../utilities/hash.js';
import { analyzeImage } from '../../utilities/general';

/**
 * @typedef {Object} CustomImageProps
 * @property {JSX.Element} [props.renderError] - Component to render if image analysis fails. `(error) => JSX:Element`.
 * @property {string} [props.errorClassName] - Classes to pass to the default error view.
 * @property {string} [props.processingClassName] - Classes to apply while the image is loading / being processed.
 * @property {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @property {boolean} [props.verbose] - If `true`, extra debug info is logged in case of errors.
 * @property {import('../../utilities/general').ImageAnalysisSettings} [imageAnalysisSettings] - Settings to pass to the image analysis function.
 * @property {import('../../utilities/general').ImageAnalysisResult} [analysisData] - Previous analysis result to pass in directly, skipping analysis.
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
	const { imageAnalysisSettings, errorClassName, processingClassName = 'es:opacity-0 es:fixed', hidden, renderError, analysisData, children, verbose, ...imageProps } = props;

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

	const { analyzeWithWorkerCb } = useImageAnalysisWorker(workerRef, workerInline);

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

				if (analysisData) {
					const { isDark: dark, dominantColors: colors, isTransparent: transparent, transparencyInfo } = analysisData;

					if (dark !== undefined && colors !== undefined && transparent !== undefined && transparencyInfo !== undefined) {
						setIsDark(dark);
						setDominantColors(colors);
						setIsTransparent(transparent);
						setTransparencyInfo(transparencyInfo);
						setHasAnalysed(true);

						return;
					}
				}

				// Cache results in localstorage.
				const cacheKey = `es-uic-img-analysis-${cyrb64Hash(imageProps.src)}`;

				if (localStorage?.getItem(cacheKey)) {
					const { isDark: dark, dominantColors: colors, isTransparent: transparent, transparencyInfo } = JSON.parse(localStorage.getItem(cacheKey));

					setIsDark(dark);
					setDominantColors(colors);
					setIsTransparent(transparent);
					setTransparencyInfo(transparencyInfo);
					setHasAnalysed(true);

					return;
				}

				try {
					// Convert HTMLImageElement to ImageBitmap for web worker
					const imageBitmap = await createImageBitmap(e.target);

					const result = await analyzeWithWorkerCb(imageBitmap, imageAnalysisSettings);

					if (result) {
						const { isDark: dark, dominantColors: colors, isTransparent: transparent, transparencyInfo } = result;

						setIsDark(dark);
						setDominantColors(colors);
						setIsTransparent(transparent);
						setTransparencyInfo(transparencyInfo);

						localStorage?.setItem(cacheKey, JSON.stringify(result));
					} else {
						if (verbose) {
							console.log('[SmartImage] Worker analysis failed, falling back to synchronous analysis.');
						}

						const syncResult = analyzeImage(e.target, imageAnalysisSettings);

						if (syncResult) {
							const { isDark: dark, dominantColors: colors, isTransparent: transparent, transparencyInfo } = syncResult;

							setIsDark(dark);
							setDominantColors(colors);
							setIsTransparent(transparent);
							setTransparencyInfo(transparencyInfo);

							localStorage?.setItem(cacheKey, JSON.stringify(syncResult));
						} else {
							if (verbose) {
								console.log('[SmartImage] Synchronous analysis failed.');
							}
						}
					}
				} catch (err) {
					if (verbose) {
						console.error('[SmartImage] Error analyzing image.', err);
					}

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
			<div
				className={clsx(
					typeof children !== 'function' && 'es:flex es:flex-col es:gap-2 es:items-center-safe es:justify-center-safe es:p-2',
					'es:motion-preset-fade',
					errorClassName,
				)}
			>
				{typeof children !== 'function' && (
					<DecorativeTooltip text={__('Error loading image', 'eightshift-ui-components')}>
						{cloneElement(icons.imageError, { className: 'es:text-secondary-500 es:size-8' })}
					</DecorativeTooltip>
				)}

				{typeof children === 'function'
					? children({
							image: cloneElement(imageElement, { crossOrigin: null }),
							hasAnalysed: true,
							isTransparent: false,
							hasError: true,
							errorBadge: (
								<DecorativeTooltip
									wrapperClassName='es:size-8 es:-translate-y-4 es:m-auto'
									text={__('Error loading image', 'eightshift-ui-components')}
								>
									{cloneElement(icons.imageError, { className: 'es:text-secondary-500 es:size-8' })}
								</DecorativeTooltip>
							),
						})
					: cloneElement(imageElement, { crossOrigin: null })}
			</div>
		);
	}

	if (!children) {
		return imageElement;
	}

	return typeof children === 'function' ? children({ image: imageElement, dominantColors, isDark, hasAnalysed, isTransparent, transparencyInfo }) : imageElement;
};
