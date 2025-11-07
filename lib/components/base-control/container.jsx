import { cva } from 'class-variance-authority';
import { clsx } from 'clsx/lite';

export const Container = (props) => {
	const { className, children, as, hidden, accent, elevated, primary, isChild, ...rest } = props;

	const ComponentToRender = as || 'div';

	if (hidden) {
		return null;
	}

	const containerClasses = cva([' es:inset-ring', className], {
		variants: {
			elevated: {
				true: 'es:inset-shadow-sm es:shadow-sm es:shadow-black/5',
			},
			primary: {
				true: 'es:rounded-full es:p-2.5',
				false: 'es:rounded-sm es:p-1.5',
			},
		},
		compoundVariants: [
			{
				isChild: false,
				primary: false,
				class: 'es:first:rounded-t-xl es:last:rounded-b-xl',
			},
			{
				isChild: true,
				primary: false,
				class: 'es:[:first-child_>_&]:rounded-t-xl es:[:last-child_>_&]:rounded-b-xl',
			},
			//
			{
				accent: false,
				elevated: false,
				class: 'es:bg-secondary-50 es:inset-ring-secondary-100',
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
		},
	});

	return (
		<ComponentToRender
			{...rest}
			className={containerClasses({ accent, elevated, primary, isChild })}
		>
			{children}
		</ComponentToRender>
	);
};

export const ContainerGroup = (props) => {
	const { className, children, as, hidden, ...rest } = props;

	const ComponentToRender = as || 'div';

	if (hidden) {
		return null;
	}

	return (
		<ComponentToRender
			{...rest}
			className={clsx('es:flex es:flex-col es:gap-0.75', className)}
		>
			{children}
		</ComponentToRender>
	);
};
