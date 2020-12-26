# 学习笔记

## 浏览器的基础渲染过程 
从URL到供硬件渲染使用的Bitmap
```
URL -- HTTP
⬇️
HTML -- parse
⬇️
DOM -- CSS computing
⬇️
DOM with css -- layout
⬇️
DOM with position -- render
⬇️
Bitmap
```

## 有限状态机
每一个状态都是一个机器
- 每一个机器里，可以计算，存储，输出
- 所有机器接受一致的输入
- 状态机的每个机器都没有状态，类似纯函数
每一个机器都知道下一个状态
- Moore: 每个机器都有确定的下一个状态, output in state
- Mealy: 每个机器根据输入确定下一个状态, output on transition

## 网络知识补充
#### IP - 网络层协议
PTU - package
node底层用`libnet/libcap`处理
#### TCP - 传输层协议
PTU - segment
node中用`net`包处理
#### HTTP - 应用层协议
基于文本的协议，request - reponse 这样一来一回的形式进行通信。
DTU - 
node中用`http`包处理
[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)

##### request 实现
- Content-Type (required) 需要默认值
- Content-Length 必须设置正确，否则会是非法请求
- body 需要根据 Content-Type 不同进行不同的处理

##### response 实现
- header解析完成后，进入子状态机解析`body`，`body`类型根据`Content-Type`判断