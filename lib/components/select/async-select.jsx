import { __ } from '@wordpress/i18n';
import { BaseControl } from '../base-control/base-control';
import { Select, Label, ListBox, Popover, Button, SelectValue, Autocomplete, SearchField, Input } from 'react-aria-components';
import { cloneElement, useEffect } from 'react';
import { icons, Spinner } from '../../icons';
import { OptionItemBase, SelectClearButton } from './shared';
import { useRef } from 'react';
import { RichLabel } from '../rich-label/rich-label';
import { useAsyncList } from 'react-stately';
import { unescapeHTML } from '../../utilities';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

/**
 * Select menu with async loading.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Label of the component.
 * @param {string} [props.help] - Help text of the component.
 * @param {string} [props.icon] - Icon of the component.
 * @param {string} [props.subtitle] - Subtitle of the component.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to show to the right of the label.
 * @param {boolean} [props.inline] - Whether the Select menu is displayed inline with the label, to the right.
 * @param {{label: string, value: string, metadata: Object<string, any>?}} props.value - Current value of the select.
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
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {SelectSize} [props.size='default'] - Sets the size of the input field.
 * @param {boolean} [props.noMinWidth=false] - If `true`, the select menu will not have a minimum width.
 * @param {string[]} [props.extraItemProps] - List of props to include to the option items.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @typedef {'small' | 'medium' | 'default' | 'large'} SelectSize
 *
 * @returns {JSX.Element} The AsyncSelectNext component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * <AsyncSelectNext
 * 	label='Select items'
 * 	fetchUrl={(searchText) => `https://api.example.com/items?q=${searchText}`}
 * 	value={value}
 * 	onChange={setValue}
 * 	getLabel={(item) => item?.name}
 * 	getValue={(item) => item?.id}
 * />
 *
 * @preserve
 */
export const AsyncSelect = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,

		value,
		onChange,

		disabled = false,
		clearable = false,

		className,
		placeholder = __('Select...', 'eightshift-ui-components'),

		customMenuOption,
		customValueDisplay,
		customDropdownArrow,

		processLoadedOptions = (options) => options,

		fetchUrl,
		fetchConfig = {},
		fetchFunction,

		getLabel = (item) => item?.label,
		getValue = (item) => item?.value,
		getMeta,
		getIcon,
		getSubtitle,
		getData = (data) => data,

		extraItemProps,

		hidden,

		flat,
		size = 'default',
		noMinWidth = false,

		...rest
	} = props;

	const list = useAsyncList({
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

				const entry = { ...item, label: unescapeHTML(getLabel?.(item) ?? ''), value: id };

				if (getSubtitle) {
					entry.subtitle = unescapeHTML(getSubtitle(item));
				}

				return entry;
			});

			if (value && value?.value && (filterText ?? '').length < 1 && output.length > 0 && !output?.find((item) => item.value === value?.value)) {
				return {
					items: [value, ...output.slice(0, -1)],
					selectedKeys: [value?.value],
				};
			}

			return {
				items: output,
			};
		},
	});

	const ref = useRef();

	useEffect(() => {
		// Overwrite first item if the current value is not in the list.
		if (value?.value && !list.getItem(value?.value)) {
			list.items[0] = value;
		}

		list.setSelectedKeys(value?.value ? [value.value] : []);
		list.setFilterText('');
	}, [value?.value]);

	if (hidden) {
		return null;
	}

	const selectClass = cva(
		[
			'es:relative',
			'es:flex es:items-center es:gap-px',
			'es:leading-none',
			'es:rounded-lg es:hover:rounded-xl es:has-focus-visible:rounded-2xl es:group-open:rounded-2xl',
			'es:transition-plus',
			'es:any-focus:outline-hidden',
			'es:inset-ring',
			'es:has-focus-visible:ring-2 es:has-focus-visible:ring-accent-500/30',
			'es:has-focus-visible:text-accent-950 es:has-focus-visible:inset-ring-accent-500',
			clearable && 'es:pr-8',
			'es:focus:placeholder:text-surface-400',
			!noMinWidth && 'es:min-w-48',
			!inline && 'es:w-fill',
			className,
		],
		{
			variants: {
				size: {
					small: ['es:min-h-8', 'es:px-2.5'],
					medium: ['es:min-h-9', 'es:px-3'],
					default: ['es:min-h-10', 'es:px-3'],
					large: ['es:min-h-12', 'es:px-4'],
				},
				disabled: {
					false: 'es:selection:bg-surface-100 es:selection:text-accent-800',
					true: 'es:selection:bg-secondary-200 es:selection:text-secondary-600',
				},
			},
			compoundVariants: [
				{
					flat: false,
					disabled: false,
					class: [
						'es:bg-white',
						'es:bg-linear-to-b es:from-secondary-100/0 es:to-secondary-100/50 es:from-25%',
						'es:hover:from-surface-100/0 es:hover:to-surface-100/50',
						'es:inset-ring-secondary-400/50 es:hover:inset-ring-surface-300 es:focus:inset-ring-surface-400',
						'es:inset-shadow-sm es:inset-shadow-secondary-100/50',
						'es:hover:placeholder:text-surface-400',
						'es:placeholder:text-secondary-400',
						'es:shadow-xs es:shadow-black/5',
					],
				},
				{
					flat: true,
					disabled: false,
					class: [
						'es:inset-ring-secondary-100',
						'es:focus:text-accent-950',
						'es:placeholder:text-secondary-500/80',
						'es:bg-secondary-100 es:focus:bg-surface-50',
						'es:inset-ring-secondary-200/15 es:hover:inset-ring-secondary-200/65 es:focus:inset-ring-surface-200',
					],
				},
				{ disabled: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-200 es:text-secondary-400'] },
				{ readOnly: true, flat: false, class: ['es:bg-secondary-50 es:inset-ring-secondary-300 es:text-secondary-400'] },
				{ readOnly: true, flat: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-300/60 es:text-secondary-400'] },
			],
			defaultVariants: { disabled: false, flat: false, size: 'default' },
		},
	);

	return (
		<Select
			isDisabled={disabled}
			value={value?.value ?? null}
			onChange={(selected) => {
				list.filterText = '';

				if (selected === null || selected === undefined) {
					onChange(null);

					return;
				}

				const item = list.items.find((item) => item.value === selected);

				if (!item) {
					onChange(null);

					return;
				}

				if (item && 'id' in item) {
					delete item.id;
				}

				onChange(item);
			}}
			placeholder={placeholder}
			{...rest}
			className={clsx('es:group es:w-fill', rest?.className)}
		>
			<BaseControl
				label={label}
				icon={icon}
				subtitle={subtitle}
				actions={actions}
				help={help}
				inline={inline}
				labelAs={Label}
			>
				<div
					className={selectClass({ disabled, flat, size })}
					ref={ref}
				>
					<Button className='es:any-focus:outline-hidden es:text-start es:size-full es:inline-block es:group es:overflow-x-clip'>
						<SelectValue>
							{({ isPlaceholder, selectedItems }) => {
								const [selectedItem] = selectedItems;

								if (!isPlaceholder && value && customValueDisplay) {
									return customValueDisplay(selectedItem);
								}

								if (!value) {
									return <span className='es:select-none es:pointer-events-none es:text-sm es:text-surface-500'>{placeholder}</span>;
								}

								let icon = getIcon ? getIcon(selectedItem) : (selectedItem?.icon ?? null);

								if (typeof selectedItem?.icon === 'string') {
									icon = icons?.[selectedItem.icon] ?? null;
								}

								return (
									<RichLabel
										icon={icon}
										label={selectedItem?.label}
										subtitle={selectedItem?.subtitle}
										className={clsx('es:grow es:w-full', disabled && 'es:grayscale es:pointer-events-none')}
										iconClassName='es:pointer-events-none es:select-none'
										labelClassName='es:line-clamp-1'
										subtitleClassName='es:line-clamp-1'
									/>
								);
							}}
						</SelectValue>

						<div
							className={clsx('es:absolute es:bottom-0 es:right-3 es:top-0 es:my-auto es:flex es:items-center', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}
							aria-hidden='true'
						>
							{!customDropdownArrow &&
								cloneElement(icons.dropdownCaret, {
									className: 'es:w-4 es:stroke-[1.2] es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
								})}

							{customDropdownArrow && (
								<div
									aria-hidden='true'
									className='es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200'
								>
									{customDropdownArrow}
								</div>
							)}
						</div>
					</Button>
					{clearable && <SelectClearButton />}
				</div>
				<Popover
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:w-(--trigger-width) es:min-w-72',
							'es:outline-hidden',
							'es:rounded-t-3xl',
							'es:overflow-clip es:grid es:grid-cols-1',
							'es:grid-rows-[auto_minmax(0,1fr)]',
							'es:has-last-selected:rounded-b-20!',
							'es:inset-ring es:inset-ring-surface-500/10',
							'es:inset-shadow-sm es:inset-shadow-white/30',
							!list?.items?.length ? 'es:bg-surface-50/50' : 'es:bg-surface-300/50',
							!list?.items?.length ? 'es:backdrop-blur-sm' : 'es:backdrop-blur-md',
							!list?.items?.length ? 'es:backdrop-brightness-105' : 'es:backdrop-brightness-110',
							list.isLoading || !list?.items?.length ? 'es:rounded-b-3xl' : 'es:rounded-b-xl',
							'es:backdrop-saturate-125',
							'es:shadow-lg es:shadow-black/10',
							'es:transition-plus',
							'es:motion-duration-300 es:motion-ease-spring-bouncy',
							'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
							isEntering && 'es:motion-scale-x-in-95 es:motion-scale-y-in-85 es:motion-opacity-in-0 es:motion-blur-in-[2px]',
							isEntering && 'es:placement-top:motion-translate-y-in-[0.5rem] es:placement-bottom:motion-translate-y-in-[-0.5rem]',
							isExiting && 'es:motion-scale-x-out-95 es:motion-scale-y-out-85 es:motion-opacity-out-0 es:motion-blur-out-xs',
							isExiting && 'es:placement-top:motion-translate-y-out-[0.5rem] es:placement-bottom:motion-translate-y-out-[-0.5rem]',
						)
					}
					placement='bottom left'
					maxHeight={300}
					triggerRef={ref}
				>
					<Autocomplete
						inputValue={list.filterText}
						onInputChange={list.setFilterText}
					>
						<SearchField
							aria-label={__('Search', 'eightshift-ui-components')}
							className='es:flex es:items-center es:relative'
						>
							<Input
								placeholder={__('Search...', 'eightshift-ui-components')}
								className={clsx(
									'es:peer es:size-full es:h-9.5 es:outline-hidden es:pl-3.5 es:pr-9 es:shadow-none es:text-13 es:placeholder:text-surface-500 es:[&::-webkit-search-cancel-button]:hidden',
									'es:bg-accent-900/8 es:m-1.5 es:rounded-3xl',
									'es:inset-ring es:inset-ring-accent-950/7 es:focus:inset-ring-accent-950/20',
									'es:text-accent-950 es:placeholder:text-accent-700/50',
									'es:transition',
								)}
							/>
							<Button
								aria-label={__('Clear', 'eightshift-ui-components')}
								className={clsx(
									'es:absolute es:right-3 es:top-0 es:bottom-0 es:my-auto',
									'es:flex es:size-7 es:items-center es:justify-center es:rounded-3xl es:text-sm es:text-secondary-600 es:transition es:hover:bg-accent-50 es:hover:text-accent-800 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
									'es:peer-placeholder-shown:opacity-0',
								)}
							>
								{icons.clearAlt}
							</Button>
						</SearchField>

						{list.isLoading && (
							<div className='es:p-3 es:min-h-16 es:flex es:items-center es:justify-center'>
								<Spinner />
							</div>
						)}

						<ListBox
							className={clsx('es:space-y-0.75 es:p-1.5 es:pt-0 es:any-focus:outline-hidden es:h-full es:overflow-y-auto es:rounded-t-xl', list?.isLoading && 'es:hidden')}
							items={list.items}
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
												labelClassName='es:line-clamp-1'
												subtitleClassName='es:line-clamp-1'
												noColor
											/>
										)}
									</OptionItemBase>
								);
							}}
						</ListBox>
					</Autocomplete>
				</Popover>
			</BaseControl>
		</Select>
	);
};
