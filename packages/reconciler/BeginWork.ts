import { reconcileChildFibers } from './ChildFiber'
import { renderWithHooks } from './FiberHook'
import {
  FunctionComponent,
  HostComponent,
  HostText,
  type Fiber,
} from './ReactInternalTypes'

export function beginWork(fiber: Fiber) {
  // 纯文本节点
  if (typeof fiber.pendingProps.children === 'string') {
    return null
  }

  switch (fiber.tag) {
    case HostText:
      return null
    case FunctionComponent:
      const children = renderWithHooks(fiber, fiber.type)
      fiber.child = reconcileChildFibers(fiber, children)
      return fiber.child
    case HostComponent:
      fiber.child = reconcileChildFibers(fiber, fiber.pendingProps.children)
      return fiber.child
    default:
      return null
  }
}
