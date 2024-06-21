import { DropIndicator, GridListContext } from 'react-aria-components';
import { __ } from '@wordpress/i18n';
import { useListState } from 'react-stately';
import { GridList, useDragAndDrop } from 'react-aria-components';
import { Button, ButtonGroup } from '../button/button';
import { icons } from '../../icons/icons';
import { useId, useState } from 'react';
import { BaseControl } from '../base-control/base-control';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { ToggleButton } from '../toggle-button/toggle-button';
import { arrayMoveMultiple, fixIds } from '../../utilities';
import { clsx } from 'clsx/lite';

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
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {JSX.Element} [props.addButton] - If provided, overrides the default add button. `(props: { addItem: (additional: Object<string, any>?) => void, disabled: Boolean }) => JSX.Element`.
 * @param {string} [props.className] - Classes to pass to the item wrapper.
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
	const itemIdBase = useId('repeater-item-');

	const {
		children,
		items,
		'aria-label': ariaLabel,
		icon,
		label,
		subtitle,
		help,
		actions,
		hideEmptyState,
		addDefaultItem = {},
		addDisabled,
		onChange,
		onAfterItemAdd,
		onAfterItemRemove,
		minItems,
		addButton,
		className,
		emptyState,

		hidden,
		...rest
	} = props;

	const [selectable, setSelectable] = useState(false);
	const [canDelete, setCanDelete] = useState(false);
	const [canReorder, setCanReorder] = useState(true);

	// Fix IDs if needed.
	fixIds(items, onChange, 'key');

	const rawList = useListState({
		items: items,
		selectionMode: selectable ? 'multiple' : 'none',
	});

	const list = {
		items: items,
		selectedKeys: rawList.selectionManager.selectedKeys,
		setSelectedKeys: (keys) => rawList.selectionManager.setSelectedKeys(keys),
		getKey: ({ key }) => items.find((item) => item.key === key),
		getItem: (key) => items.find((item) => item.key === key),
		update: (key, newValue) => {
			const index = [...items].findIndex((item) => item.key === key);
			items[index] = { ...items[index], ...newValue };

			onChange(items);
		},
		move: (sourceKey, targetKeys, direction = 'before') => {
			const sourceIndex = items.findIndex((item) => item.key === sourceKey);
			const targetIndices = [...targetKeys].map((key) => items.findIndex((item) => item.key === key));

			onChange(arrayMoveMultiple(items, targetIndices, sourceIndex, direction));
		},
		insert: (targetKey, ...newItems) => {
			const targetIndex = items.findIndex((item) => item.key === targetKey);
			const newItemsWithKeys = newItems.map((item) => ({ ...item, id: `${itemIdBase}${items.length + 1}` }));

			onChange([...items.slice(0, targetIndex), ...newItemsWithKeys, ...items.slice(targetIndex)]);
		},
		removeSelectedItems: () => {
			const keys = rawList.selectionManager.selectedKeys;

			const newItems = items.filter((item) => !keys.has(item.key));
			onChange(newItems);
		},
		append: (item) => {
			onChange([...items, item]);
		},
	};

	let { dragAndDropHooks } = useDragAndDrop({
		isDisabled: selectable || !canReorder,
		getItems: (keys) => [...keys].map((key) => ({ 'text/plain': list.getItem(key).id })),
		onReorder(e) {
			if (e.target.dropPosition === 'before') {
				list.move(e.target.key, e.keys);
			} else if (e.target.dropPosition === 'after') {
				list.move(e.target.key, e.keys, 'after');
			}
		},
		renderDropIndicator(target) {
			return (
				<DropIndicator
					target={target}
					className={({ isDropTarget }) =>
						clsx(
							'es-uic-h-10 es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-transition',
							isDropTarget ? 'es-uic-border-teal-500 es-uic-bg-teal-500/5' : 'es-uic-border-dashed',
						)
					}
				/>
			);
		},
	});

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

					<AnimatedVisibility
						visible={selectable}
						transition='scaleFade'
					>
						<Button
							onPress={() => {
								const removedItems = [...(list?.selectedKeys.keys()?.map((key) => list.getItem(key)) ?? [])];

								list.removeSelectedItems();
								setSelectable(false);
								setCanDelete(false);

								if (onAfterItemRemove) {
									onAfterItemRemove(removedItems);
								}
							}}
							size='small'
							icon={icons.trash}
							tooltip={__('Remove selected', 'eightshift-ui-components')}
							disabled={!canDelete}
							aria-label={__('Remove selected', 'eightshift-ui-components')}
							type='danger'
						/>
					</AnimatedVisibility>
					<ButtonGroup>
						{!addButton && (
							<Button
								onPress={() => {
									const newItem = { id: `${itemIdBase}${list.items.length + 1}`, ...addDefaultItem };
									list.append(newItem);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								}}
								size='small'
								icon={icons.add}
								tooltip={__('Add item', 'eightshift-ui-components')}
								disabled={addDisabled || selectable}
							/>
						)}

						{addButton &&
							addButton({
								addItem: (additional = {}) => {
									const newItem = { id: `${itemIdBase}${list.items.length + 1}`, ...addDefaultItem, ...additional };
									list.append(newItem);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								},
								disabled: addDisabled || selectable,
							})}

						<ToggleButton
							selected={selectable}
							onChange={() => {
								list.setSelectedKeys([]);
								setSelectable(!selectable);
							}}
							size='small'
							icon={icons.checkSquare}
							tooltip={__('Select items', 'eightshift-ui-components')}
							disabled={minItems && items.length <= minItems}
						/>
					</ButtonGroup>
				</>
			}
			className='es-uic-w-full'
		>
			<GridListContext.Provider value={{ setCanReorder: setCanReorder }}>
				<GridList
					aria-label={ariaLabel ?? __('Repeater', 'eightshift-ui-components')}
					selectionMode={selectable ? 'multiple' : 'none'}
					selectionBehavior='toggle'
					selectedKeys={list.selectedKeys}
					onSelectionChange={(selected) => {
						list.setSelectedKeys(selected);
						setCanDelete((selected.size ?? 0) > 0);
					}}
					items={list.items.map((item, index) => ({
						...item,
						updateData: (newValue) => {
							list.update(item.key, { ...list.getItem(item.key), ...newValue });
						},
						itemIndex: index,
						deleteItem: () => list.remove(item.key),
						canReorder,
						setCanReorder,
					}))}
					dragAndDropHooks={dragAndDropHooks}
					renderEmptyState={() =>
						hideEmptyState
							? null
							: emptyState ?? (
									<div className='es-uic-rounded-md es-uic-border es-uic-border-dashed es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-text-gray-400'>
										{__('No items', 'eightshift-ui-components')}
									</div>
								)
					}
					className={className}
					{...rest}
				>
					{children}
				</GridList>
			</GridListContext.Provider>
		</BaseControl>
	);
};
