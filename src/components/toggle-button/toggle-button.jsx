import { ToggleButton as ReactAriaToggleButton } from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { Tooltip } from '../tooltip/tooltip';

export const ToggleButton = (props) => {
	const {
		children,
		icon,
		size = 'default',
		type = 'default',
		disabled,
		className,
		tooltip,
		selected,
		onChange,
		wrapperClassName,
		...other
	} = props;

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
			selected:
				'bg-teal-600 text-white border-teal-600 after:opacity-30 border shadow-md shadow-teal-500/25',
			selectedHover: 'hover:shadow-teal-600/50 hover:after:opacity-40',
			focus: ' focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
			disabled: 'disabled:border-gray-200 disabled:text-gray-300',
		},
		ghost: {
			regular: 'border-transparent text-gray-700',
			hover: 'hover:bg-gray-100',
			disabled: 'disabled:text-gray-300 disabled:border-transparent',
			selected:
				'bg-teal-600 text-white border-teal-600 after:opacity-30 shadow shadow-teal-500/25',
			selectedHover: 'hover:shadow-teal-600/50 hover:after:opacity-40',
		},
	};

	const component = (
		<ReactAriaToggleButton
			isSelected={selected}
			onChange={onChange}
			isDisabled={disabled}
			className={({ isSelected }) =>
				classnames(
					'isolate flex items-center justify-center gap-1 rounded-md transition duration-300',
					'relative after:absolute after:inset-0 after:-z-10 after:rounded-[0.3125rem] after:bg-gradient-to-br after:from-teal-100/40 after:via-transparent after:to-teal-200/50 after:opacity-0 after:transition-opacity after:content-[""]',
					'disabled:shadow-none',
					'focus:outline-none focus-visible:outline-none focus-visible:ring',
					!disabled && !isSelected && (themes[type]?.regular ?? themes.default.regular),
					!disabled && !isSelected && (themes[type]?.hover ?? themes.default.hover),
					!disabled && isSelected && (themes[type]?.selectedHover ?? themes.default.selectedHover),
					themes[type]?.disabled ?? themes.default.disabled,
					themes[type]?.focus ?? themes.default.focus,
					icon && !children && sizes[size].iconButton,
					children && 'text-sm',
					children && sizes[size].button,
					children && icon && sizes[size].iconButtonPadding,
					children && !icon && sizes[size].buttonPadding,
					sizes[size].iconSize,
					isSelected && (themes[type]?.selected ?? themes.default.selected),
					'[.button-group_&:not(:first-child)]:rounded-l-none [.button-group_&:not(:last-child)]:-mr-px [.button-group_&:not(:last-child)]:rounded-r-none',
					'[.button-group_&:not(:first-child)]:after:rounded-l-none [.button-group_&:not(:last-child)]:after:rounded-r-none',
					'[.button-group_div:not(:first-child)_>_&]:rounded-l-none [.button-group_div:not(:last-child)_>_&]:-mr-px [.button-group_div:not(:last-child)_>_&]:rounded-r-none',
					'[.button-group_div:not(:last-child)_>_&]after::rounded-r-none [.button-group_div:not(:first-child)_>_&]:after:rounded-l-none',
					className,
				)
			}
			{...other}
		>
			{icon}
			{children}
		</ReactAriaToggleButton>
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
