# js-beautify-sourcemap

js-beautify, sourcemap support

# Usage

```js
import jsbs from 'js-beautify-sourcemap';
// or use cdn: https://unpkg.com/js-beautify-sourcemap/dist/js-beautify-sourcemap.min.js

var obj = jsbs(source, opts, loc);

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