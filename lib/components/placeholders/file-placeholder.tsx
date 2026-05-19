import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ReactElement, type ReactNode } from 'react';
import { file } from '../../icons/internal';
import { RichLabel } from '../rich-label/rich-label';

type FilePlaceholderProps = {
	icon?: ReactElement;
	fileName?: string;
	flat?: boolean;
	className?: string;
	children?: ReactNode;
};

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
export const FilePlaceholder = (props: FilePlaceholderProps) => {
	const { icon, fileName, className, flat, children } = props;
	const label = fileName ?? (typeof children === 'string' ? children : undefined) ?? __('No file selected', 'eightshift-ui-components');

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
