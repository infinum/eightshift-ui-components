import { arrayMove } from '@dnd-kit/helpers';
import { RestrictToHorizontalAxis, RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { __ } from '@wordpress/i18n';
import { type HTMLAttributes, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { DraggableContext, type DraggableContextValue } from './draggable-context';
import type { Prettify } from '../../utilities/types';

type DragAxis = 'both' | 'horizontal' | 'vertical';

type SortableState = {
	initialIndex?: number;
	index?: number;
};

type DragOperationEvent = {
	canceled?: boolean;
	operation?: {
		source?: {
			sortable?: SortableState;
		};
	};
};

type DraggableRenderContext<TItem extends Record<string, unknown>> = TItem & {
	updateData: (newValue: Partial<TItem>) => void;
	itemIndex: number;
	deleteItem: () => void;
};

type DraggableProps<TItem extends Record<string, unknown>> = HTMLAttributes<HTMLDivElement> & {
	children: (item: DraggableRenderContext<TItem>) => ReactNode;
	items?: TItem[] | null;
	onChange: (items: TItem[]) => void;
	noReorder?: boolean;
	axis?: DragAxis;
	onAfterItemRemove?: (item: TItem) => void;
	hidden?: boolean;
	className?: string;
};

type SortableItemProps = {
	id: string;
	index: number;
	disabled?: boolean;
	axis: DragAxis;
	children: (handleRef: DraggableContextValue['handleRef'], isDragSource: boolean, status: DraggableContextValue['status']) => ReactNode;
};

type SortableModifier = typeof RestrictToElement | typeof RestrictToHorizontalAxis;

const getSortableIndexes = (event: DragOperationEvent): { oldIndex: number; newIndex: number } | null => {
	const oldIndex = event.operation?.source?.sortable?.initialIndex;
	const newIndex = event.operation?.source?.sortable?.index;

	if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') {
		return null;
	}

	return { oldIndex, newIndex };
};

const SortableItem = ({ id, index, disabled, children, axis }: SortableItemProps) => {
	const [element, setElement] = useState<HTMLDivElement | null>(null);
	const handleRef = useRef<HTMLDivElement | null>(null);
	const modifiers: SortableModifier[] = [RestrictToElement];

	if (axis === 'horizontal') {
		modifiers.push(RestrictToHorizontalAxis);
	} else if (axis === 'vertical') {
		modifiers.push(RestrictToVerticalAxis);
	}

	const { isDragSource } = useSortable({
		id,
		index,
		element,
		type: 'item',
		modifiers,
		transition: { idle: true, duration: 400, easing: 'cubic-bezier(0, 0.55, 0.45, 1)' },
		handle: handleRef,
		disabled,
	});
	const status: DraggableContextValue['status'] = isDragSource ? 'dragging' : 'idle';

	return <div ref={setElement}>{children(handleRef, isDragSource, status)}</div>;
};

/**
 * A component that allows re-ordering items freely.
 *
 * @component
 * @param {DraggableProps} props - Component props.
 *
 * @returns {JSX.Element} The Draggable component.
 *
 * @example
 * <Draggable
 * 	items={items}
 * 	onChange={setItems}
 * >
 * 	{(item) => {
 * 		const { title } = item;
 *
 * 		return (
 * 			<div>
 * 				<DraggableHandle />
 * 				<span>{title}</span>
 * 			</div>
 * 		);
 * 	}}
 * </Draggable>
 */
export const Draggable = <TItem extends Record<string, unknown>>(props: Prettify<DraggableProps<TItem>>) => {
	const { children, items, onChange, noReorder, axis = 'both', className, onAfterItemRemove, hidden, ...rest } = props;

	const normalizedItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

	if (typeof items === 'undefined' || items === null || !Array.isArray(items)) {
		console.warn(__("Draggable: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const [internalIds, setInternalIds] = useState<number[]>(normalizedItems.map((_, itemIndex) => itemIndex));

	useEffect(() => {
		setInternalIds((currentIds) => {
			if (normalizedItems.length === currentIds.length) {
				return currentIds;
			}

			return normalizedItems.map((_, itemIndex) => itemIndex);
		});
	}, [normalizedItems]);

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

					const sortableIndexes = getSortableIndexes(event as DragOperationEvent);

					if (!sortableIndexes) {
						return;
					}

					const { oldIndex, newIndex } = sortableIndexes;

					onChange(arrayMove(normalizedItems, oldIndex, newIndex));
					setInternalIds(arrayMove(internalIds, oldIndex, newIndex));
				}}
			>
				{normalizedItems.map((item, itemIndex) => (
					<SortableItem
						key={`item-${internalIds?.[itemIndex] ?? itemIndex}`}
						id={`item-${internalIds?.[itemIndex] ?? itemIndex}`}
						index={itemIndex}
						disabled={noReorder}
						axis={axis}
					>
						{(handleRef, isDragSource, status) => (
							<DraggableContext.Provider value={{ isDragSource, handleRef, status }}>
								{children({
									...item,
									updateData: (newValue) => {
										const updated = [...normalizedItems];

										updated[itemIndex] = {
											...updated[itemIndex],
											...newValue,
										} as TItem;

										onChange(updated);
									},
									itemIndex,
									deleteItem: () => {
										onChange(normalizedItems.filter((_, index) => index !== itemIndex));
										setInternalIds(internalIds.filter((_, index) => index !== itemIndex));

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
