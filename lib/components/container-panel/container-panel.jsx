import { useState } from 'react';
import { clsx } from 'clsx/lite';
import { Switch } from '../toggle/switch';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
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
 * @param {boolean} [props.withToggle] - If `true`, the panel will have a toggle button to control the visibility of child items. Will not show if `title` is not set.
 * @param {boolean} [props.closeable] - If `true`, the panel will have a close button to control the visibility of child items. Will not show if `title` is not set.
 *
 * @returns {JSX.Element} The ContainerPanel component.
 *
 * @example
 * <ContainerPanel title='Paragraph'>
 * 	...
 * </ContainerPanel>
 *
 * @preserve
 */
export const ContainerPanel = ({ children, className, title, icon, subtitle, withToggle, closeable }) => {
	const [open, setOpen] = useState(true);

	return (
		<div
			className={clsx('es-uic-space-y-2.5 es-uic-border-t es-uic-border-t-gray-200 es-uic-p-4 es-uic-pt-3', className)}
		>
			{title && (
				<div className='es-uic-flex es-uic-items-center es-uic-gap-2'>
					<RichLabel
						icon={icon}
						label={title}
						subtitle={subtitle}
						className='es-uic-select-none es-uic-text-[0.8125rem] es-uic-font-medium !es-uic-text-gray-500'
					/>

					{(withToggle || closeable) && (
						<div className='es-uic-ml-auto'>
							{withToggle && (
								<Switch
									checked={open}
									onChange={setOpen}
								/>
							)}
							{closeable && (
								<Button
									onPress={() => setOpen(!open)}
									icon={open ? icons.caretDownFill : icons.caretDown}
									type='ghost'
									size='small'
									className={clsx(
										'[&>svg]:es-uic-size-5 [&>svg]:es-uic-transition-transform',
										open && '[&>svg]:-es-uic-scale-y-100',
									)}
								/>
							)}
						</div>
					)}
				</div>
			)}
			{!(withToggle || closeable) && children}
			{(withToggle || closeable) && <AnimatedVisibility visible={open}>{children}</AnimatedVisibility>}
		</div>
	);
};
