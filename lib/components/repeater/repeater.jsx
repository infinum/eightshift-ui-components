import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { BaseControl } from '../base-control/base-control';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { RepeaterContext } from './repeater-context';
import { List, arrayMove, arrayRemove } from 'react-movable';
import { Menu, MenuItem, MenuSeparator } from '../menu/menu';
import { clsx } from 'clsx';

/**
 * A component that allows re-ordering a list of items with additional sub-options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.help] - Help text to display below the input.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {Object<string, any>[]} props.items - Data to display in the repeater.
 * @param {boolean} [props.hideEmptyState] - If `true`, the empty state will not be displayed when there are no items.
 * @param {Object<string, any>} [props.addDefaultItem] - Additional properties to add to a new item.
 * @param {boolean} [props.addDisabled] - If `true`, the add button is disabled.
 * @param {Function} props.onChange - Function to run when the items change.
 * @param {Function} [props.onAfterItemAdd] - Function to run after an item is added.
 * @param {Function} [props.onAfterItemRemove] - Function to run after an item is removed.
 * @param {Number} [props.minItems] - The minimum number of items that must be present. If there are less items than this, deleting items will be disabled.
 * @param {Number} [props.maxItems] - The maximum number of items that can be present. If there are more items than this, adding items will be disabled.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {JSX.Element} [props.addButton] - If provided, overrides the default add button. `(props: { addItem: (additional: Object<string, any>?) => void, disabled: Boolean }) => JSX.Element`.
 * @param {string} [props.className] - Classes to pass to the item wrapper.
 * @param {boolean} [props.noExpandAllButton] - If `true`, the "Expand all"/"Collapse all" button is not displayed.
 * @param {boolean} [props.noDuplicateButton] - If `true`, the "Duplicate" button is not displayed.
 * @param {boolean} [props.noDragToRemove] - If `true`, the "drag to remove" functionality will be disabled.
 * @param {JSX.Element|JSX.Element[]} [props.moreOptions] - Options to add in the "More options" menu.
 * @param {JSX.Element} [props.emptyState] - Allows overriding the default empty state.
 *
 * @returns {JSX.Element} The Repeater component.
 *
 * @example
 * <Repeater
 * 	label='My repeater'
 * 	items={items}
 * 	onChange={setItems}
 * >
 * 	{(item) => {
 * 		const { title, updateData } = item;
 *
 * 		return (
 * 			<RepeaterItem
 * 				label={title ?? 'New item'}
 * 				icon={icons.myIcon}
 * 			>
 * 				<InputField
 * 					label='Title'
 * 					type='text'
 * 					value={title}
 * 					onChange={(value) => updateData({ title: value })}
 * 				/>
 * 			</RepeaterItem>
 * 		);
 * 	}}
 * </Repeater>
 *
 * @preserve
 */
export const Repeater = (props) => {
	const {
		children,
		onChange,
		items,
		icon,
		label,
		subtitle,
		help,
		actions,
		hideEmptyState,
		addDefaultItem = {},
		addDisabled,
		onAfterItemAdd,
		onAfterItemRemove,
		minItems,
		maxItems,
		addButton,
		className,
		emptyState,

		noExpandAllButton,
		noDuplicateButton,
		noDragToRemove,
		moreOptions,

		hidden,
	} = props;

	const [allOpen, setAllOpen] = useState(false);
	const [openItems, setOpenItems] = useState({});

	if (typeof items === 'undefined' || items === null || !Array.isArray(items)) {
		console.warn(__("Repeater: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const canDelete = items.length > (minItems ?? 0);
	const canAdd = items.length < (maxItems ?? Number.MAX_SAFE_INTEGER) && !addDisabled;

	if (hidden) {
		return null;
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			actions={
				<>
					{actions}

					<Menu
						tooltip={__('More options', 'eightshift-ui-components')}
						triggerIcon={icons.moreH}
						triggerProps={{ type: 'ghost', size: 'small' }}
						hidden={items?.length < 1 || (noExpandAllButton && !moreOptions)}
					>
						{!noExpandAllButton && (
							<MenuItem
								endIcon={allOpen ? icons.panelCollapse : icons.panelExpand}
								onClick={() => setAllOpen(!allOpen)}
							>
								{allOpen ? __('Collapse all', 'eightshift-ui-components') : __('Expand all', 'eightshift-ui-components')}
							</MenuItem>
						)}

						{moreOptions && <MenuSeparator />}
						{moreOptions}
					</Menu>

					{!addButton && (
						<Button
							onPress={() => {
								const newItem = { ...addDefaultItem };
								onChange([...items, newItem]);

								if (onAfterItemAdd) {
									onAfterItemAdd(newItem);
								}
							}}
							size='small'
							icon={icons.add}
							className={!hideEmptyState && items.length < 1 && 'es:invisible'}
							tooltip={__('Add item', 'eightshift-ui-components')}
							disabled={addDisabled || !canAdd}
						/>
					)}

					{addButton && (
						<div className={clsx(!hideEmptyState && items.length < 1 && 'es:invisible')}>
							{addButton({
								addItem: (additional = {}) => {
									const newItem = { ...addDefaultItem, ...additional };
									onChange([...items, newItem]);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								},
								disabled: addDisabled,
							})}
						</div>
					)}
				</>
			}
			className='es:w-full'
		>
			<List
				values={items.map((item, index) => ({ ...item, disabled: openItems?.[index] }))}
				onChange={({ oldIndex, newIndex }) => onChange(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex))}
				renderList={({ children, props }) => {
					return (
						<ul
							className={clsx('es:w-full es:list-none es:m-0! es:flex es:flex-col es:gap-0.75', className)}
							{...props}
						>
							{children}
						</ul>
					);
				}}
				renderItem={({ value: item, index, isDragged, isSelected, isOutOfBounds, props }) => {
					const { key, ...rest } = props;

					return (
						<li
							className='es:group es:w-full es:list-none es:any-focus:outline-hidden es:m-0!'
							key={key}
							{...rest}
						>
							<RepeaterContext.Provider
								value={{
									...item,
									index,
									deleteItem: () => {
										onChange([...items].filter((_, i) => i !== index));

										if (onAfterItemRemove) {
											onAfterItemRemove(item);
										}
									},
									duplicateItem: () => {
										const newItem = { ...item };
										onChange([...items, newItem]);

										if (onAfterItemAdd) {
											onAfterItemAdd(newItem);
										}
									},
									isDragged,
									isOutOfBounds,
									isSelected,
									canDelete,
									canAdd,
									allOpen,
									setAllOpen,
									setOpenItems,
									isItemOpen: openItems?.[index] ?? allOpen,
									noDuplicateButton,
								}}
							>
								{children({
									...item,
									updateData: (newValue) => {
										const updated = [...items];

										updated[index] = {
											...updated[index],
											...newValue,
										};

										onChange(updated);
									},
									itemIndex: index,
									deleteItem: () => {
										onChange([...items].filter((_, i) => i !== index));

										if (onAfterItemRemove) {
											onAfterItemRemove(item);
										}
									},
								})}
							</RepeaterContext.Provider>
						</li>
					);
				}}
				removableByMove={!noDragToRemove}
			/>

			<AnimatedVisibility visible={items.length < 1}>
				{emptyState}

				{!hideEmptyState && (
					<div className='es:flex es:flex-col es:items-center es:gap-2 es:rounded-md es:border es:border-dashed es:border-secondary-300 es:p-4 es:text-center es:text-sm es:text-secondary-400'>
						{!addButton && (
							<Button
								onPress={() => {
									const newItem = { ...addDefaultItem };
									onChange([...items, newItem]);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								}}
								size='small'
								icon={icons.add}
								className='es:icon:size-4'
								disabled={addDisabled}
							>
								{__('Add item', 'eightshift-ui-components')}
							</Button>
						)}

						{addButton &&
							!hideEmptyState &&
							addButton({
								addItem: (additional = {}) => {
									const newItem = { ...addDefaultItem, ...additional };
									onChange([...items, newItem]);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								},
								disabled: addDisabled,
							})}
					</div>
				)}
			</AnimatedVisibility>
		</BaseControl>
	);
};
