import * as RadixTooltip from '@radix-ui/react-tooltip';
import { classnames } from '../../utilities/classnames';

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
		side = 'top',
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
			>
				<RadixTooltip.Trigger asChild={!doNotReplaceChild}>
					{triggerItems}
				</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						side={side}
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
