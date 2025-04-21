# blog-aicro-net

[Live Demo1](https://blog.aicro.net)

[Live Demo2](https://blog.abcdeep.net)



## 动机

好多年没有写Blog了。平时工作中的笔记到是写了不少，不过并没有Blog查看方便。

使用了现有的[vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure) 项目。

来实现一个轻量级的Blog。方便写下平时的想法和一些经验心得。



**计划中的功能**
-   [ ] 实现在posts目录中的某些子目录在Build的时候排除。



## changelog
[changelog](./changelog.md)


## 使用方法

1. 复制以下文件到你的项目根目录

```
├── .vitepress
├── pages
│   ├── about.md
│   ├── archives.md
│   └── tags.md
├── posts            //可以按目录分类存放博客文章
├── public           //[可选]
    └── favicon.ico
```


2. 新建一个 package.json 文件,执行 npm i,包信息自己看着调整

```json
{
    "name": "blog-aicro-net",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "vitepress dev --host 0.0.0.0",
        "build": "vitepress build",
        "preview": "vitepress preview"
    },
    "keywords": [],
    "author": "",
    "type": "module",
    "license": "ISC",
    "devDependencies": {
        "vitepress": "^1.6.3",
        "globby": "^14.1.0",
        "gray-matter": "^4.0.3",
        "fs-extra": "^11.3.0"
    }
}
```

3. 执行 `npm run dev` 即可查看效果, 其他工具随意 pnpm,yarn 等

**ps. 写文章的格式和位置**  

推荐放到 posts 目录中，格式：

```markdown
---
date: 2021-06-30
title: .zsh_history历史记录优化
description: 历史重复的命令太多了，不用grep都不太好找
tags:
    - macOS
---

# .zsh_history历史记录优化  -- 用{{ $frontmatter.title }}会影响本地查询，可惜

正文

```



**其中 title 为必须有的内容，其他随意，推荐含有 date,不然会默认一个当前时间，推荐含有 tags，这样也可以在标签页面显示**

## 评论

使用了[Giscus的评论系统](https://giscus.app/)(点击申请, 有中文)，修改文件：\.vitepress\theme\components\CommentGiscus.vue中对应的配置即可。

```js
giscusTalk(
    {
      repo: 'FisherMS/blog-aicro-net', // 仓库名称
      repoId: 'R_kgDOOaU1KA', // 仓库 ID
      category: 'General', // 讨论分类名称
      categoryId: 'DIC_kwDOOaU1KM4CpMfW', // 讨论分类 ID
      mapping: 'pathname',
      inputPosition: 'top',
      lang: 'en',
      lightTheme: 'light',
      darkTheme: 'transparent_dark'
    },
    {
      frontmatter,
      route
    },
    true
  )
```

## 感谢

[Airene 的 vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure)


## License

[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2025-present, Fisher

