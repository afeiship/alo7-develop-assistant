
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import banner from 'rollup-plugin-banner';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

import { terser } from "rollup-plugin-terser";

import '@feizheng/next-nice-comments';

const comments = nx.niceComments(
  [
    'name: <%= pkg.name %>',
    'description: <%= pkg.description %>',
    'homepage: <%= pkg.homepage %>',
    'version: <%= pkg.version %>',
    'date: ' + new Date().toISOString(),
    'license: <%= pkg.license %>'
  ],
  'pure'
);

export default {
  input: 'src/main.js',
  output: {
    strict: false,
    file: 'dist/index.js',
    format: 'umd',
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({ output: { comments: false } }),
    banner(comments),
    replace({
      '__VERSION__': pkg.version
    }),
    filesize()
  ]
};
