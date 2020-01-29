import { nodeTypeOf } from './shared';
import { ObjectTreeNode } from './types';

export function toValue<T = any>(node: ObjectTreeNode): T {
  const type = nodeTypeOf(node.value);
  let result: any;

  switch (type) {
    case 'array':
      result = toArrayValue(node);
      break;
    case 'object':
      result = toObjectValue(node);
      break;
    default:
      result = node.value;
      break;
  }

  return result;
}

function toArrayValue(node: ObjectTreeNode<any[]>): any[] {
  const result: any[] = [];

  for (const child of node.children) {
    const value = toValue(child);
    result.push(value);
  }

  return result;
}

function toObjectValue(node: ObjectTreeNode<object>): object {
  const result: any = {};

  for (const child of node.children) {
    result[child.name] = toValue(child);
  }

  return result;
}
