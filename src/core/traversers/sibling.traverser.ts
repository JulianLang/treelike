import { ObjectTreeNode, TraverseCallbackFn } from '../types';

export function siblingAndSelfTraverser<T extends ObjectTreeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
) {
  siblingTraverser(node, onNext, true, false);
}

export function siblingAndSelfWithChildrenTraverser<T extends ObjectTreeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
) {
  siblingTraverser(node, onNext, true, true);
}

export function siblingWithChildrenTraverser<T extends ObjectTreeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
) {
  siblingTraverser(node, onNext, false, true);
}

export function siblingTraverser<T extends ObjectTreeNode>(
  node: T,
  onNext: TraverseCallbackFn<T>,
  includeEntryNode = false,
  includeChildren = false,
): void {
  if (node == null || node.recursesTo != null) {
    return;
  }

  let targetNodes: T[] = [];

  if (node.parent != null) {
    targetNodes = node.parent.children;
  } else if (includeEntryNode) {
    targetNodes = [node];
  }

  enumerateSiblings(targetNodes, node, onNext, includeEntryNode, includeChildren);
}

function enumerateSiblings<T extends ObjectTreeNode>(
  siblings: T[],
  entryNode: T,
  onNext: TraverseCallbackFn<T>,
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
