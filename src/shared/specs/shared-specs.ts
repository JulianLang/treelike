import { treeOf } from '../src';

export const TraverserSpecs = {
  itShouldHandleRecursion: (fn: Function, ...params: any[]) =>
    it('should handle recursion without throwing', () => {
      // arrange
      const recursiveObj = {
        a: {},
      };
      recursiveObj.a = recursiveObj;
      const tree = treeOf(recursiveObj);

      // act, assert
      expect(() => fn(tree, ...params)).not.toThrow();
    }),
};
