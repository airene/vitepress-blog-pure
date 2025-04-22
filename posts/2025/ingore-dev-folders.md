---
title: 2022 Annual Summary
description: 2022 Annual Summary
date: 2023-04-19
tags:
  - English
---


为了实现这个功能，你需要在 `getPosts` 函数中动态处理 `posts` 文件夹中的内容。具体来说：

1. **在开发模式下** (`npm run dev`) 加载所有 Markdown 文件。
2. **在构建模式下** (`npm run build`) 排除 `draft` 和 `temp` 目录中的 Markdown 文件。

要实现这一目的，可以利用 Node.js 的文件系统模块 (`fs`) 和环境变量来区分开发和构建模式。

以下是修改后的代码：

```typescript name=theme/pageService.ts
import fs from 'fs'
import path from 'path'

/**
 * 获取文章列表
 * @param pageSize 每页文章数量
 * @returns 所有文章信息数组
 */
export async function getPosts(pageSize: number) {
    const postsDir = path.resolve(__dirname, '../posts') // posts 目录的路径
    const isBuild = process.env.NODE_ENV === 'production' // 判断是否是构建模式
    const files = fs.readdirSync(postsDir, { withFileTypes: true })

    // 过滤文件夹和文件
    const posts = files
        .filter(dirent => {
            if (dirent.isDirectory()) {
                // 在构建模式下排除 draft 和 temp 子目录
                if (isBuild && (dirent.name === 'draft' || dirent.name === 'temp')) {
                    return false
                }
                return true
            }
            return dirent.name.endsWith('.md') // 只保留 Markdown 文件
        })
        .map(dirent => ({
            name: dirent.name,
            path: path.join(postsDir, dirent.name)
        }))

    // 分页处理
    return paginate(posts, pageSize)
}

/**
 * 分页工具函数
 * @param items 所有项目
 * @param pageSize 每页数量
 * @returns 分页后的数组
 */
function paginate(items: any[], pageSize: number) {
    const pages = []
    for (let i = 0; i < items.length; i += pageSize) {
        pages.push(items.slice(i, i + pageSize))
    }
    return pages
}
```

---

### **修改解释**
1. **判断开发模式和构建模式**
   - 使用 `process.env.NODE_ENV` 判断当前运行模式：
     - `npm run dev` 会设置 `NODE_ENV` 为 `development`。
     - `npm run build` 会设置 `NODE_ENV` 为 `production`。
   - 在构建模式 (`production`) 下，通过检查文件夹名称排除 `draft` 和 `temp` 目录。

2. **读取文件**
   - 使用 `fs.readdirSync` 方法读取 `posts` 目录的内容。
   - 使用 `withFileTypes: true` 参数可以区分文件和文件夹。

3. **过滤逻辑**
   - 在开发模式下，加载所有 Markdown 文件。
   - 在构建模式下，排除 `draft` 和 `temp` 目录。

4. **分页**
   - 对 `posts` 进行分页处理，确保每页只显示指定数量的文章。

---

### **在 VitePress 配置中使用 `getPosts`**
确保在 `config.ts` 文件中正确导入和使用 `getPosts`：

```typescript name=.vitepress/config.ts
import { defineConfig } from 'vitepress'
import { getPosts } from './theme/pageService'

const pageSize = 8

export default defineConfig({
    title: `MagicCode - 芝麻开门`,
    description: `Fisher's Blog. Learn to ask questions, good questions are more important than answers`,
    themeConfig: {
        posts: await getPosts(pageSize),
        // 其他配置...
    }
})
```

---

### **目录结构**
确保 `posts` 目录结构如下：

```
.vitepress/
  theme/
    pageService.ts
posts/
  draft/
    draft-post.md
  temp/
    temp-post.md
  post1.md
  post2.md
```

- `draft/` 和 `temp/` 中的文件在构建模式下会被排除。
- 其他 Markdown 文件会正常加载。

---

### **运行测试**
- **开发模式** (`npm run dev`):
  - 加载 `posts/` 目录下的所有 Markdown 文件，包括 `draft` 和 `temp` 文件夹中的文件。
- **构建模式** (`npm run build`):
  - 过滤掉 `draft` 和 `temp` 文件夹中的文件，仅加载其他 Markdown 文件。

---

### **最终效果**
- 在开发模式下，所有文章（包括 `draft` 和 `temp` 目录中的文件）都将显示。
- 在构建模式下，`draft` 和 `temp` 目录中的文件将被排除，其他文章正常显示。

