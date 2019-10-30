import { addChild } from '../add-child';
import { createNode } from '../create-node';

describe('addChild', () => {
  it('should add a given node to the other node', () => {
    // arrange
    const node = createNode('child', {});
    const parent = createNode('parent', {});

    // act
    addChild(node, parent);

    // assert
    expect(parent.children).toEqual([node]);
    expect(node.parent).toBe(parent);
  });

  it('should not touch the values of the nodes', () => {
    // arrange
    const value = {};
    const parentValue = {};
    const node = createNode('child', value);
    const parent = createNode('parent', parentValue);

    // act
    addChild(node, parent);

    // assert
    expect(parent.value).toBe(parentValue);
    expect(node.value).toBe(value);
  });

  it('should not add a given node if allowDuplicates param is false', () => {
    // arrange
    const node = createNode('child', {});
    const parent = createNode('parent', {}, [node]);

    // act
    addChild(node, parent, false);

    // assert
    expect(parent.children).toEqual([node]);
  });

  it('should add a given node as a duplicate, if allowDuplicates param is true', () => {
    // arrange
    const value = {};
    const parentValue = {};
    const node = createNode('child', value);
    const parent = createNode('parent', parentValue, [node]);

    // act
    addChild(node, parent, true);

    // assert
    expect(parent.children).toEqual([node, node]);
  });
});
