export interface ObjectTreeNode<T = any> {
  parent?: ObjectTreeNode<any>;
  name: string | number;
  type: ObjectTreeNodeType;
  children: ObjectTreeNode<any>[];
  value: T;
}

export type ObjectTreeNodeType = 'object' | 'array' | 'value';
