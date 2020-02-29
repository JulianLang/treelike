export interface ObjectTreeNode<T = any> {
  parent?: this;
  name: string | number;
  type: ObjectTreeNodeType;
  children: this[];
  recursesTo?: string | number;
  value: T;
}

export type ObjectTreeNodeType = 'object' | 'array' | 'value';
