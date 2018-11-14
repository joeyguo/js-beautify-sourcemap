import { generator, consumer } from 'js-sourcemap';
const beautify = require('js-beautify');

export default function jsbs(res, opts={}, loc={}) {
    let dist = beautify(res, opts),
        sm = generator(res, dist),
        smConsumer = consumer(sm);

    let {
        line,
        column,
    } = loc;

    let locRes = line !== undefined && column !== undefined && smConsumer.getGenerated({ line, column }) || {};
    
    return {
        code: dist,
        loc: {
            line: locRes.line,
            column: locRes.column
        },
        sourcemap: sm,
    }
}