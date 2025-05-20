import { reconcileChildFibers } from "./ChildFiber";
import type { Fiber } from "./ReactInternalTypes";

export function beginWork(fiber: Fiber) {
  // 纯文本节点
  if (typeof fiber.pendingProps.children === "string") {
    return null;
  }
  // 1. 创建子节点
  fiber.child = reconcileChildFibers(fiber, fiber.pendingProps.children);
  return fiber.child;
}
