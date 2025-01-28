import { useId } from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';
import { clsx } from 'clsx/lite';
import { List, arrayMove, arrayRemove } from 'react-movable';

const fixIds = (items, itemIdBase) => {
	return items?.map((item, i) => ({
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

	if (typeof rawItems === 'undefined' || rawItems === null || !Array.isArray(rawItems)) {
		console.warn(__("DraggableList: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const items = fixIds(rawItems ?? [], itemIdBase);

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
			className='es:w-full'
			{...rest}
		>
			<List
				values={items}
				onChange={({ oldIndex, newIndex }) => onChange(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex))}
				renderList={({ children, props }) => {
					const { key, ...rest } = props;

					return (
						<ul
							key={key}
							className='es:w-full es:list-none'
							{...rest}
						>
							{children}
						</ul>
					);
				}}
				renderItem={({ value, index, isDisabled, isDragged, isSelected, isOutOfBounds, props }) => {
					const { key, ...rest } = props;

					return (
						<li
							className={clsx(
								'es:group',
								'es:min-h-8 es:w-full',
								'es:flex es:items-center es:gap-1 es:rounded-lg',
								'es:transition-[box-shadow,background-color,filter,opacity,border-color]',
								'es:border es:border-transparent',
								'es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:focus:border-accent-500',
								isDisabled && 'es:grayscale',
								isDragged && 'es:bg-white es:opacity-50',
								isSelected && 'es:bg-accent-50',
								isDragged ? 'es:cursor-grabbing' : 'es:cursor-grab',
							)}
							key={value?.id ?? key}
							{...rest}
						>
							{children({
								...value,
								updateData: (newValue) => {
									onChange(items.map((i) => (i.id === value.id ? { ...i, ...newValue } : i)));
								},
								itemIndex: index,
								deleteItem: () => {
									onChange(items.filter((i) => i.id !== value.id));

									if (value.onAfterItemRemove) {
										onAfterItemRemove(value);
									}
								},
							})}
						</li>
					);
				}}
			/>
		</BaseControl>
	);
};
