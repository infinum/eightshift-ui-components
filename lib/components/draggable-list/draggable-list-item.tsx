import { clsx } from 'clsx';
import { type ButtonHTMLAttributes, cloneElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { reorderGrabberV } from '../../icons/internal';
import { HStack } from '../layout/hstack';
import { RichLabel } from '../rich-label/rich-label';

type DraggableListItemProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode;
	icon?: ReactElement;
	label?: string;
	subtitle?: string;
	className?: string;
	iconClassName?: string;
	labelClassName?: string;
	subtitleClassName?: string;
	labelContainerClassName?: string;
};

type DraggableListItemHandleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: ReactNode;
	className?: string;
};

export const DraggableListItem = (props: DraggableListItemProps) => {
	const { children, icon, label, subtitle, className, iconClassName, labelClassName, subtitleClassName, labelContainerClassName, ...rest } = props;

	return (
		<HStack
			className={clsx('es:w-fill es:group es:pl-1', className)}
			{...rest}
		>
			<RichLabel
				icon={icon}
				label={label}
				subtitle={subtitle}
				className={clsx('es:mr-auto es:min-h-9', labelContainerClassName)}
				iconClassName={iconClassName}
				labelClassName={labelClassName}
				subtitleClassName={subtitleClassName}
				fullWidth
			/>

			{cloneElement(reorderGrabberV, {
				className: 'es:opacity-0 es:transition-opacity es:group-focus-visible:opacity-100 es:text-secondary-400 es:size-4 es:group-hover:opacity-100',
			})}

			{children}
		</HStack>
	);
};

export const DraggableListItemHandle = (props: DraggableListItemHandleProps) => {
	const { className, children, ...rest } = props;

	return (
		<button
			className={
				className ??
				'es:relative es:h-6 es:w-2 es:items-center es:justify-center es:self-center es:rounded es:border es:border-secondary-300 es:bg-secondary-50 es:transition es:after:absolute es:after:inset-0 es:after:m-auto es:after:h-4 es:after:w-px es:after:bg-secondary-200 es:after:transition es:after:content-[""] es:hover:border-accent-500 es:hover:bg-accent-400 es:hover:after:bg-accent-500'
			}
			{...rest}
			data-movable-handle
			tabIndex={-1}
		>
			{children}
		</button>
	);
};
