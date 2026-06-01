import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode, useContext } from 'react';
import type { Prettify } from '../../utilities/types';

import { copy, dropdownCaretAlt, moreH, trash } from '../../icons/internal';
import { Button } from '../button/button';
import { Expandable } from '../expandable/expandable';
import { Menu, MenuItem, MenuSeparator } from '../menu/menu';
import { RepeaterContext } from './repeater-context';

type RepeaterItemProps = Omit<ComponentPropsWithoutRef<typeof Expandable>, 'icon' | 'label' | 'subtitle' | 'className' | 'actions'> & {
	/** Icon to display in the label. */
	icon?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Subtitle to display. */
	subtitle?: ReactNode;
	/** Actions to display to the right of the label. */
	actions?: ReactNode;
	/** Classes to pass to the item. */
	className?: string;
	/** The text value of the item. */
	textValue?: string;
	/** Additional menu options to display next to the expand button. */
	menuOptions?: ReactNode;
	/** If `true`, the menu button next to the expand button is not displayed. */
	noMenuButton?: boolean;
	/** If `true`, the item cannot be expanded. */
	expandDisabled?: boolean;
};

/**
 * A Repeater item.
 *
 * @component
 * @param {RepeaterItemProps} props - Component props.
 *
 * @returns {JSX.Element} The RepeaterItem component.
 *
 * @see {@link Repeater} for usage example.
 */
export const RepeaterItem = (props: Prettify<RepeaterItemProps>) => {
	const { children, icon, label, subtitle, className, actions, expandDisabled, menuOptions, noMenuButton, ...rest } = props;
	const context = useContext(RepeaterContext);
	const movableHandleHeaderProps = {
		'data-movable-handle': true,
	} as ComponentPropsWithoutRef<'div'>;

	if (!context) {
		throw new Error('RepeaterItem must be used within RepeaterContext.Provider');
	}

	const { deleteItem, duplicateItem, isDragged, isOutOfBounds, canDelete, canAdd, allOpen, setAllOpen, setOpenItems, isItemOpen, index, noDuplicateButton } = context;

	return (
		<Expandable
			icon={isOutOfBounds ? trash : icon}
			label={isOutOfBounds ? __('Release to delete', 'eightshift-ui-components') : label}
			subtitle={isOutOfBounds ? null : subtitle}
			labelClassName={clsx(className, isDragged && 'es:cursor-grabbing', !isDragged && !isItemOpen && 'es:cursor-grab')}
			headerClassName={clsx(
				'es:transition-plus',
				!isItemOpen && !isDragged && 'es:not-group-first:not-group-before-current:rounded-t-md es:not-group-last:not-group-after-current:rounded-b-md',
				!isItemOpen && isOutOfBounds && 'es:inset-ring-red-200! es:text-red-900! es:bg-red-50! es:[&_button]:invisible es:[&_svg_path]:stroke-red-600',
				isDragged && 'es:rounded-2xl! es:bg-surface-50! es:inset-ring-surface-100',
			)}
			open={allOpen}
			disabled={expandDisabled}
			onOpenChange={(open) => {
				if (allOpen && !open) {
					setAllOpen(false);
				}

				setOpenItems((previousOpenItems) => ({ ...previousOpenItems, [index]: open }));
			}}
			key={String(allOpen)}
			customOpenButton={({ open, toggleOpen, tooltip, disabled }) => (
				<div className='es:flex es:items-center es:gap-px'>
					<Menu
						hidden={noMenuButton}
						triggerIcon={moreH}
						triggerProps={{
							className: 'es:icon:size-5 es:icon:shrink-0',
							size: 'small',
							type: 'ghost',
						}}
						tooltip={__('More options', 'eightshift-ui-components')}
					>
						{menuOptions}

						{menuOptions ? <MenuSeparator /> : null}

						{!noDuplicateButton ? (
							<MenuItem
								disabled={!canAdd}
								icon={copy}
								onPress={() => duplicateItem()}
							>
								{__('Duplicate', 'eightshift-ui-components')}
							</MenuItem>
						) : null}

						<MenuItem
							disabled={!canDelete}
							icon={trash}
							onPress={() => deleteItem()}
							danger
						>
							{__('Remove', 'eightshift-ui-components')}
						</MenuItem>
					</Menu>
					<Button
						type='ghost'
						icon={dropdownCaretAlt}
						onPress={toggleOpen}
						tooltip={tooltip}
						disabled={disabled}
						className={clsx('es:icon:size-5 es:icon:transition-transform', open && 'es:icon:-scale-y-100')}
						size='small'
					/>
				</div>
			)}
			actions={actions}
			headerProps={movableHandleHeaderProps}
			noFocusHandling
			standalone
			{...rest}
		>
			{children}
		</Expandable>
	);
};
