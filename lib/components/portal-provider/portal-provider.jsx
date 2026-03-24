import { UNSAFE_PortalProvider } from 'react-aria';
import { useCallback } from 'react';

/**
 * Component that allows changing the default target for transient components like `Menu`, `Popover`, etc.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element|null} [props.portalElement] - Element to use as the portal container.
 *
 * @returns {JSX.Element} The Menu component.
 *
 * @example
 * <PortalProvider>
 * 	...
 * </PortalProvider>
 *
 * @preserve
 */
export const PortalProvider = ({ children, portalElement }) => {
	const getContainer = useCallback(() => portalElement, [portalElement]);

	return <UNSAFE_PortalProvider getContainer={getContainer}>{children}</UNSAFE_PortalProvider>;
};
