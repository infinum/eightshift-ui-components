import { classnames } from '../../utilities/classnames';

export const Spacer = (props) => {
	const { size, border, className, text, icon, vertical = false } = props;

	const spaceClass = classnames(
		vertical ? 'h-full' : 'w-full',
		!vertical && border && size === 's' && 'h-1',
		!vertical && !border && size === 's' && 'h-2.5',
		!vertical && border && size === 'm' && 'h-2',
		!vertical && !border && size === 'm' && 'h-5',
		vertical && border && size === 's' && 'w-1',
		vertical && !border && size === 's' && 'w-2.5',
		vertical && border && size === 'm' && 'w-2',
		vertical && !border && size === 'm' && 'w-5',
		className,
	);

	if (text || icon) {
		return (
			<div className={classnames('flex items-center gap-1.5', className)}>
				{icon && (
					<span className='shrink-0 rounded bg-gray-500 p-0.5 text-gray-50 shadow-sm [&>svg]:size-5.5'>
						{icon}
					</span>
				)}
				{text && <span className='shrink-0 text-balance text-sm text-gray-500'>{text}</span>}
				{border && <div className='h-px w-full bg-gray-300' />}
			</div>
		);
	}

	if (border) {
		return (
			<div>
				<div className={spaceClass} />
				<div className={classnames('bg-gray-300', vertical ? 'h-full w-px' : 'h-px w-full')} />
				<div className={spaceClass} />
			</div>
		);
	}

	return <div className={spaceClass} />;
};
