import { Tabs as ReactAriaTabs, TabList as ReactAriaTabList, Tab as ReactAriaTab, TabPanel as ReactAriaTabPanel } from 'react-aria-components';
import { __, sprintf } from '@wordpress/i18n';
import { clsx } from 'clsx/lite';
import { cloneElement, useId, isValidElement } from 'react';
import { cva } from 'class-variance-authority';
import { Notice } from '../notice/notice';
import { RichLabel } from '../rich-label/rich-label';

/**
 * Main tab container.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.vertical=false] - Whether the tabs are vertical.
 * @param {string} [props.className] - Classes to pass to the tabs container.
 * @param {TabsType} [props.type='underline'] - Design of the tabs.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Tabs component.
 *
 * @typedef {'underline' | 'pill' | 'pillInverse' | 'pillCompact' | 'pillCompactInverse'} TabsType
 *
 * @example
 * <Tabs>
 * 	<TabList>
 * 		<Tab>Tab 1</Tab>
 * 		<Tab>Tab 2</Tab>
 * 	</TabList>
 * 	<TabPanel>Content 1</TabPanel>
 * 	<TabPanel>Content 2</TabPanel>
 * </Tabs>
 *
 * @preserve
 */
export const Tabs = (props) => {
	const { children, vertical, className, hidden, type = 'underline', ...rest } = props;

	const baseId = useId();

	if (hidden) {
		return null;
	}

	let tabPanelCounter = 1;
	let tabCounter = 1;

	const preparedChildren = Array.isArray(children) ? children : [children];

	const childrenWithIds = preparedChildren.reduce((acc, child, index) => {
		if (child.type.displayName === 'TabList') {
			const childItems = Array.isArray(child?.props?.children) ? child?.props?.children : [child?.props?.children].filter(Boolean);

			tabCounter = (childItems?.length ?? 0) + 1;

			if (childItems.length < 1) {
				return acc;
			}

			return [
				...acc,
				cloneElement(
					child,
					{
						key: index,
						type: type,
					},
					childItems?.map((innerChild, i) =>
						cloneElement(innerChild, {
							id: `tab-${baseId}-${i + 1}`,
							key: i,
							isParentVertical: vertical,
							type: type,
						}),
					),
				),
			];
		}

		if (child.type.displayName === 'TabPanel') {
			return [
				...acc,
				cloneElement(child, {
					id: `tab-${baseId}-${tabPanelCounter++}`,
					key: index,
					className: clsx(child.props.className, vertical && 'es:pl-3'),
				}),
			];
		}

		return acc;
	}, []);

	if (tabCounter !== tabPanelCounter) {
		return (
			<Notice
				type='error'
				label={__('Component is not configured correctly. Skipping render to prevent errors.', 'eightshift-ui-components')}
				subtitle={sprintf(
					__('Number of <Tab>s (%s) and <TabPanel>s (%s) should be the same. <Tab>s should be within a <TabList>.', 'eightshift-ui-components'),
					tabCounter - 1,
					tabPanelCounter - 1,
				)}
				alignIconToTitle
			/>
		);
	}

	return (
		<ReactAriaTabs
			{...rest}
			orientation={vertical ? 'vertical' : 'horizontal'}
			className={clsx(vertical ? 'es:grid es:size-full es:min-h-40 es:grid-cols-[minmax(0,15rem)_2fr] es:gap-4' : 'es:flex-col', className)}
		>
			{childrenWithIds}
		</ReactAriaTabs>
	);
};

Tabs.displayName = 'Tabs';

/**
 * Container for tabs within the Tabs component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the tab list.
 *
 * @returns {JSX.Element} The TabList component.
 *
 * @see {@link Tabs} for usage example.
 *
 * @preserve
 */
export const TabList = (props) => {
	const { children, 'aria-label': ariaLabel, className, type, ...other } = props;

	return (
		<ReactAriaTabList
			aria-label={ariaLabel ?? __('tabs', 'eightshift-ui-components')}
			className={({ orientation }) => {
				const horizontal = orientation === 'horizontal';
				const vertical = orientation === 'vertical';

				return clsx(
					'es:flex es:p-0.5 es:-m-0.5',
					vertical && 'es:h-full es:flex-col es:gap-1.5 es:pr-1.5 es:overflow-y-auto es:overflow-x-visible',
					horizontal && 'es:w-full es:items-stretch es:gap-1.5 es:overflow-x-auto es:overflow-y-visible es:mb-3',
					horizontal &&
						type === 'underline' &&
						'es:relative es:isolate es:after:content-[""] es:after:-z-10 es:after:absolute es:after:bottom-0.5 es:after:left-0 es:after:w-full es:after:h-px es:after:bg-secondary-300',
					className,
				);
			}}
			{...other}
		>
			{children}
		</ReactAriaTabList>
	);
};

TabList.displayName = 'TabList';

/**
 * A tab within the TabList component, in the Tabs component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.disabled] - Whether the tab is disabled.
 * @param {string} [props.className] - Classes to pass to the tab.
 * @param {JSX.Element} [props.icon] - Icon to show on the tab.
 * @param {string|JSX.Element} [props.badge] - Badge to render besides the label.
 * @param {string} [props.label] - Tab label. **Note**: overrides inner items!
 * @param {string} [props.subtitle] - Tab subtitle. **Note**: overrides inner items!
 *
 * @returns {JSX.Element} The Tab component.
 *
 * @see {@link Tabs} for usage example.
 *
 * @preserve
 */
export const Tab = (props) => {
	const { children, disabled, isParentVertical, className, icon, label, subtitle, type, badge, ...other } = props;

	const componentClasses = cva(
		[
			'es:group es:flex es:items-center es:gap-1.5 es:relative es:shrink-0',
			'es:select-none es:text-sm es:transition es:not-disabled:cursor-pointer',
			'es:any-focus:outline-hidden es:focus-visible:ring-2 es:focus-visible:ring-accent-500/50',
			!(type === 'pillCompact' || type === 'pillCompactInverse') && 'es:min-h-9.5',
			isParentVertical && (type === 'pillCompact' || type === 'pillCompactInverse') && 'es:min-h-8',
			className,
		],
		{
			variants: {
				type: {
					underline: 'es:disabled:text-secondary-400 es:selected:text-accent-950',
					pill: 'es:font-[450] es:border es:border-transparent es:px-3 es:py-2 es:rounded-lg es:not-disabled:not-selected:hover:text-secondary-900 es:not-disabled:not-selected:hover:bg-secondary-100 es:text-secondary-500 es:selected:text-accent-900 es:selected:bg-accent-400/15 es:has-icon:pl-2.5 es:focus-visible:border-accent-500 es:disabled:text-secondary-400/75',
					pillInverse:
						'es:font-[450] es:border es:border-transparent es:px-3 es:py-2 es:rounded-lg es:not-disabled:not-selected:hover:text-secondary-900 es:not-disabled:not-selected:hover:bg-secondary-100 es:text-secondary-500 es:selected:text-white es:selected:bg-accent-600 es:has-icon:pl-2.5 es:focus-visible:border-accent-500 es:disabled:text-secondary-400/75',
					pillCompact:
						'es:icon:size-4 es:font-[450] es:border es:border-transparent es:px-1.5 es:py-1 es:rounded-lg es:not-disabled:not-selected:hover:text-secondary-900 es:not-disabled:not-selected:hover:bg-secondary-100 es:text-secondary-500 es:selected:text-accent-900 es:selected:bg-accent-400/15 es:has-icon:pl-1 es:focus-visible:border-accent-500 es:disabled:text-secondary-400/75',
					pillCompactInverse:
						'es:icon:size-4 es:font-[450] es:border es:border-transparent es:px-1.5 es:py-1 es:rounded-lg es:not-disabled:not-selected:hover:text-secondary-900 es:not-disabled:not-selected:hover:bg-secondary-100 es:text-secondary-500 es:selected:text-white es:selected:bg-accent-600 es:has-icon:pl-1 es:focus-visible:border-accent-500 es:disabled:text-secondary-400/75',
				},
			},
			compoundVariants: [
				{
					vertical: false,
					type: 'underline',
					class: [
						'es:px-2 es:py-2.5 es:rounded-lg',
						'es:after:content-[""] es:after:absolute es:after:bottom-px es:after:left-0 es:after:right-0 es:after:w-5/6 es:after:mx-auto es:after:h-0.75',
						'es:after:bg-linear-to-b es:hover:not-selected:not-disabled:after:from-secondary-200 es:hover:not-selected:not-disabled:after:to-secondary-300 es:selected:after:from-accent-500 es:selected:after:to-accent-600',
						'es:after:rounded-t-full es:selected:after:shadow-xs es:selected:after:shadow-accent-700/30 es:after:transition',
					],
				},
				{
					vertical: true,
					type: 'underline',
					class: [
						'es:pl-3 es:pr-2 es:py-2.5 es:rounded-lg es:selected:bg-accent-50/50 es:selected:text-accent-950 es:transition',
						'es:after:content-[""] es:after:absolute es:after:-left-0 es:after:top-0 es:after:bottom-0 es:after:h-5/6 es:after:my-auto es:after:w-1',
						'es:after:bg-linear-to-r es:hover:not-selected:not-disabled:after:from-secondary-200 es:hover:not-selected:not-disabled:after:to-secondary-300 es:selected:after:from-accent-500 es:selected:after:to-accent-600',
						'es:after:rounded-full es:selected:after:shadow-xs es:selected:after:shadow-accent-700/30 es:after:transition',
					],
				},
			],
		},
	);

	return (
		<ReactAriaTab
			{...other}
			isDisabled={disabled}
			className={componentClasses({ vertical: Boolean(isParentVertical), type: type })}
		>
			{(icon || subtitle) && (
				<RichLabel
					icon={icon}
					label={label ?? children}
					subtitle={subtitle}
					noColor
					iconClassName={clsx((type === 'pillCompact' || type === 'pillCompactInverse') && 'es:icon:size-4!')}
				/>
			)}

			{!(icon || subtitle) && (label ?? children)}

			{badge && !isValidElement(badge) && (
				<span
					className={clsx(
						'es:transition-colors es:px-1.5 es:py-1 es:leading-none es:rounded-md es:text-xs es:font-medium',
						type === 'underline' &&
							'es:inset-ring es:inset-ring-secondary-200/20 es:bg-secondary-100 es:group-selected:bg-accent-500/10 es:group-selected:text-accent-900 es:group-selected:inset-ring-accent-500/10',
						type === 'pill' && 'es:bg-secondary-100 es:group-selected:bg-accent-600 es:group-selected:text-white',
						type === 'pillInverse' && 'es:bg-secondary-100 es:group-selected:bg-accent-50 es:group-selected:text-accent-900',
						type === 'pillCompact' && 'es:bg-secondary-100 es:group-selected:bg-accent-600 es:group-selected:text-white',
						type === 'pillCompactInverse' && 'es:bg-secondary-100 es:group-selected:bg-accent-50 es:group-selected:text-accent-900',
						(type === 'pillCompact' || type === 'pillCompactInverse') && 'es:[&_svg]:size-4!',
					)}
				>
					{badge}
				</span>
			)}

			{badge && isValidElement(badge) && <div>{badge}</div>}
		</ReactAriaTab>
	);
};

Tab.displayName = 'Tab';

/**
 * Container for tab content within the Tabs component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Classes to pass to the tab content container.
 *
 * @returns {JSX.Element} The TabPanel component.
 *
 * @see {@link Tabs} for usage example.
 *
 * @preserve
 */
export const TabPanel = (props) => {
	const { children, className, ...other } = props;

	return (
		<ReactAriaTabPanel
			{...other}
			className={clsx('es:mt-1.5 es:space-y-2.5 es:text-sm es:any-focus:outline-hidden', className)}
		>
			{children}
		</ReactAriaTabPanel>
	);
};

TabPanel.displayName = 'TabPanel';
