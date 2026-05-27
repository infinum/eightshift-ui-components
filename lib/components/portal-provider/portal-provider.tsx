import { UNSAFE_PortalProvider } from 'react-aria';
import { type ReactNode, useCallback } from 'react';
import type { Prettify } from '../../utilities/types';

type PortalProviderProps = {
	children?: ReactNode;
	portalElement?: HTMLElement | null;
};

/**
 * Component that allows changing the default target for transient components like `Menu`, `Popover`, and related overlays.
 *
 * @component
 * @param {PortalProviderProps} props - Component props.
 *
 * @returns {JSX.Element} The PortalProvider component.
 *
 * @example
 * <PortalProvider>
 * 	...
 * </PortalProvider>
 */
export const PortalProvider = ({ children, portalElement }: Prettify<PortalProviderProps>) => {
	const getContainer = useCallback(() => portalElement ?? null, [portalElement]);

	return <UNSAFE_PortalProvider getContainer={getContainer}>{children}</UNSAFE_PortalProvider>;
};
