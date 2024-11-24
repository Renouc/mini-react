import { defineConfig } from 'rollup'
import { getBaseRollupPlugins, getPackageJson, resolvePkgPath } from './utils'
import generatePackageJson from 'rollup-plugin-generate-package-json'

const PKG_NAME = 'react'

const { module } = getPackageJson(PKG_NAME)
// react 包的路径
const pkgPath = resolvePkgPath(PKG_NAME)
// react 产物的路径
const pkgDistPath = resolvePkgPath(PKG_NAME, true)

export default defineConfig([
  {
    input: `${pkgPath}/${module}`,
    output: {
      // react
      file: `${pkgDistPath}/index.js`,
      name: 'React',
      format: 'umd',
    },
    plugins: [
      ...getBaseRollupPlugins(),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: 'index.js',
        }),
      }),
    ],
  },
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      {
        // jsx-dev-runtime
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd',
      },
      {
        // jsx-runtime
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd',
      },
    ],
    plugins: getBaseRollupPlugins(),
  },
])
