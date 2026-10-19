# Eightshift UI components

A collection of commonly-used UI components, utilities and icons, meant to provide the best experience both for users and developers while making the editor UI look modern.

Built using [React Aria components](https://react-spectrum.adobe.com/react-aria/), styled using [TailwindCSS](https://tailwindcss.com/). Build process and library export is set up with [Vite](https://vitejs.dev/).

## Local setup

> [!IMPORTANT]
> Uses [Bun](https://bun.com/) for package management.

1. Clone the repository
2. `bun install`
3. `bun start` to run the example

## Linting and formatting

Run `bun run lint` to check TypeScript, React, and Tailwind classes. Tailwind checks use `lib/style.css`, including the `es:` prefix, custom utilities, variants, and plugins. They cover JSX class attributes, `*ClassName` slot props such as `iconClassName`, and supported class helpers such as `clsx` and `cva`. `oxlint.config.ts` extends the plugin's default selectors rather than replacing them.

Run `bun run lint:fix` to remove duplicate classes and replace deprecated or noncanonical utilities. Unknown classes and conflicting styles need a manual decision and remain errors after autofix. Review the changes before committing. To limit fixes to one file, use `bun run lint:fix lib/components/button/button.tsx`.

Class sorting stays with `bun run fmt`; Oxfmt loads `lib/style.css` to recognize the `es:` prefix and project utilities. The Tailwind lint plugin does not enable its sorting or line-wrapping rules. Use `bun run fmt:check` to check formatting without changing files.

Non-Tailwind theme and SVG marker classes are explicitly allowed by `better-tailwindcss/no-unknown-classes` in `oxlint.config.ts`. Extend that list only for classes defined or consumed by the project, not for unknown `es:` utilities.

## Who do I talk to?

If you have any questions or problems, please [open an issue](https://github.com/infinum/eightshift-ui-components/issues) on GitHub and we will do our best to give you a timely answer.

## Maintainers
Eightshift UI components is maintained and sponsored by
[Eightshift](https://eightshift.com) and [Infinum](https://infinum.com).

## License
Eightshift UI components are provided by [Team Eightshift](https://eightshift.com) at [Infinum](https://infinum.com). This is free software, and may be redistributed under the terms specified in the LICENSE file.

### Won't bring over from Frontend libs
- BlockInserter
- Responsive components (ResponsiveNumberPicker, ResponsiveSlider, ResponsiveToggleButton)
- PresetPicker
- TileButton - will deprecate
- WidthOffsetRangeSlider
