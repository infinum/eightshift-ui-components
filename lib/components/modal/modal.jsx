import { Modal as ReactAriaModal, ModalOverlay, Dialog, Heading, DialogTrigger } from 'react-aria-components';
import { Button } from '../button/button';
import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx/lite';
import { icons } from '../../icons';
import { HStack } from '../layout/hstack';

/**
 * @typedef {import('../button/button').ButtonProps} ButtonProps
 *
 * @preserve
 * */

/**
 * Modal dialog.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.open] - **Controlled mode ** - whether the modal is open.
 * @param {boolean} [props.defaultOpen] - **Uncontrolled mode ** - whether the modal is initially open.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display in the modal footer, typically buttons.
 * @param {JSX.Element|JSX.Element[]} [props.headerActions] - Actions to display in the modal header, next to the close button (if enabled).
 * @param {string|JSX.Element} [props.triggerLabel] - Label for the trigger button.
 * @param {JSX.Element} [props.triggerIcon] - Trigger button icon.
 * @param {ButtonProps} [props.triggerProps] - Props to pass to the trigger button.
 * @param {ReactNode} [props.customTrigger] - If provided, replaces the default trigger button. The passed component should be something button-related that can open the modal.
 * @param {string|JSX.Element} [props.title] - Title of the modal.
 * @param {boolean} [props.noCloseButton] - If `true`, the close button will not be displayed.
 * @param {boolean} [props.noClickToDismiss] - If `true`, the modal will not close when clicking outside of it.
 * @param {boolean} [props.noKeyboardDismiss] - If `true`, the modal will not close when pressing the `Esc` key.
 * @param {string} [props.className] - Classes to pass to the modal container.
 * @param {string} [props.overlayClassName] - Classes to pass to the modal backdrop.
 * @param {string} [props.actionsClassName] - Classes to pass to the modal footer (actions) container.
 * @param {string} [props.headerClassName] - Classes to pass to the modal header container.
 * @param {string} [props.contentContainerClassName] - Classes to pass to the modal content container.
 * @param {Function} [props.shouldCloseOnInteractOutside=() => true] - Allows ignoring close events for certain elements. `(element: HTMLElement) => boolean`.
 * @param {Function} [props.onOpenChange] - Function called when the modal's open state changes. `(isOpen: boolean) => void`
 *
 * @returns {JSX.Element} The Modal component.
 *
 * @example
 * <Modal>
 *  <p>Modal content</p>
 * </Modal>
 *
 * @preserve
 */
export const Modal = (props) => {
	const { triggerLabel, triggerIcon, triggerProps, customTrigger, open } = props;

	if (typeof open !== 'undefined') {
		return <ModalInternal {...props} />;
	}

	return (
		<DialogTrigger>
			{!customTrigger && (
				<Button
					icon={triggerIcon}
					{...triggerProps}
				>
					{triggerLabel ?? (!triggerIcon && __('Open', 'eightshift-frontend-libs'))}
				</Button>
			)}
			{customTrigger}
			<ModalInternal {...props} />
		</DialogTrigger>
	);
};

const ModalInternal = (props) => {
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

		'aria-label': ariaLabel,

		className,

		headerClassName,
		actionsClassName,
		overlayClassName,
		contentContainerClassName,

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
					'es:fixed es:inset-0 es:z-9999 es:flex es:min-h-full es:items-center es:justify-center es:overflow-y-auto es:p-4 es:text-center es:bg-accent-950/20 es:backdrop-blur-xs',
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
						'es:w-full es:max-w-lg es:overflow-hidden es:rounded-3xl es:inset-ring es:inset-ring-surface-400/30 es:bg-white es:bg-linear-to-b es:from-accent-300/5 es:to-accent-300/2 es:text-left es:align-middle es:shadow-xl es:text-surface-900',

						isEntering && 'es:motion-safe:motion-scale-in-95 es:motion-fade-in es:motion-duration-300 es:motion-ease-spring-smooth/scale',
						isExiting && 'es:motion-safe:motion-scale-out-95 es:motion-fade-out es:motion-duration-250 es:motion-ease-spring-smooth/scale',
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
							<HStack className={clsx(title && 'es:px-6 es:pt-6 es:justify-between', headerClassName)}>
								{title && (
									<Heading
										className='es:text-balance es:text-xl! es:my-0! es:text-accent-800 es:font-variation-["wdth"_200,"YTLC"_520,"wght"_425]'
										slot='title'
									>
										{title}
									</Heading>
								)}

								{(!noCloseButton || headerActions) && (
									<HStack className={!title && 'es:absolute es:top-3 es:right-3 es:z-20'}>
										{headerActions}

										{!noCloseButton && (
											<Button
												className={!title && 'es:bg-surface-50/60 es:backdrop-blur-lg'}
												onPress={close}
												type='ghost'
												size='small'
												icon={icons.clear}
												aria-label={__('Close', 'eightshift-frontend-libs')}
												tooltip
											/>
										)}
									</HStack>
								)}
							</HStack>

							{children && <div className={clsx('es:p-6 es:space-y-2.5', contentContainerClassName)}>{children}</div>}

							{actions && <HStack className={clsx('es:justify-end es:px-6 es:py-4 es-button-group-h', actionsClassName)}>{actions}</HStack>}
						</>
					)}
				</Dialog>
			</ReactAriaModal>
		</ModalOverlay>
	);
};
