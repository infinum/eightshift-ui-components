/**
 * Returns a memoized function that gets or creates a singleton image analysis worker (with inline fallback).
 * Also returns a callback for analyzing with the worker.
 * @param {object} workerRef - React ref object for the worker instance.
 * @param {string} workerInline - Inlined worker code string.
 * @returns {{ getOrCreateWorker: Function, analyzeWithWorkerCb: Function }}
 */
export function useImageAnalysisWorker(workerRef, workerInline) {
	const getOrCreateWorker = () => {
		if (!workerRef.current) {
			workerRef.current = createImageAnalysisWorker(workerInline);
			workerRef.current.addEventListener('error', (e) => {
				console.error('Worker error event:', e);
			});
		}

		return workerRef.current;
	};

	const analyzeWithWorkerCb = async (imageBitmap, settings) => {
		const worker = getOrCreateWorker();

		return analyzeWithWorker(worker, imageBitmap, settings);
	};

	return { getOrCreateWorker, analyzeWithWorkerCb };
}

// Utilities for working with web workers in the Eightshift UI Components library
// Extracted from SmartImage for reuse and clarity

/**
 * Create a new image analysis worker using the inlined worker code.
 * @param {string} workerInline - The inlined worker code as a string.
 * @returns {Worker}
 */
export function createImageAnalysisWorker(workerInline) {
	if (!workerInline || typeof workerInline !== 'string' || workerInline.length < 100) {
		throw new Error('Worker could not be created: inline worker code not available. Make sure the worker is properly bundled.');
	}

	const blob = new Blob([workerInline], { type: 'application/javascript' });

	return new Worker(URL.createObjectURL(blob), { type: 'module' });
}

/**
 * Analyze an image using a web worker (returns a Promise).
 * @param {Worker} worker - The worker instance.
 * @param {ImageBitmap} imageBitmap - The image to analyze.
 * @param {object} settings - Analysis settings.
 * @returns {Promise<object>} - Resolves with analysis result.
 */
export function analyzeWithWorker(worker, imageBitmap, settings) {
	return new Promise((resolve, reject) => {
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
}
