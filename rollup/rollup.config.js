/**
 * @type { import('rollup').RollupOptions }
 */
import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue'
const buildOptions = {
  input: ['src/index.js'],
  output: [{
    dir: 'dist/es',
    format: 'esm',

  }, {
    dir: 'dist/cjs',
    format: 'cjs'
  }],
  plugins: [
    vue(),
    babel({
      "babelHelpers": 'runtime',
      extensions: ['.js', '.vue']
    })
  ]
}

export default buildOptions