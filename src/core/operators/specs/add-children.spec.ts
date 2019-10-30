import * as AddChildFn from '../add-child';
import { addChildren } from '../add-children';
import { createNode } from '../create-node';

describe('addChildren', () => {
  it('should call addChild method n times', () => {
    // arrange
    const node = createNode('child', {});
    const parent = createNode('child', {});
    const childrenToAdd = [node, node, node];
    spyOn(AddChildFn, 'addChild');

    // act
    addChildren(childrenToAdd, parent, true);

    // assert
    expect(AddChildFn.addChild).toHaveBeenCalledTimes(childrenToAdd.length);
  });

  it('should call addChild with the given children, parent and allowDuplicates parameters', () => {
    // arrange
    const node = createNode('child', {});
    const parent = createNode('child', {});
    const childrenToAdd = [node, node, node];
    const allowDuplicates = false;
    spyOn(AddChildFn, 'addChild');

    // act
    addChildren(childrenToAdd, parent, allowDuplicates);

    // assert
    for (const child of childrenToAdd) {
      expect(AddChildFn.addChild).toHaveBeenCalledWith(child, parent, allowDuplicates);
    }
  });
});
