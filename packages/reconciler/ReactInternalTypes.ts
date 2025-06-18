export type WorkTag = typeof HostRoot | typeof HostComponent | typeof HostText | typeof FunctionComponent;

// 根Fiber 可以理解为根元素 ， 通过reactDom.render()产生的根元素
export const HostRoot = 3;

// 宿主组件 DOM元素
export const HostComponent = 5;

// 文本节点
export const HostText = 6;

// 函数组件
export const FunctionComponent = 0;

export type FiberRoot = {
  containerInfo: HTMLElement;
};

export type Fiber = {
  // Fiber 节点类型
  tag: WorkTag;

  // 唯一标识符，用于优化渲染
  key: string | null;

  // 用户写在 React 元素上的原始类型，例如函数、类、字符串、Fragment 等
  elementType: any;

  // 表示React元素的类型
  // 对于函数组件，是函数本身
  // 对于类组件，是类本身
  // 对于DOM元素，是DOM节点类型 'div'
  // 解析后最终渲染的类型，如果是函数组件就是真实的函数，如果是宿主节点则是 “div” 等
  type: any;

  // 存储与此Fiber关联的实际实例
  // 对于DOM元素，是DOM节点
  // 对于类组件，是类组件的实例
  // 对于HostRoot，是FiberRoot对象
  // 对于函数组件，null
  stateNode: any;

  // 指向父Fiber节点，构成树的向上链接。
  return: Fiber | null;

  // 指向第一个子Fiber节点，是子树的入口点。
  child: Fiber | null;

  // 指向同级的下一个Fiber节点，构成同级节点的链表。
  sibling: Fiber | null;

  // 存储React元素的ref引用，连接到DOM节点或组件实例
  ref: any;

  // 存储React元素的props
  pendingProps: any;
};
