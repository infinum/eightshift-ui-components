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
						'es-uic-relative es-uic-flex es-uic-max-w-80 es-uic-items-center es-uic-gap-1 es-uic-p-1 focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500/50',
						'es-uic-h-9 es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-bg-white es-uic-text-sm es-uic-shadow-sm es-uic-transition',
						'focus:es-uic-outline-none',
						!inline && 'es-uic-w-full',
						disabled && 'es-uic-select-none',
					)}
					ref={ref}
				>
					<Input
						className={clsx(
							'es-uic-peer es-uic-h-6 es-uic-w-full es-uic-grow es-uic-rounded-sm es-uic-p-1 es-uic-text-sm es-uic-text-transparent es-uic-transition',
							'focus:es-uic-text-current focus:es-uic-outline-none',
							'focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500/50',
							'selection:es-uic-bg-teal-500/20 selection:es-uic-text-teal-950',
							disabled && 'es-uic-bg-transparent es-uic-text-gray-400 selection:es-uic-bg-transparent selection:es-uic-text-transparent',
							!(value?.value && list.filterText.length) && 'es-uic-pr-6',
						)}
						placeholder={placeholder ?? __('Select...', 'eightshift-ui-components')}
					/>

					{value && (
						<div
							className={clsx(
								'es-uic-pointer-events-none es-uic-absolute es-uic-bottom-0 es-uic-left-2 es-uic-top-0 es-uic-my-auto es-uic-flex es-uic-select-none es-uic-items-center es-uic-overflow-hidden',
								'has-[svg]:es-uic-left-1 peer-data-[focused=true]:es-uic-invisible peer-disabled:es-uic-opacity-40',
								clearable ? 'es-uic-right-16' : 'es-uic-right-6',
							)}
						>
							{customValueDisplay && customValueDisplay(value)}

							{!customValueDisplay && (
								<RichLabel
									icon={getIcon(value)}
									label={value?.label}
									subtitle={value?.subtitle}
									className='[&_span]:es-uic-overflow-hidden [&_span]:es-uic-text-ellipsis [&_span]:es-uic-text-nowrap'
								/>
							)}
						</div>
					)}

					{clearable && <ClearButton disabled={disabled} />}

					<Button
						className={clsx(
							'es-uic-group es-uic-absolute es-uic-bottom-0 es-uic-right-0 es-uic-top-0 es-uic-my-auto es-uic-size-6',
							disabled ? 'es-uic-text-gray-300' : 'es-uic-text-gray-500',
						)}
					>
						{cloneElement(icons.dropdownCaretAlt, {
							className: 'es-uic-w-4 group-aria-expanded:-es-uic-scale-y-100 es-uic-transition-transform es-uic-duration-200',
							'aria-hidden': true,
						})}
					</Button>
				</div>
			</BaseControl>

			<Popover
				className={clsx(
					'es-uic-flex es-uic-w-80 es-uic-min-w-9 es-uic-max-w-80 es-uic-flex-col es-uic-overflow-x-hidden es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-text-sm es-uic-shadow-lg',
					'focus:es-uic-outline-none',
					'entering:es-uic-animate-in entering:es-uic-fade-in-0 entering:es-uic-slide-in-from-top-3 entering:es-uic-fill-mode-forwards',
					'exiting:es-uic-animate-out exiting:es-uic-fade-out-0 exiting:es-uic-slide-out-to-top-2 exiting:es-uic-fill-mode-forwards',
				)}
				placement='bottom left'
				triggerRef={ref}
			>
				{!list.isLoading && list.items.length > 0 && (
					<ListBox className='es-uic-space-y-0.5 es-uic-p-1 focus:es-uic-outline-none'>
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

				{list.isLoading && cloneElement(icons.loader, { className: 'es-uic-mx-auto es-uic-my-4 es-uic-animate-spin es-uic-size-5.5 es-uic-text-teal-700' })}

				{!list.isLoading && list.items.length === 0 && (
					<div className='es-uic-flex es-uic-p-2'>
						<Text
							slot='errorMessage'
							className={clsx('es-uic-flex es-uic-w-full es-uic-items-center es-uic-gap-1 es-uic-rounded es-uic-text-amber-950')}
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
				'es-uic-mr-7 es-uic-flex es-uic-h-6 es-uic-w-8 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-text-sm es-uic-text-gray-600 es-uic-transition hover:es-uic-bg-red-50 hover:es-uic-text-red-900 focus:es-uic-outline-none focus:es-uic-ring focus:es-uic-ring-teal-500/50 disabled:es-uic-text-gray-300',
				isEmpty ? 'es-uic-hidden' : 'es-uic-flex',
			)}
			onPress={() => state?.setSelectedKey(null)}
			slot={null}
			isDisabled={disabled || isEmpty}
		>
			{icons.clearAlt}
		</Button>
	);
};
