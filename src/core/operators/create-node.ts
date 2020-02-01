import { nodeTypeOf } from '../../shared';
import { ObjectTreeNode } from '../types';

export function createNode<T>(
  name: string | number,
  value: T,
  children: ObjectTreeNode<any>[] = [],
  parent?: ObjectTreeNode<any>,
): ObjectTreeNode<T> {
  return {
    name,
    value,
    children,
    parent,
    isRecursionRoot: false,
    type: nodeTypeOf(value),
  };
}
