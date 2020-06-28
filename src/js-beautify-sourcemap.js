import { generator, consumer } from 'js-sourcemap';
const beautify = require('js-beautify');

/**
 * 通过压缩代码及行列位置 获取 对应格式化后的代码、行列位置、sourcemap 文件
 *
 * @param {*} uglyCode 压缩代码
 * @param {*} [opts={}] 格式化相关参数
 * @param {*} { line, column } 压缩代码的行列数
 * @returns
 */
function jsbs(uglyCode, opts = {}, { line, column }) {
    const formattedCode = beautify(uglyCode, opts);
    const sourcemap = generator(uglyCode, formattedCode);
    const smConsumer = consumer(sourcemap);
    const result = smConsumer.getGenerated({ line, column });

    return {
        code: formattedCode,
        sourcemap: sourcemap,
        loc: {
            line: result.line,
            column: result.column,
        },
    };
}

export default jsbs;