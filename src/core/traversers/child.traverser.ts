import { TraverseCallbackFn, TreelikeNode } from '../types';

export function childTraverser<T extends TreelikeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
): void {
  if (node == null || node.recursesTo != null) {
    return;
  }

  for (const child of node.children) {
    onNext(child);
  }

  // continue recursivly
  for (const child of node.children) {
    childTraverser(child, onNext);
  }
}
