import clsx from 'clsx/lite';
import { icons } from '../../icons';
import { truncateMiddle } from '../../utilities';
import { SmartImage } from '../smart-image/smart-image';
import { cloneElement } from 'react';

/**
 * A shell for a file picker UI, handling both rich visual presentation (e.g. images) and simple file placeholders.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.url] - Current file URL.
 * @param {ShellType} [props.type='file'] - File type icon override.
 * @param {JSX.Element} [props.icon] - Icon to display within the button.
 * @param {string} [props.className] - Classes to pass to the component.
 * @param {JSX.Element|JSX.Element[]} [props.noUrlContent] - Content to display if no file is selected.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @typedef {'image' | 'file'} ShellType
 *
 * @returns {JSX.Element} The FilePickerShell component.
 *
 * @example
 * <FilePickerShell
 *     className='es:w-full'
 *     url='myfile.json'
 *     noUrlContent={<Button size='large'>Upload</Button>}
 * >
 *     <Button flat>Replace</Button>
 *     <Button flat>Remove</Button>
 * </FilePickerShell>
 *
 * @example
 * <FilePickerShell
 *     className='es:w-full'
 *     url='https://picsum.photos/300/200'
 *     noUrlContent={<Button size='large'>Upload</Button>}
 *     type='image'
 * >
 *     <Button type='glass'>Replace</Button>
 *     <Button type='glass'>Remove</Button>
 * </FilePickerShell>
 *
 * @preserve
 */
export const FilePickerShell = (props) => {
	const {
		url,
		type = 'file',

		icon = icons.file,

		children,
		className,
		noUrlContent,

		hidden,
	} = props;

	if (hidden) {
		return null;
	}

	if (!url) {
		return noUrlContent && <div className={clsx('es:grid es:auto-cols-fr es:grid-flow-col es:gap-2 es:p-px es:w-full')}>{noUrlContent}</div>;
	}

	if (type !== 'image') {
		return (
			<div
				className={clsx(
					'es:border es:border-secondary-200 es:bg-white es:flex es:justify-between es:rounded-2xl es:isolate es:relative es:flex-col es:gap-2 es:overflow-clip es:aspect-3-2 es:group es:p-2',
					className,
				)}
			>
				{type === 'file' && (
					<div className='es:grow es:flex es:flex-col es:gap-2 es:text-sm es:items-center-safe es:justify-center-safe es:font-mono es:icon:size-6 es:rounded-xl es:bg-secondary-50 es:inset-ring es:inset-ring-secondary-100 es:icon:text-secondary-500'>
						{icon}
						<span className='es:line-clamp-1'>{truncateMiddle(url, 34)}</span>
					</div>
				)}

				{children && <div className='es:flex es:items-center-safe es:gap-2'>{children}</div>}
			</div>
		);
	}

	return (
		<SmartImage
			src={url}
			alt=''
			className={({ hasAnalysed, isTransparent, transparencyInfo }) =>
				clsx(
					hasAnalysed && transparencyInfo?.left && url && 'es:pl-3',
					hasAnalysed && transparencyInfo?.right && url && 'es:pr-3',
					hasAnalysed && transparencyInfo?.top && url && 'es:pt-3',
					hasAnalysed && transparencyInfo?.bottom && url && 'es:pb-3',
					hasAnalysed && isTransparent && 'es:bg-white/60 es:object-contain es:mx-auto',
					hasAnalysed && isTransparent && (transparencyInfo?.left || transparencyInfo?.right) && 'es:w-full',
					hasAnalysed && isTransparent && (transparencyInfo?.top || transparencyInfo?.bottom) && 'es:h-full',
					hasAnalysed && !isTransparent && 'es:w-full es:aspect-3-2 es:object-cover',
					hasAnalysed && 'es:grow es:rounded-xl',
				)
			}
			errorClassName='es:aspect-3-2 es:rounded-2xl es:bg-gradient-to-br es:from-secondary-50 es:to-secondary-100 es:border es:border-secondary-200'
			imageAnalysisSettings={{ yFrom: 0.25, yTo: 0.75 }}
		>
			{({ image, dominantColors, isDark, hasAnalysed, isTransparent }) => (
				<div
					className={clsx(
						'es:border es:border-secondary-200 es:justify-between es:rounded-2xl es:isolate es:relative es:flex-col es:gap-y-2 es:grid es:grid-cols-1 es:overflow-clip es:aspect-3-2 es:transition',
						hasAnalysed && !isTransparent && 'es:group es:grid-rows-1',
						hasAnalysed && isTransparent && 'es:p-2 es:grid-rows-[minmax(0,_1fr)_auto] es:h-fit',
						className,
					)}
					style={
						hasAnalysed && isTransparent ? { backgroundColor: `color-mix(in srgb, ${dominantColors[0]?.color || '#ffffff'} ${dominantColors[0]?.isDark ? 10 : 80}%, #ffffff)` } : {}
					}
				>
					{image}

					{!hasAnalysed && cloneElement(icons.loader, { className: 'es:animate-spin es:size-8 es:text-accent-600 es:m-auto es:duration-3000' })}

					{hasAnalysed && children && (
						<div
							className={clsx(
								'es:flex es:items-center-safe es:gap-2',
								!isTransparent &&
									'es:absolute es:bottom-2 es:left-2 es:right-2 es:translate-y-[125%] es:group-hover:translate-y-0 es:has-aria-expanded:translate-y-0 es:has-focus-visible:translate-y-0 es:transition-transform es:ease-spring-smooth',
							)}
						>
							{typeof children === 'function' ? children({ dominantColors, isDark, isTransparent }) : children}
						</div>
					)}
				</div>
			)}
		</SmartImage>
	);
};
