import fs from 'fs'
import path from 'path'

import ts from 'rollup-plugin-typescript2'
import cjs from '@rollup/plugin-commonjs'

const pkgPath = path.resolve(__dirname, '../../packages')

const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePkgPath(pkgName, isDist) {
  // 包路径
  return `${isDist ? distPath : pkgPath}/${pkgName}`
}

export function getPackageJson(pkgName) {
  // ...包路径
  const path = `${resolvePkgPath(pkgName)}/package.json`
  const str = fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(str)
}

const defaultConfig = {
  typescript: {},
}

export function getBaseRollupPlugins({ typescript } = defaultConfig) {
  return [cjs(), ts(typescript)]
}
