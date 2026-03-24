import { clsx } from 'clsx';

/**
 * Component that displays a label, with an optional icon and subtitle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display.
 * @param {JSX.Element} [props.endIcon] - Icon to display at the end of the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element} [props.as] - Element to render the label as. Not compatible with `contentsOnly`.
 * @param {string} [props.className] - Classes to pass to the label.
 * @param {string} [props.iconClassName] - Classes to pass to the icon.
 * @param {string} [props.labelClassName] - Classes to pass to the label.
 * @param {string} [props.subtitleClassName] - Classes to pass to the subtitle.
 * @param {string} [props.labelSubtitleWrapClassName] - Classes to pass to the label/subtitle wrapper (not applicable when `contentsOnly` is set).
 * @param {boolean} [props.fullWidth=false] - If `true`, the component will take up as much space as it can.
 * @param {boolean} [props.contentsOnly] - If `true`, only the label (/icon/subtitle) will be rendered, without any wrapping elements. Useful if you want to provide your own layout.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.fullSizeSubtitle] - If `true`, the subtitle is the same size as the label.
 * @param {boolean} [props.inlineSubtitle] - If `true`, the subtitle is shown after the label instead of below it.
 *
 * @returns {JSX.Element} The RichLabel component.
 *
 * @example
 * <RichLabel
 * 	icon={icons.myIcon}
 * 	label='My label'
 * />
 */
export const RichLabel = (props) => {
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
	} = props;

	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';

	const labelBaseClassName = 'es:font-variation-["wdth"_100,"wght"_330,"ROND"_15]';
	const subtitleBaseClassName = 'es:font-variation-["wdth"_90,"wght"_365,"ROND"_85,"slnt"_-1]';

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
		<ComponentToRender className={clsx('es:flex es:items-center es:gap-1.75 es:text-sm', fullWidth && 'es:grow', className)}>
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
