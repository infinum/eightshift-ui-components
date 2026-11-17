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

Formatting requires Bun 1.4.4 or newer. Settings live in `bunfig.toml`; no standalone formatter is needed. `quoteProps = "preserve"` keeps intentional property-key quotes, preserving compatibility with identifier-based lint rules.

Run `bun run lint` to check TypeScript, React, and Tailwind classes. Tailwind checks use `lib/style.css`, including the `es:` prefix, custom utilities, variants, and plugins. They cover JSX class attributes, `*ClassName` slot props such as `iconClassName`, and supported class helpers such as `clsx` and `cva`. `oxlint.config.ts` extends the plugin's default selectors rather than replacing them.

Run `bun run lint:fix` to remove duplicate classes and replace deprecated or noncanonical utilities. Unknown classes and conflicting styles need a manual decision and remain errors after autofix. Review the changes before committing. To limit fixes to one file, use `bun run lint:fix lib/components/button/button.tsx`.

Bun loads `lib/style.css` to sort classes using the `es:` prefix and project utilities. The Tailwind lint plugin does not enable its sorting or line-wrapping rules. Use `bun run fmt:check` as the read-only formatting gate; it also runs before linting. For targeted formatting, run `bun run fmt:files -- path/to/changed-file.tsx` with explicit file paths. Full-scope `bun run fmt` requires approval. Existing formatting violations remain blockers; do not suppress or bulk-fix them during tooling work.

Non-Tailwind theme and SVG marker classes are explicitly allowed by `better-tailwindcss/no-unknown-classes` in `oxlint.config.ts`. Extend that list only for classes defined or consumed by the project, not for unknown `es:` utilities.

## Shared font assets

Existing `styles`, `styles-editor`, and `styles-admin` exports continue to include fonts. Applications managing shared same-origin fonts can instead load `styles-no-fonts`, `styles-editor-no-fonts`, and `styles-admin-no-fonts`. Their files are `dist/assets/style-no-fonts.css`, `style-editor-no-fonts.css`, and `style-admin-no-fonts.css`; explicit file-path exports are also available. These companions omit font declarations, not font-family styling. Load only one version of each stylesheet.

The `fonts-manifest` export (`dist/assets/fonts-manifest.json`) contains `{ version: 1, fonts: [{ hash, file }], css }`. Each hash is the full lowercase SHA-256 of the emitted font bytes; each file is an assets-relative `fonts/<filename>` path. `css` is the complete font-face stylesheet, preserving weights, subsets, display settings, and Unicode ranges, with assets-relative `./fonts/<filename>` URLs. Original files remain under `dist/assets/fonts/`.

Consumers must validate the manifest, publish these font bytes at their shared same-origin URLs, rewrite the matching CSS URLs, and load the resulting font stylesheet once alongside the font-free companions. Do not import a font-included stylesheet as well: this would reintroduce the original font URLs. Without a shared-font integration, continue using the existing exports.

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
