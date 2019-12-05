import { canIterate, iterate } from '../core/iterators';
import { addChild } from './operators';
import { nodeTypeOf } from './shared';
import { SelectorFn } from './types/child-selector.fn';
import { ObjectTreeNode } from './types/object-tree.node';

const knownValues: Map<any, ObjectTreeNode> = new Map();

export function treeOf<T>(
  value: T,
  childSelector?: SelectorFn,
  parent: ObjectTreeNode<any> | undefined = undefined,
): ObjectTreeNode<T> {
  const node: ObjectTreeNode<T> = {
    parent,
    value,
    name: '$root',
    type: nodeTypeOf(value),
    isRecursionRoot: false,
    children: [],
  };

  if (parent !== undefined) {
    addChild(node, parent);
  }

  buildNode(node, childSelector);

  return node;
}

function buildNode(node: ObjectTreeNode<any>, selectChild?: SelectorFn): void {
  const childValue = selectChild !== undefined ? selectChild(node.value) : node.value;

  if (canIterate(childValue)) {
    iterate(childValue, (value: any, nameOrIndex: string | number) => {
      const child: ObjectTreeNode<any> = {
        parent: node,
        value,
        name: nameOrIndex,
        type: nodeTypeOf(value),
        isRecursionRoot: false,
        children: [],
      };

      if (isValueRecursionRoot(value)) {
        const recursiveNode = knownValues.get(value);
        recursiveNode!.isRecursionRoot = true;
        node.children.push(recursiveNode!);
      } else {
        knownValues.set(value, child);
        buildNode(child, selectChild);
        node.children.push(child);
      }
    });
  }
}

/**
 * Determines if a given value is a reference to an already built value. If this is the case,
 * the function returns `true`, otherwise it returns `false`.
 * @param value The value to check for being a recursion root.
 */
function isValueRecursionRoot(value: any): boolean {
  // only check reference types, such as objects and arrays.
  const type = nodeTypeOf(value);
  if (type === 'value') {
    return false;
  }

  return knownValues.has(value);
}
