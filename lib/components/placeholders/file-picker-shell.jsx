import clsx from 'clsx/lite';
import { icons } from '../../icons';
import { truncateMiddle } from '../../utilities';

/**
 * A shell for a file picker UI, handling both rich visual presentation (e.g. images) and simple file placeholders.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.url] - Current file URL.
 * @param {string} [props.fileName] - Current file name.
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
 *     url='#'
 *     noUrlContent={<Button size='large'>Upload</Button>}
 *     fileName='myfile.json'
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
		fileName,
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

	const fullSizeVisual = type === 'image';

	return (
		<div
			className={clsx(
				url && 'es:border es:border-secondary-300 es:bg-white es:flex es:justify-between es:rounded-2xl es:isolate es:relative es:flex-col es:gap-2 es:overflow-clip',
				fullSizeVisual && url && 'es:aspect-3-2 es:group',
				!fullSizeVisual && url && 'es:p-2 es:aspect-cinema',
				className,
			)}
		>
			{type === 'image' && url && (
				<img
					src={url}
					alt=''
					className='es:size-full es:grow es:rounded-xl'
				/>
			)}

			{type === 'file' && url && (
				<div className='es:grow es:flex es:flex-col es:gap-2 es:text-sm es:items-center-safe es:justify-center-safe es:font-mono es:icon:size-6 es:rounded-xl es:bg-secondary-50 es:inset-ring es:inset-ring-secondary-100 es:icon:text-secondary-500'>
					{icon}
					<span className='es:line-clamp-1'>{truncateMiddle(fileName, 34)}</span>
				</div>
			)}

			{url && children && (
				<div
					className={clsx(
						'es:grid es:auto-cols-fr es:grid-flow-col es:gap-2',
						fullSizeVisual &&
							'es:absolute es:bottom-2 es:left-2 es:right-2 es:translate-y-[125%] es:group-hover:translate-y-0 es:focus-within:translate-y-0 es:transition-transform es:ease-spring-smooth',
					)}
				>
					{children}
				</div>
			)}
			{!url && noUrlContent && <div className={clsx('es:grid es:auto-cols-fr es:grid-flow-col es:gap-2 es:p-px es:w-full')}>{noUrlContent}</div>}
		</div>
	);
};
