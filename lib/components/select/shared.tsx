import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button, ListBoxItem, SelectStateContext } from 'react-aria-components';

import { Icon } from '../../icons/internal';
import { check, clear } from '../../icons/ui-icons';
import type { Prettify } from '../../utilities/types';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';

export type Primitive = string | number | boolean;

type SelectPropertyValue = string | number | boolean | bigint | symbol | null | undefined | object;

export const isPrimitive = <T,>(value: T): value is T & Primitive => {
	const valueTag = Object.prototype.toString.call(value);

	return valueTag === '[object String]' || valueTag === '[object Number]' || valueTag === '[object Boolean]';
};

export const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

export const getOptionKey = (value: Primitive) => JSON.stringify([value]);

type IconValue = string | JSX.Element | null;

type SelectOption<Value extends Primitive = string> = {
	label: string;
	value: Value;
};

export const isSelectOption = <T,>(value: T): value is T & SelectOption<Primitive> => value instanceof Object && 'value' in value && isPrimitive(value.value);

type GroupValue = {
	label?: ReactNode;
	icon?: IconValue;
	subtitle?: ReactNode;
	endIcon?: IconValue;
};

type GroupValueMapping = object;

const getPropertyValue = <T extends object>(value: T, key: string): SelectPropertyValue => {
	// SAFETY: SelectPropertyValue covers every JavaScript property value exposed by option extensions.
	const entries = Object.entries(value) as Array<[string, SelectPropertyValue]>;

	return entries.find(([entryKey]) => entryKey === key)?.[1];
};

const getGroupValue = <Mapping extends object>(mapping: Mapping | undefined, key: string): GroupValue | undefined => {
	if (!mapping) {
		return undefined;
	}

	// SAFETY: Group mappings are documented as string keys containing GroupValue objects.
	const entries = Object.entries(mapping) as Array<[string, GroupValue]>;

	return entries.find(([entryKey]) => entryKey === key)?.[1];
};

type GroupedOption<Option extends SelectOption<Primitive> = SelectOption> = {
	key: string;
	label: ReactNode;
	icon: ReactNode;
	subtitle: ReactNode;
	endIcon: ReactNode;
	options: Option[];
};

type OptionItemBaseProps = ComponentPropsWithoutRef<typeof ListBoxItem> & {
	children?: ReactNode;
	extraPre?: ReactNode;
	extraAfter?: ReactNode;
	selectIndicator?: boolean;
	value?: Pick<SelectOption<Primitive>, 'label'>;
};

type SelectClearButtonProps = {
	multi?: boolean;
};

type SelectStateValue = {
	value: unknown[] | object | string | null;
	setValue: (value: null) => void;
};

export const OptionItemBase = (props: Prettify<OptionItemBaseProps>) => (
	<ListBoxItem
		{...props}
		textValue={props.value?.label}
		className={({ isSelected }) =>
			clsx(
				'es:select-none',
				'es:min-h-11',
				'es:scroll-m-2 es:scroll-p-2',
				'es:flex es:items-center-safe es:gap-2',
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

				{props.selectIndicator ? (
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
							{check}
						</AnimatedVisibility>
					</div>
				) : null}

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
 * @param {SelectOption[] | SelectOption | Primitive[] | Primitive} value - Current value.
 * @param {SelectOption[]} [options] - Options passed to the component.
 *
 * @returns {SelectOption[] | SelectOption | Primitive[] | Primitive | undefined} Appropriate output for the given input combination.
 */
export const getValue = (simpleValue: boolean, value: SelectOption<Primitive>[] | SelectOption<Primitive> | Primitive[] | Primitive, options?: SelectOption<Primitive>[]) => {
	if (Array.isArray(value)) {
		if (simpleValue) {
			return value.map((singleValue) => options?.find(({ value: itemValue }) => itemValue === singleValue));
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
 * @template Item
 * @param {Item[]} array - The array to modify.
 * @param {Item} itemToMove - The item to move.
 * @param {Item} targetItem - The target item to move relative to.
 * @param {'before' | 'after'} [position='before'] - Where to place the moved item.
 * @returns {Item[]} New array with the item moved.
 */
export const moveArrayItem = <Item,>(array: Item[], itemToMove: Item, targetItem: Item, position: 'before' | 'after' = 'before') => {
	const result = [...array];
	const sourceIndex = result.indexOf(itemToMove);
	const targetIndex = result.indexOf(targetItem);

	if (sourceIndex === -1 || targetIndex === -1) {
		return result;
	}

	result.splice(sourceIndex, 1);

	let adjustedTargetIndex = targetIndex;

	if (position === 'after') {
		adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex : targetIndex + 1;
	} else if (sourceIndex < targetIndex) {
		adjustedTargetIndex = targetIndex - 1;
	}

	result.splice(adjustedTargetIndex, 0, itemToMove);

	return result;
};

export const SelectClearButton = ({ multi = false }: Prettify<SelectClearButtonProps>) => {
	// SAFETY: React Aria provides this context to descendants of its Select component.
	const state = useContext(SelectStateContext) as SelectStateValue | null;
	const isEmpty = multi ? state?.value === null || (Array.isArray(state?.value) && state.value.length === 0) : state?.value === null;

	return (
		<Button
			aria-label={__('Clear value', 'eightshift-ui-components')}
			className={clsx(
				'es:flex es:items-center es:justify-center',
				'es:rounded-md es:hover:rounded-lg es:pressed:rounded-xl',
				'es:text-secondary-600 es:hover:bg-red-700/4 es:hover:text-red-700 es:disabled:text-secondary-300',
				'es:h-7 es:px-1',
				'es:any-focus:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
				'es:transition-plus',
				isEmpty ? 'es:hidden' : 'es:flex',
			)}
			onPress={() => state?.setValue(null)}
			slot={null}
		>
			{clear}
		</Button>
	);
};

/**
 * Groups options by a key.
 *
 * @param {SelectOption[]} [filteredOptions] - Options to group.
 * @param {string} [groupKey] - Key to group by.
 * @param {GroupValueMapping} [groupValueMapping] - Mapping of group keys to labels and icons.
 *
 * @returns {GroupedOption[] | null} Grouped options.
 */
export const getGroupedOptions = <Option extends SelectOption<Primitive>, Mapping extends object = GroupValueMapping>(
	filteredOptions?: Option[] | null,
	groupKey?: string,
	groupValueMapping?: Mapping,
): GroupedOption<Option>[] | null => {
	if (!groupKey || !filteredOptions || filteredOptions.length === 0) {
		return null;
	}

	const groups = new Map<string, Option[]>();

	for (const item of filteredOptions) {
		const groupValue = getPropertyValue(item, groupKey);
		const key = isStringValue(groupValue) ? groupValue : '_other';
		const options = groups.get(key) ?? [];

		options.push(item);
		groups.set(key, options);
	}

	return [...groups].map(([key, options]) => {
		const mapping = getGroupValue(groupValueMapping, key);

		return {
			key,
			label: mapping?.label ?? (key === '_other' ? __('Other', 'eightshift-ui-components') : key),
			icon: mapping?.icon ? <Icon icon={mapping.icon} /> : null,
			subtitle: mapping?.subtitle ?? null,
			endIcon: mapping?.endIcon ? <Icon icon={mapping.endIcon} /> : null,
			options,
		};
	});
};
