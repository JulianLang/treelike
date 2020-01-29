import { createNode } from '../../src';
import { defaultRootName, toValue, treeOf } from '../../src/core';

fdescribe('toValue', () => {
  [0, false, () => {}, '', {}, []].forEach(value => {
    it(`should convert node-value ${value} into a value`, () => {
      // arrange
      const node = createNode(defaultRootName, value);
      // act
      const result = toValue(node);
      // assert
      expect(result).toEqual(value);
    });
  });

  [{ a: 0, b: false }, [0, false]].forEach(value => {
    it(`should take children into account for ${value}`, () => {
      // arrange
      const node = treeOf(value);
      // act
      const result = toValue(node);
      // assert
      expect(result).toEqual(value);
    });
  });

  [{ a: { b: { c: 0, d: false } } }, [[[0, false]]]].forEach(value => {
    it(`should recursively convert node-values ${value} into value`, () => {
      // arrange
      const node = treeOf(value);
      // act
      const result = toValue(node);
      // assert
      expect(result).toEqual(value);
    });
  });
});
