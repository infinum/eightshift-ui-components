import { useEffect, useId, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { DraggableContext } from './draggable-context';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToHorizontalAxis, RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

const fixIds = (items, itemIdBase) => {
	return (
		items?.map((item, i) => ({
			...item,
			id: item?.id ?? `${itemIdBase}-${i}`,
		})) ?? []
	);
};

const SortableItem = ({ id, index, disabled, children, axis }) => {
	const [element, setElement] = useState(null);
	const handleRef = useRef(null);

	let extraModifiers = [];

	if (axis === 'horizontal') {
		extraModifiers = [RestrictToHorizontalAxis];
	} else if (axis === 'vertical') {
		extraModifiers = [RestrictToVerticalAxis];
	}

	const { isDragSource, status } = useSortable({
		id,
		index,
		element,
		type: 'item',
		modifiers: [RestrictToElement],
		transition: { idle: true, duration: 400, easing: 'cubic-bezier(0, 0.55, 0.45, 1)' }, // 'easeOutCirc'
		handle: handleRef,
		disabled,
	});

	return <div ref={setElement}>{children(handleRef, isDragSource, status)}</div>;
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
 * @param {Function} [props.onAfterItemRemove] - Function to run after an item is removed.
 * @param {'both' | 'horizontal' | 'vertical'} [props.axis='both'] - Which axis to allow dragging on.
 * @param {string} [props.className] - Classes to pass to the component.
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
 * 			<div>
 * 				<DraggableHandle />
 *
 * 				<span>{title}</span>
 * 			</div>
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

		axis = 'both',

		className,

		onAfterItemRemove,

		hidden,
		...rest
	} = props;

	if (typeof rawItems === 'undefined' || rawItems === null || !Array.isArray(rawItems)) {
		console.warn(__("Draggable: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const [items, setItems] = useState(fixIds(rawItems ?? []));

	// Ensure the internal state is updated if items are updated externally.
	useEffect(() => {
		setItems(fixIds(rawItems, itemIdBase));
	}, [rawItems]);

	if (hidden) {
		return null;
	}

	return (
		<div
			className={className}
			{...rest}
		>
			<DragDropProvider
				onDragOver={(event) => setItems((items) => move(items, event))}
				onDragEnd={(event) => {
					if (event?.canceled) {
						return;
					}

					setItems((items) => move(items, event));
					onChange(items);
				}}
			>
				{items.map((item, index) => (
					<SortableItem
						key={item?.id ?? index}
						id={item?.id ?? index}
						index={index}
						item={item}
						disabled={noReorder}
						axis={axis}
					>
						{(handleRef, isDragSource, status) => (
							<DraggableContext.Provider
								key={item.id}
								value={{ isDragSource, handleRef, status }}
							>
								{children({
									...item,
									updateData: (newValue) => {
										const updated = [...items].map((i) => (i.id === item.id ? { ...i, ...newValue } : i));

										onChange(updated);
										setItems(updated);
									},
									itemIndex: index,
									deleteItem: () => {
										setItems([...items].filter((i) => i.id !== item.id));
										onChange([...items].filter((i) => i.id !== item.id));

										if (onAfterItemRemove) {
											onAfterItemRemove(item);
										}
									},
								})}
							</DraggableContext.Provider>
						)}
					</SortableItem>
				))}
			</DragDropProvider>
		</div>
	);
};
