import {
  appendChild,
  createInstance,
  createTextInstance,
  Instance,
  setInitialProperties,
} from "./FiberConfigDOM";
import { Fiber, HostText } from "./ReactInternalTypes";

function appendAllChildren(parent: Instance, child: Fiber | null) {
  let node: Fiber | null = child;
  while (node) {
    appendChild(parent, node.stateNode);
    node = node.sibling;
  }
}

// 构建Fiber回溯阶段，节点完成状态要干的事
// 1. 创建真实DOM节点
// 2. 设置stateNode
export function completeWork(fiber: Fiber) {
  if (fiber.tag === HostText) {
    fiber.stateNode = createTextInstance(fiber.pendingProps);
  } else {
    // 创建DOM节点
    const instance = createInstance(fiber.type);

    // 将DOM节点添加到父级DOM节点中
    appendAllChildren(instance, fiber.child);

    // 设置属性
    setInitialProperties(instance, fiber.pendingProps);

    // 设置 stateNode
    fiber.stateNode = instance
  }
}
