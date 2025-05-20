// 深度优先遍历fiber

import { beginWork } from "./BeginWork";
import { completeWork } from "./CompleteWork";
import { Fiber } from "./ReactInternalTypes";

export function workLoop(fiber: Fiber) {
  const child = beginWork(fiber);
  if (child) {
    workLoop(child);
  }

  completeWork(fiber);
  if (fiber.sibling) {
    workLoop(fiber.sibling);
  } else {
    return;
  }
}
