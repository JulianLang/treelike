import { TreelikeNode } from './object-tree.node';

export type ConditionFn<T extends TreelikeNode = TreelikeNode> = (node: T) => boolean;
