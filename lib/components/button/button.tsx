import { __ } from '@wordpress/i18n';
import { useObjectRef } from 'react-aria';
import { ProgressBar, Button as ReactAriaButton, Toolbar } from 'react-aria-components';
import { clsx } from 'clsx';
import { cva } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode, type Ref, type RefObject } from 'react';
import { Tooltip } from '../tooltip/tooltip';
import type { Prettify } from '../../utilities/types';

type TooltipPlacement =
	| 'bottom'
	| 'bottom left'
	| 'bottom right'
	| 'bottom start'
	| 'bottom end'
	| 'top'
	| 'top left'
	| 'top right'
	| 'top start'
	| 'top end'
	| 'left'
	| 'left top'
	| 'left bottom'
	| 'start'
	| 'start top'
	| 'start bottom'
	| 'right'
	| 'right top'
	| 'right bottom'
	| 'end'
	| 'end top'
	| 'end bottom';

type ButtonTooltipProps = {
	theme?: 'light' | 'dark';
	offset?: number;
	crossOffset?: number;
	containerPadding?: number;
	openDelay?: number;
	closeDelay?: number;
	shouldFlip?: boolean;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
	placement?: TooltipPlacement;
	className?: string;
	triggerRef?: RefObject<Element>;
	arrow?: boolean;
	disabled?: boolean;
};

type ButtonSize = 'small' | 'default' | 'large';
type ButtonType =
	| 'default'
	| 'selected'
	| 'selectedGhost'
	| 'selectedOutline'
	| 'ghost'
	| 'outline'
	| 'danger'
	| 'dangerGhost'
	| 'dangerOutline'
	| 'glass'
	| 'glassDark'
	| 'dangerGlass'
	| 'selectedGlass'
	| 'simple'
	| 'selectedSimple'
	| 'dangerSimple';
type ButtonGroupType = 'segmented' | 'split';

const createComponentClasses = ({ className, flat, pending }: { className?: string; flat?: boolean; pending?: boolean }) =>
	cva(
		[
			'es:font-variation-["wdth"_82,"wght"_325,"ROND"_100,"GRAD"_0] es:hover:font-variation-["wdth"_82,"wght"_325,"ROND"_100,"GRAD"_70]',
			'es:flex es:items-center es:justify-center',
			'es:transition-plus es:duration-300 es:ease-spring-smooth es:text-13',
			'es:any-focus:outline-hidden',
			'es:focus-visible:ring-2',
			'es:text-box-trim',
			'es:leading-none',
			'es:btn-group-h:not-pressed:not-after-current:not-first:rounded-l-sm',
			'es:btn-group-h:not-pressed:not-before-current:not-last:rounded-r-sm',
			'es:btn-group-v:not-pressed:not-after-current:not-first:rounded-t-sm',
			'es:btn-group-v:not-pressed:not-before-current:not-last:rounded-b-sm',
			'es:icon:size-5',
			pending && 'es:cursor-wait',
			className,
		],
		{
			variants: {
				size: {
					small: 'es:gap-0.75 es:rounded-lg es:hover:rounded-10! es:pressed:rounded-xl!',
					default: 'es:gap-1.25 es:rounded-10 es:hover:rounded-xl! es:pressed:rounded-14!',
					large: 'es:gap-1.5 es:rounded-xl es:hover:rounded-2xl! es:pressed:rounded-18!',
				},
				type: {
					default: null,
					selected: null,
					selectedGhost: null,
					selectedOutline: null,
					ghost: null,
					outline: null,
					danger: null,
					dangerGhost: null,
					dangerOutline: null,
					glass: null,
					glassDark: null,
					dangerGlass: null,
					selectedGlass: null,
					simple: null,
					selectedSimple: null,
					dangerSimple: null,
				},
				disabled: {
					true: null,
					false: null,
				},
				hasIcon: {
					true: null,
					false: null,
				},
				iconOnly: {
					true: null,
					false: null,
				},
			},
			compoundVariants: [
				{
					type: 'default',
					disabled: false,
					class: [
						'es:text-black',
						!pending && 'es:bg-linear-to-b es:from-black/2 es:to-black/4 es:from-25% es:bg-white',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-accent-400/0 es:via-accent-400/25 es:to-accent-400/0 es:from-35% es:via-50% es:to-65% es:bg-surface-100',
						'es:inset-ring',
						pending ? 'es:inset-ring-accent-600/20' : 'es:inset-ring-secondary-800/20',
						'es:inset-shadow-sm es:inset-shadow-white/75',
						!flat && 'es:shadow-xs es:shadow-black/5',
						'es:hover:bg-surface-100 es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10',
						'es:pressed:bg-surface-100 es:pressed:text-accent-950 es:pressed:inset-ring-surface-300 es:pressed:inset-shadow-white/10',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
					],
				},
				{
					type: 'simple',
					disabled: false,
					class: [
						'es:text-black',
						!pending && 'es:bg-secondary-50 es:bg-radial-[at_50%_5%] es:from-50% es:from-surface-500/6 es:to-surface-500/12',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-accent-400/0 es:via-accent-400/25 es:to-accent-400/0 es:from-35% es:via-50% es:to-65% es:bg-surface-100',
						'es:hover:bg-surface-100 es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10 es:hover:from-accent-600/4 es:hover:to-accent-600/10',
						'es:pressed:bg-surface-100 es:pressed:text-accent-950 es:pressed:inset-ring-surface-300 es:pressed:inset-shadow-white/10',
						'es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
					],
				},
				{
					type: 'selectedSimple',
					disabled: false,
					class: [
						'es:text-accent-600',
						!pending && 'es:bg-surface-50 es:bg-radial-[at_50%_5%] es:from-50% es:from-accent-900/2 es:to-accent-900/5',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-accent-400/5 es:via-accent-400/25 es:to-accent-400/5 es:from-35% es:via-50% es:to-65% es:bg-surface-100',
						'es:hover:text-accent-900 es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10 es:hover:from-accent-600/4 es:hover:to-accent-600/10',
						' es:pressed:text-accent-950 es:pressed:from-accent-700/10 es:pressed:to-accent-700/20',
						'es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:text-accent-950 es:focus-visible:inset-ring-accent-500 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:bg-accent-50',
					],
				},
				{
					type: 'dangerSimple',
					disabled: false,
					class: [
						'es:text-red-600',
						!pending && 'es:bg-white es:bg-radial-[at_50%_5%] es:from-50% es:from-secondary-500/8 es:to-secondary-500/14',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-red-500/0 es:via-red-500/30 es:to-red-500/0 es:from-35% es:via-50% es:to-65% es:bg-red-50',
						'es:hover:inset-ring-surface-300 es:hover:inset-shadow-white/10 es:hover:from-red-600/4 es:hover:to-red-600/10',
						' es:pressed:text-red-700 es:pressed:from-red-600/5 es:pressed:to-red-600/15',
						'es:focus-visible:inset-ring es:focus-visible:ring-red-500/30 es:focus-visible:text-red-700 es:focus-visible:inset-ring-red-700 es:focus-visible:inset-shadow-red-300/10 es:focus-visible:bg-red-50',
					],
				},
				{
					disabled: false,
					type: ['selected', 'danger'],
					class: [
						'es:font-variation-["wdth"_85,"wght"_325,"ROND"_100,"GRAD"_50] es:hover:font-variation-["wdth"_85,"wght"_325,"ROND"_100,"GRAD"_100]',
						'es:any-icon:drop-shadow-xs es:any-icon:drop-shadow-accent-800/25',
					],
				},
				{
					type: 'selected',
					disabled: false,
					class: [
						'es:text-white es:text-shadow-xs es:text-shadow-accent-900/30',
						!pending && 'es:bg-linear-to-b es:from-accent-800/10 es:to-accent-800/30 es:bg-accent-500 es:from-30%',
						pending && 'es:bg-accent-600 es:shimmer-animation es:bg-linear-to-r es:from-accent-50/0 es:via-accent-50/35 es:to-accent-50/0 es:from-35% es:via-50% es:to-65%',
						'es:inset-ring es:inset-ring-accent-600',
						'es:inset-shadow-sm es:inset-shadow-accent-50/25',
						!flat && 'es:shadow-xs es:shadow-accent-900/30',
						'es:hover:from-accent-800/20 es:hover:to-accent-800/40',
						'es:pressed:from-accent-800/30 es:pressed:to-accent-800/50',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-700 es:focus-visible:bg-accent-600',
					],
				},
				{
					type: 'danger',
					disabled: false,
					class: [
						'es:text-white es:text-shadow-xs es:text-shadow-red-900/30',
						!pending && 'es:bg-linear-to-b es:from-red-800/10 es:to-red-800/30 es:bg-red-500 es:from-30%',
						pending && 'es:bg-red-600 es:shimmer-animation es:bg-linear-to-r es:from-red-50/0 es:via-red-50/35 es:to-red-50/0 es:from-35% es:via-50% es:to-65%',
						'es:inset-ring es:inset-ring-red-700',
						'es:inset-shadow-sm es:inset-shadow-red-50/25',
						!flat && 'es:shadow-xs es:shadow-red-900/30',
						'es:hover:from-red-800/20 es:hover:to-red-800/40',
						'es:pressed:from-red-800/30 es:pressed:to-red-800/50',
						'es:focus-visible:ring-red-500/30 es:focus-visible:inset-ring-red-900 es:focus-visible:bg-red-600',
					],
				},
				{
					type: 'ghost',
					disabled: false,
					class: [
						!pending && 'es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-secondary-700',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-accent-600/0 es:via-accent-600/15 es:to-accent-600/0 es:from-35% es:via-50% es:to-65% es:bg-surface-50 es:inset-ring es:inset-ring-accent-600/5 es:text-accent-900',
						'es:hover:from-surface-200/30 es:hover:to-surface-200/50 es:hover:text-accent-950',
						'es:pressed:from-accent-600/5 es:pressed:to-accent-600/15 es:pressed:text-accent-900',
						'es:focus-visible:bg-accent-50 es:focus-visible:text-accent-950 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
					],
				},
				{
					type: 'dangerGhost',
					disabled: false,
					class: [
						!pending && 'es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-red-700',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-red-600/0 es:via-red-600/10 es:to-red-600/0 es:from-35% es:via-50% es:to-65% es:bg-secondary-50 es:inset-ring es:inset-ring-red-600/10 es:text-red-700',
						'es:hover:from-red-500/4 es:hover:to-red-500/7 ',
						'es:pressed:from-red-500/10 es:pressed:to-red-500/15 es:pressed:text-red-700',
						'es:focus-visible:bg-red-50 es:focus-visible:text-red-950 es:focus-visible:inset-ring es:focus-visible:ring-red-500/30 es:focus-visible:inset-shadow-red-300/10 es:focus-visible:inset-ring-red-500',
					],
				},
				{
					type: 'selectedGhost',
					disabled: false,
					class: [
						!pending && 'es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-accent-600',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-accent-600/0 es:via-accent-600/15 es:to-accent-600/0 es:from-35% es:via-50% es:to-65% es:bg-surface-50 es:inset-ring es:inset-ring-accent-600/15 es:text-accent-700',
						'es:hover:from-accent-500/5 es:hover:to-accent-500/15 ',
						'es:pressed:from-accent-500/10 es:pressed:to-accent-500/20 es:pressed:text-accent-700',
						'es:focus-visible:bg-accent-50 es:focus-visible:text-accent-950 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
					],
				},
				{
					type: 'outline',
					disabled: false,
					class: [
						!pending && 'es:bg-white es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-secondary-700',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-accent-600/0 es:via-accent-600/15 es:to-accent-600/0 es:from-35% es:via-50% es:to-65% es:bg-surface-50 es:inset-ring es:inset-ring-accent-600/5 es:text-accent-900',
						'es:inset-ring es:inset-ring-secondary-700/12',
						'es:hover:from-surface-200/30 es:hover:to-surface-200/50 es:hover:text-accent-950 es:hover:inset-ring-accent-950/6',
						'es:pressed:from-accent-600/5 es:pressed:to-accent-600/15 es:pressed:text-accent-900',
						'es:focus-visible:bg-accent-50 es:focus-visible:text-accent-950 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
					],
				},
				{
					type: 'dangerOutline',
					disabled: false,
					class: [
						!pending && 'es:bg-white es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-red-700',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-red-600/0 es:via-red-600/10 es:to-red-600/0 es:from-35% es:via-50% es:to-65% es:bg-secondary-50 es:inset-ring es:inset-ring-red-600/10 es:text-red-700',
						'es:inset-ring es:inset-ring-red-800/12',
						'es:hover:from-red-500/4 es:hover:to-red-500/7 es:hover:inset-ring-red-700/6',
						'es:pressed:from-red-500/10 es:pressed:to-red-500/15 es:pressed:text-red-700',
						'es:focus-visible:bg-red-50 es:focus-visible:text-red-950 es:focus-visible:inset-ring es:focus-visible:ring-red-500/30 es:focus-visible:inset-shadow-red-300/10 es:focus-visible:inset-ring-red-500',
					],
				},
				{
					type: 'selectedOutline',
					disabled: false,
					class: [
						!pending && 'es:bg-white es:bg-linear-to-br es:from-surface-200/0 es:to-surface-200/0 es:text-accent-600',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-accent-600/0 es:via-accent-600/15 es:to-accent-600/0 es:from-35% es:via-50% es:to-65% es:bg-surface-50 es:inset-ring es:inset-ring-accent-600/15 es:text-accent-700',
						'es:inset-ring es:inset-ring-accent-800/12',
						'es:hover:from-accent-500/5 es:hover:to-accent-500/15 es:hover:inset-ring-accent-600/6',
						'es:pressed:from-accent-500/10 es:pressed:to-accent-500/20 es:pressed:text-accent-700',
						'es:focus-visible:bg-accent-50 es:focus-visible:text-accent-950 es:focus-visible:inset-ring es:focus-visible:ring-accent-500/30 es:focus-visible:inset-shadow-accent-300/10 es:focus-visible:inset-ring-accent-500',
					],
				},
				{
					type: ['glass', 'glassDark', 'dangerGlass', 'selectedGlass'],
					disabled: false,
					class: 'es:overflow-clip es:backdrop-blur-md',
				},
				{
					type: 'glass',
					disabled: false,
					class: [
						'es:backdrop-saturate-120 es:backdrop-brightness-120 es:backdrop-contrast-95',
						!pending && 'es:bg-radial-[at_50%_75%] es:from-white/25 es:to-white/0',
						pending &&
							'es:shimmer-animation es:-bg-linear-75 es:from-accent-500/0 es:via-accent-500/20 es:to-accent-500/0 es:from-35% es:via-50% es:to-65% es:text-accent-700 es:bg-white/15',
						'es:hover:from-white/35 es:hover:to-white/15',
						'es:text-white',
						'es:inset-shadow-sm es:inset-shadow-white/40',
						!flat && 'es:shadow-black/15 es:shadow-xs',
						'es:inset-ring es:inset-ring-white/5',
						'es:text-shadow-xs es:text-shadow-black/15',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-700/50 es:focus-visible:bg-accent-300/30',
					],
				},
				{
					type: 'glassDark',
					disabled: false,
					class: [
						'es:backdrop-saturate-115 es:backdrop-brightness-75 es:backdrop-contrast-95',
						!pending && 'es:bg-radial-[at_50%_75%] es:from-black/40 es:to-black/20',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-accent-50/0 es:via-accent-50/20 es:to-accent-50/0 es:from-35% es:via-50% es:to-65% es:bg-accent-950/10',
						'es:hover:from-black/50 es:hover:to-black/35',
						'es:text-white',
						'es:inset-shadow-sm es:inset-shadow-white/20',
						!flat && 'es:shadow-xs es:shadow-black/15',
						'es:inset-ring es:inset-ring-black/20',
						'es:text-shadow-xs es:text-shadow-black/15 es:focus-visible:text-shadow-accent-950/15',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-700/50 es:focus-visible:bg-accent-300/30',
					],
				},
				{
					type: 'dangerGlass',
					disabled: false,
					class: [
						'es:backdrop-saturate-125 es:backdrop-brightness-75 es:backdrop-contrast-95',
						!pending && 'es:bg-radial-[at_50%_75%] es:from-red-500/30 es:to-red-500/10 es:bg-red-600/25',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-red-400/0 es:via-red-500/35 es:to-red-400/5 es:from-35% es:via-50% es:to-65% es:bg-red-700/25',
						'es:hover:from-red-400/30 es:hover:to-red-400/25',
						'es:text-red-50',
						'es:inset-shadow-sm es:inset-shadow-red-300/40',
						!flat && 'es:shadow-xs es:shadow-black/15',
						'es:inset-ring es:inset-ring-red-200/5',
						'es:text-shadow-xs es:text-shadow-red-950/15',
						'es:focus-visible:ring-red-500/30 es:focus-visible:inset-ring-red-700/50 es:focus-visible:bg-red-700/30',
					],
				},
				{
					type: 'selectedGlass',
					disabled: false,
					class: [
						'es:backdrop-saturate-120 es:backdrop-brightness-120 es:backdrop-contrast-95',
						!pending && 'es:bg-radial-[at_50%_75%] es:from-accent-500/30 es:to-accent-500/5 es:bg-accent-600/10',
						pending && 'es:shimmer-animation es:-bg-linear-75 es:from-accent-400/0 es:via-accent-400/50 es:to-accent-400/0 es:from-35% es:via-50% es:to-65% es:bg-accent-700/25',
						'es:hover:from-accent-400/30 es:hover:to-accent-400/25',
						'es:text-accent-50/95',
						'es:inset-shadow-sm es:inset-shadow-accent-200/40',
						!flat && 'es:shadow-xs es:shadow-black/15',
						'es:inset-ring es:inset-ring-accent-200/5',
						'es:text-shadow-xs es:text-shadow-accent-950/15',
						'es:focus-visible:ring-accent-500/30 es:focus-visible:inset-ring-accent-700/50 es:focus-visible:bg-accent-600/30',
					],
				},
				{
					type: ['default', 'selected', 'danger'],
					disabled: true,
					class: [
						'es:bg-linear-to-br es:from-secondary-50 es:to-secondary-100',
						'es:text-secondary-400 es:any-icon:text-secondary-400/50',
						'es:inset-ring es:inset-ring-secondary-200',
					],
				},
				{
					type: ['simple', 'selectedSimple', 'dangerSimple'],
					disabled: true,
					class: [
						'es:bg-linear-to-br es:from-secondary-50 es:to-secondary-100',
						'es:text-secondary-400 es:any-icon:text-secondary-400/50',
						'es:inset-ring es:inset-ring-secondary-100',
					],
				},
				{
					type: ['ghost', 'dangerGhost', 'selectedGhost'],
					disabled: true,
					class: ['es:text-secondary-500 es:any-icon:text-secondary-500/50'],
				},
				{
					type: ['outline', 'dangerOutline', 'selectedOutline'],
					disabled: true,
					class: ['es:bg-gray-50 es:text-secondary-500 es:any-icon:text-secondary-500/50', 'es:inset-ring es:inset-ring-secondary-100'],
				},
				{
					type: ['glass', 'glassDark', 'dangerGlass', 'selectedGlass'],
					disabled: true,
					class: [
						'es:backdrop-blur-md es:backdrop-brightness-105 es:backdrop-contrast-30 es:backdrop-saturate-25',
						'es:text-secondary-300 es:any-icon:text-secondary-300/50',
						'es:inset-ring es:inset-ring-black/5',
					],
				},
				{ size: 'small', iconOnly: false, class: 'es:h-8 es:min-w-8' },
				{ size: 'small', iconOnly: true, class: 'es:size-8' },
				{ size: 'small', hasIcon: false, iconOnly: false, class: 'es:px-2' },
				{ size: 'small', hasIcon: true, iconOnly: false, class: 'es:px-1.5' },
				{ size: 'default', iconOnly: false, class: 'es:h-9 es:min-w-9' },
				{ size: 'default', iconOnly: true, class: 'es:size-9' },
				{ size: 'default', hasIcon: false, iconOnly: false, class: 'es:px-2.5' },
				{ size: 'default', hasIcon: true, iconOnly: false, class: 'es:px-2' },
				{ size: 'large', iconOnly: false, class: 'es:h-10 es:min-w-10' },
				{ size: 'large', iconOnly: true, class: 'es:size-10' },
				{ size: 'large', hasIcon: false, iconOnly: false, class: 'es:px-3' },
				{ size: 'large', hasIcon: true, iconOnly: false, class: 'es:px-2.5' },
			],
			defaultVariants: {
				disabled: false,
			},
		},
	);

type ButtonProps = Omit<ComponentPropsWithoutRef<typeof ReactAriaButton>, 'children' | 'className' | 'isDisabled' | 'isPending' | 'onPress' | 'aria-label' | 'type'> & {
	children?: ReactNode;
	/** Icon to display within the button. */
	icon?: ReactNode;
	/** The size of the button. Defaults to `'default'`. */
	size?: ButtonSize;
	/** The type of the button. Defaults to `'default'`. */
	type?: ButtonType;
	/** If `true`, the button is disabled. */
	disabled?: boolean;
	/** Classes to pass to the button. */
	className?: string;
	/** Tooltip text to display on hover. If set to `true` and an `aria-label` is not provided, the tooltip text will be used as the `aria-label`. */
	tooltip?: ReactNode;
	/** Function to run when the button is pressed. */
	onPress?: ComponentPropsWithoutRef<typeof ReactAriaButton>['onPress'];
	/** Ref to forward to the button. Use the same as the `ref` prop. */
	forwardedRef?: Ref<HTMLButtonElement>;
	/** Classes to pass to the tooltip wrapper. */
	wrapperClassName?: string;
	/** Props to pass to the tooltip. */
	tooltipProps?: ButtonTooltipProps;
	/** If `true`, the button is in a pending state, which can be used to indicate that an action is being processed. */
	pending?: boolean;
	/** ARIA label for the pending state, used for screen readers. Defaults to `'Loading'`. */
	pendingAriaLabel?: string;
	/** If `true`, component will look more flat (applies only to `default`, `selected`, and `danger` types). Useful for nested layer of controls. */
	flat?: boolean;
	/** If `true`, the component is not rendered. */
	hidden?: boolean;
	'aria-label'?: string;
};

// SAFETY: The tooltip adapter narrows the existing Tooltip props to the subset used by Button.
const TypedTooltip = Tooltip as (props: ButtonTooltipProps & { children?: ReactNode; text: ReactNode; wrapperClassName?: string }) => ReactNode;

const isStringValue = <T,>(value: T): value is T & string => Object.prototype.toString.call(value) === '[object String]';

/**
 * A simple button component.
 *
 * @component
 * @param {ButtonProps} props - Component props.
 *
 * @returns {JSX.Element} The Button component.
 *
 * @example
 * <Button onPress={() => console.log('Hi!')} icon={myIcon} />
 *
 * @example
 * <Button onPress={() => console.log('Hi!')} icon={myIcon}>My button</Button>
 */
export const Button = (props: Prettify<ButtonProps>) => {
	const {
		children,
		icon,
		size = 'default',
		type = 'default',
		flat,
		pending,
		pendingAriaLabel = __('Loading', 'eightshift-ui-components'),
		disabled,
		className,
		tooltip: rawTooltip,
		onPress,
		forwardedRef,
		wrapperClassName,
		tooltipProps,
		'aria-label': rawAriaLabel,
		hidden,
		...other
	} = props;

	const ariaLabel = rawAriaLabel ?? (isStringValue(children) ? children : __('Menu item', 'eightshift-ui-components'));
	let tooltip = rawTooltip;

	if (rawTooltip === true && ariaLabel.length > 0) {
		tooltip = ariaLabel;
	}

	const resolvedTooltip = tooltip === true ? ariaLabel : tooltip;

	const objRef = useObjectRef<HTMLButtonElement>(forwardedRef);
	const componentClasses = createComponentClasses({ className, flat, pending });

	if (hidden) {
		return null;
	}

	const component = (
		<ReactAriaButton
			onPress={onPress}
			isDisabled={disabled}
			isPending={pending}
			className={componentClasses({
				disabled: !pending && disabled,
				hasIcon: Boolean(icon),
				iconOnly: Boolean(icon && !children),
				size,
				type,
			})}
			ref={objRef}
			aria-label={ariaLabel}
			{...other}
		>
			{({ isPending }) => (
				<>
					{icon}
					{children}
					{isPending ? (
						<ProgressBar
							aria-label={pendingAriaLabel}
							className='es:sr-only'
							isIndeterminate
						/>
					) : null}
				</>
			)}
		</ReactAriaButton>
	);

	if (!resolvedTooltip) {
		return component;
	}

	return (
		<TypedTooltip
			text={resolvedTooltip}
			wrapperClassName={wrapperClassName}
			{...tooltipProps}
		>
			{component}
		</TypedTooltip>
	);
};

type ButtonGroupProps = Omit<ComponentPropsWithoutRef<typeof Toolbar>, 'children' | 'className' | 'orientation'> & {
	children?: ReactNode;
	className?: string;
	vertical?: boolean;
	type?: ButtonGroupType;
	hidden?: boolean;
};

/**
 * A wrapper for `Button` or `ToggleButton` components that visually groups them and ensures proper keyboard navigation.
 *
 * **Note**: Only intended for horizontal groups of buttons that don't wrap.
 *
 * @component
 * @param {ButtonGroupProps} props - Component props.
 *
 * @returns {JSX.Element} The ButtonGroup component.
 *
 * @example
 * <ButtonGroup>
 * 	<Button />
 * 	<Button />
 * 	<Button />
 * </ButtonGroup>
 */
export const ButtonGroup = (props: Prettify<ButtonGroupProps>) => {
	const { children, className, vertical, hidden, type = 'segmented', ...rest } = props;

	if (hidden) {
		return null;
	}

	return (
		<Toolbar
			className={clsx(
				'es:flex',
				type === 'segmented' && !vertical && 'es:gap-0.5',
				type === 'segmented' && vertical && 'es:flex-col es:gap-0.75',
				type === 'segmented' && !vertical && 'es-button-group-h',
				type === 'segmented' && vertical && 'es-button-group-v',
				type === 'split' && !vertical && 'es:gap-1.25',
				type === 'split' && vertical && 'es:flex-col es:gap-1',
				className,
			)}
			orientation={vertical ? 'vertical' : 'horizontal'}
			{...rest}
		>
			{children}
		</Toolbar>
	);
};
