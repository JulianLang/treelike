import { nodeTypeOf } from './shared';
import { ObjectTreeNode } from './types';

/**
 * Converts a node back into the value it represents.
 * @param node The node to convert back into a value.
 */
export function toValue<T = any>(node: ObjectTreeNode): T {
  return convertToValue(node, new Set());
}

/**
 * Converts a node back into the value it represents.
 * @param node The node to convert back into a value.
 * @param alreadySeenValues A set of objects already seen in conversion process.
 */
function convertToValue(node: ObjectTreeNode, alreadySeenValues: Set<any>): any {
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
    const value = convertToValue(child, alreadySeenValues);
    result.push(value);
  }

  return result;
}

function toObjectValue(node: ObjectTreeNode<object>, alreadySeenValues: Set<any>): object {
  const result: any = {};

  for (const child of node.children) {
    result[child.name] = convertToValue(child, alreadySeenValues);
  }

  return result;
}
