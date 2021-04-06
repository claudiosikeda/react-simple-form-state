import fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: Object.keys(pkg.devDependencies),
  plugins: [
    peerDepsExternal(),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
  ],
};
