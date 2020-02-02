import { ObjectTreeNode } from './object-tree.node';
import { TraverseCallbackFn } from './traverse-callback.fn';

export type TraverserFn<T extends ObjectTreeNode> = (
  node: T,
  onNext: TraverseCallbackFn<T>,
) => void;
