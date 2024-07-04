import { Tabs as ReactAriaTabs, TabList as ReactAriaTabList, Tab as ReactAriaTab, TabPanel as ReactAriaTabPanel } from 'react-aria-components';
import { __, sprintf } from '@wordpress/i18n';
import { clsx } from 'clsx/lite';
import { cloneElement, useId } from 'react';
import { Notice } from '../notice/notice';
import { RichLabel } from '../rich-label/rich-label';

/**
 * Main tab container.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.vertical=false] - Whether the tabs are vertical.
 * @param {string} [props.className] - Classes to pass to the tabs container.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
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
 *
 * @preserve
 */
export const Tabs = (props) => {
	const { children, vertical, className, hidden, ...rest } = props;

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
					},
					childItems?.map((innerChild, i) =>
						cloneElement(innerChild, {
							id: `tab-${baseId}-${i + 1}`,
							key: i,
							isParentVertical: vertical,
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
					className: clsx(child.props.className, vertical && 'es-uic-border-l es-uic-border-l-gray-300 es-uic-pl-3'),
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
			className={clsx(vertical ? 'es-uic-grid es-uic-size-full es-uic-min-h-40 es-uic-grid-cols-[minmax(0,_15rem),_2fr] es-uic-gap-4' : 'es-uic-flex-col', className)}
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
	const { children, 'aria-label': ariaLabel, className, ...other } = props;

	return (
		<ReactAriaTabList
			aria-label={ariaLabel ?? __('tabs', 'eightshift-ui-components')}
			className={({ orientation }) =>
				clsx(
					'es-uic-flex',
					orientation === 'vertical' && 'es-uic-h-full es-uic-flex-col es-uic-gap-px es-uic-pr-1.5',
					orientation === 'horizontal' && 'es-uic-w-full es-uic-items-end es-uic-gap-1 es-uic-border-b es-uic-border-b-gray-300',
					className,
				)
			}
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
	const { children, disabled, isParentVertical, className, icon, label, subtitle, ...other } = props;

	return (
		<ReactAriaTab
			{...other}
			isDisabled={disabled}
			className={({ isSelected, isDisabled }) => {
				return clsx(
					'es-uic-relative es-uic-flex es-uic-select-none es-uic-items-center es-uic-rounded es-uic-p-1.5 es-uic-text-sm es-uic-transition',
					'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
					'after:es-uic-absolute after:es-uic-rounded-full after:es-uic-bg-teal-600 after:es-uic-shadow-sm after:es-uic-shadow-teal-500/25 after:es-uic-transition after:es-uic-duration-300 after:es-uic-content-[""]',
					!isParentVertical && 'after:es-uic-inset-x-0 after:-es-uic-bottom-px after:es-uic-h-0.5',
					isSelected && 'es-uic-border-b-teal-600 es-uic-text-teal-900 after:es-uic-opacity-100',
					isSelected && isParentVertical && 'after:es-uic-scale-y-100',
					isSelected && !isParentVertical && 'after:es-uic-scale-x-100',
					!isSelected && !isDisabled && 'es-uic-text-gray-800 after:es-uic-opacity-0 hover:es-uic-bg-gray-100',
					!isSelected && !isDisabled && isParentVertical && 'after:es-uic-scale-y-75',
					!isSelected && !isDisabled && !isParentVertical && 'after:es-uic-scale-x-75',
					isDisabled && 'es-uic-text-gray-300 after:es-uic-hidden',
					isParentVertical &&
						'es-uic-min-h-9 es-uic-pl-3 after:es-uic-inset-y-0 after:es-uic-left-px after:es-uic-right-auto after:es-uic-my-auto after:es-uic-h-7 after:es-uic-w-[0.1875rem]',
					className,
				);
			}}
		>
			{(icon || subtitle) && (
				<RichLabel
					icon={icon}
					label={label ?? children}
					subtitle={subtitle}
				/>
			)}

			{!(icon || subtitle) && (label ?? children)}
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
			className={clsx('es-uic-mt-1.5 es-uic-space-y-2.5 es-uic-text-sm focus:es-uic-outline-none', className)}
		>
			{children}
		</ReactAriaTabPanel>
	);
};

TabPanel.displayName = 'TabPanel';
