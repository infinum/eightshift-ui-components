import type { MutableRefObject } from 'react';

type WorkerMessage<TResult> = { success: true; data: TResult } | { success: false; error?: string };

type AnalysisSettingValue = string | number | boolean | null | undefined;
type AnalysisSettings = Readonly<Record<string, AnalysisSettingValue>>;

interface ImageAnalysisWorkerHelpers<TResult extends object> {
	getOrCreateWorker: () => Worker | null;
	analyzeWithWorkerCb: (imageBitmap: ImageBitmap, settings: AnalysisSettings) => Promise<TResult>;
}

const workerUnavailableError = 'Image analysis workers are only available in a browser environment.';

export const isImageAnalysisWorkerSupported = (): boolean =>
	'window' in globalThis &&
	'document' in globalThis &&
	'Worker' in globalThis &&
	'Blob' in globalThis &&
	'URL' in globalThis &&
	globalThis.URL.createObjectURL instanceof Function;

/**
 * Returns a memoized function that gets or creates a singleton image analysis worker (with inline fallback).
 * Also returns a callback for analyzing with the worker.
 *
 * @param {MutableRefObject<Worker | null>} workerRef - React ref object for the worker instance.
 * @param {string} workerInline - Inlined worker code string.
 * @returns {object} Worker helpers for creating and analyzing with the image analysis worker.
 */
export function useImageAnalysisWorker<TResult extends object>(
	workerRef: MutableRefObject<Worker | null>,
	workerInline: string,
): ImageAnalysisWorkerHelpers<TResult> {
	const getOrCreateWorker = (): Worker | null => {
		if (!isImageAnalysisWorkerSupported()) {
			return null;
		}

		if (!workerRef.current) {
			const worker = createImageAnalysisWorker(workerInline);

			if (!worker) {
				return null;
			}

			workerRef.current = worker;
			worker.addEventListener('error', (e) => {
				console.error('Worker error event:', e);
			});
		}

		return workerRef.current;
	};

	const analyzeWithWorkerCb = async (imageBitmap: ImageBitmap, settings: AnalysisSettings): Promise<TResult> => {
		const worker = getOrCreateWorker();

		if (!worker) {
			throw new Error(workerUnavailableError);
		}

		return analyzeWithWorker<TResult>(worker, imageBitmap, settings);
	};

	return { getOrCreateWorker, analyzeWithWorkerCb };
}

/**
 * Create a new image analysis worker using the inlined worker code.
 *
 * @param {string} workerInline - The inlined worker code as a string.
 * @returns {Worker} The created worker instance.
 */
export function createImageAnalysisWorker(workerInline: string): Worker | null {
	if (!workerInline || workerInline.length < 100) {
		throw new Error('Worker could not be created: inline worker code not available. Make sure the worker is properly bundled.');
	}

	if (!isImageAnalysisWorkerSupported()) {
		return null;
	}

	const blob = new Blob([workerInline], { type: 'application/javascript' });

	return new Worker(URL.createObjectURL(blob), { type: 'module' });
}

/**
 * Analyze an image using a web worker (returns a Promise).
 *
 * @param {Worker} worker - The worker instance.
 * @param {ImageBitmap} imageBitmap - The image to analyze.
 * @param {AnalysisSettings} settings - Analysis settings.
 * @returns {Promise<unknown>} Resolves with the analysis result.
 */
export function analyzeWithWorker<TResult extends object>(worker: Worker, imageBitmap: ImageBitmap, settings: AnalysisSettings): Promise<TResult> {
	return new Promise((resolve, reject) => {
		const handleMessage = (event: MessageEvent<WorkerMessage<TResult>>) => {
			const message = event.data;

			if (message.success) {
				resolve(message.data);
			} else {
				reject(new Error(message.error));
			}

			worker.removeEventListener('message', handleMessage);
			worker.removeEventListener('error', handleError);
		};

		const handleError = (error: ErrorEvent) => {
			reject(new Error(error.message || 'Image analysis worker failed.'));
			worker.removeEventListener('message', handleMessage);
			worker.removeEventListener('error', handleError);
		};

		worker.addEventListener('message', handleMessage);
		worker.addEventListener('error', handleError);
		worker.postMessage({ imageBitmap, settings }, [imageBitmap]);
	});
}
