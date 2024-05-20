import {
	Menu as ReactAriaMenu,
	MenuItem as ReactAriaMenuItem,
	MenuTrigger,
	Separator as ReactAriaSeparator,
	Section,
	Header,
	SubmenuTrigger,
} from 'react-aria-components';
import { icons } from '../icons/icons';
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { classnames } from '../../utilities/classnames';
import { cloneElement } from 'react';
import { __ } from '@wordpress/i18n';

export const Menu = (props) => {
	const {
		children,
		triggerIcon = icons.hamburgerMenu,
		triggerLabel,
		triggerProps,
		tooltip,

		keepOpen = false,

		openOnLongPress = false,
	} = props;

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
				className='focus:outline-none'
				aria-label={props['aria-label'] ?? __('Menu', 'eightshift-components')}
			>
				<ReactAriaMenu
					className='focus:outline-none'
					{...props}
					{...additionalProps}
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</MenuTrigger>
	);
};

export const MenuSection = (props) => {
	const { children, label } = props;
	return (
		<Section
			className={classnames(
				'space-y-1 border-b pb-1 last:border-b-0',
				label && 'pt-2 first:pt-1.5',
				!label && 'last:pb-0',
			)}
		>
			{label && <Header className='ml-1.5 text-xs font-medium text-gray-400'>{label}</Header>}
			{children}
		</Section>
	);
};

export const MenuSeparator = () => {
	return <ReactAriaSeparator className=' mb-1 border-b border-gray-300' />;
};

export const MenuItem = (props) => {
	const { icon, children, checked, selected, disabled, endIcon, onClick, shortcut, className } =
		props;
	return (
		<ReactAriaMenuItem
			{...props}
			isDisabled={disabled}
			className={classnames(
				'mx-1 mb-1 flex min-w-40 items-center gap-1.5 first:mt-1 [&>svg]:size-5 [&>svg]:text-gray-500',
				'select-none rounded border border-transparent px-1 py-1.5 text-sm text-gray-800 transition hover:bg-gray-100 focus:outline-none',
				'focus:outline-none focus-visible:outline-none focus-visible:ring',
				'focus-visible:border-teal-600 focus-visible:ring-teal-600 focus-visible:ring-opacity-25',
				className,
			)}
			onAction={onClick}
		>
			{checked === true && icons.menuItemCheck}
			{selected === true && icons.menuItemCircle}
			{(selected === false || checked === false) && icons.dummySpacer}
			{icon}
			{children}
			{shortcut && (
				<div className='ml-auto text-[0.6875rem] tracking-tight text-gray-400'>{shortcut}</div>
			)}
			{endIcon && <div className={classnames(!shortcut && 'ml-auto')}>{endIcon}</div>}
		</ReactAriaMenuItem>
	);
};

export const SubMenuItem = (props) => {
	const { children, trigger } = props;

	return (
		<SubmenuTrigger>
			{cloneElement(trigger, {
				endIcon: <span className='text-gray-400'>{icons.caretRightFill}</span>,
			})}
			<Popover
				aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-components')}
				className='focus:outline-none'
				offset={-1}
			>
				<ReactAriaMenu
					aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-components')}
					className='focus:outline-none'
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</SubmenuTrigger>
	);
};
