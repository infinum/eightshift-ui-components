import { Text } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { RichLabel } from '../rich-label/rich-label';

/**
 * Component that allows wrapping components with a common layout that includes a label and optional icon, subtitle, actions, and help text.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} props.label - Label to display.
 * @param {string} props.subtitle - Subtitle to display below the label.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.help] - Help text to show below the component.
 * @param {boolean} [props.inline] - If `true`, the component is displayed inline - icon/label/subtitle are on the left, the passed content is on the right. **Note:** not compatible with `actions`.
 * @param {string} [props.className] - Classes to pass to the main element wrapper.
 * @param {string} [props.controlContainerClassName] - Classes to pass to the control container.
 * @param {string} [props.labelContainerClassName] - Classes to pass to the label container.
 * @param {string} [props.labelClassName] - Classes to pass to the label.
 * @param {boolean} [props.fullWidthLabel] - If `true`, the label expands to fill up the whole width, instead of taking up only the space it needs.
 * @param {boolean} [props.noHelpInset] - If `true`, the help text is not inset.
 * @param {JSX.Element} [props.labelAs] - If provided, the label (includes icon and subtitle) will be rendered as this element.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The BaseControl component.
 *
 * @example
 * <BaseControl label='My component' icon={icons.myIcon}>
 * 	<div>Content</div>
 * </BaseControl>
 *
 * @preserve
 */
export const BaseControl = (props) => {
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

	return (
		<div className={clsx('es:space-y-1', className)}>
			<div className={clsx('es:flex es:items-center es:gap-1', !inline && !icon && 'es:pb-0.5', labelContainerClassName)}>
				{(label || icon || subtitle) && (
					<RichLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
						fullWidth={fullWidthLabel}
						as={labelAs}
						className={labelClassName}
					/>
				)}

				{inline && <div className={clsx('es:ml-auto es:flex es:items-center es:gap-1', controlContainerClassName)}>{children}</div>}

				{!inline && actions && <div className={clsx('es:flex es:items-center es:gap-1', !inline && 'es:ml-auto')}>{actions}</div>}
			</div>

			{!inline && Array.isArray(children) && children.filter(Boolean).length > 1 && <div className={clsx('es:space-y-1', controlContainerClassName)}>{children}</div>}
			{!inline && (!Array.isArray(children) || children.filter(Boolean).length < 2) && children}

			{help && (
				<Text
					className={clsx('es:inline-block es:text-sm es:text-secondary-400 es:mt-0.5 es:font-variation-["wdth"_76,"wght"_350]', !noHelpInset && 'es:pl-1')}
					slot='description'
				>
					{help}
				</Text>
			)}
		</div>
	);
};
