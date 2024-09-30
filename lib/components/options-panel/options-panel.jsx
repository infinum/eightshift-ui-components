import { clsx } from 'clsx/lite';
import { RichLabel } from '../rich-label/rich-label';
import { Heading } from 'react-aria-components';

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
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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
	const { children, className, title, icon, subtitle, help, hidden } = props;

	if (hidden) {
		return null;
	}

	return (
		<div className={clsx('es-uic-max-w-md', className)}>
			{title && (
				<RichLabel
					icon={icon}
					label={title}
					subtitle={subtitle}
					className='es-uic-mb-1 es-uic-text-[0.875rem] es-uic-tracking-[-0.01em] !es-uic-text-gray-500'
				/>
			)}
			<div className='es-uic-divide-y es-uic-divide-gray-200 es-uic-rounded-lg es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow'>{children}</div>
			{help && <span className='es-uic-mt-1.5 es-uic-block es-uic-text-sm es-uic-text-gray-400'>{help}</span>}
		</div>
	);
};

/**
 * Component that provides a container for grouping related options within the `OptionsPanel` component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The OptionsPanelSection component.
 *
 * @example
 * <OptionsPanelSection>
 * 	...
 * </OptionsPanelSection>
 *
 * @preserve
 */
export const OptionsPanelSection = ({ children, className, hidden }) => {
	if (hidden) {
		return null;
	}

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

/**
 * Component that provides a header for the top of an options page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.sticky] - If `true`, the header will be sticky (scroll with content). Make sure to pass a background color!
 * @param {string} [props.title] - Title to show.
 * @param {Number} [props.level=2] - Heading level of the title.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Controls to show on the right side of the header.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The OptionsPanelHeader component.
 *
 * @example
 * <OptionsPanelHeader title='Theme options'>
 * 	...
 * </OptionsPanelHeader>
 *
 * @preserve
 */
export const OptionsPanelHeader = ({ children, sticky, title, className, actions, level = 2, hidden }) => {
	if (hidden) {
		return null;
	}

	return (
		<div className={clsx('es-uic-max-w-md es-uic-space-y-2.5', sticky && 'es-uic-sticky es-uic-top-0 es-uic-z-10', className)}>
			<div className='es-uic-flex es-uic-flex-wrap es-uic-items-center es-uic-justify-between es-uic-gap-x-8 es-uic-gap-y-4'>
				<Heading
					className='es-uic-text-2xl es-uic-font-medium es-uic-tracking-tight'
					level={level}
				>
					{title}
				</Heading>
				<div className='es-uic-flex es-uic-items-center es-uic-gap-2'>{actions}</div>
			</div>
			{children}
		</div>
	);
};
