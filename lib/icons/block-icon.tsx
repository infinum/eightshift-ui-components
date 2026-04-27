import type { JSX } from 'react';
import { blockIcons } from './icons';

interface BlockIconProps {
	iconName: string;
}

/**
 * A component that displays a block icon.
 */
export const BlockIcon = ({ iconName }: BlockIconProps): JSX.Element => (
	<i
		dangerouslySetInnerHTML={{ __html: blockIcons[iconName] ?? '' }}
		style={{ lineHeight: 0 }}
	/>
);
