import { useEffect, useId, useRef, useState, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { createSwapy } from 'swapy';
import { DraggableContext } from './draggable-context';
import { clsx } from 'clsx/lite';

const fixIds = (items, itemIdBase) => {
	return items.map((item, i) => ({
		...item,
		id: item?.id ?? `${itemIdBase}-${i}`,
	}));
};

/**
 * A component that allows re-ordering items freely.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object<string, any>[]} props.items - Data to display in the list.
 * @param {Function} props.onChange - Function to run when the items change.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.noReorder] - If `true`, item reordering is disabled.
 * @param {string} [props.className] - Classes to pass to the component.
 * @param {string} [props.slotClassName] - Classes to pass to the item container slot.
 *
 * @returns {JSX.Element} The Draggable component.
 *
 * @example
 * <Draggable
 * 	items={items}
 * 	onChange={setItems}
 * >
 * 	{(item) => {
 * 		const { title, updateData } = item;
 *
 * 		return (
 * 			<DraggableItem
 * 				label={title ?? 'New item'}
 * 				icon={icons.myIcon}
 * 			>
 * 				<InputField
 * 					label='Title'
 * 					type='text'
 * 					value={title}
 * 					onChange={(value) => updateData({ title: value })}
 * 				/>
 * 			</DraggableItem>
 * 		);
 * 	}}
 * </Draggable>
 *
 * @preserve
 */
export const Draggable = (props) => {
	const itemIdBase = useId('draggable-list-item-');

	const {
		children,

		items: rawItems,
		onChange,

		noReorder,

		className,
		slotClassName,

		hidden,
		...rest
	} = props;

	const items = useMemo(() => fixIds(rawItems, itemIdBase), [rawItems]);

	const ref = useRef(null);
	const swapyRef = useRef(null);

	const [slotItemsMap, setSlotItemsMap] = useState([
		...items.map((item) => ({
			slotId: item.id,
			itemId: item.id,
		})),
	]);

	const slottedItems = useMemo(
		() =>
			slotItemsMap.map(({ slotId, itemId }) => ({
				slotId,
				itemId,
				item: items.find((item) => item.id === itemId),
			})),
		[items, slotItemsMap],
	);

	// Keep Swapy slots in sync with items.
	useEffect(() => {
		const newItems = items
			.filter((item) => !slotItemsMap.some((slotItem) => slotItem.itemId === item.id))
			.map((item) => ({
				slotId: item.id,
				itemId: item.id,
			}));

		// Remove items from slotItemsMap if they no longer exist in items
		const withoutRemovedItems = slotItemsMap.filter((slotItem) => items.some((item) => item.id === slotItem.itemId) || !slotItem.itemId);

		const updatedSlotItemsMap = [...withoutRemovedItems, ...newItems];

		setSlotItemsMap(updatedSlotItemsMap);
		swapyRef.current?.setData({ array: updatedSlotItemsMap });
	}, [items]);

	// Initialize Swapy.
	useEffect(() => {
		const container = ref?.current;

		swapyRef.current = createSwapy(container, {
			manualSwap: true,
		});

		swapyRef.current.onSwap(({ data }) => {
			const tweakedItems = data.array.filter(({ itemId }) => itemId !== null).map(({ itemId }) => items.find((item) => item?.id === itemId));
			onChange(tweakedItems);

			// Set data manually.
			swapyRef.current?.setData({ array: data.array });
			setSlotItemsMap(data.array);
		});

		return () => {
			swapyRef.current?.destroy();
		};
	}, []);

	useEffect(() => {
		swapyRef?.current?.enable(!noReorder);
	}, [noReorder]);

	if (hidden) {
		return null;
	}

	return (
		<div
			className={className}
			ref={ref}
			{...rest}
		>
			{slottedItems.map(({ itemId, slotId, item }, index) => (
				<div
					className={clsx(
						'es-uic-transition-colors data-[swapy-highlighted]:es-uic-rounded-md data-[swapy-highlighted]:es-uic-outline-dashed data-[swapy-highlighted]:es-uic-outline-1 data-[swapy-highlighted]:es-uic-outline-teal-500/50',
						slotClassName,
					)}
					data-swapy-slot={slotId}
					key={slotId}
				>
					{item && (
						<DraggableContext.Provider
							value={{ itemId }}
							key={itemId}
						>
							{children({
								...item,
								updateData: (newValue) => {
									onChange(items.map((i) => (i.id === itemId ? { ...i, ...newValue } : i)));
								},
								itemIndex: index,
								deleteItem: () => {
									onChange(items.filter((i) => i.id !== item.id));

									if (item.onAfterItemRemove) {
										onAfterItemRemove(item);
									}
								},
							})}
						</DraggableContext.Provider>
					)}
				</div>
			))}
		</div>
	);
};
