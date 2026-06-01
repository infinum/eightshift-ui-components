import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { file } from '../../icons/internal';
import type { Prettify } from '../../utilities/types';
import { truncateMiddle } from '../../utilities';
import { SmartImage } from '../smart-image/smart-image';

type ShellType = 'image' | 'file';

type SmartImageClassNameContext = {
	hasAnalysed?: boolean;
	isTransparent?: boolean;
	transparencyInfo?: {
		left?: boolean;
		right?: boolean;
		top?: boolean;
		bottom?: boolean;
	};
	isDark?: boolean;
	hasError?: boolean;
};

type SmartImageChildContext = {
	image?: ReactNode;
	dominantColors?: Array<{ color?: string; isDark?: boolean; saturation?: number }>;
	isDark?: boolean;
	hasAnalysed?: boolean;
	isTransparent?: boolean;
	hasError?: boolean;
	errorBadge?: ReactNode;
};

type FilePickerShellProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
	/** Current file URL. */
	url?: string;
	/** File type icon override. Defaults to `'file'`. */
	type?: ShellType;
	/** Icon to display within the button. Defaults to `file`. */
	icon?: ReactNode;
	/** Classes to pass to the component. */
	className?: string;
	children?: ReactNode | ((context: { dominantColors?: SmartImageChildContext['dominantColors']; isDark?: boolean; isTransparent?: boolean; hasError?: boolean }) => ReactNode);
	/** Content to display if no file is selected. */
	noUrlContent?: ReactNode;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

const TypedSmartImage = SmartImage as unknown as (props: {
	src?: string;
	alt?: string;
	className?: (context: SmartImageClassNameContext) => string;
	children?: (context: SmartImageChildContext) => ReactNode;
}) => ReactNode;

/**
 * A shell for a file picker UI, handling both rich visual presentation and simple file placeholders.
 *
 * @component
 * @param {FilePickerShellProps} props - Component props.
 *
 * @returns {JSX.Element} The FilePickerShell component.
 *
 * @example
 * <FilePickerShell
 * 	className='es:w-full'
 * 	url='myfile.json'
 * 	noUrlContent={<Button size='large'>Upload</Button>}
 * >
 * 	<Button flat>Replace</Button>
 * 	<Button flat>Remove</Button>
 * </FilePickerShell>
 *
 * @example
 * <FilePickerShell
 * 	className='es:w-full'
 * 	url='https://picsum.photos/300/200'
 * 	noUrlContent={<Button size='large'>Upload</Button>}
 * 	type='image'
 * >
 * 	<Button type='glass'>Replace</Button>
 * 	<Button type='glass'>Remove</Button>
 * </FilePickerShell>
 */
export const FilePickerShell = (props: Prettify<FilePickerShellProps>) => {
	const { url, type = 'file', icon = file, children, className, noUrlContent, hidden, ...rest } = props;

	if (hidden) {
		return null;
	}

	if (!url) {
		return noUrlContent ? <div className={clsx('es:grid es:auto-cols-fr es:grid-flow-col es:gap-2 es:p-px es:w-full')}>{noUrlContent}</div> : null;
	}

	if (type !== 'image') {
		return (
			<div
				{...rest}
				className={clsx(
					'es:border es:border-surface-200 es:bg-surface-50 es:flex es:justify-between es:rounded-2xl es:isolate es:relative es:flex-col es:gap-2 es:overflow-clip es:group es:p-2',
					className,
				)}
			>
				{type === 'file' ? (
					<div className='es:grow es:flex es:flex-col es:gap-2 es:text-sm es:items-center-safe es:justify-center es:font-mono es:icon:size-6 es:rounded-xl es:bg-white/50 es:inset-ring es:inset-ring-surface-100 es:icon:text-surface-500 es:text-surface-700 es:px-2 es:py-4'>
						{icon}
						<span className='es:line-clamp-1'>{truncateMiddle(url, 34)}</span>
					</div>
				) : null}

				{children && typeof children !== 'function' ? <div className='es:flex es:items-center-safe es:gap-0.75 es-button-group-h'>{children}</div> : null}
			</div>
		);
	}

	return (
		<TypedSmartImage
			src={url}
			alt=''
			className={({ hasAnalysed, isTransparent, transparencyInfo, isDark, hasError }) =>
				clsx(
					hasAnalysed && isTransparent && url && 'es:p-4',
					hasAnalysed && isTransparent && isDark && 'es:object-contain es:mx-auto',
					hasAnalysed && isTransparent && !isDark && 'es:object-contain es:mx-auto',
					hasAnalysed && isTransparent && (transparencyInfo?.left || transparencyInfo?.right) && 'es:w-full!',
					hasAnalysed && isTransparent && (transparencyInfo?.top || transparencyInfo?.bottom) && 'es:h-full!',
					hasAnalysed && !isTransparent && 'es:w-full! es:aspect-3-2 es:object-cover',
					hasAnalysed && 'es:grow es:rounded-xl es:h-fill!',
					hasError && 'es:rounded-xl',
				)
			}
		>
			{({ image, dominantColors, isDark, hasAnalysed, isTransparent, hasError, errorBadge }) => {
				const dominantDisplayColor = dominantColors?.find((color) => (color.saturation ?? 0) > 0.25) || dominantColors?.[0];

				return (
					<div
						className={clsx(
							'es:border es:justify-between es:rounded-2xl es:isolate es:relative es:flex-col es:gap-y-2 es:grid es:grid-cols-1 es:overflow-clip es:aspect-3-2 es:transition',
							!hasError && hasAnalysed ? 'es:border-secondary-200' : 'es:border-secondary-200/0',
							!hasError && hasAnalysed && !isTransparent && 'es:group es:grid-rows-1',
							((hasAnalysed && isTransparent) || hasError) && 'es:p-2 es:grid-rows-[minmax(0,1fr)_auto] es:h-fit',
							!hasError && !hasAnalysed && 'es:shimmer-dark es:bg-surface-100',
							hasError && 'es:bg-surface-50 es:border-surface-100',
							className,
						)}
						style={
							!hasError && hasAnalysed && isTransparent
								? {
										backgroundColor: `color-mix(in srgb, ${dominantDisplayColor?.color || '#ffffff'} ${dominantDisplayColor?.isDark ? 5 : 25}%, ${dominantDisplayColor?.isDark ? '#ffffff' : '#000000'})`,
									}
								: {}
						}
					>
						{!hasError ? image : null}

						{hasError ? errorBadge : null}

						{children ? (
							<div
								className={clsx(
									'es:flex es:items-center-safe es:gap-0.75',
									'es-button-group-h',
									!hasError &&
										!isTransparent &&
										'es:absolute es:bottom-2 es:left-2 es:right-2 es:translate-y-[125%] es:group-hover:translate-y-0 es:has-aria-expanded:translate-y-0 es:has-focus-visible:translate-y-0 es:transition-transform es:ease-spring-smooth',
								)}
							>
								{typeof children === 'function' ? children({ dominantColors, isDark, isTransparent, hasError }) : children}
							</div>
						) : null}
					</div>
				);
			}}
		</TypedSmartImage>
	);
};
