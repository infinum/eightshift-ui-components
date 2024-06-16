import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { RichLabel } from '../rich-label/rich-label';
import { clsx } from 'clsx/lite';

/**
 * A simple file placeholder.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - File type icon override.
 * @param {string} [props.fileName] - Current file name.
 * @param {string} [props.className] - Classes to pass to the component.
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
	const { icon, fileName, className, children } = props;

	const commonClassName = clsx(
		'es-uic-w-fit es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-bg-gray-50 es-uic-p-2 es-uic-pr-3 es-uic-text-xs es-uic-text-gray-300 es-uic-shadow',
		fileName && 'es-uic-font-mono',
		className,
	);

	if (!fileName) {
		return (
			<RichLabel
				icon={icon ?? icons.file}
				label={children ?? __('No file selected', 'eightshift-ui-components')}
				className={commonClassName}
			/>
		);
	}

	return (
		<RichLabel
			icon={icon ?? icons.file}
			label={fileName ?? __('No file selected', 'eightshift-ui-components')}
			className={commonClassName}
		/>
	);
};
