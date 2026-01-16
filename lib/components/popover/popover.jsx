import { Dialog, DialogTrigger, Popover as ReactAriaPopover } from 'react-aria-components';
import { clsx } from 'clsx';

import { __ } from '@wordpress/i18n';
import { Button } from '../button/button';

/**
 * @typedef {Object} PopoverProps
 * @property {React.Ref} props.triggerRef - Ref of the trigger button. In uncontrolled mode, this element will be used to open the popover. In controlled mode, the popover will be anchored to this element.
 * @property {boolean} [props.openByDefault=false] - (**Controlled mode**) If `true`, the popover is open by default.
 * @property {boolean} props.isOpen - (**Uncontrolled mode**) If `true`, the popover is open.
 * @property {Function} props.onOpenChange - (**Uncontrolled mode**) Function to run when the popover is opened or closed. `(isOpen: boolean) => void`.
 * @property {PopoverPlacement} props.placement - The placement of the popover.
 * @property {string} [props.className] - Classes to pass to the popover contents.
 * @property {string} [props.wrapperClassName] - Classes to pass to the popover wrapper.
 * @property {Object} props.style - Styles to pass to the popover.
 * @property {number} props.offset - Offset from the trigger element, on the same axis as the placement of the popover (e.g. if `placement` is `left`, this controls the horizontal spacing from the element).
 * @property {number} props.crossOffset - Offset from the trigger element, on the opposite axis as the placement of the popover (e.g. if `placement` is `left`, this controls the vertical spacing from the element).
 * @property {number} props.containerPadding - Space that should be left between the popover and the edge of the container (the default container is browser window).
 * @property {boolean} props.shouldFlip - If `true`, the popover should flip when there is not enough space.
 * @property {Function} [props.shouldCloseOnInteractOutside=() => true] - Allows ignoring close events for certain elements. `(element: HTMLElement) => boolean`.
 * @property {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @typedef {'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom'} PopoverPlacement
 *
 * @preserve
 */

/**
 * A popover component.
 *
 * Two modes of operation are supported:
 * - **controlled mode**: pass `isOpen` and `onOpenChange` to control when the popover is open.
 * - **uncontrolled mode**: pass `openByDefault` to set the initial popover state. The show/hide state will be managed internally, based on the interaction with the trigger button.
 *
 * @component
 * @param {PopoverProps} props - Component props.
 *
 * @returns {JSX.Element} The Popover component.
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

		'aria-label': rawAriaLabel,

		hidden,

		popoverProps,

		...other
	} = props;

	let ariaLabel = rawAriaLabel;

	if (ariaLabel === false) {
		ariaLabel = undefined;
	}

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
					'es:rounded-2xl es:bg-linear-to-br es:from-surface-50/75 es:to-surface-50/75 es:inset-ring es:inset-ring-surface-500/15 es:shadow-xl es:outline-hidden',
					'es:backdrop-blur-lg es:backdrop-brightness-110 es:backdrop-saturate-125',
					'es:inset-shadow-xs es:inset-shadow-white/50',
					'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
					'es:placement-left:origin-right es:placement-right:origin-left',
					'es:motion-duration-250 es:motion-ease-spring-bouncy',
					isEntering && 'es:*:pointer-events-none',
					'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
					isEntering && 'es:motion-scale-x-in-95 es:motion-scale-y-in-85 es:motion-opacity-in-0',
					isEntering && 'es:placement-top:motion-translate-y-in-[0.5rem] es:placement-bottom:motion-translate-y-in-[-0.5rem]',
					isExiting && 'es:motion-scale-x-out-95 es:motion-scale-y-out-85 es:motion-opacity-out-0',
					isExiting && 'es:placement-top:motion-translate-y-out-[0.5rem] es:placement-bottom:motion-translate-y-out-[-0.5rem]',
					wrapperClassName,
				)
			}
			style={style}
			{...popoverProps}
		>
			<Dialog
				className={clsx('es:p-1 es:text-sm es:outline-hidden', className)}
				aria-label={ariaLabel}
				{...other}
			>
				{children}
			</Dialog>
		</ReactAriaPopover>
	);
};

/**
 * @typedef {import('../button/button').ButtonProps} ButtonProps
 *
 * @preserve
 * */

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
 * @param {ButtonProps} props.triggerButtonProps - Props to pass to the built-in trigger button.
 * @param {Function} props.onOpenChange - Function to run when the popover is opened or closed. `(isOpen: boolean) => void`.
 * @param {boolean} props.openByDefault - If `true`, the popover is open by default.
 * @param {PopoverPlacement} props.placement - The placement of the popover.
 * @param {string} props.className - Classes to pass to the popover.
 * @param {Object} props.style - Styles to pass to the popover.
 * @param {number} props.offset - Offset from the trigger element, on the same axis as the placement of the popover (e.g. if `placement` is `left`, this controls the horizontal spacing from the element).
 * @param {number} props.crossOffset - Offset from the trigger element, on the opposite axis as the placement of the popover (e.g. if `placement` is `left`, this controls the vertical spacing from the element).
 * @param {number} props.containerPadding - Space that should be left between the popover and the edge of the container (the default container is browser window).
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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

		hidden,

		...rest
	} = props;

	if (hidden) {
		return null;
	}

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
