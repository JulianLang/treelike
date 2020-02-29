import { ObjectTreeNode } from './object-tree.node';

export type TraverseCallbackFn<T extends ObjectTreeNode = ObjectTreeNode> = (node: T) => void;
