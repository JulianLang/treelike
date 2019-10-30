import { treeTraverser } from "../traversers";
import { ConditionFn, ObjectTreeNode } from "../types";

export function findNode(
  root: ObjectTreeNode<any>,
  condition: ConditionFn,
  strategy = treeTraverser
): ObjectTreeNode<any> | undefined {
  let match: ObjectTreeNode<any>;

  strategy(root, node => {
    if (match == null && condition(node) === true) {
      match = node;
    }
  });

  return match!;
}
