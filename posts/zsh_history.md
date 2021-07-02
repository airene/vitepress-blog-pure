---
date: 2021-05-20
title: .zsh_history 历史记录优化
tags:
- macOS
description: 历史重复的命令太多了，不用grep都不太好找，好在可以用shell把相同的去掉
---
# .zsh_history 历史记录优化
.zsh_history的存储编码是一个非常特殊的编码,不是常见的utf,gbk什么的，所以里面中文用别的软件打开了就乱码了，想用python把.zsh_history的重复的都去掉，读的时候就报错了，zsh官方有人问特殊字符怎么办，倒是有一个c语言的版本，最后用:
```bash
setopt HIST_IGNORE_ALL_DUPS
sort -t ";" -k 2 -u ~/.zsh_history | sort -o ~/.zsh_history

```
解决问题，有时候shell真的是神器
