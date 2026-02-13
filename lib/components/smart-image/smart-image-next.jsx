/* eslint-disable no-underscore-dangle */
import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { cloneElement, useState, useRef, useEffect } from 'react';
import { icons } from '../../icons/index.js';
import { DecorativeTooltip } from '../tooltip/tooltip.jsx';
import { cyrb64Hash } from '../../utilities/hash.js';
import WORKER_CODE from './image-analysis-worker-next.js?raw' with { type: 'text' };

/**
 * @typedef {Object} CustomImageProps
 * @property {JSX.Element} [props.renderError] - Component to render if image analysis fails. `(error) => JSX:Element`.
 * @property {string} [props.errorClassName] - Classes to pass to the default error view.
 * @property {string} [props.processingClassName] - Classes to apply while the image is loading / being processed.
 * @property {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @property {boolean} [props.verbose] - If `true`, extra debug info is logged in case of errors.
 * @property {import('../../utilities/general.js').ImageAnalysisSettings} [imageAnalysisSettings] - Settings to pass to the image analysis function.
 * @property {import('../../utilities/general.js').ImageAnalysisResult} [analysisData] - Previous analysis result to pass in directly, skipping analysis.
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

function isValidUrl(url) {
	try {
		new URL(url);

		return true;
	} catch {
		return false;
	}
}

async function urlExists(url) {
	if (!isValidUrl(url)) return false;

	try {
		await fetch(url, { method: 'HEAD', mode: 'no-cors' });

		return true; // Host exists (even if CORS would block later)
	} catch {
		return false; // Host unreachable
	}
}

/**
 * Image that analyzes its contents and can apply different classes based on image transparency.
 * It also provides a CSS variable with the image's dominant color, and optionally custom child rendering with all the data exposed.
 *
 * @component
 * @param {ImageProps} props - Component props.
 *
 * @returns {JSX.Element} The __SmartImageNext component.
 *
 * @example
 * <__SmartImageNext src='https://picsum.photos/600/400' />
 *
 * @example
 * <__SmartImageNext src='https://picsum.photos/600/400'>
 *     {({ image, dominantColors, isDark }) => (
 *         <div style={{ backgroundColor: dominantColors[0].color }}>
 *             {image}
 *             <p style={{ color: isDark ? '#000000' : '#FFFFFF' }}>Lorem ipsum</p>
 *         </div>
 *     )}
 * </__SmartImageNext>
 *
 * @preserve
 */
export const __SmartImageNext = (props) => {
	const { onAnalysisComplete, colorCount = 3, similarityThreshold = 10 } = props;

	const { imageAnalysisSettings, errorClassName, processingClassName = 'es:opacity-0 es:fixed', hidden, renderError, analysisData, children, verbose, ...imageProps } = props;

	const { src } = imageProps;

	const [analysis, setAnalysis] = useState(analysisData);
	const [error, setError] = useState(null);
	const [objectUrl, setObjectUrl] = useState(null);
	const workerRef = useRef(null);

	// Initialize Worker
	useEffect(() => {
		const blob = new Blob([WORKER_CODE], { type: 'application/javascript' });
		workerRef.current = new Worker(URL.createObjectURL(blob));

		return () => workerRef.current.terminate();
	}, []);

	useEffect(() => {
		if (!src) {
			return;
		}

		if (analysisData) {
			setObjectUrl(src);

			return;
		}

		// Cache results in localstorage.
		const cacheKey = `es-uic-img-data-${cyrb64Hash(src)}`;

		if (localStorage?.getItem(cacheKey)) {
			const cachedAnalysis = JSON.parse(localStorage.getItem(cacheKey));

			if (cachedAnalysis) {
				setAnalysis(cachedAnalysis);
				setObjectUrl(src);

				return;
			}
		}

		let isActive = true;
		const abortController = new AbortController();

		const processImage = async () => {
			try {
				const response = await fetch(src, {
					signal: abortController.signal,
					mode: 'cors',
				});

				if (src.includes('uikit')) {
					console.log('tusam?', src, response);
				}

				if (!response.ok) {
					if (verbose) {
						console.error(`[SmartImageNext]: Failed to fetch (${response.status}) image from ${src}`);
					}

					// throw new Error(`Fetch failed: ${response.status}`);
				}

				const blob = await response.clone().blob();

				if (blob.size === 0) {
					if (verbose) {
						console.error(`[SmartImageNext]: Empty image (${src})`);
					}

					// throw new Error('Image is empty.');
				}

				// Create Object URL for display
				const url = URL.createObjectURL(blob);

				if (isActive) {
					setObjectUrl(url);
				}

				// --- DECODE STRATEGY ---
				let imageSource, width, height;
				const isSVG = blob.type.includes('svg');

				if (isSVG) {
					// STRATEGY A: SVG (Load into HTML Image)
					const img = new Image();
					img.src = url;
					await new Promise((resolve, reject) => {
						img.onload = resolve;
						img.onerror = reject;
					});

					// SVGs need a defined size. If 0, default to 500x500 for analysis
					width = img.width || 500;
					height = img.height || 500;
					imageSource = img;
				} else {
					// STRATEGY B: Raster (JPG/PNG) - Use ImageBitmap (Faster)
					try {
						imageSource = await createImageBitmap(blob);
						width = imageSource.width;
						height = imageSource.height;
					} catch (e) {
						if (verbose) {
							console.warn('[SmartImageNext]: createImageBitmap failed, falling back to HTML Image method.', e);
						}

						// throw new Error('Could not decode image data.');
					}
				}

				// --- EXTRACT BUFFER ---
				let buffer, arrayBuffer;

				// Prefer OffscreenCanvas (Workers friendly), fallback to DOM Canvas
				if (typeof OffscreenCanvas !== 'undefined') {
					const canvas = new OffscreenCanvas(width, height);
					const ctx = canvas.getContext('2d', { willReadFrequently: true });

					// Ensure clear canvas for SVGs with transparency
					ctx.clearRect(0, 0, width, height);
					ctx.drawImage(imageSource, 0, 0, width, height);

					buffer = ctx.getImageData(0, 0, width, height).data;
					arrayBuffer = buffer.buffer;
				} else {
					const canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext('2d');

					ctx.clearRect(0, 0, width, height);
					ctx.drawImage(imageSource, 0, 0, width, height);

					buffer = ctx.getImageData(0, 0, width, height).data;
					arrayBuffer = buffer.buffer;
				}

				// Cleanup bitmap if we used one
				if (imageSource.close) {
					imageSource.close();
				}

				// --- SEND TO WORKER ---
				if (workerRef.current) {
					workerRef.current.onmessage = (e) => {
						if (!isActive) {
							return;
						}

						setAnalysis(e.data);

						localStorage?.setItem(cacheKey, JSON.stringify(e.data));

						if (onAnalysisComplete) {
							onAnalysisComplete(e.data);
						}
					};

					try {
						workerRef.current.postMessage(
							{
								buffer,
								width,
								height,
								config: {
									// TODO
								},
							},
							[arrayBuffer],
						);
					} catch (msgErr) {
						// Fallback if transfer fails
						workerRef.current.postMessage({
							buffer,
							width,
							height,
							config: { maxColors: colorCount, threshold: similarityThreshold },
						});
					}
				}
			} catch (err) {
				if (isActive) {
					if (verbose) {
						console.error('[SmartImageNext] Error:', err);
					}

					const exists = await urlExists(src);

					if (exists) {
						setError(err.message);
					} else {
						setError('failedToFetch');
					}

					setObjectUrl(null);
				}
			}
		};

		processImage();

		return () => {
			isActive = false;
			abortController.abort();
		};
	}, [src, colorCount, similarityThreshold]);

	const hasAnalysed = Boolean(analysis) && Boolean(objectUrl);

	const { dominantColors, isDark, isTransparent, transparencyInfo, averageColor } = analysis || {};

	const classFetchProps = {
		isLoaded: true,
		dominantColors,
		isDark,
		hasAnalysed: Boolean(error) || hasAnalysed,
		isTransparent: isTransparent,
		transparencyInfo,
		averageColor,
		hasError: error === 'failedToFetch',
	};

	if (hidden) {
		return null;
	}

	const colorfulDominantColor = dominantColors?.find((c) => c.saturation > 0.25 && c.area >= 0.1) || dominantColors?.[0];

	const imageElement = (
		<img
			decoding='async'
			{...imageProps}
			src={analysis && objectUrl && !error ? objectUrl : imageProps?.src}
			style={{
				...(imageProps.style || {}),
				'--es-img-dominant-color': dominantColors?.[0]?.color ?? '',
				'--es-img-colorful-dominant-color': colorfulDominantColor?.color ?? '',
				'--es-img-average-color': averageColor?.color ?? '',
			}}
			className={clsx(
				'es:transition-opacity',
				!hasAnalysed && !error && processingClassName,
				typeof imageProps.className === 'function' ? imageProps.className(classFetchProps) : imageProps.className,
			)}
			data-is-transparent={isTransparent}
			data-is-dark={isDark}
		/>
	);

	if (error && renderError) {
		return renderError(error);
	} else if (error === 'failedToFetch') {
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
						{cloneElement(icons.imageError, { className: 'es:text-surface-600 es:size-8' })}
					</DecorativeTooltip>
				)}

				{typeof children === 'function'
					? children({
							image: cloneElement(imageElement, { crossOrigin: null }),
							hasAnalysed,
							isTransparent: false,
							hasError: true,
							errorBadge: (
								<div className='es:size-full es:flex es:items-center es:justify-center'>
									<DecorativeTooltip text={__('Error loading image', 'eightshift-ui-components')}>
										{cloneElement(icons.imageError, { className: 'es:text-surface-600 es:size-8' })}
									</DecorativeTooltip>
								</div>
							),
						})
					: cloneElement(imageElement, { crossOrigin: null })}
			</div>
		);
	}

	return children && typeof children === 'function'
		? children({
				image: imageElement,
				...classFetchProps,
			})
		: imageElement;
};
