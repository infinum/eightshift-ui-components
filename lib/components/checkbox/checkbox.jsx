import { Checkbox as ReactAriaCheckbox } from 'react-aria-components';
import { clsx } from 'clsx/lite';

import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { icons } from '../../icons/icons';
import { RichLabel } from '../rich-label/rich-label';
import { Label } from 'react-aria-components';

/**
 * A simple checkbox.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - The checkbox icon.
 * @param {string} [props.label] - The checkbox label.
 * @param {string} [props.subtitle] - The checkbox subtitle.
 * @param {boolean} props.checked - Whether the checkbox is checked.
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled.
 * @param {boolean} [props.readOnly] - Whether the checkbox is read-only.
 * @param {boolean} [props.indeterminate] - Whether the checkbox is in an indeterminate state.
 * @param {Function} props.onChange - The function to call when the checkbox is changed.
 * @param {string} [props.className] - Additional classes to add to the checkbox container.
 * @param {string} [props.labelClassName] - Additional classes to add to the label container.
 * @param {boolean} [props.alignEnd] - Whether the label should be aligned to the end.
 * @param {boolean} [props.inlineSubtitle] - If `true`, the subtitle is shown after the label instead of below it.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Checkbox component.
 *
 * @example
 * <Checkbox
 *  label='My label'
 *  checked={myValue}
 *  onChange={(value) => setMyValue(value)}
 * />
 *
 * @preserve
 */
export const Checkbox = (props) => {
	const {
		icon,
		label,
		subtitle,

		checked,
		disabled,
		readOnly,
		indeterminate,

		onChange,

		className,
		labelClassName,

		inlineSubtitle,

		alignEnd,

		children,

		hidden,
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const selectedOrIntermediate = checked || indeterminate;

	return (
		<ReactAriaCheckbox
			isDisabled={disabled}
			isIndeterminate={indeterminate}
			isReadOnly={readOnly}
			isSelected={checked ?? false}
			onChange={onChange}
			className={clsx('es:group es:flex es:w-full es:items-center es:gap-1.5 es:text-sm', className)}
			{...other}
		>
			{(icon || alignEnd) && (label || subtitle) && (
				<RichLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={clsx('es:ml-1', labelClassName)}
					inlineSubtitle={inlineSubtitle}
					fullSizeSubtitle
					fullWidth
					as={Label}
				/>
			)}
			<div
				className={clsx(
					'es:size-5 es:grid es:place-items-center es:grid-cols-1 es:grid-rows-1 es:*:row-start-1 es:*:col-start-1',
					'es:transition es:cursor-pointer',
					'es:bg-radial es:border es:rounded-md',
					'es:shadow-sm es:inset-ring es:inset-shadow-xs',
					'es:any-focus:outline-hidden es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/50',
					!selectedOrIntermediate && 'es:group-focus-visible:border-accent-500',
					!selectedOrIntermediate && 'es:border-secondary-300 es:inset-ring-secondary-100 es:inset-shadow-secondary-100/50',
					!selectedOrIntermediate && 'es:from-secondary-50 es:to-white es:text-secondary-600 es:hover:text-accent-950',
					!selectedOrIntermediate && 'es:hover:inset-shadow-secondary-100 es:hover:to-secondary-100 es:hover:inset-ring-secondary-100',
					selectedOrIntermediate && 'es:text-white es:from-accent-500 es:to-accent-600',
					selectedOrIntermediate && 'es:shadow-accent-600/30 es:border-accent-700 es:inset-ring es:inset-ring-accent-600 es:inset-shadow-accent-400/75',
					selectedOrIntermediate && 'es:group-focus-visible:inset-ring-accent-600 es:group-focus-visible:inset-shadow-xs es:group-focus-visible:inset-shadow-accent-400',
					!alignEnd && subtitle && 'es:mb-auto',
				)}
			>
				<AnimatedVisibility
					transition='scaleRotateFade'
					visible={indeterminate}
					className='es:transition-none'
				>
					<div className='es:h-0.5 es:w-3 es:rounded es:bg-white' />
				</AnimatedVisibility>

				<AnimatedVisibility
					transition='scaleRotateFade'
					visible={!indeterminate && checked}
					className='es:transition-none es:icon:size-4 es:icon:stroke-2'
					noInitial
				>
					{icons.check}
				</AnimatedVisibility>
			</div>
			{!icon && !alignEnd && (label || subtitle) && (
				<RichLabel
					label={label}
					subtitle={subtitle}
					className={clsx(subtitle && 'es:mt-0.5', 'es:ml-0.5 es:*:space-y-0.5', labelClassName)}
					inlineSubtitle={inlineSubtitle}
					fullSizeSubtitle
					as={Label}
				/>
			)}
			{!(icon || label || subtitle) && children}
		</ReactAriaCheckbox>
	);
};
