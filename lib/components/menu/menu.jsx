import { Menu as ReactAriaMenu, MenuItem as ReactAriaMenuItem, MenuTrigger, Separator as ReactAriaSeparator, Section, Header, SubmenuTrigger } from 'react-aria-components';
import { icons } from '../../icons/icons';
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { clsx } from 'clsx/lite';

import { cloneElement } from 'react';
import { __ } from '@wordpress/i18n';

/**
 * A simple menu component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.triggerLabel] - The label of the trigger button.
 * @param {JSX.Element} [props.triggerIcon] - The icon of the trigger button.
 * @param {Object} [props.triggerProps] - Props to pass to the trigger button.
 * @param {string} [props.tooltip] - Tooltip text to display on the trigger button.
 * @param {boolean} [props.keepOpen=false] - If `true`, the menu will not close when an item is selected.
 * @param {boolean} [props.openOnLongPress=false] - If `true`, the menu will open on long press instead of click. If enabled, a regular `onPress` event can also be passed to the trigger button to enable dual behavior.
 * @param {Object} [props.popoverProps] - Props to pass to the popover.
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
				{...triggerProps}
			>
				{triggerLabel}
			</Button>
			<Popover
				className='!es-uic-p-0 focus:es-uic-outline-none'
				aria-label={ariaLabel}
				wrapperClassName={clsx(!hasSubmenuItems && 'es-uic-overflow-y-auto')}
				{...popoverProps}
			>
				<ReactAriaMenu
					aria-label={ariaLabel}
					className='es-uic-outline-none'
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
		<Section
			className={clsx(
				'es-uic-space-y-1 es-uic-border-b es-uic-border-b-gray-200 es-uic-pb-1 last:es-uic-border-b-0',
				label && 'es-uic-pt-2 first:es-uic-pt-1.5',
				!label && 'last:es-uic-pb-1',
			)}
		>
			{label && <Header className='es-uic-ml-1.5 es-uic-text-xs es-uic-font-medium es-uic-text-gray-400'>{label}</Header>}
			{children}
		</Section>
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
export const MenuSeparator = () => {
	return <ReactAriaSeparator className='es-uic-mb-1 es-uic-border-b es-uic-border-gray-300' />;
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
 * @param {Function} [props.onClick] - Function to run when the item is clicked.
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
		checked,
		selected,
		disabled,
		endIcon,
		onClick,
		shortcut,
		className,
		'aria-label': ariaLabel = typeof children === 'string' ? children : __('Menu item', 'eightshift-ui-components'),
	} = props;

	return (
		<ReactAriaMenuItem
			{...props}
			aria-label={ariaLabel}
			isDisabled={disabled}
			className={clsx(
				'es-uic-mx-1 es-uic-mb-1 es-uic-flex es-uic-min-w-40 es-uic-items-center es-uic-gap-1.5',
				'first:es-uic-mt-1 [&>svg]:es-uic-size-5 [&>svg]:es-uic-text-gray-500',
				'es-uic-select-none es-uic-rounded es-uic-border es-uic-border-transparent es-uic-px-1 es-uic-py-1.5 es-uic-text-sm es-uic-transition',
				'hover:es-uic-bg-gray-100',
				'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
				disabled ? 'es-uic-text-gray-400' : 'es-uic-text-gray-800',
				className,
			)}
			onAction={onClick}
		>
			{checked === true && icons.menuItemCheck}
			{selected === true && icons.menuItemCircle}
			{(selected === false || checked === false) && icons.dummySpacer}
			{icon}
			{children}
			{shortcut && <div className='es-uic-ml-auto es-uic-pl-2 es-uic-text-[0.6875rem] es-uic-tracking-tight es-uic-text-gray-400'>{shortcut}</div>}
			{endIcon && <div className={clsx(!shortcut && 'es-uic-ml-auto es-uic-pl-2')}>{endIcon}</div>}
		</ReactAriaMenuItem>
	);
};

/**
 * A supplementary menu item that triggers a submenu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.trigger - The trigger button for the submenu. **This should be a `MenuItem`.**
 * @param {Object} [props.popoverProps] - Props to pass to the popover.
 *
 * @returns {JSX.Element} The SubMenuItem component.
 *
 * @see {@link Menu} for usage example.
 *
 * @preserve
 */
export const SubMenuItem = (props) => {
	const { children, trigger, popoverProps } = props;

	return (
		<SubmenuTrigger>
			{cloneElement(trigger, {
				endIcon: <span className='es-uic-text-gray-400'>{icons.caretRightFill}</span>,
			})}
			<Popover
				aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-ui-components')}
				className='!es-uic-p-0 focus:es-uic-outline-none'
				offset={-1}
				{...popoverProps}
			>
				<ReactAriaMenu
					aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-ui-components')}
					className='focus:es-uic-outline-none'
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</SubmenuTrigger>
	);
};

SubMenuItem.displayName = 'SubMenuItem';
