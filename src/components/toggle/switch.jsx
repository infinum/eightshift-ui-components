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
			<div className='shrink-0 pressed:border-black cursor-pointer pressed:focus-visible:border-teal-600 no-webkit-highlight h-4 w-7 rounded-full border border-gray-500 bg-white p-[0.1875rem] shadow-sm outline-none transition group-focus-visible:border-teal-600 group-focus-visible:ring group-focus-visible:ring-teal-600 group-focus-visible:ring-opacity-25 group-disabled:cursor-default group-disabled:border-gray-300 group-disabled:bg-white'>
				<span className='group-selected:translate-x-3 group-selected:border-black group-selected:bg-black block size-2 rounded-full border border-gray-500 bg-gray-50 transition will-change-transform group-disabled:border-gray-300 group-disabled:bg-white'></span>
			</div>
		</ReactAriaSwitch>
	);
};
