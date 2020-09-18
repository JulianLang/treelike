import { canIterate } from '../util';

describe('canIterate', () => {
  it('should return true for object based inputs', () => {
    // arrange
    const obj = {};
    const array: any[] = [];

    // act
    const canIterateObj = canIterate(obj);
    const canIterateArray = canIterate(array);

    // assert
    expect(canIterateObj).toBe(true);
    expect(canIterateArray).toBe(true);
  });

  it('should return false for non-object based inputs', () => {
    // arrange
    const bool = true;
    const aNumber = 2;
    const str = 'string';
    const fn = () => {};

    // act
    const canIterateBool = canIterate(bool);
    const canIterateNumber = canIterate(aNumber);
    const canIterateString = canIterate(str);
    const canIterateFn = canIterate(fn);

    // assert
    expect(canIterateBool).toBe(false);
    expect(canIterateNumber).toBe(false);
    expect(canIterateString).toBe(false);
    expect(canIterateFn).toBe(false);
  });
});
