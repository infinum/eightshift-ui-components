import * as RadixTooltip from '@radix-ui/react-tooltip';
import { classnames } from '../../utilities/classnames';

/**
 * A simple tooltip component.
 *
 * It can be used in two modes:
 * - **Controlled mode**: You can control the tooltip with the `open` prop.
 * - **Uncontrolled mode**: The tooltip will be open by default with the `defaultOpen` prop.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|JSX.Element} props.text - The text to display in the tooltip.
 * @param {TooltipTheme} [props.theme='dark'] - The theme of the tooltip.
 * @param {number} [props.offset=5] - Offset from the element.
 * @param {number} [props.delayDuration=700] - Duration before the tooltip is shown, in milliseconds.
 * @param {number} [props.skipDelayDuration=300] - Time in which the user can move the cursor to a different trigger without waiting for the `delayDuration`, in milliseconds.
 * @param {boolean} [props.defaultOpen] - (**Uncontrolled mode**) Whether the tooltip is initially open.
 * @param {boolean} [props.open] - (**Controlled mode**) Whether the tooltip is open.
 * @param {Function} [props.onOpenChange] - (**Controlled mode**) Function to run when the tooltip is opened or closed.
 * @param {TooltipSide} [props.side] - The side of the trigger element where the tooltip will be displayed.
 * @param {string} [props.className] - Classes to pass to the tooltip.
 * @param {string} [props.wrapperClassName] - Classes to pass to the tooltip wrapper (if `doNotReplaceChild` is `false`).
 * @param {boolean} [props.doNotReplaceChild=false] - If `false`, the tooltip will merge its props in the trigger component. If `true`, the tooltip will wrap the trigger component with a `<button>` element.
 *
 * @returns {JSX.Element} The Tooltip component.
 *
 * @typedef {'light' | 'dark'} TooltipTheme
 * @typedef {'top' | 'bottom' | 'left' | 'right' | undefined} TooltipSide
 * @typedef {'center' | 'start' | 'end' | undefined} TooltipAlign
 *
 * @example
 * <Tooltip text='My tooltip'>
 * 	<Button>Hover me</Button>
 * </Tooltip>
 *
 * @preserve
 */
export const Tooltip = (props) => {
	const {
		children,
		text,
		theme = 'dark',
		offset = 5,
		delayDuration = 700,
		skipDelayDuration = 300,
		open,
		defaultOpen,
		onOpenChange,
		side,
		align,
		className,

		wrapperClassName,

		doNotReplaceChild = false,
	} = props;

	const triggerItems = doNotReplaceChild ? children : <div className={classnames('es-uic-size-fit', wrapperClassName)}>{children}</div>;

	return (
		<RadixTooltip.Provider
			skipDelayDuration={skipDelayDuration}
			delayDuration={delayDuration}
		>
			<RadixTooltip.Root
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
			>
				<RadixTooltip.Trigger asChild={!doNotReplaceChild}>
					{triggerItems}
				</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						side={side}
						align={align}
						sideOffset={offset}
						className={classnames(
							theme === 'light' && 'es-uic-border-gray-200 es-uic-bg-white/60 es-uic-text-gray-700',
							theme === 'dark' && 'es-uic-border-gray-600 es-uic-bg-black/60 es-uic-text-gray-100',
							'es-uic-z-20 es-uic-select-none es-uic-rounded-md es-uic-border es-uic-px-1.5 es-uic-py-0.5 es-uic-text-sm es-uic-shadow es-uic-backdrop-blur es-uic-will-change-[transform,opacity]',
							'es-uic-slide-in-from-top-2 es-uic-fade-in-0 es-uic-fill-mode-forwards es-uic-outline',
							'r-closed:es-uic-animate-out r-closed:es-uic-zoom-out-95 r-closed:es-uic-fade-out-0 r-closed:es-uic-fill-mode-forwards',
							'r-delayed-open:es-uic-animate-in r-delayed-open:es-uic-zoom-in-95 r-delayed-open:fade-in-100 r-delayed-open:es-uic-fill-mode-forwards',
							// 'data-[state=delayed-open]:es-uic-animate-in data-[state=delayed-open]:data-[side=bottom]:es-uic-animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:es-uic-animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:es-uic-animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:es-uic-animate-slideDownAndFade',
							className,
						)}
					>
						{text}
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
};
