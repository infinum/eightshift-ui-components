import {
	Menu as ReactAriaMenu,
	MenuItem as ReactAriaMenuItem,
	MenuTrigger,
	Separator as ReactAriaSeparator,
	Section,
	Header,
	SubmenuTrigger,
} from 'react-aria-components';
import { icons } from '../../icons/icons';
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

		'aria-label': ariaLabel = __('Menu', 'eightshift-components'),

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
				className='focus:es-uic-outline-none'
				aria-label={ariaLabel}
			>
				<ReactAriaMenu
					className='focus:es-uic-outline-none'
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
				'es-uic-space-y-1 es-uic-border-b es-uic-pb-1 last:es-uic-border-b-0',
				label && 'es-uic-pt-2 first:es-uic-pt-1.5',
				!label && 'last:es-uic-pb-0',
			)}
		>
			{label && <Header className='es-uic-ml-1.5 es-uic-text-xs es-uic-font-medium es-uic-text-gray-400'>{label}</Header>}
			{children}
		</Section>
	);
};

export const MenuSeparator = () => {
	return <ReactAriaSeparator className='es-uic-mb-1 es-uic-border-b es-uic-border-gray-300' />;
};

export const MenuItem = (props) => {
	const { icon, children, checked, selected, disabled, endIcon, onClick, shortcut, className } =
		props;
	return (
		<ReactAriaMenuItem
			{...props}
			isDisabled={disabled}
			className={classnames(
				'es-uic-mx-1 es-uic-mb-1 es-uic-flex es-uic-min-w-40 es-uic-items-center es-uic-gap-1.5',
				'first:es-uic-mt-1 [&>svg]:es-uic-size-5 [&>svg]:es-uic-text-gray-500',
				'es-uic-select-none es-uic-rounded es-uic-border es-uic-border-transparent es-uic-px-1 es-uic-py-1.5 es-uic-text-sm es-uic-text-gray-800 es-uic-transition',
				'hover:es-uic-bg-gray-100',
				'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
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
				<div className='es-uic-ml-auto es-uic-text-[0.6875rem] es-uic-tracking-tight es-uic-text-gray-400'>{shortcut}</div>
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
				endIcon: <span className='es-uic-text-gray-400'>{icons.caretRightFill}</span>,
			})}
			<Popover
				aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-components')}
				className='focus:es-uic-outline-none'
				offset={-1}
			>
				<ReactAriaMenu
					aria-label={props['aria-label'] ?? __('Submenu', 'eightshift-components')}
					className='focus:es-uic-outline-none'
				>
					{children}
				</ReactAriaMenu>
			</Popover>
		</SubmenuTrigger>
	);
};
