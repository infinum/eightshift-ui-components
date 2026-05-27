import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Children, cloneElement, forwardRef, type ComponentPropsWithoutRef, type ElementType, type ReactElement, type ReactNode, isValidElement } from 'react';
import type { Prettify } from '../../utilities/types';

const containerClasses = cva('es:inset-ring', {
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
		accent: {
			true: null,
			false: null,
		},
		standalone: {
			true: null,
			false: null,
		},
		horizontal: {
			true: null,
			false: null,
		},
		isChild: {
			true: null,
			false: null,
		},
	},
	compoundVariants: [
		{
			primary: false,
			standalone: false,
			class: 'es:rounded-md',
		},
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
		{
			isChild: false,
			primary: false,
			standalone: true,
			class: 'es:rounded-2xl',
		},
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

type ContainerVariantProps = VariantProps<typeof containerClasses>;

type ContainerProps<T extends ElementType = 'div'> = {
	as?: T;
	children?: ReactNode;
	className?: string;
	hidden?: boolean;
} & ContainerVariantProps &
	Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

type ContainerComponent = <T extends ElementType = 'div'>(props: Prettify<ContainerProps<T> & { ref?: React.Ref<Element> }>) => ReactNode;

const ContainerBase = <T extends ElementType = 'div'>(props: ContainerProps<T>, ref: React.ForwardedRef<Element>) => {
	const { className, children, as, hidden, accent, elevated, primary, isChild, compact, standalone, horizontal, centered, lessSpaceStart, lessSpaceEnd, ...rest } = props;
	const ComponentToRender = as ?? 'div';

	if (hidden) {
		return null;
	}

	return (
		<ComponentToRender
			{...rest}
			ref={ref as never}
			className={clsx(containerClasses({ accent, elevated, primary, isChild, compact, horizontal, standalone, centered, lessSpaceStart, lessSpaceEnd }), className)}
		>
			{children}
		</ComponentToRender>
	);
};

/**
 * A container component to wrap other components, providing consistent styling and spacing.
 *
 * @component
 * @param {ContainerProps} props - Component props.
 *
 * @returns {JSX.Element} The Container component.
 *
 * @example
 * <Container accent elevated>
 * 	<p>This is a container with accent and elevated styles.</p>
 * </Container>
 */
export const Container = forwardRef(ContainerBase) as ContainerComponent & { displayName?: string };

Container.displayName = 'Container';

type ContainerGroupProps<T extends ElementType = 'div'> = {
	as?: T;
	children?: ReactNode;
	className?: string;
	wrapClassName?: string;
	label?: ReactNode;
	hidden?: boolean;
	horizontal?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

type ContainerGroupComponent = <T extends ElementType = 'div'>(props: Prettify<ContainerGroupProps<T> & { ref?: React.Ref<Element> }>) => ReactNode;

const ContainerGroupBase = <T extends ElementType = 'div'>(props: ContainerGroupProps<T>, ref: React.ForwardedRef<Element>) => {
	const { className, children, as, hidden, horizontal, label, wrapClassName, ...rest } = props;
	const ComponentToRender = as ?? 'div';

	if (hidden) {
		return null;
	}

	const processedChildren = Children.toArray(children).reduce<ReactNode[]>((accumulator, child, index) => {
		if (isValidElement(child) && (child.type as { displayName?: string })?.displayName === 'Container') {
			return [
				...accumulator,
				cloneElement(child as ReactElement<{ horizontal?: boolean }>, {
					horizontal,
					key: child.key ?? index,
				}),
			];
		}

		return [...accumulator, child];
	}, []);

	if (!processedChildren.filter(Boolean).length) {
		return null;
	}

	const inner = (
		<ComponentToRender
			{...rest}
			ref={ref as never}
			className={clsx('es:flex es:gap-0.5', !horizontal && 'es:flex-col', className)}
		>
			{processedChildren}
		</ComponentToRender>
	);

	if (!label) {
		return inner;
	}

	return (
		<div className={wrapClassName}>
			<span className='es:ml-2 es:mb-1 es:inline-block es:text-12 es:font-variation-["wdth"_108,"wght"_300,"ROND"_100] es:text-surface-600'>{label}</span>
			{inner}
		</div>
	);
};

/**
 * A container group component to wrap multiple Container components, providing consistent spacing between them.
 *
 * @component
 * @param {ContainerGroupProps} props - Component props.
 *
 * @returns {JSX.Element} The ContainerGroup component.
 *
 * @example
 * <ContainerGroup>
 * 	<Container>First container</Container>
 * 	<Container>Second container</Container>
 * </ContainerGroup>
 */
export const ContainerGroup = forwardRef(ContainerGroupBase) as ContainerGroupComponent & { displayName?: string };

ContainerGroup.displayName = 'ContainerGroup';
