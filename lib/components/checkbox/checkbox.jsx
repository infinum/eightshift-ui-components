import { Checkbox as ReactAriaCheckbox } from 'react-aria-components';
import { clsx } from 'clsx';

import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { icons } from '../../icons/icons';
import { RichLabel } from '../rich-label/rich-label';
import { Label } from 'react-aria-components';
import { cva } from 'class-variance-authority';

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
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
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

		flat,
		alignEnd,

		children,

		hidden,
		...other
	} = props;

	if (hidden) {
		return null;
	}

	const checkboxClasses = cva(
		[
			'es:size-5 es:shrink-0',
			'es:grid es:place-items-center es:grid-cols-1 es:grid-rows-1',
			'es:*:row-start-1 es:*:col-start-1',
			'es:rounded-sm',
			'es:transition-plus es:duration-300 es:ease-spring-smooth',
			'es:inset-ring',
			'es:any-focus:outline-hidden',
			'es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/30',
		],
		{
			variants: {
				disabled: {
					true: 'es:cursor-not-allowed',
					false: 'es:inset-shadow-xs es:bg-linear-to-b es:from-25%',
				},
			},
			compoundVariants: [
				{ flat: false, disabled: false, class: 'es:shadow-xs es:shadow-black/5' },
				//
				{
					active: false,
					disabled: false,
					class: [
						'es:bg-secondary-50 es:inset-ring-secondary-300/60',
						'es:from-black/1 es:to-black/5',
						'es:hover:bg-surface-100 es:hover:inset-ring-surface-300/60',
						'es:inset-shadow-white/50',
						'es:group-focus-visible:inset-ring-accent-500',
					],
				},
				{
					active: true,
					disabled: false,
					class: [
						'es:bg-accent-600 es:inset-ring-accent-800/5 es:text-white',
						'es:from-accent-50/10 es:to-accent-50/2',
						'es:inset-shadow-accent-50/35',
						'es:group-focus-visible:inset-ring-accent-950',
					],
				},
				//
				{
					active: true,
					disabled: true,
					class: ['es:bg-secondary-400 es:inset-ring-secondary-400 es:text-white'],
				},
				{
					active: false,
					disabled: true,
					class: ['es:bg-white es:inset-ring-secondary-300 es:text-secondary-50', 'es:bg-linear-to-b es:from-secondary-800/0 es:to-secondary-800/3'],
				},
			],
			defaultVariants: {
				flat: false,
				active: false,
				indeterminate: false,
				checked: false,
				disabled: false,
			},
		},
	);

	return (
		<ReactAriaCheckbox
			isDisabled={disabled}
			isIndeterminate={indeterminate}
			isReadOnly={readOnly}
			isSelected={checked ?? false}
			onChange={onChange}
			className={clsx('es:group es:flex es:w-full es:items-center es:gap-2', className)}
			{...other}
		>
			{!alignEnd && (label || subtitle) && (
				<RichLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					className={labelClassName}
					inlineSubtitle={inlineSubtitle}
					fullSizeSubtitle
					fullWidth
					as={Label}
					noColor
				/>
			)}
			<div
				className={checkboxClasses({
					active: checked || indeterminate,
					indeterminate,
					checked,
					disabled,
					flat,
				})}
			>
				<AnimatedVisibility
					transition='scaleRotateFade'
					visible={indeterminate}
					className='es:transition-none'
				>
					<div className={clsx('es:h-0.5 es:w-3 es:rounded-full es:bg-white', !disabled && 'es:shadow-xs es:shadow-accent-950/30')} />
				</AnimatedVisibility>

				<AnimatedVisibility
					transition='scaleRotateFade'
					visible={!indeterminate && checked}
					className={clsx('es:transition-none es:icon:size-4 es:icon:stroke-[2.5]', !disabled && 'es:icon:drop-shadow-xs es:icon:drop-shadow-accent-950/30')}
					noInitial
				>
					{icons.check}
				</AnimatedVisibility>
			</div>

			{alignEnd && (label || subtitle) && (
				<RichLabel
					label={label}
					subtitle={subtitle}
					className={clsx(subtitle && 'es:mt-1.25', labelClassName)}
					inlineSubtitle={inlineSubtitle}
					fullSizeSubtitle
					as={Label}
					noColor
				/>
			)}

			{!(icon || label || subtitle) && children}
		</ReactAriaCheckbox>
	);
};
