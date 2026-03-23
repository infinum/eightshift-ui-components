import * as uiIcons from './ui-icons/index.js';

const normalizeIconName = (name) => name.replace(/[-_]+([a-z0-9])/gi, (_, char) => char.toUpperCase()).replace(/^([A-Z])/, (char) => char.toLowerCase());

export const Icon = ({ name, fallback = null }) => {
	if (!name) {
		return fallback;
	}

	if (typeof name !== 'string') {
		return name;
	}

	return uiIcons[name] ?? uiIcons[normalizeIconName(name)] ?? fallback;
};
