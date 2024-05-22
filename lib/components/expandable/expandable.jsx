import { Item } from '@react-stately/collections';
import AccordionGroup from './accordion-group';

/**
 * A component that allows hiding content in an expandable panel, to declutter the UI.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} props.label - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.className] - Classes to pass to the label.
 * @param {JSX.Element} [props.actions] - Actions to display in the panel header, left of the expand button.
 * @param {boolean} [props.keepActionsOnExpand=false] - If `true`, the actions are not hidden when the panel is expanded.
 * @param {boolean} [props.disabled] - If `true`, the expand button is disabled.
 *
 * @returns {JSX.Element} The Expandable component.
 *
 * @example
 * <Expandable label='My component'>
 * 	...
 * </Expandable>
 *
 * @preserve
 */
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
