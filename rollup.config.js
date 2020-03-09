import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true
  },
  external: ['react'],
  plugins: [
    external(),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs()
  ],
};
