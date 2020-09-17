import { defaultRootName } from '../../src/core/constants';
import { parentTraverser } from '../../src/core/traversers/parent.traverser';
import { treeOf } from '../../src/core/tree-of';
import { TreelikeNode } from '../../src/core/types';
import { findNode } from '../../src/core/util';
import { TraverserSpecs } from '../shared-specs';

describe('parentTraverser', () => {
  TraverserSpecs.itShouldHandleRecursion(parentTraverser, () => {});

  it('should traverse in the correct order', () => {
    // arrange
    const obj = {
      3: {
        1: '1',
        2: {
          shouldNotBeReached: null,
          startNode: '',
        },
      },
      4: {
        shouldNot: null,
        beReached: null,
      },
    };
    const rootNode = treeOf(obj);
    const startNode = findNode(rootNode, (n) => n.name === 'startNode') as TreelikeNode;
    const orderOfNames: string[] = [];

    // act
    parentTraverser(startNode, (node) => {
      orderOfNames.push(node.name as string);
    });

    // assert
    expect(orderOfNames).toEqual(['1', '2', '3', '4', defaultRootName]);
  });
});
