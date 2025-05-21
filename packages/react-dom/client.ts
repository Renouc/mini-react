import { createContainer, updateContainer } from "reconciler/FiberReconciler";
import { Fiber } from "reconciler/ReactInternalTypes";
import { ReactElement } from "shared/ReactElementType";

export type ReactDOMRootType = {
  _internalRoot: Fiber;
  render: (element: ReactElement) => void;
};

// 构造方法
function ReactDOMRoot(root: Fiber): ReactDOMRootType {
  return {
    _internalRoot: root,
    render: function (element: ReactElement) {
      updateContainer(element, this._internalRoot);
    },
  };
}

// 创建根节点
function createRoot(container: HTMLElement): ReactDOMRootType {
  const hostRootFiber = createContainer(container);
  const root = ReactDOMRoot(hostRootFiber);
  return root;
}

export { createRoot };
