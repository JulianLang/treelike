import { ObjectTreeNode, TraverseCallbackFn } from '../types';
import { treeTraverser } from './tree.traverser';

export function traverse<T extends ObjectTreeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
  strategy: Function = treeTraverser,
): void {
  strategy(node, onNext);
}
