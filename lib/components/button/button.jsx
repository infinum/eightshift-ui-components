import { useObjectRef } from 'react-aria';
import { Button as ReactAriaButton } from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { Tooltip } from '../tooltip/tooltip';

export const Button = (props) => {
	const {
		children,
		icon,
		size = 'default',
		type = 'default',
		disabled,
		className,
		tooltip,
		onClick,
		onPress,
		forwardedRef,
		wrapperClassName,
		tooltipProps,
		...other
	} = props;

	const objRef = useObjectRef(forwardedRef);

	const sizes = {
		small: {
			iconButton: 'es-uic-size-7',
			button: 'es-uic-h-7 es-uic-min-w-7',
			iconButtonPadding: 'es-uic-px-1',
			buttonPadding: 'es-uic-px-2',
			iconSize: '[&>svg]:es-uic-size-4',
		},
		default: {
			iconButton: 'es-uic-size-9',
			button: 'es-uic-h-9 es-uic-min-w-9',
			iconButtonPadding: 'es-uic-px-1.5',
			buttonPadding: 'es-uic-px-2',
			iconSize: '[&>svg]:es-uic-size-5.5',
		},
		large: {
			iconButton: 'es-uic-size-10',
			button: 'es-uic-h-10 es-uic-min-w-10',
			iconButtonPadding: 'es-uic-px-2',
			buttonPadding: 'es-uic-px-4',
			iconSize: '[&>svg]:es-uic-size-6',
		},
	};

	const themes = {
		default: {
			regular: 'es-uic-border-gray-300 es-uic-text-gray-700 es-uic-shadow-sm border',
			hover: 'hover:es-uic-border-gray-300 hover:es-uic-bg-gray-100',
			disabled: 'disabled:es-uic-border-gray-200 disabled:es-uic-text-gray-300 es-uic-border',
			focus: 'focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
		},
		selected: {
			regular: 'es-uic-border-teal-600 es-uic-bg-teal-50 es-uic-text-gray-900 es-uic-shadow-sm es-uic-z-10 es-uic-border',
			hover: 'hover:es-uic-border-teal-600 hover:es-uic-bg-teal-100/50',
		},
		ghost: {
			regular: 'es-uic-border-transparent es-uic-text-gray-700',
			hover: 'hover:es-uic-bg-gray-100',
			disabled: 'disabled:es-uic-text-gray-300 disabled:es-uic-border-transparent',
		},
		danger: {
			regular:
				'es-uic-border-red-300 es-uic-text-gray-700 es-uic-text-gray-900 es-uic-shadow-red-300/30 [&>svg]:es-uic-text-red-500 es-uic-shadow-sm es-uic-border',
			hover: 'hover:es-uic-border-red-400 hover:es-uic-bg-red-50 hover:es-uic-text-red-500 hover:es-uic-shadow-red-300/75',
			focus: 'focus-visible:es-uic-ring-red-500 focus-visible:es-uic-ring-opacity-50',
		},
	};

	const component = (
		<ReactAriaButton
			onPress={onClick || onPress}
			isDisabled={disabled}
			className={classnames(
				'es-uic-flex es-uic-items-center es-uic-justify-center es-uic-gap-1 es-uic-rounded-md es-uic-transition es-uic-duration-300',
				!disabled && themes[type]?.regular,
				!disabled && themes[type]?.hover,
				'disabled:es-uic-shadow-none',
				themes[type]?.disabled ?? themes.default.disabled,
				'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring',
				themes[type]?.focus ?? themes.default.focus,
				icon && !children && sizes[size].iconButton,
				children && 'es-uic-text-sm',
				children && sizes[size].button,
				children && icon && sizes[size].iconButtonPadding,
				children && !icon && sizes[size].buttonPadding,
				'[.es-uic-button-group_&:not(:first-child)]:es-uic-rounded-l-none [.es-uic-button-group_&:not(:last-child)]:-es-uic-mr-px [.es-uic-button-group_&:not(:last-child)]:es-uic-rounded-r-none',
				'[.es-uic-button-group_div:not(:first-child)_>_&]:es-uic-rounded-l-none [.es-uic-button-group_div:not(:last-child)_>_&]:-es-uic-mr-px [.es-uic-button-group_div:not(:last-child)_>_&]:es-uic-rounded-r-none',
				sizes[size].iconSize,
				className,
			)}
			ref={objRef}
			{...other}
		>
			{icon}
			{children}
		</ReactAriaButton>
	);

	if (!tooltip) {
		return component;
	}

	return (
		<Tooltip
			text={tooltip}
			wrapperClassName={wrapperClassName}
			{...tooltipProps}
		>
			{component}
		</Tooltip>
	);
};

export const ButtonGroup = ({ children, className }) => (
	<div className={classnames('es-uic-flex es-uic-button-group', className)}>{children}</div>
);
