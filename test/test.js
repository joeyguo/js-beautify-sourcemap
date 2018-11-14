var assert = require('assert');
var jsbs = require('../dist/js-beautify-sourcemap');

var src = `function test(){console.log(js-sourcemap)};`;

describe('#js-beautify-sourcemap', function() {
    var obj = jsbs(src, {}, {
        line: 1,
        column: 28
    });
    it('code', function() {
        assert.equal(obj.code, 'function test() {\n    console.log(js - sourcemap)\n};');
    });
    it('sourcemap', function() {
        assert.equal(obj.sourcemap, '{"version":3,"sources":["__fakename"],"names":["test","console","log","js","sourcemap"],"mappings":"AAAA,SAASA,IAAI,CAAC,EAAC;IAACC,OAAO,CAACC,GAAG,CAACC,GAAE,EAACC,SAAS;AAAC,CAAC","file":"__fakename","sourcesContent":[null]}');
    });
    it('loc', function() {
        assert.equal(JSON.stringify(obj.loc), JSON.stringify({ line: 2, column: 16 }));
    });
});