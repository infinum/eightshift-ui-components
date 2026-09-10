import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';

export type RichLabelProps<T extends ElementType = 'div'> = {
	/** Icon to display. */
	icon?: ReactNode;
	/** Icon to display at the end of the label. */
	endIcon?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Subtitle to display. */
	subtitle?: ReactNode;
	/** Element to render the label as. Not compatible with `contentsOnly`. */
	as?: T;
	/** Classes to pass to the label. */
	className?: string;
	/** Classes to pass to the icon. */
	iconClassName?: string;
	/** Classes to pass to the label. */
	labelClassName?: string;
	/** Classes to pass to the subtitle. */
	subtitleClassName?: string;
	/** Classes to pass to the label/subtitle wrapper (not applicable when `contentsOnly` is set). */
	labelSubtitleWrapClassName?: string;
	/** If `true`, the component will take up as much space as it can. Defaults to `false`. */
	fullWidth?: boolean;
	/** If `true`, only the label (/icon/subtitle) will be rendered, without any wrapping elements. Useful if you want to provide your own layout. */
	contentsOnly?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** If `true`, the subtitle is the same size as the label. */
	fullSizeSubtitle?: boolean;
	/** If `true`, the subtitle is shown after the label instead of below it. */
	inlineSubtitle?: boolean;
	noColor?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * Component that displays a label, with an optional icon and subtitle.
 *
 * @component
 * @param {RichLabelProps} props - Component props.
 *
 * @returns {JSX.Element} The RichLabel component.
 *
 * @example
 * <RichLabel
 * 	icon={myIcon}
 * 	label='My label'
 * />
 */
export const RichLabel = <T extends ElementType = 'div'>(props: RichLabelProps<T>) => {
	const {
		icon,
		endIcon,
		label,
		subtitle,
		as,
		className,
		iconClassName,
		labelClassName,
		subtitleClassName,
		labelSubtitleWrapClassName,
		fullWidth = false,
		contentsOnly,
		hidden,
		fullSizeSubtitle,
		inlineSubtitle,
		noColor,
		...rest
	} = props;
	const noColorClassName = noColor ? '' : '';

	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';
	const labelBaseClassName = 'es:font-variation-["wdth"_100,"wght"_330,"ROND"_100]';
	const subtitleBaseClassName = 'es:font-variation-["wdth"_85,"wght"_285,"ROND"_100]';

	if (contentsOnly) {
		return (
			<>
				{icon && <span className={clsx('es:icon:size-5 es:not-contrast-more:opacity-85', iconClassName)}>{icon}</span>}
				{label && <span className={clsx('es:text-balance', labelBaseClassName, labelClassName)}>{label}</span>}
				{subtitle && <span className={clsx('es:text-balance es:text-xs es:not-contrast-more:opacity-65', subtitleBaseClassName, subtitleClassName)}>{subtitle}</span>}
				{endIcon && <span className={clsx('es:icon:size-5 es:not-contrast-more:opacity-85 es:ml-auto', iconClassName)}>{endIcon}</span>}
			</>
		);
	}

	return (
		<ComponentToRender
			className={clsx('es:flex es:items-center es:gap-1.75 es:text-sm', fullWidth && 'es:grow', noColorClassName, className)}
			{...rest}
		>
			{icon && <span className={clsx('es:icon:size-5 es:shrink-0', 'es:not-contrast-more:opacity-85', iconClassName)}>{icon}</span>}

			{(label || subtitle) && (
				<div className={clsx('es:flex es:items-start es:text-balance es:text-start', inlineSubtitle ? 'es:gap-1.5' : 'es:flex-col', labelSubtitleWrapClassName)}>
					{label && <span className={clsx(labelBaseClassName, labelClassName)}>{label}</span>}
					{subtitle && <span className={clsx(!fullSizeSubtitle && 'es:text-12', subtitleBaseClassName, 'es:not-contrast-more:opacity-65', subtitleClassName)}>{subtitle}</span>}
				</div>
			)}

			{endIcon && <span className={clsx('es:icon:size-5 es:shrink-0', 'es:not-contrast-more:opacity-85 es:ml-auto', iconClassName)}>{endIcon}</span>}
		</ComponentToRender>
	);
};
