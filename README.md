# js-beautify-sourcemap

js-beautify, sourcemap support

# Usage

## as Command line tools
输入压缩代码文件的地址及行列数，输出格式化后的代码文件及行列数

### 全局安装
```sh
npm i -g js-beautify-sourcemap
```

### 设置输出文件的目录（已设置可跳过）
```sh
# 设置输出文件的目录（已设置可跳过）
jsbs config -o <outputDir>
```

### 开始执行
```sh
# filepath 为压缩文件的路径，支持线上文件url，也支持本地文件路径

jsbs <filepath> -l <row:column>
```

### example
```sh
jsbs https://s1.xx.com/a.xsaf.js -l 1:20
```

## as Modules

```sh
npm install js-beautify-sourcemap
```

```js
import jsbs from 'js-beautify-sourcemap';
// use cdn, window.jsbs

var src = `function test(){console.log(js-sourcemap)};`;

var obj = jsbs(src, {}, {
                            line: 1,
                            column: 28
                        });
                        
console.log(obj);

```
### API

var obj = jsbs(source, opts, loc);

### input

- source - js code

- opts - the same as [js-beautify](https://github.com/beautify-web/js-beautify)

- loc - source's loc, to get target's loc
```
{
    line, 
    column
}
```

### output

- obj
```
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
