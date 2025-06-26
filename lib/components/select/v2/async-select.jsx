import { useAsyncList } from 'react-stately';
import { __ } from '@wordpress/i18n';
import { Label, Input, Button, Popover, ListBox, ComboBox } from 'react-aria-components';
import { OptionItemBase } from './shared';
import { RichLabel } from '../../rich-label/rich-label';
import { BaseControl } from '../../base-control/base-control';
import { useContext, useEffect } from 'react';
import { icons } from '../../../icons';
import { cloneElement } from 'react';
import { isString, unescapeHTML } from '../../../utilities';
import { ComboBoxStateContext } from 'react-aria-components';
import { useRef, useState } from 'react';
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

	const [searchText, setSearchText] = useState(value?.label ?? '');

	const list = useAsyncList({
		// initialFilterText: value?.label,
		async load({ signal, filterText }) {
			const res = await fetch(fetchUrl(filterText), { ...fetchConfig, signal });
			const json = processLoadedOptions(getData(await res.json()));

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

			if (value && !output.find((item) => item.value === value?.value)) {
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
		setSearchText(value?.label ?? '');
		list.setFilterText('');

		if (value?.value) {
			list.setSelectedKeys([value?.value]);
		}
	}, [value?.value]);

	if (hidden) {
		return null;
	}

	return (
		<ComboBox
			onSelectionChange={(selected) => {
				if (selected === null || selected === undefined) {
					onChange(null);

					return;
				}

				const item = list?.getItem(selected) ?? list.items.find((item) => item.value === selected);

				if (!item) {
					if (clearable) {
						onChange(null);
					} else {
						setSearchText(value?.label ?? '');
					}

					return;
				}

				setSearchText(item?.label);

				onChange(item);
			}}
			allowsCustomValue={false}
			selectedKey={value?.value ?? null}
			inputValue={searchText}
			onInputChange={(value) => {
				setSearchText(() => value);
				list.setFilterText(value);
			}}
			items={list.items}
			isDisabled={disabled}
			menuTrigger='focus'
			allowsEmptyCollection
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
						'es:relative es:flex es:max-w-80 es:items-center es:gap-1 es:px-1.5 es:py-1 es:focus-visible:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
						'es:h-9 es:rounded-10 es:border es:border-secondary-300 es:bg-white es:text-sm es:shadow-sm es:transition',
						'es:focus-within:shadow-md',
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
					<Label className='es:w-full'>
						{!customValueDisplay && (
							<RichLabel
								icon={value && !isString(value) && getIcon && getIcon(value)}
								subtitle={value && !isString(value) && <div className='es:pointer-events-none es:select-none es:line-clamp-1 es:text-ellipsis'>{value?.subtitle}</div>}
								label={
									<Input
										className='es:w-full es:focus:text-current es:any-focus:outline-hidden! es:selection:bg-accent-500/20 es:selection:text-accent-950 es:text-ellipsis'
										placeholder={placeholder ?? __('Select...', 'eightshift-ui-components')}
									/>
								}
								className={clsx('es:pr-6 es:grow es:w-full es:*:not-first:inline-block es:*:not-first:w-full', disabled && 'es:grayscale es:pointer-events-none')}
								iconClassName='es:pointer-events-none es:select-none'
							/>
						)}

						{customValueDisplay &&
							customValueDisplay({
								item: {
									...value,
									value: getValue && getValue(value),
									subtitle: value && !isString(value) && value?.subtitle,
									icon: value && !isString(value) && getIcon && getIcon(value),
									meta: getMeta && getMeta(value),
								},
								shouldShowFullItem: value && !isString(value),
								label: (
									<Input
										className='es:w-full es:focus:text-current es:any-focus:outline-hidden! es:selection:bg-accent-500/20 es:selection:text-accent-950 es:text-ellipsis'
										placeholder={placeholder ?? __('Select...', 'eightshift-ui-components')}
									/>
								),
							})}
					</Label>

					{clearable && <ClearButton disabled={disabled} />}

					<Button className={clsx('es:group es:absolute es:bottom-0 es:right-0 es:top-0 es:my-auto es:size-6', disabled ? 'es:text-secondary-300' : 'es:text-secondary-500')}>
						{!customDropdownArrow &&
							cloneElement(icons.dropdownCaretAlt, {
								className: 'es:w-4 es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200',
								'aria-hidden': true,
							})}

						{customDropdownArrow && (
							<div
								aria-hidden='true'
								className='es:group-aria-expanded:-scale-y-100 es:transition-transform es:duration-200'
							>
								{customDropdownArrow}
							</div>
						)}
					</Button>
				</div>
			</BaseControl>

			<Popover
				className={({ isEntering, isExiting, placement }) =>
					clsx(
						'es:flex es:w-76 es:min-w-9 es:max-w-76 es:flex-col es:overflow-x-hidden es:rounded-2xl es:border es:border-secondary-200 es:bg-white es:text-sm es:shadow-xl',
						'es:any-focus:outline-hidden',
						'es:motion-safe:motion-duration-300',
						placement?.includes('top') && 'es:origin-bottom-left',
						placement?.includes('bottom') && 'es:origin-top-left',
						isEntering && placement?.includes('top') && 'es:motion-safe:motion-preset-slide-up-sm',
						isEntering && placement?.includes('bottom') && 'es:motion-safe:motion-preset-slide-down-sm',
						isExiting && placement?.includes('top') && 'es:motion-safe:motion-translate-y-out-[5%]',
						isExiting && placement?.includes('bottom') && 'es:motion-safe:motion-translate-y-out-[-5%]',
						isEntering && 'es:motion-safe:motion-scale-in-95 es:motion-reduce:motion-preset-fade-md',
						isExiting && 'es:motion-safe:motion-scale-out-95 es:motion-safe:motion-blur-out-sm es:motion-opacity-out-0',
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
									{customMenuOption &&
										customMenuOption({
											...item,
											icon: getIcon && getIcon(item),
										})}

									{!customMenuOption && (
										<RichLabel
											icon={item?.icon ?? (getIcon ? getIcon(item) : null)}
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
						<RichLabel
							slot='errorMessage'
							icon={icons.searchEmpty}
							label={__('No results', 'eightshift-ui-components')}
							subtitle={__('Try a different search term', 'eightshift-ui-components')}
							className='es:p-2 es:w-fit es:mx-auto'
							iconClassName='es:text-accent-700 es:icon:size-7!'
							noColor
						/>
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
				'es:shrink-0 es:mr-7 es:flex es:size-6 es:items-center es:justify-center es:rounded es:text-sm es:text-secondary-600 es:transition es:hover:bg-red-50 es:hover:text-red-900 es:any-focus:outline-hidden es:focus:ring-2 es:focus:ring-accent-500/50 es:disabled:text-secondary-300 es:cursor-pointer',
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
