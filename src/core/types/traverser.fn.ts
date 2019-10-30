import { ObjectTreeNode } from './object-tree.node';
import { TraverseCallbackFn } from './traverse-callback.fn';

export type TraverserFn = (node: ObjectTreeNode, onNext: TraverseCallbackFn) => void;
