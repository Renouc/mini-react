import { Fiber } from "./ReactInternalTypes";

export type Instance = HTMLElement;

// 创建文本节点
export function createTextInstance(text: string) {
  return document.createTextNode(text);
}

// 创建DOM节点
export function createInstance(type: string) {
  return document.createElement(type);
}

// 关联DOM节点
export function appendChild(parent: Instance, child: Instance) {
  parent.appendChild(child);
}

// 设置属性

export function setInitialProperties(dom: Instance, props: any) {
  for (const prop in props) {
    if (!props.hasOwnProperty(prop)) {
      continue;
    }

    if (prop === "children") {
      if (typeof props.children === "string") {
        dom.textContent = props.children;
      } else {
        continue;
      }
    }

    dom.setAttribute(prop, props[prop]);
  }
}
