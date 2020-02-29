import { ObjectTreeNode } from './object-tree.node';

export type ConditionFn<T extends ObjectTreeNode = ObjectTreeNode> = (node: T) => boolean;
