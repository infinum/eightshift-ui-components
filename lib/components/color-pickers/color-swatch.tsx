import { __ } from '@wordpress/i18n';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { ColorSwatch as ReactAriaColorSwatch, parseColor } from 'react-aria-components';

type ReactAriaColorSwatchProps = ComponentPropsWithoutRef<typeof ReactAriaColorSwatch>;
const TypedReactAriaColorSwatch = ReactAriaColorSwatch as (props: ReactAriaColorSwatchProps & { children?: ReactNode }) => ReactNode;

type ColorSwatchProps = Omit<ReactAriaColorSwatchProps, 'children' | 'className' | 'style' | 'color' | 'colorName'> & {
	color?: string;
	gradient?: string;
	className?: string;
	colorName?: string;
	flat?: boolean;
	customGradient?: boolean;
};

/**
 * A simple color or gradient swatch.
 *
 * @component
 * @param {ColorSwatchProps} props - Component props.
 *
 * @returns {JSX.Element} The ColorSwatch component.
 *
 * @example
 * <ColorSwatch color='#FF0000' />
 *
 * @example
 * <ColorSwatch gradient='linear-gradient(45deg, #FF0000, #00FF00)' />
 */
export const ColorSwatch = (props: ColorSwatchProps) => {
	const { color: rawColor, gradient, className, colorName, flat, customGradient = false, ...rest } = props;

	const checkerPattern = 'repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 0.75rem 0.75rem';

	let color: ReactAriaColorSwatchProps['color'] | null = null;

	if (rawColor && !gradient && !customGradient) {
		try {
			if (rawColor === 'transparent') {
				color = 'rgba(0, 0, 0, 0)';
			} else {
				color = parseColor(rawColor);
			}
		} catch {
			color = null;
		}
	}

	let backgroundGradient: string | undefined;

	if (gradient) {
		backgroundGradient = `${gradient}, ${checkerPattern}`;
	} else if (rawColor) {
		backgroundGradient = `linear-gradient(${rawColor}, ${rawColor}), ${checkerPattern}`;
	}

	const hasVisibleColor = Boolean(color || gradient || customGradient);

	return (
		<TypedReactAriaColorSwatch
			{...rest}
			style={{
				background: hasVisibleColor ? backgroundGradient : undefined,
			}}
			className={() =>
				clsx(
					'es:size-6 es:rounded-5 es:in-aria-expanded:rounded-2xl es:border es:border-secondary-300 es:transition-[border-radius]',
					!hasVisibleColor && 'es:bg-white',
					!flat && 'es:shadow-sm',
					className,
				)
			}
			colorName={!hasVisibleColor ? __('No color', 'eightshift-ui-components') : colorName}
			color={color ?? undefined}
		>
			{!hasVisibleColor && <div className='es:m-auto es:h-full es:w-px es:rotate-45 es:rounded-md es:bg-red-500' />}
		</TypedReactAriaColorSwatch>
	);
};
