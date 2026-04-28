import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Dialog, DialogTrigger, Heading, Modal as ReactAriaModal, ModalOverlay } from 'react-aria-components';
import { clear } from '../../icons/internal';
import { Button } from '../button/button';
import { HStack } from '../layout/hstack';

type ModalWidth = 'default' | 'wide';

type ModalProps = Omit<
	ComponentPropsWithoutRef<typeof ModalOverlay>,
	'children' | 'className' | 'isDismissable' | 'defaultOpen' | 'isOpen' | 'shouldCloseOnInteractOutside' | 'onOpenChange' | 'isKeyboardDismissDisabled'
> & {
	open?: boolean;
	defaultOpen?: boolean;
	actions?: ReactNode;
	headerActions?: ReactNode;
	triggerLabel?: ReactNode;
	triggerIcon?: ReactNode;
	triggerProps?: ComponentPropsWithoutRef<typeof Button>;
	customTrigger?: ReactNode;
	title?: ReactNode;
	noCloseButton?: boolean;
	noClickToDismiss?: boolean;
	noKeyboardDismiss?: boolean;
	noBackdrop?: boolean;
	className?: string;
	overlayClassName?: string;
	actionsClassName?: string;
	headerClassName?: string;
	contentContainerClassName?: string;
	shouldCloseOnInteractOutside?: (element: Element) => boolean;
	onOpenChange?: (isOpen: boolean) => void;
	width?: ModalWidth;
	children?: ReactNode;
	'aria-label'?: string;
};

const ModalInternal = (props: ModalProps) => {
	const {
		children,
		shouldCloseOnInteractOutside,
		open,
		defaultOpen,
		onOpenChange,
		title,
		actions,
		headerActions,
		noCloseButton,
		noClickToDismiss,
		noKeyboardDismiss,
		noBackdrop,
		'aria-label': ariaLabel,
		className,
		headerClassName,
		actionsClassName,
		overlayClassName,
		contentContainerClassName,
		width = 'default',
		...rest
	} = props;

	return (
		<ModalOverlay
			isDismissable={!noClickToDismiss}
			defaultOpen={defaultOpen}
			isOpen={open}
			shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
			onOpenChange={onOpenChange}
			isKeyboardDismissDisabled={noKeyboardDismiss}
			className={({ isEntering, isExiting }) =>
				clsx(
					'es:font-sans',
					'es:fixed es:inset-0 es:z-9999 es:flex es:min-h-full es:items-center es:justify-center es:overflow-hidden es:p-4',
					!noBackdrop && 'es:bg-accent-950/20 es:backdrop-blur-xs',
					isEntering && 'es:motion-opacity-in es:motion-duration-150',
					isExiting && 'es:motion-opacity-out es:motion-duration-150',
					overlayClassName,
				)
			}
			{...rest}
		>
			<ReactAriaModal
				className={({ isEntering, isExiting }) =>
					clsx(
						'es:w-full es:overflow-y-hidden es:rounded-3xl es:inset-ring es:inset-ring-surface-400/30 es:bg-white es:bg-linear-to-b es:from-accent-300/3 es:to-accent-300/1 es:text-left es:align-middle es:shadow-xl es:text-surface-900',
						width === 'default' && 'es:max-w-lg',
						width === 'wide' && 'es:max-w-[80vw]',
						isEntering && 'es:motion-scale-in-95 es:motion-fade-in es:motion-translate-y-in-[2rem] es:motion-duration-300 es:motion-ease-spring-smooth/scale',
						isExiting && 'es:motion-scale-out-95 es:motion-fade-out es:motion-translate-y-out-[2rem] es:motion-duration-250 es:motion-ease-spring-smooth/scale',
						className,
					)
				}
			>
				<Dialog
					className={clsx('es:relative es:text-sm es:outline-hidden', (!title || headerActions) && 'es:pt-8')}
					aria-label={ariaLabel}
				>
					{({ close }) => (
						<>
							<HStack className={clsx(title && 'es:p-6 es:pb-3 es:justify-between', headerClassName)}>
								{title ? (
									<Heading
										className='es:text-balance es:text-3xl! es:my-0! es:text-accent-800 es:font-variation-["wdth"_40,"wght"_425,"slnt"_-3,"ROND"_100]'
										slot='title'
									>
										{title}
									</Heading>
								) : null}

								{!noCloseButton || headerActions ? (
									<HStack className={clsx(!title && 'es:absolute es:top-3 es:right-3 es:z-20')}>
										{headerActions}

										{!noCloseButton ? (
											<Button
												className={clsx(!title && 'es:bg-surface-50/60 es:backdrop-blur-lg')}
												onPress={close}
												type='ghost'
												size='small'
												icon={clear}
												aria-label={__('Close', 'eightshift-ui-components')}
												tooltip
											/>
										) : null}
									</HStack>
								) : null}
							</HStack>

							{children ? (
								<div className={clsx('es:px-6 es:space-y-2.5 es:overflow-y-auto es:max-h-[70vh]', !actions && 'es:mb-6', contentContainerClassName)}>{children}</div>
							) : null}

							{actions ? <HStack className={clsx('es:justify-end es:px-6 es:py-4', actionsClassName)}>{actions}</HStack> : null}
						</>
					)}
				</Dialog>
			</ReactAriaModal>
		</ModalOverlay>
	);
};

export const Modal = (props: ModalProps) => {
	const { triggerLabel, triggerIcon, triggerProps, customTrigger, open } = props;

	if (typeof open !== 'undefined') {
		return <ModalInternal {...props} />;
	}

	return (
		<DialogTrigger>
			{!customTrigger ? (
				<Button
					icon={triggerIcon}
					{...triggerProps}
				>
					{triggerLabel ?? (!triggerIcon && __('Open', 'eightshift-ui-components'))}
				</Button>
			) : null}
			{customTrigger}
			<ModalInternal {...props} />
		</DialogTrigger>
	);
};
