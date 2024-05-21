import { Item } from '@react-stately/collections';
import AccordionGroup from './accordion-group';

export const Expandable = (props) => {
	const {
		icon,
		label,
		subtitle,

		className,

		actions,

		keepActionsOnExpand = false,

		disabled,

		children,
	} = props;

	const itemArray = [
		{
			key: 'expandable-item',
			label: label,
			icon: icon,
			subtitle: subtitle,
			labelClassName: className,
			actions: actions,
			keepActionsOnExpand: keepActionsOnExpand,
			children: children,
			disabled: disabled,
		},
	];

	return (
		<AccordionGroup items={itemArray}>
			{(item) => (
				<Item
					key={item.key}
					textValue={item.label}
					label={item.label}
					icon={item.icon}
					subtitle={item.subtitle}
					labelClassName={item.labelClassName}
					actions={item.actions}
					keepActionsOnExpand={item.keepActionsOnExpand}
					disabled={item.disabled}
				>
					{item.children}
				</Item>
			)}
		</AccordionGroup>
	);
};
