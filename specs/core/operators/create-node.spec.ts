import { createNode } from '../../../src/core/operators/create-node';
import { TreelikeNode } from '../../../src/core/types';

describe('createNode', () => {
  it('should convert the parameters into a node object', () => {
    // arrange
    const name = 'name';
    const value = {};
    const children: TreelikeNode[] = [];
    const parent: TreelikeNode = {
      name: 'parent',
      children: [],
      type: 'object',
      value: {},
    };

    // act
    const node = createNode(name, value, children, parent);

    // assert
    expect(node).toBeDefined();
    expect(node.name).toBe(name);
    expect(node.value).toBe(value);
    expect(node.children).toBe(children);
  });

  it('should auto-infer the node type from given input value', () => {
    // arrange
    // act
    const node1 = createNode('name', {}, []);
    const node2 = createNode('name', [], []);
    const node3 = createNode('name', 'string', []);
    const node4 = createNode('name', 12, []);
    const node5 = createNode('name', true, []);

    // assert
    expect(node1.type).toBe('object');
    expect(node2.type).toBe('array');
    expect(node3.type).toBe('value');
    expect(node4.type).toBe('value');
    expect(node5.type).toBe('value');
  });
});
