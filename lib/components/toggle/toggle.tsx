import { clsx } from 'clsx';
import { type ReactElement } from 'react';
import { Label } from 'react-aria-components';
import { RichLabel } from '../rich-label/rich-label';
import { Switch } from './switch';

type ToggleProps = {
	checked: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	icon?: ReactElement;
	label: string;
	subtitle?: string;
	className?: string;
	labelClassName?: string;
	isIndeterminate?: boolean;
	flat?: boolean;
	hidden?: boolean;
};

export const Toggle = (props: ToggleProps) => {
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
