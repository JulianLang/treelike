import { createNode } from '../create-node';
import { remove } from '../remove';

describe('remove', () => {
  it('should remove a given node if found in parent node', () => {
    // arrange
    const child = createNode('child', {});
    const parent = createNode('parent', {}, [child]);

    // act
    remove(child, parent);

    // assert
    expect(parent.children.length).toBe(0);
    expect(child.parent).toBe(undefined);
  });

  it('should return the index of the removed node', () => {
    // arrange
    const child1 = createNode('child1', {});
    const child2 = createNode('child2', {});
    const parent = createNode('parent', {}, [child1, child2]);

    // act
    const removedIndex = remove(child2, parent);

    // assert
    expect(removedIndex).toBe(1);
  });
});
