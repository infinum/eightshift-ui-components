import { useEffect, useRef } from 'react';

export function useCellEditMode() {
	const isFocusedRef = useRef(false);
	const isEditModeRef = useRef(false);

	useEffect(() => {
		const handler = (e) => {
			if (isFocusedRef.current) {
				if (e.code === 'Enter') {
					isEditModeRef.current = true;
				} else if (e.code === 'Escape' || e.code === 'Tab') {
					isEditModeRef.current = false;
				}

				if (isEditModeRef.current) {
					e.stopPropagation();
				}
			}
		};

		// capture all events on 'window' because we are in the capture phase
		window.addEventListener('keydown', handler, true);

		return () => {
			window.removeEventListener('keydown', handler, true);
		};
	}, []);

	const setFocus = (should) => (isFocusedRef.current = should);

	const preventProps = {
		onFocus: () => setFocus(true),
		onBlur: () => setFocus(false),
		onClick: () => {
			// We did not focus through keyboard nav, so we can
			// enter the edit mode right away.
			isEditModeRef.current = true;
		},
	};

	return preventProps;
}
