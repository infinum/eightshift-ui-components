# Changelog for Eightshift UI Components.
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [1.3.1] - 2024-07-19
- Tweaked Gradient editor layout.
- Tweaked Gutenberg tooltip style.

## [1.3.0] - 2024-07-19
- Added the `Modal` component.
- Fixed Gutenberg tooltip style.

## [1.2.3] - 2024-07-17
- Adds missing doc comment for `hide` prop in `Button`.
- Added a couple of styles for Gutenberg overrides.

## [1.2.2] - 2024-07-09
- Fixed bug with `ContainerPanel`

## [1.2.1] - 2024-07-05
- Added grab cursors for slider component thumbs to improve visual feedback.
- Improved `ColumnConfigSlider` label generator.

## [1.2.0] - 2024-07-04
- Fixed bug with clearing `Select` components
- Fixed loading state padding in `Select` components
- Fixed JSDoc blocks in couple of components
- Fixed border colors in `Expandable`, `MenuSection`, segmented `RadioButtonGroup`, and `Select` components
- Fixed `InputField` not passing `type`
- Fixed style of indeterminate `Checkbox`
- Tweaked spacing of `Slider`s without markers
- Added an option to disable advanced options in `SolidColorPicker`
- Added a placeholder in the Angle input within the `GradientEditor` when the default direction presets are used.
- Improved `ContainerPanel` behavior when toggling `use` externally.
- Fixed font size of `OptionPanel` help text.
- Improved `ResponsivePreview` behavior and added auto-detect for desktop-first from value.

## [1.1.4] - 2024-07-01
- Same as `1.1.3`, just resolving some publishing issues

## [1.1.3] - 2024-07-01
- Added spacing to `endIcon`s in Menu items.
- Tweaked auto-fix of Select components, now they don't need explicit `id`s in items.
- Fixed small tooltip bugs in `ResponsiveLegacy`.
- Tweaked tooltip opacity and blur amount.
- Updated dependencies.

## [1.1.2] - 2024-06-29
- Added missing margin in Select components.
- Removed ESLint React (Hooks) temporarily, as they're not fully compatible with ESLint 9.
- Added a disabled state for selected `RadioButton`s.

## [1.1.1] - 2024-06-26
- Removed `prepare` step from `package.json`.

## [1.1.0] - 2024-06-25
- Migrated to ESLint 9.
- Updated dependencies.
- Switched from Babel to SWC.
- Cleaned up ESLint issues.

## [1.0.6] - 2024-06-25
- Tweaked `Responsive` and `ResponsiveLegacy` inner content positioning (use `innerContentAlign` to adjust).

## [1.0.5] - 2024-06-25
- Improved `OptionSelect` when `menu` type is selected and the value is `undefined`.
- Added a way to set breakpoints and names to `Responsive` and `ResponsivePreview` (via the `breakpointUiData` prop).
- Fixed `Responsive` labelling

## [1.0.4] - 2024-06-24
- Modularized style exports

  Change
  ```css
  @import '~@eightshift/ui-components/dist/assets/wp.css';
  ```
  to
  ```css
  @import '~@eightshift/ui-components/dist/assets/wp-font-enhancements.css';
  @import '~@eightshift/ui-components/dist/assets/wp-ui-enhancements.css';
  ```

## [1.0.3] - 2024-06-21
- Replaced `key` with `id` as unique identifier in `Repeater` and re-added the functionality that deletes the `id` from output.

## [1.0.2] - 2024-06-21
- Add key (ID) auto-fix to `Repeater` and removed the functionality that deletes the `key` from output.
- Added a `fixIds` utility function
- Improved `RepeaterItem` drag indicator contrast

## [1.0.1] - 2024-06-21
- Improved `Repeater` drag&drop behavior
- `Repeater` now allows adding a custom empty state view via the `emptyState` prop
- Added auto-ID-fix to `MultiSelect` and `AsyncMultiSelect`

## [1.0.0] - 2024-06-20
- Initial release

[Unreleased]: https://github.com/infinum/eightshift-ui-components/compare/master...HEAD

[1.3.1]: https://github.com/infinum/eightshift-ui-components/compare/1.3.0...1.3.1
[1.3.0]: https://github.com/infinum/eightshift-ui-components/compare/1.2.3...1.3.0
[1.2.3]: https://github.com/infinum/eightshift-ui-components/compare/1.2.2...1.2.3
[1.2.2]: https://github.com/infinum/eightshift-ui-components/compare/1.2.1...1.2.2
[1.2.1]: https://github.com/infinum/eightshift-ui-components/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/infinum/eightshift-ui-components/compare/1.1.4...1.2.0
[1.1.4]: https://github.com/infinum/eightshift-ui-components/compare/1.1.3...1.1.4
[1.1.3]: https://github.com/infinum/eightshift-ui-components/compare/1.1.2...1.1.3
[1.1.2]: https://github.com/infinum/eightshift-ui-components/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/infinum/eightshift-ui-components/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/infinum/eightshift-ui-components/compare/1.0.6...1.1.0
[1.0.6]: https://github.com/infinum/eightshift-ui-components/compare/1.0.5...1.0.6
[1.0.5]: https://github.com/infinum/eightshift-ui-components/compare/1.0.4...1.0.5
[1.0.4]: https://github.com/infinum/eightshift-ui-components/compare/1.0.3...1.0.4
[1.0.3]: https://github.com/infinum/eightshift-ui-components/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/infinum/eightshift-ui-components/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/infinum/eightshift-ui-components/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/infinum/eightshift-ui-components/compare/0.0.1...1.0.0
