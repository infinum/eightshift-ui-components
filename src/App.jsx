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
	ToggleButton,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	InputField,
	ComponentToggle,
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
	OptionsPanelHeader,
	MiniResponsive,
	AsyncSelect,
	MultiSelect,
	AsyncMultiSelect,
	Select,
	OptionsPanelIntro,
	FilePickerShell,
	SmartImage,
	Container,
	ContainerGroup,
} from '../lib';
import { icons } from '../lib/icons';
import { clsx } from 'clsx';
import { cloneElement } from 'react';
import '../lib/style';

const slugify = (input) => {
	return input
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

function App() {
	const [controlTheme, setControlTheme] = useState('default');

	const [toggled, setToggled] = useState(false);
	const [toggled2, setToggled2] = useState(null);
	const [toggled3, setToggled3] = useState(false);
	const [toggled4, setToggled4] = useState(false);
	const [toggled5, setToggled5] = useState(false);
	const [linkTxt, setLinkTxt] = useState();
	const [matrixVal, setMatrixVal] = useState('center center');
	const [matrixVal2, setMatrixVal2] = useState('top left');
	const [menuThingy, setMenuThingy] = useState(false);
	const [menuThingy2, setMenuThingy2] = useState(false);
	const [num, setNum] = useState(0);
	const [animVis, setAnimVis] = useState(true);
	const [txt1, setTxt1] = useState('');
	const [txt2, setTxt2] = useState('');
	const [useComp, setUseComp] = useState(false);
	let [selectedKey, setSelectedKey] = useState('sans');
	let [loremIpsum, setLoremIpsum] = useState(0);
	let [loremIpsum2, setLoremIpsum2] = useState('s');
	let [radioValue, setRadioValue] = useState(null);
	let [modalOpen, setModalOpen] = useState(false);
	let [buttonPending, setButtonPending] = useState(false);
	let [buttonDisabled, setButtonDisabled] = useState(false);

	let [sinSel, setSinSel] = useState(null);
	let [sinSelSimple, setSinSelSimple] = useState(null);
	let [mulSel, setMulSel] = useState([]);
	let [mulSelSimple, setMulSelSimple] = useState([]);
	let [sinASel, setSinASel] = useState(null);
	let [sinASel2, setSinASel2] = useState(null);
	let [sinASel3, setSinASel3] = useState(null);
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

	const linkData = [
		{ label: 'Eightshift', value: 'https://eightshift.com', metadata: { subtype: 'url' } },
		{
			label: 'This is a demo top post',
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
			label: 'Services archive top',
			value: 'https://your-website.com/services/',
			metadata: { subtype: 'category' },
		},
		{
			label: 'Sign top up form',
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
			subtitle: 'How do you say second? Ne prvo!',
		},
		{
			label: 'Item 3',
			value: 'item-3',
			icon: icons.num3Square,
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
		{
			label: 'Item 7 lorem',
			subtitle: 'Ipsum dolor sit amet lorem',
			icon: icons.experiment,
			value: 'item-7',
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
			}, 300);
		});
	};

	const getDataNew = (searchText) => {
		const filterData = ({ label }) => label.toLowerCase().includes(searchText?.toLowerCase());

		return new Promise((resolve) => {
			setTimeout(() => {
				if ((searchText ?? '').length < 3) {
					resolve(data);
				}

				resolve(data.filter(filterData));
			}, 300);
		});
	};

	const [v, setV] = useState();

	const [tabVar, setTabVar] = useState('underline');

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
			title: 'Item 1',
		},
		{
			title: 'Item 2',
		},
		{
			title: 'Item 3',
		},
	];

	const repeaterDefaultItems2 = [
		{
			title: 'Item 1',
			icon: icons.num1Square,
		},
		{
			title: 'Item 2',
			subtitle: 'Lorem',
			icon: icons.num2Circle,
		},
		{
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
		<div className='es:font-sans es:flex es:min-h-screen es:flex-col es:items-center es:justify-center es:overscroll-contain es:bg-neutral-100 es:p-1'>
			<OptionSelect
				label='Control theme'
				value={controlTheme}
				onChange={(value) => {
					document.documentElement.classList.remove(`es-uic-theme-${controlTheme}`);

					setControlTheme(value);
					document.documentElement.classList.add(`es-uic-theme-${value}`);
				}}
				options={[
					{ value: 'default', label: 'Default' },
					{ value: 'green', label: 'Green' },
					{ value: 'blue', label: 'Blue' },
					{ value: 'orange', label: 'Orange' },
					{ value: 'purple', label: 'Purple' },
					{ value: 'mono', label: 'Monochrome' },
				]}
				className='es:my-5'
				inline
			/>

			<div className='es:mx-auto es:flex es:w-90 es:flex-col es:items-center es:justify-center es:gap-2.5 es:p-10 es:empty:hidden'>
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
								className={clsx(!title && 'es:text-secondary-400!')}
								menuOptions={
									<MenuItem
										onClick={() => {
											const name = prompt('Name', title);

											if (name) {
												updateData({ title: name });
											}
										}}
									>
										Rename
									</MenuItem>
								}
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

				<pre>{JSON.stringify(repeaterItems, null, 2)}</pre>
			</div>

			<Tabs
				vertical
				type='bubble'
				className='es:self-start es:m-5'
				onSelectionChange={(key) => {
					const url = new URL(window.location);
					url.searchParams.set('tab', key);
					window.history.replaceState({}, '', url);
				}}
				defaultSelectedKey={new URLSearchParams(window.location.search).get('tab')}
			>
				<TabList className='es:sticky es:top-16'>
					<Tab
						icon={icons.toggleOnAlt}
						label='Toggle / Switch'
						id='toggle'
					/>
					<Tab
						icon={icons.verticalSpacing}
						label='Spacer'
						id='spacer'
					/>
					<Tab
						icon={icons.animationGeneric}
						label='Animated visibility'
						id='anim-vis'
					/>
					<Tab
						icon={icons.dropdownClose}
						label='Expandable'
						id='expandable'
					/>
					<Tab
						icon={icons.link}
						label='LinkInput'
						id='link-input'
					/>
					<Tab
						icon={icons.info}
						label='Notice'
						id='notice'
					/>
					<Tab
						icon={icons.chatBubble}
						label='Triggered popover'
						id='triggered-popover'
					/>
					<Tab
						icon={icons.buttonOutline}
						label='Button'
						id='button'
					/>
					<Tab
						icon={icons.position3x3CenterCenter}
						label='Matrix align'
						id='matrix-align'
					/>
					<Tab
						icon={icons.hamburgerMenu}
						label='Menu'
						id='menu'
					/>
					<Tab
						icon={icons.hoverBackgroundGlow}
						label='Tooltip'
						id='tooltip'
					/>
					<Tab
						icon={icons.num2CircleAlt}
						label='Number picker'
						id='num-pick'
					/>
					<Tab
						icon={icons.responsive}
						label='Responsive 2.0'
						id='responsive-2'
					/>
					<Tab
						icon={icons.fieldLabel}
						label='Base control'
						id='base-ctrl'
					/>
					<Tab
						icon={icons.dropdown}
						label='Select'
						id='select'
					/>
					<Tab
						icon={icons.newTab}
						label='Tabs'
						id='tabs'
					/>
					<Tab
						icon={icons.inputField}
						label='Input field'
						id='input'
					/>
					<Tab
						icon={icons.componentOptions}
						label='Component toggle'
						id='comp-toggle'
					/>
					<Tab
						icon={icons.gridAutoRows}
						label='Repeater'
						id='repeater'
					/>
					<Tab
						icon={icons.checkSquare}
						label='Checkbox'
						id='checbox'
					/>
					<Tab
						icon={icons.listUnordered}
						label='Radio button'
						id='radio'
					/>
					<Tab
						icon={icons.slider}
						label='Slider'
						id='slider'
					/>
					<Tab
						icon={icons.solidCircleFilled}
						label='Solid color picker'
						id='solid-color-pick'
					/>
					<Tab
						icon={icons.gradient}
						label='Gradient editor'
						id='gradient-editor'
					/>
					<Tab
						icon={icons.color}
						label='Color swatch'
						id='color-swatch'
					/>
					<Tab
						icon={icons.eyedropper}
						label='Color picker'
						id='color-picker'
					/>
					<Tab
						icon={icons.responsiveOverridesAlt}
						label='Responsive (legacy)'
						id='resp-legacy'
					/>
					<Tab
						icon={icons.columnGuttersLR}
						label='Column config slider'
						id='col-config-slider'
					/>
					<Tab
						icon={icons.group}
						label='Container panel'
						id='cont-panel'
					/>
					<Tab
						icon={icons.layoutAlt}
						label='Layout components'
						id='stacks'
					/>
					<Tab
						icon={icons.emptyCircle}
						label='Placeholders'
						id='placeholder'
					/>
					<Tab
						icon={icons.cursorMove}
						label='Draggable'
						id='draggable'
					/>
					<Tab
						icon={icons.cursorMove}
						label='Draggable list'
						id='draggable-list'
					/>
					<Tab
						icon={icons.options}
						label='Options panel'
						id='opt-panel'
					/>
					<Tab
						icon={icons.previewResponsive}
						label='Responsive preview'
						id='resp-preview'
					/>
					<Tab
						icon={icons.browser}
						label='Modal'
						id='modal'
					/>
					<Tab
						icon={icons.multiple}
						label='Item collection'
						id='item-collection'
					/>
					<Tab
						icon={icons.file}
						label='File picker shell'
						id='file-picker-shell'
					/>
					<Tab
						icon={icons.imageLazyLoad}
						label='Smart image'
						id='smart-img'
					/>
				</TabList>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Toggle
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
					/>

					<Toggle
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode flat'
						flat
					/>

					<Toggle
						checked
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
						disabled
					/>

					<Toggle
						checked={false}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
						disabled
					/>

					<Switch
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
						size='small'
					/>

					<Switch
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={icons.experiment}
						label='Airplane mode'
						size='medium'
					/>

					<Switch
						checked={toggled2}
						onChange={(value) => setToggled2(value)}
						icon={icons.experiment}
						label='Airplane mode'
						isIndeterminate={toggled2 === null}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Spacer
						size='s'
						className='es:bg-violet-50'
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<div className='es:flex es:min-h-56 es:flex-col es:gap-2 es:rounded-md es:border es:border-dotted es:border-secondary-300 es:p-2'>
						<ToggleButton
							className='mx-auto'
							selected={animVis}
							onChange={setAnimVis}
						>
							Show
						</ToggleButton>
						<div className='es:grid es:grid-cols-2 es:gap-4'>
							<AnimatedVisibility
								visible={animVis}
								noInitial
								transition='slideFade'
							>
								<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>Hi, I&apos;m content.</div>
							</AnimatedVisibility>
							<AnimatedVisibility
								visible={animVis}
								transition='slideFade'
							>
								<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>Hi, I&apos;m content.</div>
							</AnimatedVisibility>
						</div>

						<span className='es:text-secondary-500'>
							Left has <code>noInitial</code> set.
						</span>
					</div>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:p-5!'>
					<Expandable
						standalone
						icon={icons.experiment}
						label='Lorem ipsum dolor'
						actions={
							<Button
								onPress={() => console.log('hi')}
								icon={icons.emptyRect}
								type='ghost'
								size='small'
							/>
						}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>lorem</div>

						<Button
							onPress={() => console.log('hi')}
							icon={icons.emptyRect}
							type='ghost'
							size='small'
						/>
					</Expandable>

					<ContainerGroup>
						<Container standalone>
							<BaseControl
								icon={icons.experiment}
								label='Lorem ipsum dolor'
								actions={
									<Button
										onPress={() => console.log('hi')}
										icon={icons.emptyRect}
										type='ghost'
										size='small'
									/>
								}
								inline
							>
								a
							</BaseControl>
						</Container>
					</ContainerGroup>

					<Expandable
						standalone
						icon={icons.experiment}
						label='Lorem ipsum dolor'
						actions={
							<Button
								onPress={() => console.log('hi')}
								icon={icons.emptyRect}
								type='ghost'
								size='small'
							/>
						}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>
							lorem
							<Button>Ipsum</Button>
						</div>
					</Expandable>

					<Expandable
						standalone
						icon={icons.experiment}
						label='Lorem ipsum dolor'
						keepActionsOnExpand
						actions={
							<Button
								onPress={() => console.log('hi')}
								icon={icons.emptyCircle}
								type='ghost'
								size='small'
							/>
						}
						flat
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>lorem</div>
					</Expandable>

					<hr className='es:my-2' />

					<div className='es:space-y-0.75'>
						<Expandable
							icon={icons.experiment}
							label='Lorem ipsum dolor'
							actions={
								<Button
									onPress={() => console.log('hi')}
									icon={icons.emptyRect}
									type='ghost'
									size='small'
								/>
							}
						>
							<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>lorem</div>
							<Button
								onPress={() => console.log('hi')}
								icon={icons.emptyRect}
								type='ghost'
								size='small'
							/>
						</Expandable>

						<Expandable
							icon={icons.experiment}
							label='Lorem ipsum dolor'
							actions={
								<Button
									onPress={() => console.log('hi')}
									icon={icons.emptyRect}
									type='ghost'
									size='small'
								/>
							}
						>
							<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>
								lorem
								<Button>Ipsum</Button>
							</div>
						</Expandable>

						<Expandable
							icon={icons.experiment}
							label='Lorem ipsum dolor'
							keepActionsOnExpand
							actions={
								<Button
									onPress={() => console.log('hi')}
									icon={icons.emptyCircle}
									type='ghost'
									size='small'
								/>
							}
							flat
						>
							<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>lorem</div>
						</Expandable>
					</div>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						flat
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						size='small'
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						size='small'
						flat
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						size='medium'
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						size='medium'
						flat
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						size='large'
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						size='large'
						flat
					/>

					<LinkInput
						url={linkTxt}
						help='Help, not sure how to input this'
						onChange={({ url }) => setLinkTxt(url)}
						fetchSuggestions={getLinkData}
						disabled
					/>

					<pre>{JSON.stringify(linkTxt)}</pre>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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
						label='Post meta'
						subtitle='will be shown here'
						type='placeholder'
					/>

					<Notice
						label='Post meta'
						subtitle='will be shown here'
						type='placeholder'
						flat
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

					<Notice
						icon={icons.person}
						label='Lorem ipsum'
						subtitle='dolor sit amet, consectetur adipiscing elit. Vivamus ultrices tincidunt nibh, in lacinia tellus lobortis eu. Curabitur dignissim tellus eget felis tincidunt, a maximus odio tristique.'
						type='placeholder'
						alignIconToTitle
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<TriggeredPopover className='es:bg-purple-50 es:p-5 es:rounded-2xl'>Hello</TriggeredPopover>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Button>Hello</Button>

					<ButtonGroup>
						<Button>Hello</Button>
						<Button>Hello</Button>
						<Button>Hello</Button>
					</ButtonGroup>

					<ButtonGroup>
						<Button flat>Flatllo</Button>
						<Button flat>Flatllo</Button>
						<Button flat>Flatllo</Button>
					</ButtonGroup>

					<ButtonGroup>
						<Button type='simple'>Flatllo</Button>
						<Button type='simple'>Flatllo</Button>
						<Button type='simple'>Flatllo</Button>
					</ButtonGroup>

					<hr className='es:my-2' />

					<Checkbox
						checked={buttonPending}
						onChange={setButtonPending}
						label='Pending?'
					/>

					<Checkbox
						checked={buttonDisabled}
						onChange={setButtonDisabled}
						label='Disabled?'
					/>

					<Button
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>

					<Button
						pending={buttonPending}
						disabled={buttonDisabled}
						type='simple'
					>
						Pending button
					</Button>

					<Button
						pending={buttonPending}
						disabled={buttonDisabled}
						type='selectedSimple'
					>
						Pending button
					</Button>

					<Button
						pending={buttonPending}
						disabled={buttonDisabled}
						type='dangerSimple'
					>
						Pending button
					</Button>

					<Button
						type='ghost'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>
					<Button
						type='danger'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>
					<Button
						type='dangerGhost'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>
					<Button
						type='selected'
						pending={buttonPending}
						disabled={buttonDisabled}
						icon={icons.magicFill}
					>
						Pending button
					</Button>
					<Button
						type='selectedGhost'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>

					<div
						style={{ backgroundImage: 'url(https://fastly.picsum.photos/id/328/600/800.jpg?hmac=BZ-xPwUADtXzjRoS5pt6s9NZob3vvu89cOu6DYICMQE' }}
						className='es:bg-cover es:p-8 es:space-y-5 es:bg-right-bottom'
					>
						<Button
							type='glass'
							pending={buttonPending}
							disabled={buttonDisabled}
						>
							Pending button
						</Button>
						<Button
							type='glassDark'
							pending={buttonPending}
							disabled={buttonDisabled}
						>
							Pending button
						</Button>
						<Button
							type='dangerGlass'
							pending={buttonPending}
							disabled={buttonDisabled}
						>
							Pending button
						</Button>
						<Button
							type='selectedGlass'
							pending={buttonPending}
							disabled={buttonDisabled}
						>
							Pending button
						</Button>
					</div>

					<hr className='es:my-2' />

					<Button
						type='glass'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>
					<Button
						type='glassDark'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>
					<Button
						type='dangerGlass'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>
					<Button
						type='selectedGlass'
						pending={buttonPending}
						disabled={buttonDisabled}
					>
						Pending button
					</Button>

					<hr className='es:my-2' />

					<div className='es:flex es:items-center es:gap-2'>
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

					<div className='es:flex es:items-center es:gap-2'>
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
					>
						Hello
					</Button>

					<Button
						icon={icons.componentGeneric}
						type='dangerGhost'
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
					<Button
						icon={icons.componentGeneric}
						type='ghost'
						disabled
					>
						Hello
					</Button>

					<Button
						icon={icons.componentGeneric}
						type='selectedGhost'
					>
						Hello
					</Button>

					<Button
						icon={icons.componentGeneric}
						type='selectedGhost'
						disabled
					>
						Hello
					</Button>

					<div className='es:flex es:items-center es:gap-2'>
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

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'simple' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'ghost' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ size: 'small' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'simple', size: 'small' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'ghost', size: 'small' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ size: 'large' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'simple', size: 'large' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'ghost', size: 'large' }}
						options={[
							{ label: 'Small', value: 0, icon: icons.small },
							{ label: 'Medium', value: 1, icon: icons.medium },
							{ label: 'Large', value: 2, icon: icons.large },
						]}
					/>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Menu
						aria-label='Bok i tebi'
						keepOpen
					>
						<MenuSection label='Demo'>
							<MenuItem
								danger
								icon={icons.trash}
								id='del'
							>
								Delete
							</MenuItem>
							<MenuItem
								primary
								icon={icons.save}
								id='save'
							>
								Save
							</MenuItem>
							<MenuItem
								checked={menuThingy2}
								onClick={() => setMenuThingy2(!menuThingy2)}
								id='save-as'
								subtitle='Very unlike "Save"'
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
								<MenuItem
									disabled
									id='print3'
								>
									Print3…
								</MenuItem>
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

					<Menu
						triggerLabel='Menu with submenu'
						keepOpen
					>
						<OptionSelect
							type='standaloneMenuItems'
							value={loremIpsum}
							onChange={(v) => setLoremIpsum(v)}
							options={[
								{ label: 'Small', value: 0, icon: icons.small },
								{ label: 'Medium', value: 1, icon: icons.medium },
								{ label: 'Large', value: 2, icon: icons.large },
							]}
							label='Pero'
							icon={icons.small}
							wrapperProps={{ keepOpen: true }}
						/>
						<MenuSeparator />
						<OptionSelect
							type='submenu'
							value={loremIpsum}
							onChange={(v) => setLoremIpsum(v)}
							options={[
								{ label: 'Small', value: 0, icon: icons.small },
								{ label: 'Medium', value: 1, icon: icons.medium },
								{ label: 'Large', value: 2, icon: icons.large },
							]}
							label='Pero'
							icon={icons.small}
							wrapperProps={{ keepOpen: true }}
						/>
						<MenuSeparator />
						<OptionSelect
							type='submenu'
							value={loremIpsum}
							onChange={(v) => setLoremIpsum(v)}
							options={[
								{ label: 'Small', value: 0, icon: icons.small },
								{ label: 'Medium', value: 1, icon: icons.medium },
								{ label: 'Large', value: 2, icon: icons.large },
							]}
							label='Pero'
							subtitle
						/>
						<MenuSeparator />
						<OptionSelect
							type='submenu'
							value={loremIpsum}
							onChange={(v) => setLoremIpsum(v)}
							options={[
								{ label: 'Small', value: 0, icon: icons.small },
								{ label: 'Medium', value: 1, icon: icons.medium },
								{ label: 'Large', value: 2, icon: icons.large },
							]}
							label='Pero'
							subtitle='Ždero'
						/>
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:flex es:flex-col es:items-center es:space-y-4 es:p-5!'>
					<DecorativeTooltip text='Hello'>Hover me</DecorativeTooltip>
					<DecorativeTooltip
						text='Hello'
						theme='light'
					>
						Hover me
					</DecorativeTooltip>

					<DecorativeTooltip
						text='Hello'
						theme='light'
						placement='left'
					>
						Left
					</DecorativeTooltip>

					<DecorativeTooltip
						text='Hello'
						theme='light'
						placement='right'
					>
						Right
					</DecorativeTooltip>

					<DecorativeTooltip
						text='Hello'
						theme='light'
						placement='top'
					>
						Top
					</DecorativeTooltip>

					<DecorativeTooltip
						text='Hello'
						theme='light'
						placement='bottom'
					>
						Bottom
					</DecorativeTooltip>

					<Tooltip text='Hi, I am a tooltip'>
						<Button>Hover me</Button>
					</Tooltip>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<NumberPicker
						label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						icon={icons.rangeMid}
						placeholder='abc'
						flat
					/>

					<NumberPicker
						aria-label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						placeholder='abc'
					/>

					<hr className='es:my-2' />

					<NumberPicker
						label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						icon={icons.rangeMid}
						placeholder='abc'
						size='small'
						flat
						inline
					/>

					<NumberPicker
						label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						icon={icons.rangeMid}
						placeholder='abc'
						size='medium'
						flat
						inline
					/>

					<NumberPicker
						label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						icon={icons.rangeMid}
						placeholder='abc'
						size='default'
						flat
						inline
					/>

					<NumberPicker
						label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						icon={icons.rangeMid}
						placeholder='abc'
						size='large'
						flat
						inline
					/>

					<hr className='es:my-2' />

					<NumberPicker
						label='Pick a number'
						value={num}
						onChange={(value) => setNum(value)}
						max={200}
						prefix='$'
						suffix='%'
						icon={icons.rangeMid}
						disabled
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
							onPress={() => setNum(0)}
							type='simple'
							size='large'
							icon={icons.resetToZero}
							slot={null}
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
							onPress={() => setNum(0)}
							type='simple'
							size='large'
							icon={icons.resetToZero}
							disabled={num === 0}
							slot={null}
						/>
					</NumberPicker>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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

					<pre className='es:w-full es:text-xs'>{JSON.stringify(resp, null, 2)}</pre>

					<Spacer border />

					<MiniResponsive
						icon={icons.emptyRect}
						label='Font family'
						value={resp}
						onChange={setResp}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					>
						{({ currentValue, handleChange, options, isInlineCollapsedView }) => (
							<OptionSelect
								options={options}
								onChange={(value) => handleChange(value)}
								value={currentValue}
								type={isInlineCollapsedView ? 'menu' : 'toggleButtons'}
								itemProps={!isInlineCollapsedView && { type: 'simple' }}
							/>
						)}
					</MiniResponsive>

					<Spacer
						className='es:opacity-25'
						border
					/>

					<MiniResponsive
						value={resp}
						onChange={setResp}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					>
						{({ currentValue, handleChange, options, isInlineCollapsedView }) => (
							<OptionSelect
								options={options}
								onChange={(value) => handleChange(value)}
								value={currentValue}
								type={isInlineCollapsedView ? 'menu' : 'toggleButtons'}
								aria-label='Font family'
								itemProps={!isInlineCollapsedView && { type: 'simple' }}
								tooltip
							/>
						)}
					</MiniResponsive>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(resp, null, 2)}</pre>

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

					<pre className='es:w-full es:text-xs'>{JSON.stringify(resp2, null, 2)}</pre>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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

					<BaseControl
						icon={icons.emptyCircle}
						label='Moja lijepa komponenta'
						subtitle='Subtitle'
					>
						<Button>Hi</Button>
					</BaseControl>

					<BaseControl
						icon={icons.emptyCircle}
						label='Moja lijepa komponenta'
						subtitle='Subtitle'
						help='Hjalp'
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					{/* <Select
						label='Single basic'
						value={sinSel}
						onChange={setSinSel}
						options={data}
					/> */}
					<pre>{JSON.stringify(sinSel, null, 2)}</pre>
					{/* <Select
						label='Single basic - simpleValue'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
					/> */}
					<pre>{JSON.stringify(sinSelSimple, null, 2)}</pre>
					{/* <MultiSelect
						label='Multi basic'
						value={mulSel}
						onChange={setMulSel}
						options={data}
					/> */}
					<MultiSelect
						label='Multi basic NEXT'
						value={mulSel}
						onChange={setMulSel}
						options={data}
					/>
					<MultiSelect
						label='Multi basic NEXT clearable'
						value={mulSel}
						onChange={setMulSel}
						options={data}
						clearable
					/>
					<MultiSelect
						label='Multi basic NEXT'
						value={mulSel}
						onChange={setMulSel}
						options={data}
						customValueDisplay={(item) => (
							<HStack
								className='es:icon:size-[1em]'
								slot='label'
							>
								{item?.icon}
								{item?.label}
							</HStack>
						)}
					/>
					<pre>{JSON.stringify(mulSel, null, 2)}</pre>
					{/* <MultiSelect
						label='Multi basic - simpleValue'
						value={mulSelSimple}
						onChange={setMulSelSimple}
						options={data}
						simpleValue
					/> */}
					{/* <MultiSelect
						label='Multi basic - simpleValue NEXT'
						value={mulSelSimple}
						onChange={setMulSelSimple}
						options={data}
						simpleValue
					/> */}
					<pre>{JSON.stringify(mulSelSimple, null, 2)}</pre>
					{/* <AsyncSelect
						label='Single async'
						value={sinASel}
						onChange={setSinASel}
						loadOptions={getData}
					/> */}
					<pre>{JSON.stringify(sinASel, null, 2)}</pre>
					{/* <AsyncMultiSelect
						label='Multi async'
						value={mulASel}
						onChange={setMulASel}
						loadOptions={getData}
					/> */}
					<pre>{JSON.stringify(mulASel, null, 2)}</pre>
					<Spacer border />
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noSearch
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						placeholder='Pick me!'
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						clearable
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						closeMenuAfterSelect
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Default'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
					/> */}
					{/* <AsyncSelect
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV3(v)}
						value={v3}
						loadOptions={getData}
					/> */}
					{/* <MultiSelect
						icon={icons.emptyCircle}
						label='Select items'
						onChange={(v) => setV4(v)}
						value={v4}
						options={data}
					/> */}
					{/* <AsyncMultiSelect
						icon={icons.emptyCircle}
						label='Select items'
						onChange={(v) => setV5(v)}
						value={v5}
						loadOptions={getData}
					/> */}
					{/*
					<Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						customDropdownArrow={CustomDropdownIndicator}
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						customMenuOption={CustomMenuOption}
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						clearable
						customClearIndicator={CustomClearIndicator}
					/> */}
					{/* <Select
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						customValueDisplay={CustomValueDisplay}
					/> */}
					{/* <MultiSelect
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV4(v)}
						value={v4}
						options={data}
						customValueRemove={CustomMultiValueRemoveButton}
					/> */}
					{/* <MultiSelect
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV4(v)}
						value={v4}
						options={data}
						customValueDisplay={CustomMultiValueDisplay}
					/> */}
					{/* <MultiSelect
						icon={icons.emptyCircle}
						label='Pick an item'
						onChange={(v) => setV6(v)}
						value={v6}
						options={data}
						customValueContainer={CustomMultiValueContainer}
					/> */}
					{/* <Select
						onChange={(v) => setV7(v)}
						value={v7}
						options={groupedOptions}
						label='Groups'
						icon={icons.group}
					/> */}
					<AsyncSelect
						label='Async single select LOGGER'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) => {
							console.log('searchText', searchText);

							return searchText?.length >= 3
								? `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5&contains=${searchText.substring(0, 30)}`
								: 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5';
						}}
						getLabel={(item) => item?.joke ?? item?.setup}
						getValue={(item) => item?.id}
						getSubtitle={(item) => item?.delivery}
						getIcon={() => <span className='es:shrink-0 es:text-lg'>😂</span>}
						getData={(data) => data?.jokes}
						customDropdownArrow={icons.experiment}
					/>
					<AsyncSelect
						label='Async single select'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							searchText?.length >= 3
								? `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5&contains=${searchText.substring(0, 30)}`
								: 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5'
						}
						getLabel={(item) => item?.joke ?? item?.setup}
						getValue={(item) => item?.id}
						getSubtitle={(item) => item?.delivery}
						getIcon={() => <span className='es:shrink-0 es:text-lg'>😂</span>}
						getData={(data) => data?.jokes}
						disabled
					/>
					<AsyncSelect
						label='Async single select - clearable'
						value={sinASel3}
						onChange={setSinASel3}
						fetchUrl={(searchText) =>
							searchText?.length >= 3
								? `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5&contains=${searchText.substring(0, 30)}`
								: 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5'
						}
						getLabel={(item) => item?.joke ?? item?.setup}
						getValue={(item) => item?.id}
						getSubtitle={(item) => item?.delivery}
						getIcon={() => <span className='es:shrink-0 es:text-lg'>😂</span>}
						getData={(data) => data?.jokes}
						customValueDisplay={(item) => (
							<div
								className='es:line-clamp-1 es:font-bold'
								style={{ color: 'blue' }}
							>
								{item?.label}
							</div>
						)}
						clearable
					/>
					<hr className='es:my-2' />
					<Select
						label='Single basic'
						value={sinSel}
						onChange={setSinSel}
						options={data}
					/>
					<hr className='es:my-2' />
					<Select
						label='Single basic - simpleValue'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
					/>
					<Select
						label='Single basic - simpleValue SRCH'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						searchable
					/>
					<pre>{JSON.stringify(sinSelSimple, null, 2)}</pre>
					<Select
						label='Single basic - simpleValue with clear'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						clearable
						flat
					/>
					<Select
						label='Single basic - simpleValue with clear'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						clearable
					/>
					<hr className='es:my-2' />
					<Select
						label='Single basic - simpleValue with custom value display'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						customValueDisplay={(item) => <span className='es:font-bold es:text-blue-400'>{item?.label}</span>}
					/>
					<Select
						label='Single basic - simpleValue with custom menu item'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						customMenuOption={(item) => <span className='es:font-bold es:text-blue-400'>{item?.label}</span>}
					/>
					<Select
						label='Single basic'
						value={sinSel}
						onChange={setSinSel}
						options={data}
					/>
					<AsyncSelect
						label='Async single select PROD'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							searchText?.length >= 3 ? `http://universities.hipolabs.com/search?limit=5&name=${searchText}` : 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => item?.name}
						getValue={(item) => item?.value}
						getSubtitle={(item) => item?.country}
						getIcon={(item) => {
							let codePoints = (item.countryCode ?? 'eu')
								.toUpperCase()
								.split('')
								.map((char) => 127397 + char.charCodeAt());

							return <span className='es:text-lg'>{String.fromCodePoint(...codePoints)}</span>;
						}}
						processLoadedOptions={(items) => items.map((item) => ({ name: item?.name, country: item?.country, value: slugify(item?.name), countryCode: item?.alpha_two_code }))}
						clearable
					/>
					<AsyncSelect
						label='Async single select PROD'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							searchText?.length >= 3 ? `http://universities.hipolabs.com/search?limit=5&name=${searchText}` : 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => item?.name}
						getValue={(item) => item?.value}
						getSubtitle={(item) => item?.country}
						getIcon={() => icons.emptyCircle}
						processLoadedOptions={(items) => items.map((item) => ({ ...item, value: slugify(item?.name) }))}
						clearable
					/>
					<AsyncSelect
						label='Async single select PROD'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							searchText?.length >= 3 ? `http://universities.hipolabs.com/search?limit=5&name=${searchText}` : 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => item?.name}
						getValue={(item) => item?.value}
						processLoadedOptions={(items) => items.map((item) => ({ ...item, value: slugify(item?.name) }))}
						clearable
					/>
					<AsyncSelect
						label='Async single select PROD'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							searchText?.length >= 3 ? `http://universities.hipolabs.com/search?limit=5&name=${searchText}` : 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => item?.name}
						getValue={(item) => item?.value}
						getIcon={() => icons.emptyCircle}
						processLoadedOptions={(items) => items.map((item) => ({ ...item, value: slugify(item?.name) }))}
						clearable
					/>
					<AsyncSelect
						label='Async single select PROD LOGGEr2'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) => {
							console.log('searchText2', searchText);

							return searchText?.length >= 3
								? `http://universities.hipolabs.com/search?limit=5&name=${searchText}`
								: 'http://universities.hipolabs.com/search?limit=5&country=croatia';
						}}
						getLabel={(item) => item?.name}
						getValue={(item) => item?.value}
						getSubtitle={(item) => item?.country}
						processLoadedOptions={(items) => items.map((item) => ({ ...item, value: slugify(item?.name) }))}
						clearable
					/>
					{JSON.stringify(sinASel2)}
					<hr className='es:my-2' />
					{/* <AsyncMultiSelect
						label='Multi async'
						value={mulASel}
						onChange={setMulASel}
						loadOptions={getDataAlt}
					/> */}
					<AsyncMultiSelect
						label='Multi async NEXT'
						value={mulASel}
						onChange={setMulASel}
						fetchUrl={(searchText) =>
							searchText?.length >= 3 ? `http://universities.hipolabs.com/search?limit=5&name=${searchText}` : 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => item?.name}
						getValue={(item) => item?.value}
						getSubtitle={(item) => item?.country}
						getIcon={() => icons.emptyCircle}
						processLoadedOptions={(items) => items.map((item) => ({ ...item, value: slugify(item?.name) }))}
						clearable
					/>
					<hr className='es:my-2' />
					Custom
					<AsyncMultiSelect
						label='Multi async NEXT CSTM'
						value={mulASel}
						onChange={setMulASel}
						fetchFunction={getDataNew}
					/>
					<AsyncSelect
						label='Async single select NEXT CSTM'
						value={sinASel2}
						onChange={setSinASel2}
						fetchFunction={getDataNew}
					/>
				</TabPanel>
				<TabPanel className='es:w-4xl es:max-h-[85vh] es:h-fit es:overflow-y-auto es:max-w-[90vw] es:space-y-4 es:p-5!'>
					<ContainerGroup>
						<Container>
							<Tabs>
								<TabList />
								<TabPanel>Abc</TabPanel>
							</Tabs>
						</Container>

						<Container>
							<OptionSelect
								value={tabVar}
								onChange={setTabVar}
								options={[
									{ label: 'Underline', value: 'underline' },
									{ label: 'Underline (secondary)', value: 'underlineSecondary' },
									{ label: 'Pill', value: 'pill' },
									{ label: 'Pill (compact)', value: 'pillCompact' },
									{ label: 'Bubble', value: 'bubble' },
									{ label: 'Chips', value: 'chips' },
								]}
								type='radios'
								vertical
							/>
						</Container>
					</ContainerGroup>

					<Tabs
						className='es:outline es:outline-red-500 es:outline-dashed'
						type={tabVar}
					>
						<TabList>
							<Tab>Founding of Rome</Tab>
							<Tab badge='2'>Monarchy and Republic</Tab>
							<Tab
								icon={icons.componentGeneric}
								badge='2'
							>
								Monarchy and Republic
							</Tab>
							<Tab
								icon={icons.emptyCircle}
								badge={<DecorativeTooltip text='Lorem ipsum'>{cloneElement(icons.arrowDown, { className: 'es:stroke-[2.25]' })}</DecorativeTooltip>}
							>
								Monarchy and Republic
							</Tab>
							<Tab disabled>Empire of Something Else</Tab>
							<Tab>Empire of Something Else too</Tab>
						</TabList>
						<TabPanel>Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
						<TabPanel>Senatus lorem Populusque Romanus.</TabPanel>
						<TabPanel>Senatus Populusque Romanus.</TabPanel>
						<TabPanel>Alea jacta est.</TabPanel>
						<TabPanel>Nešto.</TabPanel>
						<TabPanel>Nešto.</TabPanel>
					</Tabs>

					<Tabs
						className='es:outline es:outline-red-500 es:outline-dashed'
						type={tabVar}
					>
						<TabList>
							<Tab>Founding of Rome</Tab>
							<Tab badge='2'>Monarchy and Republic</Tab>
							<Tab disabled>Monarchy and Republic</Tab>
							<Tab>Empire of Something Else</Tab>
						</TabList>
						<TabPanel>Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
						<TabPanel>Senatus Populusque Romanus.</TabPanel>
						<TabPanel>Alea jacta est.</TabPanel>
						<TabPanel>Nešto.</TabPanel>
					</Tabs>

					<Tabs
						className='es:outline es:outline-red-500 es:outline-dashed'
						type={tabVar}
					>
						<TabList>
							<Tab>Founding of Rome</Tab>
							<Tab badge='2'>Monarchy and Republic</Tab>
						</TabList>
						<TabPanel>Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
						<TabPanel>Nešto.</TabPanel>
					</Tabs>

					<hr className='es:my-2' />

					<Tabs
						vertical
						type={tabVar}
						className='es:outline es:outline-red-500 es:outline-dashed'
					>
						<TabList>
							<Tab>Founding of Rome</Tab>
							<Tab badge='2'>Monarchy and Republic</Tab>
							<Tab
								icon={icons.componentGeneric}
								badge='2'
							>
								Monarchy and Republic
							</Tab>
							<Tab
								icon={icons.emptyCircle}
								badge={<DecorativeTooltip text='Lorem ipsum'>{cloneElement(icons.arrowDown, { className: 'es:stroke-[2.25]' })}</DecorativeTooltip>}
							>
								Monarchy and Republic
							</Tab>
							<Tab disabled>Empire of Something Else</Tab>
						</TabList>
						<TabPanel style={{ height: '50vh' }}>Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Senatus lorem Populusque Romanus.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Senatus Populusque Romanus.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Alea jacta est.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Nešto.</TabPanel>
					</Tabs>

					<hr className='es:my-2' />

					<Tabs
						vertical
						type={tabVar}
						className='es:outline es:outline-red-500 es:outline-dashed'
					>
						<TabList>
							<Tab>Founding of Rome</Tab>
							<Tab badge='2'>Monarchy and Republic</Tab>
							<Tab>Monarchy and Republic</Tab>
							<Tab disabled>Empire of Something Else</Tab>
							<Tab>Empire of Something Else too</Tab>
						</TabList>
						<TabPanel style={{ height: '50vh' }}>Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Senatus Populusque Romanus.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Alea jacta est.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Nešto.</TabPanel>
						<TabPanel style={{ height: '50vh' }}>Nešto.</TabPanel>
					</Tabs>
				</TabPanel>

				<hr className='es:my-2' />

				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						disabled
					/>

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
					/>

					<hr className='es:my-2' />

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='small'
					/>

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='medium'
					/>

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='default'
					/>

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='large'
					/>

					<hr className='es:my-2' />

					<InputField
						value={txt1}
						onChange={setTxt1}
						label='Search'
						type='search'
						inline
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
						readOnly
					/>

					<InputField
						type='multiline'
						value={txt2}
						onChange={setTxt2}
						help={txt2?.length < 5 ? 'Nema dovoljno znakova?' : 'Iiiiima'}
						icon={icons.emptyRect}
						label='Lorem'
						readOnly
						flat
					/>

					<InputField
						type='multiline'
						value={txt2}
						onChange={setTxt2}
						help={txt2?.length < 5 ? 'Nema dovoljno znakova?' : 'Iiiiima'}
						icon={icons.emptyRect}
						label='Lorem'
						flat
						monospaceFont
						placeholder='Type here...'
					/>

					<InputField
						type='multiline'
						value={txt2}
						onChange={setTxt2}
						help={txt2?.length < 5 ? 'Nema dovoljno znakova?' : 'Iiiiima'}
						icon={icons.emptyRect}
						label='Lorem'
						placeholder='Type here...'
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ComponentToggle
						icon={icons.paragraph}
						label='Paragraph'
						useComponent={useComp}
						onChange={setUseComp}
					>
						<div className='es:min-h-24 es:w-full es:rounded-md es:bg-secondary-200 p-2'>
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
						<div className='es:min-h-24 es:w-full es:rounded-md es:bg-secondary-200 es:p-2'>
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
						<div className='es:min-h-24 es:w-full es:rounded-md es:p-2 bg-secondary-200'>
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
						<div className='es:min-h-24 es:w-full es:rounded-md es:p-2 bg-secondary-200'>
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
						<div className='es:min-h-24 es:w-full es:rounded-md es:p-2 bg-secondary-200'>
							Lorem options noExpandButton noUseToggle
							<Button>Hello</Button>
							<InputField label='Hi' />
						</div>
					</ComponentToggle>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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
									className={clsx(!title && 'es:text-secondary-400!')}
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
									className={clsx(!title && 'es:text-secondary-400!')}
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

					{repeaterItems?.map((item, index) => (
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
							repeaterItems?.map((i) => ({ ...i, icon: undefined })),
							null,
							2,
						)}
					</pre>

					<Spacer border />

					<pre>
						{JSON.stringify(
							repeaterItems2?.map((i) => ({ ...i, icon: undefined })),
							null,
							2,
						)}
					</pre>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Checkbox
						checked={toggled && toggled3 && toggled4 && toggled5}
						indeterminate={(toggled || toggled3 || toggled4 || toggled5) && !(toggled && toggled3 && toggled4 && toggled5)}
						label='Select all'
						onChange={(value) => {
							setToggled(value);
							setToggled3(value);
							setToggled4(value);
							setToggled5(value);
						}}
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello 1'
					/>

					<Checkbox
						checked={toggled3}
						onChange={(value) => setToggled3(value)}
						label='Hello 2'
					/>

					<Checkbox
						checked={toggled4}
						onChange={(value) => setToggled4(value)}
						label='Hello 3'
						subtitle='Lorem ipsum dolor'
					/>

					<Checkbox
						checked={toggled5}
						onChange={(value) => setToggled5(value)}
						label='Hello 4'
						subtitle='Lorem ipsum dolor'
						icon={icons.experiment}
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello end'
						subtitle='Lorem ipsum dolor'
						alignEnd
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						label='Hello'
						subtitle='Lorem ipsum dolor'
						disabled
					/>

					<Checkbox
						checked={toggled}
						onChange={(value) => setToggled(value)}
						indeterminate
					>
						Hello
					</Checkbox>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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
							{ label: 'Small', value: 's' },
							{ label: 'Medium', value: 'm' },
							{ label: 'Large', value: 'l' },
						]}
					/>

					<OptionSelect
						type='radiosSegmented'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 's', icon: icons.small },
							{ label: 'Medium', value: 'm', icon: icons.medium },
							{ label: 'Large', value: 'l', icon: icons.large },
						]}
						vertical
						itemProps={{ alignEnd: true }}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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
							0: <span className='es:text-red-500'>R</span>,
							50: <span className='es:text-green-500'>G</span>,
							100: <span className='es:text-blue-500'>B</span>,
						}}
						trackStyle={{
							backgroundImage: 'linear-gradient(to right in oklab, #ff0000, #00ff00, #0000ff)',
							backgroundColor: 'transparent',
						}}
						trackBgGradientSupport
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<SolidColorPicker
						value={currColor}
						onChange={setCurrColor}
					/>

					<code className='es:flex es:min-h-9 es:min-w-24 es:items-center es:justify-center es:rounded es:border es:bg-secondary-100 es:p-1 es:text-sm'>{currColor}</code>

					<SolidColorPicker
						value={currColor2}
						onChange={setCurrColor2}
						allowTransparency
					/>

					<code className='es:flex es:min-h-9 es:min-w-24 es:items-center es:justify-center es:rounded es:border es:bg-secondary-100 es:p-1 es:text-sm'>{currColor2}</code>

					<SolidColorPicker
						value={currColor3}
						onChange={setCurrColor3}
						allowTransparency
						outputFormat='hsla'
					/>

					<code className='es:flex es:min-h-9 es:min-w-24 es:items-center es:justify-center es:rounded es:border es:bg-secondary-100 es:p-1 es:text-sm'>{currColor3}</code>

					<SolidColorPicker
						value={currColor3}
						onChange={setCurrColor3}
						allowTransparency
						disabled
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<GradientEditor
						value={grad}
						onChange={setGrad}
					/>

					<code className='es:max-w-60 es:rounded-md es:border es:bg-secondary-50 es:p-1 es:font-mono es:text-xs'>{grad}</code>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ColorSwatch
						flat
						color='red'
					/>
					<ColorSwatch
						flat
						color='transparent'
					/>
					<ColorSwatch
						flat
						color='#4433EE80'
					/>
					<ColorSwatch
						flat
						color='#0D3636'
					/>
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

					<ColorSwatch
						colorName='Custom gradient'
						className='es:bg-gradient-to-r es:from-accent-100 es:to-accent-500'
						customGradient
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ColorPicker
						value={color1}
						onChange={setColor1}
						colors={defaultColors}
						clearable
						extraOptions={<MenuItem checked={false}>Lorem</MenuItem>}
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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

					<pre className='es:w-full es:text-xs'>{JSON.stringify(responsiveState, null, 2)}</pre>

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

					<pre className='es:w-full es:text-xs'>{JSON.stringify(responsiveState2, null, 2)}</pre>

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

					<pre className='es:w-full es:text-xs'>{JSON.stringify(responsiveState3, null, 2)}</pre>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig}
						onChange={setColConfig}
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig2}
						onChange={setColConfig2}
						columns={14}
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration gutter'
						value={colConfig3}
						onChange={setColConfig3}
						columns={14}
						showOuterAsGutter
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig4}
						onChange={setColConfig4}
						disableOffset
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disableWidth
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disableWidth
						disableOffset
					/>

					<ColumnConfigSlider
						icon={icons.columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disabled
					/>
				</TabPanel>

				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-0 es:p-5!'>
					<ContainerPanel>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
					</ContainerPanel>

					<ContainerPanel title='Component name'>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						icon={icons.emptyCircle}
						accentLabel
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
					</ContainerPanel>

					<ContainerPanel>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<ContainerPanel title='Component name'>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						closable
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Component name'
						use={toggled}
						onUseChange={setToggled}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-400' />
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<Checkbox
						checked={cpOpen}
						onChange={setCpOpen}
						label='Use'
					/>

					<ContainerPanel use={cpOpen}>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Demo'
						use={cpOpen}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>

					<ContainerPanel
						title='Demo'
						use={cpOpen}
						closable
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-300' />
					</ContainerPanel>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<HStack className='es:max-w-72'>
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
						className='es:max-w-72'
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

					<VStack className='es:max-h-40'>
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
						className='es:max-h-40'
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ImagePlaceholder />
					simple
					<ImagePlaceholder style='simple' />
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
					<FilePlaceholder fileName='demo.json' />
					<FilePlaceholder />
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
					<MediaPlaceholder
						icon={icons.warning}
						style='simple'
						size='video'
						helpText='Missing lorem ipsum'
					>
						<Button type='selected'>Do something about it</Button>
						<Button type='simple'>Or don't</Button>
					</MediaPlaceholder>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Draggable
						items={draggableItems}
						onChange={setDraggableItems}
						className='es:grid es:auto-rows-auto es:grid-cols-3 es:gap-1'
						onAfterItemRemove={(item) => console.log('Removed item:', item)}
					>
						{(item) => {
							const { toggle, title, updateData, deleteItem } = item;

							return (
								<div className='es:relative es:size-full es:rounded es:border es:bg-white es:p-2'>
									<DraggableHandle className='es:absolute es:right-1 es:top-1' />
									<p>{title}</p>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
									<Button onPress={deleteItem}>Del</Button>
								</div>
							);
						}}
					</Draggable>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<DraggableList
						label='My draggable list'
						items={draggableListItems}
						onChange={setDraggableListItems}
						onAfterItemRemove={(item) => console.log('Removed item:', item)}
					>
						{(item) => {
							const { toggle, title, icon, updateData, deleteItem } = item;

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
									<Button onPress={deleteItem}>Del</Button>
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-4xl es:max-h-[85vh] es:h-fit es:overflow-y-auto es:max-w-[90vw] es:space-y-4 es:p-5! es:bg-[#f1f1f1]'>
					<OptionsPanelHeader
						title='Global settings'
						actions={
							<>
								<Button type='simple'>Test</Button>
								<Button type='selected'>Save</Button>
							</>
						}
						limitWidth
					>
						{/* <Button>Demo</Button> */}
					</OptionsPanelHeader>

					<Tabs vertical>
						<TabList>
							<Tab icon={icons.options}>General settings</Tab>
							<Tab icon={icons.bot}>SEO</Tab>
						</TabList>
						<TabPanel>
							<OptionsPanelIntro
								icon={icons.locationSettings}
								title='Location'
								subtitle='Source, service, starting point'
								iconClassName='es:stroke-[0.5]'
							/>
							<OptionsPanel>
								<OptionsPanelSection>
									<Select
										icon={icons.emptyCircle}
										label='Pick an item'
										onChange={(v) => setV(v)}
										value={v}
										options={data}
										inline
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
										inline
									/>
								</OptionsPanelSection>
							</OptionsPanel>

							<OptionsPanel
								title='Header & footer'
								subtitle='Nešto tu i tamo'
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
						</TabPanel>
						<TabPanel>
							<OptionsPanelIntro
								title='SEO'
								subtitle='Optimize your Lorem so it can better Ipsum!'
							/>

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
					</Tabs>

					<Tabs type='pill'>
						<TabList>
							<Tab icon={icons.options}>General settings</Tab>
							<Tab icon={icons.bot}>SEO</Tab>
						</TabList>
						<TabPanel>
							<OptionsPanelIntro
								title='Lorem ipsum'
								subtitle='Dolor, ipsum, sit amet, lorem, ipsum dolor, sit...'
								border
							/>
							<OptionsPanel>
								<OptionsPanelSection>
									<Select
										icon={icons.emptyCircle}
										label='Pick an item'
										onChange={(v) => setV(v)}
										value={v}
										options={data}
										inline
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
										inline
									/>
								</OptionsPanelSection>
							</OptionsPanel>

							<OptionsPanel
								title='Header & footer'
								subtitle='Nešto tu i tamo'
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
						</TabPanel>
						<TabPanel>
							<OptionsPanelIntro
								title='SEO'
								subtitle='Optimize your Lorem so it can better Ipsum!'
								border
							/>

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
					</Tabs>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
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
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<p>Auto</p>

					<Modal
						title='My modal'
						triggerLabel='Title'
						actions={
							<>
								<Button slot='close'>Lorem</Button>
								<Button slot='close'>Close</Button>
							</>
						}
						width='wide'
					>
						<p>
							Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
							ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
						</p>

						<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat felis odio, venenatis commodo dolor tincidunt vitae. Nulla sodales nulla laoreet, hendrerit
							tortor non, faucibus turpis. Pellentesque dictum lacus at ultrices sagittis. Morbi pulvinar sapien a velit tempus venenatis. Morbi iaculis lobortis ex vitae euismod.
							Donec rutrum urna et eros iaculis, at hendrerit diam pharetra. Nunc tristique molestie tellus eget aliquam. Sed molestie pulvinar lectus, at dapibus dolor.
						</p>
						<p>
							In non sem vitae lorem maximus sollicitudin id id quam. Integer elementum, enim in tristique mollis, dui leo porta metus, sit amet luctus metus velit at nulla. Nam
							scelerisque viverra blandit. Mauris sed dictum nisl, ut vehicula ex. Donec ut tincidunt neque. Ut ornare leo libero, et lobortis dolor euismod sed. Vestibulum
							sollicitudin ultrices ipsum quis consequat.
						</p>
						<p>
							Fusce placerat arcu non facilisis gravida. Aliquam finibus in orci quis aliquet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
							curae; Vestibulum sed lacus a augue consequat egestas ac a ligula. Aliquam vitae molestie ligula, eget auctor tortor. Quisque rhoncus ex vel molestie cursus. Maecenas
							egestas justo ac nulla tristique, ac tempor ipsum gravida. Nullam eget velit pretium, tincidunt lorem ac, convallis tortor. Cras tristique euismod efficitur. Proin at
							nunc sed nulla pharetra imperdiet non ut sem. Nam et nibh auctor, scelerisque magna vitae, malesuada nulla. Mauris eget consequat risus. Phasellus commodo odio et
							malesuada aliquam. Curabitur turpis lacus, vestibulum pharetra velit a, maximus convallis est. Donec est lorem, placerat eget ligula et, luctus pellentesque dui.
						</p>
						<p>
							Aliquam aliquet justo in felis egestas, vitae dapibus nibh convallis. Nunc mauris leo, volutpat nec maximus quis, lacinia eget leo. Phasellus a dui et ipsum mollis
							ultrices. Ut eget viverra purus, ac placerat ante. Vestibulum vitae convallis orci, a mollis lorem. Quisque risus neque, feugiat quis risus ac, condimentum auctor
							orci. Proin lacinia diam sed erat pharetra, id ultricies quam viverra. Aliquam neque orci, condimentum sit amet elit vitae, ullamcorper vestibulum nisl. Etiam nec
							erat sit amet magna pellentesque congue. Suspendisse volutpat a justo sed vehicula. Nam auctor nisi et imperdiet fermentum. Nulla rutrum sit amet nisi eu feugiat.
							Proin quis lectus eu justo varius rhoncus vitae non nisl. Nullam sagittis nunc id nibh accumsan, nec tincidunt quam vehicula. Sed placerat sed erat eget egestas.
						</p>
						<p>
							Vestibulum urna tellus, tristique ac ex nec, tristique accumsan quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
							Mauris vel diam et urna pellentesque tincidunt sed ut turpis. In hac habitasse platea dictumst. Donec lobortis egestas lacinia. Proin blandit nisi quis turpis auctor
							pulvinar. Cras mattis placerat rhoncus.
						</p>
						<p>
							Nunc ut risus in mauris blandit porttitor. Cras vel sapien eget mauris maximus consequat ut in velit. Fusce aliquam massa diam, id dictum nisl semper eu. Nulla
							dapibus erat sit amet ligula pharetra, a vestibulum dolor faucibus. In hac habitasse platea dictumst. Aenean at molestie tellus. Donec et lobortis sem. Sed imperdiet
							elit dapibus semper consectetur. Fusce facilisis lobortis elit suscipit aliquam. Quisque auctor, erat et iaculis fringilla, ante velit eleifend lorem, id pretium
							mauris sem eget sapien. Aliquam erat volutpat. Phasellus nec lorem ut orci sagittis rutrum at volutpat sapien. Quisque at porta risus.
						</p>
						<p>
							Aliquam vel magna eleifend, finibus mi a, viverra tortor. Integer feugiat neque at rhoncus convallis. Nulla dictum venenatis sapien, elementum feugiat mi tristique
							id. Sed lacinia purus eget dolor ullamcorper pretium. Maecenas sed consequat odio. Mauris est felis, commodo ut mauris vitae, finibus pulvinar tortor. Curabitur
							rutrum, est vitae sagittis semper, elit ex blandit magna, ullamcorper viverra enim metus eget lectus. Proin semper eleifend congue. Donec consectetur pharetra est,
							vel pharetra tortor sagittis a. Phasellus faucibus, tellus ac congue dapibus, augue risus fermentum felis, nec vehicula nisl quam id urna. Etiam malesuada lectus vel
							consequat commodo. Nam non ex augue.
						</p>
						<p>
							Sed et turpis ex. Pellentesque dapibus viverra blandit. Aliquam dictum euismod mauris eget sodales. Etiam id ultrices odio. Cras ac egestas lorem. Class aptent taciti
							sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris placerat aliquet ante, vitae placerat neque posuere ut. Integer gravida sed augue eu
							bibendum. Praesent in consequat dolor. Quisque mi mi, dignissim sit amet mi nec, elementum viverra massa. Aenean ultrices maximus ex ac tincidunt. Nullam vel enim
							porta, mattis augue ac, ultrices purus. Curabitur malesuada nec risus sit amet condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
							ridiculus mus.
						</p>
						<p>
							Pellentesque bibendum quam vitae dui mattis congue. Donec vel rhoncus ipsum, eu gravida mauris. Phasellus rhoncus pellentesque dolor nec finibus. Pellentesque
							malesuada nunc ex, eget scelerisque diam imperdiet in. Nulla sed tristique diam. Nullam id feugiat ipsum, quis vehicula erat. Proin sodales turpis magna, ac tempor
							enim pretium quis.
						</p>
						<p>
							Mauris pulvinar venenatis lectus, vitae tincidunt dolor ultricies eu. In sit amet dui vel orci fermentum luctus. Cras pharetra est quis urna venenatis, ut varius
							tortor auctor. Ut vitae sollicitudin nulla. Sed cursus lectus ligula, in luctus sem pellentesque vel. In imperdiet nibh ac tellus fermentum, blandit iaculis ante
							ultrices. Vivamus ultricies, purus non scelerisque molestie, elit nulla suscipit ligula, vitae faucibus purus lorem et justo. Nulla at odio nec arcu efficitur posuere
							in in sapien.
						</p>
					</Modal>

					<Modal
						title='My modal'
						triggerLabel='No backdrop'
						noBackdrop
					>
						<p>
							Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
							ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
						</p>

						<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					</Modal>

					<Modal triggerLabel='No title'>
						<p>
							Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
							ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
						</p>

						<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					</Modal>

					<Modal
						title='My modal'
						triggerLabel='No close button'
						noCloseButton
						actions={
							<Button
								type='simple'
								slot='close'
							>
								Close
							</Button>
						}
					>
						<p>
							Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
							ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
						</p>

						<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					</Modal>

					<p>Manual</p>

					<Button onPress={() => setModalOpen(true)}>Open modal</Button>

					<Modal
						open={modalOpen}
						onOpenChange={setModalOpen}
						title='My modal'
						actions={<Button slot='close'>Close</Button>}
					>
						<p>
							Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
							ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
						</p>

						<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					</Modal>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ItemCollection
						items={draggableItems}
						onChange={setDraggableItems}
					>
						{(item) => {
							const { toggle, title, updateData, itemIndex, deleteItem } = item;

							return (
								<div className='es:flex es:items-center es:gap-2'>
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
										type='dangerGhost'
										icon={icons.trash}
										onPress={() => deleteItem()}
									/>
								</div>
							);
						}}
					</ItemCollection>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<FilePickerShell
						className='es:w-full'
						url='myfile.json'
						noUrlContent={<Button size='large'>Upload</Button>}
					>
						<Button
							type='simple'
							className='es:grow'
						>
							Replace
						</Button>
						<Button
							type='simple'
							className='es:grow'
						>
							Remove
						</Button>
					</FilePickerShell>

					<FilePickerShell
						className='es:w-full'
						// url='https://picsum.photos/600/400.jpg'
						url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg'
						noUrlContent={<Button size='large'>Upload</Button>}
						type='image'
					>
						{({ isDark, dominantColors, isTransparent }) => {
							let buttonType = 'simple';

							if (!isTransparent) {
								buttonType = isDark ? 'glass' : 'glassDark';
							}

							return (
								<>
									<Button
										className='es:grow'
										type={buttonType}
									>
										Replace
									</Button>
									<Button
										className='es:grow'
										type={buttonType}
									>
										Remove
									</Button>

									<TriggeredPopover
										triggerButtonIcon={icons.info}
										triggerButtonProps={{ type: buttonType }}
									>
										<ul className='es:flex es:items-center es:justify-center es:gap-2 es:p-2'>
											<li
												className='es:flex es:px-2 es:py-0.5 es:items-center es:justify-center es:rounded-sm es:border es:border-dotted es:border-secondary-300'
												style={{ backgroundColor: isDark ? '#000' : '#fff' }}
											>
												<span className={clsx('es:text-xs es:font-mono es:font-medium', isDark ? 'es:text-white' : 'es:text-black')}>{isDark ? 'dark' : 'light'}</span>
											</li>
											{dominantColors?.map(({ color, area, isDark }, index) => (
												<li
													key={index}
													className='es:flex es:px-1 es:py-0.5 es:items-center es:justify-center es:rounded-sm es:border es:border-dotted es:border-secondary-300'
													style={{ backgroundColor: color }}
												>
													<span className={clsx('es:text-xs es:font-mono es:font-medium', isDark ? 'es:text-white' : 'es:text-black')}>{(area * 100).toFixed(2)}%</span>
												</li>
											))}
										</ul>
									</TriggeredPopover>
								</>
							);
						}}
					</FilePickerShell>

					<FilePickerShell
						className='es:w-full'
						// url='https://picsum.photos/600/400.jpg'
						url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg'
						noUrlContent={<Button size='large'>Upload</Button>}
						type='image'
						analysisData={{
							isDark: false,
							isTransparent: false,
							transparencyInfo: {
								any: false,
								left: false,
								right: false,
								top: false,
								bottom: false,
							},
							dominantColors: [
								{
									color: '#e64f63',
									area: 0.42140625,
									isDark: true,
								},
								{
									color: '#6bc754',
									area: 0.292265625,
									isDark: false,
								},
								{
									color: '#de9ede',
									area: 0.286328125,
									isDark: false,
								},
							],
						}}
					>
						{({ isDark, dominantColors, isTransparent }) => {
							let buttonType = 'default';

							if (!isTransparent) {
								buttonType = isDark ? 'glass' : 'glassDark';
							}

							return (
								<>
									<Button
										className='es:grow'
										type={buttonType}
									>
										Replace
									</Button>
									<Button
										className='es:grow'
										type={buttonType}
									>
										Remove
									</Button>

									<TriggeredPopover
										triggerButtonIcon={icons.info}
										triggerButtonProps={{ type: buttonType }}
									>
										<ul className='es:flex es:items-center es:justify-center es:gap-2 es:p-2'>
											<li
												className='es:flex es:px-2 es:py-0.5 es:items-center es:justify-center es:rounded-sm es:border es:border-dotted es:border-secondary-300'
												style={{ backgroundColor: isDark ? '#000' : '#fff' }}
											>
												<span className={clsx('es:text-xs es:font-mono es:font-medium', isDark ? 'es:text-white' : 'es:text-black')}>{isDark ? 'dark' : 'light'}</span>
											</li>
											{dominantColors?.map(({ color, area, isDark }, index) => (
												<li
													key={index}
													className='es:flex es:px-1 es:py-0.5 es:items-center es:justify-center es:rounded-sm es:border es:border-dotted es:border-secondary-300'
													style={{ backgroundColor: color }}
												>
													<span className={clsx('es:text-xs es:font-mono es:font-medium', isDark ? 'es:text-white' : 'es:text-black')}>{(area * 100).toFixed(2)}%</span>
												</li>
											))}
										</ul>
									</TriggeredPopover>
								</>
							);
						}}
					</FilePickerShell>

					<FilePickerShell
						className='es:w-full'
						url='https://example.com/fakeimage.jpg'
						noUrlContent={<Button size='large'>Upload</Button>}
						type='image'
					>
						{({ isDark, hasError }) => {
							let buttonType = 'default';

							if (!hasError) {
								buttonType = isDark ? 'glass' : 'glassDark';
							}

							return (
								<>
									<Button
										className='es:grow'
										type={buttonType}
									>
										Replace
									</Button>
									<Button
										className='es:grow'
										type={buttonType}
									>
										Remove
									</Button>
								</>
							);
						}}
					</FilePickerShell>

					<FilePickerShell
						className='es:w-full'
						noUrlContent={
							<Button
								size='large'
								icon={icons.upload}
							>
								Upload
							</Button>
						}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-normal-map.jpg'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poisson-image.avif'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/unbiased-normals.png'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ascii-raymarch.jpg'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-extra-hiccup.jpg'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-rdom.svg'
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
					<SmartImage
						src=''
						className={({ isDark }) => clsx('es:p-4 es:bg-(--es-img-dominant-color) es:border-4 es:rounded-xl', isDark ? 'es:border-secondary-100' : 'es:border-secondar-800')}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default App;
