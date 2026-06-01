import { __, sprintf } from '@wordpress/i18n';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Children, cloneElement, isValidElement, useId, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from 'react';
import { Tab as ReactAriaTab, TabList as ReactAriaTabList, TabPanel as ReactAriaTabPanel, Tabs as ReactAriaTabs } from 'react-aria-components';

import { Notice } from '../notice/notice';
import { RichLabel } from '../rich-label/rich-label';
import type { Prettify } from '../../utilities/types';

type TabsType = 'underline' | 'underlineSecondary' | 'pill' | 'pillCompact' | 'bubble' | 'chips';

type TabsProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaTabs>, 'orientation' | 'children'> & {
	children?: ReactNode;
	/** Whether the tabs are vertical. */
	vertical?: boolean;
	/** Classes to pass to the tabs container. */
	className?: string;
	/** Design of the tabs. Defaults to `underline`. */
	type?: TabsType;
	/** If `true`, component will look more flat. Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
};

type TabListProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaTabList>, 'children' | 'className'> & {
	children?: ReactNode;
	/** Classes to pass to the tab list. */
	className?: string;
	type?: TabsType;
	flat?: boolean;
};

type TabProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaTab>, 'className' | 'children' | 'isDisabled'> & {
	children?: ReactNode;
	/** Whether the tab is disabled. */
	disabled?: boolean;
	/** Classes to pass to the tab. */
	className?: string;
	badgeClassName?: string;
	/** Icon to show on the tab. */
	icon?: ReactNode;
	/** Badge to render besides the label. */
	badge?: ReactNode;
	/** If `true`, the tab is disabled and not rendered, but is not unmounted from the DOM. */
	invisible?: boolean;
	/** Tab label. **Note**: overrides inner items! */
	label?: ReactNode;
	/** Tab subtitle. **Note**: overrides inner items! */
	subtitle?: ReactNode;
	/** The tab unique identifier. */
	id?: string;
	isParentVertical?: boolean;
	type?: TabsType;
	flat?: boolean;
};

type TabPanelProps = ComponentPropsWithoutRef<typeof ReactAriaTabPanel> & {
	type?: TabsType;
	vertical?: boolean;
	flat?: boolean;
};

type NamedElement<Props> = ReactElement<Props> & {
	type: {
		displayName?: string;
	};
};

const isReactElement = <Props,>(child: ReactNode): child is ReactElement<Props> => isValidElement<Props>(child);

const isNamedElement = <Props,>(child: ReactNode, name: string): child is NamedElement<Props> => {
	if (!isValidElement(child) || typeof child.type === 'string') {
		return false;
	}

	return (child.type as { displayName?: string }).displayName === name;
};

const tabListClasses = cva('es:flex', {
	variants: {
		type: {
			underline: '',
			underlineSecondary: '',
			pill: '',
			pillCompact: '',
			bubble: 'es:bg-white es:rounded-28 es:p-1.5 es:gap-px',
			chips: '',
		},
		orientation: {
			horizontal: 'es:overflow-x-auto es:overflow-y-visible es:max-h-none es:items-stretch',
			vertical: 'es:flex-col es:gap-0.75 es:overflow-y-auto es:self-start es:max-h-[85vh]',
		},
		flat: {
			true: '',
			false: '',
		},
	},
	compoundVariants: [
		{
			type: ['underline', 'underlineSecondary'],
			orientation: 'vertical',
			class: 'es:bg-white',
		},
		{
			type: ['underline', 'underlineSecondary'],
			orientation: 'horizontal',
			class: 'es:border-b es:border-b-secondary-200 es:justify-center-safe es:rounded-t-lg',
		},
		{
			type: ['underline', 'underlineSecondary'],
			orientation: 'horizontal',
			class: 'es:px-1',
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
		{
			type: ['bubble'],
			orientation: 'horizontal',
			class: 'es:h-15 es:has-any-icon:h-20',
		},
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
		{
			type: ['chips'],
			orientation: 'horizontal',
			class: 'es:flex es:gap-0.75 es:rounded-xl',
		},
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

const tabClasses = cva(
	[
		'es:group es:relative es:shrink-0',
		'es:flex es:items-center es:gap-1.5',
		'es:select-none',
		'es:transition-plus es:text-center es:text-12 es:leading-[1.15] es:text-box-trim',
		'es:any-focus:outline-hidden',
		'es:contrast-more:inset-ring es:contrast-more:inset-ring-accent-500/0 es:contrast-more:focus-visible:inset-ring-accent-500',
		'es:disabled:text-secondary-400',
		'es:font-variation-["wdth"_102,"wght"_325,"ROND"_0,"slnt"_0,"GRAD"_0] es:hover:font-variation-["wdth"_102,"wght"_325,"ROND"_100,"slnt"_0,"GRAD"_0] es:selected:font-variation-["wdth"_102,"wght"_325,"ROND"_50,"slnt"_0,"GRAD"_50]',
	],
	{
		variants: {
			type: {
				underline: '',
				underlineSecondary: '',
				pill: '',
				pillCompact: '',
				bubble: '',
				chips: '',
			},
			vertical: {
				true: '',
				false: '',
			},
			flat: {
				true: '',
				false: '',
			},
			invisible: {
				true: 'es:hidden',
				false: '',
			},
			iconWithLabel: {
				true: 'es:justify-start',
				false: 'es:justify-center-safe',
			},
			selected: {
				false: [
					'es:btn-group-h:not-pressed:not-after-current:not-first:rounded-l-sm',
					'es:btn-group-h:not-pressed:not-before-current:not-last:rounded-r-sm',
					'es:btn-group-v:not-pressed:not-after-current:not-first:rounded-t-sm',
					'es:btn-group-v:not-pressed:not-before-current:not-last:rounded-b-sm',
				],
				true: '',
			},
		},
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
					'es:after:content-["\"] es:after:absolute es:after:bottom-0 es:after:left-0 es:after:right-0 es:after:w-3/5 es:after:mx-auto es:after:h-0.75 es:selected:after:bg-accent-600',
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
					'es:after:content-["\"] es:after:absolute es:after:bottom-0 es:after:left-0 es:after:right-0 es:after:w-full es:after:mx-auto es:after:h-0.75',
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
			{
				type: ['pill'],
				vertical: false,
				class: ['es:justify-center-safe es:px-6'],
			},
			{
				type: ['pillCompact'],
				vertical: false,
				class: ['es:justify-center-safe es:px-3'],
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
				],
			},
			{
				type: ['chips'],
				flat: false,
				class: 'es:selected:shadow-xs es:selected:shadow-black/5',
			},
		],
	},
);

const tabIconClasses = cva('es:transition es:duration-200 es:ease-spring-bouncy', {
	variants: {
		type: {
			underline: '',
			underlineSecondary: '',
			pill: '',
			pillCompact: '',
			bubble: '',
			chips: '',
		},
		vertical: {
			true: '',
			false: '',
		},
	},
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

const tabBadgeClasses = cva(
	[
		'es:transition-plus',
		'es:flex es:items-center-safe es:justify-center-safe',
		'es:min-h-4.5 es:min-w-4.5 es:leading-none es:rounded-full es:shrink-0',
		'es:text-12 es:leading-none es:text-box-trim',
		'es:any-icon:size-2.5',
	],
	{
		variants: {
			type: {
				underline: '',
				underlineSecondary: '',
				pill: '',
				pillCompact: '',
				bubble: '',
				chips: '',
			},
			vertical: {
				true: '',
				false: '',
			},
			simple: {
				true: '',
				false: '',
			},
			icon: {
				true: '',
				false: '',
			},
			flat: {
				true: '',
				false: '',
			},
		},
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
			{
				type: ['pill', 'pillCompact'],
				class: 'es:ml-auto es:bg-white es:group-selected:bg-accent-600 es:group-selected:text-white',
			},
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

const tabPanelClasses = cva('es:space-y-3 es:text-13 es:any-focus:outline-hidden', {
	variants: {
		type: {
			underline: '',
			underlineSecondary: '',
			pill: '',
			pillCompact: '',
			bubble: '',
			chips: '',
		},
		vertical: {
			true: '',
			false: '',
		},
		flat: {
			true: '',
			false: '',
		},
	},
	compoundVariants: [
		{
			type: ['pill', 'pillCompact', 'bubble', 'chips'],
			vertical: false,
			class: 'es:mt-4',
		},
		{
			type: ['underline', 'underlineSecondary'],
			vertical: false,
			class: 'es:mt-1',
		},
	],
	defaultVariants: {
		flat: false,
		vertical: false,
	},
});

/**
 * Main tab container.
 *
 * @component
 * @param {TabsProps} props - Component props.
 *
 * @returns {JSX.Element} The Tabs component.
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
 */
export const Tabs = (props: Prettify<TabsProps>) => {
	const { children, vertical, className, hidden, type = 'underline', flat, ...rest } = props;
	const baseId = useId();

	if (hidden) {
		return null;
	}

	const preparedChildren = Children.toArray(children);
	const firstTabList = preparedChildren.find((child) => isNamedElement<TabListProps>(child, 'TabList'));
	const tabItems = Children.toArray(firstTabList?.props.children).filter(isReactElement<TabProps>);
	const realTabIds = tabItems.map((tab, index) => tab.props.id ?? `tab-${baseId}-${index + 1}`);

	let tabCount = 0;
	let tabPanelCount = 0;

	const childrenWithIds = preparedChildren.reduce<ReactNode[]>((accumulator, child, index) => {
		if (isNamedElement<TabListProps>(child, 'TabList')) {
			const childItems = Children.toArray(child.props.children).filter(isReactElement<TabProps>);
			tabCount = childItems.length;

			if (childItems.length < 1) {
				return accumulator;
			}

			return [
				...accumulator,
				cloneElement(
					child,
					{
						key: index,
						type,
						flat,
					},
					childItems.map((innerChild, innerIndex) =>
						cloneElement(innerChild, {
							id: innerChild.props.id ?? realTabIds[innerIndex] ?? `tab-${baseId}-${innerIndex + 1}`,
							key: innerIndex,
							isParentVertical: vertical,
							type,
							flat,
						}),
					),
				),
			];
		}

		if (isNamedElement<TabPanelProps>(child, 'TabPanel')) {
			const panelId = realTabIds[tabPanelCount] ?? `tab-${baseId}-${tabPanelCount + 1}`;
			tabPanelCount += 1;

			return [
				...accumulator,
				cloneElement(child, {
					id: panelId,
					key: index,
					className: child.props.className,
					flat,
					type,
					vertical,
				}),
			];
		}

		return accumulator;
	}, []);

	if (tabCount !== tabPanelCount) {
		return (
			<Notice
				type='error'
				label={__('Component is not configured correctly. Skipping render to prevent errors.', 'eightshift-ui-components')}
				subtitle={sprintf(
					__('Number of <Tab>s (%s) and <TabPanel>s (%s) should be the same. <Tab>s should be within a <TabList>.', 'eightshift-ui-components'),
					String(tabCount),
					String(tabPanelCount),
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
 * @param {TabListProps} props - Component props.
 *
 * @returns {JSX.Element} The TabList component.
 *
 * @see {@link Tabs} for usage example.
 */
export const TabList = (props: Prettify<TabListProps>) => {
	const { children, 'aria-label': ariaLabel, className, type, flat, ...other } = props;

	return (
		<ReactAriaTabList
			aria-label={ariaLabel ?? __('tabs', 'eightshift-ui-components')}
			className={({ orientation }) => clsx(tabListClasses({ orientation, type, flat }), className)}
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
 * @param {TabProps} props - Component props.
 *
 * @returns {JSX.Element} The Tab component.
 *
 * @see {@link Tabs} for usage example.
 */
export const Tab = (props: Prettify<TabProps>) => {
	const { children, disabled, isParentVertical, className, badgeClassName, icon, label, subtitle, type, badge, invisible, flat, ...other } = props;

	return (
		<ReactAriaTab
			{...other}
			isDisabled={disabled || invisible}
			className={clsx(
				tabClasses({ vertical: Boolean(isParentVertical), type, flat: Boolean(flat), invisible: Boolean(invisible), iconWithLabel: Boolean(icon && children) }),
				className,
			)}
		>
			{icon ? <div className={tabIconClasses({ vertical: Boolean(isParentVertical), type })}>{icon}</div> : null}

			<div className={clsx(!isParentVertical && 'es:flex es:items-center-safe es:gap-1.5', isParentVertical && 'es:contents')}>
				{subtitle ? (
					<RichLabel
						label={label ?? children}
						subtitle={subtitle}
						noColor
					/>
				) : (
					(label ?? children)
				)}

				{badge ? (
					<span className={clsx(tabBadgeClasses({ vertical: Boolean(isParentVertical), type, simple: !isValidElement(badge), icon: Boolean(icon) }), badgeClassName)}>{badge}</span>
				) : null}
			</div>
		</ReactAriaTab>
	);
};

Tab.displayName = 'Tab';

/**
 * Container for tab content within the Tabs component.
 *
 * @component
 * @param {TabPanelProps} props - Component props.
 *
 * @returns {JSX.Element} The TabPanel component.
 *
 * @see {@link Tabs} for usage example.
 */
export const TabPanel = (props: Prettify<TabPanelProps>) => {
	const { children, className, type, vertical, ...other } = props;

	return (
		<ReactAriaTabPanel
			{...other}
			className={clsx(tabPanelClasses({ type, vertical }), className)}
		>
			{children}
		</ReactAriaTabPanel>
	);
};

TabPanel.displayName = 'TabPanel';
