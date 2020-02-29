import { ObjectTreeNode } from '../types';

export function replace<T extends ObjectTreeNode>(
  node: T,
  other: T,
  onNode: T | undefined = node.parent,
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
