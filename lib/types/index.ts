import type { ElementType, ComponentPropsWithRef } from 'react';

/**
 * Utility for polymorphic `as` prop. Merges the component's own props with
 * the intrinsic element/component props of the `as` target.
 *
 * Usage: `type Props = AsProp<'div'> & { label: string }`
 */
export type AsProp<T extends ElementType = 'div'> = {
	as?: T;
} & Omit<ComponentPropsWithRef<T>, 'as'>;

/** A React element that renders an SVG icon (as exported by the icon files). */
export type IconElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;
