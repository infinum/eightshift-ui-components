import { Switch as ReactAriaSwitch } from 'react-aria-components';
import { cva } from 'class-variance-authority';
import { icons } from '../../icons';

/**
 * A toggle switch.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.checked - Whether the switch is checked.
 * @param {Function} props.onChange - Function to call when the switch is toggled.
 * @param {boolean} [props.disabled] - Whether the switch is disabled.
 * @param {string} [props.id] - The ID of the switch.
 * @param {string} [props.className] - Classes to pass to the switch.
 * @param {boolean} [props.isIndeterminate] - If `true`, the switch will render in an indeterminate state.
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Switch component.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 *
 * <Switch
 * 	checked={checked}
 * 	onChange={() => setChecked(!checked)}
 * />
 *
 * @preserve
 */
export const Switch = (props) => {
	const { checked, onChange, disabled, id, children, className, isIndeterminate, flat, hidden, ...rest } = props;

	const outsideClasses = cva(
		[
			'es:h-6 es:w-10 es:p-1',
			'es:flex es:shrink-0 es:items-center',
			'es:rounded-full',
			'es:transition es:duration-300',
			'es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/30 es:group-focus-visible:inset-ring-accent-500',
			'es:inset-ring',
			className,
		],
		{
			variants: {
				disabled: {
					false: [!flat && 'es:shadow-xs es:shadow-black/5', 'es:cursor-pointer'],
				},
			},
			compoundVariants: [
				{
					checked: false,
					disabled: false,
					class: [
						'es:inset-ring-secondary-400 es:bg-white es:bg-linear-to-r es:from-secondary-950/1 es:to-secondary-950/4',
						'es:hover:bg-surface-100',
						'es:group-hover:inset-ring-surface-400',
					],
				},
				{
					checked: true,
					disabled: false,
					class: [
						'es:bg-accent-600',
						'es:bg-linear-to-r es:from-accent-900/0 es:to-accent-900/50',
						'es:inset-ring-accent-700/35',
						'es:inset-shadow-xs es:inset-shadow-accent-50/20',
						'es:group-focus-visible:inset-ring-accent-900',
					],
				},
				{
					checked: false,
					disabled: true,
					class: ['es:inset-ring-secondary-300 es:bg-white'],
				},
				{
					checked: true,
					disabled: true,
					class: ['es:inset-ring-secondary-300 es:bg-secondary-300'],
				},
			],
			defaultVariants: {
				disabled: false,
				checked: false,
			},
		},
	);

	const thumbClasses = cva(
		['es:block es:size-4 es:rounded-full es:will-change-transform', 'es:shrink-0', 'es:no-webkit-highlight', 'es:transition es:ease-spring-bouncy es:duration-400'],
		{
			variants: {
				disabled: {
					false: [!flat && 'es:shadow-xs es:shadow-black/5'],
				},
				checked: {
					false: 'es:not-pressed:scale-90',
					true: 'es:scale-110',
				},
			},
			compoundVariants: [
				{
					checked: true,
					indeterminate: false,
					class: 'es:translate-x-4',
				},
				{
					checked: false,
					indeterminate: true,
					class: 'es:translate-x-2 es:scale-100',
				},
				{
					checked: false,
					disabled: false,
					class: ['es:bg-secondary-500', 'es:group-hover:bg-surface-500'],
				},
				{
					checked: true,
					disabled: false,
					class: ['es:bg-accent-50', 'es:bg-linear-to-br es:from-white/10 es:to-white/30', 'es:shadow-xs es:shadow-accent-950/20'],
				},
				{
					checked: false,
					disabled: true,
					class: ['es:bg-secondary-400'],
				},
				{
					checked: true,
					disabled: true,
					class: ['es:bg-white'],
				},
			],
			defaultVariants: {
				disabled: false,
				checked: false,
			},
		},
	);

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaSwitch
			id={id}
			isDisabled={disabled}
			isSelected={checked ?? false}
			onChange={onChange}
			className='es:group es:flex es:items-center es:justify-between es:gap-2.5 es:any-focus:outline-hidden'
			{...rest}
		>
			{children}

			<div
				className={outsideClasses({
					checked: checked ?? false,
					disabled: Boolean(disabled),
				})}
			>
				<div
					className={thumbClasses({
						checked: checked ?? false,
						disabled: Boolean(disabled),
						indeterminate: Boolean(isIndeterminate),
					})}
				/>
			</div>
		</ReactAriaSwitch>
	);
};
