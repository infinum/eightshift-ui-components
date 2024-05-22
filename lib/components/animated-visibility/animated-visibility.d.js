/**
 * @typedef {'slideFade' |'scaleFade'} ElementTransition
 */

/**
 * A component to show/hide content with an animation.
 *
 * @typedef {Object} AnimatedVisibilityProps
 * @prop {boolean} props.visible - Whether the content should be visible
 * @prop {string} props.className - Classes to pass to the element wrapper.
 * @prop {React.ReactNode} props.children - The content to show/hide.
 * @prop {boolean} [props.noInitial=false] - If `true`, the animation when the component is first mounted is disabled.
 * @prop {ElementTransition} [props.transition='slideFade'] - The transition to use when showing/hiding the content.
 * @prop {Object} [props.other] - Other props to pass to the element.
 */
