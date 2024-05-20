import { cloneElement, useState } from 'react';
import { Group, Input, Label, NumberField, Text } from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../icons/icons';
import { classnames } from '../../utilities/classnames';
import { BaseControl } from '../base-control/base-control';

export const NumberPicker = ({
	value,
	onChange,
	min = 0,
	max,
	step = 1,
	label,
	icon,
	subtitle,
	help,
	readOnly,
	disabled,
	placeholder,
	prefix,
	fixedWidth = null,
	suffix,
	children,
	inline,
	noScrollToChange = false,
	...props
}) => {
	const [isInputFocused, setIsInputFocused] = useState(false);

	return (
		<NumberField
			value={value}
			onChange={onChange}
			isDisabled={disabled}
			isReadOnly={readOnly}
			minValue={min}
			maxValue={max}
			step={step}
			isWheelDisabled={noScrollToChange}
			{...props}
		>
			<BaseControl
				labelAs={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				help={help && <Text slot='description'>{help}</Text>}
				inline={inline}
				className='text-sm'
			>
				<Group
					className={classnames(
						'@container-[block-size] flex min-h-10 w-fit items-center rounded-md border border-gray-300 pl-1 pr-0.5 shadow transition',
						isInputFocused && 'border-teal-600 outline-none ring ring-teal-600 ring-opacity-25',
						!prefix && 'pl-2',
					)}
				>
					{prefix && (
						<span
							slot='prefix'
							className='col-start-1 row-span-2 mr-0.5 select-none self-center text-gray-500'
						>
							{prefix}
						</span>
					)}
					<Input
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
						className='col-start-2 row-span-2 bg-transparent py-1 tabular-nums focus:outline-none'
						placeholder={placeholder}
						style={{
							width: fixedWidth
								? `${fixedWidth}ch`
								: `calc(${min < 0 ? '0.75ch + ' : ''}${(max ?? 1000)?.toString()?.length} * 1ch)`,
						}}
					/>
					{suffix && (
						<span
							slot='suffix'
							className='col-start-3 row-span-2 select-none self-center text-gray-500'
						>
							{suffix}
						</span>
					)}
					<div>
						<Button
							type='ghost'
							className='col-start-4 !h-3 !w-5 !rounded !text-gray-500 disabled:!text-gray-300 [&>svg]:size-[0.8rem]'
							slot='increment'
							icon={icons.caretUpFill}
						/>
						<Button
							type='ghost'
							className='col-start-4 !h-3 !w-5 !rounded !text-gray-500 disabled:!text-gray-300 [&>svg]:size-[0.8rem]'
							slot='decrement'
							icon={icons.caretDownFill}
						/>
					</div>

					{children && (
						<>
							<div className='h-[2.375rem] w-px bg-gray-300' />
							<div className='pl-1 pr-0.5'>
								{Array.isArray(children)
									? children.map((child) => cloneElement(child, { slot: null }))
									: cloneElement(children, { slot: null })}
							</div>
						</>
					)}
				</Group>
			</BaseControl>
		</NumberField>
	);
};
