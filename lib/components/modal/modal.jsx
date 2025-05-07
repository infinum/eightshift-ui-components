import { Modal as ReactAriaModal, ModalOverlay, Dialog, Heading, DialogTrigger } from 'react-aria-components';
import { Button } from '../button/button';
import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx/lite';
import { icons } from '../../icons';
import { HStack } from '../layout/hstack';

/**
 * Modal dialog.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.open] - **Controlled mode ** - whether the modal is open.
 * @param {boolean} [props.defaultOpen] - **Uncontrolled mode ** - whether the modal is initially open.
 * @param {string|JSX.Element} [props.triggerLabel] - Label for the trigger button.
 * @param {JSX.Element} [props.triggerIcon] - Trigger button icon.
 * @param {Object} [props.triggerProps] - Props to pass to the trigger button.
 * @param {ReactNode} [props.customTrigger] - If provided, replaces the default trigger button. The passed component should be something button-related that can open the modal.
 * @param {string|JSX.Element} [props.title] - Title of the modal.
 * @param {boolean} [props.noCloseButton] - If `true`, the close button will not be displayed.
 * @param {boolean} [props.noClickToDismiss] - If `true`, the modal will not close when clicking outside of it.
 * @param {boolean} [props.noKeyboardDismiss] - If `true`, the modal will not close when pressing the `Esc` key.
 * @param {string} [props.className] - Classes to pass to the modal container.
 * @param {string} [props.overlayClassName] - Classes to pass to the modal backdrop.
 * @param {Function} [props.shouldCloseOnInteractOutside=() => true] - Allows ignoring close events for certain elements. `(element: HTMLElement) => boolean`.
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
	const {
		children,

		shouldCloseOnInteractOutside,

		open,
		defaultOpen,

		triggerLabel,
		triggerIcon,
		triggerProps,
		customTrigger,

		title,

		noCloseButton,
		noClickToDismiss,
		noKeyboardDismiss,

		'aria-label': ariaLabel,

		className,
		overlayClassName,
	} = props;

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
			<ModalOverlay
				isDismissable={!noClickToDismiss}
				defaultOpen={defaultOpen}
				isOpen={open}
				shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
				isKeyboardDismissDisabled={noKeyboardDismiss}
				className={({ isEntering, isExiting }) =>
					clsx(
						'es:fixed es:inset-0 es:z-9999 es:flex es:min-h-full es:items-center es:justify-center es:overflow-y-auto es:bg-black/25 es:p-4 es:text-center es:backdrop-blur-xs',
						isEntering && 'es:motion-opacity-in es:motion-duration-150',
						isExiting && 'es:motion-opacity-out es:motion-duration-150',
						overlayClassName,
					)
				}
			>
				<ReactAriaModal
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:w-full es:max-w-lg es:overflow-hidden es:rounded-xl es:border es:border-secondary-100 es:bg-white es:p-5 es:text-left es:align-middle es:shadow-xl es:inset-ring es:inset-ring-secondary-100',
							isEntering && 'es:motion-safe:motion-scale-in-95 es:motion-fade-in es:motion-duration-300 es:motion-ease-spring-smooth/scale',
							isExiting && 'es:motion-safe:motion-scale-out-95 es:motion-fade-out es:motion-duration-250 es:motion-ease-spring-smooth/scale',
							className,
						)
					}
				>
					<Dialog
						className='es:relative es:text-sm es:outline-hidden'
						aria-label={ariaLabel}
					>
						{({ close }) => (
							<>
								<HStack>
									{title && (
										<Heading
											className='es:text-balance es:text-base'
											slot='title'
										>
											{title}
										</Heading>
									)}

									{!noCloseButton && (
										<Button
											className='es:ml-auto'
											onPress={close}
											type='ghost'
											size='small'
											icon={icons.clear}
											aria-label={__('Close modal', 'eightshift-frontend-libs')}
										/>
									)}
								</HStack>

								{children}
							</>
						)}
					</Dialog>
				</ReactAriaModal>
			</ModalOverlay>
		</DialogTrigger>
	);
};
