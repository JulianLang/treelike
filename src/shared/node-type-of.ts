import { TreelikeNodeType } from '../core/types';
import { isDefined } from './is-defined';

export function nodeTypeOf(value: any): TreelikeNodeType {
  if (!isDefined(value)) {
    return 'value';
  }

  let type: TreelikeNodeType;

  if (typeof value === 'object') {
    type = Array.isArray(value) ? 'array' : 'object';
  } else {
    type = 'value';
  }

  return type;
}
