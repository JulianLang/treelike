import { treeOf } from '../../';
import { defaultRootName } from '../../constants';
import { ObjectTreeNode } from '../../types';
import { findNode } from '../../util';
import { siblingTraverser } from '../sibling.traverser';

describe('sibling with children traverser', () => {
  it('should traverse in the correct order', () => {
    // arrange
    const obj = {
      1: {
        3: '3',
        4: '4',
      },
      2: {
        5: '5',
        6: '6',
      },
    };
    const rootNode = treeOf(obj);
    const orderOfNames: string[] = [];

    // act
    siblingTraverser(
      rootNode,
      node => {
        orderOfNames.push(node.name as string);
      },
      /* includeEntryNode */ true,
      /* inludeChildren */ true,
    );

    // assert
    expect(orderOfNames).toEqual([defaultRootName, '1', '2', '3', '4', '5', '6']);
  });

  it('should do not include start node if includeNode is false', () => {
    // arrange
    const obj = {
      1: {
        3: '3',
        4: '4',
      },
      2: {
        5: '5',
        6: '6',
      },
    };
    const rootNode = treeOf(obj);
    const startNode = findNode(rootNode, n => n.name === '2') as ObjectTreeNode<any>;
    const orderOfNames: string[] = [];

    // act
    siblingTraverser(
      startNode,
      node => {
        orderOfNames.push(node.name as string);
      },
      /* includeEntryNode */ false,
      /* inludeChildren */ true,
    );

    // assert
    expect(orderOfNames).toEqual(['1', '3', '4']);
  });
});
