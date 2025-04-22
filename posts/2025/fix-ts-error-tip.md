---
title: 2022 Annual Summary
description: 2022 Annual Summary
date: 2023-04-19
tags:
  - English
---


这些问题是 TypeScript 类型检查的问题，可以通过以下方式进行修复：

---

### **问题 1：`Module '"vitepress"' has no default export`**
#### **原因：**
`vitepress` 的类型定义中没有默认导出（`default export`），而是以命名导出（`named exports`）的方式定义的。所以不能直接用 `import Theme from 'vitepress'`。

#### **解决方法：**
将 `import Theme from 'vitepress'` 替换为使用命名导出：
```typescript
import { Theme } from 'vitepress'
```

---

### **问题 2：`Binding element 'app' implicitly has an 'any' type`**
#### **原因：**
TypeScript 的严格模式下，函数参数必须有明确的类型声明。如果 `app` 的类型没有显式定义，TypeScript 会抛出此错误。

#### **解决方法：**
为 `app` 参数显式声明类型。`enhanceApp` 方法的上下文中，`app` 的类型是 `App` 类型（来自 `vue` 包）。因此需要导入并使用 `App` 类型。

---

### **修正后的代码**
以下是修复后的 `index.ts` 文件内容：

```typescript name=index.ts
import { Theme } from 'vitepress' // 修复问题 1：使用命名导出
import DefaultTheme from 'vitepress/theme'
import { App } from 'vue' // 引入 Vue 的 App 类型
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import Comment from './components/CommentGiscus.vue'

import './custom.css'

const theme: Theme = {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }: { app: App }) { // 修复问题 2：为 app 显式声明类型
        // 全局注册后，在 Vue 里就能直接使用了
        app.component('Tags', Tags)
        app.component('Category', Category)
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('Comment', Comment)
    }
}

export default theme
```

---

### **详细解释**
1. **`import { Theme } from 'vitepress'`**
   - `vitepress` 并没有默认导出，因此需要使用命名导出 `Theme`。

2. **为 `app` 添加类型 `{ app: App }`**
   - `app` 是 Vue 的应用实例，其类型为 `App`，需要从 `vue` 包中导入类型声明。

3. **`satisfies Theme` 替换为显式类型声明**
   - 使用 `const theme: Theme` 明确声明 `theme` 的类型，这样更符合 TypeScript 的最佳实践。

---

### **最终效果**
上述修正后：
- TypeScript 检查通过。
- `vitepress` 的主题配置文件可以正常工作。
