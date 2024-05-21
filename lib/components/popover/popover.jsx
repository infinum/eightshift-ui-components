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
					'rounded-md border border-gray-200 bg-white shadow-lg outline-none',
					isEntering && 'animate-slideDownAndFade',
					isExiting && 'animate-slideUpAndFadeOut',
					className ?? 'p-1 text-sm',
				)
			}
			style={style}
		>
			<Dialog
				className='outline-none'
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
