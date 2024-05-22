import {
	ListBox as ReactAriaListBox,
	ListBoxItem as ReactAriaListBoxItem,
	Text,
} from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { BaseControl } from '../base-control/base-control';
import { __ } from '@wordpress/i18n';
import { IconLabel } from '../icon-label/icon-label';
import { Tooltip } from '../tooltip/tooltip';
import { useState } from 'react';

/**
 * A component that allows selecting a single or multiple options from a list.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element} [props.actions] - Actions to display in the header.
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

	const [tooltipText, setTooltipText] = useState(null);

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
			help={help && <Text slot='description'>{help}</Text>}
		>
			<Tooltip
				text={tooltipText}
				wrapperClassName={classnames(orientation === 'vertical' && 'es-uic-w-full')}
				open={tooltipText?.length > 1}
			>
				<ReactAriaListBox
					selectionMode={selectionMode}
					className={classnames(
						'es-uic-rounded-lg es-uic-border es-uic-border-gray-300 es-uic-p-1 es-uic-text-sm es-uic-shadow-sm es-uic-transition',
						'focus:es-uic-outline-none',
						orientation === 'horizontal' && 'es-uic-flex es-uic-w-fit es-uic-max-w-full es-uic-gap-0.5',
						orientation === 'vertical' && 'es-uic-flex es-uic-flex-col es-uic-gap-0.5',
						orientation === 'horizontal-tiles' &&
							'es-uic-grid es-uic-min-h-20 es-uic-w-fit es-uic-max-w-full es-uic-auto-cols-[fit-content(6rem)] es-uic-grid-rows-[1fr,_minmax(auto,_0.5fr),_auto] es-uic-gap-x-0.5',
						className,
					)}
					aria-label={ariaLabel ?? __('Choose', 'eightshift-components')}
					items={mappedOptions}
					disallowEmptySelection={!canDeselect}
					orientation={orientationPropValue}
					selectedKeys={[value]}
					onSelectionChange={(key) => {
						onChange(key?.currentKey ?? key?.anchorKey);
						setTooltipText(null);
					}}
					{...rest}
				>
					{(item) => {
						const { label, icon, subtitle, tooltip, disabled } = item;

						return (
							<ReactAriaListBoxItem
								textValue={label ?? tooltip}
								isDisabled={disabled}
								onHoverStart={() => setTooltipText(tooltip ?? label)}
								onHoverEnd={() => setTooltipText(null)}
								onFocus={() => setTooltipText(tooltip ?? label)}
								className={({ isDisabled, isSelected }) => {
									return classnames(
										'es-uic-flex es-uic-min-h-9 es-uic-select-none es-uic-rounded-md es-uic-border es-uic-transition',
										'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
										isSelected &&
											!disabled &&
											'es-uic-border-teal-600 es-uic-bg-teal-100/5 es-uic-shadow-sm es-uic-shadow-teal-500/25',
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
								<IconLabel
									icon={icon}
									label={label}
									subtitle={subtitle}
									className={classnames(orientation === 'horizontal' && 'leading-none')}
									contentsOnly={orientation === 'horizontal-tiles'}
								/>
							</ReactAriaListBoxItem>
						);
					}}
				</ReactAriaListBox>
			</Tooltip>
		</BaseControl>
	);
};
