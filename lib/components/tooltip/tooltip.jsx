import { OverlayArrow as ReactAriaOverlayArrow, Tooltip as ReactAriaTooltip, TooltipTrigger as ReactAriaTooltipTrigger } from 'react-aria-components';
import { useHover, useFocusWithin, mergeProps } from 'react-aria';
import { clsx } from 'clsx/lite';
import { useRef, useState } from 'react';

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
 * @param {number} [props.offset=0] - Additional offset between the tooltip and the element on the main axis (same axis as element).
 * @param {number} [props.crossOffset=0] - Additional offset between the tooltip and the element on the cross axis (opposite axis as element).
 * @param {number} [props.containerPadding=12] - Space that should be left between the tooltip and the main containing element (usually browser window).
 * @param {number} [props.openDelay=1500] - Duration before the tooltip is shown, in milliseconds.
 * @param {number} [props.closeDelay=500] - Duration before the tooltip is hidden, in milliseconds.
 * @param {boolean} [props.shouldFlip=true] - If `false`, the tooltip will not flip to the opposite side if there is not enough space.
 * @param {boolean} [props.defaultOpen] - (**Uncontrolled mode**) Whether the tooltip is initially open.
 * @param {boolean} [props.open] - (**Controlled mode**) Whether the tooltip is open.
 * @param {Function} [props.onOpenChange] - (**Controlled mode**) Function to run when the tooltip is opened or closed.
 * @param {TooltipPlacement} [props.placement] - The side of the trigger element where the tooltip will be displayed.
 * @param {string} [props.className] - Classes to pass to the tooltip.
 * @param {RefObject<Element>} [props.triggerRef] - Ref to anchor the tooltip to. If not provided, the tooltip will be anchored to the trigger element.
 * @param {boolean} [props.arrow] - If `true`, an arrow is shown on the tooltip.
 *
 * @returns {JSX.Element} The Tooltip component.
 *
 * @typedef {'light' | 'dark'} TooltipTheme
 * @typedef {'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom'} TooltipPlacement
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

		offset = 0,
		crossOffset = 0,

		containerPadding = 12,

		openDelay = 1500,
		closeDelay = 500,

		shouldFlip = true,
		arrow,
		open,
		defaultOpen,
		onOpenChange,
		placement,

		className,

		triggerRef,

		disabled,
	} = props;

	return (
		<ReactAriaTooltipTrigger
			delay={openDelay}
			closeDelay={closeDelay}
			isDisabled={disabled}
			isOpen={open}
			onOpenChange={onOpenChange}
			defaultOpen={defaultOpen}
		>
			{children}
			<ReactAriaTooltip
				containerPadding={containerPadding}
				placement={placement}
				shouldFlip={shouldFlip}
				triggerRef={triggerRef}
				offset={offset}
				crossOffset={crossOffset}
				className={({ isEntering, isExiting }) =>
					clsx(
						'es-uic-group',
						'es-uic-z-20 es-uic-select-none es-uic-rounded-md es-uic-border es-uic-px-1.5 es-uic-py-0.5 es-uic-text-sm es-uic-shadow es-uic-backdrop-blur-3xl es-uic-will-change-[transform,opacity] es-uic-fill-mode-forwards',
						theme === 'light' && 'es-uic-border-gray-200 es-uic-bg-white/90 es-uic-text-gray-700',
						theme === 'dark' && 'es-uic-border-gray-600 es-uic-bg-black/80 es-uic-text-gray-100',
						isEntering && 'es-uic-duration-300 es-uic-ease-out es-uic-animate-in es-uic-fade-in',
						isEntering &&
							'placement-left:es-uic-slide-in-from-right-0.5 placement-right:es-uic-slide-in-from-left-0.5 placement-top:es-uic-slide-in-from-bottom-0.5 placement-bottom:es-uic-slide-in-from-top-0.5',
						isExiting && 'es-uic-duration-150 es-uic-ease-in es-uic-animate-out es-uic-fade-out',
						isExiting &&
							'placement-left:es-uic-slide-out-to-right-0.5 placement-right:es-uic-slide-out-to-left-0.5 placement-top:es-uic-slide-out-to-bottom-0.5 placement-bottom:es-uic-slide-out-to-top-0.5',
						className,
					)
				}
			>
				{arrow && (
					<ReactAriaOverlayArrow>
						<svg
							width={8}
							height={8}
							viewBox='0 0 8 8'
							className={clsx(
								'es-uic-m-px es-uic-stroke-none es-uic-drop-shadow-sm',
								theme === 'light' && 'es-uic-fill-gray-200',
								theme === 'dark' && 'es-uic-fill-gray-600',
								'group-placement-left:-es-uic-rotate-90 group-placement-right:es-uic-rotate-90 group-placement-bottom:es-uic-rotate-180',
								'forced-colors:es-uic-fill-[Canvas] forced-colors:es-uic-stroke-[ButtonBorder]',
							)}
						>
							<path d='M0 0 L4 4 L8 0' />
						</svg>
					</ReactAriaOverlayArrow>
				)}
				{text}
			</ReactAriaTooltip>
		</ReactAriaTooltipTrigger>
	);
};

/**
 * A "decorative" tooltip than can be used with element that usually don't support tooltips.
 * Usually the only elements that support tooltips are interactive elements like buttons or links.
 *
 * This component will wrap the element and add the tooltip functionality to it.
 * The tooltip will be shown when the element is hovered or anything within is focused.
 *
 * **Note**: This is not officially supported by the ARIA spec, so use with caution.
 *
 * @see {@link Tooltip} before using this component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|JSX.Element} props.text - The text to display in the tooltip.
 * @param {TooltipTheme} [props.theme='dark'] - The theme of the tooltip.
 * @param {number} [props.offset=0] - Additional offset between the tooltip and the element on the main axis (same axis as element).
 * @param {number} [props.crossOffset=0] - Additional offset between the tooltip and the element on the cross axis (opposite axis as element).
 * @param {number} [props.containerPadding=12] - Space that should be left between the tooltip and the main containing element (usually browser window).
 * @param {number} [props.openDelay=1500] - Duration before the tooltip is shown, in milliseconds.
 * @param {number} [props.closeDelay=500] - Duration before the tooltip is hidden, in milliseconds.
 * @param {boolean} [props.shouldFlip=true] - If `false`, the tooltip will not flip to the opposite side if there is not enough space.
 * @param {TooltipPlacement} [props.placement] - The side of the trigger element where the tooltip will be displayed.
 * @param {string} [props.className] - Classes to pass to the tooltip.
 * @param {string} [props.wrapperClassName] - Classes to pass to the tooltip wrapper (if `doNotReplaceChild` is `false`).
 * @param {boolean} [props.arrow] - If `true`, an arrow is shown on the tooltip.
 *
 * @returns {JSX.Element} The DecorativeTooltip component.
 *
 * @typedef {'light' | 'dark'} TooltipTheme
 * @typedef {'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom'} TooltipPlacement
 *
 * @example
 * <DecorativeTooltip text='My tooltip'>
 * 	<span>Hover me</span>
 * </DecorativeTooltip>
 *
 * @preserve
 */
export const DecorativeTooltip = (props) => {
	const { openDelay, closeDelay, children, text, wrapperClassName, ...rest } = props;

	const [open, setOpen] = useState(false);

	let { hoverProps } = useHover({
		onHoverStart: () => setTimeout(() => setOpen(true), openDelay),
		onHoverEnd: () => setTimeout(() => setOpen(false), closeDelay),
	});

	let { focusWithinProps } = useFocusWithin({
		onFocusWithinChange: (isFocusWithin) => setOpen(isFocusWithin),
	});

	const ref = useRef(null);

	return (
		<Tooltip
			triggerRef={ref}
			text={text}
			open={open}
			className='es-uic-pointer-events-none'
			{...rest}
		>
			<div
				ref={ref}
				className={clsx('es-uic-inline', wrapperClassName)}
				{...mergeProps(hoverProps, focusWithinProps)}
			>
				{children}
			</div>
		</Tooltip>
	);
};
