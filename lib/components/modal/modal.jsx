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
				className={clsx(
					'es-uic-fixed es-uic-inset-0 es-uic-z-10 es-uic-flex es-uic-min-h-full es-uic-items-center es-uic-justify-center es-uic-overflow-y-auto es-uic-bg-black/25 es-uic-p-4 es-uic-text-center es-uic-backdrop-blur',
					'entering:es-uic-duration-300 entering:es-uic-ease-out entering:es-uic-animate-in entering:es-uic-fade-in',
					'exiting:es-uic-duration-200 exiting:es-uic-ease-in exiting:es-uic-animate-out exiting:es-uic-fade-out',
					overlayClassName,
				)}
			>
				<ReactAriaModal
					className={clsx(
						'es-uic-w-full es-uic-max-w-lg es-uic-overflow-hidden es-uic-rounded-xl es-uic-border es-uic-border-gray-100 es-uic-bg-white es-uic-p-5 es-uic-text-left es-uic-align-middle es-uic-shadow-xl',
						'entering:es-uic-duration-300 entering:es-uic-ease-out entering:es-uic-animate-in entering:es-uic-zoom-in-95',
						'exiting:es-uic-duration-200 exiting:es-uic-ease-in exiting:es-uic-animate-out exiting:es-uic-zoom-out-95',
						className,
					)}
				>
					<Dialog
						className='es-uic-relative es-uic-text-sm es-uic-outline-none'
						aria-label={ariaLabel}
					>
						{({ close }) => (
							<>
								<HStack>
									{title && (
										<Heading
											className='es-uic-text-balance es-uic-text-base'
											slot='title'
										>
											{title}
										</Heading>
									)}

									{!noCloseButton && (
										<Button
											className='es-uic-ml-auto'
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
