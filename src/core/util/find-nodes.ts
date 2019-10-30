import { treeTraverser } from "../traversers";
import { ConditionFn, ObjectTreeNode } from "../types";

export function findNodes(
  root: ObjectTreeNode<any>,
  condition: ConditionFn,
  strategy = treeTraverser
): ObjectTreeNode<any>[] {
  const matches: ObjectTreeNode<any>[] = [];

  strategy(root, node => {
    if (condition(node) === true) {
      matches.push(node);
    }
  });

  return matches;
}
