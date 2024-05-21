import {
	Tabs as ReactAriaTabs,
	TabList as ReactAriaTabList,
	Tab as ReactAriaTab,
	TabPanel as ReactAriaTabPanel,
} from 'react-aria-components';
import { __, sprintf } from '@wordpress/i18n';
import { classnames } from '../../utilities/classnames';
import { cloneElement, useId } from 'react';
import { Notice } from '../notice/notice';

export const Tabs = (props) => {
	const { children, vertical, className, ...rest } = props;

	const baseId = useId();

	let tabPanelCounter = 1;
	let tabCounter = 1;

	const childrenWithIds = children.reduce((acc, child, index) => {
		if (child.type.displayName === 'TabList') {
			tabCounter = (child?.props?.children?.length ?? 0) + 1;

			return [
				...acc,
				cloneElement(
					child,
					{
						key: index,
					},
					child?.props?.children?.map((innerChild, i) =>
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
				}),
			];
		}

		return acc;
	}, []);

	if (tabCounter !== tabPanelCounter) {
		return (
			<Notice
				type='error'
				label={__(
					'Component is not configured correctly. Skipping render to prevent errors.',
					'eightshift-components',
				)}
				subtitle={sprintf(
					__(
						'Number of <Tab>s (%s) and <TabPanel>s (%s) should be the same. <Tab>s should be within a <TabList>.',
						'eightshift-components',
					),
					tabCounter,
					tabPanelCounter,
				)}
				alignIconToTitle
			/>
		);
	}

	return (
		<ReactAriaTabs
			{...rest}
			orientation={vertical ? 'vertical' : 'horizontal'}
			className={classnames(
				vertical ? 'grid size-full min-h-40 grid-cols-[minmax(0,_15rem),_2fr] gap-4' : 'flex-col',
				className,
			)}
		>
			{childrenWithIds}
		</ReactAriaTabs>
	);
};

Tabs.displayName = 'Tabs';

export const TabList = (props) => {
	const { children, 'aria-label': ariaLabel, className, ...other } = props;
	return (
		<ReactAriaTabList
			aria-label={ariaLabel ?? __('tabs', 'eightshift-components')}
			className={({ orientation }) =>
				classnames(
					'flex gap-1',
					orientation === 'vertical' && 'h-full flex-col border-r pr-1.5',
					orientation === 'horizontal' && 'w-full items-end border-b border-b-gray-300',
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

export const Tab = (props) => {
	const { children, disabled, isParentVertical, className, ...other } = props;
	return (
		<ReactAriaTab
			{...other}
			isDisabled={disabled}
			className={({ isSelected, isDisabled }) => {
				return classnames(
					'relative flex select-none items-center rounded p-1.5 text-sm transition',
					'focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-50',
					'after:absolute after:rounded-full after:bg-teal-600 after:shadow-sm after:shadow-teal-500/25 after:transition after:duration-300 after:content-[""]',
					!isParentVertical && 'after:inset-x-0 after:-bottom-px after:h-0.5',
					isSelected && 'border-b-teal-600 text-teal-900 after:opacity-100',
					isSelected && isParentVertical && 'after:scale-y-100',
					isSelected && !isParentVertical && 'after:scale-x-100',
					!isSelected && !isDisabled && 'text-gray-800 after:opacity-0 hover:bg-gray-100',
					!isSelected && !isDisabled && isParentVertical && 'after:scale-y-75',
					!isSelected && !isDisabled && !isParentVertical && 'after:scale-x-75',
					isDisabled && 'text-gray-300 after:hidden',
					isParentVertical &&
						'pl-3 after:inset-y-0 after:left-px after:right-auto after:my-auto after:h-7 after:w-[0.1875rem]',
					className,
				);
			}}
		>
			{children}
		</ReactAriaTab>
	);
};

Tab.displayName = 'Tab';

export const TabPanel = (props) => {
	const { children, className, ...other } = props;
	return (
		<ReactAriaTabPanel
			{...other}
			className={classnames('mt-1.5 space-y-2.5 text-sm focus:outline-none', className)}
		>
			{children}
		</ReactAriaTabPanel>
	);
};

TabPanel.displayName = 'TabPanel';
