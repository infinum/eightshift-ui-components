import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentProps, type ReactNode, type Ref, useCallback, useMemo } from 'react';
import { List, arrayMove, arrayRemove, type OnChangeMeta, type RenderItemParams, type RenderListParams } from 'react-movable';
import { Container, type ContainerProps } from '../base-control/container';
import { BaseControl } from '../base-control/base-control';
import type { Prettify } from '../../utilities/types';

type DraggableListRenderContext<TItem extends Record<string, unknown>> = TItem & {
	updateData: (newValue: Partial<TItem>) => void;
	itemIndex: number;
	deleteItem: () => void;
};

type DraggableListProps<TItem extends Record<string, unknown>> = ComponentProps<typeof BaseControl> & {
	children: (item: DraggableListRenderContext<TItem>) => ReactNode;
	/** Data to display in the list. */
	items?: TItem[] | null;
	/** Function to run when the items change. */
	onChange: (items: TItem[]) => void;
	itemClassName?: string;
	itemContainerClassName?: string;
	/** Function to run after an item is removed. */
	onAfterItemRemove?: (item: TItem) => void;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

const TypedBaseControl = BaseControl as (props: ComponentProps<typeof BaseControl> & { children?: ReactNode }) => ReactNode;
const TypedContainer = Container as (props: ContainerProps<'li'> & { ref?: Ref<Element> }) => ReactNode;

/**
 * A component that allows re-ordering a list of items.
 *
 * @component
 * @param {DraggableListProps} props - Component props.
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
 * 				icon={myIcon}
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
 */
export const DraggableList = <TItem extends Record<string, unknown>>(props: Prettify<DraggableListProps<TItem>>) => {
	const { children, items, onChange, icon, label, subtitle, help, actions, className, itemClassName, itemContainerClassName, onAfterItemRemove, hidden, ...rest } = props;

	const normalizedItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

	if (typeof items === 'undefined' || items === null || !Array.isArray(items)) {
		console.warn(__("DraggableList: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const handleListChange = useCallback(
		({ oldIndex, newIndex }: OnChangeMeta) => onChange(newIndex === -1 ? arrayRemove(normalizedItems, oldIndex) : arrayMove(normalizedItems, oldIndex, newIndex)),
		[normalizedItems, onChange],
	);

	const renderList = useCallback(
		({ children: listChildren, props: listProps }: RenderListParams) => {
			return (
				<ul
					ref={listProps.ref}
					className={clsx('es:w-full es:list-none es:m-0!', itemContainerClassName)}
				>
					{listChildren}
				</ul>
			);
		},
		[itemContainerClassName],
	);

	const renderItem = useCallback(
		({ value, index = 0, isDragged, isSelected, props: itemProps }: RenderItemParams<TItem>) => {
			const { key, ref, ...containerProps } = itemProps;

			return (
				<TypedContainer
					as='li'
					key={key}
					accent={isDragged || isSelected}
					elevated={isDragged || isSelected}
					className={clsx('es:list-none es:m-0!', isDragged && 'es:z-99999', itemClassName)}
					data-selected={isDragged || isSelected || containerProps.style?.position === 'fixed'}
					ref={ref}
					{...containerProps}
				>
					{children({
						...value,
						updateData: (newValue) => {
							const updated = [...normalizedItems];

							updated[index] = {
								...updated[index],
								...newValue,
							} as TItem;

							onChange(updated);
						},
						itemIndex: index,
						deleteItem: () => {
							onChange(normalizedItems.filter((_, itemIndex) => itemIndex !== index));

							if (onAfterItemRemove) {
								onAfterItemRemove(value);
							}
						},
					})}
				</TypedContainer>
			);
		},
		[children, itemClassName, normalizedItems, onAfterItemRemove, onChange],
	);

	if (hidden || !normalizedItems.length) {
		return null;
	}

	return (
		<TypedBaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			actions={actions}
			className={clsx('es:w-full', className)}
			{...rest}
		>
			<List
				transitionDuration={200}
				values={normalizedItems}
				onChange={handleListChange}
				renderList={renderList}
				renderItem={renderItem}
			/>
		</TypedBaseControl>
	);
};
