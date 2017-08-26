import beautify from 'js-beautify';
import { generator, consumer } from 'js-sourcemap';

export default function jsbs(res, opts={}, line, column) {
    var dist = beautify(res, opts),
        sm = generator(res, dist),
        smConsumer = consumer(sm);

    var loc = line !== undefined && column !== undefined && smConsumer.getGenerated({
        line,
        column
    }) || {};

    return {
        code: dist,
        loc: {
            line: loc.line,
            column: loc.column
        },
        sourcemap: sm,
    }
}