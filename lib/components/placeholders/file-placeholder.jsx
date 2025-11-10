import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { RichLabel } from '../rich-label/rich-label';
import { clsx } from 'clsx';

/**
 * A simple file placeholder.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - File type icon override.
 * @param {string} [props.fileName] - Current file name.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
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
	const { icon, fileName, className, flat, children } = props;

	return (
		<RichLabel
			icon={
				<div
					className={clsx(
						'es:w-fit es:rounded-xl es:p-2',
						fileName && [
							'es:bg-linear-to-br es:from-surface-100 es:to-surface-200',
							'es:inset-ring es:inset-ring-surface-300/40',
							'es:inset-shadow-xs es:inset-shadow-surface-50/50',
							'es:text-surface-800',
							!flat && 'es:shadow-xs es:shadow-black/5',
							'es:cursor-pointer',
						],
						!fileName && 'es:bg-secondary-100 es:text-secondary-500',
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
