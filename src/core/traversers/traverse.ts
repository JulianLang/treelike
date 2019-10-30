import { ObjectTreeNode, TraverseCallbackFn } from "../types";
import { treeTraverser } from "./tree.traverser";

export function traverse(
  node: ObjectTreeNode<any>,
  onNext: TraverseCallbackFn,
  strategy: Function = treeTraverser
): void {
  strategy(node, onNext);
}
