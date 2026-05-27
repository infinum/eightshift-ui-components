import { __ } from '@wordpress/i18n';
import { Fragment, type ReactNode } from 'react';
import type { Prettify } from '../../utilities/types';

type ItemCollectionRenderContext<TItem extends Record<string, unknown>> = TItem & {
	updateData: (newValue: Partial<TItem>) => void;
	itemIndex: number;
	deleteItem: () => void;
};

type ItemCollectionProps<TItem extends Record<string, unknown>> = {
	children: (item: ItemCollectionRenderContext<TItem>) => ReactNode;
	items?: TItem[] | null;
	onChange: (items: TItem[]) => void;
	hidden?: boolean;
};

/**
 * A simple component to manage a collection of items.
 *
 * @component
 * @param {ItemCollectionProps} props - Component props.
 *
 * @returns {JSX.Element} The ItemCollection component.
 *
 * @example
 * <ItemCollection
 * 	items={items}
 * 	onChange={setItems}
 * >
 * 	{({ title, updateData, deleteItem }) => (
 * 		<div>
 * 			<InputField
 * 				label={__('Title', 'demo')}
 * 				value={title}
 * 				onChange={(nextTitle) => updateData({ title: nextTitle })}
 * 			/>
 * 			<Button onPress={deleteItem}>Remove</Button>
 * 		</div>
 * 	)}
 * </ItemCollection>
 */
export const ItemCollection = <TItem extends Record<string, unknown>>(props: Prettify<ItemCollectionProps<TItem>>) => {
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
					} as TItem;

					onChange(updated);
				},
				itemIndex: index,
				deleteItem: () => {
					onChange(items.filter((_, itemIndex) => itemIndex !== index));
				},
			})}
		</Fragment>
	));
};
