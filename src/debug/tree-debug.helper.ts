import { ObjectTreeNode } from '../core/types/object-tree.node';

export function printSubtree<T extends ObjectTreeNode>(node: T, indent = ''): void {
  printNode(node, indent);

  for (const child of node.children) {
    printSubtree(child, indent + '  ');
  }
}

function printNode<T extends ObjectTreeNode>(node: T, indent: string): void {
  let value: string;

  switch (typeof node.value) {
    case 'function':
      value = node.value.name;
      break;
    case 'object':
      value = node.value.constructor.name;
      break;
    case 'undefined':
      value = 'undefined';
      break;
    default:
      value = node.value.toString();
      break;
  }

  const prefix = indent === '' ? '◉' : '⦿→';
  console.log(`${indent}${prefix} "${node.name}" (${node.type}): ${value}`);
}
