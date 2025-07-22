import { __, _n } from '@wordpress/i18n';
import { BaseControl } from '../../base-control/base-control';
import {
	Label,
	ListBox,
	Popover,
	Button,
	SelectStateContext,
	Autocomplete,
	SearchField,
	Input,
	useFilter,
	DialogTrigger,
	useDragAndDrop,
	ListBoxItem,
	Text,
	DropIndicator,
} from 'react-aria-components';
import { useContext, cloneElement } from 'react';
import { icons } from '../../../icons';
import { OptionItemBase } from './shared';
import { useRef } from 'react';
import { RichLabel } from '../../rich-label/rich-label';
import clsx from 'clsx';
import { getValue } from '../shared';
import { truncateEnd } from '../../../utilities';

/**
 * Moves an array item before or after another item in the array.
 *
 * @param {Array} array - The array to modify
 * @param {*} itemToMove - The item to move
 * @param {*} targetItem - The target item to move relative to
 * @param {'before'|'after'} position - Where to place the moved item ('before' or 'after')
 * @returns {Array} - New array with the item moved
 */
const moveArrayItem = (array, itemToMove, targetItem, position = 'before') => {
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

/**
 * Select menu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.label] - Label of the component.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {{label: string, value: string, metadata: Object<string, any>?}[]} props.options - Options to display in the select. `[{ label: string, value: string }]`.
 * @param {string|{label: string, value: string, metadata: Object<string, any>?}} props.value - Current value of the select.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {boolean} [props.simpleValue=false] - If `true`, instead of using a `{label: '', value: ''}` value type, a string is used (just the value).
 * @param {boolean} [props.clearable] - Whether the select is clearable.
 * @param {boolean} [props.disabled] - Whether the select is disabled.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {JSX.Element} [props.customDropdownArrow] - If provided, replaces the default dropdown arrow indicator.
 * @param {string} [props.className] - Classes to pass to the select menu.
 * @param {boolean} [props.noMinWidth=false] - If `true`, the select menu will not have a minimum width.
 * @param {boolean} [props.searchable] - If `true`, the menu will allow searching through the options.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The SelectNext component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * const options = [
 * 	{ label: 'Option 1', value: 'option-1' },
 * 	{ label: 'Option 2', value: 'option-2' },
 * 	{ label: 'Option 3', value: 'option-3' },
 * ];
 *
 * <SelectNext
 * 	label='Select items'
 * 	options={loadOptions}
 * 	value={value}
 * 	onChange={setValue}
 * />
 *
 * @preserve
 */
// eslint-disable-next-line no-underscore-dangle
export const __MultiSelectNext = (props) => {
	const {
		icon,
		help,
		label,
		inline,
		actions,
		subtitle,

		value,
		onChange,

		options,
		simpleValue = false,

		disabled = false,
		clearable = false,

		placeholder = __('Select...', 'eightshift-ui-components'),

		customMenuOption,
		customValueDisplay,
		customDropdownArrow,

		className,

		noMinWidth = false,

		searchable,

		hidden,

		...rest
	} = props;

	const ref = useRef();

	const { contains } = useFilter({ sensitivity: 'base' });

	const currentValue = getValue(simpleValue, value, options);

	const handleSelectionChange = (selected) => {
		if (selected === null || selected === undefined) {
			onChange(null);

			return;
		}

		if (selected.size === 0) {
			onChange(simpleValue ? '' : []);

			return;
		}

		if (simpleValue) {
			onChange([...selected]);

			return;
		}

		const selectedValues = [...selected]
			.map((item) => {
				const option = options.find((option) => option.value === item);

				if (!option) {
					return null;
				}

				return {
					...option,
				};
			})
			.filter(Boolean);

		onChange(selectedValues);
	};

	const selectedItems = new Set(currentValue?.map((item) => item?.value ?? item ?? null).filter(Boolean));

	let { dragAndDropHooks } = useDragAndDrop({
		getItems: (keys) => [...keys].map((key) => ({ 'text/plain': key, text: currentValue.find((item) => item.value === key)?.label ?? key })),
		onReorder(e) {
			handleSelectionChange(new Set(moveArrayItem(selectedItems, [...e.keys][0], e.target.key, e.target.dropPosition)));
		},
		renderDragPreview(items) {
			return (
				<div className='es:bg-accent-700 es:rounded-md es:px-1.5 es:py-0.5 es:text-white es:translate-x-7 es:translate-y-6'>
					{truncateEnd(items[0]['text'], 18)}
					{items.length > 1 && <span className='badge'>{items.length}</span>}
				</div>
			);
		},
		renderDropIndicator(target) {
			return (
				<DropIndicator
					target={target}
					className='es:w-0.75 es:h-5.5 es:rounded-md es:transition es:inset-ring-0 es:drop-target:bg-accent-600 es:bg-accent-700/30 es:any-focus:outline-hidden es:any-focus:inset-ring-0'
				/>
			);
		},
		isDisabled: disabled || selectedItems.size < 2,
	});

	if (hidden) {
		return null;
	}

	return (
		<BaseControl
			label={label}
			icon={icon}
			subtitle={subtitle}
			actions={actions}
			help={help}
			inline={inline}
			labelAs={Label}
			{...rest}
		>
			<DialogTrigger>
				<Button
					className={clsx(
						'es:group',
						'es:relative es:flex es:items-center es:gap-1 es:py-0.75 es:pl-0.75 es:pr-1.5 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						'es:min-h-9 es:rounded-10 es:border es:border-secondary-300 es:bg-white es:text-sm es:shadow-sm es:transition',
						'es:inset-ring es:inset-ring-secondary-100',
						'es:any-focus:outline-hidden',
						!noMinWidth && 'es:min-w-48',
						!inline && 'es:w-full',
						disabled && 'es:select-none es:shadow-none!',
						'es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:border-accent-500 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-2 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-accent-500/50',
						className,
					)}
					ref={ref}
				>
					<ListBox
						aria-label={__('Selected items', 'eightshift-ui-components')}
						layout='grid'
						items={currentValue}
						selectionMode='none'
						dependencies={[currentValue]}
						className='es:peer es:w-full es:flex es:items-center es:flex-wrap es:gap-0.75 es:has-dragging:inset-ring-1 es:has-dragging:inset-ring-accent-500/10 es:rounded-md es:transition es:leading-tight'
						renderEmptyState={() => <div className='es:text-secondary-500 es:pl-1.5 es:flex es:items-center'>{placeholder}</div>}
						dragAndDropHooks={dragAndDropHooks}
					>
						{(item) => (
							<ListBoxItem
								id={item?.value}
								textValue={item?.label}
								className={clsx(
									'es:inset-ring es:inset-ring-secondary-200/30 es:h-7 es:bg-secondary-100 es:focus-visible:inset-ring-accent-500 es:dragging:cursor-grabbing es:focus:outline-hidden es:py-1 es:px-1.5 es:rounded-7 es:dragging:inset-ring-accent-600/20 es:dragging:bg-transparent es:dragging:text-accent-600/40 es:transition es:flex es:items-center es:gap-1',
									!disabled && selectedItems.size >= 2 && 'es:cursor-move',
								)}
							>
								{customValueDisplay && customValueDisplay(truncateEnd(item?.label, 18), item)}
								{!customValueDisplay && <Text slot='label'>{truncateEnd(item?.label, 18)}</Text>}
							</ListBoxItem>
						)}
					</ListBox>

					<div className='es:shrink-0 es:ml-auto es:peer-has-dragging:hidden'>
						{!customDropdownArrow &&
							cloneElement(icons.dropdownCaretAlt, {
								className: 'es:shrink-0 es:w-4 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
							})}

						{customDropdownArrow && (
							<div
								aria-hidden='true'
								className='es:shrink-0 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200'
							>
								{customDropdownArrow}
							</div>
						)}
					</div>
				</Button>

				<Popover
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:flex es:w-76 es:min-w-9 es:max-w-76 es:flex-col es:-hidden es:rounded-2xl es:border es:border-secondary-200 es:bg-white es:text-sm es:shadow-xl es:inset-ring es:inset-ring-secondary-100',
							'es:any-focus:outline-hidden',
							'es:motion-safe:motion-duration-200 es:motion-safe:motion-ease-spring-bouncy',
							'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
							'es:placement-left:origin-right es:placement-right:origin-left',
							isEntering && 'es:motion-safe:motion-scale-in-95 es:motion-opacity-in-0',
							isEntering &&
								'es:motion-safe:placement-top:motion-translate-y-in-[5%] es:motion-safe:placement-bottom:motion-translate-y-in-[-5%] es:motion-safe:placement-left:motion-translate-x-in-[5%] es:motion-safe:placement-right:motion-translate-x-in-[-5%]',
							isExiting && 'es:motion-safe:motion-scale-out-95 es:motion-opacity-out-0',
							isExiting &&
								'es:motion-safe:placement-top:motion-translate-y-out-[5%] es:motion-safe:placement-bottom:motion-translate-y-out-[-5%] es:motion-safe:placement-left:motion-translate-x-out-[5%] es:motion-safe:placement-right:motion-translate-x-out-[-5%]',
						)
					}
					placement='bottom left'
					maxHeight={300}
					triggerRef={ref}
				>
					{searchable && (
						<Autocomplete filter={contains}>
							<SearchField
								aria-label={__('Search', 'eightshift-ui-components')}
								className='es:flex es:items-center es:bg-secondary-100 es:m-2 es:rounded-lg es:relative es:placeholder:text-secondary-500'
								autoFocus
							>
								<Input
									placeholder={__('Search...', 'eightshift-ui-components')}
									className='es:peer es:size-full es:h-9 es:outline-hidden es:px-2.5 es:shadow-none es:text-sm es:py-0 es:[&::-webkit-search-cancel-button]:hidden'
								/>
								<Button
									aria-label={__('Clear', 'eightshift-ui-components')}
									className={clsx(
										'es:absolute es:right-2 es:top-0 es:bottom-0 es:my-auto',
										'es:flex es:size-6 es:items-center es:justify-center es:rounded es:text-sm es:text-secondary-600 es:transition es:hover:bg-red-50 es:hover:text-red-900 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
										'es:peer-placeholder-shown:opacity-0',
									)}
								>
									{icons.clearAlt}
								</Button>
							</SearchField>

							<div className='es:w-full es:h-px es:bg-secondary-200 es:shrink-0' />

							<ListBox
								selectedKeys={selectedItems}
								selectionMode='multiple'
								className={clsx('es:space-y-0.5 es:p-1 es:any-focus:outline-hidden es:min-h-16', options?.length > 0 && 'es:overflow-y-auto')}
								items={options}
								selectionBehavior='toggle'
								onSelectionChange={handleSelectionChange}
								escapeKeyBehavior='none'
								renderEmptyState={() => (
									<RichLabel
										icon={icons.searchEmpty}
										label={__('No results', 'eightshift-ui-components')}
										subtitle={__('Try a different search term', 'eightshift-ui-components')}
										className='es:min-h-14 es:p-2 es:w-fit es:mx-auto es:motion-preset-slide-up es:motion-ease-spring-bouncy es:motion-duration-200 es:shrink-0'
										iconClassName='es:text-accent-700 es:icon:size-7!'
										noColor
									/>
								)}
							>
								{(item) => {
									let icon = item?.icon ?? null;

									if (typeof item?.icon === 'string') {
										icon = icons?.[item.icon] ?? null;
									}

									return (
										<OptionItemBase
											id={item.value}
											className={item?.className}
										>
											{customMenuOption && customMenuOption(item)}
											{!customMenuOption && (
												<RichLabel
													icon={icon}
													label={item?.label}
													subtitle={item?.subtitle}
												/>
											)}

											{cloneElement(selectedItems.has(item?.value ?? item) ? icons.checkSquare : icons.solidRect, {
												className: 'es:ml-auto',
											})}
										</OptionItemBase>
									);
								}}
							</ListBox>
						</Autocomplete>
					)}

					{!searchable && (
						<ListBox
							autoFocus
							selectionMode='multiple'
							selectionBehavior='toggle'
							selectedKeys={selectedItems}
							onSelectionChange={handleSelectionChange}
							className='es:space-y-0.5 es:p-1 es:any-focus:outline-hidden es:overflow-y-auto'
							items={options}
							escapeKeyBehavior='none'
							renderEmptyState={() => (
								<RichLabel
									icon={icons.searchEmpty}
									label={__('No results', 'eightshift-ui-components')}
									subtitle={__('Try a different search term', 'eightshift-ui-components')}
									className='es:min-h-14 es:p-2 es:w-fit es:mx-auto es:motion-preset-slide-up es:motion-ease-spring-bouncy es:motion-duration-200'
									iconClassName='es:text-accent-700 es:icon:size-7!'
									noColor
								/>
							)}
						>
							{(item) => {
								let icon = item?.icon ?? null;

								if (typeof item?.icon === 'string') {
									icon = icons?.[item.icon] ?? null;
								}

								return (
									<OptionItemBase
										id={item.value}
										className={item?.className}
									>
										{customMenuOption && customMenuOption(item)}
										{!customMenuOption && (
											<RichLabel
												icon={icon}
												label={item?.label}
												subtitle={item?.subtitle}
											/>
										)}

										{cloneElement(selectedItems.has(item?.value ?? item) ? icons.checkSquare : icons.solidRect, {
											className: 'es:ml-auto',
										})}
									</OptionItemBase>
								);
							}}
						</ListBox>
					)}

					{clearable && value.length > 0 && (
						<>
							<div className='es:w-full es:h-px es:bg-secondary-200 es:shrink-0' />

							<Button
								slot='close'
								onPress={() => handleSelectionChange([])}
								className={clsx(
									'es:flex es:h-10 es:m-1 es:select-none es:items-center es:gap-1 es:rounded-xl es:px-2 es:py-1.5 es:transition es:scroll-m-1',
									'es:any-focus:outline-hidden es:overflow-clip',
									'es:not-selected:hover:bg-secondary-100 es:not-selected:hover:outline-hidden',
									'es:selected:bg-accent-600/15 es:selected:text-accent-950',
									'es:selected:focus-visible:inset-ring es:selected:focus-visible:inset-ring-accent-600/30',
									'es:not-selected:focus-visible:bg-secondary-100 es:not-selected:focus-visible:outline-hidden',
									'es:active:bg-accent-700/15',
								)}
							>
								<RichLabel
									icon={icons.clearAlt}
									label={__('Clear selection', 'eightshift-ui-components')}
								/>
							</Button>
						</>
					)}
				</Popover>
			</DialogTrigger>
		</BaseControl>
	);
};

const SelectClearButton = () => {
	const state = useContext(SelectStateContext);

	const isEmpty = state?.selectedKey === null;

	return (
		<Button
			aria-label={__('Clear value', 'eightshift-ui-components')}
			className={clsx(
				'es:mr-6 es:flex es:h-6 es:w-8 es:items-center es:justify-center es:rounded es:text-sm es:text-secondary-600 es:transition es:hover:bg-red-50 es:hover:text-red-900 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
				isEmpty ? 'es:hidden' : 'es:flex',
			)}
			onPress={() => state?.setSelectedKey(null)}
			slot={null}
		>
			{icons.clearAlt}
		</Button>
	);
};
