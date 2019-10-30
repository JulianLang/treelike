import { iterateArray } from './array.iterator';
import { canIterate } from './can-iterate';
import { IteratorCallback } from './iterator.callback';
import { iterateObject } from './object.iterator';
export function iterate<T>(value: T, callback: IteratorCallback): void {
  if (!canIterate(value)) {
    return;
  }

  const iterator = Array.isArray(value) ? iterateArray : iterateObject;
  iterator(value as any, callback);
}
