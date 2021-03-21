## 盒（Box）

- HTML代码中可以书写开始***标签***，结束***标签*** ，和自封闭***标签*** 。
- 一对起止***标签*** ，表示一个***元素*** 。
- DOM树中存储的是***元素***和其它类型的节点（Node）。
- CSS选择器选中的是***元素*** 。
- CSS选择器选中的***元素*** ，在排版时可能产生多个***盒*** 。
- 排版和渲染的基本单位是***盒*** 。
- 一个元素可能对应多个盒

## 正常流（normal flow）
排版最终都是在处理文字与盒的排布。

流程：
- 收集盒与文字进行
- 计算盒在行中的排布
- 计算行的排布

盒的分类：
- inline-level-box (inline-formating-context IFC): 行内的盒
- line-box：行盒
- block-level-box (block-formating-context BFC): 块盒

### 行模型
base-line：英文排版中文字的基线
text-top，text-bottom：由font-size决定，混排文字中由最大font-size决定
line-top，line-bottom：

inline-block使用的基线是根据盒内文字的情况变化的

### 块级排布
- float，clear 
  - clear：找到一块干净的空间，执行 float 操作
  - 现在基本可以被flex box和grid代替

- margin堆叠
  - 堆叠区域高度等于两个盒最大的margin值
  - 堆叠只会发生在正常流中的BFC

-  Block Container: 里面有 BFC 的
  -  能容纳正常流的盒，里面就有 BFC
-  Block-level Box: 外面有 BFC 的
-  Bolck Box = Block Container + Block-level Box: 里面都有 BFC 的

### 设立 BFC

什么样的盒里面会创建 BFC

-  floats
-  absolutely positioned elements
-  block container (such as inline-blocks, table-cell and table-containers) that are not block boxes,
  -  flex items
  -  grid cell
- and block boxes with 'overflow' other than 'visible'

## Flex
流程：
- 收集盒进行
- 计算盒在主轴方向上的排布
- 计算盒在交叉轴方向上的排布

## 动画
### Animation
- animation-name 时间曲线
- animation-duration 动画的时长
- animation-timing-function 动画的时间取钱
- animation-delay 动画开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向

### Transition
- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间取钱
- transition-delay 延迟

### HSL 与 HSV

- HSL
  - Hue 色相
  - Saturation 纯度
  - Lightness 亮度 0%为黑色 100%为白色
- HSV
  - Hue
  - saturation
  - Value 0%为黑色 100%为纯色

### 绘制
data uri + svg 绘制几何图形较为明智