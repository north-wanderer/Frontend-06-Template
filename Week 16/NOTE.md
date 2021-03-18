学习笔记
# 学习笔记
组件化的核心目标是复用逻辑

组件区别于模块和对象，和UI强相关。可以以树形结构组合，有一定模版化配置能力。

- Properties
- Methods
- Inherit
- Attribute
- Config & State
- Event
- Lifecycle
- Children 组件的必要属性，以此形成树形结构

Attribute 和 Property 的区别

- Attribute 强调描述性
- Property 强调从属关系

Lifecycle

Children

- Content 型，显示固定内容
- Template 型，显示根据输入生成内容

## carousel
- document上监听的鼠标事件在鼠标离开浏览器的时候也能触发
- 处理拖拽的基本结构
```javascript
this.root.addEventListener('mousedown', (event) => {
  console.log('mouse-down');
  let move = (event) => {
    console.log('mouse-move');
  }
  let up = event => {
    console.log('mouse-up');
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})
```

touchstart
touchmove
touchend
touchcancel