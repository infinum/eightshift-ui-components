import { classnames } from '../../utilities/classnames';
import { IconLabel } from '../icon-label/icon-label';

/**
 * @since 8.0.0
 *
 * A base component to optionally encase a component with a label and help.
 *
 * @param {object} props                                - Control options.
 * @param {React.Component?} [props.icon]               - Icon to show next to the label
 * @param {React.Component?} [props.label]              - Label to show above component.
 * @param {React.Component?} [props.subtitle]           - Subtitle below the label.
 * @param {React.Component?} [props.actions]            - Actions to show to the right of the label.
 * @param {React.Component?} [props.help]               - Help to show below the control.
 * @param {React.Component?} [props.children]           - Content to show.
 * @param {string?} [props.additionalClasses]           - Classes to add to the control base.
 * @param {string?} [props.additionalLabelClasses]      - Classes to add to the control label.
 * @param {boolean?} [props.inlineLabel=false]          - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {boolean?} [props.noBottomSpacing=false]      - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing=false] - If `true`, space below the control is reduced.
 * @param {function?} [props.wrapChildren]              - If passed (function `(children) => React.Component`), the children are wrapped in the provided element.
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

		fullWidthLabel,

		labelAs,
	} = props;

	if (!children) {
		return null;
	}

	return (
		<div className={classnames('space-y-1', className)}>
			<div className='flex items-center gap-1'>
				{(label || icon || subtitle) && (
					<IconLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
						fullWidth={fullWidthLabel}
						as={labelAs}
					/>
				)}

				{inline && <div className='flex items-center gap-1 ml-auto'>{children}</div>}

				{actions && (
					<div className={classnames('flex items-center gap-1', !inline && 'ml-auto')}>
						{actions}
					</div>
				)}
			</div>

			{!inline && Array.isArray(children) && children.filter(Boolean).length > 1 && <div className='space-y-1 bg-red-200'>{children}</div>}
			{!inline && (!Array.isArray(children) || children.filter(Boolean).length < 2) && children}

			{help && <span className='text-sm text-gray-400'>{help}</span>}
		</div>
	);
};
