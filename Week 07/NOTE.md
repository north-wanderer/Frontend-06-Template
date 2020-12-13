# 学习笔记
## 表达式
以下优先级逐级降低
### member expression
1. a.b
2. a[b]
3. foo`string`
4. super.b
5. spuer['b']
6. new.target
7. new Foo()

### call expression
call 表达式后面的 member expression会降级为 call expression
1. foo()
2. super()
3. foo()['b']
4. foo().b
5. foo()`abc`

### left handside expression, right handside expression

### update expression
1. a++
2. a--
3. ++a
4. --a

### unary 单目运算符
1. delete // 处理引用类型生效
2. void
3. typeof
4. + a // 字符串会发生类型转换
5. - a
6. ~ a // 整数按位取反，不是整数会转成整数
7. !a
8. await

### exponental 乘方运算符
唯一右结合的运算符 `**`

### 其他
1. 加减乘除取余：`+ - * / %`
2. 位运算： `>> << >>>`
3. 关系运算符： `< > >= <=, instanceof, in`
4. 相等运算符： `== === != !==`
5. 经典位运算： `& ^ |`
6. 逻辑运算符： `&& ||`
7. 三目运算符： `condition ? exp1 : exp2`
## 语句

### 运行时
Completion Record：记录语句的完成状态
>  type：normal、break、continue、throw
  value：基本类型
  target：abel

### 简单语句
	ExpressionStatement
	EmptyStatement
	DubuggerStatement
	ThrowStatement
	CountinueStatement
	BreakStatement
	ReturnStatement

### 复合语句

	BlockStatement，type:normal
	IfStatement
	SwitchStatement
	IterationStatement，let 声明的域 for语句会产生独立的作用域，type: break 、continue，target:label
	WithStatement
	LabeledStatement，多层循环时可以调到指定的label循环
	TryStatement，type:return，target:label，try 里return了finally还是会执行

### 声明

	FunctionDeclaration
	GeneratorDeclaration
	AsyncFunctionDeclaration
	AsyncGeneratorDeclaration
	VariableStatement
	ClassDeclaration
	LexicalDeclaration

#### 预处理
`var let const class`声明的变量都存在经由引擎预处理导致的提升现象 [Hoisting](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)，只不过非`var`的声明会使得声明前调用抛错。

### 事件循环
老问题，[补充资料](https://www.youtube.com/watch?v=8aGhZQkoFbQ&list=PLJS2wfLb_U5N0yW5qFBatLlWaLzt47TxX&index=2&t=36s)
事件循环主要依赖宿主环境实现，比如`node.js`依赖底层库`libev`。

### 闭包
闭包实现依赖函数声明时生成的`environment record`，其记载当前环境可用变量，this指向之类的信息，并在函数嵌套式形成链式结构，老版本中所谓的“作用域链”。