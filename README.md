## 包管理器

### monorepo 架构

- 选择 `pnpm` 作为包管理器

- 创建工作空间（二选一）
  - pnpm 推荐的 `pnpm-workspace.yaml` 配置文件
  - `package.json` 默认支持的 `workspaces` 配置

### TypeScript

安装

```bash
pnpm add typescript -w -D
```

创建 `tsconfig.json`

```bash
pnpm tsc --init
```

### Jest
```bash
pnpm add -w -D jest @types/jest @testing-library/jest-dom ts-jest jest-environment-jsdom
```

### Rollup

```bash
pnpm add -D rollup @rollup/plugin-babel @babel/core @babel/preset-env @rollup/plugin-typescript
```


