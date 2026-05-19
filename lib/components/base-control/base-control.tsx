import { clsx } from 'clsx';
import { Children, type ElementType, type ReactNode } from 'react';
import { Text } from 'react-aria-components';
import { RichLabel } from '../rich-label/rich-label';

export type BaseControlProps<TLabelAs extends ElementType = 'div'> = {
	icon?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	actions?: ReactNode;
	help?: ReactNode;
	children?: ReactNode;
	inline?: boolean;
	className?: string;
	controlContainerClassName?: string;
	labelContainerClassName?: string;
	labelClassName?: string;
	fullWidthLabel?: boolean;
	noHelpInset?: boolean;
	labelAs?: TLabelAs;
	hidden?: boolean;
};

const TypedRichLabel = RichLabel as <T extends ElementType = 'div'>(props: {
	icon?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	fullWidth?: boolean;
	as?: T;
	className?: string;
	noColor?: boolean;
}) => ReactNode;

/**
 * Component that allows wrapping components with a common layout that includes a label and optional icon, subtitle, actions, and help text.
 *
 * @component
 * @param {BaseControlProps} props - Component props.
 *
 * @returns {JSX.Element} The BaseControl component.
 *
 * @example
 * <BaseControl label='My component' icon={myIcon}>
 * 	<div>Content</div>
 * </BaseControl>
 */
export const BaseControl = <TLabelAs extends ElementType = 'div'>(props: BaseControlProps<TLabelAs>) => {
	const {
		icon,
		label,
		subtitle,
		actions,
		help,
		children,
		inline,
		className,
		controlContainerClassName,
		labelContainerClassName,
		labelClassName,
		noHelpInset,
		fullWidthLabel,
		labelAs,
		hidden,
	} = props;

	if (!children || hidden) {
		return null;
	}

	if (!(label || icon || subtitle)) {
		return children;
	}

	const renderedChildren = Children.toArray(children).filter(Boolean);
	const hasMultipleChildren = renderedChildren.length > 1;

	return (
		<div className={className}>
			<div className={clsx('es:flex es:items-center es:gap-1', !inline && 'es:mb-1.5', labelContainerClassName)}>
				{label || icon || subtitle ? (
					<TypedRichLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
						fullWidth={fullWidthLabel}
						as={labelAs}
						className={labelClassName}
						noColor
					/>
				) : null}

				{inline ? <div className={clsx('es:ml-auto es:flex es:items-center es:gap-1', controlContainerClassName)}>{children}</div> : null}

				{!inline && actions ? <div className={clsx('es:flex es:items-center es:gap-1', 'es:ml-auto')}>{actions}</div> : null}
			</div>

			{!inline && hasMultipleChildren ? <div className={clsx('es:space-y-1', controlContainerClassName)}>{children}</div> : null}
			{!inline && !hasMultipleChildren ? children : null}

			{help ? (
				<Text
					className={clsx('es:inline-block es:text-sm es:text-secondary-500 es:mt-1.5 es:font-variation-["wdth"_66,"wght"_325,"slnt"_-4]', !noHelpInset && 'es:pl-1')}
					slot='description'
				>
					{help}
				</Text>
			) : null}
		</div>
	);
};
