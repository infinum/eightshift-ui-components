import { __ } from '@wordpress/i18n';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useAsyncList } from 'react-stately';
import { Button as ReactAriaButton, ComboBox, Group, Input, Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { type ReactNode } from 'react';

import { anchor, clearAlt, externalLink, file, formAlt, globe, layoutAlt, searchEmpty } from '../../icons/internal';
import { Spinner } from '../../icons/spinner';
import { randomId } from '../../utilities';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { BaseControl } from '../base-control/base-control';
import { RichLabel } from '../rich-label/rich-label';
import { Tooltip } from '../tooltip/tooltip';

type InputSize = 'small' | 'medium' | 'default' | 'large';

type LinkInputValue = {
	url?: string;
	isAnchor: boolean;
};

type LinkSuggestionItem = {
	label: string;
	value: string;
	metadata?: {
		subtype?: string | null;
		[key: string]: unknown;
	};
	[key: string]: unknown;
};

type LinkInputProps = {
	url?: string;
	onChange?: (value: LinkInputValue) => void;
	label?: ReactNode;
	subtitle?: ReactNode;
	help?: ReactNode;
	placeholder?: string;
	actions?: ReactNode;
	icon?: ReactNode;
	removeIcon?: ReactNode;
	disabled?: boolean;
	fetchSuggestions?: (searchTerm: string, signal?: AbortSignal) => Promise<LinkSuggestionItem[] | null | undefined> | LinkSuggestionItem[] | null | undefined;
	className?: string;
	inputDebounceDelay?: number;
	suggestionTypeIconOverride?: (type: string) => ReactNode;
	showSuggestionsWhenEmpty?: boolean;
	flat?: boolean;
	keyboardShortcuts?: boolean;
	size?: InputSize;
	inline?: boolean;
	hidden?: boolean;
};

const inputClass = cva(
	[
		'es:text-13! es:leading-none',
		'es:w-fill',
		'es:border-none!',
		'es:rounded-lg! es:focus:rounded-xl! es:aria-[controls]:rounded-xl!',
		'es:transition-plus',
		'es:any-focus:outline-hidden',
		'es:inset-ring!',
		'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/30',
		'es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500',
		'es:placeholder-shown:pr-0 es:pr-10',
		'es:focus:placeholder:text-surface-400',
		'es:font-variation-["wdth"_80,"wght"_325,"slnt"_0,"ROND"_100] es:placeholder-shown:font-variation-["wdth"_60,"wght"_300,"slnt"_-10,"ROND"_0]',
	],
	{
		variants: {
			size: {
				small: ['es:min-h-8', 'es:py-2 es:px-2.5'],
				medium: ['es:min-h-9', 'es:py-2 es:px-3'],
				default: ['es:min-h-10', 'es:py-2 es:px-3'],
				large: ['es:min-h-12', 'es:py-2 es:px-4'],
			},
			inline: {
				true: 'es:min-w-48',
				false: '',
			},
			flat: {
				true: '',
				false: '',
			},
			disabled: {
				true: '',
				false: '',
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
					'es:shadow-xs! es:shadow-black/5',
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
					'es:shadow-none!',
				],
			},
			{
				disabled: true,
				class: ['es:bg-white es:inset-ring-secondary-200 es:text-secondary-400'],
			},
		],
		defaultVariants: { disabled: false, flat: false, inline: false },
	},
);

const getSuggestionIcon = (subtype: string) => {
	if (subtype.toLowerCase() === 'url') {
		return externalLink;
	}

	if (subtype.toLowerCase() === 'attachment') {
		return file;
	}

	if (subtype.toLowerCase() === 'category') {
		return layoutAlt;
	}

	if (subtype.toLowerCase() === 'internal') {
		return anchor;
	}

	if (subtype.toLowerCase() === 'eightshift-forms') {
		return formAlt;
	}

	return file;
};

export const LinkInput = (props: LinkInputProps) => {
	const {
		url = '',
		onChange,
		label = __('Link', 'eightshift-ui-components'),
		subtitle,
		help,
		actions,
		inline,
		placeholder = __('Type to search or enter URL', 'eightshift-ui-components'),
		icon = globe,
		removeIcon = clearAlt,
		disabled = false,
		suggestionTypeIconOverride,
		showSuggestionsWhenEmpty,
		fetchSuggestions,
		className,
		keyboardShortcuts,
		flat,
		size = 'default',
		hidden,
	} = props;

	const canShowSuggestions = typeof fetchSuggestions !== 'undefined';

	let shouldShowSuggestions = true;

	if (!canShowSuggestions || (!showSuggestionsWhenEmpty && url.length < 1)) {
		shouldShowSuggestions = false;
	} else {
		shouldShowSuggestions = !(
			(showSuggestionsWhenEmpty !== true && url.trim().length < 3) ||
			url.startsWith('/') ||
			url.startsWith('#') ||
			url.startsWith(':') ||
			url.startsWith('mailto') ||
			url.startsWith('tel') ||
			url.startsWith('http') ||
			url.startsWith('www')
		);
	}

	const suggestionList = useAsyncList<LinkSuggestionItem>({
		async load({ signal }) {
			if (disabled || !canShowSuggestions || !shouldShowSuggestions || !fetchSuggestions) {
				return {
					items: [],
				};
			}

			const items = await fetchSuggestions(url, signal);

			return {
				items: items ?? [],
			};
		},
	});

	if (hidden) {
		return null;
	}

	const noResults = shouldShowSuggestions && !suggestionList.isLoading && suggestionList.items.length === 0;

	return (
		<ComboBox<LinkSuggestionItem>
			items={suggestionList.items}
			inputValue={url}
			onInputChange={(value) => {
				onChange?.({ url: value, isAnchor: value.includes('#') });

				if (shouldShowSuggestions) {
					suggestionList.reload();
				}
			}}
			allowsCustomValue
			allowsEmptyCollection
			isDisabled={disabled}
			className='es:selection:bg-surface-100 es:selection:text-accent-800'
		>
			<BaseControl
				icon={icon}
				label={label}
				subtitle={subtitle}
				actions={actions}
				labelAs={Label}
				inline={inline}
				help={help}
			>
				<Group className='es:relative es:group'>
					<Input
						placeholder={disabled ? undefined : placeholder}
						className={clsx(inputClass({ disabled, flat, size, inline }), className)}
					/>

					<AnimatedVisibility
						visible={!disabled && url.length > 0}
						className='es:absolute es:inset-y-1 es:right-1'
						transition='scaleFade'
					>
						<ReactAriaButton
							slot={null}
							onPress={() => {
								onChange?.({ url: undefined, isAnchor: false });
							}}
							className='es:any-focus:outline-hidden es:rounded-xs es:transition-plus es:focus-visible:rounded-md es:focus-visible:bg-surface-200 es:focus-visible:text-accent-900'
						>
							{!(shouldShowSuggestions && suggestionList.isLoading) ? (
								<Tooltip text={__('Clear', 'eightshift-ui-components')}>
									<div
										className={clsx(
											'es:opacity-0 es:group-hover:opacity-100 es:group-focus-within:opacity-100 es:focus-visible:opacity-100',
											'es:flex es:size-8 es:items-center es:justify-center es:rounded-md es:text-secondary-600 es:backdrop-blur es:transition',
											'es:hover:bg-red-600/5 es:hover:text-red-600',
											'es:icon:size-6',
										)}
									>
										{removeIcon}
									</div>
								</Tooltip>
							) : null}

							{shouldShowSuggestions && suggestionList.isLoading ? <Spinner className='es:size-5! es:m-1.5 es:spinner-4!' /> : null}
						</ReactAriaButton>
					</AnimatedVisibility>
				</Group>
			</BaseControl>

			{canShowSuggestions && shouldShowSuggestions ? (
				<Popover
					aria-label={__('URL suggestions', 'eightshift-ui-components')}
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:font-sans',
							'es:w-(--trigger-width)',
							'es:rounded-xl es:outline-hidden es:min-w-72',
							'es:has-first-selected:rounded-t-18!',
							'es:has-last-selected:rounded-b-18!',
							'es:inset-ring es:inset-ring-surface-500/10',
							'es:inset-shadow-sm es:inset-shadow-white/50',
							noResults ? 'es:bg-surface-50/50' : 'es:bg-surface-50/65',
							noResults ? 'es:backdrop-blur-sm' : 'es:backdrop-blur-md',
							noResults ? 'es:backdrop-brightness-105' : 'es:backdrop-brightness-110',
							'es:backdrop-saturate-125',
							'es:shadow-lg es:shadow-black/10',
							'es:transition-plus',
							'es:motion-duration-250 es:motion-ease-spring-bouncy',
							'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
							(isEntering || !(suggestionList.isLoading || !shouldShowSuggestions)) && 'es:motion-scale-x-in-95 es:motion-scale-y-in-85 es:motion-opacity-in-0',
							(isEntering || !(suggestionList.isLoading || !shouldShowSuggestions)) &&
								'es:placement-top:motion-translate-y-in-[0.5rem] es:placement-bottom:motion-translate-y-in-[-0.5rem]',
							isExiting && 'es:motion-scale-x-out-95 es:motion-scale-y-out-85 es:motion-opacity-out-0',
							isExiting && 'es:placement-top:motion-translate-y-out-[0.5rem] es:placement-bottom:motion-translate-y-out-[-0.5rem]',
							(suggestionList.isLoading || !shouldShowSuggestions) && 'es:invisible',
						)
					}
					offset={3}
					maxHeight={0.8 * (window.innerWidth ?? 1000)}
				>
					{noResults ? (
						<RichLabel
							icon={searchEmpty}
							label={__('No results', 'eightshift-ui-components')}
							subtitle={__('Try a different search term', 'eightshift-ui-components')}
							className='es:p-4 es:w-fit es:mx-auto es:flex-col es:items-center es:gap-2.5'
							iconClassName='es:text-accent-50 es:bg-linear-to-br es:from-accent-600 es:to-accent-700 es:p-2 es:rounded-full es:icon:size-7!'
							labelClassName='es:mx-auto'
							subtitleClassName='es:mx-auto'
							fullSizeSubtitle
							noColor
						/>
					) : null}

					{suggestionList.items.length > 0 && !suggestionList.isLoading ? (
						<>
							<ListBox<LinkSuggestionItem> className='es:space-y-0.75 es:p-1.5'>
								{(item) => {
									const title = item.label;
									const itemUrl = item.value;
									const subtype = item.metadata?.subtype ?? 'page';

									let typeIcon: ReactNode = getSuggestionIcon(subtype);

									if (suggestionTypeIconOverride) {
										const overrideIcon = suggestionTypeIconOverride(subtype);

										if (overrideIcon) {
											typeIcon = overrideIcon;
										}
									}

									return (
										<ListBoxItem
											id={item.value || randomId(8)}
											className={clsx(
												'es:transition-plus',
												'es:px-2 es:py-2.5',
												'es:bg-accent-900/4 es:rounded-sm es:first:rounded-t-lg es:last:rounded-b-lg es:after-current:rounded-t-lg es:before-current:rounded-b-lg',
												'es:focus-visible:bg-surface-200/65 es:focus-visible:rounded-2xl es:focus-visible:text-accent-950',
												'es:hover:bg-surface-200/50 es:hover:rounded-2xl es:hover:text-accent-900',
												'es:pressed:rounded-3xl!',
												'es:text-surface-950',
											)}
											textValue={itemUrl}
										>
											<RichLabel
												icon={typeIcon}
												label={title}
												subtitle={itemUrl.replace(location.origin, '').replace(/\/$/, '')}
												className='es:select-none'
												subtitleClassName='es:font-variation-["wdth"_80,"wght"_250,"ROND"_100,"slnt"_-2]!'
												iconClassName='es:p-1 es:text-accent-900 es:bg-surface-50/65 es:rounded-md'
												noColor
											/>
										</ListBoxItem>
									);
								}}
							</ListBox>

							{keyboardShortcuts ? (
								<div className='es:flex es:flex-wrap es:items-center es:justify-end-safe es:gap-x-4 es:gap-y-0.5 es:px-2.5 es:pb-2 es:pt-0.5'>
									<div className='es:flex es:gap-1 es:items-center'>
										<kbd className='es:flex es:size-4 es:items-center es:justify-center es:rounded es:bg-surface-600/10 es:text-surface-600 es:font-sans es:font-variation-["wdth"_100,"wght"_450,"ROND"_100] es:text-13 es:text-box-trim'>
											&darr;
										</kbd>
										<kbd className='es:flex es:size-4 es:items-center es:justify-center es:rounded es:bg-surface-600/10 es:text-surface-600 es:font-sans es:font-variation-["wdth"_100,"wght"_450,"ROND"_100] es:text-13 es:text-box-trim'>
											&uarr;
										</kbd>
										<span className='es:font-variation-["wdth"_75,"wght"_325,"ROND"_100,"slnt"_-4] es:text-12 es:text-box-trim es:text-surface-700'>
											{__('Navigate', 'eightshift-ui-components')}
										</span>
									</div>

									<div className='es:flex es:gap-1 es:items-center'>
										<kbd className='es:flex es:size-4 es:items-center es:justify-center es:rounded es:bg-surface-600/10 es:text-surface-600 es:font-sans es:font-variation-["wdth"_100,"wght"_450,"ROND"_100] es:text-13 es:text-box-trim'>
											&crarr;
										</kbd>
										<span className='es:font-variation-["wdth"_75,"wght"_325,"ROND"_100,"slnt"_-4] es:text-12 es:text-box-trim es:text-surface-700'>
											{__('Select', 'eightshift-ui-components')}
										</span>
									</div>

									<div className='es:flex es:gap-1 es:items-center'>
										<kbd className='es:flex es:h-4 es:items-center es:justify-center es:rounded es:bg-surface-600/10 es:text-surface-600 es:font-sans es:font-variation-["wdth"_67,"wght"_450,"ROND"_100] es:text-10 es:text-box-trim es:px-0.75'>
											Esc
										</kbd>
										<span className='es:font-variation-["wdth"_75,"wght"_325,"ROND"_100,"slnt"_-4] es:text-12 es:text-box-trim es:text-surface-700'>
											{__('Hide', 'eightshift-ui-components')}
										</span>
									</div>
								</div>
							) : null}
						</>
					) : null}
				</Popover>
			) : null}
		</ComboBox>
	);
};
