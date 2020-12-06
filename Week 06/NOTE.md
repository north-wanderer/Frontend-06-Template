## 乔姆斯基谱系
是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
- 0- 型文法（无限制文法或短语结构文法）包括所有的文法。
- 1- 型文法（上下文相关文法）生成上下文相关语言。
- 2- 型文法（上下文无关文法）生成上下文无关语言。
- 3- 型文法（正规文法）生成正则语言。

### 巴科斯诺尔范式
  即巴科斯范式，是一种用于表示上下文无关文法的语言，上下文文法描述了一类形式语言。它是由约翰巴科斯和彼得诺尔首先引入的用来描述计算机语言语法的符号集。
## 现代语言分类
按用途分类：
  - 数据描述语言
    YAML, JSON, TOML, conf, SQL, XML, HTML, CSS, ini
  - 编程语言
    Go, Java, JavaScript, C, C++, Python, Lua, TypeScript, Bash, Zsh, Rust, C#

按表达方式分类
  - 命令式语言
    Go, Java, JavaScript, C, C++, Python, Lua, TypeScript, Bash, Zsh, Rust, C#
  - 声明式语言
    YAML, JSON, TOML, conf, SQL, XML, HTML, CSS, ini,
    Lisp, Clojure, Haskell

## 语言性质
动态语言
  动态类型系统 类型信息在runtime中保留
静态语言
  静态类型系统 类型信息在compiletime中保留

强类型： 无隐式转换
弱类型： 有隐式转换

## 命令式编程语言的层级
  - Atom
    > identifier, Literal
  - Expression
    > Atom, Operator, Punctuator
  - Statement
    > Expression, Keyword, Punctuator
  - Structure
    > Function, Class, Process, Namespace
  - Program
    > Program, Module, Package, Library

## Atom elements of JavaScript

## Types
- Number
  IEEE 754 Double Float
  ```javascript
    0.tostring() // 等价于 0toString(), 出现了JS中的语法冲突
    0 .toString() // 加入空格后小数点才会被识别为属性访问符
  ```
- String
  Character （字符）
  Code Point（码点）
  Encoding（字符集）
  UTF-8: 中文占3个字节，英文占1个字节，且ASCII可以理解为UTF-8的子集。
- Boolean

- Null
- Undefined
  Undefined 是全局变量，可以被 reassign。平时使用可以用`void 0`代替。
- Object

- Symbol
- Bigint
