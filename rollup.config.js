import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const license = require('rollup-plugin-license');
const pkg = require('./package.json');
const ENV = process.env.npm_lifecycle_event;

let licensePlugin =  license({
  banner: " "+ pkg.name +" v"+ pkg.version +" By "+ pkg.author +" \r\n HomePage: "+ pkg.homepage +"\r\n "+ pkg.license +" Licensed."
});

let config = {
  entry: 'src/js-beautify-sourcemap.js',
  moduleName:'jsbs',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel(babelrc()),
    commonjs(),
  ],
};

if(ENV === 'dist'){
  config.format = 'umd';
  config.dest = 'dist/js-beautify-sourcemap.js';
  config.plugins.push(licensePlugin);
} else if(ENV === 'es') {
  config.format = 'es';
  config.dest = 'dist/js-beautify-sourcemap.es.js';
  config.plugins.push(licensePlugin);
} else if(ENV === 'min') {
  config.format = 'umd';
  config.dest = 'dist/js-beautify-sourcemap.min.js';
  config.plugins.push(uglify(),licensePlugin);
}


export default config