import { createNode } from '../create-node';
import { replace } from '../replace';

describe('remove', () => {
  it('should replace the specified node with another node', () => {
    // arrange
    const newChild = createNode('child', {});
    const replaceNode = createNode('replaced', {});
    const parent = createNode('parent', {}, [replaceNode]);

    // act
    replace(replaceNode, newChild, parent);

    // assert
    expect(parent.children).toEqual([newChild]);
  });

  it('should do not anything if node not found in children', () => {
    // arrange
    const newChild = createNode('child', {});
    const replaceNode = createNode('replaced', {});
    const parent = createNode('parent', {}, [newChild]);

    // act
    replace(replaceNode, newChild, parent);

    // assert
    expect(parent.children).toEqual([newChild]);
  });

  it('should return the index of the replaced node', () => {
    // arrange
    const newChild = createNode('child2', 2);
    const child = createNode('child1', 1);
    const replaceNode = createNode('replaced', {});
    const parent = createNode('parent', {}, [child, replaceNode]);

    // act
    const replaceIndex = replace(replaceNode, newChild, parent);

    // assert
    expect(replaceIndex).toBe(1);
  });
});
