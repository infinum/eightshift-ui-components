import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Button } from '../button/button';
import { HStack } from '../layout/hstack';
import { VStack } from '../layout/vstack';
import { TriggeredPopover } from '../popover/popover';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

export type PromptPopoverType = 'default' | 'ai' | 'danger' | 'success';

type PromptPopoverAction = (close: () => void, event: Parameters<NonNullable<ComponentPropsWithoutRef<typeof Button>['onPress']>>[0]) => void;

type TriggeredPopoverWithCloseProps = Omit<ComponentPropsWithoutRef<typeof TriggeredPopover>, 'children'> & {
	children?: ReactNode | ((props: { close: () => void }) => ReactNode);
};

const TypedTriggeredPopover = TriggeredPopover as (props: TriggeredPopoverWithCloseProps) => ReactNode;

export type PromptPopoverProps = Omit<ComponentPropsWithoutRef<typeof TriggeredPopover>, 'children' | 'triggerButtonIcon' | 'triggerButtonProps'> & {
	/** Content to display between the label and action buttons. */
	children?: ReactNode;
	/** Additional props for the trigger button. */
	triggerButtonProps?: ComponentPropsWithoutRef<typeof Button>;
	/** Additional props for the primary action button. */
	primaryProps?: ComponentPropsWithoutRef<typeof Button>;
	/** Additional props for the secondary action button. */
	secondaryProps?: ComponentPropsWithoutRef<typeof Button>;
	/** Icon for the trigger button. */
	triggerButtonIcon?: ReactNode;
	/** Label for the prompt. */
	label?: ReactNode;
	/** Subtitle for the prompt. */
	subtitle?: ReactNode;
	/** Icon for the prompt label. */
	icon?: ReactNode;
	/** Visual type of the prompt. Defaults to `'default'`. */
	type?: PromptPopoverType;
	/** Function to call when the primary action is pressed. */
	onPrimary?: PromptPopoverAction;
	/** Function to call when the secondary action is pressed. */
	onSecondary?: PromptPopoverAction;
	/** Label for the primary action. */
	primaryLabel?: ReactNode;
	/** Label for the secondary action. */
	secondaryLabel?: ReactNode;
	/** Tooltip and accessible label for the trigger button. */
	tooltip?: ReactNode;
	/** Additional actions to display before the primary and secondary actions. */
	additionalActions?: ReactNode;
	/** If `true`, action buttons are arranged vertically. Defaults to `false`. */
	verticalActions?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** If `true`, the secondary action is not rendered. Defaults to `false`. */
	hideSecondary?: boolean;
	/** Additional props for the underlying triggered popover. */
	popoverProps?: Omit<ComponentPropsWithoutRef<typeof TriggeredPopover>, 'children' | 'triggerButtonIcon' | 'triggerButtonProps'>;
};

const typeClassNames: Record<PromptPopoverType, string> = {
	default: '',
	ai: 'es-uic-theme-purple',
	danger: 'es-uic-theme-red',
	success: 'es-uic-theme-green',
};

/**
 * A confirmation prompt displayed in a triggered popover.
 *
 * @component
 * @param {PromptPopoverProps} props - Component props.
 *
 * @returns {JSX.Element} The PromptPopover component.
 */
export const PromptPopover = (props: Prettify<PromptPopoverProps>) => {
	const {
		children,
		triggerButtonProps = {},
		primaryProps = {},
		secondaryProps = {},
		triggerButtonIcon,
		type = 'default',
		onPrimary,
		onSecondary,
		primaryLabel,
		secondaryLabel = __('Cancel', 'eightshift-ui-components'),
		tooltip,
		label,
		subtitle,
		icon,
		additionalActions,
		verticalActions = false,
		hidden,
		hideSecondary,
		popoverProps,
		...rest
	} = props;

	if (hidden) {
		return null;
	}

	const typeClassName = typeClassNames[type];
	const StackComponent = verticalActions ? VStack : HStack;
	const triggerAriaLabel = typeof tooltip === 'string' ? tooltip : undefined;

	return (
		<TypedTriggeredPopover
			className='es:w-60! es:p-3!'
			triggerButtonIcon={triggerButtonIcon}
			triggerButtonProps={{ 'aria-label': triggerAriaLabel, tooltip, className: typeClassName, ...triggerButtonProps }}
			wrapperClassName={typeClassName}
			showArrow
			{...rest}
			{...popoverProps}
		>
			{({ close }) => (
				<>
					<RichLabel
						label={label}
						subtitle={subtitle}
						icon={icon}
						labelClassName={children ? 'es:text-sm' : undefined}
						noColor
					/>

					{children && <div className='es:mt-3'>{children}</div>}

					<StackComponent
						className='es:mt-3'
						noWrap
					>
						{additionalActions}

						<Button
							type='outline'
							onPress={onSecondary ? (event) => onSecondary(close, event) : () => close()}
							className={clsx(!verticalActions && 'es:flex-1')}
							hidden={hideSecondary}
							{...secondaryProps}
						>
							{secondaryLabel}
						</Button>
						<Button
							type='selected'
							onPress={onPrimary ? (event) => onPrimary(close, event) : () => close()}
							className={!verticalActions ? 'es:flex-1' : undefined}
							{...primaryProps}
						>
							{primaryLabel}
						</Button>
					</StackComponent>
				</>
			)}
		</TypedTriggeredPopover>
	);
};
