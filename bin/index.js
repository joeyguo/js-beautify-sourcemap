#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const chalk = require('chalk');
const axios = require('axios');
const os = require('os');
const jsbs = require('../dist/js-beautify-sourcemap');

const _ = yargs.argv._;

const argv = yargs
    .option('filepath', { alias: 'f', describe: '输入压缩文件路径' })
    .option('location', { alias: 'l', describe: '压缩代码行列数 line:column' })
    .option('output', { alias: 'o', describe: '输出的目录' })
    .version()
    .argv;

const filepath = _[0] || argv.filepath;

if (!filepath) {
    console.error(chalk.red(`${filepath}(filepath) is not found`));
    return yargs.showHelp();
}

const location = argv.location || '';
const loc = location.split(':');
const row = loc[0];
const column = loc[1];
if (!location || !row || !column) return console.error(chalk.red('location is not found. Please check your options'));

const basename = path.basename(filepath, '.js');
const output = path.join(argv.output || os.tmpdir(), 'jsbs-' + basename + '.js');

console.log(`[input] ${chalk.yellow(`${filepath}`)} ${chalk.yellow(` line: ${row}, column: ${column}`)}`)

async function getData(filepath, callback) {
    let data = '';
    try {
        const stats = fs.lstatSync(filepath);
        if (!stats.isFile()) return console.error('Unable to locate the source file. Please check your path.');
        data = fs.readFileSync(filepath, 'utf-8');
    } catch (e) {
        data = await axios
            .get(filepath)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error( '\nUnable to download the specified file. Please check your path. \n', error);
            });
    }

    return data;
}

async function main() {
    const data = await getData(filepath);
    if (data) {
        const obj = jsbs(data, {}, { line: row, column });
        fs.writeFile(output, obj.code, function(err) {
            if (err) return console.log(err);
            console.log(`[output] ${chalk.green(`${output}`)} ${chalk.green(` line: ${obj.loc.line}, column: ${obj.loc.column}`)}`)
        });
    }
}

main();
