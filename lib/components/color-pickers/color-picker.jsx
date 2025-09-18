import { __ } from '@wordpress/i18n';
import { Menu, MenuItem, MenuSection, MenuSeparator } from '../menu/menu';
import { ColorSwatch } from './color-swatch';
import { RichLabel } from '../rich-label/rich-label';
import { BaseControl } from '../base-control/base-control';
import { clsx } from 'clsx/lite';
import { icons } from '../../icons/icons';

/**
 * Color picker.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.icon] - Icon to display.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.labelClassName] - Additional clsx passed to the label.
 * @param {string} props.value - Selected value.
 * @param {Function} props.onChange - Function to run when the value changes.
 * @param {Object[]} props.colors - Colors to display.
 * @param {string} props.colors[].name - Color name.
 * @param {string} props.colors[].slug - Color slug.
 * @param {string} props.colors[].color - Color value (HEX, RGB, HSL, HSB).
 * @param {boolean} [props.showColorCode] - If `true`, the HEX color code is shown below the color name.
 * @param {boolean} [props.noColorGroups] - If `true`, colors won't be grouped by shades.
 * @param {ColorPickerType} props.type - Type of the color picker. Affects the icon and tooltip.
 * @param {boolean} [props.clearable] - If `true`, the picked color can be removed.
 * @param {boolean} [props.stacked] - If `true`, the control is not rendered inline.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 * @param {string} [props.tooltip] - If provided, overrides the default tooltip text. If there is no label, the value will still be shown within the tooltip.
 * @param {string} [props.clearItemLabel] - Label for the "None" item, if `clearable` is enabled.
 * @param {JSX.Element|JSX.Element[]} [props.extraOptions] - If `type` is `menu`, allows passing additional menu items, which will be displayed below the options.
 *
 * @returns {JSX.Element} The ColorPicker component.
 *
 * @typedef {'default' | 'fillColor' | 'textColor' | 'textHighlightColor' | 'listMarkerColor'} ColorPickerType
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
 *
 * @preserve
 */
export const ColorPicker = (props) => {
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

		...rest
	} = props;

	if (hidden) {
		return null;
	}

	const currentColor = colors?.find(({ slug }) => slug === value)?.color;

	const colorSuffixRegex = /(?!^.+)(-?(?:50|100|200|300|400|500|600|700|800|900|950|10|20|30|40|50|60|70|80|90){1})$/gi;

	const hasColorGroups = !noColorGroups && colors?.some(({ slug }) => colorSuffixRegex.test(slug));

	let groupedColors;

	const colorGroupNames = {
		generic: __('Other colors', 'eightshift-ui-components'),
	};

	if (hasColorGroups) {
		groupedColors = colors.reduce(
			(output, current) => {
				// Bailout if a color is invalid.
				if (current === undefined || current?.name === undefined || current?.slug === undefined) {
					return output;
				}

				if (current.slug.match(colorSuffixRegex)?.length) {
					const newSlug = current.slug.replace(colorSuffixRegex, '').trim();

					if (!output[newSlug]) {
						output[newSlug] = [];
						colorGroupNames[newSlug] = current.name.replace(colorSuffixRegex, '').trim();
					}

					output[newSlug] = [
						...output[newSlug],
						{
							...current,
							shade: current.slug.match(colorSuffixRegex)[0].replace('-', ''),
						},
					];
				} else {
					output.generic = [...output.generic, current];
				}

				return output;
			},
			{ generic: [] },
		);
	}

	const SingleItem = ({ name, slug, color, ...rest }) => (
		<MenuItem
			{...rest}
			endIcon={
				<ColorSwatch
					className='es:size-5!'
					color={color}
				/>
			}
			onClick={() => onChange(slug)}
			selected={value === slug}
		>
			{!showColorCode && name.replaceAll('-', ' ')}
			{showColorCode && (
				<RichLabel
					label={name.replaceAll('-', ' ')}
					subtitle={color.toUpperCase()}
				/>
			)}
		</MenuItem>
	);

	let tooltipText;
	let menuTriggerIcon;

	if (type === 'default') {
		tooltipText = __('Color', 'eightshift-ui-components');
	} else if (type === 'fillColor') {
		tooltipText = __('Fill color', 'eightshift-ui-components');
		menuTriggerIcon = icons.colorPickerFill;
	} else if (type === 'textColor') {
		tooltipText = __('Text color', 'eightshift-ui-components');
		menuTriggerIcon = icons.colorPickerText;
	} else if (type === 'textHighlightColor') {
		tooltipText = __('Text highlight color', 'eightshift-ui-components');
		menuTriggerIcon = icons.colorPickerTextHighlight;
	} else if (type === 'listMarkerColor') {
		tooltipText = __('List marker color', 'eightshift-ui-components');
		menuTriggerIcon = icons.colorPickerListMarker;
	}

	const currentColorName = colors?.find((color) => color?.slug === value)?.name;

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
						{(type === 'default' || icon) && (
							<ColorSwatch
								color={currentColor}
								className='es:size-6! es:shadow-none!'
							/>
						)}
						{!icon && type !== 'default' && (
							<div className='es:relative es:size-6 es:icon:absolute es:icon:inset-0 es:icon:size-full'>
								{menuTriggerIcon}
								<ColorSwatch
									color={currentColor}
									className='es:absolute es:-bottom-0.5 es:left-0 es:h-2! es:shadow-none!'
								/>
							</div>
						)}
					</>
				}
				keepOpen
				tooltip={tooltipText}
				triggerProps={{
					...rest.triggerProps,
					'aria-label': typeof label !== 'undefined' ? null : props?.['aria-label'],
				}}
				{...rest}
			>
				{clearable && (
					<>
						<MenuItem
							onClick={() => onChange(undefined)}
							selected={typeof value === 'undefined'}
							endIcon={<ColorSwatch className='es:size-5!' />}
						>
							{clearItemLabel}
						</MenuItem>
						<MenuSeparator />
					</>
				)}

				{(noColorGroups || !hasColorGroups) &&
					colors.map((color) => (
						<SingleItem
							key={color.slug}
							{...color}
						/>
					))}

				{hasColorGroups && (
					<>
						{Object.entries(groupedColors).map(([groupSlug, colors]) => {
							if (groupSlug === 'generic') {
								return null;
							}

							return (
								<MenuSection
									key={groupSlug}
									aria-label={colorGroupNames[groupSlug]}
								>
									{colors.map((color) => (
										<SingleItem
											key={color.slug}
											{...color}
										/>
									))}
								</MenuSection>
							);
						})}

						{groupedColors.generic.length > 0 && (
							<MenuSection aria-label={colorGroupNames.generic}>
								{groupedColors.generic.map((color) => (
									<SingleItem
										key={color.slug}
										{...color}
									/>
								))}
							</MenuSection>
						)}
					</>
				)}

				{extraOptions && <MenuSeparator />}
				{extraOptions}
			</Menu>
		</BaseControl>
	);
};
