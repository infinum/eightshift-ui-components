import { clsx } from 'clsx';
import { useRef, type ReactNode, type RefObject } from 'react';
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
	text: ReactNode;
	theme?: TooltipTheme;
	offset?: number;
	crossOffset?: number;
	containerPadding?: number;
	openDelay?: number;
	closeDelay?: number;
	shouldFlip?: boolean;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
	placement?: TooltipPlacement;
	className?: string;
	wrapperClassName?: string;
	triggerRef?: RefObject<Element>;
	arrow?: boolean;
	disabled?: boolean;
};

type DecorativeTooltipProps = Omit<TooltipProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'triggerRef'> & {
	wrapperClassName?: string;
};

export const Tooltip = (props: TooltipProps) => {
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

export const DecorativeTooltip = (props: DecorativeTooltipProps) => {
	const { openDelay = 1200, closeDelay = 500, children, text, wrapperClassName, disabled, ...rest } = props;
	const state = useTooltipTriggerState({ delay: openDelay, closeDelay, isDisabled: disabled });
	const ref = useRef<HTMLDivElement>(null);
	const { triggerProps } = useTooltipTrigger({ isDisabled: disabled, delay: openDelay, closeDelay }, state, ref);

	return (
		<Tooltip
			triggerRef={ref as unknown as RefObject<Element>}
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
