import { UNSAFE_PortalProvider } from 'react-aria';
import { type ReactNode, useCallback } from 'react';

type PortalProviderProps = {
	children?: ReactNode;
	portalElement?: HTMLElement | null;
};

export const PortalProvider = ({ children, portalElement }: PortalProviderProps) => {
	const getContainer = useCallback(() => portalElement ?? null, [portalElement]);

	return <UNSAFE_PortalProvider getContainer={getContainer}>{children}</UNSAFE_PortalProvider>;
};
