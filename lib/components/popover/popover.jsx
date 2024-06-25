import { Dialog, DialogTrigger, Popover as ReactAriaPopover } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { __ } from '@wordpress/i18n';
import { Button } from '../button/button';

/**
 * A popover component.
 *
 * Two modes of operation are supported:
 * - **controlled mode**: pass `isOpen` and `onOpenChange` to control when the popover is open.
 * - **uncontrolled mode**: pass `openByDefault` to set the initial popover state. The show/hide state will be managed internally, based on the interaction with the trigger button.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.Ref} props.triggerRef - Ref of the trigger button. In uncontrolled mode, this element will be used to open the popover. In controlled mode, the popover will be anchored to this element.
 * @param {boolean} [props.openByDefault=false] - (**Controlled mode**) If `true`, the popover is open by default.
 * @param {boolean} props.isOpen - (**Uncontrolled mode**) If `true`, the popover is open.
 * @param {Function} props.onOpenChange - (**Uncontrolled mode**) Function to run when the popover is opened or closed. `(isOpen: boolean) => void`.
 * @param {PopoverPlacement} props.placement - The placement of the popover.
 * @param {string} [props.className] - Classes to pass to the popover contents.
 * @param {string} [props.wrapperClassName] - Classes to pass to the popover wrapper.
 * @param {Object} props.style - Styles to pass to the popover.
 * @param {number} props.offset - Offset from the trigger element, on the same axis as the placement of the popover (e.g. if `placement` is `left`, this controls the horizontal spacing from the element).
 * @param {number} props.crossOffset - Offset from the trigger element, on the opposite axis as the placement of the popover (e.g. if `placement` is `left`, this controls the vertical spacing from the element).
 * @param {number} props.containerPadding - Space that should be left between the popover and the edge of the container (the default container is browser window).
 * @param {boolean} props.shouldFlip - If `true`, the popover should flip when there is not enough space.
 * @param {Function} [props.shouldCloseOnInteractOutside=() => true] - Allows ignoring close events for certain elements. `(element: HTMLElement) => boolean`.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Popover component.
 *
 * @typedef {'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom'} PopoverPlacement
 *
 * @example
 * // Uncontrolled mode.
 * const ref = useRef(null);
 *
 * <Button forwardedRef={ref}>Open popover</Button>
 *
 * <Popover
 * 	triggerRef={triggerRef}
 * 	openByDefault={true}
 * >
 * 	...
 * </Popover>
 *
 * @example
 * // Controlled mode.
 * const [open, setOpen] = useState(false);
 *
 * <Button onPress={() => setOpen(true)}>Open popover</Button>
 *
 * <Popover
 * 	onOpenChange={setOpen}
 * 	isOpen={open}
 * 	triggerRef={triggerRef}
 * >
 * 	...
 * 	<Button onPress={() => setOpen(false)}>Close popover</Button>
 * </Popover>
 *
 * @preserve
 */
export const Popover = (props) => {
	const {
		children,

		triggerRef,
		openByDefault,

		isOpen,
		onOpenChange,

		placement,

		className,
		wrapperClassName,

		style,

		offset,
		crossOffset,
		containerPadding,

		shouldFlip,
		shouldCloseOnInteractOutside = () => true,

		hidden,

		...other
	} = props;

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaPopover
			shouldFlip={shouldFlip}
			shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
			triggerRef={triggerRef}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			defaultOpen={openByDefault}
			placement={placement}
			offset={offset}
			crossOffset={crossOffset}
			containerPadding={containerPadding}
			className={({ isEntering, isExiting }) =>
				clsx(
					'es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow-lg es-uic-outline-none',
					isEntering && 'es-uic-outline es-uic-animate-in es-uic-fade-in-0 es-uic-slide-in-from-top-2 es-uic-fill-mode-forwards',
					isExiting && 'es-uic-outline es-uic-animate-out es-uic-fade-out-0 es-uic-slide-out-to-top-2 es-uic-fill-mode-forwards',
					wrapperClassName,
				)
			}
			style={style}
		>
			<Dialog
				className={clsx('es-uic-p-1 es-uic-text-sm es-uic-outline-none', className)}
				{...other}
			>
				{children}
			</Dialog>
		</ReactAriaPopover>
	);
};

/**
 * A simple version of the Popover component that includes a trigger button.
 * The control of the popover is handled internally. A custom trigger can be provided.
 *
 * If you need more control over the trigger, use the Popover component directly.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.trigger - Allows using a custom trigger element.
 * @param {JSX.Element} [props.triggerButtonIcon] - The icon for the built-in trigger button.
 * @param {string} props.triggerButtonLabel - The label for the built-in trigger button.
 * @param {Object} props.triggerButtonProps - Props to pass to the built-in trigger button.
 * @param {Function} props.onOpenChange - Function to run when the popover is opened or closed. `(isOpen: boolean) => void`.
 * @param {boolean} props.openByDefault - If `true`, the popover is open by default.
 * @param {PopoverPlacement} props.placement - The placement of the popover.
 * @param {string} props.className - Classes to pass to the popover.
 * @param {Object} props.style - Styles to pass to the popover.
 * @param {number} props.offset - Offset from the trigger element, on the same axis as the placement of the popover (e.g. if `placement` is `left`, this controls the horizontal spacing from the element).
 * @param {number} props.crossOffset - Offset from the trigger element, on the opposite axis as the placement of the popover (e.g. if `placement` is `left`, this controls the vertical spacing from the element).
 * @param {number} props.containerPadding - Space that should be left between the popover and the edge of the container (the default container is browser window).
 *
 * @returns {JSX.Element} The TriggeredPopover component.
 *
 * @typedef {'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom'} PopoverPlacement
 *
 * @example
 * <TriggeredPopover>
 * 		...
 * </TriggeredPopover>
 *
 * @preserve
 */
export const TriggeredPopover = (props) => {
	const {
		trigger,

		triggerButtonIcon,
		triggerButtonLabel = !triggerButtonIcon && __('Open', 'eightshift-ui-components'),
		triggerButtonProps,

		children,

		onOpenChange,
		openByDefault,

		placement,

		style,
		className,

		offset,
		crossOffset,
		containerPadding,

		...rest
	} = props;

	return (
		<DialogTrigger onOpenChange={onOpenChange}>
			{trigger}
			{!trigger && (
				<Button
					icon={triggerButtonIcon}
					{...triggerButtonProps}
				>
					{triggerButtonLabel}
				</Button>
			)}
			<Popover
				placement={placement}
				openByDefault={openByDefault}
				offset={offset}
				crossOffset={crossOffset}
				containerPadding={containerPadding}
				className={className}
				style={style}
				{...rest}
			>
				{children}
			</Popover>
		</DialogTrigger>
	);
};
