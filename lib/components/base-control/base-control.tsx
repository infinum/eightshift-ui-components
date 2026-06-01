import { clsx } from 'clsx';
import { Children, type ElementType, type ReactNode } from 'react';
import { Text } from 'react-aria-components';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

export type BaseControlProps = {
	/** Icon to display in the label. */
	icon?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Subtitle to display below the label. */
	subtitle?: ReactNode;
	/** Actions to show to the right of the label. */
	actions?: ReactNode;
	/** Help text to show below the component. */
	help?: ReactNode;
	children?: ReactNode;
	/** If `true`, the component is displayed inline - icon/label/subtitle are on the left, the passed content is on the right. **Note:** not compatible with `actions`. */
	inline?: boolean;
	/** Classes to pass to the main element wrapper. */
	className?: string;
	/** Classes to pass to the control container. */
	controlContainerClassName?: string;
	/** Classes to pass to the label container. */
	labelContainerClassName?: string;
	/** Classes to pass to the label. */
	labelClassName?: string;
	/** If `true`, the label expands to fill up the whole width, instead of taking up only the space it needs. */
	fullWidthLabel?: boolean;
	/** If `true`, the help text is not inset. */
	noHelpInset?: boolean;
	/** If provided, the label (includes icon and subtitle) will be rendered as this element. */
	labelAs?: ElementType;
	/** If `true`, the component is not rendered. */
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
export const BaseControl = (props: Prettify<BaseControlProps>) => {
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
