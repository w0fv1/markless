# Markless Markdown 转纯文本

本项目通过 [Markdown-it](https://github.com/markdown-it/markdown-it) 库，将输入的 Markdown 文本转换成 HTML 后，再提取为纯文本进行展示。页面样式使用了 [Water.css](https://github.com/kognise/water.css)，无需编写过多的 CSS，即可获得美观的界面。

## 功能简介

- 输入任意 Markdown 格式文本
- 点击「转为纯文本」按钮后，立即输出纯文本结果
- 借助 Markdown-it 进行渲染，再提取 DOM 的文本内容

## 如何使用

1. 克隆或下载本仓库到本地，也可直接访问已部署的 [GitHub Pages](https://w0fv1.github.io/markless/) 链接。
2. 打开 `index.html` 文件，或直接访问[线上页面](https://w0fv1.github.io/markless/)。
3. 在文本框中输入或粘贴 Markdown 文本，点击「转为纯文本」。
4. 等待片刻，下方即会显示转换后的纯文本内容。

## 项目文件说明

- **index.html**  
  包含了主要的逻辑和界面结构，引入了 `markdown-it.min.js` 和 `water.css`。
- **README.md**  
  项目说明文档，介绍了使用和部署方式。
