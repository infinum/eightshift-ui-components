import { clsx } from 'clsx';
import { type HTMLAttributes, type ReactNode, useEffect, useState } from 'react';

type ElementTransition =
	| 'fade'
	| 'slideFade'
	| 'scaleFade'
	| 'scaleRotateFade'
	| 'slideFadeUpSlight'
	| 'slideFadeDownSlight'
	| 'slideInFadeOut'
	| 'scaleSlideFade'
	| 'scaleSlideFadeSlight';

type TransitionClassNames = {
	inClassName: string;
	outClassName: string;
};

type AnimatedVisibilityProps = HTMLAttributes<HTMLDivElement> & {
	visible: boolean;
	className?: string;
	children?: ReactNode;
	noInitial?: boolean;
	noExitAnimation?: boolean;
	noEnterAnimation?: boolean;
	decreaseBounce?: boolean;
	transition?: ElementTransition;
};

const transitions: Record<ElementTransition, TransitionClassNames> = {
	fade: {
		inClassName: 'es:motion-opacity-in',
		outClassName: 'es:motion-opacity-out',
	},
	slideFade: {
		inClassName: 'es:motion-translate-y-in-[-5%] es:motion-opacity-in',
		outClassName: 'es:motion-translate-y-out-[-5%] es:motion-opacity-out es:motion-duration-300',
	},
	slideInFadeOut: {
		inClassName: 'es:motion-translate-y-in-[-5%] es:motion-opacity-in',
		outClassName: 'es:motion-opacity-out es:motion-duration-300',
	},
	slideFadeUpSlight: {
		inClassName: 'es:motion-translate-y-in-[0.25rem] es:motion-opacity-in',
		outClassName: 'es:motion-translate-y-out-[0.25rem] es:motion-opacity-out',
	},
	slideFadeDownSlight: {
		inClassName: 'es:motion-translate-y-in-[-0.25rem] es:motion-opacity-in',
		outClassName: 'es:motion-translate-y-out-[-0.25rem] es:motion-opacity-out',
	},
	scaleFade: {
		inClassName: 'es:motion-scale-in-95 es:motion-opacity-in',
		outClassName: 'es:motion-scale-out-90 es:motion-opacity-out',
	},
	scaleSlideFade: {
		inClassName: 'es:motion-translate-y-in-[-5%] es:motion-scale-in-95 es:motion-opacity-in',
		outClassName: 'es:motion-translate-y-out-[-5%] es:motion-scale-out-90 es:motion-opacity-out',
	},
	scaleSlideFadeSlight: {
		inClassName: 'es:motion-translate-y-in-[-0.25rem] es:motion-scale-in-95 es:motion-opacity-in',
		outClassName: 'es:motion-translate-y-out-[-0.25rem] es:motion-scale-out-90 es:motion-opacity-out',
	},
	scaleRotateFade: {
		inClassName: 'es:motion-rotate-in es:motion-scale-in-95 es:motion-opacity-in',
		outClassName: 'es:motion-rotate-out es:motion-scale-out-90 es:motion-opacity-out',
	},
};

export const AnimatedVisibility = (props: AnimatedVisibilityProps) => {
	const { visible, className, children, noInitial = false, transition = 'slideFade', noExitAnimation, noEnterAnimation, decreaseBounce, ...other } = props;

	const [isVisibleInner, setIsVisibleInner] = useState(false);
	const [canAnimate, setCanAnimate] = useState(true);

	useEffect(() => {
		if (visible) {
			setIsVisibleInner(true);
		}

		if (!visible && noExitAnimation) {
			setIsVisibleInner(false);
		}
	}, [noExitAnimation, visible]);

	useEffect(() => {
		if (noInitial && visible) {
			setCanAnimate(false);
		}
	}, [noInitial, visible]);

	return (
		<>
			{isVisibleInner && (
				<div
					className={clsx(
						!noEnterAnimation && visible && noInitial && visible && canAnimate && transitions[transition].inClassName,
						!noEnterAnimation && visible && !noInitial && transitions[transition].inClassName,
						!noExitAnimation && !visible && transitions[transition].outClassName,
						'es:motion-duration-300',
						decreaseBounce && 'es:motion-ease-spring-snappy es:motion-ease-linear/opacity',
						!decreaseBounce && 'es:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
						'es:fill-mode-forwards',
						className,
					)}
					onAnimationEnd={() => {
						if (visible === false) {
							setIsVisibleInner(false);
						}

						if (!canAnimate) {
							setCanAnimate(true);
						}
					}}
					{...other}
				>
					{children}
				</div>
			)}
		</>
	);
};
