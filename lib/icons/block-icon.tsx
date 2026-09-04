import type { JSX } from 'react';
import { blockIcons } from './icons';

interface BlockIconProps {
	iconName: string;
}

/**
 * A component that displays a block icon.
 *
 * Usage:
 *
 * ```jsx
 * import { BlockIcon } from '@eightshift/frontend-libs/scripts';
 *
 * <BlockIcon iconName='es-button' />
 * ```
 *
 * Output:
 *
 * Selected block icon displayed inline.
 * ```html
 * <i><svg ...> ... </svg></i>
 * ```
 *
 * @param {BlockIconProps} props - BlockIcon options.
 *
 * @access public
 *
 * @returns {JSX.Element} The BlockIcon component.
 */
export const BlockIcon = ({ iconName }: BlockIconProps): JSX.Element => (
	<i
		dangerouslySetInnerHTML={{ __html: Object.entries(blockIcons).find(([name]) => name === iconName)?.[1] ?? '' }}
		style={{ lineHeight: 0 }}
	/>
);
