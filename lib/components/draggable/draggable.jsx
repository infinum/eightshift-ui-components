import { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { DraggableContext } from './draggable-context';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToHorizontalAxis, RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { randomId } from '../../utilities';

const removeIds = (arr) => arr.map(({ id, ...item }) => item);

const SortableItem = ({ id, index, disabled, children, axis }) => {
	const [element, setElement] = useState(null);
	const handleRef = useRef(null);

	let modifiers = [RestrictToElement];

	if (axis === 'horizontal') {
		modifiers.push(RestrictToHorizontalAxis);
	}

	if (axis === 'vertical') {
		modifiers.push(RestrictToVerticalAxis);
	}

	const { isDragSource, status } = useSortable({
		id,
		index,
		element,
		type: 'item',
		modifiers,
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

	const [items, setItems] = useState(rawItems.map((item) => ({ ...item, id: item?.id || randomId(6) })));

	// Ensure the internal state is updated if items are updated externally.
	useEffect(() => {
		if (JSON.stringify(rawItems) === JSON.stringify(removeIds(items))) {
			return;
		}

		setItems(rawItems.map((item) => ({ ...item, id: randomId(6) })));
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
				onDragEnd={(event) => {
					if (event?.canceled) {
						return;
					}

					setItems((items) => {
						const newItems = move(items, event);

						onChange(removeIds(newItems));

						return newItems;
					});
				}}
			>
				{items.map(({ id, ...item }, index) => (
					<SortableItem
						key={id}
						id={id}
						index={index}
						item={item}
						disabled={noReorder}
						axis={axis}
					>
						{(handleRef, isDragSource, status) => (
							<DraggableContext.Provider value={{ isDragSource, handleRef, status }}>
								{children({
									...item,
									updateData: (newValue) => {
										const updated = [...items];

										updated[index] = {
											...updated[index],
											...newValue,
										};

										setItems(updated);
										onChange(removeIds(updated));
									},
									itemIndex: index,
									deleteItem: () => {
										setItems([...items].filter((_, i) => i !== index));
										onChange(removeIds([...items].filter((_, i) => i !== index)));

										if (onAfterItemRemove) {
											const { id, ...restItem } = item;
											onAfterItemRemove(restItem);
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
