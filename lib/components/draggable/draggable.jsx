import { useEffect, useMemo, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { DraggableContext } from './draggable-context';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToHorizontalAxis, RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { DragDropProvider } from '@dnd-kit/react';
import { arrayMove } from '@dnd-kit/helpers';

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
 */
export const Draggable = (props) => {
	const {
		children,

		items,
		onChange,

		noReorder,

		axis = 'both',

		className,

		onAfterItemRemove,

		hidden,
		...rest
	} = props;

	const normalizedItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

	if (typeof items === 'undefined' || items === null || !Array.isArray(items)) {
		console.warn(__("Draggable: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const [internalIds, setInternalIds] = useState(normalizedItems.map((_, index) => index));

	// Update if external data changes length.
	useEffect(() => {
		setInternalIds((currentIds) => {
			if (normalizedItems.length === currentIds.length) {
				return currentIds;
			}

			return normalizedItems.map((_, index) => index);
		});
	}, [normalizedItems, normalizedItems.length]);

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

					if (!('operation' in event)) {
						return;
					}

					const oldIndex = event?.operation?.source?.sortable?.initialIndex;
					const newIndex = event?.operation?.source?.sortable?.index;

					onChange(arrayMove(normalizedItems, oldIndex, newIndex));
					setInternalIds(arrayMove(internalIds, oldIndex, newIndex));
				}}
			>
				{normalizedItems.map((item, index) => (
					<SortableItem
						key={`item-${internalIds?.[index] ?? index}`}
						id={`item-${internalIds?.[index] ?? index}`}
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
										const updated = [...normalizedItems];

										updated[index] = {
											...updated[index],
											...newValue,
										};

										onChange(updated);
									},
									itemIndex: index,
									deleteItem: () => {
										onChange([...normalizedItems].filter((_, i) => i !== index));
										setInternalIds([...internalIds].filter((_, i) => i !== index));

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
