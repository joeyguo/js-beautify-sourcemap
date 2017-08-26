# js-beautify-sourcemap

js-beautify, sourcemap support

## Install

```sh
npm install js-beautify-sourcemap
```

or use CDN

- https://unpkg.com/js-beautify-sourcemap/dist/js-beautify-sourcemap.min.js


## Usage

```js
import jsbs from 'js-beautify-sourcemap';
// use cdn, window.jsbs

var src = `function test(){console.log(js-sourcemap)};`;

// var obj = jsbs(source, opts, loc);
var obj = jsbs(src, {}, {
                            line: 1,
                            column: 28
                        });
                        
console.log(obj);
/*
obj
{
    code,      // js-beautify code
    loc: {     // target's loc
        line,  
        column
    },
    sourcemap, // sourcemap
}
*/
```

- source - js code

- opts - the same as [js-beautify](https://github.com/beautify-web/js-beautify)

- loc - source's loc, to get target's loc
```
{
    line, 
    column
}
```


### Thanks to 

- js-beautify
- js-sourcemap