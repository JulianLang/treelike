import { ObjectTreeNode } from '../types';

export function remove(
  node: ObjectTreeNode<any>,
  parent: ObjectTreeNode<any> | undefined = node.parent,
): number {
  if (parent === undefined) {
    throw new Error(`Cannot remove node from parent, when parent is undefined.`);
  }

  const index = parent.children.indexOf(node);

  if (index > -1) {
    const removedNode = parent.children.splice(index, 1)[0];
    removedNode.parent = undefined;
  }

  return index;
}
