import { TraverseCallbackFn, TreelikeNode } from '../types';
import { childTraverser } from './child.traverser';

export function treeTraverser<T extends TreelikeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
): void {
  if (node == null || node.recursesTo != null) {
    return;
  }

  // root
  onNext(node);
  // children recursively
  childTraverser(node, onNext);
}
