import { ListBoxItem } from 'react-aria-components';
import clsx from 'clsx';

export const OptionItemBase = (props) => (
	<ListBoxItem
		{...props}
		textValue={props?.value?.label}
		className={clsx(
			'es-uic-flex es-uic-min-h-9 es-uic-select-none es-uic-items-center es-uic-gap-1 es-uic-rounded es-uic-p-2 es-uic-transition',
			'focus:es-uic-outline-none',
			'hover:es-uic-bg-gray-100 hover:es-uic-outline-none',
			'selected:es-uic-bg-teal-600/15 selected:es-uic-text-teal-950',
			'focus-visible:es-uic-bg-gray-100 focus-visible:es-uic-outline-none',
			'active:es-uic-bg-teal-700/15',
		)}
	/>
);
