import { ListBoxItem } from 'react-aria-components';
import clsx from 'clsx';
import { icons } from '../../icons';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';

export const OptionItemBase = (props) => (
	<ListBoxItem
		{...props}
		textValue={props?.value?.label}
		className={({ isSelected }) =>
			clsx(
				'es:select-none',
				'es:min-h-11',
				'es:scroll-m-2 es:scroll-p-2',
				'es:flex es:items-center-safe',
				'es:transition-plus es:ease-out es:duration-400',
				'es:px-3 es:py-1.75',
				'es:not-has-any-icon:pl-3.5',
				isSelected && [
					'es:bg-accent-50',
					'es:rounded-2xl',
					'es:before-selected:rounded-b-md',
					'es:after-selected:rounded-t-md',
					'es:focus-visible:bg-white/90 es:focus-visible:rounded-3xl es:focus-visible:text-accent-700',
					'es:pressed:rounded-4xl',
					'es:hover:bg-accent-100 es:hover:text-accent-800',
					'es:text-accent-800',
				],
				!isSelected && [
					'es:bg-surface-50/90',
					'es:rounded-md',
					'es:first:rounded-t-xl es:last:rounded-b-xl',
					'es:after-current:rounded-t-xl es:before-current:rounded-b-xl',
					'es:hover:rounded-2xl es:pressed:rounded-3xl',
					'es:focus-visible:bg-white/90 es:focus-visible:rounded-2xl es:focus-visible:text-accent-950',
					'es:hover:bg-surface-100/90 es:hover:text-accent-900',
					'es:text-accent-950',
				],
				'es:any-focus:outline-hidden',
			)
		}
	>
		{({ isSelected }) => (
			<>
				{props.extraPre}

				{props.children}

				{props.selectIndicator && (
					<div
						className={clsx(
							'es:transition es:rounded-3xl es:size-5',
							'es:flex es:items-center es:justify-center es:shrink-0',
							'es:ml-auto es:overflow-clip',
							isSelected && 'es:bg-accent-700/15 es:text-accent-900',
							!isSelected && 'es:bg-surface-800/7',
						)}
					>
						<AnimatedVisibility
							transition='scaleRotateFade'
							visible={isSelected}
							className='es:transition-none es:icon:size-3 es:icon:stroke-[1.5]'
							noInitial
						>
							{icons.check}
						</AnimatedVisibility>
					</div>
				)}

				{props.extraAfter}
			</>
		)}
	</ListBoxItem>
);

/**
 * Utils for `simpleValue`-capable components.
 */

/**
 * Handles getting the current value.
 *
 * @param {boolean} simpleValue - Whether `simpleValue` is set.
 * @param {string|{label: string, value: string, metadata: Object<string, any>[]}} value - Current value.
 * @param {{label: string, value: string}[]} options - Options passed to the component.
 *
 * @returns Appropriate output for the given input combination.
 *
 * @preserve
 */
export const getValue = (simpleValue, value, options) => {
	if (Array.isArray(value)) {
		if (simpleValue) {
			return value.map((value) => options?.find(({ value: itemValue }) => itemValue === value));
		}

		return value;
	}

	if (simpleValue) {
		return options?.find(({ value: itemValue }) => itemValue === value);
	}

	return value;
};

/**
 * Moves an array item before or after another item in the array.
 *
 * @param {Array} array - The array to modify
 * @param {*} itemToMove - The item to move
 * @param {*} targetItem - The target item to move relative to
 * @param {'before'|'after'} position - Where to place the moved item ('before' or 'after')
 * @returns {Array} - New array with the item moved
 */
export const moveArrayItem = (array, itemToMove, targetItem, position = 'before') => {
	// Create a copy to avoid modifying the original array
	const result = [...array];

	// Find indexes
	const sourceIndex = result.indexOf(itemToMove);
	const targetIndex = result.indexOf(targetItem);

	// Handle invalid cases
	if (sourceIndex === -1 || targetIndex === -1) {
		return result; // Item not found, return unchanged array
	}

	// Remove item from current position
	result.splice(sourceIndex, 1);

	// Calculate insertion position (targetIndex may have shifted if sourceIndex < targetIndex)
	let adjustedTargetIndex;

	if (position === 'after') {
		adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex : targetIndex + 1;
	} else if (position === 'before') {
		adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
	}

	// Insert item at new position
	result.splice(adjustedTargetIndex, 0, itemToMove);

	return result;
};
