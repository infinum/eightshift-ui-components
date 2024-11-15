# Changelog for Eightshift UI Components.
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [1.7.1] - 2024-11-14
- Fixed truncate helper when the input is empty.
- Added 2 new UI icons and 3 new block icons.

## [1.7.0] - 2024-10-09
- Updated dependencies.
- `Repeater`, `Draggable`, `DraggableList` and `ItemCollection` will now behave better when `undefined` is passed as value.
- Fixed overlap issues with `Select` components.
- Improved `ColorPicker` grouping logic and made grouped menu more compact.
- Added `MiniResponsive` for cases you need to use a `Responsive` in a limited space. Works best with `OptionSelect` or other `Button`-like components!
- Fixed `Spacer` not applying `className` in some cases.
- Tweaked `MediaPlaceholder` colors a bit.
- `MediaPlaceholder` can now have any child items passed. They are rendered below the label and icon.

## [1.6.1] - 2024-09-30
- Fixed `clearable` not working in Select components.
- Fixed `Tabs` tab alignment when in horizontal mode.
- `OptionsPanel`, `OptionsPanelSection`, and `OptionsPanelHeader` now support the `hidden` prop.
- Tweaked `OptionsPanelHeader` title font.
- Tweaked some default Gutenberg overrides to do WP 6.6 changes.
- Reverted `position: relative` overlap tweak by @piqusy, as it caused layout issues in some cases. `z-index: 50` should still make it OK.

## [1.6.0] - 2024-09-27
- Updated dependencies.
- `ColorPicker` now has better UX when set to `clearable`.
- Made `clearable` variant of `ColorPicker` less confusing.
- Reworked `Draggable`, `DraggableList`, and `Repeater` to improve user experience.
- `Draggable` is now much easier to use.
- `Repeater` now supports "drag outside to delete item", custom menu items for each item, a settable max number of items, and there's a *Duplicate* option now on items.
- Fixed `Draggable` not working.
- Removed `swapy` dependency.
- Made `OptionsPanel` a bit wider.
- Added `OptionsPanelHeader`.

## [1.5.1] - 2024-09-18
- Fixed select components overlaps in some cases (by @piqusy).
- Added `noExpandButton`, `noLabel`, `noUseToggle`, and `hideUseToggleOnExpand` to `ComponentToggle`.

## [1.5.0] - 2024-09-11
- Updated dependencies.
- (**breaking-ish**) Tweaked CSS reset to ignore whole WP admin by default. You'll need to add `es-uic-has-css-reset` to enable it where needed.
- Reworked `DraggableList`, now using a new animation library for a more fluid experience.
- There's now also a `DraggableListItemHandle` that can be placed anywhere within `DraggableListItem` to mark the drag area.
- `DraggableListItem` will now hide the label properly if `title`, `icon` and `subtitle` are not sent
- `DraggableList` now supports a `labelAsHandle` prop to constrain dragging just to the label, instead of the whole item (not compatible with a custom handle!)
- Made `Switch` transforms harder to override by accident from an external source.
- Slightly tweaked `Repeater` styling.
- `LinkInput` should work properly now if `fetchSuggestions` is not passed.
- `LinkInput` will not show suggestions when the field is empty. You can opt out into that with `showSuggestionsWhenEmpty` (could be useful if you have a default list of suggestions).
- Added `Draggable` component for more random layouts.
- Added `ItemCollection` component to get rid of those pesky `.map`s in the editor.

## [1.4.7] - 2024-08-16
- Disabled focus handling in `Expandable` due to Gutenberg conflicts.
- Fixed `LinkInput` external value not previewing.
- Added `truncateEnd` text helper.
- Fixed drag markers not disappearing in `Repeater` when an item is expanded.
- Tweaked `NumberPicker` to make sure it always looks OK (thanks WPML).

## [1.4.6] - 2024-08-08
- Fixed an issue with item saving within some variants of `Select` components.
- Slightly tweaked menu and popover entry animations.
- Removed erroneous outline when Menu is open.
- Fixed `aria-label` passthrough in `OptionSelect` when variant is set to `menu`.
- Updated dependencies.

## [1.4.5] - 2024-07-30
- Added a couple of WP6.6-specific Gutenberg overrides.
- Improved `Repeater` add button reliability.
- Added boolean `tooltip` value to `Button` and `OptionSelect` that will match `aria-label` if set.
- `InputField` can have classes passed to the component wrapper with `wrapperClassName`.

## [1.4.4] - 2024-07-26
- Reduced update rate in `Repeater` to reduce re-renders.

## [1.4.3] - 2024-07-26
- Fixed `updateData` in `Repeater` that gets passed to child items.
- Tailwind's CSS reset will now be ignored with in containers that have a `es-uic-no-css-reset` class applied. Also, the reset is disabled for WP admin tables (`.wp-list-table`). If you need to include a reset "island" within a container that had `es-uic-no-css-reset` applied, you can add a `es-uic-has-css-reset` to re-enable it for that container.

## [1.4.2] - 2024-07-26
- Added missing import in `NumberPicker`.
- Improved `Repeater` behavior and reliability.
- Added missing empty state in `Repeater`.

## [1.4.1] - 2024-07-26
- Fixed popover flashes in `LinkInput` if there's less than 4 characters.

## [1.4.0] - 2024-07-26
- Updated dependencies.
- Fixed `MultiSelect` item bug when using `simpleValue`.
- Updated Gutenberg overrides.
- Tweaked `Button` icon size when size is set to `small`.
- Fixed height of separator when using extra controls with `NumberPicker` and a custom size is set.
- `es-uic-shrink`, `es-uic-shrink-0`, `es-uic-grow`, `es-uic-grow-0`, `es-uic-flex-1`, `es-uic-flex-auto`, `es-uic-flex-initial`, and `es-uic-flex-none` will always be available.
- `MultiSelect` and `AsyncMultiSelect` multi-value item containers now have a maximum width set to prevent overflows with long titles.
- Rewrote `LinkInput` so it is less in the way when entering URLs.
- Rewrote `Repeater` to use React DNDKit until React Aria fixes issues with interactive elements inside `GridList`s.
- `Expandable` will now close if disabled while open.
- A new transition has been added to `AnimatedVisibility` - `fade`.
- Added 6 new UI icons.
- Increased contrast of `ContainerPanel` title and icon.

## [1.3.2] - 2024-07-23
- Tweaked `OptionSelect` rich label style.

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
[1.7.1]: https://github.com/infinum/eightshift-ui-components/compare/1.7.0...1.7.1
[1.7.0]: https://github.com/infinum/eightshift-ui-components/compare/1.6.1...1.7.0
[1.6.1]: https://github.com/infinum/eightshift-ui-components/compare/1.6.0...1.6.1
[1.6.0]: https://github.com/infinum/eightshift-ui-components/compare/1.5.1...1.6.0
[1.5.1]: https://github.com/infinum/eightshift-ui-components/compare/1.5.0...1.5.1
[1.5.0]: https://github.com/infinum/eightshift-ui-components/compare/1.4.7...1.5.0
[1.4.7]: https://github.com/infinum/eightshift-ui-components/compare/1.4.6...1.4.7
[1.4.6]: https://github.com/infinum/eightshift-ui-components/compare/1.4.5...1.4.6
[1.4.5]: https://github.com/infinum/eightshift-ui-components/compare/1.4.4...1.4.5
[1.4.4]: https://github.com/infinum/eightshift-ui-components/compare/1.4.3...1.4.4
[1.4.3]: https://github.com/infinum/eightshift-ui-components/compare/1.4.2...1.4.3
[1.4.2]: https://github.com/infinum/eightshift-ui-components/compare/1.4.1...1.4.2
[1.4.1]: https://github.com/infinum/eightshift-ui-components/compare/1.4.0...1.4.1
[1.4.0]: https://github.com/infinum/eightshift-ui-components/compare/1.3.2...1.4.0
[1.3.2]: https://github.com/infinum/eightshift-ui-components/compare/1.3.1...1.3.2
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
