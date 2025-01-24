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

	const { deleteItem, duplicateItem, isDragged, isOutOfBounds, isSelected, canDelete, canAdd } = useContext(RepeaterContext);

	return (
		<Expandable
			icon={isOutOfBounds ? icons.trash : icon}
			label={isOutOfBounds ? __('Release to delete', 'eightshift-ui-components') : label}
			subtitle={isOutOfBounds ? null : subtitle}
			className={clsx(
				'es-uic-transition',
				isDragged && 'es-uic-border es-uic-border-gray-100 es-uic-bg-white/50 es-uic-shadow-md es-uic-backdrop-blur-lg',
				isOutOfBounds && 'es-uic-border !es-uic-border-red-200 es-uic-bg-red-50 es-uic-shadow-red-500/20 [&_button]:es-uic-invisible [&_svg_path]:es-uic-stroke-red-500',
			)}
			labelClassName={clsx(className, isDragged ? 'es-uic-cursor-grabbing' : 'es-uic-cursor-grab')}
			headerClassName={clsx(
				'es-uic-transition es-uic-rounded-md',

				isSelected && 'es-uic-bg-teal-50 es-uic-border-teal-100',
				'group-focus:es-uic-outline-none group-focus-visible:es-uic-ring group-focus-visible:es-uic-ring-teal-500/50',
			)}
			customOpenButton={({ open, toggleOpen, tooltip, disabled }) => {
				return (
					<div className='es-uic-flex es-uic-items-center es-uic-gap-px'>
						<Menu
							hidden={noMenuButton}
							triggerIcon={icons.moreH}
							triggerProps={{
								className: '[&>svg]:es-uic-size-5 [&>svg]:es-uic-shrink-0',
								size: 'small',
								type: 'ghost',
							}}
							tooltip={__('More options', 'eightshift-ui-components')}
						>
							{menuOptions}

							{menuOptions && <MenuSeparator />}

							<MenuItem
								disabled={!canAdd}
								icon={icons.copy}
								onPress={() => duplicateItem()}
							>
								{__('Duplicate', 'eightshift-ui-components')}
							</MenuItem>

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
							className={clsx('[&>svg]:es-uic-size-5 [&>svg]:es-uic-transition-transform', open && '[&>svg]:-es-uic-scale-y-100')}
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
