学习笔记
# CSS
## at-rules
常用：
- @media: https://www.w3.org/TR/css3-conditional/ 用于CSS媒体查询
- @keyframes: https://www.w3.org/TR/css-animations-1/ 定义CSS动画关键帧
- @font-face: https://www.w3.org/TR/css-fonts-3/ 定义自定义字体

不常用：
- @charset: https://www.w3.org/TR/css-syntax-3/ 声明CSS字符集
- @import: https://www.w3.org/TR/css-cascade-4/ 引用其他样式表
- @page: https://www.w3.org/TR/css-page-3/ 针对打印机情形声明的规则
- @counter-style: https://www.w3.org/TR/css-counter-styles-3/ 让开发者可以自定义counter的样式，counter就是列表前面的符号
- @supports: https://www.w3.org/TR/css3-conditional/ 用于CSS特性查询，但是其本身有兼容性问题，不推荐用
- @namespace: https://www.w3.org/TR/css-namespaces-3/ 定义使用在CSS样式表中的XML命名空间

## rules
### 规范
- selectors
  - https://www.w3.org/TR/selectors-3/
  - https://www.w3.org/TR/selectors-4/ (不完善)
- declaration
  - key
    - Properties
    - Variables: https://www.w3.org/TR/css-variables/
  - value
    - https://www.w3.org/TR/css-values-4/
### Selector
#### 语法
- 简单选择器 `eg:<aa>`
  - wildcard `*`
  - element `div`
  - class `.classname`
  - id `#id`
  - attribute `[attr=value]`
  - Pseudo-classes `:hover`
  - Pseudo-elements `::before`

- 复合选择器 `eg:<bb>`
  - `<aa><aa><aa>`
  - *或者div必须写在最前面
  - 复合选择器描述的是一个元素的某些特征
- 复杂选择器
  - `<bb>   <bb>`
  - `<bb> > <bb>`
  - `<bb> ~ <bb>`
  - `<bb> + <bb>`
  - `<bb> || <bb>`
  - `,`连接的复合选择器是选择器的并集，本身不算选择器

##### 伪类
- 链接
  - :any-link 所有超链接
  - :link 未访问的超链接 :visited 访问过的超链接 （出于安全考量，这两者选中的元素不能修改文字颜色之外的属性）
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑型
  - :not （最常用）
  - :where 
  - :has
##### 伪元素
- ::before
- ::after

      这两者可以在选中元素的首尾插入一个`content`声明的元素

- ::first-line
- ::first-letter

      这两者选中的是现有元素有逻辑意义的特定部分

#### 优先级计算
  - CSS规则根据specificity和后来优先规则覆盖
  - specificity上个四元组，越左边权重越高：`[{inline}, {id}, {class|attribute|pseudo-classes}, {type|pseudo-elements}]`
  - 一个CSS规则的specificity根据包含的简单选择器相加而成
```
设N=10
div#a.b .c[id=x] -> 0 1 3 1 -> 1*10^3 + 3*10^2 + 1*10^1 -> 1310
#a:not(#b) -> 0 2 0 0 -> 2*10^3 ->2000
*.a -> 0 0 1 0 -> 10^2 -> 100
div.a -> 0 0 1 1 -> 10^2 + 10^1 -> 110
```


## 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
first-letter选中的部分在文本节点创建后，浏览器排版前就能确定；而后者需要根据实际排版的效果在文本节点中确定一个范围，如果允许使用定位相关属性，可能干扰对实际排版效果的判断，逻辑不能自洽。
