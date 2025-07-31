import { __, _n } from '@wordpress/i18n';
import { BaseControl } from '../../base-control/base-control';
import { Label, ListBox, Popover, Button, Autocomplete, SearchField, Input, DialogTrigger, useDragAndDrop, ListBoxItem, Text, DropIndicator } from 'react-aria-components';
import { cloneElement } from 'react';
import { icons } from '../../../icons';
import { OptionItemBase } from './shared';
import { useRef, useEffect } from 'react';
import { RichLabel } from '../../rich-label/rich-label';
import clsx from 'clsx';
import { useAsyncList } from 'react-stately';
import { truncateEnd, unescapeHTML } from '../../../utilities';
import { moveArrayItem } from '../shared';

/**
 * Async multi-select menu.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Label of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {{label: string, value: string, metadata: Object<string, any>?}[]} props.value - Current value of the select.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {boolean} [props.clearable=false] - Whether the select is clearable.
 * @param {boolean} [props.disabled=false] - Whether the select is disabled.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {Function} [props.getLabel] - Function to get the label for the item from the fetched data. `(item: Object<string, any>) => string`
 * @param {Function} [props.getValue] - Function to get the value for the item from the fetched data. `(item: Object<string, any>) => string`
 * @param {Function} [props.getMeta] - Function to get the metadata for the item from the fetched data. `(item: Object<string, any>) => Object<string, any>` (optional)
 * @param {Function} [props.getIcon] - Function to get the icon for the item from the fetched data. `(item: Object<string, any>) => JSX.Element | string`
 * @param {Function} [props.getSubtitle] - Function to get the subtitle for the item from the fetched data. `(item: Object<string, any>) => string`
 * @param {Function} [props.getData] - Function to pre-process the fetched data before it is used in the select. `(data: Object<string, any>[]) => Object<string, any>[]`
 * @param {Function} [props.fetchUrl] - Function to get the URL for fetching data. Provides typed search text if entered. `(searchText: string) => string`
 * @param {Object} [props.fetchConfig] - Configuration object for the fetch request, passed to the `fetch` function.
 * @param {Function} [props.fetchFunction] - Allows overriding the default fetch function. `fetchFunction: (url: string, fetchOptions: Object<string, any>, searchText?: string) => Promise<Object<string, any>>`
 * @param {Function} [props.processLoadedOptions] - Allows processing the options fetched from the source. `(options: Object<string, any>[]) => Object<string, any>[]`
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu. `({ value: string, label: string, subtitle: string, metadata: any }) => JSX.Element`
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item. `({ value: string, label: string, subtitle: string, metadata: any }) => JSX.Element`
 * @param {JSX.Element} [props.customDropdownArrow] - If provided, replaces the default dropdown arrow indicator.
 * @param {string} props.className - Classes to pass to the select menu.
 * @param {boolean} [props.noMinWidth=false] - If `true`, the select menu will not have a minimum width.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The __AsyncMultiSelectNext component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * <__AsyncMultiSelectNext
 * 	label='Select items'
 * 	value={value}
 * 	onChange={setValue}
 * 	fetchUrl={(searchText) => `https://api.example.com/items?search=${searchText}`}
 * 	getLabel={(item) => item?.label}
 * 	getValue={(item) => item?.id}
 * 	getIcon={() => icons.emptyCircle}
 * />
 *
 * @preserve
 */
// eslint-disable-next-line no-underscore-dangle
export const __AsyncMultiSelectNext = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,

		value,
		onChange,

		clearable,
		disabled,
		placeholder = __('Select...', 'eightshift-ui-components'),

		fetchUrl,
		fetchConfig = {},
		fetchFunction,

		getLabel = (item) => item?.label,
		getValue = (item) => item?.value,
		getMeta,
		getIcon,
		getSubtitle,
		getData = (data) => data,

		customMenuOption,
		customValueDisplay,
		customDropdownArrow,

		className,

		noMinWidth,

		hidden,

		processLoadedOptions,

		...rest
	} = props;

	const list = useAsyncList({
		initialSelectedKeys: Array.isArray(value) ? value.map((item) => item?.value) : [],
		getKey: (item) => item.value,
		async load({ signal, filterText }) {
			let json = [];

			if (fetchFunction) {
				const res = await fetchFunction(filterText, signal);
				json = processLoadedOptions ? processLoadedOptions(getData(res)) : getData(res);
			} else {
				const res = await fetch(fetchUrl(filterText), { ...fetchConfig, signal });
				json = processLoadedOptions ? processLoadedOptions(getData(await res.json())) : getData(res);
			}

			const output = json?.map((item, index) => {
				const id = getValue?.(item) ?? index;

				const entry = { label: unescapeHTML(getLabel?.(item) ?? ''), value: id };

				if (getMeta) {
					entry.meta = getMeta(item);
				}

				if (getSubtitle) {
					entry.subtitle = unescapeHTML(getSubtitle(item));
				}

				return entry;
			});

			if (filterText.length > 0) {
				return {
					items: output,
				};
			}

			const extra =
				value
					?.map((val) => {
						if (output?.find((item) => item.value === val?.value)) {
							return null;
						}

						return val;
					})
					?.filter(Boolean) ?? [];

			return {
				items: [...output, ...extra],
			};
		},
	});

	const handleSelectionChange = (rawSelected) => {
		const selected = list.filterText.length > 0 ? new Set([...(value?.map((item) => item?.value) ?? []), ...rawSelected]) : rawSelected;

		list.filterText = '';

		if (selected === null || selected === undefined) {
			onChange(null);

			return;
		}

		if (selected.size === 0) {
			onChange([]);

			return;
		}

		const selectedValues = [...selected]
			.map((item) => {
				const option = list.items.find((option) => option.value === item) || value.find((option) => option.value === item);

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

	const ref = useRef();

	let { dragAndDropHooks } = useDragAndDrop({
		getItems: (keys) => [...keys].map((key) => ({ 'text/plain': key, text: value.find((item) => item.value === key)?.label ?? key })),
		onReorder(e) {
			handleSelectionChange(
				new Set(
					moveArrayItem(
						value?.map((item) => item?.value),
						[...e.keys][0],
						e.target.key,
						e.target.dropPosition,
					),
				),
			);
		},
		renderDragPreview(items) {
			return (
				<div className='es:bg-accent-700 es:rounded-md es:px-1.5 es:py-0.5 es:text-white es:translate-x-7 es:translate-y-6'>
					{truncateEnd(items[0]['text'], 20)}
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
		isDisabled: disabled || value.length < 2,
	});

	// Handle external value changes.
	useEffect(() => {
		if (list.selectedKeys.size !== (value ?? []).length) {
			list.setSelectedKeys(new Set(value?.map((item) => item?.value)));
			list.setFilterText('');
		}
	}, [value]);

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
			<DialogTrigger
				onOpenChange={(isOpen) => {
					if (!isOpen) {
						list.setFilterText('');
					}
				}}
			>
				<Button
					aria-label={__('Select items', 'eightshift-ui-components')}
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
						items={value}
						selectionMode='none'
						dependencies={[value]}
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
									!disabled && value.size >= 2 && 'es:cursor-move',
								)}
							>
								{customValueDisplay && customValueDisplay(truncateEnd(item?.label, 20), item)}
								{!customValueDisplay && <Text slot='label'>{truncateEnd(item?.label, 20)}</Text>}
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
					aria-label={__('Items', 'eightshift-ui-components')}
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:flex es:w-76 es:min-w-9 es:max-w-76 es:flex-col es:overflow-hidden es:rounded-2xl es:border es:border-secondary-200 es:bg-white es:text-sm es:shadow-xl es:inset-ring es:inset-ring-secondary-100',
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
					maxHeight={360}
					triggerRef={ref}
				>
					<Autocomplete
						inputValue={list.filterText}
						onInputChange={list.setFilterText}
					>
						<SearchField
							aria-label={__('Search', 'eightshift-ui-components')}
							className='es:flex es:items-center es:bg-secondary-100 es:m-2 es:rounded-lg es:relative es:placeholder:text-secondary-500'
							autoFocus
						>
							<Input
								placeholder={__('Search...', 'eightshift-ui-components')}
								className='es:peer es:size-full es:h-9 es:outline-hidden es:shadow-none es:px-2.5 es:text-sm es:py-0 es:[&::-webkit-search-cancel-button]:hidden'
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

						{list.isLoading && (
							<div className='es:p-3 es:min-h-16 es:flex es:items-center es:justify-center'>
								{cloneElement(icons.loader, { className: 'es:text-accent-600! es:size-5.5 es:motion-preset-spin es:motion-duration-1500' })}
							</div>
						)}

						<ListBox
							className={clsx('es:space-y-0.5 es:p-1 es:any-focus:outline-hidden es:min-h-16', list.isLoading && 'es:hidden', list?.items?.length > 0 && 'es:overflow-y-auto')}
							items={list.items}
							selectedKeys={list.selectedKeys}
							selectionMode='multiple'
							selectionBehavior='toggle'
							onSelectionChange={(selected) => {
								list.setSelectedKeys(selected);
								handleSelectionChange(selected);
							}}
							dependencies={[value]}
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
								let icon = getIcon ? getIcon(item) : (item?.icon ?? null);

								if (typeof item?.icon === 'string') {
									icon = icons?.[item.icon] ?? null;
								}

								return (
									<OptionItemBase
										id={item?.value}
										className={item?.className}
										selectIndicator
									>
										{customMenuOption && customMenuOption(item)}
										{!customMenuOption && (
											<RichLabel
												icon={icon}
												label={item?.label}
												subtitle={item?.subtitle}
												noColor
											/>
										)}
									</OptionItemBase>
								);
							}}
						</ListBox>

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
					</Autocomplete>
				</Popover>
			</DialogTrigger>
		</BaseControl>
	);
};
