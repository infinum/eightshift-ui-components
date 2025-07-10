import { __ } from '@wordpress/i18n';
import { BaseControl } from '../../base-control/base-control';
import { Select, Label, ListBox, Popover, Button, SelectValue, SelectStateContext, Autocomplete, SearchField, Input } from 'react-aria-components';
import { useContext, cloneElement, useEffect } from 'react';
import { icons } from '../../../icons';
import { OptionItemBase } from './shared';
import { useRef } from 'react';
import { RichLabel } from '../../rich-label/rich-label';
import { useAsyncList } from 'react-stately';
import { unescapeHTML } from '../../../utilities';
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
 * @param {boolean} [props.noSearch=false] - Whether the search is disabled.
 * @param {boolean} [props.disabled=false] - Whether the select is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect=false] - Whether the menu stays open after an select.
 * @param {string} [props.placeholder] - Placeholder text to show when no value is selected.
 * @param {JSX.Element} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu. `({ value: string, label: string, subtitle: string, metadata: any }) => JSX.Element`
 * @param {JSX.Element} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item. `({ value: string, label: string, subtitle: string, metadata: any }) => JSX.Element`
 * @param {JSX.Element} [props.customDropdownArrow] - If provided, replaces the default dropdown arrow indicator.
 * @param {Function} [props.processLoadedOptions] - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Must include `label`, `value`, and `id` keys in the output, additional fields can be added as required.
 * @param {string} props.className - Classes to pass to the select menu.
 * @param {boolean} [props.noMinWidth=false] - If `true`, the select menu will not have a minimum width.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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
// eslint-disable-next-line no-underscore-dangle
export const AsyncSelectNext = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inline,

		value,
		onChange,

		noSearch = false,
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

		getLabel,
		getValue,
		getMeta,
		getIcon,
		getSubtitle,
		getData = (data) => data,

		hidden,

		noMinWidth = false,

		...rest
	} = props;

	const list = useAsyncList({
		getKey: (item) => item.value,
		async load({ signal, filterText }) {
			const res = await fetch(fetchUrl(filterText), { ...fetchConfig, signal });
			const json = processLoadedOptions(getData(await res.json()));

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

	return (
		<Select
			isDisabled={disabled}
			selectedKey={value?.value ?? null}
			onSelectionChange={(selected) => {
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
					className={clsx(
						'es:relative es:flex es:items-center es:gap-1 es:px-1.5 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						'es:h-9 es:rounded-10 es:border es:border-secondary-300 es:bg-white es:text-sm es:shadow-sm es:transition',
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
					<Button className='es:any-focus:outline-hidden es:text-start es:size-full es:inline-block es:group es:overflow-x-clip'>
						<SelectValue>
							{({ selectedItem }) => {
								if (!value?.value) {
									return <span className='es:pointer-events-none es:pr-6 es:text-sm es:text-secondary-500'>{placeholder}</span>;
								}

								if (customValueDisplay) {
									return customValueDisplay(selectedItem);
								}

								let icon = getIcon ? getIcon(selectedItem) : (selectedItem?.icon ?? null);

								if (typeof selectedItem?.icon === 'string') {
									icon = icons?.[selectedItem.icon] ?? null;
								}

								return (
									<RichLabel
										icon={icon}
										label={<span className='es:line-clamp-1'>{selectedItem?.label}</span>}
										subtitle={<span className='es:line-clamp-1'>{selectedItem?.subtitle}</span>}
										className={clsx('es:pr-6 es:grow es:w-full', disabled && 'es:grayscale es:pointer-events-none')}
										iconClassName='es:pointer-events-none es:select-none'
									/>
								);
							}}
						</SelectValue>

						<div
							className={clsx('es:absolute es:bottom-0 es:right-1 es:top-0 es:my-auto es:flex es:items-center', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}
							aria-hidden='true'
						>
							{!customDropdownArrow &&
								cloneElement(icons.dropdownCaretAlt, {
									className: 'es:w-4 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
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
					maxHeight={300}
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
					</Autocomplete>
				</Popover>
			</BaseControl>
		</Select>
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
