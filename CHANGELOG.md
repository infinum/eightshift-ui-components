# Changelog for Eightshift UI Components.
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [5.3.0] - 2025-09-18
- Updated dependencies.
- Fixed `RichLabel` and `MenuItem` icon shrinking in some instances.
- Made `Menu` size fixed to prevent layout shifts. You can remove the fixed width with `manualWidth` prop, but there will still be a max limit.
- Tweaked Popover classname passing in `Menu`.
- `MenuItem` now supports `subtitle`.
- Slightly adjusted icon sizes across components to improve sharpness.
- Fixed `onAfterItemRemove` errors in `Draggable` and `DraggableList`.
- Added new `MenuSectionHeader` component (decorative).
- Added 4 UI icons.
- Improved code completion for nested prop passthroughs in various components (e.g. `triggerProps` in `Menu`).
- `Checkbox` now support `icon` even without `alignEnd`.
- Tweaked some animations in `AnimatedVisibility`.
- Slightly adjusted `Notice` spacing.
- Added ability to pass `labelClassName`, `subtitleClassName` and `labelSubtitleWrapClassName` to `RichLabel`.

## [5.2.1] - 2025-07-28
- Added the option for custom fetch functions in `AsyncSelectNext` and `__AsyncMultiSelectNext`.

## [5.2.0] - 2025-07-23
- Updated dependencies.
- Added experimental MultiSelect and async MultiSelect components (`__MultiSelectNext` and `__AsyncMultiSelectNext`).

## [5.1.4] - 2025-07-15
- The 'Duplicate' button can now be disabled in `Repeater` with the `noDuplicateButton` prop
- The 'Duplicate' button will now be disabled if `addDisabled` is `true`
- Fixed doc comments for `SelectNext` and `AsyncSelectNext`

## [5.1.3] - 2025-07-14
- Fixed some icons missing dynamic colors
- Added tiny bit of space to `Notice` subtitle
- Tweaked compact `Tabs` spacing
- Added `pillOutline` and `pillCompactOutline` variants of `Tabs`
- Updated `Notice` styling

## [5.1.2] - 2025-07-10
- Updated dependencies
- Fixed a couple of bugs in `SelectNext` and `AsyncSelectNext` and added missing prop docs
- `Menu` now support the `disabled` attribute

## [5.1.1] - 2025-07-02
- Added slot for actions next to the close button in Modal (`headerActions` prop).
- Fixed `monospaceFont` not working with multiline `InputField`s.
- Added 2, updated 16 UI icons.

## [5.1.0] - 2025-06-27
- Added `isString` helper function
- `__ExperimentalAsyncSelect` and `__ExperimentalSelect` improvements:
  - Reworked components to look and work better
  - Added `customDropdownArrow` prop
  - Now fully feature-complete with previous `react-select` implementations
  - [BREAKING] **Renamed to `AsyncSelectNext` and `SelectNext`**, please update imports accordingly
- Tweaked `Popover` and `LinkInput` popover enter/exit animations
- Twaeked `Switch` styling when `disabled`
- Tweaked `react-select` defaut styles to better match new components
- `InputField` with type `search` will now clear on `Esc` on Firefox too

## [5.0.10] - 2025-06-24
- Fixed more incorrectly parsed SVG elements in `JsxSvg`

## [5.0.9] - 2025-06-23
- `JsxSvg` improvements:
  - Fixed improper handling of `linearGradient`s
  - Added automatic ID randomization for `id`s withing SVGs (disableable with `noIdRandomization`, prefix configurable with `idRandomizationPrefix`)
  - Added prop passthrough

## [5.0.8] - 2025-06-23
- Improved `LinkInput` performance and responsiveness
- Added a default background to `InputField` so it looks good standalone
- Updated dependencies

## [5.0.7] - 2025-06-18
- `LinkInput` will no longer generate suggestions for relative URLs.
- Fixed font loading.

## [5.0.6] - 2025-06-12
- Added new `submenu` and `standaloneMenuItems` variants to `OptionSelect` for easy sub-menus or radio button menu items.
- Added `keepOpen` option to `SubMenuItem`.

## [5.0.5] - 2025-06-12
- Added a `PortalProvider` component that allows changing the target for transient components like menus, popovers, etc.

## [5.0.4] - 2025-06-12
- `Modal` improvements:
  - Now works properly in *controlled* mode (opening controlled by an external variable) - also provides `onOpenChange` so you can update your state when closing is requested
  - New design for header when `title` is added and floating close button when no title is provided
  - Optional footer action area via the `actions` prop
  - `headerClassName`, `actionsClassName`, and `contentContainerClassName` for more customization options
  - `...rest` props are now properly passed through
- `HStack` and `VStack` now have an `as` prop so they can be rendered as other tags (vs. the default `div`)
- `Button` improvements:
  - Added a new `Button` style: `selectedGhost`
  - There's now a `pending` prop to indicate that the button is waiting for a pending action. The ARIA label (default: "Loading") can be customized with the `pendingAriaLabel` prop.

## [5.0.3] - 2025-06-10
Co-authored with @piqusy

- Fixed Select components options going off screen in long lists.
- Remove duplicate prop doc for `ComponentToggle`.
- Fixed `Repeater` items being draggable when expanded.
- Fixed `headerProps` prop in `Expandable`.
- 'Drag to remove' can now be disabled in `Repeater` with the `noDragToRemove` prop.
- Tweaked some visual elements of components.

## [5.0.2] - 2025-06-09
- Updated dependencies.
- Optimized `LinkInput` performance and prevented initial network requests if the value was empty.
- Added 5 new UI icons.

## [5.0.1] - 2025-05-08
- Updated dependencies.

## [5.0.0] - 2025-05-07
- [**NOTE**] This version reverts to React 18 due to WP not being ready yet.
- Updated dependencies.
- `tooltip` in `ToggleButton` works like on regular `Button` now.
- Added `aria-label` to `ComponentToggle`'s switch (customizable).
- Expanded `ColorSwatch` with ability to pass gradient as `className`, together with `customGradient`.
- Improved `LinkInput` suggestions popup reliability.
- `Responsive` (and its variants) can now take a `className`, which is passed to its `BaseControl`.
- Fixed `Slider` marker generation for tiny steps (< 1). Marker generation step can now also be configured with `markerStep`.

## [4.0.0] - 2025-03-18
- [**BREAKING**] Updated to React 19.

## [3.0.1] - 2025-03-18
- Fixed `RadioButton` and `Checkbox` label roles.
- Fixed `Tabs` in `vertical` mode having extra margin on tab content.
- Updated dependencies.

## [3.0.0] - 2025-03-11
- [**BREAKING**] Fixed how `Responsive`'s (+ `MiniResponsive`) desktop-first mode works. To use previous behavior, add `useLegacyDesktopFirst`. Mobile-first is unaffected.
- Tweaked `ContainerPanel` so it doesn't animate on first mount.
- `ContainerPanel` now supports the `hidden` attribute.
- Fixed bug in `ContainerPanel` that in certain cases didn't pass through `className`.
- Tweaked admin styles to also encompass body.
- Added compact pill styles to `Tabs`.
- Added 1 block icon.
- Added 7 UI icons.
- Updated 1 UI icon.
- `Repeater` now has an option to expand/collapse all child panels at once. You can disable it with `noExpandAllButton`.
- `Repeater` now has an extra slot for 'More options' dropdown.
- Tweaked `Tooltip` entrance animation.
- Increased `Toggle`/`Switch` spacing a bit.
- Removed legacy `illustrations` from icons.
- `Tab` now has an `invisible` prop, which allows hiding a tab without unmounting it, which could cause errors.
- Updated dependencies

## [2.0.2] - 2025-01-28
- Fixed `alignIconToTitle` in `Notice`
- Fixed `Tooltip` animation in left/right variants
- Fixed disabled state not showing in `Switch`(/`Toggle`)
- Fixed `Expandable` issue with expanding via keyboard
- Reworked some focus states across various components to make them look better and work nicer
- Update `dnd-kit` helper within `Draggable`

## [2.0.1] - 2025-01-27
- Tweaked CSS reset scoping.
  - `~@eightshift/ui-components/dist/assets/style-admin.css` should be used for the admin area - **CSS reset can be opt in** via `es:css-reset`, cascade layers are not used, styles are prefixed
  - `~@eightshift/ui-components/dist/assets/style-editor.css` is used for the block editor - cascade layers are not used, styles are prefixed to avoid block editor conflicts
  - `~@eightshift/ui-components/dist/assets/style.css` is for everything else - uses cascade layers and style prefixing
- Fixed `Expandable` button hover when disabled

## [2.0.0] - 2025-01-27
**Breaking changes ahead!**
- Updated dependencies.
- Upgraded to TailwindCSS 4.
  - All `es-uic-` classes are now `es:`
  - `!important` modifiers should now be at the end of the class name, instead of at the beginning (e.g. `es-uic-static` -> `es:static!`)
  - Removed `font-geist` class, use `es:font-sans` instead
  - Updated design of most components.
- Added an option to theme the accent color of the components.
- Replaced `tailwindcss-animate` with `tailwindcss-motion`
- Removed `ListBox`
- Added 2 new Tabs variants (`pill` and `pillInverse`)
- CSS reset and Gutenberg overrides are now automatically managed, no extra config needed
  - for the editor and admin areas: import `~@eightshift/ui-components/dist/assets/style-editor.css` (doesn't use cascade layers and prefixes styles to avoid block editor conflicts)
  - for other uses: import `~@eightshift/ui-components/dist/assets/style.css` (no prefixing, uses cascade layers)
- Fonts are now built-in and automatically managed, remove any `~@eightshift/ui-components/dist/assets/fonts.css` imports
- `ColorPicker` now supports adding custom options below colors via the `extraOptions` prop
- Added 2 new UI icons
- `InputField`s can now be `inline`
- Simplified `MatrixAlign` (`popoverPosition` prop is no longer supported)

## [1.9.1] - 2024-12-17
- Downgraded from React 19 to React 18.

## [1.9.0] - 2024-12-17
- Rewrote `Expandable` and `ComponentToggle` to use new React Aria disclosure components.
- Deprecated `noFocusHandling` from `Expandable`.
- Reworked `AnimatedVisibility` to use native CSS animations instead of Motion.
- Made `Checkbox` checkmark a bit thicker.
- Tweaked `ContainerPanel` animations.
- Added 2 UI icons.
- Updated dependencies.

## [1.8.0] - 2024-11-22
- `JsxSvg` now supports `aria-hidden` prop
- `JsxSvg` now support passing custom dynamic props to the output SVG.
- Added `__ExperimentalSelect` and `__ExperimentalAsyncSelect` as preview version of future select components. Please try them out and report any issues!
- Updated dependencies.

## [1.7.2] - 2024-11-14
- Re-publish of `1.7.1`, as it didn't properly publish.

## [1.7.1] - 2024-11-14
- Fixed truncate helper when the input is empty.
- Added 2 new UI icons and 3 new block icons.
- Updated dependencies.

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
[5.3.0]: https://github.com/infinum/eightshift-ui-components/compare/5.2.1...5.3.0
[5.2.1]: https://github.com/infinum/eightshift-ui-components/compare/5.2.0...5.2.1
[5.2.0]: https://github.com/infinum/eightshift-ui-components/compare/5.1.4...5.2.0
[5.1.4]: https://github.com/infinum/eightshift-ui-components/compare/5.1.3...5.1.4
[5.1.3]: https://github.com/infinum/eightshift-ui-components/compare/5.1.2...5.1.3
[5.1.2]: https://github.com/infinum/eightshift-ui-components/compare/5.1.1...5.1.2
[5.1.1]: https://github.com/infinum/eightshift-ui-components/compare/5.1.0...5.1.1
[5.1.0]: https://github.com/infinum/eightshift-ui-components/compare/5.0.10...5.1.0
[5.0.10]: https://github.com/infinum/eightshift-ui-components/compare/5.0.9...5.0.10
[5.0.9]: https://github.com/infinum/eightshift-ui-components/compare/5.0.8...5.0.9
[5.0.8]: https://github.com/infinum/eightshift-ui-components/compare/5.0.7...5.0.8
[5.0.7]: https://github.com/infinum/eightshift-ui-components/compare/5.0.6...5.0.7
[5.0.6]: https://github.com/infinum/eightshift-ui-components/compare/5.0.5...5.0.6
[5.0.5]: https://github.com/infinum/eightshift-ui-components/compare/5.0.4...5.0.5
[5.0.4]: https://github.com/infinum/eightshift-ui-components/compare/5.0.3...5.0.4
[5.0.3]: https://github.com/infinum/eightshift-ui-components/compare/5.0.2...5.0.3
[5.0.2]: https://github.com/infinum/eightshift-ui-components/compare/5.0.1...5.0.2
[5.0.1]: https://github.com/infinum/eightshift-ui-components/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/infinum/eightshift-ui-components/compare/3.0.1...5.0.0
[4.0.0]: https://github.com/infinum/eightshift-ui-components/compare/3.0.1...4.0.0
[3.0.1]: https://github.com/infinum/eightshift-ui-components/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/infinum/eightshift-ui-components/compare/2.0.2...3.0.0
[2.0.2]: https://github.com/infinum/eightshift-ui-components/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/infinum/eightshift-ui-components/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/infinum/eightshift-ui-components/compare/1.9.1...2.0.0
[1.9.1]: https://github.com/infinum/eightshift-ui-components/compare/1.9.0...1.9.1
[1.9.0]: https://github.com/infinum/eightshift-ui-components/compare/1.8.0...1.9.0
[1.8.0]: https://github.com/infinum/eightshift-ui-components/compare/1.7.2...1.8.0
[1.7.2]: https://github.com/infinum/eightshift-ui-components/compare/1.7.1...1.7.2
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
