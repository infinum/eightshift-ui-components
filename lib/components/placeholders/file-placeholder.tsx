import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ReactElement, type ReactNode } from 'react';
import { file } from '../../icons/internal';
import type { Prettify } from '../../utilities/types';
import { RichLabel } from '../rich-label/rich-label';

type FilePlaceholderProps = {
	/** File type icon override. */
	icon?: ReactElement;
	/** Current file name. */
	fileName?: string;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** Classes to pass to the component. */
	className?: string;
	children?: ReactNode;
};

const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

/**
 * A simple file placeholder.
 *
 * @component
 * @param {FilePlaceholderProps} props - Component props.
 *
 * @returns {JSX.Element} The FilePlaceholder component.
 *
 * @example
 * <FilePlaceholder />
 *
 * @example
 * <FilePlaceholder fileName='demo.json' />
 */
export const FilePlaceholder = (props: Prettify<FilePlaceholderProps>) => {
	const { icon, fileName, className, flat, children } = props;
	const label = fileName ?? (isStringValue(children) ? children : undefined) ?? __('No file selected', 'eightshift-ui-components');

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
						],
						!fileName && 'es:bg-secondary-100 es:text-secondary-500',
					)}
				>
					{icon ?? file}
				</div>
			}
			label={label}
			className={clsx(fileName && 'es:font-mono', className)}
		/>
	);
};
