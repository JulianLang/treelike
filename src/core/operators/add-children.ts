import { ObjectTreeNode } from '../types';
import { addChild } from './add-child';

export function addChildren<T extends ObjectTreeNode>(
  nodes: T[],
  toNode: T,
  allowDuplicates = true,
): void {
  for (const node of nodes) {
    addChild(node, toNode, allowDuplicates);
  }
}
