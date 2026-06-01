import { clsx } from 'clsx';
import { useRef, type ReactNode, type RefObject } from 'react';
import type { Prettify } from '../../utilities/types';
import { useTooltipTrigger } from 'react-aria';
import { OverlayArrow as ReactAriaOverlayArrow, Tooltip as ReactAriaTooltip, TooltipTrigger as ReactAriaTooltipTrigger } from 'react-aria-components';
import { useTooltipTriggerState } from 'react-stately';

type TooltipTheme = 'light' | 'dark';
type TooltipPlacement =
	| 'bottom'
	| 'bottom left'
	| 'bottom right'
	| 'bottom start'
	| 'bottom end'
	| 'top'
	| 'top left'
	| 'top right'
	| 'top start'
	| 'top end'
	| 'left'
	| 'left top'
	| 'left bottom'
	| 'start'
	| 'start top'
	| 'start bottom'
	| 'right'
	| 'right top'
	| 'right bottom'
	| 'end'
	| 'end top'
	| 'end bottom';

export type TooltipProps = {
	children?: ReactNode;
	/** The text to display in the tooltip. */
	text: ReactNode;
	/** The theme of the tooltip. Defaults to `dark`. */
	theme?: TooltipTheme;
	/** Additional offset between the tooltip and the element on the main axis (same axis as element). Defaults to `5`. */
	offset?: number;
	/** Additional offset between the tooltip and the element on the cross axis (opposite axis as element). Defaults to `0`. */
	crossOffset?: number;
	/** Space that should be left between the tooltip and the main containing element (usually browser window). Defaults to `12`. */
	containerPadding?: number;
	/** Duration before the tooltip is shown, in milliseconds. Defaults to `1200`. */
	openDelay?: number;
	/** Duration before the tooltip is hidden, in milliseconds. Defaults to `500`. */
	closeDelay?: number;
	/** If `false`, the tooltip will not flip to the opposite side if there is not enough space. Defaults to `true`. */
	shouldFlip?: boolean;
	/** (**Uncontrolled mode**) Whether the tooltip is initially open. */
	defaultOpen?: boolean;
	/** (**Controlled mode**) Whether the tooltip is open. */
	open?: boolean;
	/** (**Controlled mode**) Function to run when the tooltip is opened or closed. */
	onOpenChange?: (isOpen: boolean) => void;
	/** The side of the trigger element where the tooltip will be displayed. */
	placement?: TooltipPlacement;
	/** Classes to pass to the tooltip. */
	className?: string;
	wrapperClassName?: string;
	/** Ref to anchor the tooltip to. If not provided, the tooltip will be anchored to the trigger element. */
	triggerRef?: RefObject<Element>;
	/** If `true`, an arrow is shown on the tooltip. */
	arrow?: boolean;
	disabled?: boolean;
};

type DecorativeTooltipProps = Omit<TooltipProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'triggerRef'> & {
	wrapperClassName?: string;
};

/**
 * A simple tooltip component.
 *
 * It can be used in two modes:
 * - **Controlled mode**: You can control the tooltip with the `open` prop.
 * - **Uncontrolled mode**: The tooltip will be open by default with the `defaultOpen` prop.
 *
 * @component
 * @param {TooltipProps} props - Component props.
 *
 * @returns {JSX.Element} The Tooltip component.
 *
 * @example
 * <Tooltip text='My tooltip'>
 * 	<Button>Hover me</Button>
 * </Tooltip>
 */
export const Tooltip = (props: Prettify<TooltipProps>) => {
	const {
		children,
		text,
		theme = 'dark',
		offset = 5,
		crossOffset = 0,
		containerPadding = 12,
		openDelay = 1200,
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
						'es:font-variation-["wdth"_72,"wght"_380,"ROND"_100]',
						'es:z-40 es:select-none es:rounded-lg es:inset-ring es:px-2.5 es:py-2 es:text-13 es:leading-none es:shadow es:backdrop-blur-xl es:backdrop-brightness-105 es:backdrop-saturate-125 es:will-change-[transform,opacity] es:fill-mode-forwards',
						theme === 'light' && 'es:inset-ring-surface-800/5 es:bg-surface-50/90 es:text-secondary-700',
						theme === 'dark' && 'es:inset-ring-surface-200/15 es:bg-surface-800/80 es:text-secondary-100',
						isEntering &&
							'es:motion-opacity-in es:motion-duration-300 es:placement-left:motion-translate-x-in-[5%] es:placement-right:-motion-translate-x-in-[5%] es:placement-top:motion-translate-y-in-[5%] es:placement-bottom:-motion-translate-y-in-[5%] es:motion-ease-spring-smooth es:motion-ease-linear/opacity',
						isExiting &&
							'es:motion-opacity-out es:motion-duration-200 es:placement-left:motion-translate-x-out-[12.5%] es:placement-right:motion-translate-x-out-[-12.5%] es:placement-top:motion-translate-y-out-[12.5%] es:placement-bottom:motion-translate-y-out-[-12.5%] es:motion-ease-spring-smooth es:motion-ease-linear/opacity',
						className,
					)
				}
			>
				{arrow ? (
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
								'es:group-placement-left:-rotate-90 es:group-placement-right:rotate-90 es:group-placement-bottom:rotate-180',
								'es:forced-colors:fill-[Canvas] es:forced-colors:stroke-[ButtonBorder]',
							)}
						>
							<path d='M0 0 L4 4 L8 0' />
						</svg>
					</ReactAriaOverlayArrow>
				) : null}
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
 * @param {DecorativeTooltipProps} props - Component props.
 *
 * @returns {JSX.Element} The DecorativeTooltip component.
 *
 * @example
 * <DecorativeTooltip text='My tooltip'>
 * 	<span>Hover me</span>
 * </DecorativeTooltip>
 */
export const DecorativeTooltip = (props: Prettify<DecorativeTooltipProps>) => {
	const { openDelay = 1200, closeDelay = 500, children, text, wrapperClassName, disabled, ...rest } = props;
	const state = useTooltipTriggerState({ delay: openDelay, closeDelay, isDisabled: disabled });
	const ref = useRef<HTMLDivElement>(null);
	const { triggerProps } = useTooltipTrigger({ isDisabled: disabled, delay: openDelay, closeDelay }, state, ref);

	return (
		<Tooltip
			triggerRef={ref}
			text={text}
			open={state.isOpen}
			disabled={disabled}
			openDelay={openDelay}
			closeDelay={closeDelay}
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
