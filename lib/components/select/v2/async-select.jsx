import { useAsyncList } from 'react-stately';
import { __ } from '@wordpress/i18n';
import { Text, Label, Input, Button, Popover, ListBox, ComboBox } from 'react-aria-components';
import { OptionItemBase } from './shared';
import { RichLabel } from '../../rich-label/rich-label';
import { BaseControl } from '../../base-control/base-control';
import { useContext } from 'react';
import { icons } from '../../../icons';
import { cloneElement } from 'react';
import { unescapeHTML } from '../../../utilities';
import { useEffect } from 'react';
import { ComboBoxStateContext } from 'react-aria-components';
import { useRef } from 'react';
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
 * @param {Function} [props.processLoadedOptions] - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Must include `label`, `value`, and `id` keys in the output, additional fields can be added as required.
 * @param {string} props.className - Classes to pass to the select menu.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The __ExperimentalAsyncSelect component.
 *
 * @example
 * const [value, setValue] = useState(null);
 *
 * <__ExperimentalAsyncSelect
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
export const __ExperimentalAsyncSelect = (props) => {
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
		placeholder,

		customMenuOption,
		customValueDisplay,

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

		...rest
	} = props;

	let list = useAsyncList({
		// initialFilterText: value?.label,
		async load({ signal, filterText: rawFilterText }) {
			let filterText = rawFilterText.trim();

			const res = await fetch(fetchUrl(filterText), { ...fetchConfig, signal });
			const json = getData(await res.json());

			const output = json?.map((item) => {
				const id = getValue(item);
				const entry = { label: unescapeHTML(getLabel(item)), value: id };

				if (getMeta) {
					entry.meta = getMeta(item);
				}

				if (getSubtitle) {
					entry.subtitle = unescapeHTML(getSubtitle(item));
				}

				return entry;
			});

			return {
				items: output,
			};
		},
	});

	let listItems = [...list.items];

	if (value?.value) {
		const selectedIndex = listItems.findIndex((item) => item.value === value?.value);

		if (selectedIndex === -1) {
			listItems = [{ ...value }, ...listItems];
		}
	}

	// Handle outside updates.
	useEffect(() => {
		if (list.filterText !== value?.label) {
			list.setFilterText(value?.label);
		}

		if (!value && list.filterText) {
			list.setFilterText('');
		}
	}, [value]);

	const ref = useRef();

	if (hidden) {
		return null;
	}

	return (
		<ComboBox
			onSelectionChange={(selected) => {
				if (selected === null || selected === undefined) {
					onChange(null);
					list.setFilterText('');

					return;
				}

				if (selected === value?.value || list.filterText === value?.label) {
					return;
				}

				const item = list?.getItem(selected) ?? listItems.find((item) => item.value === selected);

				if (!item) {
					onChange(null);
					list.setFilterText('');

					return;
				}

				list.setFilterText(item.label);

				onChange(item);
			}}
			allowsCustomValue={false}
			allowsEmptyCollection
			selectedKey={value?.value ?? null}
			inputValue={list.filterText}
			onInputChange={list.setFilterText}
			items={listItems}
			isDisabled={disabled}
			menuTrigger='focus'
			{...rest}
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				help={help}
				actions={actions}
				labelAs={Label}
				inline={inline}
			>
				<div
					className={clsx(
						'es:relative es:flex es:max-w-80 es:items-center es:gap-1 es:p-1 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						'es:h-9 es:rounded-lg es:border es:border-secondary-300 es:bg-white es:text-sm es:shadow-xs es:transition',
						'es:any-focus:outline-hidden',
						!inline && 'es:w-full',
						disabled && 'es:select-none',
						'es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:border-accent-500 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-2 es:has-[[aria-haspopup=listbox][data-focus-visible=true],[aria-autocomplete=list][data-focus-visible=true]]:ring-accent-500/50',
					)}
					ref={ref}
				>
					<Input
						className={clsx(
							'es:peer es:h-6 es:w-full es:grow es:rounded-sm es:p-1 es:pr-6 es:text-sm es:text-transparent es:transition',
							'es:focus:text-current es:any-focus:outline-hidden',
							'es:selection:bg-accent-500/20 es:selection:text-accent-950',
							disabled && 'es:bg-transparent es:text-secondary-400 es:selection:bg-transparent es:selection:text-transparent',
						)}
						placeholder={placeholder ?? __('Select...', 'eightshift-ui-components')}
					/>

					{value && (
						<div
							className={clsx(
								'es:pointer-events-none es:absolute es:bottom-0 es:left-2 es:top-0 es:my-auto es:flex es:select-none es:items-center es:overflow-hidden',
								'es:has-[svg]:left-1 es:peer-data-[focused=true]:invisible es:peer-disabled:opacity-40',
								clearable ? 'es:right-16' : 'es:right-6',
							)}
						>
							{customValueDisplay && customValueDisplay(value)}

							{!customValueDisplay && (
								<RichLabel
									icon={getIcon(value)}
									label={value?.label}
									subtitle={value?.subtitle}
									className='es:[&_span]:overflow-hidden es:[&_span]:text-ellipsis es:[&_span]:text-nowrap'
								/>
							)}
						</div>
					)}

					{clearable && <ClearButton disabled={disabled} />}

					<Button className={clsx('es:group es:absolute es:bottom-0 es:right-0 es:top-0 es:my-auto es:size-6', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}>
						{cloneElement(icons.dropdownCaretAlt, {
							className: 'es:w-4 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
							'aria-hidden': true,
						})}
					</Button>
				</div>
			</BaseControl>

			<Popover
				className={({ isEntering, isExiting }) =>
					clsx(
						'es:flex es:w-80 es:min-w-9 es:max-w-80 es:flex-col es:overflow-x-hidden es:rounded-lg es:border es:border-secondary-200 es:bg-white es:text-sm es:shadow-lg',
						'es:any-focus:outline-hidden',
						isEntering && 'es:motion-safe:motion-preset-slide-down-sm es:motion-safe:motion-duration-300 es:motion-reduce:motion-preset-fade-md',
						isExiting && 'es:not-motion-reduce:motion-translate-y-out-[-2.5%] es:motion-opacity-out-0 es:motion-duration-200',
					)
				}
				placement='bottom left'
				triggerRef={ref}
			>
				{!list.isLoading && list.items.length > 0 && (
					<ListBox className='es:space-y-0.5 es:p-1 es:any-focus:outline-hidden'>
						{(item) => {
							return (
								<OptionItemBase
									id={item.value}
									className={item?.className}
								>
									{customMenuOption && customMenuOption(item)}
									{!customMenuOption && (
										<RichLabel
											icon={item?.icon ?? getIcon(item)}
											label={item?.label}
											subtitle={item.subtitle}
										/>
									)}
								</OptionItemBase>
							);
						}}
					</ListBox>
				)}

				{list.isLoading && cloneElement(icons.loader, { className: 'es:mx-auto es:my-4 es:animate-spin es:size-5.5 es:text-accent-700' })}

				{!list.isLoading && list.items.length === 0 && (
					<div className='es:flex es:p-2'>
						<Text
							slot='errorMessage'
							className={clsx('es:flex es:w-full es:items-center es:gap-1 es:rounded es:text-amber-950')}
						>
							{icons.searchEmpty}
							{__('Nothing found', 'eightshift-ui-components')}
						</Text>
					</div>
				)}
			</Popover>
		</ComboBox>
	);
};

const ClearButton = ({ disabled }) => {
	const state = useContext(ComboBoxStateContext);

	const isEmpty = state?.selectedKey === null || state?.inputValue === '';

	return (
		<Button
			aria-label={__('Clear value', 'eightshift-ui-components')}
			className={clsx(
				'es:mr-7 es:flex es:h-6 es:w-8 es:items-center es:justify-center es:rounded es:text-sm es:text-secondary-600 es:transition es:hover:bg-red-50 es:hover:text-red-900 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
				isEmpty ? 'es:hidden' : 'es:flex',
			)}
			onPress={() => state?.setSelectedKey(null)}
			slot={null}
			isDisabled={disabled || isEmpty}
		>
			{icons.clearAlt}
		</Button>
	);
};
