import { ObjectTreeNodeType } from '../core/types';

export function nodeTypeOf(value: any): ObjectTreeNodeType {
  let type: ObjectTreeNodeType;

  if (typeof value === 'object') {
    type = Array.isArray(value) ? 'array' : 'object';
  } else {
    type = 'value';
  }

  return type;
}
