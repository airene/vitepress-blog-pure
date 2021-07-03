# vitepress theme blog pure
[Live Demo](https://fangying.dev)
## 动机
一直想找一个架构足够干净的ssg程序，hexo,hugo,vuepress,docsify等各种网上能找的都试了，总有不满意的地方，包括这些程序的主题也没有直接满意的（编程语言不会，功能太多，生成的html的文件还有不少插件的残留等）。

vitepress足够轻量，系统干净，博客主题这块又是空白，所以做一个自己满意的博客主题吧，诉求就是功能可以少，但要足够的轻量。

认真来说对比博客程序的话，其实当前的功能更像是在线笔记。  

**计划中的功能**  
- [ ] 留言  
- [ ] 分页?!

**不打算维护的功能**  
搜索 - 博客不像文档，站内搜索价值不大  
广告 - 一般用不上  
上一篇｜下一篇 - 博客本来没什么关联性，价值不大

## 使用方法

**貌似目前vitepress主题机制还不成熟，可能是因为没到正式版，先用`copy`的方式使用**

1.复制一下文件到你的项目根目录
```
├── index.md  
├── .vitepress  
├── pages  
│   ├── about.md  
│   ├── archives.md  
│   └── tags.md  
├── posts            //存放博客文章  
├── public           //[可选]    
    └── favicon.ico  
```
2.新建一个package.json文件,执行 npm i,包信息自己看着调整
```json
{
    "name": "vitepress-blog-pure",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "vitepress dev --host 0.0.0.0",
        "build": "vitepress build",
        "serve": "vitepress serve"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "vitepress": "^0.15.5",
        "globby": "^11.0.4",
        "gray-matter": "^4.0.3",
        "mz": "^2.7.0"
    }
}
```
3.执行 `npm run dev` 即可查看效果, 其他工具随意pnpm,yarn等

**ps. 写文章的格式和位置**  
推荐放到posts目录中，格式：
```markdown
---
date: 2021-06-30
title: .zsh_history历史记录优化
description: 历史重复的命令太多了，不用grep都不太好找
tags:
- macOS
---
#标题
正文
```
**其中title为必须有的内容，其他随意，推荐含有date,不然会默认一个当前时间，推荐含有tags，这样也可以在标签页面显示**


## 感谢
其实没怎么写过nodejs,从掘金看到的一篇文章带来的灵感 - [VitePress极简博客搭建](https://juejin.cn/post/6896382276389732359)

[Moking1997](https://github.com/Moking1997) 开发的比较早，vitepress的版本还是0.7.x,现在已经0.15.x了，变化还是挺大的，已经不太能通过提pr的方式维护了。  
主要的变化是适配vitepress的新版本，主题这块采用的实现思路不一样，并不改动官方默认主题，这样可以实现极少的代码量和为将来能发布成npm主题包的做准备。

比如：  
sidebar使用hackcss的方式实现想要的效果


## License

[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2021-present, Airene
