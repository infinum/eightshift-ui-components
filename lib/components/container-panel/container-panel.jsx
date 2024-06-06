import { clsx } from 'clsx/lite';


/**
 * Component that provides a container panel for options, with an optional title.
 * Best used within the Gutenberg sidebar, instead of the default `PanelBody` component.
 * Ensures that the content is spaced nicely.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the container.
 * @param {string} [props.title] - Title to display on the top of the panel.
 *
 * @returns {JSX.Element} The ContainerPanel component.
 *
 * @example
 * <ContainerPanel title='Paragraph'>
 * 	...
 * </ContainerPanel>
 *
 * @preserve
 */
export const ContainerPanel = ({ children, className, title }) => {
	return (
		<div
			className={clsx(
				'es-uic-space-y-2.5 es-uic-border-t es-uic-border-t-gray-200 es-uic-p-4 es-uic-pt-3',
				className,
			)}
		>
			{title && (
				<span className='es-uic-select-none es-uic-text-[0.8125rem] es-uic-font-medium es-uic-text-gray-500'>
					{title}
				</span>
			)}
			{children}
		</div>
	);
};
