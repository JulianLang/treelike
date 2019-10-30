import { ObjectTreeNode, TraverseCallbackFn } from "../types";

export function childTraverser(
  node: ObjectTreeNode<any>,
  onNext: TraverseCallbackFn
): void {
  if (node == null) {
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
