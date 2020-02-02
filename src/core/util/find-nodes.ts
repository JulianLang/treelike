import { treeTraverser } from '../traversers';
import { ConditionFn, ObjectTreeNode } from '../types';

export function findNodes<T extends ObjectTreeNode>(
  root: T,
  condition: ConditionFn,
  strategy = treeTraverser,
): T[] {
  const matches: T[] = [];

  strategy(root, node => {
    if (condition(node) === true) {
      matches.push(node);
    }
  });

  return matches;
}
