// scripts/rollup/build.js
const path = require("path");
const rollup = require("rollup");
const { babel } = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");

// 定义包配置
const packages = [
  {
    name: "test",
    input: "packages/test/index.ts",
    outputs: [
      {
        file: "packages/test/dist/index.js",
        format: "umd",
        name: "Test",
        sourcemap: true,  // 添加 sourcemap 选项
      },
    ],
  },
  // 其他包配置...
];

async function build() {
  // 遍历每个包
  for (const pkg of packages) {
    const config = {
      input: pkg.input, // 入口文件（必须是 TypeScript 文件）
      plugins: [
        babel({
          presets: ["@babel/preset-env"], // 预设，根据你的目标环境自动确定需要转换哪些 JavaScript 特性，默认会转换为es5
          babelHelpers: "bundled",  // 显式设置 babelHelpers 选项
        }),
        typescript({
          tsconfig: "./tsconfig.json", // 指定 TypeScript 配置文件
          exclude: ["**/*.test.ts"], // 排除测试文件
          declaration: true, // 生成类型声明
          declarationDir: path.dirname(pkg.outputs[0].file), // 类型声明输出目录, TypeScript 的声明文件输出目录 (declarationDir) 必须位于 Rollup 输出文件目录内。
          sourcemap: true,  // 为 TypeScript 插件添加 sourcemap 设置
        }),
      ],
    };

    // 创建 bundle
    const bundle = await rollup.rollup(config);

    // 生成输出
    for (const output of pkg.outputs) {
      await bundle.write(output);
    }
  }
}

build().catch(console.error);
