import {
	Menu as ReactAriaMenu,
	MenuItem as ReactAriaMenuItem,
	MenuTrigger,
	Separator as ReactAriaSeparator,
	MenuSection as ReactAriaMenuSection,
	SubmenuTrigger,
} from 'react-aria-components';
import { RichLabel } from '../rich-label/rich-label';
import { icons } from '../../icons/icons';
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { clsx } from 'clsx/lite';
import { cloneElement } from 'react';
import { __ } from '@wordpress/i18n';

/**
 * @typedef {import('../button/button').ButtonProps} ButtonProps
 * @typedef {import('../popover/popover').PopoverProps} PopoverProps
 *
 * @preserve
 * */

/**
 * A simple menu component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.triggerLabel] - The label of the trigger button.
 * @param {JSX.Element} [props.triggerIcon] - The icon of the trigger button.
 * @param {ButtonProps} [props.triggerProps] - Props to pass to the trigger button.
 * @param {string} [props.tooltip] - Tooltip text to display on the trigger button.
 * @param {boolean} [props.keepOpen=false] - If `true`, the menu will not close when an item is selected.
 * @param {boolean} [props.openOnLongPress=false] - If `true`, the menu will open on long press instead of click. If enabled, a regular `onPress` event can also be passed to the trigger button to enable dual behavior.
 * @param {PopoverProps} [props.popoverProps] - Props to pass to the popover.
 * @param {boolean} [props.disabled] - If `true`, the trigger button is disabled.
 * @param {boolean} [props.manualWidth=false] - If `true`, the popover will not have a fixed width.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Menu component.
 *
 * @example
 * <Menu>
 * 	<MenuSection label='Section 1'>
 * 		<MenuItem>Item 1</MenuItem>
 * 		<MenuItem>Item 2</MenuItem>
 * 	</MenuSection>
 * 	<MenuSection label='Section 2'>
 * 		<MenuItem>Item 3</MenuItem>
 * 		<MenuItem>Item 4</MenuItem>
 * 	</MenuSection>
 * </Menu>
 *
 * @example
 * <Menu>
 * 	<MenuItem>Item 1</MenuItem>
 * 	<MenuItem>Item 2</MenuItem>
 * 	<MenuSeparator />
 * 	<MenuItem>Item 3</MenuItem>
 * 	<MenuItem>Item 4</MenuItem>
 * </Menu>
 *
 * @example
 * <Menu>
 * 	<MenuItem>Item 1</MenuItem>
 * 	<MenuItem>Item 2</MenuItem>
 * 	<SubMenuItem
 * 		trigger={<MenuItem>Submenu</MenuItem>}
 * 	>
 * 		<MenuItem>Subitem 1</MenuItem>
 * 		<MenuItem>Subitem 2</MenuItem>
 * 	</SubMenuItem>
 * </Menu>
 *
 *
 * @preserve
 */
export const Menu = (props) => {
	const {
		children,

		triggerLabel,
		triggerIcon = !triggerLabel && icons.hamburgerMenu,
		triggerProps,

		popoverProps,

		tooltip,

		keepOpen = false,

		'aria-label': ariaLabel = triggerLabel ?? __('Menu', 'eightshift-ui-components'),

		openOnLongPress = false,

		disabled,

		manualWidth,

		hidden,
	} = props;

	if (hidden) {
		return null;
	}

	let additionalProps = {};

	if (keepOpen) {
		additionalProps = {
			...additionalProps,
			selectionMode: 'multiple',
			selectedKeys: [],
			onSelectionChange: () => {},
			items: [],
		};
	}

	if (openOnLongPress) {
		additionalProps.trigger = 'longPress';
	}

	const hasSubmenuItems = Array.isArray(children) ? children.some((child) => child?.type?.displayName === 'SubMenuItem') : children?.type?.displayName === 'SubMenuItem';

	return (
		<MenuTrigger
			{...props}
			{...additionalProps}
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
					...popoverProps,
				}}
				{...popoverProps}
				className={clsx('es:p-1.5 es:any-focus:outline-hidden', !manualWidth && 'es:w-56', manualWidth && 'es:max-w-80', popoverProps?.className)}
				wrapperClassName={clsx(!hasSubmenuItems && 'es:overflow-y-auto', popoverProps?.wrapperClassName)}
			>
				<ReactAriaMenu
					className='es:outline-hidden'
					{...props}
					{...additionalProps}
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</MenuTrigger>
	);
};

/**
 * A wrapper for `MenuItem` components that visually groups them and ensures proper keyboard navigation.
 *
 * **Important**: <MenuSection> cannot be mixed with other <MenuItem> in the top-level of the same menu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.label] - The label of the section.
 *
 * @returns {JSX.Element} The MenuSection component.
 *
 * @see {@link Menu} for usage example.
 *
 * @preserve
 */
export const MenuSection = (props) => {
	const { children, label } = props;

	return (
		<>
			<MenuSectionHeader hidden={!label}>{label}</MenuSectionHeader>
			<ReactAriaMenuSection className='es:flex es:flex-col es:gap-1'>{children}</ReactAriaMenuSection>
			<MenuSeparator className='es:last:hidden' />
		</>
	);
};

/**
 * A menu separator.
 *
 * @returns {JSX.Element} The MenuSeparator component.
 *
 * @see {@link Menu} for usage example.
 *
 * @preserve
 */
export const MenuSeparator = ({ className }) => {
	return <ReactAriaSeparator className={clsx('es:my-1.5 es:w-fill es:h-px es:bg-surface-500/15 es:mx-1.5 es:rounded-full', className)} />;
};

/**
 * A menu item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - The icon of the item.
 * @param {string} [props.shortcut] - A slot for text like the keyboard shortcut, displayed on the right side of the item.
 * @param {boolean} [props.checked] - If `true`, the item is marked as checked. This is visually represented by a checkmark icon.
 * @param {boolean} [props.selected] - If `true`, the item is marked as selected. This is visually represented by a circle.
 * @param {boolean} [props.disabled] - If `true`, the item will be disabled.
 * @param {JSX.Element} [props.endIcon] - The icon at the right side of the item.
 * @param {string|JSX.Element} [props.subtitle] - The subtitle below the main label.
 * @param {Function} [props.onClick] - Function to run when the item is clicked.
 * @param {boolean} [props.danger] - If `true`, the item appearance is tweaked to indicate a dangerous action.
 * @param {boolean} [props.primary] - If `true`, the item appearance is tweaked to indicate a primary action.
 * @param {string} [props.className] - Classes to pass to the menu item.
 *
 * @returns {JSX.Element} The MenuItem component.
 *
 * @see {@link Menu} for usage example.
 *
 * @preserve
 */
export const MenuItem = (props) => {
	const {
		icon,
		children,
		subtitle,
		checked,
		selected,
		disabled,
		endIcon,
		onClick,
		onClickNative = (event) => event?.stopPropagation(),
		shortcut,
		danger,
		primary,
		className,
		'aria-label': ariaLabel = typeof children === 'string' ? children : __('Menu item', 'eightshift-ui-components'),
	} = props;

	let itemIcon = icon;

	if (checked === true) {
		itemIcon = icons.menuItemCheck;
	} else if (selected === true) {
		itemIcon = icons.menuItemCircle;
	} else if (selected === false || checked === false) {
		itemIcon = icons.dummySpacer;
	}

	return (
		<ReactAriaMenuItem
			{...props}
			aria-label={ariaLabel}
			isDisabled={disabled}
			className={clsx(
				'es:flex es:min-w-44 es:min-h-10 es:items-center es:gap-1.5',
				'es:select-none es:rounded-xl es:py-1 es:px-3 es:text-sm es:transition',
				'es:any-focus:outline-hidden',
				'es:icon:shrink-0',
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

			{shortcut && <div className='es:ml-auto es:pl-2 es:text-[0.6875rem] es:tracking-tight es:text-surface-400 es:contrast-more:text-current es:shrink-0'>{shortcut}</div>}
			{endIcon && <div className={clsx('es:shrink-0 es:icon:shrink-0', !shortcut && 'es:ml-auto es:pl-2')}>{endIcon}</div>}
		</ReactAriaMenuItem>
	);
};

/**
 * A supplementary menu item that triggers a submenu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.trigger - The trigger button for the submenu. **This should be a `MenuItem`.**
 * @param {boolean} [props.keepOpen=false] - If `true`, the submenu will not close when an item is selected.
 * @param {boolean} [props.manualWidth=false] - If `true`, the popover will not have a fixed width.
 * @param {PopoverProps} [props.popoverProps] - Props to pass to the popover.
 *
 * @returns {JSX.Element} The SubMenuItem component.
 *
 * @see {@link Menu} for usage example.
 *
 * @preserve
 */
export const SubMenuItem = (props) => {
	const { children, trigger, popoverProps, keepOpen, manualWidth } = props;

	let additionalProps = {};

	if (keepOpen) {
		additionalProps = {
			...additionalProps,
			selectionMode: 'multiple',
			selectedKeys: [],
			onSelectionChange: () => {},
			items: [],
		};
	}

	return (
		<SubmenuTrigger>
			{cloneElement(trigger, {
				endIcon: <span className='es:text-surface-500 es:contrast-more:text-current es:icon:size-3! es:icon:stroke-2!'>{icons.chevronRight}</span>,
			})}
			<Popover
				aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-ui-components')}
				offset={-1}
				{...popoverProps}
				className={clsx('es:any-focus:outline-hidden', !manualWidth && 'es:w-56', manualWidth && 'es:max-w-80', popoverProps?.className)}
			>
				<ReactAriaMenu
					aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-ui-components')}
					className='es:any-focus:outline-hidden'
					{...additionalProps}
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</SubmenuTrigger>
	);
};

SubMenuItem.displayName = 'SubMenuItem';

/**
 * A decorative menu section header, used to label groups of menu items.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The MenuSectionHeader component.
 *
 * @example
 * <MenuSectionHeader>Section</MenuSectionHeader>
 *
 * @preserve
 */
export const MenuSectionHeader = (props) => {
	const {
		children,
		className,

		hidden,
	} = props;

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaMenuItem
			{...props}
			className={clsx(
				'es:mx-1 es:px-1 es:pt-1.5 es:pb-2 es:first:pt-2 es:flex es:min-w-44 es:items-center es:gap-1.5 es:font-variation-["wdth"_144,"wght"_350]',
				'es:select-none es:text-sm',
				'es:icon:shrink-0',
				'es:text-surface-500/80',
				className,
			)}
			isDisabled
		>
			{children}
		</ReactAriaMenuItem>
	);
};

MenuSectionHeader.displayName = 'MenuSectionHeader';
