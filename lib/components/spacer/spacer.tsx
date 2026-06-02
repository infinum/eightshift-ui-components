import { clsx } from 'clsx';
import { type ReactNode } from 'react';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

type SpacerSize = 'px' | 'xs' | 's' | 'm';

type SpacerProps = {
	/** The size of the spacer. Defaults to `'px'`. */
	size?: SpacerSize;
	/** Whether to show a border in the middle. Defaults to `false`. */
	border?: boolean;
	/** Additional classes to add. */
	className?: string;
	/** @deprecated Use `label` instead. */
	text?: ReactNode;
	/** Text to display. */
	label?: ReactNode;
	/** Subtitle to display. */
	subtitle?: ReactNode;
	/** Icon to display. */
	icon?: ReactNode;
	/** Whether the spacer is vertical. Defaults to `false`. */
	vertical?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

type SpacerSizeClasses = {
	sizeHorizontal: string;
	sizeHorizontalBorder: string;
	sizeVertical: string;
	sizeVerticalBorder: string;
};

/**
 * A simple spacer or divider component, with optional text or icon.
 *
 * @component
 * @param {SpacerProps} props - Component props.
 *
 * @returns {JSX.Element} The Spacer component.
 *
 * @example
 * <Spacer />
 *
 * @example
 * <Spacer border />
 *
 * @example
 * <Spacer vertical />
 *
 * @example
 * <Spacer label='My divider' icon={myIcon} />
 */
export const Spacer = (props: Prettify<SpacerProps>) => {
	const { size = 'px', border, className, label, subtitle, icon, vertical = false, hidden } = props;

	if (hidden) {
		return null;
	}

	const sizes: Record<SpacerSize, SpacerSizeClasses> = {
		px: {
			sizeHorizontal: 'es:h-px',
			sizeHorizontalBorder: 'es:h-px',
			sizeVertical: 'es:w-px',
			sizeVerticalBorder: 'es:w-px',
		},
		xs: {
			sizeHorizontal: 'es:h-1',
			sizeHorizontalBorder: 'es:h-0.5',
			sizeVertical: 'es:w-1',
			sizeVerticalBorder: 'es:w-0.5',
		},
		s: {
			sizeHorizontal: 'es:h-2.5',
			sizeHorizontalBorder: 'es:h-1',
			sizeVertical: 'es:w-2.5',
			sizeVerticalBorder: 'es:w-1',
		},
		m: {
			sizeHorizontal: 'es:h-5',
			sizeHorizontalBorder: 'es:h-2',
			sizeVertical: 'es:w-5',
			sizeVerticalBorder: 'es:w-2',
		},
	};

	const spaceClass = clsx(
		vertical ? 'es:h-full' : 'es:w-full',
		!vertical && !border && sizes[size].sizeHorizontal,
		!vertical && border && sizes[size].sizeHorizontalBorder,
		vertical && !border && sizes[size].sizeVertical,
		vertical && border && sizes[size].sizeVerticalBorder,
	);

	if (label || icon) {
		return (
			<div className={clsx('es:flex es:items-center es:gap-1.5', className)}>
				<RichLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className='es:shrink-0 es:text-secondary-500'
				/>

				{border && <div className='es:h-px es:w-full es:bg-surface-300 es:leading-3' />}
			</div>
		);
	}

	if (border) {
		return (
			<div className={className}>
				{size !== 'px' && <div className={spaceClass} />}
				<div className={clsx('es:bg-surface-500/15', vertical ? 'es:h-full es:w-px' : 'es:h-px es:w-full')} />
				{size !== 'px' && <div className={spaceClass} />}
			</div>
		);
	}

	return <div className={clsx(spaceClass, className)} />;
};
