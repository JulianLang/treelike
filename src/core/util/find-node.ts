import { treeTraverser } from '../traversers';
import { ConditionFn, ObjectTreeNode } from '../types';

export function findNode<T extends ObjectTreeNode>(
  root: T,
  condition: ConditionFn,
  strategy = treeTraverser,
): T | undefined {
  let match: T;

  strategy(root, node => {
    if (match == null && condition(node) === true) {
      match = node;
    }
  });

  return match!;
}
