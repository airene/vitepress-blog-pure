---
date: 2024-01-09
title: two-slash测试
category: Develop
tags:
  - 闲聊
description: 测试
---


This is just a demo for test.The source page is [here](https://github.com/shikijs/shiki).

---

# VitePress Integration

```ts twoslash
// @noErrors: true
// .vitepress/theme/index.ts
import Theme from "vitepress/theme";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client"; // [!code hl]
import "@shikijs/vitepress-twoslash/style.css"; // [!code hl]
import type { EnhanceAppContext } from "vitepress";

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue); // [!code hl]
  },
};
```

::: details About style.css

For easier setup, `@shikijs/vitepress-twoslash/styles.css` bundles the styles from `floating-vue` and `@shikijs/twoslash/style-rich.css` so you only need a single entry. If you are using a custom `floating-vue` style or want to have more control of the styles, you can expand them as:

```ts
import "@shikijs/vitepress-twoslash/style.css";

// Equivalent to:
import "@shikijs/twoslash/style-rich.css";
import "floating-vue/dist/style.css";
import "@shikijs/vitepress-twoslash/style-core.css";
```

:::

That's it, you can now use `ts twoslash` in your markdown files to enable the beautiful type hover.

````md
```ts twoslash
console.log("hello");
//      ^?
```
````

It will be rendered as:

```ts twoslash
console.log("hello");
//      ^?
```

<Comment />