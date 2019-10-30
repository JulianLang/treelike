import { ObjectTreeNode } from '../../types';
import { addNewChild } from '../add-new-child';
import { createNode } from '../create-node';

describe('addNewChild', () => {
  it('should create a new node and add to the given parent', () => {
    // arrange
    const parent = createNode('parent', {});
    const name = 'new-child';
    const children: ObjectTreeNode<any>[] = [];
    const value = {};
    // act
    addNewChild(parent, name, value, children);

    // assert
    expect(parent.children.length).toBe(1);
    expect(parent.children[0].name).toBe(name);
    expect(parent.children[0].children).toBe(children);
    expect(parent.children[0].value).toBe(value);
  });
});
