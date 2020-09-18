import { IteratorCallback } from './types';

export function iterateObject(obj: any, callback: IteratorCallback): void {
  for (const name in obj) {
    const value = obj[name];

    callback(value, name, obj);
  }
}
