import { SearchField, Label, Button as ReactAriaButton, Input, Group, Toolbar } from 'react-aria-components';
import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { useRef, useState } from 'react';
import { useAsyncList } from 'react-stately';
import { Spacer } from '../spacer/spacer';
import { Tooltip } from '../tooltip/tooltip';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { Button } from '../button/button';
import { RichLabel } from '../rich-label/rich-label';
import { Popover } from '../popover/popover';
import { useDebouncedCallback } from 'use-debounce';

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

		inputDebounceDelay = 500,

		hidden,
	} = props;

	const [inputValue, setInputValue] = useState(url ?? '');
	const [suggestionsVisible, setSuggestionsVisible] = useState(false);

	const triggerRef = useRef(null);
	const inputRef = useRef(null);

	const suggestionList = useAsyncList({
		getKey: ({ item }) => item.value,
		async load({ signal }) {
			const items = await fetchSuggestions(inputValue, signal);

			return {
				items: items ?? [],
			};
		},
	});

	const shouldNotShowSuggestions = (url) => {
		if (!url) {
			return true;
		}

		return (
			url?.trim()?.length < 3 ||
			url?.startsWith('#') ||
			url?.startsWith(':') ||
			url?.startsWith('mailto:') ||
			url?.startsWith('tel:') ||
			url?.startsWith('http://') ||
			url?.startsWith('https://') ||
			url?.startsWith('www.')
		);
	};

	const debounced = useDebouncedCallback(
		(value) => {
			onChange({ url: value, isAnchor: value?.includes('#') });

			if (shouldNotShowSuggestions(value)) {
				setSuggestionsVisible(false);
			} else {
				suggestionList.setFilterText(value);
				setSuggestionsVisible(value?.length > 3);
			}
		},
		inputDebounceDelay,
		{ maxWait: 2000 },
	);

	if (hidden) {
		return null;
	}

	return (
		<>
			<SearchField
				className='es-uic-w-full es-uic-space-y-1'
				type='url'
				value={inputValue}
				onChange={(value) => {
					setInputValue(value);
					debounced(value);
				}}
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
							ref={inputRef}
							className={clsx(
								'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-py-2 es-uic-pl-2 es-uic-pr-1 es-uic-text-sm es-uic-shadow-sm es-uic-transition selection:es-uic-bg-teal-500/20 selection:es-uic-text-teal-950',
								'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								inputValue?.length > 0 && 'es-uic-pr-8',
								className,
							)}
							onFocus={(e) => {
								onChange({ url: inputValue, isAnchor: inputValue?.includes('#') });

								if (props.onFocus) {
									props.onFocus(e);
								}
							}}
						/>

						<AnimatedVisibility
							visible={inputValue?.length > 0}
							className='es-uic-absolute es-uic-inset-y-1 es-uic-right-1'
							transition='scaleFade'
						>
							<ReactAriaButton>
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
			</SearchField>

			<Popover
				aria-label={__('URL suggestions', 'eightshift-ui-components')}
				shouldFlip={false}
				triggerRef={triggerRef}
				isOpen={suggestionsVisible}
				onOpenChange={(value) => {
					setSuggestionsVisible(value);
					debounced.cancel();
				}}
				placement='bottom'
				className='!es-uic-p-0'
				style={{
					width: `${triggerRef.current?.offsetWidth}px`,
				}}
			>
				{suggestionList.isLoading && (
					<RichLabel
						icon={icons.progressbarIntermittent}
						label={__('Loading suggestions...', 'eightshift-ui-components')}
						subtitle={__('Please wait', 'eightshift-ui-components')}
						className='es-uic-min-h-14 es-uic-p-2'
					/>
				)}

				{!suggestionList.isLoading && suggestionList.items.length === 0 && (
					<RichLabel
						icon={icons.searchEmpty}
						label={__('No suggestions found', 'eightshift-ui-components')}
						subtitle={__('Try a different search term.', 'eightshift-ui-components')}
						className='es-uic-min-h-14 es-uic-p-2'
					/>
				)}

				{!suggestionList.isLoading && suggestionList.items.length > 0 && (
					<Toolbar
						orientation='vertical'
						className='es-uic-flex es-uic-min-h-10 es-uic-flex-col es-uic-space-y-1 es-uic-p-2'
					>
						{suggestionList.items.map((item, index) => {
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
								<Button
									textValue={label}
									size='large'
									type='ghost'
									className={clsx(
										'es-uic-w-full es-uic-text-start',
										'es-uic-grid es-uic-grid-cols-[auto,_minmax(0,_1fr)] es-uic-grid-rows-2 es-uic-items-center es-uic-justify-items-start es-uic-gap-x-2 es-uic-gap-y-0',
										'[&>svg]:es-uic-row-span-2 [&>svg]:es-uic-shrink-0',
										'[&>span:last-child]:es-uic-self-start [&>span]:es-uic-w-full [&>span]:es-uic-self-end [&>span]:es-uic-truncate',
									)}
									key={url}
									onPress={() => {
										setInputValue(url);
										debounced(url);

										setSuggestionsVisible(false);
									}}
									icon={typeIcon}
									autoFocus={index === 0}
								>
									<RichLabel
										label={title}
										subtitle={url?.replace(location.origin, '').replace(/\/$/, '')}
										contentsOnly
									/>
								</Button>
							);
						})}
					</Toolbar>
				)}

				<Spacer
					size='px'
					border
				/>

				<div className='es-uic-grid es-uic-select-none es-uic-grid-cols-[auto,_1fr] es-uic-items-center es-uic-gap-x-1.5 es-uic-gap-y-1 es-uic-p-2 es-uic-text-sm es-uic-text-gray-500'>
					<div className='es-uic-flex es-uic-gap-0.5 es-uic-justify-self-center'>
						<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
							&uarr;
						</kbd>
						<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
							&darr;
						</kbd>
					</div>
					{__('Navigate', 'eightshift-ui-components')}
					<div className='es-uic-flex es-uic-gap-0.5 es-uic-justify-self-center'>
						<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
							&crarr;
						</kbd>
						<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
							␣
						</kbd>
					</div>
					{__('Select an item', 'eightshift-ui-components')}
					<kbd className='es-uic-flex es-uic-h-5 es-uic-min-w-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
						Esc
					</kbd>{' '}
					{__('Close suggestion panel', 'eightshift-ui-components')}
				</div>
			</Popover>
		</>
	);
};
