import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component that allows animating the visibility of its children.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.visible - Whether the content should be visible
 * @param {string} props.className - Classes to pass to the element wrapper.
 * @param {boolean} [props.noInitial=false] - If `true`, the animation when the component is first mounted is disabled.
 * @param {ElementTransition} [props.transition='slideFade'] - The transition to use when showing/hiding the content.
 *
 * @returns {JSX.Element} The AnimatedVisibility component.
 *
 * @typedef {'fade' | 'slideFade' |'scaleFade' | 'scaleRotateFade'} ElementTransition
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
	const { visible, className, children, noInitial = false, transition = 'slideFade', ...other } = props;

	const transitions = {
		fade: {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
		},
		slideFade: {
			initial: { opacity: 0, y: -5 },
			animate: { opacity: 1, y: 0 },
			exit: { opacity: 0, y: -5 },
		},
		scaleFade: {
			initial: { opacity: 0, scale: 0.9 },
			animate: { opacity: 1, scale: 1 },
			exit: { opacity: 0, scale: 0.9 },
		},
		scaleRotateFade: {
			initial: { opacity: 0, scale: 0.95, rotate: '-25deg' },
			animate: { opacity: 1, scale: 1, rotate: '0deg' },
			exit: { opacity: 0, scale: 0.95, rotate: '-25deg' },
		},
	};

	return (
		<AnimatePresence initial={!noInitial}>
			{visible && (
				<motion.div
					initial={transitions[transition].initial}
					animate={transitions[transition].animate}
					exit={transitions[transition].exit}
					className={className}
					{...other}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
