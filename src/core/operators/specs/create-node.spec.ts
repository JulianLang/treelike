import { ObjectTreeNode } from '../../types';
import { createNode } from '../create-node';

describe('createNode', () => {
  it('should convert the parameters into a node object', () => {
    // arrange
    const name = 'name';
    const value = {};
    const children: ObjectTreeNode<any>[] = [];
    const parent: ObjectTreeNode<Object> = {
      name: 'parent',
      children: [],
      type: 'object',
      isRecursionRoot: false,
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
