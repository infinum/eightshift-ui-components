import { useState } from 'react';
import { Toggle } from './components/toggle/toggle';
import { icons } from './components/icons/icons';
import { AnimatedVisibility } from './components/animated-visibility/animated-visibility';
import { Spacer } from './components/spacer/spacer';
import { Expandable } from './components/expandable/expandable';
import { Notice } from './components/notice/notice';
import { LinkInput } from './components/link-input/link-input';
import { TriggeredPopover } from './components/popover/popover';
import { Button } from './components/button/button';
import { MatrixAlign } from './components/matrix-align/matrix-align';
import { Menu, MenuItem, MenuSection, MenuSeparator, SubMenuItem } from './components/menu/menu';
import { Tooltip } from './components/tooltip/tooltip';
import { NumberPicker } from './components/number-picker/number-picker';
import { Responsive } from './components/responsive/responsive';
import { BaseControl } from './components/base-control/base-control';
import {
	Select,
	AsyncSelect,
	MultiSelect,
	AsyncMultiSelect,
	RSOption,
	RSSingleValue,
	RSMultiValue,
	RSDropdownIndicator,
	RSMultiValueRemove,
	RSClearIndicator,
	RSMultiValueContainer,
} from './components/select';

function App() {
	const [toggled, setToggled] = useState(false);
	const [linkTxt, setLinkTxt] = useState();
	const [linkNewTab, setLinkNewTab] = useState(false);
	const [matrixVal, setMatrixVal] = useState('center center');
	const [matrixVal2, setMatrixVal2] = useState('top left');
	const [menuThingy, setMenuThingy] = useState(false);
	const [menuThingy2, setMenuThingy2] = useState(false);
	const [num, setNum] = useState(0);

	const [resp, setResp] = useState({
		_default: 'sans',
		_mobileFirst: false,
	});

	const respOpt = [
		{
			label: 'Sans',
			value: 'sans',
		},
		{
			label: 'Serif',
			value: 'serif',
		},
		{
			label: 'Monospaced',
			value: 'mono',
		},
	];

	const linkData = [
		{ label: 'Eightshift', value: 'https://eightshift.com', metadata: { subtype: 'url' } },
		{
			label: 'This is a demo post',
			value: 'https://your-website.com/demo-post',
			metadata: { subtype: 'post' },
		},
		{ label: 'Homepage', value: 'https://your-website.com/', metadata: { subtype: 'page' } },
		{
			label: '2023 top secret report',
			value: 'https://your-website.com/2023-top-secret-report.pdf',
			metadata: { subtype: 'attachment' },
		},
		{
			label: 'Services archive',
			value: 'https://your-website.com/services/',
			metadata: { subtype: 'category' },
		},
		{
			label: 'Sign up form',
			value: 'https://your-website.com/forms/signup',
			metadata: { subtype: 'eightshift-forms' },
		},
	];

	const getLinkData = (searchTerm) => {
		if (!searchTerm) {
			return linkData;
		}

		const filtered = linkData.filter(
			({ label, value }) =>
				label.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
				value.toLowerCase().includes(searchTerm.toLowerCase().trim()),
		);

		if (filtered.length > 0) {
			return filtered;
		}

		return linkData;
	};

	const data = [
		{
			label: 'Item 1',
			value: 'item-1',
		},
		{
			label: 'Item 2',
			value: 'item-2',
		},
		{
			label: 'Item 3',
			value: 'item-3',
		},
		{
			label: 'Item 4 with veeeery very long label',
			value: 'item-4',
		},
		{
			label: 'Item 5',
			value: 'item-5',
		},
		{
			label: 'Item 6',
			value: 'item-6',
		},
	];

	const getData = (inputValue) => {
		const filterData = ({ label }) => label.toLowerCase().includes(inputValue.toLowerCase());
		return new Promise((resolve) => {
			setTimeout(() => {
				if (!inputValue) {
					resolve(data.slice(0, 3));
				}

				resolve(data.filter(filterData));
			}, 3000);
		});
	};

	const CustomMenuOption = (props) => (
		<RSOption {...props}>
			<>
				<span role='img'>{icons.emptyCircle}</span>
				<span>{props.label}</span>
			</>
		</RSOption>
	);

	const CustomValueDisplay = (props) => {
		return (
			<RSSingleValue {...props}>
				<span className='es-bg-admin-accent es-color-pure-white es-p-1 es-line-h-1 es-rounded-1.5 es-font-weight-500'>
					{props.children}
				</span>
			</RSSingleValue>
		);
	};

	const CustomMultiValueDisplay = (props) => {
		const colors = [
			'es-bg-red-500',
			'es-bg-blue-500',
			'es-bg-green-500',
			'es-bg-yellow-500',
			'es-bg-cool-gray-900',
		];
		const colorIndex =
			props.options.findIndex((option) => option.value === props.data.value) % colors.length;

		return (
			<RSMultiValue {...props}>
				<span
					className={`${colors[colorIndex]} es-color-pure-white es-p-1 es-line-h-1 es-rounded-1 es-font-weight-500`}
				>
					{props.children}
				</span>
			</RSMultiValue>
		);
	};

	const CustomDropdownIndicator = (props) => {
		return (
			<RSDropdownIndicator {...props}>
				<span className='es-nested-size-6! es-color-admin-accent! es-line-h-0! -es-ml-1'>
					{props.selectProps.menuIsOpen ? icons.arrowUpSquareAlt : icons.arrowDownSquareAlt}
				</span>
			</RSDropdownIndicator>
		);
	};

	const CustomMultiValueContainer = (props) => {
		const customProps = {
			...props,
			innerProps: {
				...props.innerProps,
				style: {
					backgroundColor: '#FCFAFF',
					borderColor: '#610BEF',
					flexDirection: 'row-reverse',
					padding: '0.125rem 0.25rem',
					borderRadius: '0.25rem',
				},
			},
		};
		return <RSMultiValueContainer {...customProps} />;
	};

	const CustomMultiValueRemoveButton = (props) => {
		props.innerProps.className = 'es-color-admin-accent es-hover-nested-color-red-500 es-line-h-0';
		return <RSMultiValueRemove {...props}>{icons.trashAlt}</RSMultiValueRemove>;
	};

	const CustomClearIndicator = (props) => {
		return (
			<RSClearIndicator {...props}>
				<span className='es-color-admin-accent es-hover-color-red-500 es-line-h-0 es-nested-size-6! -es-ml-1!'>
					{icons.errorCircleFill}
				</span>
			</RSClearIndicator>
		);
	};

	const [v, setV] = useState();
	const [v3, setV3] = useState();
	const [v4, setV4] = useState([]);
	const [v5, setV5] = useState([]);
	const [v6, setV6] = useState([]);

	return (
		<div className='font-geist flex min-h-screen items-center justify-center gap-4 overscroll-contain bg-neutral-100 p-10'>
			<div className='my-auto min-h-[60vh] w-full max-w-sm space-y-2 rounded border border-gray-300 bg-white p-2'>
				<span className='mb-2 inline-block py-1 text-sm font-medium'>List: Custom</span>
				<Toggle
					checked={toggled}
					onChange={(value) => setToggled(value)}
					icon={icons.experiment}
					label='Airplane mode'
				/>
				<Spacer
					size='s'
					className='bg-violet-50'
					border
				/>

				<AnimatedVisibility visible={toggled}>
					<div className='h-40 w-full rounded-md bg-yellow-200 p-4'>lorem</div>
				</AnimatedVisibility>

				<Expandable
					icon={icons.experiment}
					label='Lorem ipsum dolor'
					actions={
						<Button
							onClick={() => alert('hi')}
							icon={icons.emptyRect}
							type='ghost'
						/>
					}
				>
					<div className='h-40 w-full rounded-md bg-gray-200 p-4'>lorem</div>
				</Expandable>

				<Expandable
					icon={icons.experiment}
					label='Lorem ipsum dolor'
					keepActionsOnExpand
					actions={
						<Button
							className='flex size-8 items-center justify-center rounded border [&>svg]:size-5.5'
							onClick={() => alert('hi')}
							icon={icons.emptyRect}
							type='ghost'
						></Button>
					}
				>
					<div className='h-40 w-full rounded-md bg-gray-200 p-4'>lorem</div>
				</Expandable>

				<LinkInput
					url={linkTxt}
					help='Help, not sure how to input this'
					onChange={({ url }) => setLinkTxt(url)}
					fetchSuggestions={getLinkData}
				/>
				<Toggle
					icon={icons.newTab}
					label='Opens in new tab'
					checked={linkNewTab}
					onChange={(value) => setLinkNewTab(value)}
				/>

				<code className='mt-2 inline-block rounded-md bg-gray-100 p-1 font-mono text-[0.65rem]'>
					{JSON.stringify({ linkTxt, linkNewTab })}
				</code>
				<Notice
					label='Lorem ipsum dolor'
					subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				/>
				<Notice
					icon={icons.experiment}
					label='Lorem ipsum dolor'
					subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				/>

				<Notice
					label='Lorem ipsum dolor'
					subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					type='info'
				/>
				<Notice
					label='Lorem ipsum dolor'
					subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					type='success'
				/>
				<Notice
					label='Lorem ipsum dolor'
					subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					type='warning'
				/>
				<Notice
					label='Lorem ipsum dolor'
					subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					type='error'
				/>

				<Notice
					icon={icons.person}
					label='Post meta'
					subtitle='will be shown here'
					type='placeholder'
				/>
				<Notice
					icon={icons.person}
					label='Post meta'
					type='placeholder'
				/>
				<Notice
					icon={icons.person}
					subtitle='Post meta'
					type='placeholder'
				/>
				<TriggeredPopover>Hello</TriggeredPopover>

				<Button>Hello</Button>

				<div className='flex items-center gap-2'>
					<Button
						size='small'
						icon={icons.componentGeneric}
					/>
					<Button size='small'>Hello</Button>
					<Button
						size='small'
						icon={icons.componentGeneric}
					>
						Hello
					</Button>
				</div>

				<div className='flex items-center gap-2'>
					<Button icon={icons.componentGeneric} />
					<Button>Hello</Button>
					<Button icon={icons.componentGeneric}>Hello</Button>
				</div>

				<Button
					icon={icons.componentGeneric}
					type='danger'
				>
					Hello
				</Button>
				<Button
					icon={icons.componentGeneric}
					type='danger'
					disabled
				>
					Hello
				</Button>
				<Button
					icon={icons.componentGeneric}
					type='ghost'
				>
					Hello
				</Button>

				<div className='flex items-center gap-2'>
					<Button
						size='large'
						icon={icons.componentGeneric}
					/>
					<Button size='large'>Hello</Button>
					<Button
						size='large'
						icon={icons.componentGeneric}
					>
						Hello
					</Button>
				</div>

				<Button icon={icons.emptyRect}>Hello</Button>

				<div className='flex'>
					<Button
						icon={icons.accelerometer}
						inGroup
					/>
					<Button
						icon={icons.accelerometer}
						inGroup
					/>
					<Button
						icon={icons.accelerometer}
						inGroup
					/>
				</div>

				<MatrixAlign
					value={matrixVal}
					onChange={(value) => setMatrixVal(value)}
				/>

				<MatrixAlign
					value={matrixVal2}
					onChange={(value) => setMatrixVal2(value)}
					size='2x2'
					icon={icons.arrowsUp}
					label='Position'
				/>

				<Menu
					aria-label='Bok i tebi'
					keepOpen
				>
					<MenuSection label='Demo'>
						<MenuItem
							icon={icons.save}
							id='save'
						>
							Save
						</MenuItem>
						<MenuItem
							checked={menuThingy2}
							onClick={() => setMenuThingy2(!menuThingy2)}
							id='save-as'
						>
							Save as…
						</MenuItem>
					</MenuSection>
					<MenuSection label='Demo'>
						<MenuItem
							icon={icons.experiment}
							selected={menuThingy}
							id='save2'
							onClick={() => setMenuThingy(true)}
						>
							Save
						</MenuItem>
						<MenuItem
							selected={!menuThingy}
							icon={icons.experiment}
							id='save-as2'
							onClick={() => setMenuThingy(false)}
						>
							Save as…
						</MenuItem>
					</MenuSection>
				</Menu>

				<Menu aria-label='Hello'>
					<MenuItem
						id='new'
						shortcut='Ctrl + O'
					>
						New…
					</MenuItem>
					<MenuItem
						shortcut='Ctrl + N'
						endIcon={icons.emptyRect}
						id='open'
					>
						Open…
					</MenuItem>
					<MenuSeparator />
					<MenuItem id='save'>Save</MenuItem>
					<MenuItem id='save-as'>Save as…</MenuItem>
					<MenuSeparator />
					<MenuItem id='print'>Print…</MenuItem>
					<SubMenuItem trigger={<MenuItem>Lorem</MenuItem>}>
						<MenuItem id='print'>Print…</MenuItem>
						<MenuItem id='print2'>Print2…</MenuItem>
						<SubMenuItem trigger={<MenuItem>Sub</MenuItem>}>
							<MenuItem id='print3'>Print3…</MenuItem>
							<MenuItem id='print4'>Print4…</MenuItem>
						</SubMenuItem>
					</SubMenuItem>
				</Menu>

				<Tooltip
					text='Hello'
					doNotReplaceChild
				>
					Hover me
				</Tooltip>

				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					prefix='$'
					suffix='%'
					icon={icons.rangeMid}
				/>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					prefix='$'
					suffix='%'
					inline
				/>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					prefix='$'
					inline
				/>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					suffix='%'
					inline
				/>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					inline
				/>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					step={5}
					inline
				/>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					step={5}
				>
					<Button
						onClick={() => setNum(0)}
						type='ghost'
						icon={icons.resetToZero}
					/>
				</NumberPicker>
				<NumberPicker
					label='Pick a number'
					value={num}
					onChange={(value) => setNum(value)}
					max={200}
					step={5}
					inline
				>
					<Button
						onClick={() => setNum(0)}
						type='ghost'
						icon={icons.resetToZero}
						disabled={num === 0}
					/>
				</NumberPicker>

				<Responsive
					icon={icons.emptyRect}
					label='Font family'
					value={resp}
					onChange={(newValue) => setResp(newValue)}
					options={respOpt}
					componentToRender={({ currentValue, handleChange }) => (
						<div className='flex'>
							{respOpt.map((opt) => (
								<Button
									key={opt.value}
									onClick={() => handleChange(opt.value)}
									type={currentValue === opt.value ? 'selected' : 'primary'}
									inGroup
								>
									{opt.label}
								</Button>
							))}
						</div>
					)}
					breakpoints={['mobile', 'tablet', 'desktop', 'large']}
					globalManifest={{
						globalVariables: {
							breakpoints: {
								mobile: 480,
								tablet: 960,
								desktop: 1440,
								large: 1920,
							},
						},
					}}
				/>

				<BaseControl>
					<Button>Hi</Button>
				</BaseControl>

				<BaseControl icon={icons.emptyCircle}>
					<Button>Hi</Button>
				</BaseControl>

				<BaseControl
					icon={icons.emptyCircle}
					label='Moja lijepa komponenta'
				>
					<Button>Hi</Button>
				</BaseControl>

				<BaseControl label='Moja lijepa komponenta'>
					<Button>Hi</Button>
				</BaseControl>
				<BaseControl
					label='Moja lijepa komponenta'
					subtitle='Hello from the subtitle side'
				>
					<Button>Hi</Button>
				</BaseControl>

				<BaseControl
					icon={icons.emptyCircle}
					label='Moja lijepa komponenta'
					subtitle='Hello from the subtitle side'
				>
					<Button>Hi</Button>
				</BaseControl>

				<BaseControl
					icon={icons.emptyCircle}
					label='Moja lijepa lo rem ip sum kom po nen ta'
					subtitle='Hello from the subtitle side'
					actions={
						<>
							<Button icon={icons.emptyCircle} />
							<Button icon={icons.emptyCircle} />
							<Button icon={icons.emptyCircle} />
						</>
					}
				>
					<Button>Hi</Button>
				</BaseControl>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					noSearch
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					placeholder='Pick me!'
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					clearable
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					closeMenuAfterSelect
				/>

				<Select
					icon={icons.emptyCircle}
					label='Default'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
				/>

				<AsyncSelect
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV3(v)}
					value={v3}
					loadOptions={getData}
				/>

				<MultiSelect
					icon={icons.emptyCircle}
					label='Select items'
					onChange={(v) => setV4(v)}
					value={v4}
					options={data}
				/>

				<AsyncMultiSelect
					icon={icons.emptyCircle}
					label='Select items'
					onChange={(v) => setV5(v)}
					value={v5}
					loadOptions={getData}
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					customDropdownArrow={CustomDropdownIndicator}
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					customMenuOption={CustomMenuOption}
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					clearable
					customClearIndicator={CustomClearIndicator}
				/>

				<Select
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV(v)}
					value={v}
					options={data}
					customValueDisplay={CustomValueDisplay}
				/>

				<MultiSelect
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV4(v)}
					value={v4}
					options={data}
					customValueRemove={CustomMultiValueRemoveButton}
				/>

				<MultiSelect
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV4(v)}
					value={v4}
					options={data}
					customValueDisplay={CustomMultiValueDisplay}
				/>
				<MultiSelect
					icon={icons.emptyCircle}
					label='Pick an item'
					onChange={(v) => setV6(v)}
					value={v6}
					options={data}
					customValueContainer={CustomMultiValueContainer}
				/>
			</div>
		</div>
	);
}

export default App;
