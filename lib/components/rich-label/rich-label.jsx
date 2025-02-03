import { clsx } from 'clsx/lite';

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
 * @param {string} [props.iconClassName] - Classes to pass to the icon.
 * @param {boolean} [props.fullWidth=false] - If `true`, the component will take up as much space as it can.
 * @param {boolean} [props.contentsOnly] - If `true`, only the label (/icon/subtitle) will be rendered, without any wrapping elements. Useful if you want to provide your own layout.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.noColor] - If `true`, colors on text won't be set, opacity will be used instead.
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
 *
 * @preserve
 */
export const RichLabel = (props) => {
	const { icon, label, subtitle, as, className, iconClassName, fullWidth = false, contentsOnly, hidden, noColor, fullSizeSubtitle, inlineSubtitle } = props;

	if (hidden) {
		return null;
	}

	const ComponentToRender = as ?? 'div';

	if (contentsOnly) {
		return (
			<>
				{icon && <span className={clsx('es:icon:size-5.5', !noColor && 'es:text-slate-500')}>{icon}</span>}
				{label && <span className={clsx('es:text-balance', !noColor && 'es:text-secondary-800')}>{label}</span>}
				{subtitle && <span className={clsx('es:text-balance es:text-xs es:opacity-65', !noColor && 'es:text-secondary-800')}>{subtitle}</span>}
			</>
		);
	}

	return (
		<ComponentToRender
			className={clsx(
				'es:flex es:items-center es:gap-1.5 es:text-sm',
				!noColor && 'es:text-secondary-800 es:[&>span>svg]:text-slate-500',
				noColor && 'es:[&>span>svg]:opacity-80',
				fullWidth && 'es:grow',
				className,
			)}
		>
			{icon && <span className={clsx('es:icon:size-5.5', iconClassName)}>{icon}</span>}
			{(label || subtitle) && (
				<div className={clsx('es:flex es:items-start es:text-balance es:text-start', inlineSubtitle ? 'es:gap-1.5' : 'es:flex-col')}>
					{label && <span>{label}</span>}
					{subtitle && <span className={clsx(!fullSizeSubtitle && 'es:text-xs', 'es:opacity-65')}>{subtitle}</span>}
				</div>
			)}
		</ComponentToRender>
	);
};
