# 学习笔记
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