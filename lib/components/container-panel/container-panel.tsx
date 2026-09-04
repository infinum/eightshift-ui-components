import { clsx } from 'clsx';
import { type ReactNode, useState } from 'react';
import { Disclosure, DisclosurePanel } from 'react-aria-components';
import { chevronDown } from '../../icons/internal';
import { BaseControl } from '../base-control/base-control';
import { Button } from '../button/button';
import { HStack } from '../layout/hstack';
import { Switch } from '../toggle/switch';
import type { Prettify } from '../../utilities/types';

type ContainerPanelProps = {
	children?: ReactNode;
	/** Classes to pass to the container. */
	className?: string;
	/** Title to display on the top of the panel. */
	title?: ReactNode;
	/** Icon to display on the top of the panel. */
	icon?: ReactNode;
	/** Subtitle to display on the top of the panel. */
	subtitle?: ReactNode;
	/** Controls the panel use toggle. */
	use?: boolean;
	/** Function to call when the use toggle is toggled. `(value: boolean) => void`. */
	onUseChange?: (value: boolean) => void;
	/** If `true`, the panel can be closed. Will not show if `title` is not set. */
	closable?: boolean;
	/** Controls whether the panel is open by default. Defaults to `false`. */
	startOpen?: boolean;
	/** If `true`, a border is added to the top of the panel. Defaults to `false`. */
	topBorder?: boolean;
	/** If `true`, the title and icon are tinted. Defaults to `false`. */
	accentLabel?: boolean;
	/** If `true`, the icon is tinted. Defaults to `false`. */
	accentIcon?: boolean;
	/** If `true`, the label is not slightly inset, to better align with rounded containers. Defaults to `false`. */
	noLabelInset?: boolean;
	/** Actions to show at the end */
	actions?: ReactNode;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

/**
 * Component that provides a container panel for options, with an optional title.
 * Best used within the Gutenberg sidebar, instead of the default `PanelBody` component.
 * Ensures that the content is spaced nicely.
 *
 * @component
 * @param {ContainerPanelProps} props - Component props.
 *
 * @returns {JSX.Element} The ContainerPanel component.
 *
 * @example
 * <ContainerPanel title='Paragraph'>
 * 	...
 * </ContainerPanel>
 */
export const ContainerPanel = (props: Prettify<ContainerPanelProps>) => {
	const {
		children,
		className,
		title,
		icon,
		subtitle,
		use,
		onUseChange,
		closable,
		startOpen = false,
		topBorder = false,
		accentLabel = false,
		accentIcon = false,
		noLabelInset = false,
		actions,
		hidden,
	} = props;

	const [open, setOpen] = useState(startOpen);

	if (hidden) {
		return null;
	}

	if (!title && use === undefined) {
		return <div className={clsx('es:flex es:flex-col es:gap-3 es:p-4', topBorder && 'es:border-t es:border-t-secondary-200', className)}>{children}</div>;
	}

	const justUse = !closable && onUseChange !== undefined;
	const justClosable = Boolean(closable) && onUseChange === undefined;
	const useAndClosable = Boolean(closable) && onUseChange !== undefined;
	const shouldUseDisclosure = Boolean(closable) || use !== undefined;

	let isExpanded = Boolean(use);

	if (closable) {
		isExpanded = use !== undefined ? Boolean(use) && open : open;
	}

	return (
		<Disclosure
			isExpanded={shouldUseDisclosure ? isExpanded : true}
			className='es:block'
		>
			<BaseControl
				icon={
					onUseChange ? (
						<Switch
							checked={use}
							onChange={(value) => {
								if (!value) {
									setOpen(false);
								}

								onUseChange(value);
							}}
							size='medium'
						/>
					) : (
						icon
					)
				}
				label={title}
				subtitle={subtitle}
				actions={
					<>
						{actions}

						<HStack
							hidden={!closable && !onUseChange}
							className='es:ml-auto'
						>
							{closable ? (
								<Button
									slot='trigger'
									onPress={() => setOpen(!open)}
									icon={chevronDown}
									type='ghost'
									size='small'
									className={clsx('es:icon:size-4! es:icon:transition-transform', isExpanded && 'es:icon:-scale-y-100')}
									disabled={use !== undefined && !use}
								/>
							) : null}
						</HStack>
					</>
				}
				className={clsx(
					topBorder && 'es:border-t es:border-t-secondary-200',
					!closable && use === undefined && 'es:space-y-2',
					justClosable && open && 'es:pb-4',
					justUse && use && 'es:pb-4',
					useAndClosable && use && open && 'es:pb-4',
					!justClosable && !justUse && !useAndClosable && 'es:pb-4',
					!closable && !onUseChange && use === undefined && 'es:px-4',
					className,
				)}
				labelContainerClassName={clsx(
					(closable || onUseChange) && 'es:pl-4 es:pr-3 es:min-h-12',
					!(closable || onUseChange) && 'es:mt-3 es:mb-3',
					(closable || onUseChange) && 'es:mb-0!',
					'es:pb-0!',
				)}
				controlContainerClassName='es:px-4'
				labelClassName={clsx(
					!noLabelInset && 'es:px-1',
					accentLabel && 'es:text-accent-800 es:any-icon:text-accent-700',
					accentIcon && 'es:any-icon:text-accent-700',
					!accentLabel && 'es:text-surface-700',
				)}
			>
				{!shouldUseDisclosure ? children : null}
				{shouldUseDisclosure ? (
					<DisclosurePanel
						className={clsx(
							'es:h-(--disclosure-panel-height) es:overflow-hidden',
							'es:opacity-0 es:-translate-y-2',
							isExpanded && 'es:opacity-100 es:translate-y-0',
							'es:transition-plus-h',
						)}
					>
						<div className='es:space-y-2 es:px-4'>{children}</div>
					</DisclosurePanel>
				) : null}
			</BaseControl>
		</Disclosure>
	);
};
