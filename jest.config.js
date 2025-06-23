module.exports = {
  // 基础配置
  preset: 'ts-jest', // 使用 ts-jest 处理 TypeScript
  testEnvironment: 'jsdom', // 指定测试运行时的环境类型。决定了测试运行时的全局变量和API，例如在浏览器环境中，window和document等全局变量是可用的，而在Node.js环境中则不可用。在测试执行之前，用于初始化测试环境。决定了测试运行的环境类型

  // 路径配置
  roots: ['<rootDir>'], // 测试文件根目录
  testMatch: [
    // 测试文件匹配模式
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // 模块解析配置
  moduleNameMapper: {
    // 路径别名
    '^@mini_react/(.*)$': '<rootDir>/packages/$1/src',
    '^packages/react/(.*)$': '<rootDir>/packages/react/$1',
  },

  // 转换配置
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // TypeScript 文件转换
  },

  // 测试环境设置，指定一组文件路径，这些文件将在测试环境初始化后执行。允许在测试执行之前配置测试框架或执行一些初始化代码，例如设置全局变量、添加自定义匹配器等。在测试环境初始化之后，但在测试代码执行之前。用于在测试执行前进行额外的配置和初始化
  setupFilesAfterEnv: [
    '@testing-library/jest-dom', // DOM 匹配器
  ],

  collectCoverage: true, // 收集覆盖率
  coverageDirectory: 'coverage', // 覆盖率报告输出目录
}
