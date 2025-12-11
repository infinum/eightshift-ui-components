import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';
import { clsx } from 'clsx';
import { List, arrayMove, arrayRemove } from 'react-movable';
import { Container, ContainerGroup } from '../base-control/container';

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
 * @param {Function} [props.onAfterItemRemove] - Function to run after an item is removed.
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
	const {
		children,

		items,
		onChange,

		icon,
		label,
		subtitle,
		help,
		actions,

		disabled,

		className,
		itemClassName,
		itemContainerClassName,

		labelAsHandle,

		onAfterItemRemove,

		hidden,

		...rest
	} = props;

	if (typeof items === 'undefined' || items === null || !Array.isArray(items)) {
		console.warn(__("DraggableList: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	if (hidden || !items?.length) {
		return null;
	}

	return (
		<BaseControl
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
				values={items}
				onChange={({ oldIndex, newIndex }) => onChange(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex))}
				renderList={({ children, props }) => {
					const { key, ...rest } = props;

					return (
						<ContainerGroup
							as='ul'
							className={clsx('es:w-full es:list-none es:m-0!', itemContainerClassName)}
							{...rest}
						>
							{children}
						</ContainerGroup>
					);
				}}
				renderItem={({ value, index, isDragged, isSelected, props }) => {
					const { key, ...rest } = props;

					return (
						<Container
							as='li'
							key={key}
							accent={isDragged || isSelected}
							elevated={isDragged || isSelected}
							className={clsx('es:list-none es:m-0!', isDragged && 'es:z-99999', itemClassName)}
							data-selected={isDragged || isSelected || props?.style?.position === 'fixed'}
							{...rest}
						>
							{children({
								...value,
								updateData: (newValue) => {
									const updated = [...items];

									updated[index] = {
										...updated[index],
										...newValue,
									};

									onChange(updated);
								},
								itemIndex: index,
								deleteItem: () => {
									onChange(items.filter((_, i) => i !== index));

									if (onAfterItemRemove) {
										onAfterItemRemove(value);
									}
								},
							})}
						</Container>
					);
				}}
			/>
		</BaseControl>
	);
};
