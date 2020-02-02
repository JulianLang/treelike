export interface ObjectTreeNode<T = any> {
  parent?: this;
  name: string | number;
  type: ObjectTreeNodeType;
  children: this[];
  isRecursionRoot: boolean;
  value: T;
}

export type ObjectTreeNodeType = 'object' | 'array' | 'value';
