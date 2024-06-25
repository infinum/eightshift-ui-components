import { DropIndicator } from 'react-aria-components';
import { useListData } from 'react-stately';
import { GridList, useDragAndDrop } from 'react-aria-components';
import { useEffect, useId } from 'react';
import { clsx } from 'clsx/lite';
import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';

/**
 * A component that allows re-ordering a list of items.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.help] - Help text to display below the input.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {Object<string, any>[]} props.items - Data to display in the list.
 * @param {boolean} [props.hideEmptyState] - If `true`, the empty state will not be displayed when there are no items.
 * @param {Function} props.onChange - Function to run when the items change.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.disabled] - If `true`, item reordering is disabled.
 * @param {string} [props.className] - Classes to pass to the item wrapper.
 *
 * @returns {JSX.Element} The DraggableList component.
 *
 * @example
 * <DraggableList
 * 	label='My draggable list'
 * 	items={items}
 * 	onChange={setItems}
 * >
 * 	{(item) => {
 * 		const { title, updateData } = item;
 *
 * 		return (
 * 			<DraggableListItem
 * 				label={title ?? 'New item'}
 * 				icon={icons.myIcon}
 * 			>
 * 				<InputField
 * 					label='Title'
 * 					type='text'
 * 					value={title}
 * 					onChange={(value) => updateData({ title: value })}
 * 				/>
 * 			</DraggableListItem>
 * 		);
 * 	}}
 * </DraggableList>
 *
 * @preserve
 */
export const DraggableList = (props) => {
	const itemIdBase = useId('draggable-list-item-');

	const {
		children,
		onChange,
		items,
		'aria-label': ariaLabel,
		icon,
		label,
		subtitle,
		help,
		actions,
		hideEmptyState,
		disabled,
		className,

		hidden,
		...rest
	} = props;

	const list = useListData({
		initialItems: items?.map((item, i) => ({ id: item.id ?? `${itemIdBase}${i}`, ...item })),
		getKey: ({ id }) => id,
	});

	let { dragAndDropHooks } = useDragAndDrop({
		isDisabled: disabled,
		getItems: (keys) => [...keys].map((key) => ({ 'text/plain': list.getItem(key).id })),
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
						clsx(
							'es-uic-h-10 es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-transition',
							isDropTarget ? 'es-uic-border-teal-500 es-uic-bg-teal-500/5' : 'es-uic-border-dashed',
						)
					}
				/>
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
			const { id, ...rest } = item;

			return rest;
		});

		onChange(items);
	}, [list.items]);

	if (hidden) {
		return null;
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			actions={actions}
			className='es-uic-w-full'
		>
			<GridList
				aria-label={ariaLabel ?? __('Draggable list', 'eightshift-ui-components')}
				selectionMode='none'
				items={list.items.map((item, index) => ({
					...item,
					updateData: (newValue) => {
						list.update(item.id, { ...list.getItem(item.id), ...newValue });
					},
					itemIndex: index,
					deleteItem: () => list.remove(item.id),
				}))}
				dragAndDropHooks={dragAndDropHooks}
				renderEmptyState={() =>
					hideEmptyState ? null : (
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
		</BaseControl>
	);
};
