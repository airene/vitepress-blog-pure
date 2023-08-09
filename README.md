# vitepress theme blog pure

[Live Demo](https://ti.bi)

## 动机

一直想找一个架构足够干净的 ssg 程序，hexo,hugo,vuepress,docsify 等各种网上能找的都试了，总有不满意的地方，包括这些程序的主题也没有直接满意的（编程语言不会，功能太多，生成的 html 的文件还有不少插件的残留等）。

vitepress 足够轻量，系统干净，博客主题这块又是空白，所以做一个自己满意的博客主题吧，诉求就是功能可以少，但要足够的轻量。

认真来说对比博客程序的话，其实当前的功能更像是线上笔记展示。

**计划中的功能**

-   [ ] 等 vitepress 本身稳定了，就做成 npm package 方式的 theme **keep going**
-   [x] 留言 基于 utteranc
-   [x] 分页?!

**不打算维护的功能**

-   搜索 - 博客不像文档，站内搜索价值不大
-   广告 - 一般人用不上
-   上一篇｜下一篇 - 博客文章本来没什么关联性，价值不大
## 2023-07-24 更新
`# {{ $frontmatter.title }}`用这样的方式当模版会有本地搜索的问题(显示的还是这个tag)，如果用本地搜索，建议直接和title保持一致的内容
## 2023-03-10 更新
动态配置评论(utterances)的主题
## 2022-12-31 更新
适配到 1.0.0-alpha.34
终于把globby升级到了大版本13，从12开始globby转到了esm，一直没升级，而且概念有点模糊，这次升一下。 现在js语法就更纯粹没有commonjs了
**最近还会做主题升级，现在的总感觉不满意，有点不是简约，是纯简单了**
### break change
- package.json 文件需要增加一行 "type": "module",
- globby版本大于12，最好按照文档中的经过验证的版本


## 使用方法

**貌似目前 vitepress 主题机制还不成熟，可能是因为没到正式版，先用`copy`的方式使用**

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
        "vitepress": "^1.0.0-rc.4",
        "globby": "^13.2.0",
        "gray-matter": "^4.0.3",
        "fs-extra": "^11.1.1"
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

# {{ $frontmatter.title }}
正文
```



**其中 title 为必须有的内容，其他随意，推荐含有 date,不然会默认一个当前时间，推荐含有 tags，这样也可以在标签页面显示**

## 评论

目前评论的使用方式并不是很优，尝试了几种方式，基于现状也找不到更合适的方式了，这个也可能和 vitepress 的宗旨（并不是 vuepress 的下一代）或者还没到正式版有关系

使用方式是在想开评论的文章最后加一个 `<Comment />`

`.vitepress/config.js` 这个文件中的 comment 部分换成自己的仓库信息,才能正确的保存评论

```js
comment: {
    repo: 'airene/vitepress-blog-pure', //你自己的用户名和仓库名
    themes: 'github-light',
    issueTerm: 'pathname'
}
```

## 感谢

其实没怎么写过 nodejs,从掘金看到的一篇文章带来的灵感 - [VitePress 极简博客搭建](https://juejin.cn/post/6896382276389732359)

[Moking1997](https://github.com/Moking1997) 开发的比较早，vitepress 的版本还是 0.7.x,现在已经 0.15.x 了，变化还是挺大的，已经不太能通过提 pr 的方式维护了。  
主要的变化是适配 vitepress 的新版本，主题这块采用的实现思路不一样，并不改动官方默认主题，这样可以实现极少的代码量和为将来能发布成 npm 主题包的做准备。

比如：  
sidebar 使用 hackcss 的方式实现想要的效果

## License

[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2021-present, Airene
