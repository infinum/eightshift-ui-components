import { classnames } from '../../utilities/classnames';

/**
 * Component that displays a label, with an optional icon and subtitle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element} [props.as] - Element to render the label as. Not compatible with `contentsOnly`.
 * @param {string} [props.className] - Classes to pass to the label.
 * @param {boolean} [props.fullWidth=false] - If `true`, the component will take up as much space as it can.
 * @param {boolean} [props.contentsOnly] - If `true`, only the label (/icon/subtitle) will be rendered, without any wrapping elements. Useful if you want to provide your own layout.
 *
 * @returns {JSX.Element} The IconLabel component.
 *
 * @example
 * <IconLabel
 * 	icon={icons.myIcon}
 * 	label='My label'
 * />
 *
 * @preserve
 */
export const IconLabel = (props) => {
	const { icon, label, subtitle, as, className, fullWidth = false, contentsOnly } = props;

	const ComponentToRender = as ?? 'div';

	if (contentsOnly) {
		return (
			<>
				{icon && <span className='es-uic-text-slate-500 [&>svg]:es-uic-size-5.5'>{icon}</span>}
				{label && <span>{label}</span>}
				{subtitle && <span className='es-uic-text-xs es-uic-text-gray-500'>{subtitle}</span>}
			</>
		);
	}

	return (
		<ComponentToRender
			className={classnames(
				'es-uic-flex es-uic-items-center es-uic-gap-1.5 es-uic-text-sm es-uic-leading-tight es-uic-text-gray-800',
				fullWidth && 'es-uic-grow',
				className,
			)}
		>
			{icon && <span className='es-uic-text-slate-500 [&>svg]:es-uic-size-5.5'>{icon}</span>}
			{(label || subtitle) && (
				<div className='es-uic-flex es-uic-flex-col es-uic-items-start es-uic-text-start'>
					{label && <span>{label}</span>}
					{subtitle && <span className='es-uic-text-xs es-uic-text-gray-500'>{subtitle}</span>}
				</div>
			)}
		</ComponentToRender>
	);
};
