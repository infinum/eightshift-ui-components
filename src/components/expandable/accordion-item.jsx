import { __ } from '@wordpress/i18n';
import { forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import { useAccordionItem } from '@react-aria/accordion';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';

import { AccordionContext } from './accordion-context';
import { icons } from '../icons/icons';
import { IconLabel } from '../icon-label/icon-label';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { classnames } from '../../utilities/classnames';
import { Tooltip } from '../tooltip/tooltip';

// eslint-disable-next-line react/display-name
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
					'flex w-full items-center gap-1 border border-gray-300 p-1 transition-[border-radius]',
					isOpen ? 'rounded-t-lg border-b-transparent' : 'rounded-lg',
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
						className='ml-auto flex gap-2'
						transition='scaleFade'
						noInitial
					>
						{actions}
					</AnimatedVisibility>
				)}

				{actions && keepActionsOnExpand && (
					<div className='ml-auto flex gap-2'>{actions}</div>
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
							'flex size-8 items-center justify-center rounded border border-transparent duration-300 hover:border-gray-200 text-gray-700 hover:shadow-sm transition disabled:border-gray-100 disabled:text-gray-200 disabled:shadow-none',
							'focus:outline-none  focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
							!actions || (!keepActionsOnExpand && isOpen && 'ml-auto'),
						)}
						{...filteredProps}
					>
						<span
							className={classnames(
								'transition-transform duration-300 will-change-transform [&>svg]:size-5.5',
								isOpen && '-scale-y-100',
							)}
						>
							{isOpen && !disabled ? icons.caretDownFill : icons.caretDown}
						</span>
					</button>
				</Tooltip>
			</div>

			<AnimatedVisibility
				className='rounded-b-lg border-x border-b border-gray-300 p-1'
				visible={isOpen && !disabled}
				{...accordionRegionProps}
			>
				{item.rendered}
			</AnimatedVisibility>
		</div>
	);
});

export default AccordionItem;
