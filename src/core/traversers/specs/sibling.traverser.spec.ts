import { treeOf } from '../../tree-of';
import { ObjectTreeNode } from '../../types';
import { findNode } from '../../util';
import { siblingTraverser } from '../sibling.traverser';

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
