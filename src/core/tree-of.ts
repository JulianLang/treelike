import { canIterate, iterate } from '../core/iterators';
import { addChild } from './operators';
import { nodeTypeOf } from './shared';
import { SelectorFn } from './types/child-selector.fn';
import { ObjectTreeNode } from './types/object-tree.node';

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
    children: [],
  };
  if (parent !== undefined) {
    addChild(parent, node);
  }

  buildNode(node, childSelector);

  return node;
}

function buildNode(node: ObjectTreeNode<any>, selectChildFrom?: SelectorFn): void {
  const childValue = selectChildFrom !== undefined ? selectChildFrom(node.value) : node.value;

  if (canIterate(childValue)) {
    iterate(childValue, (value: any, nameOrIndex: string | number) => {
      const child: ObjectTreeNode<any> = {
        parent: node,
        value,
        name: nameOrIndex,
        type: nodeTypeOf(value),
        children: [],
      };

      buildNode(child, selectChildFrom);
      node.children.push(child);
    });
  }
}
