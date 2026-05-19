import { cloneElement, useEffect, useState, type JSX } from 'react';
import { hasIconLoader, loadIconByName } from './generated-icon-loaders';
import { dummySpacer } from './ui-icons/dummy-spacer';

const normalizeIconName = (name: string): string => name.replace(/[-_]+([a-z0-9])/gi, (_, char: string) => char.toUpperCase()).replace(/^([A-Z])/, (char) => char.toLowerCase());

const iconCache = new Map<string, JSX.Element | null>();
const iconLoads = new Map<string, Promise<JSX.Element | null>>();

const loadIcon = (iconName: string): Promise<JSX.Element | null> => {
	if (iconCache.has(iconName)) {
		return Promise.resolve(iconCache.get(iconName) ?? null);
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

	return iconLoads.get(iconName)!;
};

const renderIcon = (iconToRender: JSX.Element | null, rest: Record<string, unknown>): JSX.Element | null => {
	if (!iconToRender) {
		return null;
	}

	if (Object.keys(rest ?? {}).length === 0) {
		return iconToRender;
	}

	return cloneElement(iconToRender, rest);
};

interface IconProps {
	icon?: JSX.Element | string | null;
	fallback?: JSX.Element | null;
	[key: string]: unknown;
}

/**
 * Renders an icon by name without eagerly importing the entire icon set.
 *
 * String icons are lazy-loaded on demand and render `dummySpacer` while the
 * module resolves. Invalid icon names render `fallback` instead.
 *
 * @param {IconProps} props - Icon props.
 *
 * @returns {JSX.Element | null} The Icon component.
 */
export const Icon = ({ icon, fallback = null, ...rest }: IconProps): JSX.Element | null => {
	const normalizedIconName = typeof icon === 'string' ? normalizeIconName(icon) : null;
	const [loadedIcon, setLoadedIcon] = useState<JSX.Element | null | undefined>(() =>
		normalizedIconName && iconCache.has(normalizedIconName) ? (iconCache.get(normalizedIconName) ?? null) : undefined,
	);

	useEffect(() => {
		let isDisposed = false;

		if (!normalizedIconName) {
			setLoadedIcon(undefined);

			return undefined;
		}

		if (iconCache.has(normalizedIconName)) {
			setLoadedIcon(iconCache.get(normalizedIconName) ?? null);

			return undefined;
		}

		if (!hasIconLoader(normalizedIconName)) {
			setLoadedIcon(null);

			return undefined;
		}

		setLoadedIcon(undefined);

		const loadIconPromise = loadIcon(normalizedIconName).then((resolvedIcon) => {
			if (!isDisposed) {
				setLoadedIcon(resolvedIcon);
			}
		});

		loadIconPromise.catch(() => undefined);

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
