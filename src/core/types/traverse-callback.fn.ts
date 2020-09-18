import { TreelikeNode } from './treelike.node';

export type TraverseCallbackFn<T extends TreelikeNode> = (node: T) => void;
