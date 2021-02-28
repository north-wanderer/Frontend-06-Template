# 学习笔记

## Yeoman
## 概览
- Yeoman is a generic scaffolding system allowing the creation of any kind of app. Yeoman是脚手架工具，即 “generator 的 generator”。
- Yeoman is language agnostic. Yeoman 和语言无关，非JS语言也能用。
- Yeoman by itself doesn’t make any decisions. Yeoman 只提供 API，具体如何生成项目结构完全由`plugin`系统实现。

### Cli
`yo` 是一个用来调用其他“generator”的工具，课程中就演示了如何通过`Yeoman API`完成 DIY 的`generator`，再通过`npm link`命令链接到全局，从而使用`yo`调用的过程。Yeoman 所调用的 generator 的包名约定用 “generator” 开头。