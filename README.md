# vitepress theme blog pure
[Live Demo](https://fangying.dev)
### 动机
一直想找一个架构足够干净的ssg系统，hexo,hugo,vuepress等各种网上能找的都试了，包括这些系统的主题也没有直接满意的，（功能太多，生成的html的文件还有不少插件的残留等）
刚好vitepress出来时间不长，系统干净，博客主题这块又是空白，所以做一个自己满意的系统吧，要求就是功能可以少，要足够的轻量
对比博客系统的话，其实当前的功能更像是网上笔记更恰当，比如访问量，加广告，留言，分页功能暂时都没有

### 基础
从掘金看到的一篇文章 [link](https://juejin.cn/post/6896382276389732359)  
他的项目 [vitepress-blog](https://github.com/Moking1997/vitepress-blog)

'Moking1997' 开发的比较早，vitepress的版本还是0.7.x,现在已经 0.15.x了，变化还是挺大的，已经不太能通过提pr的方式维护了。  
主要的变化是适配vitepress的新版本，主题这块采用的实现思路不一样，为了实现极少的代码量和将来能发布成npm包的可能性，并不动官方默认主题。

比如：  
sidebar使用hackcss的方式实现想要的效果  

### 使用方法

**貌似目前主题机制还不成熟，也没到正式版本，先用copy的方式使用**

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
2.新建一个package.json文件,执行 npm i,其中内容自己看着调整

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

3. 执行 npm run dev即可查看效果, 其他工具随意pnpm,yarn等

**4. (注意)写文章的格式**
```markdown
---
date: 2021-06-30
title: .zsh_history 历史记录优化
tags:
- macOS
description: 历史重复的命令太多了，不用grep都不太好找，好在可以用shell把相同的去掉
---
#正文
```
**其中 date和title为必须有的内容，其他随意**

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Airene
