import { cloneElement, useEffect, useState } from 'react';
import { hasIconLoader, loadIconByName } from './generated-icon-loaders.js';
import { dummySpacer } from './ui-icons/dummy-spacer.jsx';

const normalizeIconName = (name) => name.replace(/[-_]+([a-z0-9])/gi, (_, char) => char.toUpperCase()).replace(/^([A-Z])/, (char) => char.toLowerCase());

const iconCache = new Map();
const iconLoads = new Map();

const loadIcon = (iconName) => {
	if (iconCache.has(iconName)) {
		return Promise.resolve(iconCache.get(iconName));
	}

	if (!iconLoads.has(iconName)) {
		const iconLoad = loadIconByName(iconName)
			.then((loadedIcon) => {
				iconCache.set(iconName, loadedIcon);

				return loadedIcon;
			})
			.catch(() => {
				iconCache.set(iconName, null);

				return null;
			})
			.finally(() => {
				iconLoads.delete(iconName);
			});

		iconLoads.set(iconName, iconLoad);
	}

	return iconLoads.get(iconName);
};

const renderIcon = (iconToRender, rest) => {
	if (!iconToRender) {
		return null;
	}

	if (Object.keys(rest ?? {}).length === 0) {
		return iconToRender;
	}

	return cloneElement(iconToRender, rest);
};

/**
 * Renders an icon by name without eagerly importing the entire icon set.
 *
 * String icons are lazy-loaded on demand and render `dummySpacer` while the
 * module resolves. Invalid icon names render `fallback` instead.
 */
export const Icon = ({ icon, fallback = null, ...rest }) => {
	const normalizedIconName = typeof icon === 'string' ? normalizeIconName(icon) : null;
	const [loadedIcon, setLoadedIcon] = useState(() => (normalizedIconName && iconCache.has(normalizedIconName) ? iconCache.get(normalizedIconName) : undefined));

	useEffect(() => {
		let isDisposed = false;

		if (!normalizedIconName) {
			setLoadedIcon(undefined);

			return undefined;
		}

		if (iconCache.has(normalizedIconName)) {
			setLoadedIcon(iconCache.get(normalizedIconName));

			return undefined;
		}

		if (!hasIconLoader(normalizedIconName)) {
			setLoadedIcon(null);

			return undefined;
		}

		setLoadedIcon(undefined);

		loadIcon(normalizedIconName).then((resolvedIcon) => {
			if (!isDisposed) {
				setLoadedIcon(resolvedIcon);
			}
		});

		return () => {
			isDisposed = true;
		};
	}, [normalizedIconName]);

	if (!icon) {
		return fallback;
	}

	if (typeof icon !== 'string') {
		return icon;
	}

	if (loadedIcon === undefined) {
		return renderIcon(dummySpacer, rest);
	}

	if (!loadedIcon) {
		return fallback;
	}

	return renderIcon(loadedIcon, rest);
};
