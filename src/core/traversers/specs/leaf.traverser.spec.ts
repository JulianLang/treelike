import { treeOf } from '../../tree-of';
import { leafTraverser } from '../leaf.traverser';

describe('leafTraverser', () => {
  it('should traverse in the correct order', () => {
    // arrange
    const obj = {
      3: {
        1: null,
        2: null,
      },
      6: {
        4: null,
        5: null,
      },
    };
    const tree = treeOf(obj);
    const orderOfNames: string[] = [];

    // act
    leafTraverser(tree, node => {
      orderOfNames.push(node.name as string);
    });

    // assert
    expect(orderOfNames).toEqual(['1', '2', '3', '4', '5', '6', '$root']);
  });
});
