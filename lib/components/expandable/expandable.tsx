import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';
import { Disclosure, DisclosurePanel, Label } from 'react-aria-components';
import { dropdownCaretAlt } from '../../icons/internal';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Button } from '../button/button';
import { RichLabel } from '../rich-label/rich-label';

type ExpandableProps = Omit<ComponentPropsWithoutRef<typeof Disclosure>, 'children' | 'className' | 'isExpanded'> & {
	icon?: ReactNode;
	label?: ReactNode;
	subtitle?: ReactNode;
	className?: string;
	contentClassName?: string;
	contentWrapClassName?: string;
	labelClassName?: string;
	headerClassName?: string;
	actions?: ReactNode;
	keepActionsOnExpand?: boolean;
	disabled?: boolean;
	open?: boolean;
	onOpenChange?: (value: boolean) => void;
	headerProps?: ComponentPropsWithoutRef<'div'>;
	customOpenButton?: (props: { open: boolean; toggleOpen: () => void; tooltip: string; disabled?: boolean }) => ReactNode;
	standalone?: boolean;
	flat?: boolean;
	hidden?: boolean;
	noFocusHandling?: boolean;
	children?: ReactNode;
};

export const Expandable = (props: ExpandableProps) => {
	const {
		icon,
		label,
		subtitle,
		className,
		labelClassName,
		contentClassName,
		contentWrapClassName,
		headerClassName,
		actions,
		keepActionsOnExpand = false,
		disabled,
		noFocusHandling: _noFocusHandling,
		children,
		open = false,
		onOpenChange,
		customOpenButton,
		headerProps,
		standalone,
		flat,
		hidden,
		...other
	} = props;

	const [isOpen, setIsOpen] = useState(open);

	if (isOpen && disabled) {
		setIsOpen(false);
	}

	if (hidden) {
		return null;
	}

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		onOpenChange?.(!isOpen);
	};

	return (
		<Disclosure
			isExpanded={isOpen}
			className={clsx('es:text-sm', !standalone && 'es:group', _noFocusHandling && '', className)}
			{...other}
		>
			<div
				className={clsx(
					'es:flex es:items-center es:gap-1 es:pr-1.25 es:py-1 es:pl-2.5',
					standalone && 'es:rounded-xl',
					!standalone && 'es:rounded-md es:group-first:rounded-t-xl es:group-after-current:rounded-t-xl',
					'es:inset-ring',
					'es:inset-shadow-xs',
					isOpen && 'es:bg-surface-100 es:inset-ring-surface-300/75 es:inset-shadow-surface-100/30',
					isOpen && 'es:rounded-b-md es:rounded-t-xl',
					!isOpen && 'es:bg-white es:bg-linear-to-b es:from-25% es:from-secondary-100/5 es:to-secondary-300/10 es:inset-ring-secondary-300/45 es:inset-shadow-secondary-200/50',
					!isOpen && !standalone && 'es:rounded-b-md es:group-last:rounded-b-xl es:group-before-current:rounded-b-xl',
					!flat && 'es:shadow-xs es:shadow-black/5',
					'es:transition-plus es:duration-200 es:motion-ease-spring-bouncy',
					headerClassName,
				)}
				{...headerProps}
			>
				<RichLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={clsx('es:grow', labelClassName)}
					as={Label}
				/>

				{actions && !keepActionsOnExpand ? (
					<AnimatedVisibility
						visible={!isOpen}
						className='es:flex es:gap-1 es:shrink-0'
						transition='scaleFade'
						decreaseBounce
						noInitial
					>
						{actions}
					</AnimatedVisibility>
				) : null}

				{actions && keepActionsOnExpand ? <div className='es:flex es:gap-1 es:shrink-0'>{actions}</div> : null}

				{customOpenButton
					? customOpenButton({ open: isOpen, toggleOpen, tooltip: isOpen ? __('Close', 'eightshift-ui-components') : __('Open', 'eightshift-ui-components'), disabled })
					: null}

				{!customOpenButton ? (
					<Button
						slot='trigger'
						type='ghost'
						icon={dropdownCaretAlt}
						onPress={toggleOpen}
						tooltip={isOpen ? __('Close', 'eightshift-ui-components') : __('Open', 'eightshift-ui-components')}
						disabled={disabled}
						className={clsx(
							'es:icon:transition-plus es:ease-spring-bouncier es:duration-400',
							isOpen && 'es:icon:-scale-y-100 es:icon:text-surface-600',
							!isOpen && 'es:icon:text-secondary-500',
						)}
						size='small'
					/>
				) : null}
			</div>

			<DisclosurePanel
				className={clsx(
					'es:h-(--disclosure-panel-height)',
					'es:opacity-0 es:-translate-y-2',
					!isOpen && 'es:rounded-t-xl',
					isOpen && 'es:rounded-t-md es:opacity-100 es:*:motion-preset-fade-sm es:*:motion-delay-75 es:translate-y-1 es:mb-1',
					'es:origin-top',
					'es:bg-white es:rounded-b-xl es:inset-ring es:inset-ring-surface-200',
					'es:inset-shadow-sm es:inset-shadow-accent-600/5',
					!flat && 'es:shadow-xs es:shadow-black/5',
					'es:transition-plus-h',
					contentClassName,
				)}
			>
				<div className={clsx('es:flex es:flex-col es:gap-2.5 es:px-3 es:py-3.5', contentWrapClassName)}>{children}</div>
			</DisclosurePanel>
		</Disclosure>
	);
};
