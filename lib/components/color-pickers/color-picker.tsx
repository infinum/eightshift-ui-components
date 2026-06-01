import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { colorPickerFill, colorPickerListMarker, colorPickerText, colorPickerTextHighlight } from '../../icons/internal';
import { BaseControl } from '../base-control/base-control';
import { Menu, MenuItem, MenuSection, MenuSeparator } from '../menu/menu';
import { RichLabel } from '../rich-label/rich-label';
import { ColorSwatch } from './color-swatch';
import type { Prettify } from '../../utilities/types';

type ColorPickerType = 'default' | 'fillColor' | 'textColor' | 'textHighlightColor' | 'listMarkerColor';

type ColorItem = {
	name: string;
	slug: string;
	color?: string;
	shade?: string;
};

type GroupedColors = Record<string, ColorItem[]>;

type MenuProps = Omit<ComponentPropsWithoutRef<typeof Menu>, 'children' | 'triggerIcon' | 'tooltip' | 'keepOpen'>;
type MenuItemProps = ComponentPropsWithoutRef<typeof MenuItem>;

type ColorPickerProps = MenuProps & {
	/** Icon to display. */
	icon?: ReactNode;
	/** Label to display. */
	label?: ReactNode;
	/** Subtitle to display. */
	subtitle?: ReactNode;
	/** Additional clsx passed to the label. */
	labelClassName?: string;
	/** Selected value. */
	value?: string;
	/** Function to run when the value changes. */
	onChange: (value?: string) => void;
	/** Colors to display. */
	colors: ColorItem[];
	/** If `true`, the HEX color code is shown below the color name. */
	showColorCode?: boolean;
	/** If `true`, colors won't be grouped by shades. */
	noColorGroups?: boolean;
	/** Type of the color picker. Affects the icon and tooltip. Defaults to `'default'`. */
	type?: ColorPickerType;
	/** If `true`, the picked color can be removed. */
	clearable?: boolean;
	/** If `true`, the control is not rendered inline. */
	stacked?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	/** If provided, overrides the default tooltip text. If there is no label, the value will still be shown within the tooltip. */
	tooltip?: ReactNode;
	/** Label for the "None" item, if `clearable` is enabled. Defaults to `'None'`. */
	clearItemLabel?: ReactNode;
	/** If `type` is `menu`, allows passing additional menu items, which will be displayed below the options. */
	extraOptions?: ReactNode;
	'aria-label'?: string;
};

type SingleItemProps = Omit<MenuItemProps, 'children' | 'onClick' | 'endIcon' | 'selected'> & ColorItem;

const colorSuffixRegex = /(?!^.+)(-?(?:50|100|200|300|400|500|600|700|800|900|950|10|20|30|40|50|60|70|80|90){1})$/i;

/**
 * Color picker.
 *
 * @component
 * @param {ColorPickerProps} props - Component props.
 *
 * @returns {JSX.Element} The ColorPicker component.
 *
 * @example
 * <ColorPicker
 * 	icon={icons.fillColor}
 * 	label={__('Fill color', 'eightshift-ui-components')}
 * 	subtitle={__('Select fill color', 'eightshift-ui-components')}
 * 	value={fillColor}
 * 	onChange={(value) => setAttributes({ fillColor: value })}
 * 	colors={[
 * 		{ name: 'Red', slug: 'red', color: '#ff0000' },
 * 		{ name: 'Green', slug: 'green', color: '#00ff00' },
 * 		{ name: 'Blue', slug: 'blue', color: '#0000ff' },
 * 	]}
 * />
 */
export const ColorPicker = (props: Prettify<ColorPickerProps>) => {
	const {
		icon,
		label,
		subtitle,
		labelClassName,
		value,
		onChange,
		colors,
		showColorCode,
		noColorGroups,
		type = 'default',
		stacked,
		clearable,
		clearItemLabel = __('None', 'eightshift-ui-components'),
		hidden,
		tooltip,
		extraOptions,
		triggerProps,
		'aria-label': ariaLabel,
		...menuProps
	} = props;

	if (hidden) {
		return null;
	}

	const currentColor = colors.find(({ slug }) => slug === value)?.color;
	const hasColorGroups = !noColorGroups && colors.some(({ slug }) => colorSuffixRegex.test(slug));
	const colorGroupNames: Record<string, string> = {
		generic: __('Other colors', 'eightshift-ui-components'),
	};

	let groupedColors: GroupedColors | undefined;

	if (hasColorGroups) {
		groupedColors = colors.reduce<GroupedColors>(
			(output, current) => {
				if (!current?.name || !current?.slug) {
					return output;
				}

				const shadeMatch = current.slug.match(colorSuffixRegex)?.[0];

				if (shadeMatch) {
					const newSlug = current.slug.replace(colorSuffixRegex, '').trim();

					if (!output[newSlug]) {
						output[newSlug] = [];
						colorGroupNames[newSlug] = current.name.replace(colorSuffixRegex, '').trim();
					}

					output[newSlug] = [
						...output[newSlug],
						{
							...current,
							shade: shadeMatch.replace('-', ''),
						},
					];
				} else {
					output.generic = [...(output.generic ?? []), current];
				}

				return output;
			},
			{ generic: [] },
		);
	}

	const genericGroupedColors = groupedColors?.generic ?? [];

	const SingleItem = ({ name, slug, color, ...itemProps }: SingleItemProps) => (
		<MenuItem
			{...itemProps}
			endIcon={
				<ColorSwatch
					className='es:size-5!'
					color={color}
					flat
				/>
			}
			onClick={() => onChange(slug)}
			selected={value === slug}
		>
			{!showColorCode ? name.replaceAll('-', ' ') : null}
			{showColorCode ? (
				<RichLabel
					label={name.replaceAll('-', ' ')}
					subtitle={color?.toUpperCase()}
					subtitleClassName='es:font-mono es:text-xs!'
				/>
			) : null}
		</MenuItem>
	);

	let tooltipText: ReactNode;
	let menuTriggerIcon: ReactNode;

	if (type === 'default') {
		tooltipText = __('Color', 'eightshift-ui-components');
	} else if (type === 'fillColor') {
		tooltipText = __('Fill color', 'eightshift-ui-components');
		menuTriggerIcon = colorPickerFill;
	} else if (type === 'textColor') {
		tooltipText = __('Text color', 'eightshift-ui-components');
		menuTriggerIcon = colorPickerText;
	} else if (type === 'textHighlightColor') {
		tooltipText = __('Text highlight color', 'eightshift-ui-components');
		menuTriggerIcon = colorPickerTextHighlight;
	} else if (type === 'listMarkerColor') {
		tooltipText = __('List marker color', 'eightshift-ui-components');
		menuTriggerIcon = colorPickerListMarker;
	}

	const currentColorName = colors.find((color) => color.slug === value)?.name;

	if (!label && tooltipText) {
		tooltipText = (
			<RichLabel
				label={tooltipText}
				subtitle={currentColorName}
				noColor
			/>
		);
	} else if (!label && tooltip) {
		tooltipText = (
			<RichLabel
				label={tooltip}
				subtitle={currentColorName}
				noColor
			/>
		);
	} else if (label) {
		tooltipText = currentColorName;
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			className={clsx('es:w-full', labelClassName)}
			inline={!stacked}
		>
			<Menu
				triggerIcon={
					<>
						{type === 'default' || icon ? (
							<ColorSwatch
								color={currentColor}
								className='es:size-6!'
								flat
							/>
						) : null}
						{!icon && type !== 'default' ? (
							<div className='es:relative es:size-6 es:icon:absolute es:icon:inset-0 es:icon:size-full'>
								{menuTriggerIcon}
								<ColorSwatch
									color={currentColor}
									className='es:absolute es:-bottom-0.5 es:left-0 es:h-2!'
									flat
								/>
							</div>
						) : null}
					</>
				}
				keepOpen
				tooltip={tooltipText}
				triggerProps={{
					...triggerProps,
					'aria-label': typeof label !== 'undefined' ? undefined : ariaLabel,
				}}
				{...menuProps}
			>
				{clearable ? (
					<>
						<MenuItem
							onClick={() => onChange(undefined)}
							selected={typeof value === 'undefined'}
							endIcon={
								<ColorSwatch
									className='es:size-5!'
									flat
								/>
							}
						>
							{clearItemLabel}
						</MenuItem>
						<MenuSeparator />
					</>
				) : null}

				{noColorGroups || !hasColorGroups
					? colors.map((color) => (
							<SingleItem
								key={color.slug}
								{...color}
							/>
						))
					: null}

				{hasColorGroups && groupedColors ? (
					<>
						{Object.entries(groupedColors).map(([groupSlug, groupedColorItems]) => {
							if (groupSlug === 'generic') {
								return null;
							}

							return (
								<MenuSection
									key={groupSlug}
									aria-label={colorGroupNames[groupSlug]}
								>
									{groupedColorItems.map((color) => (
										<SingleItem
											key={color.slug}
											{...color}
										/>
									))}
								</MenuSection>
							);
						})}

						{genericGroupedColors.length > 0 ? (
							<MenuSection aria-label={colorGroupNames.generic}>
								{genericGroupedColors.map((color) => (
									<SingleItem
										key={color.slug}
										{...color}
									/>
								))}
							</MenuSection>
						) : null}
					</>
				) : null}

				{extraOptions ? <MenuSeparator /> : null}
				{extraOptions}
			</Menu>
		</BaseControl>
	);
};
