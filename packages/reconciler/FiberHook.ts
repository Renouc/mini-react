import { Fiber } from './ReactInternalTypes'

export type Hook = {
  memoizedState: any
}

// 当前正在渲染的 Fiber
let currentlyRenderingFiber: Fiber | null = null

// 改变状态值的方法
function setState() {}

/**
 * 创建一个状态管理的 hook
 * 1. 创建一个 hook
 * 2. 将 hook 挂载到 fiber 的 memoizedState 上
 * 3. 返回状态和更新状态的方法
 * @param initialState 初始状态
 * @returns [state, setState] 状态和更新状态的方法
 */
export function useState(initialState: any) {
  const hook = {
    memoizedState: initialState,
  }
  currentlyRenderingFiber!.memoizedState = hook
  return [hook.memoizedState, setState]
}

/**
 * 渲染函数组件，考虑hooks，并返回组件的返回值
 * 1. 设置当前正在渲染的 Fiber
 * 2. 调用组件函数
 * @param workInProgress 当前正在渲染的 Fiber
 * @param Component 函数组件
 * @return 组件的返回值
 */
export function renderWithHooks(workInProgress: Fiber, Component: any) {
  currentlyRenderingFiber = workInProgress
  const result = Component(currentlyRenderingFiber.pendingProps)
  return result
}
