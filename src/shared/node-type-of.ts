import { ObjectTreeNodeType } from '../core/types';
import { isDefined } from './is-defined';

export function nodeTypeOf(value: any): ObjectTreeNodeType {
  if (!isDefined(value)) {
    return 'value';
  }

  let type: ObjectTreeNodeType;

  if (typeof value === 'object') {
    type = Array.isArray(value) ? 'array' : 'object';
  } else {
    type = 'value';
  }

  return type;
}
