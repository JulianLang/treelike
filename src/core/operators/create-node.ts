import { nodeTypeOf } from '../../shared';
import { TreelikeNode } from '../types';

export function createNode<T, ChildrenTypes extends TreelikeNode<unknown, any[]>[]>(
  name: string | number,
  value: T,
  children: [...ChildrenTypes] = [] as any,
  parent?: TreelikeNode,
): TreelikeNode<T, ChildrenTypes> {
  return {
    name,
    value,
    children,
    parent,
    type: nodeTypeOf(value),
  };
}
