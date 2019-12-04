import { isDefined } from '../shared';
import { ConditionFn, ObjectTreeNode, TraverseCallbackFn } from '../types';

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
export function leafTraverser(
  node: ObjectTreeNode,
  onNext: TraverseCallbackFn,
  breakWhen: ConditionFn = () => false,
): void {
  let breakLoop = false;

  function leafTraverse(node: ObjectTreeNode, onNext: TraverseCallbackFn, breakWhen?: ConditionFn) {
    for (const child of node.children) {
      leafTraverse(child, onNext, breakWhen);

      if (breakLoop || breakWhen!(child)) {
        breakLoop = true;
        break;
      }

      onNext(child);
    }

    if (!isDefined(node.parent) && !breakLoop) {
      onNext(node);
    }
  }

  leafTraverse(node, onNext, breakWhen);
}
