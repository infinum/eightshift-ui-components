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
 * @param {boolean} [props.showSuggestionsWhenEmpty] - If `true`, the suggestion list will be shown when down arrow is pressed even the input is empty.
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
		url = '',
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

		showSuggestionsWhenEmpty,

		fetchSuggestions,
		className,

		hidden,
	} = props;

	const canShowSuggestions = typeof fetchSuggestions !== 'undefined';

	const triggerRef = useRef(null);

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

	const suggestionList = useAsyncList({
		async load({ signal }) {
			if (disabled || !canShowSuggestions || !shouldShowSuggestions) {
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

	return (
		<ComboBox
			items={suggestionList.items}
			inputValue={url}
			onInputChange={(value) => {
				onChange({ url: value, isAnchor: value?.includes('#') });

				if (shouldShowSuggestions) {
					suggestionList.reload();
				}
			}}
			allowsCustomValue
			allowsEmptyCollection
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
					className='es:relative'
					ref={triggerRef}
				>
					<Input
						placeholder={disabled ? null : placeholder}
						className={clsx(
							'es:min-h-10 es:w-full es:rounded-10 es:border es:border-secondary-300 es:py-2 es:pl-2 es:pr-1 es:text-sm es:shadow-sm es:transition es:selection:bg-accent-500/20 es:selection:text-accent-950 es:bg-white',
							'es:any-focus:outline-hidden',
							'es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
							'es:focus-visible:border-accent-500',
							'es:inset-ring es:inset-ring-secondary-100',
							'es:disabled:shadow-none! es:disabled:border-secondary-200 es:disabled:bg-secondary-50 es:disabled:text-secondary-500 es:disabled:cursor-default es:readonly:bg-secondary-50',
							'es:not-readonly:focus:shadow-md',
							'es:[&::-webkit-search-cancel-button]:hidden',
							url?.length > 0 && 'es:pr-10',
							className,
						)}
					/>

					<AnimatedVisibility
						visible={!disabled && url?.length > 0}
						className='es:absolute es:inset-y-1 es:right-1'
						transition='fade'
					>
						<ReactAriaButton
							slot={null}
							onPress={() => {
								onChange({ url: undefined, isAnchor: false });
							}}
							className='es:any-focus:outline-hidden'
						>
							{!(shouldShowSuggestions && suggestionList.isLoading) && (
								<Tooltip text={__('Clear', 'eightshift-ui-components')}>
									<div
										className={clsx(
											'es:flex es:size-8 es:items-center es:justify-center es:rounded-md es:bg-white/85 es:text-secondary-600 es:backdrop-blur es:transition es:cursor-pointer',
											'es:hover:bg-red-600/5 es:hover:text-red-600',
											'es:icon:size-6',
										)}
									>
										{removeIcon}
									</div>
								</Tooltip>
							)}

							{shouldShowSuggestions && suggestionList.isLoading && (
								<div className='es:p-1.5'>{cloneElement(icons.loader, { className: 'es:text-accent-600! es:stroke-2 es:motion-preset-spin es:motion-duration-1500' })}</div>
							)}
						</ReactAriaButton>
					</AnimatedVisibility>
				</Group>
			</BaseControl>

			{canShowSuggestions && shouldShowSuggestions && (
				<Popover
					aria-label={__('URL suggestions', 'eightshift-ui-components')}
					className={({ isEntering, isExiting }) =>
						clsx(
							'es:border es:rounded-xl es:border-secondary-300 es:bg-white es:shadow-lg es:outline-hidden es:min-w-72',
							'es:motion-safe:motion-duration-200 es:motion-safe:motion-ease-spring-bouncy',
							'es:placement-bottom:origin-top-left es:placement-top:origin-bottom-left',
							(isEntering || !(suggestionList.isLoading || !shouldShowSuggestions)) && 'es:motion-safe:motion-scale-in-95 es:motion-opacity-in-0',
							(isEntering || !(suggestionList.isLoading || !shouldShowSuggestions)) &&
								'es:motion-safe:placement-top:motion-translate-y-in-[5%] es:motion-safe:placement-bottom:motion-translate-y-in-[-5%]',
							isExiting && 'es:motion-safe:motion-scale-out-95 es:motion-opacity-out-0',
							isExiting && 'es:motion-safe:placement-top:motion-translate-y-out-[5%] es:motion-safe:placement-bottom:motion-translate-y-out-[-5%]',
							(suggestionList.isLoading || !shouldShowSuggestions) && 'es:invisible',
						)
					}
					offset={3}
					style={{
						width: `${triggerRef.current?.offsetWidth}px`,
					}}
				>
					{shouldShowSuggestions && !suggestionList.isLoading && suggestionList.items.length === 0 && (
						<RichLabel
							icon={icons.searchEmpty}
							label={__('No results', 'eightshift-ui-components')}
							subtitle={__('Try a different search term', 'eightshift-ui-components')}
							className='es:min-h-14 es:p-2 es:w-fit es:mx-auto'
							iconClassName='es:text-accent-700 es:icon:size-7!'
							noColor
						/>
					)}

					{suggestionList.items.length > 0 && !suggestionList.isLoading && (
						<>
							<ListBox className='es:space-y-1 es:p-1'>
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
												'es:rounded-10 es:p-1 es:text-sm es:transition',
												'es:hover:border-secondary-300 es:hover:bg-secondary-100',
												'es:focus-visible:border-secondary-300 es:focus-visible:bg-secondary-100',
												'selected:es:bg-accent-600/10 selected:es:text-accent-900 selected:focus-visible:es:bg-accent-600/15',
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

							<Spacer
								border
								className='es:opacity-40'
							/>

							<div className='es:flex es:flex-wrap es:items-center es:justify-end es:gap-x-3 es:gap-y-1.5 es:p-2 es:text-sm es:text-secondary-500'>
								<div className='es:flex es:gap-1'>
									<kbd className='es:flex es:size-4 es:items-center es:justify-center es:rounded es:bg-radial es:from-secondary-100 es:to-secondary-200 es:font-mono es:text-xs es:text-secondary-600'>
										&darr;
									</kbd>
									<kbd className='es:flex es:size-4 es:items-center es:justify-center es:rounded es:bg-radial es:from-secondary-100 es:to-secondary-200 es:font-mono es:text-xs es:text-secondary-600'>
										&uarr;
									</kbd>
									{__('Navigate', 'eightshift-ui-components')}
								</div>

								<div className='es:flex es:gap-1'>
									<kbd className='es:flex es:size-4 es:items-center es:justify-center es:rounded es:bg-radial es:from-secondary-100 es:to-secondary-200 es:font-mono es:text-xs es:text-secondary-600'>
										&crarr;
									</kbd>
									{__('Select', 'eightshift-ui-components')}
								</div>

								<div className='es:flex es:gap-1'>
									<kbd className='es:flex es:h-4 es:items-center es:justify-center es:rounded es:bg-radial es:from-secondary-100 es:to-secondary-200 es:font-mono es:text-xs es:tracking-tighter es:px-0.5 es:text-secondary-600'>
										Esc
									</kbd>
									{__('Hide', 'eightshift-ui-components')}
								</div>
							</div>
						</>
					)}
				</Popover>
			)}
		</ComboBox>
	);
};
