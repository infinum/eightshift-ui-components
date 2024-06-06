import { __ } from '@wordpress/i18n';
import { Menu, MenuItem, MenuSection } from '../menu/menu';
import { ColorSwatch } from './color-swatch';
import { RichLabel } from '../rich-label/rich-label';
import { BaseControl } from '../base-control/base-control';
import { classnames } from '../../utilities/classnames';
import { icons } from '../../icons/icons';

/**
 * Color picker.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.icon] - Icon to display.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.labelClassName] - Additional classnames passed to the label.
 * @param {string} props.value - Selected value.
 * @param {Function} props.onChange - Function to run when the value changes.
 * @param {Object[]} props.colors - Colors to display.
 * @param {string} props.colors[].name - Color name.
 * @param {string} props.colors[].slug - Color slug.
 * @param {string} props.colors[].color - Color value (HEX, RGB, HSL, HSB).
 * @param {boolean} [props.showColorCode] - If `true`, the HEX color code is shown below the color name.
 * @param {boolean} [props.noColorGroups] - If `true`, colors won't be grouped by shades.
 * @param {ColorPickerType} props.type - Type of the color picker. Affects the icon and tooltip.
 * @param {boolean} [props.clearable] - If `true`, the color can be deselected.
 *
 * @returns {JSX.Element} The ColorPicker component.
 *
 * @typedef {'default' | 'fillColor' | 'textColor' | 'textHighlightColor'} ColorPickerType
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

		clearable,

		...rest
	} = props;

	const currentColor = colors?.find(({ slug }) => slug === value)?.color;

	const colorSuffixRegex =
		/(?!^.+)(-?(?:50|100|200|300|400|500|600|700|800|900|950|10|20|30|40|50|60|70|80|90){1})$/gi;

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
					className='!es-uic-size-5.5'
					color={color}
				/>
			}
			onClick={() => {
				if (clearable && value === slug) {
					onChange(undefined);
					return;
				}

				onChange(slug);
			}}
			checked={clearable ? value === slug : null}
			selected={!clearable ? value === slug : null}
		>
			{!showColorCode && name}
			{showColorCode && (
				<RichLabel
					label={name}
					subtitle={color.toUpperCase()}
				/>
			)}
		</MenuItem>
	);

	let tooltipText;

	if (!label && type === 'default') {
		tooltipText = __('Color', 'eightshift-ui-components');
	} else if (!label && type === 'fillColor') {
		tooltipText = __('Fill color', 'eightshift-ui-components');
	} else if (!label && type === 'textColor') {
		tooltipText = __('Text color', 'eightshift-ui-components');
	} else if (!label && type === 'textHighlightColor') {
		tooltipText = __('Text highlight color', 'eightshift-ui-components');
	}

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			className={classnames('es-uic-w-full', labelClassName)}
			inline
		>
			<Menu
				triggerIcon={
					<>
						{(type === 'default' || icon) && (
							<ColorSwatch
								color={currentColor}
								className='!es-uic-size-6 !es-uic-shadow-none'
							/>
						)}
						{!icon && type === 'fillColor' && (
							<div className='es-uic-relative es-uic-size-6 [&>svg]:es-uic-absolute [&>svg]:-es-uic-top-0.5 [&>svg]:es-uic-left-0.5 [&>svg]:es-uic-size-[1.125rem]'>
								{icons.fillColor}
								<ColorSwatch
									color={currentColor}
									className='es-uic-absolute -es-uic-bottom-0.5 es-uic-left-0 !es-uic-h-2 !es-uic-shadow-none'
								/>
							</div>
						)}

						{!icon && type === 'textColor' && (
							<div className='es-uic-relative es-uic-size-6 [&>svg]:es-uic-absolute [&>svg]:-es-uic-top-[0.25rem] [&>svg]:es-uic-left-0 [&>svg]:es-uic-size-6'>
								{icons.textAbc}
								<ColorSwatch
									color={currentColor}
									className='es-uic-absolute -es-uic-bottom-0.5 es-uic-left-0 !es-uic-h-2 !es-uic-shadow-none'
								/>
							</div>
						)}

						{!icon && type === 'textHighlightColor' && (
							<div className='es-uic-relative es-uic-size-6 [&>svg]:es-uic-absolute [&>svg]:-es-uic-top-[0.325rem] [&>svg]:es-uic-left-0 [&>svg]:es-uic-size-6'>
								{icons.titleGeneric}
								<ColorSwatch
									color={currentColor}
									className='es-uic-absolute -es-uic-bottom-0.5 es-uic-left-0 !es-uic-h-2 !es-uic-shadow-none'
								/>
							</div>
						)}
					</>
				}
				keepOpen
				triggerProps={{
					tooltip: tooltipText,
					...rest.triggerProps,
				}}
				{...rest}
			>
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
									label={colorGroupNames[groupSlug]}
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
			</Menu>
		</BaseControl>
	);
};
