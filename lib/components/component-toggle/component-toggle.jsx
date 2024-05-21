import { __ } from '@wordpress/i18n';
import { Expandable } from '../expandable/expandable';
import { icons } from '../../icons/icons';
import { Switch } from '../toggle/switch';
import { Tooltip } from '../tooltip/tooltip';

export const ComponentToggle = (props) => {
	const {
		children,
		icon,
		label,
		useComponent,
		onChange,
		noUseToggle,
		expandButtonDisabled,
		controlOnly,
	} = props;

	if (controlOnly) {
		return children;
	}

	return (
		<Expandable
			icon={icon ?? icons.componentGeneric}
			label={label}
			actions={
				!noUseToggle && (
					<Tooltip text={__('Toggle component', 'eightshift-components')}>
						<div className='es-uic-mr-0.5 es-uic-flex es-uic-min-h-8 es-uic-items-center es-uic-border-r es-uic-border-r-gray-200 es-uic-pr-1.5'>
							<Switch
								checked={useComponent}
								onChange={onChange}
							/>
						</div>
					</Tooltip>
				)
			}
			disabled={!useComponent || expandButtonDisabled}
		>
			{!expandButtonDisabled && children}
		</Expandable>
	);
};
