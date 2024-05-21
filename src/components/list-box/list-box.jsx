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
				open={tooltipText !== null}
				wrapperClassName='w-full'
			>
				<ReactAriaListBox
					selectionMode={selectionMode}
					className={classnames(
						'rounded-lg border border-gray-300 p-1 text-sm shadow-sm transition focus:outline-none',
						orientation === 'horizontal' && 'flex w-fit max-w-full gap-0.5',
						orientation === 'vertical' && 'flex flex-col gap-0.5',
						orientation === 'horizontal-tiles' &&
							'grid min-h-20 w-fit max-w-full auto-cols-[fit-content(6rem)] grid-rows-[1fr,_minmax(auto,_0.5fr),_auto] gap-x-0.5',
						className,
					)}
					aria-label={ariaLabel ?? __('Choose', 'eightshift-components')}
					items={mappedOptions}
					disallowEmptySelection={!canDeselect}
					orientation={orientationPropValue}
					selectedKeys={[value]}
					onSelectionChange={(key) => onChange(key?.currentKey ?? key?.anchorKey)}
					{...rest}
				>
					{(item) => {
						const { label, icon, subtitle, tooltip, disabled } = item;
						return (
							<ReactAriaListBoxItem
								textValue={label ?? tooltip}
								onHoverChange={(isHovered) => {
									if (label || !tooltip) {
										return;
									}

									if (isHovered) {
										setTooltipText(label);
									} else {
										setTooltipText(null);
									}
								}}
								isDisabled={disabled}
								className={({ isDisabled, isSelected }) => {
									return classnames(
										'flex min-h-9 select-none rounded-md border transition',
										'focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
										isSelected && !disabled && 'border-teal-600 bg-teal-100/5 shadow-sm shadow-teal-500/25',
										!isSelected && !disabled && 'border-transparent hover:bg-gray-100',
										isDisabled && 'opacity-30 grayscale border-transparent',
										orientation !== 'horizontal-tiles' && 'px-2 py-1.5',
										icon && !label && !subtitle && 'size-9 !p-1.5',
										orientation === 'horizontal-tiles' &&
											'row-start-1 row-end-4 grid min-w-18 grid-rows-subgrid items-center justify-items-center p-1.5 text-center leading-tight',
										orientation === 'horizontal-tiles' && subtitle && '[&_svg]:mb-1',
									);
								}}
							>
								<IconLabel
									icon={icon}
									label={label}
									subtitle={subtitle}
									className={classnames(
										orientation === 'horizontal' && 'leading-none',
									)}
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
