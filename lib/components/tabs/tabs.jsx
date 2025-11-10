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
 * @param {boolean} [props.flat] - If `true`, component will look more flat. Useful for nested layer of controls.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The Tabs component.
 *
 * @typedef {'underline' | 'underlineSecondary' | 'pill' | 'pillCompact' | 'bubble' | 'chips'} TabsType
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
	const { children, vertical, className, hidden, type = 'underline', flat, ...rest } = props;

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
							type,
							flat,
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
					className: child.props.className,
					flat,
					type,
					vertical,
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
			className={clsx(
				vertical ? 'es:grid es:gap-4' : 'es:flex-col',
				vertical && ['underline', 'underlineSecondary', 'bubble'].includes(type) && 'es:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)]',
				vertical && !['underline', 'underlineSecondary', 'bubble'].includes(type) && 'es:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]',
				className,
			)}
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
	const { children, 'aria-label': ariaLabel, className, type, flat, ...other } = props;

	const tabListClasses = cva(['es:flex', className], {
		variants: {
			orientation: {
				horizontal: 'es:overflow-x-auto es:overflow-y-visible es:max-h-none es:items-stretch',
				vertical: 'es:flex-col es:gap-0.75 es:overflow-y-auto es:self-start es:max-h-[85vh]',
			},
		},
		compoundVariants: [
			{
				type: ['underline', 'underlineSecondary', 'bubble'],
				class: 'es:bg-white',
			},
			{
				type: ['underline', 'underlineSecondary'],
				orientation: 'horizontal',
				class: 'es:border-b es:border-b-secondary-200 es:justify-center-safe es:rounded-t-lg',
			},
			{
				type: ['underline', 'underlineSecondary'],
				orientation: 'vertical',
				class: 'es:rounded-28 es:p-1.5',
			},
			{
				type: 'underline',
				orientation: 'horizontal',
				class: 'es:gap-px',
			},
			//
			{
				type: ['bubble'],
				class: 'es:rounded-28 es:p-1.5 es:gap-px',
			},
			{
				type: ['bubble'],
				orientation: 'horizontal',
				class: 'es:h-15 es:has-any-icon:h-20',
			},
			//
			{
				type: ['pill', 'pillCompact'],
				class: 'es:bg-secondary-50',
			},
			{
				type: ['pill', 'pillCompact'],
				orientation: 'horizontal',
				class: 'es:rounded-full es:gap-0.5 es:mx-auto es:w-fit',
			},
			{
				type: ['pill'],
				orientation: 'vertical',
				class: 'es:rounded-4xl es:p-3',
			},
			{
				type: ['pillCompact'],
				orientation: 'vertical',
				class: 'es:rounded-3xl es:p-3',
			},
			//
			{
				type: ['chips'],
				orientation: 'horizontal',
				class: 'es:flex es:gap-0.75 es:rounded-xl',
			},
			// Flat.
			{
				type: ['pill', 'pillCompact'],
				flat: false,
				class: 'es:shadow es:shadow-black/5',
			},
		],
		defaultVariants: {
			orientation: 'horizontal',
			flat: false,
		},
	});

	return (
		<ReactAriaTabList
			aria-label={ariaLabel ?? __('tabs', 'eightshift-ui-components')}
			className={({ orientation }) => tabListClasses({ orientation, type, flat })}
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
 * @param {boolean} [props.invisible] - If `true`, the tab is disabled and not rendered, but is not unmounted from the DOM.
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
	const { children, disabled, isParentVertical, className, badgeClassName, icon, label, subtitle, type, badge, invisible, flat, ...other } = props;

	const componentClasses = cva(
		[
			'es:group es:relative es:shrink-0',
			'es:flex es:items-center es:gap-1.25',
			'es:select-none es:not-disabled:cursor-pointer',
			'es:transition-plus es:text-center es:text-12 es:leading-[1.15] es:text-box-trim',
			'es:any-focus:outline-hidden',
			'es:contrast-more:inset-ring es:contrast-more:inset-ring-accent-500/0 es:contrast-more:focus-visible:inset-ring-accent-500',
			'es:disabled:text-secondary-400',
			'es:font-variation-["wdth"_120,"YTLC"_560,"wght"_375] es:selected:font-variation-["wdth"_120,"YTLC"_560,"wght"_375,"GRAD"_80]',
			invisible && 'es:hidden',
			className,
		],
		{
			variants: {},
			compoundVariants: [
				{ type: ['underline', 'underlineSecondary', 'bubble'], class: ['es:flex-col es:justify-center-safe', 'es:text-secondary-700 es:selected:text-accent-700'] },
				{
					type: ['pill', 'pillCompact'],
					vertical: true,
					flat: false,
					class: 'es:selected:shadow-md es:selected:shadow-accent-700/10',
				},
				{
					vertical: false,
					type: 'underline',
					class: [
						'es:px-3 es:not-has-any-icon:py-3 es:has-any-icon:py-2.5 es:rounded-t-lg es:min-h-12',
						'es:after:content-[""] es:after:absolute es:after:bottom-0 es:after:left-0 es:after:right-0 es:after:w-3/5 es:after:mx-auto es:after:h-0.75 es:selected:after:bg-accent-600',
						'es:selected:after:inset-shadow-xs es:selected:after:inset-shadow-accent-50/30',
						'es:not-selected:hover:bg-secondary-50 es:selected:hover:bg-accent-600/5',
						'es:selected:text-accent-600',
						'es:after:rounded-t-full es:after:transition',
					],
				},
				{
					vertical: false,
					type: 'underlineSecondary',
					class: [
						'es:px-3 es:pt-2 es:pb-2.5 es:rounded-t-sm es:min-h-12',
						'es:not-selected:hover:bg-secondary-50 es:selected:hover:bg-accent-600/5',
						'es:after:content-[""] es:after:absolute es:after:bottom-0 es:after:left-0 es:after:right-0 es:after:w-full es:after:mx-auto es:after:h-0.75',
						'es:after:bg-linear-to-b es:hover:not-selected:not-disabled:after:from-secondary-200 es:hover:not-selected:not-disabled:after:to-secondary-300 es:selected:after:from-accent-500 es:selected:after:to-accent-600',
						'es:after:transition',
					],
				},
				{
					vertical: true,
					type: ['underline', 'underlineSecondary'],
					class: [
						'es:p-2 es:rounded-xl es:not-has-any-icon:rounded-3xl es:has-any-icon:aspect-4/3 es:not-has-any-icon:aspect-5/3',
						'es:text-secondary-500 es:selected:text-accent-800',
						'es:not-has-any-icon:selected:bg-accent-600/5 es:not-has-any-icon:not-selected:hover:bg-secondary-50',
					],
				},
				//
				{
					type: ['bubble'],
					class: [
						'es:rounded-xl es:not-has-any-icon:rounded-3xl',
						'es:text-secondary-500 es:selected:text-accent-800',
						'es:not-has-any-icon:selected:bg-accent-600/5 es:not-has-any-icon:not-selected:hover:bg-secondary-50',
					],
				},
				{
					type: ['bubble'],
					vertical: false,
					class: 'es:px-2 es:py-0.5 es:grow',
				},
				{
					type: ['bubble'],
					vertical: true,
					class: 'es:p-2 es:has-any-icon:aspect-4/3 es:not-has-any-icon:aspect-5/3',
				},
				//
				{
					type: ['pill', 'pillCompact'],
					class: [
						'es:rounded-full',
						'es:selected:bg-accent-50 es:not-selected:hover:bg-secondary-100 es:selected:text-accent-900',
						'es:bg-linear-to-br es:selected:from-accent-600/5 es:selected:to-accent-600/15',
						'es:selected:inset-ring es:selected:inset-ring-accent-600/10',
					],
				},
				{
					type: ['pill'],
					class: ['es:py-3 es:min-h-12'],
				},
				{
					type: ['pillCompact'],
					class: ['es:py-2 es:min-h-9.5'],
				},
				//
				{
					type: ['pill'],
					vertical: false,
					class: ['es:justify-center es:px-6'],
				},
				{
					type: ['pillCompact'],
					vertical: false,
					class: ['es:justify-center es:px-3'],
				},
				{
					type: ['pill'],
					vertical: true,
					class: ['es:pl-5 es:has-any-icon:pl-4 es:pr-6'],
				},
				{
					type: ['pillCompact'],
					vertical: true,
					class: ['es:pl-4 es:has-any-icon:pl-3 es:pr-3'],
				},
				//
				{
					type: ['chips'],
					class: [
						'es:bg-secondary-50 es:selected:bg-accent-500',
						'es:inset-ring es:inset-ring-secondary-200/30 es:selected:inset-ring-accent-600/30',
						'es:bg-linear-to-b es:from-25% es:from-accent-700/0 es:to-accent-700/0 es:selected:from-accent-700/10 es:selected:to-accent-700/30',
						'es:selected:inset-shadow-sm es:selected:inset-shadow-accent-50/30',
						'es:text-secondary-700 es:selected:text-white',
						'es:min-h-7.5 es:rounded-lg es:selected:rounded-xl',
						'es:transition-plus',
						'es:pl-3 es:has-any-icon:pl-2 es:pr-3 es:py-1.5',
						!flat && 'es:selected:shadow-xs es:selected:shadow-black/5',
					],
				},
			],
		},
	);

	const iconClasses = cva('es:transition es:duration-200 es:ease-spring-bouncy', {
		variants: {},
		compoundVariants: [
			{
				vertical: true,
				type: ['underline', 'underlineSecondary'],
				class: [
					'es:bg-white es:px-3.5 es:py-1.25 es:rounded-full',
					'es:group-hover:bg-surface-500/7',
					'es:group-selected:bg-accent-500/10 es:group-selected:text-accent-800',
					'es:group-hover:group-selected:ring es:group-hover:group-selected:ring-accent-500/10',
				],
			},
			{
				type: ['bubble'],
				class: [
					'es:bg-white es:px-3.5 es:py-1.25 es:rounded-full',
					'es:group-hover:bg-surface-500/7',
					'es:group-selected:bg-accent-500/10 es:group-selected:text-accent-800',
					'es:group-hover:group-selected:ring es:group-hover:group-selected:ring-accent-500/10',
				],
			},
		],
	});

	const badgeClasses = cva(
		[
			'es:transition-plus',
			'es:flex es:items-center-safe es:justify-center-safe',
			'es:min-h-4.5 es:min-w-4.5 es:leading-none es:rounded-full es:shrink-0',
			'es:text-12 es:leading-none es:text-box-trim',
			'es:any-icon:size-2.5',
			badgeClassName,
		],
		{
			variants: {},
			compoundVariants: [
				{
					type: ['underline', 'underlineSecondary', 'bubble'],
					class: ['es:bg-secondary-100 es:group-selected:bg-accent-600 es:group-selected:text-white', 'es:group-hover:ring es:group-hover:ring-white'],
				},
				{
					vertical: true,
					icon: false,
					type: ['underline', 'underlineSecondary'],
					class: 'es:absolute es:top-0 es:right-0',
				},
				{
					vertical: true,
					icon: true,
					type: ['underline', 'underlineSecondary'],
					class: 'es:absolute es:top-1.5 es:right-6 es:group-hover:bg-surface-100',
				},
				//
				{
					type: ['pill', 'pillCompact'],
					class: 'es:ml-auto es:bg-white es:group-selected:bg-accent-600 es:group-selected:text-white',
				},
				//
				{
					icon: false,
					type: ['bubble'],
					vertical: true,
					class: 'es:absolute es:top-0 es:right-0',
				},
				{
					icon: true,
					type: ['bubble'],
					class: 'es:absolute es:group-hover:bg-surface-100',
				},
				{
					icon: true,
					type: ['bubble'],
					vertical: false,
					class: 'es:top-1 es:right-11.5',
				},
				{
					icon: true,
					type: ['bubble'],
					vertical: true,
					class: 'es:top-1.5 es:right-6',
				},
				//
				{
					type: ['chips'],
					class: 'es:bg-secondary-200/50 es:group-selected:bg-accent-600 es:group-selected:text-white',
				},
				{
					type: ['chips'],
					vertical: true,
					class: 'es:ml-auto',
				},
			],
			defaultVariants: {
				vertical: false,
				simple: false,
				icon: false,
				flat: false,
			},
		},
	);

	return (
		<ReactAriaTab
			{...other}
			isDisabled={disabled || invisible}
			className={componentClasses({ vertical: Boolean(isParentVertical), type, flat: Boolean(flat) })}
			textValue={label ?? children}
		>
			{icon && <div className={iconClasses({ vertical: Boolean(isParentVertical), type })}>{icon}</div>}

			<div className={clsx(!isParentVertical && 'es:flex es:items-center-safe es:gap-1.5', isParentVertical && 'es:contents')}>
				{subtitle && (
					<RichLabel
						label={label ?? children}
						subtitle={subtitle}
						noColor
					/>
				)}

				{!subtitle && (label ?? children)}

				{badge && <span className={badgeClasses({ vertical: Boolean(isParentVertical), type, simple: !isValidElement(badge), icon: Boolean(icon) })}>{badge}</span>}
			</div>
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
	const { children, className, type, vertical, ...other } = props;

	const tabPanelClasses = cva(['es:space-y-3 es:text-13 es:any-focus:outline-hidden', className], {
		variants: {},
		compoundVariants: [
			{ type: ['underline', 'underlineSecondary', 'bubble'], class: 'es:bg-white' },
			{ type: ['underline', 'underlineSecondary'], vertical: false, class: 'es:rounded-b-lg es:px-3 es:py-5' },
			{ type: ['underline', 'underlineSecondary'], vertical: true, class: 'es:rounded-3xl es:p-5' },
			{ type: ['bubble'], class: 'es:rounded-3xl es:p-5' },
			{ type: ['bubble', 'chips'], vertical: false, class: 'es:mt-2' },
			{ type: ['chips'], vertical: true, class: 'es:py-2' },
		],
		defaultVariants: {
			flat: false,
			vertical: false,
		},
	});

	return (
		<ReactAriaTabPanel
			{...other}
			className={tabPanelClasses({ type, vertical })}
		>
			{children}
		</ReactAriaTabPanel>
	);
};

TabPanel.displayName = 'TabPanel';
