import { __ } from '@wordpress/i18n';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { useId, useMemo } from 'react';
import { BaseControl } from '../base-control/base-control';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { RepeaterContext } from './repeater-context';
import { clsx } from 'clsx/lite';
import { List, arrayMove, arrayRemove } from 'react-movable';

const fixIds = (items, itemIdBase) => {
	return items.map((item, i) => ({
		...item,
		id: item?.id ?? `${itemIdBase}-${i}`,
	}));
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
 * @param {Number} [props.maxItems] - The maximum number of items that can be present. If there are more items than this, adding items will be disabled.
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
		maxItems,
		addButton,
		className,
		emptyState,

		hidden,
	} = props;

	const items = useMemo(() => fixIds(rawItems, itemIdBase), [rawItems]);

	const canDelete = items.length > (minItems ?? 0);
	const canAdd = items.length < (maxItems ?? Number.MAX_SAFE_INTEGER);

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
							disabled={addDisabled}
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
								disabled: addDisabled,
							})}
						</div>
					)}
				</>
			}
			className='es-uic-w-full'
		>
			<List
				values={items}
				onChange={({ oldIndex, newIndex }) => onChange(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex))}
				renderList={({ children, props }) => {
					const { key, ...rest } = props;

					return (
						<ul
							key={key}
							className={clsx('es-uic-w-full es-uic-list-none', className)}
							{...rest}
						>
							{children}
						</ul>
					);
				}}
				renderItem={({ value: item, index, isDragged, isSelected, isOutOfBounds, props }) => {
					const { key, ...rest } = props;

					return (
						<li
							className='es-uic-group es-uic-w-full es-uic-list-none focus:es-uic-outline-none'
							key={item?.id ?? key}
							{...rest}
						>
							<RepeaterContext.Provider
								value={{
									...item,
									index,
									deleteItem: () => {
										onChange([...items].filter((i) => i.id !== item.id));

										if (onAfterItemRemove) {
											onAfterItemRemove(item);
										}
									},
									duplicateItem: () => {
										const newItem = { ...item, id: `${itemIdBase}${items.length + 1}` };
										onChange([...items, newItem]);

										if (onAfterItemAdd) {
											onAfterItemAdd(newItem);
										}
									},
									isDragged,
									isOutOfBounds,
									isSelected,
									canDelete,
									canAdd,
								}}
							>
								{children({
									...item,
									updateData: (newValue) => {
										const updated = [...items].map((i) => (i.id === item.id ? { ...i, ...newValue } : i));

										onChange(updated);
									},
									itemIndex: index,
									deleteItem: () => {
										onChange([...items].filter((i) => i.id !== item.id));

										if (onAfterItemRemove) {
											onAfterItemRemove(item);
										}
									},
								})}
							</RepeaterContext.Provider>
						</li>
					);
				}}
				removableByMove
			/>

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
								disabled: addDisabled,
							})}
					</div>
				)}
			</AnimatedVisibility>
		</BaseControl>
	);
};
