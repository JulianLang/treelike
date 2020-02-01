import { ObjectTreeNode, TraverseCallbackFn } from '../types';

export function siblingAndSelfTraverser(node: ObjectTreeNode, onNext: TraverseCallbackFn) {
  siblingTraverser(node, onNext, true, false);
}

export function siblingAndSelfWithChildrenTraverser(
  node: ObjectTreeNode,
  onNext: TraverseCallbackFn,
) {
  siblingTraverser(node, onNext, true, true);
}

export function siblingWithChildrenTraverser(node: ObjectTreeNode, onNext: TraverseCallbackFn) {
  siblingTraverser(node, onNext, false, true);
}

export function siblingTraverser(
  node: ObjectTreeNode,
  onNext: TraverseCallbackFn,
  includeEntryNode = false,
  includeChildren = false,
): void {
  if (node == null) {
    return;
  }

  let targetNodes: ObjectTreeNode[] = [];

  if (node.parent != null) {
    targetNodes = node.parent.children;
  } else if (includeEntryNode) {
    targetNodes = [node];
  }

  enumerateSiblings(targetNodes, node, onNext, includeEntryNode, includeChildren);
}

function enumerateSiblings(
  siblings: ObjectTreeNode[],
  entryNode: ObjectTreeNode,
  onNext: TraverseCallbackFn,
  includeEntryNode: boolean,
  includeChildren: boolean,
) {
  let children: any[] = [];

  for (const sibling of siblings) {
    const shouldInlcude = sibling !== entryNode && sibling.parent !== entryNode;

    if (includeEntryNode || shouldInlcude) {
      onNext(sibling);
      children = children.concat(sibling.children);
    }
  }

  if (includeChildren && children.length > 0) {
    enumerateSiblings(children, entryNode, onNext, includeEntryNode, includeChildren);
  }
}
