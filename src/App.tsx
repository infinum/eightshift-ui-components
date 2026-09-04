import { cloneElement, isValidElement, useState, type ComponentProps, type ReactElement, type ReactNode } from 'react';
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
	OptionSelect as OptionSelectBase,
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
	MultiSelect as MultiSelectBase,
	AsyncMultiSelect,
	Select as SelectBase,
	OptionsPanelIntro,
	FilePickerShell,
	SmartImage,
	Container,
	ContainerGroup,
	ContextualHelp,
} from '../lib';
import { clsx } from 'clsx';
import '../lib/style';
import {
	// oxlint-disable-next-line anti-slop/no-shape-in-symbol-names -- Established public icon name.
	genericShapes,
	num1Square,
	num2Circle,
	num3SquareAlt,
	num1Circle,
	num3Circle,
	num3Square,
	options,
	toggleOnAlt,
	verticalSpacing,
	animationGeneric,
	dropdownClose,
	link,
	info,
	chatBubble,
	buttonOutline,
	position3x3CenterCenter,
	hamburgerMenu,
	hoverBackgroundGlow,
	num2CircleAlt,
	responsive,
	fieldLabel,
	dropdown,
	multiple,
	loopMode,
	newTab,
	inputField,
	componentOptions,
	gridAutoRows,
	checkSquare,
	listUnordered,
	slider,
	solidCircleFilled,
	gradient,
	color,
	eyedropper,
	responsiveOverridesAlt,
	columnGuttersLr,
	group,
	layoutAlt,
	cursorMove,
	previewResponsive,
	browser,
	file,
	imageLazyLoad,
	iconGeneric,
	experiment,
	componentGeneric,
	emptyRect,
	person,
	magicFill,
	small,
	medium,
	large,
	arrowsUp,
	trash,
	save,
	rangeMid,
	resetToZero,
	screenMobile,
	screenTablet,
	screenDesktop,
	screenLarge,
	GenericColorSwatch,
	help,
	arrowDown,
	paragraph,
	heading,
	image,
	video,
	magicAlt,
	columns,
	a11yWarning,
	warning,
	bot,
	locationSettings,
	upload,
	Icon,
	emptyCircle,
} from '../lib/icons';
import { iconLoaders } from '../lib/icons/generated-icon-loaders';

type DemoOption = {
	label: string;
	value: string;
	subtitle?: ReactNode;
	icon?: string | ReactElement | null;
	metadata?: object;
	group?: string;
	category?: string;
};

type DemoPrimitive = string | number | boolean;
type DemoSelectValue = DemoOption | string | null;
type DemoMultiSelectValue = DemoOption[] | string[] | '' | null;
type DemoOptionSelectValue = string | number | boolean | null;
type DemoOptionSelectOption = Omit<ComponentProps<typeof OptionSelectBase>['options'][number], 'value' | 'icon' | 'endIcon'> & {
	value: DemoOptionSelectValue;
	icon?: ReactNode;
	endIcon?: ReactNode;
};
type DemoRangeValue = [number, number];
type DemoRangeValueTriple = [number, number, number];
type DemoColumnConfigValue = [number, number];
type DemoResponsiveValue = Record<string, DemoPrimitive | undefined>;
type DemoResponsiveLegacyValue = Record<string, string | boolean | undefined>;
type DemoLinkSuggestionItem = {
	label: string;
	value: string;
	metadata?: {
		subtype?: string | null;
	};
};
type AsyncSelectProps = ComponentProps<typeof AsyncSelect>;
type AsyncMultiSelectProps = ComponentProps<typeof AsyncMultiSelect>;
type DemoAsyncSelectOption = NonNullable<AsyncSelectProps['value']>;
type DemoAsyncMultiSelectValue = AsyncMultiSelectProps['value'];
type DemoRawAsyncItem = Parameters<NonNullable<AsyncSelectProps['getLabel']>>[0];
type DemoAsyncFetchedData = Parameters<NonNullable<AsyncSelectProps['getData']>>[0];
type DemoRawItemValue = string | number | boolean | bigint | symbol | null | undefined | object;
type DemoTabsType = 'underline' | 'underlineSecondary' | 'pill' | 'pillCompact' | 'bubble' | 'chips';
type DemoButtonType = 'default' | 'glass' | 'glassDark';
type DemoMatrixAlignValue = 'top left' | 'top center' | 'top right' | 'center left' | 'center center' | 'center right' | 'bottom left' | 'bottom center' | 'bottom right';
type DemoRepeaterItem = {
	title: string;
	subtitle?: string;
	toggledThingy?: boolean;
	link?: string;
};
type DemoRepeaterItemWithIcon = DemoRepeaterItem & {
	icon?: ReactElement;
};
type DemoDraggableItem = {
	toggle: boolean;
	title?: string;
};
type DemoDraggableListItem = DemoDraggableItem & {
	icon?: ReactElement;
};
type DemoDraggableRenderItem = DemoDraggableItem & {
	updateData: (newValue: Partial<DemoDraggableItem>) => void;
	itemIndex: number;
	deleteItem: () => void;
};
type DemoDraggableListRenderItem = DemoDraggableListItem & {
	updateData: (newValue: Partial<DemoDraggableListItem>) => void;
	itemIndex: number;
	deleteItem: () => void;
};
type FilePickerShellDemoProps = ComponentProps<typeof FilePickerShell>;

const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

// SAFETY: This adapter binds Draggable's generic item contract to the demo item type.
const TypedDraggable = Draggable as (props: {
	items?: DemoDraggableItem[] | null;
	onChange: (items: DemoDraggableItem[]) => void;
	className?: string;
	onAfterItemRemove?: (item: DemoDraggableItem) => void;
	axis?: 'both' | 'horizontal' | 'vertical';
	children: (item: DemoDraggableRenderItem) => ReactNode;
}) => ReactNode;

// SAFETY: This adapter binds DraggableList's generic item contract to the demo item type.
const TypedDraggableList = DraggableList as (props: {
	label?: ReactNode;
	items?: DemoDraggableListItem[] | null;
	onChange: (items: DemoDraggableListItem[]) => void;
	onAfterItemRemove?: (item: DemoDraggableListItem) => void;
	children: (item: DemoDraggableListRenderItem) => ReactNode;
}) => ReactNode;

// SAFETY: This adapter binds Select's generic option contract to the demo option type.
const TypedSelect = SelectBase as (props: {
	label?: ReactNode;
	value: DemoSelectValue;
	onChange: (value: DemoSelectValue) => void;
	options: DemoOption[];
	simpleValue?: boolean;
	searchable?: boolean;
	clearable?: boolean;
	groupKey?: string;
	groupValueMapping?: Record<string, { label?: ReactNode; icon?: string | ReactElement | null; subtitle?: ReactNode; endIcon?: string | ReactElement | null }>;
	customValueDisplay?: (item: DemoOption | null) => ReactNode;
	customMenuOption?: (item: DemoOption) => ReactNode;
	icon?: ReactElement;
	inline?: boolean;
	subtitle?: ReactNode;
	help?: ReactNode;
	title?: string;
	placeholder?: string;
}) => ReactNode;

// SAFETY: This adapter binds MultiSelect's generic option contract to the demo option type.
const TypedMultiSelect = MultiSelectBase as (props: {
	label?: ReactNode;
	value: DemoMultiSelectValue;
	onChange: (value: DemoMultiSelectValue) => void;
	options: DemoOption[];
	clearable?: boolean;
	groupKey?: string;
	groupValueMapping?: Record<string, { label?: ReactNode; icon?: string | ReactElement | null; subtitle?: ReactNode; endIcon?: string | ReactElement | null }>;
	searchable?: boolean;
	customValueDisplay?: (item: DemoOption | null) => ReactNode;
}) => ReactNode;

const Select = TypedSelect;

// SAFETY: This adapter exposes the legacy InputField prop subset used throughout the demo.
const TypedInputField = InputField as (props: {
	value?: string;
	onChange?: (value: string) => void;
	label?: ReactNode;
	type?: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'multiline';
	inline?: boolean;
	flat?: boolean;
	disabled?: boolean;
	size?: 'small' | 'medium' | 'default' | 'large';
}) => ReactNode;

const OptionSelect = ({
	value,
	onChange,
	options,
	itemProps,
	...rest
}: Omit<ComponentProps<typeof OptionSelectBase>, 'value' | 'onChange' | 'options' | 'itemProps'> & {
	value?: DemoOptionSelectValue;
	onChange?: (value: string) => void;
	options?: DemoOptionSelectOption[];
	itemProps?: ComponentProps<typeof OptionSelectBase>['itemProps'] | false;
}) => (
	<OptionSelectBase
		{...rest}
		itemProps={itemProps || undefined}
		value={value === null || value === undefined ? undefined : String(value)}
		onChange={(nextValue) => onChange?.(String(nextValue))}
		options={(options ?? []).map(({ icon: optionIcon, endIcon: optionEndIcon, ...option }) => ({
			...option,
			icon: isStringValue(optionIcon) || isValidElement(optionIcon) ? optionIcon : undefined,
			endIcon: isStringValue(optionEndIcon) || isValidElement(optionEndIcon) ? optionEndIcon : undefined,
			value: option.value === null || option.value === undefined ? '' : String(option.value),
		}))}
	/>
);

const slugify = (input: string | number) => {
	return input
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

const iconEntries = Object.keys(iconLoaders).sort((iconNameA, iconNameB) => iconNameA.localeCompare(iconNameB));

const FilePickerShellDemo = ({ url, ...rest }: FilePickerShellDemoProps) => (
	<FilePickerShell
		className='es:w-full'
		// url='https://picsum.photos/600/400.jpg'
		url={url}
		noUrlContent={<Button size='large'>Upload</Button>}
		type='image'
		{...rest}
	>
		{({ isDark, dominantColors, isTransparent, hasError }) => {
			let buttonType: DemoButtonType = 'default';

			if (!isTransparent && !hasError) {
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
						triggerButtonIcon={info}
						triggerButtonProps={{ type: buttonType }}
						hidden={hasError}
					>
						<ul className='es:flex es:items-center es:justify-center es:gap-2 es:p-2'>
							<li
								className='es:flex es:px-2 es:py-0.5 es:items-center es:justify-center es:rounded-sm es:border es:border-dotted es:border-secondary-300'
								style={{ backgroundColor: isDark ? '#000' : '#fff' }}
							>
								<span className={clsx('es:text-xs es:font-mono es:font-medium', isDark ? 'es:text-white' : 'es:text-black')}>{isDark ? 'dark' : 'light'}</span>
							</li>
							{dominantColors?.map(({ color, isDark }, index) => (
								<li
									key={index}
									className='es:flex es:px-1 es:py-0.5 es:items-center es:justify-center es:rounded-sm es:border es:border-dotted es:border-secondary-300'
									style={{ backgroundColor: color }}
								>
									<span className={clsx('es:text-xs es:font-mono es:font-medium', isDark ? 'es:text-white' : 'es:text-black')}>{color}</span>
								</li>
							))}
						</ul>
					</TriggeredPopover>
				</>
			);
		}}
	</FilePickerShell>
);

function App() {
	const [controlTheme, setControlTheme] = useState('default');

	const [toggled, setToggled] = useState(false);
	const [toggled2, setToggled2] = useState<boolean | null>(null);
	const [toggled3, setToggled3] = useState(false);
	const [toggled4, setToggled4] = useState(false);
	const [toggled5, setToggled5] = useState(false);
	const [linkTxt, setLinkTxt] = useState<string | undefined>(undefined);
	const [matrixVal, setMatrixVal] = useState<DemoMatrixAlignValue>('center center');
	const [matrixVal2, setMatrixVal2] = useState<DemoMatrixAlignValue>('top left');
	const [menuThingy, setMenuThingy] = useState(false);
	const [menuThingy2, setMenuThingy2] = useState(false);
	const [num, setNum] = useState(0);
	const [animVis, setAnimVis] = useState(true);
	const [txt1, setTxt1] = useState('');
	const [txt2, setTxt2] = useState('');
	const [useComp, setUseComp] = useState(false);
	const [loremIpsum, setLoremIpsum] = useState('s');
	const [loremIpsum2, setLoremIpsum2] = useState('s');
	const [radioValue, setRadioValue] = useState<string | undefined>(undefined);
	const [modalOpen, setModalOpen] = useState(false);
	const [buttonPending, setButtonPending] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const [sinSel, setSinSel] = useState<DemoSelectValue>(null);
	const [sinSelSimple, setSinSelSimple] = useState<DemoSelectValue>(null);
	const [mulSel, setMulSel] = useState<DemoMultiSelectValue>(null);
	const [sinASel, setSinASel] = useState<DemoAsyncSelectOption | null>(null);
	const [sinASel2, setSinASel2] = useState<DemoAsyncSelectOption | null>(null);
	const [mulASel, setMulASel] = useState<DemoAsyncMultiSelectValue>(null);

	const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

	const [resp, setResp] = useState<DemoResponsiveValue>({
		_default: 'sans',
		_desktopFirst: false,
	});

	const [resp2, setResp2] = useState<DemoResponsiveValue>({
		_default: 'sans',
		_desktopFirst: false,
	});

	const respOpt: DemoOption[] = [
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

	const linkData: DemoLinkSuggestionItem[] = [
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

	const getLinkData = async (searchTerm = ''): Promise<DemoLinkSuggestionItem[]> => {
		if (!searchTerm) {
			return linkData;
		}

		const filtered = linkData.filter(
			({ label, value }) => label.toLowerCase().includes(searchTerm.toLowerCase().trim()) || value.toLowerCase().includes(searchTerm.toLowerCase().trim()),
		);

		await new Promise<void>((resolve) => setTimeout(resolve, 500));

		if (filtered.length > 0) {
			return filtered;
		}

		return [];
	};

	const data: DemoOption[] = [
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
			icon: num3Square,
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
			icon: experiment,
			value: 'item-7',
		},
	];

	const groupedData: DemoOption[] = [
		{ label: 'Red', value: 'red', group: 'Colors' },
		{ label: 'Green', value: 'green', group: 'Colors' },
		{ label: 'Blue', value: 'blue', group: 'Colors' },
		{ label: 'Circle', value: 'circle', group: 'Shapes' },
		{ label: 'Square', value: 'square', group: 'Shapes' },
		{ label: 'Triangle', value: 'triangle', group: 'Shapes' },
		{ label: 'Other stuff', value: 'other' },
	];

	const getAsyncGroupedData = (searchText?: string): Promise<DemoOption[]> => {
		const filterData = ({ label }: DemoOption) => label.toLowerCase().includes(searchText?.toLowerCase() ?? '');

		return new Promise<DemoOption[]>((resolve) => {
			setTimeout(() => {
				if (!searchText) {
					resolve(groupedData);

					return;
				}

				resolve(groupedData.filter(filterData));
			}, 300);
		});
	};

	const getRawItemValue = (item: DemoRawAsyncItem, key: string): DemoRawItemValue => {
		// SAFETY: DemoRawItemValue covers every JavaScript property value exposed by the fetched demo payloads.
		const entries = Object.entries(item) as Array<[string, DemoRawItemValue]>;

		return entries.find(([entryKey]) => entryKey === key)?.[1];
	};

	const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';
	const isNumberValue = <T,>(value: T): value is T & number => Object.prototype.toString.call(value) === '[object Number]';

	const getItemString = (item: DemoRawAsyncItem, key: string) => {
		const value = getRawItemValue(item, key);

		return isStringValue(value) ? value : undefined;
	};

	const getItemStringValue = (item: DemoRawAsyncItem, key: string) => {
		const value = getRawItemValue(item, key);

		if (isStringValue(value)) {
			return value;
		}

		if (isNumberValue(value)) {
			return String(value);
		}

		return undefined;
	};

	const mapItemsWithSlugValue = (items: DemoRawAsyncItem[]) =>
		items.map((item) => {
			Object.defineProperty(item, 'value', { configurable: true, enumerable: true, value: slugify(getItemStringValue(item, 'name') ?? ''), writable: true });

			return item;
		});

	const getJokeItems = (data: DemoAsyncFetchedData): DemoRawAsyncItem[] => (Array.isArray(data) ? data : (data.jokes ?? []));

	const [v, setV] = useState<DemoSelectValue>(null);

	const [tabVar, setTabVar] = useState<DemoTabsType>('underline');

	const [draggableLayout, setDraggableLayout] = useState<'grid' | 'horizontal' | 'vertical'>('grid');

	const [cpOpen, setCpOpen] = useState(false);

	const repeaterDefaultItems: DemoRepeaterItem[] = [
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

	const repeaterDefaultItems2: DemoRepeaterItemWithIcon[] = [
		{
			title: 'Item 1',
			icon: num1Square,
		},
		{
			title: 'Item 2',
			subtitle: 'Lorem',
			icon: num2Circle,
		},
		{
			title: 'Item 3',
			icon: num3SquareAlt,
		},
	];

	const draggableListDefaultItems: DemoDraggableListItem[] = [
		{
			toggle: false,
			title: 'Item 1',
			icon: num1Circle,
		},
		{
			toggle: true,
			title: 'Item 2',
			icon: num2Circle,
		},
		{
			toggle: true,
			icon: num3Circle,
		},
	];

	const draggableDefaultItems: DemoDraggableItem[] = [
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
	const [draggableListItems, setDraggableListItems] = useState<DemoDraggableListItem[]>(draggableListDefaultItems);
	const [draggableListItems2, setDraggableListItems2] = useState<DemoDraggableListItem[]>(draggableListDefaultItems);
	const [draggableItems, setDraggableItems] = useState<DemoDraggableItem[]>(draggableDefaultItems);

	const [sliderValue, setSliderValue] = useState(0);
	const [sliderValue2, setSliderValue2] = useState(0);
	const [rangeSliderValue, setRangeSliderValue] = useState<DemoRangeValue>([33, 66]);
	const [rangeSliderValue2, setRangeSliderValue2] = useState<DemoRangeValueTriple>([33, 55, 66]);

	const [currColor, setCurrColor] = useState<string | undefined>('#0D3636');
	const [currColor2, setCurrColor2] = useState<string | undefined>('#0D3636');
	const [currColor3, setCurrColor3] = useState<string | undefined>('hsla(180, 61.19%, 13.14%, 1)');
	const [grad, setGrad] = useState('linear-gradient(30deg, #000, #00000000)');

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

	const [color1, setColor1] = useState<string | undefined>(undefined);
	const [color3, setColor3] = useState<string | undefined>('blue');
	const [color2, setColor2] = useState<string | undefined>('blue500');

	const respOptions = [
		{ label: 'Lorem', value: false },
		{ label: 'Ipsum', value: true },
	];

	const [responsiveState, setResponsiveState] = useState<DemoResponsiveLegacyValue>({
		myAttrLarge: false,
		myAttrDesktop: undefined,
		myAttrTablet: undefined,
		myAttrMobile: true,
	});

	const [responsiveState2, setResponsiveState2] = useState<DemoResponsiveLegacyValue>({
		myAttrLarge: false,
		myAttrDesktop: undefined,
		myAttrTablet: undefined,
		myAttrMobile: true,
	});

	const [responsiveState3, setResponsiveState3] = useState<DemoResponsiveLegacyValue>({
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

	const [colConfig, setColConfig] = useState<DemoColumnConfigValue>([2, 4]);
	const [colConfig2, setColConfig2] = useState<DemoColumnConfigValue>([2, 4]);
	const [colConfig3, setColConfig3] = useState<DemoColumnConfigValue>([2, 4]);
	const [colConfig4, setColConfig4] = useState<DemoColumnConfigValue>([2, 4]);
	const [colConfig5, setColConfig5] = useState<DemoColumnConfigValue>([2, 4]);

	const handleSliderValueChange = (value: number | number[]) => {
		if (isNumberValue(value)) {
			setSliderValue(value);
		}
	};

	const handleSliderValue2Change = (value: number | number[]) => {
		if (isNumberValue(value)) {
			setSliderValue2(value);
		}
	};

	const handleRangeSliderValueChange = (value: number | number[]) => {
		if (Array.isArray(value) && value.length === 2) {
			setRangeSliderValue([value[0] ?? 0, value[1] ?? 0]);
		}
	};

	const handleRangeSliderValue2Change = (value: number | number[]) => {
		if (Array.isArray(value) && value.length === 3) {
			setRangeSliderValue2([value[0] ?? 0, value[1] ?? 0, value[2] ?? 0]);
		}
	};

	const handleCurrColorChange = (value?: string) => setCurrColor(value);
	const handleCurrColor2Change = (value?: string) => setCurrColor2(value);
	const handleCurrColor3Change = (value?: string) => setCurrColor3(value);
	const handleColor1Change = (value?: string) => setColor1(value);
	const handleColor2Change = (value?: string) => setColor2(value);
	const handleColor3Change = (value?: string) => setColor3(value);
	const isMatrixAlignValue = (value: string): value is DemoMatrixAlignValue =>
		value === 'top left' ||
		value === 'top center' ||
		value === 'top right' ||
		value === 'center left' ||
		value === 'center center' ||
		value === 'center right' ||
		value === 'bottom left' ||
		value === 'bottom center' ||
		value === 'bottom right';
	const handleMatrixValChange = (value: string) => {
		if (isMatrixAlignValue(value)) {
			setMatrixVal(value);
		}
	};
	const handleMatrixVal2Change = (value: string) => {
		if (isMatrixAlignValue(value)) {
			setMatrixVal2(value);
		}
	};
	const handleSelectValueChange = (value: DemoSelectValue) => setV(value);
	const handleTabVarChange = (value: DemoOptionSelectValue) => {
		if (value === 'underline' || value === 'underlineSecondary' || value === 'pill' || value === 'pillCompact' || value === 'bubble' || value === 'chips') {
			setTabVar(value);
		}
	};
	const handleDraggableLayoutChange = (value: DemoOptionSelectValue) => {
		if (value === 'grid' || value === 'horizontal' || value === 'vertical') {
			setDraggableLayout(value);
		}
	};
	const handleDraggableItemsChange = (items: DemoDraggableItem[]) => setDraggableItems(items);
	const handleDraggableListItemsChange = (items: DemoDraggableListItem[]) => setDraggableListItems(items);
	const handleDraggableListItems2Change = (items: DemoDraggableListItem[]) => setDraggableListItems2(items);

	return (
		<div className='es:flex es:flex-col es:items-center es:justify-center es:overscroll-none es:p-10'>
			<TriggeredPopover
				triggerButtonIcon={options}
				triggerButtonProps={{ className: 'es:absolute es:top-4 es:right-4' }}
				className='es:p-4'
			>
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
					inline
				/>
			</TriggeredPopover>

			<div className='es:mx-auto es:flex es:w-90 es:flex-col es:items-center es:justify-center es:gap-2.5 es:p-10 es:empty:hidden' />

			<Tabs
				vertical
				type='bubble'
				className='es:self-start'
				onSelectionChange={(key) => {
					const url = new URL(window.location.href);
					url.searchParams.set('tab', String(key));
					window.history.replaceState({}, '', url);
				}}
				defaultSelectedKey={new URLSearchParams(window.location.search).get('tab') ?? undefined}
			>
				<TabList className='es:sticky es:top-16'>
					<Tab
						icon={toggleOnAlt}
						label='Toggle / Switch'
						id='toggle'
					/>
					<Tab
						icon={verticalSpacing}
						label='Spacer'
						id='spacer'
					/>
					<Tab
						icon={animationGeneric}
						label='Animated visibility'
						id='anim-vis'
					/>
					<Tab
						icon={dropdownClose}
						label='Expandable'
						id='expandable'
					/>
					<Tab
						icon={link}
						label='LinkInput'
						id='link-input'
					/>
					<Tab
						icon={info}
						label='Notice'
						id='notice'
					/>
					<Tab
						icon={chatBubble}
						label='Triggered popover'
						id='triggered-popover'
					/>
					<Tab
						icon={buttonOutline}
						label='Button'
						id='button'
					/>
					<Tab
						icon={position3x3CenterCenter}
						label='Matrix align'
						id='matrix-align'
					/>
					<Tab
						icon={hamburgerMenu}
						label='Menu'
						id='menu'
					/>
					<Tab
						icon={hoverBackgroundGlow}
						label='Tooltip'
						id='tooltip'
					/>
					<Tab
						icon={num2CircleAlt}
						label='Number picker'
						id='num-pick'
					/>
					<Tab
						icon={responsive}
						label='Responsive 2.0'
						id='responsive-2'
					/>
					<Tab
						icon={fieldLabel}
						label='Base control'
						id='base-ctrl'
					/>
					<Tab
						icon={dropdown}
						label='Select'
						id='select'
					/>
					<Tab
						icon={multiple}
						label='MultiSelect'
						id='multi-select'
					/>
					<Tab
						icon={loopMode}
						label='AsyncSelect'
						id='async-select'
					/>
					<Tab
						icon={loopMode}
						label='AsyncMultiSelect'
						id='async-multi-select'
					/>
					<Tab
						icon={newTab}
						label='Tabs'
						id='tabs'
					/>
					<Tab
						icon={inputField}
						label='Input field'
						id='input'
					/>
					<Tab
						icon={componentOptions}
						label='Component toggle'
						id='comp-toggle'
					/>
					<Tab
						icon={gridAutoRows}
						label='Repeater'
						id='repeater'
					/>
					<Tab
						icon={checkSquare}
						label='Checkbox'
						id='checbox'
					/>
					<Tab
						icon={listUnordered}
						label='Radio button'
						id='radio'
					/>
					<Tab
						icon={slider}
						label='Slider'
						id='slider'
					/>
					<Tab
						icon={solidCircleFilled}
						label='Solid color picker'
						id='solid-color-pick'
					/>
					<Tab
						icon={gradient}
						label='Gradient editor'
						id='gradient-editor'
					/>
					<Tab
						icon={color}
						label='Color swatch'
						id='color-swatch'
					/>
					<Tab
						icon={eyedropper}
						label='Color picker'
						id='color-picker'
					/>
					<Tab
						icon={responsiveOverridesAlt}
						label='Responsive (legacy)'
						id='resp-legacy'
					/>
					<Tab
						icon={columnGuttersLr}
						label='Column config slider'
						id='col-config-slider'
					/>
					<Tab
						icon={group}
						label='Container panel'
						id='cont-panel'
					/>
					<Tab
						icon={layoutAlt}
						label='Layout components'
						id='stacks'
					/>
					<Tab
						icon={emptyCircle}
						label='Placeholders'
						id='placeholder'
					/>
					<Tab
						icon={cursorMove}
						label='Draggable'
						id='draggable'
					/>
					<Tab
						icon={cursorMove}
						label='Draggable list'
						id='draggable-list'
					/>
					<Tab
						icon={options}
						label='Options panel'
						id='opt-panel'
					/>
					<Tab
						icon={previewResponsive}
						label='Responsive preview'
						id='resp-preview'
					/>
					<Tab
						icon={browser}
						label='Modal'
						id='modal'
					/>
					<Tab
						icon={multiple}
						label='Item collection'
						id='item-collection'
					/>
					<Tab
						icon={file}
						label='File picker shell'
						id='file-picker-shell'
					/>
					<Tab
						icon={imageLazyLoad}
						label='Smart image'
						id='smart-img'
					/>
					<Tab
						icon={iconGeneric}
						label='Icons'
						id='icons'
					/>
				</TabList>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Toggle
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={experiment}
						label='Airplane mode'
					/>

					<Toggle
						checked={toggled}
						onChange={(value) => setToggled(value)}
						icon={experiment}
						label='Airplane mode flat'
						flat
					/>

					<Toggle
						checked
						onChange={(value) => setToggled(value)}
						icon={experiment}
						label='Airplane mode'
						disabled
					/>

					<Toggle
						checked={false}
						onChange={(value) => setToggled(value)}
						icon={experiment}
						label='Airplane mode'
						disabled
					/>

					<Switch
						checked={toggled}
						onChange={(value) => setToggled(value)}
					/>

					<Switch
						checked={toggled}
						onChange={(value) => setToggled(value)}
						size='small'
					/>

					<Switch
						checked={toggled}
						onChange={(value) => setToggled(value)}
						size='medium'
					/>

					<Switch
						checked={toggled2 ?? false}
						onChange={(value) => setToggled2(value)}
						isIndeterminate={toggled2 === null}
					/>

					<Container standalone>
						<Toggle
							checked={toggled}
							onChange={(value) => setToggled(value)}
							icon={experiment}
							label='Airplane mode'
						/>
					</Container>

					<ContainerGroup label='Example group'>
						<Container compact>
							<Toggle
								checked={toggled}
								onChange={(value) => setToggled(value)}
								icon={experiment}
								label='Airplane mode'
							/>
						</Container>{' '}
						<Container compact>
							<Toggle
								checked={toggled}
								onChange={(value) => setToggled(value)}
								icon={experiment}
								label='Airplane mode'
							/>
						</Container>{' '}
						<Container compact>
							<Toggle
								checked={toggled}
								onChange={(value) => setToggled(value)}
								icon={experiment}
								label='Airplane mode'
							/>
						</Container>
					</ContainerGroup>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Spacer
						size='s'
						className='es:bg-violet-50'
						border
					/>

					<Spacer border />

					<Spacer icon={componentGeneric} />
					<Spacer
						icon={componentGeneric}
						label='My divider'
					/>
					<Spacer
						icon={componentGeneric}
						label='My divider'
						subtitle='Lorem ipsum'
					/>

					<Spacer
						icon={componentGeneric}
						border
					/>
					<Spacer
						icon={componentGeneric}
						label='My divider'
						border
					/>
					<Spacer
						icon={componentGeneric}
						label='My divider'
						subtitle='Lorem ipsum'
						border
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<HStack>
						<ToggleButton
							selected={animVis}
							onChange={setAnimVis}
						>
							Show
						</ToggleButton>

						<ToggleButton
							selected={animVis}
							onChange={setAnimVis}
							type='simple'
						>
							Show
						</ToggleButton>

						<ToggleButton
							selected={animVis}
							onChange={setAnimVis}
							type='ghost'
						>
							Show
						</ToggleButton>
					</HStack>

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
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:p-5!'>
					<Expandable
						standalone
						icon={experiment}
						label='Lorem ipsum dolor'
						actions={
							<Button
								onPress={() => console.log('hi')}
								icon={emptyRect}
								type='ghost'
								size='small'
							/>
						}
					>
						<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>lorem</div>

						<Button
							onPress={() => console.log('hi')}
							icon={emptyRect}
							type='ghost'
							size='small'
						/>
					</Expandable>

					<Expandable
						standalone
						icon={experiment}
						label='Lorem ipsum dolor'
						actions={
							<Button
								onPress={() => console.log('hi')}
								icon={emptyRect}
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
						icon={experiment}
						label='Lorem ipsum dolor'
						keepActionsOnExpand
						actions={
							<Button
								onPress={() => console.log('hi')}
								icon={emptyCircle}
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
							icon={experiment}
							label='Lorem ipsum dolor'
							actions={
								<Button
									onPress={() => console.log('hi')}
									icon={emptyRect}
									type='ghost'
									size='small'
								/>
							}
						>
							<div className='es:h-40 es:w-full es:rounded-md es:bg-secondary-200 es:p-4'>lorem</div>
							<Button
								onPress={() => console.log('hi')}
								icon={emptyRect}
								type='ghost'
								size='small'
							/>
						</Expandable>

						<Expandable
							icon={experiment}
							label='Lorem ipsum dolor'
							actions={
								<Button
									onPress={() => console.log('hi')}
									icon={emptyRect}
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
							icon={experiment}
							label='Lorem ipsum dolor'
							keepActionsOnExpand
							actions={
								<Button
									onPress={() => console.log('hi')}
									icon={emptyCircle}
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
						keyboardShortcuts
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
						icon={experiment}
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
						icon={person}
						label='Post meta'
						subtitle='will be shown here'
						type='placeholder'
					/>
					<Notice
						icon={person}
						label='Post meta'
						type='placeholder'
					/>
					<Notice
						icon={person}
						subtitle='Post meta'
						type='placeholder'
					/>

					<Notice
						icon={person}
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
						icon={magicFill}
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
						className='es:bg-cover es:p-8 es:space-y-5 es:bg-bottom-right'
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
							icon={componentGeneric}
						/>
						<Button size='small'>Hello</Button>
						<Button
							size='small'
							icon={componentGeneric}
						>
							Hello
						</Button>
					</div>

					<div className='es:flex es:items-center es:gap-2'>
						<Button icon={componentGeneric} />
						<Button>Hello</Button>
						<Button icon={componentGeneric}>Hello</Button>
					</div>

					<Button
						icon={componentGeneric}
						type='danger'
					>
						Hello
					</Button>
					<Button
						icon={componentGeneric}
						type='danger'
					>
						Hello
					</Button>

					<Button
						icon={componentGeneric}
						type='dangerGhost'
					>
						Hello
					</Button>

					<Button
						icon={componentGeneric}
						type='danger'
						disabled
					>
						Hello
					</Button>
					<Button
						icon={componentGeneric}
						type='ghost'
					>
						Hello
					</Button>
					<Button
						icon={componentGeneric}
						type='ghost'
						disabled
					>
						Hello
					</Button>

					<Button
						icon={componentGeneric}
						type='selectedGhost'
					>
						Hello
					</Button>

					<Button
						icon={componentGeneric}
						type='selectedGhost'
						disabled
					>
						Hello
					</Button>

					<div className='es:flex es:items-center es:gap-2'>
						<Button
							size='large'
							icon={componentGeneric}
						/>
						<Button size='large'>Hello</Button>
						<Button
							size='large'
							icon={componentGeneric}
						>
							Hello
						</Button>
					</div>

					<Button icon={emptyRect}>Hello</Button>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'simple' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'ghost' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ size: 'small' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'simple', size: 'small' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'ghost', size: 'small' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ size: 'large' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'simple', size: 'large' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						itemProps={{ type: 'ghost', size: 'large' }}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
					/>

					<hr className='es:my-2' />

					<OptionSelect
						value={loremIpsum2}
						onChange={(v) => setLoremIpsum2(v)}
						options={[
							{ tooltip: 'Small', value: 0, icon: small },
							{ tooltip: 'Medium', value: 1, icon: medium },
							{ tooltip: 'Large', value: 2, icon: large },
						]}
						vertical
					/>

					<OptionSelect
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						vertical
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<MatrixAlign
						value={matrixVal}
						onChange={handleMatrixValChange}
					/>

					<MatrixAlign
						value={matrixVal2}
						onChange={handleMatrixVal2Change}
						size='2x2'
						icon={arrowsUp}
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
								icon={trash}
								id='del'
							>
								Delete
							</MenuItem>
							<MenuItem
								primary
								icon={save}
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
								icon={experiment}
								selected={menuThingy}
								id='save2'
								onClick={() => setMenuThingy(true)}
							>
								Save
							</MenuItem>
							<MenuItem
								selected={!menuThingy}
								icon={experiment}
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
							endIcon={emptyRect}
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
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
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
								{ label: 'Small', value: 0, icon: small },
								{ label: 'Medium', value: 1, icon: medium },
								{ label: 'Large', value: 2, icon: large },
							]}
							label='Pero'
							icon={small}
							wrapperProps={{ keepOpen: true }}
						/>
						<MenuSeparator />
						<OptionSelect
							type='submenu'
							value={loremIpsum}
							onChange={(v) => setLoremIpsum(v)}
							options={[
								{ label: 'Small', value: 0, icon: small },
								{ label: 'Medium', value: 1, icon: medium },
								{ label: 'Large', value: 2, icon: large },
							]}
							label='Pero'
							icon={small}
							wrapperProps={{ keepOpen: true }}
						/>
						<MenuSeparator />
						<OptionSelect
							type='submenu'
							value={loremIpsum}
							onChange={(v) => setLoremIpsum(v)}
							options={[
								{ label: 'Small', value: 0, icon: small },
								{ label: 'Medium', value: 1, icon: medium },
								{ label: 'Large', value: 2, icon: large },
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
								{ label: 'Small', value: 0, icon: small },
								{ label: 'Medium', value: 1, icon: medium },
								{ label: 'Large', value: 2, icon: large },
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
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						noTriggerIcon
						tooltip='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						noTriggerLabel
						tooltip='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						label='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						noTriggerIcon
						label='Size'
					/>

					<OptionSelect
						type='menu'
						value={loremIpsum}
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						noTriggerLabel
						label='Size'
					/>

					<OptionSelect
						type='menu'
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						noTriggerLabel
						label='Not set demo'
					/>

					<OptionSelect
						type='menu'
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
						]}
						noTriggerIcon
						label='Not set demo'
					/>
					<OptionSelect
						type='menu'
						onChange={(v) => setLoremIpsum(v)}
						options={[
							{ label: 'Small', value: 0, icon: small },
							{ label: 'Medium', value: 1, icon: medium },
							{ label: 'Large', value: 2, icon: large },
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
						icon={rangeMid}
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
						icon={rangeMid}
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
						icon={rangeMid}
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
						icon={rangeMid}
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
						icon={rangeMid}
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
						icon={rangeMid}
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
							icon={resetToZero}
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
							icon={resetToZero}
							disabled={num === 0}
							slot={null}
						/>
					</NumberPicker>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Responsive
						icon={emptyRect}
						label='Font family'
						value={resp}
						onChange={setResp}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					>
						{({ currentValue, handleChange, options }) => (
							<OptionSelect
								options={options ?? []}
								onChange={(value) => handleChange(value)}
								value={currentValue}
							/>
						)}
					</Responsive>

					<Responsive
						icon={emptyRect}
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
								options={options ?? []}
								onChange={(value) => handleChange(value)}
								value={currentValue}
								type={isInlineCollapsedView ? 'menu' : 'toggleButtons'}
							/>
						)}
					</Responsive>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(resp, null, 2)}</pre>

					<Spacer border />

					<MiniResponsive
						icon={emptyRect}
						label='Font family'
						value={resp}
						onChange={setResp}
						options={respOpt}
						breakpoints={['mobile', 'tablet', 'desktop', 'large']}
						breakpointData={globalManifest.globalVariables.breakpoints}
					>
						{({ currentValue, handleChange, options, isInlineCollapsedView }) => (
							<OptionSelect
								options={options ?? []}
								onChange={(value) => handleChange(value)}
								value={currentValue}
								type={isInlineCollapsedView ? 'menu' : 'toggleButtons'}
								itemProps={isInlineCollapsedView ? undefined : { type: 'simple' }}
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
								options={options ?? []}
								onChange={(value) => handleChange(value)}
								value={currentValue}
								type={isInlineCollapsedView ? 'menu' : 'toggleButtons'}
								aria-label='Font family'
								itemProps={isInlineCollapsedView ? undefined : { type: 'simple' }}
								tooltip
							/>
						)}
					</MiniResponsive>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(resp, null, 2)}</pre>

					<Spacer border />

					<Responsive
						icon={emptyRect}
						label='Font family'
						value={resp2}
						onChange={setResp2}
						options={respOpt}
						breakpoints={['sm', 'md', 'lg', 'xl']}
						breakpointData={globalManifest2.globalVariables.breakpoints}
						breakpointUiData={{
							sm: { label: 'Mobile', icon: screenMobile },
							md: { label: 'Tablet', icon: screenTablet },
							lg: { label: 'Desktop', icon: screenDesktop },
							xl: { label: 'Large', icon: screenLarge },
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

					<BaseControl icon={emptyCircle}>
						<Button>Hi</Button>
					</BaseControl>

					<BaseControl
						icon={emptyCircle}
						label='Moja lijepa komponenta'
					>
						<Button>Hi</Button>
					</BaseControl>

					<BaseControl
						icon={emptyCircle}
						label='Moja lijepa komponenta'
						subtitle='Subtitle'
					>
						<Button>Hi</Button>
					</BaseControl>

					<BaseControl
						icon={emptyCircle}
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
						icon={emptyCircle}
						label='Moja lijepa komponenta'
						subtitle='Hello from the subtitle side'
					>
						<Button>Hi</Button>
					</BaseControl>

					<BaseControl
						icon={emptyCircle}
						label='Moja lijepa lo rem ip sum kom po nen ta'
						subtitle='Hello from the subtitle side'
						actions={
							<>
								<Button icon={emptyCircle} />
								<Button icon={emptyCircle} />
								<Button icon={emptyCircle} />
							</>
						}
					>
						<Button>Hi</Button>
					</BaseControl>

					<BaseControl
						icon={emptyCircle}
						label='Moja lijepa komponenta'
						actions={
							<ContextualHelp
								label='Lorem ipsum dolor'
								subtitle='Lorem ipsum dolor sit amet. Lorem dolor sit amet.'
								icon={info}
							/>
						}
						inline
					>
						<div className='es:bg-gray-50 es:size-10' />
					</BaseControl>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<TypedSelect
						label='Single basic'
						value={sinSel}
						onChange={setSinSel}
						options={data}
					/>
					<TypedSelect
						label='Simple value'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
					/>
					<TypedSelect
						label='Searchable'
						value={sinSel}
						onChange={setSinSel}
						options={data}
						searchable
					/>
					<TypedSelect
						label='Clearable'
						value={sinSel}
						onChange={setSinSel}
						options={data}
						clearable
					/>
					<hr className='es:my-2' />
					<TypedSelect
						label='Grouped'
						value={sinSel}
						onChange={setSinSel}
						options={groupedData}
						groupKey='group'
						clearable
					/>
					<TypedSelect
						label='Grouped with mapping'
						value={sinSel}
						onChange={setSinSel}
						options={groupedData}
						groupKey='group'
						groupValueMapping={{
							Colors: { label: 'Vibrant Colors', icon: <GenericColorSwatch />, subtitle: 'Pick a favorite shade', endIcon: 'star' },
							// oxlint-disable-next-line anti-slop/no-shape-in-symbol-names -- Established public icon name.
							'Shapes': { label: 'Geometric Shapes', icon: genericShapes, subtitle: 'Standard geometry' },
							_other: { label: 'Miscellaneous', icon: help },
						}}
						searchable
						clearable
					/>
					<hr className='es:my-2' />
					<TypedSelect
						label='Custom value display'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						customValueDisplay={(item) => <span className='es:font-bold es:text-blue-400'>{item?.label}</span>}
					/>
					<TypedSelect
						label='Custom menu option'
						value={sinSelSimple}
						onChange={setSinSelSimple}
						options={data}
						simpleValue
						customMenuOption={(item) => <span className='es:font-bold es:text-blue-400'>{item?.label}</span>}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<TypedMultiSelect
						label='Multi basic'
						value={mulSel}
						onChange={setMulSel}
						options={data}
					/>
					<TypedMultiSelect
						label='Multi clearable'
						value={mulSel}
						onChange={setMulSel}
						options={data}
						clearable
					/>
					<TypedMultiSelect
						label='Custom value display'
						value={mulSel}
						onChange={setMulSel}
						options={data}
						customValueDisplay={(item) => (
							<HStack className='es:icon:size-[1em]'>
								{item?.icon}
								{item?.label}
							</HStack>
						)}
					/>
					<hr className='es:my-2' />
					<TypedMultiSelect
						label='Grouped with mapping'
						value={mulSel}
						onChange={setMulSel}
						options={groupedData}
						groupKey='group'
						groupValueMapping={{
							Colors: { label: 'Vibrant Colors', icon: <GenericColorSwatch /> },
							// oxlint-disable-next-line anti-slop/no-shape-in-symbol-names -- Established public icon name.
							'Shapes': { label: 'Geometric Shapes', icon: genericShapes },
							_other: { label: 'Miscellaneous', icon: help },
						}}
						searchable
						clearable
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<AsyncSelect
						label='Async single'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							(searchText ?? '').length >= 3
								? `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5&contains=${searchText?.substring(0, 30) ?? ''}`
								: 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&amount=5'
						}
						getLabel={(item) => getItemString(item, 'joke') ?? getItemString(item, 'setup')}
						getValue={(item) => getItemStringValue(item, 'id')}
						getSubtitle={(item) => getItemString(item, 'delivery')}
						getIcon={() => <span className='es:shrink-0 es:text-lg'>😂</span>}
						getData={getJokeItems}
					/>
					<AsyncSelect
						label='Async single (universities)'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							(searchText ?? '').length >= 3
								? `http://universities.hipolabs.com/search?limit=5&name=${searchText ?? ''}`
								: 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => getItemString(item, 'name')}
						getValue={(item) => getItemStringValue(item, 'value')}
						getSubtitle={(item) => getItemString(item, 'country')}
						processLoadedOptions={mapItemsWithSlugValue}
						clearable
					/>
					<hr className='es:my-2' />
					<AsyncSelect
						label='Async grouped (mapping)'
						value={sinASel}
						onChange={setSinASel}
						fetchFunction={getAsyncGroupedData}
						groupKey='group'
						groupValueMapping={{
							Colors: { label: 'Vibrant Colors', icon: <GenericColorSwatch /> },
							// oxlint-disable-next-line anti-slop/no-shape-in-symbol-names -- Established public icon name.
							'Shapes': { label: 'Geometric Shapes', icon: genericShapes },
							_other: { label: 'Miscellaneous', icon: help },
						}}
						clearable
					/>
					<AsyncSelect
						label='Async grouped (via getGroup)'
						value={sinASel2}
						onChange={setSinASel2}
						fetchUrl={(searchText) =>
							(searchText ?? '').length >= 3
								? `http://universities.hipolabs.com/search?limit=10&name=${searchText ?? ''}`
								: 'http://universities.hipolabs.com/search?limit=10&country=croatia'
						}
						getLabel={(item) => getItemString(item, 'name')}
						getValue={(item) => getItemStringValue(item, 'value')}
						getGroup={(item) => (getItemString(item, 'country') === 'Croatia' ? 'From Croatia' : 'International')}
						clearable
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<AsyncMultiSelect
						label='Async multi (universities)'
						value={mulASel}
						onChange={setMulASel}
						fetchUrl={(searchText) =>
							(searchText ?? '').length >= 3
								? `http://universities.hipolabs.com/search?limit=5&name=${searchText ?? ''}`
								: 'http://universities.hipolabs.com/search?limit=5&country=croatia'
						}
						getLabel={(item) => getItemString(item, 'name')}
						getValue={(item) => getItemStringValue(item, 'value')}
						getSubtitle={(item) => getItemString(item, 'country')}
						processLoadedOptions={mapItemsWithSlugValue}
						clearable
					/>
					<hr className='es:my-2' />
					<AsyncMultiSelect
						label='Async multi grouped (mapping)'
						value={mulASel}
						onChange={setMulASel}
						fetchFunction={getAsyncGroupedData}
						groupKey='group'
						groupValueMapping={{
							Colors: { label: 'Vibrant Colors', icon: <GenericColorSwatch /> },
							// oxlint-disable-next-line anti-slop/no-shape-in-symbol-names -- Established public icon name.
							'Shapes': { label: 'Geometric Shapes', icon: genericShapes },
							_other: { label: 'Miscellaneous', icon: help },
						}}
						clearable
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
								onChange={handleTabVarChange}
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
								icon={componentGeneric}
								badge='2'
							>
								Monarchy and Republic
							</Tab>
							<Tab
								icon={emptyCircle}
								badge={<DecorativeTooltip text='Lorem ipsum'>{cloneElement(arrowDown, { className: 'es:stroke-[2.25]' })}</DecorativeTooltip>}
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
								icon={componentGeneric}
								badge='2'
							>
								Monarchy and Republic
							</Tab>
							<Tab
								icon={emptyCircle}
								badge={<DecorativeTooltip text='Lorem ipsum'>{cloneElement(arrowDown, { className: 'es:stroke-[2.25]' })}</DecorativeTooltip>}
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

					<TypedInputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='small'
					/>

					<TypedInputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='medium'
					/>

					<TypedInputField
						value={txt1}
						onChange={setTxt1}
						label='Lorem'
						inline
						flat
						size='default'
					/>

					<TypedInputField
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
						icon={emptyRect}
						label='Lorem'
						readOnly
					/>

					<InputField
						type='multiline'
						value={txt2}
						onChange={setTxt2}
						help={txt2?.length < 5 ? 'Nema dovoljno znakova?' : 'Iiiiima'}
						icon={emptyRect}
						label='Lorem'
						readOnly
						flat
					/>

					<InputField
						type='multiline'
						value={txt2}
						onChange={setTxt2}
						help={txt2?.length < 5 ? 'Nema dovoljno znakova?' : 'Iiiiima'}
						icon={emptyRect}
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
						icon={emptyRect}
						label='Lorem'
						placeholder='Type here...'
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ComponentToggle
						icon={paragraph}
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
						icon={heading}
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
						icon={image}
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
						icon={video}
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
						icon={componentGeneric}
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
									icon={emptyCircle}
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
										icon={emptyCircle}
										label='Toggle something'
										checked={Boolean(toggledThingy)}
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
						icon={magicAlt}
						label='Other repeater'
						addDefaultItem={{
							title: 'Hello',
						}}
						onAfterItemAdd={(item) => console.log('Added', item)}
						onAfterItemRemove={(items) => console.log('Removed', items)}
					>
						{(item) => {
							const { title, subtitle, icon, toggledThingy, link, updateData } = item;

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
										icon={emptyCircle}
										label='Toggle something'
										checked={Boolean(toggledThingy)}
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
								const currentItem = newItems[index];

								if (!currentItem) {
									return;
								}

								currentItem.title = value;

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
						icon={experiment}
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
							icon={emptyRect}
							value='lorem1'
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ipsum value dolor sit amet'
							icon={emptyRect}
							value='ipsum1'
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ipsum value dolor sit amet'
							icon={emptyRect}
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
							icon={emptyRect}
							value='lorem1'
							alignEnd
						/>
						<RadioButton
							label='Ipsum'
							subtitle='Ipsum value dolor sit amet'
							icon={emptyRect}
							value='ipsum1'
							alignEnd
						/>
						<RadioButton
							label='Dolor'
							subtitle='Ipsum value dolor sit amet'
							icon={emptyRect}
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
							{ label: 'Small', value: 's', icon: small },
							{ label: 'Medium', value: 'm', icon: medium },
							{ label: 'Large', value: 'l', icon: large },
						]}
						vertical
						itemProps={{ alignEnd: true }}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						step={11}
						markers
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						step={25}
						markers='dots'
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						step={33}
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						markers
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
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
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
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
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
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
						icon={emptyRect}
						label='Slider'
						value={sliderValue2}
						onChange={handleSliderValue2Change}
						min={-40}
						max={60}
						step={10}
						markers
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue2}
						onChange={handleSliderValue2Change}
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
						icon={emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={handleRangeSliderValueChange}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						before={emptyCircle}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						after={emptyCircle}
					/>

					<Slider
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						before={emptyCircle}
						after={emptyCircle}
					/>

					<Slider
						icon={emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={handleRangeSliderValueChange}
						disabled
					/>

					<Slider
						icon={emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={handleRangeSliderValueChange}
						inputField
						max={100}
					/>

					<Slider
						icon={emptyRect}
						label='Range slider'
						value={rangeSliderValue2}
						onChange={handleRangeSliderValue2Change}
						max={100}
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						vertical
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						vertical
						startPoint={50}
						markers={{
							0: 'nula',
							50: 'fifty',
							100: 'fullmax',
						}}
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						vertical
						markers
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						before={emptyCircle}
						after={emptyCircle}
						vertical
					/>

					<Slider
						icon={emptyRect}
						label='Slider'
						value={sliderValue}
						onChange={handleSliderValueChange}
						before={emptyCircle}
						after={emptyCircle}
						inputField
					/>

					<Slider
						icon={emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={handleRangeSliderValueChange}
						vertical
					/>

					<Slider
						icon={emptyRect}
						label='Range slider'
						value={rangeSliderValue}
						onChange={handleRangeSliderValueChange}
						vertical
						markers
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<SolidColorPicker
						value={currColor}
						onChange={handleCurrColorChange}
					/>

					<code className='es:flex es:min-h-9 es:min-w-24 es:items-center es:justify-center es:rounded es:border es:bg-secondary-100 es:p-1 es:text-sm'>{currColor}</code>

					<SolidColorPicker
						value={currColor2}
						onChange={handleCurrColor2Change}
						allowTransparency
					/>

					<code className='es:flex es:min-h-9 es:min-w-24 es:items-center es:justify-center es:rounded es:border es:bg-secondary-100 es:p-1 es:text-sm'>{currColor2}</code>

					<SolidColorPicker
						value={currColor3}
						onChange={handleCurrColor3Change}
						allowTransparency
						outputFormat='hsla'
					/>

					<code className='es:flex es:min-h-9 es:min-w-24 es:items-center es:justify-center es:rounded es:border es:bg-secondary-100 es:p-1 es:text-sm'>{currColor3}</code>

					<SolidColorPicker
						value={currColor3}
						onChange={handleCurrColor3Change}
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
						className='es:bg-linear-to-r es:from-accent-100 es:to-accent-500'
						customGradient
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ColorPicker
						value={color1}
						onChange={handleColor1Change}
						colors={defaultColors}
						clearable
						extraOptions={<MenuItem checked={false}>Lorem</MenuItem>}
					/>

					<ColorPicker
						value={color3}
						onChange={handleColor3Change}
						colors={defaultColors}
					/>

					<ColorPicker
						value={color2}
						onChange={handleColor2Change}
						colors={groupedColors}
						type='fillColor'
					/>

					<ColorPicker
						value={color2}
						onChange={handleColor2Change}
						colors={groupedColors}
						type='textColor'
					/>

					<ColorPicker
						value={color2}
						onChange={handleColor2Change}
						colors={groupedColors}
						type='textHighlightColor'
					/>

					<ColorPicker
						value={color2}
						onChange={handleColor2Change}
						colors={groupedColors}
						type='listMarkerColor'
					/>

					<ColorPicker
						icon={color}
						label='Color'
						value={color2}
						onChange={handleColor2Change}
						colors={groupedColors}
						noColorGroups
						showColorCode
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<ResponsiveLegacy
						icon={help}
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
								{(options ?? []).map(({ label, value }) => (
									<ToggleButton
										key={String(value)}
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
						icon={help}
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
										checked={Boolean(currentValue)}
										onChange={(v) => handleChange(v)}
									/>
								);
							}

							return (
								<ButtonGroup>
									{(options ?? []).map(({ label, value }) => (
										<ToggleButton
											key={String(value)}
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
						icon={help}
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
								{(options ?? []).map(({ label, value }) => (
									<ToggleButton
										key={String(value)}
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
						icon={columns}
						label='Column configuration'
						value={colConfig}
						onChange={setColConfig}
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig)}</pre>

					<ColumnConfigSlider
						icon={columns}
						label='Column configuration'
						value={colConfig2}
						onChange={setColConfig2}
						columns={14}
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={columns}
						label='Column configuration gutter'
						value={colConfig3}
						onChange={setColConfig3}
						columns={14}
						showOuterAsGutter
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={columns}
						label='Column configuration'
						value={colConfig4}
						onChange={setColConfig4}
						disableOffset
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disableWidth
					/>

					<pre className='es:w-full es:text-xs'>{JSON.stringify(colConfig2)}</pre>

					<ColumnConfigSlider
						icon={columns}
						label='Column configuration'
						value={colConfig5}
						onChange={setColConfig5}
						disableWidth
						disableOffset
					/>

					<ColumnConfigSlider
						icon={columns}
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
						icon={emptyCircle}
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
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
					</HStack>

					<HStack
						noWrap
						className='es:max-w-72'
					>
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
					</HStack>

					<VStack className='es:max-h-40'>
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
					</VStack>

					<VStack
						noWrap
						className='es:max-h-40'
					>
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
						<Button icon={emptyCircle} />
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
							disabled={imgUrl !== undefined}
						>
							Set URL
						</Button>
						<Button
							size='small'
							onPress={() => setImgUrl(undefined)}
							disabled={imgUrl === undefined}
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
						icon={experiment}
					/>
					<FilePlaceholder fileName='demo.json' />
					<FilePlaceholder />
					<Spacer />
					<Spacer border />
					<Spacer />
					<MediaPlaceholder icon={experiment} />
					<MediaPlaceholder
						icon={experiment}
						size='large'
					/>
					<MediaPlaceholder
						icon={experiment}
						style='simple'
					/>
					<MediaPlaceholder
						icon={experiment}
						style='simple'
						size='large'
					/>
					<MediaPlaceholder
						icon={experiment}
						style='simple'
						size='large'
						helpText='Lorem ipsum dolor.'
					/>
					<MediaPlaceholder
						icon={experiment}
						style='simple'
						size='large'
						helpText={
							<RichLabel
								icon={a11yWarning}
								label='Lorem ipsum dolor.'
							/>
						}
					/>
					<MediaPlaceholder
						icon={warning}
						style='simple'
						size='video'
						helpText='Missing lorem ipsum'
					>
						<Button type='selected'>Do something about it</Button>
						<Button type='simple'>Or don't</Button>
					</MediaPlaceholder>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<OptionSelect
						value={draggableLayout}
						onChange={handleDraggableLayoutChange}
						options={[
							{ label: 'Grid', value: 'grid' },
							{ label: 'Horizontal', value: 'horizontal' },
							{ label: 'Vertical', value: 'vertical' },
						]}
						label='Layout'
						inline
					/>

					<TypedDraggable
						items={draggableItems}
						onChange={handleDraggableItemsChange}
						className={clsx(
							draggableLayout === 'grid' && 'es:grid es:auto-rows-auto es:grid-cols-3 es:gap-1',
							draggableLayout === 'horizontal' && 'es:flex es:gap-1',
							draggableLayout === 'vertical' && 'es:flex es:flex-col es:gap-1',
						)}
						onAfterItemRemove={(item) => console.log('Removed item:', item)}
						axis={draggableLayout === 'grid' ? 'both' : draggableLayout}
					>
						{(item) => {
							const { toggle, title, updateData, deleteItem } = item;

							return (
								<div className='es:relative es:size-full es:rounded-lg es:border es:border-secondary-200 es:bg-secondary-50 es:p-2 es:flex es:flex-col es:gap-2'>
									<DraggableHandle className='es:absolute es:right-1 es:top-1' />
									<p>{title}</p>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
									<Button
										onPress={deleteItem}
										icon={trash}
										size='small'
										type='dangerSimple'
										className='es:mt-auto'
									/>
								</div>
							);
						}}
					</TypedDraggable>

					<pre className='es:w-xs es:overflow-clip'>{JSON.stringify(draggableItems, null, 2)}</pre>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<TypedDraggableList
						label='My draggable list'
						items={draggableListItems}
						onChange={handleDraggableListItemsChange}
						onAfterItemRemove={(item) => console.log('Removed item:', item)}
					>
						{(item) => {
							const { toggle, title, icon, updateData, deleteItem } = item;

							return (
								<DraggableListItem
									label={title ?? 'New item'}
									icon={icon ?? emptyCircle}
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
					</TypedDraggableList>

					<TypedDraggableList
						label='My draggable list 2'
						items={draggableListItems2}
						onChange={handleDraggableListItems2Change}
					>
						{(item) => {
							const { toggle, title, icon, updateData } = item;

							return (
								<DraggableListItem
									label={title ?? 'New item'}
									icon={icon ?? emptyCircle}
								>
									<Switch
										aria-label='Title'
										checked={toggle}
										onChange={(value) => updateData({ toggle: value })}
									/>
								</DraggableListItem>
							);
						}}
					</TypedDraggableList>
				</TabPanel>
				<TabPanel className='es:rounded-3xl es:w-4xl es:max-h-[85vh] es:h-fit es:overflow-y-auto es:max-w-[90vw] es:space-y-4 es:p-5! es:bg-[#f1f1f1]'>
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
							<Tab icon={options}>General settings</Tab>
							<Tab icon={bot}>SEO</Tab>
						</TabList>
						<TabPanel>
							<OptionsPanelIntro
								icon={locationSettings}
								title='Location'
								subtitle='Source, service, starting point'
								iconClassName='es:stroke-[0.5]'
							/>
							<OptionsPanel>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
										inline
									/>
								</OptionsPanelSection>
							</OptionsPanel>

							<OptionsPanel title='Header & footer'>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
										inline
									/>
								</OptionsPanelSection>
							</OptionsPanel>

							<OptionsPanel
								title='Header & footer'
								help='Lorem ipsum dolor sit amet, lorem dolor sit amet? Ipsum!'
							>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
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
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>

								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
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
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>

								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>

								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>
							</OptionsPanel>
						</TabPanel>
					</Tabs>

					<Tabs type='pill'>
						<TabList>
							<Tab icon={options}>General settings</Tab>
							<Tab icon={bot}>SEO</Tab>
						</TabList>
						<TabPanel>
							<OptionsPanelIntro
								title='Lorem ipsum'
								subtitle='Dolor, ipsum, sit amet, lorem, ipsum dolor, sit...'
							/>
							<OptionsPanel>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
										inline
									/>
								</OptionsPanelSection>
							</OptionsPanel>

							<OptionsPanel title='Header & footer'>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
										inline
									/>
								</OptionsPanelSection>
							</OptionsPanel>

							<OptionsPanel
								title='Header & footer'
								help='Lorem ipsum dolor sit amet, lorem dolor sit amet? Ipsum!'
							>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
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
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>

								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
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
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
										value={v}
										options={data}
									/>
								</OptionsPanelSection>
								<OptionsPanelSection>
									<Select
										icon={emptyCircle}
										label='Pick an item'
										onChange={handleSelectValueChange}
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
										icon={trash}
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
						<Button className='es:grow'>Replace</Button>
						<Button className='es:grow'>Remove</Button>
					</FilePickerShell>

					<FilePickerShellDemo url='https://lorem.testsum/test.png' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg' />

					<FilePickerShellDemo url='https://picsum.photos/600/400.jpg' />

					<FilePickerShellDemo url='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wikimedia_Commons_logo_white.png/500px-Wikimedia_Commons_logo_white.png' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-normal-map.jpg' />
					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poisson-image.avif' />
					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/unbiased-normals.png' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ascii-raymarch.jpg' />
					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-extra-hiccup.jpg' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif' />
					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png' />

					<FilePickerShellDemo url='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-rdom.svg' />

					<FilePickerShell
						className='es:w-full'
						noUrlContent={
							<Button
								size='large'
								icon={upload}
							>
								Upload
							</Button>
						}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-96 es:max-h-[85vh] es:h-fit es:overflow-y-auto es:space-y-4 es:p-5!'>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-normal-map.jpg'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poisson-image.avif'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/unbiased-normals.png'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ascii-raymarch.jpg'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-extra-hiccup.jpg'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src='https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-rdom.svg'
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
					<SmartImage
						src=''
						className={({ isDark }) =>
							clsx(
								'es:p-4 es:outline-(--es-img-colorful-dominant-color,var(--es-img-dominant-color)) es:outline-8 es:-outline-offset-10 es:bg-secondary-100 es:border es:rounded-xl',
								isDark ? 'es:border-secondary-100' : 'es:border-secondary-800',
							)
						}
					/>
				</TabPanel>
				<TabPanel className='es:bg-white es:rounded-3xl es:w-4xl es:max-h-[85vh] es:h-fit es:overflow-y-auto es:max-w-[90vw] es:space-y-4 es:p-5!'>
					<div className='es:flex es:flex-wrap es:items-center es:justify-between es:gap-3'>
						<div className='es:space-y-1'>
							<h2 className='es:text-xl es:font-medium es:text-secondary-900'>All icons</h2>
							<p className='es:text-sm es:text-secondary-600'>Compact reference for the full icons export.</p>
						</div>
						<div className='es:inline-flex es:items-center es:gap-2 es:rounded-full es:bg-secondary-100 es:px-3 es:py-1.5 es:text-sm es:font-medium es:text-secondary-700'>
							<span className='es:text-secondary-500'>Count</span>
							<span className='es:font-mono es:text-secondary-900'>{iconEntries.length}</span>
						</div>
					</div>

					<div className='es:grid es:grid-cols-1 es:gap-2 sm:es:grid-cols-2 lg:es:grid-cols-3 xl:es:grid-cols-4'>
						{iconEntries.map((iconName) => (
							<div
								key={iconName}
								className='es:flex es:items-center es:gap-2.5 es:rounded-xl es:border es:border-secondary-200 es:bg-secondary-50 es:px-3 es:py-2'
							>
								<div className='es:flex es:size-8 es:shrink-0 es:items-center es:justify-center es:rounded-lg es:bg-white es:text-secondary-900 es:icon:size-4.5'>
									<Icon icon={iconName} />
								</div>
								<div className='es:min-w-0 es:font-mono es:text-11 es:leading-tight es:text-secondary-700'>{iconName}</div>
							</div>
						))}
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default App;
