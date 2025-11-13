import { cva } from 'class-variance-authority';
import { clsx } from 'clsx/lite';
import { forwardRef } from 'react';

/**
 * A container component to wrap other components, providing consistent styling and spacing.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.accent] - If `true`, applies accent styling to the container.
 * @param {boolean} [props.elevated] - If `true`, applies elevated styling (shadow) to the container.
 * @param {boolean} [props.primary] - If `true`, applies primary styling (rounded full) to the container.
 * @param {boolean} [props.isChild] - If `true`, applies child-specific styling for nested containers.
 * @param {boolean} [props.compact] - If `true`, the vertical padding is reduced for a more compact appearance.
 * @param {string|JSX.Element} [props.as] - The HTML element or React component to render as the container.
 *
 * @returns {JSX.Element} The Container component.
 *
 * @example
 * <Container accent elevated>
 *   <p>This is a container with accent and elevated styles.</p>
 * </Container>
 *
 * @preserve
 */
export const Container = forwardRef((props, ref) => {
	const { className, children, as, hidden, accent, elevated, primary, isChild, compact, ...rest } = props;

	const ComponentToRender = as || 'div';

	if (hidden) {
		return null;
	}

	const containerClasses = cva([' es:inset-ring es:px-2.5', className], {
		variants: {
			elevated: {
				true: 'es:inset-shadow-sm es:shadow-sm es:shadow-black/5',
			},
			primary: {
				true: 'es:rounded-full',
				false: 'es:rounded-sm',
			},
			compact: {
				false: 'es:py-2 es:min-h-13',
				true: 'es:py-1 es:min-h-9',
			},
		},
		compoundVariants: [
			{
				isChild: false,
				primary: false,
				class: 'es:first:rounded-t-2xl es:last:rounded-b-2xl',
			},
			{
				isChild: true,
				primary: false,
				class: 'es:[:first-child_>_&]:rounded-t-2xl es:[:last-child_>_&]:rounded-b-2xl',
			},
			//
			{
				accent: false,
				elevated: false,
				class: [
					'es:bg-white es:bg-linear-to-b es:from-secondary-50/75 es:to-secondary-100/50 es:from-25% es:inset-ring-secondary-200/50',
					'es:inset-shadow-sm es:inset-shadow-white/30',
				],
			},
			{
				accent: true,
				elevated: false,
				class: 'es:bg-surface-50 es:inset-ring-surface-100',
			},
			{
				accent: false,
				elevated: true,
				class: 'es:bg-secondary-100 es:inset-ring-secondary-200 es:inset-shadow-white/50',
			},
			{
				accent: true,
				elevated: true,
				class: ['es:bg-surface-100 es:bg-linear-to-r es:from-accent-400/10 es:to-accent-400/12', ' es:inset-ring-accent-600/10 es:inset-shadow-white/50 es:text-accent-900'],
			},
		],
		defaultVariants: {
			accent: false,
			elevated: false,
			primary: false,
			isChild: false,
			compact: false,
		},
	});

	return (
		<ComponentToRender
			{...rest}
			ref={ref}
			className={containerClasses({ accent, elevated, primary, isChild, compact })}
		>
			{children}
		</ComponentToRender>
	);
});

/**
 * A container group component to wrap multiple Container components, providing consistent spacing between them.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the container group.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {string|JSX.Element} [props.as] - The HTML element or React component to render as the container group.
 *
 * @returns {JSX.Element} The ContainerGroup component.
 *
 * @example
 * <ContainerGroup>
 *   <Container>First container</Container>
 *   <Container>Second container</Container>
 * </ContainerGroup>
 *
 * @preserve
 */
export const ContainerGroup = forwardRef((props, ref) => {
	const { className, children, as, hidden, ...rest } = props;

	const ComponentToRender = as || 'div';

	if (hidden) {
		return null;
	}

	return (
		<ComponentToRender
			{...rest}
			ref={ref}
			className={clsx('es:flex es:flex-col es:gap-0.75', className)}
		>
			{children}
		</ComponentToRender>
	);
});
