import { TraverseCallbackFn, TreelikeNode } from '../types';
import { treeTraverser } from './tree.traverser';

export function traverse<T extends TreelikeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
  strategy: Function = treeTraverser,
): void {
  strategy(node, onNext);
}
