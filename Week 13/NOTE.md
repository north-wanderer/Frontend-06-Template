# HTML和浏览器 API
## 标准化组织
- khronos
  - WebGL
- ECMA
  - ECMAScript
- WHATWG
  - HTML
- W3C
  - web audio
  - 工作组类型
    - CG:社区组  
    - WG:工作组
    - IG:兴趣租
## HTML定义

## 语义化标签
- aside、main、nav、article、hgroup、figure、figcaption、dnf、strong、em、addr、pre、samp、code、header、footer。

- 对于有顺序的列表应该始终使用`ol`元素保持语义，具体样式应该用CSS控制。
## 合法元素
- Element:`<tagname></tagname>`
- Text:`text`
- Comment:`<!--comments>`
- DocumentType:`<!Doctype html>`
- ProcessingInstruction: `<?a 1?>` （不常用）
- CDATA:`<![CDATA[]]>` （无需转义的文本节点）

### 常用转义符号
- `?` `&#161;`
- `&` `&amp;`
- `<` `&lt;`
- `>` `&gt;`
- `“` `&quot;`

## 浏览器 API
- node (重点)
- event (重点)
- range
- traversals
### CSSOM
- document.styleSheets
- window.getComputedStyle
### CSSOM View Module
- window.innerHeight
- window.innerWidth
- window.devicePixelRatio

- Element.getClientRects() 方法返回一个指向客户端中每一个盒子的边界矩形的矩形集合;
- Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置;