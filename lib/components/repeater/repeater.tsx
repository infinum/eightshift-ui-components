import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { List, arrayMove, arrayRemove, type OnChangeMeta, type RenderItemParams, type RenderListParams } from 'react-movable';
import type { Prettify } from '../../utilities/types';

import { add, moreH, panelCollapse, panelExpand } from '../../icons/internal';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { Button } from '../button/button';
import { Menu, MenuItem, MenuSeparator } from '../menu/menu';
import { RepeaterContext, type RepeaterOpenItems } from './repeater-context';

type RepeaterItemData = Record<string, unknown>;
type RepeaterListItemValue<Item extends RepeaterItemData> = Item & { disabled?: boolean };
type RepeaterChildValue<Item extends RepeaterItemData> = RepeaterListItemValue<Item> & {
	updateData: (newValue: Partial<Item>) => void;
	itemIndex: number;
	deleteItem: () => void;
};
type AddButtonProps<Item extends RepeaterItemData> = {
	addItem: (additional?: Partial<RepeaterListItemValue<Item>>) => void;
	disabled?: boolean;
};

type RepeaterProps<Item extends RepeaterItemData = RepeaterItemData> = {
	children: (item: RepeaterChildValue<Item>) => ReactNode;
	/** Function to run when the items change. */
	onChange: (items: Item[]) => void;
	/** Data to display in the repeater. */
	items: Item[];
	/** Icon to display in the label. */
	icon?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Subtitle to display. */
	subtitle?: ReactNode;
	/** Help text to display below the input. */
	help?: ReactNode;
	/** Actions to display to the right of the label. */
	actions?: ReactNode;
	/** If `true`, the empty state will not be displayed when there are no items. */
	hideEmptyState?: boolean;
	/** Additional properties to add to a new item. Defaults to `{}`. */
	addDefaultItem?: Partial<RepeaterListItemValue<Item>>;
	/** If `true`, the add button is disabled. */
	addDisabled?: boolean;
	/** Function to run after an item is added. */
	onAfterItemAdd?: (item: Item) => void;
	/** Function to run after an item is removed. */
	onAfterItemRemove?: (item: RepeaterListItemValue<Item>) => void;
	/** The minimum number of items that must be present. If there are less items than this, deleting items will be disabled. */
	minItems?: number;
	/** The maximum number of items that can be present. If there are more items than this, adding items will be disabled. */
	maxItems?: number;
	/** If provided, overrides the default add button. */
	addButton?: (props: AddButtonProps<Item>) => ReactNode;
	/** Classes to pass to the item wrapper. */
	className?: string;
	/** Allows overriding the default empty state. */
	emptyState?: ReactNode;
	/** If `true`, the "Expand all"/"Collapse all" button is not displayed. */
	noExpandAllButton?: boolean;
	/** If `true`, the "Duplicate" button is not displayed. */
	noDuplicateButton?: boolean;
	/** If `true`, the "drag to remove" functionality will be disabled. */
	noDragToRemove?: boolean;
	/** Options to add in the "More options" menu. */
	moreOptions?: ReactNode;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	itemLabelProp?: string;
};

/**
 * A component that allows re-ordering a list of items with additional sub-options.
 *
 * @component
 * @param {RepeaterProps} props - Component props.
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
 * 				icon={myIcon}
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
 */
export const Repeater = <Item extends RepeaterItemData>(props: Prettify<RepeaterProps<Item>>) => {
	const {
		children,
		onChange,
		items,
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
		maxItems,
		addButton,
		className,
		emptyState,
		noExpandAllButton,
		noDuplicateButton,
		noDragToRemove,
		moreOptions,
		hidden,
	} = props;

	const [allOpen, setAllOpen] = useState(false);
	const [openItems, setOpenItems] = useState<RepeaterOpenItems>({});

	if (!Array.isArray(items)) {
		console.warn(__("Repeater: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const canDelete = items.length > (minItems ?? 0);
	const canAdd = items.length < (maxItems ?? Number.MAX_SAFE_INTEGER) && !addDisabled;

	const addItem = useCallback(
		(additional: Partial<RepeaterListItemValue<Item>> = {}) => {
			const newItem = { ...addDefaultItem, ...additional } as Item;

			onChange([...items, newItem]);
			onAfterItemAdd?.(newItem);
		},
		[addDefaultItem, items, onAfterItemAdd, onChange],
	);

	const handleListChange = useCallback(
		({ oldIndex, newIndex }: OnChangeMeta) => onChange(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex)),
		[items, onChange],
	);

	const listValues = useMemo<RepeaterListItemValue<Item>[]>(() => items.map((item, index) => ({ ...item, disabled: openItems[index] })), [items, openItems]);

	const renderList = useCallback(
		({ children: listChildren, props: listProps }: RenderListParams) => (
			<ul
				className={clsx('es:w-full es:list-none es:m-0! es:flex es:flex-col es:gap-0.75', className)}
				{...listProps}
			>
				{listChildren}
			</ul>
		),
		[className],
	);

	const renderItem = useCallback(
		({ value: item, index = 0, isDragged, isSelected, isOutOfBounds, props: itemProps }: RenderItemParams<RepeaterListItemValue<Item>>) => {
			const { key, ...rest } = itemProps;

			const deleteItem = () => {
				onChange(items.filter((_, itemIndex) => itemIndex !== index));
				onAfterItemRemove?.(item);
			};

			return (
				<li
					className='es:group es:w-full es:list-none es:any-focus:outline-hidden es:m-0!'
					key={key}
					{...rest}
				>
					<RepeaterContext.Provider
						value={{
							...item,
							index,
							deleteItem,
							duplicateItem: () => addItem(item),
							isDragged,
							isOutOfBounds,
							isSelected,
							canDelete,
							canAdd,
							allOpen,
							setAllOpen,
							setOpenItems,
							isItemOpen: openItems[index] ?? allOpen,
							noDuplicateButton,
						}}
					>
						{children({
							...item,
							updateData: (newValue) => {
								const updatedItems = [...items];

								updatedItems[index] = {
									...updatedItems[index],
									...newValue,
								} as Item;

								onChange(updatedItems);
							},
							itemIndex: index,
							deleteItem,
						})}
					</RepeaterContext.Provider>
				</li>
			);
		},
		[addItem, allOpen, canAdd, canDelete, children, items, noDuplicateButton, onAfterItemRemove, onChange, openItems],
	);

	if (hidden) {
		return null;
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			actions={
				<>
					{actions}

					<Menu
						tooltip={__('More options', 'eightshift-ui-components')}
						triggerIcon={moreH}
						triggerProps={{ type: 'ghost', size: 'small' }}
						hidden={items.length < 1 || (noExpandAllButton && !moreOptions)}
					>
						{!noExpandAllButton ? (
							<MenuItem
								endIcon={allOpen ? panelCollapse : panelExpand}
								onClick={() => setAllOpen(!allOpen)}
							>
								{allOpen ? __('Collapse all', 'eightshift-ui-components') : __('Expand all', 'eightshift-ui-components')}
							</MenuItem>
						) : null}

						{moreOptions ? <MenuSeparator /> : null}
						{moreOptions}
					</Menu>

					{!addButton ? (
						<Button
							onPress={() => addItem()}
							size='small'
							icon={add}
							className={!hideEmptyState && items.length < 1 ? 'es:invisible' : undefined}
							tooltip={__('Add item', 'eightshift-ui-components')}
							disabled={addDisabled || !canAdd}
						/>
					) : null}

					{addButton ? (
						<div className={clsx(!hideEmptyState && items.length < 1 && 'es:invisible')}>
							{addButton({
								addItem,
								disabled: addDisabled,
							})}
						</div>
					) : null}
				</>
			}
			className='es:w-full'
		>
			<List
				values={listValues}
				onChange={handleListChange}
				renderList={renderList}
				renderItem={renderItem}
				removableByMove={!noDragToRemove}
			/>

			<AnimatedVisibility visible={items.length < 1}>
				{emptyState}

				{!hideEmptyState ? (
					<div className='es:flex es:flex-col es:items-center es:gap-2 es:rounded-md es:border es:border-dashed es:border-secondary-300 es:p-4 es:text-center es:text-sm es:text-secondary-400'>
						{!addButton ? (
							<Button
								onPress={() => addItem()}
								size='small'
								icon={add}
								className='es:icon:size-4'
								disabled={addDisabled}
							>
								{__('Add item', 'eightshift-ui-components')}
							</Button>
						) : null}

						{addButton && !hideEmptyState ? addButton({ addItem, disabled: addDisabled }) : null}
					</div>
				) : null}
			</AnimatedVisibility>
		</BaseControl>
	);
};
