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
			regular: 'es-uic-border-gray-300 es-uic-text-gray-700 es-uic-shadow-sm es-uic-border',
			hover: 'hover:es-uic-border-gray-300 hover:es-uic-bg-gray-100',
			selected:
				'es-uic-bg-teal-600 es-uic-text-white es-uic-border-teal-600 after:es-uic-opacity-30 es-uic-border es-uic-shadow-md es-uic-shadow-teal-500/25',
			selectedHover: 'hover:es-uic-shadow-teal-600/50 hover:after:es-uic-opacity-40',
			focus: ' focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
			disabled: 'disabled:es-uic-border-gray-200 disabled:es-uic-text-gray-300',
		},
		ghost: {
			regular: 'es-uic-border-transparent es-uic-text-gray-700',
			hover: 'hover:es-uic-bg-gray-100',
			disabled: 'disabled:es-uic-text-gray-300 disabled:es-uic-border-transparent',
			selected:
				'es-uic-bg-teal-600 es-uic-text-white es-uic-border-teal-600 after:es-uic-opacity-30 es-uic-shadow es-uic-shadow-teal-500/25',
			selectedHover: 'hover:es-uic-shadow-teal-600/50 hover:after:es-uic-opacity-40',
		},
	};

	const component = (
		<ReactAriaToggleButton
			isSelected={selected}
			onChange={onChange}
			isDisabled={disabled}
			className={({ isSelected }) =>
				classnames(
					'es-uic-isolate es-uic-flex es-uic-items-center es-uic-justify-center es-uic-gap-1 es-uic-rounded-md es-uic-transition es-uic-duration-300 es-uic-relative',
					'after:es-uic-absolute after:es-uic-inset-0 after:-es-uic-z-10 after:es-uic-rounded-[0.3125rem] after:es-uic-bg-gradient-to-br after:es-uic-from-teal-100/40 after:es-uic-via-transparent after:es-uic-to-teal-200/50 after:es-uic-opacity-0 after:es-uic-transition-opacity after:es-uic-content-[""]',
					'disabled:es-uic-shadow-none',
					'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring',
					!disabled && !isSelected && (themes[type]?.regular ?? themes.default.regular),
					!disabled && !isSelected && (themes[type]?.hover ?? themes.default.hover),
					!disabled && isSelected && (themes[type]?.selectedHover ?? themes.default.selectedHover),
					themes[type]?.disabled ?? themes.default.disabled,
					themes[type]?.focus ?? themes.default.focus,
					icon && !children && sizes[size].iconButton,
					children && 'es-uic-text-sm',
					children && sizes[size].button,
					children && icon && sizes[size].iconButtonPadding,
					children && !icon && sizes[size].buttonPadding,
					sizes[size].iconSize,
					isSelected && (themes[type]?.selected ?? themes.default.selected),
					'[.es-uic-button-group_&:not(:first-child)]:es-uic-rounded-l-none [.es-uic-button-group_&:not(:last-child)]:-es-uic-mr-px [.es-uic-button-group_&:not(:last-child)]:es-uic-rounded-r-none',
					'[.es-uic-button-group_&:not(:first-child)]:after:es-uic-rounded-l-none [.es-uic-button-group_&:not(:last-child)]:after:es-uic-rounded-r-none',
					'[.es-uic-button-group_div:not(:first-child)_>_&]:es-uic-rounded-l-none [.es-uic-button-group_div:not(:last-child)_>_&]:-es-uic-mr-px [.es-uic-button-group_div:not(:last-child)_>_&]:es-uic-rounded-r-none',
					'[.es-uic-button-group_div:not(:last-child)_>_&]after:es-uic-rounded-r-none [.es-uic-button-group_div:not(:first-child)_>_&]:after:es-uic-rounded-l-none',
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
