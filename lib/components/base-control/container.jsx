import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { cloneElement, forwardRef } from 'react';

/**
 * @typedef {Object} ContainerProps
 * @property {string} [props.className] - Classes to pass to the container.
 * @property {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @property {boolean} [props.accent] - If `true`, applies accent styling to the container.
 * @property {boolean} [props.elevated] - If `true`, applies elevated styling (shadow) to the container.
 * @property {boolean} [props.primary] - If `true`, applies primary styling (rounded full) to the container.
 * @property {boolean} [props.isChild] - If `true`, applies child-specific styling for nested containers.
 * @property {boolean} [props.compact] - If `true`, the vertical padding is reduced for a more compact appearance.
 * @property {boolean} [props.standalone] - If `true`, the border radius is not adjusted automatically, based on neightboring containers.
 * @property {boolean} [props.centered] - If `true`, the content is centered vertically.
 * @property {boolean} [props.lessSpaceStart] - If `true`, space on the start (left) is reduced. Useful for symmetric components.
 * @property {boolean} [props.lessSpaceEnd] - If `true`, space on the end (right) is reduced. For example, use with text fields, or taller items.
 * @property {string|JSX.Element} [props.as] - The HTML element or React component to render as the container.
 *
 * @preserve
 */

/**
 * A container component to wrap other components, providing consistent styling and spacing.
 *
 * @component
 * @param {ContainerProps} props
 * @param {React.Ref<HTMLDivElement>} ref
 *
 * @type React.ForwardRefRenderFunction<HTMLDivElement, ContainerProps>
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
	const { className, children, as, hidden, accent, elevated, primary, isChild, compact, standalone, horizontal, centered, lessSpaceStart, lessSpaceEnd, ...rest } = props;

	const ComponentToRender = as || 'div';

	if (hidden) {
		return null;
	}

	const containerClasses = cva(['es:inset-ring', className], {
		variants: {
			elevated: {
				true: 'es:inset-shadow-sm es:shadow-sm es:shadow-black/5',
			},
			primary: {
				true: 'es:rounded-full',
			},
			compact: {
				false: 'es:py-2 es:min-h-13',
				true: 'es:py-1 es:min-h-9',
			},
			centered: {
				true: 'es:flex es:items-center',
			},
			lessSpaceStart: {
				true: 'es:pl-2',
				false: 'es:pl-3',
			},
			lessSpaceEnd: {
				true: 'es:pr-2',
				false: 'es:pr-3',
			},
		},
		compoundVariants: [
			{
				primary: false,
				standalone: false,
				class: 'es:rounded-md',
			},
			//
			{
				isChild: false,
				primary: false,
				standalone: false,
				horizontal: false,
				class: 'es:first:rounded-t-2xl es:last:rounded-b-2xl',
			},
			{
				isChild: true,
				primary: false,
				standalone: false,
				horizontal: false,
				class: 'es:[:first-child_>_&]:rounded-t-2xl es:[:last-child_>_&]:rounded-b-2xl',
			},
			{
				isChild: false,
				primary: false,
				standalone: false,
				horizontal: true,
				class: 'es:first:rounded-l-2xl es:last:rounded-r-2xl',
			},
			{
				isChild: true,
				primary: false,
				standalone: false,
				horizontal: true,
				class: 'es:[:first-child_>_&]:rounded-l-2xl es:[:last-child_>_&]:rounded-r-2xl',
			},
			//
			{
				isChild: false,
				primary: false,
				standalone: true,
				class: 'es:rounded-2xl',
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
				class: 'es:bg-surface-100/80 es:inset-ring-surface-200 es:text-accent-900',
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
			standalone: false,
			horizontal: false,
			centered: false,
			lessSpaceStart: false,
			lessSpaceEnd: false,
		},
	});

	return (
		<ComponentToRender
			{...rest}
			ref={ref}
			className={containerClasses({ accent, elevated, primary, isChild, compact, horizontal, standalone, centered, lessSpaceStart, lessSpaceEnd })}
		>
			{children}
		</ComponentToRender>
	);
});

Container.displayName = 'Container';

/**
 * @typedef {Object} ContainerGroupProps
 * @property {string} [className] - Classes to pass to the container group.
 * @property {string} [wrapClassName] - Classes to pass to the control wrapper - only if label is set.
 * @property {string|JSX.Element} [label] - Label to show above the container group.
 * @property {boolean} [hidden] - If `true`, the component is not rendered.
 * @property {boolean} [horizontal] - If `true`, the component uses a horizontal orientation.
 * @property {string|JSX.Element} [as] - The HTML element or React component to render as the container group.
 *
 * @preserve
 */

/**
 * A container group component to wrap multiple Container components, providing consistent spacing between them.
 *
 * @component
 * @param {ContainerGroupProps} props
 * @param {React.Ref<HTMLDivElement>} ref
 *
 * @type React.ForwardRefRenderFunction<HTMLDivElement, ContainerGroupProps>
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
	const { className, children, as, hidden, horizontal, label, wrapClassName, ...rest } = props;

	const ComponentToRender = as || 'div';

	if (hidden) {
		return null;
	}

	const processedChildren = Array.isArray(children)
		? children.reduce((acc, child, index) => {
				if (child?.type?.displayName === 'Container') {
					return [
						...acc,
						cloneElement(child, {
							horizontal,
							key: index,
						}),
					];
				}

				return [...acc, child];
			}, [])
		: children;

	if (!processedChildren || processedChildren?.length < 1) {
		return null;
	}

	const inner = (
		<ComponentToRender
			{...rest}
			ref={ref}
			className={clsx('es:flex es:gap-0.5', !horizontal && 'es:flex-col', className)}
		>
			{processedChildren}
		</ComponentToRender>
	);

	if (!label) {
		return inner;
	}

	if (Array.isArray(inner?.props?.children) && !inner?.props?.children?.filter(Boolean)?.length) {
		return null;
	}

	return (
		<div className={wrapClassName}>
			<span className='es:ml-1 es:mb-1 es:inline-block es:text-12 es:font-variation-["wdth"_125,"wght"_400] es:text-surface-500'>{label}</span>
			{inner}
		</div>
	);
});

ContainerGroup.displayName = 'ContainerGroup';
