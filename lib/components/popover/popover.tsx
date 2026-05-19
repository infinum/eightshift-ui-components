import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react';
import { Dialog, DialogTrigger, Popover as ReactAriaPopover } from 'react-aria-components';
import { Button } from '../button/button';

type ReactAriaPopoverProps = ComponentPropsWithoutRef<typeof ReactAriaPopover>;
type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className' | 'aria-label'>;

type PopoverPlacement = ReactAriaPopoverProps['placement'];

type PopoverProps = DialogProps & {
	children?: ReactNode;
	triggerRef?: ReactAriaPopoverProps['triggerRef'];
	openByDefault?: boolean;
	isOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
	placement?: PopoverPlacement;
	className?: string;
	wrapperClassName?: string;
	style?: CSSProperties;
	offset?: number;
	crossOffset?: number;
	containerPadding?: number;
	shouldFlip?: boolean;
	shouldCloseOnInteractOutside?: (element: Element) => boolean;
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
};

type TriggeredPopoverProps = Omit<PopoverProps, 'triggerRef' | 'isOpen'> & {
	trigger?: ReactNode;
	triggerButtonIcon?: ReactNode;
	triggerButtonLabel?: ReactNode;
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
export const Popover = (props: PopoverProps) => {
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

export const TriggeredPopover = (props: TriggeredPopoverProps) => {
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
