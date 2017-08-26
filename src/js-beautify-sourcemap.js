import beautify from 'js-beautify';
import { generator, consumer } from 'js-sourcemap';

export default function jsbs(res, opts={}, loc={}) {
    var dist = beautify(res, opts),
        sm = generator(res, dist),
        smConsumer = consumer(sm);

    var line = loc.line,
        column = loc.column;

    var locRes = line !== undefined && column !== undefined && smConsumer.getGenerated({
        line,
        column
    }) || {};
    
    return {
        code: dist,
        loc: {
            line: locRes.line,
            column: locRes.column
        },
        sourcemap: sm,
    }
}