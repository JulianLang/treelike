import { siblingTraverser } from '../../src/core/traversers/sibling.traverser';
import { treeOf } from '../../src/core/tree-of';
import { ObjectTreeNode } from '../../src/core/types';
import { findNode } from '../../src/core/util';

describe('siblingTraverser', () => {
  it('should traverse in the correct order', () => {
    // arrange
    const obj = {
      startNode: {
        shouldNot: null,
        beReached: null,
      },
      1: {
        shouldNot: null,
        beReached: null,
      },
    };
    const root = treeOf(obj);
    const startNode = findNode(root, n => n.name === 'startNode') as ObjectTreeNode;
    const orderOfNames: string[] = [];

    // act
    siblingTraverser(
      startNode,
      node => {
        orderOfNames.push(node.name as string);
      },
      false,
      false,
    );

    // assert
    expect(orderOfNames).toEqual(['1']);
  });
});
