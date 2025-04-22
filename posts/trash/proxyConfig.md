---
title: 代理配置
description: 由于网络问题，需要做一些代理的设置，这里是我的一些记录
date: 2020-06-10
tags:
  - 工具
---

### chrome

chrome 安装 SwitchyOmega 把条件都删除，选择规则列表，autoProxy 规则网址填入 https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt 立即更新情景模式(要开代理，注意不要被 switchyOmega 影响到，可以先把他设置为系统代理) 规则下设置 proxy 其他设置直接连接（此时本地代理工具无效），proxy 设置 127.0.0.1 端口 7890 应用选项 选择 auto switch

### clash

- 开启 lan 模式，让内网能连接使用代理，用于 wsl2 连接代理
- 开启 tun 模式，[文档地址](https://docs.cfw.lbyczf.com/contents/tun.html#windows)，为不走代理的软件走软件，开启后很多命令行都不用再设置代理，比如 wsl2
- 一般开 clash 的 tun 模式就行，手动的地址是`http://127.0.0.1:7890`
- [clash 配合 switch 插件](https://maofun.com/739.html)
