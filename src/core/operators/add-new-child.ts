import { ObjectTreeNode } from '../types';
import { addChild } from './add-child';
import { createNode } from './create-node';

export function addNewChild(
  toNode: ObjectTreeNode<any>,
  name: string,
  value: any,
  children: ObjectTreeNode<any>[] = [],
): void {
  const node = createNode(name, value, children);
  addChild(node, toNode);
}
