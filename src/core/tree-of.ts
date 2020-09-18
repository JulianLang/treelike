import { canIterate, iterate } from '../core/iterators';
import { isUndefined, nodeTypeOf } from '../shared';
import { defaultRootName } from './constants';
import { TreelikeNode } from './types';
import { SelectorFn } from './types/child-selector.fn';

let knownValues: Map<any, TreelikeNode> = new Map();

export function treeOf<T>(
  value: T,
  childSelector?: SelectorFn,
  nodeName = defaultRootName,
): TreelikeNode<T> {
  // use a fresh map everytime building a new tree
  knownValues = new Map();

  const node: TreelikeNode<T, []> = {
    parent: undefined,
    name: nodeName,
    value,
    type: nodeTypeOf(value),
    children: [],
  };

  tryAddToKnownValues(value, node);
  buildNode(node, childSelector);

  return node;
}

function buildNode(node: TreelikeNode, selectChild?: SelectorFn): void {
  const childValue = selectChild !== undefined ? selectChild(node.value) : node.value;

  if (canIterate(childValue)) {
    iterate(childValue, (value: any, nameOrIndex: string | number) => {
      const child: TreelikeNode = {
        parent: node,
        value,
        name: nameOrIndex,
        type: nodeTypeOf(value),
        children: [],
      };

      if (isValueRecursionRoot(value)) {
        /*
          isValueRecursionRoot already determined that the value is contained in the knownValues-Map,
          so we can guarantuee here that parentalNode is defined. Thus the trailing "!" operator after
          knownValues.get(...) is correct in this case.
        */
        const parentalNode = knownValues.get(value)!;
        const parentalCopy = { ...parentalNode };

        parentalCopy.parent = child.parent;
        parentalCopy.recursesTo = getRecursionPath(parentalNode, child);

        if (parentalCopy.name === defaultRootName) {
          parentalCopy.name = nameOrIndex;
        }

        node.children.push(parentalCopy);
      } else {
        tryAddToKnownValues(value, child);
        buildNode(child, selectChild);
        node.children.push(child);
      }
    });
  }
}

function getRecursionPath(
  parentalNode: TreelikeNode<any>,
  child: TreelikeNode<any>,
): string | number | undefined {
  const path: any[] = [];
  let node: TreelikeNode | undefined = child;

  while (node) {
    path.push(node.name);

    if (node.parent === parentalNode) {
      break;
    }

    node = node!.parent;
  }

  path.push(parentalNode.name);
  const reversed = path.reverse();
  reversed.push(parentalNode.name);

  return path.join(' => ');
}

/**
 * Adds a given value along with its associated node to the knownValues map.
 * @param value The value to be added as known.
 * @param child The associated node for this value.
 */
function tryAddToKnownValues<T extends TreelikeNode>(value: any, child: T) {
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
