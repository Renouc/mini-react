import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";

function ReactElement(type: any, props: any, key: any, ref: any) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    key,
    ref,
  };
}

export function jsx(type: any, config: any, maybeKey?: any) {
  let key: any = null;
  let ref: any = null;
  let props: any = {};

  if (maybeKey !== undefined) {
    key = maybeKey + "";
  }

  if (config.key !== undefined) {
    key = config.key + "";
  }

  if (config.ref !== undefined) {
    ref = config.ref;
  }

  for (const prop in config) {
    if (prop !== "key" && prop !== "ref") {
      props[prop] = config[prop];
    }
  }

  return ReactElement(type, props, key, ref);
}

export const jsxDEV = jsx;
