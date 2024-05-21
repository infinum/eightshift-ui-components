import { Dialog, DialogTrigger, Popover as ReactAriaPopover } from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { __ } from '@wordpress/i18n';
import { Button } from '../button/button';

export const Popover = (props) => {
	const {
		children,

		triggerRef,
		openByDefault,

		isOpen,
		onOpenChange,

		placement,

		className,

		style,

		offset,
		crossOffset,
		containerPadding,

		shouldFlip,
		shouldCloseOnInteractOutside = () => true,

		...other
	} = props;

	return (
		<ReactAriaPopover
			shouldFlip={shouldFlip}
			shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
			triggerRef={triggerRef}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			defaultOpen={openByDefault}
			placement={placement}
			offset={offset}
			crossOffset={crossOffset}
			containerPadding={containerPadding}
			className={({ isEntering, isExiting }) =>
				classnames(
					'es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow-lg es-uic-outline-none',
					isEntering && 'es-uic-animate-slideDownAndFade',
					isExiting && 'es-uic-animate-slideUpAndFadeOut',
					'es-uic-p-1 es-uic-text-sm',
					className,
				)
			}
			style={style}
		>
			<Dialog
				className='es-uic-outline-none'
				{...other}
			>
				{children}
			</Dialog>
		</ReactAriaPopover>
	);
};

export const TriggeredPopover = (props) => {
	const {
		trigger,
		triggerButtonLabel,

		children,

		onOpenChange,
		openByDefault,

		placement,

		style,
		className,

		offset,
		crossOffset,
		containerPadding,
	} = props;

	return (
		<DialogTrigger onOpenChange={onOpenChange}>
			{trigger}
			{!trigger && <Button>{triggerButtonLabel ?? __('Open', 'eightshift-components')}</Button>}
			<Popover
				placement={placement}
				openByDefault={openByDefault}
				offset={offset}
				crossOffset={crossOffset}
				containerPadding={containerPadding}
				className={className}
				style={style}
			>
				{children}
			</Popover>
		</DialogTrigger>
	);
};
