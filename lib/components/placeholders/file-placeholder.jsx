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

	return (
		<RichLabel
			icon={icon ?? icons.file}
			label={(fileName ? fileName : children) ?? __('No file selected', 'eightshift-ui-components')}
			className={clsx(
				'es:w-fit es:rounded-xl es:border es:border-secondary-300 es:bg-secondary-50 es:p-2 es:pr-3 es:text-xs es:text-secondary-300 es:shadow-xs',
				fileName && 'es:font-mono',
				className,
			)}
		/>
	);
};
