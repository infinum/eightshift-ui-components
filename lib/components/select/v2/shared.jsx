import { ListBoxItem } from 'react-aria-components';
import clsx from 'clsx';

export const OptionItemBase = (props) => (
	<ListBoxItem
		{...props}
		textValue={props?.value?.label}
		className={clsx(
			'es:flex es:min-h-9 es:select-none es:items-center es:gap-1 es:rounded es:p-2 es:transition',
			'es:focus:outline-hidden',
			'es:hover:bg-secondary-100 es:hover:outline-hidden',
			'selected:es:bg-accent-600/15 selected:es:text-accent-950',
			'es:focus-visible:bg-secondary-100 es:focus-visible:outline-hidden',
			'es:active:bg-accent-700/15',
		)}
	/>
);
