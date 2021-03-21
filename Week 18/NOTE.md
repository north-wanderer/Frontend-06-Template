目前流行的测试库有两种`Jest`和`Mocha`。给常用的组件库做测试收益很高。

用 babel 的 register 解决 es module问题
```bash
npm i --save-dev @babel/core @babel/register @babel/preset-env
```
```js
// .babelrc
{
    "presets": ["@babel/preset-env"]
}
```
```bash
./node_modules/.bin/mocha --require @babel/register
```

`nyc`用于计算测试覆盖率

```bash
nyc ./node_modules/.bin/mocha --require @babel/register
```

需要两个工具支持：

```
# babel-plugin-istanbul
$ npm i --save-dev babel-plugin-istanbul
```
.babelrc
```
{
    "presets": ["@babel/preset-env"],
    "plugins": ["istanbul"]
}
```

```
# @istanbuljs/nyc-config-babel
npm i --save-dev @istanbuljs/nyc-config-babel
```
.nycrc
```
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```
