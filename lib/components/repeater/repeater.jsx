import { __ } from '@wordpress/i18n';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { useId, useState, useEffect, useRef } from 'react';
import { BaseControl } from '../base-control/base-control';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { ToggleButton } from '../toggle-button/toggle-button';
import { useSortable } from '@dnd-kit/react/sortable';
import { RepeaterContext } from './repeater-context';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { clsx } from 'clsx/lite';

const SortableItem = ({ id, index, disabled, children }) => {
	const [element, setElement] = useState(null);
	const handleRef = useRef(null);

	const { isDragSource, status } = useSortable({
		id,
		index,
		element,
		type: 'item',
		modifiers: [RestrictToVerticalAxis],
		transition: { idle: true, duration: 400, easing: 'cubic-bezier(0, 0.55, 0.45, 1)' }, // 'easeOutCirc'
		handle: handleRef,
		disabled,
	});

	return <div ref={setElement}>{children(handleRef, isDragSource, status)}</div>;
};

/**
 * A component that allows re-ordering a list of items with additional sub-options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.help] - Help text to display below the input.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {Object<string, any>[]} props.items - Data to display in the repeater.
 * @param {boolean} [props.hideEmptyState] - If `true`, the empty state will not be displayed when there are no items.
 * @param {Object<string, any>} [props.addDefaultItem] - Additional properties to add to a new item.
 * @param {boolean} [props.addDisabled] - If `true`, the add button is disabled.
 * @param {Function} props.onChange - Function to run when the items change.
 * @param {Function} [props.onAfterItemAdd] - Function to run after an item is added.
 * @param {Function} [props.onAfterItemRemove] - Function to run after an item is removed.
 * @param {Number} [props.minItems] - The minimum number of items that must be present. If there are less items than this, deleting items will be disabled.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {JSX.Element} [props.addButton] - If provided, overrides the default add button. `(props: { addItem: (additional: Object<string, any>?) => void, disabled: Boolean }) => JSX.Element`.
 * @param {string} [props.className] - Classes to pass to the item wrapper.
 * @param {JSX.Element} [props.emptyState] - Allows overriding the default empty state.
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
 * 				icon={icons.myIcon}
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
 *
 * @preserve
 */
export const Repeater = (props) => {
	const itemIdBase = `item-${useId().replaceAll(':', '')}`;

	const {
		children,
		onChange,
		items: rawItems,
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
		addButton,
		className,
		emptyState,

		hidden,
	} = props;

	const fixIds = (items) => {
		return items.map((item, i) => ({
			...item,
			id: item?.id ?? `${itemIdBase}-${i}`,
		}));
	};

	const [items, setItems] = useState(fixIds(rawItems));

	const [canDelete, setCanDelete] = useState(false);
	const [isPanelOpen, setIsPanelOpen] = useState({});
	const [isDragging, setIsDragging] = useState(false);

	const isAnyPanelOpen = Object.keys(isPanelOpen)?.length < 1 ? false : Object.entries(isPanelOpen).some(([_, v]) => v === true);

	if (canDelete && items.length < (minItems ?? 1)) {
		setCanDelete(false);
	}

	// Ensure the internal state is updated if items are updated externally.
	useEffect(() => {
		setItems(fixIds(rawItems));
	}, [rawItems]);

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

					<AnimatedVisibility visible={items.length > 0}>
						<ToggleButton
							selected={canDelete}
							onChange={setCanDelete}
							size='small'
							icon={icons.trash}
							tooltip={__('Delete items', 'eightshift-ui-components')}
							disabled={minItems && items.length <= minItems}
						/>
					</AnimatedVisibility>

					{!addButton && (
						<Button
							onPress={() => {
								const newItem = { id: `${itemIdBase}${items.length + 1}`, ...addDefaultItem };
								onChange([...items, newItem]);

								if (onAfterItemAdd) {
									onAfterItemAdd(newItem);
								}
							}}
							size='small'
							icon={icons.add}
							className={clsx('[&>svg]:es-uic-size-4', !hideEmptyState && items.length < 1 && 'es-uic-invisible')}
							tooltip={__('Add item', 'eightshift-ui-components')}
							disabled={addDisabled || canDelete}
						/>
					)}

					{addButton && (
						<div className={clsx(!hideEmptyState && items.length < 1 && 'es-uic-invisible')}>
							{addButton({
								addItem: (additional = {}) => {
									const newItem = { id: `${itemIdBase}${items.length + 1}`, ...addDefaultItem, ...additional };
									onChange([...items, newItem]);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								},
								disabled: addDisabled || canDelete,
							})}
						</div>
					)}
				</>
			}
			className='es-uic-w-full'
		>
			<div className={className}>
				<DragDropProvider
					onDragStart={(event) => {
						if (isAnyPanelOpen) {
							event.preventDefault();

							return;
						}

						setIsDragging(true);
					}}
					onDragOver={(event) => {
						if (isAnyPanelOpen) {
							event.preventDefault();

							return;
						}

						const { source, target } = event.operation;

						if (!source || !target) {
							return;
						}

						setItems((items) => move(items, source, target));
					}}
					onDragEnd={(event) => {
						if (isAnyPanelOpen) {
							event.preventDefault();

							return;
						}

						const { source, target } = event.operation;

						if (!source || !target) {
							return;
						}

						if (event.canceled) {
							return;
						}

						setIsDragging(false);

						setItems((items) => move(items, source, target));
						onChange(items);
					}}
				>
					{items.map((item, index) => (
						<SortableItem
							key={item.id}
							id={item.id}
							index={index}
							item={item}
							disabled={canDelete || isAnyPanelOpen}
						>
							{(handleRef, isDragSource, status) => {
								return (
									<RepeaterContext.Provider
										key={item.id}
										value={{
											...item,
											index,
											canDelete,
											deleteItem: () => {
												setItems([...items].filter((i) => i.id !== item.id));
												onChange([...items].filter((i) => i.id !== item.id));

												if (onAfterItemRemove) {
													onAfterItemRemove(item);
												}
											},
											handleOpenChange: (isOpen) => setIsPanelOpen((data) => ({ ...data, [item.id]: isOpen })),
											isDragSource,
										}}
									>
										<div className='es-uic-relative'>
											<Button
												size='small'
												className={clsx(
													'es-uic-absolute es-uic-bottom-0 es-uic-left-1 es-uic-top-0 es-uic-z-20 es-uic-my-auto es-uic-h-6 es-uic-w-4 -es-uic-translate-x-full !es-uic-text-gray-500 es-uic-opacity-50 focus:es-uic-opacity-100 [&_svg]:es-uic-shrink-0',
													(isAnyPanelOpen || canDelete) && 'es-uic-pointer-events-none es-uic-invisible !es-uic-cursor-default',
												)}
												type='ghost'
												icon='⋮'
												// Temporarily commented out.
												// tooltip={!isDragSource && status === 'idle' && __('Re-order', 'eightshift-ui-components')}
												forwardedRef={handleRef}
											/>

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
										</div>
									</RepeaterContext.Provider>
								);
							}}
						</SortableItem>
					))}
				</DragDropProvider>
			</div>

			<AnimatedVisibility visible={items.length < 1}>
				{emptyState}

				{!hideEmptyState && (
					<div className='es-uic-flex es-uic-flex-col es-uic-items-center es-uic-gap-2 es-uic-rounded-md es-uic-border es-uic-border-dashed es-uic-border-gray-300 es-uic-p-4 es-uic-text-center es-uic-text-sm es-uic-text-gray-400'>
						{!addButton && (
							<Button
								onPress={() => {
									const newItem = { id: `${itemIdBase}${items.length + 1}`, ...addDefaultItem };
									onChange([...items, newItem]);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								}}
								size='small'
								icon={icons.add}
								className='[&>svg]:es-uic-size-4'
								disabled={addDisabled}
							>
								{__('Add item', 'eightshift-ui-components')}
							</Button>
						)}

						{addButton &&
							!hideEmptyState &&
							addButton({
								addItem: (additional = {}) => {
									const newItem = { id: `${itemIdBase}${items.length + 1}`, ...addDefaultItem, ...additional };
									onChange([...items, newItem]);

									if (onAfterItemAdd) {
										onAfterItemAdd(newItem);
									}
								},
								disabled: addDisabled || canDelete,
							})}
					</div>
				)}
			</AnimatedVisibility>
		</BaseControl>
	);
};
