import { cva } from 'class-variance-authority';

export const selectButtonClass = cva('es:any-focus:outline-hidden es:text-start es:size-full es:inline-block es:group es:overflow-x-clip', {
	variants: {
		size: {
			small: ['es:min-h-8', 'es:px-2.5'],
			medium: ['es:min-h-9', 'es:px-3'],
			default: ['es:min-h-10', 'es:px-3'],
			large: ['es:min-h-12', 'es:px-4'],
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

export const selectControlClass = cva(
	[
		'es:relative',
		'es:flex es:items-center es:gap-px',
		'es:leading-none',
		'es:rounded-lg es:hover:rounded-xl es:has-focus-visible:rounded-2xl es:group-open:rounded-2xl',
		'es:transition-plus',
		'es:any-focus:outline-hidden',
		'es:inset-ring',
		'es:has-focus-visible:ring-2 es:has-focus-visible:ring-accent-500/30',
		'es:has-focus-visible:text-accent-950 es:has-focus-visible:inset-ring-accent-500',
		'es:focus:placeholder:text-surface-400',
	],
	{
		variants: {
			disabled: {
				false: 'es:selection:bg-surface-100 es:selection:text-accent-800',
				true: 'es:selection:bg-secondary-200 es:selection:text-secondary-600',
			},
			clearable: {
				true: 'es:pr-8',
			},
			hasMinWidth: {
				true: 'es:min-w-48',
			},
			inline: {
				false: 'es:w-fill',
			},
		},
		compoundVariants: [
			{
				flat: false,
				disabled: false,
				class: [
					'es:bg-white',
					'es:bg-linear-to-b es:from-secondary-100/0 es:to-secondary-100/50 es:from-25%',
					'es:hover:from-surface-100/0 es:hover:to-surface-100/50',
					'es:inset-ring-secondary-400/50 es:hover:inset-ring-surface-300 es:focus:inset-ring-surface-400',
					'es:inset-shadow-sm es:inset-shadow-secondary-100/50',
					'es:hover:placeholder:text-surface-400',
					'es:placeholder:text-secondary-400',
					'es:shadow-xs es:shadow-black/5',
				],
			},
			{
				flat: true,
				disabled: false,
				class: [
					'es:inset-ring-secondary-100',
					'es:focus:text-accent-950',
					'es:placeholder:text-secondary-500/80',
					'es:bg-secondary-100 es:focus:bg-surface-50',
					'es:inset-ring-secondary-200/15 es:hover:inset-ring-secondary-200/65 es:focus:inset-ring-surface-200',
				],
			},
			{ disabled: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-200 es:text-secondary-400'] },
			{ readOnly: true, flat: false, class: ['es:bg-secondary-50 es:inset-ring-secondary-300 es:text-secondary-400'] },
			{ readOnly: true, flat: true, class: ['es:bg-secondary-50 es:inset-ring-secondary-300/60 es:text-secondary-400'] },
		],
		defaultVariants: {
			disabled: false,
			flat: false,
			size: 'default',
			clearable: false,
			hasMinWidth: true,
			inline: false,
		},
	},
);
