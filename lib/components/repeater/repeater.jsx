import { DropIndicator } from 'react-aria-components';
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
		...rest
	} = props;

	const list = useListData({
		initialItems: items.map((item, i) => ({ id: item.id ?? `${itemIdBase}${i}`, ...item })),
		getKey: ({ id }) => id,
	});

	const [selectable, setSelectable] = useState(false);

	let { dragAndDropHooks } = useDragAndDrop({
		isDisabled: selectable,

		getItems: (keys) =>
			[...keys].map((key) => ({
				'text/plain': list.getItem(key)[itemLabelProp] ?? __('New item', 'eightshift-components'),
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
			return (
				<div className='es-uic-rounded-md es-uic-bg-teal-500/85 es-uic-px-1.5 es-uic-py-1 es-uic-text-xs es-uic-text-white es-uic-backdrop-blur-xl es-uic-animate-in es-uic-fade-in-0 es-uic-zoom-in-95'>
					{items[0]['text/plain']}
					<span className='badge'>{items.length}</span>
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
	}, [list.items, onChange]);

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
							onClick={() => {
								list.removeSelectedItems();
								setSelectable(false);
							}}
							size='small'
							icon={icons.trash}
							tooltip={__('Add item', 'eightshift-components')}
							disabled={list.selectedKeys.size === 0}
							type='danger'
						/>
					</AnimatedVisibility>
					<ButtonGroup>
						<Button
							onPress={() => list.append({ id: Math.random() })}
							size='small'
							icon={icons.add}
							tooltip={__('Add item', 'eightshift-components')}
							disabled={selectable}
						/>

						<ToggleButton
							selected={selectable}
							onChange={() => setSelectable(!selectable)}
							size='small'
							icon={icons.checkSquare}
							tooltip={__('Select items', 'eightshift-components')}
						/>

						{/* <Menu triggerProps={{ size: 'small' }}>
							<MenuItem
								onClick={() => setSelectable(!selectable)}
								checked={selectable}
							>
								{__('Select items', 'eightshift-components')}
							</MenuItem>
						</Menu> */}
					</ButtonGroup>
				</>
			}
			className='es-uic-w-full'
		>
			<GridList
				aria-label={ariaLabel ?? __('Repeater', 'eightshift-component')}
				// selectionMode='multiple'
				selectionMode={selectable ? 'multiple' : 'none'}
				selectionBehavior='toggle'
				selectedKeys={list.selectedKeys}
				onSelectionChange={list.setSelectedKeys}
				items={list.items.map((item) => ({
					...item,
					updateData: (newValue) => {
						list.update(item.id, { ...list.getItem(item.id), ...newValue });
					},
					deleteItem: () => list.remove(item.id),

				}))}
				dragAndDropHooks={dragAndDropHooks}
				renderEmptyState={() =>
					hideEmptyState ? null : (
						<div className='es-uic-rounded-md es-uic-border es-uic-border-dashed es-uic-border-gray-300 es-uic-p-2 es-uic-text-sm es-uic-text-gray-400'>
							{__('No items', 'eightshift-components')}
						</div>
					)
				}
				className={classnames('es-uic-w-full')}
				{...rest}
			>
				{children}
			</GridList>
		</BaseControl>
	);
};
