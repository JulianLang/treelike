import { iterateArray } from './array.iterator';
import { iterateObject } from './object.iterator';
import { IteratorCallback } from './types';
import { canIterate } from './util';
export function iterate<T>(value: T, callback: IteratorCallback): void {
  if (!canIterate(value)) {
    return;
  }

  const iterator = Array.isArray(value) ? iterateArray : iterateObject;
  iterator(value as any, callback);
}
