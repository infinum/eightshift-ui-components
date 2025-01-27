import { Switch as ReactAriaSwitch } from 'react-aria-components';
import { clsx } from 'clsx/lite';

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
	const { checked, onChange, disabled, id, children, className, isIndeterminate, hidden } = props;

	if (hidden) {
		return null;
	}

	return (
		<ReactAriaSwitch
			id={id}
			isDisabled={disabled}
			isSelected={checked ?? false}
			onChange={onChange}
			className='es:group es:flex es:items-center es:justify-between es:gap-2'
		>
			{children}
			<div className={clsx('es:flex es:shrink-0 es:items-center es:justify-center', className)}>
				<div
					className={clsx(
						'es:shrink-0 es:cursor-pointer es:no-webkit-highlight',
						'es:h-5 es:w-9 es:p-[0.1875rem] es:rounded-full',
						'es:outline-hidden es:bg-radial-[circle_at_75%_50%]',
						'es:border es:inset-ring es:inset-shadow-xs',
						'es:transition',
						'es:group-focus-visible:ring-2 es:group-focus-visible:ring-accent-500/50 es:focus-visible:ring-3 es:shadow-xs',
						!checked && 'es:border-secondary-400 es:inset-ring-secondary-100 es:from-white es:to-secondary-100',
						checked && 'es:border-accent-700/75 es:inset-ring-accent-500 es:to-accent-500 es:from-accent-600 es:shadow-accent-600/30',
						disabled && 'es:cursor-default es:border-secondary-300 es:bg-white',
					)}
				>
					<span
						className={clsx(
							'es:block es:size-3 es:rounded-full es:border es:will-change-transform es:bg-radial',
							'es:transition es:motion-ease-spring-snappy es:ease-[var(--motion-spring-snappy)]',
							!checked && 'es:border-secondary-500 es:from-secondary-500 es:to-secondary-600 es:scale-95',
							checked && 'es:translate-x-4 es:border-accent-600/20 es:from-white es:to-accent-500/30 es:from-40% es:bg-white es:shadow-xs es:shadow-accent-900/60',
							disabled && 'es:border-secondary-300 es:bg-white',
							isIndeterminate && 'es:translate-x-2 es:scale-100',
						)}
					/>
				</div>
			</div>
		</ReactAriaSwitch>
	);
};
