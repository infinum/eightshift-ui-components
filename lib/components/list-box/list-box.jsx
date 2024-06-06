import {
	ListBox as ReactAriaListBox,
	ListBoxItem as ReactAriaListBoxItem,
} from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { BaseControl } from '../base-control/base-control';
import { __ } from '@wordpress/i18n';
import { RichLabel } from '../rich-label/rich-label';

/**
 * A component that allows selecting a single or multiple options from a list.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display in the header.
 * @param {string} [props.help] - Help text to display below the list.
 * @param {boolean} [props.inline] - If `true`, the list is displayed inline with the label.
 * @param {Object[]} props.options - The list of options to display.
 * @param {string} props.options[].value - The value of the option. Should be unique!
 * @param {string} [props.options[].label] - The label of the option.
 * @param {JSX.Element} [props.options[].icon] - The icon of the option.
 * @param {string} [props.options[].subtitle] - The subtitle of the option.
 * @param {string} [props.options[].tooltip] - The tooltip text of the option.
 * @param {boolean} [props.options[].disabled] - If `true`, the option is cannot be selected.
 * @param {ListBoxSelectionMode} [props.selectionMode='single'] - The selection mode.
 * @param {string} props.value - The currently selected value.
 * @param {Function} props.onChange - Function to run when the selection changes.
 * @param {boolean} [props.canDeselect=false] - If `true`, the selected value can be deselected (`null` is set in that case).
 * @param {ListBoxOrientation} [props.orientation='horizontal'] - The orientation of the list. If all options have only an icon set, the orientation is forced to be horizontal.
 * @param {string} [props.className] - Classes to pass to the list.
 *
 * @returns {JSX.Element} The ListBox component.
 *
 * @typedef {'single' | 'multiple'} ListBoxSelectionMode
 * @typedef {'horizontal' | 'vertical' | 'horizontal-tiles'} ListBoxOrientation
 *
 * @example
 * <ListBox
 * 	label='My list'
 * 	options={[
 * 		{ value: 'option1', label: 'Option 1' },
 * 		{ value: 'option2', label: 'Option 2' },
 * 	]}
 * 	value={selectedValue}
 * 	onChange={setSelectedValue}
 * />
 *
 * @preserve
 */
export const ListBox = (props) => {
	const {
		icon,
		label,
		subtitle,
		actions,
		help,
		inline,
		options,
		'aria-label': ariaLabel,
		selectionMode = 'single',
		value,
		onChange,
		canDeselect = false,
		orientation: setOrientation = 'horizontal',
		className,
		...rest
	} = props;

	const mappedOptions = options.map((option) => ({
		...option,
		id: option.id ?? option.value,
	}));

	let orientation = setOrientation;

	if (options.every(({ icon, label, subtitle }) => icon && !label && !subtitle)) {
		orientation = 'horizontal';
	}

	let orientationPropValue = orientation;

	if (orientation === 'horizontal-tiles') {
		orientationPropValue = 'horizontal';
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			actions={actions}
			inline={inline}
			help={help}
		>
			<ReactAriaListBox
				selectionMode={selectionMode}
				className={clsx(
					'es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-p-1 es-uic-text-sm es-uic-shadow-sm es-uic-transition',
					'focus:es-uic-outline-none',
					orientation === 'horizontal' &&
						'es-uic-flex es-uic-w-fit es-uic-max-w-full es-uic-gap-0.5',
					orientation === 'vertical' && 'es-uic-flex es-uic-flex-col es-uic-gap-0.5',
					orientation === 'horizontal-tiles' &&
						'es-uic-grid es-uic-min-h-20 es-uic-w-fit es-uic-max-w-full es-uic-auto-cols-[fit-content(6rem)] es-uic-grid-rows-[1fr,_minmax(auto,_0.5fr),_auto] es-uic-gap-x-0.5',
					className,
				)}
				aria-label={ariaLabel ?? __('Choose', 'eightshift-ui-components')}
				items={mappedOptions}
				disallowEmptySelection={!canDeselect}
				orientation={orientationPropValue}
				selectedKeys={[value]}
				onSelectionChange={(key) => {
					onChange(key?.currentKey ?? key?.anchorKey);
				}}
				{...rest}
			>
				{(item) => {
					const { label, icon, subtitle, tooltip, disabled } = item;

					return (
						<ReactAriaListBoxItem
							textValue={label ?? tooltip}
							isDisabled={disabled}
							className={({ isDisabled, isSelected }) => {
								return clsx(
									'es-uic-flex es-uic-min-h-9 es-uic-select-none es-uic-rounded-md es-uic-border es-uic-transition',
									'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
									isSelected &&
										!disabled &&
										'es-uic-bg-teal-600 es-uic-text-white es-uic-border-teal-600 after:es-uic-opacity-45 es-uic-border es-uic-shadow-md es-uic-shadow-teal-500/25',
										isSelected && !disabled && 'es-uic-text-white [&_svg]:es-uic-text-white [&_span]:es-uic-text-white [&_span_+_span]:es-uic-text-white/80',
										isSelected && !disabled && 'es-uic-relative es-uic-isolate after:es-uic-absolute after:es-uic-inset-0 after:-es-uic-z-10 after:es-uic-rounded-[0.3125rem] after:es-uic-bg-gradient-to-br after:es-uic-from-teal-100/40 after:es-uic-via-transparent after:es-uic-to-teal-200/50 after:es-uic-opacity-0 after:es-uic-transition-opacity after:es-uic-content-[""]',
									!isSelected && !disabled && 'es-uic-border-transparent hover:es-uic-bg-gray-100',
									isDisabled && 'es-uic-border-transparent es-uic-opacity-30 es-uic-grayscale',
									orientation !== 'horizontal-tiles' && 'es-uic-px-2 es-uic-py-1.5',
									icon && !label && !subtitle && 'es-uic-size-9 !es-uic-p-1.5',
									orientation === 'horizontal-tiles' &&
										'es-uic-row-start-1 es-uic-row-end-4 es-uic-grid es-uic-min-w-18 es-uic-grid-rows-subgrid es-uic-items-center es-uic-justify-items-center es-uic-p-1.5 es-uic-text-center es-uic-leading-tight',
									orientation === 'horizontal-tiles' && subtitle && '[&_svg]:es-uic-mb-1',
								);
							}}
						>
							<RichLabel
								icon={icon}
								label={label}
								subtitle={subtitle}
								className={clsx(orientation === 'horizontal' && 'leading-none')}
								contentsOnly={orientation === 'horizontal-tiles'}
							/>
						</ReactAriaListBoxItem>
					);
				}}
			</ReactAriaListBox>
		</BaseControl>
	);
};
