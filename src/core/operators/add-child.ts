import { TreelikeNode } from '../types';

export function addChild<T extends TreelikeNode>(node: T, toNode: T, allowDuplicates = true): void {
  if (allowDuplicates || !toNode.children.includes(node)) {
    toNode.children.push(node);
    node.parent = toNode;
  }
}
