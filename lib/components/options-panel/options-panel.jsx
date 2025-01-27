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
		<div className='es:not-last:mb-10'>
			<div className={clsx('es:bg-white es:rounded-xl es:border es:border-secondary-300 es:overflow-clip es:max-w-lg es:shadow-xs', className)}>
				{title && (
					<RichLabel
						icon={icon}
						label={title}
						subtitle={subtitle}
						className={clsx(
							'es:bg-secondary-50 es:shrink-0 es:text-secondary-700 es:px-4 es:**:first:text-base! es:border-b es:border-b-secondary-200',
							subtitle ? 'es:py-3' : 'es:pt-2.25 es:pb-1.75',
						)}
						noColor
					/>
				)}

				<div className='es:divide-y es:divide-secondary-200/75 es:py-4'>{children}</div>
			</div>
			{help && <span className='es:mx-0.5 es:mt-1 es:block es:text-sm es:text-secondary-400'>{help}</span>}
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

	return <div className={clsx('es:space-y-2.5 es:not-last:pb-4 es:not-first:pt-4 es:px-4', className)}>{children}</div>;
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
 * @param {boolean} [props.limitWidth] - If `true`, the width is limited.
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
export const OptionsPanelHeader = ({ children, sticky, title, className, actions, level = 2, limitWidth, hidden }) => {
	if (hidden) {
		return null;
	}

	return (
		<div className={clsx('es:space-y-2.5', limitWidth && 'es:max-w-md', sticky && 'es:sticky es:top-0 es:z-10 es:bg-white', className)}>
			<div className='es:flex es:flex-wrap es:items-center es:justify-between es:gap-x-8 es:gap-y-4'>
				<Heading
					className='es:text-2xl es:font-medium es:tracking-tight'
					level={level}
				>
					{title}
				</Heading>
				<div className='es:flex es:items-center es:gap-2'>{actions}</div>
			</div>
			{children}
		</div>
	);
};

/**
 * Component that provides an intro for an options page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.title] - Title to show.
 * @param {string} [props.subtitle] - Subtitle to show.
 * @param {Number} [props.level=2] - Heading level of the title.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Controls to show on the right side of the header.
 * @param {boolean} [props.border] - If `true`, a border is shown below the text.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The OptionsPanelIntro component.
 *
 * @example
 * <OptionsPanelIntro title='Theme options' />
 *
 * @preserve
 */
export const OptionsPanelIntro = ({ title, subtitle, className, level = 3, border, hidden }) => {
	if (hidden) {
		return null;
	}

	return (
		<div className={clsx('es:pb-2.5', border && 'es:mb-5 es:border-b es:border-b-secondary-200', className)}>
			<Heading
				className='es:text-lg es:tracking-tight es:text-secondary-800'
				level={level}
			>
				{title}
			</Heading>
			{subtitle && <p className='es:text-sm es:text-secondary-500 es:mt-0.5'>{subtitle}</p>}
		</div>
	);
};
