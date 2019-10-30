import { ObjectTreeNode } from '../core/types/object-tree.node';

export function printSubtree(node: ObjectTreeNode<any>, indent = ''): void {
    printNode(node, indent);

    for (const child of node.children) {
        printSubtree(child, indent + '  ');
    }
}

function printNode(node: ObjectTreeNode<any>, indent: string): void {
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
        default: value = node.value.toString();
            break;
    }

    const prefix = indent === '' ? '◉' : '⦿→';
    console.log(`${indent}${prefix} "${node.name}" (${node.type}): ${value}`);
}