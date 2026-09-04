import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { cloneElement, useEffect, useRef, useState, type CSSProperties, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { imageError } from '../../icons/internal';
import { cyrb64Hash } from '../../utilities/hash';
import { DecorativeTooltip } from '../tooltip/tooltip';
import type { Prettify } from '../../utilities/types';

type AnalysisSource = 'worker' | 'cache' | 'analysisData';

type ImageAnalysisSettings = {
	numColors?: number;
};

type SmartImageColor = {
	color: string;
	area?: number;
	isDark: boolean;
	saturation?: number;
};

type SmartImageAverageColor = {
	color: string;
	isDark: boolean;
	saturation: number;
};

type SmartImageTransparencyInfo = {
	any: boolean;
	left: boolean;
	right: boolean;
	top: boolean;
	bottom: boolean;
	topLeftCorner: boolean;
	topRightCorner: boolean;
	bottomLeftCorner: boolean;
	bottomRightCorner: boolean;
};

type ImageAnalysisResult = {
	dominantColors: SmartImageColor[];
	averageColor: SmartImageAverageColor | null;
	isDark: boolean;
	isTransparent: boolean;
	transparencyInfo: SmartImageTransparencyInfo;
};

type SmartImageClassNameContext = {
	isLoaded: true;
	dominantColors?: SmartImageColor[];
	isDark?: boolean;
	hasAnalysed: boolean;
	isTransparent?: boolean;
	transparencyInfo?: SmartImageTransparencyInfo;
	averageColor?: SmartImageAverageColor | null;
	hasError: boolean;
};

type SmartImageChildContext = SmartImageClassNameContext & {
	image: ReactNode;
	errorBadge?: ReactNode;
};

type SmartImageImageProps = Omit<ComponentPropsWithoutRef<'img'>, 'children' | 'className' | 'crossOrigin'>;

type SmartImageProps = SmartImageImageProps & {
	/** Component to render if image analysis fails. `(error) => JSX:Element`. */
	renderError?: (error: string) => ReactNode;
	/** Classes to pass to the default error view. */
	errorClassName?: string;
	/** Classes to apply while the image is loading / being processed. Defaults to `es:opacity-0 es:fixed`. */
	processingClassName?: string;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** If `true`, extra debug info is logged in case of errors. */
	verbose?: boolean;
	/** Settings to pass to the image analysis function. */
	imageAnalysisSettings?: ImageAnalysisSettings;
	/** Previous analysis result to pass in directly, skipping analysis. */
	analysisData?: ImageAnalysisResult;
	/** Number of dominant colors to extract. Falls back to `imageAnalysisSettings.numColors` when omitted. */
	colorCount?: number;
	/** Distance threshold for merging similar colors during palette extraction. Defaults to `10`. */
	similarityThreshold?: number;
	/** Called when analysis data becomes available, with metadata describing where it came from. */
	onAnalysisComplete?: (result: ImageAnalysisResult, meta: { source: AnalysisSource }) => void;
	className?: string | ((context: SmartImageClassNameContext) => string | undefined);
	children?: ReactNode | ((context: SmartImageChildContext) => ReactNode);
};

type SmartImageClassNameResolver = Exclude<SmartImageProps['className'], string | undefined>;
type SmartImageChildrenRenderer = Exclude<SmartImageProps['children'], ReactNode | undefined>;

type SmartImageStyle = CSSProperties & {
	'--es-img-dominant-color': string;
	'--es-img-colorful-dominant-color': string;
	'--es-img-average-color': string;
};

function isValidUrl(url: string): boolean {
	try {
		new URL(url);

		return true;
	} catch {
		return false;
	}
}

async function urlExists(url: string): Promise<boolean> {
	if (!isValidUrl(url)) {
		return false;
	}

	try {
		await fetch(url, { method: 'HEAD', mode: 'no-cors' });

		return true;
	} catch {
		return false;
	}
}

const parseCachedAnalysis = (value: string | null): ImageAnalysisResult | null => {
	if (!value) {
		return null;
	}

	try {
		// SAFETY: SmartImage is the sole writer for this versioned cache key and serializes ImageAnalysisResult values.
		return JSON.parse(value) as ImageAnalysisResult;
	} catch {
		return null;
	}
};

const isClassNameResolver = (value: SmartImageProps['className']): value is SmartImageClassNameResolver => value instanceof Function;

const isChildrenRenderer = (value: SmartImageProps['children']): value is SmartImageChildrenRenderer => value instanceof Function;

const loadHtmlImage = async (src: string): Promise<HTMLImageElement> => {
	const image = new Image();
	image.src = src;

	await new Promise<void>((resolve, reject) => {
		image.onload = () => resolve();
		image.onerror = () => reject(new Error('Could not decode image data.'));
	});

	return image;
};

/**
 * Image that analyzes its contents and can apply different classes based on image transparency.
 * It also provides a CSS variable with the image's dominant color, and optionally custom child rendering with all the data exposed.
 *
 * @component
 * @param {SmartImageProps} props - Component props.
 *
 * @returns {JSX.Element} The SmartImage component.
 *
 * @example
 * <SmartImage src='https://picsum.photos/600/400' />
 *
 * @example
 * <SmartImage src='https://picsum.photos/600/400'>
 * 	{({ image, dominantColors, isDark }) => (
 * 		<div style={{ backgroundColor: dominantColors?.[0]?.color }}>
 * 			{image}
 * 			<p style={{ color: isDark ? '#000000' : '#FFFFFF' }}>Lorem ipsum</p>
 * 		</div>
 * 	)}
 * </SmartImage>
 */
const SmartImage = (props: Prettify<SmartImageProps>) => {
	const {
		onAnalysisComplete,
		colorCount: colorCountProp,
		similarityThreshold = 10,
		imageAnalysisSettings,
		errorClassName,
		processingClassName = 'es:opacity-0 es:fixed',
		hidden,
		renderError,
		analysisData,
		children,
		verbose,
		className,
		...imageProps
	} = props;

	const { src } = imageProps;
	const resolvedColorCount = colorCountProp ?? imageAnalysisSettings?.numColors ?? 3;

	const [analysis, setAnalysis] = useState<ImageAnalysisResult | undefined>(analysisData);
	const [error, setError] = useState<string | null>(null);
	const [objectUrl, setObjectUrl] = useState<string | null>(null);
	const workerRef = useRef<Worker | null>(null);
	const lastAnalysisNotificationKeyRef = useRef<string | null>(null);

	useEffect(() => {
		workerRef.current = new Worker(new URL('./image-analysis-worker.ts', import.meta.url), { type: 'module' });

		return () => {
			workerRef.current?.terminate();
		};
	}, []);

	useEffect(() => {
		lastAnalysisNotificationKeyRef.current = null;
	}, [src]);

	useEffect(() => {
		let isActive = true;
		const abortController = new AbortController();
		const workerConfig = {
			maxColors: resolvedColorCount,
			threshold: similarityThreshold,
		};

		const notifyAnalysisComplete = (result: ImageAnalysisResult, source: AnalysisSource) => {
			if (!onAnalysisComplete) {
				return;
			}

			const notificationKey = `${src ?? ''}:${source}:${cyrb64Hash(JSON.stringify(result))}`;

			if (lastAnalysisNotificationKeyRef.current === notificationKey) {
				return;
			}

			lastAnalysisNotificationKeyRef.current = notificationKey;
			onAnalysisComplete(result, { source });
		};

		if (!src) {
			return () => {
				isActive = false;
				abortController.abort();
			};
		}

		if (analysisData) {
			notifyAnalysisComplete(analysisData, 'analysisData');

			return () => {
				isActive = false;
				abortController.abort();
			};
		}

		const cacheKey = `es-uic-img-data-${cyrb64Hash(src)}`;
		const cachedAnalysis = parseCachedAnalysis(localStorage?.getItem(cacheKey) ?? null);

		if (cachedAnalysis) {
			queueMicrotask(() => {
				if (!isActive) {
					return;
				}

				setAnalysis(cachedAnalysis);
				setObjectUrl(src);
				notifyAnalysisComplete(cachedAnalysis, 'cache');
			});
		}

		if (!cachedAnalysis) {
			const processImage = async () => {
				let nextObjectUrl: string | null = null;

				try {
					const response = await fetch(src, {
						signal: abortController.signal,
						mode: 'cors',
					});

					if (!response.ok && verbose) {
						console.error(`[SmartImage]: Failed to fetch (${response.status}) image from ${src}`);
					}

					const blob = await response.clone().blob();

					if (blob.size === 0 && verbose) {
						console.error(`[SmartImage]: Empty image (${src})`);
					}

					nextObjectUrl = URL.createObjectURL(blob);

					if (isActive) {
						setObjectUrl(nextObjectUrl);
					}

					let imageSource: HTMLImageElement | ImageBitmap;
					let width: number;
					let height: number;
					const isSVG = blob.type.includes('svg');

					if (isSVG) {
						const image = await loadHtmlImage(nextObjectUrl);
						width = image.width || image.naturalWidth || 500;
						height = image.height || image.naturalHeight || 500;
						imageSource = image;
					} else {
						try {
							const bitmap = await createImageBitmap(blob);
							imageSource = bitmap;
							width = bitmap.width;
							height = bitmap.height;
						} catch (decodeError) {
							if (verbose) {
								console.warn('[SmartImage]: createImageBitmap failed, falling back to HTML Image method.', decodeError);
							}

							const image = await loadHtmlImage(nextObjectUrl);
							width = image.width || image.naturalWidth;
							height = image.height || image.naturalHeight;
							imageSource = image;
						}
					}

					let buffer: Uint8ClampedArray;
					let transferBuffer: ArrayBuffer | null = null;

					if ('OffscreenCanvas' in globalThis) {
						const canvas = new globalThis.OffscreenCanvas(width, height);
						const context = canvas.getContext('2d', { willReadFrequently: true });

						if (!context) {
							throw new Error('Could not create image analysis canvas context.');
						}

						context.clearRect(0, 0, width, height);
						context.drawImage(imageSource, 0, 0, width, height);

						buffer = context.getImageData(0, 0, width, height).data;
						transferBuffer = buffer.buffer instanceof ArrayBuffer ? buffer.buffer : null;
					} else {
						const canvas = document.createElement('canvas');
						canvas.width = width;
						canvas.height = height;
						const context = canvas.getContext('2d');

						if (!context) {
							throw new Error('Could not create image analysis canvas context.');
						}

						context.clearRect(0, 0, width, height);
						context.drawImage(imageSource, 0, 0, width, height);

						buffer = context.getImageData(0, 0, width, height).data;
						transferBuffer = buffer.buffer instanceof ArrayBuffer ? buffer.buffer : null;
					}

					if (imageSource instanceof ImageBitmap) {
						imageSource.close();
					}

					if (workerRef.current) {
						workerRef.current.onmessage = (event: MessageEvent<ImageAnalysisResult>) => {
							if (!isActive) {
								return;
							}

							setAnalysis(event.data);
							localStorage?.setItem(cacheKey, JSON.stringify(event.data));
							notifyAnalysisComplete(event.data, 'worker');
						};

						if (transferBuffer) {
							workerRef.current.postMessage(
								{
									buffer,
									width,
									height,
									config: workerConfig,
								},
								[transferBuffer],
							);
						} else {
							workerRef.current.postMessage({
								buffer,
								width,
								height,
								config: workerConfig,
							});
						}
					}
				} catch (caughtError) {
					if (nextObjectUrl) {
						URL.revokeObjectURL(nextObjectUrl);
					}

					if (isActive) {
						if (verbose) {
							console.error('[SmartImage] Error:', caughtError);
						}

						const exists = await urlExists(src);
						let errorMessage = 'failedToFetch';

						if (exists) {
							errorMessage = caughtError instanceof Error ? caughtError.message : String(caughtError);
						}

						setError(errorMessage);
						setObjectUrl(null);
					}
				}
			};

			processImage().catch(() => undefined);
		}

		return () => {
			isActive = false;
			abortController.abort();
		};
	}, [analysisData, imageAnalysisSettings?.numColors, onAnalysisComplete, resolvedColorCount, similarityThreshold, src, verbose]);

	const activeAnalysis = analysisData ?? analysis;
	let activeObjectUrl = src ? objectUrl : null;

	if (analysisData) {
		activeObjectUrl = src ?? null;
	}

	const hasAnalysed = Boolean(activeAnalysis) && Boolean(activeObjectUrl);
	const { dominantColors, isDark, isTransparent, transparencyInfo, averageColor } = activeAnalysis ?? {};
	const classFetchProps: SmartImageClassNameContext = {
		isLoaded: true,
		dominantColors,
		isDark,
		hasAnalysed: Boolean(error) || hasAnalysed,
		isTransparent,
		transparencyInfo,
		averageColor,
		hasError: error === 'failedToFetch',
	};

	if (hidden) {
		return null;
	}

	const colorfulDominantColor = dominantColors?.find((color) => (color.saturation ?? 0) > 0.25 && (color.area ?? 0) >= 0.1) || dominantColors?.[0];
	const imageStyle: SmartImageStyle = {
		...imageProps.style,
		'--es-img-dominant-color': dominantColors?.[0]?.color ?? '',
		'--es-img-colorful-dominant-color': colorfulDominantColor?.color ?? '',
		'--es-img-average-color': averageColor?.color ?? '',
	};

	const imageElement = (
		<img
			decoding='async'
			{...imageProps}
			src={activeAnalysis && activeObjectUrl && !error ? activeObjectUrl : imageProps.src}
			style={imageStyle}
			className={clsx('es:transition-opacity', !hasAnalysed && !error && processingClassName, isClassNameResolver(className) ? className(classFetchProps) : className)}
			data-is-transparent={isTransparent}
			data-is-dark={isDark}
		/>
	);

	if (error && renderError) {
		return renderError(error);
	}

	if (error === 'failedToFetch') {
		const hasCustomErrorRenderer = isChildrenRenderer(children);

		return (
			<div
				className={clsx(!hasCustomErrorRenderer && 'es:flex es:flex-col es:gap-2 es:items-center-safe es:justify-center es:p-2', 'es:motion-preset-fade', errorClassName)}
			>
				{!hasCustomErrorRenderer && (
					<DecorativeTooltip text={__('Error loading image', 'eightshift-ui-components')}>
						{cloneElement(imageError, { className: 'es:text-surface-600 es:size-8' })}
					</DecorativeTooltip>
				)}

				{hasCustomErrorRenderer
					? children({
							image: imageElement,
							hasAnalysed,
							isLoaded: true,
							dominantColors: undefined,
							isDark: undefined,
							isTransparent: false,
							transparencyInfo: undefined,
							averageColor: null,
							hasError: true,
							errorBadge: (
								<div className='es:size-full es:flex es:items-center es:justify-center'>
									<DecorativeTooltip text={__('Error loading image', 'eightshift-ui-components')}>
										{cloneElement(imageError, { className: 'es:text-surface-600 es:size-8' })}
									</DecorativeTooltip>
								</div>
							),
						})
					: imageElement}
			</div>
		);
	}

	return isChildrenRenderer(children) ? children({ image: imageElement, ...classFetchProps }) : imageElement;
};

export { SmartImage, SmartImage as __SmartImage };
