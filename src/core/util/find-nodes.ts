import { treeTraverser } from '../traversers';
import { ConditionFn, TreelikeNode } from '../types';

export function findNodes<T extends TreelikeNode>(
  root: T,
  condition: ConditionFn,
  strategy = treeTraverser,
): T[] {
  const matches: T[] = [];

  strategy(root, (node) => {
    if (condition(node) === true) {
      matches.push(node);
    }
  });

  return matches;
}
