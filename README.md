# vitepress abcdeep.net blog

[Live Demo](https://blog.abcdeep.net)




## 动机

好多年没有写Blog了，平时工作中的笔记到是写了不少。不过并没有Blog查看方便，因此使用了现有的[vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure) 项目。

来实现一个轻量级的Blog。方便写下平时的想法和一些经验心得。


**计划中的功能**
-   [ ] 等 vitepress 本身稳定了，就做成 npm package 方式的 theme **keep going**
-   [x] 搜索 - vitepress后来的版本天生本地搜索，对普通人来说比algolia好用，很省心
-   [x] 留言 基于 [utteranc](https://utteranc.es/)
-   [x] 分页?!

**不打算维护的功能**
-   广告 - 一般人用不上
-   上一篇｜下一篇 - 博客文章本来没什么关联性，价值不大
## changelog
[changelog](./changelog.md)

## 使用方法

1.复制以下文件到你的项目根目录

```
├── .vitepress
├── pages
│   ├── about.md
│   ├── archives.md
│   └── tags.md
├── posts            //存放博客文章
├── public           //[可选]
    └── favicon.ico
```

2.新建一个 package.json 文件,执行 npm i,包信息自己看着调整

```json
{
    "name": "vitepress-blog-pure",
    "version": "1.1.0",
    "description": "",
    "main": "index.ts",
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

3.执行 `npm run dev` 即可查看效果, 其他工具随意 pnpm,yarn 等

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

目前评论的使用方式并不是很优雅，尝试了几种方式，基于现状也找不到更合适的方式了，这个也可能和 vitepress 的宗旨（并不是 vuepress 的下一代）或者还没到正式版有关系

使用方式是在想开评论的文章最后加一个 `<Comment />`

`.vitepress/config.ts` 这个文件中的 comment 部分换成自己的仓库信息,才能正确的保存评论

```js
comment: {
    repo: 'airene/vitepress-blog-pure', //你自己的用户名和仓库名
    themes: 'github-light',
    issueTerm: 'pathname'
}
```

## 感谢

[Airene 的 vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure)


## License

[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2021-present, Fisher

