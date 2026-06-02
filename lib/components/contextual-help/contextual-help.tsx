import { __ } from '@wordpress/i18n';
import type { Prettify } from '../../utilities/types';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { DialogTrigger } from 'react-aria-components';
import { Button } from '../button/button';
import { Popover, type PopoverProps } from '../popover/popover';
import { clear, info, warning } from '../../icons';
import clsx from 'clsx';
import { RichLabel, type RichLabelProps } from '../rich-label/rich-label';
import { helpAlt } from '../../icons/ui-icons/help-alt';

type ContextualHelpProps = PopoverProps & {
	/** The icon for the built-in trigger button. */
	triggerButtonIcon?: ReactNode;
	/** The label for the built-in trigger button. */
	triggerButtonLabel?: ReactNode;
	/** Props to pass to the built-in trigger button. */
	triggerButtonProps?: ComponentPropsWithoutRef<typeof Button>;
	/** Type */
	type?: 'help' | 'info' | 'warning' | 'error';
	/** The content of the contextual help. */
	label?: ReactNode;
	/** The subtitle of the contextual help. (optional) */
	subtitle?: ReactNode;
	/** The icon of the contextual help. (optional) */
	icon?: ReactNode;
	/** Classes to pass to the popover label (if label, subtitle, or icon are used). */
	richLabelProps?: RichLabelProps;
};

const typeAriaLabels = {
	help: __('Help', 'eightshift-ui-components'),
	info: __('Info', 'eightshift-ui-components'),
	warning: __('Warning', 'eightshift-ui-components'),
	error: __('Error', 'eightshift-ui-components'),
};

const typeIcons = {
	help: helpAlt,
	info: info,
	warning: warning,
	error: clear,
};

/**
 * A component that displays contextual help in a popover when the user interacts with a trigger element (e.g., a button).
 * The popover can contain a label, subtitle, and icon, and is designed to provide additional information or guidance to users in a non-intrusive way.
 *
 * @component
 * @param {ContextualHelpProps} props - Component props.
 *
 * @returns {JSX.Element} The TriggeredPopover component.
 *
 * @example
 * <ContextualHelp
 * 	type='info'
 * 	label='This is some helpful information.'
 * 	subtitle='Additional details can go here.'
 * />
 *
 * @example
 * <ContextualHelp>
 * 	<RichLabel
 * 		icon={myIcon}
 * 		label='Custom help content'
 * 		subtitle='You can put any content here, not just text.'
 * 	/>
 * 	<div>Additional custom content can go here.</div>
 * </ContextualHelp>
 */
export const ContextualHelp = (props: Prettify<ContextualHelpProps>) => {
	const { triggerButtonIcon, triggerButtonLabel, triggerButtonProps, icon, label, subtitle, children, style, className, hidden, richLabelProps, type = 'help', ...rest } = props;

	if (hidden) {
		return null;
	}

	return (
		<DialogTrigger>
			<Button
				icon={triggerButtonIcon || typeIcons?.[type] || typeIcons.help}
				aria-label={typeAriaLabels?.[type] || typeAriaLabels.help}
				type='simple'
				size='small'
				className='es:rounded-full! es:p-0! es:size-6! es:icon:size-4!'
				{...triggerButtonProps}
			>
				{triggerButtonLabel}
			</Button>
			<Popover
				placement={'bottom start'}
				offset={8}
				crossOffset={-8}
				className={clsx('es:p-3.5 es:flex es:flex-col es:gap-2 es:max-w-56!', className)}
				style={style}
				showArrow
				{...rest}
			>
				{(icon || label || subtitle) && (
					<RichLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
						iconClassName='es:text-surface-500'
						subtitleClassName='es:pt-0.75'
						{...richLabelProps}
					/>
				)}

				{children}
			</Popover>
		</DialogTrigger>
	);
};
