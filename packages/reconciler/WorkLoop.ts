// 深度优先遍历fiber

import { beginWork } from "./BeginWork";
import { completeWork } from "./CompleteWork";
import { Fiber } from "./ReactInternalTypes";

// 正在处理的节点
let workInProgress: Fiber | null = null;

// 完成单元工作，对节点进行回溯遍历，并触发完成工作

function completeUnitOfWork(fiber: Fiber | null) {
  // 已经完成的节点
  let completedFiber: Fiber | null = fiber;

  do {
    completeWork(completedFiber!);
    const siblingFiber = completedFiber!.sibling;
    if (siblingFiber) {
      workInProgress = siblingFiber;
      return;
    }

    completedFiber = completedFiber!.return;
    workInProgress = completedFiber;
  } while (completedFiber);
}

function performUnitOfWork(fiber: Fiber) {
  let next: Fiber | null = beginWork(fiber);

  if (next) {
    console.log("~~~next~~~", next);
    workInProgress = next;
  } else {
    // 回溯
    completeUnitOfWork(fiber);
  }
}

// 循环遍历
export function workLoop(container_fiber: Fiber) {
  console.log("~~~work~~~");

  workInProgress = container_fiber;
  while (workInProgress) {
    performUnitOfWork(workInProgress);
  }
}
