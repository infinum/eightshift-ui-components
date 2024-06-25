import { clsx } from 'clsx/lite';
import { RichLabel } from '../rich-label/rich-label';

/**
 * Component that provides a container panel for options, with an optional title.
 * Best used within the Gutenberg sidebar, instead of the default `PanelBody` component.
 * Ensures that the content is spaced nicely.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {string} [props.title] - Title to display on the top of the panel.
 * @param {JSX.Element} [props.icon] - Icon to display on the top of the panel.
 * @param {string} [props.subtitle] - Subtitle to display on the top of the panel.
 * @param {string} [props.help] - Help text to show below the panel.
 *
 * @returns {JSX.Element} The OptionsPanel component.
 *
 * @example
 * <OptionsPanel title='Paragraph'>
 * 	...
 * </OptionsPanel>
 *
 * @preserve
 */
export const OptionsPanel = (props) => {
	const { children, className, title, icon, subtitle, help } = props;

	return (
		<div className={clsx('es-uic-max-w-96', className)}>
			{title && (
				<RichLabel
					icon={icon}
					label={title}
					subtitle={subtitle}
					className='es-uic-mb-1 es-uic-text-[0.875rem] es-uic-tracking-[-0.01em] !es-uic-text-gray-500'
				/>
			)}
			<div className='es-uic-divide-y es-uic-divide-gray-200 es-uic-rounded-lg es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow'>{children}</div>
			{help && <span className='text-sm es-uic-mt-1.5 es-uic-block es-uic-text-gray-400'>{help}</span>}
		</div>
	);
};

export const OptionsPanelSection = ({ children, className }) => {
	return (
		<div
			className={clsx(
				'last:rounded-b-lg es-uic-space-y-2.5 es-uic-px-3 es-uic-py-4 first:es-uic-rounded-t-lg first:es-uic-pt-3.5 last:es-uic-pb-3.5 only:es-uic-rounded-lg',
				className,
			)}
		>
			{children}
		</div>
	);
};
