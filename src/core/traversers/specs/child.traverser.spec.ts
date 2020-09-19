import { TraverserSpecs } from '../../../shared/specs/shared-specs';
import { treeOf } from '../../tree-of';
import { childTraverser } from '../child.traverser';

describe('childTraverser', () => {
  TraverserSpecs.itShouldHandleRecursion(childTraverser, () => {});

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
    const tree = treeOf(obj);
    const orderOfNames: string[] = [];

    // act
    childTraverser(tree, (node) => {
      orderOfNames.push(node.name as string);
    });

    // assert
    expect(orderOfNames).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});
