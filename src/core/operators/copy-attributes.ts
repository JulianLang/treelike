import { ObjectTreeNode } from '../types';

/**
 * Copies all attributes from a given node onto another.
 * @param from The node to copy all attributes from.
 * @param onto The node to receive the copied attributes.
 */
export function copyAttributes<T extends ObjectTreeNode>(from: T, onto: T): void {
  onto.type = from.type;
  onto.parent = from.parent;
  onto.children = from.children;
  onto.name = from.name;
  onto.value = from.value;
}
