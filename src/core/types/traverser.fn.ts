import { TreelikeNode } from './object-tree.node';
import { TraverseCallbackFn } from './traverse-callback.fn';

export type TraverserFn<T extends TreelikeNode> = (node: T, onNext: TraverseCallbackFn<T>) => void;
