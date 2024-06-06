import { Text } from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
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
 * @param {boolean} [props.fullWidthLabel] - If `true`, the label expands to fill up the whole width, instead of taking up only the space it needs.
 * @param {JSX.Element} [props.labelAs] - If provided, the label (includes icon and subtitle) will be rendered as this element.
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

		fullWidthLabel,

		labelAs,
	} = props;

	if (!children) {
		return null;
	}

	if (!(label || icon || subtitle)) {
		return children;
	}

	return (
		<div className={classnames('es-uic-space-y-1', className)}>
			<div
				className={classnames(
					'es-uic-flex es-uic-items-center es-uic-gap-1',
					!inline && !icon && 'es-uic-pb-0.5',
				)}
			>
				{(label || icon || subtitle) && (
					<RichLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
						fullWidth={fullWidthLabel}
						as={labelAs}
					/>
				)}

				{inline && (
					<div
						className={classnames(
							'es-uic-ml-auto es-uic-flex es-uic-items-center es-uic-gap-1',
							controlContainerClassName,
						)}
					>
						{children}
					</div>
				)}

				{!inline && actions && (
					<div className={classnames('es-uic-flex es-uic-items-center es-uic-gap-1', !inline && 'es-uic-ml-auto')}>
						{actions}
					</div>
				)}
			</div>

			{!inline && Array.isArray(children) && children.filter(Boolean).length > 1 && (
				<div className={classnames('es-uic-space-y-1', controlContainerClassName)}>{children}</div>
			)}
			{!inline && (!Array.isArray(children) || children.filter(Boolean).length < 2) && children}

			{help && (
				<Text
					className='es-uic-text-sm es-uic-text-gray-400'
					slot='description'
				>
					{help}
				</Text>
			)}
		</div>
	);
};
