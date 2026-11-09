# Icons

When an icon is known ahead of time, prefer static imports from `@eightshift/ui-components/icons`.

```jsx
import { add } from '@eightshift/ui-components/icons';
```

Use `Icon` only when the icon name is genuinely dynamic.

```jsx
import { Icon } from '@eightshift/ui-components/icons';

<Icon icon={iconName} fallback={null} />
```

`Icon` loads the icon-loader catalogue only when it first resolves a string name, then lazy-loads the requested icon module. This avoids loading the catalogue at startup but adds one request before the first dynamic icon can load. Subsequent resolutions reuse the catalogue, and repeated requests for the same normalized name share the in-flight load and cached result.

A `dummySpacer` placeholder is rendered while the catalogue or icon module resolves. Invalid names also wait for the catalogue before rendering the provided `fallback`. If the catalogue or icon cannot be loaded, the result is cached for that name and `fallback` is rendered instead.

Passing a statically imported React element to `Icon` renders it immediately without loading the catalogue.
