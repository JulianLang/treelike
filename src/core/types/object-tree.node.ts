export interface TreelikeNode<
  NodeValue = any,
  ChildrenTypes extends TreelikeNode<unknown, any[]>[] = any[]
> {
  parent?: TreelikeNode;
  name: string | number;
  type: TreelikeNodeType;
  children: [...ChildrenTypes];
  recursesTo?: string | number;
  value: NodeValue;
}

export type TreelikeNodeType = 'object' | 'array' | 'value';
