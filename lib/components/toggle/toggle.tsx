import { clsx } from 'clsx';
import { type ReactElement } from 'react';
import { Label } from 'react-aria-components';
import { RichLabel } from '../rich-label/rich-label';
import { Switch } from './switch';
import type { Prettify } from '../../utilities/types';

type ToggleProps = {
	/** Whether the switch is checked. */
	checked: boolean;
	/** Function to call when the switch is toggled. */
	onChange: (value: boolean) => void;
	/** Whether the switch is disabled. */
	disabled?: boolean;
	/** Icon to display. */
	icon?: ReactElement;
	/** Label to display. */
	label: string;
	/** Subtitle to display. */
	subtitle?: string;
	/** Classes to pass to the toggle switch. */
	className?: string;
	/** Classes to pass to the label. */
	labelClassName?: string;
	/** If `true`, the switch will render in an indeterminate state. */
	isIndeterminate?: boolean;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

/**
 * A toggle switch with a label and optional icon and subtitle.
 *
 * @component
 * @param {ToggleProps} props - Component props.
 *
 * @returns {JSX.Element} The Toggle component.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 *
 * <Toggle
 * 	icon={myIcon}
 * 	label='My toggle'
 * 	checked={checked}
 * 	onChange={() => setChecked(!checked)}
 * />
 */
export const Toggle = (props: Prettify<ToggleProps>) => {
	const { checked, onChange, icon, label, subtitle, disabled, className, labelClassName, isIndeterminate, flat, hidden } = props;

	if (hidden) {
		return null;
	}

	return (
		<Switch
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			className={className}
			isIndeterminate={isIndeterminate}
			flat={flat}
		>
			<RichLabel
				as={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				className={clsx('es:py-2', labelClassName)}
				fullWidth
			/>
		</Switch>
	);
};
