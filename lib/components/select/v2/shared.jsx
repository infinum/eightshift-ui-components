import { ListBoxItem } from 'react-aria-components';
import clsx from 'clsx';

export const OptionItemBase = (props) => (
	<ListBoxItem
		{...props}
		textValue={props?.value?.label}
		className='es:group es:any-focus:outline-hidden es:motion-preset-slide-down es:motion-ease-spring-bouncy es:motion-duration-200'
	>
		{props.extraPre}

		<div
			className={clsx(
				'es:flex es:min-h-9 es:select-none es:items-center es:gap-1 es:rounded-xl es:px-2 es:py-1.5 es:transition es:scroll-m-1',
				'es:group-any-focus:outline-hidden es:overflow-clip',
				'es:group-not-selected:hover:bg-secondary-100 es:group-not-selected:hover:outline-hidden',
				'es:group-selected:bg-accent-600/15 es:group-selected:text-accent-950',
				'es:group-selected:group-focus-visible:inset-ring es:group-selected:group-focus-visible:inset-ring-accent-600/30',
				'es:group-not-selected:group-focus-visible:bg-secondary-100 es:group-not-selected:group-focus-visible:outline-hidden',
				'es:group-active:bg-accent-700/15',
			)}
		>
			{props.children}
		</div>

		{props.extraAfter}
	</ListBoxItem>
);
