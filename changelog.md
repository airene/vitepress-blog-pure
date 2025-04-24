# changelog

## 2025-04-24
- 修改原有的评论模块为Giscus，因为原有的有不少问题，新的安装地址：https://giscus.app/ 请按照giscus官网的指导操作更换`.vitepress/theme/components/CommentGiscus.vue`中的信息
- 默认开启评论 如果不想开启 需要在md 文件头部加入 `comment: false` , eg：`pages/tags.md`
- 变更多文件有点多，可能需要老用户diff一下文件差异，重新初始化

## 2025-04-23
- /posts/下的文章按目录存放，而不必存放到Posts的根目录
- 发布时排除 `trash` `private-notes` `draft` 这三个目录的md文档。

## 2025-03-17 标签 tags页面
tag最多的内容排在最前面
## 2024-07-15 项目更ts化
有些文件从js变成ts了，about加了适合程序员的模板，有更新的化可能需要重新拷贝文件，保留自己的config.js里的信息，感谢[Albert26193](https://github.com/Albert26193)  
## 2024-04-15 增加分类功能
升级方式请看 https://github.com/airene/vitepress-blog-pure/commit/bbd8fb3508de7490ed93c3a43545df4d5b5ce9b1  
总结就是：增加两个文件，修改3个文件，和每一个文章需要在开头增加category信息
## 2024-04-07 升级到正式版1.0.2 
- 稍后会把albert的pull request的内容有价值的和进来
- 计划把此"theme"做成npm可以直接install的theme
## 2023-08-09 官方终于升到rc版了, yeah
bump version

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
