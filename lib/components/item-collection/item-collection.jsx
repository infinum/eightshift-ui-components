import { Fragment } from 'react';
import { __ } from '@wordpress/i18n';

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
	const { children, items: rawItems, onChange, hidden } = props;

	if (hidden) {
		return null;
	}

	if (typeof rawItems === 'undefined' || rawItems === null || !Array.isArray(rawItems)) {
		console.warn(__("ItemCollection: 'items' are not an array or are undefined!", 'eightshift-ui-components'));
	}

	const items = rawItems ?? [];

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
