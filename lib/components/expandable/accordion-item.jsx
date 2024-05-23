import { __ } from '@wordpress/i18n';
import { forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import { useAccordionItem } from '@react-aria/accordion';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';

import { AccordionContext } from './accordion-context';
import { icons } from '../../icons/icons';
import { IconLabel } from '../icon-label/icon-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { classnames } from '../../utilities/classnames';
import { Tooltip } from '../tooltip/tooltip';

const AccordionItem = forwardRef((props, ref) => {
	const { item } = props;
	const {
		label,
		icon,
		subtitle,
		labelClassName,
		actions,
		keepActionsOnExpand,
		disabled,
		// This is needed so it doesn't get passed to the main div.
		// eslint-disable-next-line no-unused-vars
		textValue,
		...others
	} = item.props;

	const state = useContext(AccordionContext);
	const buttonRef = useRef();
	const {
		buttonProps: accordionButtonProps,
		regionProps: accordionRegionProps,
	} = useAccordionItem(props, state, buttonRef);
	const isOpen = state.expandedKeys.has(item.key);

	useImperativeHandle(ref, () => buttonRef.current);
	const { buttonProps: raButtonProps } = useButton(props, buttonRef);

	const mergedTriggerProps = mergeProps(accordionButtonProps, raButtonProps);

	const filteredProps = !disabled
		? mergedTriggerProps
		: {
				...Object.entries(mergedTriggerProps).reduce((acc, [key, value]) => {
					if (key.startsWith('on')) {
						return acc;
					}

					return { ...acc, [key]: value };
				}, {}),
				disabled: true,
			};

	return (
		<div {...others}>
			<div
				className={classnames(
					'es-uic-flex es-uic-w-full es-uic-items-center es-uic-gap-1 es-uic-border es-uic-border-gray-300 es-uic-p-1 es-uic-pl-2 es-uic-transition-[border-radius]',
					isOpen ? 'es-uic-rounded-t-lg es-uic-rounded-b-0 es-uic-border-b-transparent' : 'es-uic-rounded-lg',
				)}
			>
				<IconLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={labelClassName}
					fullWidth
				/>

				{actions && !keepActionsOnExpand && (
					<AnimatedVisibility
						visible={!isOpen}
						className='es-uic-ml-auto es-uic-flex es-uic-gap-2'
						transition='scaleFade'
						noInitial
					>
						{actions}
					</AnimatedVisibility>
				)}

				{actions && keepActionsOnExpand && (
					<div className='es-uic-ml-auto es-uic-flex es-uic-gap-2'>{actions}</div>
				)}

				<Tooltip
					text={
						isOpen
							? __('Close', 'eightshift-components')
							: __('Open', 'eightshift-components')
					}
				>
					<button
						ref={buttonRef}
						className={classnames(
							'es-uic-flex es-uic-size-8 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-border-transparent es-uic-duration-300 es-uic-text-gray-700 es-uic-transition',
							'hover:es-uic-border-gray-200 hover:es-uic-shadow-sm',
							'disabled:es-uic-border-gray-100 disabled:es-uic-text-gray-200 disabled:es-uic-shadow-none',
							'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
							!actions || (!keepActionsOnExpand && isOpen && 'es-uic-ml-auto'),
						)}
						{...filteredProps}
					>
						<span
							className={classnames(
								'es-uic-transition-transform es-uic-duration-300 es-uic-will-change-transform [&>svg]:es-uic-size-5.5',
								isOpen && '-es-uic-scale-y-100',
							)}
						>
							{isOpen && !disabled ? icons.caretDownFill : icons.caretDown}
						</span>
					</button>
				</Tooltip>
			</div>

			<AnimatedVisibility
				className='es-uic-rounded-b-lg es-uic-border-x es-uic-border-b es-uic-border-gray-300 es-uic-p-1'
				visible={isOpen && !disabled}
				{...accordionRegionProps}
			>
				{item.rendered}
			</AnimatedVisibility>
		</div>
	);
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
