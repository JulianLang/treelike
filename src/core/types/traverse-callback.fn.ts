import { TreelikeNode } from './object-tree.node';

export type TraverseCallbackFn<T extends TreelikeNode = TreelikeNode> = (node: T) => void;
