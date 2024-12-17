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
			inClassName: 'es-uic-animate-in es-uic-fade-in',
			outClassName: 'es-uic-animate-out es-uic-fade-out',
		},
		slideFade: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-slide-in-from-top-3',
			outClassName: 'es-uic-animate-out es-uic-fade-out es-uic-slide-out-to-top-3',
		},
		slideInFadeOut: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-slide-in-from-bottom-3',
			outClassName: 'es-uic-animate-out es-uic-fade-out',
		},
		slideFadeUpSlight: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-slide-in-from-bottom-1',
			outClassName: 'es-uic-animate-out es-uic-fade-out es-uic-slide-out-to-bottom-1',
		},
		slideFadeDownSlight: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-slide-in-from-top-1',
			outClassName: 'es-uic-animate-out es-uic-fade-out es-uic-slide-out-to-top-1',
		},
		scaleFade: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-zoom-in-90',
			outClassName: 'es-uic-animate-out es-uic-fade-out es-uic-zoom-out-90',
		},
		scaleSlideFade: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-zoom-in-[98%] es-uic-slide-in-from-top-3',
			outClassName: 'es-uic-animate-out es-uic-fade-out es-uic-zoom-out-[98%] es-uic-slide-out-to-top-3',
			durationClassName: 'es-uic-duration-300',
		},
		scaleRotateFade: {
			inClassName: 'es-uic-animate-in es-uic-fade-in es-uic-zoom-in-90 es-uic-spin-in-12',
			outClassName: 'es-uic-animate-out es-uic-fade-out es-uic-zoom-out-90 es-uic-spin-out-12',
			durationClassName: 'es-uic-duration-300',
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
						transitions?.[transition]?.durationClassName ?? 'es-uic-duration-300',
						'es-uic-fill-mode-forwards',
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
