import { ObjectTreeNode } from '../types';

export function replace(
  node: ObjectTreeNode<any>,
  other: ObjectTreeNode<any>,
  onNode: ObjectTreeNode<any> | undefined = node.parent,
): number {
  if (onNode === undefined) {
    throw new Error('Cannot replace node on a node collection that is undefined.');
  }

  const index = onNode.children.indexOf(node);

  if (index > -1) {
    const removedNode = onNode.children.splice(index, 1, other)[0];
    other.parent = onNode;
    removedNode.parent = undefined;
  }

  return index;
}
