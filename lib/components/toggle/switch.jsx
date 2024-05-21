import { Switch as ReactAriaSwitch } from 'react-aria-components';

export const Switch = (props) => {
	const { checked, onChange, disabled, id, children } = props;

	return (
		<ReactAriaSwitch
			id={id}
			isDisabled={disabled}
			isSelected={checked}
			onChange={onChange}
			className='group flex items-center justify-between gap-2'
		>
			{children}
			<div className='no-webkit-highlight h-4 w-7 shrink-0 cursor-pointer rounded-full border border-gray-500 bg-white p-[0.1875rem] shadow-sm outline-none transition group-focus-visible:ring group-focus-visible:ring-teal-500 group-focus-visible:ring-opacity-50 group-selected:border-teal-800/75 group-selected:shadow-teal-500/25 group-selected:bg-teal-100/25 group-disabled:cursor-default group-disabled:border-gray-300 group-disabled:bg-white'>
				<span className='block size-2 rounded-full border border-gray-500 bg-gray-500 transition will-change-transform group-selected:translate-x-3 group-selected:scale-125 group-selected:border-teal-600 group-selected:bg-teal-600 group-disabled:border-gray-300 group-disabled:bg-white' />
			</div>
		</ReactAriaSwitch>
	);
};
