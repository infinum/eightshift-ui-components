import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import {
	Menu as ReactAriaMenu,
	MenuItem as ReactAriaMenuItem,
	MenuSection as ReactAriaMenuSection,
	MenuTrigger,
	Separator as ReactAriaSeparator,
	SubmenuTrigger,
} from 'react-aria-components';
import { Children, cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from 'react';
import { chevronRight, dummySpacer, hamburgerMenu, menuItemCheck, menuItemCircle } from '../../icons/internal';
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { RichLabel } from '../rich-label/rich-label';

type ReactAriaMenuProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaMenu>, 'children' | 'className'>;
type MenuTriggerProps = Omit<ComponentPropsWithoutRef<typeof MenuTrigger>, 'children' | 'trigger'>;
type MenuPopoverProps = ComponentPropsWithoutRef<typeof Popover>;
type ReactAriaMenuItemProps = ComponentPropsWithoutRef<typeof ReactAriaMenuItem>;

type MenuProps = ReactAriaMenuProps &
	MenuTriggerProps & {
		children?: ReactNode;
		triggerLabel?: ReactNode;
		triggerIcon?: ReactNode;
		triggerProps?: ComponentPropsWithoutRef<typeof Button>;
		tooltip?: ReactNode;
		keepOpen?: boolean;
		openOnLongPress?: boolean;
		popoverProps?: MenuPopoverProps;
		disabled?: boolean;
		manualWidth?: boolean;
		hidden?: boolean;
		'aria-label'?: string;
	};

type MenuSectionProps = {
	children?: ReactNode;
	label?: ReactNode;
};

type MenuSeparatorProps = ComponentPropsWithoutRef<typeof ReactAriaSeparator>;

type MenuItemProps = Omit<ReactAriaMenuItemProps, 'children' | 'className' | 'isDisabled' | 'aria-label' | 'onClick'> & {
	children?: ReactNode;
	icon?: ReactNode;
	shortcut?: ReactNode;
	checked?: boolean;
	selected?: boolean;
	disabled?: boolean;
	endIcon?: ReactNode;
	subtitle?: ReactNode;
	onClick?: ReactAriaMenuItemProps['onAction'];
	onClickNative?: ReactAriaMenuItemProps['onClick'];
	danger?: boolean;
	primary?: boolean;
	className?: string;
	'aria-label'?: string;
	hidden?: boolean;
};

type SubMenuItemProps = {
	children?: ReactNode;
	trigger: ReactElement<{ endIcon?: ReactNode }>;
	keepOpen?: boolean;
	manualWidth?: boolean;
	popoverProps?: MenuPopoverProps;
	'aria-label'?: string;
};

type MenuSectionHeaderProps = Omit<ReactAriaMenuItemProps, 'children' | 'className' | 'isDisabled'> & {
	children?: ReactNode;
	className?: string;
	hidden?: boolean;
};

const isSubMenuItem = (child: ReactNode) => {
	if (!isValidElement(child) || typeof child.type === 'string') {
		return false;
	}

	return 'displayName' in child.type && child.type.displayName === 'SubMenuItem';
};

export const Menu = (props: MenuProps) => {
	const {
		children,
		triggerLabel,
		triggerIcon = !triggerLabel ? hamburgerMenu : undefined,
		triggerProps,
		popoverProps,
		tooltip,
		keepOpen = false,
		'aria-label': ariaLabel = typeof triggerLabel === 'string' ? triggerLabel : __('Menu', 'eightshift-ui-components'),
		openOnLongPress = false,
		disabled,
		manualWidth,
		hidden,
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const triggerBehavior = openOnLongPress ? { trigger: 'longPress' as const } : undefined;
	const keepOpenProps = keepOpen
		? {
				selectionMode: 'multiple' as const,
				selectedKeys: new Set<never>(),
				onSelectionChange: () => {},
				items: [] as never[],
			}
		: undefined;

	const hasSubmenuItems = Children.toArray(children).some(isSubMenuItem);
	const resolvedPopoverProps = popoverProps ?? ({} as MenuPopoverProps);
	const { className: popoverClassName, wrapperClassName: popoverWrapperClassName, popoverProps: nestedPopoverProps, ...otherPopoverProps } = resolvedPopoverProps;

	return (
		<MenuTrigger
			{...other}
			{...triggerBehavior}
		>
			<Button
				icon={triggerIcon}
				tooltip={tooltip}
				disabled={disabled}
				{...triggerProps}
			>
				{triggerLabel}
			</Button>
			<Popover
				aria-label={ariaLabel}
				popoverProps={{
					maxHeight: Math.max(240, window.innerHeight * 0.42),
					...nestedPopoverProps,
				}}
				{...otherPopoverProps}
				className={clsx('es:p-1.5 es:any-focus:outline-hidden', !manualWidth && 'es:w-56', manualWidth && 'es:max-w-80', popoverClassName)}
				wrapperClassName={clsx(!hasSubmenuItems && 'es:overflow-y-auto', popoverWrapperClassName)}
			>
				<ReactAriaMenu
					className='es:outline-hidden'
					{...other}
					{...keepOpenProps}
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</MenuTrigger>
	);
};

export const MenuSection = (props: MenuSectionProps) => {
	const { children, label } = props;

	return (
		<>
			<MenuSectionHeader hidden={!label}>{label}</MenuSectionHeader>
			<ReactAriaMenuSection className='es:flex es:flex-col es:gap-1'>{children}</ReactAriaMenuSection>
			<MenuSeparator className='es:last:hidden' />
		</>
	);
};

export const MenuSeparator = ({ className }: MenuSeparatorProps) => {
	return <ReactAriaSeparator className={clsx('es:my-1.5 es:w-fill es:h-px es:bg-surface-500/15 es:mx-1.5 es:rounded-full', className)} />;
};

export const MenuItem = (props: MenuItemProps) => {
	const {
		icon,
		children,
		subtitle,
		checked,
		selected,
		disabled,
		endIcon,
		onClick,
		onClickNative = (event) => event.stopPropagation(),
		shortcut,
		danger,
		primary,
		className,
		'aria-label': ariaLabel = typeof children === 'string' ? children : __('Menu item', 'eightshift-ui-components'),
		hidden,
		...other
	} = props;

	if (hidden) {
		return null;
	}

	let itemIcon = icon;

	if (checked === true) {
		itemIcon = menuItemCheck;
	} else if (selected === true) {
		itemIcon = menuItemCircle;
	} else if (selected === false || checked === false) {
		itemIcon = dummySpacer;
	}

	return (
		<ReactAriaMenuItem
			{...other}
			aria-label={ariaLabel}
			isDisabled={disabled}
			className={clsx(
				'es:flex es:min-w-44 es:min-h-10 es:items-center es:gap-1.5',
				'es:select-none es:rounded-xl es:py-1 es:px-3 es:text-sm es:transition',
				'es:any-focus:outline-hidden',
				'es:icon:shrink-0',
				!disabled && 'es:inset-ring-0',
				!disabled && 'es:focus-visible:inset-ring',
				!disabled &&
					!(danger || primary) &&
					'es:hover:bg-surface-600/5 es:focus-visible:inset-ring-secondary-950/10 es:focus-visible:bg-secondary-950/5 es:contrast-more:focus-visible:bg-accent-800',
				!disabled &&
					danger &&
					'es:hover:bg-red-500/5 es:focus-visible:inset-ring-red-600/30 es:focus-visible:bg-red-600/5 es:hover:text-red-900 es:focus-visible:text-red-950 es:contrast-more:focus-visible:bg-red-800',
				!disabled &&
					primary &&
					'es:hover:bg-accent-600/6 es:focus-visible:inset-ring-accent-600/20 es:focus-visible:bg-accent-600/5 es:hover:text-accent-900 es:focus-visible:text-accent-950 es:contrast-more:focus-visible:bg-accent-700',
				!disabled && 'es:contrast-more:focus-visible:text-white! es:contrast-more:focus-visible:icon:text-white!',
				disabled ? 'es:text-surface-400' : 'es:text-surface-700',
				className,
			)}
			onAction={onClick}
			onClick={onClickNative}
		>
			<RichLabel
				icon={itemIcon}
				label={children}
				subtitle={subtitle}
				iconClassName={clsx(danger && 'es:not-contrast-more:icon:text-red-700!', primary && 'es:not-contrast-more:icon:text-accent-700!')}
				noColor
			/>

			{shortcut ? <div className='es:ml-auto es:pl-2 es:text-[0.6875rem] es:tracking-tight es:text-surface-400 es:contrast-more:text-current es:shrink-0'>{shortcut}</div> : null}
			{endIcon ? <div className={clsx('es:shrink-0 es:icon:shrink-0', !shortcut && 'es:ml-auto es:pl-2')}>{endIcon}</div> : null}
		</ReactAriaMenuItem>
	);
};

export const SubMenuItem = (props: SubMenuItemProps) => {
	const { children, trigger, popoverProps, keepOpen, manualWidth, 'aria-label': ariaLabel } = props;

	const keepOpenProps = keepOpen
		? {
				selectionMode: 'multiple' as const,
				selectedKeys: new Set<never>(),
				onSelectionChange: () => {},
				items: [] as never[],
			}
		: undefined;

	return (
		<SubmenuTrigger>
			{cloneElement(trigger, {
				endIcon: <span className='es:text-surface-500 es:contrast-more:text-current es:icon:size-3! es:icon:stroke-2!'>{chevronRight}</span>,
			})}
			<Popover
				aria-label={ariaLabel ?? __('Submenu', 'eightshift-ui-components')}
				offset={-1}
				{...popoverProps}
				className={clsx('es:font-sans', 'es:any-focus:outline-hidden', !manualWidth && 'es:w-56', manualWidth && 'es:max-w-80', popoverProps?.className)}
			>
				<ReactAriaMenu
					aria-label={ariaLabel ?? __('Submenu', 'eightshift-ui-components')}
					className='es:any-focus:outline-hidden'
					{...keepOpenProps}
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</SubmenuTrigger>
	);
};

SubMenuItem.displayName = 'SubMenuItem';

export const MenuSectionHeader = (props: MenuSectionHeaderProps) => {
	const { children, className, hidden, ...other } = props;

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaMenuItem
			{...other}
			className={clsx(
				'es:mx-1 es:px-1 es:pt-1.5 es:pb-2 es:first:pt-2 es:flex es:min-w-44 es:items-center es:gap-1.5 es:font-variation-["wdth"_76,"wght"_325,"ROND"_100]',
				'es:select-none es:text-13',
				'es:icon:shrink-0',
				'es:text-surface-500',
				className,
			)}
			isDisabled
		>
			{children}
		</ReactAriaMenuItem>
	);
};

MenuSectionHeader.displayName = 'MenuSectionHeader';
