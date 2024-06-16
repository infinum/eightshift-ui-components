import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { RichLabel } from '../rich-label/rich-label';

/**
 * A simple file placeholder.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - File type icon override.
 * @param {string} [props.fileName] - Current file name.
 *
 * @returns {JSX.Element} The FilePlaceholder component.
 *
 * @example
 * <FilePlaceholder />
 *
 * @example
 * <FilePlaceholder fileName='demo.json' />
 *
 * @preserve
 */
export const FilePlaceholder = (props) => {
	const { icon, fileName } = props;
	return (
		<RichLabel
			icon={icon ?? icons.file}
			label={fileName ?? __('No file selected', 'eightshift-ui-components')}
			className='es-uic-w-fit es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-p-2 es-uic-pr-3 es-uic-font-mono es-uic-text-xs es-uic-text-gray-300 es-uic-shadow'
		/>
	);
};
