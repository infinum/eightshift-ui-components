import { useState } from 'react';
import { clsx } from 'clsx/lite';
import { Switch } from '../toggle/switch';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { HStack } from '../layout/hstack';
import { BaseControl } from '../base-control/base-control';

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
 * @param {boolean} [props.use] - Controls the panel use toggle.
 * @param {Function} [props.onUseChange] - Function to call when the use toggle is toggled. `(value: boolean) => void`.
 * @param {boolean} [props.closable] - If `true`, the panel can be closed. Will not show if `title` is not set.
 * @param {boolean} [props.startOpen=false] - Controls whether the panel is open by default.
 * @param {JSX.Element} [props.actions] - Actions to show at the end
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
export const ContainerPanel = (props) => {
	const { children, className, title, icon, subtitle, use, onUseChange, closable, startOpen = false, actions } = props;

	const [open, setOpen] = useState(startOpen);

	if (!title) {
		return <div className='es-uic-space-y-2 es-uic-border-t es-uic-border-t-gray-200 es-uic-p-4'>{children}</div>;
	}

	const justUse = !closable && typeof onUseChange !== 'undefined';
	const justClosable = closable && typeof onUseChange === 'undefined';
	const useAndClosable = closable && typeof onUseChange !== 'undefined';

	return (
		<BaseControl
			icon={icon}
			label={title}
			subtitle={subtitle}
			actions={
				<>
					{actions}
					<HStack
						hidden={!closable && !onUseChange}
						className='es-uic-ml-auto'
					>
						{onUseChange && (
							<Switch
								checked={use}
								onChange={(value) => {
									if (!value) {
										setOpen(false);
									}

									onUseChange(value);
								}}
							/>
						)}

						{closable && (
							<Button
								onPress={() => setOpen(!open)}
								icon={open ? icons.caretDownFill : icons.caretDown}
								type='ghost'
								size='small'
								className={clsx(
									'[&>svg]:es-uic-size-5 [&>svg]:es-uic-transition-transform',
									open && '[&>svg]:-es-uic-scale-y-100',
								)}
								disabled={typeof use !== 'undefined' && !use}
							/>
						)}
					</HStack>
				</>
			}
			className={clsx(
				'es-uic-border-t es-uic-border-t-gray-200 es-uic-space-y-2',
				closable && open && 'es-uic-space-y-0',
				justClosable && open && 'es-uic-pb-4',
				justUse && use && 'es-uic-pb-4',
				useAndClosable && use && open && 'es-uic-pb-4',
				!justClosable && !justUse && !useAndClosable && 'es-uic-pb-4',
				!closable && !onUseChange && 'es-uic-px-4',
				className,
			)}
			labelContainerClassName={clsx('es-uic-min-h-12', (closable || onUseChange) && 'es-uic-pl-4 es-uic-pr-3')}
			controlContainerClassName='es-uic-px-4'
			labelClassName='!es-uic-text-gray-500'
		>
			{!closable && !onUseChange && children}
			{closable && typeof use === 'undefined' && (
				<AnimatedVisibility
					visible={open}
					className={clsx(open && 'es-uic-space-y-2 es-uic-px-4')}
				>
					{children}
				</AnimatedVisibility>
			)}
			{typeof use !== 'undefined' && (
				<AnimatedVisibility
					visible={closable ? use && open : use}
					className={clsx((closable ? use && open : use) && 'es-uic-space-y-2 es-uic-px-4')}
				>
					{children}
				</AnimatedVisibility>
			)}
		</BaseControl>
	);
};
