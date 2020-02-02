import { canIterate, iterate } from '../core/iterators';
import { isUndefined, nodeTypeOf } from '../shared';
import { defaultRootName } from './constants';
import { addChild } from './operators';
import { SelectorFn } from './types/child-selector.fn';
import { ObjectTreeNode } from './types/object-tree.node';

const knownValues: Map<any, ObjectTreeNode> = new Map();

export function treeOf<T>(
  value: T,
  childSelector?: SelectorFn,
  parent: ObjectTreeNode | undefined = undefined,
): ObjectTreeNode<T> {
  const node: ObjectTreeNode = {
    parent,
    value,
    name: defaultRootName,
    type: nodeTypeOf(value),
    isRecursionRoot: false,
    children: [],
  };

  if (parent !== undefined) {
    addChild(node, parent);
  }

  tryAddToKnownValues(value, node);
  buildNode(node, childSelector);

  return node;
}

function buildNode(node: ObjectTreeNode, selectChild?: SelectorFn): void {
  const childValue = selectChild !== undefined ? selectChild(node.value) : node.value;

  if (canIterate(childValue)) {
    iterate(childValue, (value: any, nameOrIndex: string | number) => {
      const child: ObjectTreeNode = {
        parent: node,
        value,
        name: nameOrIndex,
        type: nodeTypeOf(value),
        isRecursionRoot: false,
        children: [],
      };

      if (isValueRecursionRoot(value)) {
        /*
          isValueRecursionRoot already determined that the value is contained in the knownValues-Map,
          so we can guarantuee here that parentalNode is defined. Thus the trailing "!" operator after
          knownValues.get(...) is correct in this case.
        */
        const parentalNode = knownValues.get(value)!;
        parentalNode.isRecursionRoot = true;
        node.children.push(parentalNode);

        if (parentalNode.name === defaultRootName) {
          parentalNode.name = nameOrIndex;
        }
      } else {
        tryAddToKnownValues(value, child);
        buildNode(child, selectChild);
        node.children.push(child);
      }
    });
  }
}

/**
 * Adds a given value along with its associated node to the knownValues map.
 * @param value The value to be added as known.
 * @param child The associated node for this value.
 */
function tryAddToKnownValues<T extends ObjectTreeNode>(value: any, child: T) {
  // only add reference types, such as objects and arrays.
  const type = nodeTypeOf(value);
  if (type !== 'value') {
    knownValues.set(value, child);
  }
}

/**
 * Determines if a given value is a reference to an already built value. If this is the case,
 * the function returns `true`, otherwise it returns `false`.
 * @param value The value to check for being a recursion root.
 */
function isValueRecursionRoot(value: any): boolean {
  if (isUndefined(value)) {
    return false;
  }

  return knownValues.has(value);
}
