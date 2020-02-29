import { ObjectTreeNode, TraverseCallbackFn } from '../types';

export function parentTraverser<T extends ObjectTreeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
): void {
  if (node == null || node.parent == null || node.recursesTo != null) {
    return;
  }
  if (node.parent.parent == null) {
    // also output root node, which has no parent to be grandParent
    onNext(node.parent);
    return;
  }

  const grandParent = node.parent.parent;

  for (const child of grandParent.children) {
    onNext(child);
  }

  // continue recursivly
  if (grandParent.children.length > 0) {
    parentTraverser(grandParent.children[0], onNext);
  }
}
