import { TreelikeNode } from './treelike.node';

export type ConditionFn<T extends TreelikeNode = TreelikeNode> = (node: T) => boolean;
