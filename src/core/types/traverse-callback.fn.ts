import { ObjectTreeNode } from './object-tree.node';

export type TraverseCallbackFn<T extends ObjectTreeNode> = (node: T) => void;
