import { clsx } from 'clsx/lite';
import { RichLabel } from '../rich-label/rich-label';
import { Heading } from 'react-aria-components';
import { cloneElement } from 'react';

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
		<div>
			<div className={clsx('es:overflow-clip es:max-w-lg', className)}>
				{title && (
					<RichLabel
						icon={icon}
						label={title}
						subtitle={subtitle}
						className={clsx('es:shrink-0 es:text-secondary-700 es:px-1 es:pt-5 es:pb-1')}
						labelClassName='es:text-lg es:leading-tight'
						subtitleClassName='es:text-base es:leading-tight'
						noColor
					/>
				)}

				<div className='es:flex es:flex-col es:gap-1'>{children}</div>
			</div>

			{help && <span className='es:mx-1 es:mt-2 es:block es:text-sm es:text-secondary-400'>{help}</span>}
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
				'es:flex es:flex-col es:gap-5',
				'es:p-4',
				'es:bg-secondary-50 es:inset-ring es:inset-ring-secondary-100',
				'es:rounded-md es:first:rounded-t-2xl es:last:rounded-b-2xl',
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
		<div className={clsx('es:space-y-2.5', limitWidth && 'es:max-w-2xl', sticky && 'es:sticky es:top-0 es:z-10 es:bg-white', className)}>
			<div className='es:flex es:flex-wrap es:items-center es:justify-between es:gap-x-8 es:gap-y-4'>
				<Heading
					className='es:text-3xl es:text-surface-800 es:font-variation-["wdth"_180,"YTLC"_540,"wght"_300]'
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
 * @param {JSX.Element} [props.icon] - Icon to show on the right.
 * @param {string} [props.title] - Title to show.
 * @param {string} [props.subtitle] - Subtitle to show.
 * @param {Number} [props.level=2] - Heading level of the title.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {string} [props.iconClassName] - Classes to pass to the icon.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Controls to show on the right side of the header.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The OptionsPanelIntro component.
 *
 * @example
 * <OptionsPanelIntro title='Theme options' />
 *
 * @preserve
 */
export const OptionsPanelIntro = ({ icon, title, subtitle, className, iconClassName, level = 3, flat, hidden }) => {
	if (hidden) {
		return null;
	}

	return (
		<div
			className={clsx(
				'es:relative es:overflow-clip',
				'es:py-5 es:px-6 es:rounded-2xl es:max-w-lg',
				'es:bg-surface-100 es:inset-ring es:inset-ring-surface-600/5',
				!flat && 'es:shadow-xs es:shadow-black/5',
				className,
			)}
		>
			<Heading
				className='es:text-2xl es:my-0! es:text-accent-900 es:font-variation-["wdth"_180,"YTLC"_540,"wght"_350]'
				level={level}
			>
				{title}
			</Heading>
			{subtitle && <p className='es:text-13 es:my-0! es:text-surface-500 es:mt-0.75 es:font-variation-["wdth"_90,"YTLC"_560,"wght"_325]'>{subtitle}</p>}

			{icon && cloneElement(icon, { className: clsx('es:absolute es:-top-2 es:right-2.5 es:rotate-12 es:text-surface-500/10 es:size-18', iconClassName) })}
		</div>
	);
};
