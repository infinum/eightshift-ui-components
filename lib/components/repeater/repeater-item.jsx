import { Checkbox as ReactAriaCheckbox, GridListItem } from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { classnames } from '../../utilities/classnames';
import { Expandable } from '../expandable/expandable';
import { __ } from '@wordpress/i18n';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { Menu, MenuItem } from '../menu/menu';

export const RepeaterItem = (props) => {
	const { children, icon, label, subtitle, className, actions, ...rest } = props;
	return (
		<GridListItem
			aria-label='Abc'
			textValue={props.textValue}
			className={classnames(
				'es-uic-rounded-lg es-uic-transition',
				'focus:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
			)}
			{...rest}
		>
			{({ selectionMode, allowsDragging }) => (
				<Expandable
					disabled={selectionMode === 'multiple'}
					icon={
						<>
							{selectionMode === 'multiple' && <Checkbox slot='selection' />}
							{selectionMode === 'none' && icon}
						</>
					}
					label={<div className='es-uic-flex es-uic-items-center es-uic-gap-1'>{label}</div>}
					subtitle={subtitle}
					labelClassName={className}
					actions={
						<>
							{selectionMode === 'none' && allowsDragging && (
								<Button
									size='small'
									className='es-uic-h-6 es-uic-w-4 !es-uic-text-gray-500 es-uic-opacity-5 focus:!es-uic-opacity-100'
									slot='drag'
									type='ghost'
									icon={icons.reorderGrabberV}
									tooltip={__('Re-order', 'eightshift-components')}
								/>
							)}

							<Menu>
								<MenuItem>{__('Remove', 'eightshift-components')}</MenuItem>
							</Menu>

							{actions}
						</>
					}
					noFocusHandling
				>
					{children}
				</Expandable>
			)}
		</GridListItem>
	);
};

const Checkbox = (props) => {
	const { children } = props;

	return (
		<ReactAriaCheckbox {...props}>
			{({ isIndeterminate, isSelected }) => (
				<>
					<div
						className={classnames(
							'es-uic-flex es-uic-size-5.5 es-uic-items-center es-uic-justify-center es-uic-rounded-md es-uic-border es-uic-text-gray-600 es-uic-shadow-sm es-uic-transition',
							isSelected && 'es-uic-border-teal-600 es-uic-bg-teal-600 es-uic-text-white',
						)}
					>
						{isIndeterminate && icons.solidRectFilled}

						<AnimatedVisibility
							transition='scaleRotateFade'
							visible={!isIndeterminate && isSelected}
							className='[&>svg]:es-uic-size-3 [&>svg]:es-uic-stroke-2'
							noInitial
						>
							{icons.check}
						</AnimatedVisibility>
					</div>
					{children}
				</>
			)}
		</ReactAriaCheckbox>
	);
};
