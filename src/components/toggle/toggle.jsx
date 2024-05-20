/* eslint-disable react/prop-types */
import { Label } from 'react-aria-components';
import { Switch } from './switch';
import { IconLabel } from '../icon-label/icon-label';

export const Toggle = (props) => {
	const { checked, onChange, icon, label, subtitle, disabled } = props;

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
				fullWidth
			/>
		</Switch>
	);
};
