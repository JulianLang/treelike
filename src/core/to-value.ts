import { nodeTypeOf } from './shared';
import { ObjectTreeNode } from './types';

export function toValue<T = any>(node: ObjectTreeNode, alreadySeenValues = new Set()): T {
  if (alreadySeenValues.has(node.value)) {
    return node.value;
  }

  alreadySeenValues.add(node.value);
  const type = nodeTypeOf(node.value);
  let result: any;

  switch (type) {
    case 'array':
      result = toArrayValue(node, alreadySeenValues);
      break;
    case 'object':
      result = toObjectValue(node, alreadySeenValues);
      break;
    default:
      result = node.value;
      break;
  }

  return result;
}

function toArrayValue(node: ObjectTreeNode<any[]>, alreadySeenValues: Set<any>): any[] {
  const result: any[] = [];

  for (const child of node.children) {
    const value = toValue(child, alreadySeenValues);
    result.push(value);
  }

  return result;
}

function toObjectValue(node: ObjectTreeNode<object>, alreadySeenValues: Set<any>): object {
  const result: any = {};

  for (const child of node.children) {
    result[child.name] = toValue(child, alreadySeenValues);
  }

  return result;
}
