import { TreelikeNode } from './treelike.node';

export type TraverseCallbackFn<T extends TreelikeNode = TreelikeNode> = (node: T) => void;
