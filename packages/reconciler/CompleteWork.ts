import {
  appendChild,
  createInstance,
  createTextInstance,
  Instance,
  setInitialProperties,
} from "./FiberConfigDOM";
import {
  Fiber,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactInternalTypes";

// 遍历当前节点的子节点，并将子节点的stateNode与当前节点的stateNode关联
function appendAllChildren(parent: Instance, child: Fiber | null) {
  let node: Fiber | null = child;
  while (node) {
    let childStateNode =
      node.tag === FunctionComponent ? node.child?.stateNode : node.stateNode;
    appendChild(parent, childStateNode);
    node = node.sibling;
  }
}

// 构建Fiber回溯阶段，节点完成状态要干的事
// 1. 创建真实DOM节点
// 2. 设置stateNode
export function completeWork(fiber: Fiber) {
  switch (fiber.tag) {
    case HostText:
      fiber.stateNode = createTextInstance(fiber.pendingProps);
      break;
    case FunctionComponent:
      break;
    case HostComponent:
      // 创建 DOM
      const instance = createInstance(fiber.type);

      // 关联 DOM节点
      appendAllChildren(instance, fiber.child);

      // 设置属性
      setInitialProperties(instance, fiber.pendingProps);

      // 设置 stateNode
      fiber.stateNode = instance;
      break;
    default:
      break;
  }
}
