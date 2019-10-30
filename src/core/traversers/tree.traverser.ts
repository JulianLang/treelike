import { ObjectTreeNode, TraverseCallbackFn } from "../types";
import { childTraverser } from "./child.traverser";

export function treeTraverser(
  node: ObjectTreeNode<any>,
  onNext: TraverseCallbackFn
): void {
  if (node == null) {
    return;
  }

  // root
  onNext(node);
  // children recursively
  childTraverser(node, onNext);
}
