import { blockIcons } from "./icons";

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
 * @param {object} props          - BlockIcon options.
 * @param {string} props.iconName - Name of the block icon to display.
 *
 * @access public
 *
 * @returns {string}
 */
export const BlockIcon = (props) => {
	const { iconName } = props;

	return (
		<i
			dangerouslySetInnerHTML={{ __html: blockIcons[iconName] }}
			style={{ lineHeight: 0 }}
		/>
	);
};
