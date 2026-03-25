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

	const iconToRender = uiIcons[icon] ?? uiIcons[normalizeIconName(icon)];

	if (!iconToRender) {
		return fallback;
	}

	if (!rest) {
		return iconToRender;
	}

	return cloneElement(iconToRender, rest);
};
