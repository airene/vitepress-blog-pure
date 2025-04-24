---
date: 2021-06-30
title: 2025一直想找一个系统架构和设计都足够干净的系统
category: 主题
tags:
- vitepress
- markdown
description: vitepress的markdown插件支持的语法，一直想找一个干净的系统架构和设计都足够干净都，一直没满意的，不满意就自己设计，一直想找一个干净的系统架构和设计都足够干净都，一直没满意的，不满意就自己设计
---
# 一直想找一个系统架构和设计都足够干净的系统
## 前提
理论上任何工具写出来的markdown(下文简称md)文件都能用，但是如果是按照以下方式写的话，可能表现力会丰富很多

## 查看环境

假设你是mac？！

* 安装 brew 这个可以装很多东西，正常是网上搜一句命令就装了
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
* 安装 node ，有brew的情况下， 就是 `brew info node` 一句话就行了
```bash
brew info node
```
* 安装 vitepress 本文重点 前两个都有都情况下 一句话就行了 `npm install -g vitepress`
 ```bash
npm install -g vitepress
```

到你的md目录执行 vitepress dev . 就能查看文档大致的样子

## vitepress-markdown 特性vitepress-markdown 特性

### 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### 提示

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger what??
This is a dangerous warning
:::
```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger what??
This is a dangerous warning
:::

### 代码高亮

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

### emoji表情
```markdown
:tada: :100:
```
:tada: :100:


## 规范与建议

便于效果一致，目前发现页面标题从 ## h2 开始使用可以获得最佳展示效果

## 生产环境的文档

* 上线目前为手动上线 以后可能搞成自动
* 本地全写完也是可以的

## 玩转侧边栏 以后再写吧


