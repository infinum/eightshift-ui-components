import { DropIndicator, GridListContext } from 'react-aria-components';
import { useListData } from 'react-stately';
import { GridList, useDragAndDrop } from 'react-aria-components';
import { Button, ButtonGroup } from '../button/button';
import { icons } from '../../icons/icons';
import { useEffect, useId, useState } from 'react';
import { classnames } from '../../utilities/classnames';
import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { ToggleButton } from '../toggle-button/toggle-button';

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
 * @param {Object[]<string, any>} props.items - Data to display in the repeater.
 * @param {string} [props.itemLabelProp] - Property of an item to use as the label when re-ordering items.
 * @param {boolean} [props.hideEmptyState] - If `true`, the empty state will not be displayed when there are no items.
 * @param {Object<string, any>} [props.addDefaultItem] - Additional properties to add to a new item.
 * @param {boolean} [props.addDisabled] - If `true`, the add button is disabled.
 * @param {Function} props.onChange - Function to run when the items change.
 * @param {Function} [props.onAfterItemAdd] - Function to run after an item is added.
 * @param {Function} [props.onAfterItemRemove] - Function to run after an item is removed.
 * @param {Number} [props.minItems] - The minimum number of items that must be present. If there are less items than this, deleting items will be disabled.
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
		onChange,
		items,
		itemLabelProp,
		'aria-label': ariaLabel,
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
		...rest
	} = props;

	const list = useListData({
		initialItems: items?.map((item, i) => ({ id: item.id ?? `${itemIdBase}${i}`, ...item })),
		getKey: ({ id }) => id,
	});

	const [selectable, setSelectable] = useState(false);
	const [canDelete, setCanDelete] = useState(false);
	const [canReorder, setCanReorder] = useState(true);

	let { dragAndDropHooks } = useDragAndDrop({
		isDisabled: selectable || !canReorder,

		getItems: (keys) =>
			[...keys].map((key) => ({
				'text/plain': list.getItem(key)[itemLabelProp] ?? __('New item', 'eightshift-ui-components'),
			})),
		onReorder(e) {
			if (e.target.dropPosition === 'before') {
				list.moveBefore(e.target.key, e.keys);
			} else if (e.target.dropPosition === 'after') {
				list.moveAfter(e.target.key, e.keys);
			}
		},
		renderDropIndicator(target) {
			return (
				<DropIndicator
					target={target}
					className={({ isDropTarget }) =>
						classnames(
							'es-uic-h-10 es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-transition',
							isDropTarget ? 'es-uic-border-teal-500 es-uic-bg-teal-500/5' : 'es-uic-border-dashed',
						)
					}
				/>
			);
		},
		renderDragPreview(items) {
			let label = items[0]['text/plain'];

			if (!label || label === '') {
				label = __('New item', 'eightshift-ui-components');
			}

			return (
				<div className='es-uic-rounded-md es-uic-bg-teal-500 es-uic-px-1.5 es-uic-py-1 es-uic-text-xs es-uic-text-white es-uic-shadow-lg es-uic-shadow-teal-500/30'>
					{label}
				</div>
			);
		},
		async onInsert(e) {
			let items = await Promise.all(
				e.items.map(async (item) => {
					let name = item.kind === 'text' ? await item.getText('text/plain') : item.name;
					return { id: Math.random(), name };
				}),
			);

			if (e.target.dropPosition === 'before') {
				list.insertBefore(e.target.key, ...items);
			} else if (e.target.dropPosition === 'after') {
				list.insertAfter(e.target.key, ...items);
			}
		},
	});


	// Update main value when items change.
	useEffect(() => {
		const items = list.items.map((item) => {
			// eslint-disable-next-line no-unused-vars
			const { id, ...rest } = item;
			return rest;
		});

		onChange(items);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list.items]);

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
								const removedItems = [
									...(list?.selectedKeys.keys()?.map((key) => list.getItem(key)) ?? []),
								];

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
							list.update(item.id, { ...list.getItem(item.id), ...newValue });
						},
						itemIndex: index,
						deleteItem: () => list.remove(item.id),
						canReorder,
						setCanReorder,
					}))}
					dragAndDropHooks={dragAndDropHooks}
					renderEmptyState={() =>
						hideEmptyState ? null : (
							<div className='es-uic-rounded-md es-uic-border es-uic-border-dashed es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-text-gray-400'>
								{__('No items', 'eightshift-ui-components')}
							</div>
						)
					}
					className='es-uic-space-y-1.5'
					{...rest}
				>
					{children}
				</GridList>
			</GridListContext.Provider>
		</BaseControl>
	);
};
