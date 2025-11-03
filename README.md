# vitepress theme blog pure

[Live Demo](https://ti.bi)

## 动机

一直想找一个架构足够干净的 ssg 程序，hexo,hugo,vuepress,docsify 等各种网上能找的都试了，总有不满意的地方，包括这些程序的主题也没有直接满意的（编程语言不会，功能太多，生成的 html 的文件还有不少插件的残留等）。

vitepress 足够轻量，系统干净，博客主题这块又是空白，所以做一个自己满意的博客主题吧，诉求就是功能可以少，但要足够的轻量。

认真来说对比博客程序的话，其实当前的功能更像是线上笔记展示。

**计划中的功能**
-   [ ] 等 vitepress 本身稳定了，就做成 npm package 方式的 theme **keep going**
-   [x] 修改原有的评论模块为Giscus，因为原有的有不少问题，新的安装地址：https://giscus.app/ 请按照giscus官网的指导操作更换`.vitepress/theme/components/CommentGiscus.vue`中的信息
-   [x] 发布时排除 `trash` `private-notes` `draft` 这三个目录的md文档
-   [x] 搜索 - vitepress后来的版本天生本地搜索，对普通人来说比algolia好用，很省心
-   [x] ~~留言 基于~~ [utteranc](https://utteranc.es/) ,⚠️2025-04-24 已经换成giscus
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
    "version": "1.0.0",
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
        "vitepress": "^1.6.4",
        "globby": "^15.0.0",
        "gray-matter": "^4.0.3",
        "fs-extra": "^11.3.2",
        "vitepress-plugin-comment-with-giscus": "^1.1.15"
    }
}
```
3.修改 `.vitepress/config.ts` 中的基本配置信息（站点名称，评论仓库信息）  
4.执行 `npm run dev` 即可查看效果, 其他工具随意 pnpm,yarn,bun 等

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

## 感谢

其实没怎么写过 nodejs,从掘金看到的一篇文章带来的灵感 - [VitePress 极简博客搭建](https://juejin.cn/post/6896382276389732359)

[Moking1997](https://github.com/Moking1997) 开发的比较早，vitepress 的版本还是 0.7.x,现在已经 0.15.x 了，变化还是挺大的，已经不太能通过提 pr 的方式维护了。  
主要的变化是适配 vitepress 的新版本，主题这块采用的实现思路不一样，并不改动官方默认主题，这样可以实现极少的代码量和为将来能发布成 npm 主题包的做准备。

比如：  
sidebar 使用 hackcss 的方式实现想要的效果

[Albert26193](https://github.com/Albert26193) 第一个给本project 提pull request的人，虽然没直接合进来，还是感谢。  
[InsHomePgup](https://github.com/InsHomePgup)  
[FisherMS](https://github.com/FisherMS)  

## License

[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2021-present, Airene
