import { useState } from 'react';
import {
	Toggle,
	icons,
	AnimatedVisibility,
	Spacer,
	Expandable,
	Notice,
	LinkInput,
	TriggeredPopover,
	Button,
	MatrixAlign,
	Menu,
	MenuItem,
	MenuSection,
	MenuSeparator,
	SubMenuItem,
	Tooltip,
	NumberPicker,
	Responsive,
	BaseControl,
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
	ToggleButton,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	InputField,
	ComponentToggle,
	ListBox,
	ButtonGroup,
	Repeater,
	RepeaterItem,
	Checkbox,
	RadioButton,
	RadioButtonGroup,
	Slider,
} from '../lib';
import { classnames } from '../lib/utilities/classnames';

function App() {
	const [toggled, setToggled] = useState(false);
	const [linkTxt, setLinkTxt] = useState();
	const [matrixVal, setMatrixVal] = useState('center center');
	const [matrixVal2, setMatrixVal2] = useState('top left');
	const [menuThingy, setMenuThingy] = useState(false);
	const [menuThingy2, setMenuThingy2] = useState(false);
	const [num, setNum] = useState(0);
	const [animVis, setAnimVis] = useState(false);
	const [txt1, setTxt1] = useState('');
	const [txt2, setTxt2] = useState('');
	const [useComp, setUseComp] = useState(false);
	let [selectedKey, setSelectedKey] = useState('sans');
	let [loremIpsum, setLoremIpsum] = useState(0);
	let [radioValue, setRadioValue] = useState(null);

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

	const listBoxOpts = [
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
			disabled: true,
		},
	];

	const listBoxOpts2 = [
		{
			label: 'Sans',
			value: 'sans',
			icon: icons.emptyCircle,
			subtitle: 'Helvetica',
		},
		{
			label: 'Serif',
			value: 'serif',
			icon: icons.emptyCircle,
		},
		{
			label: 'Monospaced',
			value: 'mono',
			icon: icons.emptyCircle,
		},
	];

	const listBoxOpts3 = [
		{
			tooltip: 'Sans',
			value: 'sans',
			icon: icons.emptyCircle,
		},
		{
			tooltip: 'Serif',
			value: 'serif',
			icon: icons.emptyCircle,
		},
		{
			tooltip: 'Monospaced',
			value: 'mono',
			icon: icons.emptyCircle,
		},
	];

	const listBoxOpts4 = [
		{
			label: 'Sans',
			value: 'sans',
			icon: icons.emptyCircle,
		},
		{
			label: 'Serif',
			value: 'serif',
			icon: icons.emptyCircle,
		},
		{
			label: 'Monospaced',
			value: 'mono',
			icon: icons.emptyCircle,
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

		return [];
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
				<span className='es-uic-rounded-sm es-uic-border es-uic-border-dotted es-uic-border-sky-400 es-uic-p-2'>
					{props.children}
				</span>
			</RSSingleValue>
		);
	};

	const CustomMultiValueDisplay = (props) => {
		const colors = [
			'es-uic-bg-red-500',
			'es-uic-bg-blue-500',
			'es-uic-bg-green-500',
			'es-uic-bg-yellow-500',
			'es-uic-bg-slate-900',
		];
		const colorIndex =
			props.options.findIndex((option) => option.value === props.data.value) % colors.length;

		return (
			<RSMultiValue {...props}>
				<span
					className={`${colors[colorIndex]} es-uic-rounded es-uic-p-1 es-uic-font-medium es-uic-leading-none es-uic-text-white`}
				>
					{props.children}
				</span>
			</RSMultiValue>
		);
	};

	const CustomDropdownIndicator = (props) => {
		return (
			<RSDropdownIndicator {...props}>
				<span className='[&>svg]:es-uic-text-lime-500'>
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
	const [v7, setV7] = useState();

	const groupedOptions = [
		{
			label: 'Group 1',
			options: [
				{ label: 'Group 1, option 1', value: 'value_1' },
				{ label: 'Group 1, option 2', value: 'value_2' },
			],
		},
		{
			label: 'Group 2',
			options: [
				{ label: 'Group 2, option 1', value: 'value_12' },
				{ label: 'Group 2, option 2', value: 'value_22' },
			],
		},
		{
			label: 'Group 4',
			options: [
				{ label: 'Group 4, option 1', value: 'value_41' },
				{ label: 'Group 4, option 2', value: 'value_42' },
			],
		},
		{
			options: [
				{ label: 'Group 4, option 1', value: 'value_41' },
				{ label: 'Group 4, option 2', value: 'value_42' },
			],
		},
	];

	const repeaterDefaultItems = [
		{
			title: '',
		},
		{
			title: 'Abc',
		},
		{},
	];

	const [repeaterItems, setRepeaterItems] = useState(repeaterDefaultItems);

	const [sliderValue, setSliderValue] = useState(0);
	const [sliderValue2, setSliderValue2] = useState(0);
	const [rangeSliderValue, setRangeSliderValue] = useState([33, 66]);
	const [rangeSliderValue2, setRangeSliderValue2] = useState([33, 55, 66]);

	// return (
	// 	<div className='es-uic-mx-auto es-uic-flex es-uic-w-96 es-uic-flex-col es-uic-items-center es-uic-justify-center es-uic-gap-2.5 es-uic-p-10'></div>
	// );

	return (
		<div className='font-geist es-uic-flex es-uic-min-h-screen es-uic-items-center es-uic-justify-center es-uic-gap-4 es-uic-overscroll-contain es-uic-bg-neutral-100 es-uic-p-2'>
			<Tabs
				vertical
				className='es-uic-h-[90vh] es-uic-max-w-screen-sm es-uic-overflow-y-auto es-uic-rounded-lg es-uic-bg-white es-uic-shadow-sm'
			>
				<TabList className='es-uic-sticky es-uic-top-0 es-uic-self-start es-uic-border-r-0 es-uic-p-5'>
					<Tab>Toggle / Switch</Tab>
					<Tab>Spacer</Tab>
					<Tab>AnimatedVisibility</Tab>
					<Tab>Expandable</Tab>
					<Tab>LinkInput</Tab>
					<Tab>Notice</Tab>
					<Tab>TriggeredPopover</Tab>
					<Tab>Button</Tab>
					<Tab>MatrixAlign</Tab>
					<Tab>Menu</Tab>
					<Tab>Tooltip</Tab>
					<Tab>NumberPicker</Tab>
					<Tab>Responsive 2.0</Tab>
					<Tab>BaseControl</Tab>
					<Tab>Select</Tab>
					<Tab>Tabs</Tab>
					<Tab>InputField</Tab>
					<Tab>ComponentToggle</Tab>
					<Tab>ListBox</Tab>
					<Tab>Repeater</Tab>
					<Tab>Checkbox</Tab>
					<Tab>RadioButton</Tab>
					<Tab>Slider</Tab>
				</TabList>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Toggle
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Spacer
						size='s'
						className='es-uic-bg-violet-50'
						border
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<div className='es-uic-flex es-uic-min-h-56 es-uic-flex-col es-uic-gap-2 es-uic-rounded-md es-uic-border es-uic-border-dotted es-uic-border-gray-300 es-uic-p-2'>
						<ToggleButton
							className='mx-auto'
							checked={animVis}
							onChange={(v) => setAnimVis(v)}
						>
							Hidden thingy
						</ToggleButton>
						<AnimatedVisibility
							visible={animVis}
							noInitial
							transition='scaleFade'
						>
							<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-slate-200 es-uic-p-4'>
								Hi, I&apos;m content
							</div>
						</AnimatedVisibility>
					</div>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Expandable
						icon={icons.experiment}
						label='Lorem ipsum dolor'
						actions={
							<Button
								onClick={() => console.log('hi')}
								icon={icons.emptyRect}
								type='ghost'
							/>
						}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-200 es-uic-p-4'>
							lorem
						</div>
					</Expandable>

					<Expandable
						icon={icons.experiment}
						label='Lorem ipsum dolor'
						keepActionsOnExpand
						actions={
							<Button
								className='es-uic-flex es-uic-size-8 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border [&>svg]:es-uic-size-5.5'
								onClick={() => console.log('hi')}
								icon={icons.emptyRect}
								type='ghost'
							></Button>
						}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-200 es-uic-p-4'>
							lorem
						</div>
					</Expandable>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
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
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<TriggeredPopover className='es-uic-bg-purple-50 es-uic-p-5'>Hello</TriggeredPopover>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Button>Hello</Button>

					<div className='es-uic-flex es-uic-items-center es-uic-gap-2'>
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

					<div className='es-uic-flex es-uic-items-center es-uic-gap-2'>
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

					<div className='es-uic-flex es-uic-items-center es-uic-gap-2'>
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

					<ButtonGroup>
						<Button
							type={loremIpsum === 0 ? 'selected' : 'default'}
							onClick={() => setLoremIpsum(0)}
							icon={icons.small}
						/>
						<Button
							type={loremIpsum === 1 ? 'selected' : 'default'}
							onClick={() => setLoremIpsum(1)}
							icon={icons.medium}
						/>
						<Button
							type={loremIpsum === 2 ? 'selected' : 'default'}
							onClick={() => setLoremIpsum(2)}
							icon={icons.large}
						/>
					</ButtonGroup>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
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
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
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
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Tooltip
						text='Hello'
						doNotReplaceChild
					>
						Hover me
					</Tooltip>
					<Tooltip
						text='Hello'
						theme='light'
						doNotReplaceChild
					>
						Hover me
					</Tooltip>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
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
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Responsive
						icon={icons.emptyRect}
						label='Font family'
						value={resp}
						onChange={(newValue) => setResp(newValue)}
						options={respOpt}
						componentToRender={({ currentValue, handleChange }) => (
							<div className='es-uic-button-group es-uic-flex'>
								{respOpt.map((opt) => (
									<ToggleButton
										key={opt.value}
										onChange={() => handleChange(opt.value)}
										selected={currentValue === opt.value}
									>
										{opt.label}
									</ToggleButton>
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
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
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
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
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

					<Select
						onChange={(v) => setV7(v)}
						value={v7}
						options={groupedOptions}
						label='Groups'
						icon={icons.group}
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Tabs>
						<TabList></TabList>
						<TabPanel>Abc</TabPanel>
					</Tabs>

					<Tabs>
						<TabList>
							<Tab>Founding of Rome</Tab>
							<Tab>Monarchy and Republic</Tab>
							<Tab disabled>Empire</Tab>
						</TabList>
						<TabPanel>Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
						<TabPanel>Senatus Populusque Romanus.</TabPanel>
						<TabPanel>Alea jacta est.</TabPanel>
					</Tabs>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
					/>
					<InputField
						type='multiline'
						value={txt2}
						onChange={setTxt2}
						help={txt2?.length < 5 ? 'Nema dovoljno znakova?' : 'Iiiiima'}
						icon={icons.emptyRect}
						label='Lorem'
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<ComponentToggle
						icon={icons.paragraph}
						label='Paragraph'
						useComponent={useComp}
						onChange={setUseComp}
					>
						<div className='p-2 es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-bg-slate-200'>
							Lorem options
						</div>
					</ComponentToggle>

					<ComponentToggle
						icon={icons.heading}
						label='Heading'
						useComponent={useComp}
						onChange={setUseComp}
						noUseToggle
					>
						<div className='p-2 es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-bg-slate-200'>
							Lorem options no use
						</div>
					</ComponentToggle>

					<ComponentToggle
						icon={icons.image}
						label='Image'
						useComponent={useComp}
						onChange={setUseComp}
						expandButtonDisabled
					>
						<div className='bg-slate-200 es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-p-2'>
							Lorem options expandButtonDisabled
						</div>
					</ComponentToggle>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<ListBox
						icon={icons.emptyRect}
						label='Font family'
						options={listBoxOpts}
						value={selectedKey}
						onChange={(key) => setSelectedKey(key)}
						orientation='vertical'
					/>

					<ListBox
						icon={icons.emptyRect}
						label='Font family'
						options={listBoxOpts2}
						value={selectedKey}
						onChange={(key) => setSelectedKey(key)}
					/>

					<ListBox
						icon={icons.emptyRect}
						label='Font family'
						options={listBoxOpts3}
						value={selectedKey}
						onChange={(key) => setSelectedKey(key)}
					/>

					<ListBox
						icon={icons.emptyRect}
						label='Font family'
						options={listBoxOpts4}
						value={selectedKey}
						onChange={(key) => setSelectedKey(key)}
						orientation='horizontal-tiles'
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Repeater
						items={repeaterItems}
						onChange={setRepeaterItems}
						itemLabelProp='title'
						label='Hello'
						addDefaultItem={{
							title: 'Hello',
						}}
						onAfterItemAdd={(item) => console.log('Added', item)}
						onAfterItemRemove={(items) => console.log('Removed', items)}
					>
						{(item) => {
							const { title, subtitle, toggledThingy, link, updateData } = item;

							return (
								<RepeaterItem
									label={title ?? 'New item'}
									icon={icons.emptyCircle}
									className={classnames(!title && '!es-uic-text-gray-400')}
								>
									<InputField
										label='Title'
										type='text'
										value={title}
										onChange={(value) => updateData({ title: value })}
									/>
									<InputField
										label='Subtitle'
										type='multiline'
										value={subtitle}
										onChange={(value) => updateData({ subtitle: value })}
									/>

									<Toggle
										icon={icons.emptyCircle}
										label='Toggle something'
										checked={toggledThingy}
										onChange={(value) => updateData({ toggledThingy: value })}
									/>

									<LinkInput
										url={link}
										help='Help, not sure how to input this'
										onChange={({ url }) => updateData({ link: url })}
										fetchSuggestions={getLinkData}
									/>
								</RepeaterItem>
							);
						}}
					</Repeater>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello'
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello'
						subtitle='Lorem ipsum dolor'
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello'
						subtitle='Lorem ipsum dolor'
						icon={icons.experiment}
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello'
						subtitle='Lorem ipsum dolor'
						alignEnd
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						indeterminate
					>
						Hello
					</Checkbox>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<RadioButtonGroup
						label='Hello'
						value={radioValue}
						onChange={setRadioValue}
					>
						<RadioButton
							label='Lorem'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyCircle}
							value='lorem'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyCircle}
							value='ipsum'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyCircle}
							value='dolor'
						/>
					</RadioButtonGroup>

					<RadioButtonGroup
						label='Hello'
						value={radioValue}
						orientation='horizontal'
						onChange={setRadioValue}
					>
						<RadioButton
							label='Lorem'
							subtitle='Ips value'
							value='lorem'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ips value'
							value='ipsum'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ips value'
							value='dolor'
						/>
					</RadioButtonGroup>

					<RadioButtonGroup
						label='Hello'
						value={radioValue}
						onChange={setRadioValue}
						design='segmented'
					>
						<RadioButton
							label='Lorem'
							subtitle='Ips value'
							value='lorem'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ips value'
							value='ipsum'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ips value'
							value='dolor'
						/>
					</RadioButtonGroup>

					<RadioButtonGroup
						label='Hello'
						value={radioValue}
						orientation='horizontal'
						onChange={setRadioValue}
						design='segmented'
					>
						<RadioButton
							label='Lorem'
							subtitle='Ips value'
							value='lorem'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ips value'
							value='ipsum'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ips value'
							value='dolor'
						/>
					</RadioButtonGroup>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-space-y-4 !es-uic-p-5'>
					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						step={11}
						markers
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						step={25}
						markers='dots'
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						step={33}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						markers
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						markers={{
							0: 'nula',
							25: '',
							50: 'fifty',
							75: '',
							100: 'fullmax',
						}}
						startPoint={50}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						markers={{
							0: 'nula',
							25: '',
							50: 'fifty',
							75: '',
							100: 'fullmax',
						}}
						startPoint={50}
						noActiveHighlight
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						markers={{
							0: <span className='es-uic-text-red-500'>R</span>,
							50: <span className='es-uic-text-green-500'>G</span>,
							100: <span className='es-uic-text-blue-500'>B</span>,
						}}
						startPoint={50}
						noActiveHighlight
						trackStyle={{
							backgroundImage:
								'linear-gradient(to right in oklab, #ff000060, #00ff0060, #0000ff60)',
						}}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue2}
						onChange={setSliderValue2}
						min={-40}
						max={60}
						step={10}
						markers
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue2}
						onChange={setSliderValue2}
						min={-40}
						max={60}
						step={10}
						markers={{
							0: 'nula',
							'-40': 'isklj.',
							60: 'uklj.',
						}}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={setRangeSliderValue}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						before={icons.emptyCircle}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						after={icons.emptyCircle}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						before={icons.emptyCircle}
						after={icons.emptyCircle}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={setRangeSliderValue}
						disabled
					/>

					<Slider
						icon={icons.emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={setRangeSliderValue}
						inputField
						max={100}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Range slider'
						value={rangeSliderValue2}
						onChange={setRangeSliderValue2}
						max={100}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						vertical
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						vertical
						startPoint={50}
						markers={{
							0: 'nula',
							50: 'fifty',
							100: 'fullmax',
						}}
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						vertical
						markers
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						before={icons.emptyCircle}
						after={icons.emptyCircle}
						vertical
					/>

					<Slider
						icon={icons.emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={setSliderValue}
						before={icons.emptyCircle}
						after={icons.emptyCircle}
						inputField
					/>

					<Slider
						icon={icons.emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={setRangeSliderValue}
						vertical
					/>

					<Slider
						icon={icons.emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={setRangeSliderValue}
						vertical
						markers
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default App;
