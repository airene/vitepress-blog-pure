---
title: 建站日记
description: 这是服务器建站的一系列记录，早期的版本已经遗失，这里是目前的一些实践与想法
date: 2020-01-10
tags:
  - 建站
---

### ucloud 服务器

- 主站和博客在/usr/local/src
- blog-clark-cui 与 homesite 都开启了自动上传 action 用 ftp 连接服务器上传的，服务器里的.git-ftp.log 文件就是记录的

### 关于图床的思考

- 图床不是必需品，感觉没啥用
  - 防盗链
  - http
  - 开启水印
  - 图形页面方便管理（没有哪一家实现了）
  - 删除（操作繁琐）
- 硬是要用的话就用现有的七牛云吧，都配置好了，配合 picgo

### 关于云托管的思考

- 腾讯云静态托管可用
  - 有自动 https 域名
  - 但是依托空间，只有第一个空间免费
  - 如果有动态需求，只能用他的云数据库和云函数，体验不好
- 别的主机商的托管
  - 国内访问慢
- 总结
  - 可以做文档类的托管，主站还是不必了。不过都弄主站了，多弄个 nginx 托管似乎也没啥问题

### 关于 tsl 证书

- 使用 cerbot,注意相关东西要装在 docker 里，Nginx 就在 docker 里，全局是没有的

### 关于 vitepress

- 新版的 vuepress 和 vitepress 类似，但是 vitepress 不支持插件系统
- 使用 vitepress 重构主站，目前已经完成首页，还需要完成 blog 页
  - 使用 nodejs 获取本地文件并处理头部参考 [掘金](https://juejin.cn/post/6896382276389732359)
  - 具体案例参考 [vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure)
- sidebar 使用 slug 组件，在 vitepress-for-component 里
  - 完成品参考 [vitepress-for-component](https://github.com/dewfall123/vitepress-for-component)
