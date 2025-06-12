import { UNSAFE_PortalProvider } from 'react-aria';

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
	return <UNSAFE_PortalProvider getContainer={() => portalElement}>{children}</UNSAFE_PortalProvider>;
};
