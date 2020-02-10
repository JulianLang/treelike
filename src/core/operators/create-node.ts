import { nodeTypeOf } from '../../shared';
import { ObjectTreeNode } from '../types';

export function createNode<T>(
  name: string | number,
  value: T,
  children: ObjectTreeNode[] = [],
  parent?: ObjectTreeNode,
): ObjectTreeNode {
  return {
    name,
    value,
    children,
    parent,
    type: nodeTypeOf(value),
  };
}
