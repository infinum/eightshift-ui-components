/* eslint-disable react/prop-types */
import { Label } from 'react-aria-components';
import { Switch } from './switch';
import { IconLabel } from '../icon-label/icon-label';

/**
 * A toggle switch with a label and optional icon and subtitle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} checked - Whether the switch is checked.
 * @param {Function} onChange - Function to call when the switch is toggled.
 * @param {boolean} [disabled] - Whether the switch is disabled.
 * @param {JSX.Element} [icon] - Icon to display.
 * @param {string} label - Label to display.
 * @param {string} [subtitle] - Subtitle to display.
 * @param {string} [className] - Classes to pass to the label.
 *
 * @returns {JSX.Element} The Toggle component.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 *
 * <Toggle
 * 	icon={icons.myIcon}
 * 	label='My toggle'
 * 	checked={checked}
 * 	onChange={() => setChecked(!checked)}
 * />
 *
 * @preserve
 */
export const Toggle = (props) => {
	const { checked, onChange, icon, label, subtitle, disabled, className } = props;

	return (
		<Switch
			checked={checked}
			onChange={onChange}
			disabled={disabled}
		>
			<IconLabel
				as={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				className={className}
				fullWidth
			/>
		</Switch>
	);
};
