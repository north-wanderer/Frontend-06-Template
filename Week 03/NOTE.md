###四则运算需要处理的元素
- token number: 0 - 9
- operator: + - * /
- white space: \<SP>
- line terminator: \<LF> \<CR>

###对四则运算的定义
```
<Expression>::=
  <AdditiveExpression><EOF>

<MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>

<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

<AdditiveExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>
```

补充：以上语法表示法为 [巴科斯范式 Backus–Naur form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form)

### 抽象语法树处理流程（Abstract Syntax Tree）
词法分析：将代码处理为token流
语法分析：把 token 变成抽象语法树 AST。

词法分析(Lexical Analyzer)的初级方式是使用正则表达式和捕获组。

补充：[AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)

