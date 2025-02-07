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
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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
	const { children, className, title, icon, subtitle, use, onUseChange, closable, startOpen = false, actions, hidden } = props;

	const [open, setOpen] = useState(startOpen);

	if (hidden) {
		return null;
	}

	if (!title && typeof use === 'undefined') {
		return <div className={clsx('es:space-y-2 es:border-t es:border-t-secondary-200 es:p-4', className)}>{children}</div>;
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
						className='es:ml-auto'
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
								icon={(typeof use !== 'undefined' ? open && use : open) ? icons.caretDownFill : icons.caretDown}
								type='ghost'
								size='small'
								className={clsx('es:icon:size-5 es:icon:transition-transform', (typeof use !== 'undefined' ? open && use : open) && 'es:icon:-scale-y-100')}
								disabled={typeof use !== 'undefined' && !use}
							/>
						)}
					</HStack>
				</>
			}
			className={clsx(
				'es:border-t es:border-t-secondary-200',
				!closable && typeof use === 'undefined' && 'es:space-y-2',
				justClosable && open && 'es:pb-4',
				justUse && use && 'es:pb-4',
				useAndClosable && use && open && 'es:pb-4',
				!justClosable && !justUse && !useAndClosable && 'es:pb-4',
				!closable && !onUseChange && typeof use === 'undefined' && 'es:px-4',
				className,
			)}
			labelContainerClassName={clsx((closable || onUseChange) && 'es:pl-4 es:pr-3 es:min-h-12', !(closable || onUseChange) && 'es:mt-3', 'es:pb-0!')}
			controlContainerClassName='es:px-4'
			labelClassName='es:text-secondary-600!'
		>
			{!closable && !onUseChange && typeof use === 'undefined' && children}
			{closable && typeof use === 'undefined' && (
				<AnimatedVisibility
					visible={open}
					className='es:space-y-2 es:px-4'
					transition='slideFadeDownSlight'
					noInitial
				>
					{children}
				</AnimatedVisibility>
			)}
			{typeof use !== 'undefined' && (
				<AnimatedVisibility
					visible={closable ? use && open : use}
					className='es:space-y-2 es:px-4'
					transition='slideFadeDownSlight'
					noInitial
				>
					{children}
				</AnimatedVisibility>
			)}
		</BaseControl>
	);
};
