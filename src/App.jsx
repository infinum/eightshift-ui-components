import { useState } from 'react';
import {
	Toggle,
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
	SolidColorPicker,
	GradientEditor,
	ColorSwatch,
	ColorPicker,
	DecorativeTooltip,
	ResponsiveLegacy,
	Switch,
	ColumnConfigSlider,
	ContainerPanel,
	HStack,
	VStack,
	ImagePlaceholder,
	FilePlaceholder,
	MediaPlaceholder,
	OptionSelect,
	DraggableList,
	DraggableListItem,
	RichLabel,
	OptionsPanel,
	OptionsPanelSection,
	ResponsivePreview,
	Modal,
	Draggable,
	DraggableHandle,
	ItemCollection,
} from '../lib';
import { icons } from '../lib/icons';
import { clsx } from 'clsx/lite';
import '../lib/fonts/fonts.css';

function App() {
	const [toggled, setToggled] = useState(false);
	const [toggled2, setToggled2] = useState(null);
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

	let [sinSel, setSinSel] = useState(null);
	let [sinSelSimple, setSinSelSimple] = useState(null);
	let [mulSel, setMulSel] = useState([]);
	let [mulSelSimple, setMulSelSimple] = useState([]);
	let [sinASel, setSinASel] = useState(null);
	let [mulASel, setMulASel] = useState([]);

	let [imgUrl, setImgUrl] = useState(null);

	const [resp, setResp] = useState({
		_default: 'sans',
		_desktopFirst: false,
	});

	const [resp2, setResp2] = useState({
		_default: 'sans',
		_desktopFirst: false,
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
			icon: icons.num1Square,
			subtitle: 'Helvetica',
		},
		{
			label: 'Serif',
			value: 'serif',
			icon: icons.num2Square,
		},
		{
			label: 'Monospaced',
			value: 'mono',
			icon: icons.num3Square,
		},
	];

	const listBoxOpts4 = [
		{
			label: 'Sans',
			value: 'sans',
			icon: icons.num1Square,
		},
		{
			label: 'Serif',
			value: 'serif',
			icon: icons.num2Square,
		},
		{
			label: 'Monospaced',
			value: 'mono',
			icon: icons.num3Square,
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

	const getLinkData = async (searchTerm) => {
		if (!searchTerm) {
			return linkData;
		}

		const filtered = linkData.filter(
			({ label, value }) => label.toLowerCase().includes(searchTerm.toLowerCase().trim()) || value.toLowerCase().includes(searchTerm.toLowerCase().trim()),
		);

		await new Promise((resolve) => setTimeout(resolve, 500));

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
				<span className='es-uic-rounded-sm es-uic-border es-uic-border-dotted es-uic-border-sky-400 es-uic-p-2'>{props.children}</span>
			</RSSingleValue>
		);
	};

	const CustomMultiValueDisplay = (props) => {
		const colors = ['es-uic-bg-red-500', 'es-uic-bg-blue-500', 'es-uic-bg-green-500', 'es-uic-bg-yellow-500', 'es-uic-bg-slate-900'];
		const colorIndex = props.options.findIndex((option) => option.value === props.data.value) % colors.length;

		return (
			<RSMultiValue {...props}>
				<span className={`${colors[colorIndex]} es-uic-rounded es-uic-p-1 es-uic-font-medium es-uic-leading-none es-uic-text-white`}>{props.children}</span>
			</RSMultiValue>
		);
	};

	const CustomDropdownIndicator = (props) => {
		return (
			<RSDropdownIndicator {...props}>
				<span className='[&>svg]:es-uic-text-lime-500'>{props.selectProps.menuIsOpen ? icons.arrowUpSquareAlt : icons.arrowDownSquareAlt}</span>
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
		return <RSClearIndicator {...props}>{icons.errorCircleFill}</RSClearIndicator>;
	};

	const [v, setV] = useState();
	const [v3, setV3] = useState();
	const [v4, setV4] = useState([]);
	const [v5, setV5] = useState([]);
	const [v6, setV6] = useState([]);
	const [v7, setV7] = useState();

	const [cpOpen, setCpOpen] = useState(false);

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
			id: 'prvi',
			title: 'Item 1',
			icon: icons.num1Square,
		},
		{
			id: 'drugi',
			title: 'Item 2',
			icon: icons.num2Circle,
		},
		{
			id: 'treci',
			title: 'Item 3',
			icon: icons.num3SquareAlt,
		},
	];

	const repeaterDefaultItems2 = [
		{
			id: 'prvi',
			title: 'Item 1',
			icon: icons.num1Square,
		},
		{
			id: 'drugi',
			title: 'Item 2',
			subtitle: 'Lorem',
			icon: icons.num2Circle,
		},
		{
			id: 'treci',
			title: 'Item 3',
			icon: icons.num3SquareAlt,
		},
	];

	const draggableListDefaultItems = [
		{
			toggle: false,
			title: 'Item 1',
			icon: icons.num1Circle,
		},
		{
			toggle: true,
			title: 'Item 2',
			icon: icons.num2Circle,
		},
		{
			toggle: true,
			icon: icons.num3Circle,
		},
	];

	const draggableDefaultItems = [
		{
			toggle: false,
			title: 'Item 1',
		},
		{
			toggle: true,
			title: 'Item 2',
		},
		{
			toggle: true,
		},
		{
			toggle: true,
			title: 'Item 4 lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
		},
		{
			toggle: true,
			title: 'Item 5',
		},
	];

	const [repeaterItems, setRepeaterItems] = useState(repeaterDefaultItems);
	const [repeaterItems2, setRepeaterItems2] = useState(repeaterDefaultItems2);
	const [draggableListItems, setDraggableListItems] = useState(draggableListDefaultItems);
	const [draggableListItems2, setDraggableListItems2] = useState(draggableListDefaultItems);
	const [draggableItems, setDraggableItems] = useState(draggableDefaultItems);

	const [sliderValue, setSliderValue] = useState(0);
	const [sliderValue2, setSliderValue2] = useState(0);
	const [rangeSliderValue, setRangeSliderValue] = useState([33, 66]);
	const [rangeSliderValue2, setRangeSliderValue2] = useState([33, 55, 66]);

	let [currColor, setCurrColor] = useState('#0D3636');
	let [currColor2, setCurrColor2] = useState('#0D3636');
	let [currColor3, setCurrColor3] = useState('hsla(180, 61.19%, 13.14%, 1)');
	let [grad, setGrad] = useState('linear-gradient(30deg, #000, #00000000)');

	const defaultColors = [
		{
			name: 'Red',
			slug: 'red',
			color: '#FF0000',
		},
		{
			name: 'Green',
			slug: 'green',
			color: '#00FF00',
		},
		{
			name: 'Blue',
			slug: 'blue',
			color: '#0000FF',
		},
		{
			name: 'Yellow',
			slug: 'yellow',
			color: '#FFFF00',
		},
		{
			name: 'Black',
			slug: 'black',
			color: '#000000',
		},
		{
			name: 'White',
			slug: 'white',
			color: '#FFFFFF',
		},
	];

	const groupedColors = [
		{
			name: 'Red 50',
			slug: 'red-50',
			color: '#fef2f2',
		},
		{
			name: 'Red 100',
			slug: 'red-100',
			color: '#fee2e2',
		},
		{
			name: 'Red 200',
			slug: 'red-200',
			color: '#fecaca',
		},
		{
			name: 'Red 300',
			slug: 'red-300',
			color: '#fecaca',
		},
		{
			name: 'Red 400',
			slug: 'red-400',
			color: '#f87171',
		},
		{
			name: 'Red 500',
			slug: 'red-500',
			color: '#ef4444',
		},
		{
			name: 'Red 600',
			slug: 'red-600',
			color: '#dc2626',
		},
		{
			name: 'Red 700',
			slug: 'red-700',
			color: '#b91c1c',
		},
		{
			name: 'Red 800',
			slug: 'red-800',
			color: '#991b1b',
		},
		{
			name: 'Red 900',
			slug: 'red-900',
			color: '#7f1d1d',
		},
		{
			name: 'Red 950',
			slug: 'red-950',
			color: '#450a0a',
		},
		{
			name: 'Blue 100',
			slug: 'blue100',
			color: '#dbeafe',
		},
		{
			name: 'Blue 500',
			slug: 'blue500',
			color: '#3b82f6',
		},
		{
			name: 'Blue 700',
			slug: 'blue700',
			color: '#1d4ed8',
		},
		{
			name: 'Green 500',
			slug: 'green-500',
			color: '#22c55e',
		},
		{
			name: 'Black',
			slug: 'black',
			color: '#000000',
		},
		{
			name: 'White',
			slug: 'white',
			color: '#FFFFFF',
		},
	];

	const [color1, setColor1] = useState();
	const [color3, setColor3] = useState('blue');
	const [color2, setColor2] = useState('blue500');

	const respOptions = [
		{ label: 'Lorem', value: false },
		{ label: 'Ipsum', value: true },
	];

	const [responsiveState, setResponsiveState] = useState({
		myAttrLarge: false,
		myAttrDesktop: undefined,
		myAttrTablet: undefined,
		myAttrMobile: true,
	});

	const [responsiveState2, setResponsiveState2] = useState({
		myAttrLarge: false,
		myAttrDesktop: undefined,
		myAttrTablet: undefined,
		myAttrMobile: true,
	});

	const [responsiveState3, setResponsiveState3] = useState({
		myAttrLarge: false,
		myAttrDesktop: '',
		myAttrTablet: '',
		myAttrMobile: true,
	});

	const responsiveAttr = {
		large: 'myAttrLarge',
		desktop: 'myAttrDesktop',
		tablet: 'myAttrTablet',
		mobile: 'myAttrMobile',
	};

	const globalManifest = {
		globalVariables: {
			breakpoints: {
				mobile: 480,
				tablet: 960,
				desktop: 1440,
				large: 1920,
			},
		},
	};

	const globalManifest2 = {
		globalVariables: {
			breakpoints: {
				sm: 480,
				md: 960,
				lg: 1440,
				xl: 1920,
			},
		},
	};

	const [colConfig, setColConfig] = useState([2, 4]);
	const [colConfig2, setColConfig2] = useState([2, 4]);
	const [colConfig3, setColConfig3] = useState([2, 4]);
	const [colConfig4, setColConfig4] = useState([2, 4]);
	const [colConfig5, setColConfig5] = useState([2, 4]);

	return (
		<div className='font-geist es-uic-flex es-uic-min-h-screen es-uic-flex-col es-uic-items-center es-uic-justify-center es-uic-overscroll-contain es-uic-bg-neutral-100 es-uic-p-2'>
			<div className='es-uic-mx-auto es-uic-flex es-uic-w-96 es-uic-flex-col es-uic-items-center es-uic-justify-center es-uic-gap-2.5 es-uic-p-10 empty:es-uic-hidden'></div>

			<Tabs
				vertical
				className='es-uic-h-[90vh] es-uic-w-fit es-uic-overflow-y-auto es-uic-rounded-lg es-uic-bg-white es-uic-shadow-sm'
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
					<Tab>SolidColorPicker</Tab>
					<Tab>GradientEditor</Tab>
					<Tab>ColorSwatch</Tab>
					<Tab>ColorPicker</Tab>
					<Tab>ResponsiveLegacy</Tab>
					<Tab>ColumnConfigSlider</Tab>
					<Tab>ContainerPanel</Tab>
					<Tab>Layout components</Tab>
					<Tab>ImagePlaceholder / MediaPlaceholder / FilePlaceholder</Tab>
					<Tab>Draggable</Tab>
					<Tab>DraggableList</Tab>
					<Tab>OptionsPanel</Tab>
					<Tab>ResponsivePreview</Tab>
					<Tab>Modal</Tab>
					<Tab>ItemCollection</Tab>
				</TabList>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Toggle
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
					/>

					<Switch
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
					/>

					<Switch
						checked={toggled2}
						onChange={(value) => setToggled2(value)}
						icon={icons.experiment}
						label='Airplane mode'
						isIndeterminate={toggled2 === null}
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Spacer
						size='s'
						className='es-uic-bg-violet-50'
						border
					/>

					<Spacer border />

					<Spacer icon={icons.componentGeneric} />
					<Spacer
						icon={icons.componentGeneric}
						text='My divider'
					/>
					<Spacer
						icon={icons.componentGeneric}
						text='My divider'
						subtitle='Lorem ipsum'
					/>

					<Spacer
						icon={icons.componentGeneric}
						border
					/>
					<Spacer
						icon={icons.componentGeneric}
						text='My divider'
						border
					/>
					<Spacer
						icon={icons.componentGeneric}
						text='My divider'
						subtitle='Lorem ipsum'
						border
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
							<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-slate-200 es-uic-p-4'>Hi, I&apos;m content</div>
						</AnimatedVisibility>
					</div>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-200 es-uic-p-4'>lorem</div>
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
							/>
						}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-200 es-uic-p-4'>lorem</div>
					</Expandable>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
					/>

					<pre>{JSON.stringify(linkTxt)}</pre>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<TriggeredPopover className='es-uic-bg-purple-50 es-uic-p-5'>Hello</TriggeredPopover>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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

					<OptionSelect
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ tooltip: 'Small', value: 0, icon: icons.small },
							{ tooltip: 'Medium', value: 1, icon: icons.medium },
							{ tooltip: 'Large', value: 2, icon: icons.large },
						]}
						vertical
					/>

					<OptionSelect
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						vertical
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						tooltip='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						noTriggerIcon
						tooltip='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						noTriggerLabel
						tooltip='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						label='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						noTriggerIcon
						label='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						noTriggerLabel
						label='Size'
					/>

					<OptionSelect
						type='menu'
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						noTriggerLabel
						label='Not set demo'
					/>

					<OptionSelect
						type='menu'
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						noTriggerIcon
						label='Not set demo'
					/>
					<OptionSelect
						type='menu'
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						label='Not set demo'
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-flex es-uic-flex-col es-uic-items-center es-uic-space-y-4 !es-uic-p-5'>
					<DecorativeTooltip text='Hello'>Hover me</DecorativeTooltip>
					<DecorativeTooltip
						text='Hello'
						theme='light'
					>
						Hover me
					</DecorativeTooltip>

					<Tooltip text='Hi, I am a tooltip'>
						<Button>Hover me</Button>
					</Tooltip>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Responsive
						icon={icons.emptyRect}
						label='Font family'
						value={resp}
						onChange={setResp}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					>
						{({ currentValue, handleChange, options }) => (
							<OptionSelect
								options={options}
								onChange={(value) => handleChange(value)}
								value={currentValue}
							/>
						)}
					</Responsive>

					<Responsive
						icon={icons.emptyRect}
						label='Font family'
						value={resp}
						onChange={setResp}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
						inline
					>
						{({ currentValue, handleChange, options, isInlineCollapsedView }) => (
							<OptionSelect
								options={options}
								onChange={(value) => handleChange(value)}
								value={currentValue}
								type={isInlineCollapsedView ? 'menu' : 'toggleButtons'}
							/>
						)}
					</Responsive>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(resp, null, 2)}</pre>

					<Spacer border />

					<Responsive
						icon={icons.emptyRect}
						label='Font family'
						value={resp2}
						onChange={setResp2}
						options={respOpt}
						breakpoints={['sm', 'md', 'lg', 'xl']}
						breakpointData={globalManifest2.globalVariables.breakpoints}
						breakpointUiData={{
							sm: { label: 'Mobile', icon: icons.screenMobile },
							md: { label: 'Tablet', icon: icons.screenTablet },
							lg: { label: 'Desktop', icon: icons.screenDesktop },
							xl: { label: 'Large', icon: icons.screenLarge },
						}}
					>
						{({ currentValue, handleChange, options }) => (
							<OptionSelect
								options={options}
								onChange={(value) => handleChange(value)}
								value={currentValue}
							/>
						)}
					</Responsive>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(resp2, null, 2)}</pre>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Select
						label='Single basic'
						value={sinSel}
						onChange={setSinSel}
						options={data}
					/>
					<pre>{JSON.stringify(sinSel, null, 2)}</pre>
					<Select
						label='Single basic - simpleValue'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
					/>
					<pre>{JSON.stringify(sinSelSimple, null, 2)}</pre>
					<MultiSelect
						label='Multi basic'
						value={mulSel}
						onChange={setMulSel}
						options={data}
					/>
					<pre>{JSON.stringify(mulSel, null, 2)}</pre>
					<MultiSelect
						label='Multi basic - simpleValue'
						value={mulSelSimple}
						onChange={setMulSelSimple}
						options={data}
						simpleValue
					/>
					<pre>{JSON.stringify(mulSelSimple, null, 2)}</pre>
					<AsyncSelect
						label='Single async'
						value={sinASel}
						onChange={setSinASel}
						loadOptions={getData}
					/>
					<pre>{JSON.stringify(sinASel, null, 2)}</pre>
					<AsyncMultiSelect
						label='Multi async'
						value={mulASel}
						onChange={setMulASel}
						loadOptions={getData}
					/>
					<pre>{JSON.stringify(mulASel, null, 2)}</pre>
					<Spacer border />
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Tabs>
						<TabList />
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
					/>

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						type='password'
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ComponentToggle
						icon={icons.paragraph}
						label='Paragraph'
						useComponent={useComp}
						onChange={setUseComp}
					>
						<div className='p-2 es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-bg-slate-200'>
							Lorem options
							<Button>Hello</Button>
							<InputField label='Hi' />
						</div>
					</ComponentToggle>

					<ComponentToggle
						icon={icons.heading}
						label='Heading'
						useComponent={useComp}
						onChange={setUseComp}
						noUseToggle
					>
						<div className='es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-bg-slate-200 es-uic-p-2'>
							Lorem options no use
							<Button>Hello</Button>
							<InputField label='Hi' />
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
							<Button>Hello</Button>
							<InputField label='Hi' />
						</div>
					</ComponentToggle>

					<ComponentToggle
						icon={icons.video}
						label='Video'
						useComponent={useComp}
						onChange={setUseComp}
						noExpandButton
					>
						<div className='bg-slate-200 es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-p-2'>
							Lorem options noExpandButton
							<Button>Hello</Button>
							<InputField label='Hi' />
						</div>
					</ComponentToggle>

					<ComponentToggle
						icon={icons.componentGeneric}
						label='Generic'
						useComponent={useComp}
						onChange={setUseComp}
						noExpandButton
						noUseToggle
					>
						<div className='bg-slate-200 es-uic-min-h-24 es-uic-w-full es-uic-rounded-md es-uic-p-2'>
							Lorem options noExpandButton noUseToggle
							<Button>Hello</Button>
							<InputField label='Hi' />
						</div>
					</ComponentToggle>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
						options={listBoxOpts4}
						value={selectedKey}
						onChange={(key) => setSelectedKey(key)}
						orientation='horizontal-tiles'
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
									className={clsx(!title && '!es-uic-text-gray-400')}
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

					<Repeater
						items={repeaterItems2}
						onChange={setRepeaterItems2}
						itemLabelProp='title'
						icon={icons.magicAlt}
						label='Other repeater'
						addDefaultItem={{
							title: 'Hello',
						}}
						onAfterItemAdd={(item) => console.log('Added', item)}
						onAfterItemRemove={(items) => console.log('Removed', items)}
					>
						{(item) => {
							const { title, subtitle, icon, toggledThingy, link, updateData, itemIndex } = item;

							return (
								<RepeaterItem
									label={title ?? 'New item'}
									className={clsx(!title && '!es-uic-text-gray-400')}
									subtitle={subtitle}
									icon={icon}
								>
									<InputField
										label='Title'
										type='text'
										value={title}
										onChange={(value) => updateData({ title: value })}
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

									<InputField
										label='Subtitle'
										type='multiline'
										value={subtitle}
										onChange={(value) => updateData({ subtitle: value })}
									/>
								</RepeaterItem>
							);
						}}
					</Repeater>

					<Spacer border />

					{repeaterItems.map((item, index) => (
						<InputField
							label={`Title ${index}`}
							key={index}
							value={item.title}
							onChange={(value) => {
								const newItems = [...repeaterItems];
								newItems[index].title = value;

								setRepeaterItems(newItems);
							}}
						/>
					))}

					<Spacer border />

					<pre>
						{JSON.stringify(
							repeaterItems.map((i) => ({ ...i, icon: undefined })),
							null,
							2,
						)}
					</pre>

					<Spacer border />

					<pre>
						{JSON.stringify(
							repeaterItems2.map((i) => ({ ...i, icon: undefined })),
							null,
							2,
						)}
					</pre>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<RadioButtonGroup
						label='Hello'
						value={radioValue}
						onChange={setRadioValue}
					>
						<RadioButton
							label='Lorem'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyRect}
							value='lorem1'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyRect}
							value='ipsum1'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyRect}
							value='dolor1'
						/>
					</RadioButtonGroup>

					<RadioButtonGroup
						label='Hello'
						value={radioValue}
						onChange={setRadioValue}
					>
						<RadioButton
							label='Lorem'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyRect}
							value='lorem1'
							alignEnd
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyRect}
							value='ipsum1'
							alignEnd
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ipsum value dolor sit amet'
							icon={icons.emptyRect}
							value='dolor1'
							alignEnd
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
							value='lorem2'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ips value'
							value='ipsum2'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ips value'
							value='dolor2'
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
							value='lorem3'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ips value'
							value='ipsum3'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ips value'
							value='dolor3'
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
							value='lorem4'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ips value'
							value='ipsum4'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ips value'
							value='dolor4'
						/>
					</RadioButtonGroup>

					<OptionSelect
						type='radios'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0 },
							{ label: 'Medium', value: 1 },
							{ label: 'Large', value: 2 },
						]}
					/>

					<OptionSelect
						type='radiosSegmented'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
						vertical
						itemProps={{ alignEnd: true }}
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
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
							backgroundImage: 'linear-gradient(to right in oklab, #ff000060, #00ff0060, #0000ff60)',
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
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<SolidColorPicker
						value={currColor}
						onChange={setCurrColor}
					/>

					<code className='es-uic-flex es-uic-min-h-9 es-uic-min-w-24 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-bg-gray-100 es-uic-p-1 es-uic-text-sm'>
						{currColor}
					</code>

					<SolidColorPicker
						value={currColor2}
						onChange={setCurrColor2}
						allowTransparency
					/>

					<code className='es-uic-flex es-uic-min-h-9 es-uic-min-w-24 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-bg-gray-100 es-uic-p-1 es-uic-text-sm'>
						{currColor2}
					</code>

					<SolidColorPicker
						value={currColor3}
						onChange={setCurrColor3}
						allowTransparency
						outputFormat='hsla'
					/>

					<code className='es-uic-flex es-uic-min-h-9 es-uic-min-w-24 es-uic-items-center es-uic-justify-center es-uic-rounded es-uic-border es-uic-bg-gray-100 es-uic-p-1 es-uic-text-sm'>
						{currColor3}
					</code>

					<SolidColorPicker
						value={currColor3}
						onChange={setCurrColor3}
						allowTransparency
						disabled
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<GradientEditor
						value={grad}
						onChange={setGrad}
					/>

					<code className='es-uic-max-w-60 es-uic-rounded-md es-uic-border es-uic-bg-gray-50 es-uic-p-1 es-uic-font-mono es-uic-text-xs'>{grad}</code>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ColorSwatch color='red' />
					<ColorSwatch color='transparent' />
					<ColorSwatch color='#4433EE80' />
					<ColorSwatch color='#0D3636' />
					<ColorSwatch
						gradient='linear-gradient(#0D3636, rgb(249 250 251))'
						colorName='Linear gradient'
					/>
					<ColorSwatch
						gradient='radial-gradient(#0D3636, rgb(249 250 251))'
						colorName='Radial gradient'
					/>
					<ColorSwatch
						gradient='conic-gradient(#0D3636, rgb(249 250 251))'
						colorName='Conic gradient'
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ColorPicker
						value={color1}
						onChange={setColor1}
						colors={defaultColors}
						clearable
					/>

					<ColorPicker
						value={color3}
						onChange={setColor3}
						colors={defaultColors}
					/>

					<ColorPicker
						value={color2}
						onChange={setColor2}
						colors={groupedColors}
						type='fillColor'
					/>

					<ColorPicker
						value={color2}
						onChange={setColor2}
						colors={groupedColors}
						type='textColor'
					/>

					<ColorPicker
						value={color2}
						onChange={setColor2}
						colors={groupedColors}
						type='textHighlightColor'
					/>

					<ColorPicker
						value={color2}
						onChange={setColor2}
						colors={groupedColors}
						type='listMarkerColor'
					/>

					<ColorPicker
						icon={icons.color}
						label='Color'
						value={color2}
						onChange={setColor2}
						colors={groupedColors}
						noColorGroups
						showColorCode
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ResponsiveLegacy
						icon={icons.help}
						label='Lorem or ipsum?'
						attribute={responsiveAttr}
						value={responsiveState}
						onChange={(attrName, newVal) => {
							setResponsiveState({
								...responsiveState,
								[attrName]: newVal,
							});
						}}
						options={respOptions}
						breakpointData={globalManifest.globalVariables.breakpoints}
						allowUndefined
					>
						{({ currentValue, options, handleChange }) => (
							<ButtonGroup>
								{options.map(({ label, value }) => (
									<ToggleButton
										key={value}
										onChange={() => handleChange(value)}
										selected={currentValue === value}
									>
										{label}
									</ToggleButton>
								))}
							</ButtonGroup>
						)}
					</ResponsiveLegacy>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(responsiveState, null, 2)}</pre>

					<ResponsiveLegacy
						icon={icons.help}
						label='Lorem or ipsum?'
						attribute={responsiveAttr}
						value={responsiveState2}
						onChange={(attrName, newVal) => {
							setResponsiveState2({
								...responsiveState2,
								[attrName]: newVal,
							});
						}}
						options={respOptions}
						breakpointData={globalManifest.globalVariables.breakpoints}
						allowUndefined
						inline
					>
						{({ currentValue, options, handleChange, isInlineCollapsedView }) => {
							if (isInlineCollapsedView) {
								return (
									<Switch
										checked={currentValue}
										onChange={(v) => handleChange(v)}
									/>
								);
							}

							return (
								<ButtonGroup>
									{options.map(({ label, value }) => (
										<ToggleButton
											key={value}
											onChange={() => handleChange(value)}
											selected={currentValue === value}
										>
											{label}
										</ToggleButton>
									))}
								</ButtonGroup>
							);
						}}
					</ResponsiveLegacy>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(responsiveState2, null, 2)}</pre>

					<ResponsiveLegacy
						icon={icons.help}
						label='Lorem or ipsum?'
						attribute={responsiveAttr}
						value={responsiveState3}
						onChange={(attrName, newVal) => {
							setResponsiveState3({
								...responsiveState3,
								[attrName]: newVal,
							});
						}}
						options={respOptions}
						breakpointData={globalManifest.globalVariables.breakpoints}
						inline
					>
						{({ currentValue, options, handleChange }) => (
							<ButtonGroup>
								{options.map(({ label, value }) => (
									<ToggleButton
										key={value}
										onChange={() => handleChange(value)}
										selected={currentValue === value}
									>
										{label}
									</ToggleButton>
								))}
							</ButtonGroup>
						)}
					</ResponsiveLegacy>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(responsiveState3, null, 2)}</pre>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig}
						onChange={setColConfig}
					/>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(colConfig)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig2}
						onChange={setColConfig2}
						columns={14}
					/>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig3}
						onChange={setColConfig3}
						columns={14}
						showOuterAsGutter
					/>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig4}
						onChange={setColConfig4}
						disableOffset
					/>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disableWidth
					/>

					<pre className='es-uic-w-full es-uic-text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disableWidth
						disableOffset
					/>
				</TabPanel>

				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-0 !es-uic-p-5'>
					<ContainerPanel>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
					</ContainerPanel>

					<ContainerPanel title='Component name'>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						icon={icons.emptyCircle}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
					</ContainerPanel>

					<ContainerPanel>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<ContainerPanel title='Component name'>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-400' />
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<Checkbox
						checked={cpOpen}
						onChange={setCpOpen}
						label='Use'
					/>

					<ContainerPanel use={cpOpen}>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Demo'
						use={cpOpen}
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Demo'
						use={cpOpen}
						closable
					>
						<div className='es-uic-h-40 es-uic-w-full es-uic-rounded-md es-uic-bg-gray-300' />
					</ContainerPanel>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<HStack className='es-uic-max-w-72'>
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
					</HStack>

					<HStack
						noWrap
						className='es-uic-max-w-72'
					>
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
					</HStack>

					<VStack className='es-uic-max-h-40'>
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
					</VStack>

					<VStack
						noWrap
						className='es-uic-max-h-40'
					>
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
						<Button icon={icons.emptyCircle} />
					</VStack>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ImagePlaceholder />
					<ImagePlaceholder url='https://picsum.photos/200' />

					<Spacer border />

					<HStack>
						<Button
							size='small'
							onPress={() => setImgUrl('https://picsum.photos/200')}
							disabled={imgUrl !== null}
						>
							Set URL
						</Button>
						<Button
							size='small'
							onPress={() => setImgUrl(null)}
							disabled={imgUrl === null}
						>
							Unset URL
						</Button>
					</HStack>
					<ImagePlaceholder url={imgUrl} />

					<Spacer />
					<Spacer border />
					<Spacer />

					<FilePlaceholder
						fileName='demo.json'
						icon={icons.experiment}
					/>

					<Spacer />
					<Spacer border />
					<Spacer />

					<MediaPlaceholder icon={icons.experiment} />

					<MediaPlaceholder
						icon={icons.experiment}
						size='large'
					/>

					<MediaPlaceholder
						icon={icons.experiment}
						style='simple'
					/>

					<MediaPlaceholder
						icon={icons.experiment}
						style='simple'
						size='large'
					/>

					<MediaPlaceholder
						icon={icons.experiment}
						style='simple'
						size='large'
						helpText='Lorem ipsum dolor.'
					/>
					<MediaPlaceholder
						icon={icons.experiment}
						style='simple'
						size='large'
						helpText={
							<RichLabel
								icon={icons.a11yWarning}
								label='Lorem ipsum dolor.'
							/>
						}
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Draggable
						items={draggableItems}
						onChange={setDraggableItems}
						className='es-uic-grid es-uic-auto-rows-auto es-uic-grid-cols-3 es-uic-gap-1'
					>
						{(item) => {
							const { toggle, title, updateData } = item;

							return (
								<div className='es-uic-relative es-uic-size-full es-uic-rounded es-uic-border es-uic-bg-white es-uic-p-2'>
									<DraggableHandle className='es-uic-absolute es-uic-right-1 es-uic-top-1' />
									<p>{title}</p>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
								</div>
							);
						}}
					</Draggable>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<DraggableList
						label='My draggable list'
						items={draggableListItems}
						onChange={setDraggableListItems}
					>
						{(item) => {
							const { toggle, title, icon, updateData } = item;

							return (
								<DraggableListItem
									label={title ?? 'New item'}
									icon={icon ?? icons.emptyCircle}
								>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
								</DraggableListItem>
							);
						}}
					</DraggableList>

					<DraggableList
						label='My draggable list 2'
						items={draggableListItems2}
						onChange={setDraggableListItems2}
					>
						{(item) => {
							const { toggle, title, icon, updateData } = item;

							return (
								<DraggableListItem
									label={title ?? 'New item'}
									icon={icon ?? icons.emptyCircle}
								>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
								</DraggableListItem>
							);
						}}
					</DraggableList>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-[50rem] es-uic-space-y-4 es-uic-bg-gray-100 !es-uic-p-5'>
					<OptionsPanel>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
					</OptionsPanel>

					<OptionsPanel title='Header & footer'>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
					</OptionsPanel>

					<OptionsPanel
						title='Header & footer'
						help='Lorem ipsum dolor sit amet, lorem dolor sit amet? Ipsum!'
					>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
					</OptionsPanel>

					<OptionsPanel
						title='Header & footer'
						help='Lorem ipsum dolor sit amet, lorem dolor sit amet? Ipsum!'
					>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
					</OptionsPanel>

					<OptionsPanel
						title='Header & footer'
						help='Lorem ipsum dolor sit amet, lorem dolor sit amet? Ipsum!'
					>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
						<OptionsPanelSection>
							<Select
								icon={icons.emptyCircle}
								label='Pick an item'
								onChange={(v) => setV(v)}
								value={v}
								options={data}
							/>
						</OptionsPanelSection>
					</OptionsPanel>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ResponsivePreview
						value={{
							_default: 'sans',
							_desktopFirst: false,
							desktop: 'serif',
						}}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					/>

					<ResponsivePreview
						value={{
							_default: 'sans',
							_desktopFirst: true,
							desktop: 'serif',
						}}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					/>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<Modal title='My modal'>Lorem ipsum modal sit amet.</Modal>
				</TabPanel>
				<TabPanel className='es-uic-m-5 es-uic-w-96 es-uic-space-y-4 !es-uic-p-5'>
					<ItemCollection
						items={draggableItems}
						onChange={setDraggableItems}
					>
						{(item) => {
							const { toggle, title, updateData, itemIndex, deleteItem } = item;

							return (
								<div className='es-uic-flex es-uic-items-center es-uic-gap-2'>
									<p>
										{itemIndex} {title}
									</p>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
									<Button
										size='small'
										type='danger'
										icon={icons.trash}
										onPress={() => deleteItem()}
									/>
								</div>
							);
						}}
					</ItemCollection>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default App;
