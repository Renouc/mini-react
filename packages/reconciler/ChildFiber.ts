import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { Fiber } from "./ReactInternalTypes";
import { createFiberFromElement, createFiberFromText } from "./Fiber";

function reconcileChildrenArray(returnFiber: Fiber, children: any) {
  // 第一个子节点
  let resultingFirstChild: Fiber | null = null;
  // 上一个新节点
  let previousNewFiber: Fiber | null = null;

  for (let i = 0; i < children.length; i++) {
    const newFiber =
      typeof children[i] === "string"
        ? createFiberFromText(children[i])
        : createFiberFromElement(children[i]);
    newFiber.return = returnFiber;
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
  return resultingFirstChild;
}

function reconcileSingleElement(returnFiber: Fiber, children: any) {
  const created = createFiberFromElement(children);
  created.return = returnFiber;
  return created;
}

export function reconcileChildFibers(fiber: Fiber, children: any) {
  // 单一子节点
  if (children.$$typeof === REACT_ELEMENT_TYPE) {
    return reconcileSingleElement(fiber, children);
  }
  // 多个子节点
  if (Array.isArray(children)) {
    return reconcileChildrenArray(fiber, children);
  }
  return null;
}
