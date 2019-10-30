import { IteratorCallback } from './iterator.callback';

export type IteratorFn<T> = (value: T, callback: IteratorCallback) => void;
