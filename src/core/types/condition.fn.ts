import { ObjectTreeNode } from './object-tree.node';

export type ConditionFn = (node: ObjectTreeNode<any>) => boolean;
