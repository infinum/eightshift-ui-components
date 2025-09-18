import { clsx } from 'clsx/lite';
import { useState, useEffect } from 'react';

/**
 * Component that allows animating the visibility of its children.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.visible - Whether the content should be visible
 * @param {string} props.className - Classes to pass to the element wrapper.
 * @param {boolean} [props.noInitial=false] - If `true`, the animation when the component is first mounted is disabled.
 * @param {boolean} [props.noExitAnimation=false] - If `true`, the exit animation is not played.
 * @param {boolean} [props.noEnterAnimation=false] - If `true`, the entrance animation is not played.
 * @param {ElementTransition} [props.transition='slideFade'] - The transition to use when showing/hiding the content.
 *
 * @returns {JSX.Element} The AnimatedVisibility component.
 *
 * @typedef {'fade' | 'slideFade' |'scaleFade' | 'scaleRotateFade' | 'slideFadeUpSlight' | 'slideFadeDownSlight' | 'slideInFadeOut' | 'scaleSlideFade'} ElementTransition
 *
 * @example
 * const [visible, setVisible] = useState(false);
 *
 * <AnimatedVisibility visible={visible}>
 * 	<div>Content</div>
 * </AnimatedVisibility>
 *
 * @preserve
 */
export const AnimatedVisibility = (props) => {
	const { visible, className, children, noInitial = false, transition = 'slideFade', noExitAnimation, noEnterAnimation, ...other } = props;

	const [isVisibleInner, setIsVisibleInner] = useState(false);
	const [canAnimate, setCanAnimate] = useState(true);

	useEffect(() => {
		if (visible) {
			setIsVisibleInner(true);
		}

		if (!visible && noExitAnimation) {
			setIsVisibleInner(false);
		}
	}, [visible]);

	useEffect(() => {
		if (noInitial && visible) {
			setCanAnimate(false);
		}
	}, []);

	const transitions = {
		fade: {
			inClassName: 'es:motion-opacity-in es:motion-duration-500',
			outClassName: 'es:motion-opacity-out es:motion-duration-300',
		},
		slideFade: {
			inClassName: 'es:motion-safe:motion-translate-y-in-[-5%] es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName:
				'es:motion-safe:motion-translate-y-out-[-5%] es:motion-opacity-out es:motion-duration-300 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
		},
		slideInFadeOut: {
			inClassName: 'es:motion-safe:motion-translate-y-in-[-5%] es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName: 'es:motion-opacity-out es:motion-duration-300',
		},
		slideFadeUpSlight: {
			inClassName:
				'es:motion-safe:motion-translate-y-in-[0.25rem] es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName:
				'es:motion-safe:motion-translate-y-out-[0.25rem] es:motion-opacity-out es:motion-duration-300 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
		},
		slideFadeDownSlight: {
			inClassName:
				'es:motion-safe:motion-translate-y-in-[-0.25rem] es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName:
				'es:motion-safe:motion-translate-y-out-[-0.25rem] es:motion-opacity-out es:motion-duration-300 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
		},
		scaleFade: {
			inClassName: 'es:motion-safe:motion-scale-in-95 es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName: 'es:motion-safe:motion-scale-out-90 es:motion-opacity-out es:motion-duration-300 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
		},
		scaleSlideFade: {
			inClassName:
				'es:motion-safe:motion-translate-y-in-[-5%] es:motion-safe:motion-scale-in-95 es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName:
				'es:motion-safe:motion-translate-y-out-[-5%] es:motion-safe:motion-scale-out-90 es:motion-opacity-out es:motion-duration-300 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
		},
		scaleRotateFade: {
			inClassName:
				'es:motion-rotate-in es:motion-safe:motion-scale-in-95 es:motion-opacity-in es:motion-duration-500 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
			outClassName:
				'es:motion-rotate-out es:motion-safe:motion-scale-out-90 es:motion-opacity-out es:motion-duration-300 es:motion-safe:motion-ease-spring-bouncy es:motion-ease-linear/opacity',
		},
	};

	return (
		<>
			{isVisibleInner && (
				<div
					className={clsx(
						!noEnterAnimation && visible && noInitial && visible && canAnimate && transitions[transition].inClassName,
						!noEnterAnimation && visible && !noInitial && transitions[transition].inClassName,
						!noExitAnimation && !visible && transitions[transition].outClassName,
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
