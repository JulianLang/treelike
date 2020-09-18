import { TraverseCallbackFn } from './traverse-callback.fn';
import { TreelikeNode } from './treelike.node';

export type TraverserFn<T extends TreelikeNode> = (node: T, onNext: TraverseCallbackFn<T>) => void;
