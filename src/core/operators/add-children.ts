import { TreelikeNode } from '../types';
import { addChild } from './add-child';

export function addChildren<T extends TreelikeNode>(
  nodes: T[],
  toNode: T,
  allowDuplicates = true,
): void {
  for (const node of nodes) {
    addChild(node, toNode, allowDuplicates);
  }
}
