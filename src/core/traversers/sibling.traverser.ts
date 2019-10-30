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
  includeChildren = true,
): void {
  if (node == null) {
    return;
  }

  const target: ObjectTreeNode[] = node.parent != null ? node.parent.children : [node];
  enumerateSiblings(target, node, onNext, includeEntryNode, includeChildren);
}

function enumerateSiblings(
  siblings: ObjectTreeNode[],
  entryNode: ObjectTreeNode,
  onNext: TraverseCallbackFn,
  includeNode: boolean,
  includeChildren: boolean,
) {
  let children: any[] = [];

  for (const sibling of siblings) {
    const shouldInlcude = sibling !== entryNode && sibling.parent !== entryNode;

    if (includeNode || shouldInlcude) {
      onNext(sibling);
      children = children.concat(sibling.children);
    }
  }

  if (includeChildren && children.length > 0) {
    enumerateSiblings(children, entryNode, onNext, includeNode, includeChildren);
  }
}
