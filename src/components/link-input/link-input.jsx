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
import { IconLabel } from '../icon-label/icon-label';
import { icons } from '../icons/icons';
import { classnames } from '../../utilities/classnames';
import { useEffect, useRef, useState } from 'react';
import { useAsyncList } from 'react-stately';
import { Spacer } from '../spacer/spacer';
import { useDebounce } from '@uidotdev/usehooks';
import { Tooltip } from '../tooltip/tooltip';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';

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

	const debouncedInputValue = useDebounce(inputValue, inputDebounceDelay);

	useEffect(() => {
		const newUrl = debouncedInputValue;

		if (
			newUrl?.startsWith('#') ||
			newUrl?.startsWith(':') ||
			newUrl?.startsWith('mailto:') ||
			newUrl?.startsWith('tel:') ||
			newUrl?.startsWith('http://') ||
			newUrl?.startsWith('https://')
		) {
			setSuggestionsVisible(false);
			onChange({ url: newUrl, isAnchor: newUrl?.includes('#') });
			return;
		} else if (newUrl?.length < 3) {
			setSuggestionsVisible(false);
			return;
		}

		setSuggestionsVisible(newUrl?.length > 3);
	}, [debouncedInputValue, onChange]);

	const handleDialogOpenChange = (value) => {
		setSuggestionsVisible(value);

		if (!value) {
			triggerRef?.current?.focus();
		}
	};

	return (
		<>
			<SearchField
				className='flex flex-col gap-1'
				type='url'
				value={inputValue ?? ''}
				onChange={(value) => setInputValue(value)}
				isDisabled={disabled}
			>
				<Label className='flex items-center gap-1'>
					<IconLabel
						as={Label}
						icon={icon}
						label={label}
						subtitle={subtitle}
					/>

					{actions && <div className='ml-auto flex items-center gap-1'>{actions}</div>}
				</Label>
				<Group
					className='relative'
					ref={triggerRef}
				>
					<Input
						className={classnames(
							'w-full rounded-md border border-gray-300 pl-2 pr-1 py-2 text-sm shadow-sm transition min-h-10',
							'focus:outline-none  focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
							inputValue?.length > 0 && 'pr-8',
							className,
						)}
					/>

					<AnimatedVisibility
						visible={inputValue?.length > 0}
						className='absolute inset-y-1 right-1'
						transition='scaleFade'
					>
						<ReactAriaButton>
							<Tooltip text={__('Clear', 'eightshift-components')}>
								<div className='flex size-7 items-center justify-center rounded bg-white/85 text-gray-600 backdrop-blur transition hover:bg-red-50 hover:text-red-500 [&>svg]:size-6'>
									{removeIcon}
								</div>
							</Tooltip>
						</ReactAriaButton>
					</AnimatedVisibility>
				</Group>
				{help && (
					<Text
						className='text-sm text-gray-400'
						slot='description'
					>
						{help}
					</Text>
				)}
			</SearchField>

			<Popover
				shouldFlip={false}
				shouldCloseOnInteractOutside={() => true}
				triggerRef={triggerRef}
				isOpen={suggestionsVisible}
				onOpenChange={handleDialogOpenChange}
				placement='bottom'
				className={({ isEntering, isExiting }) =>
					classnames(
						'rounded-md border border-gray-200 bg-white shadow-lg outline-none',
						isEntering && 'animate-slideDownAndFade',
						isExiting && 'animate-slideUpAndFadeOut',
					)
				}
				style={{
					width: `${triggerRef.current?.offsetWidth}px`,
				}}
			>
				<Dialog
					className='outline-none'
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
						}}
						aria-label='Pick a Pokemon'
						items={list.items}
						selectionMode='single'
						autoFocus
						disallowEmptySelection
						renderEmptyState={() => <div>pRAzno</div>}
						className='space-y-0.5 p-2 focus:outline-none'
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
										'grid w-full cursor-pointer select-none grid-cols-[auto,_minmax(0,_1fr)] gap-x-1.5 rounded-md border border-transparent p-1 transition hover:border-gray-300 hover:bg-gray-50',
										'focus:outline-none  focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
									)}
								>
									<span className='row-span-2 self-center text-gray-500 [&>svg]:size-6'>
										{typeIcon}
									</span>

									<span className='block self-start truncate text-sm'>{title}</span>
									<span className='block self-end truncate text-xs text-gray-400'>
										{url?.replace(location.origin, '').replace(/\/$/, '')}
									</span>
								</ListBoxItem>
							);
						}}
					</ListBox>
					<Spacer border />

					<div className='grid select-none grid-cols-[auto,_1fr] items-center gap-x-1.5 gap-y-1 p-3 text-sm text-gray-500'>
						<div className='flex gap-0.5 justify-self-center'>
							<kbd className='flex size-5 items-center justify-center rounded border p-0.5 font-sans text-xs text-gray-400'>
								&uarr;
							</kbd>
							<kbd className='flex size-5 items-center justify-center rounded border p-0.5 font-sans text-xs text-gray-400'>
								&darr;
							</kbd>
						</div>
						{__('Navigate', 'eightshift-components')}
						<div className='flex gap-0.5 justify-self-center'>
							<kbd className='flex size-5 items-center justify-center justify-self-center rounded border p-0.5 font-sans text-xs text-gray-400'>
								&crarr;
							</kbd>
							<kbd className='flex size-5 items-center justify-center justify-self-center rounded border p-0.5 font-sans text-xs text-gray-400'>
								␣
							</kbd>
						</div>
						{__('Select an item', 'eightshift-components')}
						<kbd className='flex h-5 min-w-5 items-center justify-center justify-self-center rounded border p-0.5 font-sans text-xs text-gray-400'>
							Esc
						</kbd>{' '}
						{__('Close suggestion panel', 'eightshift-components')}
					</div>
				</Dialog>
			</Popover>
		</>
	);
};
