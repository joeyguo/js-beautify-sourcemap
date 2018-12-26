#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const chalk = require('chalk');
const jsbs = require('../dist/js-beautify-sourcemap');
const pkg = require('../package.json');
const axios = require('axios');
const Configstore = require('configstore');
const conf = new Configstore(pkg.name);
let argv = yargs.argv,
    _ = argv._;

argv = yargs
    .option('location', {
        alias: 'l',
        describe: '行列数',
    })
    .option('output', {
        alias: 'o',
        describe: '输出的目录',
    })
    .option('filepath', {
        alias: 'f',
        describe: '输出的目录',
    })
    .version()
    .command('config', 'config', function(yargs) {
        var argv = yargs
            .reset()
            .option('output', {
                alias: 'o',
                description: '输出的目录',
            })
            .help('h')
            .alias('h', 'help').argv;

        let output = argv.output;
        console.log(output)
        if (output) {
            conf.set('output', output);
            console.log('[set output directory]' + chalk.green(` ${output}`));
        }
    }).argv;

var filepath = _[0] || argv.filepath;

if (filepath === 'config') {
    return;
} else if (!filepath) {
    console.log('\n[error]: ' + 'path required!\n');
    yargs.showHelp();
    return;
}

var location = argv.location || '';
var tmparr = location.split('_');
if (tmparr.length !== 2) {
    tmparr = location.split('-');
    if (tmparr.length !== 2) {
        tmparr = location.split(':');
    }
}

var row = tmparr[0],
    column = tmparr[1];

var basename = path.basename(filepath, '.js');
var output = path.join(conf.get('output'), 'jsbs-' + basename + '.js');

// console.log('[filepath]' + chalk.yellow(` ${filepath}`))
// console.log('[location]' + chalk.yellow(` ${row} column: ${column}`))

function handler(data) {
    var obj = jsbs(
        data,
        {},
        {
            line: row,
            column: column,
        }
    );
    fs.writeFile(output, obj.code, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('[output]' + chalk.green(` ${output}`));
            if (obj.loc && obj.loc.line) {
                console.log(
                    '[location]' +
                        chalk.cyan(
                            ` row: ${obj.loc.line} column: ${obj.loc.column}`
                        )
                );
            }
        }
    });
}

function getDate(filepath, callback) {
    try {
        var stats = fs.lstatSync(filepath);
        if (stats.isFile()) {
            var data = fs.readFileSync(filepath, 'utf-8');
            callback(data);
        } else {
            console.error(
                '\nUnable to locate the source file. Please check your path.\n'
            );
        }
    } catch (e) {
        axios
            .get(filepath)
            .then(function(response) {
                callback(response.data);
            })
            .catch(function(error) {
                console.error(
                    '\nUnable to download the specified file. Please check your path. \n',
                    error
                );
            });
    }
}

getDate(filepath, handler);
