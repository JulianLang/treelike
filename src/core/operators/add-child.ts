import { ObjectTreeNode } from "../types";

export function addChild(
  node: ObjectTreeNode<any>,
  toNode: ObjectTreeNode<any>,
  allowDuplicates = true
): void {
  if (allowDuplicates || !toNode.children.includes(node)) {
    toNode.children.push(node);
    node.parent = toNode;
  }
}
