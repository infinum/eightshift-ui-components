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
		...other
	} = props;

	const objRef = useObjectRef(forwardedRef);

	const sizes = {
		small: {
			iconButton: 'size-6',
			button: 'h-6 min-w-6',
			iconButtonPadding: 'px-1',
			buttonPadding: 'px-2',
			iconSize: '[&>svg]:size-4',
		},
		default: {
			iconButton: 'size-8',
			button: 'h-8 min-w-8',
			iconButtonPadding: 'px-1.5',
			buttonPadding: 'px-2',
			iconSize: '[&>svg]:size-5.5',
		},
		large: {
			iconButton: 'size-10',
			button: 'h-10 min-w-10',
			iconButtonPadding: 'px-2',
			buttonPadding: 'px-4',
			iconSize: '[&>svg]:size-6',
		},
	};

	const themes = {
		default: {
			regular: 'border-gray-300 text-gray-700 shadow-sm border',
			hover: 'hover:border-gray-300 hover:bg-gray-100',
			disabled: 'disabled:border-gray-200 disabled:text-gray-300 border',
			focus: 'focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
		},
		selected: {
			regular: 'border-teal-600 bg-teal-50 text-gray-900 shadow-sm z-10 border',
			hover: 'hover:border-teal-600 hover:bg-teal-100/50',
		},
		ghost: {
			regular: 'border-transparent text-gray-700',
			hover: 'hover:bg-gray-100',
			disabled: 'disabled:text-gray-300 disabled:border-transparent',
		},
		danger: {
			regular:
				'border-red-300 text-gray-700 text-gray-900 shadow-red-300/30 [&>svg]:text-red-500 shadow-sm border',
			hover: 'hover:border-red-400 hover:bg-red-50 hover:text-red-500 hover:shadow-red-300/75',
			focus: 'focus-visible:ring-red-500 focus-visible:ring-opacity-50',
		},
	};

	const component = (
		<ReactAriaButton
			onPress={onClick || onPress}
			isDisabled={disabled}
			className={classnames(
				'flex items-center justify-center gap-1 rounded-md transition duration-300',
				!disabled && themes[type]?.regular,
				!disabled && themes[type]?.hover,
				'disabled:shadow-none',
				themes[type]?.disabled ?? themes.default.disabled,
				'focus:outline-none focus-visible:outline-none focus-visible:ring',
				themes[type]?.focus ?? themes.default.focus,
				icon && !children && sizes[size].iconButton,
				children && 'text-sm',
				children && sizes[size].button,
				children && icon && sizes[size].iconButtonPadding,
				children && !icon && sizes[size].buttonPadding,
				'[.button-group_&:not(:first-child)]:rounded-l-none [.button-group_&:not(:last-child)]:-mr-px [.button-group_&:not(:last-child)]:rounded-r-none',
				'[.button-group_div:not(:first-child)_>_&]:rounded-l-none [.button-group_div:not(:last-child)_>_&]:-mr-px [.button-group_div:not(:last-child)_>_&]:rounded-r-none',
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
		>
			{component}
		</Tooltip>
	);
};
