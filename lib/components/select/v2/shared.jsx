import { ListBoxItem } from 'react-aria-components';
import clsx from 'clsx';
import { icons } from '../../../icons';
import { AnimatedVisibility } from '../../animated-visibility/animated-visibility';

export const OptionItemBase = (props) => (
	<ListBoxItem
		{...props}
		textValue={props?.value?.label}
		className='es:group es:any-focus:outline-hidden es:motion-preset-slide-down es:motion-ease-spring-bouncy es:motion-duration-200'
	>
		{({ isSelected }) => (
			<>
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

					{props.selectIndicator && (
						<div
							className={clsx(
								'es:size-5 es:grid es:place-items-center es:grid-cols-1 es:grid-rows-1 es:*:row-start-1 es:*:col-start-1',
								'es:transition es:cursor-pointer',
								'es:bg-radial es:border es:rounded-md',
								'es:shadow-xs es:inset-ring es:inset-shadow-xs',
								'es:any-focus:outline-hidden es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/50',
								!isSelected && 'es:group-focus-visible:border-accent-500',
								!isSelected && 'es:border-secondary-300 es:inset-ring-secondary-100 es:inset-shadow-secondary-100/50',
								!isSelected && 'es:from-secondary-50 es:to-white es:text-secondary-600 es:hover:text-accent-950',
								!isSelected && 'es:hover:inset-shadow-secondary-100 es:hover:to-secondary-100 es:hover:inset-ring-secondary-100',
								isSelected && 'es:text-white es:from-accent-500 es:to-accent-600',
								isSelected && 'es:shadow-accent-600/30 es:border-accent-700 es:inset-ring es:inset-ring-accent-600 es:inset-shadow-accent-400/75',
								isSelected && 'es:group-focus-visible:inset-ring-accent-600 es:group-focus-visible:inset-shadow-xs es:group-focus-visible:inset-shadow-accent-400',
								'es:ml-auto',
							)}
						>
							<AnimatedVisibility
								transition='scaleRotateFade'
								visible={isSelected}
								className='es:transition-none es:icon:size-3 es:icon:stroke-3'
								noInitial
							>
								{icons.check}
							</AnimatedVisibility>
						</div>
					)}
				</div>

				{props.extraAfter}
			</>
		)}
	</ListBoxItem>
);
