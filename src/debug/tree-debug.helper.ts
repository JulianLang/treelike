import { TreelikeNode } from '../core/types';
import { NodeOutputFormatter } from './types';

const defaultFormatter: NodeOutputFormatter = (name, type, value, recursion) =>
  `"${name.toString()}" (${type}): ${value}${recursion}`;

export function printSubtree<T extends TreelikeNode>(
  node: T,
  formatter: NodeOutputFormatter = defaultFormatter,
  indent = '',
): void {
  printNode(node, formatter, indent);

  for (const child of node.children) {
    if (child.recursesTo) {
      printNode(child, formatter, indent + '  ');
    } else {
      printSubtree(child, formatter, indent + '  ');
    }
  }
}

function printNode<T extends TreelikeNode>(
  node: T,
  formatter: NodeOutputFormatter,
  indent: string,
): void {
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

  const recursion = !!node.recursesTo ? ` [Recursive: ${node.recursesTo}]` : '';
  const prefix = indent === '' ? '◉' : '⦿→';
  const content = formatter(node.name, node.type, value, recursion);

  console.log(`${indent}${prefix} ${content}`);
}
