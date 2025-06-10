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
			icon={
				<div
					className={clsx(
						'es:w-fit es:rounded-xl es:border es:border-secondary-300 es:p-2',
						fileName && 'es:shadow-sm es:bg-gradient-to-br es:from-secondary-50 es:to-secondary-100 es:text-secondary-600',
						!fileName && 'es:border-dashed es:text-secondary-500',
					)}
				>
					{icon ?? icons.file}
				</div>
			}
			label={(fileName ? fileName : children) ?? __('No file selected', 'eightshift-ui-components')}
			className={clsx(fileName && 'es:font-mono', className)}
			noColor
		/>
	);
};
