import { isDefined } from '../shared';
import { ObjectTreeNode, TraverseCallbackFn } from '../types';

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
