import { clsx } from 'clsx';
import { type ReactNode, useState } from 'react';
import { Disclosure, DisclosurePanel } from 'react-aria-components';
import { chevronDown } from '../../icons/internal';
import { BaseControl } from '../base-control/base-control';
import { Button } from '../button/button';
import { HStack } from '../layout/hstack';
import { Switch } from '../toggle/switch';

type ContainerPanelProps = {
	children?: ReactNode;
	className?: string;
	title?: ReactNode;
	icon?: ReactNode;
	subtitle?: ReactNode;
	use?: boolean;
	onUseChange?: (value: boolean) => void;
	closable?: boolean;
	startOpen?: boolean;
	topBorder?: boolean;
	accentLabel?: boolean;
	accentIcon?: boolean;
	noLabelInset?: boolean;
	actions?: ReactNode;
	hidden?: boolean;
};

const TypedButton = Button as (props: { slot?: string; onPress?: () => void; icon?: ReactNode; type?: string; size?: string; className?: string; disabled?: boolean }) => ReactNode;

export const ContainerPanel = (props: ContainerPanelProps) => {
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

	if (!title && typeof use === 'undefined') {
		return <div className={clsx('es:flex es:flex-col es:gap-3 es:p-4', topBorder && 'es:border-t es:border-t-secondary-200', className)}>{children}</div>;
	}

	const justUse = !closable && typeof onUseChange !== 'undefined';
	const justClosable = Boolean(closable) && typeof onUseChange === 'undefined';
	const useAndClosable = Boolean(closable) && typeof onUseChange !== 'undefined';
	const shouldUseDisclosure = Boolean(closable) || typeof use !== 'undefined';

	let isExpanded = Boolean(use);

	if (closable) {
		isExpanded = typeof use !== 'undefined' ? Boolean(use) && open : open;
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
								<TypedButton
									slot='trigger'
									onPress={() => setOpen(!open)}
									icon={chevronDown}
									type='ghost'
									size='small'
									className={clsx('es:icon:size-4! es:icon:transition-transform', isExpanded && 'es:icon:-scale-y-100')}
									disabled={typeof use !== 'undefined' && !use}
								/>
							) : null}
						</HStack>
					</>
				}
				className={clsx(
					topBorder && 'es:border-t es:border-t-secondary-200',
					!closable && typeof use === 'undefined' && 'es:space-y-2',
					justClosable && open && 'es:pb-4',
					justUse && use && 'es:pb-4',
					useAndClosable && use && open && 'es:pb-4',
					!justClosable && !justUse && !useAndClosable && 'es:pb-4',
					!closable && !onUseChange && typeof use === 'undefined' && 'es:px-4',
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
