import { useEffect, useId, useRef, useState, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';
import { createSwapy } from 'swapy';
import { DraggableListContext } from './draggable-list-context';
import { clsx } from 'clsx/lite';

const fixIds = (items, itemIdBase) => {
	return items.map((item, i) => ({
		...item,
		id: item?.id ?? `${itemIdBase}-${i}`,
	}));
};

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
 * @param {Function} props.onChange - Function to run when the items change.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {boolean} [props.disabled] - If `true`, item reordering is disabled.
 * @param {string} [props.className] - Classes to pass to the item wrapper.
 * @param {boolean} [props.labelAsHandle=false] - If `true`, the label will be used as the handle for dragging.
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

		items: rawItems,
		onChange,

		icon,
		label,
		subtitle,
		help,
		actions,

		disabled,
		className,

		labelAsHandle,

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
		{ slotId: `${Math.round(Math.random() * 99999)}`, itemId: null },
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
			<DraggableListContext.Provider value={{ labelAsHandle: labelAsHandle }}>
				<div
					ref={ref}
					{...rest}
				>
					{slottedItems.map(({ itemId, slotId, item }, index) => (
						<div
							className='es-uic-group es-uic-transition-colors data-[swapy-highlighted]:es-uic-rounded-md data-[swapy-highlighted]:es-uic-outline-dashed data-[swapy-highlighted]:es-uic-outline-1 data-[swapy-highlighted]:es-uic-outline-teal-500/50'
							data-swapy-slot={slotId}
							key={slotId}
						>
							{item && (
								<div
									className={clsx(
										'es-uic-transition-[background-color,_box-shadow,_border-radius,_border]',
										'group-data-[swapy-highlighted]:es-uic-rounded-md group-data-[swapy-highlighted]:es-uic-bg-white group-data-[swapy-highlighted]:es-uic-shadow',
									)}
									data-swapy-item={itemId}
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
								</div>
							)}
						</div>
					))}
				</div>
			</DraggableListContext.Provider>
		</BaseControl>
	);
};
