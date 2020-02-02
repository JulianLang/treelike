import { ObjectTreeNode, SelectorFn } from './types';

/**
 * Converts a node back into the value it represents.
 * @param node The node to convert back into a value.
 */
export function toValue<T = any>(node: ObjectTreeNode, selectChild?: SelectorFn): T {
  const identityFn = (value: any) => value;
  const childSelector = selectChild || identityFn;
  const result = convertToValue(node, new Set(), childSelector);

  return result;
}

/**
 * Converts a node back into the value it represents.
 * @param node The node to convert back into a value.
 * @param alreadySeenValues A set of objects already seen in conversion process.
 * @param selectChild A function selecting child-nodes from a given node.
 */
function convertToValue<T extends ObjectTreeNode>(
  node: T,
  alreadySeenValues: Set<any>,
  selectChild: SelectorFn<T>,
): any {
  const targetNode = selectChild(node);

  if (alreadySeenValues.has(targetNode.value)) {
    return targetNode.value;
  }

  alreadySeenValues.add(targetNode.value);
  let result: any;

  switch (targetNode.type) {
    case 'array':
      result = toArrayValue(targetNode, alreadySeenValues, selectChild);
      break;
    case 'object':
      result = toObjectValue(targetNode, alreadySeenValues, selectChild);
      break;
    default:
      result = targetNode.value;
      break;
  }

  return result;
}

function toArrayValue<T extends ObjectTreeNode>(
  node: T,
  alreadySeenValues: Set<any>,
  selectChild: SelectorFn<T>,
): any[] {
  const result: any[] = [];

  for (const child of node.children) {
    const selectedChild = selectChild(child);
    const value = convertToValue(selectedChild, alreadySeenValues, selectChild);
    result.push(value);
  }

  return result;
}

function toObjectValue<T extends ObjectTreeNode>(
  node: T,
  alreadySeenValues: Set<any>,
  selectChild: SelectorFn<T>,
): object {
  const result: any = {};

  for (const child of node.children) {
    const selectedChild = selectChild(child);
    result[selectedChild.name] = convertToValue(selectedChild, alreadySeenValues, selectChild);
  }

  return result;
}
