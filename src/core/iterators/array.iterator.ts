import { IteratorCallback } from './types';

export function iterateArray(arr: any[], callback: IteratorCallback): void {
  let index = 0;

  for (const item of arr) {
    callback(item, index++, arr);
  }
}
