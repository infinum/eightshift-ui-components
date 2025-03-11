import { OverlayArrow as ReactAriaOverlayArrow, Tooltip as ReactAriaTooltip, TooltipTrigger as ReactAriaTooltipTrigger } from 'react-aria-components';
import { clsx } from 'clsx/lite';
import { useRef } from 'react';
import { useTooltipTriggerState } from 'react-stately';
import { useTooltipTrigger } from 'react-aria';

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
						'es:group es:pointer-events-none',
						'es:z-20 es:select-none es:rounded-md es:border es:px-1.5 es:py-0.5 es:text-sm es:shadow es:backdrop-blur-3xl es:will-change-[transform,opacity] es:fill-mode-forwards',
						theme === 'light' && 'es:border-secondary-200 es:bg-white/90 es:text-secondary-700',
						theme === 'dark' && 'es:border-secondary-600 es:bg-black/80 es:text-secondary-100',
						isEntering &&
							'es:motion-opacity-in es:motion-duration-300 es:motion-safe:data-[placement=left]:motion-translate-x-in-[5%] es:motion-safe:data-[placement=right]:-motion-translate-x-in-[5%] es:motion-safe:data-[placement=top]:motion-translate-y-in-[5%] es:motion-safe:data-[placement=bottom]:-motion-translate-y-in-[5%] es:motion-ease-spring-smooth es:motion-ease-linear/opacity',
						isExiting &&
							'es:motion-opacity-out es:motion-duration-200 es:motion-safe:data-[placement=left]:motion-translate-x-out-[12.5%] es:motion-safe:data-[placement=right]:motion-translate-x-out-[-12.5%] es:motion-safe:data-[placement=top]:motion-translate-y-out-[12.5%] es:motion-safe:data-[placement=bottom]:motion-translate-y-out-[-12.5%] es:motion-ease-spring-smooth es:motion-ease-linear/opacity',
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
								'es:m-px es:stroke-none es:drop-shadow-sm',
								'es:pointer-events-none',
								theme === 'light' && 'es:fill-secondary-200',
								theme === 'dark' && 'es:fill-secondary-600',
								'es:group-data-[placement=left]:-rotate-90 es:group-data-[placement=right]:rotate-90 es:group-data-[placement=bottom]:rotate-180',
								'es:forced-colors:fill-[Canvas] es:forced-colors:stroke-[ButtonBorder]',
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

	const state = useTooltipTriggerState(props);

	const ref = useRef(null);

	const { triggerProps } = useTooltipTrigger(props, state, ref);

	return (
		<Tooltip
			triggerRef={ref}
			text={text}
			open={state.isOpen}
			{...rest}
		>
			<div
				ref={ref}
				{...triggerProps}
				className={wrapperClassName}
			>
				{children}
			</div>
		</Tooltip>
	);
};
