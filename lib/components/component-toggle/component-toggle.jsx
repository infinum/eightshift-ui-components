import { __ } from '@wordpress/i18n';
import { Expandable } from '../expandable/expandable';
import { icons } from '../icons/icons';
import { Switch } from '../toggle/switch';
import { Tooltip } from '../tooltip/tooltip';

export const ComponentToggle = (props) => {
	const { children, icon, label, useComponent, onChange, noUseToggle, expandButtonDisabled } =
		props;

	return (
		<Expandable
			icon={icon ?? icons.componentGeneric}
			label={label}
			actions={
				!noUseToggle && (
					<Tooltip text={__('Toggle component', 'eightshift-components')}>
						<div className='mr-0.5 flex min-h-8 items-center border-r border-r-gray-200 pr-1.5'>
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
