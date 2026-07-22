import { clsx } from 'clsx';
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import type { Prettify } from '../../utilities/types';
import { Container, ContainerGroup } from '../base-control/container';

type BaseOptionsPanelProps = {
	children?: ReactNode;
	/** Classes to pass to the container. */
	className?: string;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

type OptionsPanelProps = BaseOptionsPanelProps & {
	/** Title to display on the top of the panel. */
	title?: string;
	help?: string;
};

type OptionsPanelHeaderProps = BaseOptionsPanelProps & {
	/** If `true`, the header will be sticky (scroll with content). Make sure to pass a background color! */
	sticky?: boolean;
	/** Title to show. */
	title?: string;
	/** Controls to show on the right side of the header. */
	actions?: ReactNode;
	/** Heading level of the title. Defaults to `2`. */
	level?: number;
	/** If `true`, the width is limited. */
	limitWidth?: boolean;
};

type OptionsPanelIntroProps = BaseOptionsPanelProps & {
	/** Icon to show on the right. */
	icon?: ReactElement;
	/** Title to show. */
	title?: string;
	/** Subtitle to show. */
	subtitle?: string;
	/** Classes to pass to the icon. */
	iconClassName?: string;
	/** Heading level of the title. Defaults to `3`. */
	level?: number;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
};

/**
 * Component that provides a container panel for options, with an optional title.
 * Best used within the Gutenberg sidebar, instead of the default `PanelBody` component.
 * Ensures that the content is spaced nicely.
 *
 * @component
 * @param {OptionsPanelProps} props - Component props.
 *
 * @returns {JSX.Element} The OptionsPanel component.
 *
 * @example
 * <OptionsPanel title='Paragraph'>
 * 	...
 * </OptionsPanel>
 */
export const OptionsPanel = (props: Prettify<OptionsPanelProps>) => {
	const { children, className, title, help, hidden } = props;

	if (hidden) {
		return null;
	}

	return (
		<>
			<ContainerGroup
				title={title}
				className={className}
			>
				{children}
			</ContainerGroup>
			{help && <span className='es:mx-1 es:mt-2 es:block es:text-sm es:text-secondary-400'>{help}</span>}
		</>
	);
};

/**
 * Component that provides a container for grouping related options within the `OptionsPanel` component.
 *
 * @component
 * @param {BaseOptionsPanelProps} props - Component props.
 *
 * @returns {JSX.Element} The OptionsPanelSection component.
 *
 * @example
 * <OptionsPanelSection>
 * 	...
 * </OptionsPanelSection>
 */
export const OptionsPanelSection = ({ children, className, hidden }: Prettify<BaseOptionsPanelProps>) => {
	if (hidden) {
		return null;
	}

	return <Container className={clsx('es:max-w-lg', className)}>{children}</Container>;
};

/**
 * Component that provides a header for the top of an options page.
 *
 * @component
 * @param {OptionsPanelHeaderProps} props - Component props.
 *
 * @returns {JSX.Element} The OptionsPanelHeader component.
 *
 * @example
 * <OptionsPanelHeader title='Theme options'>
 * 	...
 * </OptionsPanelHeader>
 */
export const OptionsPanelHeader = ({ children, sticky, title, className, actions, level = 2, limitWidth, hidden }: Prettify<OptionsPanelHeaderProps>) => {
	if (hidden) {
		return null;
	}

	return (
		<div className={clsx('es:space-y-2.5', limitWidth && 'es:max-w-2xl', sticky && 'es:sticky es:top-0 es:z-10 es:bg-white', className)}>
			<div className='es:flex es:flex-wrap es:items-center es:justify-between es:gap-x-8 es:gap-y-4 es:mb-10'>
				<Heading
					className='es:text-2xl es:text-surface-800 es:font-variation-["wdth"_100,"wght"_450,"ROND"_100] es:m-0!'
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
 * @param {OptionsPanelIntroProps} props - Component props.
 *
 * @returns {JSX.Element} The OptionsPanelIntro component.
 *
 * @example
 * <OptionsPanelIntro title='Theme options' />
 */
export const OptionsPanelIntro = ({ icon, title, subtitle, className, iconClassName, level = 3, flat, hidden }: Prettify<OptionsPanelIntroProps>) => {
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
				className='es:text-3xl es:my-0! es:text-accent-900 es:font-variation-["wdth"_50,"wght"_325,"slnt"_-4,"ROND"_100]'
				level={level}
			>
				{title}
			</Heading>

			{subtitle && <p className='es:text-13 es:my-0! es:text-surface-500 es:mt-0.75 es:font-variation-["wdth"_95,"wght"_275]'>{subtitle}</p>}

			{icon && cloneElement(icon, { className: clsx('es:absolute es:-top-2 es:right-2.5 es:rotate-12 es:text-surface-500/10 es:size-18', iconClassName) })}
		</div>
	);
};
