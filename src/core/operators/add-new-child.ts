import { TreelikeNode } from '../types';
import { addChild } from './add-child';
import { createNode } from './create-node';

export function addNewChild<T extends TreelikeNode>(
  toNode: T,
  name: string,
  value: any,
  children: T[] = [],
): void {
  const node = createNode(name, value, children);
  addChild(node, toNode);
}
