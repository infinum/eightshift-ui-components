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

	const triggerItems = doNotReplaceChild ? children : <div className={classnames('size-fit', wrapperClassName)}>{children}</div>;

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
							theme === 'light' && 'border-gray-200 bg-white/60 text-gray-700',
							theme === 'dark' && 'border-gray-600 bg-black/60 text-gray-100',
							'z-20 select-none rounded-md border px-1.5 py-0.5 text-sm shadow backdrop-blur will-change-[transform,opacity]',
							'data-[state=closed]:animate-scaleOutAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
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
