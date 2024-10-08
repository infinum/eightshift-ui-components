import { Fragment } from 'react';

/**
 * A simple component to manage a collection of items.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object<string, any>[]} props.items - Items to show.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The ItemCollection component.
 *
 * @example
 * <ItemCollection
 *    items={items}
 *    onChange={setItems}
 * >
 *    {({ title, updateData, deleteItem }) => (
 *       <div>
 *          <InputField
 *             label={__('Title', 'demo')}
 *             value={title}
 *             onChange={(title) => updateData({ title })}
 *          />
 *       </div>
 *    )}
 * </ItemCollection>
 *
 * @preserve
 */
export const ItemCollection = (props) => {
	const { children, items = [], onChange, hidden } = props;

	if (hidden) {
		return null;
	}

	return items.map((item, index) => (
		<Fragment key={index}>
			{children({
				...item,
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
					onChange([...items].filter((_, i) => i !== index));
				},
			})}
		</Fragment>
	));
};
