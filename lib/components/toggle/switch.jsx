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
	const { checked, onChange, disabled, id, children, className } = props;

	return (
		<ReactAriaSwitch
			id={id}
			isDisabled={disabled}
			isSelected={checked ?? false}
			onChange={onChange}
			className='es-uic-group es-uic-flex es-uic-items-center es-uic-justify-between es-uic-gap-2'
		>
			{children}
			<div className={clsx('es-uic-flex es-uic-items-center es-uic-min-w-9 es-uic-justify-center', className)}>
				<div
					className={clsx(
						'es-uic-no-webkit-highlight es-uic-h-4 es-uic-w-7 es-uic-shrink-0 es-uic-cursor-pointer es-uic-rounded-full es-uic-border es-uic-border-gray-500 es-uic-bg-white es-uic-p-[0.1875rem] es-uic-shadow-sm es-uic-outline-none es-uic-transition',
						'group-focus-visible:es-uic-ring group-focus-visible:es-uic-ring-teal-500 group-focus-visible:es-uic-ring-opacity-50',
						'group-selected:es-uic-border-teal-800/75 group-selected:es-uic-bg-teal-100/25 group-selected:es-uic-shadow-teal-500/25',
						'group-disabled:es-uic-cursor-default group-disabled:es-uic-border-gray-300 group-disabled:es-uic-bg-white',
					)}
				>
					<span
						className={clsx(
							'es-uic-block es-uic-size-2 es-uic-rounded-full es-uic-border es-uic-border-gray-500 es-uic-bg-gray-500 es-uic-transition es-uic-will-change-transform',
							'group-selected:es-uic-translate-x-3 group-selected:es-uic-scale-125 group-selected:es-uic-border-teal-600 group-selected:es-uic-bg-teal-600',
							'group-disabled:es-uic-border-gray-300 group-disabled:es-uic-bg-white',
						)}
					/>
				</div>
			</div>
		</ReactAriaSwitch>
	);
};
