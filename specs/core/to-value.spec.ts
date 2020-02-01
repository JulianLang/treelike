import { createNode } from '../../src';
import { defaultRootName, toValue, treeOf } from '../../src/core';

describe('toValue', () => {
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

  it(`should handle recursive property correctly`, () => {
    // arrange
    const recursiveObj: { a: number; b?: any } = {
      a: 0,
    };
    recursiveObj.b = recursiveObj;
    const node = treeOf(recursiveObj);

    // act
    const result = toValue(node);

    // assert
    expect(result).toEqual(recursiveObj);
  });

  it(`should handle recursive property correctly (three levels deep)`, () => {
    // arrange
    const recursiveObj: any = {
      a: {
        b: {
          c: {
            d: 42,
          },
        },
      },
    };
    recursiveObj.a.b.c.e = recursiveObj;
    const node = treeOf(recursiveObj);

    // act
    const result = toValue(node);

    // assert
    expect(result).toEqual(recursiveObj);
  });

  it('should call child selector fn', () => {
    // arrange
    const anyValue = 42;
    const selector = jasmine.createSpy('selectorFn').and.returnValue(anyValue);
    const node = createNode('node', {});

    // act
    toValue(node, selector);

    // assert
    expect(selector).toHaveBeenCalledTimes(1);
  });

  it('should only output values targeted by selector fn', () => {
    // arrange
    const node = treeOf({
      shop: {
        ecCard: {
          amount: 42,
        },
      },
      other: {
        bar: 0,
      },
    });

    // act
    const result = toValue(node, node => {
      return node.name === 'ecCard' ? node.children[0] : node;
    });

    // assert
    expect(result.shop).toEqual({ amount: 42 });
    expect(result.other).toEqual({ bar: 0 });
  });
});
