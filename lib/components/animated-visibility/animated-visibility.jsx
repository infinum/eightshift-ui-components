import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component that allows animating the visibility of its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.visible - Whether the content should be visible
 * @param {string} props.className - Classes to pass to the element wrapper.
 * @param {React.ReactNode} props.children - The content to show/hide.
 * @param {boolean} [props.noInitial=false] - If `true`, the animation when the component is first mounted is disabled.
 * @param {ElementTransition} [props.transition='slideFade'] - The transition to use when showing/hiding the content.
 * @param {Object} [props.other] - Other props to pass to the element.
 *
 * @returns {JSX.Element} The AnimatedVisibility component.
 *
 * @typedef {'slideFade' |'scaleFade'} ElementTransition
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
	const {
		visible,
		className,
		children,
		noInitial = false,
		transition = 'slideFade',
		...other
	} = props;

	const transitions = {
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
