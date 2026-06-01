import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Dialog, DialogTrigger, Heading, Modal as ReactAriaModal, ModalOverlay } from 'react-aria-components';
import type { Prettify } from '../../utilities/types';
import { clear } from '../../icons/internal';
import { Button } from '../button/button';
import { HStack } from '../layout/hstack';

type ModalWidth = 'default' | 'wide';

type ModalProps = Omit<
	ComponentPropsWithoutRef<typeof ModalOverlay>,
	'children' | 'className' | 'isDismissable' | 'defaultOpen' | 'isOpen' | 'shouldCloseOnInteractOutside' | 'onOpenChange' | 'isKeyboardDismissDisabled'
> & {
	/** **Controlled mode ** - whether the modal is open. */
	open?: boolean;
	/** **Uncontrolled mode ** - whether the modal is initially open. */
	defaultOpen?: boolean;
	/** Actions to display in the modal footer, typically buttons. */
	actions?: ReactNode;
	/** Actions to display in the modal header, next to the close button (if enabled). */
	headerActions?: ReactNode;
	/** Label for the trigger button. */
	triggerLabel?: ReactNode;
	/** Trigger button icon. */
	triggerIcon?: ReactNode;
	/** Props to pass to the trigger button. */
	triggerProps?: ComponentPropsWithoutRef<typeof Button>;
	/** If provided, replaces the default trigger button. The passed component should be something button-related that can open the modal. */
	customTrigger?: ReactNode;
	/** Title of the modal. */
	title?: ReactNode;
	/** If `true`, the close button will not be displayed. */
	noCloseButton?: boolean;
	/** If `true`, the modal will not close when clicking outside of it. */
	noClickToDismiss?: boolean;
	/** If `true`, the modal will not close when pressing the `Esc` key. */
	noKeyboardDismiss?: boolean;
	/** If `true`, the modal will not have a visible backdrop. Functionally, it'll still be there. For an experience without a backdrop, consider using the `Popover` component instead. */
	noBackdrop?: boolean;
	/** Classes to pass to the modal container. */
	className?: string;
	/** Classes to pass to the modal backdrop. */
	overlayClassName?: string;
	/** Classes to pass to the modal footer (actions) container. */
	actionsClassName?: string;
	/** Classes to pass to the modal header container. */
	headerClassName?: string;
	/** Classes to pass to the modal content container. */
	contentContainerClassName?: string;
	/** Allows ignoring close events for certain elements. `(element: HTMLElement) => boolean`. */
	shouldCloseOnInteractOutside?: (element: Element) => boolean;
	/** Function called when the modal's open state changes. `(isOpen: boolean) => void` */
	onOpenChange?: (isOpen: boolean) => void;
	/** Determines the modal width. Defaults to `default`. */
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

/**
 * Modal dialog.
 *
 * @component
 * @param {ModalProps} props - Component props.
 *
 * @returns {JSX.Element} The Modal component.
 *
 * @example
 * <Modal>
 * 	<p>Modal content</p>
 * </Modal>
 */
export const Modal = (props: Prettify<ModalProps>) => {
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
