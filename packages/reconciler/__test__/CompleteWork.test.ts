import { completeWork } from "../CompleteWork";
import { beginWork } from "../BeginWork";
import { createFiberFromElement } from "../Fiber";
import { FUNCTION_ELEMENT, MULTIPLE_ELEMENTS } from "./data";

describe("completeWork测试", () => {
  const root_fiber = createFiberFromElement(MULTIPLE_ELEMENTS);
  const h1_fiber = beginWork(root_fiber);
  const p_fiber = h1_fiber!.sibling!;
  beginWork(p_fiber!);

  test("h1元素测试", () => {
    completeWork(h1_fiber!);
    expect(h1_fiber?.stateNode).not.toBeNull();
    expect(h1_fiber?.stateNode?.tagName).toBe("H1");
    expect(h1_fiber?.stateNode?.textContent).toBe("Hello,my react!!!");
  });

  test("p元素测试", () => {
    completeWork(p_fiber!.child!);
    expect(p_fiber?.child?.stateNode).not.toBeNull();
    expect(p_fiber?.child?.stateNode?.tagName).toBeUndefined();
    expect(p_fiber?.child?.stateNode?.nodeType).toBe(3);
    expect(p_fiber?.child?.stateNode?.textContent).toBe("renouc");
    completeWork(p_fiber!.child!.sibling!);
    expect(p_fiber?.child?.sibling?.stateNode).not.toBeNull();
    expect(p_fiber?.child?.sibling?.stateNode?.tagName).toBe("SPAN");
    expect(p_fiber?.child?.sibling?.stateNode?.textContent).toBe("span text");
    completeWork(p_fiber!);
    expect(p_fiber?.stateNode).not.toBeNull();
    expect(p_fiber?.stateNode?.tagName).toBe("P");
    expect(p_fiber?.stateNode?.childNodes.length).toBe(2);
  });

  test("函数组件测试", () => {
    const root_fiber = createFiberFromElement(FUNCTION_ELEMENT);
    
    // 测试根div fiber
    expect(root_fiber.tag).toBe(5); // HostComponent
    expect(root_fiber.type).toBe("div");

    // 执行beginWork处理根div
    const function_component_fiber = beginWork(root_fiber);

    // 测试函数组件fiber
    expect(function_component_fiber).not.toBeNull();
    expect(function_component_fiber?.tag).toBe(0); // FunctionComponent
    expect(typeof function_component_fiber?.type).toBe("function");
    expect(function_component_fiber?.pendingProps).toEqual({
      name: "Renou",
      id: "xxx",
    });
    
    // 执行beginWork处理函数组件
    const p_fiber = beginWork(function_component_fiber!);
    
    // 测试函数组件返回的p元素fiber
    expect(p_fiber).not.toBeNull();
    expect(p_fiber?.tag).toBe(5); // HostComponent
    expect(p_fiber?.type).toBe("p");
    expect(p_fiber?.pendingProps.children).toBe("HelloRenou");
    expect(p_fiber?.return).toBe(function_component_fiber);
    
    // 测试completeWork
    // 先完成p元素
    completeWork(p_fiber!);
    expect(p_fiber?.stateNode).not.toBeNull();
    expect(p_fiber?.stateNode?.tagName).toBe("P");
    expect(p_fiber?.stateNode?.textContent).toBe("HelloRenou");
    
    // 完成函数组件（函数组件不创建DOM节点）
    completeWork(function_component_fiber!);
    expect(function_component_fiber?.stateNode).toBeNull();
    
    // 完成根div
    completeWork(root_fiber);
    expect(root_fiber.stateNode).not.toBeNull();
    expect(root_fiber.stateNode?.tagName).toBe("DIV");
    expect(root_fiber.stateNode?.childNodes.length).toBe(1);
    
    // 验证DOM结构：div > p
    const divElement = root_fiber.stateNode;
    const pElement = divElement.childNodes[0];
    expect(pElement.tagName).toBe("P");
    expect(pElement.textContent).toBe("HelloRenou");
  });
});
