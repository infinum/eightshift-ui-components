import {
	SearchField,
	Label,
	Button as ReactAriaButton,
	Input,
	Text,
	Group,
	Dialog,
	Popover,
	ListBox,
	ListBoxItem,
} from 'react-aria-components';
import { __ } from '@wordpress/i18n';
import { icons } from '../../icons/icons';
import { classnames } from '../../utilities/classnames';
import { useEffect, useRef, useState } from 'react';
import { useAsyncList } from 'react-stately';
import { Spacer } from '../spacer/spacer';
import { useDebounce } from '@uidotdev/usehooks';
import { Tooltip } from '../tooltip/tooltip';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';

export const LinkInput = (props) => {
	const {
		url,
		onChange,

		label = __('Link', 'eightshift-component'),
		subtitle,
		help,
		actions,

		icon = icons.globe,
		removeIcon = icons.clearAlt,

		disabled = false,

		suggestionTypeIconOverride,

		fetchSuggestions,
		className,

		inputDebounceDelay = 500,
	} = props;

	const [inputValue, setInputValue] = useState(url);
	const [suggestionsVisible, setSuggestionsVisible] = useState(false);
	const [instantClose, setInstantClose] = useState(false);
	const debouncedSuggestionsVisible = useDebounce(suggestionsVisible, inputDebounceDelay);

	const triggerRef = useRef(null);

	const list = useAsyncList({
		getKey: ({ item }) => item.value,
		async load({ signal }) {
			const items = await fetchSuggestions(inputValue, signal);

			return {
				items: items ?? [],
			};
		},
	});

	const shouldNotShowSuggestions = (url) => {
		return (
			url?.trim()?.length < 3 ||
			url?.startsWith('#') ||
			url?.startsWith(':') ||
			url?.startsWith('mailto:') ||
			url?.startsWith('tel:') ||
			url?.startsWith('http://') ||
			url?.startsWith('https://')
		);
	};

	useEffect(() => {
		if (shouldNotShowSuggestions(inputValue)) {
			setSuggestionsVisible(false);

			onChange({ url: inputValue, isAnchor: inputValue?.includes('#') });
			return;
		}

		if (inputValue?.length < 3) {
			setSuggestionsVisible(false);
			return;
		}

		setInstantClose(false);
		setSuggestionsVisible(inputValue?.length > 3);
	}, [inputValue, onChange]);

	const handleDialogOpenChange = (value) => {
		setSuggestionsVisible(value);
		setInstantClose(!value);

		if (!value) {
			triggerRef?.current?.focus();
		}
	};

	return (
		<>
			<SearchField
				className='es-uic-space-y-1'
				type='url'
				value={inputValue ?? ''}
				onChange={(value) => setInputValue(value)}
				isDisabled={disabled}
			>
				<BaseControl
					as={Label}
					icon={icon}
					label={label}
					subtitle={subtitle}
					actions={actions}
					labelAs={Label}
					help={
						help && (
							<Text
								className='es-uic-text-sm es-uic-text-gray-400'
								slot='description'
							>
								{help}
							</Text>
						)
					}
				>
					<Group
						className='es-uic-relative'
						ref={triggerRef}
					>
						<Input
							className={classnames(
								'es-uic-min-h-10 es-uic-w-full es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-py-2 es-uic-pl-2 es-uic-pr-1 es-uic-text-sm es-uic-shadow-sm es-uic-transition',
								'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
								inputValue?.length > 0 && 'es-uic-pr-8',
								className,
							)}
						/>

						<AnimatedVisibility
							visible={inputValue?.length > 0}
							className='es-uic-absolute es-uic-inset-y-1 es-uic-right-1'
							transition='scaleFade'
						>
							<ReactAriaButton>
								<Tooltip text={__('Clear', 'eightshift-components')}>
									<div
										className={classnames(
											'es-uic-flex es-uic-size-7 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-bg-white/85 es-uic-text-gray-600 es-uic-backdrop-blur es-uic-transition',
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
				shouldFlip={false}
				shouldCloseOnInteractOutside={() => true}
				triggerRef={triggerRef}
				isOpen={instantClose ? false : debouncedSuggestionsVisible}
				onOpenChange={handleDialogOpenChange}
				placement='bottom'
				className={({ isEntering, isExiting }) =>
					classnames(
						'es-uic-rounded-md es-uic-border es-uic-border-gray-200 es-uic-bg-white es-uic-shadow-lg es-uic-outline-none',
						isEntering && 'es-uic-animate-slideDownAndFade',
						isExiting && 'es-uic-animate-slideUpAndFadeOut',
					)
				}
				style={{
					width: `${triggerRef.current?.offsetWidth}px`,
				}}
			>
				<Dialog
					className='es-uic-outline-none'
					aria-label={__('URL suggestions', 'eightshift-components')}
				>
					<ListBox
						onSelectionChange={(key) => {
							if (!key?.currentKey) {
								return;
							}

							setInputValue(key.currentKey);
							onChange({ url: key.currentKey, isAnchor: key.currentKey?.includes('#') });
							setSuggestionsVisible(false);
							setInstantClose(true);
						}}
						aria-label={__('Link suggestions', 'eightshift-components')}
						className='es-uic-space-y-0.5 es-uic-p-2 focus:es-uic-outline-none'
						items={list.items}
						selectionMode='single'
						disallowEmptySelection
						autoFocus
					>
						{(item) => {
							const {
								label: title,
								value: url,
								metadata: { subtype },
							} = item;

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
									id={url}
									textValue={title}
									className={classnames(
										'es-uic-grid es-uic-w-full es-uic-cursor-pointer es-uic-select-none es-uic-grid-cols-[auto,_minmax(0,_1fr)] es-uic-gap-x-1.5 es-uic-rounded-md es-uic-border es-uic-border-transparent es-uic-p-1 es-uic-transition',
										'hover:es-uic-border-gray-300 hover:es-uic-bg-gray-50',
										'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
									)}
								>
									<span className='es-uic-row-span-2 es-uic-self-center es-uic-text-gray-500 [&>svg]:es-uic-size-6'>
										{typeIcon}
									</span>

									<span className='es-uic-block es-uic-self-start es-uic-truncate es-uic-text-sm'>{title}</span>
									<span className='es-uic-block es-uic-self-end es-uic-truncate es-uic-text-xs es-uic-text-gray-400'>
										{url?.replace(location.origin, '').replace(/\/$/, '')}
									</span>
								</ListBoxItem>
							);
						}}
					</ListBox>
					<Spacer border />

					<div className='es-uic-grid es-uic-select-none es-uic-grid-cols-[auto,_1fr] es-uic-items-center es-uic-gap-x-1.5 es-uic-gap-y-1 es-uic-p-3 es-uic-text-sm es-uic-text-gray-500'>
						<div className='es-uic-flex es-uic-gap-0.5 es-uic-justify-self-center'>
							<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
								&uarr;
							</kbd>
							<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
								&darr;
							</kbd>
						</div>
						{__('Navigate', 'eightshift-components')}
						<div className='es-uic-flex es-uic-gap-0.5 es-uic-justify-self-center'>
							<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
								&crarr;
							</kbd>
							<kbd className='es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
								␣
							</kbd>
						</div>
						{__('Select an item', 'eightshift-components')}
						<kbd className='es-uic-flex es-uic-h-5 es-uic-min-w-5 es-uic-items-center es-uic-justify-center es-uic-justify-self-center es-uic-rounded es-uic-border es-uic-p-0.5 es-uic-font-sans es-uic-text-xs es-uic-text-gray-400'>
							Esc
						</kbd>{' '}
						{__('Close suggestion panel', 'eightshift-components')}
					</div>
				</Dialog>
			</Popover>
		</>
	);
};
