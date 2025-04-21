---
title: 使用whisper生成字幕
description: 使用whisper生成字幕
date: 2023-03-22
tags:
  - 工具
---

## 简介

whisper 是 openai 开源的字幕识别工具，可以识别字幕，翻译字幕，因为他英文翻译中文的效果一般，所以我一般就用它识别英文字幕

## 安装步骤

> 下面这些步骤基于 m1 pro

### 安装 python

在[whisper 的 github](https://github.com/openai/whisper)找到对应的 python 版本，目前是 3.9.9，然后去 python 官网下载对应版本的安装器安装即可

### 安装 ffmper

```shell
# on MacOS using Homebrew (https://brew.sh/)
brew install ffmpeg
```

### 安装 whisper

```shell
pip install -U openai-whisper
```

这个时候 whisper 就可以用了，使用 help 查看可选命令

```shell
whisper --help
```

```shell
--language en 是指生成英文字幕
--task transcribe 是指生成字幕，translate是翻译字幕
--model medium.en 是指用medium.en这个model，还有small、tiny...可选
--output_format srt 是指产物格式，不输入默认生成所有格式
--device mps 是指用什么渲染，一般可选cuda、mps、cpu(cuda是nvidia的gpu技术、mps是m1的gpu技术)
```

当然，这个时候只能用基础功能的 whisper，默认使用 cpu 渲染，默认使用 small 模型

```shell
whisper test.mp4 --language en --task transcribe --output_format srt
```

### 进阶

#### 使用 medium 模型

我们会发现，默认的 small 模型生成的字幕质量一般，所以我们想用 medium 模型，然而 whisper 在 m1 上自动下载 medium 模型的时候会报 ssl certificate 的错，这个时候我们可以手动下载来解决：

我们访问 [这个地址](https://github.com/openai/whisper/blob/main/whisper/__init__.py)来找到 medium.en 这个模型的下载地址，手动下载后，放入`/Users/{username}/.cache/whisper`目录里即可

```shell
whisper test.mp4 --language en --task transcribe --model medium.en --output_format srt
```

> 这个其实是 known issue,解决办法有两个，这里使用的第二种解决办法
>
> 1. https://github.com/openai/whisper/discussions/734#discussioncomment-4491761
>
> 2. https://github.com/openai/whisper/discussions/734#discussioncomment-4492259

#### 使用 gpu 加快生成速度

我们会发现用 cpu 的生成速度慢的不行，whisper 是支持使用 gpu 生成的，gpu 的生成速度比 cpu 快不少，而且 nvidia 的 cuda 和苹果 m1 的 mps 都是性能很高的 gpu 渲染技术。

首先，我们需要安装 pytorch

```shell
pip3 install torch torchvision torchaudio
```

然后我们就可以在 m1 芯片的笔记本上使用 mps 渲染了吗?

```shell
whisper test.mp4 --language en --task transcribe --model medium.en --output_format srt --device mps
```

哈哈，天真，报错啦！

大概看了一下，就是 whisper+pytorch+m1 的 mps 现在基本等于不可用，有人说安装最新 nightly 版本的 pytorch 可以解决，然而并没有

目前普遍的解决方案是使用[cpp 版本的 whisper](https://github.com/ggerganov/whisper.cpp),这里我就不折腾了，用 cpu 就用 cpu 吧，慢一点又不是不能用...如果真的有需要大批量的翻译字幕，还是用 pc+nvidia 的显卡比较靠谱

#### 总结

```shell
whisper test.mp4 --language en --task transcribe --model medium.en --output_format srt
```

### 备注

上面生成了英文字幕，如果想要中文字幕，或者中英双语字幕，那么可以使用[免费机翻](https://www.nikse.dk/subtitleedit/online),生成中文字幕后，下载下来，再使用字幕合成工具，把中英文合二为一,可以[参考这里](https://sspai.com/post/76899)

不过，上面这种方式翻译质量堪忧，目前翻译质量比较好的还是 deepl 和 gpt，deepl 和 gpt 都需要付费，我觉得有英文字幕就行了吧，不懂的单词现查，就当作学英语了

或许有人会有疑问，为啥不用 whisper 的 translate 功能？主要有 2 个原因，第一是慢，第二是 medium 模型的中文翻译水平比较一般，如果需要中文翻译的话，还是使用别的翻译软件比较靠谱，比如上文提到的 deepl 和 gpt。当然，如果你的 pc 性能足够的话，也可以直接运行最新的 large-2 模型，中文翻译质量应该高不少
