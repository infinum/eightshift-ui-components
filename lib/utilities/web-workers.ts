import type { MutableRefObject } from 'react';

interface WorkerMessage {
	success: boolean;
	data?: unknown;
	error?: string;
}

interface AnalysisSettings {
	[key: string]: unknown;
}

/**
 * Returns a memoized function that gets or creates a singleton image analysis worker (with inline fallback).
 * Also returns a callback for analyzing with the worker.
 *
 * @param {MutableRefObject<Worker | null>} workerRef - React ref object for the worker instance.
 * @param {string} workerInline - Inlined worker code string.
 * @returns {object} Worker helpers for creating and analyzing with the image analysis worker.
 */
export function useImageAnalysisWorker(
	workerRef: MutableRefObject<Worker | null>,
	workerInline: string,
): {
	getOrCreateWorker: () => Worker;
	analyzeWithWorkerCb: (imageBitmap: ImageBitmap, settings: AnalysisSettings) => Promise<unknown>;
} {
	const getOrCreateWorker = (): Worker => {
		if (!workerRef.current) {
			workerRef.current = createImageAnalysisWorker(workerInline);
			workerRef.current.addEventListener('error', (e) => {
				console.error('Worker error event:', e);
			});
		}

		return workerRef.current;
	};

	const analyzeWithWorkerCb = async (imageBitmap: ImageBitmap, settings: AnalysisSettings): Promise<unknown> => {
		const worker = getOrCreateWorker();

		return analyzeWithWorker(worker, imageBitmap, settings);
	};

	return { getOrCreateWorker, analyzeWithWorkerCb };
}

/**
 * Create a new image analysis worker using the inlined worker code.
 *
 * @param {string} workerInline - The inlined worker code as a string.
 * @returns {Worker} The created worker instance.
 */
export function createImageAnalysisWorker(workerInline: string): Worker {
	if (!workerInline || typeof workerInline !== 'string' || workerInline.length < 100) {
		throw new Error('Worker could not be created: inline worker code not available. Make sure the worker is properly bundled.');
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
export function analyzeWithWorker(worker: Worker, imageBitmap: ImageBitmap, settings: AnalysisSettings): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const handleMessage = (event: MessageEvent<WorkerMessage>) => {
			const { success, data, error } = event.data;

			if (success) {
				resolve(data);
			} else {
				reject(new Error(error));
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
