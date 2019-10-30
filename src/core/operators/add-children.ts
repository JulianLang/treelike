import { ObjectTreeNode } from "../types";
import { addChild } from "./add-child";

export function addChildren(
  nodes: ObjectTreeNode<any>[],
  toNode: ObjectTreeNode<any>,
  allowDuplicates = true
): void {
  for (const node of nodes) {
    addChild(node, toNode, allowDuplicates);
  }
}
