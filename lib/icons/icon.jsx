import { cloneElement } from 'react';
import * as uiIcons from './ui-icons/index.js';

const normalizeIconName = (name) => name.replace(/[-_]+([a-z0-9])/gi, (_, char) => char.toUpperCase()).replace(/^([A-Z])/, (char) => char.toLowerCase());

export const Icon = ({ icon, fallback = null, ...rest }) => {
	if (!icon) {
		return fallback;
	}

	if (typeof icon !== 'string') {
		return icon;
	}

	const baseProps = {
		'aria-hidden': true,
		focusable: false,
	};

	return cloneElement(uiIcons?.[icon], { ...baseProps, ...rest }) ?? cloneElement(uiIcons?.[normalizeIconName(icon)], { ...baseProps, ...rest }) ?? fallback;
};
