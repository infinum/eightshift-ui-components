import { Label, Button as ReactAriaButton, Input, Group, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { useRef, cloneElement } from 'react';
import { useAsyncList } from 'react-stately';
import { Spacer } from '../spacer/spacer';
import { Tooltip } from '../tooltip/tooltip';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { RichLabel } from '../rich-label/rich-label';
import { ComboBox } from 'react-aria-components';

/**
 * Component that allows URL selection, with a suggestionList of suggestions and type-to-search.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.url] - The current URL.
 * @param {Function} [props.onChange] - Function to run when the URL changes.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.help] - Help text to display below the input.
 * @param {string} [props.placeholder] - Placeholder to show in the input field.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {JSX.Element} [props.icon=icons.globe] - Icon to display in the label.
 * @param {JSX.Element} [props.removeIcon=icons.clearAlt] - Icon to display in the input's clear button.
 * @param {boolean} [props.disabled=false] - If `true`, the input is disabled.
 * @param {Function} [props.fetchSuggestions] - A function that fetches suggestions based on the input value.
 * @param {string} [props.className] - Classes to pass to the input field.
 * @param {number} [props.inputDebounceDelay=500] - The delay in milliseconds before the input value is considered final.
 * @param {Function} [props.suggestionTypeIconOverride] - Allows overriding the default icon for the suggestion type, e.g. when using CPTs. Should be in the format: `(type) => icon or React component`.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The LinkInput component.
 *
 * @example
 * <LinkInput
 * 	url={url}
 * 	onChange={setUrl}
 * />
 *
 * @preserve
 */
export const LinkInput = (props) => {
	const {
		url,
		onChange,

		label = __('Link', 'eightshift-ui-components'),
		subtitle,
		help,
		actions,

		placeholder = __('Type to search or enter URL', 'eightshift-ui-components'),

		icon = icons.globe,
		removeIcon = icons.clearAlt,

		disabled = false,

		suggestionTypeIconOverride,

		fetchSuggestions,
		className,

		hidden,
	} = props;

	const triggerRef = useRef(null);

	const suggestionList = useAsyncList({
		initialFilterText: url,
		async load({ signal, filterText }) {
			// const items = await fetchSuggestions(inputValue, signal);
			const items = await fetchSuggestions(filterText, signal);

			return {
				items: items ?? [],
			};
		},
	});

	const shouldShowSuggestions = (() => {
		if (!url) {
			return false;
		}

		return !(
			url?.trim()?.length < 4 ||
			url?.startsWith('#') ||
			url?.startsWith(':') ||
			url?.startsWith('mailto') ||
			url?.startsWith('tel') ||
			url?.startsWith('http') ||
			url?.startsWith('www')
		);
	})();

	if (hidden) {
		return null;
	}

	return (
		<ComboBox
			items={suggestionList.items}
			inputValue={suggestionList.filterText}
			onInputChange={(value) => {
				onChange({ url: value, isAnchor: value?.includes('#') });
				suggestionList.setFilterText(value);
			}}
			allowsCustomValue
			allowsEmptyCollection={shouldShowSuggestions}
			isDisabled={disabled}
		>
			<BaseControl
				as={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				actions={actions}
				labelAs={Label}
				help={help}
			>
				<Group
					className='es-uic-relative'
					ref={triggerRef}
				>
					<Input
						placeholder={placeholder}
						className={clsx(
							'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-py-2 es-uic-pl-2 es-uic-pr-1 es-uic-text-sm es-uic-shadow-sm es-uic-transition selection:es-uic-bg-teal-500/20 selection:es-uic-text-teal-950',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
							url?.length > 0 && 'es-uic-pr-10',
							className,
						)}
					/>

					<AnimatedVisibility
						visible={url?.length > 0}
						className='es-uic-absolute es-uic-inset-y-1 es-uic-right-1'
						transition='fade'
					>
						<ReactAriaButton
							slot={null}
							onPress={() => {
								suggestionList.setFilterText('');
								onChange({ url: undefined, isAnchor: false });
							}}
							className='focus:es-uic-outline-none'
						>
							<Tooltip text={__('Clear', 'eightshift-ui-components')}>
								<div
									className={clsx(
										'es-uic-flex es-uic-size-8 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-bg-white/85 es-uic-text-gray-600 es-uic-backdrop-blur es-uic-transition',
										'hover:es-uic-bg-red-50 hover:es-uic-text-red-500',
										'[&>svg]:es-uic-size-6',
									)}
								>
									{removeIcon}
								</div>
							</Tooltip>
						</ReactAriaButton>
					</AnimatedVisibility>
				</Group>
			</BaseControl>

			<Popover
				aria-label={__('URL suggestions', 'eightshift-ui-components')}
				className={({ isEntering, isExiting }) =>
					clsx(
						'es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow-lg es-uic-outline-none',
						isEntering && 'es-uic-animate-in es-uic-fade-in-0 es-uic-slide-in-from-top-3 es-uic-fill-mode-forwards',
						isExiting && 'es-uic-animate-out es-uic-fade-out-0 es-uic-slide-out-to-top-2 es-uic-fill-mode-forwards',
						!shouldShowSuggestions && suggestionList.items.length < 1 && 'es-uic-invisible',
					)
				}
				style={{
					width: `${triggerRef.current?.offsetWidth}px`,
				}}
			>
				{shouldShowSuggestions && suggestionList.isLoading && (
					<RichLabel
						icon={cloneElement(icons.emptyCircle, { className: 'es-uic-animate-spin' })}
						label={__('Loading suggestions', 'eightshift-ui-components')}
						className='es-uic-min-h-12 es-uic-p-2'
					/>
				)}

				{shouldShowSuggestions && !suggestionList.isLoading && suggestionList.items.length === 0 && (
					<RichLabel
						icon={icons.searchEmpty}
						label={__('No results', 'eightshift-ui-components')}
						subtitle={__('Try a different search term.', 'eightshift-ui-components')}
						className='es-uic-min-h-12 es-uic-p-2'
					/>
				)}

				{!suggestionList.isLoading && suggestionList.items.length > 0 && (
					<>
						<ListBox className='es-uic-space-y-1 es-uic-p-1'>
							{(item) => {
								const {
									label: title,
									value: url,
									metadata: { subtype: rawSubtype },
								} = item;

								const subtype = rawSubtype ?? 'page';

								let typeIcon = icons.file;

								if (subtype.toLowerCase() === 'url') {
									typeIcon = icons.externalLink;
								} else if (subtype.toLowerCase() === 'attachment') {
									typeIcon = icons.file;
								} else if (subtype.toLowerCase() === 'category') {
									typeIcon = icons.layoutAlt;
								} else if (subtype.toLowerCase() === 'internal') {
									typeIcon = icons.anchor;
								} else if (subtype.toLowerCase() === 'eightshift-forms') {
									typeIcon = icons.formAlt;
								}

								if (suggestionTypeIconOverride) {
									const overrideIcon = suggestionTypeIconOverride(subtype);

									if (overrideIcon) {
										typeIcon = overrideIcon;
									}
								}

								return (
									<ListBoxItem
										id={item.value}
										className={clsx(
											'es-uic-rounded es-uic-p-1 es-uic-text-sm es-uic-transition',
											'hover:es-uic-border-gray-300 hover:es-uic-bg-gray-100',
											'focus-visible:es-uic-border-gray-300 focus-visible:es-uic-bg-gray-100',
											'selected:es-uic-bg-teal-600/10 selected:es-uic-text-teal-900 selected:focus-visible:es-uic-bg-teal-600/15',
										)}
										textValue={url}
									>
										<RichLabel
											icon={typeIcon}
											label={title}
											subtitle={url?.replace(location.origin, '').replace(/\/$/, '')}
											noColor
										/>
									</ListBoxItem>
								);
							}}
						</ListBox>

						<Spacer border />

						<div className='es-uic-grid es-uic-select-none es-uic-grid-cols-[auto,_1fr] es-uic-items-center es-uic-gap-x-1.5 es-uic-gap-y-1 es-uic-p-2 es-uic-text-sm es-uic-text-gray-500'>
							<div className='es-uic-flex es-uic-gap-0.5 es-uic-justify-self-center'>
								<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
									&darr;
								</kbd>

								<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
									&uarr;
								</kbd>
							</div>
							{__('Navigate', 'eightshift-ui-components')}
							<div className='es-uic-flex es-uic-gap-0.5 es-uic-justify-self-center'>
								<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
									&crarr;
								</kbd>
							</div>
							{__('Select', 'eightshift-ui-components')}
							<kbd className='es-uic-flex es-uic-h-5 es-uic-min-w-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
								Esc
							</kbd>{' '}
							{__('Hide suggestions', 'eightshift-ui-components')}
						</div>
					</>
				)}
			</Popover>
		</ComboBox>
	);
};
