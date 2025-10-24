import { Button } from '../button/button';
import { Menu, MenuItem, MenuSeparator } from '../menu/menu';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { useContext } from 'react';
import { Expandable } from '../expandable/expandable';
import { __ } from '@wordpress/i18n';
import { RepeaterContext } from './repeater-context';

/**
 * A Repeater item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {string} [props.textValue] - The text value of the item.
 * @param {string} [props.className] - Classes to pass to the item.
 * @param {JSX.Element|JSX.Element[]} [props.menuOptions] - Additional menu options to display next to the expand button.
 * @param {bool} [props.noMenuButton] - If `true`, the menu button next to the expand button is not displayed.
 * @param {bool} [props.expandDisabled] - If `true`, the item cannot be expanded.
 *
 * @returns {JSX.Element} The RepeaterItem component.
 *
 * @see {@link Repeater} for usage example.
 *
 * @preserve
 */
export const RepeaterItem = (props) => {
	const { children, icon, label, subtitle, 'aria-label': ariaLabel, className, actions, textValue, expandDisabled, menuOptions, noMenuButton, ...rest } = props;

	const { deleteItem, duplicateItem, isDragged, isOutOfBounds, isSelected, canDelete, canAdd, allOpen, setAllOpen, setOpenItems, id, isItemOpen, noDuplicateButton } =
		useContext(RepeaterContext);

	return (
		<Expandable
			icon={isOutOfBounds ? icons.trash : icon}
			label={isOutOfBounds ? __('Release to delete', 'eightshift-ui-components') : label}
			subtitle={isOutOfBounds ? null : subtitle}
			labelClassName={clsx(className, isDragged && 'es:cursor-grabbing', !isDragged && !isItemOpen && 'es:cursor-grab')}
			headerClassName={clsx(
				!isItemOpen && !isDragged && 'es:not-group-first:not-group-after-selected:rounded-t-md! es:not-group-last:not-group-before-selected:rounded-b-md!',
				!isItemOpen && isOutOfBounds && 'es:inset-ring-red-200! es:text-red-900! es:bg-red-50! es:[&_button]:invisible es:[&_svg_path]:stroke-red-600',
				isDragged && 'es:rounded-2xl! es:bg-surface-50! es:inset-ring-surface-100',
			)}
			open={allOpen}
			onOpenChange={(open) => {
				if (allOpen && !open) {
					setAllOpen(false);
				}

				setOpenItems((prev) => ({ ...prev, [id]: open }));
			}}
			key={allOpen}
			customOpenButton={({ open, toggleOpen, tooltip, disabled }) => {
				return (
					<div className='es:flex es:items-center es:gap-px'>
						<Menu
							hidden={noMenuButton}
							triggerIcon={icons.moreH}
							triggerProps={{
								className: 'es:icon:size-5 es:icon:shrink-0',
								size: 'small',
								type: 'ghost',
							}}
							tooltip={__('More options', 'eightshift-ui-components')}
						>
							{menuOptions}

							{menuOptions && <MenuSeparator />}

							{!noDuplicateButton && (
								<MenuItem
									disabled={!canAdd}
									icon={icons.copy}
									onPress={() => duplicateItem()}
								>
									{__('Duplicate', 'eightshift-ui-components')}
								</MenuItem>
							)}

							<MenuItem
								disabled={!canDelete}
								icon={icons.trash}
								onPress={() => deleteItem()}
							>
								{__('Remove', 'eightshift-ui-components')}
							</MenuItem>
						</Menu>
						<Button
							type='ghost'
							icon={open ? icons.caretDownFill : icons.caretDown}
							onPress={toggleOpen}
							tooltip={tooltip}
							disabled={disabled}
							className={clsx('es:icon:size-5 es:icon:transition-transform', open && 'es:icon:-scale-y-100')}
							size='small'
						/>
					</div>
				);
			}}
			actions={actions}
			headerProps={{ 'data-movable-handle': true }}
			noFocusHandling
			{...rest}
		>
			{children}
		</Expandable>
	);
};
