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

`Icon` lazy-loads the requested icon module by name and renders a `dummySpacer` placeholder while the module resolves. If the icon name is invalid or the icon cannot be loaded, it renders the provided `fallback` instead.
