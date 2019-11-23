import { copyAttributes } from '../copy-attributes';
import { createNode } from '../create-node';

describe('copyAttributes', () => {
  it('should copy over all attributes from one node onto another', () => {
    // arrange
    const childA = createNode('child-a', true);
    const nodeA = createNode('node-a', () => 'A', [childA]);
    const parentA = createNode('parent-a', {}, [nodeA]);
    childA.parent = nodeA;
    nodeA.parent = parentA;

    const nodeB = createNode('node-b', null, [], childA);

    // act
    copyAttributes(nodeA, nodeB);

    // assert
    expect(nodeB.children).toBe(nodeA.children);
    expect(nodeB.name).toBe(nodeA.name);
    expect(nodeB.value).toBe(nodeA.value as any);
    expect(nodeB.parent).toBe(nodeA.parent);
  });
});
