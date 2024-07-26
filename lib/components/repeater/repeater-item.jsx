import { GridListItem, GridListContext } from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { clsx } from 'clsx/lite';
import { useContext } from 'react';
import { Expandable } from '../expandable/expandable';
import { __ } from '@wordpress/i18n';
import { RepeaterContext } from './repeater-context';
import { useRef } from 'react';

/**
 * A Repeater item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - Icon to display in the label.
 * @param {string} [props.label] - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {JSX.Element|JSX.Element[]} [props.actions] - Actions to display to the right of the label.
 * @param {string} [props.textValue] - The text value of the item.
 * @param {string} [props.className] - Classes to pass to the item.
 * @param {bool} [props.expandDisabled] - If `true`, the item cannot be expanded.
 *
 * @returns {JSX.Element} The RepeaterItem component.
 *
 * @see {@link Repeater} for usage example.
 *
 * @preserve
 */
export const RepeaterItem = (props) => {
	const { children, icon, label, subtitle, 'aria-label': ariaLabel, className, actions, textValue, expandDisabled, ...rest } = props;

	const { canDelete, handleOpenChange, deleteItem, isDragSource } = useContext(RepeaterContext);

	return (
		<>
			<Expandable
				disabled={canDelete}
				icon={icon}
				label={label}
				subtitle={subtitle}
				className={clsx(isDragSource && 'es-uic-border es-uic-border-gray-100 es-uic-bg-white/50 es-uic-shadow-md es-uic-backdrop-blur-lg')}
				labelClassName={className}
				onOpenChange={(isOpen) => handleOpenChange(isOpen)}
				actions={
					<>
						{actions}

						<Button
							hidden={!canDelete}
							ariaLabel={__('Remove item', 'eightshift-ui-components')}
							size='small'
							type='ghost'
							icon={icons.trash}
							onPress={() => deleteItem()}
							className='es-uic-translate-x-px'
						/>
					</>
				}
				noFocusHandling
			>
				{children}
			</Expandable>
		</>
	);
};
