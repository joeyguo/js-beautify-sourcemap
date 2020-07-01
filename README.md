# js-beautify-sourcemap

通过压缩代码及行列位置 获取 对应格式化后的代码、行列位置、sourcemap 文件

## 相关文章
[《脚本错误量极致优化-定位压缩且无SourceMap文件的脚本错误》](https://github.com/joeyguo/blog/issues/23)

# Usage

## as Command line tools

### 全局安装
```sh
npm i -g js-beautify-sourcemap
```

### 开始执行
```sh
# filepath 为压缩文件的路径 (本地文件路径 / 线上文件 Url)
jsbs <filepath> -l <row:column>
```

### example
```sh
jsbs /Users/lazy-9340f8131b.js -l 1:1257
```

输出
```sh
[input] /Users/lazy-9340f8131b.js  line: 1, column: 1257 // 输入 压缩文件路径 及 行列位置
[output] /var/jsbs-lazy-9340f8131b.js  line: 36, column: 50  // 输出 格式化文件路径 及 行列位置
```

## as Modules

```sh
npm install js-beautify-sourcemap
```

```js
import jsbs from 'js-beautify-sourcemap';

const uglyCode = `function test(){console.log(js-sourcemap)};`;
const reuslt = jsbs(uglyCode, {}, {
    line: 1,
    column: 28
});  
console.log(reuslt);
```

### API

var reuslt = jsbs(source, opts, loc);

### input

- source - js code

- opts - the same as [js-beautify](https://github.com/beautify-web/js-beautify)

- loc - source's loc, to get target's loc

```js
{
    line, 
    column
}
```

### output

- obj

```js
{
    code,      // js-beautify code
    loc: {     // target's loc
        line,  
        column
    },
    sourcemap, // sourcemap
}
```

### Thanks to 

- js-beautify
- js-sourcemap
