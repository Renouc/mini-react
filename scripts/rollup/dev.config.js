import path from 'path'
import { defineConfig } from 'rollup'

import typescript from 'rollup-plugin-typescript2'

export default defineConfig([
  {
    input: path.resolve(__dirname, '../../packages/react/sum.ts'),
    output: {
      file: './dist/sum.js',
      name: 'React',
      format: 'umd',
    },
    plugins: [typescript()],
  },
])
