import { Fiber, FiberRoot } from "./ReactInternalTypes";

export function createFiberRoot(containerInfo: HTMLElement): FiberRoot {
  const root = {
    containerInfo,
  };

  return root;
}
