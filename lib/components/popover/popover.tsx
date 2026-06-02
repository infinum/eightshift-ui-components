import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import type { Prettify } from '../../utilities/types';
import { type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react';
import { Dialog, DialogTrigger, OverlayArrow, Popover as ReactAriaPopover } from 'react-aria-components';
import { Button } from '../button/button';

type ReactAriaPopoverProps = ComponentPropsWithoutRef<typeof ReactAriaPopover>;
type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className' | 'aria-label'>;

type PopoverPlacement = ReactAriaPopoverProps['placement'];

export type PopoverProps = DialogProps & {
	children?: ReactNode;
	/** Ref of the trigger button. In uncontrolled mode, this element will be used to open the popover. In controlled mode, the popover will be anchored to this element. */
	triggerRef?: ReactAriaPopoverProps['triggerRef'];
	/** (**Controlled mode**) If `true`, the popover is open by default. */
	openByDefault?: boolean;
	/** (**Uncontrolled mode**) If `true`, the popover is open. */
	isOpen?: boolean;
	/** (**Uncontrolled mode**) Function to run when the popover is opened or closed. `(isOpen: boolean) => void`. */
	onOpenChange?: (isOpen: boolean) => void;
	/** The placement of the popover. */
	placement?: PopoverPlacement;
	/** Classes to pass to the popover contents. */
	className?: string;
	/** Classes to pass to the popover wrapper. */
	wrapperClassName?: string;
	/** Styles to pass to the popover. */
	style?: CSSProperties;
	/** Offset from the trigger element, on the same axis as the placement of the popover (e.g. if `placement` is `left`, this controls the horizontal spacing from the element). */
	offset?: number;
	/** Offset from the trigger element, on the opposite axis as the placement of the popover (e.g. if `placement` is `left`, this controls the vertical spacing from the element). */
	crossOffset?: number;
	/** Space that should be left between the popover and the edge of the container (the default container is browser window). */
	containerPadding?: number;
	/** If `true`, the popover should flip when there is not enough space. */
	shouldFlip?: boolean;
	/** Allows ignoring close events for certain elements. `(element: HTMLElement) => boolean`. Defaults to `() => true`. */
	shouldCloseOnInteractOutside?: (element: Element) => boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	popoverProps?: Omit<
		ReactAriaPopoverProps,
		| 'children'
		| 'className'
		| 'triggerRef'
		| 'isOpen'
		| 'onOpenChange'
		| 'defaultOpen'
		| 'placement'
		| 'offset'
		| 'crossOffset'
		| 'containerPadding'
		| 'shouldFlip'
		| 'shouldCloseOnInteractOutside'
		| 'style'
	>;
	'aria-label'?: string | false;
	/** If `true`, the popover will display an arrow pointing to the trigger element. */
	showArrow?: boolean;
};

type TriggeredPopoverProps = Omit<PopoverProps, 'triggerRef' | 'isOpen'> & {
	/** Allows using a custom trigger element. */
	trigger?: ReactNode;
	/** The icon for the built-in trigger button. */
	triggerButtonIcon?: ReactNode;
	/** The label for the built-in trigger button. */
	triggerButtonLabel?: ReactNode;
	/** Props to pass to the built-in trigger button. */
	triggerButtonProps?: ComponentPropsWithoutRef<typeof Button>;
};

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
 * const ref = useRef(null);
 *
 * <Button forwardedRef={ref}>Open popover</Button>
 *
 * <Popover
 * 	triggerRef={ref}
 * 	openByDefault
 * >
 * 	...
 * </Popover>
 *
 * @example
 * const [open, setOpen] = useState(false);
 *
 * <Button onPress={() => setOpen(true)}>Open popover</Button>
 *
 * <Popover
 * 	onOpenChange={setOpen}
 * 	isOpen={open}
 * 	triggerRef={ref}
 * >
 * 	...
 * </Popover>
 */
export const Popover = (props: Prettify<PopoverProps>) => {
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
		showArrow,
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
					'es:font-sans',
					'es:rounded-2xl es:bg-linear-to-br es:from-surface-50/85 es:to-surface-50/85 es:inset-ring es:inset-ring-surface-500/15 es:shadow-xl es:outline-hidden',
					'es:backdrop-blur-xl es:backdrop-brightness-110 es:backdrop-saturate-125',
					'es:inset-shadow-xs es:inset-shadow-white/50',
					'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
					'es:placement-left:origin-right es:placement-right:origin-left',
					'es:motion-ease-spring-bouncy',
					isEntering && 'es:*:pointer-events-none es:motion-duration-300',
					'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
					isEntering && 'es:motion-scale-x-in-95 es:motion-scale-y-in-90 es:motion-opacity-in-0',
					isEntering && 'es:placement-top:motion-translate-y-in-[0.25rem] es:placement-bottom:motion-translate-y-in-[-0.25rem]',
					isExiting && 'es:motion-scale-x-out-95 es:motion-scale-y-out-90 es:motion-opacity-out-0 es:motion-duration-200',
					isExiting && 'es:placement-top:motion-translate-y-out-[0.25rem] es:placement-bottom:motion-translate-y-out-[-0.25rem]',
					wrapperClassName,
				)
			}
			style={style}
			{...popoverProps}
		>
			{showArrow && (
				<OverlayArrow className='es:group'>
					<svg
						width={12}
						height={12}
						viewBox='0 0 12 12'
						className={clsx(
							'es:block es:fill-surface-50 es:stroke-1 es:stroke-surface-500/10',
							'es:group-placement-top:-translate-y-px',
							'es:group-placement-bottom:rotate-180 es:group-placement-bottom:translate-y-px',
							'es:group-placement-left:-rotate-90 es:group-placement-left:-translate-x-px',
							'es:group-placement-right:rotate-90 es:group-placement-right:translate-x-px',
						)}
					>
						<path d='M0 0 L6 6 L12 0' />
					</svg>
				</OverlayArrow>
			)}
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
 * A simple version of the Popover component that includes a trigger button.
 * The control of the popover is handled internally. A custom trigger can be provided.
 *
 * If you need more control over the trigger, use the Popover component directly.
 *
 * @component
 * @param {TriggeredPopoverProps} props - Component props.
 *
 * @returns {JSX.Element} The TriggeredPopover component.
 *
 * @example
 * <TriggeredPopover>
 * 	...
 * </TriggeredPopover>
 */

export const TriggeredPopover = (props: Prettify<TriggeredPopoverProps>) => {
	const {
		trigger,
		triggerButtonIcon,
		triggerButtonLabel = !triggerButtonIcon ? __('Open', 'eightshift-ui-components') : undefined,
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
			{!trigger ? (
				<Button
					icon={triggerButtonIcon}
					{...triggerButtonProps}
				>
					{triggerButtonLabel}
				</Button>
			) : null}
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
