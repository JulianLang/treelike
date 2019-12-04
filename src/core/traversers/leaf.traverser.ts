import { isDefined } from '../shared';
import { ObjectTreeNode, TraverseCallbackFn } from '../types';
/**
 * Traverses a tree leafwise and climbs it recursively up:
 * ~~~
 *       (6)
 *      /   \
 *    (3)    (5)
 *    /  \     \
 *  (1)  (2)    (4)
 * ~~~
 * @param node The node to start traversing from.
 * @param onNext The callback to call for each node being traversed.
 */
export function leafTraverser(node: ObjectTreeNode, onNext: TraverseCallbackFn): void {
  for (const child of node.children) {
    leafTraverser(child, onNext);
    onNext(child);
  }

  // also include root node:
  if (!isDefined(node.parent)) {
    onNext(node);
  }
}
