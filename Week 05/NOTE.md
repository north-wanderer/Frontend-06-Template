#学习笔记

reactive的历史版本可以在git提交记录里看到

## Proxy 
Proxy API 是在 ES6 版本加入到 JS 的一种用于实现元编程的方式。
Proxy 通过对底层 JS 行为和语法的修改，能够完成以往很难甚至不可实现的一些效果。因此使用的时候需要慎重。
在Proxy之前，有名为 `Object.defineProperty()` 和 `Object.defineProperties()` 的两个方法，可以视作 JS 在元编程方向上的牛刀小试。

## reactivity
reactivity是Vue中的核心概念，通过对`Object`属性的追踪，完成一系列与之依赖的操作。

- reactive api
  将普通对象转换成响应式对象。
- effect api
  收集传入函数中的响应式对象依赖，在对象的`property`发生改变的以后，重新执行函数。

[reactivity 参考](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity/)

## CSSOM (CSS Object Model)
CSS Object Model 是一组允许用JavaScript操纵CSS的API。 它是继DOM和HTML API之后，又一个操纵CSS的接口，从而能够动态地读取和修改CSS样式。

[参考](https://developer.mozilla.org/zh-CN/docs/Glossary/CSSOM)